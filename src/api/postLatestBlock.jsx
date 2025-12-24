const fetchLatestBlocks = async (limit = "10") => {
  const latestBlData = {
    jsonrpc: "2.0",
    method: "kaanch_latestblocks",
    params: [limit],
    id: 1,
  };

  try {
    const response = await fetch("https://full-testnet-rpc.kaanch.network", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(latestBlData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Error fetching Block Data: ", error);
    throw error;
  }
};

export default fetchLatestBlocks;
