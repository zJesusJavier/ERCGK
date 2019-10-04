-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Oct 03, 2019 at 11:25 PM
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
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
CREATE TABLE IF NOT EXISTS `usuario` (
  `id_usu` int(11) NOT NULL AUTO_INCREMENT,
  `nom_usu` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `cla_usu` varchar(12) COLLATE utf8_spanish_ci NOT NULL,
  `email_usu` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `fky_pre_1` int(11) NOT NULL,
  `res_pre_1` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `fky_pre_2` int(11) NOT NULL,
  `res_pre_2` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `niv_usu` varchar(20) COLLATE utf8_spanish_ci NOT NULL,
  `ip_usu` varchar(20) COLLATE utf8_spanish_ci NOT NULL,
  `mac_usu` varchar(18) COLLATE utf8_spanish_ci NOT NULL,
  `est_usu` char(1) COLLATE utf8_spanish_ci NOT NULL,
  PRIMARY KEY (`id_usu`),
  UNIQUE KEY `nom_usu` (`nom_usu`),
  KEY `fky_pre_1` (`fky_pre_1`),
  KEY `fky_pre_2` (`fky_pre_2`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Dumping data for table `usuario`
--

INSERT INTO `usuario` (`id_usu`, `nom_usu`, `cla_usu`, `email_usu`, `fky_pre_1`, `res_pre_1`, `fky_pre_2`, `res_pre_2`, `niv_usu`, `ip_usu`, `mac_usu`, `est_usu`) VALUES
(1, 'admin', '1234', 'admin@gmail.com', 1, 'Dolar', 6, 'Coldplay', 'Administrador', '127.0.0.1', '00:00:00:00:00:00', 'A');

--
-- Triggers `usuario`
--
DROP TRIGGER IF EXISTS `update_usuario`;
DELIMITER $$
CREATE TRIGGER `update_usuario` BEFORE UPDATE ON `usuario` FOR EACH ROW BEGIN

 INSERT INTO log (usu_log,tab_log,acc_log,date_log,reg_log,est_log)
 VALUES (CURRENT_USER,'usuario','Modificar - Data Anterior',NOW(),CONCAT('Cosido Usuario: ',OLD.id_usu," Nombre Usuario: ", OLD.nom_usu, " Clave Usuario: ",OLD.cla_usu, " Email Usuario: ",OLD.email_usu, " Pregunta 1: ",OLD.fky_pre_1, " Respuesta 1: ", OLD.res_pre_1, " Pregunta 2 : ",OLD.fky_pre_2, " Respuesta 2: ", OLD.res_pre_2, " Nivel Usuario: ", OLD.niv_usu, " Ip Usuario: ", OLD.ip_usu, " Mac Usuario: ",OLD.mac_usu, " Estado Usuario: ",OLD.est_usu),'A');

END
$$
DELIMITER ;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`fky_pre_1`) REFERENCES `pregunta` (`cod_pre`),
  ADD CONSTRAINT `usuario_ibfk_2` FOREIGN KEY (`fky_pre_2`) REFERENCES `pregunta` (`cod_pre`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
