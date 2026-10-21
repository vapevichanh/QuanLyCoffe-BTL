// ================= 2. TRANG THỰC ĐƠN (menu.html) =================
const defaultProducts = [
    // --- DANH MỤC CÀ PHÊ TRUYỀN THỐNG ---
    { id: 1, name: "Cà phê Đen Đá", price: 25000, category: "coffee", img: "https://quangtanhoa.com/wp-content/uploads/2018/01/ca-phe-den-da.jpg" },
    { id: 2, name: "Bạc Xỉu Mây Lang Thang", price: 30000, category: "coffee", img: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" },
    { id: 3, name: "Cà phê Sữa Đá", price: 29000, category: "coffee", img: "https://giacaphe.com/wp-content/uploads/2023/03/ca-phe-sua-da-2.jpg" },
    { id: 19, name: "Cà phê Trứng Hà Nội", price: 40000, category: "coffee", img: "https://cooponline.vn/tin-tuc/wp-content/uploads/2025/10/cach-lam-ca-phe-trung-nong-dam-da-beo-min-chuan-huong-viet.png" },
    
    // --- DANH MỤC CÀ PHÊ PHA MÁY (PHONG CÁCH TÂY) ---
    { id: 4, name: "Caramel Macchiato", price: 45000, category: "coffee", img: "https://images.unsplash.com/photo-1485808191679-5f86510681a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" },
    { id: 5, name: "Espresso Đậm Vị", price: 35000, category: "coffee", img: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" },
    { id: 13, name: "Americano Đá", price: 35000, category: "coffee", img: "https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp):quality(75)/2024_3_28_638472299342509511_avatar.jpg" },
    { id: 14, name: "Cà phê Latte", price: 45000, category: "coffee", img: "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" },
    { id: 15, name: "Cappuccino Nghệ Thuật", price: 45000, category: "coffee", img: "https://images.unsplash.com/photo-1534778101976-62847782c213?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" },
    { id: 16, name: "Mocha Đá Xay", price: 55000, category: "coffee", img: "https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" },
    { id: 17, name: "Flat White", price: 40000, category: "coffee", img: "https://delonghi.vn/wp-content/uploads/2025/07/GettyImages-1155505160-scaled-e1612518804183.jpg" },
    { id: 18, name: "Cold Brew Ủ Lạnh", price: 50000, category: "coffee", img: "https://lifesimplified.gorenje.com/wp-content/uploads/2024/06/gorenje-blog-refreshing_cold_brew_coffee.jpg" },

    // --- DANH MỤC TRÀ ---
    { id: 6, name: "Trà Đào Cam Sả", price: 45000, category: "tea", img: "https://cooponline.vn/tin-tuc/wp-content/uploads/2025/10/tra-dao-cam-sa-cong-thuc-pha-che-chuan-vi.png" },
    { id: 7, name: "Trà Vải ", price: 48000, category: "tea", img: "https://file.hstatic.net/200000921537/file/tra_vai_4d41fd5133e54b7fb7e2120add34a584_1024x1024.png" },
    { id: 8, name: "Trà Oolong Sen Vàng", price: 50000, category: "tea", img: "https://lypham.vn/wp-content/uploads/2025/02/cach-lam-tra-sen-vang-macchiato.jpg" },
    { id: 9, name: "Matcha Đá Xay", price: 55000, category: "tea", img: "https://images.unsplash.com/photo-1536935338788-846bb9981813?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" },
    { id: 20, name: "Trà Đá Khổng Lồ", price: 10000, category: "tea", img: "https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2019/7/25/746291/Tra-Da-2.jpg" },

    // --- DANH MỤC BÁNH NGỌT ---
    { id: 10, name: "Bánh Croissant Bơ", price: 35000, category: "cake", img: "https://file.hstatic.net/200000079049/file/banh-sung-bo-croissants_5148f8e0ed564e5fbfb949a78ebf7963.jpg" },
    { id: 11, name: "Tiramisu Cổ Điển", price: 42000, category: "cake", img: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" },
    { id: 12, name: "Cheesecake Dâu Tây", price: 45000, category: "cake", img: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" }
];

function getProductsData() {
    let storedMenu = JSON.parse(localStorage.getItem('cafeMenu'));
    if (!storedMenu || storedMenu.length === 0) {
        localStorage.setItem('cafeMenu', JSON.stringify(defaultProducts));
        return defaultProducts;
    }
    return storedMenu;
}

let currentCategory = "all";
let searchQuery = "";
const formatMoney = (number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number);

function renderMenu() {
    const grid = document.getElementById("products-grid-dynamic");
    if (!grid) return;
    grid.innerHTML = "";
    
    const products = getProductsData();
    const filteredProducts = products.filter(item => {
        const matchCategory = currentCategory === "all" || item.category === currentCategory;
        const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase().trim());
        return matchCategory && matchSearch;
    });

    if (filteredProducts.length === 0) {
        grid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #888;">Không tìm thấy món ăn phù hợp!</p>`;
        return;
    }

    filteredProducts.forEach(product => {
        const imgSrc = product.img ? product.img : 'https://via.placeholder.com/300x220?text=Chua+Co+Anh';
        grid.innerHTML += `
            <div class="product-card">
                <div class="img-container">
                    <img src="${imgSrc}" alt="${product.name}" class="product-img">
                </div>
                <div class="card-body">
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-price">${formatMoney(product.price)}</p>
                    <button class="add-btn" onclick="addToCart(${product.id})">
                        <i class="fa-solid fa-cart-plus"></i> Thêm vào giỏ
                    </button>
                </div>
            </div>
        `;
    });
}

function filterCategory(category, btnElement) {
    currentCategory = category;
    document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
    btnElement.classList.add("active");
    renderMenu();
}

function handleSearch(value) {
    searchQuery = value;
    renderMenu();
}

function addToCart(productId) {
    const products = getProductsData();
    const product = products.find(p => p.id === productId);
    if (!product) return;

    let cart = JSON.parse(localStorage.getItem("cafeCart")) || [];
    const existItem = cart.find(item => item.id === productId);
    
    if (existItem) {
        existItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cafeCart", JSON.stringify(cart));
    updateGlobalCartBadge();
    showToast(`Đã thêm ${product.name} vào giỏ hàng!`);
}

function showToast(message) {
    let container = document.getElementById("toast-container");
    if (!container) {
        container = document.createElement("div");
        container.id = "toast-container";
        container.className = "toast-container";
        document.body.appendChild(container);
    }
    const toast = document.createElement("div");
    toast.className = "toast-msg";
    toast.innerHTML = `<i class="fa-solid fa-check-circle"></i> ${message}`;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}
