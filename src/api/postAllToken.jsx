const fetchAllToken = async () => {
  try {
    const tokenData = {
      jsonrpc: "2.0",
      method: "kaanch_alltokeninfo",
      params: [""],
      id: 242424,
    };

    const response = await fetch("https://full-testnet-rpc.kaanch.network", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tokenData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching All token Data:", error);
    throw error;
  }
};

export default fetchAllToken;
