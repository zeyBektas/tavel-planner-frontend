export interface TripPlannerRequest {
    departure: string,
    destination: string,
    startDate: string,
    endDate: string,
    tags: string[],
    participantNumber: number
}