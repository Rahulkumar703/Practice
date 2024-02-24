import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Home } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Error404 = () => {
    return (

        <Card className="shadow-xl">
            <CardHeader>
                <CardTitle>Opps! Page not found</CardTitle>
                <CardDescription>Looks like you lost in matrix.</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
                <Image src="/images/404.svg" alt="404" width={500} height={500} />
            </CardContent>
            <CardFooter className="flex flex-col gap-4 items-center justify-center">
                <p className='text-muted-foreground'>Let me drop you home</p>
                <Link href="/">
                    <Button variant="default" size="lg" className="flex items-center">
                        <Home className='w-4 h-4 mr-2' />
                        Home
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    )
}

export default Error404
