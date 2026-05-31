# PHIẾU BÀI TẬP 05: CSS RESPONSIVE & SCSS

## PHẦN A — KIỂM TRA ĐỌC HIỂU

### Câu A1 — Viewport & Mobile-First

1. Thẻ <meta viewport> chuẩn hay dùng:
<meta name="viewport" content="width=device-width, initial-scale=1.0">

Giải thích ý nghĩa:
* width=device-width: Nghĩa là chiều rộng của trang web sẽ tự động co giãn cho bằng đúng với chiều rộng màn hình của thiết bị đang xem.
* initial-scale=1.0: Nghĩa là khi mới tải xong trang web, tỷ lệ phóng to (zoom) mặc định sẽ là 100%, không bị tự động phóng to hay thu nhỏ.

2. Nếu thiếu thẻ này trên iPhone:
Giao diện trang web trên màn hình iPhone nhìn sẽ cực kỳ nhỏ. Lý do là máy tự động coi trang web như đang chạy trên máy tính (bề ngang khoảng 980px) rồi tự co rút hết mọi thứ lại cho vừa màn hình điện thoại. Chữ nghĩa và hình ảnh sẽ bé xíu, muốn đọc được thì người dùng phải lấy hai ngón tay zoom lên rất bất tiện.

3. Phân biệt Mobile-First và Desktop-First:
* Mobile-First (Ưu tiên điện thoại trước): Mình viết code CSS cho màn hình điện thoại trước (đây là code mặc định). Sau đó, màn hình to lên cỡ Máy tính bảng hay Máy tính bàn thì mình dùng @media (min-width: ...) để viết thêm code đổi bố cục.
* Desktop-First (Ưu tiên máy tính trước): Ngược lại, mình viết code cho màn hình máy tính trước. Khi nào màn hình nhỏ đi thì mình dùng @media (max-width: ...) để bóp nhỏ hoặc ẩn các phần tử đi.

Ví dụ CSS mẫu với breakpoint 768px:

/* Cách làm Mobile-First */
.sidebar { display: none; } /* Điện thoại thì ẩn đi cho gọn */
@media (min-width: 768px) {
  .sidebar { display: block; } /* Màn hình từ 768px trở lên thì hiện ra */
}

/* Cách làm Desktop-First */
.sidebar { display: block; } /* Bình thường trên máy tính thì hiện */
@media (max-width: 767px) {
  .sidebar { display: none; } /* Màn hình nhỏ dưới 768px thì ẩn đi */
}

* Vì sao nên dùng Mobile-First? Vì điện thoại thường có mạng yếu hơn (dùng 3G/4G) và chip xử lý không mạnh bằng máy tính. Làm Mobile-First giúp điện thoại tải code nhẹ trước, trang web chạy mượt hơn và không phải gánh những đoạn code thừa của bản máy tính.

---

### Câu A2 — Breakpoints

| Kích thước pixel | Thiết bị hay dùng | Lưới sản phẩm nên chia mấy cột |
| :--- | :--- | :--- |
| < 576px | Điện thoại màn hình dọc | 1 cột (vì màn hình hẹp) |
| ≥ 576px | Điện thoại xoay ngang | 2 cột |
| ≥ 768px | Máy tính bảng (iPad...) | 2 hoặc 3 cột |
| ≥ 992px | Máy tính xách tay (Laptop) | 3 cột |
| ≥ 1200px | Máy tính bàn (Desktop) | 4 cột (màn hình rộng tha hồ xếp) |

---

### Câu A3 — Media Queries

Dựa theo nguyên tắc code CSS chạy từ trên xuống dưới, cái nào viết sau và thỏa mãn điều kiện min-width thì sẽ đè lên cái viết trước:

| Chiều rộng màn hình | .container width | Giải thích |
| :--- | :--- | :--- |
| 375px (iPhone SE) | 100% | Nhỏ hơn 576px nên ăn theo code mặc định ban đầu. |
| 600px | 540px | To hơn mốc 576px nên lấy mốc width: 540px. |
| 800px | 720px | To hơn mốc 768px nên lấy mốc width: 720px. |
| 1000px | 960px | To hơn mốc 992px nên lấy mốc width: 960px. |
| 1400px | 1140px | To hơn mốc lớn nhất 1200px nên lấy width: 1140px. |

---

### Câu A4 — SCSS Basics

1. Bốn tính năng hay nhất của SCSS:
* Variables (Biến): Để tạo ra các cái tên lưu màu sắc hoặc font chữ, đỡ phải gõ đi gõ lại nhiều lần.
    * Ví dụ: $mau-chu-dao: #e44d26; h1 { color: $mau-chu-dao; }
* Nesting (Viết lồng nhau): Viết các nhóm CSS lồng vào nhau cho giống cấu trúc các thẻ trong HTML, nhìn code rất gọn.
    * Ví dụ: .card { background: white; .title { color: red; } }
* Mixins (Tạo hàm gom code): Gom một đống code CSS hay dùng lại thành một cụm, chỗ nào cần thì gọi ra dùng cho nhanh.
    * Ví dụ: @mixin canh-giua { display: flex; justify-content: center; } div { @include canh-giua; }
* @extend (Kế thừa code): Cho một class copy lại toàn bộ code của một class khác để không phải gõ trùng lặp.
    * Ví dụ: .nut-bam { padding: 10px; } .nut-mua { @extend .nut-bam; background: blue; }

2. Vì sao trình duyệt không đọc được file .scss?
Vì xưa nay các trình duyệt web chỉ được lập trình để hiểu file .css thường thôi. Các cú pháp nâng cao của SCSS trình duyệt không dịch được.
* Cách xử lý: Mình phải dùng một công cụ biên dịch (ví dụ như cài extension Live Sass Compiler trong VS Code) để nó tự động dịch file .scss thành một file .css bình thường thì trình duyệt mới chạy được.

---

## PHẦN C — PHÂN TÍCH

### Câu C1 — Phân tích trang web thực (Em chọn trang VNExpress.net)

* Thanh Menu (Navigation) thay đổi:
    * Trên máy tính: Menu dàn hàng ngang ra, hiện rõ các chữ như Thời sự, Góc nhìn, Thế giới, Thể thao... cho người ta bấm.
    * Trên điện thoại: Các chữ này biến mất, gom gọn lại thành một cái nút có hình 3 dấu gạch ngang (nút Hamburger). Bấm vào nút đó thì menu mới xổ xuống.
* Lưới nội dung chia cột:
    * Trên máy tính: Màn hình rộng nên chia làm 3 cột rõ ràng (Tin chính to nhất bên trái, tin phụ ở giữa, quảng cáo và tin xem nhiều bên phải).
    * Trên máy tính bảng: Thu lại còn 2 cột.
    * Trên điện thoại: Tất cả dồn hết về thành 1 cột dọc xếp từ trên xuống dưới để người dùng vuốt trượt dễ dàng.
* Phần tử bị ẩn đi trên điện thoại: Các banner quảng cáo to đùng nằm ở hai bên rìa trang web trên máy tính sẽ bị ẩn sạch khi xem bằng điện thoại cho đỡ tốn dung lượng mạng và đỡ rối mắt.
* Cỡ chữ (Font size): Chữ tiêu đề bài viết trên máy tính nhìn to và rõ (khoảng 26px), nhưng khi sang điện thoại nó tự động nhỏ lại một chút (khoảng 18px) để không bị dài quá dòng.

---

### Câu C2 — Thiết kế layout nhà hàng

1. Ý tưởng sắp xếp bố cục (Wireframe)
* Khi xem bằng điện thoại (Mobile): Không ẩn thông tin quan trọng nào cả. Menu thu vào nút 3 gạch. Ảnh Hero thu nhỏ lại. Lưới 6 món ăn xếp dọc thành 1 cột từ trên xuống. Form điền thông tin đặt bàn nằm ngay dưới các món ăn và kéo dài hết chiều ngang màn hình. Bản đồ Google Maps thu nhỏ nằm ở dưới cùng, ngay sát footer.
* Khi xem bằng máy tính bảng (Tablet): Menu hiện ra dạng chữ đơn giản. Lưới món ăn chia thành 2 cột nằm cạnh nhau. Phần Form đặt bàn và Bản đồ nằm song song nhau (chia làm 2 cột trái - phải).
* Khi xem bằng máy tính (Desktop): Không gian rộng rãi nên Menu hiện đầy đủ. Lưới món ăn chia hẳn thành 3 cột hoặc 4 cột nhìn cho đẹp. Bên dưới chia làm 2 vùng lớn: Bên trái là Form đặt bàn to rõ ràng, bên phải là Bản đồ Google Maps chỉ đường.

2. Đoạn CSS bộ khung (Dùng CSS Grid theo kiểu Mobile-First)

.header { display: flex; justify-content: space-between; }
.hero-img { width: 100%; height: 300px; }

/* Lưới món ăn mặc định 1 cột */
.food-grid { 
    display: grid; 
    grid-template-columns: 1fr; 
    gap: 15px; 
}

/* Form và bản đồ xếp chồng lên nhau */
.booking-section {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
}

/* --- Khi màn hình to lên cỡ Máy tính bảng (Tablet) --- */
@media (min-width: 768px) {
    .food-grid { 
        grid-template-columns: repeat(2, 1fr); /* Chia thành 2 cột */
    }
}

/* --- Khi màn hình to hẳn lên cỡ Máy tính (Desktop) --- */
@media (min-width: 1024px) {
    .food-grid { 
        grid-template-columns: repeat(3, 1fr); /* Chia thành 3 cột */
    }
    .booking-section {
        grid-template-columns: 1fr 1fr; /* Form nằm bên trái, Bản đồ nằm bên phải */
    }
}