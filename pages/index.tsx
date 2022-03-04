import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedChain, setSelectedChain] = useState("ethereum");

  useEffect(() => {
    setLoading(true);

    const fetchChainData = async () => {
      return await (
        await fetch(
          `http://localhost:3000/wallet/${selectedChain}/0x0fee0EB39307bE9c9cCBb505bF1258d1dF6B7345`
        )
      ).json();
    };

    fetchChainData().then(({ data: fetchedData }) => {
      setData(fetchedData);
      setLoading(false);
    });
  }, [selectedChain]);

  return (
    <div>
      <h1>Account</h1>
      <select
        value={selectedChain}
        onChange={(chainToChange) => {
          setSelectedChain(chainToChange.target.value);
        }}
      >
        <option selected value="ethereum">
          Ethereum
        </option>
        <option value="bsc">BSC</option>
        <option value="avalanche">Avalanche</option>
        <option value="polygon">Polygon</option>
        <option value="fantom">Fantom</option>
      </select>
      <h2>Chain: {selectedChain}</h2>
      {!loading ? (
        data && (
          <>
            <h2>
              Balance: {data.nativeBalance} {data.chain.symbol}
            </h2>
            <h2>Tokens:</h2>
            {data.tokens.length > 0 &&
              data.tokens.map((token) => (
                <div key={token.symbol}>
                  <p>
                    <img src={token.image} />
                    {token.name} - {token.balance} {token.symbol}
                  </p>
                </div>
              ))}
          </>
        )
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
}
