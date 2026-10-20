# ☕ Tiệm Cafe Bất Ổn - Website Quản Lý & Đặt Hàng Trực Tuyến

> **Bài Tập Lớn Học Phần: Thiết Kế Web**  
> **Trường Đại học Giao thông Vận tải (UTC) – Khoa Công nghệ Thông tin**  
> **Giảng viên hướng dẫn:** TS. Lại Mạnh Dũng  
> **Nhóm thực hiện:** Nhóm 6 – Lớp CNTTVA1 K66

---

## 🔗 Liên Kết Dự Án (Links)

- 🌐 **Trải nghiệm Website trực tiếp (GitHub Pages):** [https://mrsupertrung2007-cell.github.io/QuanLyCoffe-BTL/](https://mrsupertrung2007-cell.github.io/QuanLyCoffe-BTL/)
- 💻 **Kho chứa mã nguồn (GitHub Repository):** [https://github.com/mrsupertrung2007-cell/QuanLyCoffe-BTL](https://github.com/mrsupertrung2007-cell/QuanLyCoffe-BTL)

---

## 📖 Giới Thiệu Đề Tài

**Tiệm Cafe Bất Ổn** là ứng dụng web Front-end mô phỏng toàn diện hoạt động quảng bá thương hiệu, tra cứu thực đơn, đặt giao đồ uống trực tuyến, đặt bàn giữ chỗ trước và quản trị vận hành của một quán cà phê hiện đại. 

Hệ thống được xây dựng bằng bộ ba công nghệ chuẩn **HTML5, CSS3, JavaScript (ES6)** kết hợp cơ chế lưu trữ cục bộ **Web Storage (`localStorage` & `sessionStorage`)**, giúp đồng bộ hóa dữ liệu tức thì và xuyên suốt giữa 6 trang chức năng mà không cần máy chủ Backend phức tạp.

---

## 👥 Thành Viên Thực Hiện & Phân Công Nhiệm Vụ (Nhóm 6)

| STT | Họ và Tên | Mã Sinh Viên | Vai Trò | Phân Hệ Phụ Trách |
| :-: | :--- | :---: | :---: | :--- |
| 1 | **Trang Thành Trung** | `252611091` | **Trưởng nhóm** | **Thực đơn (`menu`) & Khung JS chung (`main.js`):** Lọc danh mục, tìm kiếm trực tiếp, thêm giỏ hàng, thông báo Toast, ghép code và triển khai GitHub Pages. |
| 2 | **Trần Nam Khánh** | `252601059` | Thành viên | **Trang chủ (`index`) & CSS chung (`style.css`):** Thiết kế bộ khung màu sắc `:root`, Header/Footer dùng chung, giao diện Trang chủ và Responsive. |
| 3 | **Nguyễn Đức Lương** | `252631063` | Thành viên | **Đặt bàn trực tuyến (`reservation`):** Tự động sinh khung giờ (`07:00 – 21:30`), kiểm tra ràng buộc dữ liệu, chống trùng lịch và hủy đặt bàn. |
| 4 | **Đỗ Công Thiện** | `252601089` | Thành viên | **Giỏ hàng & Thanh toán (`cart`):** Tăng/giảm số lượng, xóa món, tự động tính tổng tiền + phí giao hàng (`30.000đ`), kiểm tra form giao hàng và lưu đơn. |
| 5 | **Nguyễn Lương Thế Vinh** | `252631096` | Thành viên | **Đăng nhập & Quản trị (`login` + `admin`):** Đăng nhập/Đăng ký, phân quyền bảo mật (`guardAdmin`) và quản trị 4 tab (Nhân sự, Kho, Thực đơn & Giá, Doanh thu). |

---

## ✨ Các Chức Năng Nổi Bật

### 1. Phân hệ Khách hàng
* **🏠 Trang chủ (`index.html`):** Banner giới thiệu bộ sưu tập mùa thu, chương trình ưu đãi và trưng bày 3 thức uống đặc trưng với bố cục so le hiện đại.
* **📋 Thực đơn (`menu.html`):** 
  * Hiển thị lưới 20 món đồ uống & bánh ngọt chuẩn định dạng tiền tệ VNĐ.
  * Lọc nhanh theo 4 danh mục (*Tất cả, Cà Phê, Trà & Macchiato, Bánh Ngọt*) kết hợp tìm kiếm từ khóa theo thời gian thực (`Real-time Search`).
  * Thêm sản phẩm vào giỏ hàng, tự động cộng dồn số lượng món trùng, cập nhật số lượng trên thanh Header và bật thông báo trượt (**Toast Notification**).
* **📅 Đặt bàn (`reservation.html`):** Đặt bàn trước theo ngày, khung giờ, số lượng khách (1–20 người) và khu vực ngồi (*Trong nhà, Ngoài trời, Phòng riêng từ 6 người*); tự động tạo mã đặt bàn (`DB...`) và hỗ trợ hủy lịch.
* **🛒 Giỏ hàng & Thanh toán (`cart.html`):** Điều chỉnh số lượng (`+/-`), xóa từng món hoặc xóa toàn bộ giỏ; tự động tính Tạm tính + Phí giao hàng (`30.000đ`) và kiểm tra hợp lệ thông tin người nhận bằng Regex.
* **🔐 Tài khoản (`login.html`):** Chuyển đổi mượt mà giữa biểu mẫu Đăng nhập và Đăng ký; tự động phân quyền theo vai trò người dùng.

### 2. Phân hệ Chủ quán / Quản trị viên (`admin.html`)
* **Bảo mật phân quyền:** Tự động chặn người dùng không có quyền Admin truy cập trang quản trị (`guardAdmin`).
* **Quản lý Nhân sự & Kho hàng:** Xem danh sách, thêm mới và xóa nhân viên hoặc nguyên liệu tồn kho.
* **Quản lý Thực đơn & Giá bán:** Thêm món mới, xóa món hoặc chỉnh sửa giá bán trực tiếp trên bảng (đồng bộ tức thì ra trang Thực đơn của khách hàng).
* **Thống kê Doanh thu:** Tự động tổng hợp tổng số đơn hàng đã thanh toán và tổng doanh thu trong ngày.

---

## 🔑 Tài Khoản Dùng Thử (Demo Accounts)

Để kiểm thử nhanh chức năng phân quyền và bảng điều khiển **Quản trị (Admin)**, quý Thầy/Cô và các bạn có thể đăng nhập tại trang `login.html` với thông tin sau:

- **Tài khoản Quản trị (Admin):**
  - **Tên đăng nhập:** `chuquan`
  - **Mật khẩu:** `123`
- **Tài khoản Khách hàng:** Có thể tự đăng ký mới trực tiếp tại tab **Đăng ký** trên trang `login.html`.

---

## 📂 Cấu Trúc Thư Mục Mã Nguồn

```text
QuanLyCoffe-BTL/
├── index.html              # Trang chủ
├── menu.html               # Trang Thực đơn & Chọn món (Trưởng nhóm)
├── reservation.html        # Trang Đặt bàn trực tuyến
├── cart.html               # Trang Giỏ hàng & Thanh toán
├── login.html              # Trang Đăng nhập & Đăng ký
├── admin.html              # Trang Quản trị hệ thống (4 Tabs)
├── css/
│   ├── style.css           # CSS biến màu gốc (:root), Header, Footer & Trang chủ
│   ├── menu.css            # CSS trang Thực đơn & hiệu ứng Toast
│   ├── reservation.css     # CSS trang Đặt bàn
│   ├── cart.css            # CSS trang Giỏ hàng
│   ├── login.css           # CSS trang Đăng nhập / Đăng ký
│   └── admin.css           # CSS trang Quản trị
├── js/
│   ├── main.js             # JS dùng chung (Cập nhật badge giỏ hàng, phân quyền Menu)
│   ├── menu.js             # JS xử lý lọc, tìm kiếm, giỏ hàng & đồng bộ Menu
│   ├── reservation.js      # JS xử lý nghiệp vụ và kiểm tra hợp lệ Đặt bàn
│   ├── cart.js             # JS xử lý tính tiền và thanh toán Giỏ hàng
│   ├── login.js            # JS xử lý xác thực Đăng nhập / Đăng ký
│   └── admin.js            # JS xử lý quản trị Nhân viên, Kho, Menu, Doanh thu
└── images/                 # Thư mục chứa hình ảnh sản phẩm và banner
```

---

## 💾 Thiết Kế Lưu Trữ Web Storage

| Tên Khóa (Key) | Loại Bộ Nhớ | Mô Tả Dữ Liệu Lưu Trữ |
| :--- | :---: | :--- |
| `cafeMenu` | `localStorage` | Danh sách món ăn & đồ uống đồng bộ giữa Admin và Menu |
| `cafeCart` | `localStorage` | Danh sách sản phẩm khách hàng đã thêm vào giỏ |
| `cafeReservations` | `localStorage` | Danh sách lịch đặt bàn trực tuyến của khách |
| `cafe_users` | `localStorage` | Danh sách tài khoản khách hàng đã đăng ký |
| `cafeStaff` | `localStorage` | Danh sách nhân viên quán |
| `cafeInventory` | `localStorage` | Danh sách nguyên liệu tồn kho |
| `cafeOrders` | `localStorage` | Lịch sử đơn hàng đã thanh toán để tính doanh thu |
| `chillin_user` | `sessionStorage` | Thông tin phiên đăng nhập hiện tại của người dùng |

---

## 🚀 Hướng Dẫn Cài Đặt & Chạy Dự Án

1. **Cách 1 – Truy cập trực tiếp qua GitHub Pages:**  
   Mở trình duyệt và truy cập: [https://mrsupertrung2007-cell.github.io/QuanLyCoffe-BTL/](https://mrsupertrung2007-cell.github.io/QuanLyCoffe-BTL/)
2. **Cách 2 – Chạy cục bộ trên máy tính (Local):**
   ```bash
   git clone https://github.com/mrsupertrung2007-cell/QuanLyCoffe-BTL.git
   ```
   Sau khi tải về, mở tệp `index.html` bằng trình duyệt web bất kỳ (Chrome, Edge, Firefox) hoặc chạy qua tiện ích **Live Server** trên VS Code.