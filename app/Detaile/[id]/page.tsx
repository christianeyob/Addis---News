// app/Detaile/[id]/page.tsx

 // Importing the Prisma client to interact with the database
import prisma from '@/lib/prisma';
import ArticleDetail from './ArticleDetail'; // Importing the ArticleDetail component to display the article
import { Article } from '@/lib/type';



// The main page component that fetches and displays the article details
const Detaile = async ({ params }: { params: { id: string } }) => {
    const id = parseInt(params.id, 10); // Parsing the ID from URL parameters

    // Fetching the article from the database using Prisma
    const article: Article | null = await prisma.article.findUnique({
        where: { id }, // Using the parsed ID to find the specific article
        include: {
            categories: { // Including related categories in the fetched data
                include: {
                    category: true, // Fetching category details as well
                },
            },
        },
    });

    // If no article is found, return a message indicating that it was not found
    if (!article) {
        return <div>Article not found</div>;
    }

    // If an article is found, render the ArticleDetail component and pass the article data as props
    return <ArticleDetail article={article} />;
};

export default Detaile; // Exporting the Page component as default for use in routing