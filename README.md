# GitHub Verify Tracking Demo

## Cấu trúc

- `verify.html`: đưa lên GitHub Pages, dùng cho QR.
- `dashboard.html`: đưa lên GitHub Pages, dùng để xem dữ liệu collect.
- `server.js`: backend Node.js để nhận verify event và trả kết quả.
- `package.json`: chạy backend.

## 1. Tạo GitHub repo

1. Vào GitHub → New repository.
2. Đặt tên ví dụ: `elabel-verify-demo`.
3. Upload `verify.html` và `dashboard.html` lên repo.
4. Vào Settings → Pages.
5. Source: Deploy from branch.
6. Branch: `main`, folder `/root`.
7. Save.

Link sẽ có dạng:

```txt
https://USERNAME.github.io/elabel-verify-demo/verify.html
https://USERNAME.github.io/elabel-verify-demo/dashboard.html
```

QR mẫu:

```txt
https://USERNAME.github.io/elabel-verify-demo/verify.html?id=8938500000271&token=abc123
```

## 2. Deploy backend

Có thể dùng Render/Railway/VPS.

### Render

1. Tạo repo backend chứa `server.js` và `package.json`.
2. Vào Render → New Web Service.
3. Connect repo.
4. Build command:

```txt
npm install
```

5. Start command:

```txt
npm start
```

6. Environment variables:

```txt
FRONTEND_ORIGIN=https://USERNAME.github.io
VALID_TOKENS=abc123,demo-token,token-san-pham-001
```

Sau khi deploy, Render cho domain ví dụ:

```txt
https://elabel-verify-backend.onrender.com
```

## 3. Cấu hình frontend

Trong `verify.html` và `dashboard.html`, sửa:

```js
const API_BASE = "https://YOUR-BACKEND-DOMAIN.com";
```

thành:

```js
const API_BASE = "https://elabel-verify-backend.onrender.com";
```

## 4. Dữ liệu collect

Frontend collect được:

- URL đang mở
- Referrer
- User agent
- Ngôn ngữ trình duyệt
- Platform/device
- Kích thước màn hình
- Viewport
- Timezone
- Client time
- Cookie enabled
- Online status
- Fingerprint hash cơ bản
- Product info embedded trong e-label

Backend collect thêm:

- IP
- Server time
- Verify status
- Có thể bổ sung GeoIP, ASN, country, city ở backend

## 5. Lưu ý

- GitHub Pages chỉ host static HTML, không tự lưu database.
- Muốn lưu dữ liệu phải có backend.
- Dashboard không nên public nếu dùng dữ liệu thật.
- GPS/camera phải xin quyền người dùng, không nên âm thầm lấy.
