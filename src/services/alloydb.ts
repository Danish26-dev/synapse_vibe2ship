import { Pool } from "pg";

let pgPoolInstance: Pool | null = null;

export function getAlloyDBClient(): Pool {
  if (!pgPoolInstance) {
    const host = typeof process !== "undefined" ? process.env?.ALLOYDB_HOST : undefined;
    const user = typeof process !== "undefined" ? process.env?.ALLOYDB_USER : undefined;
    const password = typeof process !== "undefined" ? process.env?.ALLOYDB_PASSWORD : undefined;
    const database = typeof process !== "undefined" ? process.env?.ALLOYDB_DB : undefined;

    if (!host || !user || !password || !database) {
      console.warn("⚠️ AlloyDB connection credentials (host, user, database) are incomplete. Operating in simulated database fallback mode.");
      // Return a dummy pool that won't connect but exposes the interface safely
      return new Pool({ host: "localhost", port: 5432, database: "dummy" });
    }

    pgPoolInstance = new Pool({
      host,
      user,
      password,
      database,
      ssl: {
        rejectUnauthorized: false // Required for secure Cloud SQL / AlloyDB links
      },
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000
    });
  }
  return pgPoolInstance;
}
