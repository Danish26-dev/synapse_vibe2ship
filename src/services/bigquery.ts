import { BigQuery } from "@google-cloud/bigquery";

let bigqueryInstance: BigQuery | null = null;

export function getBigQueryClient(): BigQuery {
  if (!bigqueryInstance) {
    const projectId = typeof process !== "undefined" ? process.env?.BIGQUERY_PROJECT_ID : undefined;
    if (!projectId) {
      console.warn("⚠️ BIGQUERY_PROJECT_ID environment variable is not defined. Analytical queries will be mocked locally.");
      return new BigQuery({ projectId: "placeholder-bigquery-project" });
    }
    bigqueryInstance = new BigQuery({ projectId });
  }
  return bigqueryInstance;
}
