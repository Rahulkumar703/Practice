import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import AddProblemForm from '@/components/AddProblemForm';
import { ProblemsTable } from '@/components/ProblemsTable';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';

const getProblems = async () => {
    'use server'
    const session = await getServerSession(authOptions);
    if (session?.user && session?.user.role === 'admin')
        try {
            const res = await fetch(`${process.env.NEXTAUTH_URL}/api/problems/`, {
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

const AddProblem = async () => {

    const data = await getProblems();

    return (
        <div className='flex flex-col'>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="default" className="ml-auto">
                        <Plus className='w-4 h-4 mr-2' />
                        Add new Problem
                    </Button>
                </DialogTrigger>
                <AddProblemForm />
            </Dialog>
            <ProblemsTable data={data?.problems || []} />
        </div>
    )
}

export default AddProblem
