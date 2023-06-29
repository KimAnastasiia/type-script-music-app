
import { Song } from "../App"
import SongComponent from "./SongComponent"
//type setTaskSelectedFunction = (param: Task ) => void;
import { Typography  } from 'antd';
interface ListSongsComponentProps {
    songs:Song[],
    loading:boolean,
    login:boolean
}
// tambien vale solo setTaskSelected:Function
const { Title } = Typography;
let ListOfSongsComponent : React.FC<ListSongsComponentProps> = (props) => {


    if ( props.loading ){
      return (
      <div>
        <h1>Loading...</h1>
      </div>)
    }
    return (
      <div>
        <Title >Found {props.songs?.length} results </Title>
        <div className="song-container">
          {
            props.songs.map( song => 
              <SongComponent login={props.login}  song={song}/>
            )
          }
        </div>
      </div>
    );
  }
  
export default ListOfSongsComponent;
  