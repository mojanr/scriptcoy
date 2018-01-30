<?php
	// namespance
	namespace app\entitas;
	// use koneksi database
	use \app\util\KoneksiDB;

	// class detail harga bahan
	class DetailHargaBahan extends KoneksiDB {
		private $idPesanan;
		private $idHargaBahan;

		// constructor
		public function __construct() {
			parent::__construct();
		}

		// set data
		public function setData($idPesanan, $idHargaBahan) {
			$this->idPesanan 		= $idPesanan;
			$this->idHargaBahan = $idHargaBahan;
		}

		// tambah data
		public function tambahData() {
			try {
				// query
				$query = "INSERT INTO detailhargabahan
									(idPesanan, idHargaBahan)
									VALUES
									(:idPesanan, :idHargaBahan)";
				// konek database menggunakan prepare statement
				$result = $this->koneksiDB->prepare($query);
				// isi value paramater pada query
				$result->bindParam(":idPesanan", $this->idPesanan);
				$result->bindParam(":idHargaBahan", $this->idHargaBahan);
				// execute query
				$result->execute();
				// return status berhasil
				return array('status' => true, 'message' => 'Data berhasil ditambahkan!');
			} catch (Exception $e) {
				// catch error, return status error
				return array('status' => false, 'message' => $e->getMessage());
			}
		}

		// load detail harga bahan berdasarkan id pesanan
		public function loadDataByIdPesanan($idPesanan) {
			try {
				// query
				$query = "SELECT * FROM detailhargabahan
									JOIN hargabahan USING(idHargaBahan)
									JOIN bahan USING(idBahan)
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
