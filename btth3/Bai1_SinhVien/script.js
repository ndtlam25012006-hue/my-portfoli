// File: script.js

// 1. Khởi tạo dữ liệu từ localStorage hoặc mảng rỗng nếu chưa có dữ liệu
let students = JSON.parse(localStorage.getItem('students')) || [];

// 2. Lấy các phần tử DOM cần thiết
const studentTableBody = document.getElementById('studentTableBody');
const studentModal = document.getElementById('studentModal');
const studentForm = document.getElementById('studentForm');
const modalTitle = document.getElementById('modalTitle');
const editStudentId = document.getElementById('editStudentId');
const toastMessage = document.getElementById('toastMessage');

// Các phần tử thống kê
const totalStudentsEl = document.getElementById('totalStudents');
const classAverageEl = document.getElementById('classAverage');

// Các nút Đóng / Mở Modal
const btnOpenModal = document.getElementById('btnOpenModal');
const btnCloseModal = document.getElementById('btnCloseModal');
const btnCancel = document.getElementById('btnCancel');

// 3. Hàm hiển thị thông báo Toast nhanh
function showToast(message) {
    toastMessage.innerText = message;
    toastMessage.classList.remove('hidden');
    setTimeout(() => {
        toastMessage.classList.add('hidden');
    }, 3000);
}

// 4. Hàm cập nhật số liệu thống kê (Tổng số và Điểm trung bình)
function updateStatistics() {
    const total = students.length;
    totalStudentsEl.innerText = total;

    if (total === 0) {
        classAverageEl.innerText = '0.0';
        return;
    }

    const sum = students.reduce((acc, curr) => acc + parseFloat(curr.gpa), 0);
    const average = (sum / total).toFixed(2);
    classAverageEl.innerText = average;
}

// 5. Hàm lưu dữ liệu xuống localStorage
function saveToLocalStorage() {
    localStorage.setItem('students', JSON.stringify(students));
}

// 6. Hàm hiển thị danh sách sinh viên lên bảng HTML
function renderStudents() {
    studentTableBody.innerHTML = '';

    if (students.length === 0) {
        studentTableBody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: #9ca3af;">Chưa có dữ liệu sinh viên nào.</td></tr>`;
        return;
    }

    students.forEach((student) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.dob}</td>
            <td>${student.className}</td>
            <td>${student.email}</td>
            <td><strong>${parseFloat(student.gpa).toFixed(1)}</strong></td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editStudent('${student.id}')">Sửa</button>
                <button class="btn btn-danger btn-sm" onclick="deleteStudent('${student.id}')">Xóa</button>
            </td>
        `;
        studentTableBody.appendChild(row);
    });
}

// 7. Hàm mở và đóng Modal popup
function openModal(title = "Thêm Sinh Viên Mới") {
    modalTitle.innerText = title;
    studentModal.classList.remove('hidden');
}

function closeModal() {
    studentModal.classList.add('hidden');
    studentForm.reset();
    editStudentId.value = '';
    document.getElementById('studentId').disabled = false; // Mở khóa ô nhập mã SV
}

// 8. Bắt sự kiện Click cho các nút Điều khiển Modal
btnOpenModal.addEventListener('click', () => openModal("Thêm Sinh Viên Mới"));
btnCloseModal.addEventListener('click', closeModal);
btnCancel.addEventListener('click', closeModal);

// 9. Xử lý Sự kiện Submit Form (Dùng cho cả Thêm và Sửa)
studentForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const id = document.getElementById('studentId').value.trim();
    const name = document.getElementById('fullName').value.trim();
    const dob = document.getElementById('dob').value;
    const className = document.getElementById('className').value.trim();
    const email = document.getElementById('email').value.trim();
    const gpa = document.getElementById('gpa').value;

    const isEditMode = editStudentId.value !== '';

    if (isEditMode) {
        // Chế độ Cập nhật (Sửa)
        const index = students.findIndex(s => s.id === editStudentId.value);
        if (index !== -1) {
            students[index] = { id, name, dob, className, email, gpa };
            showToast("Cập nhật thông tin sinh viên thành công!");
        }
    } else {
        // Chế độ Thêm mới - Kiểm tra trùng mã SV trước khi thêm
        const isDuplicate = students.some(s => s.id === id);
        if (isDuplicate) {
            alert("Mã sinh viên này đã tồn tại! Vui lòng kiểm tra lại.");
            return;
        }

        students.push({ id, name, dob, className, email, gpa });
        showToast("Thêm mới sinh viên thành công!");
    }

    // Lưu dữ liệu, load lại bảng và đóng modal
    saveToLocalStorage();
    renderStudents();
    updateStatistics();
    closeModal();
});

// 10. Hàm xử lý khi bấm nút Sửa (Đưa dữ liệu ngược lên form)
window.editStudent = function(id) {
    const student = students.find(s => s.id === id);
    if (!student) return;

    document.getElementById('studentId').value = student.id;
    document.getElementById('studentId').disabled = true; // Không cho sửa mã SV
    document.getElementById('fullName').value = student.name;
    document.getElementById('dob').value = student.dob;
    document.getElementById('className').value = student.className;
    document.getElementById('email').value = student.email;
    document.getElementById('gpa').value = student.gpa;
    
    editStudentId.value = student.id; // Đánh dấu ID đang sửa

    openModal("Cập Nhật Thông Tin Sinh Viên");
};

// 11. Hàm xử lý khi bấm nút Xóa sinh viên
window.deleteStudent = function(id) {
    if (confirm(`Bạn có chắc chắn muốn xóa sinh viên có mã ${id} không?`)) {
        students = students.filter(s => s.id !== id);
        saveToLocalStorage();
        renderStudents();
        updateStatistics();
        showToast("Đã xóa sinh viên khỏi hệ thống.");
    }
};

// 12. Chạy khởi tạo ứng dụng khi load trang lần đầu
renderStudents();
updateStatistics();