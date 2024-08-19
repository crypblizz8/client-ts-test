"use client";

import { Inter } from "next/font/google";
import "./globals.css";

// Nillion Imports
import { NamedNetwork } from "@nillion/client-core";
import { createSignerFromKey } from "@nillion/client-payments";
import { NillionClientProvider } from "@nillion/client-react-hooks";
import { NillionClient } from "@nillion/client-vms";

const inter = Inter({ subsets: ["latin"] });

const client = NillionClient.create({
  network: NamedNetwork.enum.Devnet,

  overrides: async () => {
    // this is the account's private key when running `nillion-devnet` with default seed
    const signer = await createSignerFromKey(
      "9a975f567428d054f2bf3092812e6c42f901ce07d9711bc77ee2cd81101f42c5"
    );
    return {
      endpoint: "https://localhost:3000/nilchain",
      signer,
      userSeed: "nillion-devnet",
      nodeSeed: Math.random().toString(),
      bootnodes: [
        "=/ip4/127.0.0.1/tcp/54936/ws/p2p/12D3KooWMvw1hEqm7EWSDEyqTb6pNetUVkepahKY6hixuAuMZfJS",
      ],
      cluster: "9e68173f-9c23-4acc-ba81-4f079b639964",
      chain: "nillion-chain-devnet",
    };
  },
});

client.connect();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <NillionClientProvider client={client}>
        <body className={inter.className}>{children}</body>
      </NillionClientProvider>
    </html>
  );
}
