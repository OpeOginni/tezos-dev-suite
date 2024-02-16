<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { BeaconWallet } from "@taquito/beacon-wallet";
    import { TezosToolkit } from "@taquito/taquito";
    import { NetworkType } from "@airgap/beacon-types";

    const dispatch = createEventDispatcher();
  
    export let rpcUrl: string; // Receive rpcUrl as a prop
    export let networkType: NetworkType; // Receive rpcUrl as a prop

    const Tezos = new TezosToolkit(rpcUrl); // Use the received rpcUrl

    let wallet: BeaconWallet | undefined;
    let address: string;
    let balance: string; 

    async function connectWallet() {
        const newWallet = new BeaconWallet({
          name: "Tezos dApp Boilerplate",
          network: {
           type: networkType,
          },
        });
      await newWallet.requestPermissions();
      address = await newWallet.getPKH();
      getWalletBalance(address);
      wallet = newWallet;

    dispatch('walletConnected', { address, newWallet });
}
  
    function disconnectWallet() {
      wallet!.client.clearActiveAccount();
      wallet = undefined;

      dispatch('disconnected');
    }

    const getWalletBalance = async (walletAddress: string) => {
     const balanceMutez = await Tezos.tz.getBalance(walletAddress);
     balance = balanceMutez.div(1000000).toFormat(2);
  };
  </script>
  
  <main>
    <div class="card">
        {#if wallet}
        <button class="walletButton" on:click={disconnectWallet}>Disconnect wallet</button>
      {:else}
        <button class="walletButton" on:click={connectWallet}>Connect wallet</button>
      {/if}
    </div>
  </main>
  
  <style>
    /* Add your styles here */    
  </style>
  