CREATE DATABASE  IF NOT EXISTS `coworking` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `coworking`;
-- MySQL dump 10.13  Distrib 8.0.20, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: coworking
-- ------------------------------------------------------
-- Server version	8.0.20-0ubuntu0.20.04.1

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
-- Table structure for table `comunidades`
--

DROP TABLE IF EXISTS `comunidades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comunidades` (
  `id_comunidad` tinyint NOT NULL,
  `nombre` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comunidades`
--

LOCK TABLES `comunidades` WRITE;
/*!40000 ALTER TABLE `comunidades` DISABLE KEYS */;
INSERT INTO `comunidades` VALUES (1,'Andalucía'),(2,'Aragón'),(3,'Asturias, Principado de'),(4,'Balears, Illes'),(5,'Canarias'),(6,'Cantabria'),(7,'Castilla y León'),(8,'Castilla - La Mancha'),(9,'Cataluña'),(10,'Comunitat Valenciana'),(11,'Extremadura'),(12,'Galicia'),(13,'Madrid, Comunidad de'),(14,'Murcia, Región de'),(15,'Navarra, Comunidad Foral de'),(16,'País Vasco'),(17,'Rioja, La'),(18,'Ceuta'),(19,'Melilla');
/*!40000 ALTER TABLE `comunidades` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `incidents`
--

DROP TABLE IF EXISTS `incidents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `incidents` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `comment` text,
  `state` enum('open','close') DEFAULT 'open',
  `reserve_id` int unsigned NOT NULL,
  `create_incident` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `update_incident` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_incidents_reserves` (`reserve_id`),
  CONSTRAINT `fk_incidents_reserves` FOREIGN KEY (`reserve_id`) REFERENCES `reserves` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `incidents`
--

LOCK TABLES `incidents` WRITE;
/*!40000 ALTER TABLE `incidents` DISABLE KEYS */;
INSERT INTO `incidents` VALUES (1,'me falla el monitor','open',1,'2020-06-30 16:50:54','2020-06-30 16:50:54');
/*!40000 ALTER TABLE `incidents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ratings`
--

DROP TABLE IF EXISTS `ratings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ratings` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `score` int NOT NULL,
  `comment` text,
  `user_id` int unsigned NOT NULL,
  `space_id` int unsigned NOT NULL,
  `create_rating` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `update_rating` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_ratings_users_id` (`user_id`),
  KEY `fk_ratings_spaces_id` (`space_id`),
  CONSTRAINT `fk_ratings_spaces_id` FOREIGN KEY (`space_id`) REFERENCES `spaces` (`id`),
  CONSTRAINT `fk_ratings_users_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ratings`
--

LOCK TABLES `ratings` WRITE;
/*!40000 ALTER TABLE `ratings` DISABLE KEYS */;
INSERT INTO `ratings` VALUES (1,4,'me gusta la iluminacion',2,1,'2020-06-30 16:50:54','2020-06-30 16:50:54'),(2,5,'me gusta encanta',3,1,'2020-06-30 16:50:54','2020-06-30 16:50:54'),(3,4,'me gusta mucho este espacio',4,1,'2020-06-30 16:50:54','2020-06-30 16:50:54'),(4,1,'no me convence',5,1,'2020-06-30 16:50:54','2020-06-30 16:50:54'),(5,1,'no me gusta',2,2,'2020-06-30 16:50:54','2020-06-30 16:50:54'),(6,2,'no está mal',3,2,'2020-06-30 16:50:54','2020-06-30 16:50:54'),(7,4,'me gusta la oficina',4,2,'2020-06-30 16:50:54','2020-06-30 16:50:54'),(8,3,'recomendable',5,2,'2020-06-30 16:50:54','2020-06-30 16:50:54'),(9,1,'no es mi estilio',6,2,'2020-06-30 16:50:54','2020-06-30 16:50:54'),(10,2,'no me gusta',2,3,'2020-06-30 16:50:54','2020-06-30 16:50:54'),(11,4,'no está mal',3,3,'2020-06-30 16:50:54','2020-06-30 16:50:54'),(12,5,'me gusta la decoración',4,3,'2020-06-30 16:50:54','2020-06-30 16:50:54'),(13,3,'recomendable',5,3,'2020-06-30 16:50:54','2020-06-30 16:50:54'),(14,1,'no es mi estilio',6,3,'2020-06-30 16:50:54','2020-06-30 16:50:54'),(15,4,'me gusta',2,4,'2020-06-30 16:50:54','2020-06-30 16:50:54'),(16,4,'no está mal',3,4,'2020-06-30 16:50:54','2020-06-30 16:50:54'),(17,4,'butacas muy comodas',4,4,'2020-06-30 16:50:54','2020-06-30 16:50:54'),(18,3,'recomendable',5,4,'2020-06-30 16:50:54','2020-06-30 16:50:54'),(19,1,'no se ve bien',6,4,'2020-06-30 16:50:54','2020-06-30 16:50:54');
/*!40000 ALTER TABLE `ratings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reserves`
--

DROP TABLE IF EXISTS `reserves`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reserves` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `payment_date` date DEFAULT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `is_paid` tinyint(1) NOT NULL DEFAULT '0',
  `is_clean` tinyint(1) NOT NULL DEFAULT '1',
  `is_confirmed` tinyint(1) NOT NULL DEFAULT '0',
  `confirmationCode` varchar(255) DEFAULT NULL,
  `paymentCode` varchar(255) DEFAULT NULL,
  `user_id` int unsigned NOT NULL,
  `space_id` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_reserves_users_id` (`user_id`),
  KEY `fk_reserves_spaces_id` (`space_id`),
  CONSTRAINT `fk_reserves_spaces_id` FOREIGN KEY (`space_id`) REFERENCES `spaces` (`id`),
  CONSTRAINT `fk_reserves_users_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reserves`
--

LOCK TABLES `reserves` WRITE;
/*!40000 ALTER TABLE `reserves` DISABLE KEYS */;
INSERT INTO `reserves` VALUES (1,NULL,'2020-06-23','2020-06-25',0,0,1,NULL,NULL,4,1);
/*!40000 ALTER TABLE `reserves` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `spaces`
--

DROP TABLE IF EXISTS `spaces`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `spaces` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `city` varchar(60) NOT NULL,
  `community` varchar(60) NOT NULL,
  `adress` varchar(255) NOT NULL,
  `photo1` varchar(255) DEFAULT NULL,
  `photo2` varchar(255) DEFAULT NULL,
  `photo3` varchar(255) DEFAULT NULL,
  `type` varchar(40) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `description` text NOT NULL,
  `equipment` text NOT NULL,
  `owner_id` int unsigned NOT NULL,
  `create_space` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `update_space` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_spaces_users_id` (`owner_id`),
  CONSTRAINT `fk_spaces_users_id` FOREIGN KEY (`owner_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `spaces`
--

LOCK TABLES `spaces` WRITE;
/*!40000 ALTER TABLE `spaces` DISABLE KEYS */;
INSERT INTO `spaces` VALUES (1,'Zamit','Palmas De Gran Canaria, Las','Canarias','Avenida de Las Canteras 43','space1.jpeg',NULL,NULL,'Puesto trabajo',200.00,'Este es el espacio de trabajo ideal si estás buscando algo sencillo pero eficiente, ya que tiene todo el material necesario para realizar tu trabajo de forma cómoda. Es una sala amplía en al que hay 10 puestos individuales de trabajo para personas que no quieran reservar una oficina entera','silla, escritorio, monitores, internet(300MB), impresora',2,'2020-06-30 16:50:54','2020-06-30 16:50:54'),(2,'Blue office','Barcelona','Cataluña','Carrer de la Princesa 7','space2.jpeg',NULL,NULL,'Oficina',2100.00,'Un espacio amplio, diáfano y domotizado, inundado por luz natural, con capacidad para 20 puestos de trabajo, con zona de reprografía y zonas de descanso y de reunión de libre uso. Además, es eficiente y sostenible; planteado para mejorar la eficiencia energética y la correcta gestión de residuos. Los puestos de trabajo están equipados con mobiliario ergonómico y de diseño con separaciones independientes y cuidados hasta el último detalle, es el espacio perfecto para un equipo de trabajo.','sillas, escritorios, monitores, internet(300MB), impresoras, taquillsa',2,'2020-06-30 16:50:54','2020-06-30 16:50:54'),(3,'La paz','Vigo','Galicia','Av de la Florida 11','space3.jpeg',NULL,NULL,'Sala fotografíca',49.99,'Esta sala es ideal para realizar sesiones de fotos, o cualquier otro proyecto. Tiene instrumentos necesarios para realizar las mejores imágenes. ','sillas, fondos, ventanas de luz, tripodes, pantallas, camára',3,'2020-06-30 16:50:54','2020-06-30 16:50:54'),(4,'Meetings','Pontevedra','Galicia','Calle de la Peregrina 5','space4.jpeg',NULL,NULL,'Sala',120.00,'Esta espacio es una sala ideal para realizar reuniones,exponer proyectos o realizar eventos de otro tipo. Cuenta con 20 butacas que las podemos colocar en función de su necesidad, ya sea para una reunion(con una mesa central y coladas alredeor las butacas) a una exposición (colocadas por filas para ver la pantalla).','butacas, proyectores, mesas, pantallas',4,'2020-06-30 16:50:54','2020-06-30 16:50:54');
/*!40000 ALTER TABLE `spaces` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(60) NOT NULL,
  `password` varchar(255) NOT NULL,
  `city` varchar(50) DEFAULT NULL,
  `community` varchar(50) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `is_owner` tinyint(1) DEFAULT '0',
  `role` enum('normal','admin') NOT NULL DEFAULT 'normal',
  `active` tinyint(1) NOT NULL DEFAULT '0',
  `registrationCode` varchar(255) DEFAULT NULL,
  `lastPasswordUpdate` datetime NOT NULL,
  `create_user` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `update_user` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Rubén Pérez','rubenpo167@gmail.com','$2b$10$2EdNO/252DGP5/NGY2S3ze/6d9sxcEHVp5sXgeygZz5ueg3QHuCpO','Noia','Galicia',NULL,'639063381',0,'admin',1,NULL,'2020-06-30 16:50:53','2020-06-30 16:50:53','2020-06-30 16:50:53'),(2,'Uriel Hellsdon','rubenpo167+user2@gmail.com','$2b$10$sQ7A6fxmUmNhHn8Z2KyHE.BO2JFXFpMCmBtyL1vEuvXUcAu21zdyO','Telde','Canarias',NULL,'6622954423',1,'normal',1,NULL,'2020-06-30 16:50:54','2020-06-30 16:50:54','2020-06-30 16:50:54'),(3,'Benjamin Mellodey','rubenpo167+user3@gmail.com','$2b$10$sQ7A6fxmUmNhHn8Z2KyHE.BO2JFXFpMCmBtyL1vEuvXUcAu21zdyO','Santiago De Compostela','Galicia',NULL,'7736800054',0,'normal',1,NULL,'2020-06-30 16:50:54','2020-06-30 16:50:54','2020-06-30 16:50:54'),(4,'Rhiamon Custed','rubenpo167+user4@gmail.com','$2b$10$sQ7A6fxmUmNhHn8Z2KyHE.BO2JFXFpMCmBtyL1vEuvXUcAu21zdyO','Ourense','Galicia',NULL,'2318408230',0,'normal',1,NULL,'2020-06-30 16:50:54','2020-06-30 16:50:54','2020-06-30 16:50:54'),(5,'Chrissy Gemlett','rubenpo167+user5@gmail.com','$2b$10$sQ7A6fxmUmNhHn8Z2KyHE.BO2JFXFpMCmBtyL1vEuvXUcAu21zdyO','Valladolid','Castilla - Leon',NULL,'1004079953',0,'normal',1,NULL,'2020-06-30 16:50:54','2020-06-30 16:50:54','2020-06-30 16:50:54'),(6,'Biddie Reddihough','rubenpo167+user6@gmail.com','$2b$10$sQ7A6fxmUmNhHn8Z2KyHE.BO2JFXFpMCmBtyL1vEuvXUcAu21zdyO','Palmas De Gran Canaria, Las','Canarias',NULL,'3716413790',0,'normal',1,NULL,'2020-06-30 16:50:54','2020-06-30 16:50:54','2020-06-30 16:50:54'),(7,'Hurley Atcheson','rubenpo167+user7@gmail.com','$2b$10$sQ7A6fxmUmNhHn8Z2KyHE.BO2JFXFpMCmBtyL1vEuvXUcAu21zdyO','Palma De Mallorca','Baleares',NULL,'1574598212',0,'normal',1,NULL,'2020-06-30 16:50:54','2020-06-30 16:50:54','2020-06-30 16:50:54'),(8,'Robbie Fouracre','rubenpo167+user8@gmail.com','$2b$10$sQ7A6fxmUmNhHn8Z2KyHE.BO2JFXFpMCmBtyL1vEuvXUcAu21zdyO','Palmas De Gran Canaria, Las','Canarias',NULL,'3224362934',0,'normal',1,NULL,'2020-06-30 16:50:54','2020-06-30 16:50:54','2020-06-30 16:50:54'),(9,'Bobette Dunaway','rubenpo167+user9@gmail.com','$2b$10$sQ7A6fxmUmNhHn8Z2KyHE.BO2JFXFpMCmBtyL1vEuvXUcAu21zdyO','Huesca','Aragon',NULL,'2804685614',0,'normal',1,NULL,'2020-06-30 16:50:54','2020-06-30 16:50:54','2020-06-30 16:50:54'),(10,'Carson Killford','rubenpo167+user10@gmail.com','$2b$10$sQ7A6fxmUmNhHn8Z2KyHE.BO2JFXFpMCmBtyL1vEuvXUcAu21zdyO','Albacete','Castilla - La Mancha',NULL,'4984652382',0,'normal',1,NULL,'2020-06-30 16:50:54','2020-06-30 16:50:54','2020-06-30 16:50:54');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-06-30 18:58:58
