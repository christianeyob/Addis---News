'use client';

import { useTransition } from 'react';
import { format } from 'date-fns';
import { z } from "zod";
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { Comment } from '@/lib/type';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
   
} from "./ui/form";
import { toast } from "./ui/use-toast"

interface CommentSectionProps {
    initialComments: Comment[];
    submitComment: (formData: FormData) => Promise<void>;
    articleId: number;
}


const FormSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }).max(50, { message: "Name must be less than 50 characters." }),
    email: z.string().email({ message: "Invalid email address." }),
    content: z.string().min(10, { message: "Comment must be at least 10 characters." }),
});

export const CommentSection = ({ initialComments, submitComment, articleId }: CommentSectionProps) => {
    const [isPending, startTransition] = useTransition();
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: '',
            email: '',
            content: '',
        },
    });

    const handleSubmit = async (data: z.infer<typeof FormSchema>) => {
        try {
            const formData = new FormData();
            formData.append('name', data.name);
            formData.append('email', data.email);
            formData.append('content', data.content);
            formData.append('articleId', String(articleId));

            startTransition(async () => {
                await submitComment(formData);
                form.reset();
                toast({
                    title: "Comment Posted",
                    description: "Your comment has been submitted!",
                });
            });
        } catch (error) {
            console.error("Form submission error:", error);
            toast({
                
                title: "Error Posting Comment",
                description: "Failed to submit comment. Please try again.",
                variant: "destructive", 
            });
        }
    };

    return (
        <div className='flex flex-col gap-8'>
            <div>
                <h3 className='text-2xl font-bold my-6'>Comments</h3>
                {initialComments.length === 0 ? (
                    <p className="text-md text-gray-500">No comments yet. Be the first to leave a comment!</p>
                ) : (
                    initialComments.map((comment) => (
                        <div key={comment.id} className='flex flex-col border-l-4 border-neutral-400 dark:border-neutral-800 rounded p-4 w-fit mb-4 mx-8'>
                            <h1 className='text-sm mb-2'>By {comment.name}</h1>
                            <p className='text-md mb-1 text-neutral-600'>{comment.content}</p>
                            <small className='text-xs'>
                                {format(new Date(comment.createdAt), 'MMMM dd, yyyy hh:mm a')}
                            </small>
                        </div>
                    ))
                )}
            </div>
            <div className=''>
                <h4 className='text-2xl font-bold my-4'>Leave a Comment</h4>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className='flex flex-col  gap-4 mb-6 lg:w-4/5 '>
                        <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Comment</FormLabel>
                                    <FormControl>
                                        <textarea
                                            className='p-6 h-64  border items-start flex w-full rounded-md bg-neutral-200 dark:bg-neutral-800'
                                            placeholder="Write your comment here."
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <div className='flex gap-6'>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                className="p-2 border rounded-md bg-neutral-200 dark:bg-neutral-800"
                                                type="text"
                                                placeholder="Full Name"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                className="p-2 border rounded-md bg-neutral-200 dark:bg-neutral-800"
                                                type="email"
                                                placeholder="Email"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button type="submit" variant="outline"  disabled={isPending}className=" bg-transparent shadow-[0_0_20px_hsl(var(--primary)/30%)] w-fit rounded-full">
                            {isPending ? 'commenting...' : 'Post comment'}
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
};
