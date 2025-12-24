import '../styles/Validators.css';
import { useState, useEffect } from 'react';
import postAllValidator from '../api/postAllValidator';
import Skeleton from '../skeleton/Skeleton';
import Search from '../components/Search';

function Validators() {
  const [validators, setValidators] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const perPage = 10;

  useEffect(() => {
    postAllValidator()
      .then((res) => {
        setValidators(res?.result?.validators || []);
        setLoading(false)
      })
      .catch(() => {
        setValidators([]);
        setLoading(false);
      });
  }, []);

  // HEX -> number
  const hexToNumber = (hex) => {
    if (!hex) return 0;
    return parseInt(hex, 16) / 1e18;
  };

  // time ago (SAFE VERSION)
  const timeAgo = (unix) => {
    if (!unix) return '-';

    const now = Math.floor(new Date().getTime() / 1000);
    const seconds = now - unix;

    const days = Math.floor(seconds / 86400);
    if (days > 0) return `${days} days ago`;

    const hours = Math.floor(seconds / 3600);
    if (hours > 0) return `${hours} hours ago`;

    const minutes = Math.floor(seconds / 60);
    return `${minutes} minutes ago`;
  };
//Pagignation Logic 
const currentStart = (currentPage-1) * perPage;
const currentEnd = currentStart + perPage;
const currentAllValidators = validators.slice(currentStart,currentEnd);
const currentTotalPages = Math.ceil(validators.length/perPage);
  // Skeleton while loading
  if (loading) {
  return (
    <section className="latesttransaction">
      <h3>Latest Transaction</h3>
      <Skeleton count={6} />
    </section>
  );
}


  return (
    <div className="validators-container">
      <Search title="All Validators" />
      {/* HEADER */}
      <div className="validators-header">
        <h2>Validators</h2>
        <div className="validator-tabs">
          <button className="active">Active (3600)</button>
          <button className="inactive">Inactive (321)</button>
        </div>
      </div>

      {/* TABLE */}
      <div className="validators-table-wrapper">
        <div className="validators-table">
        <div className="table-head">
          <span>VALIDATOR NAME</span>
          <span>TOTAL BALANCE</span>
          <span>COMMISSION</span>
          <span>VOTING POWER</span>
          <span>LAST UPDATED</span>
          <span></span>
        </div>

        {currentAllValidators.map((v, i) => (
          <div className="table-row" key={v.validatorAddress || i}>
            <div className="validator-info">
              <strong>{v.validatorName}</strong>
              <small>
                {v.validatorAddress?.slice(0, 10)}...
                {v.validatorAddress?.slice(-6)}
              </small>
            </div>

            <div>{hexToNumber(v.TotalBalance).toFixed(2)}</div>
            <div>{v.commission} %</div>
            <div>{v.votingPower}</div>
            <div>{timeAgo(v.lastupdate)}</div>

            <div className="actions">
              <button className="btn-outline">Details</button>
              <button className="btn-primary">Delegate Now</button>
            </div>
          </div>
        ))}
      </div>
      </div>
      

      {/* PAGINATION */}
        <div className="pagenavigation">
          <button disabled={currentPage === 1} onClick={() => setCurrentPage(1)}>
            Start
          </button>

          <button
            disabled={currentPage === 1}
            onClick={() =>setCurrentPage(currentPage - 1)}
          >
            Prev
          </button>

          <span>-- Page {currentPage} --</span>

          <button
            disabled={currentPage === currentTotalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>

          <button
            disabled={currentPage === currentTotalPages}
            onClick={() =>setCurrentPage(currentTotalPages)}
          >
            End
          </button>
        </div>
      
    </div>
  );
}

export default Validators;
