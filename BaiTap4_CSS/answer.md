# PHẦN A — KIỂM TRA ĐỌC HIỂU

## Câu A1 — 5 Loại Positioning

| Position | Vẫn chiếm chỗ trong flow? | Tham chiếu vị trí | Cuộn theo trang? | Use cases thực tế |
| :--- | :--- | :--- | :--- | :--- |
| **static** | Có | Vị trí tự nhiên | Có | Mặc định ban đầu |
| **relative** | Có | Vị trí cũ của chính nó | Có | Làm mốc cho thẻ con absolute |
| **absolute** | Không | Thẻ cha gần nhất có position | Có | Làm mấy cái nhãn nhãn, badge HOT |
| **fixed** | Không | Màn hình trình duyệt | Không | Thanh header cố định ở đỉnh |
| **sticky** | Có | Cuộn đến mốc thì dính lại | Có | Menu bên sườn trang |

* **Absolute tham chiếu body khi:** Tất cả các thẻ cha bên ngoài đều không ghi thuộc tính position gì cả.
* **Absolute tham chiếu parent khi:** Thẻ cha trực tiếp của nó được gán `position: relative;` (hoặc absolute/fixed).
* **Nearest positioned ancestor:** Nghĩa là cái thẻ tổ tiên gần nó nhất có thuộc tính position khác static.

## Câu A2 — Dự đoán Layout
* **Trường hợp 1:** 4 ô xếp thành 1 hàng ngang, tự chia đều chiều rộng bằng nhau (mỗi ô 25%).
* **Trường hợp 2:** 6 ô chia thành 3 hàng, mỗi hàng có 2 ô (vì 45% + margin 2.5% hai bên là vừa khít 50% một ô).
* **Trường hợp 3:** 3 ô nằm trên 1 hàng ngang, ô 1 ở đầu trái, ô 3 ở đầu phải, ô 2 nằm chính giữa. Căn giữa theo chiều dọc.
* **Trường hợp 4:** Chia làm 3 cột: cột trái 200px, cột phải 200px, cột giữa tự động to ra chiếm hết chỗ còn lại.
* **Trường hợp 5:** Lưới 3 cột, xếp được 3 hàng. Hàng đầu 3 ô, hàng hai 3 ô, hàng cuối còn dư đúng 1 ô nằm góc trái.

# PHẦN C — SUY LUẬN

## Câu C1 — Chọn Flexbox hay Grid
1.  **Thanh nav ngang:** Dùng Flexbox vì chỉ dàn hàng ngang một chiều.
2.  **Lưới ảnh Instagram:** Dùng Grid vì cần chia đều chằn chặn các ô cả hàng lẫn cột.
3.  **Layout blog:** Dùng Grid để chia khung lớn cho cả trang web.
4.  **Footer 4 cột:** Dùng Grid cho nhanh và thẳng hàng.
5.  **Card sản phẩm:** Dùng Flexbox hướng dọc (column) để đẩy cái nút xuống đáy.

## Câu C2 — Sửa lỗi Debug
* **Lỗi 1:** Do thẻ card chưa bật flex hướng dọc. Sửa: Thêm `display: flex; flex-direction: column;` vào `.card` và gán `margin-top: auto;` cho nút bấm.
* **Lỗi 2:** Do chưa căn chỉnh. Sửa: Thêm `justify-content: center; align-items: center;` vào `.hero`.
* **Lỗi 3:** Do flex tự co. Sửa: Thêm `flex-shrink: 0;` vào `.sidebar`.