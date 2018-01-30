<?php  
	// namespace
	namespace app\entitas;
	// use koneksi database class
	use \app\util\KoneksiDB as KoneksiDB;
	// upload file
	use Slim\Http\UploadedFile;

	// class model
	class Model extends KoneksiDB {
		// attribute
		private $idModel;
		private $namaModel;
		private $keteranganModel;
		private $hargaModel;
		private $bagianGitar;
		private $gambarModel;
		private $model3d;

		// constructor
		public function __construct() {
			parent::__construct();
		}

		// set data
		public function setData($idModel, $namaModel, $keteranganModel, $hargaModel, $bagianGitar, $gambarModel, $model3d) {
			$this->idModel 					= $idModel;
			$this->namaModel 				= $namaModel;
			$this->keteranganModel 	= $keteranganModel;
			$this->hargaModel 			= $hargaModel;
			$this->bagianGitar		 	= $bagianGitar;
			$this->gambarModel 			= $gambarModel;
			$this->model3d 					= $model3d;
		}

		// tambah data
		public function tambahData() {
			try {
				// query
				$query = "INSERT INTO model 
									(idModel, namaModel, keteranganModel, hargaModel, bagianGitar, gambarModel, model3d) 
									VALUES 
									(:idModel, :namaModel, :keteranganModel, :hargaModel, :bagianGitar, :gambarModel, :model3d)";
				// konek database menggunakan prepare statement
				$result = $this->koneksiDB->prepare($query);
				// isi value paramater pada query
				$result->bindParam(":idModel", $this->idModel);
				$result->bindParam(":namaModel", $this->namaModel);
				$result->bindParam(":keteranganModel", $this->keteranganModel);
				$result->bindParam(":hargaModel", $this->hargaModel);
				$result->bindParam(":bagianGitar", $this->bagianGitar);
				$result->bindParam(":gambarModel", $this->gambarModel);
				$result->bindParam(":model3d", $this->model3d);
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
				$query = "UPDATE model SET 
									namaModel = :namaModel,
									keteranganModel = :keteranganModel,
									hargaModel = :hargaModel,
									bagianGitar = :bagianGitar,
									gambarModel = :gambarModel,
									model3d = :model3d
									WHERE 
									idModel = :idModel";
				// konek database menggunakan prepare statement
				$result = $this->koneksiDB->prepare($query);
				// isi value paramater pada query
				$result->bindParam(":idModel", $this->idModel);
				$result->bindParam(":namaModel", $this->namaModel);
				$result->bindParam(":keteranganModel", $this->keteranganModel);
				$result->bindParam(":hargaModel", $this->hargaModel);
				$result->bindParam(":bagianGitar", $this->bagianGitar);
				$result->bindParam(":gambarModel", $this->gambarModel);
				$result->bindParam(":model3d", $this->model3d);
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
		public function hapusData($idModel) {
			try {
				// query
				$query = "DELETE FROM model WHERE idModel = :idModel";
				// konek database menggunakan prepare statement
				$result = $this->koneksiDB->prepare($query);
				// isi value paramater pada query
				$result->bindParam(":idModel", $idModel);
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
				$query = "SELECT * FROM model
									WHERE
									namaModel LIKE '%' :data '%' OR
									keteranganModel LIKE '%' :data '%' OR
									hargaModel LIKE '%' :data '%' OR
									bagianGitar LIKE '%' :data '%'";
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

		// load data
		public function loadData() {
			try {
				// query
				$query = "SELECT * FROM model ORDER BY bagianGitar ASC";
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

		// load data berdasarkan id
		public function loadDataById($idModel) {
			try {
				// query
				$query = "SELECT * FROM model WHERE idModel = :idModel";
				// konek database menggunakan prepare statement
				$result = $this->koneksiDB->prepare($query);
				// isi value paramater pada query
				$result->bindParam(":idModel", $idModel);
				// execute query
				$result->execute();
				// return status berhasil
				return array('status' => true, 'message' => $result->fetchAll());
			} catch (Exception $e) {
				// catch error, return status error
				return array('status' => false, 'message' => $e->getMessage());
			}
		}

		// load data berdasarkan bagian
		public function loadDataByBagian($bagianGitar) {
			try {
				// query
				$query = "SELECT * FROM model WHERE bagianGitar = :bagianGitar";
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

		// get mew id
		public function getNewId() {
			try {
				// query
				$query = "SELECT LPAD(CAST(SUBSTR(MAX(idModel), 3) AS INT)+1, 3, 0) AS idModel FROM model";
				// konek database menggunakan prepare statement
				$result = $this->koneksiDB->prepare($query);
				// execute query
				$result->execute();
				// result
				$results = $result->fetchAll();
				// prefix
				if ($results[0]['idModel']) {
					$results[0]['idModel'] = 'MO'.$results[0]['idModel'];
				} else {
					$results[0]['idModel'] = 'MO001';
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