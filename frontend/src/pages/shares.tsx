import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { Layout } from "@/components/layout";
import { TableLinksShare } from "@/components/table-links-share";
import { Spinner } from "@/components/spinner";
import { listMyShare } from "@/services/shares/list-my-share";
import { SharedFileList } from "@/types/share";

export const Shares = () => {
  const queryClient = useQueryClient()
  const { data, isLoading } = useQuery<SharedFileList[]>({ 
    queryKey: ['shares'], 
    queryFn: listMyShare,
    refetchOnWindowFocus: true
  })

  useEffect(() => {
      queryClient.invalidateQueries({ queryKey: ['shares'] })
  }, [queryClient])

  if (isLoading) 
    return (
      <Layout>
        <div className="flex items-center justify-center h-screen">
          <Spinner />
        </div>
      </Layout>
  )

  

  return (
    <Layout>
        <div className="flex items-center justify-between mt-10">
          <div className="flex flex-col justify-center gap-2">
           <div className="flex items-center gap-2 mb-2">
            <h1 className="font-semibold text-xl">Total de arquivos compartilhados</h1>
            <span className="font-thin text-2xl bg-secondary rounded-sm px-3">{data?.length}</span>
           </div>
          </div>
        </div>

        <div className="mt-4">
          <TableLinksShare data={data} />
        </div>
    </Layout>
  )
};
