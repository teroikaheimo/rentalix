-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: rentalix
-- ------------------------------------------------------
-- Server version	5.7.21

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Dumping data for table `item`
--

LOCK TABLES `item` WRITE;
/*!40000 ALTER TABLE `item` DISABLE KEYS */;
INSERT INTO `item` VALUES (1,'Cordless drill','Makita','D3','Cordless drill with two batteries','Puijonkatu 18','Rentalix Kuopio','Drill','\0','2018-11-07 20:04:51'),(2,'Basic hammer','Gorilla','X3','Just a hammer.','Varkaudenkatu 8','Rentalix Varkaus','HAmmer','\0','2018-11-07 20:06:45'),(3,'Basic corded drill','Bosch','GT6','Corded drill.','Puijonkatu 18','Rentalix Varkaus','Drill','\0','2018-11-12 19:06:51'),(10,'Tracktor','T1008','Ford','Old tracktor for some light duty garden work.','Puijonkatu 2','Rentalix Kuopio','Tracktor','\0','2018-11-17 20:02:16'),(12,'Metal saw','Sawyer','Ironclad','Rusty metal saw with one change blade.','Varkaudenkatu 8','Rentalix Varkaus','Saw','\0','2018-11-19 22:28:45'),(15,'Bulldoser','CAT','5547','8t Bulldoser for your gardening needs.','Puijonkatu 18','Rentalix Kuopio','Bulldoser','\0','2018-11-25 19:52:36'),(16,'Pliers','EL-Tools','ST-4','Small pliers.','Puijonkatu 18','Rentalix Kuopio','Pliers','\0','2018-11-25 19:57:53');
/*!40000 ALTER TABLE `item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `reservation_rent`
--

LOCK TABLES `reservation_rent` WRITE;
/*!40000 ALTER TABLE `reservation_rent` DISABLE KEYS */;
INSERT INTO `reservation_rent` VALUES (3,2,3,NULL,NULL,'2018-11-22 23:59:59','2018-11-23 23:59:59'),(5,1,3,NULL,NULL,'2018-11-24 23:59:59','2018-12-26 23:59:59'),(7,10,3,NULL,NULL,'2018-11-20 23:59:59','2018-11-25 18:18:02'),(9,3,3,NULL,NULL,'2018-11-25 23:59:59','2018-11-28 23:59:59'),(10,10,2,NULL,NULL,'2018-11-29 16:59:59','2018-11-30 23:59:59'),(11,1,2,'2018-12-28 20:59:59','2018-12-29 23:59:59','2018-12-27 23:59:59','2018-12-29 23:59:59');
/*!40000 ALTER TABLE `reservation_rent` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'admin','admin',1),(2,'user','user',0),(3,'test','test',0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-11-25 22:49:43
