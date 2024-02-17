import { IonButton } from "@ionic/react";
import { BeaconWallet } from "@taquito/beacon-wallet";
import { power } from "ionicons/icons";
import { Dispatch, SetStateAction } from "react";

interface ButtonProps {
  wallet: BeaconWallet;
  setUserAddress: Dispatch<SetStateAction<string>>;
  setUserBalance: Dispatch<SetStateAction<string>>;
}

const DisconnectButton = ({
  wallet,
  setUserAddress,
  setUserBalance,
}: ButtonProps): JSX.Element => {
  const disconnectWallet = async (): Promise<void> => {
    setUserAddress("");
    setUserBalance("");
    console.log("disconnecting wallet");
    await wallet.clearActiveAccount();
  };

  return (
    <IonButton expand="full" onClick={disconnectWallet}>
      Disconnect Wallet
    </IonButton>
  );
};

export default DisconnectButton;
