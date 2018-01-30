<?php  
	// namespace
	namespace app\entitas;
	// use koneksi database class
	use \app\util\KoneksiDB as KoneksiDB;

	// class detail harga bahan
	class HargaBahan extends KoneksiDB {
		private $idHargaBahan;
		private $bagianGitar;
		private $idBahan;
		private $hargaBahan;

		// constructor
		public function __construct() {
			parent::__construct();
		}

		// set data
		public function setData($idHargaBahan, $bagianGitar, $idBahan, $hargaBahan) {
			$this->idHargaBahan = $idHargaBahan;
			$this->bagianGitar 	= $bagianGitar;
			$this->idBahan 	 		= $idBahan;
			$this->hargaBahan 	= $hargaBahan;
		}

		// tambah
		public function tambahData() {
			try {
				// query
				$query = "INSERT INTO hargabahan 
									(idHargaBahan, bagianGitar, idBahan, hargaBahan)
									VALUES 
									(:idHargaBahan, :bagianGitar, :idBahan, :hargaBahan)";
				// konek database menggunakan prepare statement
				$result = $this->koneksiDB->prepare($query);
				// isi value paramater pada query
				$result->bindParam(":idHargaBahan", $this->idHargaBahan);
				$result->bindParam(":bagianGitar", $this->bagianGitar);
				$result->bindParam(":idBahan", $this->idBahan);
				$result->bindParam(":hargaBahan", $this->hargaBahan);
				// execute query
				$result->execute();
				// return status berhasil
				return array('status' => true, 'message' => 'Data berhasil ditambahkan!');
			} catch (Exception $e) {
				// catch error, return status error
				return array('status' => false, 'message' => $e->getMessage());
			}
		}

		// ubah
		public function ubahData() {
			try {
				// query
				$query = "UPDATE hargabahan SET 
									bagianGitar = :bagianGitar,
									idBahan = :idBahan,
									hargaBahan = :hargaBahan
									WHERE 
									idHargaBahan = :idHargaBahan";
				// konek database menggunakan prepare statement
				$result = $this->koneksiDB->prepare($query);
				// isi value paramater pada query
				$result->bindParam(":idHargaBahan", $this->idHargaBahan);
				$result->bindParam(":bagianGitar", $this->bagianGitar);
				$result->bindParam(":idBahan", $this->idBahan);
				$result->bindParam(":hargaBahan", $this->hargaBahan);
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
		public function hapusData($idHargaBahan) {
			try {
				// query
				$query = "DELETE FROM hargabahan WHERE idHargaBahan = :idHargaBahan";
				// konek database menggunakan prepare statement
				$result = $this->koneksiDB->prepare($query);
				// isi value paramater pada query
				$result->bindParam(":idHargaBahan", $idHargaBahan);
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
			// ubah query
			try {
				// query
				$query = "SELECT * FROM hargabahan
									JOIN bahan USING(idBahan)
									WHERE
									bagianGitar LIKE '%' :data '%' OR
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
				$query = "SELECT * FROM hargabahan
									JOIN bahan USING(idBahan) ORDER BY bagianGitar ASC";
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
		public function loadDataById($idHargaBahan) {
			try {
				// query
				$query = "SELECT * FROM hargabahan 
									JOIN bahan USING(idBahan)
									WHERE idHargaBahan = :idHargaBahan";
				// konek database menggunakan prepare statement
				$result = $this->koneksiDB->prepare($query);
				// isi value paramater pada query
				$result->bindParam(":idHargaBahan", $idHargaBahan);
				// execute query
				$result->execute();
				// return status berhasil
				return array('status' => true, 'message' => $result->fetchAll());
			} catch (Exception $e) {
				// catch error, return status error
				return array('status' => false, 'message' => $e->getMessage());
			}
		}

		// load data berdasarkan nama bagian
		public function loadDataByBagian($bagianGitar) {
			try {
				// query
				$query = "SELECT * FROM hargabahan
									JOIN bahan USING(idBahan)
									WHERE bagianGitar = :bagianGitar";
				// konek database menggunakan prepare statement
				$result = $this->koneksiDB->prepare($query);
				// isi value paramater pada query
				$result->bindParam(":bagianGitar", $bagianGitar);
				// execute query
				$result->execute();
				// return status berhasil
				return array('status' => true, 'message' => $result->fetchAll());
			} catch (Exception $e) {
				// catch error, return status error
				return array('status' => false, 'message' => $e->getMessage());
			}
		}

		// get new id
		public function getNewId() {
			try {
				// query
				// $query = "SELECT MAX(id) AS 'max' FROM model3d";
				$query = "SELECT LPAD(CAST(SUBSTR(MAX(idHargaBahan), 3) AS INT)+1, 3, 0) AS idHargaBahan FROM hargabahan";
				// konek database menggunakan prepare statement
				$result = $this->koneksiDB->prepare($query);
				// execute query
				$result->execute();
				// result
				$results = $result->fetchAll();
				// prefix
				if ($results[0]['idHargaBahan']) {
					$results[0]['idHargaBahan'] = 'HB'.$results[0]['idHargaBahan'];
				} else {
					$results[0]['idHargaBahan'] = 'HB001';
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