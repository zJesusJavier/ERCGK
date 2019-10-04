-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Oct 03, 2019 at 11:30 PM
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
-- Table structure for table `calificacion`
--

DROP TABLE IF EXISTS `calificacion`;
CREATE TABLE IF NOT EXISTS `calificacion` (
  `cod_cal` int(11) NOT NULL AUTO_INCREMENT,
  `sem_cal` int(11) NOT NULL,
  `fec_cal` date NOT NULL,
  `cal_cal` char(2) COLLATE utf8_spanish_ci NOT NULL,
  `obs_cal` varchar(200) COLLATE utf8_spanish_ci DEFAULT NULL,
  `est_cal` char(1) COLLATE utf8_spanish_ci NOT NULL,
  `fky_can` int(11) NOT NULL,
  `fky_cla` int(11) NOT NULL,
  `fky_pro` int(11) NOT NULL,
  PRIMARY KEY (`cod_cal`),
  KEY `fky_can` (`fky_can`),
  KEY `fky_pro` (`fky_pro`),
  KEY `fky_cla` (`fky_cla`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Triggers `calificacion`
--
DROP TRIGGER IF EXISTS `update_calificacion`;
DELIMITER $$
CREATE TRIGGER `update_calificacion` BEFORE UPDATE ON `calificacion` FOR EACH ROW BEGIN

 INSERT INTO log (usu_log,tab_log,acc_log,date_log,reg_log,est_log)
 VALUES (CURRENT_USER,'calificacion','Modificar - Data Anterior',NOW(),CONCAT('Codigo Calificacion: ',OLD.cod_Cal,' Semana Calificacion : ', OLD.sem_cal,' Fecha Calificacion : ', OLD.fec_cal,' Calificacion : ', OLD.cal_cal,' Observacion Calificacion : ', OLD.obs_cal,' Estado Calificacion : ', OLD.est_cal,' Candidata Calificacion : ', OLD.fky_can,' Clase Calificacion : ', OLD.fky_cla,' Profesor Calificacion : ', OLD.fky_pro),'A');

END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `candidata`
--

DROP TABLE IF EXISTS `candidata`;
CREATE TABLE IF NOT EXISTS `candidata` (
  `cod_can` int(11) NOT NULL AUTO_INCREMENT,
  `ci_can` varchar(8) COLLATE utf8_spanish_ci NOT NULL,
  `nom_can` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `ape_can` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `peso_can` int(3) NOT NULL,
  `esta_can` int(3) NOT NULL,
  `ocu_can` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `edad_can` int(2) NOT NULL,
  `dir_can` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `tel_can` varchar(12) COLLATE utf8_spanish_ci NOT NULL,
  `email_can` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `fec_can` date NOT NULL,
  `est_can` char(1) COLLATE utf8_spanish_ci NOT NULL,
  `fky_cat` int(11) NOT NULL,
  `fky_mun` int(11) NOT NULL,
  `fky_civ` int(11) NOT NULL,
  `fky_cer` int(11) NOT NULL,
  PRIMARY KEY (`cod_can`),
  UNIQUE KEY `ci_can` (`ci_can`),
  KEY `fky_cat` (`fky_cat`),
  KEY `fky_mun` (`fky_mun`),
  KEY `fky_civ` (`fky_civ`),
  KEY `fky_cer` (`fky_cer`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Triggers `candidata`
--
DROP TRIGGER IF EXISTS `update_candidata`;
DELIMITER $$
CREATE TRIGGER `update_candidata` BEFORE UPDATE ON `candidata` FOR EACH ROW BEGIN

 INSERT INTO log (usu_log,tab_log,acc_log,date_log,reg_log,est_log)
 VALUES (CURRENT_USER,'candidata','Modificar - Data Anterior',NOW(),CONCAT('codigo: ',OLD.cod_can,' cedula: ', OLD.ci_can, " Nombre: ", OLD.nom_can, " Apellido: ",OLD.ape_can, " Peso: ",OLD.peso_can, " Estatura: ",OLD.esta_can, " Estado Civil: ", OLD.fky_civ, " Ocupacion: ",OLD.ocu_can, " Categoria: ", OLD.fky_cat, " Edad: ", OLD.edad_can, " Municipio: ", OLD.fky_mun, " Certamen: ",OLD.fky_cer, " Direccion: ",OLD.dir_can, " Telefono: ",OLD.tel_can, " Email: ",OLD.email_can," Estado: ", OLD.est_can),'A');

END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `categoria`
--

DROP TABLE IF EXISTS `categoria`;
CREATE TABLE IF NOT EXISTS `categoria` (
  `cod_cat` int(11) NOT NULL AUTO_INCREMENT,
  `nom_cat` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `est_cat` char(1) COLLATE utf8_spanish_ci NOT NULL,
  PRIMARY KEY (`cod_cat`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Dumping data for table `categoria`
--

INSERT INTO `categoria` (`cod_cat`, `nom_cat`, `est_cat`) VALUES
(1, 'Petite', 'A'),
(2, 'Miss', 'A');

--
-- Triggers `categoria`
--
DROP TRIGGER IF EXISTS `update_categoria`;
DELIMITER $$
CREATE TRIGGER `update_categoria` BEFORE UPDATE ON `categoria` FOR EACH ROW BEGIN

 INSERT INTO log (usu_log,tab_log,acc_log,date_log,reg_log,est_log)
 VALUES (CURRENT_USER,'categoria','Modificar - Data Anterior',NOW(),CONCAT('Nombre Categoria: ',OLD.nom_cat,' Estado Categoria: ', OLD.est_cat),'A');

END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `certamen`
--

DROP TABLE IF EXISTS `certamen`;
CREATE TABLE IF NOT EXISTS `certamen` (
  `cod_cer` int(11) NOT NULL AUTO_INCREMENT,
  `des_cer` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `feci_cer` date NOT NULL,
  `fecf_cer` date NOT NULL,
  `est_cer` char(1) COLLATE utf8_spanish_ci NOT NULL,
  PRIMARY KEY (`cod_cer`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Triggers `certamen`
--
DROP TRIGGER IF EXISTS `update_certamen`;
DELIMITER $$
CREATE TRIGGER `update_certamen` BEFORE UPDATE ON `certamen` FOR EACH ROW BEGIN

 INSERT INTO log (usu_log,tab_log,acc_log,date_log,reg_log,est_log)
 VALUES (CURRENT_USER,'certamen','Modificar - Data Anterior',NOW(),CONCAT('codigo Certamen: ',OLD.cod_cer,' Descripcion Certamen: ', OLD.des_cer, " Fecha Inicio: ", OLD.feci_cer, " Fecha Fin: ",OLD.fecf_cer, " Estado Certamen: ",OLD.est_cer),'A');

END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `civil`
--

DROP TABLE IF EXISTS `civil`;
CREATE TABLE IF NOT EXISTS `civil` (
  `cod_civ` int(11) NOT NULL AUTO_INCREMENT,
  `nom_civ` varchar(15) COLLATE utf8_spanish_ci NOT NULL,
  `est_civ` char(1) COLLATE utf8_spanish_ci NOT NULL,
  PRIMARY KEY (`cod_civ`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Dumping data for table `civil`
--

INSERT INTO `civil` (`cod_civ`, `nom_civ`, `est_civ`) VALUES
(1, 'Soltera', 'A'),
(2, 'Comprometida', 'A'),
(3, 'Casada', 'A'),
(4, 'Divorciada', 'A'),
(5, 'Viuda', 'A');

-- --------------------------------------------------------

--
-- Table structure for table `clase`
--

DROP TABLE IF EXISTS `clase`;
CREATE TABLE IF NOT EXISTS `clase` (
  `cod_cla` int(11) NOT NULL AUTO_INCREMENT,
  `nom_cla` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `est_cla` char(1) COLLATE utf8_spanish_ci NOT NULL,
  PRIMARY KEY (`cod_cla`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Dumping data for table `clase`
--

INSERT INTO `clase` (`cod_cla`, `nom_cla`, `est_cla`) VALUES
(1, 'Actuación', 'A'),
(2, 'Animación', 'A'),
(3, 'Baile', 'A'),
(4, 'Comunicación', 'A'),
(5, 'Estética', 'A'),
(6, 'Etiqueta', 'A'),
(7, 'Expresión corporal', 'A'),
(8, 'Fotografía', 'A'),
(9, 'Maquillaje', 'A'),
(10, 'Moda', 'A'),
(11, 'Oratoria', 'A'),
(12, 'Pasarela', 'A'),
(13, 'Patronaje', 'A'),
(14, 'Protocolo', 'A');

--
-- Triggers `clase`
--
DROP TRIGGER IF EXISTS `update_clase`;
DELIMITER $$
CREATE TRIGGER `update_clase` BEFORE UPDATE ON `clase` FOR EACH ROW BEGIN

 INSERT INTO log (usu_log,tab_log,acc_log,date_log,reg_log,est_log)
 VALUES (CURRENT_USER,'clase','Modificar - Data Anterior',NOW(),CONCAT('Codigo Clase: ',OLD.cod_cla,' Nombre Clase: ', OLD.nom_cla, " Estado Clase: ", OLD.est_cla),'A');

END
$$
DELIMITER ;

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

-- --------------------------------------------------------

--
-- Table structure for table `jurado`
--

DROP TABLE IF EXISTS `jurado`;
CREATE TABLE IF NOT EXISTS `jurado` (
  `cod_jur` int(11) NOT NULL AUTO_INCREMENT,
  `ci_jur` varchar(8) COLLATE utf8_spanish_ci NOT NULL,
  `nom_jur` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `ape_jur` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `dir_jur` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `tel_jur` varchar(12) COLLATE utf8_spanish_ci NOT NULL,
  `email_jur` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `est_jur` varchar(1) COLLATE utf8_spanish_ci NOT NULL,
  `fky_cat` int(11) NOT NULL,
  PRIMARY KEY (`cod_jur`),
  UNIQUE KEY `ci_jur` (`ci_jur`),
  KEY `fky_cat` (`fky_cat`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Triggers `jurado`
--
DROP TRIGGER IF EXISTS `update_jurado`;
DELIMITER $$
CREATE TRIGGER `update_jurado` BEFORE UPDATE ON `jurado` FOR EACH ROW BEGIN

 INSERT INTO log (usu_log,tab_log,acc_log,date_log,reg_log,est_log)
 VALUES (CURRENT_USER,'jurado','Modificar - Data Anterior',NOW(),CONCAT('Codigo Jurado: ',OLD.cod_jur,' Cedula Jurado: ', OLD.ci_jur, " Nombre Jurado: ", OLD.nom_jur, " Apellido Jurado: ",OLD.ape_jur, " Direccion: ",OLD.dir_jur," Telefono Jurado: ",OLD.tel_jur, " Email Jurado: ", OLD.email_jur, " Ocupacion: ",OLD.est_jur, " Categoria Jurado: ", OLD.fky_cat),'A');

END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `log`
--

DROP TABLE IF EXISTS `log`;
CREATE TABLE IF NOT EXISTS `log` (
  `cod_log` int(11) NOT NULL AUTO_INCREMENT,
  `usu_log` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `tab_log` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `acc_log` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `reg_log` blob NOT NULL,
  `date_log` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `est_log` varchar(1) COLLATE utf8_spanish_ci NOT NULL,
  PRIMARY KEY (`cod_log`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `municipio`
--

DROP TABLE IF EXISTS `municipio`;
CREATE TABLE IF NOT EXISTS `municipio` (
  `cod_mun` int(11) NOT NULL AUTO_INCREMENT,
  `nom_mun` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `est_mun` char(1) COLLATE utf8_spanish_ci NOT NULL,
  PRIMARY KEY (`cod_mun`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Dumping data for table `municipio`
--

INSERT INTO `municipio` (`cod_mun`, `nom_mun`, `est_mun`) VALUES
(1, 'Andrés Bello', 'A'),
(2, 'Antonio Rómulo Costa', 'A'),
(3, 'Ayacucho', 'A'),
(4, 'Bolívar', 'A'),
(5, 'Cárdenas', 'A'),
(6, 'Córdoba', 'A'),
(7, 'Fernández Feo', 'A'),
(8, 'Francisco de Miranda', 'A'),
(9, 'García de Hevia', 'A'),
(10, 'Guásimos', 'A'),
(11, 'Independencia', 'A'),
(12, 'Jáuregui', 'A'),
(13, 'José María Vargas', 'A'),
(14, 'Junín', 'A'),
(15, 'San Judas Tadeo', 'A'),
(16, 'Libertad', 'A'),
(17, 'Libertador', 'A'),
(18, 'Lobatera', 'A'),
(19, 'Michelena', 'A'),
(20, 'Panamericano', 'A'),
(21, 'Pedro María Ureña', 'A'),
(22, 'Rafael Urdaneta', 'A'),
(23, 'Samuel Dario Maldonado', 'A'),
(24, 'San Cristóbal', 'A'),
(25, 'Seboruco', 'A'),
(26, 'Simón Rodríguez', 'A'),
(27, 'Sucre', 'A'),
(28, 'Torbes', 'A'),
(29, 'Uribante', 'A');

-- --------------------------------------------------------

--
-- Table structure for table `pregunta`
--

DROP TABLE IF EXISTS `pregunta`;
CREATE TABLE IF NOT EXISTS `pregunta` (
  `cod_pre` int(11) NOT NULL AUTO_INCREMENT,
  `pre_pre` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `est_pre` char(1) COLLATE utf8_spanish_ci NOT NULL,
  PRIMARY KEY (`cod_pre`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Dumping data for table `pregunta`
--

INSERT INTO `pregunta` (`cod_pre`, `pre_pre`, `est_pre`) VALUES
(1, '¿Cuál es el nombre de su primera mascota? ', 'A'),
(2, '¿Cuál es su color favorito?', 'A'),
(3, '¿En qué año nació su Madre?', 'A'),
(4, '¿Cuál es el segundo nombre de su Padre? ', 'A'),
(5, '¿De qué color era su primer auto? ', 'A'),
(6, '¿Cuál es su banda favorita?', 'A'),
(7, '¿Cuál es su libro favorito?', 'A'),
(8, '¿Cuál es su canción favorita? ', 'A');

-- --------------------------------------------------------

--
-- Table structure for table `profesor`
--

DROP TABLE IF EXISTS `profesor`;
CREATE TABLE IF NOT EXISTS `profesor` (
  `cod_pro` int(11) NOT NULL AUTO_INCREMENT,
  `ci_pro` varchar(8) COLLATE utf8_spanish_ci NOT NULL,
  `nom_pro` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `ape_pro` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `dir_pro` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `tel_pro` varchar(12) COLLATE utf8_spanish_ci NOT NULL,
  `email_pro` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `est_pro` char(1) COLLATE utf8_spanish_ci NOT NULL,
  `fky_cla` int(11) NOT NULL,
  `fky_cat` int(11) NOT NULL,
  PRIMARY KEY (`cod_pro`),
  UNIQUE KEY `ci_pro` (`ci_pro`),
  KEY `fky_cat` (`fky_cat`),
  KEY `fky_cla` (`fky_cla`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Triggers `profesor`
--
DROP TRIGGER IF EXISTS `update_profesor`;
DELIMITER $$
CREATE TRIGGER `update_profesor` BEFORE UPDATE ON `profesor` FOR EACH ROW BEGIN

 INSERT INTO log (usu_log,tab_log,acc_log,date_log,reg_log,est_log)
 VALUES (CURRENT_USER,'profesor','Modificar - Data Anterior',NOW(),CONCAT('Codigo Profesor: ',OLD.cod_pro,' Cedula Profesor: ', OLD.ci_pro, " Nombre Profesor: ", OLD.nom_pro, " Apellido Profesor: ",OLD.ape_pro, " Direccion Profesor: ",OLD.dir_pro, " Telefono Profesor: ",OLD.tel_pro, " Email Profesor: ", OLD.email_pro, " Estado Profesor: ",OLD.est_pro, " Clase Profesor: ", OLD.fky_cla, " Categoria Profesor: ", OLD.fky_cat),'A');

END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `semana`
--

DROP TABLE IF EXISTS `semana`;
CREATE TABLE IF NOT EXISTS `semana` (
  `cod_sem` int(11) NOT NULL AUTO_INCREMENT,
  `num_sem` varchar(2) COLLATE utf8_spanish_ci NOT NULL,
  `est_sem` char(1) COLLATE utf8_spanish_ci NOT NULL,
  PRIMARY KEY (`cod_sem`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Dumping data for table `semana`
--

INSERT INTO `semana` (`cod_sem`, `num_sem`, `est_sem`) VALUES
(1, '1', 'A'),
(2, '2', 'A'),
(3, '3', 'A'),
(4, '4', 'A'),
(5, '5', 'A'),
(6, '6', 'A'),
(7, '7', 'A'),
(8, '8', 'A'),
(9, '9', 'A'),
(10, '10', 'A'),
(11, '11', 'A'),
(12, '12', 'A'),
(13, '13', 'A'),
(14, '14', 'A'),
(15, '15', 'A'),
(16, '16', 'A'),
(17, '17', 'A'),
(18, '18', 'A'),
(19, '19', 'A'),
(20, '20', 'A'),
(21, '21', 'A'),
(22, '22', 'A'),
(23, '23', 'A');

-- --------------------------------------------------------

--
-- Table structure for table `sesion`
--

DROP TABLE IF EXISTS `sesion`;
CREATE TABLE IF NOT EXISTS `sesion` (
  `cod_ses` int(11) NOT NULL AUTO_INCREMENT,
  `usu_ses` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `niv_ses` varchar(20) COLLATE utf8_spanish_ci NOT NULL,
  `ip_ses` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `mac_ses` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `date_ses` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `est_ses` varchar(1) COLLATE utf8_spanish_ci NOT NULL,
  PRIMARY KEY (`cod_ses`)
) ENGINE=InnoDB AUTO_INCREMENT=99 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

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
(1, 'admin', '1234', 'admin@gmail.com', 1, 'Dolar', 6, 'Coldplay', 'Administrador', '127.0.0.1', '00:00:00:00:00:00', 'A'),
(2, 'user', '4321', 'user@gmail.com', 1, 'Dolar', 2, 'Azul', 'Usuario', '', '', 'A'),
(3, 'mayel', 'mayel', 'mayel@gmail.com', 1, '1', 2, '2', 'Administrador', '', '', 'A'),
(4, 'test', 'test', 'test@gmail.com', 1, 'test', 2, 'test', 'Auditor', '', '', 'A'),
(5, 'johana', 'fev', 'test2', 2, 'dev', 3, 'dev', 'Administrador', '', '', 'A'),
(6, 'yes', 'yes', 'yes@hotmail.com', 1, 'yes', 2, 'yes', 'Administrador', '', '', 'A');

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
-- Constraints for table `calificacion`
--
ALTER TABLE `calificacion`
  ADD CONSTRAINT `calificacion_ibfk_1` FOREIGN KEY (`fky_can`) REFERENCES `candidata` (`cod_can`),
  ADD CONSTRAINT `calificacion_ibfk_2` FOREIGN KEY (`fky_pro`) REFERENCES `profesor` (`cod_pro`),
  ADD CONSTRAINT `calificacion_ibfk_3` FOREIGN KEY (`fky_cla`) REFERENCES `clase` (`cod_cla`);

--
-- Constraints for table `candidata`
--
ALTER TABLE `candidata`
  ADD CONSTRAINT `candidata_ibfk_1` FOREIGN KEY (`fky_cat`) REFERENCES `categoria` (`cod_cat`),
  ADD CONSTRAINT `candidata_ibfk_2` FOREIGN KEY (`fky_mun`) REFERENCES `municipio` (`cod_mun`),
  ADD CONSTRAINT `candidata_ibfk_3` FOREIGN KEY (`fky_civ`) REFERENCES `civil` (`cod_civ`),
  ADD CONSTRAINT `candidata_ibfk_4` FOREIGN KEY (`fky_cer`) REFERENCES `certamen` (`cod_cer`);

--
-- Constraints for table `elementos`
--
ALTER TABLE `elementos`
  ADD CONSTRAINT `elementos_ibfk_1` FOREIGN KEY (`fky_usuario`) REFERENCES `usuario` (`id_usu`);

--
-- Constraints for table `jurado`
--
ALTER TABLE `jurado`
  ADD CONSTRAINT `jurado_ibfk_1` FOREIGN KEY (`fky_cat`) REFERENCES `categoria` (`cod_cat`);

--
-- Constraints for table `profesor`
--
ALTER TABLE `profesor`
  ADD CONSTRAINT `profesor_ibfk_1` FOREIGN KEY (`fky_cat`) REFERENCES `categoria` (`cod_cat`),
  ADD CONSTRAINT `profesor_ibfk_2` FOREIGN KEY (`fky_cla`) REFERENCES `clase` (`cod_cla`);

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
