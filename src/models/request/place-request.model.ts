export interface PlaceRequest {
    place_name: string;
    latitude: number;
    longitude: number;
    imageUrl: string;
    country: string;
    city: string;
    district: string;
    duration: string;
    price: number;
    type: string;
    tag: string[];
    popularityRate?: number;
    isVegan?: boolean;
    isSelected?: boolean;
  }