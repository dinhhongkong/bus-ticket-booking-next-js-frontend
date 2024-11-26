"use client";

import { post } from "@/api/api";
import TripDetailCard from "@/components/trip/TripDetailsCard";
import { useNotificationContext } from "@/context/NotificationContextProvider";
import { useBooking } from "@/hooks/custom/BookingHook";
import { useBookingInfo } from "@/hooks/custom/BookingInfoHook";
import { PaymentRequest } from "@/types/models/Booking";
import { formatCurrency } from "@/utils/formatCurrency";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Payment() {
  const searchParams = useSearchParams();
  const invoiceId = searchParams.get("invoiceId");
  const isRoundTrip = searchParams.get("isRoundTrip") === "true";
  const tripId = searchParams.get("tripId");
  const returnTripId = searchParams.get("returnTripId");

  const { notify } = useNotificationContext();


  const {
    selectedSeatsDepart,
    setSelectedSeatsDepart,
    selectedSeatsReturn,
    setSelectedSeatsReturn,
    departureTrip,
    roundTrip,
  } = useBooking(tripId, returnTripId, isRoundTrip);

  const { bookingInfo } = useBookingInfo(
    invoiceId,
    tripId,
    returnTripId,
    isRoundTrip
  );

  const [paymentRequest, setPaymentRequest] = useState<PaymentRequest>({
    invoiceId: Number(invoiceId),
    total: 0,
    paymentMethod: "",
  });

  useEffect(() => {
    bookingInfo.trip.map((tripItem) => {
      console.log(tripItem);
      if (tripItem.tripId.toString() === tripId) {
        setSelectedSeatsDepart(tripItem.tickets);
        console.log(tripItem.tickets + "đay la trip");
      }

      if (tripItem.tripId.toString() === returnTripId) {
        setSelectedSeatsReturn(tripItem.tickets);
        console.log(tripItem.tickets + "đay la return trip");
      }
    });
  }, [bookingInfo]);

  useEffect(() => {
    setPaymentRequest((prevState) => ({
      ...prevState,
      total:
        selectedSeatsDepart.length * departureTrip.price +
        selectedSeatsReturn.length * roundTrip.price,
    }));
  }, [selectedSeatsDepart, selectedSeatsReturn, bookingInfo]);

  const paymentVNPay = async () => {
    try {
      const response = await post(`/payment/VNPay`, paymentRequest);
      window.location.href = response;

    }
    catch (error : any) {
      notify.info("Lỗi server, quý khách vui lòng thử lại");
    }
    
  }


  const onClickPayment = () => {
    if (paymentRequest.paymentMethod === "") {
      notify.info("Quý khách vui lòng chọn phương thức thanh toán");
      return;
    }
    else if (paymentRequest.paymentMethod === "ZALOPAY") {
      notify.info("ZALO PAY đang bảo trì, quý khách vui lòng chọn phương thức thanh toán khác");
      return;
    }
    else if (paymentRequest.paymentMethod === "VNPAY") {
      paymentVNPay();
    }
    
  };

  return (
    <div className="flex flex-wrap justify-center max-w-4xl mx-auto pb-24">
      <div className="w-1/2 p-4">
        {/*payment method*/}
        <div className=" mb-5 flex-col 2lg:flex border border-[#DDE2E8] rounded-xl">
          <div className=" mt-3 ml-3 text-xl font-medium">
            {" "}
            Chọn phương thức thanh toán
          </div>
          <div className="ant-radio-group rounded p-3 ant-radio-group-outline">
            {/*Zalopay*/}
            <label className="ant-radio-wrapper m-0 flex items-center border-b py-3">
              <span className="ant-radio">
                <input
                  type="radio"
                  className="ant-radio-input"
                  name={"paymentMethod"}
                  value={"ZALOPAY"}
                  onChange={() =>
                    setPaymentRequest((prevState) => ({
                      ...prevState,
                      paymentMethod: "ZALOPAY",
                    }))
                  }
                />
                <span className="ant-radio-inner"></span>
              </span>
              <span>
                <div className="flex w-full items-center">
                  <img
                    className="ml-4 mr-4 w-[40px]"
                    src="https://storage.googleapis.com/futa-busline-web-cms-prod/zalo_a38c879763/zalo_a38c879763.svg"
                    alt=""
                  />
                  <div className="flex w-full flex-col">
                    <div className="flex w-52 items-end justify-between">
                      <span className="text-base text-black">ZaloPay</span>
                    </div>
                  </div>
                </div>
              </span>
            </label>

            {/*vnpay*/}
            <label className="ant-radio-wrapper m-0 flex items-center border-b py-3">
              <span className="ant-radio">
                <input
                  type="radio"
                  className="ant-radio-input"
                  name={"paymentMethod"}
                  value={"VNPAY"}
                  onChange={() =>
                    setPaymentRequest((prevState) => ({
                      ...prevState,
                      paymentMethod: "VNPAY",
                    }))
                  }
                />
                <span className="ant-radio-inner"></span>
              </span>
              <span>
                <div className="flex w-full items-center">
                  <img
                    className="ml-4 mr-4 w-[40px]"
                    src="https://storage.googleapis.com/futa-busline-web-cms-prod/vnpay_fdc107eeec/vnpay_fdc107eeec.svg"
                    alt=""
                  />
                  <div className="flex w-full flex-col">
                    <div className="flex w-52 items-end justify-between">
                      <span className="text-base text-black">VNPay</span>
                    </div>
                  </div>
                </div>
              </span>
            </label>
          </div>
          <div className="flex justify-center p-2">
            <button className=" rounded-lg p-3 bg-orange-500 text-white font-semibold"
              onClick={onClickPayment}>
              
              Thanh toán
            </button>
          </div>
        </div>

        {/*price details*/}

        <div className="w-full  rounded-xl border border-[#DDE2E8] bg-white px-4 py-3 text-[15px]">
          <div className="icon-orange flex gap-2 text-xl font-medium text-black">
            Chi tiết giá
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-gray">Giá vé lượt đi</span>
            <span className="text-orange">
              {formatCurrency(selectedSeatsDepart.length * departureTrip.price)}
            </span>
          </div>
          {isRoundTrip && (
            <div className="mt-1 flex items-center justify-between">
              <span className="text-gray">Giá vé lượt về</span>
              <span className="text-orange">
                {formatCurrency(selectedSeatsReturn.length * roundTrip.price)}
              </span>
            </div>
          )}

          <div className="mt-1 flex items-center justify-between">
            <span className="text-gray">Phí thanh toán</span>
            <span className="text-black">0đ</span>
          </div>
          <div className="divide my-3"></div>
          <div className="flex items-center justify-between">
            <span className="text-gray">Tổng tiền</span>
            <span className="text-orange">
              {formatCurrency(
                selectedSeatsDepart.length * departureTrip.price +
                  selectedSeatsReturn.length * roundTrip.price
              )}
            </span>
          </div>
        </div>
      </div>

      <div className="w-1/2 p-4">
        {/*Thông tin hàng khách*/}
        <div className="w-full mb-5 rounded-xl border border-[#DDE2E8] bg-white px-4 py-3 text-[15px]">
          <p className="text-xl font-medium text-black">Thông tin hành khách</p>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-gray w-28">Họ và tên</span>
            <span className="text-black">{bookingInfo.fullName}</span>
          </div>
          <div className="mt-1 flex items-center justify-between">
            <span className="text-gray w-28">Số điện thoại</span>
            <span className="text-black">{bookingInfo.phoneNumber}</span>
          </div>
          <div className="mt-1 flex items-center justify-between">
            <span className="text-gray w-28">Email</span>
            <span className="text-black">{bookingInfo.email}</span>
          </div>
        </div>

        {/*Thông tin chuyến đi*/}
        <TripDetailCard
          title={"lượt đi"}
          date={departureTrip?.departureDay}
          time={departureTrip?.departureTime}
          price={departureTrip?.price}
          seats={selectedSeatsDepart}
          provinceStart={departureTrip?.departureProvince}
          provinceEnd={departureTrip?.destProvince}
        />
        <div className={"h-4"} />

        {isRoundTrip && (
          <TripDetailCard
            title={"lượt về"}
            date={roundTrip?.departureDay}
            time={roundTrip?.departureTime}
            price={roundTrip?.price}
            seats={selectedSeatsReturn}
            provinceStart={roundTrip?.departureProvince}
            provinceEnd={roundTrip?.destProvince}
          />
        )}
      </div>
    </div>
  );
}
