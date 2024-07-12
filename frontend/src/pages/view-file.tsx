import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { FilePreview } from "@/components/file-preview";
import { Spinner } from "@/components/spinner";
import { LayoutViewFile } from "@/components/layout-view-file";
import { FileView } from "@/types/file-view";
import { viewFileShared } from "@/services/shares/view-file";

export const ViewFile = () => {
    const { fileId } = useParams<{ fileId: string }>()

    const { data, isLoading } = useQuery<FileView>({
        queryKey: ["file-view", fileId],
        queryFn: () => viewFileShared(fileId as string),
        refetchOnWindowFocus: false,
    })

    if (data?.response?.statusCode === 401) {
      return (
        <LayoutViewFile>
          <h1 className="text-4xl font-bold text-muted-foreground">
            Você não tem permissão para acessar este arquivo.
          </h1>
        </LayoutViewFile>
      )
    }

    if (isLoading) {
        return (
          <LayoutViewFile>
            <Spinner />
          </LayoutViewFile>
        )
    }

    return (
      <LayoutViewFile
        permissions={data?.permission}
        nameFile={data?.file?.name}
        urlFile={data?.file?.url}
      >
        <FilePreview data={data} />
      </LayoutViewFile>
    )
};
