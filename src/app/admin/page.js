import Link from 'next/link'
import React from 'react'

const page = () => {
    return (
        <div className='grid sm:grid-cols-2 place-items-center gap-5'>
            <Link href={'admin/problems'} className='p-2 py-10 rounded-lg bg-violet-400 w-full text-center hover:shadow-xl text-2xl'>Problems</Link>
            <Link href={'admin/users'} className='p-2 py-10 rounded-lg bg-violet-400 w-full text-center hover:shadow-xl text-2xl'>Users</Link>
        </div>
    )
}

export default page
