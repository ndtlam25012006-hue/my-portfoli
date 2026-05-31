let devices = [
    { id: 1, name: "Dell OptiPlex 7090", serial: "DL7090001", type: "Máy bàn", status: "Hoạt động", date: "2025-01-10", warranty: "3 năm", email: "admin@company.com" },
    { id: 2, name: "HP LaserJet Pro M404", serial: "HP404001", type: "Máy in", status: "Hoạt động", date: "2024-11-15", warranty: "1 năm", email: "print@company.com" },
    { id: 3, name: "Lenovo ThinkPad X1", serial: "LN-X1-001", type: "Laptop", status: "Hoạt động", date: "2025-03-01", warranty: "2 năm", email: "user1@company.com" },
    { id: 4, name: "Ubuntu Server 20.04", serial: "UB-SRV-001", type: "Máy chủ", status: "Hoạt động", date: "2023-05-20", warranty: "3 năm", email: "sys@company.com" },
    { id: 5, name: "LG UltraWide 34WN80C", serial: "LG34WN001", type: "Màn hình", status: "Không hoạt động", date: "2024-08-12", warranty: "2 năm", email: "tech@company.com" },
    { id: 6, name: "LG 27GP850", serial: "LG27GP85001", type: "Màn hình", status: "Hoạt động", date: "2025-02-18", warranty: "2 năm", email: "design@company.com" }
];

const deviceGrid = document.getElementById('deviceGrid');
const deviceModal = document.getElementById('deviceModal');
const deviceForm = document.getElementById('deviceForm');
const modalTitle = document.getElementById('modalTitle');
const editDeviceId = document.getElementById('editDeviceId');
const searchDevice = document.getElementById('searchDevice');
const btnOpenModal = document.getElementById('btnOpenModal');
const btnCloseModal = document.getElementById('btnCloseModal');
const btnCancel = document.getElementById('btnCancel');

function renderDevices(data = devices) {
    deviceGrid.innerHTML = '';
    if(data.length === 0) {
        deviceGrid.innerHTML = '<p style="color: #999; grid-column: 1/-1; text-align: center;">Không tìm thấy thiết bị.</p>';
        return;
    }
    data.forEach(d => {
        const card = document.createElement('div');
        card.className = 'device-card';
        const statusClass = d.status === 'Hoạt động' ? 'active' : 'inactive';
        card.innerHTML = `
            <h4>${d.name}</h4>
            <p><strong>SN:</strong> ${d.serial}</p>
            <p><strong>${d.type}</strong></p>
            <p class="status ${statusClass}">${d.status}</p>
            <div class="card-actions">
                <button onclick="openEditModal(${d.id})">Sửa</button>
                <button onclick="deleteDevice(${d.id})">Xóa</button>
            </div>
        `;
        deviceGrid.appendChild(card);
    });
}

searchDevice.addEventListener('input', (e) => {
    const keyword = e.target.value.toLowerCase();
    const filtered = devices.filter(d => d.name.toLowerCase().includes(keyword) || d.serial.toLowerCase().includes(keyword));
    renderDevices(filtered);
});

function showModal() { deviceModal.classList.remove('hidden'); }
function closeModal() { deviceModal.classList.add('hidden'); deviceForm.reset(); editDeviceId.value = ''; }

btnOpenModal.addEventListener('click', () => { modalTitle.innerText = "Thêm Thiết bị"; showModal(); });
btnCloseModal.addEventListener('click', closeModal);
btnCancel.addEventListener('click', closeModal);

deviceForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = editDeviceId.value;
    const deviceData = {
        name: document.getElementById('deviceName').value,
        serial: document.getElementById('deviceSerial').value,
        type: document.getElementById('deviceType').value,
        date: document.getElementById('purchaseDate').value,
        warranty: document.getElementById('warranty').value,
        email: document.getElementById('managerEmail').value,
        status: document.getElementById('deviceStatus').value
    };
    if (id) {
        const index = devices.findIndex(d => d.id === parseInt(id));
        if (index !== -1) devices[index] = { id: parseInt(id), ...deviceData };
    } else {
        deviceData.id = Date.now();
        devices.push(deviceData);
    }
    renderDevices();
    closeModal();
});

window.openEditModal = function(id) {
    const d = devices.find(item => item.id === id);
    if (!d) return;
    modalTitle.innerText = "Sửa Thiết bị";
    editDeviceId.value = d.id;
    document.getElementById('deviceName').value = d.name;
    document.getElementById('deviceSerial').value = d.serial;
    document.getElementById('deviceType').value = d.type;
    document.getElementById('purchaseDate').value = d.date;
    document.getElementById('warranty').value = d.warranty;
    document.getElementById('managerEmail').value = d.email;
    document.getElementById('deviceStatus').value = d.status;
    showModal();
};

window.deleteDevice = function(id) {
    if(confirm("Bạn có chắc chắn muốn xóa?")) {
        devices = devices.filter(d => d.id !== id);
        renderDevices();
    }
};

renderDevices();