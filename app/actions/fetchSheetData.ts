"use server";
import { google } from "googleapis";

const getEnvVariable = (varName: string): string => {
  const value = process.env[varName];
  if (!value) {
    throw new Error(`${varName} is not defined`);
  }
  return value;
};

interface SheetData {
  data: string[][];
}

export async function getSheetData(): Promise<SheetData> {
  const glAuth = await google.auth.getClient({
    projectId: getEnvVariable("PROJECT_ID"),
    credentials: {
      type: "service_account",
      project_id: getEnvVariable("PROJECT_ID"),
      private_key_id: getEnvVariable("PRIVATE_KEY_ID"),
      private_key: getEnvVariable("PRIVATE_KEY").replace(/\\n/g, "\n"),
      client_email: getEnvVariable("CLIENT_EMAIL"),
      universe_domain: "googleapis.com",
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });

  const glSheets = google.sheets({ version: "v4", auth: glAuth });

  const spreadsheetId = getEnvVariable("SHEET_ID");
  const range = "Teste";

  try {
    const response = await glSheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    return { data: response.data.values || [] };
  } catch (error) {
    console.error("Error fetching data from Google Sheets:", error);
    throw new Error("Failed to fetch data from Google Sheets.");
  }
}
