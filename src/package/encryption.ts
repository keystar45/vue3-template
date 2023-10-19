import CryptoJS from "crypto-js";

const iv = CryptoJS.enc.Utf8.parse("70w5zbONA5xXAJ5C"); // 偏移量
const KEY = "A39DHJC4x6MAOaHr";
// 加密
export function encrypt(plaintText: string, key = KEY) {
  if (!plaintText) {
    return "";
  }
  // 秘钥
  const newKey = CryptoJS.enc.Utf8.parse(key);
  const iv = CryptoJS.enc.Utf8.parse("70w5zbONA5xXAJ5C");
  const newPlaintText = plaintText;
  const options = {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  };
  const encryptedData = CryptoJS.AES.encrypt(newPlaintText, newKey, options);
  const encryptedBase64Str = encryptedData.toString();
  // encryptedBase64Str = encryptedBase64Str.replace(/\+/g,"-");
  return encryptedBase64Str;
}

// 解密
export function decrypt(encryptedBase64Str: string, key = KEY) {
  if (!encryptedBase64Str) {
    return "";
  }
  // var vals = encryptedBase64Str.replace(/\-/g, '+').replace(/_/g, '/');
  const options = {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  };
  const newKey = CryptoJS.enc.Utf8.parse(key);
  const decryptedData = CryptoJS.AES.decrypt(
    encryptedBase64Str,
    newKey,
    options
  );
  const decryptedStr = CryptoJS.enc.Utf8.stringify(decryptedData);
  return decryptedStr;
}
