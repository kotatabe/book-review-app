export interface ReviewInterface {
  title: string;
  url: string;
  detail: string;
  review: string;
}

export interface Book {
  id: string;
  title: string;
  url: string;
  detail: string;
  review: string;
  reviewer: string;
  isMine: boolean;
}
