/*
SQLyog Ultimate v11.11 (32 bit)
MySQL - 5.5.5-10.1.26-MariaDB : Database - wgm
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
/*Table structure for table `bahan` */

DROP TABLE IF EXISTS `bahan`;

CREATE TABLE `bahan` (
  `idBahan` varchar(5) NOT NULL,
  `namaBahan` varchar(50) DEFAULT NULL,
  `keteranganBahan` text,
  `gambarBahan` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`idBahan`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `bahan` */

insert  into `bahan`(`idBahan`,`namaBahan`,`keteranganBahan`,`gambarBahan`) values ('BA001','Ebony Wood','kayu ebony','../public/assets/bahan/BA001.jpg'),('BA002','Mahogany Wood','kayu mahogany','../public/assets/bahan/BA002.jpg'),('BA003','Rosewood','kayu rosewood','../public/assets/bahan/BA003.jpg'),('BA004','Sitka Spruce','kayu sitka spruce','../public/assets/bahan/BA004.jpg'),('BA005','Mother Of Pearl Abalone','mother of pearl kerang abalone','../public/assets/bahan/BA005.jpg'),('BA006','Cedar','kayu cedar','../public/assets/bahan/BA006.jpg'),('BA007','Teakwood','kayu jati','../public/assets/bahan/BA007.jpg'),('BA008','Maple','kayu maple','../public/assets/bahan/BA008.jpg');

/*Table structure for table `detailhargabahan` */

DROP TABLE IF EXISTS `detailhargabahan`;

CREATE TABLE `detailhargabahan` (
  `idDetailHargaBahan` int(11) NOT NULL AUTO_INCREMENT,
  `idPesanan` varchar(14) DEFAULT NULL,
  `idHargaBahan` varchar(5) DEFAULT NULL,
  PRIMARY KEY (`idDetailHargaBahan`),
  KEY `idPesanan` (`idPesanan`),
  KEY `idHargaBahan` (`idHargaBahan`),
  CONSTRAINT `detailhargabahan_ibfk_1` FOREIGN KEY (`idPesanan`) REFERENCES `pesanan` (`idPesanan`) ON DELETE SET NULL ON UPDATE NO ACTION,
  CONSTRAINT `detailhargabahan_ibfk_2` FOREIGN KEY (`idHargaBahan`) REFERENCES `hargabahan` (`idHargaBahan`) ON DELETE SET NULL ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=latin1;

/*Data for the table `detailhargabahan` */

insert  into `detailhargabahan`(`idDetailHargaBahan`,`idPesanan`,`idHargaBahan`) values (1,'WGM20180101001','HB018'),(2,'WGM20180101001','HB021'),(3,'WGM20180101001','HB024'),(4,'WGM20180101001','HB037'),(5,'WGM20180101001','HB010'),(6,'WGM20180101001',NULL),(7,'WGM20180101001','HB001'),(8,'WGM20180101001','HB007'),(9,'WGM20180101001',NULL),(10,'WGM20180101001',NULL),(11,'WGM20180108002','HB041'),(12,'WGM20180108002','HB042'),(13,'WGM20180108002','HB024'),(14,'WGM20180108002','HB035'),(15,'WGM20180108002','HB010'),(16,'WGM20180108002','HB016'),(17,'WGM20180108002','HB001'),(18,'WGM20180108002','HB007'),(19,'WGM20180108002','HB033'),(20,'WGM20180108002','HB029'),(21,'WGM20180110003','HB018'),(22,'WGM20180110003','HB021'),(23,'WGM20180110003','HB024'),(24,'WGM20180110003','HB035'),(25,'WGM20180110003','HB010'),(26,'WGM20180110003','HB016'),(27,'WGM20180110003','HB001'),(28,'WGM20180110003','HB007'),(29,'WGM20180110003','HB033'),(30,'WGM20180110003','HB029');

/*Table structure for table `detailmodel` */

DROP TABLE IF EXISTS `detailmodel`;

CREATE TABLE `detailmodel` (
  `idDetailModel` int(11) NOT NULL AUTO_INCREMENT,
  `idPesanan` varchar(14) DEFAULT NULL,
  `idModel` varchar(5) DEFAULT NULL,
  PRIMARY KEY (`idDetailModel`),
  KEY `idPesanan` (`idPesanan`),
  KEY `idModel` (`idModel`),
  CONSTRAINT `detailmodel_ibfk_1` FOREIGN KEY (`idPesanan`) REFERENCES `pesanan` (`idPesanan`) ON DELETE SET NULL ON UPDATE NO ACTION,
  CONSTRAINT `detailmodel_ibfk_2` FOREIGN KEY (`idModel`) REFERENCES `model` (`idModel`) ON DELETE SET NULL ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=79 DEFAULT CHARSET=latin1;

/*Data for the table `detailmodel` */

insert  into `detailmodel`(`idDetailModel`,`idPesanan`,`idModel`) values (40,'WGM20180101001','MO002'),(41,'WGM20180101001','MO024'),(42,'WGM20180101001','MO021'),(43,'WGM20180101001','MO001'),(44,'WGM20180101001','MO011'),(45,'WGM20180101001','MO012'),(46,'WGM20180101001','MO026'),(47,'WGM20180101001','MO008'),(48,'WGM20180101001','MO009'),(49,'WGM20180101001','MO015'),(50,'WGM20180101001','MO013'),(51,'WGM20180101001','MO023'),(52,'WGM20180101001','MO025'),(53,'WGM20180108002','MO006'),(54,'WGM20180108002','MO024'),(55,'WGM20180108002','MO021'),(56,'WGM20180108002','MO001'),(57,'WGM20180108002','MO011'),(58,'WGM20180108002','MO012'),(59,'WGM20180108002','MO026'),(60,'WGM20180108002','MO008'),(61,'WGM20180108002','MO009'),(62,'WGM20180108002','MO015'),(63,'WGM20180108002','MO013'),(64,'WGM20180108002','MO023'),(65,'WGM20180108002','MO025'),(66,'WGM20180110003','MO002'),(67,'WGM20180110003','MO024'),(68,'WGM20180110003','MO021'),(69,'WGM20180110003','MO001'),(70,'WGM20180110003','MO011'),(71,'WGM20180110003','MO012'),(72,'WGM20180110003','MO026'),(73,'WGM20180110003','MO008'),(74,'WGM20180110003','MO009'),(75,'WGM20180110003','MO015'),(76,'WGM20180110003','MO013'),(77,'WGM20180110003','MO023'),(78,'WGM20180110003','MO025');

/*Table structure for table `hargabahan` */

DROP TABLE IF EXISTS `hargabahan`;

CREATE TABLE `hargabahan` (
  `idHargaBahan` varchar(5) NOT NULL,
  `bagianGitar` enum('Logo','Neck Dan Headstock','Fingerboard','Inlay','Body Top','Body Side Dan Back','Body Binding','Rosette','Pickguard','Bridge') DEFAULT NULL,
  `idBahan` varchar(5) DEFAULT NULL,
  `hargaBahan` int(7) DEFAULT NULL,
  PRIMARY KEY (`idHargaBahan`),
  KEY `idBahan` (`idBahan`),
  CONSTRAINT `hargabahan_ibfk_1` FOREIGN KEY (`idBahan`) REFERENCES `bahan` (`idBahan`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `hargabahan` */

insert  into `hargabahan`(`idHargaBahan`,`bagianGitar`,`idBahan`,`hargaBahan`) values ('HB001','Logo','BA001',100000),('HB002','Logo','BA002',100000),('HB003','Logo','BA003',100000),('HB004','Logo','BA004',100000),('HB005','Logo','BA005',250000),('HB007','Neck Dan Headstock','BA002',850000),('HB010','Fingerboard','BA001',250000),('HB012','Fingerboard','BA003',250000),('HB016','Inlay','BA003',250000),('HB018','Body Top','BA004',800000),('HB020','Body Side Dan Back','BA002',2000000),('HB021','Body Side Dan Back','BA003',3000000),('HB023','Body Binding','BA001',30000),('HB024','Body Binding','BA002',35000),('HB025','Body Binding','BA003',40000),('HB026','Body Binding','BA004',45000),('HB029','Rosette','BA003',250000),('HB033','Pickguard','BA003',250000),('HB035','Bridge','BA001',250000),('HB037','Bridge','BA003',250000),('HB039','Inlay','BA005',400000),('HB041','Body Top','BA006',900000),('HB042','Body Side Dan Back','BA007',1000000),('HB043','Neck Dan Headstock','BA008',900000),('HB044','Pickguard','BA008',250000),('HB045','Rosette','BA008',250000),('HB046','Inlay','BA008',250000);

/*Table structure for table `model` */

DROP TABLE IF EXISTS `model`;

CREATE TABLE `model` (
  `idModel` varchar(5) NOT NULL,
  `namaModel` varchar(50) DEFAULT NULL,
  `keteranganModel` text,
  `hargaModel` int(7) DEFAULT NULL,
  `bagianGitar` enum('Tuning Machine','Logo','Neck Dan Headstock','Nut','Fingerboard','Fret','Inlay','Body','Rosette','Pickguard','Bridge','Saddle','Bridge Pin','String') DEFAULT NULL,
  `gambarModel` varchar(50) DEFAULT NULL,
  `model3d` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`idModel`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `model` */

insert  into `model`(`idModel`,`namaModel`,`keteranganModel`,`hargaModel`,`bagianGitar`,`gambarModel`,`model3d`) values ('MO001','fingerboard','standard fingerboard',0,'Fingerboard','../public/assets/model/MO001.svg','../public/assets/model/MO001.zip'),('MO002','Dreadnought','dreadnought standar model',0,'Body','../public/assets/model/MO002.svg','../public/assets/model/MO002.zip'),('MO003','Dreadnought Venetian Cutaway','dreadnought venetian cutaway model',0,'Body','../public/assets/model/MO003.svg','../public/assets/model/MO003.zip'),('MO004','Dreadnought Florentine Cutaway','dreadnought florentine cutaway model',0,'Body','../public/assets/model/MO004.svg','../public/assets/model/MO004.zip'),('MO005','Grand Concert','grand concert model',0,'Body','../public/assets/model/MO005.svg','../public/assets/model/MO005.zip'),('MO006','Grand Concert Venetian Cutaway','grand concert venetian cutaway model',0,'Body','../public/assets/model/MO006.svg','../public/assets/model/MO006.zip'),('MO007','Grand Concert Florentine Cutaway','grand concert florentine cutaway',0,'Body','../public/assets/model/MO007.svg','../public/assets/model/MO007.zip'),('MO008','Standard','standar model neck dan headstock',0,'Neck Dan Headstock','../public/assets/model/MO008.svg','../public/assets/model/MO008.zip'),('MO009','Standard Bone','standar nut',70000,'Nut','../public/assets/model/MO009.svg','../public/assets/model/MO009.zip'),('MO010','Standard','standar model fingerboard',0,'Fingerboard','../public/assets/model/MO010.svg','../public/assets/model/MO010.zip'),('MO011','Dunlop','dunlop fret',280000,'Fret','../public/assets/model/MO011.svg','../public/assets/model/MO011.zip'),('MO012','Dot Inlay','dot inlay',0,'Inlay','../public/assets/model/MO012.svg','../public/assets/model/MO012.zip'),('MO013','Rosette 1','rosette model 1',0,'Rosette','../public/assets/model/MO013.png','../public/assets/model/MO013.zip'),('MO014','Rosette 2','model rosette 2',0,'Rosette','../public/assets/model/MO014.png','../public/assets/model/MO014.zip'),('MO015','Epiphone Hummingbird','pickguard model epiphone hummingbird',0,'Pickguard','../public/assets/model/MO015.svg','../public/assets/model/MO015.zip'),('MO016','Hofner Western','pickguard model hofner western',0,'Pickguard','../public/assets/model/MO016.svg','../public/assets/model/MO016.zip'),('MO017','Misc Shape 1','misc shape 1',0,'Pickguard','../public/assets/model/MO017.svg','../public/assets/model/MO017.zip'),('MO018','Oscar Schmidth','pickguard model oscar schmidt',0,'Pickguard','../public/assets/model/MO018.svg','../public/assets/model/MO018.zip'),('MO019','Sea Gull','pickguard model sea gull',0,'Pickguard','../public/assets/model/MO019.svg','../public/assets/model/MO019.zip'),('MO020','Taylor','pickguard model taylor',0,'Pickguard','../public/assets/model/MO020.svg','../public/assets/model/MO020.zip'),('MO021','Standar','bridge standard',0,'Bridge','../public/assets/model/MO021.svg','../public/assets/model/MO021.zip'),('MO022','Ibanez Bridge','bridge model ibanez',0,'Bridge','../public/assets/model/MO022.svg','../public/assets/model/MO022.zip'),('MO023','Standard Bone','saddle standard bone',70000,'Saddle','../public/assets/model/MO023.svg','../public/assets/model/MO023.zip'),('MO024','Standard Bone','bridge pin standar',70000,'Bridge Pin','../public/assets/model/MO024.svg','../public/assets/model/MO024.zip'),('MO025','Elixir Nanoweb Phosphor Bronze','Elixir Nanoweb Phosphor Bronze',280000,'String','../public/assets/model/MO025.svg','../public/assets/model/MO025.zip'),('MO026','Wolf Simbol','wolf simbol',0,'Logo','../public/assets/model/MO026.svg','../public/assets/model/MO026.zip');

/*Table structure for table `pengelola` */

DROP TABLE IF EXISTS `pengelola`;

CREATE TABLE `pengelola` (
  `idPengelola` varchar(7) NOT NULL,
  `username` varchar(15) DEFAULT NULL,
  `password` varchar(15) DEFAULT NULL,
  `tipe` enum('Administrator','Branding And Strategy') DEFAULT NULL,
  `namaPengelola` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`idPengelola`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `pengelola` */

insert  into `pengelola`(`idPengelola`,`username`,`password`,`tipe`,`namaPengelola`) values ('','goduz','goduz','',''),('WGMP001','alahawaw','alahawaw','Administrator','Ojan'),('WGMP002','aweu','aweu','Branding And Strategy','Ojan');

/*Table structure for table `pesanan` */

DROP TABLE IF EXISTS `pesanan`;

CREATE TABLE `pesanan` (
  `idPesanan` varchar(14) NOT NULL,
  `namaPemesan` varchar(50) DEFAULT NULL,
  `noTelp` varchar(12) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `alamat` text,
  `tglPesan` date DEFAULT NULL,
  `tglDeadline` date DEFAULT NULL,
  `totalHarga` int(8) DEFAULT NULL,
  `status` enum('Sudah Dikonfirmasi','Menunggu Konfirmasi') DEFAULT NULL,
  `finishing` enum('Gloss','Satin') DEFAULT NULL,
  `orientasi` enum('Right Handed','Left Handed') DEFAULT NULL,
  `idPengelola` varchar(7) DEFAULT NULL,
  PRIMARY KEY (`idPesanan`),
  KEY `idPengelola` (`idPengelola`),
  CONSTRAINT `pesanan_ibfk_1` FOREIGN KEY (`idPengelola`) REFERENCES `pengelola` (`idPengelola`) ON DELETE SET NULL ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `pesanan` */

insert  into `pesanan`(`idPesanan`,`namaPemesan`,`noTelp`,`email`,`alamat`,`tglPesan`,`tglDeadline`,`totalHarga`,`status`,`finishing`,`orientasi`,`idPengelola`) values ('WGM20180101001','asdf','asdf','asdf','asdf','0000-00-00','0000-00-00',6180000,'Sudah Dikonfirmasi','Gloss','Left Handed',NULL),('WGM20180108002','gggg','ggg','asdfasdf','asdfasdfasdf','0000-00-00','0000-00-00',4905000,'Menunggu Konfirmasi','Gloss','Left Handed',NULL),('WGM20180110003','ganteng','123','ganteng@email.com','jalan jalan','0000-00-00','0000-00-00',6805000,'Menunggu Konfirmasi','Gloss','Left Handed',NULL);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
