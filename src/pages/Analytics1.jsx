import analytics from '../assets/chart1.png';
import '../styles/Analytics1.css';
function Analytics1(props) {
  return(
  <div className="container">
  <h1 id="title">{props.title}</h1>
  <img id="img"src={analytics} alt="analytics"></img>
  </div>  
  )
}
export default Analytics1;
