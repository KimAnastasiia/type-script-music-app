import { Button, Typography, Form, Input , Card} from 'antd';
import { Song } from "../App"
import React from 'react';

//type setTaskSelectedFunction = (param: Task ) => void;

interface songComponentProps {
    song:Song,
    login: boolean
}
// tambien vale solo setTaskSelected:Function

let songComponent : React.FC<songComponentProps> = (props) => {
    let { song } = props;
    const apiKey = localStorage.getItem('apiKey');

    console.log(apiKey)
    let addSongToFavorite=async(song:string, url:string, price:number, releaseDate:string)=>{
        
        let response = await fetch ("http://192.168.31.75:4000/playList?apiKey="+apiKey,{

            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },

            body:
                JSON.stringify({ 
                    song:song,
                    urlImg:url,
                    price:price,
                    releaseDate:releaseDate
                })
        })
    }
    return (
        <div className="song" style={{display:"flex", flexDirection:"column", justifyContent:"space-between" }} >
            <div>
                <img src={song?.artworkUrl100 } />
                <div className="song-details">
                    <h2 className="song-name">{ song?.trackName?.substring( 0, 60) }</h2>
                    <p className="song-price">{ song?.trackPrice } €</p>
                    <p className="song-release-date">{song?.releaseDate}</p>
                </div>
            </div>
            <div style={{display:"flex", justifyContent:"center", alignItems:"end", marginBottom:20}}>
                {props.login ==true && <Button  type="primary"  onClick={()=>{addSongToFavorite(song?.trackName?.substring( 0, 60), song?.artworkUrl100,  song?.trackPrice, song?.releaseDate  )}} >add for my playlist</Button>}
            </div>
        </div>
        
    );
  }
  
export default songComponent;
  