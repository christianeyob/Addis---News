import Link from 'next/link';
import Image from 'next/image';
import { fetchLatestArticlesByCategory } from '@/lib/actions';
import FancyClickEffect from './ui/fancy-click-effect';

export default async function Header() {

    // const categories = [
    //     { name: 'Tech' },
    //     { name: 'Health' },
    //     { name: 'Ethiopian War' },
    //     { name: 'Lifestyle' },
    //     { name: 'Entertainment & Arts' },
    //     { name: 'Travel' },
    //     { name: 'Food & Drink' },
    //     { name: 'technology' },
    //     { name: 'ethiopian-books' },
    //     { name: 'ethiopian-music' },
    // ];
    const categories = [
        
        { name: 'politics' },
        { name: 'food-drink' },
        { name: 'history' },
        { name: 'travel' },
        { name: 'entrepreneurship' },
        { name: 'technology' },
        { name: 'ethiopian-news' },
        { name: 'In Depth' },
    ];
    const latestArticles = await fetchLatestArticlesByCategory(categories)

    return (
        <div className="flex py-6 pt-4 px-2 relative flex-col gap-4 justify-center w-full max-w-7xl mx-auto xl:px-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full content-center">
                {/* {latestArticles.slice(0, 8).map((article) => (
                    <Link href={`/Detaile/${article.id}/`} key={article.id} className="flex flex-col w-full relative p-2 ">
                        <FancyClickEffect>
                            <div className="grid grid-cols-3 gap-1 overflow-hidden">
                                <Image
                                    src={article.imageUrl ?? ""}
                                    className="w-full h-30 lg:h-20  rounded-sm line-clamp-2"
                                    alt={article.title}
                                    priority
                                    width={100}
                                    height={70}
                                />
                                <div className="flex flex-col gap-1 col-span-2 px-1">
                                    <h1 className="text-xs text-red-600 font-semibold">{article.categories[0]?.category.name || 'News'}</h1>
                                    <p className="text-sm  line-clamp-3 text-black dark:text-white">{article.title}</p>
                                </div>
                            </div>
                        </FancyClickEffect>
                    </Link>
                ))} */}
                {latestArticles.slice(0, 8).map((article) => {
                    const src = article.imageUrl;
                    if (!src || src === "NO IMAGE") return null; // or render a placeholder block

                    return (
                        <Link href={`/Detaile/${article.id}/`} key={article.id} className="flex flex-col w-full relative p-2 ">
                            <FancyClickEffect>
                                <div className="grid grid-cols-3 gap-1 overflow-hidden">
                                    <Image
                                        src={src}
                                        className="w-full h-30 lg:h-20 rounded-sm line-clamp-2"
                                        alt={article.title}
                                        priority
                                        width={100}
                                        height={70}
                                    />
                                    <div className="flex flex-col gap-1 col-span-2 px-1">
                                        <h1 className="text-xs text-red-600 font-semibold">{article.categories[0]?.category.name || 'News'}</h1>
                                        <p className="text-sm  line-clamp-3 text-black dark:text-white">{article.title}</p>
                                    </div>
                                </div>
                            </FancyClickEffect>
                        </Link>
                    );
                })}

            </div>
        </div>
    );
}
