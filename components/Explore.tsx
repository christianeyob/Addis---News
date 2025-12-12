import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { fetchArticlesByCategory } from "@/lib/actions"; 
import { Separator } from "./ui/separetor";
import FancyClickEffect from "./ui/fancy-click-effect";


export default async function Explore() {
    // const interview = await fetchArticlesByCategory('Interview'); // Example category
    const culture = await fetchArticlesByCategory('Global Addis')
    const sport = await fetchArticlesByCategory('Sport'); // Example category

    return (

        <div className="flex flex-col justify-center items-center px-4 xl:px-0  relative max-w-7xl h-full w-full mx-auto mt-6">
            <div className="flex w-full py-2 pb-4">
                {/* <NeumorphEyebrow  intent="primary">More to Explore</NeumorphEyebrow> */}
                <Separator
                    label={
                        <div className=" px-2 py-1 mb-2 rounded-full text-sm">
                            More To Explore
                        </div>
                    }
                    gradient
                />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4  w-full justify-center ">
                {/* Display Ethiopian War article */}
                <div className="w-full">
                    <div className="w-full relative rounded-2xl ">
                        <div className=" grid grid-cols-1 md:grid-cols-2 gap-2 relative  w-full">
                            {culture.slice(1, 5).map((article) => (
                                <Link
                                    href={`/Detaile/${article.id}/`}
                                    key={article.id}
                                    className="flex flex-col gap-2">
                                         <FancyClickEffect >
                                            <Image
                                                src={article.imageUrl ?? "/path/to/default-image.jpg"}
                                                alt="image"
                                                width={300}
                                                height={200}
                                                className="rounded-sm w-full  h-48 lg:h-40"
                                            />
                                            <div className="flex gap-3">
                                                <h1 className="text-sm self-start text-red-600 font-semibold">{article.categories[0]?.category.name}</h1>
                                                <p className="text-sm self-start text-stone-500 ">{format(new Date(article.date ?? new Date()), "MMMM dd, yyyy")}</p>
                                            </div>
                                            <div className="flex flex-col ">
                                                <p className=" text-sm  mb-2 line-clamp-3 text-black dark:text-white">{article.title}</p>
                                                {/* <p className="text-sm line-clamp-3">{article.content}</p> */}
                                            </div>
                                         </FancyClickEffect>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Display Unique Interview Articles */}
                <div className="grid grid-cols-1 md:grid-cols-2  h-fit gap-4 ">
                    {sport.slice(0, 8).map((article) => (
                        <Link
                            href={`/Detaile/${article.id}/`}
                            key={article.id} // Ensure this is unique
                            className="flex justify-between  w-full"
                        >
                             <FancyClickEffect>
                                <div className="flex flex-col  w-full">
                                    <div className="flex w-full justify-between ">
                                        <div className="flex flex-col  w-full">
                                            <h1 className="text-sm self-start text-red-600 font-semibold">{article.categories[0]?.category.name}</h1>
                                            <p className="text-sm  w-full line-clamp-5">{article.title}</p>
                                        </div>
                                        <Image
                                            src={article.imageUrl || "/path/to/default-image.jpg"} // Use default image if no image URL
                                            className="h-16 lg:h-20 w-20 lg:w-24 rounded-sm"
                                            alt={article.title || "Article Image"}
                                            width={200}
                                            height={100}
                                        />
                                    </div>
                                    <p className="text-xs my-1 text-black/70 dark:text-white/60">{format(new Date(article.date || ""), 'MMMM dd, yyyy')}</p>
                                </div>
                             </FancyClickEffect>
                        </Link>
                    ))}
                </div>
            </div>
        </div>

    );
}
