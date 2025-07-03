export interface NewsNavigationProps {
  currentIndex: number;
  itemsCount: number;
  onNavigate: (direction: "prev" | "next") => void;
  itemWidth?: number;
  visibleItems?: number;
}

export interface INews {
  image_url: string;
  link: string;
  title: string;
  description: string;
}

export interface ILink {
  to: string;
  text: string;
}

export interface IImage {
  img: string;
  code: string;
}
