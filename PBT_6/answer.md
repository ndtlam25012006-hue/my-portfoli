# PHIẾU BÀI TẬP 06: BOOTSTRAP 5

## PHẦN A — ĐỌC HIỂU

### Câu A1 — Grid System
* **Bảng Layout:**
| Kích thước | Số cột | Box layout |
| :--- | :--- | :--- |
| < 768px | 12 | Xếp dọc (1 box/hàng) |
| 768px - 991px | 6 | Xếp 2 hàng (2 box/hàng) |
| ≥ 992px | 3 | Xếp 1 hàng (4 box/hàng) |

* **Giải thích thêm:**
    * `col-md-6`: Nghĩa là từ kích thước màn hình trung bình (tablet, ≥768px) trở lên, phần tử đó sẽ chiếm 6/12 cột (tức là 50% chiều ngang).
    * Tại sao không cần `col-sm-12`? Vì `col-12` đã mặc định áp dụng cho tất cả các thiết bị (bao gồm cả mobile/small) từ 0px trở lên. Nó là giá trị mặc định cho đến khi gặp breakpoint cao hơn (`md`).

### Câu A2 — Utilities & Components
* `d-none d-md-block`: Ẩn (`d-none`) ở màn hình mobile, hiện ra ở dạng block (`d-md-block`) khi màn hình ≥ 768px.
* **5 Spacing Utilities:** `mt-3` (margin-top 1rem), `px-4` (padding-left/right 1.5rem), `mb-auto` (margin-bottom tự động), `p-2` (padding tất cả các hướng 0.5rem), `ms-2` (margin-start/trái 0.5rem).
* **Container:** * `.container`: Có độ rộng cố định theo từng breakpoint.
    * `.container-fluid`: Luôn rộng 100% màn hình.
    * `.container-md`: Luôn rộng 100% cho đến khi đạt kích thước md (768px) thì mới có độ rộng cố định.

## PHẦN C — PHÂN TÍCH
* **Câu C1:** Để đổi `$primary`, cần dùng Node.js/SASS. Tạo file `custom.scss`, import bootstrap, đổi giá trị biến rồi compile ra file CSS mới. Không nên override trực tiếp vì sẽ làm dư thừa code CSS, không quản lý được bảng màu nhất quán của dự án.
* **Câu C2:** Dùng Bootstrap giúp đồng bộ, nhanh hơn (tốn ít dòng CSS hơn), dễ làm việc nhóm nhưng khó tùy biến giao diện độc bản. CSS thuần linh hoạt tuyệt đối nhưng tốn thời gian viết và quản lý.