2. Khác biệt về Hoisting
Ba cách này có sự khác biệt hoàn toàn về cơ chế Hoisting:

Function Declaration: Được hoisting hoàn toàn. Trình biên dịch JS đưa toàn bộ định nghĩa hàm lên đầu scope, do đó bạn có thể gọi hàm trước khi dòng code khai báo nó chạy qua mà không gặp lỗi.

Function Expression & Arrow Function: Bản chất là gán hàm vào một biến (const hoặc let). Biến này bị dính cơ chế "Temporal Dead Zone" (Vùng chết tạm thời), nên nếu gọi hàm trước dòng khai báo sẽ lập tức gây lỗi ReferenceError.

Câu A2 — Scope & Closure
1. Dự đoán Output
Đoạn mã 1 (Counter Closure):

c.increment() -> 1

c.increment() -> 2

c.increment() -> 3

c.decrement() -> 2

c.getCount()  -> 2

Đoạn mã 2 (Vòng lặp với setTimeout):

Khối sử dụng var: In ra số 3 (3 lần liên tiếp cách nhau 100ms).

Khối sử dụng let: In ra lần lượt 0, 1, 2 (mỗi số cách nhau 100ms).

2. Giải thích cơ chế
Với var: Từ khóa này không có Block Scope (phạm vi khối) mà là Global hoặc Function Scope. Cả 3 lượt chạy của vòng lặp đều dùng chung một biến i duy nhất. Đến khi setTimeout kích hoạt sau 100ms thì vòng lặp thực tế đã chạy xong và giá trị của i lúc đó đã bằng 3. Do đó cả 3 hàm callback đều lấy giá trị 3 này tại bộ nhớ chung để in ra.

Với let: Từ khóa này có Block Scope. Mỗi lượt lặp, một phạm vi môi trường (Lexical Environment) mới được tạo ra cùng một biến j riêng biệt. Nhờ tính chất của Closure, hàm callback bên trong setTimeout "nhớ" và giữ được giá trị j chính xác của riêng lượt lặp đó, giúp kết quả in ra đúng tuần tự.

Câu A3 — Array Methods
Dưới đây là mã triển khai cho 8 yêu cầu xử lý mảng nums:

JavaScript
const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// 1. Lấy các số chẵn
const cau1 = nums.filter(n => n % 2 === 0);

// 2. Nhân mỗi số với 3
const cau2 = nums.map(n => n * 3);

// 3. Tính tổng tất cả các phần tử
const cau3 = nums.reduce((sum, n) => sum + n, 0);

// 4. Tìm số đầu tiên lớn hơn 7
const cau4 = nums.find(n => n > 7);

// 5. Kiểm tra xem CÓ số nào lớn hơn 10 không
const cau5 = nums.some(n => n > 10);

// 6. Kiểm tra xem TẤT CẢ các số có lớn hơn 0 không
const cau6 = nums.every(n => n > 0);

// 7. Tạo mảng mới có định dạng "Số X là [chẵn/lẻ]"
const cau7 = nums.map(n => `Số ${n} là ${n % 2 === 0 ? 'chẵn' : 'lẻ'}`);

// 8. Đảo ngược mảng mà không làm thay đổi mảng gốc (không mutate)
const cau8 = [...nums].reverse();
Câu A4 — Object Destructuring & Spread
1. Dự đoán Output
console.log(name, price, ram, color); -> iPhone 16 25990000 8 Titan

console.log(specs); -> ReferenceError: specs is not defined (Vì ta đã destructure sâu để lấy trực tiếp ram và color, biến specs không được định nghĩa độc lập).

console.log(updated.price); -> 23990000

console.log(updated.sale);  -> true

console.log(product.price);  -> 25990000

console.log(product.specs.ram); -> 16 (Giá trị bị thay đổi từ 8 thành 16 do lỗi sao chép nông).

2. Giải thích hiện tượng (Spread Gotcha)
Cú pháp spread { ...product } chỉ thực hiện sao chép nông (Shallow Copy). Đối với các thuộc tính là một Object lồng sâu bên trong như specs, nó không tạo ra object mới hoàn toàn mà chỉ sao chép địa chỉ vùng nhớ (tham chiếu). Do đó, updated.specs và product.specs thực chất vẫn đang trỏ chung vào cùng một ô nhớ trên Heap. Khi ta thay đổi thuộc tính ram trên bản updated, mảng gốc product cũng bị ảnh hưởng theo.

PHẦN C — SUY LUẬN & THIẾT KẾ
Câu C1 — Refactor Code (Chuỗi phương thức mảng)
Đoạn mã sau khi được tối ưu hóa bằng cách kết hợp liên hoàn filter, map và sort, loại bỏ các vòng lặp for thủ công và biến tạm:

JavaScript
function processOrders(orders) {
    return orders
        .filter(order => order.status === "completed" && order.total > 100000)
        .map(({ id, customer, total }) => ({
            id, customer, total,
            discount: total * 0.1,
            finalTotal: total * 0.9
        }))
        .sort((a, b) => b.finalTotal - a.finalTotal);
}
Câu C2 — Thiết kế API tự chế (miniArray)
Tự triển khai lại các hàm cốt lõi của mảng bằng JavaScript thuần sử dụng vòng lặp for:

JavaScript
const miniArray = {
    // Tự viết hàm map
    map(arr, fn) {
        const result = [];
        for (let i = 0; i < arr.length; i++) {
            result.push(fn(arr[i], i, arr));
        }
        return result;
    },

    // Tự viết hàm filter
    filter(arr, fn) {
        const result = [];
        for (let i = 0; i < arr.length; i++) {
            if (fn(arr[i], i, arr)) {
                result.push(arr[i]);
            }
        }
        return result;
    },

    // Tự viết hàm reduce
    reduce(arr, fn, initialValue) {
        let acc = initialValue !== undefined ? initialValue : arr[0];
        let start = initialValue !== undefined ? 0 : 1;
        
        for (let i = start; i < arr.length; i++) {
            acc = fn(acc, arr[i], i, arr);
        }
        return acc;
    }
};