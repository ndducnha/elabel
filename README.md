# eLabel Static Only

Bản này chạy 100% trên GitHub Pages, không cần backend.

## File

- `verify.html`: trang người dùng quét QR.
- `dashboard.html`: trang xem dữ liệu local.
- `README.md`: hướng dẫn.

## Cách dùng trên GitHub Pages

1. Upload `verify.html` và `dashboard.html` lên repo.
2. Vào Settings → Pages.
3. Chọn Deploy from branch.
4. Branch: main.
5. Folder: /root.
6. Save.

Link verify mẫu:

```txt
https://ndducnha.github.io/elabel/verify.html?id=8938500000271&token=abc123
```

Link dashboard:

```txt
https://ndducnha.github.io/elabel/dashboard.html
```

## Quan trọng

Vì không có backend:

- Không thu được IP thật.
- Không có database chung.
- Dashboard chỉ thấy dữ liệu local trên cùng trình duyệt.
- Người khác quét QR trên điện thoại của họ thì dữ liệu nằm trên điện thoại của họ, không tự chạy về máy admin.
- Verify rule bị lộ trong source code, chỉ phù hợp demo UI.

Muốn thu dữ liệu tập trung giống Google Analytics thì bắt buộc cần backend/serverless/API.
