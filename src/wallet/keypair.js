import nacl from "tweetnacl";
import { Keypair } from "@solana/web3.js"
import bs58 from "bs58";

export const createKeyPair = (seed) => {
  const secretKey = nacl.sign.keyPair.fromSeed(seed).secretKey;
  const keypair = Keypair.fromSecretKey(secretKey);

  return {
    publicKey: keypair.publicKey.toBase58(),
    privateKey: bs58.encode(keypair.secretKey)
  };
}


