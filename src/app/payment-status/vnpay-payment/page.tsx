"use client"
import {useSearchParams} from "next/navigation";
import {useEffect} from "react";
import { Suspense } from 'react';


function PaymentStatus() {
  const queryParams = useSearchParams();

  const vnpAmount = queryParams.get('vnp_Amount');
  const vnpBankCode = queryParams.get('vnp_BankCode');
  const vnpBankTranNo = queryParams.get('vnp_BankTranNo');
  const vnpCardType = queryParams.get('vnp_CardType');
  const vnpOrderInfo = queryParams.get('vnp_OrderInfo');
  const vnpPayDate = queryParams.get('vnp_PayDate')
  const vnpTransactionNo = queryParams.get('vnp_TransactionNo');
  const vnpTransactionStatus = queryParams.get('vnp_TransactionStatus')

  function formatPaymentStatus(status: string | null) {
    return status === "00" ? " Thành công " : " Thất bại ";
  }
  function formatToVND(valueString :string | null) {
    if (valueString === null) return "";
    // Chia số cho 100 và làm tròn xuống số nguyên gần nhất
    const number = parseInt(valueString) / 100;

    // Định dạng số theo phần nghìn mà không có phần thập phân
    const formattedNumber = number.toLocaleString('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0, // Loại bỏ phần thập phân
    });

    return formattedNumber;
  }


  function formatDateTime(inputString: string| null) {
    if (inputString === null) return "";
    if (inputString.length !== 14) {
      throw new Error('Input string must be exactly 14 characters long');
    }

    const year = inputString.slice(0, 4);
    const month = inputString.slice(4, 6);
    const day = inputString.slice(6, 8);
    const hour = inputString.slice(8, 10);
    const minute = inputString.slice(10, 12);
    const second = inputString.slice(12, 14);

    return `${day}/${month}/${year} ${hour}:${minute}:${second}`;
  }

  function PaymentStatusCode(vnpTransactionStatus:string | null) {
    const statusClass = (vnpTransactionStatus === "00" ? "text-green-800" : "text-red-500")
    return (
      <span className={statusClass}>{formatPaymentStatus(vnpTransactionStatus)}</span>
    );
  }


  useEffect(() => {
    // Lấy URL hiện tại
    const currentUrl = window.location.href;

    // Thay đổi hostname và port cho URL mới
    const newUrl = currentUrl.replace('localhost:3000/payment-status/vnpay-payment', 'localhost:8080/payment/VNPay/status');
    console.log(newUrl)

    // Thực hiện yêu cầu GET đến server mới ngay khi component được mount
    fetch(newUrl)
      .then(response => response.json())
      .then(data => {
        console.log('Data received from server: ', data);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });

  }, []);

  return (
    <div className="flex justify-center items-center">

      <div className=" rounded-xl border border-[#DDE2E8] bg-white px-4 py-3 text-[15px] m-4 w-1/2">
        <p className="text-xl font-medium text-black text-center">Thông tin trạng thái thanh toán:
          {/*<span>{formatPaymentStatus(vnpTransactionStatus)}</span>*/}
          {PaymentStatusCode(vnpTransactionStatus)}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-gray">Số tiền thanh toán:</span>
          <span className="text-green-700">{formatToVND(vnpAmount)}</span>
        </div>
        <div className="mt-1 flex items-center justify-between">
          <span className="text-gray">Phương thức thanh toán:</span>
          <span className="text-black">{vnpCardType + " " + vnpBankCode}</span>
        </div>
        <div className="mt-1 flex items-center justify-between">
          <span className="text-gray">Thông tin giao dịch:</span>
          <span className="text-orange-500">{vnpOrderInfo}</span>
        </div>
        <div className="mt-1 flex items-center justify-between">
          <span className="text-gray">Thời gian giao dịch:</span>
          <span className="text-black">{formatDateTime(vnpPayDate)}</span>
        </div>
        <div className="mt-1 flex items-center justify-between">
          <span className="text-gray">Trạng thái thanh toán:</span>
          <span className="text-black">{PaymentStatusCode(vnpTransactionStatus) }</span>
        </div>

        <div className="mt-1 flex items-center justify-between">
          <span className="text-gray">Mã đối chiếu giao dịch VnPay:</span>
          <span className="text-black">{vnpTransactionNo}</span>
        </div>

        <div className="flex justify-center mt-4">
          <a href="/" className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
            Trở về trang chủ
          </a>
        </div>

      </div>
    </div>
  );
}


export default function PaymentStatusPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentStatus />
    </Suspense>
  );
}