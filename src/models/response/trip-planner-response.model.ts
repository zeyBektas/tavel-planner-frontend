export interface TripPlannerResponse {
    id: string,
    userId: string,
    userLocation: string,
    routeLocation: string,
    price: number,
    startDate: string,
    endDate: string,
    places: [],
    statusFlag: number,
}