import { getServerSession } from "next-auth";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRightFromSquare, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

const getUserProblems = async () => {
    const session = await getServerSession(authOptions);

    if (session?.user)
        try {
            const res = await fetch(`${process.env.NEXTAUTH_URL}/api/user/${session?.user?.id}`, {
                cache: 'no-store',
            })
            if (res.ok) {
                const data = await res.json();
                return data
            }
        } catch (error) {
            throw new Error(error.message)
        }
    else return [];
}

const ProblemsPage = async () => {

    const userData = await getUserProblems();
    const problems = userData?.user?.problems.filter(problem => problem.solved) || [];

    const categorizedByWeek = problems.reduce((acc, item) => {
        // Create an array for the current week if it doesn't exist
        acc[item.problemId.week] = acc[item.problemId.week] || [];
        // Push the item to the corresponding week array
        acc[item.problemId.week].push(item);
        return acc;
    }, {});


    return (
        <div className="flex flex-col gap-10">
            {
                Object.keys(categorizedByWeek).sort((a, b) => b - a).map((week) => {
                    return (
                        <div className="flex flex-col gap-2" key={week}>
                            <h1 className="font-bold text-2xl text-primary flex items-center">
                                <CalendarDays className="w-6 h-6 mr-2" />
                                Week {week}
                            </h1>
                            <div key={week} className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-2">
                                {
                                    categorizedByWeek[week].map(problem => {
                                        return (
                                            <Link key={problem?._id} href={`/problem/${problem?.problemId.title}`} className="h-full capitalize ">
                                                <Card className="h-full border hover:shadow-xl transition-shadow">
                                                    <CardHeader>
                                                        <CardTitle>{problem?.problemId.title}</CardTitle>
                                                    </CardHeader>
                                                    <CardContent className="flex gap-2">
                                                        {
                                                            problem?.problemId.topics.map((topic, index) => {
                                                                return (
                                                                    <Badge variant="secondary" key={index}>
                                                                        {topic}
                                                                    </Badge>
                                                                )
                                                            })
                                                        }


                                                        <Badge variant="default" className={`${problem?.problemId.difficulty === 'easy' ? 'bg-green-300 hover:bg-green-300/90' : problem.difficulty === 'medium' ? 'bg-blue-300 hover:bg-blue-300/90' : 'bg-red-300 hover:bg-red-300/90'} text-black ml-auto`}>
                                                            {problem?.problemId.difficulty}
                                                        </Badge>
                                                    </CardContent>
                                                    <CardContent>
                                                        {
                                                            problem?.solutions.length > 0 ?
                                                                problem?.solutions.map((solution, index) => (
                                                                    <p key={index} className="text-sm text-primary font-semibold">
                                                                        {solution.language}
                                                                    </p>
                                                                ))
                                                                :
                                                                null
                                                        }
                                                    </CardContent>
                                                    <CardFooter className="flex items-center justify-between mt-auto">
                                                        {/* {
                                                            isSolved ?
                                                                <Button variant="default" className="bg-blue-500 hover:bg-blue-500/90">
                                                                    <CheckCircle />
                                                                </Button>
                                                                :
                                                                <Button variant="destructive">
                                                                    <XCircle />
                                                                </Button>
                                                        } */}
                                                        {/* <Badge variant="outline" className={'py-1 px-4'}>
                                                            Week {problem?.problemId.week}
                                                        </Badge> */}

                                                        {
                                                            problem?.problemId?.link !== 'N/A' ?
                                                                <Button variant="link" className={'ml-auto py-1 px-4 flex items-center'}>
                                                                    <a href={problem?.problemId?.link} className="flex items-center">
                                                                        Go to Problem
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
