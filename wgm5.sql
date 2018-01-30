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
  CONSTRAINT `detailhargabahan_ibfk_1` FOREIGN KEY (`idPesanan`) REFERENCES `pesanan` (`idPesanan`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `detailhargabahan_ibfk_2` FOREIGN KEY (`idHargaBahan`) REFERENCES `hargabahan` (`idHargaBahan`) ON DELETE SET NULL ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=127 DEFAULT CHARSET=latin1;

/*Data for the table `detailhargabahan` */

insert  into `detailhargabahan`(`idDetailHargaBahan`,`idPesanan`,`idHargaBahan`) values (61,'WGM20180112002','HB018'),(62,'WGM20180112002','HB021'),(63,'WGM20180112002','HB024'),(64,'WGM20180112002','HB035'),(65,'WGM20180112002','HB010'),(66,'WGM20180112002','HB016'),(67,'WGM20180112002','HB002'),(68,'WGM20180112002','HB007'),(69,'WGM20180112002','HB033'),(70,'WGM20180112002','HB045'),(71,'WGM20180114003','HB018'),(72,'WGM20180114003','HB021'),(73,'WGM20180114003','HB024'),(74,'WGM20180114003','HB035'),(75,'WGM20180114003','HB010'),(76,'WGM20180114003','HB016'),(77,'WGM20180114003','HB001'),(78,'WGM20180114003','HB007'),(79,'WGM20180114003','HB033'),(80,'WGM20180114003','HB029'),(81,'WGM20180114004','HB018'),(82,'WGM20180114004','HB021'),(83,'WGM20180114004','HB024'),(84,'WGM20180114004','HB035'),(85,'WGM20180114004','HB010'),(86,'WGM20180114004','HB016'),(87,'WGM20180114004','HB001'),(88,'WGM20180114004','HB007'),(89,'WGM20180114004','HB033'),(90,'WGM20180114004','HB029'),(91,'WGM20180114005','HB018'),(92,'WGM20180114005','HB021'),(93,'WGM20180114005','HB024'),(94,'WGM20180114005','HB035'),(95,'WGM20180114005','HB010'),(96,'WGM20180114005','HB016'),(97,'WGM20180114005','HB001'),(98,'WGM20180114005','HB007'),(99,'WGM20180114005','HB033'),(100,'WGM20180114005','HB029'),(101,'WGM20180115006','HB018'),(102,'WGM20180115006','HB021'),(103,'WGM20180115006','HB024'),(104,'WGM20180115006','HB035'),(105,'WGM20180115006','HB010'),(106,'WGM20180115006','HB016'),(107,'WGM20180115006','HB002'),(108,'WGM20180115006','HB007'),(109,'WGM20180115006','HB033'),(110,'WGM20180115006','HB029'),(111,'WGM20180115007','HB018'),(112,'WGM20180115007','HB021'),(113,'WGM20180115007','HB024'),(114,'WGM20180115007','HB035'),(115,'WGM20180115007','HB010'),(116,'WGM20180115007','HB016'),(117,'WGM20180115007','HB002'),(118,'WGM20180115007','HB007'),(119,'WGM20180115007','HB033'),(120,'WGM20180115007','HB029'),(121,'WGM20180115008','HB018'),(122,'WGM20180115008','HB042'),(123,'WGM20180115008','HB023'),(124,'WGM20180115008','HB035'),(125,'WGM20180115008','HB010'),(126,'WGM20180115008','HB007');

/*Table structure for table `detailmodel` */

DROP TABLE IF EXISTS `detailmodel`;

CREATE TABLE `detailmodel` (
  `idDetailModel` int(11) NOT NULL AUTO_INCREMENT,
  `idPesanan` varchar(14) DEFAULT NULL,
  `idModel` varchar(5) DEFAULT NULL,
  PRIMARY KEY (`idDetailModel`),
  KEY `idPesanan` (`idPesanan`),
  KEY `idModel` (`idModel`),
  CONSTRAINT `detailmodel_ibfk_1` FOREIGN KEY (`idPesanan`) REFERENCES `pesanan` (`idPesanan`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `detailmodel_ibfk_2` FOREIGN KEY (`idModel`) REFERENCES `model` (`idModel`) ON DELETE SET NULL ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=208 DEFAULT CHARSET=latin1;

/*Data for the table `detailmodel` */

insert  into `detailmodel`(`idDetailModel`,`idPesanan`,`idModel`) values (118,'WGM20180112002','MO002'),(119,'WGM20180112002','MO024'),(120,'WGM20180112002','MO021'),(121,'WGM20180112002','MO001'),(122,'WGM20180112002','MO011'),(123,'WGM20180112002','MO012'),(124,'WGM20180112002','MO026'),(125,'WGM20180112002','MO008'),(126,'WGM20180112002','MO009'),(127,'WGM20180112002','MO015'),(128,'WGM20180112002','MO013'),(129,'WGM20180112002','MO023'),(130,'WGM20180112002','MO025'),(131,'WGM20180114003','MO002'),(132,'WGM20180114003','MO024'),(133,'WGM20180114003','MO021'),(134,'WGM20180114003','MO001'),(135,'WGM20180114003','MO011'),(136,'WGM20180114003','MO012'),(137,'WGM20180114003','MO026'),(138,'WGM20180114003','MO008'),(139,'WGM20180114003','MO009'),(140,'WGM20180114003','MO015'),(141,'WGM20180114003','MO013'),(142,'WGM20180114003','MO023'),(143,'WGM20180114003','MO025'),(144,'WGM20180114004','MO002'),(145,'WGM20180114004','MO024'),(146,'WGM20180114004','MO021'),(147,'WGM20180114004','MO001'),(148,'WGM20180114004','MO011'),(149,'WGM20180114004','MO012'),(150,'WGM20180114004','MO026'),(151,'WGM20180114004','MO008'),(152,'WGM20180114004','MO009'),(153,'WGM20180114004','MO015'),(154,'WGM20180114004','MO013'),(155,'WGM20180114004','MO023'),(156,'WGM20180114004','MO025'),(157,'WGM20180114005','MO002'),(158,'WGM20180114005','MO024'),(159,'WGM20180114005','MO021'),(160,'WGM20180114005','MO001'),(161,'WGM20180114005','MO011'),(162,'WGM20180114005','MO012'),(163,'WGM20180114005','MO026'),(164,'WGM20180114005','MO008'),(165,'WGM20180114005','MO009'),(166,'WGM20180114005','MO015'),(167,'WGM20180114005','MO013'),(168,'WGM20180114005','MO023'),(169,'WGM20180114005','MO025'),(170,'WGM20180115006','MO002'),(171,'WGM20180115006','MO024'),(172,'WGM20180115006','MO021'),(173,'WGM20180115006','MO001'),(174,'WGM20180115006','MO011'),(175,'WGM20180115006','MO012'),(176,'WGM20180115006','MO026'),(177,'WGM20180115006','MO008'),(178,'WGM20180115006','MO009'),(179,'WGM20180115006','MO015'),(180,'WGM20180115006','MO013'),(181,'WGM20180115006','MO023'),(182,'WGM20180115006','MO027'),(183,'WGM20180115006','MO025'),(184,'WGM20180115007','MO002'),(185,'WGM20180115007','MO024'),(186,'WGM20180115007','MO021'),(187,'WGM20180115007','MO001'),(188,'WGM20180115007','MO011'),(189,'WGM20180115007','MO012'),(190,'WGM20180115007','MO026'),(191,'WGM20180115007','MO008'),(192,'WGM20180115007','MO009'),(193,'WGM20180115007','MO015'),(194,'WGM20180115007','MO013'),(195,'WGM20180115007','MO023'),(196,'WGM20180115007','MO027'),(197,'WGM20180115007','MO025'),(198,'WGM20180115008','MO002'),(199,'WGM20180115008','MO024'),(200,'WGM20180115008','MO021'),(201,'WGM20180115008','MO001'),(202,'WGM20180115008','MO011'),(203,'WGM20180115008','MO008'),(204,'WGM20180115008','MO009'),(205,'WGM20180115008','MO023'),(206,'WGM20180115008','MO027'),(207,'WGM20180115008','MO025');

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

insert  into `model`(`idModel`,`namaModel`,`keteranganModel`,`hargaModel`,`bagianGitar`,`gambarModel`,`model3d`) values ('MO001','fingerboard','standard fingerboard',0,'Fingerboard','../public/assets/model/MO001.svg','../public/assets/model/MO001.zip'),('MO002','Dreadnought','dreadnought standar model',0,'Body','../public/assets/model/MO002.svg','../public/assets/model/MO002.zip'),('MO003','Dreadnought Venetian Cutaway','dreadnought venetian cutaway model',0,'Body','../public/assets/model/MO003.svg','../public/assets/model/MO003.zip'),('MO004','Dreadnought Florentine Cutaway','dreadnought florentine cutaway model',0,'Body','../public/assets/model/MO004.svg','../public/assets/model/MO004.zip'),('MO005','Grand Concert','grand concert model',0,'Body','../public/assets/model/MO005.svg','../public/assets/model/MO005.zip'),('MO006','Grand Concert Venetian Cutaway','grand concert venetian cutaway model',0,'Body','../public/assets/model/MO006.svg','../public/assets/model/MO006.zip'),('MO007','Grand Concert Florentine Cutaway','grand concert florentine cutaway',0,'Body','../public/assets/model/MO007.svg','../public/assets/model/MO007.zip'),('MO008','Standard','standar model neck dan headstock',0,'Neck Dan Headstock','../public/assets/model/MO008.svg','../public/assets/model/MO008.zip'),('MO009','Standard Bone','standar nut',70000,'Nut','../public/assets/model/MO009.jpg','../public/assets/model/MO009.zip'),('MO011','Dunlop','dunlop fret',280000,'Fret','../public/assets/model/MO011.jpg','../public/assets/model/MO011.zip'),('MO012','Dot Inlay','dot inlay',0,'Inlay','../public/assets/model/MO012.svg','../public/assets/model/MO012.zip'),('MO013','Rosette 1','rosette model 1',0,'Rosette','../public/assets/model/MO013.png','../public/assets/model/MO013.zip'),('MO014','Rosette 2','model rosette 2',0,'Rosette','../public/assets/model/MO014.png','../public/assets/model/MO014.zip'),('MO015','Epiphone Hummingbird','pickguard model epiphone hummingbird',0,'Pickguard','../public/assets/model/MO015.svg','../public/assets/model/MO015.zip'),('MO016','Hofner Western','pickguard model hofner western',0,'Pickguard','../public/assets/model/MO016.svg','../public/assets/model/MO016.zip'),('MO017','Misc Shape 1','misc shape 1',0,'Pickguard','../public/assets/model/MO017.svg','../public/assets/model/MO017.zip'),('MO018','Oscar Schmidth','pickguard model oscar schmidt',0,'Pickguard','../public/assets/model/MO018.svg','../public/assets/model/MO018.zip'),('MO019','Sea Gull','pickguard model sea gull',0,'Pickguard','../public/assets/model/MO019.svg','../public/assets/model/MO019.zip'),('MO020','Taylor','pickguard model taylor',0,'Pickguard','../public/assets/model/MO020.svg','../public/assets/model/MO020.zip'),('MO021','Standar','bridge standard',0,'Bridge','../public/assets/model/MO021.svg','../public/assets/model/MO021.zip'),('MO022','Ibanez Bridge','bridge model ibanez',0,'Bridge','../public/assets/model/MO022.svg','../public/assets/model/MO022.zip'),('MO023','Standard Bone','saddle standard bone',70000,'Saddle','../public/assets/model/MO023.jpg','../public/assets/model/MO023.zip'),('MO024','Standard Bone','bridge pin standar',70000,'Bridge Pin','../public/assets/model/MO024.jpg','../public/assets/model/MO024.zip'),('MO025','Elixir Nanoweb Phosphor Bronze','Elixir Nanoweb Phosphor Bronze',280000,'String','../public/assets/model/MO025.jpg','../public/assets/model/MO025.zip'),('MO026','Wolf Simbol','wolf simbol',0,'Logo','../public/assets/model/MO026.svg','../public/assets/model/MO026.zip'),('MO027','Kluson Standard','kluson tuning machine standar',450000,'Tuning Machine','../public/assets/model/MO027.jpg','../public/assets/model/MO027.zip');

/*Table structure for table `pengelola` */

DROP TABLE IF EXISTS `pengelola`;

CREATE TABLE `pengelola` (
  `username` varchar(15) NOT NULL,
  `password` varchar(15) DEFAULT NULL,
  `tipe` enum('Administrator','Branding And Strategy') DEFAULT NULL,
  `namaPengelola` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `pengelola` */

insert  into `pengelola`(`username`,`password`,`tipe`,`namaPengelola`) values ('alahawaw','alahawaw','Administrator','ojan'),('goduz','goduz','Administrator','Hari Gunawan'),('gunawan','goduz','Branding And Strategy','Hari Gunawan'),('ojan','ojan','Branding And Strategy','ojan');

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
  `username` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`idPesanan`),
  KEY `idPengelola` (`username`),
  CONSTRAINT `pesanan_ibfk_1` FOREIGN KEY (`username`) REFERENCES `pengelola` (`username`) ON DELETE SET NULL ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `pesanan` */

insert  into `pesanan`(`idPesanan`,`namaPemesan`,`noTelp`,`email`,`alamat`,`tglPesan`,`tglDeadline`,`totalHarga`,`status`,`finishing`,`orientasi`,`username`) values ('WGM20180112002','asdf','asdf','asdf','fasdf','2018-01-12','2018-03-12',6805000,'Menunggu Konfirmasi','Gloss','Left Handed',NULL),('WGM20180114003','asdf','asdf','asf','sadf','2018-01-14','2018-02-14',6805000,'Menunggu Konfirmasi','Gloss','Left Handed',NULL),('WGM20180114004','asdf','asdf','asdf','asdf','2018-01-14','2018-03-14',6805000,'Menunggu Konfirmasi','Gloss','Right Handed',NULL),('WGM20180114005','ggg','gg','gg','gg','2018-01-14','2018-03-14',6805000,'Menunggu Konfirmasi','Satin','Right Handed',NULL),('WGM20180115006','fauzan','08322312356','fauzan@gmail.com','Jl. sukarajin 2','2018-01-15','2018-02-15',7255000,'Menunggu Konfirmasi','Gloss','Right Handed',NULL),('WGM20180115007','hari andrian','082321152723','fauzan@yahoo.co.id','jalan cicukang ','2018-01-15','2018-02-15',7255000,'Menunggu Konfirmasi','Gloss','Right Handed',NULL),('WGM20180115008','purba','0123456789','babackp@yahoo.com','jalan','2018-01-15','2018-02-15',4400000,'Menunggu Konfirmasi','Gloss','Right Handed',NULL);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
