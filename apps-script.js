/*
  GOOGLE APPS SCRIPT

  BƯỚC:
  1. Tạo Google Sheet mới
  2. Extensions → Apps Script
  3. Xóa code cũ
  4. Paste code này
  5. Deploy → New deployment
  6. Type: Web app
  7. Execute as: Me
  8. Who has access: Anyone
  9. Deploy
  10. Copy Web App URL
  11. Dán vào GOOGLE_SCRIPT_URL trong verify.html
*/

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Logs")
      || SpreadsheetApp.getActiveSpreadsheet().insertSheet("Logs");

    const body = JSON.parse(e.postData.contents);

    const product = body.productInfo || {};
    const visitor = body.visitorInfo || {};

    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "savedAt",
        "verified",
        "productId",
        "token",
        "productName",
        "company",
        "origin",
        "category",
        "riskLevel",
        "ingredients",
        "url",
        "referrer",
        "language",
        "platform",
        "timezone",
        "screen",
        "viewport",
        "fingerprint",
        "userAgent"
      ]);
    }

    sheet.appendRow([
      body.savedAt || "",
      body.verified || false,
      body.productId || "",
      body.token || "",
      product.productName || "",
      product.responsibleCompany || "",
      product.origin || "",
      product.category || "",
      product.riskLevel || "",
      product.ingredients || "",
      visitor.url || "",
      visitor.referrer || "",
      visitor.language || "",
      visitor.platform || "",
      visitor.timezone || "",
      `${visitor.screenWidth}x${visitor.screenHeight}`,
      `${visitor.viewportWidth}x${visitor.viewportHeight}`,
      visitor.fingerprint || "",
      visitor.userAgent || ""
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({
        success: true
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: String(err)
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
