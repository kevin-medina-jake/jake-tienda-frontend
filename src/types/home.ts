export type IPresentationList = IPresentation[];

export interface IPresentationResponse {
  data: IPresentation[];
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface IMedia {
  id: number;
  url: string;
  mime: string;
  name: string;
  alternativeText?: string;
  caption?: string;
  width?: number;
  height?: number;
  formats?: any;
}

export interface IPresentation {
  id: number;
  documentId: string;
  name_image: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  Image_or_video?: {
    data: IMedia[];
  };
}

export interface ICarouselPresentation {
  id: number;
  name_image: string;
  isImage: boolean;
  url: string;
}
