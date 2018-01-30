<?php  
	// namespace
	namespace app\entitas;
	// use koneksi database class
	use \app\util\KoneksiDB as KoneksiDB;
	
	class Akun extends KoneksiDB {
		private $idPetugas;
		private $username;
		private $password;

		public function __construct() {
			parent::__construct();
		}

		// set data
		public function setData($idPetugas, $username, $password) {
			$this->idPetugas = $idPetugas;
			$this->username = $username;
			$this->password = $password;
		}

		// tambah data
		public function tambahData() {
			try {
				// query
				$query = "INSERT INTO akun
									(idPetugas, username, password)
									VALUES
									(:idPetugas, :username, :password)";
				// konek database menggunakan prepare statement
				$result = $this->koneksiDB->prepare($query);
				// isi value paramater pada query
				$result->bindParam(":idPetugas", $this->idPetugas);
				$result->bindParam(":username", $this->username);
				$result->bindParam(":password", $this->password);
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
				$query = "UPDATE akun SET
									username = :username,
									password = :password
									WHERE 
									idPetugas = :idPetugas";
				// konek database menggunakan prepare statement
				$result = $this->koneksiDB->prepare($query);
				// isi value paramater pada query
				$result->bindParam(":idPetugas", $this->idPetugas);
				$result->bindParam(":username", $this->username);
				$result->bindParam(":password", $this->password);
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
		public function hapusData($idPetugas) {
			try {
				// query
				$query = "DELETE FROM akun WHERE idPetugas = :idPetugas";
				// konek database menggunakan prepare statement
				$result = $this->koneksiDB->prepare($query);
				// isi value paramater pada query
				$result->bindParam(":idPetugas", $idPetugas);
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
				$query = "SELECT * FROM akun
									JOIN petugas USING(idPetugas)
									WHERE
									namaPetugas LIKE '%' :data '%'";
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
				$query = "SELECT * FROM akun
									JOIN petugas USING(idPetugas)";
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
		public function loadDataById($idPetugas) {
			try {
				// query
				$query = "SELECT * FROM akun WHERE idPetugas = :idPetugas";
				// konek database menggunakan prepare statement
				$result = $this->koneksiDB->prepare($query);
				// isi value paramater pada query
				$result->bindParam(":idPetugas", $idPetugas);
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