let projects = [
    { id: 1, title: "AI Chatbot", student: "Nguyễn Văn A", email: "a@example.com", phone: "0123456789", mentor: "TS. Trần B", status: "Hoàn thành" },
    { id: 2, title: "Web GIS", student: "Trần Thị C", email: "c@example.com", phone: "0987654321", mentor: "ThS. Lê D", status: "Hoàn thành" },
    { id: 3, title: "Mobile App", student: "Phạm Văn E", email: "e@example.com", phone: "0912345678", mentor: "TS. Hoàng F", status: "Đang làm" },
    { id: 4, title: "IoT Smart Home", student: "Đặng Thị G", email: "g@example.com", phone: "0901234567", mentor: "ThS. Nguyễn H", status: "Hoàn thành" },
    { id: 5, title: "Data Mining", student: "Vũ Văn I", email: "i@example.com", phone: "0998765432", mentor: "TS. Phan J", status: "Đang làm" }
];

const tableBody = document.getElementById('projectTableBody');
const projectModal = document.getElementById('projectModal');
const projectForm = document.getElementById('projectForm');
const editProjectId = document.getElementById('editProjectId');
const searchProject = document.getElementById('searchProject');

function updateCounters() {
    document.getElementById('totalProjects').innerText = projects.length;
    document.getElementById('completedProjects').innerText = projects.filter(p => p.status === 'Hoàn thành').length;
    document.getElementById('pendingProjects').innerText = projects.filter(p => p.status === 'Đang làm').length;
}

function renderProjects(data = projects) {
    tableBody.innerHTML = '';
    data.forEach((p, index) => {
        const row = document.createElement('tr');
        const statusClass = p.status === 'Hoàn thành' ? 'done' : 'doing';
        
        row.innerHTML = `
            <td>${index + 1}</td>
            <td><strong>${p.title}</strong></td>
            <td>${p.student}</td>
            <td>${p.email}</td>
            <td>${p.phone}</td>
            <td>${p.mentor}</td>
            <td><span class="status-tag ${statusClass}">${p.status}</span></td>
            <td class="action-buttons">
                <button class="btn-edit-inline" onclick="openEditModal(${p.id})">Sửa</button>
                <button class="btn-delete-inline" onclick="deleteProject(${p.id})">Xóa</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
    updateCounters();
}

searchProject.addEventListener('input', (e) => {
    const key = e.target.value.toLowerCase();
    const filtered = projects.filter(p => p.student.toLowerCase().includes(key) || p.title.toLowerCase().includes(key));
    renderProjects(filtered);
});

function showModal() { projectModal.classList.remove('hidden'); }
function closeModal() { projectModal.classList.add('hidden'); projectForm.reset(); editProjectId.value = ''; }

document.getElementById('btnOpenModal').addEventListener('click', showModal);
document.getElementById('btnCloseModal').addEventListener('click', closeModal);
document.getElementById('btnCancel').addEventListener('click', closeModal);

projectForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = editProjectId.value;
    const projectData = {
        title: document.getElementById('projTitle').value,
        student: document.getElementById('studentName').value,
        email: document.getElementById('studentEmail').value,
        phone: document.getElementById('studentPhone').value,
        mentor: document.getElementById('mentorName').value,
        status: document.getElementById('projStatus').value
    };

    if (id) {
        const index = projects.findIndex(p => p.id === parseInt(id));
        if (index !== -1) projects[index] = { id: parseInt(id), ...projectData };
    } else {
        projectData.id = Date.now();
        projects.push(projectData);
    }
    renderProjects();
    closeModal();
});

window.openEditModal = function(id) {
    const p = projects.find(item => item.id === id);
    if (!p) return;
    editProjectId.value = p.id;
    document.getElementById('projTitle').value = p.title;
    document.getElementById('studentName').value = p.student;
    document.getElementById('studentEmail').value = p.email;
    document.getElementById('studentPhone').value = p.phone;
    document.getElementById('mentorName').value = p.mentor;
    document.getElementById('projStatus').value = p.status;
    showModal();
};

window.deleteProject = function(id) {
    if (confirm("Xác nhận xóa đồ án này?")) {
        projects = projects.filter(p => p.id !== id);
        renderProjects();
    }
};

renderProjects();