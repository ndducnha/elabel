# eLabel + Google Sheet Tracking

## Mục tiêu

- verify.html chạy trên GitHub Pages
- mọi người quét QR
- dữ liệu gửi về Google Sheet trung tâm
- dashboard xem toàn bộ lượt quét

## BƯỚC 1 — Upload GitHub

Upload:
- verify.html
- dashboard.html

Bật:
Settings → Pages → Deploy from branch → main/root

Link:

```txt
https://ndducnha.github.io/elabel/verify.html?id=8938500000271&token=abc123
```

## BƯỚC 2 — Tạo Google Sheet

1. Tạo Google Sheet mới
2. Extensions → Apps Script
3. Paste code trong apps-script.js
4. Deploy → New Deployment
5. Type: Web App
6. Execute as: Me
7. Who has access: Anyone
8. Deploy
9. Copy Web App URL

## BƯỚC 3 — Dán URL vào verify.html

Sửa:

```js
const GOOGLE_SCRIPT_URL = "PASTE_YOUR_GOOGLE_SCRIPT_URL_HERE";
```

## BƯỚC 4 — Dashboard

Trong Google Sheet:

File → Share → Publish to web

Copy link publish.

Dán vào:

```html
<iframe src="PASTE_GOOGLE_SHEET_PUBLISH_LINK_HERE"></iframe>
```

## Thu được

- Thời gian
- Product ID
- Token
- Product info
- URL
- Referrer
- User Agent
- Language
- Platform
- Screen size
- Viewport
- Timezone
- Fingerprint

## Không thu được nếu không có backend riêng

- IP thật
- GPS chính xác (trừ khi xin quyền)
- Country/city chính xác
