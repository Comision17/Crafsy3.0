-- MySQL dump 10.13  Distrib 8.0.26, for Win64 (x86_64)
--
-- Host: localhost    Database: crafsy_17.3
-- ------------------------------------------------------
-- Server version	8.0.26

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `asides`
--

DROP TABLE IF EXISTS `asides`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `asides` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(255) DEFAULT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  `usuariosId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `usuariosId` (`usuariosId`),
  CONSTRAINT `asides_ibfk_1` FOREIGN KEY (`usuariosId`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asides`
--

LOCK TABLES `asides` WRITE;
/*!40000 ALTER TABLE `asides` DISABLE KEYS */;
INSERT INTO `asides` VALUES (1,'Nunca creeras lo que estas aprendiendo aca','aside-01.jpg',1,'2022-09-28 13:45:54','2022-09-28 13:45:54'),(2,'Como terminar un sprint a tiempo','aside-02.jpg',2,'2022-09-28 13:45:54','2022-09-28 13:45:54'),(3,'Como hackear a la nasa','aside-03.jpg',4,'2022-09-28 13:45:54','2022-09-28 13:45:54'),(4,'Metodos nunca antes vistos en JS','aside-04.jpg',2,'2022-09-28 13:45:54','2022-09-28 13:45:54');
/*!40000 ALTER TABLE `asides` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carritos`
--

DROP TABLE IF EXISTS `carritos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carritos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuariosId` int NOT NULL,
  `productosId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `usuariosId` (`usuariosId`),
  KEY `productosId` (`productosId`),
  CONSTRAINT `carritos_ibfk_1` FOREIGN KEY (`usuariosId`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `carritos_ibfk_2` FOREIGN KEY (`productosId`) REFERENCES `productos` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carritos`
--

LOCK TABLES `carritos` WRITE;
/*!40000 ALTER TABLE `carritos` DISABLE KEYS */;
/*!40000 ALTER TABLE `carritos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categorias`
--

DROP TABLE IF EXISTS `categorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categorias` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorias`
--

LOCK TABLES `categorias` WRITE;
/*!40000 ALTER TABLE `categorias` DISABLE KEYS */;
INSERT INTO `categorias` VALUES (1,'Smartphones','2022-09-28 13:45:53','2022-09-28 13:45:53'),(2,'Notebooks','2022-09-28 13:45:53','2022-09-28 13:45:53'),(3,'Tablets','2022-09-28 13:45:53','2022-09-28 13:45:53'),(4,'Consolas','2022-09-28 13:45:53','2022-09-28 13:45:53'),(5,'Televisores','2022-09-28 13:45:53','2022-09-28 13:45:53'),(6,'Otros','2022-09-28 13:45:53','2022-09-28 13:45:53');
/*!40000 ALTER TABLE `categorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `historiales`
--

DROP TABLE IF EXISTS `historiales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `historiales` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  `stock` int DEFAULT NULL,
  `precio` int DEFAULT NULL,
  `descuento` int DEFAULT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `categoriasId` int NOT NULL,
  `marcasId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `categoriasId` (`categoriasId`),
  KEY `marcasId` (`marcasId`),
  CONSTRAINT `historiales_ibfk_1` FOREIGN KEY (`categoriasId`) REFERENCES `categorias` (`id`),
  CONSTRAINT `historiales_ibfk_2` FOREIGN KEY (`marcasId`) REFERENCES `marcas` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `historiales`
--

LOCK TABLES `historiales` WRITE;
/*!40000 ALTER TABLE `historiales` DISABLE KEYS */;
/*!40000 ALTER TABLE `historiales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `imagenes`
--

DROP TABLE IF EXISTS `imagenes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `imagenes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  `productosId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `productosId` (`productosId`),
  CONSTRAINT `imagenes_ibfk_1` FOREIGN KEY (`productosId`) REFERENCES `productos` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `imagenes`
--

LOCK TABLES `imagenes` WRITE;
/*!40000 ALTER TABLE `imagenes` DISABLE KEYS */;
INSERT INTO `imagenes` VALUES (1,'Moto g30.png',1,'2022-09-28 13:45:54','2022-09-28 13:45:54'),(2,'Moto g30 (2).png',1,'2022-09-28 13:45:54','2022-09-28 13:45:54'),(3,'Moto g30 (3).png',1,'2022-09-28 13:45:54','2022-09-28 13:45:54'),(4,'Moto g30 (4).png',1,'2022-09-28 13:45:54','2022-09-28 13:45:54'),(5,'Moto-G100 (2).png',3,'2022-09-28 13:45:54','2022-09-28 13:45:54'),(6,'Moto-G100.png',3,'2022-09-28 13:45:54','2022-09-28 13:45:54'),(7,'Moto-G100 (3).png',3,'2022-09-28 13:45:54','2022-09-28 13:45:54'),(8,'Moto-G100 (4).png',3,'2022-09-28 13:45:54','2022-09-28 13:45:54'),(9,'S21 Ultra1.png',2,'2022-09-28 13:45:54','2022-09-28 13:45:54'),(10,'S21 Ultra2.png',2,'2022-09-28 13:45:54','2022-09-28 13:45:54'),(11,'S21 Ultra4.png',2,'2022-09-28 13:45:54','2022-09-28 13:45:54'),(12,'S21 Ultra3.png',2,'2022-09-28 13:45:54','2022-09-28 13:45:54'),(13,'A52.jpg',4,'2022-09-28 13:45:54','2022-09-28 13:45:54'),(14,'A52 3.webp',4,'2022-09-28 13:45:54','2022-09-28 13:45:54'),(15,'A52 2.webp',4,'2022-09-28 13:45:54','2022-09-28 13:45:54'),(16,'A52 4.webp',4,'2022-09-28 13:45:54','2022-09-28 13:45:54'),(17,'Iphone 13.webp',5,'2022-09-28 13:45:54','2022-09-28 13:45:54'),(18,'Iphone 13 2.webp',5,'2022-09-28 13:45:54','2022-09-28 13:45:54'),(19,'Iphone 13 3.webp',5,'2022-09-28 13:45:54','2022-09-28 13:45:54'),(20,'Iphone 13 4.webp',5,'2022-09-28 13:45:54','2022-09-28 13:45:54'),(21,'iPhoneSE2022.jpg',6,'2022-09-28 13:45:54','2022-09-28 13:45:54'),(22,'iPhoneSE2022 2.jpg',6,'2022-09-28 13:45:54','2022-09-28 13:45:54'),(23,'iPhoneSE2022 3.jpg',6,'2022-09-28 13:45:54','2022-09-28 13:45:54'),(24,'iPhoneSE2022 4.jpg',6,'2022-09-28 13:45:54','2022-09-28 13:45:54'),(25,'Nokia 1100.jpg',7,'2022-09-28 13:45:54','2022-09-28 13:45:54'),(26,'Nokia 1100 caja.webp',7,'2022-09-28 13:45:54','2022-09-28 13:45:54'),(27,'Nokia 1100 extra.webp',7,'2022-09-28 13:45:54','2022-09-28 13:45:54'),(28,'Nokia 1100 negro.jpg',7,'2022-09-28 13:45:54','2022-09-28 13:45:54'),(29,'Xiaomi12.jpg',8,'2022-09-28 13:45:54','2022-09-28 13:45:54'),(30,'Xiaomi12(2).webp',8,'2022-09-28 13:45:54','2022-09-28 13:45:54'),(31,'Xiaomi12X.png',8,'2022-09-28 13:45:54','2022-09-28 13:45:54'),(32,'Xiaomi12.webp',8,'2022-09-28 13:45:54','2022-09-28 13:45:54'),(33,'Tablet noblex 1.jfif',9,'2022-09-28 13:45:54','2022-09-28 13:45:54'),(34,'Tablet Noblex2.jfif',9,'2022-09-28 13:45:54','2022-09-28 13:45:54'),(35,'Tablet Noblex3.jpg',9,'2022-09-28 13:45:54','2022-09-28 13:45:54'),(36,'Tablet Noblex 4.jpg',9,'2022-09-28 13:45:54','2022-09-28 13:45:54'),(37,'Galaxy Tab S8(2).webp',10,'2022-09-28 13:45:54','2022-09-28 13:45:54'),(38,'Galaxy Tab S8(3).webp',10,'2022-09-28 13:45:54','2022-09-28 13:45:54'),(39,'Galaxy Tab S8(4).webp',10,'2022-09-28 13:45:54','2022-09-28 13:45:54'),(40,'Galaxy Tab S8(5).webp',10,'2022-09-28 13:45:54','2022-09-28 13:45:54'),(41,'tablet-xiaomi-pad-5-6gb-ram-128gb-rom.jpg',11,'2022-09-28 13:45:54','2022-09-28 13:45:54'),(42,'tablet-xiaomi-pad-5-6gb-ram-128gb-rom (1).jpg',11,'2022-09-28 13:45:54','2022-09-28 13:45:54'),(43,'tablet-xiaomi-pad-5-6gb-ram-128gb-rom (2).jpg',11,'2022-09-28 13:45:54','2022-09-28 13:45:54'),(44,'tablet-xiaomi-pad-5-6gb-ram-128gb-rom (3).jpg',11,'2022-09-28 13:45:54','2022-09-28 13:45:54'),(45,'ipad_pro_12(1).png',12,'2022-09-28 13:45:54','2022-09-28 13:45:54'),(46,'ipad_pro_12(3).png',12,'2022-09-28 13:45:54','2022-09-28 13:45:54'),(47,'ipad_pro_12.png',12,'2022-09-28 13:45:54','2022-09-28 13:45:54'),(48,'ipad_pro_12(2).png',12,'2022-09-28 13:45:54','2022-09-28 13:45:54'),(49,'Notebook-asus.jpg',13,'2022-09-28 13:45:54','2022-09-28 13:45:54'),(50,'Notebook-asus 2.jpg',13,'2022-09-28 13:45:54','2022-09-28 13:45:54'),(51,'Notebook-asus 3.jpg',13,'2022-09-28 13:45:54','2022-09-28 13:45:54'),(52,'Notebook-asus 4.jpg',13,'2022-09-28 13:45:54','2022-09-28 13:45:54'),(53,'Msi gs76.jpg',14,'2022-09-28 13:45:54','2022-09-28 13:45:54'),(54,'Msi gs76(1).jpg',14,'2022-09-28 13:45:54','2022-09-28 13:45:54'),(55,'Msi gs76(2).jpg',14,'2022-09-28 13:45:54','2022-09-28 13:45:54'),(56,'Msi gs76(4).jpg',14,'2022-09-28 13:45:54','2022-09-28 13:45:54'),(57,'Lenovo Thinkpad.png',15,'2022-09-28 13:45:54','2022-09-28 13:45:54'),(58,'Lenovo.webp',15,'2022-09-28 13:45:54','2022-09-28 13:45:54'),(59,'Lenovo(3).webp',15,'2022-09-28 13:45:54','2022-09-28 13:45:54'),(60,'Lenovo(4).webp',15,'2022-09-28 13:45:54','2022-09-28 13:45:54'),(61,'Macbook pro(2).jpg',16,'2022-09-28 13:45:54','2022-09-28 13:45:54'),(62,'Macbook pro(1).jpg',16,'2022-09-28 13:45:54','2022-09-28 13:45:54'),(63,'Macbook pro(3).jpg',16,'2022-09-28 13:45:54','2022-09-28 13:45:54'),(64,'Macbook pro(4).jpg',16,'2022-09-28 13:45:54','2022-09-28 13:45:54');
/*!40000 ALTER TABLE `imagenes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `marcas`
--

DROP TABLE IF EXISTS `marcas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `marcas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `marcas`
--

LOCK TABLES `marcas` WRITE;
/*!40000 ALTER TABLE `marcas` DISABLE KEYS */;
INSERT INTO `marcas` VALUES (1,'Xiaomi','2022-09-28 13:45:53','2022-09-28 13:45:53'),(2,'Samsung','2022-09-28 13:45:53','2022-09-28 13:45:53'),(3,'Apple','2022-09-28 13:45:53','2022-09-28 13:45:53'),(4,'Nokia','2022-09-28 13:45:53','2022-09-28 13:45:53'),(5,'Asus','2022-09-28 13:45:53','2022-09-28 13:45:53'),(6,'Noblex','2022-09-28 13:45:53','2022-09-28 13:45:53'),(7,'LG','2022-09-28 13:45:53','2022-09-28 13:45:53'),(8,'Lenovo','2022-09-28 13:45:53','2022-09-28 13:45:53'),(9,'Motorola','2022-09-28 13:45:53','2022-09-28 13:45:53'),(10,'Alienware','2022-09-28 13:45:53','2022-09-28 13:45:53'),(11,'Dell','2022-09-28 13:45:53','2022-09-28 13:45:53'),(12,'MSI','2022-09-28 13:45:53','2022-09-28 13:45:53');
/*!40000 ALTER TABLE `marcas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ordenes`
--

DROP TABLE IF EXISTS `ordenes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ordenes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuariosId` int NOT NULL,
  `carritosId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `usuariosId` (`usuariosId`),
  KEY `carritosId` (`carritosId`),
  CONSTRAINT `ordenes_ibfk_1` FOREIGN KEY (`usuariosId`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `ordenes_ibfk_2` FOREIGN KEY (`carritosId`) REFERENCES `carritos` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ordenes`
--

LOCK TABLES `ordenes` WRITE;
/*!40000 ALTER TABLE `ordenes` DISABLE KEYS */;
/*!40000 ALTER TABLE `ordenes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  `stock` int DEFAULT NULL,
  `precio` int DEFAULT NULL,
  `descuento` int DEFAULT NULL,
  `descripcion` varchar(1000) DEFAULT NULL,
  `categoriasId` int NOT NULL,
  `marcasId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `categoriasId` (`categoriasId`),
  KEY `marcasId` (`marcasId`),
  CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`categoriasId`) REFERENCES `categorias` (`id`),
  CONSTRAINT `productos_ibfk_2` FOREIGN KEY (`marcasId`) REFERENCES `marcas` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (1,'Motorola Moto G30 6+128Gb',13,56000,20,'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum numquam, placeat eius perferendis aspernatur doloribus aliquid, quibusdam aperiam hic a tenetur! Quis rem aut qui expedita ut aspernatur nisi officiis.',1,9,'2022-09-28 13:45:53','2022-09-28 13:45:53'),(2,'Motorola Moto G100',13,80000,10,'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum numquam, placeat eius perferendis aspernatur doloribus aliquid, quibusdam aperiam hic a tenetur! Quis rem aut qui expedita ut aspernatur nisi officiis.',1,9,'2022-09-28 13:45:53','2022-09-28 13:45:53'),(3,'Samsung Galaxy S21 Ultra',13,220000,20,'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum numquam, placeat eius perferendis aspernatur doloribus aliquid, quibusdam aperiam hic a tenetur! Quis rem aut qui expedita ut aspernatur nisi officiis.',1,2,'2022-09-28 13:45:53','2022-09-28 13:45:53'),(4,'Samsung Galaxy A52',10,71000,10,'Disfrutá de los detalles realmente vibrantes con la pantalla Super AMOLED Display FHD+ que alcanza los 800 nits para mayor claridad incluso con la luz de día brillante. Eye Comfort Shield reduce la luz azul y la pantalla extrafluida mantiene la vista relajada, ya sea que estés jugando o navegando.',1,2,'2022-09-28 13:45:53','2022-09-28 13:45:53'),(5,'Iphone 13 pro max plus extra ultra',3,530000,10,'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum numquam, placeat eius perferendis aspernatur doloribus aliquid, quibusdam aperiam hic a tenetur! Quis rem aut qui expedita ut aspernatur nisi officiis.',1,3,'2022-09-28 13:45:53','2022-09-28 13:45:53'),(6,'Apple iPhone SE (3ª generación, 64 GB) - Azul medianoche',15,169000,5,'Chip A15 Bionic superrápido. Una increíble duración de batería y una cámara que es una superestrella. Y además, el vidrio más resistente en un smartphone y botón de inicio con la seguridad de Touch ID.',1,3,'2022-09-28 13:45:53','2022-09-28 13:45:53'),(7,'Nokia 1100 un telefonazo y antirrobo',50,20000,40,'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum numquam, placeat eius perferendis aspernatur doloribus aliquid, quibusdam aperiam hic a tenetur! Quis rem aut qui expedita ut aspernatur nisi officiis.',1,4,'2022-09-28 13:45:53','2022-09-28 13:45:53'),(8,'Xiaomi 12X',8,190658,20,'El teléfono Xiaomi 12X 8GB/256GB 6.3 Dual Sim Smartphone nos presenta un modelo elegante con detalles refinados y cuidadosos en cada componente para ofrecer un tamaño perfecto que cabe en una mano, una pantalla con máximo realismo, sonido de alta calidad y un procesador potente para cualquier tipo de uso, aunque se destaca con los video juegos.',1,1,'2022-09-28 13:45:53','2022-09-28 13:45:53'),(9,'Tablet Noblex Star Wars. Edición Limitada',1,15000,0,'Pantalla de 7\" multitouch de 5 puntos y resolución de IPS 1024 X 600.\r\n-Procesador Intel de cuatro núcleos.\r\n-Memoria interna de 16 GB expandible hasta 32 GB y micro USB.\r\n-Sistema operativo Android KitKat 4.4.\r\n-Conexión Wi-Fi, Bluetooth.\r\n-Cámara frontal de 0.3 Megapíxeles y una posterior de 2.0 Megapíxeles.',3,6,'2022-09-28 13:45:53','2022-09-28 13:45:53'),(10,'Galaxy Tab S8 Ultra',8,275999,0,'Esta tablet Samsung es la compañera ideal, con capacidad de sobra para cada una de tus actividades. El diseño delgado, compacto y portátil, con facilidad para sostener en una mano, lo convierte en una combinación perfecta de rendimiento y versatilidad. Transferir, sincronizar y acceder a tus dispositivos las veces que quieras ahora es posible. Sus conexiones usb 3.2 gen 1, wi-fi direct, smart switch, wi-fi, bluetooth, mimo te permiten potenciar sus funciones al máximo',3,2,'2022-09-28 13:45:53','2022-09-28 13:45:53'),(11,'Tablet Xiaomi Mi Pad 5',1,15000,0,'Mejora tu experiencia de trabajo y entretenimiento. La gran pantalla de 11, el diseño compacto y elegante y la configuración de gama alta cumplirán con creces tus expectativas en multitud de situaciones. La  Xiaomi Pad 5 está equipada con Qualcomm® Snapdragon™ 860 con una pantalla con una tasa de refresco Superfluida de 120 Hz que harán que disfrutes de una experiencia impresionante. Con la batería enorme de 8720 mAh (typ), no te preocuparás más por la carga.',3,1,'2022-09-28 13:45:53','2022-09-28 13:45:53'),(12,'iPad Pro 12,9 (5a generación,2TB,M1) Gris espacial',15,589000,30,'El iPad Pro con el chip M1 de Apple tiene un rendimiento fuera de serie y una batería que te acompaña todo el día. La impresionante pantalla Liquid Retina XDR de 12,9 pulgadas es perfecta para ver y editar fotos y videos HDR.1 Los modelos con conexión celular te permiten conectarte en lugares donde no hay Wi-Fi. La cámara frontal con Encuadre Centrado te mantendrá automáticamente en el centro de la imagen durante las videollamadas. Y eso no es todo. Viene con cámaras Pro y un escáner LiDAR para que hagas fotos y videos increíbles y disfrutes de experiencias de realidad aumentada realmente envolventes. Con el puerto Thunderbolt podrás conectar accesorios de alto rendimiento. Y si le sumas el Apple Pencil, podrás tomar apuntes, dibujar y hacer anotaciones, y con el Magic Keyboard con trackpad integrado podrás escribir con total comodidad. El iPad Pro está listo para todo',3,3,'2022-09-28 13:45:53','2022-09-28 13:45:53'),(13,'NOTEBOOK GAMER ASUS, CORE I7',3,329999,10,'Notebook de 15.6\" FHD (1920 x 1080) 144Hz. Procesador Intel Core i7-11600h (2.6 GHz hasta 4.6 GHz). Capacidad 512GB SSD M.2 NVMe PCIe 3.0. / RAM 16GB DDR4-3200 SO-DIMM. Placa de video NVIDIAGeForceRTX3050 Laptop GPU. Bateria 48WHrs, 3S1P, 3-cell Li-ion. Bluetooth 5.2 (dual band). Teclado numerico. USB 3.2 Gen 2 Type-C / USB 3.2 Gen 1 Type-A x3. Wi Fi 6 (802.11ax). HDMI 2.0. Camara frontal 720PHD. Sistema operativo Windows 10 home. Microfono incorporado.',2,5,'2022-09-28 13:45:53','2022-09-28 13:45:53'),(14,'MSI GS76 Stealth 17.3\' FHD 300Hz 3ms',3,469999,10,'Desplázate rápidamente por la ciudad con el GS76 Stealth y su elegante chasis negro. Con procesadores de la 11ª Gen. Intel® Core™ i9 y gráficas NVIDIA® GeForce RTX™ 3080, El GS76 Stealth es ultrafino y ligero, además de contar con la batería de mayor capacidad del mundo (99,9 WHr) y el nuevo Wi-Fi 6E. Profesional de día, gamer de noche, conviértete en el rey de la metrópolis con el GS76 Stealth.',2,12,'2022-09-28 13:45:53','2022-09-28 13:45:53'),(15,'Notebook Lenovo ThinkPad E14 black 14',54,224999,15,'La notebook Lenovo ThinkPad E14 fue pensada para hacer tu vida más sencilla. Su diseño elegante e innovador y su comodidad para transportarla, la convertirá en tu PC favorita. Cualquier tarea que te propongas, ya sea en casa o en la oficina, la harás con facilidad gracias a su poderoso rendimiento.Pantalla con gran impacto visual Su pantalla LED de 14\' y 1920x1080px de resolución te brindará colores más vivos y definidos. Tus películas y series preferidas cobrarán vida, ya que ganarán calidad y definición en cada detalle.',2,8,'2022-09-28 13:45:53','2022-09-28 13:45:53'),(16,'MacBook Pro 16 M1 Pro 512 GB',9,947899,8,'Llegó la MacBook Pro más poderosa de todas. De la mano de los ultrarrápidos chips M1 Pro y M1 Max, los primeros diseñados por Apple para profesionales, disfrutarás un rendimiento revolucionario con una duración excepcional de la batería. Además, tendrás una espectacular pantalla Liquid Retina XDR, la mejor cámara y el sistema de audio más avanzado en una notebook Mac, y todos los puertos que necesitas. La nueva MacBook Pro es mucho más que una notebook única en su clase: es una verdadera superpotencia.',2,3,'2022-09-28 13:45:53','2022-09-28 13:45:53');
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'Administrador','2022-09-28 13:45:53','2022-09-28 13:45:53'),(2,'Usuario','2022-09-28 13:45:53','2022-09-28 13:45:53');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sequelizemeta`
--

DROP TABLE IF EXISTS `sequelizemeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sequelizemeta`
--

LOCK TABLES `sequelizemeta` WRITE;
/*!40000 ALTER TABLE `sequelizemeta` DISABLE KEYS */;
INSERT INTO `sequelizemeta` VALUES ('20220926122548-create-marcas.js'),('20220926122818-create-categorias.js'),('20220926123239-create-roles.js'),('20220926123306-create-usuarios.js'),('20220926124426-create-productos.js'),('20220926125030-create-historiales.js'),('20220926125149-create-asides.js'),('20220926125527-create-imagenes.js'),('20220926125620-create-carritos.js'),('20220926125815-create-ordenes.js');
/*!40000 ALTER TABLE `sequelizemeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  `apellido` varchar(255) DEFAULT NULL,
  `genero` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `pais` varchar(255) DEFAULT NULL,
  `provincia` varchar(255) DEFAULT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  `rolId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `rolId` (`rolId`),
  CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`rolId`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'alguien',NULL,'M','si@tenemosemail.com','tenemosunacontraseñasecreta','Argentina',NULL,'fotuli.jpg',1,'2022-09-28 13:45:53','2022-09-28 13:45:53'),(2,'cristian',NULL,'M','cris@gmail.com','$2a$10$Q4zq5aCrPr/iXHk2GFkz2uhOQMtOuXJm7ADira4klRQ/oiyNEWtFK','argentina',NULL,'profile.png',2,'2022-09-28 13:45:53','2022-09-28 13:45:53'),(3,'El profe',NULL,'M','profe@gmail.com','$2a$10$Q4zq5aCrPr/iXHk2GFkz2uhOQMtOuXJm7ADira4klRQ/oiyNEWtFK','uruguay',NULL,'avatar-1661781316381.png',2,'2022-09-28 13:45:53','2022-09-28 13:45:53'),(4,'menganito',NULL,'M','tremendo@gmail.com','$2a$12$nKaChPNdblbNU4itaoN6xu9RmQG0Q5mkWL7/pJ6ptK/IukxxzbCNK','brasil',NULL,'avatar-1661781452319.png',2,'2022-09-28 13:45:53','2022-09-28 13:45:53'),(5,'Alcachofa',NULL,'SN','alcachofa@gmail.com','$2a$12$qrl7eu2fQtHHhx5oLklpeu1HYSy3ksbjuB6osOZfnA.86QVCPlMBe','brasil',NULL,'avatar-1662038672171.webp',1,'2022-09-28 13:45:53','2022-09-28 13:45:53');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-09-29  9:43:39
