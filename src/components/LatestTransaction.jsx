import '../styles/LatestTransaction.css';
import { useState, useEffect } from 'react';
import postLatestTransaction from '../api/postLatestTransaction';

function LatestTransaction() {
const [trans, setTrans] = useState([]);

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

useEffect(()=> {
setInterval(()=> {
postLatestTransaction()
                .then((res) =>{
                    console.log(res);
                    setTrans(res.result);
                })
                .catch((err) =>{
                  console.error(err);
                  setTrans([])});
        }, 1000);
    }, []);

    return (
        <section className="latesttransaction">
            <h3>Latest Transaction</h3>

            <table>
                <thead>
                    <tr>
                        <th>TRANSACTION HASH</th>
                        <th>TIME</th>
                        <th>SENDER</th>
                        <th>RECEIVER</th>
                        <th>VALUE</th>
                    </tr>
                </thead>

                <tbody>
  {trans.map((data, i) => (
    <tr key={i}>
      <td data-label="TRANSACTION HASH">{short(data.hash)}</td>
      <td data-label="TIME">{timeAgo(data.timestamp)}</td>
      <td data-label="SENDER">{short(data.from)}</td>
      <td data-label="RECEIVER">{short(data.to)}</td>
      <td data-label="VALUE">{hexToVal(data.value)} KNCH</td>
    </tr>
  ))}
</tbody>

            </table>
        </section>
    );
}

export default LatestTransaction;
