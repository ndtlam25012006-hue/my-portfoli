let theses = [
    { id: 1, title: "AI Chatbot", student: "Nguyễn Văn A", email: "a@example.com", phone: "0123456789", advisor: "TS. Trần B" },
    { id: 2, title: "Web GIS", student: "Trần Thị C", email: "c@example.com", phone: "0987654321", advisor: "ThS. Lê D" },
    { id: 3, title: "Mobile App", student: "Phạm Văn E", email: "e@example.com", phone: "0912345678", advisor: "TS. Hoàng F" }
];

function renderTable() {
    const tbody = document.getElementById("thesisTableBody");
    tbody.innerHTML = "";
    theses.forEach((t, i) => {
        tbody.innerHTML += `
            <tr>
                <td>${i + 1}</td>
                <td><strong>${t.title}</strong></td>
                <td>${t.student}</td>
                <td>${t.email}</td>
                <td>${t.phone}</td>
                <td>${t.advisor}</td>
                <td>
                    <button class="btn-danger" onclick="deleteThesis(${t.id})">Xóa</button>
                </td>
            </tr>
        `;
    });
}

function openModal() {
    document.getElementById("thesisModal").style.display = "flex";
}

function closeModal() {
    document.getElementById("thesisModal").style.display = "none";
    document.getElementById("thesisForm").reset();
}

function saveThesis(e) {
    e.preventDefault();
    const newThesis = {
        id: Date.now(),
        title: document.getElementById("thesisTitle").value,
        student: document.getElementById("studentName").value,
        email: document.getElementById("studentEmail").value,
        phone: document.getElementById("studentPhone").value,
        advisor: document.getElementById("advisor").value
    };
    theses.push(newThesis);
    renderTable();
    closeModal();
}

function deleteThesis(id) {
    if(confirm("Bạn có chắc chắn muốn xóa đồ án này?")) {
        theses = theses.filter(t => t.id !== id);
        renderTable();
    }
}

// Khởi chạy dữ liệu lúc đầu
renderTable();