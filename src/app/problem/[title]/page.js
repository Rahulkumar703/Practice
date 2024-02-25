import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import Solution from "@/components/Solution";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRightFromSquare, Lock } from "lucide-react";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

const getProblemAndUserSolution = async (title) => {
    'use server'
    const session = await getServerSession(authOptions);

    // if (session?.user)
    try {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/problem/${title}${session?.user ? `?user=${session?.user.id}` : ''}`, {
            cache: 'no-store',
        })
        if (res.ok)
            return await res.json();
    } catch (error) {
        throw new Error(error.message)
    }
    // else notFound();
}

const page = async ({ params }) => {

    const title = decodeURI(params.title);

    const data = await getProblemAndUserSolution(title);

    const session = await getServerSession(authOptions);

    return (
        data && data?.problem ?
            <Card>
                <CardHeader>
                    <CardTitle >
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <a href={data?.problem?.link} target="_blank" className="flex items-center capitalize">
                                        {data?.problem?.title}
                                        <ArrowUpRightFromSquare className="w-4 h-4 ml-2 font-bold" />
                                    </a>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Code on external website</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>

                    </CardTitle>
                    <CardDescription className="capitalize flex justify-between gap-2">
                        {
                            data?.problem?.topics.map((topic, index) => {
                                return (
                                    <Badge variant="default" key={index}>
                                        {topic}
                                    </Badge>
                                )
                            })
                        }

                        <Badge variant="default" className={`${data?.problem.difficulty === 'easy' ? 'bg-green-300 hover:bg-green-300/90' : data?.problem.difficulty === 'medium' ? 'bg-blue-300 hover:bg-blue-300/90' : 'bg-red-300 hover:bg-red-300/90'} text-black ml-auto`}>
                            {data?.problem.difficulty}
                        </Badge>
                    </CardDescription>
                </CardHeader>
                <CardContent className="capitalize">
                    {data?.problem?.statement}
                    {
                        session?.user ?
                            <Solution problemId={data.problem._id} userSolutions={data.problem?.userSolutions} isSolved={data.problem?.isSolved} />
                            :
                            <div className={'mt-5 w-full h-[500px] bg-secondary/30 rounded-lg flex flex-col items-center justify-center'}>
                                <Lock className="w-8 h-8 m-6 text-primary" />
                                <p className="text-primary">Login to use Code Editor</p>
                            </div>

                    }
                </CardContent>
            </Card>
            :
            notFound()

    )
}

export default page
