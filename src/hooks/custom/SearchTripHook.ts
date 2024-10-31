import { get } from "@/api/api";
import { Trip } from "@/types/models/Trip";
import exp from "constants";
import { useState } from "react";

export interface SearchTripParams {
  departureProvinceId?: number;
  destinationProvinceId?: number;
  startDate?: string;
  endDate?: string;
}

export const useSearchTrip = () => {
  const [departureTrip, setDepartureTrip] = useState<Trip[]>([]);
  const [roundTrip, setRoundTrip] = useState<Trip[]>([]);

  const [searchParams, setSearchParams] = useState<SearchTripParams>({});

  const fetchSearchRoundTrip = async () => {
    const { departureProvinceId, destinationProvinceId, startDate } = searchParams;
    try {
      const response: Trip[] = await get(`/booking/search/trip?departureProvinceId=${departureProvinceId}&destinationProvinceId=${destinationProvinceId}&startDate=${startDate}`);
      setDepartureTrip(response);
    } catch (error) {
      console.error('Error fetching search trip:', error);
    }

    try {
      const response: Trip[] = await get(`/booking/search/trip?departureProvinceId=${destinationProvinceId}&destinationProvinceId=${departureProvinceId}&startDate=${startDate}`);
      setRoundTrip(response);
    } catch (error) {
      console.error('Error fetching search trip:', error);
    }

  };
  const fetchSearchTrip = async () => {
    const { departureProvinceId, destinationProvinceId, startDate } = searchParams;
    try {
      const response: Trip[] = await get(`/booking/search/trip?departureProvinceId=${departureProvinceId}&destinationProvinceId=${destinationProvinceId}&startDate=${startDate}`);

      setDepartureTrip(response);
    } catch (error) {
      console.error('Error fetching search trip:', error);
    }
  };

  return { departureTrip, roundTrip, fetchSearchTrip, fetchSearchRoundTrip,  setSearchParams };
}





