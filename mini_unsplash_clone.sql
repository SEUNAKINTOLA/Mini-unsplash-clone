-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Feb 12, 2021 at 10:15 AM
-- Server version: 10.4.10-MariaDB
-- PHP Version: 7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mini_unsplash_clone`
--

-- --------------------------------------------------------

--
-- Table structure for table `aspnetroles`
--

DROP TABLE IF EXISTS `aspnetroles`;
CREATE TABLE IF NOT EXISTS `aspnetroles` (
  `UserId` varchar(36) NOT NULL,
  `Id` varchar(36) NOT NULL,
  `Name` varchar(200) NOT NULL,
  `RoleId` varchar(200) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `aspnetroles`
--

INSERT INTO `aspnetroles` (`UserId`, `Id`, `Name`, `RoleId`) VALUES
('', '', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `collections`
--

DROP TABLE IF EXISTS `collections`;
CREATE TABLE IF NOT EXISTS `collections` (
  `collectionId` char(36) NOT NULL,
  `collectionname` varchar(255) NOT NULL,
  PRIMARY KEY (`collectionId`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `collections`
--

INSERT INTO `collections` (`collectionId`, `collectionname`) VALUES
('1', 'food'),
('2', 'animals');

-- --------------------------------------------------------

--
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
CREATE TABLE IF NOT EXISTS `images` (
  `imageid` char(36) NOT NULL,
  `imagename` varchar(255) NOT NULL,
  `uid` char(36) NOT NULL,
  `imageurl` varchar(255) NOT NULL,
  `CloudId` varchar(36) NOT NULL,
  `tags` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`tags`)),
  `collectionId` char(36) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`imageid`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `images`
--

INSERT INTO `images` (`imageid`, `imagename`, `uid`, `imageurl`, `CloudId`, `tags`, `collectionId`, `created_at`, `updated_at`) VALUES
('00076872-0a0a-8e84-e47f-16def7d6e47e', 'Capture.PNG', '0b3619d6-d53d-4bc5-919a-83619caf7458', 'https://images.unsplash.com/photo-1593642531955-b62e17bdaa9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXw2NDY5N3wxfDF8YWxsfDF8fHx8fHx8&ixlib=rb-1.2.1&q=80&w=400', 'iveceqjzfj4yo8xeatdq', '{\"person\":[{\"id\":\"undefined\"}]}', '1', '2021-02-11 19:51:27', '2021-02-11 22:50:55'),
('a6d1632f-5d39-5b32-1c8f-f4b47eb6a4fb', 'Capture - Copy.PNG', '0b3619d6-d53d-4bc5-919a-83619caf7458', 'https://images.unsplash.com/photo-1612881511885-e5bf8bab1dac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXw2NDY5N3wwfDF8YWxsfDEzfHx8fHx8fA&ixlib=rb-1.2.1&q=80&w=400', 'gtr7qmc2eny6uyor3605', '{\"person\":[{\"id\":\"abc\"},{\"id\":\"bbb\"}]}', '1', '2021-02-11 20:32:03', '2021-02-11 22:50:45'),
('ae641517-4c2e-5ba6-660a-b0c92343830f', 'dog_PNG50331.png', '0b3619d6-d53d-4bc5-919a-83619caf7458', 'https://images.unsplash.com/photo-1612886651203-d7bd545cb23d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXw2NDY5N3wwfDF8YWxsfDh8fHx8fHx8&ixlib=rb-1.2.1&q=80&w=400', 's81q9trljbie9uaecioq', '[\"abc\",{\"id\":\"bbb\"}]', '2', '2021-02-11 20:45:53', '2021-02-11 22:50:34'),
('a344517-4c2e-5ba6-660a-b0c92343830f', 'dog2_PNG50331.png', '0b3619d6-d53d-4bc5-919a-83619caf7458', 'https://images.unsplash.com/photo-1612886651203-d7bd545cb23d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXw2NDY5N3wwfDF8YWxsfDh8fHx8fHx8&ixlib=rb-1.2.1&q=80&w=400', 's81q9trljbie9uaecioq', '[\"abc\",{\"id\":\"bbb\"}]', '2', '2021-02-11 20:45:53', '2021-02-11 22:50:34'),
('a344237-4c2e-5ba6-660a-b0c92343830f', 'dog.png', '0b3619d6-d53d-4bc5-919a-83619caf7458', 'https://images.unsplash.com/photo-1612886651203-d7bd545cb23d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXw2NDY5N3wwfDF8YWxsfDh8fHx8fHx8&ixlib=rb-1.2.1&q=80&w=400', 's81q9trljbie9uaecioq', '[\"abc\",{\"id\":\"bbb\"}]', '1', '2021-02-11 20:45:53', '2021-02-11 22:50:34'),
('00054872-0a0a-8e84-e47f-16def7d6e47e', 'Capture', '0b3619d6-d53d-4bc5-919a-83619caf7458', 'https://images.unsplash.com/photo-1593642531955-b62e17bdaa9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXw2NDY5N3wxfDF8YWxsfDF8fHx8fHx8&ixlib=rb-1.2.1&q=80&w=400', 'iveceqjzfj4yo8xeatdq', '{\"person\":[{\"id\":\"undefined\"}]}', '1', '2021-02-11 19:51:27', '2021-02-11 22:50:55'),
('667262bd-4617-2d32-d963-4a4a6c2923b2', 'naira.png', '0b3619d6-d53d-4bc5-919a-83619caf7458', 'http://res.cloudinary.com/akinseun/image/upload/v1613118298/wizfq8sk9mch0zqmgsj6.png', 'wizfq8sk9mch0zqmgsj6', '[\"abc\",\"bbb\"]', '1', '2021-02-12 08:24:58', '2021-02-12 08:24:58');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
CREATE TABLE IF NOT EXISTS `roles` (
  `roleId` varchar(36) NOT NULL,
  `rolename` varchar(255) NOT NULL,
  PRIMARY KEY (`roleId`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`roleId`, `rolename`) VALUES
('ww', 'ww');

-- --------------------------------------------------------

--
-- Table structure for table `userclaims`
--

DROP TABLE IF EXISTS `userclaims`;
CREATE TABLE IF NOT EXISTS `userclaims` (
  `Id` varchar(36) NOT NULL,
  `ClaimType` varchar(255) NOT NULL,
  `ClaimValue` varchar(255) NOT NULL,
  `UserId` varchar(36) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `uid` char(36) NOT NULL,
  `email` varchar(255) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `roleId` varchar(36) NOT NULL,
  `remember_token` varchar(25) DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `NormalizedUserName` varchar(200) NOT NULL DEFAULT '',
  `NormalizedEmail` varchar(255) NOT NULL,
  PRIMARY KEY (`uid`),
  UNIQUE KEY `login` (`email`,`username`,`roleId`,`password`),
  UNIQUE KEY `basic_credentials` (`email`,`firstname`,`lastname`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`uid`, `email`, `firstname`, `lastname`, `username`, `password`, `roleId`, `remember_token`, `email_verified_at`, `created_at`, `updated_at`, `NormalizedUserName`, `NormalizedEmail`) VALUES
('0b3619d6-d53d-4bc5-919a-83619caf7458', 'dsdds@sdsd.dfdf', 'assa', 'sdsdds', 'dssdsd', 'AQAAAAEAACcQAAAAEJUCUCtE4UrX+gpkKcHOvgM+J6RBhC2iBPypnpfGo5XpZZNTanch4FwydIzxugBGeg==', '', NULL, NULL, NULL, '2021-02-10 15:54:04', 'DSSDSD', 'DSDDS@SDSD.DFDF'),
('87212048-0e86-4dd6-85c7-f9d1b30af834', 'seun@gmail.com', 'seun', 'ss', 'seun', 'AQAAAAEAACcQAAAAEDr7JK8OO724xfm8doo+eE+NBkwbztNZro+ByS+K4ObYoCYDUbeGKwo63+jOoClqGQ==', '', NULL, NULL, NULL, '2021-02-12 09:33:19', 'SEUN', 'SEUN@GMAIL.COM'),
('3e4b5cde-1984-4ce3-8bfb-274484e39732', 'sdds@ff.hgh', 'dds', 'sddds', 'dffddf', 'AQAAAAEAACcQAAAAEO+OouE6r1xeDXl4SvSaPrvGKM32f7QMK1rO+EmVByghFMDzu58y9VFis6dop5os4A==', '', NULL, NULL, NULL, '2021-02-12 09:36:29', 'DFFDDF', 'SDDS@FF.HGH'),
('099f2f8a-d231-4658-8bd1-b654132cf1ff', 'qqq@qqq.jg', 'qq', 'qqq', 'qqq', 'AQAAAAEAACcQAAAAEI+AirfSkuWVeUYo66gxsEkSDRxU18OdCoFuBFdT6OlNlcqmfgXo498f2grkTtTkrw==', '', NULL, NULL, NULL, '2021-02-12 10:03:54', 'QQQ', 'QQQ@QQQ.JG');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
