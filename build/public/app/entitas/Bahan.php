<?php
	// namespace
	namespace app\entitas;
	// use koneksi database class
	use \app\util\KoneksiDB as KoneksiDB;

	// class entitas bahan
	class Bahan extends KoneksiDB {
		private $idBahan;
		private $namaBahan;
		private $keteranganBahan;
		private $gambarBahan;

		public function __construct() {
			parent::__construct();
		}

		// set data
		public function setData($idBahan, $namaBahan, $keteranganBahan, $gambarBahan) {
			$this->idBahan 					= $idBahan;
			$this->namaBahan 				= $namaBahan;
			$this->keteranganBahan	= $keteranganBahan;
			$this->gambarBahan			= $gambarBahan;
		}

		// tambah data
		public function tambahData() {
			try {
				// query
				$query = "INSERT INTO bahan
									(idBahan, namaBahan, keteranganBahan, gambarBahan)
									VALUES
									(:idBahan, :namaBahan, :keteranganBahan, :gambarBahan)";
				// konek database menggunakan prepare statement
				$result = $this->koneksiDB->prepare($query);
				// isi value paramater pada query
				$result->bindParam(":idBahan", $this->idBahan);
				$result->bindParam(":namaBahan", $this->namaBahan);
				$result->bindParam(":keteranganBahan", $this->keteranganBahan);
				$result->bindParam(":gambarBahan", $this->gambarBahan);
				// execute query
				$result->execute();
				// return status berhasil
				return array('status' => true, 'message' => 'Data berhasil ditambahkan!');
			} catch (Exception $e) {
				// catch error, return status error
				return array('status' => false, 'message' => $e->getMessage());
			}
		}

		// ubah data
		public function ubahData() {
			try {
				// query
				$query = "UPDATE bahan SET
									namaBahan = :namaBahan,
									keteranganBahan = :keteranganBahan,
									gambarBahan = :gambarBahan
									WHERE 
									idBahan = :idBahan";
				// konek database menggunakan prepare statement
				$result = $this->koneksiDB->prepare($query);
				// isi value paramater pada query
				$result->bindParam(":idBahan", $this->idBahan);
				$result->bindParam(":namaBahan", $this->namaBahan);
				$result->bindParam(":keteranganBahan", $this->keteranganBahan);
				$result->bindParam(":gambarBahan", $this->gambarBahan);
				// execute query
				$result->execute();
				// return status berhasil
				return array('status' => true, 'message' => 'Data berhasil diubah!');
			} catch (Exception $e) {
				// catch error, return status error
				return array('status' => false, 'message' => $e->getMessage());
			}
		}

		// hapus data
		public function hapusData($idBahan) {
			try {
				// query
				$query = "DELETE FROM bahan WHERE idBahan = :idBahan";
				// konek database menggunakan prepare statement
				$result = $this->koneksiDB->prepare($query);
				// isi value paramater pada query
				$result->bindParam(":idBahan", $idBahan);
				// execute query
				$result->execute();
				// return status berhasil
				return array('status' => true, 'message' => 'Data berhasil dihapus!');
			} catch (Exception $e) {
				// catch error, return status error
				return array('status' => false, 'message' => $e->getMessage());
			}
		}

		// cari data
		public function cariData($data) {
			try {
				// query
				$query = "SELECT * FROM bahan
									WHERE
									namaBahan LIKE '%' :data '%' OR
									keteranganBahan LIKE '%' :data '%'";
				// konek database menggunakan prepare statement
				$result = $this->koneksiDB->prepare($query);
				// isi value paramater pada query
				$result->bindParam(":data", $data);
				// execute query
				$result->execute();
				// return status berhasil
				return array('status' => true, 'message' => $result->fetchAll());
			} catch (Exception $e) {
				// catch error, return status error
				return array('status' => false, 'message' => $e->getMessage());
			}
		}

		// load all data
		public function loadData() {
			try {
				// query
				$query = "SELECT * FROM bahan";
				// konek database menggunakan prepare statement
				$result = $this->koneksiDB->prepare($query);
				// execute query
				$result->execute();
				// return status berhasil
				return array('status' => true, 'message' => $result->fetchAll());
			} catch (Exception $e) {
				// catch error, return status error
				return array('status' => false, 'message' => $e->getMessage());
			}
		}

		// load data by id
		public function loadDataById($idBahan) {
			try {
				// query
				$query = "SELECT * FROM bahan WHERE idBahan = :idBahan";
				// konek database menggunakan prepare statement
				$result = $this->koneksiDB->prepare($query);
				// isi value paramater pada query
				$result->bindParam(":idBahan", $idBahan);
				// execute query
				$result->execute();
				// return status berhasil
				return array('status' => true, 'message' => $result->fetchAll());
			} catch (Exception $e) {
				// catch error, return status error
				return array('status' => false, 'message' => $e->getMessage());
			}
		}

		// get mew id
		public function getNewId() {
			try {
				// query
				// $query = "SELECT COUNT(*) FROM bahan";
				$query = "SELECT LPAD(CAST(SUBSTR(MAX(idBahan), 3) AS INT)+1, 3, 0) AS idBahan FROM bahan";
				// konek database menggunakan prepare statement
				$result = $this->koneksiDB->prepare($query);
				// execute query
				$result->execute();
				// result
				$results = $result->fetchAll();
				// prefix
				if ($results[0]['idBahan']) {
					$results[0]['idBahan'] = 'BA'.$results[0]['idBahan'];
				} else {
					$results[0]['idBahan'] = 'BA001';
				}
				// return status berhasil
				return array('status' => true, 'message' => $results);
			} catch (Exception $e) {
				// catch error, return status error
				return array('status' => false, 'message' => $e->getMessage());
			}
		}
	}
?>
