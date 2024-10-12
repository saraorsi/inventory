"use server";
import { google } from "googleapis";

export async function getSheetData() {
  const glAuth = await google.auth.getClient({
    projectId: process.env.PROJECT_ID,
    credentials: {
      type: "service_account",
      project_id: process.env.PROJECT_ID,
      private_key_id: process.env.PRIVATE_KEY_ID,
      private_key: process.env.PRIVATE_KEY.replace(/\\n/g, "\n"),
      client_email: process.env.CLIENT_EMAIL,
      universe_domain: "googleapis.com",
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });

  const glSheets = google.sheets({ version: "v4", auth: glAuth });

  const spreadsheetId = process.env.SHEET_ID;
  const range = "Teste";

  const data = await glSheets.spreadsheets.values.get({
    spreadsheetId,
    range,
  });

  return { data: data.data.values };
}
