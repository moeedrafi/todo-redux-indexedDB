export const hashPassword = async (password: string) => {
  const encoded = new TextEncoder().encode(password);
  const buffer = await crypto.subtle.digest("SHA-256", encoded);
  const bytes = Array.from(new Uint8Array(buffer));

  return bytes.map((b) => b.toString(16).padStart(2, "0")).join("");
};
