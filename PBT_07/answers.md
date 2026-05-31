# C1 - Debug JavaScript

**Các lỗi trong code:**
1. Lỗi chính tả: `phanTramGiam` cần khớp tên biến (code cũ là `phanTramGiam` nhưng logic có thể sai).
2. Lỗi gán giá trị: `if (giaSauGiam = 0)` là phép gán, phải sửa thành `if (giaSauGiam === 0)`.
3. Lỗi kiểu dữ liệu: `giaBan` là chuỗi "100000" cần ép kiểu sang số.
4. Lỗi `var` trong `setTimeout`: `var` có scope function, sau 1 giây vòng lặp đã chạy xong nên `i` luôn là 5. Phải thay `var i` bằng `let i` để tạo block scope cho mỗi lần lặp.
5. Thiếu `return` hoặc lỗi logic trong hàm `tinhGiaGiamGia` khi `phanTramGiam` vượt quá 100.
6. Lỗi xử lý logic hiển thị console khi giá miễn phí.

**Cách sửa lỗi `var` trong vòng lặp:**
Dùng `let i = 0` thay vì `var i = 0`. Với `let`, mỗi lần lặp sẽ tạo một biến `i` riêng biệt, giúp `setTimeout` nhận đúng giá trị `i` tại thời điểm đó.