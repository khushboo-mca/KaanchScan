import '../styles/Stategrid.css';
import { useState, useEffect } from 'react';
import post from '../api/post';
import StateCard from './StateCard';
import block from '../assets/block.png';
import epoch from '../assets/epoch.png';
import stacked from '../assets/stacked.png';
import supply from '../assets/supply.png';
import token from '../assets/token.png';
import tx from '../assets/tx.png';
import validator from '../assets/validator.png';

function StateGrid() {
  const [data, setData] = useState({})

 useEffect(() => {
  post()
    .then((res) => {
      setData(res.result);
    })
    .catch(() => {
      setData({});
      
    });
}, []);


  function hexToMillions(hex) {
    if (!hex) return "0.00M";
    return (Number(BigInt(hex)) / 1e24).toFixed(2) + "M";
  }

  function toMillions(num) {
    if (!num) return "0.00M";
    return (num / 1_000_000).toFixed(2) + "M";
  }

  if (!Object.keys(data).length) {
    return <main className="stategrid">Loading...</main>
  }
  return (
    <main className="stategrid">
      <StateCard icon={block} title="Total Blocks" value={toMillions(data.totalBlock)} />
      <StateCard icon={validator} title="Total Validators" value={toMillions(data.totalTransaction)} />
      <StateCard icon={supply} title="Total Accounts" value={toMillions(data.totalAccount)} />
      <StateCard icon={supply} title="Total Supply" value={hexToMillions(data.totalSupply)} />
      <StateCard icon={epoch} title="Current Epoch" value={data.currentNode} />
      <StateCard icon={tx} title="Total Tx" value={toMillions(data.totalTransaction)} />
      <StateCard icon={stacked} title="Actively Staked" value={toMillions(data.activelyStaked)} />
      <StateCard icon={token} title="Total Tokens" value={data.totalToken} />
    </main>
  );
}

export default StateGrid;
