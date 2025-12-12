import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { fetchArticlesByCategory } from '@/lib/actions';
import { CanvasReveal } from './canvas';
import { Separator } from './ui/separetor';
import FancyClickEffect from './ui/fancy-click-effect';

export default async function Latest() {
    const news = await fetchArticlesByCategory('politics');
    const africa_news = await fetchArticlesByCategory('entrepreneurship');
    const world = await fetchArticlesByCategory('Commentary');

    return (
        <div className="px-4 xl:px-0 max-w-7xl w-full flex flex-col justify-center items-center mx-auto mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 place-content-center">
                {/* LEFT: Latest + Trending */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 lg:col-span-3 place-content-center">
                    {/* Latest */}
                    <div className="flex flex-col">
                        <Separator
                            label={
                                <div className="text-sm px-2 py-1 mb-2 rounded-full">
                                    Latest
                                </div>
                            }
                            gradient
                            className=""
                        />
                        <div className="flex flex-col gap-4">
                            {news.slice(0, 3).map((article) => {
                                const latestSrc =
                                    article.imageUrl ??
                                    'https://media.istockphoto.com/id/2152935950/photo/newspapers.webp?a=1&b=1&s=612x612&w=0&k=20&c=98pZKXhaxsmZ-DqxePCJB2y5lwqb2hXWOO8EgnIoZjA=';

                                return (
                                    <Link
                                        href={`/Detaile/${article.id}/`}
                                        key={article.id}
                                        className="flex flex-col w-full"
                                    >
                                        <FancyClickEffect>
                                            <div className="flex flex-col gap-1 overflow-hidden">
                                                <div className="relative w-full rounded-sm">
                                                    <Image
                                                        src={latestSrc}
                                                        className="rounded-sm h-44 xl:h-44 w-full object-cover"
                                                        alt={article.title || 'Article Image'}
                                                        width={400}
                                                        height={200}
                                                        priority
                                                    />
                                                </div>
                                                <div className="flex flex-col gap-1 col-span-2">
                                                    <div className="flex items-center space-x-4">
                                                        <h1 className="text-sm text-red-600 font-semibold">
                                                            {article.categories[0]?.category.name || 'News'}
                                                        </h1>
                                                        <p className="text-xs text-black/70 dark:text-white/60">
                                                            {format(
                                                                new Date(article.date ?? ''),
                                                                'MMMM dd, yyyy',
                                                            )}
                                                        </p>
                                                    </div>
                                                    <p className="text-sm line-clamp-4 text-black dark:text-white">
                                                        {article.title}
                                                    </p>
                                                </div>
                                            </div>
                                        </FancyClickEffect>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* Trending */}
                    <div className="flex flex-col md:col-span-2 relative">
                        <Separator
                            label={
                                <div className="text-sm px-2 py-1 mb-2 rounded-full border-dashed">
                                    Trending
                                </div>
                            }
                            gradient
                        />
                        {africa_news.length > 0 ? (
                            africa_news.slice(1, 2).map((article) => {
                                const isValidImage =
                                    article.imageUrl &&
                                    article.imageUrl !== '' &&
                                    article.imageUrl !== 'NO IMAGE';

                                const trendingSrc = isValidImage
                                    ? article.imageUrl
                                    : 'https://media.istockphoto.com/id/2152935950/photo/newspapers.webp?a=1&b=1&s=612x612&w=0&k=20&c=98pZKXhaxsmZ-DqxePCJB2y5lwqb2hXWOO8EgnIoZjA=';

                                return (
                                    <Link
                                        href={`/Detaile/${article.id}/`}
                                        key={article.id}
                                        className="w-full relative"
                                    >
                                        <FancyClickEffect>
                                            <div className="flex flex-col gap-1 overflow-hidden rounded-sm">
                                                <div className="relative w-full rounded-sm mb-2">
                                                    <Image
                                                        src={trendingSrc ?? 'https://example.com/default-image.jpg'}                                                        className="rounded-sm w-full md:h-96 lg:h-[400px] object-cover"
                                                        alt={article.title || 'Trending'}
                                                        width={400}
                                                        height={250}
                                                        priority
                                                    />
                                                </div>
                                                <div className="flex items-center space-x-4">
                                                    <h1 className="text-sm text-red-600 font-semibold">
                                                        {article.categories[0]?.category.name}
                                                    </h1>
                                                    <p className="text-xs text-black/70 dark:text-white/60">
                                                        {format(
                                                            new Date(article.date ?? ''),
                                                            'MMMM dd, yyyy',
                                                        )}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-3xl xl:text-4xl mb-8 line-clamp-3">
                                                        {article.title}
                                                    </p>
                                                    <p className="text-black/50 dark:text-white/50 text-sm line-clamp-4">
                                                        {article.content}
                                                    </p>
                                                </div>
                                            </div>
                                        </FancyClickEffect>
                                    </Link>
                                );
                            })
                        ) : (
                            <p>No trending articles available.</p>
                        )}
                    </div>
                </div>

                {/* RIGHT: World + CanvasReveal */}
                <div className="flex flex-col relative w-full">
                    <div className="flex flex-col mb-4 lg:mb-44 lg:sticky lg:top-28">
                        <div className="flex flex-col w-full relative">
                            <div className="flex flex-col">
                                <Separator
                                    label={
                                        <div className="text-sm px-2 py-1 mb-2 rounded-full">
                                            World
                                        </div>
                                    }
                                    gradient
                                />
                                <div className="flex flex-col divide-y gap-2">
                                    {world.slice(0, 6).map((article) => (
                                        <Link
                                            href={`/Detaile/${article.id}/`}
                                            key={article.id}
                                            className=""
                                        >
                                            <FancyClickEffect>
                                                <div className="flex flex-col py-1 overflow-hidden rounded-sm">
                                                    <p className="text-sm line-clamp-3">
                                                        {article.title}
                                                    </p>
                                                    <div className="flex items-center space-x-4">
                                                        <h1 className="text-sm text-red-600 font-semibold">
                                                            {article.categories[0]?.category.name}
                                                        </h1>
                                                        <p className="text-xs text-black/70 dark:text-white/60">
                                                            {format(
                                                                new Date(article.date ?? ''),
                                                                'MMMM dd, yyyy',
                                                            )}
                                                        </p>
                                                    </div>
                                                </div>
                                            </FancyClickEffect>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="lg:absolute h-48 md:h-56 lg:-bottom-12 w-full flex items-center justify-center">
                        <CanvasReveal />
                    </div>
                </div>
            </div>
        </div>
    );
}
