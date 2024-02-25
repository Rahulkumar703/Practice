import { getServerSession } from "next-auth";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRightFromSquare, CalendarDays, CheckCheck, CheckCircle, Code2, XCircle } from "lucide-react";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { Button } from "@/components/ui/button";

const getProblems = async () => {
    'use server'
    // const session = await getServerSession(authOptions);

    // if (session?.user)
    try {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/problems`, {
            cache: 'no-store',
        })
        if (res.ok)
            return await res.json();
    } catch (error) {
        throw new Error(error.message)
    }
}

const getUserProblems = async () => {
    'use server'

    const session = await getServerSession(authOptions);

    if (session?.user)
        try {
            const res = await fetch(`${process.env.NEXTAUTH_URL}/api/user/${session?.user?.id}`, {
                cache: 'no-store',
            })
            if (res.ok)
                return await res.json();
        } catch (error) {
            throw new Error(error.message)
        }
    else return [];
}

const ProblemsPage = async () => {

    const problemsData = await getProblems();
    const userData = await getUserProblems();
    const problems = problemsData?.problems || [];
    const categorizedByWeek = problems.reduce((acc, item) => {
        // Create an array for the current week if it doesn't exist
        acc[item.week] = acc[item.week] || [];
        // Push the item to the corresponding week array
        acc[item.week].push(item);
        return acc;
    }, {});

    return (
        <div className="flex flex-col gap-10">
            {
                Object.keys(categorizedByWeek).sort((a, b) => b - a).map(week => {
                    return (
                        <div className="flex flex-col gap-2" key={week}>
                            <h1 className="font-bold text-2xl text-primary flex items-center">
                                <CalendarDays className="w-6 h-6 mr-2" />
                                Week {week}
                            </h1>
                            <div key={week} className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-2">
                                {
                                    categorizedByWeek[week].map(problem => {
                                        const isSolved = userData?.user?.problems?.some(userProblems => {
                                            return userProblems.problemId._id === problem._id && userProblems.solved
                                        })
                                        return (
                                            <Link key={problem?._id} href={`/problem/${problem.title}`} className="h-full capitalize ">
                                                <Card className="h-full border hover:shadow-xl transition-shadow flex flex-col">
                                                    <CardHeader className="flex flex-row items-center gap-2">
                                                        {
                                                            isSolved ?
                                                                <CheckCheck className="w-6 h-6 text-green-600" />
                                                                :
                                                                null
                                                        }
                                                        <CardTitle className={`${isSolved ? 'text-green-600' : ''}`}>{problem.title}</CardTitle>
                                                    </CardHeader>
                                                    <CardContent className="flex gap-2">
                                                        {
                                                            problem?.topics.map((topic, index) => {
                                                                return (
                                                                    <Badge variant="secondary" key={index}>
                                                                        {topic}
                                                                    </Badge>
                                                                )
                                                            })
                                                        }


                                                        <Badge variant="default" className={`${problem.difficulty === 'easy' ? 'bg-green-300 hover:bg-green-300/90' : problem.difficulty === 'medium' ? 'bg-blue-300 hover:bg-blue-300/90' : 'bg-red-300 hover:bg-red-300/90'} text-black ml-auto`}>
                                                            {problem.difficulty}
                                                        </Badge>
                                                    </CardContent>
                                                    {/* <CardContent>
                                                    {problem.statement}
                                                </CardContent> */}
                                                    <CardFooter className="flex items-center justify-between mt-auto">
                                                        {/* <Badge variant="outline" className={'py-1 px-4'}>
                                                            Week {problem.week}
                                                        </Badge> */}
                                                        {
                                                            problem.link !== 'N/A' ?
                                                                <Button variant="link" className={'ml-auto py-1 px-4 flex items-center'}>
                                                                    <a href={problem.link} className="flex items-center">
                                                                        Solve Problem
                                                                    </a>
                                                                    <ArrowUpRightFromSquare className="w-3 h-3 ml-2" />
                                                                </Button>
                                                                :
                                                                null
                                                        }
                                                    </CardFooter>
                                                </Card>
                                            </Link>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default ProblemsPage
