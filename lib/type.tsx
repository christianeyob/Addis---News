export interface Article {
  id: number;
  title: string;
  author: string;
  date?: Date | null;
  imageUrl?: string | null;
  content: string;
  url: string;
  categories: { // Define categories as an array of objects
    category: Category; // Each category should be of type Category
    articleId: number;
    categoryId: number;
}[]; // Relation to ArticleCategories // Relation to ArticleCategories
  comments?: Comment[]; // Relation to Comments
}

export interface Category {
id: number;
name: string;
articles?: unknown[]; 
}

export interface ArticleCategory {
articleId: number;
categoryId: number;
article: Article;
category: Category;
}

export interface Comment {
id: number;
name: string;
email: string;
content: string;
articleId: number;
createdAt: Date;
}
