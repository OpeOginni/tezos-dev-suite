"use client";
import Link from "next/link";
import { useFormState } from "react-dom";
import { useFormStatus } from "react-dom";

import {
  ConnectWalletButton,
  DisconnectWalletButton,
} from "~/components/connectWallet";
import useUserWalletStore from "~/zustand/useUserWalletStore";
import useUserAddressStore from "~/zustand/useUserAddressStore";
import { documentEntryPoint } from "./actions";

export default function HomePage() {
  const { userWallet } = useUserWalletStore();
  const { userAddress } = useUserAddressStore();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white text-black">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <p className="text-xl text-black">Welcome to Tezos Verify</p>
        <p>the place to get your TezosSmart Contract Verified </p>
        {userWallet ? (
          <>
            <p className="text-xl text-black">Admin Address: {userAddress}</p>

            <form
              action={documentEntryPoint}
              className="mx-auto flex w-64 flex-col space-y-4"
            >
              <label className="font-bold">
                Contract Name:
                <input
                  type="text"
                  name="contractName"
                  className="mt-1 rounded border p-2"
                />
              </label>
              <label className="font-bold">
                Contract Address:
                <input
                  type="text"
                  name="contractAddress"
                  className="mt-1 rounded border p-2"
                />
              </label>
              <label className="font-bold">
                EntryPoint:
                <input
                  type="text"
                  name="entryPoint"
                  className="mt-1 rounded border p-2"
                />
              </label>
              <label className="font-bold">
                Description:
                <input
                  type="textarea"
                  name="description"
                  className="mt-1 rounded border p-2"
                />
              </label>
              <label className="font-bold">
                Arguments:
                <input
                  type="textarea"
                  name="arguments"
                  className="mt-1 rounded border p-2"
                />
              </label>
              <SubmitButton />
            </form>
            <DisconnectWalletButton />
          </>
        ) : (
          <ConnectWalletButton />
        )}
      </div>
    </main>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className="rounded bg-blue-500 px-2 py-1 font-bold text-white hover:bg-blue-700"
      type="submit"
      aria-disabled={pending}
    >
      Add
    </button>
  );
}
