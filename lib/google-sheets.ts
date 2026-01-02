/**
 * @fileoverview Google Sheets integration via Apps Script webhook.
 * 
 * Setup Instructions:
 * 1. Create a Google Sheet
 * 2. Go to Extensions → Apps Script
 * 3. Paste this code in Apps Script:
 * 
 * ```javascript
 * function doPost(e) {
 *   const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
 *   const data = JSON.parse(e.postData.contents);
 *   
 *   // Add headers if first row
 *   if (sheet.getLastRow() === 0) {
 *     sheet.appendRow(['Timestamp', 'Type', 'Name', 'Email', 'Company', 'Message', 'IP']);
 *   }
 *   
 *   sheet.appendRow([
 *     new Date().toISOString(),
 *     data.type || 'contact',
 *     data.name || '',
 *     data.email || '',
 *     data.company || '',
 *     data.message || '',
 *     data.ip || ''
 *   ]);
 *   
 *   return ContentService.createTextOutput(JSON.stringify({ success: true }))
 *     .setMimeType(ContentService.MimeType.JSON);
 * }
 * ```
 * 
 * 4. Deploy → New Deployment → Web App → Anyone can access
 * 5. Copy the URL to GOOGLE_SHEETS_WEBHOOK_URL
 */

const GOOGLE_SHEETS_WEBHOOK_URL = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
import { logger } from "@/lib/logger";

interface SheetEntry {
    type: 'contact' | 'newsletter';
    name?: string | undefined;
    email: string;
    company?: string | undefined;
    message?: string | undefined;
    ip?: string | undefined;
}

/**
 * Send data to Google Sheets via Apps Script webhook
 * @returns true if successful, false otherwise
 */
export async function sendToGoogleSheets(data: SheetEntry): Promise<boolean> {
    if (!GOOGLE_SHEETS_WEBHOOK_URL) {
        logger.warn("Google Sheets webhook URL not configured");
        return false;
    }

    try {
        const response = await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            logger.error("Google Sheets webhook failed", { status: response.status });
            return false;
        }

        return true;
    } catch (error) {
        logger.error("Failed to send to Google Sheets", {}, error as Error);
        return false;
    }
}

/**
 * Check if Google Sheets is configured
 */
export function isGoogleSheetsAvailable(): boolean {
    return Boolean(GOOGLE_SHEETS_WEBHOOK_URL);
}
