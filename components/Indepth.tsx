


// import { Separator } from "@radix-ui/react-separator"



import Link from "next/link";
import { format } from 'date-fns';
import { fetchArticlesByCategory } from "@/lib/actions";
import { Separator } from "./ui/separetor";
import { ExpandableCard } from "./ExpandableCard";



export default async function Indepth() {

    const sport = await fetchArticlesByCategory('Sport'); 
    const diaspora = await fetchArticlesByCategory('Speak Your Mind');
    const home = await fetchArticlesByCategory('Home')
    const interview = await fetchArticlesByCategory('Interview')

    return (


        <ExpandableCard height="24rem "
            className="border-none  shadow-none mx-auto h-full   px-4 xl:px-0  relative flex flex-col gap-4 justify-center w-full  max-w-7xl py-12 "
            wide={true}>
            <div className="">
                {/* <NeumorphEyebrow  intent="primary">Most Read</NeumorphEyebrow> */}

                <div className="flex w-full py-2 pb-4">

                    <Separator
                        label={
                            <div className="px-2 py-1 mb-2 rounded-full text-sm">
                                Most Read
                            </div>
                        }
                        gradient
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-2  md:gap-8 relative w-full h-full">
                    <div className="flex flex-col w-full gap-2">
                        {/* <h1 className="text-2xl my-3 font-bold flex justify-center mb-4">Enterprenurship</h1> */}
                        <div className="flex flex-col w-full h-full">
                            <div className="flex flex-col gap-2 h-full w-full ">
                                {sport.slice(0, 5).map((article) => {
                                    return (
                                        <Link
                                            href={`/Detaile/${article.id}/`}
                                            key={article.id}
                                            className="w-full h-fit  ">
                                                
                                                    <div className="w-full gap-4 ">
                                                        {/* <Image
                                                            src={article.imageUrl ?? ""}
                                                            className="w-32 rounded-md h-24 lg:h-26"
                                                            alt="science"
                                                            priority={true}
                                                            width={100}
                                                            height={70}
                                                        /> */}
                                                        <div className="flex flex-col gap-1  ">
                                                            <h1 className="text-sm font-semibold  text-red-600  ">{article.categories[0].category.name}</h1>
                                                            <p className="text-sm   line-clamp-3 text-black/90 dark:text-white/80">{article.title}</p>
                                                            <p className="text-xs text-black/70 dark:text-white/60">{format(new Date(article.date ?? ""), 'MMMM dd, yyyy')}</p>
                                                        </div>
                                                    </div>
                                                
                                        </Link>
                                    )
                                })}
                            </div>
                        </div>

                    </div>

                    <div className="flex flex-col w-full gap-2">
                        {/* <h1 className="text-2xl my-3 font-bold flex justify-center mb-4">Technology</h1> */}
                        <div className="flex flex-col w-full h-full">
                            <div className="flex flex-col w-full h-full gap-2">
                                {diaspora.slice(0, 5).map((article) => {
                                    return (
                                        <Link
                                            href={`/Detaile/${article.id}/`}
                                            key={article.id}
                                            className="w-full h-fit ">
                                                
                                            <div className=" gap-4 ">
                                                {/* <Image
                                                    src={article.imageUrl ?? ""}
                                                    className="w-32 rounded-md h-24 lg:h-26"
                                                    alt="science"
                                                    priority
                                                    width={100}
                                                    height={70}
                                                /> */}
                                                <div className="flex flex-col gap-1  ">
                                                    <h1 className="text-sm font-semibold  text-red-600  ">{article.categories[0].category.name}</h1>
                                                    <p className="text-sm line-clamp-3 text-black/90 dark:text-white/80">{article.title}</p>
                                                    <p className="text-xs text-black/70 dark:text-white/60">{format(new Date(article.date ?? ""), 'MMMM dd, yyyy')}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    )
                                })}
                            </div>
                        </div>

                    </div>
                    <div className="flex flex-col w-full gap-2">
                        {/* <h1 className="text-2xl my-3 font-bold flex justify-center mb-4">Culture</h1> */}
                        <div className="flex flex-col w-full ">
                            <div className="flex flex-col gap-2">
                                {home.slice(0, 5).map((article) => {
                                    return (
                                        <Link
                                            href={`/Detaile/${article.id}/`}
                                            key={article.id}
                                            className="">
                                            <div className=" ">
                                                {/* <Image
                                                    src={article.imageUrl ?? ""}
                                                    className="w-32 rounded-md h-24 lg:h-26"
                                                    alt="science"
                                                    priority
                                                    width={100}
                                                    height={70}
                                                /> */}
                                                <div className="flex flex-col gap-1 ">
                                                    <h1 className="text-sm font-semibold  text-red-600  ">{article.categories[0].category.name}</h1>
                                                    <p className="text-sm line-clamp-3 text-black/90 dark:text-white/80">{article.title}</p>
                                                    <p className="text-xs text-black/70 dark:text-white/60">{format(new Date(article.date ?? ""), 'MMMM dd, yyyy')}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col w-full gap-2">
                        {/* <h1 className="text-2xl my-3 font-bold flex justify-center mb-4">Culture</h1> */}
                        <div className="flex flex-col w-full ">
                            <div className="flex flex-col gap-6">
                                {interview.slice(0, 5).map((article) => {
                                    return (
                                        <Link
                                            href={`/Detaile/${article.id}/`}
                                            key={article.id}
                                            className=" ">
                                            <div className=" gap-4 ">
                                                {/* <Image
                                                    src={article.imageUrl ?? ""}
                                                    className="w-32 rounded-md h-24 lg:h-26"
                                                    alt="science"
                                                    priority
                                                    width={100}
                                                    height={70}
                                                /> */}
                                                <div className="flex flex-col gap-1">
                                                    <h1 className="text-sm font-semibold  text-red-600  ">{article.categories[0].category.name}</h1>
                                                    <p className="text-sm line-clamp-3 text-black/90 dark:text-white/80">{article.title}</p>
                                                    <p className="text-xs text-black/70 dark:text-white/60">{format(new Date(article.date ?? ""), 'MMMM dd, yyyy')}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </ExpandableCard>







    )
}
