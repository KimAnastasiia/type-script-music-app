import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import { Route, Routes, Link } from "react-router-dom"
import ListOfSongsComponent from './Components/ListOfSongsComponent';
import SearchSongsComponent from './Components/SearchSongsComponent';
import LoginComponent from './Components/LoginComponent';
import MyPlayListComponent from './Components/MyPlayListComponent';
import RegistrationComponent from './Components/RegistrationComponent';
import { Layout, Menu, Typography, Button } from 'antd';
import { PlaySquareOutlined , LoginOutlined, LogoutOutlined } from '@ant-design/icons';

export interface Song {

  trackName:string,
  trackPrice:number,
  releaseDate:string,
  artworkUrl100:string

}

let App = () => {

  let [listOfSongs,setListOfSongs] = useState<Song[]>([]);  
  const { Title, Paragraph, Text } = Typography;
  let [loading,setLoading] = useState<boolean>(false)

  let [login, setLogin]= useState<boolean>(false)

  const { Header, Footer, Sider, Content } = Layout;
  const apiKey = localStorage.getItem('apiKey');

  useEffect(() => {

    doRequestToBackEnd();

    if(apiKey){
      setLogin(true)
    }
  }, [])

  let doRequestToBackEnd = async () => {
    let response = await fetch("https://itunes.apple.com/search?term=melendi") // simple do get
    if ( response.ok ){
      let jsonData = await response.json();
      setListOfSongs(jsonData.results)
    }
  }
  let logOut=()=>{

    setLogin(false)
    localStorage.setItem('apiKey', "")
    localStorage.setItem('userId', "")

  }

  let menuOptions = [
    { key:"logo",  label: <Link to="/" > <div  style={{ width:60, height:60,display:"flex", alignItems:"center",justifyContent:"center" }}><img src="/music-player.png"  width={30} height={30}/></div></Link> },
    { key:"name",  label: <Link to="#" >{localStorage.getItem('name')}</Link> },
    { key:"search",  label: <SearchSongsComponent setLogin={setLogin} setSongs={setListOfSongs} login={login} setLoading={setLoading}/>},
    { key:"playList",  label:  <Link to="/myPlayList">My play list</Link>, icon: <PlaySquareOutlined />},
    { key:"playList",  label:  <Link to="#" onClick={logOut}> Log out</Link>, icon: <LogoutOutlined />}
  ]

  if ( login==false ){
    menuOptions = [
      { key:"logo",  label: <Link to="/" > <div  style={{ width:60, height:60,display:"flex", alignItems:"center",justifyContent:"center" }}><img src="/music-player.png"  width={30} height={30}/></div></Link> },
      { key:"search",  label: <SearchSongsComponent setLogin={setLogin} setSongs={setListOfSongs} login={login} setLoading={setLoading}/>},
      { key:"login",  label:  <Link to="/login">Login</Link>, icon: <LoginOutlined />},
    ]
  }

  return (
    <Layout className="layout" >
        <Header >
          <Menu theme="dark" mode="horizontal"  items={ menuOptions }  style={{ display:"flex", justifyContent:"center"}}>
           
          </Menu>
          
        </Header>

        <Content style={{ padding: '0 50px' }}>  

          <Routes>

            <Route  path='/' element={ [<ListOfSongsComponent login={login} songs={listOfSongs} loading={loading}/>] }/>
            <Route  path='/login' element={ <LoginComponent setLogin={setLogin}/>} />
            <Route  path='/registration' element={ <RegistrationComponent setLogin={setLogin}/>} />
            <Route  path='/myPlayList' element={ <MyPlayListComponent/>} />

          </Routes>

        </Content>


      <Footer style={{ textAlign: 'center' }}> Wallapep </Footer>
    </Layout>
  );
}

export default App;
