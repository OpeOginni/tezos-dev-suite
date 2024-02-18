"use client";
// import { BeaconWallet } from "@taquito/beacon-wallet";
// import { TezosToolkit } from "@taquito/taquito";
// import { NetworkType } from "@airgap/beacon-types";
import useUserWalletStore from "~/zustand/useUserWalletStore";
import useUserAddressStore from "~/zustand/useUserAddressStore";

export function ConnectWalletButton() {
  const { setUserWallet } = useUserWalletStore();

  const { setUserAddress } = useUserAddressStore();

  async function connectWallet() {
    console.log("Connectign");
    const newWallet = new (await import("@taquito/beacon-wallet")).BeaconWallet(
      {
        name: "Tezos dApp Boilerplate",
        network: {
          type: (await import("@airgap/beacon-types")).NetworkType.MAINNET,
        },
      },
    );
    await newWallet.requestPermissions();

    const address = await newWallet.getPKH();

    const beaconID = await newWallet.client.beaconId;

    console.log(beaconID);

    setUserWallet(newWallet);

    setUserAddress(address);

    console.log(address);
  }

  return (
    <button
      className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
      onClick={connectWallet}
    >
      Connect Wallet
    </button>
  );
}

export function DisconnectWalletButton() {
  const { resetUserWallet, userWallet } = useUserWalletStore();

  const { resetUserAddress } = useUserAddressStore();

  async function disconnectWallet() {
    if (userWallet) {
      await userWallet.client.clearActiveAccount();

      resetUserWallet();
      resetUserAddress();
    }
  }

  return (
    <button
      className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
      onClick={disconnectWallet}
    >
      Disconnect
    </button>
  );
}
