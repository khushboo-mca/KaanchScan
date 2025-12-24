const fetchVerifiedToken = async () => {
  try {
    const varifiedData = {
      jsonrpc: "2.0",
      method: "kaanch_verifiedToken",
      params: [""],
      id: 1,
    };

    const response = await fetch("https://full-testnet-rpc.kaanch.network", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(varifiedData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching Verified token Data:", error);
    throw error;
  }
};

export default fetchVerifiedToken;
