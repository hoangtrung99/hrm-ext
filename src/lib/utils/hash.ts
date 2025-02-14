const secretKey = import.meta.env.VITE_TIMEKEEPING_KEY as string;

const encryptData = async (data: object) => {
  const iv = window.crypto.getRandomValues(new Uint8Array(16));
  const key = new TextEncoder().encode(secretKey);
  const encodedData = new TextEncoder().encode(JSON.stringify(data));

  const importedKey = await window.crypto.subtle.importKey(
    "raw",
    key,
    "AES-CBC",
    false,
    ["encrypt"]
  );

  const encrypted = await window.crypto.subtle.encrypt(
    { name: "AES-CBC", iv },
    importedKey,
    encodedData
  );

  const ivHex = Array.from(iv)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  const encryptedHex = Array.from(new Uint8Array(encrypted))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return ivHex + ":" + encryptedHex;
};

const fetchIp = async (): Promise<string> => {
  const response = await fetch("https://api.ipify.org/?format=json");
  const data = await response.json();
  return data.ip;
};

export { encryptData, fetchIp };
