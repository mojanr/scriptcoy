<?php  
	// namespace
	namespace app\entitas;
	// use koneksi database class
	use \app\util\KoneksiDB as KoneksiDB;
	
	// class pesanan
	class Pesanan extends KoneksiDB {
		private $idPesanan;
		// info pemesan
		private $namaPemesan;
		private $noTelp;
		private $email;
		private $alamat;
		// info pemesanan
		private $tglPesan;
		private $tglDeadline;
		private $totalHarga;
		private $status;
		// info gitar
		private $finishing;
		private $orientasi;
		private $username;
		
		
		// constructor
		public function __construct() {
			parent::__construct();
		}

		// set data
		public function setData($idPesanan, $namaPemesan, $noTelp, $email, $alamat, $tglPesan, $tglDeadline, $totalHarga, $status, $finishing, $orientasi) {
			$this->idPesanan 		= $idPesanan;
			$this->namaPemesan 	= $namaPemesan;
			$this->noTelp 			= $noTelp;
			$this->email 				= $email;
			$this->alamat 			= $alamat;
			$this->tglPesan 		= $tglPesan;
			$this->tglDeadline 	= $tglDeadline;
			$this->totalHarga 	= $totalHarga;
			$this->status 			= $status;
			$this->finishing 		= $finishing;
			$this->orientasi 		= $orientasi;
		}

		// tambah 
		public function tambahData() {
			try {
				// query
				$query = "INSERT INTO pesanan 
						(idPesanan, namaPemesan, noTelp, email, alamat, tglPesan, tglDeadline, totalHarga, status, finishing, orientasi)
						VALUES 
						(:idPesanan, :namaPemesan, :noTelp, :email, :alamat, :tglPesan, :tglDeadline, :totalHarga, :status, :finishing, :orientasi)";
				// konek database menggunakan prepare statement
				$result = $this->koneksiDB->prepare($query);
				// isi value paramater pada query
				$result->bindParam(":idPesanan", $this->idPesanan);
				$result->bindParam(":namaPemesan", $this->namaPemesan);
				$result->bindParam(":noTelp", $this->noTelp);
				$result->bindParam(":email", $this->email);
				$result->bindParam(":alamat", $this->alamat);
				$result->bindParam(":tglPesan", $this->tglPesan);
				$result->bindParam(":tglDeadline", $this->tglDeadline);
				$result->bindParam(":totalHarga", $this->totalHarga);
				$result->bindParam(":status", $this->status);
				$result->bindParam(":finishing", $this->finishing);
				$result->bindParam(":orientasi", $this->orientasi);
				// execute query
				$result->execute();
				// return status berhasil
				return array('status' => true, 'message' => 'Data berhasil ditambahkan!');
			} catch (Exception $e) {
				// catch error, return status error
				return array('status' => false, 'message' => $e->getMessage());
			}
		}

		// ubah status pemesanan
		// ubah
		public function ubahStatus($idPesanan, $username, $status) {
			try {
				// query
				$query = "UPDATE pesanan SET 
									-- status = IF (status = 'Sudah Dikonfirmasi', 'Menunggu Konfirmasi', 'Sudah Dikonfirmasi'),
									status = :status,
									username = :username
									WHERE 
									idPesanan = :idPesanan";
				// konek database menggunakan prepare statement
				$result = $this->koneksiDB->prepare($query);
				// isi value paramater pada query
				$result->bindParam(":idPesanan", $idPesanan);
				$result->bindParam(":username", $username);
				$result->bindParam(":status", $status);
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
		public function hapusData($idPesanan) {
			try {
				// query
				$query = "DELETE FROM pesanan WHERE idPesanan = :idPesanan";
				// konek database menggunakan prepare statement
				$result = $this->koneksiDB->prepare($query);
				// isi value paramater pada query
				$result->bindParam(":idPesanan", $idPesanan);
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
			// ubah query
			try {
				// query
				$query = "SELECT * FROM pesanan
									WHERE
									namaPemesan LIKE '%' :data '%' OR
									noTelp LIKE '%' :data '%' OR
									email LIKE '%' :data '%' OR
									alamat LIKE '%' :data '%' OR
									tglPesan LIKE '%' :data '%' OR
									tglDeadline LIKE '%' :data '%' OR
									totalHarga LIKE '%' :data '%' OR
									status LIKE '%' :data '%' OR
									finishing LIKE '%' :data '%' OR
									orientasi LIKE '%' :data '%' OR
									username LIKE '%' :data '%'";
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

		// load data pemesanan
		public function loadData() {
			try {
				// query
				$query = "SELECT * FROM pesanan";
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

		// load data pesanan berdasarkan id
		public function loadDataById($idPesanan) {
			try {
				// query
				$query = "SELECT * FROM pesanan WHERE idPesanan = :idPesanan";
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

		// get new id pemesanan
		public function getNewId() {
			try {
				// query
				$query = "SELECT LPAD(CAST(SUBSTR(MAX(idPesanan), 12) AS INT)+1, 3, 0) AS idPesanan FROM pesanan";
				// konek database menggunakan prepare statement
				$result = $this->koneksiDB->prepare($query);
				// execute query
				$result->execute();
				// result
				$results = $result->fetchAll();
				// prefix
				if ($results[0]['idPesanan']) {
					$results[0]['idPesanan'] = 'WGM'. date('Ymd') .$results[0]['idPesanan'];
				} else {
					$results[0]['idPesanan'] = 'WGM'. date('Ymd') .'001';
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