export interface ICategoryCart {
  id: string;
  name: string;
  slug: string;
  image?: string;
  isImportant?: boolean;
}

export interface IProductCategory {
  id: number;
  name: string;
  slug: string;
  price: number;
  image: string;
}
