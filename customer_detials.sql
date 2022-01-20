-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 20, 2022 at 11:35 AM
-- Server version: 10.4.19-MariaDB
-- PHP Version: 8.0.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `customer_detials`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_customer_detials`
--

CREATE TABLE `tbl_customer_detials` (
  `user_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `user_email` varchar(255) NOT NULL,
  `user_password` varchar(255) NOT NULL,
  `user_image` varchar(255) NOT NULL,
  `total_orders` int(11) NOT NULL DEFAULT 0,
  `last_logged_in` datetime NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_customer_detials`
--

INSERT INTO `tbl_customer_detials` (`user_id`, `user_name`, `user_email`, `user_password`, `user_image`, `total_orders`, `last_logged_in`, `created_at`, `updated_at`) VALUES
('1bdcd2e8-2650-41c8-83ae-bc8b51d26c54', 'immortal', 'abc@abc.com', '$2a$10$VSZkP7hY26fKcB09Lnu8MOCpNf.QEqDLJ3uMZxkeIC.KQgq17IfRa', '/uploads/66dce98181c55d1523e9f32621442fbd.jpg', 0, '2022-01-20 10:16:51', '2022-01-20 10:16:51', '2022-01-20 10:16:51'),
('66afa36c-2755-4059-9c54-8fe205de7e96', 'nandha', 'aaa@aas.com', '$2a$10$is0rR.EEAiWq343CV5zpoupOy2bYReUfxCE3.igHLozd13YdKFSq6', '/uploads/42840f7662fadef11a5a61027c250f51.jpg', 0, '2022-01-20 07:00:49', '2022-01-20 07:00:49', '2022-01-20 07:00:49'),
('d05b41b6-5d2c-4735-bf15-d303531b542d', 'asdf', 'abi@abi.com', '$2a$10$wHJkiH1zigUvpbhrr/SelujLsdemwl1oALif2wmP9W7cTLRM6AVDq', '/uploads/802268a02939d49833bc54994001b95f.jpg', 0, '2022-01-20 10:26:49', '2022-01-20 10:26:49', '2022-01-20 10:26:49'),
('d816f585-235a-49a0-8854-9fa234fe1b37', 'nandha', 'nandha@gmail.com', '$2a$10$4i29R/veqjMV2v.LRO.LE.KG7OM6RxAglh7hsIXHBCUzQ2i7/xc0.', '/uploads/5ea409450f20a8a7af37b854eecb9513.png', 0, '2022-01-20 07:20:37', '2022-01-20 07:20:37', '2022-01-20 07:20:37');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_customer_detials`
--
ALTER TABLE `tbl_customer_detials`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `user_id` (`user_id`),
  ADD UNIQUE KEY `user_email` (`user_email`),
  ADD UNIQUE KEY `user_email_2` (`user_email`),
  ADD UNIQUE KEY `user_email_3` (`user_email`),
  ADD UNIQUE KEY `user_email_4` (`user_email`),
  ADD UNIQUE KEY `user_email_5` (`user_email`),
  ADD UNIQUE KEY `user_email_6` (`user_email`),
  ADD UNIQUE KEY `user_email_7` (`user_email`),
  ADD UNIQUE KEY `user_email_8` (`user_email`),
  ADD UNIQUE KEY `user_email_9` (`user_email`),
  ADD UNIQUE KEY `user_email_10` (`user_email`),
  ADD UNIQUE KEY `user_email_11` (`user_email`),
  ADD UNIQUE KEY `user_email_12` (`user_email`),
  ADD UNIQUE KEY `user_email_13` (`user_email`),
  ADD UNIQUE KEY `user_email_14` (`user_email`),
  ADD UNIQUE KEY `user_email_15` (`user_email`),
  ADD UNIQUE KEY `user_email_16` (`user_email`),
  ADD UNIQUE KEY `user_email_17` (`user_email`),
  ADD UNIQUE KEY `user_email_18` (`user_email`),
  ADD UNIQUE KEY `user_email_19` (`user_email`),
  ADD UNIQUE KEY `user_email_20` (`user_email`),
  ADD UNIQUE KEY `user_email_21` (`user_email`),
  ADD UNIQUE KEY `user_email_22` (`user_email`),
  ADD UNIQUE KEY `user_email_23` (`user_email`),
  ADD UNIQUE KEY `user_email_24` (`user_email`),
  ADD UNIQUE KEY `user_email_25` (`user_email`),
  ADD UNIQUE KEY `user_email_26` (`user_email`),
  ADD UNIQUE KEY `user_email_27` (`user_email`),
  ADD UNIQUE KEY `user_email_28` (`user_email`),
  ADD UNIQUE KEY `user_email_29` (`user_email`),
  ADD UNIQUE KEY `user_email_30` (`user_email`),
  ADD UNIQUE KEY `user_email_31` (`user_email`),
  ADD UNIQUE KEY `user_email_32` (`user_email`),
  ADD UNIQUE KEY `user_email_33` (`user_email`),
  ADD UNIQUE KEY `user_email_34` (`user_email`),
  ADD UNIQUE KEY `user_email_35` (`user_email`),
  ADD UNIQUE KEY `user_email_36` (`user_email`),
  ADD UNIQUE KEY `user_email_37` (`user_email`),
  ADD UNIQUE KEY `user_email_38` (`user_email`),
  ADD UNIQUE KEY `user_email_39` (`user_email`),
  ADD UNIQUE KEY `user_email_40` (`user_email`),
  ADD UNIQUE KEY `user_email_41` (`user_email`),
  ADD UNIQUE KEY `user_email_42` (`user_email`),
  ADD UNIQUE KEY `user_email_43` (`user_email`),
  ADD UNIQUE KEY `user_email_44` (`user_email`),
  ADD UNIQUE KEY `user_email_45` (`user_email`),
  ADD UNIQUE KEY `user_email_46` (`user_email`),
  ADD UNIQUE KEY `user_email_47` (`user_email`),
  ADD UNIQUE KEY `user_email_48` (`user_email`),
  ADD UNIQUE KEY `user_email_49` (`user_email`),
  ADD UNIQUE KEY `user_email_50` (`user_email`),
  ADD UNIQUE KEY `user_email_51` (`user_email`),
  ADD UNIQUE KEY `user_email_52` (`user_email`),
  ADD UNIQUE KEY `user_email_53` (`user_email`),
  ADD UNIQUE KEY `user_email_54` (`user_email`),
  ADD UNIQUE KEY `user_email_55` (`user_email`),
  ADD UNIQUE KEY `user_email_56` (`user_email`),
  ADD UNIQUE KEY `user_email_57` (`user_email`),
  ADD UNIQUE KEY `user_email_58` (`user_email`),
  ADD UNIQUE KEY `user_email_59` (`user_email`),
  ADD UNIQUE KEY `user_email_60` (`user_email`),
  ADD UNIQUE KEY `user_email_61` (`user_email`),
  ADD UNIQUE KEY `user_email_62` (`user_email`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
