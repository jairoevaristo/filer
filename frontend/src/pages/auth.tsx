import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from "@/components/ui/tabs";
import { SignIn } from "@/components/sign-in";
import { SignUp } from "@/components/sign-up";

import Logo from "@/assets/images/filer.svg";

export const Auth = () => {
  return (
    <main className="flex items-center justify-center h-screen relative">
        <div className="border rounded-xl shadow-lg px-5 py-4">
            <h1 className="text-center font-bold text-3xl mb-4">Bem vindo</h1>
            <Tabs defaultValue="signin" className="w-[350px]">
                <TabsList className="grid h-10 w-full grid-cols-2">
                    <TabsTrigger className="h-8" value="signin">Login</TabsTrigger>
                    <TabsTrigger className="h-8" value="signup">Criar uma conta</TabsTrigger>
                </TabsList>
                <TabsContent value="signin">
                    <SignIn />
                </TabsContent>
                <TabsContent value="signup">
                    <SignUp />
                </TabsContent>
            </Tabs>
        </div>

        <div className="flex items-center gap-1 absolute top-5 left-5">
            <img src={Logo} className="h-5 w-5" />
            <h1 className="uppercase text-lg font-semibold text-gray-500">Filer</h1>
        </div>
    </main>
  )
};
