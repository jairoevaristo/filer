import { File } from "@/types/file"

import { CardFileItem } from "./card-file-item"
import { LoadingSkeletonItem } from "./loading-skeleton-item"

type ListFileCardProps = {
  files: File[] | undefined
  isLoading: boolean
  isFetching: boolean
}

export const ListFileCard = ({ files, isFetching, isLoading }: ListFileCardProps) => {
  const loadArrItems = Array.from({ length: 6 }, (_, i) => i)

  if (isLoading || isFetching) {
    return (
      <div className="grid grid-cols-3 gap-16 px-5">
        {loadArrItems.map(item => <LoadingSkeletonItem key={item.toString()} />)}
      </div>
    )
  }

  if (!isLoading && files?.length === 0) {
    return (
      <div className="flex justify-center h-screen w-full mt-48">
        <h1 className="font-bold text-lg text-muted-foreground">Nenhum arquivo encontrado</h1>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-3 gap-16 px-5">
      {files?.map(file => <CardFileItem key={file.id} file={file} />)}
    </div>
  )
}