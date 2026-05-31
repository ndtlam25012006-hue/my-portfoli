# ĐÁP ÁN PHIẾU BÀI TẬP 10: ASYNC JAVASCRIPT & API INTEGRATION

## PHẦN A — KIỂM TRA ĐỌC HIỂU

### Câu A1 — Sync vs Async

#### 1. Dự đoán thứ tự output hiển thị ở Console:
1 - Start
4 - End
3 - Promise
6 - Promise 2
2 - Timeout 0ms
7 - Nested timeout
5 - Timeout 100ms

#### 2. Giải thích cơ chế vận hành của Event Loop:
* **Call Stack (Ngăn xếp tiếng gọi):** Nơi thực thi các dòng lệnh đồng bộ (Sync). Code chạy tuần tự từ trên xuống dưới. Các lệnh `console.log("1 - Start")` và `console.log("4 - End")` nằm trực tiếp tại đây nên được in ra ngay lập tức.
* **Microtask Queue (Hàng đợi vi tác vụ):** Nơi chứa các callback ưu tiên cao như xử lý Promise (`.then()`, `catch`, `finally`) hoặc `queueMicrotask`. Ngay sau khi Call Stack trống, Event Loop sẽ quét sạch TOÀN BỘ các tác vụ trong Microtask Queue trước khi chuyển sang việc khác. Vì vậy, `"3 - Promise"` và `"6 - Promise 2"` được xử lý ngay sau khi code đồng bộ chạy xong.
* **Macrotask Queue / Task Queue (Hàng đợi đại tác vụ):** Nơi chứa các tác vụ bất đồng bộ như `setTimeout`, `setInterval`, các sự kiện DOM hay AJAX. Chúng chỉ được đẩy từng cái một vào Call Stack để thực thi sau khi Call Stack và Microtask Queue đã hoàn toàn trống rỗng. Do đó, các hàm `setTimeout` dẫu đặt `0ms` vẫn phải xếp hàng đứng sau các Promise.

---

### Câu A2 — Fetch API

#### Giải thích chi tiết từng dòng code:
* **`await fetch(...)`**: Hàm `fetch()` gửi một yêu cầu HTTP mạng đi và lập tức trả về một đối tượng `Promise`, bên trong chứa một đối tượng `Response` (chưa có phần thân dữ liệu hoàn chỉnh). Chúng ta bắt buộc phải sử dụng từ khóa `await` để tạm dừng thực thi hàm async này, đợi cho đến khi mạng phản hồi xong xuôi và Promise được resolve.
* **`response.ok`**: Thuộc tính kiểu Boolean. Nó sẽ trả về `false` khi mã trạng thái phản hồi HTTP (HTTP Status Code) nằm ngoài khoảng thành công `200 - 299`. 
    * *3 mã trạng thái lỗi phổ biến*: `404` (Not Found - Không tìm thấy), `500` (Internal Server Error - Lỗi máy chủ), `403` (Forbidden - Bị cấm truy cập).
* **`await response.json()`**: Đọc luồng dữ liệu thô từ phần thân phản hồi (Response Body) và parse nó thành đối tượng JavaScript. Quá trình đọc luồng dữ liệu này diễn ra bất đồng bộ vì dữ liệu mạng truyền về theo từng gói (chunks), do đó ta cần dùng `await` lần thứ hai để đợi quá trình tải và ép kiểu này hoàn thành.
* **`try...catch`**: Khối này sẽ bẫy được các lỗi liên quan đến kết nối vật lý (Network Error như mất mạng, đứt cáp, DNS lỗi) hoặc lỗi do ép kiểu dữ liệu thất bại (JSON parse error khi server trả về chuỗi text/html thay vì JSON). 
    * *Lưu ý*: Lỗi HTTP như `404` hay `500` không làm phát sinh ngoại lệ trong `fetch()`, do đó ta phải tự dùng câu lệnh `if (!response.ok) { throw new Error(...) }` để chủ động đẩy nó vào nhánh `catch`.

---

### Câu A3 — Promise States

#### 1. Sơ đồ trạng thái vòng đời của một Promise:
```text
                  ┌───────────────┐
                  │    PENDING    │ (Chờ xử lý)
                  └───────┬───────┘
                          │
            ┌─────────────┴─────────────┐
            ▼                           ▼
    ┌───────────────┐           ┌───────────────┐
    │   FULFILLED   │           │   REJECTED    │
    │  (Thành công) │           │  (Thất bại)   │
    └───────────────┘           └───────────────┘
2. Định nghĩa Callback Hell & Kỹ thuật Tối ưu hóa:Callback Hell: Là hiện tượng các hàm bất đồng bộ lồng nhau quá nhiều cấp thông qua tham số callback, tạo nên cấu trúc code có dạng hình phễu "pyramid of doom". Đoạn code này cực kỳ khó đọc, khó bảo trì và quản lý bẫy lỗi.Ví dụ minh họa 4 cấp Callback Hell (Mã cũ):JavaScriptgetDataStep1((res1) => {
    getDataStep2(res1, (res2) => {
        getDataStep3(res2, (res3) => {
            getDataStep4(res3, (dataFinal) => {
                console.log("Xử lý cuối cùng: ", dataFinal);
            });
        });
    });
});
Tối ưu cấu trúc bằng Async/Await (Mã sạch mới):JavaScriptasync function runSteps() {
    try {
        const res1 = await getDataStep1();
        const res2 = await getDataStep2(res1);
        const res3 = await getDataStep3(res2);
        const dataFinal = await getDataStep4(res3);
        console.log("Xử lý cuối cùng: ", dataFinal);
    } catch (error) {
        console.error("Lỗi quy trình xảy ra:", error);
    }
}
PHẦN C — PHÂN TÍCHCâu C1 — Error Handling Strategy1. Biện pháp xử lý lỗi mạng (Network Errors):Sử dụng khối try...catch để phát hiện lỗi mất kết nối vật lý. Trên UI hiển thị một thông báo trực quan yêu cầu kiểm tra lại dây cáp mạng hoặc kết nối Wi-Fi.2. Biện pháp xử lý mã lỗi API phản hồi:Lỗi 500: Báo hệ thống đang bảo trì, vui lòng thử lại sau.Lỗi 404: Thông báo tài nguyên không tồn tại (Ví dụ: sản phẩm đã bị xóa).Lỗi 429: Áp dụng thuật toán hoãn lại một khoảng thời gian (Exponential Backoff) rồi mới cho phép người dùng bấm gửi lại yêu cầu.3. Hàm Fetch kết hợp cơ chế Timeout:JavaScriptfunction fetchWithTimeout(url, ms) {
    return Promise.race([
        fetch(url),
        new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout quá hạn 10 giây")), ms))
    ]);
}
4. Hàm Fetch kết hợp cơ chế Tự động thử lại (Retry Logic):JavaScriptasync function fetchWithRetry(url, maxRetries = 3) {
    for (let i = 0; i < maxRetries; i++) {
        try {
            const response = await fetch(url);
            if (response.ok) return await response.json();
            if (response.status === 404) throw new Error("Không tìm thấy dữ liệu");
        } catch (error) {
            if (i === maxRetries - 1) throw error;
            console.warn(`Lần thử thứ ${i + 1} thất bại. Đang thử lại...`);
        }
    }
}
Câu C2 — Phân biệt các phương thức kiểm soát chuỗi hệ PromisePhương thứcKhi nào Resolve?Khi nào Reject?Trường hợp sử dụng thực tếPromise.all()Khi TẤT CẢ các Promise con đều thành công.Chỉ cần 1 Promise con bất kỳ bị thất bại.Tải thông tin đơn hàng đi kèm danh sách chi tiết các mặt hàng cùng một lúc. Yêu cầu tất cả phải đủ.Promise.allSettled()Khi TẤT CẢ các Promise con đều chạy xong (bất kể thành hay bại).Không bao giờ bị rơi vào trạng thái thất bại.Xây dựng màn hình Dashboard tổng hợp. Widget nào lỗi thì hiện lỗi, widget nào chạy được thì vẫn hiển thị.Promise.race()Khi có 1 Promise con hoàn thành sớm nhất (Thành công).Khi có 1 Promise con hoàn thành sớm nhất (Thất bại).Cơ chế hủy tải yêu cầu (Timeout request). So sánh tốc độ mạng giữa API chính và API dự phòng.Promise.any()Khi có 1 Promise con đầu tiên thành công.Khi TẤT CẢ các Promise con đều đồng loạt thất bại.Kết nối đến các cụm máy chủ CDN phân tán. Server nào phản hồi thành công trước thì lấy dữ liệu từ server đó.Code ví dụ kịch bản thực tế cho các phương thức:JavaScript// 1. Minh họa Promise.all
const loadProductDetails = () => {
    Promise.all([
        fetch("/api/product/1").then(r => r.json()),
        fetch("/api/product/1/reviews").then(r => r.json())
    ])
    .then(([info, reviews]) => console.log("Render đủ trang:", info, reviews))
    .catch(err => console.error("Thiếu dữ liệu bắt buộc, không render trang", err));
};

// 2. Minh họa Promise.allSettled
const loadDashboardWidgets = () => {
    Promise.allSettled([
        fetch("/api/weather").then(r => r.json()),
        fetch("/api/crypto-rates").then(r => r.json()),
        fetch("/api/news").then(r => r.json())
    ])
    .then(results => {
        results.forEach((res, i) => {
            if(res.status === 'fulfilled') console.log(`Widget ${i} chạy ngon:`, res.value);
            else console.error(`Widget ${i} lỗi nhưng không sập app:`, res.reason);
        });
    });
};

// 3. Minh họa Promise.race
const fetchWithRacingTimeout = () => {
    Promise.race([
        fetch("[https://fast-api.com/data](https://fast-api.com/data)").then(r => r.json()),
        new Promise((_, reject) => setTimeout(() => reject(new Error("Mạng quá chậm!")), 2000))
    ])
    .then(data => console.log("Lấy data kịp giờ:", data))
    .catch(err => console.error("Hủy yêu cầu do:", err.message));
};

---

## 💻 PHẦN B — MÃ NGUỒN CÁC MINI-APP

Tạo các cấu trúc thư mục tương ứng trong đồ án bài tập của bạn và dán code vào:

---

### 📁 Bài B1 — Folder `weather_app/`

#### File `index.html`
```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Ứng dụng Thời Tiết Real-time</title>
    <style>
        body { font-family: Arial, sans-serif; background: #e0f7fa; display: flex; justify-content: center; padding-top: 50px; }
        .box { background: white; padding: 25px; border-radius: 8px; width: 350px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
        .search-row { display: flex; gap: 10px; margin-bottom: 20px; }
        input { flex: 1; padding: 8px; border: 1px solid #ccc; border-radius: 4px; }
        button { padding: 8px 12px; background: #0288d1; color: white; border: none; border-radius: 4px; cursor: pointer; }
        .status { text-align: center; font-weight: bold; margin: 15px 0; }
        .history { margin-top: 20px; border-top: 1px solid #eee; padding-top: 15px; }
        .history-tag { display: inline-block; background: #cfd8dc; padding: 4px 8px; border-radius: 4px; margin: 3px; cursor: pointer; font-size: 13px; }
        .hidden { display: none; }
    </style>
</head>
<body>
    <div class="box">
        <h3>Dự Báo Thời Tiết</h3>
        <div class="search-row">
            <input type="text" id="cityInput" placeholder="Nhập tên thành phố (vd: Hanoi)">
            <button id="searchBtn">Tìm</button>
        </div>

        <div id="loading" class="status hidden">⏳ Đang tải dữ liệu...</div>
        <div id="error" class="status hidden" style="color:red;">❌ Không tìm thấy thành phố hoặc mất kết nối mạng!</div>

        <div id="weatherResult" class="hidden">
            <h2 id="resCity">--</h2>
            <h1 id="resTemp">--°C</h1>
            <p>💦 Độ ẩm: <span id="resHumidity">--</span>%</p>
            <p>🌤️ Trạng thái: <span id="resDesc">--</span></p>
        </div>

        <div class="history">
            <h4>Lịch sử tìm kiếm:</h4>
            <div id="historyList"></div>
        </div>
    </div>
    <script src="app.js"></script>
</body>
</html>