import Vapi from "@vapi-ai/web";

let vapiInstance: Vapi | null = null;

export function getVapiClient(): Vapi {
  if (!vapiInstance) {
    const publicKey = (import.meta as any).env?.VITE_VAPI_PUBLIC_KEY;
    if (!publicKey) {
      console.warn("⚠️ VITE_VAPI_PUBLIC_KEY is undefined. Voice assistance will run in mock audio mode.");
      vapiInstance = new Vapi("placeholder-vapi-public-key");
    } else {
      vapiInstance = new Vapi(publicKey);
    }
  }
  return vapiInstance;
}
