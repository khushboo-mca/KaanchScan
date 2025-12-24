import '../styles/Tokens.css';
import { useEffect, useState } from 'react';
import postAllToken from '../api/postAllToken';
import postVarifiedToken from '../api/postVarifiedToken';
import Skeleton from '../skeleton/Skeleton';
import Search from '../components/Search';

function Tokens() {
  const [tokens, setTokens] = useState([]);
  const [varified, setVarified] = useState([]);
  const [loading, setLoading] = useState(true);

  //  Separate pagination states
  const [allPage, setAllPage] = useState(1);
  const [verifiedPage, setVerifiedPage] = useState(1);

  const perPage = 10;

  /* ===============================
     FETCH DATA
  ================================ */
  useEffect(() => {
    Promise.all([postAllToken(), postVarifiedToken()])
      .then(([allRes, verifiedRes]) => {
        setTokens(allRes?.result || []);
        setVarified(verifiedRes?.result || []);
        setLoading(false);
      })
      .catch(() => {
        setTokens([]);
        setVarified([]);
        setLoading(false);
      });
  }, []);

  /* ===============================
     PAGINATION LOGIC
  ================================ */
  const allStart = (allPage - 1) * perPage;
  const allEnd = allStart + perPage;
  const currentAllTokens = tokens.slice(allStart, allEnd);

  const verifiedStart = (verifiedPage - 1) * perPage;
  const verifiedEnd = verifiedStart + perPage;
  const currentVerifiedTokens = varified.slice(verifiedStart, verifiedEnd);

  const allTotalPages = Math.ceil(tokens.length / perPage);
  const verifiedTotalPages = Math.ceil(varified.length / perPage);

  /* ===============================
     FORMATTERS
  ================================ */
  const formatTotalSupply = (supply, decimals) => {
    try {
      if (!supply) return "N/A";
      const value = supply.startsWith("0x")
        ? BigInt(supply)
        : BigInt("0x" + supply);
      const divisor = BigInt(10) ** BigInt(decimals || 0);
      return (value / divisor).toString();
    } catch {
      return "N/A";
    }
  };

  const formatDate = (ts) =>
    ts ? new Date(ts * 1000).toLocaleDateString("en-GB") : "N/A";

  /* ===============================
     LOADING
  ================================ */
  if (loading) {
    return (
      <section className="tokens-section">
        <h3>All Tokens</h3>
        <Skeleton count={6} />
      </section>
    );
  }

  return (
    <>
      <Search title="All Tokens" />

      {/* ===============================
          VERIFIED TOKENS
      ================================ */}
      <section className="tokens-section">
        <h2 className="section-title">All Verified Tokens</h2>

        <div className="token-row header">
          <div>TOKEN NAME</div>
          <div>CONTRACT ADDRESS</div>
          <div>TOTAL SUPPLY</div>
          <div>MARKET CAP</div>
          <div>CREATION DATE</div>
        </div>

        {currentVerifiedTokens.map((token, index) => (
          <div className="token-row" key={index}>
            <div className="token-name">
              <strong>{token.name || "Unknown"}</strong>
              <p className="symbol">{token.symbol}</p>
            </div>
            <div className="contract-address">{token.contract_address}</div>
            <div className="supply">
              {formatTotalSupply(token.totalsupply, token.decimals)}
            </div>
            <div className="market-cap">N/A</div>
            <div className="date">{formatDate(token.creationDate)}</div>
          </div>
        ))}

        {/*  VERIFIED PAGINATION */}
        <div className="pagenavigation">
          <button disabled={verifiedPage === 1} onClick={() => setVerifiedPage(1)}>
            Start
          </button>

          <button
            disabled={verifiedPage === 1}
            onClick={() => setVerifiedPage(verifiedPage - 1)}
          >
            Prev
          </button>

          <span>-- Page {verifiedPage} -- </span>

          <button
            disabled={verifiedPage === verifiedTotalPages}
            onClick={() => setVerifiedPage(verifiedPage + 1)}
          >
            Next
          </button>

          <button
            disabled={verifiedPage === verifiedTotalPages}
            onClick={() => setVerifiedPage(verifiedTotalPages)}
          >
            End
          </button>
        </div>
      </section>

      {/* ===============================
          ALL TOKENS
      ================================ */}
      <section className="tokens-section">
        <h2 className="section-title">All Tokens</h2>

        <div className="token-row header">
          <div>TOKEN NAME</div>
          <div>CONTRACT ADDRESS</div>
          <div>TOTAL SUPPLY</div>
          <div>MARKET CAP</div>
          <div>CREATION DATE</div>
        </div>

        {currentAllTokens.map((token, index) => (
          <div className="token-row" key={index}>
            <div className="token-name">
              <strong>{token.name || "Unknown"}</strong>
              <p className="symbol">{token.symbol}</p>
            </div>
            <div className="contract-address">{token.contract_address}</div>
            <div className="supply">
              {formatTotalSupply(token.totalsupply, token.decimals)}
            </div>
            <div className="market-cap">N/A</div>
            <div className="date">{formatDate(token.creationDate)}</div>
          </div>
        ))}

        {/*  ALL TOKENS PAGINATION */}
        <div className="pagenavigation">
          <button disabled={allPage === 1} onClick={() => setAllPage(1)}>
            Start
          </button>

          <button
            disabled={allPage === 1}
            onClick={() => setAllPage(allPage - 1)}
          >
            Prev
          </button>

          <span>-- Page {allPage} --</span>

          <button
            disabled={allPage === allTotalPages}
            onClick={() => setAllPage(allPage + 1)}
          >
            Next
          </button>

          <button
            disabled={allPage === allTotalPages}
            onClick={() => setAllPage(allTotalPages)}
          >
            End
          </button>
        </div>
      </section>
    </>
  );
}

export default Tokens;
