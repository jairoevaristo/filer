import { Link, useLocation } from "react-router-dom";
import { Home, Share2, UserSearch } from "lucide-react";
import clsx from "clsx";

import { ROUTES } from "@/constants/routes";
import Logo from "@/assets/images/filer.svg";

import { Settings } from "./settings"
import { Separator } from "./ui/separator";

type SidebarProps = {
    name?: string;
    email?: string;
    avatar?: string;
}

export const Sidebar = ({ avatar, email, name }: SidebarProps) => {
    const { pathname } = useLocation()

    return (
        <div className="w-72 border-r border-muted px-4 py-5 flex flex-col justify-between bg-muted/40">
            <div>
                <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <img src={avatar} className="w-10 h-10 rounded-lg" alt="user-avatar" />
                        <div>
                            <p className="font-bold">
                                {name}
                            </p>
                            <p className="text-muted-foreground text-sm">
                                {email}
                            </p>
                        </div>
                    </div>
                    <Settings />
                </div>

                <Separator className="my-4" />

                <ul className="mt-5">
                <Link to={ROUTES.home}>
                        <li className={clsx("mt-2 h-10 px-2 py-6 flex items-center gap-2 rounded-md cursor-pointer hover:bg-bluen/20", {
                            "bg-bluen hover:!bg-bluen": pathname === ROUTES.home
                        })}>
                            <Home className={clsx("w-4 h-4 text-bluen", { '!text-white': pathname === ROUTES.home })} />
                            <span className={clsx("text-sm", { 'text-white': pathname === ROUTES.home })}>Home</span>
                        </li>
                    </Link>

                    <Link to={ROUTES.myShares}>
                        <li className={clsx("mt-3 h-10 px-2 py-6 flex items-center gap-2 cursor-pointer rounded-md hover:bg-bluen/20", {
                            "bg-bluen hover:!bg-bluen": pathname === ROUTES.myShares
                        })}>
                            <Share2 className={clsx("w-4 h-4 text-bluen", { '!text-white': pathname === ROUTES.myShares })} />
                            <span className={clsx("text-sm", { 'text-white': pathname === ROUTES.myShares })}>Meus compartilhamentos</span>
                        </li>
                    </Link>

                    <Link to={ROUTES.sharedWithMe}>
                        <li className={clsx("mt-3 h-10 px-2 py-6 flex items-center gap-2 cursor-pointer rounded-md hover:bg-bluen/20", {
                            "bg-bluen hover:!bg-bluen": pathname === ROUTES.sharedWithMe
                        })}>
                            <UserSearch className={clsx("w-4 h-4 text-bluen", { '!text-white': pathname === ROUTES.sharedWithMe })} />
                            <span className={clsx("text-sm", { 'text-white': pathname === ROUTES.sharedWithMe })}>Compartilhados comigo</span>
                        </li>
                    </Link>
                </ul>
            </div>

            <div className="flex items-center justify-between w-full">
                <div className="flex items-center justify-center gap-2">
                    <img src={Logo} className="w-5 h-5" alt="logo" />
                    <h1 className="uppercase text-sm font-semibold text-gray-500 -ml-1">Filer</h1>
                </div>

                <span className="block text-center font-bold text-xs text-gray-500">v1.0</span>
            </div>
        </div>
    )
}