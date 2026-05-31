let devices = [
    { id: 1, name: "Dell OptiPlex 7090", serial: "DL7090001", type: "Máy bán", status: "Hoạt động" },
    { id: 2, name: "HP LaserJet Pro M404", serial: "HP404001", type: "Máy in", status: "Hoạt động" },
    { id: 3, name: "Lenovo ThinkPad X1", serial: "LN-X1-001", type: "Laptop", status: "Hoạt động" },
    { id: 4, name: "Ubuntu Server 20.04", serial: "UB-SRV-001", type: "Máy chủ", status: "Hoạt động" },
    { id: 5, name: "LG UltraWide 34WN80C", serial: "LG34WN001", type: "Màn hình", status: "Không hoạt động" }
];

function renderDevices() {
    const grid = document.getElementById("deviceGrid");
    grid.innerHTML = "";
    devices.forEach(d => {
        grid.innerHTML += `
            <div class="card">
                <h4>${d.name}</h4>
                <p><strong>SN:</strong> ${d.serial}</p>
                <p><strong>Loại:</strong> ${d.type}</p>
                <p><strong>Trạng thái:</strong> ${d.status}</p>
                <div class="card-actions">
                    <button onclick="deleteDevice(${d.id})">Xóa</button>
                </div>
            </div>
        `;
    });
}

function openModal() {
    document.getElementById("deviceModal").style.display = "flex";
}

function closeModal() {
    document.getElementById("deviceModal").style.display = "none";
    document.getElementById("deviceForm").reset();
}

function saveDevice(e) {
    e.preventDefault();
    const newDevice = {
        id: Date.now(),
        name: document.getElementById("deviceName").value,
        serial: document.getElementById("deviceSerial").value,
        type: document.getElementById("deviceType").value,
        status: document.getElementById("deviceStatus").value
    };
    devices.push(newDevice);
    renderDevices();
    closeModal();
}

function deleteDevice(id) {
    if(confirm("Bạn có chắc chắn muốn xóa thiết bị này?")) {
        devices = devices.filter(d => d.id !== id);
        renderDevices();
    }
}

// Chạy lần đầu tiên khi load trang
renderDevices();