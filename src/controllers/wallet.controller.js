import { HDWallet } from "../wallet/hdwallet.js";
import { createKeyPair } from "../wallet/keypair.js";
import { APIResponse } from "../utils/api.response.js";
import { decryptData, encryptData } from "../storage/secure.storage.js";

export const generateWallet = async (req, res) => {
  try {
    let { seed, walletID } = req.body;

    // seed is expected to be a string (mnemonic)
    if (!seed || !walletID) {
      throw new Error("Seed and Wallet ID are required");
    }

    // Handle case where seed is sent as an encrypted object
    if (typeof seed === 'object' && seed.encryptedData && seed.nonce) {
      seed = decryptData(seed);
    } else if (typeof seed === 'string') {
      // trying to parse if it is a stringified json object
      try {
        const parsed = JSON.parse(seed);
        if (parsed.encryptedData && parsed.nonce) {
          seed = decryptData(parsed);
        }
      } catch (e) {
        // ignore, it's just a plain string mnemonic
      }
    }

    const wallet = new HDWallet(seed);

    const derivedSeed = wallet.deriveSeed(walletID);

    const { publicKey, privateKey } = createKeyPair(derivedSeed);

    const encryptedPrivateKey = encryptData(privateKey);

    return new APIResponse({ publicKey, encryptedPrivateKey }, 200, "Wallet Generated Successfully").send(res);

  } catch (err) {
    console.error("Error generating wallet:", err);
    return new APIResponse(null, 500, err.message).send(res);
  }
}