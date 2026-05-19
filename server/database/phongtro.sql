-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th5 14, 2026 lúc 05:34 AM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `phongtro`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `attributes`
--

CREATE TABLE `attributes` (
  `id` varchar(255) NOT NULL,
  `price` varchar(255) DEFAULT NULL,
  `acreage` varchar(255) DEFAULT NULL,
  `published` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `attributes`
--

INSERT INTO `attributes` (`id`, `price`, `acreage`, `published`, `createdAt`, `updatedAt`) VALUES
('057bf0ec-dd5e-44c5-bc19-a6880809c444', '15500000', '102,8', '14/5/2026', '2026-05-14 03:27:15', '2026-05-14 03:27:15'),
('083b18a9-4880-43ac-9031-b4dab1aeadb9', '3000000', '25', '14/5/2026', '2026-05-14 03:29:21', '2026-05-14 03:29:21'),
('22736623-3bec-4c3a-902e-23e2637ea36d', '11500000', '79', '14/5/2026', '2026-05-14 03:07:47', '2026-05-14 03:07:47'),
('2fae28f1-00af-4123-8849-47959b0f3795', '3400000', '25', '14/5/2026', '2026-05-14 03:28:22', '2026-05-14 03:28:22'),
('3f4b5620-c911-4fee-8fd2-aba2f43345d9', '7000000', '30', '14/5/2026', '2026-05-14 03:03:08', '2026-05-14 03:03:08'),
('432279ed-1042-4246-986b-ec3368d2721b', '7000000', '23', '14/5/2026', '2026-05-14 03:30:21', '2026-05-14 03:30:21'),
('4c5caaaa-7047-400f-b19f-c16c171cac1d', '4000000', '40', '14/5/2026', '2026-04-17 09:54:54', '2026-05-14 03:00:28'),
('4defe026-8fa6-4cf9-abc9-7a8f149923c8', '2900000', '20', '14/5/2026', '2026-05-14 03:10:11', '2026-05-14 03:10:11'),
('7f38b21e-5594-4000-bedd-8b215cf34884', '2000000', '30', '14/5/2026', '2026-04-15 17:16:37', '2026-05-14 03:00:56'),
('85686109-d207-4908-9f85-babc4b3695a5', '4500000', '32', '14/5/2026', '2026-05-14 03:04:45', '2026-05-14 03:04:45'),
('c27d2875-bb40-4363-a746-018d4ebb5175', '500000', '25', '14/5/2026', '2026-04-17 10:00:30', '2026-05-14 03:00:06'),
('eac1cf2d-e861-4a46-934f-c474df93959e', '9000000', '35', '14/5/2026', '2026-05-14 03:11:22', '2026-05-14 03:11:22');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `categorys`
--

CREATE TABLE `categorys` (
  `id` varchar(255) NOT NULL,
  `code` varchar(255) DEFAULT NULL,
  `value` varchar(255) DEFAULT '0',
  `header` varchar(255) DEFAULT NULL,
  `subheader` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `categorys`
--

INSERT INTO `categorys` (`id`, `code`, `value`, `header`, `subheader`, `createdAt`, `updatedAt`) VALUES
('379bf4a5-24d9-4b25-b18e-9c90bb58c991', 'nha-nguyen-can', 'Nhà nguyên căn', 'Cho thuê nhà nguyên căn', 'Tổng hợp tin đăng cho thuê nhà nguyên căn mới nhất.', '2026-04-17 10:30:24', '2026-04-17 10:30:24'),
('3f65d226-4ec0-46c7-85bd-28543fb4028c', 'can-ho-mini', 'Căn hộ mini', 'Cho thuê căn hộ mini', 'Tổng hợp tin đăng cho thuê căn hộ mini mới nhất.', '2026-04-17 10:31:24', '2026-04-17 10:31:24'),
('71349694-82f8-461b-8fe7-b1d49cd8c4b7', 'can-ho-chung-cu', 'Căn hộ chung cư', 'Cho thuê căn hộ chung cư', 'Tổng hợp tin đăng cho thuê căn hộ chung cư mới nhất.', '2026-04-17 10:31:24', '2026-04-17 10:31:24'),
('e43360a0-d973-4561-93f0-ac198dfabab6', 'can-ho-dich-vu', 'Căn hộ dịch vụ', 'Cho thuê căn hộ dịch vụ', 'Tổng hợp tin đăng cho thuê căn hộ dịch vụ mới nhất.', '2026-04-17 10:31:24', '2026-04-17 10:31:24');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `images`
--

CREATE TABLE `images` (
  `id` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `images`
--

INSERT INTO `images` (`id`, `image`, `createdAt`, `updatedAt`) VALUES
('23bafc50-ca9d-4390-8f02-1dbfc8a38d33', 'https://res.cloudinary.com/ddvcelzwn/image/upload/v1778727890/thue-phong-tro/qkedfy6nnbuwnwmoynsg.jpg,https://res.cloudinary.com/ddvcelzwn/image/upload/v1778727890/thue-phong-tro/hhy6nyzpoioquq7qvyt5.jpg,https://res.cloudinary.com/ddvcelzwn/image/upload/v', '2026-05-14 03:04:48', '2026-05-14 03:04:48'),
('3f3c81a8-100f-43b8-94ba-bdfd4134d8a1', 'https://res.cloudinary.com/ddvcelzwn/image/upload/v1778727793/thue-phong-tro/jmjmvl5kuvn6wkrompao.jpg,https://res.cloudinary.com/ddvcelzwn/image/upload/v1778727793/thue-phong-tro/piiavxsce7ibzyrlxvky.jpg,https://res.cloudinary.com/ddvcelzwn/image/upload/v', '2026-05-14 03:03:11', '2026-05-14 03:03:11'),
('498e0c46-0ae8-4a72-9381-09e4f543fc81', 'https://res.cloudinary.com/ddvcelzwn/image/upload/v1778729307/thue-phong-tro/zpfd1tatgxczmqgmo1v4.jpg,https://res.cloudinary.com/ddvcelzwn/image/upload/v1778729307/thue-phong-tro/fxhy8ahvkq3foxgj8yco.jpg,https://res.cloudinary.com/ddvcelzwn/image/upload/v', '2026-05-14 03:28:25', '2026-05-14 03:28:25'),
('72964370-f449-479e-bca0-0dfcd54c839d', 'https://res.cloudinary.com/ddvcelzwn/image/upload/v1778728287/thue-phong-tro/sknet0nscy85qhv1yp4r.jpg,https://res.cloudinary.com/ddvcelzwn/image/upload/v1778728287/thue-phong-tro/awxojrgwvi3sj4j6edmr.jpg,https://res.cloudinary.com/ddvcelzwn/image/upload/v', '2026-05-14 03:11:24', '2026-05-14 03:11:24'),
('7440082b-f5c6-4b17-8be3-5855f671785e', 'https://res.cloudinary.com/ddvcelzwn/image/upload/v1778727633/thue-phong-tro/xakozrdfessibnvof2sf.jpg,https://res.cloudinary.com/ddvcelzwn/image/upload/v1778727633/thue-phong-tro/ktlccofefrksdctavkyj.jpg', '2026-04-17 09:54:56', '2026-05-14 03:00:30'),
('8723735f-d3bc-4a42-8555-4a380454efc5', 'https://res.cloudinary.com/ddvcelzwn/image/upload/v1778727661/thue-phong-tro/ddqjmiwmyshnjbsfu1ij.jpg,https://res.cloudinary.com/ddvcelzwn/image/upload/v1778727661/thue-phong-tro/bf2oazzq1gdndclyi1zq.jpg,https://res.cloudinary.com/ddvcelzwn/image/upload/v', '2026-04-15 17:16:40', '2026-05-14 03:00:58'),
('8e0f5262-75d6-457c-950b-8ca4039f3e1e', 'https://res.cloudinary.com/ddvcelzwn/image/upload/v1778729426/thue-phong-tro/cutmddgnfzzqixgsbs9r.jpg,https://res.cloudinary.com/ddvcelzwn/image/upload/v1778729426/thue-phong-tro/vmdc0xq8r5oiuupidjro.jpg,https://res.cloudinary.com/ddvcelzwn/image/upload/v', '2026-05-14 03:30:24', '2026-05-14 03:30:24'),
('99a1186a-c0d9-4ca6-ac9d-0868b51c2deb', 'https://res.cloudinary.com/ddvcelzwn/image/upload/v1778729365/thue-phong-tro/wszt6ofsnrv224hhorgj.jpg,https://res.cloudinary.com/ddvcelzwn/image/upload/v1778729366/thue-phong-tro/h56nojeud6cq0edozxsb.jpg,https://res.cloudinary.com/ddvcelzwn/image/upload/v', '2026-05-14 03:29:23', '2026-05-14 03:29:23'),
('a84a35bc-79ad-4d25-9e3f-4a904783b844', 'https://res.cloudinary.com/ddvcelzwn/image/upload/v1778727612/thue-phong-tro/zslokpekkiro9yyrp6kj.jpg,https://res.cloudinary.com/ddvcelzwn/image/upload/v1778727611/thue-phong-tro/ohdczhfuvmolt1hydv4z.jpg', '2026-05-14 03:00:09', '2026-05-14 03:00:09'),
('c3ccf4ad-c928-4ba6-976b-c8fc368236a8', 'https://res.cloudinary.com/ddvcelzwn/image/upload/v1778728073/thue-phong-tro/sgkcnl0klmbmaaq3px3m.jpg,https://res.cloudinary.com/ddvcelzwn/image/upload/v1778728072/thue-phong-tro/jeytgc2lvjljqclafyz3.jpg,https://res.cloudinary.com/ddvcelzwn/image/upload/v', '2026-05-14 03:07:50', '2026-05-14 03:07:50'),
('db06df89-a725-4eb3-a494-9dc9b7ff4c89', 'https://res.cloudinary.com/ddvcelzwn/image/upload/v1778729240/thue-phong-tro/qlgwnqgil9i4vmwpmpui.jpg,https://res.cloudinary.com/ddvcelzwn/image/upload/v1778729240/thue-phong-tro/hobiigoczbqo62ztyici.jpg,https://res.cloudinary.com/ddvcelzwn/image/upload/v', '2026-05-14 03:27:18', '2026-05-14 03:27:18'),
('dcee04ce-962f-47cc-8d04-5f53f971ffa0', 'https://res.cloudinary.com/ddvcelzwn/image/upload/v1778728216/thue-phong-tro/dol8gwykfcpciyx89rgu.jpg,https://res.cloudinary.com/ddvcelzwn/image/upload/v1778728216/thue-phong-tro/xvikcre5eytiqw9fv7zv.jpg,https://res.cloudinary.com/ddvcelzwn/image/upload/v', '2026-05-14 03:10:13', '2026-05-14 03:10:13');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `overviews`
--

CREATE TABLE `overviews` (
  `id` varchar(255) NOT NULL,
  `code` varchar(255) DEFAULT NULL,
  `target` varchar(255) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `expire` datetime DEFAULT NULL,
  `bonus` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `overviews`
--

INSERT INTO `overviews` (`id`, `code`, `target`, `created`, `expire`, `bonus`, `createdAt`, `updatedAt`) VALUES
('11668803-9259-4119-ae9f-d4fd254d95cc', 'OV77811', 'Tất cả', '2026-05-14 03:11:22', '2026-06-13 03:11:22', 'Tin thường', '2026-05-14 03:11:22', '2026-05-14 03:11:22'),
('193f7cbe-17a4-497f-ab1d-fc95183bc173', 'OV94178', 'Tất cả', '2026-05-14 03:30:21', '2026-06-13 03:30:21', 'Tin thường', '2026-05-14 03:30:21', '2026-05-14 03:30:21'),
('1e6dfd09-11f1-404d-9bfd-ef3a685f242e', 'OV71913', 'Tất cả', '2026-04-15 17:16:37', '2026-05-15 17:16:37', 'Tin thường', '2026-04-15 17:16:37', '2026-05-14 03:00:56'),
('3022db6d-ec26-429d-b90f-193831f76113', 'OV83150', 'Tất cả', '2026-05-14 03:29:21', '2026-06-13 03:29:21', 'Tin thường', '2026-05-14 03:29:21', '2026-05-14 03:29:21'),
('425d7461-54a4-4e7d-91a2-55f2a8728dab', 'OV70606', 'Tất cả', '2026-05-14 03:27:15', '2026-06-13 03:27:15', 'Tin thường', '2026-05-14 03:27:15', '2026-05-14 03:27:15'),
('4ae6ed08-054f-425e-9f9f-63b17614b03a', 'OV77413', 'Tất cả', '2026-05-14 03:07:47', '2026-06-13 03:07:47', 'Tin thường', '2026-05-14 03:07:47', '2026-05-14 03:07:47'),
('4fcef3c8-2523-4b67-9264-357f8fe794d6', 'OV24369', 'Tất cả', '2026-04-17 09:54:54', '2026-05-17 09:54:54', 'Tin thường', '2026-04-17 09:54:54', '2026-05-14 03:00:28'),
('663218e2-d98f-4c46-8c2b-b2d4ee1fd078', 'OV138', 'Tất cả', '2026-05-14 03:10:11', '2026-06-13 03:10:11', 'Tin thường', '2026-05-14 03:10:11', '2026-05-14 03:10:11'),
('89caf3f7-875e-4ac6-8c97-0408e5b14ae7', 'OV71605', 'Tất cả', '2026-04-17 10:00:30', '2026-05-17 10:00:30', 'Tin thường', '2026-04-17 10:00:30', '2026-05-14 03:00:06'),
('b270d6de-8fad-433a-91a1-f2bd5b76336c', 'OV77832', 'Tất cả', '2026-05-14 03:04:45', '2026-06-13 03:04:45', 'Tin thường', '2026-05-14 03:04:45', '2026-05-14 03:04:45'),
('bcd0104e-ca22-4779-afb0-705678dc02d8', 'OV40980', 'Tất cả', '2026-05-14 03:28:22', '2026-06-13 03:28:22', 'Tin thường', '2026-05-14 03:28:22', '2026-05-14 03:28:22'),
('f76abc5c-1e6f-4494-91d2-f1841f3c1415', 'OV84630', 'Tất cả', '2026-05-14 03:03:08', '2026-06-13 03:03:08', 'Tin thường', '2026-05-14 03:03:08', '2026-05-14 03:03:08');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `password_reset_otps`
--

CREATE TABLE `password_reset_otps` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `otp` varchar(10) DEFAULT NULL,
  `expires_at` bigint(20) DEFAULT NULL,
  `is_verified` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `posts`
--

CREATE TABLE `posts` (
  `id` varchar(255) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `attributeId` varchar(255) DEFAULT NULL,
  `categoryCode` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `userId` varchar(255) DEFAULT NULL,
  `overviewId` text DEFAULT NULL,
  `imagesId` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `posts`
--

INSERT INTO `posts` (`id`, `title`, `address`, `attributeId`, `categoryCode`, `description`, `userId`, `overviewId`, `imagesId`, `createdAt`, `updatedAt`) VALUES
('04aab8c1-f2fb-4a2f-80de-31c3700e37a5', 'Cho thuê nhà nguyên căn 2 tầng tại khu dân cư yên tĩnh', '61 Khương Trung, Hà Nội', '057bf0ec-dd5e-44c5-bc19-a6880809c444', '379bf4a5-24d9-4b25-b18e-9c90bb58c991', 'Nhà gồm 2 phòng ngủ, 1 phòng khách, bếp và sân phơi. Hẻm rộng, xe hơi vào được. Gần trường học và khu mua sắm, thích hợp gia đình nhỏ.', 'b7adcf2a-9219-4b11-9d69-79c2fa750b70', '425d7461-54a4-4e7d-91a2-55f2a8728dab', 'db06df89-a725-4eb3-a494-9dc9b7ff4c89', '2026-05-14 03:27:18', '2026-05-14 03:27:18'),
('2bcd6813-6435-4805-9f6e-0fded2dab315', 'Phòng trọ Đông Ngạc', '141 Lê Văn Hiến, phường Đông Ngạc, Hà Nội', '7f38b21e-5594-4000-bedd-8b215cf34884', 'e43360a0-d973-4561-93f0-ac198dfabab6', 'Cho thuê nhà trọ tại Lê Văn Hiến, Đông Ngạc', 'fca880a4-2cd7-49fc-938b-7c4e95d9a700', '1e6dfd09-11f1-404d-9bfd-ef3a685f242e', '8723735f-d3bc-4a42-8555-4a380454efc5', '2026-04-15 17:16:40', '2026-05-14 03:00:56'),
('346aaa90-705e-4111-8c8e-2a75de17c1bb', 'Cho thuê phòng cao cấp full nội thất, giờ giấc tự do', '33 thanh xuân, Hà Nội', '2fae28f1-00af-4123-8849-47959b0f3795', 'e43360a0-d973-4561-93f0-ac198dfabab6', 'Phòng mới xây, trang bị đầy đủ nội thất cao cấp. Có máy lạnh, nước nóng, wifi mạnh và dịch vụ vệ sinh định kỳ. Khu vực an ninh, camera 24/24.', 'b7adcf2a-9219-4b11-9d69-79c2fa750b70', 'bcd0104e-ca22-4779-afb0-705678dc02d8', '498e0c46-0ae8-4a72-9381-09e4f543fc81', '2026-05-14 03:28:25', '2026-05-14 03:28:25'),
('48eb7e55-f071-4aee-b6a5-7deffb32bc67', 'Cho thuê mặt bằng', '532 Phạm Văn Đồng, Hà Nội', '22736623-3bec-4c3a-902e-23e2637ea36d', '379bf4a5-24d9-4b25-b18e-9c90bb58c991', 'Cho thuê mặt bằng kinh doanh - nhà ở phù hợp hộ gia đình', 'aab26bf9-e7ed-4e95-93a0-e2e26c0675b2', '4ae6ed08-054f-425e-9f9f-63b17614b03a', 'c3ccf4ad-c928-4ba6-976b-c8fc368236a8', '2026-05-14 03:07:50', '2026-05-14 03:07:50'),
('6376ccba-fb3f-4f12-aa4e-56169de3c24d', 'Nhà trọ gần trường đại học, tiện đi học và đi làm', '62 xuân thủy, Hà Nội', '083b18a9-4880-43ac-9031-b4dab1aeadb9', '71349694-82f8-461b-8fe7-b1d49cd8c4b7', 'Phòng sạch đẹp, có gác, wifi miễn phí, gần nhiều trường đại học và tuyến xe bus. Chủ nhà thân thiện, hỗ trợ nhiệt tình cho người thuê mới.', 'b7adcf2a-9219-4b11-9d69-79c2fa750b70', '3022db6d-ec26-429d-b90f-193831f76113', '99a1186a-c0d9-4ca6-ac9d-0868b51c2deb', '2026-05-14 03:29:23', '2026-05-14 03:29:23'),
('7af6624e-bf19-414d-b77a-0b0d18923491', 'Phòng trọ giá rẻ', '123 Trần Hưng Đạo, Đường cách mạng Tháng Tám, Hồ Chí Minh', '3f4b5620-c911-4fee-8fd2-aba2f43345d9', '3f65d226-4ec0-46c7-85bd-28543fb4028c', 'Cho thuê phòng trọ sinh viên giá rẻ', 'fca880a4-2cd7-49fc-938b-7c4e95d9a700', 'f76abc5c-1e6f-4494-91d2-f1841f3c1415', '3f3c81a8-100f-43b8-94ba-bdfd4134d8a1', '2026-05-14 03:03:11', '2026-05-14 03:03:11'),
('89ad9022-b93e-449d-826a-50276133f8b3', 'căn hộ', '123 Lê lợi, Hồ Chí Minh', 'c27d2875-bb40-4363-a746-018d4ebb5175', '71349694-82f8-461b-8fe7-b1d49cd8c4b7', 'căn hộ cho thuê', 'fca880a4-2cd7-49fc-938b-7c4e95d9a700', '89caf3f7-875e-4ac6-8c97-0408e5b14ae7', 'a84a35bc-79ad-4d25-9e3f-4a904783b844', '2026-04-17 10:00:30', '2026-05-14 03:00:09'),
('9570f4c9-d092-4cdb-b25b-76169d93b1a2', 'Cho thuê căn hộ mini full nội thất gần trung tâm', '86 Trường Trinh, Hà Nội', 'eac1cf2d-e861-4a46-934f-c474df93959e', '3f65d226-4ec0-46c7-85bd-28543fb4028c', 'Căn hộ sạch sẽ, đầy đủ nội thất gồm điều hòa, tủ lạnh, máy giặt, giường và tủ quần áo. Khu vực an ninh tốt, giờ giấc tự do, phù hợp sinh viên và người đi làm. Gần chợ, siêu thị và bến xe.', 'aab26bf9-e7ed-4e95-93a0-e2e26c0675b2', '11668803-9259-4119-ae9f-d4fd254d95cc', '72964370-f449-479e-bca0-0dfcd54c839d', '2026-05-14 03:11:24', '2026-05-14 03:11:24'),
('b4ced2b6-5b0a-4f5d-90fc-cd3b914ba3e3', 'Phòng trọ mới xây, an ninh tốt, gần trung tâm', '9 hàng than, Hà Nội', '432279ed-1042-4246-986b-ec3368d2721b', '3f65d226-4ec0-46c7-85bd-28543fb4028c', 'Phòng rộng, sạch sẽ, có cửa sổ thoáng khí và WC riêng. Khu vực đông dân cư, gần cửa hàng tiện lợi, quán ăn và khu văn phòng.', 'b7adcf2a-9219-4b11-9d69-79c2fa750b70', '193f7cbe-17a4-497f-ab1d-fc95183bc173', '8e0f5262-75d6-457c-950b-8ca4039f3e1e', '2026-05-14 03:30:24', '2026-05-14 03:30:24'),
('c3eac664-e4a4-42a8-80c7-39e55ba942f1', 'mini', '32 cổ nhuế, Hà Nội', '4c5caaaa-7047-400f-b19f-c16c171cac1d', '3f65d226-4ec0-46c7-85bd-28543fb4028c', 'cho thuê căn hộ mini', 'fca880a4-2cd7-49fc-938b-7c4e95d9a700', '4fcef3c8-2523-4b67-9264-357f8fe794d6', '7440082b-f5c6-4b17-8be3-5855f671785e', '2026-04-17 09:54:56', '2026-05-14 03:00:28'),
('c4f81add-a391-4170-a274-86bfe2fd211a', 'Phòng trọ giá rẻ có gác, điện nước giá dân', '3 Hoàng Quốc Việt, Hà Nội', '4defe026-8fa6-4cf9-abc9-7a8f149923c8', '3f65d226-4ec0-46c7-85bd-28543fb4028c', 'Phòng rộng rãi, có gác lửng, WC riêng, chỗ để xe miễn phí. Khu trọ yên tĩnh, không chung chủ. Điện nước tính theo giá nhà nước, phù hợp ở lâu dài.', 'aab26bf9-e7ed-4e95-93a0-e2e26c0675b2', '663218e2-d98f-4c46-8c2b-b2d4ee1fd078', 'dcee04ce-962f-47cc-8d04-5f53f971ffa0', '2026-05-14 03:10:13', '2026-05-14 03:10:13'),
('c7ede183-ef75-452b-8def-489c790c4746', 'Cho thuê phòng khu vực khu công nghiệp', 'Đồng Văn, Hà Nam', '85686109-d207-4908-9f85-babc4b3695a5', 'e43360a0-d973-4561-93f0-ac198dfabab6', 'Cho thuê phòng khu vực khu công nghiệp - giá rẻ - tiện ích', 'fca880a4-2cd7-49fc-938b-7c4e95d9a700', 'b270d6de-8fad-433a-91a1-f2bd5b76336c', '23bafc50-ca9d-4390-8f02-1dbfc8a38d33', '2026-05-14 03:04:48', '2026-05-14 03:04:48');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `roles`
--

CREATE TABLE `roles` (
  `id` varchar(255) NOT NULL,
  `roleName` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `roles`
--

INSERT INTO `roles` (`id`, `roleName`, `createdAt`, `updatedAt`) VALUES
('ADMIN', 'Admin', '2026-04-04 22:12:16', '2026-04-04 22:12:16'),
('LANDLORD', 'Chu tro', '2026-04-04 22:12:16', '2026-04-04 22:12:16'),
('TENANT', 'Khach thue', '2026-04-04 22:12:16', '2026-04-04 22:12:16');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20260420000100-drop-redundant-schema.js'),
('20260420000200-create-password-reset-otps.js'),
('20260420000300-enforce-clean-schema.js'),
('add-avatar-to-user.js'),
('create-attribute.js'),
('create-category.js'),
('create-image.js'),
('create-label.js'),
('create-overview.js'),
('create-post.js'),
('create-role.js'),
('create-user.js');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `zalo` varchar(255) DEFAULT NULL,
  `avatar` text DEFAULT NULL,
  `roleId` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`id`, `name`, `password`, `phone`, `email`, `zalo`, `avatar`, `roleId`, `createdAt`, `updatedAt`) VALUES
('00000000-0000-0000-0000-000000000001', 'Administrator', '$2b$10$2baaxGMYzKAcd0.fr7Aw1eWa6OUTXU.VTLEu7bppIFiCGYB8j8wyy', '19006789', 'admin@gmail.com', NULL, NULL, 'ADMIN', '2026-05-07 15:41:29', '2026-05-14 02:51:52'),
('4ef1eb37-06c5-4724-bf57-94331d4f270a', 'Nguyen Van A1', '$2b$12$sVAhTggxmAgF9Xgno3Vw1.3HzQq19TmPj/bcjoT/TmIFFfa0vLfHq', '0123456788', 'tienhung.7104@gmail.com', NULL, NULL, 'TENANT', '2026-04-07 16:25:23', '2026-04-07 16:25:37'),
('aab26bf9-e7ed-4e95-93a0-e2e26c0675b2', 'Nguyễn Hoàn', '$2b$12$O/PtCloOVvDdORUI2XeJ3eNHFueAOSEnX7K827U/kI8tz4PDN3Qny', '0345642840', 'tienhung7104@gmail.com', '0345642840', 'https://res.cloudinary.com/ddvcelzwn/image/upload/v1778728339/thue-phong-tro/avatar/l0vgpo4xpibqj48033xc.jpg', 'LANDLORD', '2026-05-14 03:05:52', '2026-05-14 03:12:16'),
('b7adcf2a-9219-4b11-9d69-79c2fa750b70', 'Trần Thị Huệ', '$2b$12$j6hfMh7jxhkTgXgTJVuXPueLQ/b/4.WjkiJPvf9IbI4xqpAIvQOAm', '0987255698', 'hue@gmail.com', '0987255698', 'https://res.cloudinary.com/ddvcelzwn/image/upload/v1778729156/thue-phong-tro/avatar/sboraxigdutp55vseh7n.jpg', 'LANDLORD', '2026-05-14 03:25:16', '2026-05-14 03:25:54'),
('b8c00977-3eb1-4b2a-8a4f-5b9f480130dd', 'Nguyễn Văn B', '$2b$10$twQq3/F7SirKgq.VK7ecpuuOzgWrNWCG8KQBG7mBirYoW1deFuJ.W', '0912345675', 'b@gmail.com', NULL, NULL, 'TENANT', '2026-04-20 16:02:31', '2026-04-20 16:02:31'),
('c03254ba-750f-44fb-b12e-a41e24381409', 'Trần Thị Hoa', '$2b$10$twQq3/F7SirKgq.VK7ecpuuOzgWrNWCG8KQBG7mBirYoW1deFuJ.W', '0912345678', 'hoa@gmail.com', NULL, NULL, 'TENANT', '2026-04-20 15:41:40', '2026-04-20 15:41:40'),
('c0ce41e3-b032-4f03-a717-34a1ceeb0c87', 'Phạm Huy', '$2b$10$twQq3/F7SirKgq.VK7ecpuuOzgWrNWCG8KQBG7mBirYoW1deFuJ.W', '0343145384', 'huy@gmail.com', NULL, NULL, 'TENANT', '2026-04-20 16:15:43', '2026-04-20 16:15:43'),
('e7b15723-5f10-4048-9a71-ae9e9547421e', 'Nguyen Van A', '$2b$10$twQq3/F7SirKgq.VK7ecpuuOzgWrNWCG8KQBG7mBirYoW1deFuJ.W', '0123456789', 'test@gmail.com', NULL, NULL, 'TENANT', '2026-04-07 16:08:57', '2026-04-07 16:26:54'),
('fca880a4-2cd7-49fc-938b-7c4e95d9a700', 'Tử Đằng', '$2b$10$twQq3/F7SirKgq.VK7ecpuuOzgWrNWCG8KQBG7mBirYoW1deFuJ.W', '0343145387', 'dangtu7124@gmail.com', NULL, 'https://res.cloudinary.com/ddvcelzwn/image/upload/v1776428735/thue-phong-tro/avatar/c3yjeaxvembmd78mggts.png', 'LANDLORD', '2026-04-15 17:14:01', '2026-04-17 12:25:36');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `attributes`
--
ALTER TABLE `attributes`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `categorys`
--
ALTER TABLE `categorys`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `overviews`
--
ALTER TABLE `overviews`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `password_reset_otps`
--
ALTER TABLE `password_reset_otps`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `roleId` (`roleId`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `password_reset_otps`
--
ALTER TABLE `password_reset_otps`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
