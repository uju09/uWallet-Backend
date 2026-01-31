import { HDWallet } from "../wallet/hdwallet.js";
import { createKeyPair } from "../wallet/keypair.js";
import { APIResponse } from "../utils/api.response.js";
import { decryptData, encryptData } from "../storage/secure.storage.js";

export const generateWallet = async (req, res) => {
  try {
    const { seed, walletID } = await req.body;

    console.log(seed);

    const { encryptedData, nonce } = seed;

    console.log(encryptedData, nonce);

    const seedPhrase = decryptData({ encryptedData, nonce });

    console.log(seedPhrase);

    const wallet = new HDWallet(seedPhrase);

    const derivedSeed = wallet.deriveSeed(walletID);

    console.log(derivedSeed);

    const { publicKey, privateKey } = createKeyPair(derivedSeed);

    console.log({ publicKey, privateKey });

    const encryptedPrivateKey = encryptData(privateKey);

    return new APIResponse({ publicKey, encryptedPrivateKey }, 200, "Wallet Generated Successfully").send(res);

  } catch (err) {
    return new APIResponse(null, 500, err.message).send(res);
  }
}