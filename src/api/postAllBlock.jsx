const fetchAllBlocks = async (limit = "100") => {
  const blockData = {
    jsonrpc: "2.0",
    method: "kaanch_latestblocks",
    params: [limit],
    id: 1,
  };

  try {
    const response = await fetch("https://full-testnet-rpc.kaanch.network", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blockData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();

  } catch (error) {
    console.error("Error fetching Block Data:", error);
  }
};
export default fetchAllBlocks;