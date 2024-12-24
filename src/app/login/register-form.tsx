'use client'
import { post } from "@/api/api";
import { useNotificationContext } from "@/context/NotificationContextProvider";
import {EllipsisOutlined, EyeInvisibleOutlined, EyeTwoTone, InfoCircleOutlined, UserOutlined} from "@ant-design/icons";
import {Button, Flex, Input, Tooltip} from "antd";
import {useState} from "react";

export default function RegisterForm() {

  const [process, setProcess] = useState(1)
  const [otp, setOtp] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const { notify } = useNotificationContext();

  const sharedProps = {
    onChange: (newOtp: any) => setOtp(newOtp),
    value: otp,
  }

  const handleNext = () => {
    if (process === 1) {
      // if (!otp) {
      //   alert('Vui l ng nh p m  x c th c')
      //   return
      // }
      setProcess(3)
    } else if (process === 2) {
      // if (!password || !confirmPassword) {
      //   alert('Vui l ng nh p m t kh u')
      //   return
      // }
      // if (password !== confirmPassword) {
      //   alert('M t kh u kh ng kh p')
      //   return
      // }
      setProcess(3)
    }
    else if (process === 3) {
      registerAction()
    }
  }


  const registerAction = async ()=> {
    if (password !== confirmPassword) {
      notify.info("Mật khẩu xác nhận không giống nhau, vui lòng thử lại")
      return
    }
    console.log(email, otp, password)
    try {
      const register = {  
        username : email,
        password : password, 
      }
      const data = await post("/auth/register", register);
      notify.info("Đăng kí thành công vui lòng đăng nhập")
    }
    catch (error) {
      console.error("Error fetching data:", error);
      notify.info("Email đã có người sử dụng")
    }
    finally {

    }
  }



  return (
    <div
    >

      { process == 1 && (
        <Input
          
          placeholder="Nhập email"
          prefix={<UserOutlined style={{color: 'rgba(0,0,0,.25)'}}/>}
          suffix={
            <Tooltip title="Nhập email">
              <InfoCircleOutlined style={{color: 'rgba(0,0,0,.45)'}}/>
            </Tooltip>
            
          }
          onChange={(e) => setEmail(e.target.value)}
          rootClassName={"mt-6 p-3"}
        />
      )}

      { process === 2 && (
        <div>
          <div className={"w-full text-center font-medium text-xl text-orange-600"}>Nh p m  x c th c</div>
          <Flex gap="middle"  vertical className={"mt-3 p-3 mx-6"}>
            <Input.OTP mask="🔒" {...sharedProps} datatype={"number"} />
          </Flex>
        </div>
      )}

      { process === 3 && (
        <div>
          <Input.Password
            
            placeholder="Nhập mật khẩu"
            prefix={<EllipsisOutlined/>}
            iconRender={(visible) => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}
            rootClassName={"mt-6 p-3"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input.Password
           
            placeholder="Xác nhân mật khẩu"
            prefix={<EllipsisOutlined/>}
            iconRender={(visible) => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}
            rootClassName={"mt-6 p-3"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
      )
      }

      <Button className={"p-5 mt-6 text-white bg-orange-600 cursor-pointer rounded-3xl w-full hover:bg-orange-600"}
              onClick={handleNext}
      >
        {process !== 3 ? 'Tiếp tục' : 'Đăng ký'}
        
      </Button>

    </div>
  )
}
