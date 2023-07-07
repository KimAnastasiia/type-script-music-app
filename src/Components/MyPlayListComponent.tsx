import React, { useState, useEffect} from 'react';
import { Col, Button , Row, Typography  } from 'antd';
import Commons from "../Utility/Commons";
import { useNavigate   } from "react-router-dom";
export interface ListOfMySongs {
    song:string,
    releaseDate:string,
    urlImg:string,
    price:string,
    id:number
}

const { Title } = Typography;

let MyPlayListComponent= () => {

    let [listSongs, setListSongs]=useState<ListOfMySongs[]>([])
    const apiKey = localStorage.getItem('apiKey');
    const navigate  = useNavigate();
    useEffect(() => {
        getPlayList()
    }, [])

    let getPlayList=async()=>{

        let response = await fetch("http://192.168.31.75:4000/playList?apiKey="+apiKey)
        if(response.ok){
            let data = await response.json()
          setListSongs(data)
        }
    }

    let deleteSongFromPlayList=async(id:number)=>{

        let response = await fetch (Commons.baseUrl+"/playList?songId="+id+"&apiKey="+apiKey,{
            method: 'DELETE' 
        })
        if(response.ok){

            getPlayList()
 
        }
    }
    return(
        <div>
           { listSongs.length>0  &&
           <>
            <Title>Your playlist</Title>
            <Row justify="center" style={{marginTop:70}}>
                {listSongs.map((el)=>
                    <Col style={{width: 300, margin:20}}>
                        <div style={{ width:300, height:550,  backgroundColor:"#fff", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", display:"flex", flexDirection:"column", justifyContent:"space-between" }} >
                            <div>
                                <img  src={el?.urlImg } style={{width:300, height:300}}/>
                                <div className="song-details">
                                    <h2 className="song-name">{ el?.song?.substring( 0, 60) }</h2>
                                    <p className="song-price">{ el?.price } €</p>
                                    <p className="song-release-date">{el?.releaseDate}</p>
                                </div>
                            </div>
                            <div style={{display:"flex", justifyContent:"center", alignItems:"end", marginBottom:20}}>
                                <Button danger onClick={()=>{deleteSongFromPlayList(el.id)}}>Delete</Button>
                            </div>
                        </div>
                        
                    </Col>
                )}
            </Row>
            </>}
            { listSongs.length==0  &&
           <>
            <Title>Your playlist is empty yet</Title>
            <Row justify="center">
                <Button onClick={()=>{navigate("/")}} style={{backgroundColor:"#18CAF0", color:"white"}}>Add songs to your playlist</Button>
            </Row>
            </>}
        </div>
    )

}
export default MyPlayListComponent;