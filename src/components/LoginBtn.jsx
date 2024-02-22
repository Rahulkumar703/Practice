import { Button } from "@/components/ui/button"
import { DrawerTrigger } from "@/components/ui/drawer"
import { getServerSession } from "next-auth"
const LoginBtn = async () => {

    const session = await getServerSession();


    return (
        session?.user ?
            <DrawerTrigger asChild>
                <Button variant="outline">
                    Logout
                </Button>
            </DrawerTrigger>
            :
            <DrawerTrigger asChild>
                <Button variant="outline">
                    Login
                </Button>
            </DrawerTrigger>
    )
}

export default LoginBtn
