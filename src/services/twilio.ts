import twilio from "twilio";

let twilioClientInstance: any = null;

export function getTwilioClient(): any {
  if (!twilioClientInstance) {
    const accountSid = typeof process !== "undefined" ? process.env?.TWILIO_ACCOUNT_SID : undefined;
    const authToken = typeof process !== "undefined" ? process.env?.TWILIO_AUTH_TOKEN : undefined;

    if (!accountSid || !authToken) {
      console.warn("⚠️ Twilio Account SID or Auth Token are undefined. SMS and telephone alerts will run in simulation mode.");
      // Return a simulated client mock to avoid crash
      return {
        messages: {
          create: async (options: any) => {
            console.log("ℹ️ Twilio Mock SMS Dispatch:", options);
            return { sid: "mock-twilio-sms-sid", status: "queued" };
          }
        }
      };
    }

    twilioClientInstance = twilio(accountSid, authToken);
  }
  return twilioClientInstance;
}
