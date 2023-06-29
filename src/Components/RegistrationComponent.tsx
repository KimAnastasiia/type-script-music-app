import { Song } from "../App"
import SongComponent from "./SongComponent"
import { PlusOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import {
    Button,
    Row,
    Checkbox,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Radio,
    Select,
    Alert,
    Typography,
    Upload,
    UploadProps,
  } from 'antd';
import { useNavigate   } from "react-router-dom";
import { RcFile } from "antd/es/upload";


type setLogingFunction = (param: boolean ) => void;

interface RegistrationComponentProps {
   setLogin:setLogingFunction
}


let RegistrationComponent : React.FC<RegistrationComponentProps>= (props) => {

    let [uniqueName, setUniqueName ]= useState<string>("")
    let [password, setPassword ]= useState<string>("")
    let [passwordCheck, setPasswordCheck ]= useState<string>("")
    let [passwordAlert, setPasswordAlert ]= useState<boolean>(false)
    let [myFile, setMyFile]=useState<any>()

    //const [cookieObjectApiKey, setCookieObjectApiKey, removeCookiObjectApiKey] = useCookies(['apiKey', "id"]);
    const { Title, Paragraph, Text, Link } = Typography;
    const navigate  = useNavigate();

    useEffect(() => {
      if(password==passwordCheck){
      setPasswordAlert(false)}
      console.log(localStorage.getItem('apiKey'))
    }, [passwordCheck])

    let changeName = (e: React.FormEvent<HTMLInputElement>) => {
        setUniqueName(e.currentTarget.value)
    }
    let changePassword = (e: React.FormEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value)
    }
    let changePasswordCheck = (e: React.FormEvent<HTMLInputElement>) => {

      setPasswordCheck(e.currentTarget.value)

      if(password!=e.currentTarget.value){
          setPasswordAlert(true)
      }else{
          setPasswordAlert(false)
      }
    }
    let makeAccount=async()=>{
        if(passwordAlert==false){
                let response = await fetch ("http://192.168.31.75:4000/public/users",{

                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json'
                    },

                    body:
                    JSON.stringify({ 
                    uniqueName:uniqueName,
                    password:password
                    })
                })
               
                if(response.ok){
                    let data = await response.json()
                    if(data.apiKey){
                        localStorage.setItem('apiKey', data.apiKey);
                        localStorage.setItem('name', data.name);
                        localStorage.setItem('userId', data.userId);
                        //setCookieObjectApiKey("apiKey", data.apiKey, { path: '/' } )
                        console.log(localStorage.getItem('apiKey'))
                        navigate("/")
                        props.setLogin(true)
                    }
                    setUniqueName("")
                    setPassword("")
                    changePhoto(data.apiKey)
                }
        }
    }
    let chageValueImage =(file: any)=>{
      console.log(file)
      if(file!=undefined && file!=null){
        setMyFile(file)
      }
    }

    let changePhoto=async(apiKey:string)=>{
      const formData = new FormData();
      formData.append('myImage', myFile);
      let response = await fetch ("http://192.168.31.75:4000/users/photo?apiKey="+apiKey,{
          method: 'PUT',
          body: formData
      })

    }
    return(
      <Row justify="center" align="middle" style={{ minHeight:"80vh"}}>

        <Form
          labelCol={{ span: 9 }}
          wrapperCol={{ span: 14 }}
          style={{alignItems:"center", display:"flex", flexDirection:"column", justifyContent:"center", width:700}}
          onFinish={makeAccount}
        >
          <Title  level={2}>
              Make your account
          </Title >

          <Form.Item   label="Unique name" name="Unique name" rules={[{ required: true }]}>
            <Input onChange={changeName} />
          </Form.Item>

          <Form.Item  label="Password"  name="Password" rules={[{ required: true }]}>
            <Input.Password onChange={changePassword} />
          </Form.Item>

          {passwordAlert==true && 
          <Alert style={{width:"450px"}} message="Your passwords don't match" type="error" showIcon />}

          <Form.Item label="Password check"  name="Password check" rules={[{ required: true }]}>
            <Input.Password type="password" onBlur={changePasswordCheck} />
          </Form.Item>

          <Form.Item label="Upload" valuePropName="fileList">
            <Upload beforeUpload ={ (file) => {chageValueImage(file)} }  listType="picture-circle">
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>

          <Form.Item >
            <Button  type="primary" htmlType="submit" >Registr</Button>
          </Form.Item>
          <Button type="primary" ghost onClick={()=>{navigate("/login")}} >I already have an account</Button>
          
        </Form>


    </Row>
    )
}
  
export default RegistrationComponent;
  