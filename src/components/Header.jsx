import { Drawer, DrawerContent } from "@/components/ui/drawer"
import LoginForm from "./LoginForm"
import Link from "next/link"
import LoginBtn from "./LoginBtn"

const Header = () => {
    return (
        <header className="sticky top-0 backdrop-blur-3xl flex items-center justify-between gap-2 p-4 shadow-md rounded-b-lg">
            <Link href={'/'}>
                <h1 className="text-2xl font-bold select-none uppercase"><span className="text-5xl font-black text-primary">P</span>ractice<span className="text-5xl font-black text-primary">.</span></h1>
            </Link>
            <Drawer>
                <LoginBtn />
                <DrawerContent>
                    <LoginForm />
                </DrawerContent>
            </Drawer>

        </header>
    )
}

export default Header
