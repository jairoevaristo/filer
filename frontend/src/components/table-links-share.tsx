import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { Clipboard, ListCollapse, MoreHorizontal, Trash2, UserPlus } from "lucide-react"
import { format } from 'date-fns'

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { SharedFileList } from "@/types/share"
import { decryptFile } from "@/utils/decrypt-file"
import { Badge } from "./ui/badge"
import { ENV } from "@/utils/env"
import { DeleteShare } from "./delete-share"
import { DetailShare } from "./detail-share"

const columns: ColumnDef<SharedFileList>[] = [
  {
    id: "select",
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div className="lowercase">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "sharedToUsersIds",
    header: "Usuários",
    cell: ({ row }) => {
      const extraCount = row.original.sharedToUsersIds.length > 3 ?  row.original.sharedToUsersIds.length - 3 : 0

      if (row.original.sharedToUsersIds.length === 0) 
        return (
          <div className="flex text-center items-center justify-center w-7 h-7 rounded-full bg-secondary">
            <UserPlus className="w-4 h-4"/>
          </div>
        )

      return (
        <div className="flex -space-x-2">
            {row.original.sharedToUsersIds.slice(0, 3).map(({ avatar }, index) => (
              <img
                key={index}
                className="w-7 h-7 rounded-full border-2 border-border"
                src={avatar}
                alt={`Avatar ${index}`}
              />
            ))}
            {extraCount > 0 && (
              <span className="flex items-center justify-center w-7 h-7 rounded-full text-[10px] bg-secondary">
                +{extraCount}
              </span>
            )}
          </div>
      )
    },
  },
  {
    accessorKey: "file",
    header: "Arquivo",
    cell: ({ row }) => {
      const { name } = decryptFile({ name: row.original.file.name })
      return <div className="font-medium">{name}</div>
    },
  },
  {
    accessorKey: "permission",
    header: "Permissão",
    cell: ({ row }) => {
      const permissionBadge = row.original.permission
      return <Badge variant="secondary" className="rounded-full py-1 px-3">{permissionBadge}</Badge>
    },
  },
  {
    accessorKey: "createdAt",
    header: "Data de criação",
    cell: ({ row }) => {
      const formatedDate = format(
        row.getValue("createdAt") as Date,
        "dd/MM/yyyy"
      )

      return <div className="font-medium">{formatedDate}</div>
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const { id } = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuSeparator />
              
            <DetailShare shareId={id}>
              <Button
                className="w-full px-0 !hover:bg-accent transition-colors flex items-center justify-start h-8 !rounded"
                variant={'ghost'}
              >
                <DropdownMenuItem className="cursor-pointer pointer-events-none">
                  <ListCollapse className="w-4 h-4 mr-2" />
                  <span className="font-normal">Ver detalhes</span>
                </DropdownMenuItem>
              </Button>
            </DetailShare>

            <DropdownMenuItem className="cursor-pointer" onClick={() => navigator.clipboard.writeText(`${ENV.DOMAIN_URL}/shared/${id}`)}>
                <Clipboard className="w-4 h-4 mr-2" />
                <span>Copiar link</span>
            </DropdownMenuItem>
            
            <DropdownMenuSeparator />
            <DeleteShare
              shareId={id}
            >
              <Button
               className="w-full px-0 !hover:bg-accent transition-colors flex items-center justify-start h-8"
               variant={'ghost'}
              >
                <DropdownMenuItem className="cursor-pointer pointer-events-none">
                  <Trash2 className="w-4 h-4 mr-2 text-red-700" />
                  <span className="text-red-700">Deletar</span>
                </DropdownMenuItem>
              </Button>
            </DeleteShare>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

type TableLinksShareProps = {
  data: SharedFileList[] | undefined
}

export const TableLinksShare = ({ data }: TableLinksShareProps) => {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data: data || [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full">
      <div className="rounded-md border bg-background">
        <Table>
          <TableHeader className="bg-muted/50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Nenhum compartilhamento encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Próximo
          </Button>
        </div>
      </div>
    </div>
  )
}
