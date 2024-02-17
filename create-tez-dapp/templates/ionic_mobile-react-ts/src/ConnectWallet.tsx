import { NetworkType } from "@airgap/beacon-types";
import { IonButton } from "@ionic/react";
import { BeaconWallet } from "@taquito/beacon-wallet";
import { TezosToolkit } from "@taquito/taquito";
import { Dispatch, SetStateAction } from "react";

type ButtonProps = {
  Tezos: TezosToolkit;
  setUserAddress: Dispatch<SetStateAction<string>>;
  setUserBalance: Dispatch<SetStateAction<string>>;
  wallet: BeaconWallet;
  currentNetwork: NetworkType;
  rpcUrl: string;
};

const ConnectButton = ({
  Tezos,
  setUserAddress,
  setUserBalance,
  wallet,
  currentNetwork,
  rpcUrl,
}: ButtonProps): JSX.Element => {
  const connectWallet = async (): Promise<void> => {
    try {
      await wallet.requestPermissions({
        network: {
          type: currentNetwork,
          rpcUrl: rpcUrl,
        },
      });
      console.log("after requestPermissions");

      // gets user's address
      const userAddress = await wallet.getPKH();
      const balanceMutez = await Tezos.tz.getBalance(userAddress);
      const balance = balanceMutez.div(1000000).toFormat(2);
      setUserBalance(balance);
      setUserAddress(userAddress);
    } catch (error) {
      console.log("error connectWallet", error);
    }
  };

  return (
    <IonButton expand="full" onClick={connectWallet}>
      Connect Wallet
    </IonButton>
  );
};

export default ConnectButton;
