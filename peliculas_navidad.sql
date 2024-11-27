-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 27-11-2024 a las 06:37:39
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `peliculas_navidad`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `peliculas`
--

CREATE TABLE `peliculas` (
  `id` int(11) NOT NULL,
  `titulo` varchar(255) NOT NULL COMMENT 'Nombre de la película.',
  `anio` int(11) DEFAULT NULL COMMENT 'Aquí viene escrito el año de estreno de la película.',
  `director` varchar(255) DEFAULT NULL COMMENT 'Se muestra el nombre de la persona que dirigió la película.',
  `calificacion` decimal(3,1) DEFAULT NULL COMMENT 'Se muestra la calificación de la película según la crítica em base a 10.',
  `subgenero` varchar(100) DEFAULT NULL COMMENT 'En esta se describe el subgénero al que pertenece la película (contando como género principal el que sea navideña).',
  `descripcion` text DEFAULT NULL COMMENT 'Aquí se encuentra la sinópsis de la película.',
  `donde_ver` text NOT NULL COMMENT 'Esta columna contiene los links donde puede encontrar la película.'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `peliculas`
--

INSERT INTO `peliculas` (`id`, `titulo`, `anio`, `director`, `calificacion`, `subgenero`, `descripcion`, `donde_ver`) VALUES
(1, '¡Qué bello es vivir!', 1946, 'Frank Capra', 8.6, 'Drama fantástico', 'Un ángel es enviado desde el Cielo para ayudar a un hombre de negocios desesperadamente frustrado, mostrándole cómo habría sido la vida si él nunca hubiera existido.', '1. Prime Video: https://www.primevideo.com/-/es/detail/Qué-Bello-Es-Vivir/0N8X4062BYX6Z2VSGQAHJUDM5W.\r\n2. Rakuten TV: https://www.rakuten.tv/es/movies/que-bello-es-vivir3. \r\n3. Youtube: https://www.youtube.com/watch?v=rmteddIVIp0'),
(2, 'Milagro en la calle 34', 1947, 'George Seaton', 7.9, 'Comedia familiar', 'Cuando un amable anciano que dice ser Santa Claus es internado como loco, un joven abogado decide defenderlo argumentando en la corte que es el verdadero Santa Claus.', '1. Disney Plus: https://www.disneyplus.com/es-mx/movies/wd/nJfsTMhv4jTu\r\n2. Prime Video: https://www.primevideo.com/-/es/detail/Milagro-en-la-Calle-34/0N0CRCML1B8DZ2VAU9NL6D8M82\r\n3. Apple TV: https://tv.apple.com/mx/movie/milagro-en-la-calle-34/umc.cmc.4jnu36y6m50387i78zpvqo2eb '),
(3, 'Una historia de Navidad', 1983, 'Bob Clark', 7.9, 'Comedia nostálgica', 'En los años 40, un joven llamado Ralphie intenta convencer a sus padres, a su maestro y a Santa Claus de que un rifle de aire comprimido Red Ryder es realmente el regalo perfecto de Navidad.', '1. Apple TV: https://tv.apple.com/es/movie/historias-de-navidad/umc.cmc.7taqrdceohmnxmly00wtq42p?at=1000l3V2&ct=justwatch_tv&itscg=30200&itsct=justwatch_tv&playableId=tvs.sbd.9001%3A713880066\r\n2. Prime Video: https://www.primevideo.com/-/es/detail/0HG0HDSJ1B3PEO2N4THS3N5D4G/ref=atv_dl_rdr?tag=just0a7-21'),
(4, 'Solo en casa', 1990, 'Chris Columbus', 7.6, 'Comedia de aventuras', 'Un niño de ocho años debe proteger su casa de una pareja de ladrones cuando accidentalmente su familia lo deja solo durante las vacaciones de Navidad.', '1. Disney Plus: https://www.disneyplus.com/es-mx/movies/mi-pobre-angelito/3v4vqKPG2jSr\r\n2. Apple TV: https://tv.apple.com/mx/movie/mi-pobre-angelito/umc.cmc.43qg0hbj3zyyum9us4nzbz9x5\r\n3. Prime Video: https://www.primevideo.com/-/es/detail/Mi-Pobre-Angelito/0F70VSURFIWPAWD7VTVFR0D44O'),
(5, 'Elf: El duende', 2003, 'Jon Favreau', 7.0, 'Comedia familiar', 'Después de descubrir que es un humano, un hombre criado como un elfo en el Polo Norte decide viajar a la ciudad de Nueva York para localizar a su padre biológico.', '1. Apple TV: https://tv.apple.com/mx/movie/el-duende/umc.cmc.8or4j9cdl1py7vfj4pk52lmf\r\n2. Prime Video: https://www.primevideo.com/-/es/detail/El-Duende/0J8FRABTO9L6LJE3DVKJ8H9RLE\r\n3. Google Play: https://play.google.com/store/movies/details/Elf?id=DW-VF50QCPA&hl=en-US&pli=1'),
(6, 'El Expreso Polar', 2004, 'Robert Zemeckis', 6.6, 'Animación de aventuras', 'En la víspera de Navidad, un niño se embarca en una aventura mágica al Polo Norte en el Expreso Polar, aprendiendo sobre la amistad, la valentía y el espíritu de la Navidad.', '1. Netflix: https://www.netflix.com/gf-es/title/70011200\r\n2. Prime Video: https://www.primevideo.com/-/es/detail/El-Expreso-Polar/0LWAYWQGT7WLABSFNHSJZKYQ55\r\n3. Apple TV: https://tv.apple.com/mx/movie/el-expreso-polar/umc.cmc.1uo8voy8hptp3q329p7o74cg5'),
(7, 'Love Actually', 2003, 'Richard Curtis', 7.6, 'Comedia romántica', 'Sigue las vidas de ocho parejas muy diferentes lidiando con sus vidas amorosas en varias historias vagamente interrelacionadas, todas ambientadas durante un frenético mes antes de Navidad en Londres, Inglaterra.', '1. Netflix: https://www.netflix.com/es/title/60031262?source=35\r\n2. Prime Video: https://www.primevideo.com/-/es/detail/Realmente-amor/0SKP19RX9AS7BWJKOJOAAXH81S'),
(8, 'Santa Cláusula', 1994, 'John Pasquin', 6.5, 'Comedia familiar', 'Cuando un hombre hace caer accidentalmente a Santa de su tejado en Nochebuena, se encuentra mágicamente reclutado para tomar su lugar.', '1. Disney Plus: https://www.disneyplus.com/es-mx/movies/title/3JPPheWC0SH5\r\n2. Prime Video: https://www.primevideo.com/-/es/detail/Santa-Cl%C3%A1usula/0T64JK30Y7OI786ZC0HTHKT5P1\r\n3. Apple TV: https://tv.apple.com/mx/movie/santa-clausula/umc.cmc.4drvjmsf6vu1nhraowzehhoe5'),
(9, 'El Grinch', 2000, 'Ron Howard', 6.2, 'Comedia fantástica', 'En las afueras de Villa Quién vive un Grinch verde que busca venganza y planea arruinar la Navidad para todos los ciudadanos del pueblo.', '1. Max (HBO): https://www.max.com/cl/es/movies/el-grinch/8a1dc5a5-353c-4a95-81b5-b3a0b574ced2\r\n2. Prime Video: https://www.primevideo.com/-/es/detail/El-Grinch/0SPE8HYYIGVBEBLIT6AQT3TNPL\r\n3. Apple TV: https://tv.apple.com/mx/movie/el-grinch/umc.cmc.5ulids6104abycr0xuxju4ee0'),
(10, 'Pesadilla antes de Navidad', 1993, 'Henry Selick', 7.9, 'Animación musical', 'Jack Skellington, rey de la Ciudad de Halloween, descubre la Ciudad de la Navidad, pero sus intentos de llevar la Navidad a su hogar causan confusión.', '1. Disney Plus: https://www.disneyplus.com/es-es/movies/pesadilla-antes-de-navidad/5GjwOj5Rkpz2\r\n2. Rakuten TV: https://www.rakuten.tv/es/movies/pesadilla-antes-de-navidad\r\n3. Apple TV: https://tv.apple.com/es/movie/pesadilla-antes-de-navidad/umc.cmc.15sv1obrzlxhuf2xhjftbr6ab'),
(11, 'Klaus', 2019, 'Sergio Pablos', 8.2, 'Animación familiar', 'Un cartero egoísta y un fabricante de juguetes solitario forjan una amistad improbable que trae alegría a un pueblo frío y oscuro.', '1. Netflix: https://www.netflix.com/mx/title/80183187'),
(12, 'Un vecino con pocas luces', 2006, 'John Whitesell', 5.0, 'Comedia navideña', 'Dos vecinos compiten ferozmente para decorar sus casas con las luces navideñas más llamativas y así ganar un concurso.', '1. Disney Plus: https://www.disneyplus.com/es-mx/movies/un-vecino-con-pocas-luces/5NwtYUOmxcPa\r\n2. Netflix: https://www.netflix.com/mx/title/70052697'),
(13, 'Crónicas de Navidad', 2018, 'Clay Kaytis', 7.0, 'Aventura familiar', 'Dos hermanos provocan un accidente que estropea el trineo de Santa Claus y deben salvar la Navidad con la ayuda del mismísimo Santa.', '1. Netflix: https://www.netflix.com/title/80199682'),
(14, 'El regalo prometido', 1996, 'Brian Levant', 5.7, 'Comedia familiar', 'Un padre desesperado intenta conseguir el juguete más popular para su hijo en la víspera de Navidad, enfrentándose a una serie de desventuras cómicas.', '1. Disney Plus: https://www.disneyplus.com/es-mx/movies/el-regalo-prometido/6h1l5zuCJDiL\r\n2. Apple TV: https://tv.apple.com/mx/movie/el-regalo-prometido/umc.cmc.329bisnjs2zqfs4a57oqqra9o'),
(15, 'Noche de paz', 2022, 'Tommy Wirkola', 6.7, 'Acción navideña', 'Un equipo de mercenarios secuestra a una familia adinerada en Nochebuena, pero Santa Claus llega para salvar el día de manera inesperada.', '1. Prime Video: https://www.primevideo.com/-/es/detail/0FW2U2MHIG2LGKASDD2RMN1H1K/ref=atv_dl_rdr?tag=just0a7-21\r\n2. Apple TV: https://tv.apple.com/es/movie/noche-de-paz/umc.cmc.zkxi6wwwzrpbx5ubnu1jsakd?at=1000l3V2&ct=justwatch_tv&itscg=30200&itsct=justwatch_tv&playableId=tvs.sbd.9001%3A1656146669'),
(16, 'Cambio de princesa', 2018, 'Mike Rohl', 6.0, 'Romance navideño', 'Una pastelera de Chicago y una duquesa descubren que son idénticas y deciden intercambiar vidas durante la Navidad.', '1. Netflix: https://www.netflix.com/mx/title/80242926'),
(17, 'Nochebuena en casa', 2022, 'Per-Olav Sørensen', 7.6, 'Comedia romántica', 'Siguiendo un reto familiar, Johanne, una enfermera, intenta encontrar a alguien para llevar a casa por Navidad en menos de 24 días.', '1. Netflix: https://www.netflix.com/mx/title/81083590'),
(18, 'El Hombre que Inventó la Navidad', 2017, 'Bharat Nalluri', 7.0, 'Drama histórico', 'Relata cómo Charles Dickens escribió *Cuento de Navidad* tras superar bloqueos creativos y problemas personales.', '1. Prime Video: https://www.primevideo.com/detail?gti=amzn1.dv.gti.2cb92973-2b81-7e34-e88e-147d67cdb53a&linkCode=xm2&tag=just0a7-21'),
(19, 'Navidad en 8 bits', 2021, 'Michael Dowse', 6.8, 'Comedia nostálgica', 'Un niño de los años 80 intenta conseguir una consola de videojuegos NES como regalo de Navidad, enfrentándose a una serie de desafíos cómicos.', '1. Prime Video: https://www.primevideo.com/-/es/detail/Navidad-en-8-Bits/0TA0R7RQZJDKQQM54NVKJE3G1E'),
(20, 'Scrooge: Cuento de Navidad', 2022, 'Stephen Donnelly', 7.1, 'Animación musical', 'Una adaptación animada del clásico de Charles Dickens que sigue la redención de Ebenezer Scrooge en Nochebuena.', '1. Netflix: https://www.netflix.com/mx/title/81028225');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `peliculas`
--
ALTER TABLE `peliculas`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `peliculas`
--
ALTER TABLE `peliculas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
