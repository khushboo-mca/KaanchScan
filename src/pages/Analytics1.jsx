import Chart1 from '../assets/Chart1.png';
import '../styles/Analytics1.css';
function Analytics1(props) {
  return(
  <div className="container">
  <h1 id="title">{props.title}</h1>
  <img id="img"src={Chart1} alt="analytics"></img>
  </div>  
  )
}
export default Analytics1;
