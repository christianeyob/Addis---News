"use client"
import Link from "next/link"
import { z } from "zod"
import { toast } from "./ui/use-toast"
import { Button } from "./ui/button"
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
const FormSchema = z.object({
    email: z.string().email("Invalid email address"),
    terms: z.boolean().refine((val) => val === true, {
        message: "You must accept the terms and conditions",
    }),
})

export default function SubscribeCard() {
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
        form.reset()
    };

    return (
        <div className="flex flex-col justify-center gap-3 mt-6 lg:mt-0 items-center">
        <h2 className="lg:text-3xl text-lg font-bold text-center md:text-2xl">Sign up for our</h2>
        <h2 className="lg:text-3xl text-lg font-bold text-center md:text-2xl md:mb-2">newsletter</h2>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 flex flex-col justify-center items-center">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem className="flex flex-col justify-center items-center">
                            <FormControl className="flex flex-col justify-center items-center">
                                <Input
                                    className="items-center max-w-sm border rounded-full focus:outline-none focus:ring focus:ring-neutral-100 focus:border-neutral-300 dark:text-white dark:placeholder-neutral-400 dark:border-neutral-600 dark:focus:ring-neutral-900 dark:focus:border-stone-500"
                                    type="email"
                                    placeholder="Enter your email address"
                                    {...field}
                                />
                            </FormControl>
                            <Button variant="default" type="submit" className="w-fit items-center   shadow-[0_0_20px_hsl(var(--primary)/30%)]">Subscribe</Button>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="terms"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-3 space-y-0"> {/* Align items-center here */}
                            <FormControl>
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                                <FormLabel>
                                    I agree to the <Link href="/terms" className="text-blue-600 hover:text-blue-800">Terms and Conditions</Link>
                                </FormLabel>
                                <FormDescription>
                                    You must accept the terms to subscribe.
                                </FormDescription>
                            </div>
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    </div>
               
    )
}

