import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { UsersTable } from '@/components/UsersTable';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';

const getUsers = async () => {
    'use server'
    const session = await getServerSession(authOptions);
    if (session?.user && session?.user.role === 'admin')
        try {
            const res = await fetch(`${process.env.NEXTAUTH_URL}/api/users/`, {
                cache: 'no-store'
            })
            if (res.ok) {
                return await res.json();
            }
        } catch (error) {
            throw new Error(error.message)
        }
    else notFound();
}

const Users = async () => {

    const data = await getUsers();

    return (
        <div className='flex flex-col'>
            <UsersTable data={data?.users || []} />
        </div>
    )
}

export default Users
