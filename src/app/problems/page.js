import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import { notFound } from "next/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const getProblems = async () => {
    // const session = await getServerSession(authOptions);

    // if (session?.user)
    try {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/problems`, {
            next: { tags: ['fetchProblems'], revalidate: 1 }
        })
        if (res.ok)
            return await res.json();
    } catch (error) {
        throw new Error(error.message)
    }
}

const getUserProblems = async () => {
    const session = await getServerSession(authOptions);

    if (session?.user)
        try {
            const res = await fetch(`${process.env.NEXTAUTH_URL}/api/user/${session?.user?.id}`, {
                next: { tags: ['fetchUser'], revalidate: 1 }
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

    const problemsData = await getProblems();
    const userData = await getUserProblems();
    const problems = problemsData?.problems || [];

    return (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-2">
            {
                problems && problems.map(problem => {
                    const isSolved = userData?.user?.problems?.some(userProblems => userProblems.problemId === problem._id && userProblems.solveds)
                    return (
                        <Link key={problem?._id} href={`/problem/${problem.title}`} className="h-full capitalize">
                            <Card className="h-full bg-secondary/30">
                                <CardHeader>
                                    <CardTitle>{problem.title}</CardTitle>
                                    <CardDescription className="flex gap-2">
                                        {
                                            problem?.topics.map((topic, index) => {
                                                return (
                                                    <Badge variant="secondary" key={index}>
                                                        {topic}
                                                    </Badge>
                                                )
                                            })
                                        }

                                        <Badge variant="default" className={`${problem.difficulty === 'easy' ? 'bg-green-300' : problem.difficulty === 'medium' ? 'bg-blue-300' : 'bg-red-300'} text-black ml-auto`}>
                                            {problem.difficulty}
                                        </Badge>
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {problem.statement}
                                </CardContent>
                                <CardFooter className="flex items-center justify-between">
                                    {
                                        isSolved ?
                                            <Button variant="default" className="bg-blue-500 hover:bg-blue-500/90">
                                                <CheckCircle />
                                            </Button>
                                            :
                                            <Button variant="destructive">
                                                <XCircle />
                                            </Button>
                                    }
                                    <Badge variant="outline" className={'py-1 px-4'}>
                                        Week {problem.week}
                                    </Badge>
                                </CardFooter>
                            </Card>
                        </Link>
                    )
                })
            }
        </div>
    )
}

export default ProblemsPage
