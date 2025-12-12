'use client';

import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from "@/components/ui/dialog";
import { subscribeUser } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormDescription,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "./ui/checkbox";
import Link from 'next/link';
// import { ShinyButton } from './ui/shiny-button';
import { ShimmerButton } from './ui/shimmer-button';

const FormSchema = z.object({
    email: z.string().email("Invalid email address"),
    terms: z.boolean().refine((val) => val === true, {
        message: "You must accept the terms and conditions",
    }),
});

export function SubscribeDialog() {
    const [open, setOpen] = useState(false);
    const { toast } = useToast();
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
            terms: false,
        },
    });

    async function onSubmit(values: z.infer<typeof FormSchema>) {
        try {
            const result = await subscribeUser(values.email);
            if (result.message === "Subscription successful") {
                toast({
                    title: "Subscription Successful!",
                    description: "Thank you for joining our newsletter.",
                });
                setOpen(false)
                form.reset()
            } else {
                toast({
                    title: "Error Subscribing",
                    description: result.message,
                    variant: "destructive",
                });
            }
        } catch (error) {
            console.error("Subscription error:", error);
            toast({
                title: "Error Subscribing",
                description: "Failed to subscribe. Please try again.",
                variant: "destructive",
            });
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {/* <ShinyButton className=" " >Subscribe</ShinyButton> */}
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
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Subscribe to our Newsletter</DialogTitle>
                    <DialogDescription>
                        Provide your email to get email notification when we launch
                        new products or publish new articles
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                                        <FormLabel>
                                            I agree to the <Link href="/Terms" className="text-blue-600 hover:text-blue-800">Terms and Conditions</Link>
                                        </FormLabel>
                                        <FormDescription>
                                            You must accept the terms to subscribe.
                                        </FormDescription>
                                    </div>
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button type="submit" className=" ">Subscribe</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
