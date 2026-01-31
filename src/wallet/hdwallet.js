import { derivePath } from "ed25519-hd-key";
import { mnemonicToSeedSync } from "bip39";
import { SOLANA_PATH } from "../constants/derivation.paths.js";

export class HDWallet {
  constructor(seedPhrase) {
    this.masterSeed = mnemonicToSeedSync(seedPhrase);
    this.path = SOLANA_PATH;
  }

  deriveSeed(walletID) {
    const path = `${this.path}/${walletID}'/0'`;
    this.derivedSeed = derivePath(path, this.masterSeed.toString("hex")).key;
    return this.derivedSeed;
  }

}