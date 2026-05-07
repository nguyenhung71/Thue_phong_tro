-- MariaDB dump 10.19  Distrib 10.4.32-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: phongtro
-- ------------------------------------------------------
-- Server version	10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `phongtro`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `phongtro` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;

USE `phongtro`;

--
-- Table structure for table `attributes`
--

DROP TABLE IF EXISTS `attributes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `attributes` (
  `id` varchar(255) NOT NULL,
  `price` varchar(255) DEFAULT NULL,
  `acreage` varchar(255) DEFAULT NULL,
  `published` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attributes`
--

LOCK TABLES `attributes` WRITE;
/*!40000 ALTER TABLE `attributes` DISABLE KEYS */;
INSERT INTO `attributes` VALUES ('4c5caaaa-7047-400f-b19f-c16c171cac1d','4000000','40','17/4/2026','2026-04-17 09:54:54','2026-04-17 09:54:54'),('7f38b21e-5594-4000-bedd-8b215cf34884','2000000','30','17/4/2026','2026-04-15 17:16:37','2026-04-17 08:50:17'),('c27d2875-bb40-4363-a746-018d4ebb5175','500000','25','17/4/2026','2026-04-17 10:00:30','2026-04-17 10:00:30');
/*!40000 ALTER TABLE `attributes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categorys`
--

DROP TABLE IF EXISTS `categorys`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categorys` (
  `id` varchar(255) NOT NULL,
  `code` varchar(255) DEFAULT NULL,
  `value` varchar(255) DEFAULT '0',
  `header` varchar(255) DEFAULT NULL,
  `subheader` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorys`
--

LOCK TABLES `categorys` WRITE;
/*!40000 ALTER TABLE `categorys` DISABLE KEYS */;
INSERT INTO `categorys` VALUES ('379bf4a5-24d9-4b25-b18e-9c90bb58c991','nha-nguyen-can','Nhà nguyên căn','Cho thuê nhà nguyên căn','Tổng hợp tin đăng cho thuê nhà nguyên căn mới nhất.','2026-04-17 10:30:24','2026-04-17 10:30:24'),('3f65d226-4ec0-46c7-85bd-28543fb4028c','can-ho-mini','Căn hộ mini','Cho thuê căn hộ mini','Tổng hợp tin đăng cho thuê căn hộ mini mới nhất.','2026-04-17 10:31:24','2026-04-17 10:31:24'),('71349694-82f8-461b-8fe7-b1d49cd8c4b7','can-ho-chung-cu','Căn hộ chung cư','Cho thuê căn hộ chung cư','Tổng hợp tin đăng cho thuê căn hộ chung cư mới nhất.','2026-04-17 10:31:24','2026-04-17 10:31:24'),('e43360a0-d973-4561-93f0-ac198dfabab6','can-ho-dich-vu','Căn hộ dịch vụ','Cho thuê căn hộ dịch vụ','Tổng hợp tin đăng cho thuê căn hộ dịch vụ mới nhất.','2026-04-17 10:31:24','2026-04-17 10:31:24');
/*!40000 ALTER TABLE `categorys` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `images` (
  `id` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
INSERT INTO `images` VALUES ('7440082b-f5c6-4b17-8be3-5855f671785e','https://res.cloudinary.com/ddvcelzwn/image/upload/v1776419695/thue-phong-tro/hgdyqkmn258z1ibq9wxc.jpg,https://res.cloudinary.com/ddvcelzwn/image/upload/v1776419696/thue-phong-tro/uvommvbfangj4v8lxlnz.jpg,https://res.cloudinary.com/ddvcelzwn/image/upload/v','2026-04-17 09:54:56','2026-04-17 09:54:56'),('8723735f-d3bc-4a42-8555-4a380454efc5','https://res.cloudinary.com/ddvcelzwn/image/upload/v1776273399/thue-phong-tro/mod3i5seclkaszwxyaln.jpg,https://res.cloudinary.com/ddvcelzwn/image/upload/v1776273399/thue-phong-tro/s35uyrafklykd3i9wk9r.png,https://res.cloudinary.com/ddvcelzwn/image/upload/v','2026-04-15 17:16:40','2026-04-15 17:16:40');
/*!40000 ALTER TABLE `images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `overviews`
--

DROP TABLE IF EXISTS `overviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `overviews` (
  `id` varchar(255) NOT NULL,
  `code` varchar(255) DEFAULT NULL,
  `target` varchar(255) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `expire` datetime DEFAULT NULL,
  `bonus` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `overviews`
--

LOCK TABLES `overviews` WRITE;
/*!40000 ALTER TABLE `overviews` DISABLE KEYS */;
INSERT INTO `overviews` VALUES ('1e6dfd09-11f1-404d-9bfd-ef3a685f242e','OV71913','Tất cả','2026-04-15 17:16:37','2026-05-15 17:16:37','Tin thường','2026-04-15 17:16:37','2026-04-17 08:50:17'),('4fcef3c8-2523-4b67-9264-357f8fe794d6','OV24369','Tất cả','2026-04-17 09:54:54','2026-05-17 09:54:54','Tin thường','2026-04-17 09:54:54','2026-04-17 09:54:54'),('89caf3f7-875e-4ac6-8c97-0408e5b14ae7','OV71605','Tất cả','2026-04-17 10:00:30','2026-05-17 10:00:30','Tin thường','2026-04-17 10:00:30','2026-04-17 10:00:30');
/*!40000 ALTER TABLE `overviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_reset_otps`
--

DROP TABLE IF EXISTS `password_reset_otps`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `password_reset_otps` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `otp` varchar(10) DEFAULT NULL,
  `expires_at` bigint(20) DEFAULT NULL,
  `is_verified` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_reset_otps`
--

LOCK TABLES `password_reset_otps` WRITE;
/*!40000 ALTER TABLE `password_reset_otps` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_reset_otps` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES ('2bcd6813-6435-4805-9f6e-0fded2dab315','ádsa','141 Lê Văn Hiến, phường Đông Ngạc, Hà Nội','7f38b21e-5594-4000-bedd-8b215cf34884','can-ho-dich-vu','adwe','fca880a4-2cd7-49fc-938b-7c4e95d9a700','1e6dfd09-11f1-404d-9bfd-ef3a685f242e','8723735f-d3bc-4a42-8555-4a380454efc5','2026-04-15 17:16:40','2026-04-17 08:50:17'),('89ad9022-b93e-449d-826a-50276133f8b3','căn hộ','123 Lê lợi, Hồ Chí Minh','c27d2875-bb40-4363-a746-018d4ebb5175','can-ho-chung-cu','căn hộ cho thuê','fca880a4-2cd7-49fc-938b-7c4e95d9a700','89caf3f7-875e-4ac6-8c97-0408e5b14ae7',NULL,'2026-04-17 10:00:30','2026-04-17 10:00:30'),('c3eac664-e4a4-42a8-80c7-39e55ba942f1','mini','32 cổ nhuế, Hà Nội','4c5caaaa-7047-400f-b19f-c16c171cac1d','can-ho-mini','cho thuê căn hộ mini','fca880a4-2cd7-49fc-938b-7c4e95d9a700','4fcef3c8-2523-4b67-9264-357f8fe794d6','7440082b-f5c6-4b17-8be3-5855f671785e','2026-04-17 09:54:56','2026-04-17 09:54:56');
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `roles` (
  `id` varchar(255) NOT NULL,
  `roleName` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES ('ADMIN','Admin','2026-04-04 22:12:16','2026-04-04 22:12:16'),('LANDLORD','Chu tro','2026-04-04 22:12:16','2026-04-04 22:12:16'),('TENANT','Khach thue','2026-04-04 22:12:16','2026-04-04 22:12:16');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sequelizemeta`
--

DROP TABLE IF EXISTS `sequelizemeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sequelizemeta` (
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sequelizemeta`
--

LOCK TABLES `sequelizemeta` WRITE;
/*!40000 ALTER TABLE `sequelizemeta` DISABLE KEYS */;
INSERT INTO `sequelizemeta` VALUES ('20260420000100-drop-redundant-schema.js'),('20260420000200-create-password-reset-otps.js'),('20260420000300-enforce-clean-schema.js'),('add-avatar-to-user.js'),('create-attribute.js'),('create-category.js'),('create-image.js'),('create-label.js'),('create-overview.js'),('create-post.js'),('create-role.js'),('create-user.js');
/*!40000 ALTER TABLE `sequelizemeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `roleId` (`roleId`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('00000000-0000-0000-0000-000000000001','Administrator','$2b$10$z6YuxQ9jR1BPjVIrjCycReRFigDUexRKL64U6etbE6XzYmsFh970q','19006789','admin@gmail.com',NULL,NULL,'ADMIN','2026-05-07 15:41:29','2026-05-07 15:43:34'),('4ef1eb37-06c5-4724-bf57-94331d4f270a','Nguyen Van A1','$2b$12$sVAhTggxmAgF9Xgno3Vw1.3HzQq19TmPj/bcjoT/TmIFFfa0vLfHq','0123456788','tienhung.7104@gmail.com',NULL,NULL,'TENANT','2026-04-07 16:25:23','2026-04-07 16:25:37'),('5fd58110-2b92-47eb-a24e-e0b1ad19fa21','Tử Đằng','$2b$12$uC4bqUnZH6Tin0hi5aI3PeKiPpAly22JY1Lzzk12yQabD/Xrfsoga','0343145383','dangtu71@24@gmail.com',NULL,NULL,'TENANT','2026-04-22 15:19:29','2026-04-22 15:19:29'),('b8c00977-3eb1-4b2a-8a4f-5b9f480130dd','á','$2b$10$twQq3/F7SirKgq.VK7ecpuuOzgWrNWCG8KQBG7mBirYoW1deFuJ.W','0912345675','s@gmail.com',NULL,NULL,'TENANT','2026-04-20 16:02:31','2026-04-20 16:02:31'),('c03254ba-750f-44fb-b12e-a41e24381409','á','$2b$10$twQq3/F7SirKgq.VK7ecpuuOzgWrNWCG8KQBG7mBirYoW1deFuJ.W','0912345678','a@gmail.com',NULL,NULL,'TENANT','2026-04-20 15:41:40','2026-04-20 15:41:40'),('c0ce41e3-b032-4f03-a717-34a1ceeb0c87','ádc','$2b$10$twQq3/F7SirKgq.VK7ecpuuOzgWrNWCG8KQBG7mBirYoW1deFuJ.W','0343145384','e@gmail.com',NULL,NULL,'TENANT','2026-04-20 16:15:43','2026-04-20 16:15:43'),('e7b15723-5f10-4048-9a71-ae9e9547421e','Nguyen Van A','$2b$10$twQq3/F7SirKgq.VK7ecpuuOzgWrNWCG8KQBG7mBirYoW1deFuJ.W','0123456789','test@gmail.com',NULL,NULL,'TENANT','2026-04-07 16:08:57','2026-04-07 16:26:54'),('fca880a4-2cd7-49fc-938b-7c4e95d9a700','Tử Đằng','$2b$10$twQq3/F7SirKgq.VK7ecpuuOzgWrNWCG8KQBG7mBirYoW1deFuJ.W','0343145387','dangtu7124@gmail.com',NULL,'https://res.cloudinary.com/ddvcelzwn/image/upload/v1776428735/thue-phong-tro/avatar/c3yjeaxvembmd78mggts.png','LANDLORD','2026-04-15 17:14:01','2026-04-17 12:25:36');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-05-07 23:51:01
