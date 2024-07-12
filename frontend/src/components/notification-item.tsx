import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";
import { ptBR } from "date-fns/locale";
import { useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";

import { Notification } from "@/types/notifications";
import { socket } from "@/libs/socket.io";

import { Separator } from "./ui/separator";

type NotificationProps = {
  notification: Notification
}

export const NotificationItem = ({ notification }: NotificationProps) => {
  const { shares, users } = notification
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const handleMarkViewNotification = () => {
    socket.emit('view-notification', { notificationId: notification.id })
    queryClient.invalidateQueries({ queryKey: ['notifications'] })
    
    navigate(`/shared/${notification.shares.id}`)
  }

  return (
    <div className="cursor-pointer hover:bg-secondary relative">
        <div className="flex items-center justify-between p-2">
          <div className="flex items-center gap-4">
            <img 
              className="w-10 h-10 rounded-full"
              src={users.avatar}
              alt="Jairo Evaristo" 
          />
            <div className="flex flex-col" onClick={handleMarkViewNotification}>
              <span className={clsx("text-md font-semibold", {
                'font-extrabold': !notification.isMarkView
              })}
              >
                {users.name}
              </span>
              <span className={clsx("text-sm text-muted-foreground", {
                'font-bold': !notification.isMarkView
              })}>
                compartilhou um novo arquivo com você
              </span>
            </div>
          </div>

          <div className={clsx("w-2 h-2 rounded-full bg-bluen absolute top-2 right-1", {
            'hidden': notification.isMarkView
          })} />
          <span className={clsx("text-gray-400 text-[10px] text-right", {
            'font-bold': !notification.isMarkView
          })}>
            {formatDistanceToNow(shares.createdAt, { addSuffix: true, locale: ptBR })}
          </span>
      </div>
      <Separator />
    </div>
  )
};
