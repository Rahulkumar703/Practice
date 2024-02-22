'use client'
import LoadingButton from '@/components/Button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { toast } from 'sonner';
import { revalidateTag } from 'next/cache';

const ProblemsForm = () => {
    const [loading, setLoading] = useState(false);

    const loginFormSchema = z.object({
        title: z.string().min(3, {
            message: "Please enter Problem Title.",
        }),

        statement: z.string().min(6, {
            message: "Problem statement is too short",
        }),
        difficulty: z.enum(['easy', 'medium', 'hard']),
        week: z.string().min(1, {
            message: "Please Enter Week Number",
        }),
        companies: z.string().min(3, {
            message: "Company name should have atleast 3 characters",
        }).optional(),
        topics: z.string().min(3, {
            message: "Topic name should have atleast 3 characters",
        }),
    })


    const loginForm = useForm({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            title: "",
            statement: "",
            difficulty: "easy",
            week: "",
            companies: "N/A",
            topics: "",
        },
    })

    async function onSubmit(values) {
        try {
            setLoading(true);

            const res = await fetch('/api/problem', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),

            })

            if (res.ok) revalidateTag('fetchProblems');

            const data = await res.json();

            toast[data.type](data.message)

        } catch (error) {
            toast.error(error.message)
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Add a new Problem</DialogTitle>
            </DialogHeader>
            <Form {...loginForm}>
                <form onSubmit={loginForm.handleSubmit(onSubmit)} >
                    <div className="w-full flex flex-col gap-4 max-w-md mx-auto p-6">
                        <FormField
                            control={loginForm.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-semibold flex gap-2 items-center">Problem Title</FormLabel>
                                    <FormControl>
                                        <Input type="text" disabled={loading} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex flex-col gap-4">
                            <FormField
                                control={loginForm.control}
                                name="statement"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-semibold flex gap-2 items-center">Problem Statement</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                disabled={loading} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex flex-col gap-4">
                            <FormField
                                control={loginForm.control}
                                name="difficulty"
                                render={({ field }) => (
                                    <FormItem className="space-y-3">
                                        <FormLabel className="font-semibold flex gap-2 items-center">Problem Difficulty</FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                className="flex gap-4 items-center space-y-1"
                                            >
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="easy" />
                                                    </FormControl>
                                                    <FormLabel className="flex gap-2 items-center text-green-300 font-semibold">
                                                        Easy
                                                    </FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="medium" />
                                                    </FormControl>
                                                    <FormLabel className="flex gap-2 items-center text-blue-300 font-semibold">
                                                        Medium
                                                    </FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="hard" />
                                                    </FormControl>
                                                    <FormLabel className="flex gap-2 items-center text-red-300 font-semibold">
                                                        Hard
                                                    </FormLabel>
                                                </FormItem>
                                            </RadioGroup>
                                        </FormControl>
                                    </FormItem>
                                )} />
                        </div>
                        <div className="flex flex-col gap-4">
                            <FormField
                                control={loginForm.control}
                                name="week"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-semibold flex gap-2 items-center">Week Number</FormLabel>
                                        <FormControl>
                                            <Input type="number"
                                                disabled={loading} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex flex-col gap-4">
                            <FormField
                                control={loginForm.control}
                                name="companies"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-semibold flex gap-2 items-center">Asked in Companies</FormLabel>
                                        <FormControl>
                                            <Input type="text"
                                                disabled={loading} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex flex-col gap-4">
                            <FormField
                                control={loginForm.control}
                                name="topics"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-semibold flex gap-2 items-center">Topics</FormLabel>
                                        <FormControl>
                                            <Input type="text"
                                                disabled={loading} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <DialogFooter className="sm:justify-start gap-2">
                            <DialogClose asChild>
                                <Button type="button" variant="secondary">
                                    Close
                                </Button>
                            </DialogClose>
                            <LoadingButton disabled={loading} className="flex-1">Submit</LoadingButton>
                        </DialogFooter>
                    </div>
                </form>
            </Form>

        </DialogContent >
    )
}

export default ProblemsForm
