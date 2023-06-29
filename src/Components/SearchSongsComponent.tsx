
import { Song } from "../App"
import SongComponent from "./SongComponent"
import React, { useState } from 'react';
import { useNavigate, Routes, Link } from "react-router-dom"
import {PlaySquareOutlined, LogoutOutlined, LoginOutlined} from '@ant-design/icons';
import { Col, Row, Typography , Input ,Button, Divider } from 'antd';
import { backOut } from "framer-motion";
import { background } from "@chakra-ui/react";
type setSongsFunction = (param: Song[] ) => void;
type setLoadingFunction = (param: boolean ) => void;
type setLoginFunction = (param: boolean ) => void;
const { Search } = Input;
const { Title, Paragraph, Text } = Typography;

interface SearchSongsComponentProps {
  setSongs:setSongsFunction,
  setLoading: setLoadingFunction,
  login: boolean,
  setLogin: setLoginFunction
}

let SearchSongsComponent : React.FC<SearchSongsComponentProps> = (props) => {
    let { setSongs, setLoading, login, setLogin  } = props;
    let [uniqueName, setUniqueName] = useState<string>("")
    const navigate  = useNavigate();

    let clickSearchButton = async () => {
      setLoading(true)
      let response = await fetch("https://itunes.apple.com/search?term="+uniqueName) // simple do get
      if ( response.ok ){
        let jsonData = await response.json();
        setSongs(jsonData.results)
        setLoading(false)
      }
    }

    let changeName = (e: React.FormEvent<HTMLInputElement>) => {
      setUniqueName(e.currentTarget.value)
    }



    return (
      <Row justify="space-around" align="middle" style={{ height:60}}>
          <Col style={{ height:30}} >
            <Search type="text"  onSearch={clickSearchButton} onChange={changeName} placeholder="name of singer"  style={{ width: 400 }} />
          </Col>
      </Row>
    );
  }
  
export default SearchSongsComponent;
  