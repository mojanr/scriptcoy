<?php  
	// namespace
	namespace app\entitas;
	// use koneksi database class
	use \app\util\KoneksiDB as KoneksiDB;

	// class detail model
	class DetailModel extends KoneksiDB {
		private $idPesanan;
		private $idModel;

		// constructor
		public function __construct() {
			parent::__construct();
		}

		// set data
		public function setData($idPesanan, $idModel) {
			$this->idPesanan 	= $idPesanan;
			$this->idModel 		= $idModel;
		}

		// tambah data
		public function tambahData() {
			try {
				// query
				$query = "INSERT INTO detailmodel 
									(idPesanan, idModel)
									VALUES 
									(:idPesanan, :idModel)";
				// konek database menggunakan prepare statement
				$result = $this->koneksiDB->prepare($query);
				// isi value paramater pada query
				$result->bindParam(":idPesanan", $this->idPesanan);
				$result->bindParam(":idModel", $this->idModel);
				// execute query
				$result->execute();
				// return status berhasil
				return array('status' => true, 'message' => 'Data berhasil ditambahkan!');
			} catch (Exception $e) {
				// catch error, return status error
				return array('status' => false, 'message' => $e->getMessage());
			}
		}

		// load detail model berdasarkan id pesanan
		public function loadDataByIdPesanan($idPesanan) {
			try {
				// query
				$query = "SELECT * FROM detailmodel
									JOIN model USING(idModel)
									WHERE idPesanan = :idPesanan";
				// konek database menggunakan prepare statement
				$result = $this->koneksiDB->prepare($query);
				// isi value paramater pada query
				$result->bindParam(":idPesanan", $idPesanan);
				// execute query
				$result->execute();
				// return status berhasil
				return array('status' => true, 'message' => $result->fetchAll());
			} catch (Exception $e) {
				// catch error, return status error
				return array('status' => false, 'message' => $e->getMessage());
			}
		}
	}
?>