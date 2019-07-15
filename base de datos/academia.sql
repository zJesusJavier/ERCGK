-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 14-07-2019 a las 04:01:59
-- Versión del servidor: 10.1.30-MariaDB
-- Versión de PHP: 7.0.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `academia`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `calificacion`
--

CREATE TABLE `calificacion` (
  `cod_cal` int(11) NOT NULL,
  `sem_cal` int(11) NOT NULL,
  `fec_cal` date NOT NULL,
  `cal_cal` char(2) COLLATE utf8_spanish_ci NOT NULL,
  `obs_cal` varchar(200) COLLATE utf8_spanish_ci DEFAULT NULL,
  `est_cal` char(1) COLLATE utf8_spanish_ci NOT NULL,
  `fky_can` int(11) NOT NULL,
  `fky_cla` int(11) NOT NULL,
  `fky_pro` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `calificacion`
--

INSERT INTO `calificacion` (`cod_cal`, `sem_cal`, `fec_cal`, `cal_cal`, `obs_cal`, `est_cal`, `fky_can`, `fky_cla`, `fky_pro`) VALUES
(1, 1, '2019-07-05', '20', '', 'A', 1, 1, 1),
(2, 3, '2019-07-07', '20', '', 'A', 5, 2, 1),
(3, 3, '2019-07-11', '20', '', 'A', 13, 2, 1),
(4, 2, '2019-07-11', '10', '', 'A', 13, 2, 1);

--
-- Disparadores `calificacion`
--
DELIMITER $$
CREATE TRIGGER `update_calificacion` BEFORE UPDATE ON `calificacion` FOR EACH ROW BEGIN

 INSERT INTO log (usu_log,tab_log,acc_log,date_log,reg_log,est_log)
 VALUES (CURRENT_USER,'calificacion','Modificar - Data Anterior',NOW(),CONCAT('Codigo Calificacion: ',OLD.cod_Cal,' Semana Calificacion : ', OLD.sem_cal,' Fecha Calificacion : ', OLD.fec_cal,' Calificacion : ', OLD.cal_cal,' Observacion Calificacion : ', OLD.obs_cal,' Estado Calificacion : ', OLD.est_cal,' Candidata Calificacion : ', OLD.fky_can,' Clase Calificacion : ', OLD.fky_cla,' Profesor Calificacion : ', OLD.fky_pro),'A');

END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `candidata`
--

CREATE TABLE `candidata` (
  `cod_can` int(11) NOT NULL,
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
  `fky_cer` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `candidata`
--

INSERT INTO `candidata` (`cod_can`, `ci_can`, `nom_can`, `ape_can`, `peso_can`, `esta_can`, `ocu_can`, `edad_can`, `dir_can`, `tel_can`, `email_can`, `fec_can`, `est_can`, `fky_cat`, `fky_mun`, `fky_civ`, `fky_cer`) VALUES
(1, '24743016', 'Paoñaaaaassssaaa', 'Pabon', 55, 156, 'TSU', 23, 'Tariba', '02763958784', 'joharap_22@hotmail.com', '2019-03-04', 'A', 1, 5, 1, 1),
(2, '24780688', 'Laurinha', 'Mora', 57, 169, 'Lic', 25, 'Tariba', '04268971235', 'laura@gmail.com', '2019-03-12', 'A', 2, 1, 1, 1),
(5, '25879116', 'Johana', 'Padron', 55, 158, 'Ing', 20, 'Cordero', '027698564545', 'joh@hotmail.com', '2018-07-07', 'A', 1, 16, 3, 1),
(6, '24743567', 'Paol', 'Paron', 56, 158, 'Ing', 25, 'Palo Gordo', '027639589452', 'kol@gmail.com', '2019-07-13', 'A', 1, 8, 1, 1),
(8, '5897455', 'Paola', 'Paron', 56, 158, 'Ing', 25, 'Palo Gordo', '027639589452', 'kol@gmail.com', '2019-07-13', 'A', 1, 8, 1, 1),
(9, '89825456', 'Paola', 'Paron', 56, 158, 'Ing', 25, 'Palo Gordo', '027639589452', 'kol@gmail.com', '2019-07-13', 'A', 1, 8, 1, 1),
(10, '58975894', 'Paola', 'Paron', 56, 158, 'Ing', 25, 'Palo Gordo', '027639589452', 'kol@gmail.com', '2019-07-13', 'A', 1, 8, 1, 1),
(11, '58969526', 'Pedrasss', 'Prere', 52, 189, 'TSSU', 26, 'Palmas', '042587695262', 'a@hotmail.com', '2017-12-15', 'A', 2, 1, 1, 1),
(12, '8555555', 'Petronila', 'Puera', 58, 178, 'Linda', 25, 'Alla', '042587496856', 'j@hotmail.com', '2019-05-13', 'A', 2, 7, 1, 3),
(13, '88562656', 'aaaaaaaaaa', 'Pol', 52, 148, 'TSU', 15, 'lA BONITRA', '042984129865', 'JOHARAP@hotmail.com', '2019-08-15', 'A', 1, 2, 1, 1),
(14, '25459851', 'eeeeeeeeeee', 'aopkod', 12, 153, 'JSALKS', 12, 'COLA', '04265145', 'KLA@HOTMAIL.COM', '2019-12-15', 'A', 1, 1, 1, 1);

--
-- Disparadores `candidata`
--
DELIMITER $$
CREATE TRIGGER `update_candidata` BEFORE UPDATE ON `candidata` FOR EACH ROW BEGIN

 INSERT INTO log (usu_log,tab_log,acc_log,date_log,reg_log,est_log)
 VALUES (CURRENT_USER,'candidata','Modificar - Data Anterior',NOW(),CONCAT('codigo: ',OLD.cod_can,' cedula: ', OLD.ci_can, " Nombre: ", OLD.nom_can, " Apellido: ",OLD.ape_can, " Peso: ",OLD.peso_can, " Estatura: ",OLD.esta_can, " Estado Civil: ", OLD.fky_civ, " Ocupacion: ",OLD.ocu_can, " Categoria: ", OLD.fky_cat, " Edad: ", OLD.edad_can, " Municipio: ", OLD.fky_mun, " Certamen: ",OLD.fky_cer, " Direccion: ",OLD.dir_can, " Telefono: ",OLD.tel_can, " Email: ",OLD.email_can," Estado: ", OLD.est_can),'A');

END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `cod_cat` int(11) NOT NULL,
  `nom_cat` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `est_cat` char(1) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`cod_cat`, `nom_cat`, `est_cat`) VALUES
(1, 'Petite', 'A'),
(2, 'Miss', 'A');

--
-- Disparadores `categoria`
--
DELIMITER $$
CREATE TRIGGER `update_categoria` BEFORE UPDATE ON `categoria` FOR EACH ROW BEGIN

 INSERT INTO log (usu_log,tab_log,acc_log,date_log,reg_log,est_log)
 VALUES (CURRENT_USER,'categoria','Modificar - Data Anterior',NOW(),CONCAT('Nombre Categoria: ',OLD.nom_cat,' Estado Categoria: ', OLD.est_cat),'A');

END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `certamen`
--

CREATE TABLE `certamen` (
  `cod_cer` int(11) NOT NULL,
  `des_cer` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `feci_cer` date NOT NULL,
  `fecf_cer` date NOT NULL,
  `est_cer` char(1) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `certamen`
--

INSERT INTO `certamen` (`cod_cer`, `des_cer`, `feci_cer`, `fecf_cer`, `est_cer`) VALUES
(1, 'Chica Gipsy', '2018-01-16', '2018-04-11', 'A'),
(2, 'Sra Bella', '2019-02-01', '2019-02-02', 'I'),
(3, 'Srita Hermosa', '2019-02-01', '2019-02-04', 'A'),
(4, 'Sra bella', '2019-07-12', '2020-01-12', 'A'),
(5, 'Lo mas lindo', '2019-02-18', '2020-10-20', 'A');

--
-- Disparadores `certamen`
--
DELIMITER $$
CREATE TRIGGER `update_certamen` BEFORE UPDATE ON `certamen` FOR EACH ROW BEGIN

 INSERT INTO log (usu_log,tab_log,acc_log,date_log,reg_log,est_log)
 VALUES (CURRENT_USER,'certamen','Modificar - Data Anterior',NOW(),CONCAT('codigo Certamen: ',OLD.cod_cer,' Descripcion Certamen: ', OLD.des_cer, " Fecha Inicio: ", OLD.feci_cer, " Fecha Fin: ",OLD.fecf_cer, " Estado Certamen: ",OLD.est_cer),'A');

END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `civil`
--

CREATE TABLE `civil` (
  `cod_civ` int(11) NOT NULL,
  `nom_civ` varchar(15) COLLATE utf8_spanish_ci NOT NULL,
  `est_civ` char(1) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `civil`
--

INSERT INTO `civil` (`cod_civ`, `nom_civ`, `est_civ`) VALUES
(1, 'Soltera', 'A'),
(2, 'Comprometida', 'A'),
(3, 'Casada', 'A'),
(4, 'Divorciada', 'A'),
(5, 'Viuda', 'A');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clase`
--

CREATE TABLE `clase` (
  `cod_cla` int(11) NOT NULL,
  `nom_cla` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `est_cla` char(1) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `clase`
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
-- Disparadores `clase`
--
DELIMITER $$
CREATE TRIGGER `update_clase` BEFORE UPDATE ON `clase` FOR EACH ROW BEGIN

 INSERT INTO log (usu_log,tab_log,acc_log,date_log,reg_log,est_log)
 VALUES (CURRENT_USER,'clase','Modificar - Data Anterior',NOW(),CONCAT('Codigo Clase: ',OLD.cod_cla,' Nombre Clase: ', OLD.nom_cla, " Estado Clase: ", OLD.est_cla),'A');

END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `elementos`
--

CREATE TABLE `elementos` (
  `id_elem` int(11) NOT NULL,
  `fky_usuario` int(11) NOT NULL,
  `elemento_rep` tinyint(1) NOT NULL,
  `elem_cons` tinyint(1) NOT NULL,
  `elem_reg` tinyint(1) NOT NULL,
  `elem_audit` tinyint(1) NOT NULL,
  `elem_panelAd` tinyint(1) NOT NULL,
  `status` varchar(1) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `elementos`
--

INSERT INTO `elementos` (`id_elem`, `fky_usuario`, `elemento_rep`, `elem_cons`, `elem_reg`, `elem_audit`, `elem_panelAd`, `status`) VALUES
(1, 1, 1, 1, 1, 1, 1, 'A'),
(2, 2, 0, 1, 1, 0, 0, 'A'),
(3, 4, 1, 1, 0, 1, 1, 'A'),
(4, 5, 0, 1, 0, 1, 1, 'A'),
(5, 6, 1, 1, 1, 1, 1, 'A');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `jurado`
--

CREATE TABLE `jurado` (
  `cod_jur` int(11) NOT NULL,
  `ci_jur` varchar(8) COLLATE utf8_spanish_ci NOT NULL,
  `nom_jur` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `ape_jur` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `dir_jur` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `tel_jur` varchar(12) COLLATE utf8_spanish_ci NOT NULL,
  `email_jur` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `est_jur` varchar(1) COLLATE utf8_spanish_ci NOT NULL,
  `fky_cat` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `jurado`
--

INSERT INTO `jurado` (`cod_jur`, `ci_jur`, `nom_jur`, `ape_jur`, `dir_jur`, `tel_jur`, `email_jur`, `est_jur`, `fky_cat`) VALUES
(1, '24746048', 'Maria', 'Mejia', 'Cordero', '027697853103', 'kla@hgmail.com', 'A', 1),
(2, '87486954', 'Jula', 'Jaaa', 'kmdkalsmdls', '32204394', 'mfñds@hotmail.com', 'A', 1);

--
-- Disparadores `jurado`
--
DELIMITER $$
CREATE TRIGGER `update_jurado` BEFORE UPDATE ON `jurado` FOR EACH ROW BEGIN

 INSERT INTO log (usu_log,tab_log,acc_log,date_log,reg_log,est_log)
 VALUES (CURRENT_USER,'jurado','Modificar - Data Anterior',NOW(),CONCAT('Codigo Jurado: ',OLD.cod_jur,' Cedula Jurado: ', OLD.ci_jur, " Nombre Jurado: ", OLD.nom_jur, " Apellido Jurado: ",OLD.ape_jur, " Direccion: ",OLD.dir_jur," Telefono Jurado: ",OLD.tel_jur, " Email Jurado: ", OLD.email_jur, " Ocupacion: ",OLD.est_jur, " Categoria Jurado: ", OLD.fky_cat),'A');

END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `log`
--

CREATE TABLE `log` (
  `cod_log` int(11) NOT NULL,
  `usu_log` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `tab_log` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `acc_log` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `reg_log` blob NOT NULL,
  `date_log` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `est_log` varchar(1) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `log`
--

INSERT INTO `log` (`cod_log`, `usu_log`, `tab_log`, `acc_log`, `reg_log`, `date_log`, `est_log`) VALUES
(48, 'admin', 'categoria', 'Modificar - Data Anterior', 0x4e6f6d6272652043617465676f7269613a204d69737361612045737461646f2043617465676f7269613a2041, '2019-07-13 17:06:16', 'A'),
(49, 'admin', 'categoria', 'Modificar - Data Nueva', 0x5550444154452063617465676f72696120534554206e6f6d5f6361743d274d697373272c206573745f6361743d27412720574845524520636f645f636174203d2032, '2019-07-13 17:06:20', 'A');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `municipio`
--

CREATE TABLE `municipio` (
  `cod_mun` int(11) NOT NULL,
  `nom_mun` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `est_mun` char(1) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `municipio`
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
-- Estructura de tabla para la tabla `pregunta`
--

CREATE TABLE `pregunta` (
  `cod_pre` int(11) NOT NULL,
  `pre_pre` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `est_pre` char(1) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `pregunta`
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
-- Estructura de tabla para la tabla `profesor`
--

CREATE TABLE `profesor` (
  `cod_pro` int(11) NOT NULL,
  `ci_pro` varchar(8) COLLATE utf8_spanish_ci NOT NULL,
  `nom_pro` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `ape_pro` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `dir_pro` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `tel_pro` varchar(12) COLLATE utf8_spanish_ci NOT NULL,
  `email_pro` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `est_pro` char(1) COLLATE utf8_spanish_ci NOT NULL,
  `fky_cla` int(11) NOT NULL,
  `fky_cat` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `profesor`
--

INSERT INTO `profesor` (`cod_pro`, `ci_pro`, `nom_pro`, `ape_pro`, `dir_pro`, `tel_pro`, `email_pro`, `est_pro`, `fky_cla`, `fky_cat`) VALUES
(1, '24743016', 'Paula', 'Mola', 'Cordero', '042618725464', 'johara@hotmail.com', 'A', 1, 1),
(3, '58956216', 'Jonas', 'Joel', 'Cordero', '019874854148', 'jona@hotmail.com', 'A', 1, 1),
(4, '37493284', 'KMSLKAMD', 'LMSALKDMASÑ', 'DKM,ÑSFKMSA', '3203103610', 'JSM@hotmail.com', 'A', 7, 2);

--
-- Disparadores `profesor`
--
DELIMITER $$
CREATE TRIGGER `update_profesor` BEFORE UPDATE ON `profesor` FOR EACH ROW BEGIN

 INSERT INTO log (usu_log,tab_log,acc_log,date_log,reg_log,est_log)
 VALUES (CURRENT_USER,'profesor','Modificar - Data Anterior',NOW(),CONCAT('Codigo Profesor: ',OLD.cod_pro,' Cedula Profesor: ', OLD.ci_pro, " Nombre Profesor: ", OLD.nom_pro, " Apellido Profesor: ",OLD.ape_pro, " Direccion Profesor: ",OLD.dir_pro, " Telefono Profesor: ",OLD.tel_pro, " Email Profesor: ", OLD.email_pro, " Estado Profesor: ",OLD.est_pro, " Clase Profesor: ", OLD.fky_cla, " Categoria Profesor: ", OLD.fky_cat),'A');

END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `semana`
--

CREATE TABLE `semana` (
  `cod_sem` int(11) NOT NULL,
  `num_sem` varchar(2) COLLATE utf8_spanish_ci NOT NULL,
  `est_sem` char(1) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `semana`
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
-- Estructura de tabla para la tabla `sesion`
--

CREATE TABLE `sesion` (
  `cod_ses` int(11) NOT NULL,
  `usu_ses` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `niv_ses` varchar(20) COLLATE utf8_spanish_ci NOT NULL,
  `ip_ses` int(20) NOT NULL,
  `mac_ses` int(18) NOT NULL,
  `date_ses` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `est_ses` varchar(1) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `sesion`
--

INSERT INTO `sesion` (`cod_ses`, `usu_ses`, `niv_ses`, `ip_ses`, `mac_ses`, `date_ses`, `est_ses`) VALUES
(83, 'admin', 'Administrador', 0, 0, '2019-07-11 10:00:06', 'A'),
(84, 'admin', 'Administrador', 0, 0, '2019-07-11 19:54:56', 'A'),
(85, 'admin', 'Administrador', 0, 0, '2019-07-13 15:36:09', 'A'),
(86, 'admin', 'Administrador', 192168, 70, '2019-07-13 20:52:28', 'A'),
(87, 'admin', 'Administrador', 192168, 70, '2019-07-13 21:19:19', 'A'),
(88, 'admin', 'Administrador', 192168, 70, '2019-07-13 21:19:41', 'A'),
(89, 'admin', 'Administrador', 192168, 70, '2019-07-13 21:21:17', 'A'),
(90, 'admin', 'Administrador', 192168, 70, '2019-07-13 21:23:24', 'A');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id_usu` int(11) NOT NULL,
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
  `est_usu` char(1) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id_usu`, `nom_usu`, `cla_usu`, `email_usu`, `fky_pre_1`, `res_pre_1`, `fky_pre_2`, `res_pre_2`, `niv_usu`, `ip_usu`, `mac_usu`, `est_usu`) VALUES
(1, 'admin', '1234', 'admin@gmail.com', 1, 'Dolar', 6, 'Coldplay', 'Administrador', '192.168.1.104', '70:f1:a1:87:75:50', 'A'),
(2, 'user', '4321', 'user@gmail.com', 1, 'Dolar', 2, 'Azul', 'Usuario', '', '', 'A'),
(3, 'mayel', 'mayel', 'mayel@gmail.com', 1, '1', 2, '2', 'Administrador', '', '', 'A'),
(4, 'test', 'test', 'test@gmail.com', 1, 'test', 2, 'test', 'Auditor', '', '', 'A'),
(5, 'johana', 'fev', 'test2', 2, 'dev', 3, 'dev', 'Administrador', '', '', 'A'),
(6, 'yes', 'yes', 'yes@hotmail.com', 1, 'yes', 2, 'yes', 'Administrador', '', '', 'A');

--
-- Disparadores `usuario`
--
DELIMITER $$
CREATE TRIGGER `update_usuario` BEFORE UPDATE ON `usuario` FOR EACH ROW BEGIN

 INSERT INTO log (usu_log,tab_log,acc_log,date_log,reg_log,est_log)
 VALUES (CURRENT_USER,'usuario','Modificar - Data Anterior',NOW(),CONCAT('Cosido Usuario: ',OLD.id_usu," Nombre Usuario: ", OLD.nom_usu, " Clave Usuario: ",OLD.cla_usu, " Email Usuario: ",OLD.email_usu, " Pregunta 1: ",OLD.fky_pre_1, " Respuesta 1: ", OLD.res_pre_1, " Pregunta 2 : ",OLD.fky_pre_2, " Respuesta 2: ", OLD.res_pre_2, " Nivel Usuario: ", OLD.niv_usu, " Ip Usuario: ", OLD.ip_usu, " Mac Usuario: ",OLD.mac_usu, " Estado Usuario: ",OLD.est_usu),'A');

END
$$
DELIMITER ;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `calificacion`
--
ALTER TABLE `calificacion`
  ADD PRIMARY KEY (`cod_cal`),
  ADD KEY `fky_can` (`fky_can`),
  ADD KEY `fky_pro` (`fky_pro`),
  ADD KEY `fky_cla` (`fky_cla`);

--
-- Indices de la tabla `candidata`
--
ALTER TABLE `candidata`
  ADD PRIMARY KEY (`cod_can`),
  ADD UNIQUE KEY `ci_can` (`ci_can`),
  ADD KEY `fky_cat` (`fky_cat`),
  ADD KEY `fky_mun` (`fky_mun`),
  ADD KEY `fky_civ` (`fky_civ`),
  ADD KEY `fky_cer` (`fky_cer`);

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`cod_cat`);

--
-- Indices de la tabla `certamen`
--
ALTER TABLE `certamen`
  ADD PRIMARY KEY (`cod_cer`);

--
-- Indices de la tabla `civil`
--
ALTER TABLE `civil`
  ADD PRIMARY KEY (`cod_civ`);

--
-- Indices de la tabla `clase`
--
ALTER TABLE `clase`
  ADD PRIMARY KEY (`cod_cla`);

--
-- Indices de la tabla `elementos`
--
ALTER TABLE `elementos`
  ADD PRIMARY KEY (`id_elem`),
  ADD KEY `fky_usuario` (`fky_usuario`);

--
-- Indices de la tabla `jurado`
--
ALTER TABLE `jurado`
  ADD PRIMARY KEY (`cod_jur`),
  ADD UNIQUE KEY `ci_jur` (`ci_jur`),
  ADD KEY `fky_cat` (`fky_cat`);

--
-- Indices de la tabla `log`
--
ALTER TABLE `log`
  ADD PRIMARY KEY (`cod_log`);

--
-- Indices de la tabla `municipio`
--
ALTER TABLE `municipio`
  ADD PRIMARY KEY (`cod_mun`);

--
-- Indices de la tabla `pregunta`
--
ALTER TABLE `pregunta`
  ADD PRIMARY KEY (`cod_pre`);

--
-- Indices de la tabla `profesor`
--
ALTER TABLE `profesor`
  ADD PRIMARY KEY (`cod_pro`),
  ADD UNIQUE KEY `ci_pro` (`ci_pro`),
  ADD KEY `fky_cat` (`fky_cat`),
  ADD KEY `fky_cla` (`fky_cla`);

--
-- Indices de la tabla `semana`
--
ALTER TABLE `semana`
  ADD PRIMARY KEY (`cod_sem`);

--
-- Indices de la tabla `sesion`
--
ALTER TABLE `sesion`
  ADD PRIMARY KEY (`cod_ses`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usu`),
  ADD UNIQUE KEY `nom_usu` (`nom_usu`),
  ADD KEY `fky_pre_1` (`fky_pre_1`),
  ADD KEY `fky_pre_2` (`fky_pre_2`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `calificacion`
--
ALTER TABLE `calificacion`
  MODIFY `cod_cal` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `candidata`
--
ALTER TABLE `candidata`
  MODIFY `cod_can` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `cod_cat` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `certamen`
--
ALTER TABLE `certamen`
  MODIFY `cod_cer` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `civil`
--
ALTER TABLE `civil`
  MODIFY `cod_civ` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `clase`
--
ALTER TABLE `clase`
  MODIFY `cod_cla` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `elementos`
--
ALTER TABLE `elementos`
  MODIFY `id_elem` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `jurado`
--
ALTER TABLE `jurado`
  MODIFY `cod_jur` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `log`
--
ALTER TABLE `log`
  MODIFY `cod_log` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT de la tabla `municipio`
--
ALTER TABLE `municipio`
  MODIFY `cod_mun` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT de la tabla `pregunta`
--
ALTER TABLE `pregunta`
  MODIFY `cod_pre` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `profesor`
--
ALTER TABLE `profesor`
  MODIFY `cod_pro` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `semana`
--
ALTER TABLE `semana`
  MODIFY `cod_sem` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT de la tabla `sesion`
--
ALTER TABLE `sesion`
  MODIFY `cod_ses` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=91;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usu` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `calificacion`
--
ALTER TABLE `calificacion`
  ADD CONSTRAINT `calificacion_ibfk_1` FOREIGN KEY (`fky_can`) REFERENCES `candidata` (`cod_can`),
  ADD CONSTRAINT `calificacion_ibfk_2` FOREIGN KEY (`fky_pro`) REFERENCES `profesor` (`cod_pro`),
  ADD CONSTRAINT `calificacion_ibfk_3` FOREIGN KEY (`fky_cla`) REFERENCES `clase` (`cod_cla`);

--
-- Filtros para la tabla `candidata`
--
ALTER TABLE `candidata`
  ADD CONSTRAINT `candidata_ibfk_1` FOREIGN KEY (`fky_cat`) REFERENCES `categoria` (`cod_cat`),
  ADD CONSTRAINT `candidata_ibfk_2` FOREIGN KEY (`fky_mun`) REFERENCES `municipio` (`cod_mun`),
  ADD CONSTRAINT `candidata_ibfk_3` FOREIGN KEY (`fky_civ`) REFERENCES `civil` (`cod_civ`),
  ADD CONSTRAINT `candidata_ibfk_4` FOREIGN KEY (`fky_cer`) REFERENCES `certamen` (`cod_cer`);

--
-- Filtros para la tabla `elementos`
--
ALTER TABLE `elementos`
  ADD CONSTRAINT `elementos_ibfk_1` FOREIGN KEY (`fky_usuario`) REFERENCES `usuario` (`id_usu`);

--
-- Filtros para la tabla `jurado`
--
ALTER TABLE `jurado`
  ADD CONSTRAINT `jurado_ibfk_1` FOREIGN KEY (`fky_cat`) REFERENCES `categoria` (`cod_cat`);

--
-- Filtros para la tabla `profesor`
--
ALTER TABLE `profesor`
  ADD CONSTRAINT `profesor_ibfk_1` FOREIGN KEY (`fky_cat`) REFERENCES `categoria` (`cod_cat`),
  ADD CONSTRAINT `profesor_ibfk_2` FOREIGN KEY (`fky_cla`) REFERENCES `clase` (`cod_cla`);

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`fky_pre_1`) REFERENCES `pregunta` (`cod_pre`),
  ADD CONSTRAINT `usuario_ibfk_2` FOREIGN KEY (`fky_pre_2`) REFERENCES `pregunta` (`cod_pre`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
