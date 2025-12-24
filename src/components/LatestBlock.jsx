import '../styles/LatestBlock.css'
import {useState,useEffect} from 'react';
import postLatestBlock from '../api/postLatestBlock';

function LatestBlock() {
    const [latest, setLatest] = useState([]);
    useEffect(() => {
  const interval = setInterval(() => {
    postLatestBlock()
      .then((res) => setLatest(res.result))
      .catch(() => setLatest([]));
  }, 1000);

  return () => clearInterval(interval);
}, []);

 function timeAgo(ts) {
        var diff = Math.floor(Date.now() / 1000) - ts;

        if (diff < 60) {
            return diff + " seconds ago";
        }
    }

    function short(addr) {
        if (!addr) return "";
        return addr.slice(0, 6) + "..." + addr.slice(-4);
    }
    
    function hexToVal(h) {
        return (Number(BigInt(h)) / 1e18).toFixed(4);
    }
    function vCount(arr) {
    if (Array.isArray(arr)) {
        return arr.length;
    }
    return 0;
} 


    return (
        <section className="latestBlock">
            <h3>Latest Block</h3>

            <table>
                <thead className="t-head">
                    <tr>
                        <th>BLOCK NUMBER</th>
                        <th>TIME</th>
                        <th>FREE RECIPIENT</th>
                        <th>ADDRESS</th>
                        <th>NO OF TRANSACTIONS</th>
                        <th>TOTAL REWARD</th>
                    </tr>
                </thead>

             <tbody>
  {latest.map((block, i) => (
    <tr key={i}>
      <td data-label="BLOCK NUMBER">{block.blockNumber}</td>
      <td data-label="TIME">{timeAgo(block.timestamp)}</td>
      <td data-label="FREE RECIPIENT">{short(block.FeeRecipient)}</td>
      <td data-label="ADDRESS">{short(block.FeeRecipientAddress)}</td>
      <td data-label="NO OF TRANSACTIONS">{vCount(block.trxnhhashes)}</td>
      <td data-label="TOTAL REWARD">
      {hexToVal(block.foundationreward)} KNCH</td>

    </tr>
  ))}
</tbody>
 

            </table>
        </section>
    );
}

export default LatestBlock;