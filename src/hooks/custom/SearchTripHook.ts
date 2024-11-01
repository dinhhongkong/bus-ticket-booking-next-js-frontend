import { get } from "@/api/api";
import { Province } from "@/types/models/Province";
import { Trip } from "@/types/models/Trip";
import { useState } from "react";

export interface SearchTripParams {
  departure?: Province;
  destination?: Province;
  startDate?: string;
  endDate?: string;
}

export const useSearchTrip = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [departureTrip, setDepartureTrip] = useState<Trip[]>([]);
  const [roundTrip, setRoundTrip] = useState<Trip[]>([]);
  const [searchParams, setSearchParams] = useState<SearchTripParams>({});

  const fetchSearchRoundTrip = async () => {
    const { departure, destination, startDate, endDate } = searchParams;
    try {
      setIsLoading(true);
      const response: Trip[] = await get(`/booking/search/trip?departureProvinceId=${departure?.id}&destinationProvinceId=${destination?.id}&startDate=${startDate}`);
      setDepartureTrip(response);
    } catch (error) {
      console.error('Error fetching search trip:', error);
    }

    try {
      setIsLoading(true);
      const response: Trip[] = await get(`/booking/search/trip?departureProvinceId=${destination?.id}&destinationProvinceId=${departure?.id}&startDate=${endDate}`);
      setRoundTrip(response);
    } catch (error) {
      console.error('Error fetching search trip:', error);
    }
    setIsLoading(false);

  };
  const fetchSearchTrip = async () => {
    setIsLoading(true);
    const { departure, destination, startDate } = searchParams;
    try {
      const response: Trip[] = await get(`/booking/search/trip?departureProvinceId=${departure?.id}&destinationProvinceId=${destination?.id}&startDate=${startDate}`);

      setDepartureTrip(response);
    } catch (error) {
      console.error('Error fetching search trip:', error);
    }
    setIsLoading(false);
  };

  return { departureTrip, roundTrip, fetchSearchTrip, fetchSearchRoundTrip, searchParams ,setSearchParams, isLoading };
}





