import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import ProblemsForm from '@/components/ProblemsForm';
import { ProblemsTable } from '@/components/ProblemsTable';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';

const getProblems = async () => {
    const session = await getServerSession(authOptions);
    if (session?.user && session?.user.role === 'admin')
        try {
            const res = await fetch(`${process.env.NEXTAUTH_URL}/api/problems/`, {
                next: { tags: ['fetchProblems'], revalidate: 3600 }
            })
            if (res.ok)
                return await res.json();
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
                    <Button variant="default" className="ml-auto">Add a Problem</Button>
                </DialogTrigger>
                <ProblemsForm />
            </Dialog>
            <ProblemsTable data={data?.problems || []} />
        </div>
    )
}

export default AddProblem
