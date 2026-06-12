# Hệ Thống Quản Lý và Cho Thuê Phòng Trọ

Đây là dự án ứng dụng web hỗ trợ việc tìm kiếm, cho thuê và quản lý phòng trọ. Hệ thống cung cấp nền tảng kết nối giữa chủ trọ và người đi thuê, đồng thời hỗ trợ quản trị viên (Admin) quản lý toàn bộ hệ thống, người dùng và các bài đăng.

## 🚀 Công nghệ sử dụng

Dự án được xây dựng theo mô hình Full-stack (Client - Server) với các công nghệ hiện đại:

### Frontend (Client)
- **React.js (v18)**: Thư viện xây dựng giao diện người dùng.
- **Redux & Redux-Persist**: Quản lý state toàn cục và lưu trữ state cục bộ.
- **Tailwind CSS**: Framework CSS tiện ích giúp thiết kế giao diện nhanh chóng và reponsive.
- **React Router DOM**: Quản lý điều hướng (routing) trong ứng dụng Single Page Application.
- **Axios**: Gọi API giao tiếp với Backend.
- **SweetAlert2 & React-Toastify**: Hiển thị thông báo, popup tương tác người dùng.

### Backend (Server)
- **Node.js & Express.js**: Xây dựng máy chủ và các RESTful APIs.
- **Sequelize ORM**: Quản lý, truy vấn và thao tác với cơ sở dữ liệu MySQL một cách dễ dàng qua model.
- **JWT (JSON Web Token)**: Xác thực và phân quyền người dùng (Authentication & Authorization).
- **Bcryptjs**: Mã hóa mật khẩu người dùng trước khi lưu vào CSDL.
- **Cloudinary & Multer**: Xử lý việc upload và lưu trữ hình ảnh trực tuyến.
- **Nodemailer**: Hỗ trợ gửi email tự động (ví dụ: khôi phục mật khẩu, thông báo).

### Database
- **MySQL**: Hệ quản trị cơ sở dữ liệu quan hệ, phù hợp cho việc lưu trữ các thực thể như người dùng, bài đăng, danh mục,...

---

## 🎯 Các chức năng chính

1. **Dành cho Người thuê trọ:**
   - Tìm kiếm, lọc và xem chi tiết các bài đăng phòng trọ theo giá, khu vực, diện tích,...
   - Đăng ký, đăng nhập và quản lý thông tin cá nhân.
   - Lưu lại các bài viết quan tâm.

2. **Dành cho Chủ trọ:**
   - Đăng bài cho thuê phòng trọ mới (kèm hình ảnh upload lên Cloudinary).
   - Quản lý các bài đăng của bản thân (sửa, ẩn, xóa bài).
   - Cập nhật thông tin cá nhân và liên hệ.

3. **Dành cho Quản trị viên (Admin):**
   - **Quản lý người dùng:** Xem danh sách, phân quyền, cập nhật thông tin, thay đổi mật khẩu hoặc xóa người dùng khỏi hệ thống.
   - **Quản lý bài đăng:** Kiểm duyệt, xóa hoặc ẩn các bài đăng vi phạm quy định.

---

## ⚙️ Hướng dẫn Cài đặt (Setup)

### 1. Chuẩn bị môi trường
- Cài đặt **Node.js** (Khuyên dùng bản LTS).
- Cài đặt **XAMPP** hoặc một trình quản lý MySQL bất kỳ.
- Một tài khoản **Cloudinary** (để cấu hình lưu ảnh).

### 2. Thiết lập Cơ sở dữ liệu (Database)
1. Khởi động MySQL trên XAMPP (hoặc công cụ của bạn).
2. Tạo một database mới (ví dụ: `phongtro`).
3. Import dữ liệu ban đầu:
   - Nếu MySQL **không có** mật khẩu:
     ```bash
     C:\xampp\mysql\bin\mysql.exe -u root < đường_dẫn_tới_file\server\database\phongtro.sql
     ```
   - Nếu MySQL **có** mật khẩu:
     ```bash
     C:\xampp\mysql\bin\mysql.exe -u root -p < đường_dẫn_tới_file\server\database\phongtro.sql
     ```

### 3. Thiết lập Backend (Server)
1. Mở terminal, di chuyển vào thư mục `server`:
   ```bash
   cd server
   ```
2. Cài đặt các gói phụ thuộc:
   ```bash
   npm install
   ```
3. Tạo file `.env` trong thư mục `server` và cấu hình các biến môi trường:
   ```env
   PORT=5000
   CLIENT_URL=http://localhost:3000

   # Database Configuration (Sequelize)
   DB_HOST=localhost
   DB_USER=root
   DB_PASS=
   DB_NAME=phongtro
   DB_DIALECT=mysql

   # JWT Secret Key
   JWT_SECRET=your_secret_key_here

   # Cloudinary Configuration
   CLOUDINARY_NAME=your_cloudinary_name
   CLOUDINARY_KEY=your_cloudinary_api_key
   CLOUDINARY_SECRET=your_cloudinary_api_secret
   ```
4. Khởi chạy server:
   ```bash
   npm start
   ```

### 4. Thiết lập Frontend (Client)
1. Mở một terminal khác, di chuyển vào thư mục `client`:
   ```bash
   cd client
   ```
2. Cài đặt các gói phụ thuộc:
   ```bash
   npm install
   ```
3. Khởi chạy ứng dụng Frontend:
   ```bash
   npm start
   ```
4. Truy cập ứng dụng trên trình duyệt qua địa chỉ: `http://localhost:3000`

---
*Dự án Đồ án chuyên ngành - Nhóm 7.*