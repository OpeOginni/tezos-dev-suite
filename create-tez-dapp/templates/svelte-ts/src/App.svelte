<script lang='ts'>
  import { NetworkType } from "@airgap/beacon-types";   
  import { TezosToolkit } from "@taquito/taquito";

  import ConnectWallet from './lib/ConnectWalletComponent.svelte';
  import Network from './lib/Network.svelte';
  import type { BeaconWallet } from "@taquito/beacon-wallet/dist/types/taquito-beacon-wallet";

  let currentNetwork = NetworkType.GHOSTNET; // Default selected network

  let rpcUrl = "https://ghostnet.ecadinfra.com";
  const Tezos = new TezosToolkit(rpcUrl); // Use the received rpcUrl

  let wallet: BeaconWallet | undefined;
  let walletAddress: string | undefined;
  let walletBalance: string | undefined;

  function handleWalletConnected(event: CustomEvent<any>) {
    wallet = event.detail.newWallet
    walletAddress = event.detail.address;
    getWalletBalance(walletAddress!)
  }

  const getWalletBalance = async (walletAddress: string) => {
     const balanceMutez = await Tezos.tz.getBalance(walletAddress);
     walletBalance = balanceMutez.div(1000000).toFormat(2);
  };

</script>

<main class="home_main">
  <div class="header">
    <Network bind:currentNetwork  />

    <ConnectWallet bind:rpcUrl={rpcUrl} networkType={currentNetwork} on:walletConnected={handleWalletConnected}/>
  </div>

  <div class="main">
    <div class="container">
      <h1 class="title">Create-Tez-dApp</h1>
      <p class="text_1">Simple Svelte + TS Project to Get Started Creating Tezos dApps</p>
  
      <p class="text_2">Update the <code>App.svelte</code> file to make Changes</p>
      <div>
        <div class="connectedMesssage">
          {#if wallet}
      <p>Connected Address: {walletAddress}.</p>
      <p>TEZ balance: {walletBalance} TEZ.</p>
      <p>
        To get GHOSTNET tez, go to <a
          href="https://faucet.ghostnet.teztnets.com/"
          target="_blank"
        >
          https://faucet.ghostnet.teztnets.com/
        </a>.
      </p>
      <p>
        For Tutorials on Running Transactions on Frontend, go to <a
          href="https://docs.tezos.com/tutorials/build-your-first-app/sending-transactions"
          target="_blank"
        >
        https://docs.tezos.com/tutorials/build-your-first-app/sending-transactions
        </a>.
      </p>
    {/if}
    </div>
  </div>

</main>

<style>
  /* Add your styles here */
  .text_1{
    font-weight: 900;
  }

  .text_2{
    font-weight: 500;
  }

  .container{
  display: flex;
  justify-content: center;
  place-items: center;
  flex-direction: column;
  }
  .connectedMesssage{
    color: white
  }
</style>
