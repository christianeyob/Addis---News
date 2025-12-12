'use client';

import { z } from "zod";
import { toast } from "./ui/use-toast";
import { ShimmerButton } from './ui/shimmer-button';
import { Checkbox } from "./ui/checkbox";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormDescription,
} from "./ui/form";
import { subscribeUser } from "@/lib/actions";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import WarpBackground from "./ui/warp";
import Link from "next/link";

const FormSchema = z.object({
    email: z.string().email("Invalid email address"),
    terms: z.boolean().refine((val) => val === true, {
        message: "You must accept the terms and conditions",
    }),
});

export default function Subscribe() {
    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: '',
            terms: false,
        },
    });

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
        <div className="flex h-full justify-center items-center my-8 ">
            <div className="p-8 rounded-xl">
                <WarpBackground >
                    <div
                        className="shadow-[0_0_60px_rgb(59_130_246_/_0.3)]  flex flex-wrap items-center w-full max-w-5xl p-5 mx-auto text-left border   lg:flex-nowrap md:p-8  backdrop-blur-md">
                        <div className="flex-1 w-full mb-5 md:mb-0 md:pr-5 lg:pr-10 md:w-1/2">
                            <h3 className="mb-2 text-2xl font-bold text-black dark:text-white">Subscribe to Newsletter</h3>
                            <p className="text-black dark:text-white ">Provide your email to get email notification when we launch
                                new
                                products or publish new articles
                            </p>
                        </div>
                        <div className="w-full px-1 flex-0 md:w-auto lg:w-1/2">
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem >
                                                <FormControl>
                                                    <Input
                                                        className="border rounded-full focus:outline-none focus:ring focus:ring-neutral-100 focus:border-neutral-300 dark:text-white dark:placeholder-neutral-400 dark:border-neutral-600 dark:focus:ring-neutral-900 dark:focus:border-stone-500"
                                                        type="email"
                                                        placeholder="Enter your email address"
                                                        {...field}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="terms"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 w-full ">
                                                <FormControl>
                                                    <Checkbox
                                                        checked={field.value}
                                                        onCheckedChange={field.onChange}
                                                    />
                                                </FormControl>
                                                <div className="space-y-2 leading-none">
                                                I agree to the <Link href="/Terms" className="text-blue-600 hover:text-blue-800">Terms and Conditions</Link>
                                                    <FormDescription>
                                                        You must accept the terms to subscribe.
                                                    </FormDescription>
                                                    {/* <Link href="/terms-and-conditions" className="text-blue-600 hover:text-blue-800">
                                                        View Terms and Conditions
                                                    </Link> */}
                                                </div>
                                            </FormItem>
                                        )}
                                    />
                                    <FormItem>
                                        <FormControl>
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
                                            {/* <Button variant="outline" className=" bg-transparent shadow-[0_0_20px_hsl(var(--primary)/30%)]" type="submit">Subscribe</Button> */}
                                        </FormControl>
                                    </FormItem>
                                </form>
                            </Form>
                        </div>
                    </div>
                </WarpBackground>
            </div>
        </div>
    );
}
