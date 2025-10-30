import Paris1 from "../assets/Paris1.webp";
import Paris2 from "../assets/Paris2.webp";
import Zurich from "../assets/Zurich.webp";
import monaco from "../assets/monaco.webp";
import BordeauxUK from "../assets/BordeauxUK.webp";
import Amalfi from "../assets/Amalfi.webp";
import Athens from "../assets/Athens.webp";
import Florence from "../assets/Florence.webp";
import rome from "../assets/rome.webp";
import Santorini1 from "../assets/Santorini1.webp";
import Santorini2 from "../assets/Santorini2.webp";
import Venice from "../assets/Venice.webp";

export interface Destination {
  id: number;
  name: string;
  country: string;
  image: string;
  rating: number;
}

export const destinations: Destination[] = [
  { id: 1, name: "Paris", country: "France", image: Paris1, rating: 4.8 },
  { id: 1, name: "Paris", country: "France", image: Paris2, rating: 4.8 },
  { id: 2, name: "Zurich", country: "Switzerland", image: Zurich, rating: 4.6 },
  { id: 3, name: "Monaco", country: "Monaco", image: monaco, rating: 4.7 },
  { id: 4, name: "Bordeaux", country: "France", image: BordeauxUK, rating: 4.5 },
  { id: 5, name: "Amalfi", country: "Italy", image: Amalfi, rating: 4.9 },
  { id: 6, name: "Athens", country: "Greece", image: Athens, rating: 4.7 },
  { id: 7, name: "Florence", country: "Italy", image: Florence, rating: 4.8 },
  { id: 8, name: "Rome", country: "Italy", image: rome, rating: 4.9 },
  { id: 9, name: "Santorini (Oia)", country: "Greece", image: Santorini1, rating: 4.9 },
  { id: 10, name: "Santorini", country: "Greece", image: Santorini2, rating: 4.8 },
  { id: 11, name: "Venice", country: "Italy", image: Venice, rating: 4.9 },
];
