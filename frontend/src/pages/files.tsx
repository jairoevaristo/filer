import { useQuery } from "@tanstack/react-query";

import { Layout } from "@/components/layout";
import { ListFileCard } from "@/components/list-files-card"
import { UploadFile } from "@/components/upload-file";
import { File } from "@/types/file";
import { findAllFiles } from "@/services/files/find-all-files";

export const Files = () => {
  const { data, isLoading, isFetching } = useQuery<File[]>({
    queryKey: ["files"], 
    queryFn: findAllFiles,
    refetchOnWindowFocus: true,
  })

  return (
    <Layout>
        <div className="flex items-center justify-between mt-10">
          <div className="flex flex-col justify-center gap-2">
           <div className="flex items-center gap-2 mb-6">
            <h1 className="font-semibold text-xl">Total os arquivos</h1>
            <span className="font-thin text-2xl bg-secondary rounded-sm px-3">
              {data?.length}
            </span>
           </div>
          </div>
          <UploadFile />
        </div>

        <div className="mt-4">
          <ListFileCard
            files={data} 
            isLoading={isLoading} 
            isFetching={isFetching}
          />
        </div>
    </Layout>
  )
};
