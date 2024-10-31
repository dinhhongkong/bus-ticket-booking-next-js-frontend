"use client";
import { DatePicker, FloatButton, Input } from "antd";
import Image from "next/image";
import dayjs from "dayjs";
import { WechatOutlined } from "@ant-design/icons";
import { ProChat } from "@ant-design/pro-chat";
import PopupChat from "@/components/popup-chat/PopupChat";
import ProvincePicker from "@/components/home/ProvincePicker";
import { useState } from "react";
import { Province } from "@/types/models/Province";
import { useProvince } from "@/hooks/custom/ProvinceHook";
import {  useSearchTrip } from "@/hooks/custom/SearchTripHook";

const dateFormat = "DD-MM-YYYY";
export default function Home() {
  const { provinces } = useProvince();
  const [ isRoundTrip, setIsRoundTrip ] = useState<boolean>(false);
  const { departureTrip, roundTrip, fetchSearchTrip, fetchSearchRoundTrip,  setSearchParams } = useSearchTrip();

  const onChangeValueSearch = (name: string, value: any) => {
    setSearchParams(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const onSubmitSearch = () => {
    if (isRoundTrip) {
      fetchSearchRoundTrip();
    } else {
      fetchSearchTrip();
    }
    
  }

  return (
    <div className={"w-full "}>
      <div className={`layout pb-2 md:pb-8 lg:block`}>
        {/*search trips*/}
        <section
          className={`layout relative flex flex-col`}
          style={{ top: "-90px" }}
        >
          <div className={`relative left-0 right-0 z-30`}>
            <div
              className={` xl:w-[1128px] relative mx-auto mb-10 h-[250px] cursor-pointer rounded-xl lg:flex`}
            >
              <Image
                src={"/assets/Artboard.png"}
                alt={"banner"}
                layout="fill"
                objectFit="cover"
                className={` transition-all duration-200 relative mx-auto mb-10 hidden h-[250px] w-full cursor-pointer rounded-xl lg:flex`}
              />
            </div>

            <div
              className={`p-6 m-2 font-medium lg:m-auto xl:w-[1128px] shadow-md border-2 rounded-xl`}
            >
              {/*select ticket type*/}
              <div className={"flex items-center justify-between text-[15px]"}>
                <div>
                  <label>
                    <span>
                      <input
                        name={"isRoundTrip"}
                        value={0}
                        className={"align-middle mx-1"}
                        type={"radio"}
                        defaultChecked
                        onClick={() => setIsRoundTrip(false)}
                      />
                    </span>
                    <span
                      className={
                        "font-medium " + (true ? "" : "text-orange-600")
                      }
                    >
                      Một chiều
                    </span>
                  </label>

                  <label className={"ml-4"}>
                    <span>
                      <input
                        name={"isRoundTrip"}
                        value={1}
                        className={"align-middle mx-1 "}
                        type={"radio"}
                        onClick={() => setIsRoundTrip(true)}

                      />
                    </span>
                    <span
                      className={
                        "font-medium " + (true ? "text-orange-600" : "")
                      }
                    >
                      Khứ hồi
                    </span>
                  </label>
                </div>

                <span className="cursor-pointer font-medium text-orange-600 lg:contents">
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="/huong-dan-dat-ve-tren-web"
                  >
                    Hướng dẫn mua vé
                  </a>
                </span>
              </div>

              <div
                className={"grid grid-cols-1 pb-4 pt-4 lg:grid-cols-2 lg:gap-4"}
              >
                <div className={"relative flex justify-center lg:gap-4"}>
                  <div className="flex-1">
                    <label>Điểm đi</label>
                    <div
                      className={` item-start mt-1 flex w-full cursor-pointer font-medium lg:items-center text-base lg:text-lg`}
                    >
                      <ProvincePicker
                        title={"Điểm đi"}
                        provinces={provinces}
                        onSelectProvince={(id: number, name: string) =>
                          onChangeValueSearch("departureProvinceId",id)
                        }
                      />
                    </div>
                  </div>

                  <Image
                    className={`absolute z-10 cursor-pointer object-contain transition-transform duration-300 transform rotate-0 bottom-6 h-8 w-8 lg:bottom-5 lg:h-10 lg:w-10`}
                    width={50}
                    height={50}
                    src={"/assets/switch_location.svg"}
                    alt="switch location icon"
                  />

                  <div className="flex-1 text-right lg:text-left">
                    <label>Điểm đến</label>
                    <div
                      className={` item-start mt-1 flex w-full cursor-pointer font-medium lg:items-center justify-end lg:justify-start text-base lg:text-lg `}
                    >
                      <ProvincePicker
                        title={"Điểm đi"}
                        provinces={provinces}
                        onSelectProvince={(id: number, name: string) =>
                          onChangeValueSearch("destinationProvinceId",id)
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className={"flex"}>
                  {/*Chọn ngày đi*/}
                  <div className="mr-4 flex flex-1 flex-col">
                    <label>Ngày đi</label>
                    <div
                      className={`item-start mt-1 flex w-full cursor-pointer font-medium lg:items-center text-base lg:text-lg `}
                    >
                      <span className="max-w-[140px] lg:max-w-[220px] z-20 focus:outline-none">
                        <DatePicker
                          placeholder="Nhập ngày đi"
                          size="large"
                          format={dateFormat}
                          minDate={dayjs()}
                          onChange={(date) => {
                              console.log(date.format("YYYY-MM-DD"));
                              onChangeValueSearch("startDate", date.format("YYYY-MM-DD"))
                            }
                          }
                        />
                      </span>
                    </div>
                  </div>

                  {/*Chọn ngày về*/}
                  {isRoundTrip && (
                    <div className="mr-4 flex flex-1 flex-col">
                      <label>Ngày về</label>
                      <div
                        className={`item-start mt-1 flex w-full cursor-pointer font-medium lg:items-center text-base lg:text-lg `}
                      >
                        <span className="max-w-[140px] lg:max-w-[220px] z-20 focus:outline-none">
                          <DatePicker
                            placeholder="Nhập ngày về"
                            color="orange"
                            size="large"
                            format={dateFormat}
                            minDate={dayjs()}
                            onChange={(date) => {
                              onChangeValueSearch("endDate", date.format("YYYY-MM-DD"))
                              }
                            }
                          />
                    
                        </span>
                      </div>
                    </div>
                  )}

                  {/*Chọn số vé*/}
                  <div
                    className={
                      "mr-4 flex flex-1 flex-col " +
                      (isRoundTrip ? "max-w-[90px]" : "")
                    }
                  >
                    <label>Số vé</label>
                    <div
                      className={`  item-start mt-1 flex w-full cursor-pointer font-medium lg:items-center text-base lg:text-lg border rounded `}
                    >
                      <span className="max-w-[140px] lg:max-w-[220px] z-20 focus:outline-none px-3 py-1">
                        1
                      </span>
                    </div>
                  </div>
                </div>

                <div className="divide my-3 lg:hidden"></div>
              </div>
              <div className="relative z-10 flex w-full justify-center">
                <button className="absolute h-12 rounded-full bg-orange-600 px-20 text-base text-white transition duration-200" onClick={ onSubmitSearch}>
                  Tìm chuyến xe
                </button>
              </div>
            </div>
          </div>
        </section>

        <div className={"xl:w-[1128px] mx-auto mt-12"}>
          <div className={"flex justify-between gap-10 "}>
            {/*filter*/}
            <div
              className={
                "w-[300px] min-w-[300px] h-full sticky top-4 border shadow-xl rounded-xl"
              }
            >
              <div className={"flex justify-between p-4"}>
                <div>Bộ lọc tìm kiếm</div>
                <div className={"cursor-pointer text-[#E12424]"}>Bỏ lọc</div>
              </div>
              <div className={"p-4"}>
                <span>Giờ đi</span>
                <div>
                  <label>
                    <span>
                      <input type={"checkbox"} />
                    </span>
                    <span className={"font-medium ml-2"}>
                      Sáng sớm 00:00 - 06:00
                    </span>
                  </label>
                </div>

                <div>
                  <label>
                    <span>
                      <input type={"checkbox"} />
                    </span>
                    <span className={"font-medium ml-2"}>
                      Buổi sáng 06:00 - 12:00
                    </span>
                  </label>
                </div>

                <div>
                  <label>
                    <span>
                      <input type={"checkbox"} />
                    </span>
                    <span className={"font-medium ml-2"}>
                      Buổi chiều 12:00 - 18:00
                    </span>
                  </label>
                </div>

                <div>
                  <label>
                    <span>
                      <input type={"checkbox"} />
                    </span>
                    <span className={"font-medium ml-2"}>
                      Sáng tối 18:00 - 24:00
                    </span>
                  </label>
                </div>
              </div>

              <div
                className={"w-full h-[1px] bg-black opacity-10 rounded-xl"}
              />

              <div className={"p-4"}>
                <div>Loại xe</div>
                <div className={"mt-4 flex flex-wrap gap-2"}>
                  <div
                    className={
                      "cursor-pointer rounded-md py-1 px-3 border text-[14px] font-normal"
                    }
                  >
                    Ghế
                  </div>
                  <div
                    className={
                      "cursor-pointer rounded-md py-1 px-3 border text-[14px] font-normal"
                    }
                  >
                    Giường nằm
                  </div>
                  <div
                    className={
                      "cursor-pointer rounded-md py-1 px-3 border text-[14px] font-normal"
                    }
                  >
                    Limosine
                  </div>
                </div>
              </div>
            </div>

            {/*trip*/}

            {/*filter*/}
          </div>
        </div>
      </div>

    

      {/* <PopupChat />

      
      <FloatButton
        icon={<WechatOutlined style={{ fontSize: "25px" }} />}
        description="Chatbot"
        shape="circle"
        style={{
          width: "70px",
          height: "70px",
          fontSize: "24px",
          backgroundColor: "#fb923c",
        }}
      /> */}
    </div>
  );
}
