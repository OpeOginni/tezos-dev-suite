import { create } from "zustand";
import { createContext } from 'react'


interface UserAddressState {
    userAddress: string | null
    setUserAddress: (userAddress: string) => void
    resetUserAddress: () => void
}

const useUserAddressStore = create<UserAddressState>()((set) => ({
    userAddress: null,
    setUserAddress: (userAddress: string) => {
        set({ userAddress })
        console.log('userAddress', userAddress)
    },
    resetUserAddress: () => set({
        userAddress: null,
    })
}))

export default useUserAddressStore;

const StoreContext = createContext(null)
