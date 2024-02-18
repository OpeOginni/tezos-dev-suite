# Tez Dev Suite

This is a series of tools to help developers on the Tezos Blockchain, to make building on Tezos simple, efficient and add a value of security and trust to products on Tezos.

## Meet the Tools

### 1) **Create-Tez-Dapp**

Create-Tez-dApp is a Scafolding CLI that helps developers setup a quick and easy to use frontend for building their Tezos dApps. It has been noted that setting up a frontend framework to utilize the Tezos Wallet is a bit complex, that is why the CLI is here to assist developers with that first stage of setting up the frontend of their dApp, it is shipped in the following frameworks;

- - Ionic Mobile + React
- - React + JS
- - React + TS
- - Svelte + JS
- - Svelte + TS

Currently Deployed on NPM, why not [TRY](https://www.npmjs.com/package/create-tez-dapp?activeTab=readme) it out yourself?

**Future Plans**

```
For the future, it would be nice to add more framework scaffolds, for example; NextJs and Unity.
```

### 2) **Tezos Verify**

Tezos Verify is a system to help Users of dApps on Tezos to know what exactly transactions are doing in their wallets. This helps to ensure security in the ecosystem, as Contract Creators will give descriptions of all functions to be called on their contract, and these functions (entryPoints) will be verified. Wallet creators can then make use of our API to search for the security status of transactions and also display to users the description of the transaction being run.

First Draft Code at [`Tezos Verify`](https://github.com/OpeOginni/tezos-dev-suite/tree/main/tezos-verify)
