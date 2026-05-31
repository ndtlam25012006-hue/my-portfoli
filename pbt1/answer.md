# BÁO CÁO BÀI TẬP LỚN PBT_01
**Họ và tên:** Nguyễn Văn A
**MSSV:** 12345678

---

## PHẦN A — KIỂM TRA ĐỌC HIỂU

### Câu A1 — HTTP & Browser
1. **DNS Lookup:** Trình duyệt tìm địa chỉ IP thực của trang `shopee.vn`.
2. **Kết nối:** Trình duyệt kết nối với server của Shopee.
3. **Gửi yêu cầu:** Trình duyệt gửi lệnh xin nội dung trang chủ.
4. **Trả kết quả:** Server Shopee gửi lại file HTML cho trình duyệt.
5. **Hiển thị:** Trình duyệt đọc file HTML, tải ảnh, CSS về rồi vẽ lên màn hình.

*Tab Network hiển thị tất cả các file mà trang web đã tải về (như ảnh, file code, css). Tôi đã chụp ảnh màn hình lưu trong thư mục screenshots.*

---

### Câu A2 — Semantic HTML
* Trang web bị đánh giá SEO thấp vì lạm dụng thẻ `<div>` quá nhiều, khiến Google không hiểu được cấu trúc trang.
* **4 lỗi và cách sửa:** Thay `<div class="header">` thành `<header>`, thay `<div class="menu">` thành `<nav>`, thay `<div class="main">` thành `<main>`, thay `<div class="title">` thành `<h2>`.

---

### Câu A3 — Block vs Inline
**Kết quả hiển thị:**
Hộp 1
Text A Text B
Hộp 2
Text C Text D
Hộp 3

* **Giải thích:** Thẻ `<div>` là Block nên tự xuống dòng và chiếm hết chiều ngang. Thẻ `<span>` và `<strong>` là Inline nên nằm sát cạnh nhau trên cùng một dòng.

---

### Câu A4 — Table
* `<thead>`: Phần đầu bảng (chứa tiêu đề cột).
* `<tbody>`: Phần thân bảng (chứa dữ liệu).
* `<tfoot>`: Phần chân bảng (chứa tổng kết).
* **3 lý do không dùng table làm layout:** Sai ngữ nghĩa, rất khó làm giao diện co giãn trên điện thoại (Responsive), làm trang web load chậm.

---

## PHẦN B3 — DANH SÁCH LỖI DEBUG
1. Dòng 1: Thiếu chữ `html` trong `<!DOCTYPE>` -> Sửa thành `<!DOCTYPE html>`.
2. Dòng 2: Thẻ `<title>` quên không đóng -> Sửa thành `<title>Trang web</title>`.
3. Dòng 3: Viết sai chuẩn `utf8` -> Sửa thành `charset="UTF-8"`.
4. Dòng 5: Thẻ đóng viết sai `<h1>...<h1>` -> Sửa thành `</h1>`.
5. Dòng 9: Thẻ liên kết đóng sai `<a>...<a>` -> Sửa thành `</a>`.
6. Dòng 17: Thuộc tính `src=iphone.jpg` thiếu dấu ngoặc kép và thiếu thẻ `alt`.
7. Dòng 19: Đóng sai thứ tự thẻ `<b>` và `<p>`.
8. Dòng 24: Bảng thiếu thẻ `<thead>`, `<tbody>`.
9. Dòng 36: Dùng hai thẻ `<main>` là sai -> Đổi thẻ thứ hai thành `<aside>`.
10. Dòng 41: Thẻ `<p>` ở footer quên không đóng.

---

## PHẦN C — SUY LUẬN
*(Cấu trúc chi tiết sản phẩm và đoạn văn phản biện đã được hoàn thành đầy đủ trong file code và kịch bản).*