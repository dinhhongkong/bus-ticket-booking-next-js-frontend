"use client"
import { useTicketInfo } from "@/hooks/custom/TicketInfoHook";
import { formatDate } from "@/utils/timeUtils";
import { Button, Form, Input } from "antd";

export default function TicketSearchPage() {
  const {ticket, fetchTicketInfo} = useTicketInfo();

  const onFinish = (values: any) => {
    fetchTicketInfo(values.ticketId, values.phoneNumber);
  };

  return (
    <div className="px-64">
      <div className="m-4 text-green-700 font-bold text-center text-xl ">
        TRA CỨU THÔNG TIN ĐẶT VÉ
      </div>
      <Form onFinish={onFinish}>
        <Form.Item name={"phoneNumber"}>
          <Input placeholder="Vui lòng nhập số điện thoại"/>
        </Form.Item>

        <Form.Item name={"ticketId"}>
          <Input placeholder="Vui lòng nhập mã vé"/>
        </Form.Item>

        <Form.Item>
          <Button className="mx-auto bg-orange-400 text-white font-semibold" htmlType="submit">
            Tìm kiếm
          </Button>
        </Form.Item>
      </Form>


      {ticket.ticketId !== 0 && (
        <div className="mt-6 p-6 bg-gray-100 shadow-md rounded-lg mb-24">
          <h2 className="text-lg font-bold text-gray-700 mb-4">
            Thông Tin Vé
          </h2>
          <ul className="space-y-2">
            <li>
              <span className="font-semibold">Họ tên:</span> {ticket.fullName}
            </li>
            <li>
              <span className="font-semibold">Số điện thoại:</span>{" "}
              {ticket.phoneNumber}
            </li>
            <li>
              <span className="font-semibold">Email:</span> {ticket.email}
            </li>
            <li>
              <span className="font-semibold">Chuyến:</span> {ticket.pickupProvince} - {ticket.dropoffProvince}
            </li>
            <li>
              <span className="font-semibold">Điểm đón:</span> {ticket.pickupPoint} - {ticket.pickupAddress}
            </li>
            <li>
              <span className="font-semibold">Điểm trả:</span> {ticket.dropOffPoint} - {ticket.dropOffAddress}
            </li>
            <li>
              <span className="font-semibold">Ngày khởi hành:</span> {formatDate(ticket.departureDay)}
            </li>
            <li>
              <span className="font-semibold">Giờ khởi hành:</span> {ticket.departureTime}
            </li>
            <li>
              <span className="font-semibold">Ghế:</span> {ticket.seatName}
            </li>
            <li>
              <span className="font-semibold">Tổng số ghế:</span> {ticket.totalSeat}
            </li>
            <li>
              <span className="font-semibold">Giá vé:</span> {(ticket.price * ticket.totalSeat).toLocaleString()} VND
            </li>
            <li>
              <span className={`font-semibold ${ticket.isCancel ? "text-red-500" : "text-green-500"}`}>
                Trạng thái: {ticket.isCancel ? "Đã hủy" : "Đã đặt"}
              </span>
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}