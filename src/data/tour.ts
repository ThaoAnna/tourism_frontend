// import type {Tour} from '../components/TourCard';
import type { Tour } from '../types/index';

export const toursData: Tour[] = [
  {
    id: 1,
    name: "Classic Western Europe Highlights",
    duration: 7,
    style: "Classic",
    route: ["Paris", "Bordeaux", "Monaco", "Zurich"],
    routeDetails: [
      { day: "Day 1-2", location: "Paris", description: "Explore the City of Light" },
      { day: "Day 3", location: "Bordeaux", description: "Wine region experience" },
      { day: "Day 4-5", location: "Monaco", description: "Luxury coastal living" },
      { day: "Day 6-7", location: "Zurich", description: "Swiss Alps and culture" }
    ],
    experience: [
      "Eiffel Tower, Louvre",
      "Bordeaux wine region",
      "Monaco coast & casino",
      "Swiss Alps scenery"
    ],
    priceBreakdown: {
      transport: 450,
      hotel: 720,
      foodAndActivities: 350
    },
    totalPrice: {
      min: 1500,
      max: 1650
    },
    imageUrl: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800",
    highlights: [
      "Visit iconic Eiffel Tower and Louvre Museum",
      "Wine tasting in Bordeaux vineyards",
      "Experience Monaco's glamorous lifestyle",
      "Explore Swiss Alps and pristine lakes"
    ],
    description: "Experience the best of Western Europe in one week. From Paris's romance to Monaco's luxury and Switzerland's natural beauty."
  },
  {
    id: 2,
    name: "Romantic France & Italy",
    duration: 8,
    style: "Romantic",
    route: ["Paris", "Florence", "Venice", "Rome"],
    routeDetails: [
      { day: "Day 1-2", location: "Paris", description: "City of Love" },
      { day: "Day 3-4", location: "Florence", description: "Renaissance art capital" },
      { day: "Day 5-6", location: "Venice", description: "Floating city romance" },
      { day: "Day 7-8", location: "Rome", description: "Eternal City wonders" }
    ],
    experience: [
      "Art, fashion, historic cities",
      "Ideal for couples",
      "Renaissance masterpieces",
      "Romantic gondola rides"
    ],
    priceBreakdown: {
      transport: 500,
      hotel: 850,
      foodAndActivities: 400
    },
    totalPrice: {
      min: 1750,
      max: 1900
    },
    imageUrl: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800",
    highlights: [
      "Romantic Seine River cruise in Paris",
      "Uffizi Gallery and Ponte Vecchio in Florence",
      "Gondola ride through Venice canals",
      "Colosseum and Vatican exploration"
    ],
    description: "Perfect for couples seeking romance through France and Italy's most beautiful cities."
  },
  {
    id: 3,
    name: "Italy Deep Dive",
    duration: 7,
    style: "Italy Focus",
    route: ["Venice", "Florence", "Rome", "Amalfi Coast"],
    routeDetails: [
      { day: "Day 1", location: "Venice", description: "Canals and architecture" },
      { day: "Day 2-3", location: "Florence", description: "Art and culture" },
      { day: "Day 4-5", location: "Rome", description: "Ancient history" },
      { day: "Day 6-7", location: "Amalfi Coast", description: "Coastal paradise" }
    ],
    experience: [
      "Italy's most iconic cities",
      "Coastal relaxation",
      "Renaissance art",
      "Ancient Roman history"
    ],
    priceBreakdown: {
      transport: 350,
      hotel: 800,
      foodAndActivities: 450
    },
    totalPrice: {
      min: 1600,
      max: 1750
    },
    imageUrl: "https://images.unsplash.com/photo-1534113414509-0bd4d27b8e0c?w=800",
    highlights: [
      "St. Mark's Square and Doge's Palace",
      "David statue and Duomo cathedral",
      "Roman Forum and Trevi Fountain",
      "Positano cliffs and Amalfi beaches"
    ],
    description: "Immerse yourself in Italy's rich culture, history, and stunning coastline."
  },
  {
    id: 4,
    name: "Luxury Riviera & Alps",
    duration: 7,
    style: "Luxury",
    route: ["Paris", "Monaco", "Zurich"],
    routeDetails: [
      { day: "Day 1-3", location: "Paris", description: "Luxury shopping and dining" },
      { day: "Day 4-5", location: "Monaco", description: "Riviera lifestyle" },
      { day: "Day 6-7", location: "Zurich", description: "Swiss elegance" }
    ],
    experience: [
      "High-end shopping",
      "Riviera lifestyle",
      "Swiss precision & nature",
      "Michelin-star dining"
    ],
    priceBreakdown: {
      transport: 400,
      hotel: 900,
      foodAndActivities: 500
    },
    totalPrice: {
      min: 1800,
      max: 2000
    },
    imageUrl: "https://images.unsplash.com/photo-1549144511-f099e773c147?w=800",
    highlights: [
      "Champs-Élysées luxury shopping",
      "Monte Carlo Casino experience",
      "Private yacht opportunities",
      "Bahnhofstrasse shopping in Zurich"
    ],
    description: "Experience Europe's most luxurious destinations with premium accommodations and exclusive experiences."
  },
  {
    id: 5,
    name: "Culture + Coast Combo",
    duration: 10,
    style: "Balanced",
    route: ["Paris", "Bordeaux", "Florence", "Rome", "Amalfi"],
    routeDetails: [
      { day: "Day 1-2", location: "Paris" },
      { day: "Day 3", location: "Bordeaux" },
      { day: "Day 4-5", location: "Florence" },
      { day: "Day 6-7", location: "Rome" },
      { day: "Day 8-10", location: "Amalfi" }
    ],
    experience: [
      "Balanced pace",
      "City + wine + coast",
      "Cultural immersion",
      "Relaxation time"
    ],
    priceBreakdown: {
      transport: 650,
      hotel: 1100,
      foodAndActivities: 500
    },
    totalPrice: {
      min: 2200,
      max: 2400
    },
    imageUrl: "https://images.unsplash.com/photo-1499678329028-101435549a4e?w=800",
    highlights: [
      "Perfect balance of culture and relaxation",
      "Wine tasting in French countryside",
      "Italian Renaissance masterpieces",
      "Mediterranean coastal beauty"
    ],
    description: "The perfect blend of European culture, wine country, and coastal relaxation."
  },
  {
    id: 6,
    name: "Greece Dream Escape",
    duration: 7,
    style: "Greece",
    route: ["Athens", "Santorini"],
    routeDetails: [
      { day: "Day 1-3", location: "Athens", description: "Ancient Greek history" },
      { day: "Day 4-7", location: "Santorini", description: "Island paradise" }
    ],
    experience: [
      "Ancient history",
      "Iconic sunsets & beaches",
      "Greek cuisine",
      "Island hopping"
    ],
    priceBreakdown: {
      transport: 300,
      hotel: 850,
      foodAndActivities: 400
    },
    totalPrice: {
      min: 1500,
      max: 1650
    },
    imageUrl: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800",
    highlights: [
      "Acropolis and Parthenon exploration",
      "World-famous Santorini sunsets",
      "White-washed village wandering",
      "Crystal-clear Aegean waters"
    ],
    description: "Discover ancient Greek civilization and relax on the stunning island of Santorini."
  },
  {
    id: 7,
    name: "Mediterranean Grand Tour",
    duration: 14,
    style: "Mediterranean",
    route: ["Paris", "Florence", "Rome", "Amalfi", "Athens", "Santorini"],
    routeDetails: [
      { day: "Day 1-2", location: "Paris" },
      { day: "Day 3-4", location: "Florence" },
      { day: "Day 5-6", location: "Rome" },
      { day: "Day 7-9", location: "Amalfi" },
      { day: "Day 10-11", location: "Athens" },
      { day: "Day 12-14", location: "Santorini" }
    ],
    experience: [
      "Complete Mediterranean journey",
      "Best-selling long tour style",
      "Multiple countries",
      "Diverse experiences"
    ],
    priceBreakdown: {
      transport: 850,
      hotel: 1600,
      foodAndActivities: 650
    },
    totalPrice: {
      min: 3000,
      max: 3200
    },
    imageUrl: "https://images.unsplash.com/photo-1530841377377-3ff06c0ca713?w=800",
    highlights: [
      "Comprehensive European experience",
      "Six iconic destinations",
      "Perfect for first-time visitors",
      "Complete cultural immersion"
    ],
    description: "The ultimate Mediterranean adventure covering France, Italy, and Greece's best destinations."
  },
  {
    id: 8,
    name: "Art & Architecture Focus",
    duration: 10,
    style: "Cultural",
    route: ["Paris", "Venice", "Florence", "Rome", "Athens"],
    routeDetails: [
      { day: "Day 1-2", location: "Paris" },
      { day: "Day 3-4", location: "Venice" },
      { day: "Day 5-6", location: "Florence" },
      { day: "Day 7-8", location: "Rome" },
      { day: "Day 9-10", location: "Athens" }
    ],
    experience: [
      "Museums, ruins, Renaissance & Classical eras",
      "Art masterpieces",
      "Historical architecture",
      "Cultural deep dive"
    ],
    priceBreakdown: {
      transport: 700,
      hotel: 1200,
      foodAndActivities: 550
    },
    totalPrice: {
      min: 2400,
      max: 2600
    },
    imageUrl: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=800",
    highlights: [
      "Louvre, Uffizi, and Vatican Museums",
      "Gothic and Renaissance architecture",
      "Ancient Greek and Roman ruins",
      "Expert-guided cultural tours"
    ],
    description: "A journey through Europe's greatest artistic and architectural achievements."
  },
  {
    id: 9,
    name: "Coastal Europe Escape",
    duration: 10,
    style: "Coastal",
    route: ["Monaco", "Amalfi Coast", "Santorini"],
    routeDetails: [
      { day: "Day 1-3", location: "Monaco", description: "French Riviera luxury" },
      { day: "Day 4-7", location: "Amalfi Coast", description: "Italian coastal beauty" },
      { day: "Day 8-10", location: "Santorini", description: "Greek island paradise" }
    ],
    experience: [
      "Relaxation-focused",
      "Minimal city stress",
      "Beach time",
      "Coastal cuisine"
    ],
    priceBreakdown: {
      transport: 600,
      hotel: 1300,
      foodAndActivities: 600
    },
    totalPrice: {
      min: 2500,
      max: 2700
    },
    imageUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800",
    highlights: [
      "Three stunning coastal destinations",
      "Beach relaxation and water sports",
      "Fresh Mediterranean seafood",
      "Sunset views and coastal walks"
    ],
    description: "Escape to Europe's most beautiful coastlines for a relaxing beach-focused vacation."
  },
  {
    id: 10,
    name: "Ultimate Europe Highlights",
    duration: 14,
    style: "Ultimate",
    route: ["Paris", "Bordeaux", "Zurich", "Venice", "Florence", "Rome", "Amalfi"],
    routeDetails: [
      { day: "Day 1-2", location: "Paris" },
      { day: "Day 3", location: "Bordeaux" },
      { day: "Day 4-5", location: "Zurich" },
      { day: "Day 6-7", location: "Venice" },
      { day: "Day 8-9", location: "Florence" },
      { day: "Day 10-11", location: "Rome" },
      { day: "Day 12-14", location: "Amalfi" }
    ],
    experience: [
      "One of the most comprehensive Europe routes",
      "Ideal for first-time Europe travelers",
      "All major highlights",
      "Complete experience"
    ],
    priceBreakdown: {
      transport: 900,
      hotel: 1700,
      foodAndActivities: 700
    },
    totalPrice: {
      min: 3200,
      max: 3500
    },
    imageUrl: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800",
    highlights: [
      "Seven incredible destinations",
      "Perfect first Europe trip",
      "Wine, culture, nature, and coast",
      "Comprehensive European experience"
    ],
    description: "The ultimate European journey covering all major highlights in France, Switzerland, and Italy."
  }
];