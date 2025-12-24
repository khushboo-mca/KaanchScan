const fetchAllValidator = async () => {
  try {
    const validatorData = {
      jsonrpc: "2.0",
      method: "kaanch_Stakingdatafull",
      params: [""],
      id: 242424,
    };

    const response = await fetch("https://full-testnet-rpc.kaanch.network", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validatorData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching Validator Data:", error);
    throw error;
  }
};

export default fetchAllValidator;
