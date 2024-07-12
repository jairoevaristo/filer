import clsx from "clsx";

import { User } from "@/types/user";

import { ScrollArea } from "./ui/scroll-area";
import { Spinner } from "./spinner";
  
export type UserShare = {
    name: string;
    id: string;
    avatar: string;
    email: string;
};

type ShareFileProps = {
  onSelectedUser: (user: UserShare) => void
  value: string
  users: User[] | undefined
  loading: boolean
}

export const ShareFileUser = ({ onSelectedUser, value, loading, users }: ShareFileProps) => {
    return (
        <div className={clsx("w-[24vw] p-2 rounded-md border absolute top-20 bg-background z-40", { 'hidden': !value })}>
            <ScrollArea className="h-60 overflow-y-auto px-4">
              {users?.length === 0 && (
                <div className="flex items-center justify-center h-60">
                  <h1 className="text-md text-muted-foreground font-bold">Nenhum usuário encontrado</h1>
                </div>
              )}

              {loading && (
                <div className="flex items-center justify-center h-60">
                  <Spinner />
                </div>
              )}
              {!!users && users?.length > 0 && users?.map(user => (
                  <div 
                    key={user.id} 
                    className="flex items-center justify-between p-3 border-b cursor-pointer hover:bg-muted/80 transition-colors" 
                    onClick={() => onSelectedUser({
                        name: user.name,
                        id: user.id,
                        avatar: user.avatar,
                        email: user.email
                      })}
                    >
                          <div className="flex items-center">
                              <img
                                  className="w-8 h-8 rounded-full"
                                  src={user.avatar}
                                  alt={user.name}
                              />
                              <div className="ml-2">
                                  <p className="font-medium text-sm">{user.name}</p>
                                  <p className="text-xs text-gray-500">{user.email}</p>
                              </div>
                          </div>
                  </div>
                ))}
            </ScrollArea>
        </div>
    )
}