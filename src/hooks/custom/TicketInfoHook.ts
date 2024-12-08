import { get } from "@/api/api";
import { useNotificationContext } from "@/context/NotificationContextProvider";
import { TicketInfo } from "@/types/models/TicketInfo";
import { useState } from "react";

export const useTicketInfo = () => {
  const [ticket, setTicket] = useState<TicketInfo>({
    ticketId: 0,
    fullName: "",
    phoneNumber: "",
    email: "",
    pickupPoint: "",
    pickupAddress: "",
    dropOffPoint: "",
    dropOffAddress: "",
    pickupProvince: "",
    dropoffProvince: "",
    departureDay: "",
    departureTime: "",
    deltaTime: "",
    seatName: "",
    totalSeat: 0,
    price: 0,
    isCancel: false,
  });

  const { notify } = useNotificationContext();

  const fetchTicketInfo = async (id: number, phoneNumber: string) => {
    try {
      const response: TicketInfo = await get(`/booking/check-ticket?ticketId=${id}&phoneNumber=${phoneNumber}`);
      setTicket(response);
      notify.success(
        "Tải thông tin vé thành công"
      );
    } catch (error) {
      notify.info(
        "Không có thông tin vé, quý khách vui lý thử lại"
      );
      setTicket({
        ticketId: 0,
        fullName: "",
        phoneNumber: "",
        email: "",
        pickupPoint: "",
        pickupAddress: "",
        dropOffPoint: "",
        dropOffAddress: "",
        pickupProvince: "",
        dropoffProvince: "",
        departureDay: "",
        departureTime: "",
        deltaTime: "",
        seatName: "",
        totalSeat: 0,
        price: 0,
        isCancel: false,
      });
      console.error('Error fetching provinces:', error);
    }
  };

  return { ticket, fetchTicketInfo };
};