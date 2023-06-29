import { Song } from "../App"
import SongComponent from "./SongComponent"
import React, { useState,useEffect } from 'react';
import { Button, Typography, Form, Input , Alert} from 'antd';
import { useNavigate   } from "react-router-dom";


type setLogingFunction = (param: boolean ) => void;

interface LoginComponentProps {
   setLogin:setLogingFunction
}

const { Title, Paragraph, Text, Link } = Typography;

let LoginComponent : React.FC<LoginComponentProps>= (props) => {

    let [uniqueName, setUniqueName ]= useState<string>("")
    let [password, setPassword ]= useState<string>("")
    let [alert, setAlert ]= useState<boolean>(false)
    const navigate  = useNavigate();
    
    useEffect(() => {
        setAlert(false)
    }, [password, uniqueName])

    let changeName = (e: React.FormEvent<HTMLInputElement>) => {
        setUniqueName(e.currentTarget.value)
    }

    let changePassword = (e: React.FormEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value)
    }

    let login=async()=>{

        let response = await fetch ("http://192.168.31.75:4000/public/users/verification",{
        
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                uniqueName : uniqueName,
                password: password
            })
        })
        if(response.ok){
            let data = await response.json()
            if(data.apiKey){
                localStorage.setItem('apiKey', data.apiKey);
                localStorage.setItem('userId', data.userId);
                localStorage.setItem('name', data.name);
                //setCookieObjectApiKey("apiKey", data.apiKey, { path: '/' } )
                console.log(localStorage.getItem('apiKey'))
                navigate("/")
                props.setLogin(true)
                setUniqueName("")
                setPassword("")
            }else{
                setAlert(true)
            }
           
        }
    }
    return(
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            style={{alignItems:"center", display:"flex", flexDirection:"column", justifyContent:"center",minHeight:"80vh"}}
            initialValues={{ remember: true }}
            onFinish={login}
            autoComplete="off"
        >
            <Title  level={2} >
                Login to your profile
            </Title >
            {alert==true && 
            <Alert style={{width:"300px"}} message="Wrong data" type="error" showIcon />}

            <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input onChange={changeName}  style={{width:300 }}/>
            </Form.Item>
       
            <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password style={{width:300 }} onChange={changePassword}/>
            </Form.Item>


            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Login
                </Button>
                
            </Form.Item>
            <Form.Item style={{display:"flex"}}>
                <Text >You do not have an account?<Button type="link" onClick={()=>{navigate("/registration")}} >Sign up</Button></Text>
            </Form.Item>
        </Form>
  
    )
}
  
export default LoginComponent;
  