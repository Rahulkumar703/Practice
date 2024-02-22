import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import Solution from "@/components/Solution";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Lock } from "lucide-react";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

const getProblem = async (title) => {
    // const session = await getServerSession(authOptions);

    // if (session?.user)
    try {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/problem/${title}`, {
            next: { tags: ['fetchProblem'], revalidate: 60 * 60 * 24 }
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

    const data = await getProblem(title);

    const session = await getServerSession(authOptions);


    return (
        data && data?.problem ?
            <Card>
                <CardHeader>
                    <CardTitle className="capitalize">{data?.problem?.title}</CardTitle>
                    <CardDescription className="capitalize space-x-2">
                        {
                            data?.problem?.topics.map((topic, index) => {
                                return (
                                    <Badge variant="outline" key={index}>
                                        {topic}
                                    </Badge>
                                )
                            })
                        }
                    </CardDescription>
                </CardHeader>
                <CardContent className="capitalize">
                    {data?.problem?.statement}
                    {
                        session?.user ?
                            <Solution />
                            :
                            <div className={'mt-5 w-full h-[500px] bg-secondary/30 rounded-lg flex flex-col items-center justify-center'}>
                                <Lock className="w-8 h-8 m-6 text-primary" />
                                <p className="text-primary">Login to use Code Editor</p>
                            </div>

                    }
                </CardContent>
            </Card>
            :
            <Card>
                <CardHeader>
                    <CardTitle>Opps! Problem not found</CardTitle>
                    <CardDescription>Looks like the Problem you are looking for is not in our database.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Card Content</p>
                </CardContent>
                <CardFooter>
                    <p>Card Footer</p>
                </CardFooter>
            </Card>

    )
}

export default page
