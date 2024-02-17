import { NetworkType } from "@airgap/beacon-types";
import { TezosToolkit } from "@taquito/taquito";

import { useState, useEffect } from "react";

import "./App.css";
import ConnectWalletButton from "./components/ConnectWalletComponent";

function App() {
  const [wallet, setWallet] = useState(undefined);
  const [address, setAddress] = useState();
  const [walletBalance, setWalletBalance] = useState();

  const currentNetwork = NetworkType.GHOSTNET;

  const rpcUrl = "https://ghostnet.ecadinfra.com";
  const Tezos = new TezosToolkit(rpcUrl); // Use the received rpcUrl

  // create a useEffect that uses the wallet to get the balance of the connected address
  useEffect(() => {
    const getWalletBalance = async (walletAddress) => {
      const balanceMutez = await Tezos.tz.getBalance(walletAddress);
      const balance = balanceMutez.div(1000000).toFormat(2);
      setWalletBalance(balance);
    };

    if (address) {
      getWalletBalance(address);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  return (
    <main className="home_main">
      <div className="header">
        <div className="card">
          <p className="text">
            Current Network:{" "}
            <span className="network">
              {currentNetwork.toLocaleUpperCase()}
            </span>
          </p>
        </div>

        <ConnectWalletButton
          wallet={wallet}
          setAddress={setAddress}
          setWallet={setWallet}
          networkType={currentNetwork}
        />
      </div>

      <div className="main">
        <div className="container">
          <h1 className="title">Create-Tez-dApp</h1>
          <p className="text_1">
            Simple React + JS Project to Get Started Creating Tezos dApps
          </p>

          <p className="text_2">
            Update the <code>App.jsx</code> file to make Changes
          </p>
          <div>
            <div className="connectedMesssage">
              {wallet ? (
                <>
                  <p>Connected Address: {address}.</p>
                  <p>TEZ balance: {walletBalance} TEZ.</p>
                  <p>
                    To get GHOSTNET tez, go to{" "}
                    <a
                      href="https://faucet.ghostnet.teztnets.com/"
                      target="_blank"
                    >
                      https://faucet.ghostnet.teztnets.com/
                    </a>
                    .
                  </p>
                  <p>
                    For Tutorials on Running Transactions on Frontend, go to{" "}
                    <a
                      href="https://docs.tezos.com/tutorials/build-your-first-app/sending-transactions"
                      target="_blank"
                    >
                      https://docs.tezos.com/tutorials/build-your-first-app/sending-transactions
                    </a>
                    .
                  </p>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
