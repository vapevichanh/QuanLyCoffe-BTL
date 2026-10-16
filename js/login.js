// ================= 5. LOGIC TRANG ĐĂNG NHẬP (login.html) =================
function initLoginForms() {
    const btnToRegister = document.getElementById('switchToRegister');
    const btnToLogin = document.getElementById('switchToLogin');
    const formLogin = document.getElementById('form-login');
    const formRegister = document.getElementById('form-register');

    if(btnToRegister && btnToLogin) {
        btnToRegister.addEventListener('click', function(e) {
            e.preventDefault();
            formLogin.style.display = 'none';
            formRegister.style.display = 'block';
        });

        btnToLogin.addEventListener('click', function(e) {
            e.preventDefault();
            formRegister.style.display = 'none';
            formLogin.style.display = 'block';
        });
    }

    const registerForm = document.getElementById('registerForm');
    if(registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const fullName = document.getElementById('regFullName').value;
            const username = document.getElementById('regUsername').value;
            const password = document.getElementById('regPassword').value;

            let users = JSON.parse(localStorage.getItem('cafe_users')) || [];
            const isExist = users.some(u => u.username === username);
            
            if(isExist) {
                alert("Tên đăng nhập đã tồn tại. Vui lòng chọn tên khác!");
                return;
            }

            users.push({ fullName: fullName, username: username, password: password, role: 'customer' });
            localStorage.setItem('cafe_users', JSON.stringify(users));
            
            alert("Đăng ký thành công! Hãy đăng nhập nhé.");
            registerForm.reset();
            btnToLogin.click();
        });
    }

    const loginForm = document.getElementById('loginForm');
    if(loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('loginUsername').value;
            const password = document.getElementById('loginPassword').value;

            const adminAccounts = [{ username: 'chuquan', password: '123', role: 'admin', name: 'Chủ Quán' }];
            const customerAccounts = JSON.parse(localStorage.getItem('cafe_users')) || [];
            const allAccounts = [...adminAccounts, ...customerAccounts];

            const matchedUser = allAccounts.find(u => u.username === username && u.password === password);

            if (matchedUser) {
                sessionStorage.setItem('chillin_user', JSON.stringify({
                    username: matchedUser.username,
                    role: matchedUser.role,
                    name: matchedUser.fullName || matchedUser.name
                }));
                alert(`Đăng nhập thành công! Chào ${matchedUser.fullName || matchedUser.name}`);
                window.location.href = matchedUser.role === 'admin' ? "admin.html" : "index.html";
            } else {
                alert("Tên đăng nhập hoặc mật khẩu không chính xác!");
            }
        });
    }
}