import Image from "next/image";
import { Article } from "@/lib/type";
import { format } from "date-fns";
import { Comment } from "@/lib/type";
import { fetchArticlesByCategory } from "@/lib/actions";
import Link from "next/link";
import { CardStack } from "@/components/ui/card-stack";
import { CommentSection } from "@/components/comment";
import { Separator } from '../../../components/ui/separetor';
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import SubscribeCard from "@/components/subscribeCard";

const cleanArticleContent = (text: string): string => {
    const unwantedPatterns = [
        /Save my name, email, and website in this browser for the next time I comment\./gi,
        /Δdocument\.getElementById\("ak_js_\d+"\)\.setAttribute\("value",\(new Date\(\)\)\.getTime\(\)\)/gi,
        /<img[^>]*>/gi,
        /<script[^>]*>.*?<\/script>/gi,
        /<style[^>]*>.*?<\/style>/gi,
        /<!--.*?-->/gs,
        /<[^>]+>/g,
    ];

    let cleanedText = text;
    unwantedPatterns.forEach(pattern => {
        cleanedText = cleanedText.replace(pattern, '');
    });

    return cleanedText.trim();
};

export default async function ArticleDetail({ article }: { article: Article }) {
    const convertNewlinesToBr = (text: string): JSX.Element[] => {
        return text.split('\n').map((line, index) => (
            <span key={index}>
                {line}
                <br />
                <br />
            </span>
        ));
    };

    const cleanedContent = cleanArticleContent(article.content);
    const currentCategory = article.categories[0]?.category.name;
    const relatedArticles = await fetchArticlesByCategory(currentCategory);
    const women = await fetchArticlesByCategory("Art");
    const event = await fetchArticlesByCategory("Addis Events");
    const society = await fetchArticlesByCategory("Society");

    // Map movie articles to the Card type
    const events = event.slice(0, 4).map((article) => ({
        id: article.id,
        title: article.title,
        author: article.author,
        name: article.title,
        imageUrl: article.imageUrl,
        category: article.categories[0]?.category.name || "Category",
        content: article.content, // Adjust this as needed
    }));

    const comments: Comment[] = await prisma.comment.findMany({
        where: { articleId: article.id },
        orderBy: { createdAt: 'desc' },
        select: {  // Select only the fields that exist in your Comment type
            id: true,
            name: true,
            email: true,
            content: true,
            articleId: true,
            createdAt: true,
        },
    });
    async function submitComment(formData: FormData) {
        'use server'
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const content = formData.get('content') as string;

        await prisma.comment.create({
            data: {
                name,
                email,
                content,
                articleId: article.id
                
            }
        });

        revalidatePath(`/Detaile/${article.id}`);
    }
    const socialLinks = [
        {
            name: 'Twitter',
            url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(`https://yourwebsite.com/article/${article.id}`)}`,
            icon: (
                <svg
                    className="h-4 text-stone-500"
                    fill="currentColor"
                    role="img"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <title>Twitter</title>
                    <path
                        d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"
                    />
                </svg>
            ),
        },
        {
            name: 'LinkedIn',
            url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://yourwebsite.com/article/${article.id}`)}`,
            icon: (
                <svg
                    className="h-4 text-stone-500"
                    fill="currentColor"
                    role="img"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <title>LinkedIn</title>
                    <path
                        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                    />
                </svg>
            ),
        },
        {
            name: 'Mastodon',
            url: `https://mastodon.social/share?url=${encodeURIComponent(`https://yourwebsite.com/article/${article.id}`)}`,
            icon: (
                <svg
                    className="h-4 text-stone-500"
                    fill="currentColor"
                    role="img"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <title>Mastodon</title>
                    <path
                        d="M23.268 5.313c-.35-2.578-2.617-4.61-5.304-5.004C17.51.242 15.792 0 11.813 0h-.03c-3.98 0-4.835.242-5.288.309C3.882.692 1.496 2.518.917 5.127.64 6.412.61 7.837.661 9.143c.074 1.874.088 3.745.26 5.611.118 1.24.325 2.47.62 3.68.55 2.237 2.777 4.098 4.96 4.857 2.336.792 4.849.923 7.256.38.265-.061.527-.132.786-.213.585-.184 1.27-.39 1.774-.753a.057.057 0 0 0 .023-.043v-1.809a.052.052 0 0 0-.02-.041.053.053 0 0 0-.046-.01 20.282 20.282 0 0 1-4.709.545c-2.73 0-3.463-1.284-3.674-1.818a5.593 5.593 0 0 1-.319-1.433.053.053 0 0 1 .066-.054c1.517.363 3.072.546 4.632.546.376 0 .75 0 1.125-.01 1.57-.044 3.224-.124 4.768-.422.038-.008.077-.015.11-.024 2.435-.464 4.753-1.92 4.989-5.604.008-.145.03-1.52.03-1.67.002-.512.167-3.63-.024-5.545zm-3.748 9.195h-2.561V8.29c0-1.309-.55-1.976-1.67-1.976-1.23 0-1.846.79-1.846 2.35v3.403h-2.546V8.663c0-1.56-.617-2.35-1.848-2.35-1.112 0-1.668.668-1.67 1.977v6.218H4.822V8.102c0-1.31.337-2.35 1.011-3.12.696-.77 1.608-1.164 2.74-1.164 1.311 0 2.302.5 2.962 1.498l.638 1.06.638-1.06c.66-.999 1.65-1.498 2.96-1.498 1.13 0 2.043.395 2.74 1.164.675.77 1.012 1.81 1.012 3.12z"
                    />
                </svg>
            ),
        },
        {
            name: 'Facebook',
            url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://yourwebsite.com/article/${article.id}`)}`,
            icon: (
                <svg
                    className="h-4 text-stone-500"
                    fill="currentColor"
                    role="img"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <title>Facebook</title>
                    <path
                        d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                    />
                </svg>
            ),
        },
    ];


    return (
        <div className="flex flex-col w-full justify-center items-center mt-20 mx-auto max-w-7xl h-full p-6">
            <div className="grid grid-cols-1 w-full h-full gap-10">
                <div className="flex flex-col items-center gap-4 z-10">
                    <div className="w-full relative flex flex-col">
                        <div className="grid grid-cols-1 md:grid-cols-3 w-full  gap-4 overflow-hidden ">
                            <div className="w-full md:col-span-2">
                                <div className="flex flex-wrap md:justify-between items-center space-x-4">
                                    <h1 className="text-md font-semibold text-red-600">
                                        {article.categories.map(({ category }) => (
                                            <span key={category.name} className="mx-1 ">
                                                {category.name}
                                            </span>
                                        ))}
                                    </h1>
                                    <p className="text-sm text-center text-stone-500 ">{format(new Date(article.date ?? ""), 'MMMM dd, yyyy')}</p>
                                </div>
                                <h1 className="text-2xl lg:text-4xl max-w-4xl font-extrabold mb-4 my-1">{article.title}</h1>
                                <Image
                                    src={article.imageUrl ?? ""}
                                    className="rounded-md h-[240px] md:h-[380px] lg:h-[500px] w-full"
                                    alt="Politic"
                                    width={800}
                                    height={200}
                                />
                            </div>

                            <div className="relative hidden  md:block overflow-hidden   flex flex-col item-end  gap-4 p-2 md:pt-16 ">
                                <div className="relative flex flex-col md:gap-8  absolute bottom-0">
                                    <CardStack
                                        items={events} // Pass the mapped movie cards
                                        offset={16}
                                        scaleFactor={0.06}
                                    />
                                    <SubscribeCard />
                                </div>
                            </div>
                        </div>
                        <div className="relative grid grid-cols-1 md:grid-cols-3 w-full text-md text-black/90 dark:text-white/90 ">
                            <div className="w-full md:col-span-2 mb-6">
                                <section className="flex justify-between  md:mx-6 my-2">
                                    <div className="flex gap-2 items-center">
                                        <h1 className="text-sm text-stone-600 font-semibold">By</h1>
                                        <p className="text-sm text-center text-stone-500 font-semibold">{article.author}</p>
                                    </div>
                                    <div className="max-w-sm flex items-center gap-1 justify-around text-center">
                                        <p className="text-sm text-stone-500">Share :</p>
                                        <ul className="flex flex-row gap-2 items-center justify-center text-center">
                                            {socialLinks.map((link, index) => (
                                                <li key={index}>
                                                    <Link
                                                        href={link.url}
                                                        target="_blank"
                                                        aria-label={`Share on ${link.name}`}
                                                        rel="noopener noreferrer"
                                                    >
                                                        {link.icon}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                </section>
                                <p className="text-md text-black dark:text-white">{convertNewlinesToBr(cleanedContent)}</p>
                                <CommentSection
                                    initialComments={comments}
                                    submitComment={submitComment}
                                    articleId={article.id} />
                            </div>
                            <div className="flex flex-col w-full mt-6">
                                <Separator
                                    label={
                                        <div className=" text-sm px-2 py-1 my-2 rounded-full ">
                                            Top Stories
                                        </div>
                                    }
                                    gradient
                                    className=''
                                />
                                {society.slice(0, 6).map((article) => (
                                    <Link href={`/Detaile/${article.id}/`} key={article.id} className="flex flex-col items-center w-full p-2 mb-2">
                                        <div className="grid grid-cols-3 gap-1 place-items-start overflow-hidden">
                                            <Image
                                                src={article.imageUrl ?? ""}
                                                className="w-full h-20 md:h-16  lg:h-20 hover:scale-110 duration-500 rounded-sm"
                                                alt={article.title}
                                                priority
                                                width={100}
                                                height={70}
                                            />
                                            <div className="flex flex-col gap-1 col-span-2 items-start px-1">
                                                <h1 className="text-xs text-red-600 font-semibold">{article.categories[0]?.category.name}</h1>
                                                <p className="text-sm  line-clamp-3 text-black dark:text-white">{article.title}</p>
                                                <p className="text-xs text-stone-500 ">{format(new Date(article.date ?? ""), 'MMMM dd, yyyy')}</p>
                                            </div>
                                        </div>
                                    </Link>
                                ))}

                                {/* Sticky div */}
                                <div className="md:sticky md:top-24">
                                    <Separator
                                        label={
                                            <div className=" text-xs px-2 py-1 mb-2 rounded-full ">
                                                News
                                            </div>
                                        }
                                        gradient
                                        className=''
                                    />
                                    {women.slice(0, 5).map((article) => (
                                        <Link href={`/Detaile/${article.id}/`} key={article.id} className="flex flex-col w-full p-2">
                                            <div className="grid grid-cols-1 gap-1 overflow-hidden">
                                                <div className="flex flex-col gap-1 px-1">
                                                    <h1 className="text-xs text-red-600 font-semibold">{article.categories[0]?.category.name}</h1>
                                                    <p className="text-sm  line-clamp-3 text-black dark:text-white">{article.title}</p>
                                                    <p className="text-xs text-black/70 dark:text-white/60">{format(new Date(article.date ?? ""), 'MMMM dd, yyyy')}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center w-full h-full">
                <Separator
                    label={
                        <div className=" text-md my-2 px-2 py-1 mb-2 rounded-full ">
                            Related Posts
                        </div>
                    }
                    gradient
                    className=''
                />
                <div className="w-full flex flex-col gap-4 h-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                        {relatedArticles.slice(0, 8).map((article) => (
                            <Link href={`/Detaile/${article.id}/`} key={article.id} className="flex flex-col w-full">
                                <div className="flex flex-col gap-1 overflow-hidden">
                                    <Image
                                        src={article.imageUrl ?? ""}
                                        className="w-full rounded-sm h-44 md:h-44 xl:h-40"
                                        alt={article.title}
                                        priority
                                        width={100}
                                        height={70}
                                    />
                                    <div className="flex flex-col gap-1 col-span-2">
                                        <div className="flex items-center space-x-4">
                                            <h1 className="text-sm text-red-600 font-semibold">{article.categories[0]?.category.name}</h1>
                                            <p className="text-xs text-black/70 dark:text-white/60">{format(new Date(article.date ?? ""), 'MMMM dd, yyyy')}</p>
                                        </div>
                                        <p className="text-sm  line-clamp-4 text-black dark:text-white">{article.title}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}