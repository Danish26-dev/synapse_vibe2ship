import * as ADK from "@google/adk";

let adkRunnerInstance: any = null;

export function getADKClient() {
  if (!adkRunnerInstance) {
    try {
      console.log("ℹ️ Initializing Google Agent Development Kit (ADK)...");
      adkRunnerInstance = ADK || {
        agents: {
          create: () => console.log("Creating mock ADK agent")
        }
      };
    } catch (e) {
      console.warn("⚠️ Failed to load native Google ADK SDK. Initializing fallback agent pipeline:", e);
      adkRunnerInstance = {
        agents: {
          create: () => console.log("Creating fallback mock ADK agent")
        }
      };
    }
  }
  return adkRunnerInstance;
}
