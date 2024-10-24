"use client"
import { post } from "@/api/api";
import { useAuthContext } from "@/context/AuthContextProvider";
import { useNotificationContext } from "@/context/NotificationContextProvider";
import { Login } from "@/types/models/Login";
import { EllipsisOutlined, InfoCircleOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Tooltip } from "antd";
import FormItem from "antd/es/form/FormItem";
import { useRouter } from "next/navigation";
export default function LoginForm() {
  const {isAuthenticated, login} = useAuthContext();
  const { notify } = useNotificationContext();
  const router = useRouter();

  const onFinish = async (values: Login) => {
    try {
      const response = await post("/auth/login", values);
      notify.success('Login successfully');
      login(response.accessToken);
      router.push('/');
    } catch (error: any) {
      notify.error(error.message || 'Something went wrong!');
    }
  };


  return (
    <Form
      onFinish={onFinish}
    >
    
      <Form.Item name={"username"}  className="w-full">
        <Input 
          placeholder="Nhập email"
          prefix={<UserOutlined style={{color: 'rgba(0,0,0,.25)'}}/>}
          suffix={
            <Tooltip title="Nhập email">
              <InfoCircleOutlined style={{color: 'rgba(0,0,0,.45)'}}/>
            </Tooltip>
          }
        ></Input>
      </Form.Item>

      <FormItem name={"password"}>
        <Input.Password 
          placeholder="Nhập mật khẩu"
          prefix={<EllipsisOutlined/>}
          // iconRender={(visible) => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}
          >
          </Input.Password>
      </FormItem>  

      <Form.Item>
        <Button className={"p-5 mt-6 text-white bg-orange-600 cursor-pointer rounded-3xl w-full hover:bg-orange-600"} htmlType="submit">
          Đăng nhập
        </Button>
      </Form.Item>

      <div className={"text-orange-600 mt-5 font-medium cursor-pointer"}>Quên mật khẩu?</div>
    </Form>


  )
}