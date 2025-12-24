import '../styles/Transaction.css';
import { useState, useEffect } from 'react';
import postAllTransaction from '../api/postAllTransaction';
import Skeleton from '../skeleton/Skeleton';
import Search from '../components/Search';

function Transactions() {
  const [allTran, setAllTran] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const perPage = 10;

  /* ================= TIME AGO ================= */
  function timeAgo(ts) {
    const now = Math.floor(Date.now() / 1000);
    const diff = now - Number(ts);

    if (diff < 60) return `${diff} seconds ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    return `${Math.floor(diff / 86400)} days ago`;
  }

  /* ================= SHORT HASH ================= */
  function short(str) {
    if (!str) return '';
    return str.slice(0, 6) + '...' + str.slice(-4);
  }

  /* ================= HEX TO VALUE ================= */
  function hexToVal(h) {
    if (!h) return '0.0000';
    return (Number(BigInt(h)) / 1e18).toFixed(4);
  }

  /* ================= API CALL ================= */
  useEffect(() => {
    postAllTransaction()
      .then((res) => {
        setAllTran(res?.result || []);
      })
      .catch((err) => {
        console.error('Failed to fetch transactions:', err);
        setAllTran([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  /* ================= PAGINATION ================= */
  const totalPages = Math.max(1, Math.ceil(allTran.length / perPage));
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const currentAllTran = allTran.slice(startIndex, endIndex);

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <section className="latesttransaction1">
        <h3>Latest Transaction</h3>
        <Skeleton count={6} />
      </section>
    );
  }

  return (
    <section className="latesttransaction1">
      <Search title="All Transactions" />
      <h3>Latest Transaction</h3>
      <div className="transaction-table-wrapper1">
         <table >
        <thead>
          <tr>
            <th>TRANSACTION HASH</th>
            <th>BLOCK NUMBER</th>
            <th>TIME</th>
            <th>SENDER</th>
            <th>RECEIVER</th>
            <th>VALUE</th>
          </tr>
        </thead>

        <tbody>
          {currentAllTran.length > 0 ? (
            currentAllTran.map((data) => (
              <tr key={data.hash}>
                <td>{short(data.hash)}</td>
                <td>{data.blockNumber}</td>
                <td>{timeAgo(data.timestamp)}</td>
                <td>{short(data.from)}</td>
                <td>{short(data.to)}</td>
                <td>{hexToVal(data.value)} KNCH</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center' }}>
                No transactions found
              </td>
            </tr>
          )}
        </tbody>
      </table>
      </div>

     

      {/* ================= PAGINATION ================= */}
      <div className="pagenavigation1">
        <button disabled={currentPage === 1} onClick={() => setCurrentPage(1)}>
          Start
        </button>

        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
        >
          Prev
        </button>

        <span>-- Page{currentPage} --</span>

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
        >
          Next
        </button>

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(totalPages)}
        >
          End
        </button>
      </div>
    </section>
  );
}

export default Transactions;
