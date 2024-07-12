import { useEffect, useState } from "react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { Bell } from "lucide-react"

import { socket } from "@/libs/socket.io"
import { allNotifications } from "@/services/notifications/all-notifications"

import { NotificationItem } from "./notification-item"
import { ScrollArea } from "./ui/scroll-area"
import { Separator } from "./ui/separator"
import { Spinner } from "./spinner"
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover"

export const Notification = () => {
    const queryClient = useQueryClient()
    const [isNotification, setIsNotification] = useState(false)

    const { data, isLoading } = useQuery({
        queryKey: ['notifications'],
        queryFn: allNotifications,
    })

    useEffect(() => {
        socket.on('send-notification', () => {
            setIsNotification(true)
            queryClient.invalidateQueries({ queryKey: ['notifications'] })
        })
    }, [queryClient])

    const hasNotificationMarkView = () => {
        return data?.some((notification) => !notification?.isMarkView)
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <button className="bg-none border-0 shadow-0 mr-2 relative">
                    <Bell className="w-5 h-5" />
                    {isNotification || hasNotificationMarkView() && (
                        <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full">
                            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full animate-ping" />
                        </div>
                    )}
                </button>
            </PopoverTrigger>
            <PopoverContent className="w-[23vw] mr-10 mt-2">
            <ScrollArea className="h-[46vh] rounded-md">
                <div>
                    <h1 className="mb-4 text-center font-semibold text-xl leading-none">Minhas notificações</h1>
                    <Separator className="mb-5" />
                    {isLoading && (
                        <div className="flex items-center justify-center mt-20">
                            <Spinner className="w-12 h-12" />
                        </div>
                    )}
                    {!isLoading && data && data?.length > 0 && (
                        <>
                            {data.map((notification) => (
                                <NotificationItem key={notification?.id} notification={notification} />  
                            ))}
                        </>
                    )}
                    {!isLoading && data && data?.length === 0 && (
                        <div className="flex items-center justify-center mt-20">
                            <p className="text-center text-gray-500">Você não possui nenhuma notificação</p>
                        </div>
                    )}
                </div>
            </ScrollArea>
        </PopoverContent>
    </Popover>
    )
}