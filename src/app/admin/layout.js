import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";

export default async function AdminLayout({ children }) {

    const session = await getServerSession(authOptions)


    if (session?.user?.role === 'admin')
        return (
            children
        );

    return notFound()
}
