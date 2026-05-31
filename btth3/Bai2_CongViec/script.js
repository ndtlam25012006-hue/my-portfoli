// File: script.js

// 1. Đọc dữ liệu ban đầu tự động từ localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// 2. Tham chiếu các thành phần DOM
const taskListEl = document.getElementById('taskList');
const taskModal = document.getElementById('taskModal');
const taskForm = document.getElementById('taskForm');
const modalTitle = document.getElementById('modalTitle');
const editTaskId = document.getElementById('editTaskId');
const toastMessage = document.getElementById('toastMessage');

// Các phần tử hiển thị thống kê số liệu
const totalTasksEl = document.getElementById('totalTasks');
const completedTasksEl = document.getElementById('completedTasks');
const pendingTasksEl = document.getElementById('pendingTasks');

// Các nút Đóng / Mở form popup
const btnOpenModal = document.getElementById('btnOpenModal');
const btnCloseModal = document.getElementById('btnCloseModal');
const btnCancel = document.getElementById('btnCancel');

// 3. Hàm hiển thị thông báo Toast nhanh
function showToast(message) {
    toastMessage.innerText = message;
    toastMessage.classList.remove('hidden');
    setTimeout(() => {
        toastMessage.classList.add('hidden');
    }, 2500);
}

// 4. Hàm tính toán và cập nhật khu vực số liệu thống kê công việc
function updateTaskSummary() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const pending = total - completed;

    totalTasksEl.innerText = total;
    completedTasksEl.innerText = completed;
    pendingTasksEl.innerText = pending;
}

// 5. Hàm lưu mảng dữ liệu vào cấu trúc bộ nhớ trình duyệt
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// 6. Hàm kết xuất (render) danh sách công việc động ra khối giao diện Card
function renderTasks() {
    taskListEl.innerHTML = '';

    if (tasks.length === 0) {
        taskListEl.innerHTML = `<div style="text-align:center; color:#9ca3af; padding: 20px;">Không có công việc nào cần xử lý.</div>`;
        return;
    }

    tasks.forEach((task) => {
        const card = document.createElement('div');
        card.className = `task-item ${task.completed ? 'is-completed' : ''}`;
        
        // Xác định class màu cho badge mức độ ưu tiên
        let badgeClass = 'badge-low';
        if (task.priority === 'Cao') badgeClass = 'badge-high';
        else if (task.priority === 'Trung bình') badgeClass = 'badge-medium';

        card.innerHTML = `
            <div class="task-text">
                <h3>${task.title}</h3>
                <p>${task.desc}</p>
                <div class="task-meta">
                    <span>📅 Hạn: ${task.dueDate}</span>
                    <span class="badge ${badgeClass}">Ưu tiên: ${task.priority}</span>
                </div>
            </div>
            <div class="task-actions">
                <input type="checkbox" class="chk-complete" ${task.completed ? 'checked' : ''} onclick="toggleTaskStatus(${task.id})">
                <button class="btn btn-warning" onclick="editTask(${task.id})">Sửa</button>
                <button class="btn btn-danger" onclick="deleteTask(${task.id})">Xóa</button>
            </div>
        `;
        taskListEl.appendChild(card);
    });
}

// 7. Hàm kiểm soát Đóng / Mở modal popup nhập liệu
function openModal(title = "Thêm Công Việc Mới") {
    modalTitle.innerText = title;
    taskModal.classList.remove('hidden');
}

function closeModal() {
    taskModal.classList.add('hidden');
    taskForm.reset();
    editTaskId.value = '';
}

// Gắn trình lắng nghe sự kiện Click điều khiển giao diện form
btnOpenModal.addEventListener('click', () => openModal("Thêm Công Việc Mới"));
btnCloseModal.addEventListener('click', closeModal);
btnCancel.addEventListener('click', closeModal);

// 8. Bắt sự kiện Submit để xử lý cả luồng Thêm mới và Cập nhật dữ liệu
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.getElementById('taskTitle').value.trim();
    const desc = document.getElementById('taskDesc').value.trim();
    const dueDate = document.getElementById('dueDate').value;
    const priority = document.getElementById('priority').value;

    const isEditMode = editTaskId.value !== '';

    if (isEditMode) {
        // Cập nhật công việc hiện có dựa vào ID lưu tạm
        const id = parseInt(editTaskId.value);
        const index = tasks.findIndex(t => t.id === id);
        if (index !== -1) {
            tasks[index] = { ...tasks[index], title, desc, dueDate, priority };
            showToast("Cập nhật nội dung công việc thành công!");
        }
    } else {
        // Tạo object công việc mới và đẩy vào mảng dữ liệu
        const newTask = {
            id: Date.now(), // Sử dụng mốc thời gian làm ID duy nhất định danh công việc
            title,
            desc,
            dueDate,
            priority,
            completed: false
        };
        tasks.push(newTask);
        showToast("Đã lưu thêm một công việc mới!");
    }

    saveTasks();
    renderTasks();
    updateTaskSummary();
    closeModal();
});

// 9. Hàm bắt sự kiện thay đổi trạng thái Checkbox hoàn thành công việc
window.toggleTaskStatus = function(id) {
    const index = tasks.findIndex(t => t.id === id);
    if (index !== -1) {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks();
        updateTaskSummary();
        showToast(tasks[index].completed ? "Đã đánh dấu hoàn thành!" : "Đưa công việc về trạng thái chưa làm.");
    }
};

// 10. Hàm nạp ngược dữ liệu công việc cũ lên form để sẵn sàng Sửa đổi
window.editTask = function(id) {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    document.getElementById('taskTitle').value = task.title;
    document.getElementById('taskDesc').value = task.desc;
    document.getElementById('dueDate').value = task.dueDate;
    document.getElementById('priority').value = task.priority;
    
    editTaskId.value = task.id; // Đánh dấu ID đang sửa

    openModal("Cập Nhật Công Việc");
};

// 11. Hàm bắt sự kiện Xóa kèm hộp thoại xác nhận bắt buộc trước khi loại bỏ khỏi mảng
window.deleteTask = function(id) {
    if (confirm("Bạn có thực sự muốn xóa bỏ vĩnh viễn công việc này không?")) {
        tasks = tasks.filter(t => t.id !== id);
        saveTasks();
        renderTasks();
        updateTaskSummary();
        showToast("Đã xóa công việc.");
    }
};

// 12. Kích hoạt chạy khởi động render giao diện và tính toán thống kê ngay khi tải trang
renderTasks();
updateTaskSummary();