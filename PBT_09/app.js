let todos = JSON.parse(localStorage.getItem('todos')) || [];
let currentFilter = 'all';

const todoForm = document.querySelector('#todoForm');
const todoInput = document.querySelector('#todoInput');
const todoList = document.querySelector('#todoList');
const itemCount = document.querySelector('#itemCount');

// Lưu LocalStorage
function saveToStorage() { localStorage.setItem('todos', JSON.stringify(todos)); render(); }

// Render ứng dụng
function render() {
    todoList.innerHTML = '';
    let filteredTodos = todos.filter(t => {
        if (currentFilter === 'active') return !t.completed;
        if (currentFilter === 'completed') return t.completed;
        return true;
    });

    filteredTodos.forEach(t => {
        const li = document.createElement('li');
        li.className = `todo-item ${t.completed ? 'completed' : ''}`;
        li.dataset.id = t.id;

        const span = document.createElement('span');
        span.className = 'todo-text';
        span.textContent = t.text;

        const delBtn = document.createElement('button');
        delBtn.className = 'delete-btn';
        delBtn.textContent = '❌';

        li.appendChild(span);
        li.appendChild(delBtn);
        todoList.appendChild(li);
    });

    const activeCount = todos.filter(t => !t.completed).length;
    itemCount.textContent = `${activeCount} item${activeCount !== 1 ? 's' : ''} left`;
}

// Thêm mới Todo
todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const val = todoInput.value.trim();
    if (!val) return;
    todos.push({ id: Date.now(), text: val, completed: false });
    todoInput.value = '';
    saveToStorage();
});

// Event Delegation cho danh sách #todoList
todoList.addEventListener('click', (e) => {
    const li = e.target.closest('li');
    if (!li) return;
    const id = parseInt(li.dataset.id);

    if (e.target.classList.contains('delete-btn')) {
        todos = todos.filter(t => t.id !== id);
        saveToStorage();
    } else if (e.target.classList.contains('todo-text')) {
        const todo = todos.find(t => t.id === id);
        todo.completed = !todo.completed;
        saveToStorage();
    }
});

// Double click để sửa đổi (Edit Inline)
todoList.addEventListener('dblclick', (e) => {
    if (!e.target.classList.contains('todo-text')) return;
    const li = e.target.closest('li');
    const id = parseInt(li.dataset.id);
    const todo = todos.find(t => t.id === id);

    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'edit-input';
    input.value = todo.text;
    
    li.innerHTML = '';
    li.appendChild(input);
    input.focus();

    const saveEdit = () => {
        const txt = input.value.trim();
        if (txt) todo.text = txt;
        saveToStorage();
    };

    input.addEventListener('keydown', (ev) => { if (ev.key === 'Enter') saveEdit(); });
    input.addEventListener('blur', saveEdit);
});

// Gắn bộ lọc filter điều hướng
document.querySelector('.filters').addEventListener('click', (e) => {
    if (e.target.tagName !== 'BUTTON') return;
    document.querySelectorAll('.filters button').forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
    currentFilter = e.target.id.replace('filter', '').toLowerCase();
    render();
});

document.querySelector('#clearCompletedBtn').addEventListener('click', () => {
    todos = todos.filter(t => !t.completed);
    saveToStorage();
});

render();