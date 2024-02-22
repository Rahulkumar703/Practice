'use client'
import { DrawerDescription, DrawerHeader, DrawerTitle, DrawerClose, DrawerFooter } from '@/components/ui/drawer'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "sonner"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import LoadingButton from '@/components/Button'
import { useState } from 'react'
import Link from 'next/link'
import { Label } from "@/components/ui/label"
import { Key, Mail, UserRound } from 'lucide-react'
import { Button } from './ui/button'

const LoginForm = () => {

    const params = useSearchParams();
    const query = params.get('q');

    const { data } = useSession()

    if (data) {
        return (
            <section className="mx-auto max-w-5xl w-full flex flex-col">

                <DrawerHeader>
                    <DrawerTitle className="capitalize">Hi, {data?.user.name}</DrawerTitle>
                    <DrawerDescription>You are logged in with <span className="font-semibold">{data?.user.email}</span></DrawerDescription>
                    <DrawerDescription>Are you sure want to logout?</DrawerDescription>
                </DrawerHeader>
                <DrawerFooter className={'flex-row-reverse justify-between'}>
                    <DrawerClose asChild>
                        <Button type="button" onClick={signOut}>Logout</Button>
                    </DrawerClose>
                </DrawerFooter>
            </section>
        )
    }

    return (
        <section className="mx-auto max-w-5xl w-full flex flex-col">
            {query === 'signup' ? <Signup /> : <Login />}
        </section>
    )
}





const Login = () => {

    const params = useSearchParams();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const loginFormSchema = z.object({
        email: z.string().min(1, {
            message: "Please enter your email.",
        }).email("This is not a valid email."),

        password: z.string().min(6, {
            message: "Password must be at least 6 characters.",
        }),
    })


    const loginForm = useForm({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    async function onSubmit(values) {
        try {
            setLoading(true);
            const res = await signIn('credentials', {
                redirect: false,
                email: values.email,
                password: values.password,
            })
            if (res.error) return toast.error(res.error)
            if (res.ok) {
                const callbackUrl = params.get("callbackUrl") || "/dashboard";
                router.replace(callbackUrl);
                router.refresh();
            }
        } catch (error) {
            toast.error(error.message)
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <Form {...loginForm}>
            <DrawerHeader>
                <DrawerTitle>Login</DrawerTitle>
                <DrawerDescription>Login to access dashboard</DrawerDescription>
            </DrawerHeader>
            <form onSubmit={loginForm.handleSubmit(onSubmit)} >
                <div className="w-full flex flex-col gap-4 max-w-md mx-auto p-6">
                    <FormField
                        control={loginForm.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-semibold flex gap-2 items-center"><Mail /> Email</FormLabel>
                                <FormDescription>
                                    Email will be used for login, password recovery and updates.
                                </FormDescription>
                                <FormControl>
                                    <Input
                                        disabled={loading} placeholder="devil@gmail.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex flex-col gap-4">
                        <FormField
                            control={loginForm.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-semibold flex gap-2 items-center"><Key />Password</FormLabel>
                                    <FormDescription>
                                        Enter your super secret password.
                                    </FormDescription>
                                    <FormControl>
                                        <Input
                                            disabled={loading} type="password" placeholder="Devil@123" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button asChild variant="link" className="ml-auto text-blue-600">
                            <Link href="/forgot-password">Forgot Password ?</Link>
                        </Button>
                    </div>
                    <section className='flex gap-2 items-center'>
                        <Label htmlFor="terms">Don't have an account ?</Label>
                        <Button type="button" variant="link" className=" text-blue-600" onClick={() => router.replace('/?q=signup')}>
                            Signup
                        </Button>
                    </section>
                </div>
                <DrawerFooter className={'flex-row-reverse justify-between'}>
                    <LoadingButton type="submit" disabled={loading}>Login</LoadingButton>
                    <DrawerClose asChild>
                        <Button type="reset" onClick={() => router.replace('/')} variant="outline" disabled={loading}>Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </form>
        </Form>
    )
}










const Signup = () => {

    const params = useSearchParams();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const signupFormSchema = z.object({
        name: z.string().min(3, {
            message: "Please enter your name.",
        }),
        username: z.string().min(3, {
            message: "Username must be at least 3 characters.",
        }),
        email: z.string().min(1, {
            message: "Please enter your email.",
        }).email("This is not a valid email."),
        password: z.string().min(6, {
            message: "Password must be at least 6 characters.",
        }),
    })


    const signupForm = useForm({
        resolver: zodResolver(signupFormSchema),
        defaultValues: {
            name: "",
            username: "",
            email: "",
            password: "",
        },
    })

    async function onSubmit(values) {
        try {
            setLoading(true);
            const resp = await fetch('/api/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });
            const data = await resp.json();
            toast[data.type](data.message)

            if (resp.ok) {
                const res = await signIn('credentials', {
                    redirect: false,
                    email: values.email,
                    password: values.password,
                })
                if (res.error) return toast.error(res.error)
                if (res.ok) {
                    const callbackUrl = params.get("callbackUrl") || "/dashboard";
                    router.replace(callbackUrl);
                    router.refresh();
                }
            }
        } catch (error) {
            toast.error(error.message)
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <Form {...signupForm}>
            <DrawerHeader>
                <DrawerTitle>Create an Account</DrawerTitle>
                <DrawerDescription>Join us for a monitored DSA Prepration.</DrawerDescription>
            </DrawerHeader>
            <form onSubmit={signupForm.handleSubmit(onSubmit)} >
                <div className="w-full flex flex-col gap-4 max-w-md mx-auto p-6">
                    <FormField
                        control={signupForm.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-semibold flex gap-2 items-center"><UserRound /> Name</FormLabel>
                                <FormDescription>
                                    Your pretty name
                                </FormDescription>
                                <FormControl>
                                    <Input
                                        disabled={loading} placeholder="dev" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={signupForm.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-semibold flex gap-2 items-center"><UserRound /> Username</FormLabel>
                                <FormDescription>
                                    Set a unique username
                                </FormDescription>
                                <FormControl>
                                    <Input
                                        disabled={loading} placeholder="dev_online" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={signupForm.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-semibold flex gap-2 items-center"><Mail /> Email</FormLabel>
                                <FormDescription>
                                    Email will be used for login, password recovery and updates.
                                </FormDescription>
                                <FormControl>
                                    <Input
                                        disabled={loading} placeholder="devil@gmail.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={signupForm.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-semibold flex gap-2 items-center"><Key />Password</FormLabel>
                                <FormDescription>
                                    Set a Strong and memorable Password.
                                </FormDescription>
                                <FormControl>
                                    <Input
                                        disabled={loading} type="password" placeholder="Devil@123" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <section className='flex gap-2 items-center'>
                        <Label htmlFor="terms">Already have an account ?</Label>
                        <Button type="button" variant="link" className=" text-blue-600" onClick={() => router.replace('/')}>
                            Login
                        </Button>
                    </section>
                </div>
                <DrawerFooter className={'flex-row-reverse justify-between'}>
                    <LoadingButton type="submit" disabled={loading}>Create Account</LoadingButton>
                    <DrawerClose asChild>
                        <Button type="reset" onClick={() => router.replace('/')} variant="outline" disabled={loading}>Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </form>
        </Form>
    )
}


export default LoginForm
