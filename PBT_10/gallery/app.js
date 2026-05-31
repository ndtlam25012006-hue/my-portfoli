let page = 1;
const limit = 20;
const gallery = document.getElementById('gallery');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');

// Tạo IntersectionObserver để Lazy Loading từng bức ảnh một nhằm tối ưu hóa mạng
const lazyObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src; // Chuyển link thật từ dataset vào src
            observer.unobserve(img);
        }
    });
});

async function loadMorePhotos() {
    try {
        const response = await fetch(`https://picsum.photos/v2/list?page=${page}&limit=${limit}`);
        const photos = await response.json();
        
        if(photos.length === 0) {
            document.getElementById('load-trigger').textContent = "🎉 Đã tải hết bộ sưu tập!";
            return;
        }

        photos.forEach(p => {
            const img = document.createElement('img');
            img.className = 'img-item';
            img.dataset.src = p.download_url; // Lưu tạm đường dẫn ảnh thật
            img.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='; // Placeholder ảnh trống siêu nhẹ
            
            img.addEventListener('click', () => {
                lightboxImg.src = p.download_url;
                lightbox.classList.remove('hidden');
            });

            gallery.appendChild(img);
            lazyObserver.observe(img); // Bật theo dõi lười tải cho thẻ ảnh này
        });

        page++;
    } catch (error) {
        console.error("Lỗi nạp ảnh:", error);
    }
}

// Trình kích hoạt Infinite Scroll theo dõi phần tử đáy trang
const scrollTrigger = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        loadMorePhotos();
    }
}, { rootMargin: '200px' }); // Load sớm trước khi người dùng chạm đáy 200px

scrollTrigger.observe(document.querySelector("#load-trigger"));