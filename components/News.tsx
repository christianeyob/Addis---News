
import Image from "next/image"
import Link from "next/link";
import { format } from "date-fns";
import { fetchArticlesByCategory } from "@/lib/actions";
import { Separator } from "./ui/separetor";
import FancyClickEffect from "./ui/fancy-click-effect";

export default async function News() {

    const zena = await fetchArticlesByCategory('In Depth'); 
    const art = await fetchArticlesByCategory('Interview'); 
    const society = await fetchArticlesByCategory('Business'); 

    return (
        <div className="flex flex-col gap-4 justify-center w-full  max-w-7xl mx-auto px-4 xl:px-0 my-4">
            <div className="flex flex-row items-center gap-4 ">
                <Separator
                    label={
                        <div className="px-2 py-1 mb-2 rounded-full text-sm ">
                            News
                        </div>
                    }
                    gradient
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  justify-center relative gap-2">
                <div className="flex flex-col w-full  gap-2">
                    <div className="flex flex-col w-full ">
                        <div className="flex flex-col ">
                            {zena.slice(1, 2).map((article) => (
                                <Link
                                    href={`/Detaile/${article.id}/`}
                                    key={article.id}
                                    className=" ">
                                    <FancyClickEffect >
                                        <div className="flex flex-col gap-1 relative rounded-sm" key={article.id}>
                                            <Image
                                                src={article.imageUrl ?? "https://media.istockphoto.com/id/2152935950/photo/newspapers.webp?a=1&b=1&s=612x612&w=0&k=20&c=98pZKXhaxsmZ-DqxePCJB2y5lwqb2hXWOO8EgnIoZjA="}
                                                className="rounded-sm h-52 xl:h-56"
                                                alt="Businnes"
                                                width={400}
                                                height={200}
                                            />
                                            <div className="mt-1 flex items-center space-x-4 ">
                                                <h1 className="text-sm  text-red-600 font-bold ">{article.categories[0].category.name}</h1>
                                                <p className="text-xs text-black/70 dark:text-white/60">{format(new Date(article.date ?? ""), 'MMMM dd, yyyy')}</p>
                                            </div>
                                            <p className="text-md  line-clamp-2 z-10">{article.title}</p>

                                            <div className="absolute bottom-12 -left-24 w-10 h-10 bg-sky-900 rounded-full filter blur-3xl"></div>

                                        </div>
                                    </FancyClickEffect>
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col w-full  ">
                        {zena.slice(2, 8).map((article) => {
                            return (
                                <Link
                                    href={`/Detaile/${article.id}/`}
                                    key={article.id}
                                    className="block"
                                >
                                    <FancyClickEffect >
                                        <div className="grid grid-cols-1 gap-1 overflow-hidden py-2">
                                            <div className="flex flex-col gap-1 ">
                                                {/* <h1 className="text-xs text-red-600">{article.categories[0].category.name}</h1> */}
                                                <p className="text-sm  line-clamp-3">{article.title}</p>
                                                <p className="text-xs text-black/70 dark:text-white/60">{format(new Date(article.date ?? ""), 'MMMM dd, yyyy')}</p>
                                            </div>
                                        </div>
                                    </FancyClickEffect>
                                </Link>
                            );
                        })}
                    </div>

                </div>
                <div className="flex flex-col w-full  gap-2">
                    <div className="flex flex-col w-full mb-4">
                        <div className="flex flex-col ">
                            {art.slice(0, 1).map((article) => (
                                <Link
                                    href={`/Detaile/${article.id}/`}
                                    key={article.id}
                                    className=" ">
                                    <FancyClickEffect >
                                        <div className="flex flex-col gap-1 relative rounded-sm" key={article.id}>
                                            <Image
                                                src={article.imageUrl ?? ""}
                                                className="rounded-sm h-52 xl:h-56"
                                                alt="Businnes"
                                                width={400}
                                                height={200}
                                            />
                                            <div className="mt-1 flex items-center space-x-4 ">
                                                <h1 className="text-sm  text-red-600 font-bold ">{article.categories[0].category.name}</h1>
                                                <p className="text-xs text-black/70 dark:text-white/60">{format(new Date(article.date ?? ""), 'MMMM dd, yyyy')}</p>

                                            </div>
                                            <p className="text-md line-clamp-2 z-10">{article.title}</p>

                                            <div className="absolute bottom-12 -left-24 w-10 h-10 bg-sky-900 rounded-full filter blur-3xl"></div>

                                        </div>
                                    </FancyClickEffect>
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col w-full  items-center">
                        <div className="flex flex-col  w-full ">
                            {art.slice(1, 5).map((article) => {
                                return (
                                    <Link
                                        href={`/Detaile/${article.id}/`}
                                        key={article.id}
                                        className=" ">
                                        <FancyClickEffect >
                                            <div className="flex gap-2 py-2">
                                                <Image
                                                    src={article.imageUrl ?? ""}
                                                    className="w-36 h-24 lg:h-20 rounded-sm"
                                                    alt="science"
                                                    priority
                                                    width={100}
                                                    height={70}
                                                />
                                                <div className="flex flex-col gap-1 col-span-2 px-1">
                                                    <h1 className="text-sm  text-red-600 font-semibold ">{article.categories[0].category.name}</h1>
                                                    <p className="text-sm  line-clamp-3 ">{article.title}</p>
                                                    <p className="text-xs text-black/70 dark:text-white/60">{format(new Date(article.date ?? ""), 'MMMM dd, yyyy')}</p>
                                                </div>
                                            </div>
                                        </FancyClickEffect>
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-2 w-full ">
                    {/* <h1 className="text-lg font-bold mb-2">Society</h1> */}
                    <div className="flex flex-col w-full mb-4">
                        <div className="flex flex-col ">
                            {society.slice(0, 1).map((article) => (
                                <Link
                                    href={`/Detaile/${article.id}/`}
                                    key={article.id}
                                    className=" ">
                                    <FancyClickEffect >
                                        <div className="flex flex-col gap-1 relative rounded-sm" key={article.id}>
                                            <Image
                                                src={article.imageUrl ?? ""}
                                                className="rounded-sm h-52 xl:h-56"
                                                alt="Businnes"
                                                width={400}
                                                height={200}
                                            />
                                            <div className="mt-1 flex items-center space-x-4 ">
                                                <h1 className="text-sm  text-red-600 font-bold ">{article.categories[0].category.name}</h1>
                                                <p className="text-xs text-black/70 dark:text-white/60">{format(new Date(article.date ?? ""), 'MMMM dd, yyyy')}</p>

                                            </div>
                                            <p className="text-md line-clamp-2 z-10">{article.title}</p>

                                            <div className="absolute bottom-12 -left-24 w-10 h-10 bg-sky-900 rounded-full filter blur-3xl"></div>

                                        </div>
                                    </FancyClickEffect>
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col w-full   items-center">
                        <div className="flex flex-col  w-full ">
                            {society.slice(1, 5).map((article) => {
                                return (
                                    <Link
                                    href={`/Detaile/${article.id}/`}
                                    key={article.id}
                                    className=" ">
                                    <FancyClickEffect >
                                        <div className="flex gap-2 py-2">
                                            <Image
                                                src={article.imageUrl ?? ""}
                                                className="w-36 h-24 lg:h-20 rounded-sm"
                                                alt="science"
                                                priority
                                                width={100}
                                                height={70}
                                            />
                                            <div className="flex flex-col gap-1 col-span-2 px-1">
                                                <h1 className="text-sm  text-red-600 font-semibold ">{article.categories[0].category.name}</h1>
                                                <p className="text-sm  line-clamp-3 ">{article.title}</p>
                                                <p className="text-xs text-black/70 dark:text-white/60">{format(new Date(article.date ?? ""), 'MMMM dd, yyyy')}</p>
                                            </div>
                                        </div>
                                    </FancyClickEffect>
                                </Link>

                                )
                            })}
                        </div>

                    </div>
                </div>
            </div>
            {/* <Separator className="bg-black opacity-40 dark:bg-white w-full h-0.5 mt-6" /> */}
        </div>



    )
}
