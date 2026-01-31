import nacl from "tweetnacl";
import { Keypair } from "@solana/web3.js"
import bs58 from "bs58";

export const createKeyPair = (seed) => {
  const secretKey = nacl.sign.keyPair.fromSeed(seed).secretKey;
  const keypair = Keypair.fromSecretKey(secretKey)
  console.log(keypair);
  return { publicKey: keypair.publicKey.toString("hex"), privateKey: keypair.secretKey.toString("hex") };
}


