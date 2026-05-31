let currentImgIndex = 0;
const boxes = document.querySelectorAll('.img-box');
const paletteModal = document.getElementById('paletteModal');
const paletteInput = document.getElementById('paletteInput');
const commandList = document.getElementById('commandList');

const commands = [
    { text: "Thay đổi giao diện: Chế độ tối (Dark mode)", action: () => alert("Đã kích hoạt chế độ tối!") },
    { text: "Mở cài đặt tài khoản sinh viên", action: () => alert("Chuyển hướng trang thiết lập...") },
    { text: "Xóa toàn bộ bộ nhớ đệm hệ thống", action: () => alert("Đã xóa cache thành công!") },
    { text: "Tải xuống file báo cáo kết quả học tập", action: () => alert("Đang tải tệp báo cáo...") }
];
let filteredCommands = [...commands];
let selectedCmdIndex = 0;

function updateGallery(index) {
    boxes.forEach(b => b.classList.remove('active'));
    currentImgIndex = (index + boxes.length) % boxes.length;
    boxes[currentImgIndex].classList.add('active');
    document.getElementById('statusTxt').textContent = `Đang chọn ảnh: ${currentImgIndex + 1}/${boxes.length}`;
}

// Bắt các sự kiện phím tắt toàn app (Keyboard Navigation)
window.addEventListener('keydown', (e) => {
    // 1. Phím tắt Ctrl + K mở Command Palette
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        paletteModal.classList.remove('hidden');
        paletteInput.value = '';
        paletteInput.focus();
        renderCommands();
        return;
    }

    // Nếu đang mở bảng lệnh Palette overlay
    if (!paletteModal.classList.contains('hidden')) {
        const items = commandList.querySelectorAll('li');
        if (e.key === 'Escape') {
            paletteModal.classList.add('hidden');
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            selectedCmdIndex = (selectedCmdIndex + 1) % items.length;
            highlightCommand(items);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            selectedCmdIndex = (selectedCmdIndex - 1 + items.length) % items.length;
            highlightCommand(items);
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if(filteredCommands[selectedCmdIndex]) {
                filteredCommands[selectedCmdIndex].action();
                paletteModal.classList.add('hidden');
            }
        }
        return;
    }

    // 2. Phím chuyển ảnh Gallery nhanh bằng phím mũi tên và số
    if (e.key === 'ArrowRight') updateGallery(currentImgIndex + 1);
    if (e.key === 'ArrowLeft') updateGallery(currentImgIndex - 1);
    if (e.key >= '1' && e.key <= '4') {
        const num = parseInt(e.key) - 1;
        if(num < boxes.length) updateGallery(num);
    }
});

// Render danh sách lệnh hệ thống ra Command Palette
function renderCommands() {
    commandList.innerHTML = '';
    const query = paletteInput.value.toLowerCase();
    filteredCommands = commands.filter(c => c.text.toLowerCase().includes(query));
    selectedCmdIndex = 0;

    filteredCommands.forEach((c, idx) => {
        const li = document.createElement('li');
        li.textContent = c.text;
        if(idx === 0) li.className = 'selected';
        li.addEventListener('click', () => { c.action(); paletteModal.classList.add('hidden'); });
        commandList.appendChild(li);
    });
}

function highlightCommand(items) {
    items.forEach(i => i.classList.remove('selected'));
    if(items[selectedCmdIndex]) items[selectedCmdIndex].classList.add('selected');
}

paletteInput.addEventListener('input', renderCommands);