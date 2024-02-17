import {
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import { UserContext, UserContextType } from "../App";
import ConnectButton from "../ConnectWallet";
import DisconnectButton from "../DisconnectWallet";

export const HomeScreen: React.FC = () => {
  const {
    wallet,
    userAddress,
    userBalance,
    setUserAddress,
    setUserBalance,
    Tezos,
    currentNetwork,
    rpcUrl,
  } = React.useContext(UserContext) as UserContextType;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Create Tezos dApp</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonCard>
          <IonCardContent>
            Current Network: {currentNetwork.toLocaleUpperCase()}
          </IonCardContent>
        </IonCard>

        <div className="container">
          <h1 className="title">Create-Tez-dApp</h1>
          <p className="text_1">
            Simple Ionic + React + TS Project to Get Started Creating Tezos
            dApps
          </p>
          <p className="text_2">
            Update the <code>HomeScreen.tsx</code> file to make Changes
          </p>

          {userAddress ? (
            <div className="container">
              <div className="connectedMesssage">
                <p>Connected Address: {userAddress}.</p>
                <p>TEZ balance: {userBalance} TEZ.</p>
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
                    href="https://docs.tezos.com/tutorials/mobile/part-2"
                    target="_blank"
                  >
                    https://docs.tezos.com/tutorials/mobile/part-2
                  </a>
                  .
                </p>
              </div>

              <DisconnectButton
                wallet={wallet}
                setUserAddress={setUserAddress}
                setUserBalance={setUserBalance}
              />
            </div>
          ) : (
            <>
              <ConnectButton
                Tezos={Tezos}
                wallet={wallet}
                setUserAddress={setUserAddress}
                setUserBalance={setUserBalance}
                currentNetwork={currentNetwork}
                rpcUrl={rpcUrl}
              />
            </>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};
