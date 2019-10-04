-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Oct 03, 2019 at 11:26 PM
-- Server version: 5.7.26
-- PHP Version: 7.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `academia`
--

-- --------------------------------------------------------

--
-- Table structure for table `elementos`
--

DROP TABLE IF EXISTS `elementos`;
CREATE TABLE IF NOT EXISTS `elementos` (
  `id_elem` int(11) NOT NULL AUTO_INCREMENT,
  `fky_usuario` int(11) NOT NULL,
  `elemento_rep` tinyint(1) NOT NULL,
  `elem_cons` tinyint(1) NOT NULL,
  `elem_reg` tinyint(1) NOT NULL,
  `elem_audit` tinyint(1) NOT NULL,
  `elem_panelAd` tinyint(1) NOT NULL,
  `status` varchar(1) COLLATE utf8_spanish_ci NOT NULL,
  PRIMARY KEY (`id_elem`),
  KEY `fky_usuario` (`fky_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Dumping data for table `elementos`
--

INSERT INTO `elementos` (`id_elem`, `fky_usuario`, `elemento_rep`, `elem_cons`, `elem_reg`, `elem_audit`, `elem_panelAd`, `status`) VALUES
(1, 1, 1, 1, 1, 1, 1, 'A'),
(2, 2, 0, 1, 1, 0, 0, 'A'),
(3, 4, 1, 1, 0, 1, 1, 'A'),
(4, 5, 0, 1, 0, 1, 1, 'A'),
(5, 6, 1, 1, 1, 1, 1, 'A');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `elementos`
--
ALTER TABLE `elementos`
  ADD CONSTRAINT `elementos_ibfk_1` FOREIGN KEY (`fky_usuario`) REFERENCES `usuario` (`id_usu`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
