// utils/qrCrypto.js
import crypto from "crypto";

const SECRET = process.env.QR_SECRET;
const IV_LENGTH = 16;

export function encryptQRData(qrDataObj) {
  const jsonStr = JSON.stringify(qrDataObj);

  const iv = crypto.randomBytes(IV_LENGTH);
  const key = crypto.createHash("sha256").update(SECRET).digest(); // 32-byte key
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);

  let encrypted = cipher.update(jsonStr, "utf8", "base64");
  encrypted += cipher.final("base64");

  // return iv + encrypted payload
  return iv.toString("base64") + ":" + encrypted;
}

export function decryptQRData(code) {
  try {
    const [ivBase64, encryptedData] = code.split(":");
    if (!ivBase64 || !encryptedData) return null;

    const iv = Buffer.from(ivBase64, "base64");
    const key = crypto.createHash("sha256").update(SECRET).digest();

    const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);

    let decrypted = decipher.update(encryptedData, "base64", "utf8");
    decrypted += decipher.final("utf8");

    return JSON.parse(decrypted);
  } catch (err) {
    console.error("Decrypt error:", err);
    return null;
  }
}
