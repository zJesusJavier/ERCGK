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
(1, '24743016', 'Johara', 'Pabon', 55, 156, 'TSU', 23, 'Tariba', '02763958784', 'joharap_22@hotmail.com', '2019-03-04', 'A', 1, 5, 1, 1),
(2, '24780688', 'Laura', 'Mora', 57, 169, 'Lic', 25, 'Tariba', '04268971235', 'laura@gmail.com', '2019-03-12', 'A', 2, 1, 1, 1);

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
(3, 'Srita Hermosa', '2019-02-01', '2019-02-04', 'A');

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
(2, 2, 0, 0, 1, 0, 0, 'A'),
(3, 4, 1, 1, 1, 1, 1, 'A'),
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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `log`
--

CREATE TABLE `log` (
  `cod_log` int(11) NOT NULL,
  `usu_log` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `tab_log` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `acc_log` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `reg_log` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `date_log` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `est_log` varchar(1) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `log`
--

INSERT INTO `log` (`cod_log`, `usu_log`, `tab_log`, `acc_log`, `reg_log`, `date_log`, `est_log`) VALUES
(1, 'admin', 'Usuario', 'Registro', 'mayel', '2019-02-21 00:04:36', 'A'),
(2, 'admin', 'Usuario', 'Registro', 'Johara', '2019-02-20 22:50:17', 'A'),
(3, 'admin', 'Usuario', 'Registro', 'test', '2019-02-23 17:21:37', 'A'),
(4, 'admin', 'Usuario', 'Registro', 'mina', '2019-02-23 17:36:21', 'A'),
(5, 'admin', 'Usuario', 'Registro', 'test2', '2019-02-23 18:01:35', 'A'),
(6, 'admin', 'Usuario', 'Registro', 'test', '2019-02-24 15:27:31', 'A'),
(7, 'admin', 'Usuario', 'Registro', 'testing', '2019-02-24 15:56:10', 'A'),
(8, 'admin', 'Certamen', 'Registro', 'Srita Hermosa', '2019-02-24 16:12:40', 'A'),
(9, 'admin', 'Usuario', 'Registro', 'test', '2019-02-26 22:00:22', 'A'),
(10, 'admin', 'Usuario', 'Registro', 'dev', '2019-02-26 22:03:53', 'A'),
(11, 'admin', 'Usuario', 'Registro', 'yes', '2019-02-27 01:53:57', 'A'),
(12, 'admin', 'Candidata', 'Registro', '24743016', '2019-03-09 19:41:08', 'A'),
(13, 'admin', 'Certamen', 'Borrado', '2', '2019-03-09 19:42:22', 'A'),
(14, 'admin', 'Candidata', 'Registro', '24780688', '2019-03-09 19:45:55', 'A');

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
  `date_ses` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `est_ses` varchar(1) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `sesion`
--

INSERT INTO `sesion` (`cod_ses`, `usu_ses`, `niv_ses`, `date_ses`, `est_ses`) VALUES
(1, 'admin', 'Administrador', '2019-02-21 00:04:38', 'A'),
(2, 'admin', 'Administrador', '2019-02-21 00:04:38', 'A'),
(3, 'mayel', 'Administrador', '2019-02-21 00:04:38', 'A'),
(4, 'admin', 'Administrador', '2019-02-21 00:04:38', 'A'),
(5, 'admin', 'Administrador', '2019-02-21 00:04:38', 'A'),
(6, 'admin', 'Administrador', '2019-02-20 20:54:07', 'A'),
(7, 'admin', 'Administrador', '2019-02-23 10:08:06', 'A'),
(8, 'admin', 'Administrador', '2019-02-23 11:47:31', 'A'),
(9, 'admin', 'Administrador', '2019-02-23 13:45:04', 'A'),
(10, 'admin', 'Administrador', '2019-02-23 19:18:21', 'A'),
(11, 'admin', 'Administrador', '2019-02-24 12:21:27', 'A'),
(12, 'admin', 'Administrador', '2019-02-24 12:45:52', 'A'),
(13, 'admin', 'Administrador', '2019-02-24 12:50:32', 'A'),
(14, 'admin', 'Administrador', '2019-02-24 12:55:05', 'A'),
(15, 'admin', 'Administrador', '2019-02-24 14:08:05', 'A'),
(16, 'admin', 'Administrador', '2019-02-24 14:20:05', 'A'),
(17, 'admin', 'Administrador', '2019-02-24 14:23:05', 'A'),
(18, 'admin', 'Administrador', '2019-02-24 15:18:50', 'A'),
(19, 'admin', 'Administrador', '2019-02-24 15:32:16', 'A'),
(20, 'admin', 'Administrador', '2019-02-24 15:48:30', 'A'),
(21, 'admin', 'Administrador', '2019-02-24 15:52:01', 'A'),
(22, 'admin', 'Administrador', '2019-02-24 20:58:06', 'A'),
(23, 'admin', 'Administrador', '2019-02-24 23:11:05', 'A'),
(24, 'admin', 'Administrador', '2019-02-24 23:14:09', 'A'),
(25, 'admin', 'Administrador', '2019-02-24 23:19:42', 'A'),
(26, 'admin', 'Administrador', '2019-02-24 23:21:25', 'A'),
(27, 'admin', 'Administrador', '2019-02-24 23:24:41', 'A'),
(28, 'admin', 'Administrador', '2019-02-24 23:28:26', 'A'),
(29, 'admin', 'Administrador', '2019-02-24 23:30:56', 'A'),
(30, 'admin', 'Administrador', '2019-02-25 00:10:40', 'A'),
(31, 'user', 'Usuario', '2019-02-25 00:26:15', 'A'),
(32, 'user', 'Usuario', '2019-02-25 00:32:08', 'A'),
(33, 'user', 'Usuario', '2019-02-25 00:32:22', 'A'),
(34, 'user', 'Usuario', '2019-02-25 00:34:29', 'A'),
(35, 'user', 'Usuario', '2019-02-25 00:36:30', 'A'),
(36, 'user', 'Usuario', '2019-02-25 00:48:34', 'A'),
(37, 'user', 'Usuario', '2019-02-25 00:49:32', 'A'),
(38, 'user', 'Usuario', '2019-02-25 00:51:40', 'A'),
(39, 'user', 'Usuario', '2019-02-25 00:53:34', 'A'),
(40, 'admin', 'Administrador', '2019-02-25 00:53:49', 'A'),
(41, 'admin', 'Administrador', '2019-02-25 00:54:58', 'A'),
(42, 'admin', 'Administrador', '2019-02-26 20:13:34', 'A'),
(43, 'admin', 'Administrador', '2019-02-26 23:25:06', 'A'),
(44, 'admin', 'Administrador', '2019-02-26 23:29:10', 'A'),
(45, 'admin', 'Administrador', '2019-02-26 23:30:41', 'A'),
(46, 'admin', 'Administrador', '2019-02-26 23:35:07', 'A'),
(47, 'admin', 'Administrador', '2019-02-26 23:54:51', 'A'),
(48, 'admin', 'Administrador', '2019-02-27 00:09:54', 'A'),
(49, 'admin', 'Administrador', '2019-02-27 01:08:34', 'A'),
(50, 'admin', 'Administrador', '2019-02-27 01:09:54', 'A'),
(51, 'admin', 'Administrador', '2019-02-27 01:31:06', 'A'),
(52, 'admin', 'Administrador', '2019-03-09 19:39:17', 'A'),
(53, 'admin', 'Administrador', '2019-03-09 19:43:50', 'A'),
(54, 'admin', 'Administrador', '2019-03-09 19:58:00', 'A'),
(55, 'admin', 'Administrador', '2019-03-09 20:19:43', 'A'),
(56, 'admin', 'Administrador', '2019-03-09 20:40:16', 'A'),
(57, 'admin', 'Administrador', '2019-03-09 20:55:01', 'A'),
(58, 'admin', 'Administrador', '2019-03-09 20:56:33', 'A');

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
  `est_usu` char(1) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id_usu`, `nom_usu`, `cla_usu`, `email_usu`, `fky_pre_1`, `res_pre_1`, `fky_pre_2`, `res_pre_2`, `niv_usu`, `est_usu`) VALUES
(1, 'admin', '1234', 'admin@gmail.com', 1, 'Dolar', 6, 'Coldplay', 'Administrador', 'A'),
(2, 'user', '4321', 'user@gmail.com', 1, 'Dolar', 2, 'Azul', 'Usuario', 'A'),
(3, 'mayel', 'mayel', 'mayel@gmail.com', 1, '1', 2, '2', 'Administrador', 'A'),
(4, 'test', 'test', 'test@gmail.com', 1, 'test', 2, 'test', 'Administrador', 'A'),
(5, 'johana', 'fev', 'test2', 2, 'dev', 3, 'dev', 'Administrador', 'A'),
(6, 'yes', 'yes', 'yes@hotmail.com', 1, 'yes', 2, 'yes', 'Administrador', 'A');

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
  MODIFY `cod_cal` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `candidata`
--
ALTER TABLE `candidata`
  MODIFY `cod_can` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `cod_cat` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `certamen`
--
ALTER TABLE `certamen`
  MODIFY `cod_cer` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
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
  MODIFY `cod_jur` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `log`
--
ALTER TABLE `log`
  MODIFY `cod_log` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
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
  MODIFY `cod_pro` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `semana`
--
ALTER TABLE `semana`
  MODIFY `cod_sem` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
--
-- AUTO_INCREMENT de la tabla `sesion`
--
ALTER TABLE `sesion`
  MODIFY `cod_ses` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;
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

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
