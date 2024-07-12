import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { Layout } from "@/components/layout";
import { Spinner } from "@/components/spinner";
import { ShareFileWithMe } from "@/types/share";
import { listShareWithMe } from "@/services/shares/list-share-with-me";
import { TableLinksShareMe } from "@/components/table-links-share-me";

export const SharesWithMe = () => {
  const queryClient = useQueryClient()
  const { data, isLoading } = useQuery<ShareFileWithMe[]>({ 
    queryKey: ['shares-with-me'], 
    queryFn: listShareWithMe,
    refetchOnWindowFocus: true
  })

  useEffect(() => {
      queryClient.invalidateQueries({ queryKey: ['shares-with-me'] })
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
            <h1 className="font-semibold text-xl">Total de arquivos compartilhados comigo</h1>
            <span className="font-thin text-2xl bg-secondary rounded-sm px-3">{data?.length}</span>
           </div>
          </div>
        </div>
        <div className="mt-4">
          <TableLinksShareMe data={data} />
        </div>
    </Layout>
  )
};
