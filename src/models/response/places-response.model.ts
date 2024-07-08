export interface Place {
    id: string,
    place_name: string,
    latitude: number,
    longitude: number,
    imageUrl: string,
    country: string,
    city: string,
    district: string,
    duration: string,
    price: number,
    type: string,
    tag: string[],
    isVegan?: boolean,
  }

export interface Places {
  Restaurant: Place[],
  Museum: Place[],
  Hotel: Place[],
  Beach: Place[],
  Trekking: Place[],
  Entertainment: Place[]
}
