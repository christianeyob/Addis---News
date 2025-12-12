// components/ArticleList.tsx
import { Article } from "@/lib/type";
import { format } from "date-fns";

interface ArticleListProps {
    business: Article[];
}

const ArticleList = ({ business }: ArticleListProps) => {
    return (
       <div>
        <div className="flex flex-wrap">
            {business.map((article: Article) => (
                <div key={article.id}>
                    <h2 className="line-clamp-2">{article.title}</h2>
                    <p className="line-clamp-3">{article.content}</p>
                     <p className="text-xs text-black/70 dark:text-white/60">{format(new Date(article.date ?? ""), 'MMMM dd, yyyy')}</p>
                </div>
            ))}
        </div>
            
        </div>
    );
};

export default ArticleList;