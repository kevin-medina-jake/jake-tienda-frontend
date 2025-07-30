export interface INewProducts {
  id: number;
  name: string;
  slug: string;
  price: number;
  image: string;
}

export interface IBestProduct {
  id: number;
  name: string;
  slug: string;
  image: string;
}

export interface IProductBond {
  id: number;
  title: string;
  description: string;
  slug: string;
  image: string;
}

export interface IViewProduct {
  id: number;
  name: string;
  price: number;
  description: string;
  stock: number;
  images: string[];
  category?: string[];
}
