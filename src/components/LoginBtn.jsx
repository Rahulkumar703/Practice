import { Button } from "@/components/ui/button"
import { DrawerTrigger } from "@/components/ui/drawer"
import { LogIn, LogOut } from "lucide-react";
import { getServerSession } from "next-auth"
import ThemeSwitch from "./ThemeSwitch";
const LoginBtn = async () => {

    const session = await getServerSession();


    return (
        <div className="flex gap-4 items-center">
            <ThemeSwitch />
            {session?.user ?
                <DrawerTrigger asChild>
                    <Button variant="destructive">
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                    </Button>
                </DrawerTrigger>
                :
                <DrawerTrigger asChild>
                    <Button variant="outline">
                        <LogIn className="h-4 w-4 mr-2" />
                        Login
                    </Button>
                </DrawerTrigger>
            }
        </div>
    )
}

export default LoginBtn
