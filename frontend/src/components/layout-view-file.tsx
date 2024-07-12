import { ReactNode } from "react";
import { saveAs } from 'file-saver';
import { Download } from "lucide-react";

import Logo from "@/assets/images/filer.svg"
import { cn } from "@/libs/utils";
import { decryptFile } from "@/utils/decrypt-file";
import { Permission } from "@/types/share";

import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

type LayoutViewFileProps = {
  children: ReactNode;
  className?: string;
  permissions?: Permission | undefined;
  urlFile?: string;
  nameFile?: string;
};

export const LayoutViewFile = ({
  children,
  className,
  permissions,
  nameFile,
  urlFile
}: LayoutViewFileProps) => {
  const { name, url } = decryptFile({ name: nameFile, url: urlFile })

  const handleDownload = async () => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Network response was not ok');
      
      const blob = await response.blob();
      saveAs(blob, name);
    } catch (error) {
      console.error('Error downloading the file', error);
    }
  };

  return (
    <div className="flex flex-col s-screen w-full py-4 px-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <img src={Logo} className="h-5 w-5" />
            <h1 className="uppercase text-lg font-semibold text-gray-500">Filer</h1>
          </div>
          {
            permissions === 'EDITOR' && (
              <Button className="h-8 w-8 p-0" variant={'outline'} onClick={handleDownload}>
                <Download className="h-5 w-5 text-muted-foreground" />
              </Button>
            )
          }
          </div>

        <Separator className="my-4" />

        <div className={cn("mt-5 flex items-center justify-center", className)}>
          {children}
        </div>
    </div>
  )
};
