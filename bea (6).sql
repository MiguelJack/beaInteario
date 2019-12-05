-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-04-2018 a las 08:25:50
-- Versión del servidor: 10.1.30-MariaDB
-- Versión de PHP: 7.2.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bea`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `agregarBus` (IN `pPlaca` VARCHAR(10), IN `pNombre` VARCHAR(20), IN `pID_Empresa` INT(11))  BEGIN
	INSERT INTO bus (Placa,Nombre,ID_Empresa) VALUES (pPlaca,pNombre,pID_Empresa);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `agregarComponente` (IN `pCod` VARCHAR(40), IN `pEstado` VARCHAR(20), IN `pFechaRegistro` VARCHAR(40), IN `pLote` VARCHAR(20), IN `pTipoComponente` INT(3), IN `pIMEI` VARCHAR(40))  NO SQL
BEGIN
	INSERT INTO componentes (cod,estado,fechaRegistro,lote,tipo_componente,IMEI) VALUES (pCod,pEstado,pFechaRegistro,pLote,pTipoComponente,pIMEI);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `agregarEmpresa` (IN `pNombre` VARCHAR(50), IN `pTelefono` VARCHAR(15), IN `pCorreo` VARCHAR(45), IN `pDireccion` VARCHAR(200))  BEGIN
	INSERT INTO empresa (Nombre,Telefono,Correo,Direccion) VALUES (pNombre,pTelefono,pCorreo,pDireccion);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `agregarSim` (IN `pNumeroTelefono` INT(10), IN `pFecha` VARCHAR(40), IN `pEstado` VARCHAR(20), IN `pPin` INT(6), IN `pPuk` INT(20), IN `pCodigo` VARCHAR(30))  NO SQL
BEGIN
	INSERT INTO sim (numeroTelefono,pin,puk,codigo,fechaRegistro,Estado) 
    VALUES (pNumeroTelefono,pPin,pPuk,pCodigo,pFecha,pEstado);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `agregarUsuario` (IN `pNombre` VARCHAR(45), IN `pApellido1` VARCHAR(45), IN `pApellido2` VARCHAR(45), IN `pUser` VARCHAR(45), IN `pPass` VARCHAR(45), IN `pTelefono` VARCHAR(45), IN `pCorreo` VARCHAR(45))  NO SQL
BEGIN
	INSERT INTO usuario (user,password,nombre,apellido1,apellido2,correo,telefono,idTipoUsuario) 
    VALUES (pUser,pPass,pNombre,pApellido1,pApellido2,pCorreo,pTelefono,0);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `cargarBus` (IN `pPlaca` INT)  BEGIN
	SELECT * FROM bus WHERE Placa=pPlaca;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `cargarBuses` ()  BEGIN
	SELECT * FROM bus;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `cargarEmpresa` (IN `pID` INT)  BEGIN
	SELECT * FROM empresa WHERE ID = pID;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `cargarEmpresas` ()  BEGIN
	SELECT * FROM empresa;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `cargarTiposComponente` ()  NO SQL
BEGIN
	SELECT * FROM tipo_componente;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `editarBus` (IN `pPlaca` VARCHAR(10), IN `pNombre` VARCHAR(20), IN `pID_Empresa` INT(11))  BEGIN
	UPDATE bus SET Nombre=pNombre,ID_Empresa=pID_Empresa WHERE Placa=pPlaca;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `editarComponente` (IN `pCod` VARCHAR(40), IN `pEstado` VARCHAR(20), IN `pFechaRegistro` VARCHAR(40), IN `pLote` VARCHAR(20), IN `pTipoComponente` INT(3), IN `pIMEI` VARCHAR(40))  NO SQL
BEGIN
	UPDATE componentes SET Estado=pEstado,fechaRegistro=pFechaRegistro, IMEI=pIMEI,lote=pLote,tipo_componente = pTipoComponente WHERE cod=pCod;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `editarEmpresa` (IN `pID` INT, IN `pNombre` VARCHAR(20), IN `pTelefono` VARCHAR(15), IN `pCorreo` VARCHAR(45), IN `pDireccion` VARCHAR(200))  BEGIN
	UPDATE empresa SET Nombre=pNombre,Telefono=pTelefono,Correo=pCorreo,Direccion=pDireccion WHERE ID=pID;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `editarSim` (IN `pNumeroTelefono` INT(10), IN `pPin` INT(6), IN `pPuk` INT(20), IN `pCodigo` VARCHAR(30), IN `pFechaRegistro` VARCHAR(40), IN `pEstado` VARCHAR(20))  NO SQL
BEGIN
	UPDATE sim SET
numeroTelefono = pNumeroTelefono, pin = pPin, puk = pPuk, codigo = pCodigo, fechaRegistro = pFechaRegistro, Estado = pEstado
	WHERE numeroTelefono = pNumeroTelefono;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `eliminarComponente` (IN `pCod` VARCHAR(40))  NO SQL
DELETE FROM componentes WHERE cod = pCod$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `eliminarSim` (IN `pNumeroTelefono` INT(10))  NO SQL
DELETE FROM sim WHERE numeroTelefono = pNumeroTelefono$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `filtrarBuses` (IN `pID_Empresa` INT(11))  NO SQL
BEGIN
	SELECT * FROM bus WHERE ID_Empresa=pID_Empresa;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `hacerAdmin` (IN `pUser` VARCHAR(45))  NO SQL
BEGIN
	UPDATE usuario SET idTipoUsuario=1 WHERE user=pUser; 
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `obtenerPass` (IN `pUser` VARCHAR(45))  NO SQL
BEGIN
	SELECT user FROM usuario WHERE user=pUser AND password=pPass;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `quitarAdmin` (IN `pUser` VARCHAR(45))  NO SQL
BEGIN
	UPDATE usuario SET idTipoUsuario=0 WHERE user=pUser;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `revisarExistenciaComponente` (IN `pComponenteCod` VARCHAR(40))  NO SQL
BEGIN
	SELECT count(*) from componentes where cod = pComponenteCod;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `barra`
--

CREATE TABLE `barra` (
  `serie` varchar(40) NOT NULL,
  `PRO1` varchar(40) DEFAULT NULL,
  `PRO2` varchar(40) DEFAULT NULL,
  `Antena` varchar(40) DEFAULT NULL,
  `Radio` varchar(40) DEFAULT NULL,
  `MODEM` varchar(40) DEFAULT NULL,
  `MAX1` varchar(40) DEFAULT NULL,
  `MAX2` varchar(40) DEFAULT NULL,
  `8K` varchar(40) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `bus`
--

CREATE TABLE `bus` (
  `Placa` varchar(10) NOT NULL,
  `Nombre` varchar(20) DEFAULT NULL,
  `ID_Empresa` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `bus`
--

INSERT INTO `bus` (`Placa`, `Nombre`, `ID_Empresa`) VALUES
('0', 'unidad 15', 1),
('123', 'chenco', 1),
('1245', 'unidad 1', 1),
('23', 'unidad 5', 1),
('aa', '12', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `componentes`
--

CREATE TABLE `componentes` (
  `cod` varchar(40) NOT NULL,
  `tipo_componente` int(3) NOT NULL,
  `lote` varchar(20) NOT NULL,
  `fechaRegistro` varchar(40) NOT NULL,
  `Estado` varchar(20) NOT NULL,
  `IMEI` varchar(40) NOT NULL,
  `claveCorta` int(8) DEFAULT NULL,
  `claveLarga` int(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `componentes`
--

INSERT INTO `componentes` (`cod`, `tipo_componente`, `lote`, `fechaRegistro`, `Estado`, `IMEI`, `claveCorta`, `claveLarga`) VALUES
('attx1234', 8, '124', '04/04/2018', 'Bueno', '', NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `componentexbarra`
--

CREATE TABLE `componentexbarra` (
  `id` int(8) NOT NULL,
  `pos` int(2) NOT NULL,
  `componenteCod` varchar(40) NOT NULL,
  `barraSerie` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empresa`
--

CREATE TABLE `empresa` (
  `ID` int(11) NOT NULL,
  `Nombre` varchar(50) NOT NULL,
  `Telefono` varchar(15) DEFAULT NULL,
  `Correo` varchar(45) DEFAULT NULL,
  `Direccion` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `empresa`
--

INSERT INTO `empresa` (`ID`, `Nombre`, `Telefono`, `Correo`, `Direccion`) VALUES
(1, 'Autovisa', '456815435', 'correo@autovisa.com', 'Heredia'),
(2, 'asd', '1561', 'da', 'asdf'),
(3, 'Biusa', '85218961', 'Biusa', 'Direccion');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `kit`
--

CREATE TABLE `kit` (
  `codigoKit` varchar(20) NOT NULL,
  `TX1` varchar(40) NOT NULL,
  `RX1` varchar(40) NOT NULL,
  `RX3` varchar(40) NOT NULL,
  `TX3` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sim`
--

CREATE TABLE `sim` (
  `numeroTelefono` int(10) NOT NULL,
  `pin` int(6) NOT NULL,
  `puk` int(20) NOT NULL,
  `codigo` varchar(30) NOT NULL,
  `fechaRegistro` varchar(40) NOT NULL,
  `Estado` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `sim`
--

INSERT INTO `sim` (`numeroTelefono`, `pin`, `puk`, `codigo`, `fechaRegistro`, `Estado`) VALUES
(85159456, 4354, 2147483647, 'C15684598', '04/04/2018', 'Bueno'),
(86391114, 6518, 2147483647, 'A132412341234', '17/04/2018', 'Bueno');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_componente`
--

CREATE TABLE `tipo_componente` (
  `id` int(3) NOT NULL,
  `codigo` varchar(20) NOT NULL,
  `nombre` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tipo_componente`
--

INSERT INTO `tipo_componente` (`id`, `codigo`, `nombre`) VALUES
(0, 'AANTBEA', 'Antena'),
(2, 'ATCENCARG', 'Centro Carga'),
(3, 'ATCPURX', 'TAR'),
(4, 'ATCPUTX', '8KTX'),
(5, 'ATFILTRO', 'Filtro'),
(6, 'ATRADIOSMT', 'Radio'),
(7, 'ATRXD', 'DUPLEX'),
(8, 'ATTX', 'PRO'),
(13, 'MOD', 'MODEM'),
(14, 'TBEA', 'MAX');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_usuario`
--

CREATE TABLE `tipo_usuario` (
  `idTipoUsuario` int(11) NOT NULL,
  `tipo` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tipo_usuario`
--

INSERT INTO `tipo_usuario` (`idTipoUsuario`, `tipo`) VALUES
(0, 'Tecnico'),
(1, 'Administrador');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `user` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `apellido1` varchar(45) NOT NULL,
  `apellido2` varchar(45) NOT NULL,
  `correo` varchar(45) DEFAULT NULL,
  `telefono` varchar(45) DEFAULT NULL,
  `idTipoUsuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`user`, `password`, `nombre`, `apellido1`, `apellido2`, `correo`, `telefono`, `idTipoUsuario`) VALUES
('admin', 'admin', 'admin', 'admin', 'admin', NULL, NULL, 1),
('dlamb', 'dlamb', 'Daniel', 'Cordero', 'Leonhardes', 'daniel.cordero.leonhardes@gmail.com', '8888-5555', 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `barra`
--
ALTER TABLE `barra`
  ADD PRIMARY KEY (`serie`),
  ADD KEY `PRO1` (`PRO1`,`PRO2`,`Antena`,`Radio`,`MODEM`,`MAX1`,`MAX2`,`8K`),
  ADD KEY `PRO2` (`PRO2`),
  ADD KEY `Antena` (`Antena`),
  ADD KEY `Radio` (`Radio`),
  ADD KEY `MODEM` (`MODEM`),
  ADD KEY `MAX1` (`MAX1`),
  ADD KEY `MAX2` (`MAX2`),
  ADD KEY `8K` (`8K`);

--
-- Indices de la tabla `bus`
--
ALTER TABLE `bus`
  ADD PRIMARY KEY (`Placa`),
  ADD KEY `ID_Empresa` (`ID_Empresa`);

--
-- Indices de la tabla `componentes`
--
ALTER TABLE `componentes`
  ADD PRIMARY KEY (`cod`),
  ADD KEY `tipo_componente` (`tipo_componente`);

--
-- Indices de la tabla `componentexbarra`
--
ALTER TABLE `componentexbarra`
  ADD PRIMARY KEY (`id`),
  ADD KEY `componenteCod` (`componenteCod`,`barraSerie`),
  ADD KEY `barraSerie` (`barraSerie`);

--
-- Indices de la tabla `empresa`
--
ALTER TABLE `empresa`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `Nombre_UNIQUE` (`Nombre`);

--
-- Indices de la tabla `kit`
--
ALTER TABLE `kit`
  ADD PRIMARY KEY (`codigoKit`),
  ADD KEY `TX1` (`TX1`,`RX1`,`RX3`,`TX3`),
  ADD KEY `TX3` (`TX3`),
  ADD KEY `RX3` (`RX3`),
  ADD KEY `RX1` (`RX1`);

--
-- Indices de la tabla `sim`
--
ALTER TABLE `sim`
  ADD PRIMARY KEY (`numeroTelefono`);

--
-- Indices de la tabla `tipo_componente`
--
ALTER TABLE `tipo_componente`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tipo_usuario`
--
ALTER TABLE `tipo_usuario`
  ADD PRIMARY KEY (`idTipoUsuario`),
  ADD UNIQUE KEY `idTipoUsuario_UNIQUE` (`idTipoUsuario`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`user`),
  ADD UNIQUE KEY `user_UNIQUE` (`user`),
  ADD KEY `usuarioxtipousuario_idx` (`idTipoUsuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `componentexbarra`
--
ALTER TABLE `componentexbarra`
  MODIFY `id` int(8) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `empresa`
--
ALTER TABLE `empresa`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tipo_usuario`
--
ALTER TABLE `tipo_usuario`
  MODIFY `idTipoUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `bus`
--
ALTER TABLE `bus`
  ADD CONSTRAINT `bus_ibfk_1` FOREIGN KEY (`ID_Empresa`) REFERENCES `empresa` (`ID`);

--
-- Filtros para la tabla `componentes`
--
ALTER TABLE `componentes`
  ADD CONSTRAINT `componentes_ibfk_1` FOREIGN KEY (`tipo_componente`) REFERENCES `tipo_componente` (`id`);

--
-- Filtros para la tabla `componentexbarra`
--
ALTER TABLE `componentexbarra`
  ADD CONSTRAINT `componentexbarra_ibfk_1` FOREIGN KEY (`componenteCod`) REFERENCES `componentes` (`cod`),
  ADD CONSTRAINT `componentexbarra_ibfk_2` FOREIGN KEY (`barraSerie`) REFERENCES `barra` (`serie`);

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `usuarioxtipousuario` FOREIGN KEY (`idTipoUsuario`) REFERENCES `tipo_usuario` (`idTipoUsuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
