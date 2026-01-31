import nacl from "tweetnacl";
import pkg from "tweetnacl-util";

const ENCRYPTION_KEY = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"


const { decodeUTF8, encodeBase64, encodeUTF8, decodeBase64 } = pkg;

export const encryptData = (value) => {

  const messgeBytes = decodeUTF8(ENCRYPTION_KEY.toString());
  const nonce = nacl.randomBytes(nacl.secretbox.nonceLength);
  const dataBytes = decodeUTF8(value);

  const data = nacl.secretbox(dataBytes, nonce, messgeBytes);

  return {
    encryptedData: encodeBase64(data),
    nonce: encodeBase64(nonce),
  }
}

export const decryptData = ({ encryptedData, nonce }) => {
  const dataBytes = decodeBase64(encryptedData);
  const nonceBytes = decodeBase64(nonce);
  const messgeBytes = decodeUTF8(ENCRYPTION_KEY);

  const messageBytes = nacl.secretbox.open(dataBytes, nonceBytes, messgeBytes);

  if (!messageBytes) {
    throw new Error("Decryption failed: invalid key or corrupted data");
  }

  const data = encodeUTF8(messageBytes);

  return data;
}
