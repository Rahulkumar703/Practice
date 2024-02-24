import Link from 'next/link'

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Code2, Users } from 'lucide-react'

const page = () => {
    return (
        <div className='grid sm:grid-cols-2 place-items-center gap-5'>
            <Link href={'admin/problems'} className='w-full h-full' >
                <Card className='h-full border hover:shadow-xl transition-shadow' >
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Code2 className="w-6 h-6 mr-2" />
                            All Problems
                        </CardTitle>
                        <CardDescription>Manage all the Problems.</CardDescription>
                    </CardHeader>
                </Card>
            </Link>
            <Link href={'admin/users'} className='w-full h-full' >
                <Card className='h-full border hover:shadow-xl transition-shadow' >
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Users className="w-6 h-6 mr-2" />
                            All Users
                        </CardTitle>
                        <CardDescription>Manage all the Problems.</CardDescription>
                    </CardHeader>
                </Card>
            </Link>
        </div>
    )
}

export default page
