import {
  IonApp,
  IonRouterOutlet,
  RefresherEventDetail,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/display.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";

/* Theme variables */
import "./theme/variables.css";

import { NetworkType } from "@airgap/beacon-types";
import { BeaconWallet } from "@taquito/beacon-wallet";
import { InternalOperationResult } from "@taquito/rpc";
import {
  PollingSubscribeProvider,
  Subscription,
  TezosToolkit,
} from "@taquito/taquito";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { HomeScreen } from "./pages/HomeScreen";

setupIonicReact();

export type UserContextType = {
  userAddress: string;
  setUserAddress: Dispatch<SetStateAction<string>>;
  userBalance: string;
  setUserBalance: Dispatch<SetStateAction<string>>;
  wallet: BeaconWallet;
  Tezos: TezosToolkit;
  currentNetwork: NetworkType;
  rpcUrl: string;
};
export const UserContext = React.createContext<UserContextType | null>(null);

const App: React.FC = () => {
  const rpcUrl = "https://ghostnet.ecadinfra.com";
  const Tezos = new TezosToolkit(rpcUrl);
  const currentNetwork = NetworkType.GHOSTNET;

  const wallet = new BeaconWallet({
    name: "Tezos dApp Boilerplate",
    preferredNetwork: currentNetwork,
  });

  Tezos.setWalletProvider(wallet);
  Tezos.setStreamProvider(
    Tezos.getFactory(PollingSubscribeProvider)({
      shouldObservableSubscriptionRetry: true,
      pollingIntervalMilliseconds: 1500,
    })
  );

  const [userAddress, setUserAddress] = useState<string>("");
  const [userBalance, setUserBalance] = useState<string>("0");

  const refreshStorage = async (
    event?: CustomEvent<RefresherEventDetail>
  ): Promise<void> => {
    try {
      if (!userAddress) {
        const activeAccount = await wallet.client.getActiveAccount();
        let userAddress: string;
        if (activeAccount) {
          userAddress = activeAccount.address;
          setUserAddress(userAddress);
          const balanceMutez = await Tezos.tz.getBalance(userAddress);
          const balance = balanceMutez.div(1000000).toFormat(2);
          setUserBalance(balance);
        }
      }
      console.log("Storage refreshed");

      event?.detail.complete();
    } catch (error) {
      console.log("error refreshing storage", error);
    }
  };

  useEffect(() => {
    if (userAddress) {
      console.warn("userAddress changed", wallet);
      (async () => await refreshStorage())();
    }
  }, [userAddress]);

  return (
    <IonApp>
      <UserContext.Provider
        value={{
          userAddress,
          userBalance,
          wallet,
          setUserAddress,
          setUserBalance,
          Tezos,
          currentNetwork,
          rpcUrl,
        }}
      >
        <IonReactRouter>
          <IonRouterOutlet>
            <Route path={PAGES.HOME} component={HomeScreen} />
            <Redirect exact from="/" to={PAGES.HOME} />
          </IonRouterOutlet>
        </IonReactRouter>
      </UserContext.Provider>
    </IonApp>
  );
};

export enum PAGES {
  HOME = "/home",
}

export default App;
