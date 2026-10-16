// ================= 1. LOGIC HIỂN THỊ SỐ LƯỢNG GIỎ HÀNG CHUNG =================
function updateGlobalCartBadge() {
    let cart = JSON.parse(localStorage.getItem("cafeCart")) || [];
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    
    const badge = document.getElementById("cart-count") || document.getElementById("cart-badge");
    if (badge) {
        badge.innerText = totalItems;
    }
}

// ================= 7. KHỞI CHẠY KHI MỞ TRANG TỔNG HỢP =================
document.addEventListener("DOMContentLoaded", function () {
    // 1. Luôn cập nhật số lượng giỏ hàng trên thanh Menu
    updateGlobalCartBadge();

    // 2. Logic phân quyền thanh Menu (Hiện nút Quản trị, đổi chữ Đăng xuất)
    const currentUser = JSON.parse(sessionStorage.getItem('chillin_user'));
    const navLinks = document.querySelector('.nav-links'); // Sửa lại đúng tên class chuẩn
    
    if (navLinks) {
        if (currentUser && currentUser.role === 'admin') {
            const adminMenu = document.createElement('li');
            adminMenu.innerHTML = '<a href="admin.html">Quản trị</a>';
            navLinks.insertBefore(adminMenu, navLinks.lastElementChild);
        }
        if (currentUser) {
            const loginLink = navLinks.querySelector('a[href="login.html"]');
            if (loginLink) {
                loginLink.innerHTML = '<i class="fa-solid fa-sign-out-alt"></i> Đăng xuất';
                loginLink.href = '#';
                loginLink.addEventListener('click', function(e) {
                    e.preventDefault();
                    if(confirm("Bạn muốn đăng xuất?")) {
                        sessionStorage.removeItem('chillin_user');
                        window.location.href = "index.html";
                    }
                });
            }
        }
    }

    // 3. Kích hoạt logic Thực đơn
    if (document.getElementById("products-grid-dynamic") && typeof renderMenu === "function") {
        renderMenu();
    }

    // 4. Kích hoạt logic Đặt bàn
    var formRsv = document.getElementById("reservation-form");
    if (formRsv && typeof createTimeOptions === "function") {
        var dateInput = document.getElementById("rsv-date");
        if (dateInput) {
            dateInput.min = getToday();
            dateInput.value = getToday();
        }
        createTimeOptions();
        showReservationList();
        formRsv.addEventListener("submit", handleSubmit);
    }

    // 5. Kích hoạt logic Giỏ hàng
    if (document.getElementById("cart-items-container") && typeof renderCart === "function") {
        renderCart();
        initCartForm();
    }

    // 6. Kích hoạt logic Đăng nhập/Đăng ký
    if (document.getElementById("form-login") && typeof initLoginForms === "function") {
        initLoginForms();
    }

    // 7. Kích hoạt logic Trang Quản trị
    if (document.getElementById("tab-staff") && typeof initAdminTabs === "function") {
        if(guardAdmin()) { // Kiểm tra quyền admin trước khi render
            initAdminTabs();
            renderStaff();
            renderInventory();
            renderMenuAdmin();
            renderRevenue();
        }
    }
});