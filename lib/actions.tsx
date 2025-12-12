'use server';

import { revalidatePath } from 'next/cache';
import prisma from "@/lib/prisma";
import { Article } from './type';
interface CategoryArticle {
    name: string;
}
interface SubscribeResponse {
    message: string;
  }
  
export default async function Subscribtion({ email }: { email: string }): Promise<SubscribeResponse> {
    try {
      const existingSubscription = await prisma.subscription.findFirst({
        where: { email },
      });
  
      if (existingSubscription) {
        return { message: 'Email already subscribed' };
      } else {
        await prisma.subscription.create({
          data: {
            email,
          },
        });
        return { message: 'Subscription successful' };
      }
    } catch (error) {
      console.error(error);
      return { message: 'Failed to subscribe' };
    }
  }

export async function fetchArticlesByCategory(
    categoryName: string,
    skip: number = 0,
    take: number = 10
  ): Promise<Article[]> {
    const decodedCategoryName = decodeURIComponent(categoryName);
    const articles = await prisma.article.findMany({
      skip,
      take,
      include: {
        categories: {
          include: {
            category: true, // Include category details
          },
        },
        comments:true
      },
      where: {
        categories: {
          some: {
            category: {
              name: decodedCategoryName, // Filter by category name
            },
          },
        },
      },
      orderBy: {
        date: "desc", // Order by latest date
      },
    });
  
    return articles; // Return articles with categories included
  }

export async function fetchTotalArticlesByCategory(category: string): Promise<number> {
    return await prisma.article.count({
      where: {
        categories: {
          some: {
            category: {
              name: category,
            },
          },
        },
      },
    });
  }
export async function createComment(articleId: number, name: string, email: string, content: string) {
    try {
        if (!articleId || !name || !email || !content) {
            return { success: false, error: "Missing fields" };
        }

        await prisma.comment.create({
            data: {
                articleId: parseInt(String(articleId)),  // Ensure articleId is handled correctly
                name,
                email,
                content,
            },
        });

        // Revalidate the path to update the comments
        revalidatePath(`/articles/${articleId}`);

        // Fetch the updated comments
        const comments = await prisma.comment.findMany({
            where: {
                articleId: articleId,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return { success: true, comments: comments };
    } catch (error: unknown ) {
        console.error("Error creating comment:", error);
        return { success: false, error: "Failed to create comment" };
    }
}

export async function subscribeUser(email: string) {
    try {
      const existingSubscription = await prisma.subscription.findFirst({
        where: { email },
      });
  
      if (existingSubscription) {
        return { message: 'Email already subscribed' };
      }
  
      await prisma.subscription.create({
        data: { email },
      });
  
      revalidatePath('/'); // Revalidate the homepage, or wherever your subscription list is displayed
  
      return { message: 'Subscription successful' };
  
    } catch (error) {
      console.error('Subscription error:', error);
      return { message: 'Failed to subscribe' };
    }
  }
export async function saveContact(name: string, email: string, message: string) {
    try {
        await prisma.contact.create({
            data: {
                name,
                email,
                message,
            },
        });

        revalidatePath('/Contact'); // Revalidate the contact page if needed

        return { message: 'Message sent successfully' };
    } catch (error) {
        console.error('Error saving contact:', error);
        return { message: 'Failed to send message' };
    }
}
// Define an asynchronous function to fetch the latest articles for given categories
export async function fetchLatestArticlesByCategory(categories: CategoryArticle[]): Promise<Article[]> {

    try {
        // Use Prisma to find articles that belong to any of the specified categories
        const articles = await prisma.article.findMany({
            where: {
                // Filter articles based on their categories
                categories: {
                    // Check if any of the article's categories match the specified categories
                    some: {
                        category: {
                            // Filter categories by name
                            name: {
                                // Use 'in' operator to match category names from the provided array
                                in: categories.map((category) => category.name),
                            },
                        },
                    },
                },
            },
            include: {
                // Include related categories in the fetched data
                categories: {
                    include: {
                        category: true, // Fetch category details as well
                    },
                },
            },
            orderBy: {
                date: 'desc', // Order articles by date in descending order to get the latest ones
            },
            take: 40, //
        });

        // Create a map to store the latest article for each category
        const latestArticlesMap = new Map<string, Article>();

        // Iterate over the articles and store the latest one for each category
        articles.forEach((article) => {
            // Extract the category name from the article's categories
            const categoryName = article.categories[0]?.category.name;
            // If the category name exists and is not already in the map, add the article to the map
            if (categoryName && !latestArticlesMap.has(categoryName)) {
                latestArticlesMap.set(categoryName, article);
            }
        });

        // Convert the map values to an array and return it
        return Array.from(latestArticlesMap.values());
    } catch (error) {
        // Log any errors that occur during the data fetching process
        console.error('Error fetching latest articles by category:', error);
        // Return an empty array in case of an error
        return [];
    }
}


