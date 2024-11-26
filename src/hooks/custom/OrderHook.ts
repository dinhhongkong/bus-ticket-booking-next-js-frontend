import { get, post } from "@/api/api";
import { useNotificationContext } from "@/context/NotificationContextProvider";
import { CreateOrderRequest } from "@/types/models/Booking";
import { useRouter } from "next/navigation";
import { useState } from "react";


export const useOrder = (tripId: string| null, returnTripId: string | null, isRoundTrip: boolean) => {
  const [orderRequest, setOrderRequest] = useState<CreateOrderRequest>({
    userId: null,
    trip: {
      id: 0,
      tickets: [],
      pickupId: 0,
      dropOffId: 0,
    },
    returnTrip: null,
    name: '',
    phoneNumber: '',
    email: '',
    paymentMethod: '',
    amount: 0,
  });

  const { notify } = useNotificationContext();
  const router = useRouter()
  


  const createOrder = async () => {
    try {
      const response: number = await post(`/payment/invoice`, orderRequest);

      if (response > 0) {
        router.push(`/payment?invoiceId=${response}&tripId=${tripId}&isRoundTrip=${isRoundTrip}&returnTripId=${returnTripId}`);
      }

    } catch (error:any) {
      notify.error(error.response.data.message);
    }
    
  };

  return { orderRequest, setOrderRequest, createOrder };

}





