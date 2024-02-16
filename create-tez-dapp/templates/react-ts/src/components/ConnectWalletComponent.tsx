import React from "react";
import { BeaconWallet } from "@taquito/beacon-wallet";
import { NetworkType } from "@airgap/beacon-types";

export default function ConnectWalletButton(props: {
  wallet: BeaconWallet | undefined;
  setWallet: React.Dispatch<React.SetStateAction<BeaconWallet | undefined>>;
  setAddress: React.Dispatch<React.SetStateAction<string | undefined>>;
  networkType: NetworkType;
}) {
  async function connectWallet() {
    console.log("Connectign");
    const newWallet = new BeaconWallet({
      name: "Tezos dApp Boilerplate",
      network: {
        type: props.networkType,
      },
    });
    await newWallet.requestPermissions();
    const address = await newWallet.getPKH();

    props.setAddress(address);
    props.setWallet(newWallet);
  }

  function disconnectWallet() {
    if (props.wallet) {
      props.wallet.client.clearActiveAccount();

      props.setWallet(undefined);
      props.setAddress(undefined);
    }
  }

  return (
    <div className="card">
      {props.wallet ? (
        <button className="walletButton" onClick={disconnectWallet}>
          Disconnect wallet
        </button>
      ) : (
        <button className="walletButton" onClick={connectWallet}>
          Connect wallet
        </button>
      )}
    </div>
  );
}
