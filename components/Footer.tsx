"use client"
import Link from "next/link"
import { z } from "zod"
import { toast } from "./ui/use-toast"
import { Checkbox } from "./ui/checkbox"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormDescription,
} from "./ui/form"
import { subscribeUser } from "@/lib/actions"
import { Input } from "./ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
// import { ShinyButton } from "./ui/shiny-button"
import { ShimmerButton } from "./ui/shimmer-button"
const FormSchema = z.object({
    email: z.string().email("Invalid email address"),
    terms: z.boolean().refine((val) => val === true, {
        message: "You must accept the terms and conditions",
    }),
})

export default function Footer() {
    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: '',
            terms: false,
        },
    })

    const handleSubmit = async (data: z.infer<typeof FormSchema>) => {
        const { email } = data;
        try {
            const result = await subscribeUser(email);
            if (result.message === 'Subscription successful') {
                toast({
                    title: 'Subscription Successful!',
                    description: 'Thank you for joining our newsletter. You will receive updates on new articles.',
                });
            } else {
                toast({
                    title: 'Error Subscribing',
                    description: result.message,
                });
            }
        } catch (error) {
            console.error('Subscription error:', error);
            toast({
                title: 'Error Subscribing',
                description: 'Failed to subscribe. Please try again.',
            });
        }
        form.reset(); // Reset form after submission
    };

    return (
        <div className="bg-white dark:bg-zinc-950 flex flex-col justify-center items-center p-6">
            <div className="flex flex-col lg:flex-row justify-center  w-full max-w-7xl py-6 mb-2 border-b   border-opacity-20">
                <div className="flex flex-col md:grid md:grid-cols-3   gap-6 w-full">
                    <Link href="/" className="">
                        <div className="flex gap-2 w-full h-8">
                            <div className="bg-black flex justify-center items-center dark:bg-white rounded-md px-2 w-10 h-10">
                                <p className="text-white dark:text-black text-3xl font-bold">A</p>
                            </div>
                            <h1 className="text-4xl font-bold">Addis</h1>
                        </div>
                    </Link>
                    <div className="w-full flex flex-col">
                        <h1 className="text-xl font-bold mb-4">Categories</h1>
                        <ul className="text-md font-bold flex flex-col gap-2">
                            <li><Link href="/category/Science">Science</Link></li>
                            <li><Link href="/category/Health">Health</Link></li>
                            <li><Link href="/category/Politics">Politics</Link></li>
                            <li><Link href="/category/Business">Business</Link></li>
                        </ul>
                    </div>
                    <div className="w-full flex flex-col ">
                        <h1 className="text-xl font-bold mb-4">Helpful Link</h1>
                        <ul className="text-md font-bold flex flex-col gap-2">
                            <li><Link href="/">Home</Link></li>
                            <li><Link href="/About">About</Link></li>
                            <li><Link href="/Contact">Contact</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col gap-3 mt-6 lg:mt-0">
                    <h1 className="text-xl font-bold mb-4 lg:mb-2">Subscribe</h1>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem >
                                        <FormControl>
                                            <Input
                                                className=" md:w-1/2 lg:w-full border rounded-full focus:outline-none focus:ring focus:ring-neutral-100 focus:border-neutral-300 dark:text-white dark:placeholder-neutral-400 dark:border-neutral-600 dark:focus:ring-neutral-900 dark:focus:border-stone-500"
                                                type="email"
                                                placeholder="Enter your email address"
                                                {...field}
                                            />
                                        </FormControl>
                                        {/* <ShinyButton className="">Subscribe</ShinyButton>
                                         */}
                                        <ShimmerButton 
                                                            shimmerColor="rgba(255, 255, 255, 0.9)"          // bright, works on both
                                                            background="linear-gradient(135deg, #3b82f6, #a855f7)" // blue → purple
                                                            
                                                            shimmerDuration="3s"
                                                            shimmerSize="2em"
                                                            borderRadius="999px" 
                                                            className="shadow-2xl">
                                                            <span className="whitespace-pre-wrap text-center text-xs font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                                                                Subscribe
                                                            </span>
                                                        </ShimmerButton>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="terms"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0  ">
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <div className="space-y-1 leading-none text-xs">
                                            <FormLabel className="test-xs">
                                                I agree to the <Link href="/Terms" className="text-xs text-blue-600 hover:text-blue-800">Terms and Conditions</Link>
                                            </FormLabel>
                                            <FormDescription className="test-xs">
                                                You must accept the terms to subscribe.
                                            </FormDescription>
                                        </div>
                                    </FormItem>
                                )}
                            />
                        </form>
                    </Form>
                    {/* <p className="text-xs">© Copyright 2024 Lorem Inc. All rights reserved.</p> */}
                </div>
            </div>
            <p className="text-xs py-2">© Copyright 2025 Addis News. All rights reserved.</p>

        </div>
    )
}

