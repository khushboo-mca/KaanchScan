import { useState, useEffect } from 'react';
import postAllBlock from '../api/postAllBlock';
import Skeleton from '../skeleton/Skeleton';
import '../styles/Block.css';
import Search from '../components/Search';

function Blocks() {
  const [allBlock, setAllBlock] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const perPage = 10;

  /* ================= Time Ago ================= */
  function timeAgo(ts) {
    const now = Math.floor(Date.now() / 1000);
    const diff = now - Number(ts);

    if (diff < 60) return `${diff} seconds ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    return `${Math.floor(diff / 86400)} days ago`;
  }

  /* ================= Short Address ================= */
  function short(str) {
    if (!str) return '-';
    return `${str.slice(0, 6)}...${str.slice(-4)}`;
  }

  /* ================= Hex to Value ================= */
  function hexToVal(h) {
    if (!h) return '0.0000';
    return (Number(BigInt(h)) / 1e18).toFixed(4);
  }

  /* ================= API Call ================= */
  useEffect(() => {
    postAllBlock()
      .then((res) => {
        setAllBlock(res?.result || []);
      })
      .catch((err) => {
        console.error('Failed to fetch blocks:', err);
        setAllBlock([]);
      })
      .finally(() => setLoading(false));
  }, []);

  /* ================= Reset Page on Data Change ================= */
  useEffect(() => {
    setCurrentPage(1);
  }, [allBlock]);

  /* ================= Pagination Logic ================= */
  const start = (currentPage - 1) * perPage;
  const end = start + perPage;
  const currentAllBlock = allBlock.slice(start, end);

  const totalPages = Math.max(
    1,
    Math.ceil(allBlock.length / perPage)
  );

  /* ================= Skeleton ================= */
  if (loading) {
    return (
      <section className="latestblock1">
        <h3>Dernier Blocks</h3>
        <Skeleton count={6} />
      </section>
    );
  }

  return (
    <section className="latestblock1">
      <Search title="All Blocks" />
      <h3>Dernier Blocks</h3>
     <div className="blocks-table-wrapper1">
      <table className="blocks-table1">
        <thead className="table-head1">
          <tr>
            <th>BLOCK NUMBER</th>
            <th>TIME</th>
            <th>FEE RECIPIENT</th>
            <th>ADDRESS</th>
            <th>NO OF TRANSACTIONS</th>
            <th>TOTAL REWARD</th>
          </tr>
        </thead>

        <tbody>
          {currentAllBlock.length > 0 ? (
            currentAllBlock.map((data) => (
              <tr key={data.blockNumber}>
                <td data-label="Block Number">{data.blockNumber}</td>
                <td data-label="Time">{timeAgo(data.timestamp)}</td>
                <td data-label="Fee Recipient">
                  {data.FeeRecipient || '-'}
                </td>
                <td data-label="Address">
                  {short(data.FeeRecipientAddress)}
                </td>
                <td data-label="Transactions">
                  {data.trxnhhashes?.length || 0}
                </td>
                <td data-label="Total Reward">
                  {hexToVal(data.totalrewardwithfee)} KNCH
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center' }}>
                No blocks found
              </td>
            </tr>
          )}
        </tbody>
      </table>
     </div>
      

      {/* ================= PAGINATION ================= */}
      <div className="pagenavigation1">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(1)}
        >
          Start
        </button>

        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
        >
          Prev
        </button>

        <span>
          -- Page {currentPage} --
        </span>

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

export default Blocks;
