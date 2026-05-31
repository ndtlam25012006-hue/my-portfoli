const apis = [
    "https://jsonplaceholder.typicode.com/users/1",
    "https://dog.ceo/api/breeds/image/random",
    "https://restcountries.com/v3.1/name/vietnam"
];

async function loadDashboard() {
    const startTime = Date.now();
    document.getElementById('perfTime').textContent = "⏳ Đang đồng bộ tất cả cổng API dữ liệu...";
    
    // Đặt toàn bộ Widget vào trạng thái chờ tải ngắn hạn
    for (let i = 0; i < 3; i++) {
        document.querySelector(`#widget-${i} .content`).innerHTML = '<span class="loading-text">Đang tải widget...</span>';
    }

    // Thực thi nạp dữ liệu song song đa nhân
    const results = await Promise.allSettled(apis.map(url => fetch(url).then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
    })));

    results.forEach((result, index) => {
        const container = document.querySelector(`#widget-${index} .content`);
        if (result.status === "fulfilled") {
            renderWidget(index, result.value, container);
        } else {
            container.innerHTML = `<span class="error-msg">❌ Lỗi: ${result.reason.message}</span>`;
        }
    });

    document.getElementById('perfTime').textContent = `Data loaded in ${Date.now() - startTime} ms`;
}

function renderWidget(idx, data, container) {
    container.innerHTML = '';
    if (idx === 0) { // Định dạng render UI User dữ liệu
        container.innerHTML = `<h4>👤 ${data.name}</h4><p>🏢 Công ty: ${data.company.name}</p><p>🌐 Web: ${data.website}</p>`;
    } else if (idx === 1) { // Định dạng render ảnh Chó Cưng ngẫu nhiên
        container.innerHTML = `<img src="${data.message}" style="width:100%; height:130px; object-fit:cover; border-radius:4px;">`;
    } else if (idx === 2) { // Định dạng kết quả thông tin Quốc Gia Việt Nam
        const country = data[0];
        container.innerHTML = `<h4>🇻🇳 ${country.name.official}</h4><p>🏛️ Thủ đô: ${country.capital[0]}</p><p>👥 Dân số: ${country.population.toLocaleString()} người</p>`;
    }
}

document.getElementById('refreshBtn').addEventListener('click', loadDashboard);

// Tự động kích hoạt nạp kho ngay khi bật trang ứng dụng lên
loadDashboard();