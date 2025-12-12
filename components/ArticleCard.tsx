import { Article } from '@/lib/type'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'


const ArticleCard = ({ article }: { article: Article }) => {
  return (
    <div>
      <Link href={`/Detaile/${article.id}/`} key={article.id} className="flex flex-col gap-1 relative rounded-sm">
        <Image
            src={article.imageUrl ?? "https://media.istockphoto.com/id/2152935950/photo/newspapers.webp?a=1&b=1&s=612x612&w=0&k=20&c=98pZKXhaxsmZ-DqxePCJB2y5lwqb2hXWOO8EgnIoZjA="}
            className="rounded-sm md:h-32 lg:h-56 z-10"
            alt={article.title || "Article Image"}
            width={400}
            height={200}
        />
        <div className="mt-1 flex items-center space-x-4">
            <h1 className="text-sm text-red-600 font-bold">{article.categories[0].category.name}</h1>
        </div>
        <p className="text-md font-black line-clamp-2 z-10">{article.title}</p>
        <div className="absolute bottom-12 -left-24 w-10 h-10 bg-sky-900 rounded-full filter blur-3xl"></div>
    </Link>
    </div>
  )
}

export default ArticleCard




