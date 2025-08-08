export interface INewProducts {
  id: number;
  name: string;
  slug: string;
  price: number;
  stock: number;
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
  category?: string;
}

export interface IProductCart {
  id: number;
  name: string;
  slug: string;
  price: number;
  image: string;
}

export interface IProductFilter {
  id: number;
  name: string;
  slug: string;
  price: number;
  stock: number;
  image: string;
  categories: string[];
  brand: string;
}

export interface IResponseBestProduct {
  data: Data;
  meta: Meta;
}

export interface Data {
  id: number;
  documentId: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  image: Image;
  product: Product;
}

export interface Image {
  id: number;
  documentId: string;
  name: string;
  alternativeText: null;
  caption: null;
  width: number;
  height: number;
  formats: Formats;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: null;
  provider: string;
  provider_metadata: ProviderMetadata;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
}

export interface Formats {
  large: Large;
  small: Large;
  medium: Large;
  thumbnail: Large;
}

export interface Large {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: null;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
  provider_metadata: ProviderMetadata;
}

export interface ProviderMetadata {
  public_id: string;
  resource_type: string;
}

export interface Product {
  id: number;
  documentId: string;
  name: string;
  price: number;
  stock: number;
  sku: null;
  featured: boolean;
  slug: string;
  discount: null;
  color: null;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  locale: string;
}

export interface Meta {}
