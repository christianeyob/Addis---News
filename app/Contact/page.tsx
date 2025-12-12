'use client'

import { saveContact} from '@/lib/actions';
import { z } from "zod";
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel } from "../../components/ui/form";
import { toast } from "../../components/ui/use-toast";  
import { useTransition } from 'react';


// Define a Zod schema for contact form validation
const FormSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }).max(50, { message: "Name must be less than 50 characters." }),
    email: z.string().email({ message: "Invalid email address." }),
    message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export default function ContactSection () {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isPending, startTransition] = useTransition();

    const form = useForm({
           resolver: zodResolver(FormSchema),
           defaultValues: {
               email: '',
               name: '',
               message: '',
           },
       });
   
       const handleSubmit = async (data: z.infer<typeof FormSchema>) => {
           const { email, name, message } = data;
           try {
               const result = await saveContact(email, name, message);
               if (result.message === 'Message successful') {
                   toast({
                       title: 'Successfully sent',
                       description: 'Thank you for joining our newsletter. You will receive updates on new articles.',
                   });
               } else {
                   toast({
                       title: 'Successfully sent',
                       description: result.message,
                   });
               }
           } catch (error) {
               console.error('Message error:', error);
               toast({
                   title: 'Error sent',
                   description: 'Failed to sent. Please try again.',
               });
           }
           form.reset(); // Reset form after submission
       };

    return (
        <div className=' w-full p-6'>
            <div className='flex flex-col gap-8 max-w-4xl mx-auto mt-24'>

            <div>
                <h3 className='text-2xl font-bold my-6'>Get in Touch</h3>
                <p className="text-md text-gray-500">We had love to hear from you! Leave a message below.</p>
            </div>
            <div className=''>
                <h4 className='text-2xl font-bold my-4'>Send a Message</h4>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className='flex flex-col  gap-4 mb-6 lg:w-4/5 '>
                        <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Message</FormLabel>
                                    <FormControl>
                                        <textarea
                                            className='p-6 h-64  border items-start flex w-full rounded-md bg-neutral-200 dark:bg-neutral-800'
                                            placeholder="Write your message here."
                                            {...field}
                                        />
                                    </FormControl>
                                    {/* <FormDescription>Write your message here.</FormDescription> */}
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

                        <Button type="submit" variant="outline"  disabled={isPending} className=" bg-transparent shadow-[0_0_20px_hsl(var(--primary)/30%)] w-fit rounded-full">
                            {isPending ? 'sending...' : 'Send Message'}
                        </Button>
                    </form>
                </Form>
            </div>
            </div>
        </div>
    );
};
