import { get } from "@/api/api";
import { BookingInfoResponse } from "@/types/models/Booking";
import { TripDetails } from "@/types/models/Trip";
import { useCallback, useEffect, useState } from "react";

export const useBookingInfo = (invoiceId: string |null, tripId: string| null, returnTripId: string | null, isRoundTrip: boolean) => {

  const [bookingInfo, setBookingInfo] = useState<BookingInfoResponse>({
    invoiceId: 0,
    status: '',
    dateTime: '',
    fullName: '',
    phoneNumber: '',
    email: '',
    trip: [],
  });

  useEffect(() => {
    const fetchBookingInfo = async () => {
      const response = await get(`/payment/invoice?invoiceId=${invoiceId}`);
      if (response) {
        setBookingInfo(response);
      }
    }
    fetchBookingInfo();
    
  }, []);
  



  return { bookingInfo };

}
