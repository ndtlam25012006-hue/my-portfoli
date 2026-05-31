Plaintext
# ĐÁP ÁN PHIẾU BÀI TẬP 09: DOM MANIPULATION & EVENTS

## PHẦN A — KIỂM TRA ĐỌC HIỂU

### Câu A1 — DOM Tree

#### 1. Sơ đồ cây DOM Tree
```text
Document
 └── html
      └── body
           └── div#app
                ├── header
                │    ├── h1
                │    │    └── Text: "Todo App"
                │    └── nav
                │         ├── a.active (href="#") -> Text: "All"
                │         ├── a (href="#") -> Text: "Active"
                │         └── a (href="#") -> Text: "Completed"
                └── main
                     ├── form#todoForm
                     │    ├── input#todoInput (type="text")
                     │    └── button (type="submit") -> Text: "Add"
                     └── ul#todoList
                          ├── li.todo-item -> Text: "Learn HTML"
                          └── li.todo-item.completed -> Text: "Learn CSS"
2. Các câu lệnh querySelector tương ứng
JavaScript
// Chọn thẻ <h1>
document.querySelector("h1");

// Chọn input trong form
document.querySelector("#todoForm input");

// Chọn tất cả .todo-item
document.querySelectorAll(".todo-item");

// Chọn link đang active
document.querySelector("nav a.active");

// Chọn <li> đầu tiên trong #todoList
document.querySelector("#todoList li:first-child");

// Chọn tất cả a bên trong <nav>
document.querySelectorAll("nav a");
Câu A2 — innerHTML vs textContent
1. Phân biệt khác nhau
innerHTML: Trả về hoặc thiết lập toàn bộ cú pháp HTML bên trong element bao gồm cả thẻ tag, attributes và text. Trình duyệt sẽ parse (phân tích) chuỗi truyền vào thành các phần tử DOM thật sự.

Khi nào dùng: Khi cần chèn một đoạn cấu trúc HTML phức tạp mới (như chèn bảng hoặc danh sách từ chuỗi) vào DOM.

textContent: Chỉ trả về hoặc thiết lập nội dung văn bản thuần túy (gộp tất cả text của element và các element con của nó), tự động loại bỏ các tag HTML.

Khi nào dùng: Khi hiển thị dữ liệu dạng text, tên người dùng, con số... để đảm bảo an toàn và tối ưu hiệu năng.

2. Câu hỏi bảo mật (XSS Risk)
innerHTML nguy hiểm vì nếu dữ liệu đầu vào chứa mã độc script từ phía người dùng (User Input) mà không được làm sạch (sanitize), trình duyệt sẽ thực thi mã độc đó ngay lập tức dưới quyền của người dùng hiện tại (lấy cắp cookie, token, chiếm quyền tài khoản).

Cách sửa lỗi an toàn: Thay vì dùng innerHTML, ta ép dữ liệu đầu vào hiển thị dạng văn bản thuần bằng cách sử dụng textContent:

JavaScript
const userInput = document.querySelector("#search").value;
// SỬA: Đổi từ innerHTML sang textContent để vô hiệu hóa tag script/html
document.querySelector("#result").textContent = userInput; 
Câu A3 — Event Bubbling
1. Khi click vào button (Mặc định):
Output in ra console lần lượt theo thứ tự nổi bọt từ con lên cha:

Plaintext
BUTTON
INNER
OUTER
2. Khi uncomment e.stopPropagation():
Hàm này sẽ chặn không cho sự kiện lan truyền lên các phần tử cha cao hơn. Output lúc này chỉ còn:

Plaintext
BUTTON
PHẦN C — DEBUG & PHÂN TÍCH
Câu C1 — Debug DOM Code
Dưới đây là 8 lỗi nghiêm trọng đã được phát hiện và sửa lại:

addEventListener("onclick", ...) -> Sai cú pháp. Đổi thành "click".

countDisplay = count -> Sai logic phá hủy biến const. Sửa thành countDisplay.innerHTML = count;.

historyList.innerHTML = null; -> Dùng null cho innerHTML không chuẩn xác. Sửa thành "" (chuỗi rỗng).

item.remove; -> Thiếu dấu đóng mở ngoặc gọi hàm. Sửa thành item.remove();.

count = localStorage.getItem("count"); -> Giá trị lấy ra từ localStorage là chuỗi (string). Phải ép kiểu thành số: parseInt(localStorage.getItem("count")) || 0;.

Lỗi cập nhật giao diện sau khi load: countDisplay.textContent = count; cần viết bên trong callback của sự kiện load.

Lỗi lưu chuỗi rỗng khi mới load trang: Cần bổ sung điều kiện kiểm tra dữ liệu cũ trong localStorage trước khi gán đè innerHTML của history.

Khai báo biến countDisplay là const nhưng lại gán đè trực tiếp giá trị số ở nút reset.

Đoạn mã sau khi sửa hoàn chỉnh:
JavaScript
const countDisplay = document.querySelector(".count");
const historyList = document.getElementById("history");
let count = 0;

document.querySelector("#incrementBtn").addEventListener("click", function() {
    count++;
    countDisplay.innerHTML = count;
    
    const li = document.createElement("li");
    li.textContent = "Count changed to " + count;
    li.addEventListener("click", function() {
        deleteHistory(this);
    });
    historyList.append(li);
});

// Sửa 1: Đổi "onclick" thành "click"
document.querySelector("#decrementBtn").addEventListener("click", function() {
    count--;
    countDisplay.innerHTML = count;
});

document.querySelector("#resetBtn").addEventListener("click", () => {
    count = 0;
    // Sửa 2: Sửa gán nhầm biến hiển thị thành gán lại innerHTML
    countDisplay.innerHTML = count;
    // Sửa 3: Đổi null thành chuỗi rỗng
    historyList.innerHTML = ""; 
});

function deleteHistory(element) {
    element.parentNode.removeChild(element);
}

document.querySelector("#clearHistory").addEventListener("click", () => {
    const items = historyList.querySelectorAll("li");
    items.forEach(item => {
        item.remove(); // Sửa 4: Thêm dấu ngoặc gọi hàm ()
    });
});

window.addEventListener("beforeunload", () => {
    localStorage.setItem("count", count);
    localStorage.setItem("history", historyList.innerHTML);
});

window.addEventListener("load", () => {
    // Sửa 5: Ép kiểu chuỗi về số nguyên
    count = parseInt(localStorage.getItem("count")) || 0;
    countDisplay.textContent = count;
    
    // Sửa 6: Phục hồi lại danh sách lịch sử nếu có dữ liệu cũ
    const savedHistory = localStorage.getItem("history");
    if (savedHistory) {
        historyList.innerHTML = savedHistory;
        // Gắn lại sự kiện xóa cho các node vừa phục hồi từ HTML text
        historyList.querySelectorAll("li").forEach(li => {
            li.addEventListener("click", function() {
                deleteHistory(this);
            });
        });
    }
});
Câu C2 — Performance
1. Tại sao bind event lên 1000 phần tử là BAD PRACTICE?
Tốn tài nguyên bộ nhớ (Memory Consumption): Trình duyệt phải tạo ra 1000 đối tượng lắng nghe sự kiện riêng biệt lưu vào RAM, làm sụt giảm hiệu năng thiết bị.

Khó quản lý dữ liệu động: Khi có các phần tử mới được thêm vào hoặc xóa đi, ta lại phải bind thủ công hoặc gỡ bỏ event thu thập rác rất phiền phức.

Giải pháp từ Event Delegation: Tận dụng cơ chế Nổi bọt sự kiện (Event Bubbling). Ta chỉ cần gắn 1 listener duy nhất lên thẻ cha bao bọc ngoài cùng. Khi bất kỳ thẻ con nào được click, sự kiện sẽ tự động nổi bọt lên cha, tại đây ta dùng e.target để xác định chính xác thẻ con nào vừa kích hoạt sự kiện để xử lý.

2. Tối ưu Refactor bằng DocumentFragment
Mã nguồn lặp trực tiếp gây 1000 lần Reflow/Repaint liên tục làm đơ UI. Kỹ thuật dùng DocumentFragment đóng vai trò như một bộ nhớ đệm ẩn (DOM ảo thu nhỏ), gom toàn bộ node vào rồi mới đẩy ra giao diện 1 lần duy nhất:

JavaScript
const fragment = document.createDocumentFragment();

for (let i = 0; i < 1000; i++) {
    const div = document.createElement("div");
    div.textContent = `Item ${i}`;
    fragment.appendChild(div); // Chỉ append vào bộ nhớ đệm, không gây reflow giao diện
}

document.body.appendChild(fragment); // Gây ra ĐÚNG 1 LẦN Reflow/Repaint duy nhất
Giải thích vì sao nhanh hơn: Khi append trực tiếp vào document.body, mỗi vòng lặp trình duyệt buộc phải tính toán lại kích thước hình học, tọa độ vị trí của toàn trang web (Reflow) và vẽ lại pixel lên màn hình (Repaint). Dùng DocumentFragment giúp gom toàn bộ tiến trình tính toán đó trên RAM rồi mới render ra view một lượt, giảm tải tối đa cho Engine đồ họa của Browser.


---

## 💻 PHẦN B — THỰC HÀNH CODE CÁC MINI-APP

Bao gồm toàn bộ mã nguồn sạch của 4 bài tập. Bạn tạo các cấu trúc thư mục tương ứng như sau:

---

### 📁 Bài B1 — Folder `todo_app/`

#### File `index.html`
```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Todo App Chuyên Nghiệp</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="todo-container">
        <h1>Todos</h1>
        <form id="todoForm">
            <input id="todoInput" type="text" placeholder="Việc cần làm hôm nay là gì?" autocomplete="off">
            <button type="submit">Thêm</button>
        </form>

        <ul id="todoList"></ul>

        <div class="footer-panel">
            <span id="itemCount">0 items left</span>
            <div class="filters">
                <button id="filterAll" class="active">All</button>
                <button id="filterActive">Active</button>
                <button id="filterCompleted">Completed</button>
            </div>
            <button id="clearCompletedBtn">Clear Completed</button>
        </div>
    </div>
    <script src="app.js"></script>
</body>
</html>