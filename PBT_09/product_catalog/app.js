// Khai báo mảng tối thiểu 12 phần tử thuộc 4 nhóm mặt hàng danh mục khác nhau
const products = [
    { id: 1, name: "iPhone 16 Pro", price: 28990000, category: "phone", image: "https://placehold.co/200", rating: 4.8, inStock: true },
    { id: 2, name: "Samsung S24 Ultra", price: 26500000, category: "phone", image: "https://placehold.co/200", rating: 4.7, inStock: true },
    { id: 3, name: "Xiaomi 14 Ultra", price: 21990000, category: "phone", image: "https://placehold.co/200", rating: 4.5, inStock: false },
    { id: 4, name: "MacBook Pro M3", price: 39990000, category: "laptop", image: "https://placehold.co/200", rating: 4.9, inStock: true },
    { id: 5, name: "Dell XPS 13", price: 32000000, category: "laptop", image: "https://placehold.co/200", rating: 4.4, inStock: true },
    { id: 6, name: "Asus ROG Strix", price: 28500000, category: "laptop", image: "https://placehold.co/200", rating: 4.6, inStock: true },
    { id: 7, name: "iPad Pro M4", price: 25490000, category: "tablet", image: "https://placehold.co/200", rating: 4.8, inStock: true },
    { id: 8, name: "Galaxy Tab S9", price: 16990000, category: "tablet", image: "https://placehold.co/200", rating: 4.3, inStock: true },
    { id: 9, name: "Lenovo Tab P12", price: 8900000, category: "tablet", image: "https://placehold.co/200", rating: 4.1, inStock: false },
    { id: 10, name: "Apple Watch Ultra 2", price: 21000000, category: "watch", image: "https://placehold.co/200", rating: 4.7, inStock: true },
    { id: 11, name: "Garmin Fenix 7X", price: 18500000, category: "watch", image: "https://placehold.co/200", rating: 4.6, inStock: true },
    { id: 12, name: "Galaxy Watch 6", price: 6500000, category: "watch", image: "https://placehold.co/200", rating: 4.2, inStock: true }
];

let cartCount = 0;
let selectedCat = 'all';
let searchQuery = '';
let currentSort = 'none';

const grid = document.getElementById('productGrid');
const cartBadge = document.getElementById('cartBadge');
const modal = document.getElementById('detailModal');

// Hàm vẽ giao diện động bằng createElement
function renderProducts() {
    grid.innerHTML = '';
    
    let processed = [...products];
    if (selectedCat !== 'all') processed = processed.filter(p => p.category === selectedCat);
    if (searchQuery) processed = processed.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));

    if (currentSort === 'priceAsc') processed.sort((a,b) => a.price - b.price);
    else if (currentSort === 'priceDesc') processed.sort((a,b) => b.price - a.price);
    else if (currentSort === 'nameAZ') processed.sort((a,b) => a.name.localeCompare(b.name));
    else if (currentSort === 'rateDesc') processed.sort((a,b) => b.rating - a.rating);

    processed.forEach(p => {
        const card = document.createElement('div');
        card.className = 'card';
        
        const img = document.createElement('img');
        img.src = p.image;
        img.addEventListener('click', () => showModal(p));

        const title = document.createElement('h3');
        title.textContent = p.name;

        const price = document.createElement('p');
        price.className = 'price';
        price.textContent = p.price.toLocaleString('vi-VN') + ' đ';

        const rate = document.createElement('p');
        rate.textContent = `⭐ ${p.rating}/5`;

        const btn = document.createElement('button');
        btn.textContent = p.inStock ? 'Thêm vào giỏ' : 'Hết hàng';
        btn.disabled = !p.inStock;
        if(p.inStock) {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                cartCount++;
                cartBadge.textContent = cartCount;
            });
        } else {
            btn.style.background = '#888';
        }

        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(price);
        card.appendChild(rate);
        card.appendChild(btn);
        grid.appendChild(card);
    });
}

// Xử lý Sự kiện Tìm kiếm & Lọc & Sắp xếp
document.getElementById('searchBar').addEventListener('input', (e) => { searchQuery = e.target.value; renderProducts(); });
document.getElementById('sortDropdown').addEventListener('change', (e) => { currentSort = e.target.value; renderProducts(); });
document.getElementById('categoryGroup').addEventListener('click', (e) => {
    if(e.target.tagName !== 'BUTTON') return;
    document.querySelectorAll('.category-group button').forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
    selectedCat = e.target.dataset.cat;
    renderProducts();
});

// Chế độ Darkmode toàn trang
document.getElementById('darkModeToggle').addEventListener('click', () => { document.body.classList.toggle('dark-mode'); });

// Hiển thị Popup Modal chi tiết sản phẩm tự tạo bằng JS
function showModal(p) {
    modal.innerHTML = `
        <div class="modal-box">
            <span class="close-modal">&times;</span>
            <img src="${p.image}" style="height:200px; object-fit:contain;">
            <h2 style="margin:15px 0;">${p.name}</h2>
            <p class="price" style="font-size:20px; color:red; font-weight:bold; margin-bottom:10px;">${p.price.toLocaleString('vi-VN')} đ</p>
            <p style="margin-bottom:8px;">Danh mục: ${p.category.toUpperCase()}</p>
            <p style="margin-bottom:8px;">Đánh giá chất lượng: ⭐ ${p.rating}/5</p>
            <p style="color: ${p.inStock?'green':'red'}">${p.inStock?'Tình trạng: Còn hàng trong kho':'Tình trạng: Hết hàng'}</p>
        </div>
    `;
    modal.classList.remove('hidden');
    modal.querySelector('.close-modal').addEventListener('click', () => modal.classList.add('hidden'));
}

renderProducts();