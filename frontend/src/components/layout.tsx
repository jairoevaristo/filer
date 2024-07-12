import { ReactNode, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";

import { userProfile } from "@/services/users/user-profile";
import { User } from "@/types/user";
import { ROUTES } from "@/constants/routes";
import { useToast } from "@/hooks/use-toast";
import { socket } from "@/libs/socket.io";

import { Notification } from "./notification";
import { Spinner } from "./spinner";
import { Sidebar } from "./sidebar";
import { Separator } from "./ui/separator";

type LayoutProps = {
    children: ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
  const { pathname } = useLocation()
  const { toastSuccess } = useToast()

  const { data, isFetching, isLoading } = useQuery<User>({ 
    queryKey: ['user'], 
    queryFn: userProfile, 
    refetchOnWindowFocus: true,
  })

  useEffect(() => {
    socket.on('send-notification', () => {
      toastSuccess({
        title: 'Nova notificação',
        description: 'Você recebeu um novo compartilhamento de arquivo'
      })
    });
  }, [toastSuccess]);

    if (isFetching || isLoading) {
      return (
        <div className="flex justify-center items-center h-screen w-full">
          <Spinner />
        </div>
      )
    }

  return (
    <main className="w-full flex h-screen">
        <Sidebar avatar={data?.avatar} name={data?.name} email={data?.email} />

        <div className="flex-1 py-5 px-10 overflow-auto">
          <div className="flex justify-between items-center">
            <div className="my-4">
              {pathname === ROUTES.home && <h1 className="font-bold text-4xl mb-2">Arquivos</h1>}
              {pathname === ROUTES.myShares && <h1 className="font-bold text-4xl mb-2">Meus compartilhamentos</h1>}
              {pathname === ROUTES.sharedWithMe && <h1 className="font-bold text-4xl mb-2">Compartilhados comigo</h1>}
            </div>
            <Notification />
          </div>
          <Separator />
            {children}
        </div>
    </main>
  );
};
