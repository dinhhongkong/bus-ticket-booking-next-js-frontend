import { Tabs } from "antd";
import Image from 'next/image'
import LoginForm from "./login-from";
import RegisterForm from "./register-form";

const items = [
  {
    key: '1',
    label: 'ĐĂNG NHẬP',
    children: <LoginForm/>
  },
  {
    key: '2',
    label: 'ĐĂNG KÝ',
    children: <RegisterForm/>
  }
];


export default function LoginPage() {
  return(
    <main className={"w-full"}>
      <div className={"relative max-w-[1128px] mx-auto pt-[360px] flex flex-col"}>
        <div className={"absolute max-w-[1128px] top-[-110px] h-[471px] w-full border-orange-500 shadow-xl bg-[#fff] rounded-xl flex justify-center"}>

          {/*ảnh trang trí*/}
          <div className={"relative hidden flex-auto flex-col items-start lg:flex"}>
            <div className={"absolute left-10 top-8"}>
              <div className={"relative min-h-[77px] min-w-[366px] object-cover"}>
                <Image className={"transition-all duration-200 relative min-h-[77px] min-w-[366px] object-cover"}
                       src={"/assets/logoText.svg"}
                       alt={"logo"} width={200} height={200}
                />
              </div>
            </div>


            <div className={"absolute bottom-0 left-0 right-0 top-14"}>
              <div className={"relative aspect-[3/2] w-full max-w-[600px] object-cover"}>
                <Image
                  className={"transition-all duration-200 relative aspect-[3/2] w-full max-w-[600px] object-cover"}
                  src={"/assets/TVC.svg"} alt={"banner"} width={50} height={50}/>

              </div>
            </div>
          </div>


          <div className={"mt-8 mr-8 flex w-full flex-col  items-center sm:w-[480px]"}>
            <div className="text-2xl  font-medium">Đăng nhập tài khoản</div>
            <Tabs defaultActiveKey="1"
                  items={items}
                  className="w-full mx-1"
            >
            </Tabs>
          </div>

        </div>
      </div>
    </main>
  )
}