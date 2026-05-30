Clone về thì import SQL:
  Sau khi clone repo, cần có XAMPP MySQL đang chạy, rồi chạy:
  Nếu không có mật khẩu:
  C:\xampp\mysql\bin\mysql.exe -u root < D:\thue_phong_tro\server\database\phongtro.sql
  Nếu có mật khẩu:
  C:\xampp\mysql\bin\mysql.exe -u root -p < D:\thue_phong_tro\server\database\phongtro.sql

---

## Kịch Bản Kiểm Thử (Test Cases)

**Scenario 8. Verify quản lý thông tin cá nhân**

| ID | Test Case Description | Pre-condition | Test Case Procedure | Expected Output | Result | Test date | Tester | Note |
|---|---|---|---|---|---|---|---|---|
| TC-48 | Xem thông tin cá nhân hiện tại | Người dùng đã đăng nhập vào hệ thống | 1. Truy cập hệ thống<br>2. Chọn mục Sửa thông tin cá nhân | Màn hình hiển thị đúng thông tin hiện tại của người dùng (Avatar, Họ tên, SĐT, Email, Zalo...). Các trường mật khẩu để trống. | | | | |
| TC-49 | Bỏ trống trường bắt buộc | Người dùng đã đăng nhập vào hệ thống và ở trang Sửa thông tin cá nhân | 1. Xóa giá trị trong trường "Họ và tên" hoặc "Số điện thoại"<br>2. Nhấn "Lưu thay đổi" | Hệ thống chặn gọi API và hiển thị thông báo lỗi "Vui lòng nhập đầy đủ họ tên và số điện thoại." | | | | |
| TC-50 | Đổi mật khẩu nhưng xác nhận không khớp | Người dùng đã đăng nhập vào hệ thống và ở trang Sửa thông tin cá nhân | 1. Nhập mật khẩu mới<br>2. Nhập mật khẩu xác nhận không khớp với mật khẩu mới<br>3. Nhấn "Lưu thay đổi" | Hệ thống chặn gọi API và hiển thị thông báo lỗi "Mật khẩu xác nhận không khớp." | | | | |
| TC-51 | Cập nhật thông tin hợp lệ (chỉ text) | Người dùng đã đăng nhập vào hệ thống và ở trang Sửa thông tin cá nhân | 1. Chỉnh sửa dữ liệu hợp lệ (Họ tên, SĐT...)<br>2. Nhấn "Lưu thay đổi" | Hệ thống lưu thông tin thành công, giao diện tự cập nhật và hiển thị thông báo "Cập nhật thông tin cá nhân thành công." | | | | |
| TC-52 | Đổi ảnh đại diện (Avatar) thành công | Người dùng đã đăng nhập vào hệ thống và ở trang Sửa thông tin cá nhân | 1. Nhấn "Chọn ảnh avatar"<br>2. Chọn file ảnh hợp lệ<br>3. Nhấn "Lưu thay đổi" | Hệ thống tải ảnh mới lên máy chủ, lưu thành công và hiển thị thông báo "Cập nhật thông tin cá nhân thành công." | | | | |
| TC-53 | Đổi mật khẩu thành công | Người dùng đã đăng nhập vào hệ thống và ở trang Sửa thông tin cá nhân | 1. Nhập mật khẩu mới hợp lệ<br>2. Nhập xác nhận mật khẩu khớp hoàn toàn<br>3. Nhấn "Lưu thay đổi" | Hệ thống đổi mật khẩu thành công, thông báo "Cập nhật thông tin cá nhân thành công." và xóa trắng form mật khẩu. | | | | |

<br>

**Scenario 9. Verify quản lý người dùng (Quyền Admin)**

| ID | Test Case Description | Pre-condition | Test Case Procedure | Expected Output | Result | Test date | Tester | Note |
|---|---|---|---|---|---|---|---|---|
| TC-54 | Truy cập chức năng Quản lý người dùng | Người dùng có quyền Admin đã đăng nhập | Truy cập mục "Quản lý người dùng" từ thanh công cụ | Màn hình hiển thị danh sách tất cả người dùng trong hệ thống với các thông tin: Mã thành viên, Tên, SĐT, Vai trò và Thao tác. | | | | |
| TC-55 | Truy cập trang Quản lý người dùng không hợp lệ | Người dùng (Chủ trọ hoặc Khách) đã đăng nhập hệ thống | Dán trực tiếp đường dẫn của trang "Quản lý người dùng" vào trình duyệt | Hệ thống phát hiện không có quyền Admin, tự động điều hướng (redirect) về lại Trang chủ. | | | | |
| TC-56 | Sửa người dùng - Bỏ trống trường bắt buộc | Admin nhấn nút "Sửa" một người dùng bất kỳ | 1. Xóa giá trị trường "Họ và tên" hoặc "Số điện thoại"<br>2. Nhấn "Lưu thay đổi" | Hệ thống báo lỗi "Vui lòng nhập đầy đủ họ tên, số điện thoại và vai trò." và không thực hiện cập nhật. | | | | |
| TC-57 | Sửa người dùng - Thành công | Admin nhấn nút "Sửa" một người dùng bất kỳ | 1. Đổi tên, SĐT, hoặc Vai trò (Ví dụ: Người thuê -> Chủ trọ)<br>2. Nhấn "Lưu thay đổi" | Giao diện báo "Cập nhật người dùng thành công.", popup tự đóng, danh sách người dùng lập tức làm mới để phản ánh sự thay đổi. | | | | |
| TC-58 | Đặt lại mật khẩu cho người dùng | Admin nhấn nút "Sửa" một người dùng bất kỳ | 1. Nhập Mật khẩu mới (bỏ qua Xác nhận mật khẩu vì Admin có quyền ép đổi)<br>2. Nhấn "Lưu thay đổi" | Thông báo "Cập nhật người dùng thành công.", mật khẩu của người dùng được đổi ngay lập tức. | | | | |
| TC-59 | Hủy bỏ xóa người dùng | Admin nhấn nút "Xóa" trên một người dùng | 1. Nhấn nút "Xóa"<br>2. Hộp thoại xác nhận (Confirm Dialog) hiện ra, nhấn "Cancel" (Hủy) | Hộp thoại đóng lại, người dùng vẫn giữ nguyên không bị xóa khỏi hệ thống. | | | | |
| TC-60 | Xóa người dùng thành công | Admin nhấn nút "Xóa" trên một người dùng | 1. Nhấn nút "Xóa"<br>2. Nhấn "OK" trên hộp thoại xác nhận | Hệ thống gọi API xóa dữ liệu, thông báo "Đã xóa người dùng khỏi hệ thống." và tự động xóa người dùng đó khỏi danh sách. | | | | |