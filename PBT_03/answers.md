# BÁO CÁO BÀI TẬP LỚN PBT_03
**Họ và tên:** [Điền tên bạn]  
**MSSV:** [Điền MSSV]  

---

## PHẦN A — KIỂM TRA ĐỌC HIỂU

### Câu A1 — 3 Cách nhúng CSS
1. **Inline CSS (Nhúng trực tiếp vào thẻ HTML):**
   * *Ví dụ:* `<p style="color: red; font-size: 16px;">Chữ màu đỏ</p>`
   * *Ưu điểm:* Tiện lợi khi cần thử nghiệm nhanh, có độ ưu tiên áp dụng cao nhất.
   * *Nhược điểm:* Làm code HTML cực kỳ rối, khó quản lý, không tái sử dụng được code CSS cho thẻ khác.
   * *Khi nào dùng:* Khi cần fix nhanh một thuộc tính cụ thể hoặc viết style động từ JavaScript.
2. **Internal CSS (Nhúng bằng thẻ <style> trong file HTML):**
   * *Ví dụ:* ```html
     <style>
         p { color: blue; }
     </style>
     ```
   * *Ưu điểm:* Gom gọn CSS vào một chỗ trong file, quản lý dễ hơn inline CSS.
   * *Nhược điểm:* Chỉ có tác dụng trong duy nhất 1 file HTML đó, nếu website có nhiều trang sẽ phải copy lại rất mất công.
   * *Khi nào dùng:* Khi làm website đơn lẻ chỉ có đúng một trang (Single Page).
3. **External CSS (Tách file .css riêng biệt):**
   * *Ví dụ:* `<link rel="stylesheet" href="style.css">`
   * *Ưu điểm:* Code sạch sẽ, tách biệt hoàn toàn giao diện và nội dung. Một file CSS có thể dùng chung cho hàng trăm trang HTML khác nhau, giúp tối ưu tốc độ tải trang.
   * *Nhược điểm:* Phải quản lý thêm một file riêng, trình duyệt mất thêm một yêu cầu tải file khi load trang.
   * *Khi nào dùng:* Đây là cách chuẩn mực nhất, dùng cho mọi dự án thực tế.

**Câu hỏi thêm:** Nếu một phần tử áp dụng cả 3 cách cùng lúc, cách **Inline CSS** sẽ thắng. Vì theo quy tắc độ ưu tiên (Specificity), phong cách viết trực tiếp trên thuộc tính `style="..."` của thẻ HTML luôn có trọng số cao nhất so với việc viết trong thẻ `<style>` hay file `.css` bên ngoài.

---

### Câu A2 — CSS Selectors — Dự đoán kết quả
1. `h1` → Chọn: `ShopTLU`
2. `.price` → Chọn: `25.990.000đ` và `45.990.000đ`
3. `#app header` → Chọn: Toàn bộ khối tiêu đề đầu trang bao gồm cả thẻ h1 (`ShopTLU`) và khối thanh điều hướng `<nav>`.
4. `nav a:first-child` → Chọn: `Home` (thẻ liên kết đầu tiên trong nav).
5. `.product.featured h2` → Chọn: `MacBook Pro` (thẻ h2 của sản phẩm có cả 2 class product và featured).
6. `article > p` → Chọn: Các đoạn văn là con trực tiếp của article, gồm cả giá và mô tả của hai sản phẩm: `25.990.000đ`, `Mô tả sản phẩm...`, `45.990.000đ`, `Mô tả sản phẩm...`
7. `a[href="/"]` → Chọn: `Home` (thẻ liên kết có thuộc tính href chính xác là dấu gạch chéo).
8. `.top-bar.dark h1` → Chọn: `ShopTLU`

---

### Câu A3 — Box Model — Tính toán kích thước
* **Trường hợp 1: content-box (mặc định)**
  * *Chiều rộng hiển thị thực tế trên trình duyệt:* `400px (width) + 20px*2 (padding trái/phải) + 5px*2 (border trái/phải) = 450px`.
  * *Không gian chiếm trên trang:* `450px + 10px*2 (margin trái/phải) = 470px`.
* **Trường hợp 2: border-box**
  * *Chiều rộng hiển thị thực tế trên trình duyệt:* Đúng bằng `400px` (do tổng width bao trọn cả padding và border).
  * *Kích thước content thực tế bên trong:* `400px - 20px*2 (padding) - 5px*2 (border) = 350px`.
  * *Không gian chiếm trên trang:* `400px + 10px*2 (margin) = 420px`.
* **Trường hợp 3: Margin collapse**
  * *Khoảng cách giữa box-a và box-b:* `40px`.
  * *Giải thích:* Trong CSS, khi hai phần tử nằm dọc thọc vào nhau, margin-bottom của thằng trên gặp margin-top của thằng dưới sẽ xảy ra hiện tượng "Gộp margin" (Margin Collapse). Trình duyệt sẽ chọn lấy giá trị lớn nhất (ở đây là 40px) để làm khoảng cách chứ không cộng dồn thành 65px.
  * *Nâng cao:* Nếu có margin âm (`-10px` và `40px`), trình duyệt sẽ lấy giá trị dương cộng với giá trị âm: `40px + (-10px) = 30px`.

---

### Câu A4 — Specificity (Độ ưu tiên)
* **Tính toán điểm số (ID, Class, Element):**
  * Rule A (`p`): Điểm là `(0, 0, 1)`
  * Rule B (`.price`): Điểm là `(0, 1, 0)`
  * Rule C (`#main-price`): Điểm là `(1, 0, 0)`
  * Rule D (`p.price`): Điểm là `(0, 1, 1)`
* **Kết quả hiển thị:** Element sẽ có **màu đỏ (red)**. Giải thích: Vì Rule C sử dụng bộ chọn ID (`#main-price`), có trọng số điểm cao nhất `(1, 0, 0)`, áp đảo hoàn toàn các bộ chọn Class hay Element khác.
* **Nếu thêm style="color: orange;":** Element sẽ chuyển sang **màu cam (orange)** vì Inline Style đè bẹp tất cả các Selector thông thường viết trong file CSS.
* **Nếu Rule A thêm !important:** Element sẽ chuyển sang **màu đen (black)** vì từ khóa `!important` phá vỡ mọi quy tắc độ ưu tiên thông thường, bắt buộc trình duyệt phải áp dụng thuộc tính đi kèm với nó.

---

## PHẦN B — DANH SÁCH SELECTORS SỬ DỤNG TRONG BÀI B1
Trong file `style.css` của bài B1, em đã áp dụng đủ 5 loại selector sau:
1. Element Selector: `body`, `table`, `footer`
2. Class Selector: `.active`, `.text-center`
3. ID Selector: `#profile-header`
4. Descendant Selector (Bộ chọn con cháu): `nav a`
5. Pseudo-class Selector (Lớp giả): `nav a:hover`, `tr:nth-child(even)`, `tr:hover`

---

## PHẦN B2 — KẾT QUẢ ĐO ĐẠC BOX MODEL LAB (TỪ DEVTOOLS)
* Hộp 1 (content-box): chiều rộng thực tế hiển thị = **350px** (300px width + 40px padding + 10px border).
* Hộp 2 (border-box): chiều rộng thực tế hiển thị = **300px** (padding và border tự co cụm vào trong).
* **Giải thích sự khác biệt:** Khai báo `content-box` khiến kích thước ta đặt chỉ áp dụng cho vùng chứa nội dung text, padding và border đắp thêm ra ngoài làm phình to hộp. Ngược lại, `border-box` cố định luôn kích thước bên ngoài của hộp đúng bằng giá trị width đã thiết lập, tự động bóp nhỏ vùng nội dung bên trong lại.

---

## PHẦN B3 — SPECIFICITY BATTLE
10 bộ chọn xếp từ thấp đến cao kèm điểm số cụ thể:
1. `*` (0, 0, 0) - Toàn cục
2. `p` (0, 0, 1) - Element
3. `main p` (0, 0, 2) - Hai Elements
4. `.text` (0, 1, 0) - Một Class
5. `p.text` (0, 1, 1) - Element + Class
6. `.text.highlight` (0, 2, 0) - Hai Classes
7. `p.text.highlight` (0, 2, 1) - Element + Hai Classes
8. `#demo` (1, 0, 0) - Một ID
9. `p#demo` (1, 0, 1) - Element + ID
10. `p#demo.text.highlight` (1, 2, 1) - Đầy đủ Element + ID + Hai Classes

* **Màu sắc hiển thị cuối cùng:** Sẽ ăn theo màu của Rule số 10 (Rule có điểm cao nhất `1, 2, 1`).
* **Thay đổi thứ tự rules trong file CSS có đổi màu không?** Hoàn toàn KHÔNG đổi màu, vì trình duyệt ưu tiên tính điểm trọng số của Selector trước, khi nào điểm bằng nhau chằn chặn thì nó mới tính đến chuyện thằng nào viết sau đè thằng viết trước.

---

## PHẦN C — PHÂN TÍCH & SUY LUẬN

### Câu C1 — Debug CSS Layout
* **Tính toán chiều rộng thực tế (mặc định content-box):**
  * Thực tế Sidebar: `300px (width) + 20px*2 (padding) + 1px*2 (border) = 342px`.
  * Thực tế Content: `660px (width) + 30px*2 (padding) + 1px*2 (border) = 722px`.
  * *Tổng cộng thực tế:* `342px + 722px = 1064px`.
* **Lý do vỡ layout:** Tổng chiều rộng thực tế của hai khối Sidebar và Content là `1064px`, vượt quá kích thước giới hạn tối đa của khối cha Container là `960px`. Vì không đủ chỗ trống trên cùng một hàng nên khối Content buộc phải bị đẩy rớt xuống dòng dưới.
* **2 Cách sửa lỗi:**
  * *Cách 1 (Dùng border-box):* Thêm `box-sizing: border-box` cho cả hai khối, đồng thời điều chỉnh lại tỷ lệ chiều rộng width gốc sao cho tổng bằng đúng 960px (Ví dụ: Sidebar rộng 260px, Content rộng 700px).
  * *Cách 2 (Tính toán thủ công giật lùi bằng content-box):* Giữ nguyên thuộc tính mặc định, lấy kích thước mong muốn trừ đi padding và border để ra width chuẩn khai báo:
    * Width mới của Sidebar: `300px - 40px - 2px = 258px`.
    * Width mới của Content: `960px - 342px (khối sidebar thực tế) - 60px (padding content) - 2px (border content) = 556px`.

---

### Câu C2 — Cascade Puzzle (Dự đoán kết quả hiển thị)
1. **"Sản phẩm A" (h2):** `font-size = 20px`, `color = green`.
   * *Giải thích:* Thẻ h2 này ăn font-size từ quy tắc `.card .title` (20px). Về màu sắc, dù có ID `#featured .title` (màu đỏ) định dạng nhưng class `.highlight` có kèm theo `!important` (màu xanh lá) nên đã giật được quyền ưu tiên tuyệt đối.
2. **"Mô tả sản phẩm" (p trong card featured):** `color = blue`.
   * *Giải thích:* Do được chỉ định thuộc tính ép buộc kế thừa `color: inherit`, thẻ p này sẽ bỏ qua các cấu hình mặc định và lấy chính xác mã màu của thẻ cha trực tiếp bọc nó (ở đây cha nó là `.card` có màu xanh dương).
3. **"Sản phẩm B" (h2):** `font-size = 20px`, `color = blue`.
   * *Giải thích:* Ăn thuộc tính `font-size: 20px` từ quy tắc `.card .title`. Thuộc tính màu sắc không bị quy tắc nào ghi đè cụ thể, nên nó tự động thừa hưởng giá trị màu `blue` truyền từ thẻ cha `.card` xuống.
4. **"Mô tả sản phẩm B" (p.highlight):** `color = green`.
   * *Giải thích:* Nhờ từ khóa tối cao `!important` đặt trong quy tắc `.highlight`, trình duyệt ép buộc đoạn văn này hiển thị màu xanh lá cây.