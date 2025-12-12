import { fetchArticlesByCategory, fetchTotalArticlesByCategory } from "@/lib/actions"
import { Metadata } from "next";
import ArticlesGrid from "./ArticlesGrid";
import { PaginationCom } from "@/components/paginationCom";
interface Props {
  params: { category: string };
  searchParams: { page?: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = params;
  const decodedCategory = decodeURIComponent(category);
  return {
    title: `${decodedCategory.charAt(0).toUpperCase() + decodedCategory.slice(1)} - Articles`,
  };
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { category } = params;
  const decodedCategory = decodeURIComponent(category); // Decode category name
  const page = Number(searchParams?.page) || 1;
  const articlesPerPage = 9;
  const skip = (page - 1) * articlesPerPage;

  const articles = await fetchArticlesByCategory(decodedCategory, skip, articlesPerPage);
  const totalArticles = await fetchTotalArticlesByCategory(decodedCategory);
  const totalPages = Math.ceil(totalArticles / articlesPerPage);

  return (
    <div className="w-full pt-24  px-6">
      <div className="container max-w-7xl mx-auto flex flex-col gap-6">
        <div className="flex w-full flex-col gap-2">
          <h2 className="text-3xl md:text-4xl tracking-tighter max-w-xl font-bold text-red-600">{decodedCategory.charAt(0).toUpperCase() + decodedCategory.slice(1)}</h2>
        </div>
        <ArticlesGrid articles={articles} />
        <PaginationCom totalPages={totalPages} page={page} category={decodedCategory} />
      </div>
    </div>
  );
}
