import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import Link from "next/link";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { CheckCircle, Code, ListChecks, Medal, XCircle } from "lucide-react";

const getUserInfo = async () => {
    const session = await getServerSession(authOptions);

    if (session?.user)
        try {
            const res = await fetch(`${process.env.NEXTAUTH_URL}/api/user/${session?.user?.id}`, {
                next: { tags: ['fetchUser'], revalidate: 1 }
            })
            if (res.ok)
                return await res.json();
        } catch (error) {
            throw new Error(error.message)
        }
    else notFound();
}


const page = async () => {

    const data = await getUserInfo();
    const rank = 12

    return (

        <div className='flex flex-col gap-10'>
            <div className='grid sm:grid-cols-2 place-items-center gap-5'>
                <div className='flex flex-col p-2 py-10 rounded-lg w-full items-center justify-center gap-4 shadow-lg text-xl font-semibold bg-secondary/30'>
                    <ListChecks />
                    Solved Problems
                    <span>{data?.user?.problems.length}</span>
                </div>
                <div className='flex flex-col p-2 py-10 rounded-lg w-full items-center justify-center gap-4 shadow-lg text-xl font-semibold bg-secondary/30'>
                    <Medal />
                    Rank
                    <span>{rank}</span>
                </div>
            </div>
            <Link href="/problems" className='flex flex-col p-2 py-10 rounded-lg w-full items-center justify-center gap-4 shadow-lg text-xl font-semibold bg-secondary/30'>
                <Code />
                Solve More Problems
            </Link>
        </div>
    )
}

export default page
