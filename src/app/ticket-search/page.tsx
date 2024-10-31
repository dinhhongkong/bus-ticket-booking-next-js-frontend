"use client"
import { Button, Form, Input } from "antd";

export default function TicketSearchPage() {
  return (
    <div className="px-64">
      <div className="m-4 text-green-700 font-bold text-center text-xl ">
        TRA CỨU THÔNG TIN ĐẶT VÉ
      </div>
      <Form>
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
    </div>
  )
}