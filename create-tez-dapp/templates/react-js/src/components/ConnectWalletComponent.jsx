import { BeaconWallet } from "@taquito/beacon-wallet";
import { NetworkType } from "@airgap/beacon-types";
import PropTypes from "prop-types";

export default function ConnectWalletButton({
  wallet,
  setWallet,
  setAddress,
  networkType,
}) {
  async function connectWallet() {
    console.log("Connectign");
    const newWallet = new BeaconWallet({
      name: "Tezos dApp Boilerplate",
      network: {
        type: networkType,
      },
    });
    await newWallet.requestPermissions();
    const address = await newWallet.getPKH();

    setAddress(address);
    setWallet(newWallet);
  }

  function disconnectWallet() {
    if (wallet) {
      wallet.client.clearActiveAccount();

      setWallet(undefined);
      setAddress(undefined);
    }
  }

  return (
    <div className="card">
      {wallet ? (
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

ConnectWalletButton.propTypes = {
  wallet: PropTypes.string.isRequired,
  setWallet: PropTypes.func,
  setAddress: PropTypes.func,
  networkType: PropTypes.oneOfType(NetworkType),
};
