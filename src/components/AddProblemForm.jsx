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
import { Badge } from './ui/badge';
import { Send, SendHorizonal, X } from 'lucide-react';

const AddProblemForm = () => {
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
        link: z.string().min(3, {
            message: "link should have atleast 3 characters",
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
            link: "N/A",
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
            const data = await res.json();

            toast[data.type](data.message)

        } catch (error) {
            console.log(error);
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
                                            <Textarea className="resize-none"
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
                                                    <Badge variant="default" className={`capitalize bg-green-300 font-semibold hover:bg-green-300/90 text-black ml-auto`}>
                                                        <FormLabel>
                                                            Easy
                                                        </FormLabel>
                                                    </Badge>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="medium" />
                                                    </FormControl>
                                                    <Badge variant="default" className={`capitalize bg-blue-300 font-semibold hover:bg-blue-300/90 text-black ml-auto`}>
                                                        <FormLabel>
                                                            Medium
                                                        </FormLabel>
                                                    </Badge>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="hard" />
                                                    </FormControl>
                                                    <Badge variant="default" className={`capitalize bg-red-300 font-semibold hover:bg-red-300/90 text-black ml-auto`}>
                                                        <FormLabel>
                                                            Hard
                                                        </FormLabel>
                                                    </Badge>
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
                        <div className="flex flex-col gap-4">
                            <FormField
                                control={loginForm.control}
                                name="link"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-semibold flex gap-2 items-center">Problem Link</FormLabel>
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
                                    <X className="w-4 h-4 mr-2" />
                                    Close
                                </Button>
                            </DialogClose>
                            <LoadingButton disabled={loading} className="flex-1">
                                Submit
                                <SendHorizonal className="w-4 h-4 ml-2" />
                            </LoadingButton>
                        </DialogFooter>
                    </div>
                </form>
            </Form>

        </DialogContent >
    )
}

export default AddProblemForm
