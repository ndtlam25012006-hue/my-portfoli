# BÁO CÁO BÀI TẬP LỚN PBT_02
**Họ và tên:** [Điền tên bạn]  
**MSSV:** [Điền MSSV]  

---

## PHẦN A — KIỂM TRA ĐỌC HIỂU

### Câu A1 — Input Types
1. type="email" → Ô nhập chữ, tự động kiểm tra xem có dấu "@" và tên miền không → Dùng cho form đăng ký tài khoản.
2. type="password" → Ô nhập chữ nhưng tự động ẩn ký tự thành dấu chấm đen → Dùng cho ô nhập mật khẩu.
3. type="tel" → Ô nhập số điện thoại, hiển thị bàn phím số trên điện thoại → Dùng nhập số điện thoại giao hàng.
4. type="date" → Ô hiển thị bảng lịch để chọn ngày/tháng/năm → Dùng chọn ngày sinh hoặc ngày nhận hàng.
5. type="number" → Ô chỉ cho nhập số, có hai nút mũi tên lên/xuống để tăng giảm → Dùng chọn số lượng sản phẩm trong giỏ hàng.
6. type="range" → Thanh trượt kéo qua kéo lại để chọn giá trị giữa khoảng min/max → Dùng để chọn khoảng giá muốn tìm kiếm.
7. type="checkbox" → Ô vuông nhỏ tích chọn (chọn được nhiều cái một lúc) → Dùng chọn danh mục sản phẩm yêu thích hoặc đồng ý điều khoản.
8. type="radio" → Ô tròn nhỏ tích chọn (chỉ được chọn 1 trong nhiều lựa chọn) → Dùng chọn phương thức thanh toán hoặc giới tính.
9. type="color" → Ô hiển thị bảng màu để người dùng bấm chọn mã màu → Dùng khi chọn màu sắc tùy biến cho sản phẩm.
10. type="file" → Nút bấm để mở thư mục máy tính và tải file lên → Dùng để upload ảnh đại diện hoặc ảnh hóa đơn chuyển khoản.

---

### Câu A2 — Validation Attributes (Dự đoán)
* **Trường hợp 1:** Báo lỗi trống vì có thuộc tính `required` (Bắt buộc nhập).
* **Trường hợp 2:** Báo lỗi định dạng email sai vì chữ "abc" thiếu ký tự `@` và tên miền phía sau.
* **Trường hợp 3:** Báo lỗi giá trị quá lớn vì giá trị nhập là `15` trong khi thuộc tính `max="10"`.
* **Trường hợp 4:** Báo lỗi không khớp định dạng vì `pattern="[0-9]{10}"` yêu cầu đúng 10 chữ số, nhưng user lại gõ vừa chữ vừa số (`abc123`) và mới có 6 ký tự.
* **Trường hợp 5:** Báo lỗi chuỗi quá ngắn vì thuộc tính `minlength="8"` bắt buộc tối thiểu 8 ký tự, nhưng user mới gõ 3 ký tự (`123`).

---

### Câu A3 — Accessibility
* Thẻ `<label for="email">` cực kỳ quan trọng vì phần mềm đọc màn hình (screen reader) của người khiếm thị sẽ đọc to nội dung nhãn lên khi họ tab vào ô input. Nếu không có label, họ sẽ không biết ô đó bắt buộc nhập cái gì.
* Dùng `<fieldset>` + `<legend>` khi muốn gom nhóm các ô nhập liệu có cùng chủ đề lại với nhau. Ví dụ: Gom nhóm "Thông tin thẻ tín dụng" gồm số thẻ, ngày hết hạn, mã CVV.
* `aria-label` dùng khi giao diện không có chữ hiển thị bằng mắt thường (ví dụ nút chỉ có icon cái kính lúp để tìm kiếm). KHÔNG NÊN dùng khi đã có `<label>` vì nó sẽ làm phần mềm đọc màn hình bị loạn, đọc lặp đi lặp lại hai lần gây khó chịu.

---

### Câu A4 — Media
* Thuộc tính `loading="lazy"` giúp trì hoãn việc tải ảnh cho đến khi người dùng cuộn chuột tới gần tấm ảnh đó. Nó giúp trang web load nhanh hơn, tiết kiệm mạng. KHÔNG NÊN dùng cho những ảnh nằm ngay trên đầu trang (Banner chính) vì sẽ làm chậm hiển thị ban đầu.
* Nên cung cấp nhiều `<source>` trong thẻ `<video>` vì mỗi trình duyệt (Chrome, Safari, Firefox) lại hỗ trợ các định dạng mã hóa khác nhau. Ít nhất 3 định dạng phổ biến: `.mp4`, `.webm`, `.ogg`.
* Thuộc tính `alt` dùng để mô tả bằng chữ thay thế nếu ảnh bị lỗi không hiển thị được, hoặc để phần mềm đọc màn hình đọc cho người khiếm thị nghe.
  * *Ảnh iPhone 16:* `alt="Điện thoại iPhone 16 Pro Max màu vàng Titan sa mạc"`
  * *Ảnh trang trí:* `alt=""` (để trống để phần mềm bỏ qua không đọc)
  * *Ảnh biểu đồ:* `alt="Biểu đồ cột hiển thị doanh thu tăng trưởng 15% trong Quý 1 năm 2026"`

---

### Câu A5 — So sánh <figure> vs <img>
* **Cách 1 (chỉ dùng `<img>`):** Dùng khi tấm ảnh chỉ mang tính chất trang trí nhỏ nhặt, đi kèm trong đoạn văn, không cần chú thích riêng. Ví dụ: Ảnh icon nhỏ, ảnh avatar nhỏ ở góc màn hình.
* **Cách 2 (dùng `<figure>` + `<figcaption>`):** Dùng khi tấm ảnh là một nội dung độc lập, quan trọng và cần có dòng chú thích đi kèm bên dưới. Ví dụ: Ảnh chi tiết sản phẩm kèm giá tiền ở dưới, ảnh biểu đồ thông số kỹ thuật có chú thích nguồn.

---

## PHẦN C — PHÂN TÍCH & SUY LUẬN

### Câu C1 — Debug Form (8 lỗi)
1. **Lỗi 1 (Dòng 1):** Thẻ `<form>` thiếu thuộc tính `action` và `method`. Sửa thành: `<form action="#" method="POST">`.
2. **Lỗi 2 (Dòng 2):** Ô nhập "Tên" viết chữ thô, không dùng thẻ `<label for="...">`. Sửa thành: `<label for="name">Tên:</label> <input type="text" id="name" name="name" required>`.
3. **Lỗi 3 (Dòng 4):** Ô email thiếu `<label>`, chỉ có placeholder là sai chuẩn accessibility. Sửa thành: Thêm `<label for="email">Email:</label>` và thêm `id="email"` vào input.
4. **Lỗi 4 (Dòng 6):** Ô mật khẩu thiếu `<label>`. Sửa thành: Thêm `<label for="password">Mật khẩu:</label>` và thêm `id="password"`.
5. **Lỗi 5 (Dòng 7):** Ô nhập lại mật khẩu thiếu `<label>` và thiếu thuộc tính `name`, `id` khác biệt. Sửa thành: Thêm `<label for="confirm_password">Nhập lại mật khẩu:</label>` và sửa input thành `id="confirm_password" name="confirm_password"`.
6. **Lỗi 6 (Dòng 9):** Ô Phone dùng `type="text"` là sai bản chất. Sửa thành: `<label for="phone">Phone:</label> <input type="tel" id="phone" name="phone" value="0901234567">`.
7. **Lỗi 7 (Dòng 11):** Thẻ `<select>` không có nhãn `<label>` và các thẻ `<option>` không có thuộc tính `value`. Sửa thành: Thêm label cho thành phố và sửa thành `<option value="hn">Hà Nội</option>`.
8. **Lỗi 8 (Dòng 16):** Thẻ `<label>` bọc chữ nhưng không bọc thẻ input checkbox và cũng không có thuộc tính `for`. Sửa thành: `<label><input type="checkbox" name="agree" required> Tôi đồng ý điều khoản</label>`.

---

### Câu C2 — Thiết kế chiến lược Validation
* **Pattern regex cho CMND/CCCD (12 chữ số):** `pattern="[0-9]{12}"`
* **Pattern regex cho Số tài khoản (10 đến 15 chữ số):** `pattern="[0-9]{10,15}"`

**Giải thích bảo mật:**
HTML5 validation **HOÀN TOÀN KHÔNG ĐỦ AN TOÀN** cho ứng dụng ngân hàng. Bởi vì đây chỉ là lớp bảo vệ ở phía người dùng (Frontend). Bất kỳ ai có chút kiến thức về công nghệ đều có thể nhấn F12 để xóa bỏ thuộc tính `required` hoặc `pattern`, hoặc họ dùng phần mềm như Postman để gửi thẳng dữ liệu giả mạo lên server mà không thèm qua trình duyệt.

**3 loại validation mà HTML5 KHÔNG THỂ làm được (bắt buộc dùng JavaScript):**
1. Kiểm tra xem tên đăng ký tài khoản hoặc số tài khoản đã tồn tại trong cơ sở dữ liệu (Database) chưa.
2. So sánh xem ô "Mật khẩu" và ô "Nhập lại mật khẩu" có khớp nhau 100% không.
3. Kiểm tra tính hợp lệ của số thẻ ngân hàng dựa theo thuật toán mã hóa (như thuật toán Luhn).

**2 rủi ro bảo mật nếu chỉ validate trên Frontend:**
1. **Bị tấn công phá hoại dữ liệu (SQL Injection / Data Corruption):** Kẻ xấu có thể gửi các đoạn mã độc hoặc dữ liệu rác vào thẳng cơ sở dữ liệu làm sập hệ thống ngân hàng.
2. **Gian lận tài chính / Sai lệch logic:** Người dùng có thể chỉnh sửa số tiền gửi từ dương sang số âm (ví dụ: chuyển khoản `-50.000.000đ` để rút ngược tiền từ tài khoản người khác nếu backend không kiểm tra lại giá trị).

---

## GIẢI THÍCH THÊM (BỔ SUNG CHO BÀI B1)
**Tại sao HTML5 không thể tự động kiểm tra (validate) hai ô mật khẩu khớp nhau?**
Vì HTML5 chỉ hoạt động độc lập trên từng thẻ input riêng lẻ dựa vào các thuộc tính cứng (như độ dài, định dạng regex). HTML5 không có cơ chế logic "so sánh, đối chiếu" giá trị động giữa hai ô nhập dữ liệu khác nhau. Muốn làm việc này, bắt buộc phải dùng JavaScript để lấy giá trị của ô 1 so sánh với ô 2 khi người dùng gõ phím.