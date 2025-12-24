import Navbar from '../components/Navbar';
import Search from '../components/Search';
import StateGrid from '../components/StateGrid';
import LatestBlock from '../components/LatestBlock';
import LatestTransaction from '../components/LatestTransaction';
import '../styles/Home.css';
import About from '../components/About';

function Home() {
    return (
        <div>
            <Search title="Kaanch Explorer" />
            <About />
            <StateGrid />
             <div className="dashboard">
            <LatestBlock />
            <LatestTransaction />
        </div>
        </div>

 
          
    );
}

export default Home;
