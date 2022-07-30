export interface GetArticleResults {
  data: Article[];
}

export interface Article {
  __typename: Typename;
  id: string;
  author: string;
  createdAt: Date;
  score: number;
  updatedAt: Date;
  title: string;
  text: string;
  type: Type;
  url: string;
}

export enum Typename {
  Article = "Article",
}

export enum Type {
  Story = "story",
}
