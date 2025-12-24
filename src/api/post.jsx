const fetchKaanchInfo = async () => {
  const infoData = {
    jsonrpc: "2.0",
    method: "kaanch_info",
    params: [""],
    id: 1,
  };

  try {
    const response = await fetch("https://full-testnet-rpc.kaanch.network", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(infoData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Error fetching Kaanch Data: ", error);
    throw error;
  }
};

export default fetchKaanchInfo;
