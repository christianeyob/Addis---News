// components/ArticlesGrid.tsx
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { Article } from "@/lib/type";


interface ArticlesGridProps {
  articles: Article[];
}

const ArticlesGrid: React.FC<ArticlesGridProps> = ({ articles }) => {

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {articles.map((article) => (
        <Link href={`/Detaile/${article.id}/`} key={article.id} className="w-full relative">
          <div className="flex flex-col gap-1 overflow-hidden rounded-sm">
            <Image
              src={article.imageUrl ?? ""}
              className="rounded-sm mb-2 w-full md:h-64 lg:h-[200px] text-muted-foreground"
              alt={article.title}
              width={300}
              height={250}
            />
            <div className="flex  justify-between items-center space-x-4">
              <h1 className="text-xs text-black/70 dark:text-white/60  ">
                By <span>{article.author}</span>
              </h1>
              <p className="text-xs text-black/70 dark:text-white/60">
                {format(new Date(article.date ?? ""), "MMMM dd, yyyy")}
              </p>
            </div>
            <div>
              <p className="text-md  mb-8 line-clamp-3">{article.title}</p>
              <p className="text-black/50 dark:text-white/50 text-sm line-clamp-3">{article.content}</p>
            </div>
          </div> 
        </Link>
      ))}
    </div>
  );
};

export default ArticlesGrid;
