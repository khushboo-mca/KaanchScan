import Analytics1 from './Analytics1';
import '../styles/Analytics.css';
import Search from '../components/Search';

function Analytics() {
  return (
    <div className="analytics-container">
      <Search title="All Analytics"/>

      <div className="analytics-row">
        <Analytics1 title="Daily Active Accounts" />
        <Analytics1 title="Real Time Data" />
        <Analytics1 title="Monthly Active Accounts" />
        <Analytics1 title="Daily Active Accounts" />
      </div>

      <div className="analytics-row">
        <Analytics1 title="Daily Active Accounts" />
        <Analytics1 title="Real Time Data" />
        <Analytics1 title="Monthly Active Accounts" />
        <Analytics1 title="Daily Active Accounts" />
      </div>

    </div>
  );
}

export default Analytics;
