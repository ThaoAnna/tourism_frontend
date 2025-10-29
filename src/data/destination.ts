export interface Destination {
  id: number;
  name: string;
  country: string;
  image: string;
  rating: number;
}

export const destinations: Destination[] = [
  {
    id: 1,
    name: "Santorini",
    country: "Greece",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    rating: 4.9,
  },
  {
    id: 2,
    name: "Paris",
    country: "France",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
    rating: 4.8,
  },
  {
    id: 3,
    name: "Rome",
    country: "Italy",
    image: "https://images.unsplash.com/photo-1526481280691-906c4ad7b0e1", //not available
    rating: 4.7,
  },
  {
    id: 4,
    name: "Prague",
    country: "Czech Republic",
    image: "https://images.unsplash.com/photo-1528715471579-d1bcf0ba5e83",
    rating: 4.6,
  },
  {
    id: 5,
    name: "Barcelona",
    country: "Spain",
    image: "https://images.unsplash.com/photo-1526483360412-f4dbaf036963", //not available
    rating: 4.9,
  },
  {
    id: 6,
    name: "Vienna",
    country: "Austria",
    image: "https://images.unsplash.com/photo-1555993539-1732b0258235",
    rating: 4.5,
  },
];
