<?php  
	// namespace
	namespace app\entitas;
	// use koneksi database class
	use \app\util\KoneksiDB as KoneksiDB;

	class Pengelola extends KoneksiDB {
		// attribute
		private $username;
		private $password;
		private $tipe;
		private $namaPengelola;

		// consturctor
		public function __construct() {
			parent::__construct();
		}

		// set data
		public function setData($username, $password, $tipe, $namaPengelola) {
			$this->username 			= $username;
			$this->password				= $password;
			$this->tipe						= $tipe;
			$this->namaPengelola	= $namaPengelola;
		}

		// tambah
		public function tambahData() {
			try {
				// query
				$query = "INSERT INTO pengelola
									(username, password, tipe, namaPengelola)
									VALUES
									(:username, :password, :tipe, :namaPengelola)";
				// konek database menggunakan prepare statement
				$result = $this->koneksiDB->prepare($query);
				// isi value paramater pada query
				$result->bindParam(":username", $this->username);
				$result->bindParam(":password", $this->password);
				$result->bindParam(":tipe", $this->tipe);
				$result->bindParam(":namaPengelola", $this->namaPengelola);
				// execute query
				$result->execute();
				// return status berhasil
				return array('status' => true, 'message' => 'Data berhasil ditambahkan!');
			} catch (Exception $e) {
				// catch error, return status error
				if ($e->getCode() == '23000') {
					return array('status' => false, 'message' => 'Username sudah digunakan!');
				} else {
					return array('status' => false, 'message' => $e->getMessage());
				}
			}
		}

		// ubah
		public function ubahData($usernameLama) {
			try {
				// query
				$query = "UPDATE pengelola SET
									username = :username,
									password = :password,
									tipe = :tipe,
									namaPengelola = :namaPengelola
									WHERE 
									username = :usernameLama";
				// konek database menggunakan prepare statement
				$result = $this->koneksiDB->prepare($query);
				// isi value paramater pada query
				$result->bindParam(":username", $this->username);
				$result->bindParam(":usernameLama", $usernameLama);
				$result->bindParam(":password", $this->password);
				$result->bindParam(":tipe", $this->tipe);
				$result->bindParam(":namaPengelola", $this->namaPengelola);
				// execute query
				$result->execute();
				// return status berhasil
				return array('status' => true, 'message' => 'Data berhasil diubah!');
			} catch (Exception $e) {
				// catch error, return status error
				// catch error, return status error
				if ($e->getCode() == '23000') {
					return array('status' => false, 'message' => 'Username sudah digunakan!');
				} else {
					return array('status' => false, 'message' => $e->getMessage());
				}
			}
		}

		// hapus
		public function hapusData($username) {
			try {
				// query
				$query = "DELETE FROM pengelola WHERE username = :username";
				// konek database menggunakan prepare statement
				$result = $this->koneksiDB->prepare($query);
				// isi value paramater pada query
				$result->bindParam(":username", $username);
				// execute query
				$result->execute();
				// return status berhasil
				return array('status' => true, 'message' => 'Data berhasil dihapus!');
			} catch (Exception $e) {
				// catch error, return status error
				return array('status' => false, 'message' => $e->getMessage());
			}
		}

		// cari
		public function cariData($data) {
			try {
				// query
				$query = "SELECT * FROM pengelola
									WHERE
									namaPengelola LIKE '%' :data '%' OR
									tipe LIKE '%' :data '%'";
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
				$query = "SELECT * FROM pengelola";
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
		public function loadDataById($username) {
			try {
				// query
				$query = "SELECT * FROM pengelola WHERE username = :username";
				// konek database menggunakan prepare statement
				$result = $this->koneksiDB->prepare($query);
				// isi value paramater pada query
				$result->bindParam(":username", $username);
				// execute query
				$result->execute();
				// return status berhasil
				return array('status' => true, 'message' => $result->fetchAll());
			} catch (Exception $e) {
				// catch error, return status error
				return array('status' => false, 'message' => $e->getMessage());
			}
		}

		// // get mew id
		// public function getNewId() {
		// 	try {
		// 		// query
		// 		$query = "SELECT LPAD(CAST(SUBSTR(MAX(idPengelola), 5) AS INT)+1, 3, 0) AS idPengelola FROM pengelola";
		// 		// konek database menggunakan prepare statement
		// 		$result = $this->koneksiDB->prepare($query);
		// 		// execute query
		// 		$result->execute();
		// 		// result
		// 		$results = $result->fetchAll();
		// 		// prefix
		// 		if ($results[0]['idPengelola']) {
		// 			$results[0]['idPengelola'] = 'WGMP'.$results[0]['idPengelola'];
		// 		} else {
		// 			$results[0]['idPengelola'] = 'WGMP001';
		// 		}
		// 		// return status berhasil
		// 		return array('status' => true, 'message' => $results);
		// 	} catch (Exception $e) {
		// 		// catch error, return status error
		// 		return array('status' => false, 'message' => $e->getMessage());
		// 	}
		// }
	}
?>