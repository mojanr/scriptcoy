<?php  
	// namespace
	namespace app\control;
	// use koneksi database class
	use \app\util\KoneksiDB as KoneksiDB;

	// class login
	class Login extends KoneksiDB {
		private $username;
		private $password;

		// constructor
		public function __construct() {
			parent::__construct();
		}

		// set data
		public function setData($username, $password) {
			$this->username = $username;
			$this->password = $password;
		}

		// // login
		// public function login() {
		// 	// cek username dan password
		// 	if ($this->username == 'wgmadmin' && $this->password == 'wgmadmin') {
		// 		$arrayResponse = array('status' => true, 'message' => 'Berhasil login');
		// 	} else {
		// 		$arrayResponse = array('status' => false, 'message' => 'Gagal login');
		// 	}
		// 	// return response
		// 	return $arrayResponse;
		// }

		// login
		public function login() {
			try {
				// query
				$query = "SELECT username, namaPengelola, tipe FROM pengelola WHERE username = :username AND password = :password";
				// konek database menggunakan prepare statement
				$result = $this->koneksiDB->prepare($query);
				// isi value paramater pada query
				$result->bindParam(":username", $this->username);
				$result->bindParam(":password", $this->password);
				// execute query
				$result->execute();
				// return status berhasil
				$results = $result->fetchAll();
				if (count($results) >= 1) {
					// sukses login
					return array('status' => true, 'message' => $results);
				} else {
					// gagal login
					return array('status' => false, 'message' => 'Gagal login, username dan password yang dimasukkan salah!');
				}
				// return array('status' => true, 'message' => $result->fetchAll());
			} catch (Exception $e) {
				// catch error, return status error
				return array('status' => false, 'message' => $e->getMessage());
			}
		}
	}
?>