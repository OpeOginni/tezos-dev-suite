import { create } from "zustand";
import { createContext } from 'react'

import { BeaconWallet } from "@taquito/beacon-wallet";

interface UserWalletState {
    userWallet: BeaconWallet | null
    setUserWallet: (userWallet: BeaconWallet) => void
    resetUserWallet: () => void
}

const useUserWalletStore = create<UserWalletState>()((set) => ({
    userWallet: null,
    setUserWallet: (userWallet: BeaconWallet) => {
        set({ userWallet })
        console.log('userWallet', userWallet)
    },
    resetUserWallet: () => set({
        userWallet: null,
    })
}))

export default useUserWalletStore;

const StoreContext = createContext(null)
