const api = {
    baseURL: "https://jsonplaceholder.typicode.com",
    async getUsers() {
        const r = await fetch(`${this.baseURL}/users`);
        if(!r.ok) throw new Error("Không thể tải danh sách người dùng");
        return r.json();
    },
    async createUser(data) {
        const r = await fetch(`${this.baseURL}/users`, { method: 'POST', body: JSON.stringify(data), headers: { 'Content-type': 'application/json' } });
        return r.json();
    },
    async updateUser(id, data) {
        const r = await fetch(`${this.baseURL}/users/${id}`, { method: 'PUT', body: JSON.stringify(data), headers: { 'Content-type': 'application/json' } });
        return r.json();
    },
    async deleteUser(id) {
        const r = await fetch(`${this.baseURL}/users/${id}`, { method: 'DELETE' });
        if(!r.ok) throw new Error("Xóa thất bại");
        return true;
    }
};

let localUsers = [];

const ui = {
    grid: document.getElementById('userGrid'),
    renderUsers(users) {
        this.grid.innerHTML = '';
        users.forEach(u => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <h3>${u.name}</h3>
                <p>📧 Email: ${u.email}</p>
                <div class="card-btns">
                    <button class="btn-edit" onclick="editUser(${u.id})">Sửa</button>
                    <button class="btn-del" onclick="deleteUser(${u.id})">Xóa</button>
                </div>
            `;
            this.grid.appendChild(card);
        });
    },
    showLoading() {
        this.grid.innerHTML = '<div class="card skeleton"></div>'.repeat(4);
    },
    showToast(msg, type='success') {
        const t = document.createElement('div');
        t.className = `toast ${type}`;
        t.textContent = msg;
        document.getElementById('toastContainer').appendChild(t);
        setTimeout(() => t.remove(), 3000);
    }
};

async function init() {
    ui.showLoading();
    try {
        localUsers = await api.getUsers();
        ui.renderUsers(localUsers);
    } catch (e) {
        ui.showToast(e.message, 'error');
    }
}

// Xử lý Sự kiện Tìm kiếm realtime trên client
document.getElementById('searchBar').addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase();
    const filtered = localUsers.filter(u => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q));
    ui.renderUsers(filtered);
});

// Create & Update Actions
document.getElementById('openFormBtn').addEventListener('click', () => {
    document.getElementById('formSection').classList.remove('hidden');
    document.getElementById('userId').value = '';
    document.getElementById('userName').value = '';
    document.getElementById('userEmail').value = '';
});

document.getElementById('saveBtn').addEventListener('click', async () => {
    const id = document.getElementById('userId').value;
    const name = document.getElementById('userName').value;
    const email = document.getElementById('userEmail').value;
    
    if(!name || !email) return ui.showToast("Vui lòng điền đủ thông tin", "error");

    try {
        if(id) { // Edit Mode
            await api.updateUser(id, { name, email });
            const idx = localUsers.findIndex(u => u.id == id);
            localUsers[idx] = { ...localUsers[idx], name, email };
            ui.showToast("Cập nhật thành viên thành công");
        } else { // Create Mode
            const newUser = await api.createUser({ name, email });
            newUser.id = Date.now(); // Tạo id giả ngẫu nhiên chống trùng lặp dữ liệu
            localUsers.unshift(newUser);
            ui.showToast("Thêm mới thành viên thành công");
        }
        ui.renderUsers(localUsers);
        document.getElementById('formSection').classList.add('hidden');
    } catch(err) {
        ui.showToast("Lỗi đồng bộ API", "error");
    }
});

window.editUser = (id) => {
    const u = localUsers.find(user => user.id == id);
    document.getElementById('formSection').classList.remove('hidden');
    document.getElementById('userId').value = u.id;
    document.getElementById('userName').value = u.name;
    document.getElementById('userEmail').value = u.email;
};

window.deleteUser = async (id) => {
    if(!confirm("Bạn có chắc chắn muốn xóa thành viên này khỏi hệ thống?")) return;
    try {
        await api.deleteUser(id);
        localUsers = localUsers.filter(u => u.id !== id);
        ui.renderUsers(localUsers);
        ui.showToast("Xóa thành viên thành công");
    } catch(e) {
        ui.showToast("Lỗi xóa dữ liệu", "error");
    }
};

document.getElementById('cancelBtn').addEventListener('click', () => document.getElementById('formSection').classList.add('hidden'));

init();