const fetchLatestTransaction = async (limit = "10") => {
  const latestTranData = {
    jsonrpc: "2.0",
    method: "kaanch_latesttransactions",
    params: [limit],
    id: 1,
  };

  try {
    const response = await fetch("https://full-testnet-rpc.kaanch.network", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(latestTranData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Error fetching Transaction Data: ", error);
    throw error;
  }
};

export default fetchLatestTransaction;
