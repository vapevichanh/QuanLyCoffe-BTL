// ================= 4. TRANG GIỎ HÀNG (cart.html) =================
const SHIPPING_FEE = 30000;

function renderCart() {
    const cartContainer = document.getElementById("cart-items-container");
    if (!cartContainer) return;

    let cart = JSON.parse(localStorage.getItem("cafeCart")) || [];
    cartContainer.innerHTML = "";
    const btnClear = document.getElementById("btn-clear-cart");

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Giỏ hàng của bạn đang trống.</p>";
        if(btnClear) btnClear.style.display = "none";
        updateOrderSummary(0);
        return;
    }

    if(btnClear) btnClear.style.display = "block";
    let subtotal = 0;

    cart.forEach((item, index) => {
        let itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        const itemHTML = `
            <div class="cart-item">
                <img src="${item.img || 'https://via.placeholder.com/80'}" alt="${item.name}">
                <div class="item-details">
                    <h4>${item.name}</h4>
                    <span class="item-price">${item.price.toLocaleString('vi-VN')} đ</span>
                    <div class="quantity-controls">
                        <button onclick="changeQuantity(${index}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="changeQuantity(${index}, 1)">+</button>
                    </div>
                </div>
                <button class="btn-remove" onclick="removeItem(${index})">Xóa</button>
            </div>
        `;
        cartContainer.innerHTML += itemHTML;
    });
    updateOrderSummary(subtotal);
}

function updateOrderSummary(subtotal) {
    const currentShipping = subtotal > 0 ? SHIPPING_FEE : 0;
    const finalTotal = subtotal + currentShipping;

    document.getElementById("subtotal-price").innerText = subtotal.toLocaleString('vi-VN') + " đ";
    document.getElementById("shipping-fee").innerText = currentShipping.toLocaleString('vi-VN') + " đ";
    document.getElementById("final-total").innerText = finalTotal.toLocaleString('vi-VN') + " đ";
}

function changeQuantity(index, delta) {
    let cart = JSON.parse(localStorage.getItem("cafeCart")) || [];
    if (cart[index]) {
        cart[index].quantity += delta;
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1); 
        }
        localStorage.setItem("cafeCart", JSON.stringify(cart));
        renderCart();
        if(typeof updateGlobalCartBadge === "function") updateGlobalCartBadge(); 
    }
}

function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem("cafeCart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cafeCart", JSON.stringify(cart));
    renderCart();
    if(typeof updateGlobalCartBadge === "function") updateGlobalCartBadge();
}

function clearCart() {
    if(confirm("Bạn có chắc muốn xóa toàn bộ giỏ hàng?")) {
        localStorage.removeItem("cafeCart");
        renderCart();
        if(typeof updateGlobalCartBadge === "function") updateGlobalCartBadge();
    }
}

function initCartForm() {
    const checkoutForm = document.getElementById("checkout-form");
    if (!checkoutForm) return;

    checkoutForm.addEventListener("submit", function(event) {
        event.preventDefault();

        let isValid = true;
        let cart = JSON.parse(localStorage.getItem("cafeCart")) || [];

        if (cart.length === 0) {
            alert("Giỏ hàng đang trống! Vui lòng chọn món trước khi thanh toán.");
            return;
        }

        const nameInput = document.getElementById("cus-name").value.trim();
        const phoneInput = document.getElementById("cus-phone").value.trim();
        const addressInput = document.getElementById("cus-address").value.trim();

        if (nameInput === "") {
            document.getElementById("err-name").innerText = "Vui lòng nhập họ và tên.";
            isValid = false;
        } else { document.getElementById("err-name").innerText = ""; }

        const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
        if (!phoneRegex.test(phoneInput)) {
            document.getElementById("err-phone").innerText = "Số điện thoại không hợp lệ (cần 10 số, bắt đầu bằng 0).";
            isValid = false;
        } else { document.getElementById("err-phone").innerText = ""; }

        if (addressInput === "") {
            document.getElementById("err-address").innerText = "Vui lòng nhập địa chỉ giao hàng.";
            isValid = false;
        } else { document.getElementById("err-address").innerText = ""; }

        if (isValid) {
            alert(`Đặt hàng thành công!\nCảm ơn ${nameInput} đã đặt hàng.\nĐơn hàng sẽ được giao đến: ${addressInput}`);
            
            let orders = JSON.parse(localStorage.getItem('cafeOrders')) || [];
            let totalOrder = parseInt(document.getElementById("final-total").innerText.replace(/\D/g, ''));
            orders.push({ date: new Date().toISOString(), total: totalOrder });
            localStorage.setItem('cafeOrders', JSON.stringify(orders));

            localStorage.removeItem("cafeCart");
            renderCart();
            if(typeof updateGlobalCartBadge === "function") updateGlobalCartBadge();
            checkoutForm.reset();
        }
    });
}