const products = Array.from({ length: 120 }, (_, i) => ({
    id: i + 1,
    title: "Gạch lát nền 80x80 Ấn Độ",
    description: "Men bóng chống xước cao cấp",
    code: `Mã SP: AD-${8080 + i}`,
    currentPrice: "250.000 VNĐ/m²",
    oldPrice: "350.000 VNĐ/m²",
    memberPrice: "230.000 VNĐ/m²",
    image: "assets/images/product-main.png",
    hoverImage: "assets/images/product-hover.png",
    discount: "-20%"
}));

let currentPage = 1;
const itemsPerPage = 12;

function renderProducts() {
    const grid = document.getElementById('product-grid');
    if (!grid) return;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentProducts = products.slice(startIndex, endIndex);

    grid.innerHTML = currentProducts.map(product => {
        return `
        <div class="product-card">
            <div class="product-img-wrapper">
                <div class="badge-new">New Arrivals</div>
                <div class="badge-discount">${product.discount}</div>
                <img src="${product.image}" alt="${product.title}" class="product-img main-img">
                <img src="${product.hoverImage}" alt="${product.title}" class="product-img hover-img">
            </div>
            <div class="product-info">
                <div class="price-original">Giá gốc: ${product.oldPrice}</div>
                <div class="price-row">
                    <div class="price-current">${product.currentPrice}</div>
                    <div class="price-member">
                        <span class="member-label">Ưu đãi thành viên</span>
                        <span class="member-price">${product.memberPrice}</span>
                    </div>
                </div>
                <h3 class="product-title">${product.title}</h3>
                <div class="product-desc">${product.description}</div>
                <div class="product-code">
                    <span>${product.code}</span>
                    <i class="ph ph-copy" style="cursor: pointer;"></i>
                </div>
                <div class="product-colors">
                    <div class="color-swatch active"></div>
                    <div class="color-swatch"></div>
                    <div class="color-swatch"></div>
                    <div class="color-swatch"></div>
                </div>
                <div class="product-actions">
                    <button class="btn-detail">Xem Chi Tiết</button>
                    <button class="btn-cart" aria-label="Thêm vào giỏ hàng">
                        <img src="assets/images/icon-cart-add.png" alt="Add to cart">
                    </button>
                </div>
            </div>
        </div>
        `;
    }).join('');

    renderPagination();
}

function renderPagination() {
    const paginationContainer = document.querySelector('.pagination');
    if (!paginationContainer) return;

    const totalPages = Math.ceil(products.length / itemsPerPage);
    let html = '';

    for (let i = 1; i <= Math.min(5, totalPages); i++) {
        html += `<button class="page-btn ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
    }
    
    if (totalPages > 5) {
        html += `<span class="page-dots" style="margin: 0 4px;">...</span>`;
        html += `<button class="page-btn ${totalPages === currentPage ? 'active' : ''}" data-page="${totalPages}">${totalPages}</button>`;
    }

    paginationContainer.innerHTML = html;

    const pageBtns = paginationContainer.querySelectorAll('.page-btn');
    pageBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            currentPage = parseInt(btn.getAttribute('data-page'));
            renderProducts();
            window.scrollTo({ top: document.querySelector('.products-section').offsetTop - 100, behavior: 'smooth' });
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderProducts();

    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
});
