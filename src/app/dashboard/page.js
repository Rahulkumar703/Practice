import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import Link from "next/link";
import { CheckCheck, Code2, ListChecks, Medal } from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge";

const getDashboardInfo = async () => {
    'use server'
    const session = await getServerSession(authOptions);

    if (session?.user)
        try {
            const res = await fetch(`${process.env.NEXTAUTH_URL}/api/user/${session?.user?.id}/dashboard`, {
                cache: 'no-store'
            })
            if (res.ok)
                return await res.json();
        } catch (error) {
            throw new Error(error.message)
        }
    else notFound();
}

const page = async () => {

    const dashboardInfo = await getDashboardInfo();
    const { solvedProblems, rank, problems } = dashboardInfo;

    return (

        <div className='flex flex-col gap-10'>
            <div className='grid sm:grid-cols-2 place-items-center gap-5'>
                <Link href="/problems/solved" className='w-full h-full'>
                    <Card className='w-full h-full border hover:shadow-xl transition-shadow' >
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <ListChecks className="w-6 h-6 mr-2" />
                                Solved Problems
                            </CardTitle>
                            <CardDescription>Total problems you solved till now.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-5xl font-bold text-primary">
                                {solvedProblems?.length || 'N/A'}
                            </p>
                        </CardContent>
                    </Card>
                </Link>

                <Link href="/leaderboard" className='w-full h-full'>
                    <Card className='w-full h-full border hover:shadow-xl transition-shadow' >
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <Medal className="w-6 h-6 mr-2" />
                                Rank
                            </CardTitle>
                            <CardDescription>Your Ranking in matrix based on your number of problem solved</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-5xl font-bold text-primary">
                                {rank || 'N/A'}
                            </p>
                        </CardContent>
                    </Card>
                </Link>
            </div>

            <Link href="/problems/all" className=''>
                <Card className='w-full h-full border hover:shadow-xl transition-shadow' >
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Code2 className="w-6 h-6 mr-2" />
                            Solve More Problems
                        </CardTitle>
                        <CardDescription>Click to Open Problems List</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableCaption>Recently Added Problems.</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">Week</TableHead>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Topics</TableHead>
                                    <TableHead className="text-right">Difficulty</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {
                                    problems?.
                                        map(problem => {
                                            const isSolved = solvedProblems?.find(solvedProblem => solvedProblem.problemId === problem._id);
                                            return (
                                                <TableRow key={problem._id}>
                                                    <TableCell className="font-bold text-xl">{problem.week}</TableCell>
                                                    <TableCell className="font-semibold capitalize">
                                                        <div className="flex gap-1 items-center">
                                                            {isSolved && <CheckCheck className="w-6 h-6 text-green-500" />}
                                                            {problem.title}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="flex gap-2 flex-wrap justify-center items-center">
                                                        {
                                                            problem?.topics.map((topic, index) => {
                                                                return (
                                                                    <Badge variant="secondary" key={index} className={'capitalize'}>
                                                                        {topic}
                                                                    </Badge>
                                                                )
                                                            })
                                                        }
                                                    </TableCell>
                                                    <TableCell className={`text-right capitalize`}>
                                                        <Badge variant="default" className={`${problem.difficulty === 'easy' ? 'bg-green-300 hover:bg-green-300/90' : problem.difficulty === 'medium' ? 'bg-blue-300 hover:bg-blue-300/90' : 'bg-red-300 hover:bg-red-300/90'} text-black ml-auto`}>
                                                            {problem.difficulty}
                                                        </Badge>
                                                    </TableCell>
                                                </TableRow>

                                            )
                                        })
                                }
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </Link>
        </div>
    )
}

export default page
