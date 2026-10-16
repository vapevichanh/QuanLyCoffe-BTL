// ================= 6. LOGIC TRANG QUẢN TRỊ (admin.html) =================
function guardAdmin() {
    const user = JSON.parse(sessionStorage.getItem('chillin_user'));
    if (!user || user.role !== 'admin') {
        alert('Bạn không có quyền truy cập trang quản trị!');
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

function load(key) { return JSON.parse(localStorage.getItem(key)) || []; }
function saveData(key, data) { localStorage.setItem(key, JSON.stringify(data)); }
function fmt(n) { return Number(n).toLocaleString('vi-VN') + ' đ'; }

function initAdminTabs() {
    document.querySelectorAll('.admin-tab').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.admin-tab').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.admin-panel').forEach(p => p.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById('tab-' + btn.dataset.tab).classList.add('active');
        });
    });
}

function renderStaff() {
    const list = load('cafeStaff');
    const tbody = document.getElementById('staff-body');
    if(tbody) tbody.innerHTML = list.map((s, i) =>
        `<tr><td>${s.name}</td><td>${s.role}</td><td>${s.phone}</td>
         <td><button class="admin-btn del" onclick="removeItem('cafeStaff', ${i}, renderStaff)">Xóa</button></td></tr>`
    ).join('');
}
function addStaff() {
    const name = document.getElementById('staff-name').value.trim();
    const role = document.getElementById('staff-role').value.trim();
    const phone = document.getElementById('staff-phone').value.trim();
    if (!name) return alert('Nhập họ tên nhân viên!');
    const list = load('cafeStaff');
    list.push({ name, role, phone });
    saveData('cafeStaff', list);
    renderStaff();
}

function renderInventory() {
    const list = load('cafeInventory');
    const tbody = document.getElementById('inv-body');
    if(tbody) tbody.innerHTML = list.map((s, i) =>
        `<tr><td>${s.name}</td><td>${s.qty}</td><td>${s.unit}</td>
         <td><button class="admin-btn del" onclick="removeItem('cafeInventory', ${i}, renderInventory)">Xóa</button></td></tr>`
    ).join('');
}
function addInventory() {
    const name = document.getElementById('inv-name').value.trim();
    const qty = document.getElementById('inv-qty').value;
    const unit = document.getElementById('inv-unit').value.trim();
    if (!name || qty === '') return alert('Nhập tên và số lượng!');
    const list = load('cafeInventory');
    list.push({ name, qty: Number(qty), unit });
    saveData('cafeInventory', list);
    renderInventory();
}

function renderMenuAdmin() {
    let list = load('cafeMenu');
    // Nếu chưa có, lấy từ default (yêu cầu file menu.js hoặc getProductsData phải chạy trước nếu chung tab, tuy nhiên Quản trị quản lý độc lập)
    if (list.length === 0 && typeof getProductsData === 'function') list = getProductsData();
    
    const tbody = document.getElementById('menu-body');
    if(tbody) tbody.innerHTML = list.map((m, i) =>
        `<tr><td>${m.name}</td>
         <td><input type="number" value="${m.price}" style="width:110px" onchange="updatePrice(${i}, this.value)"></td>
         <td>${m.category}</td>
         <td><button class="admin-btn del" onclick="removeItem('cafeMenu', ${i}, renderMenuAdmin)">Xóa</button></td></tr>`
    ).join('');
}
function addMenuItem() {
    const name = document.getElementById('menu-name').value.trim();
    const price = document.getElementById('menu-price').value;
    const category = document.getElementById('menu-cat').value;
    if (!name || price === '') return alert('Nhập tên món và giá!');
    let list = load('cafeMenu');
    if (list.length === 0 && typeof getProductsData === 'function') list = getProductsData();
    list.push({ id: Date.now(), name, price: Number(price), category });
    saveData('cafeMenu', list);
    renderMenuAdmin();
}
function updatePrice(i, value) {
    let list = load('cafeMenu');
    if (list.length === 0 && typeof getProductsData === 'function') list = getProductsData();
    list[i].price = Number(value);
    saveData('cafeMenu', list);
}

function renderRevenue() {
    const today = new Date().toDateString();
    const orders = load('cafeOrders').filter(o => new Date(o.date).toDateString() === today);
    const total = orders.reduce((sum, o) => sum + o.total, 0);
    const elCount = document.getElementById('rev-count');
    const elTotal = document.getElementById('rev-total');
    if(elCount) elCount.innerText = orders.length;
    if(elTotal) elTotal.innerText = fmt(total);
}

function removeItem(key, index, rerender) {
    if (!confirm('Xóa mục này?')) return;
    const list = load(key);
    list.splice(index, 1);
    saveData(key, list);
    rerender();
}