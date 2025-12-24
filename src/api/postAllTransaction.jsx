const fetchAllTransaction = async (limit = "100") => {
  const tranData = {
    jsonrpc: "2.0",
    method: "kaanch_latesttransactions",
    params: [limit],
    id: 1,
  };

  try {
    const response = await fetch("https://full-testnet-rpc.kaanch.network", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tranData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching Transaction Data:", error);
    throw error;
  }
};

export default fetchAllTransaction;
