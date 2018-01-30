<?php  
	// namespace
	namespace app\util;
	// use pdo class
	use \PDO as PDO;

	// class koneksi database
	class KoneksiDB {
		// atribute
		// hosting
		// private $host 				= 'localhost';
		// private $namaDatabase = 'database';
		// private $username			= 'root';
		// private $password			= '';
		// protected $koneksiDB;

		// local development
		private $host 				= 'localhost';
		private $namaDatabase = 'wgm';
		private $username			= 'root';
		private $password			= '';
		protected $koneksiDB;

		// constructor method
		public function __construct() {
			try {
				// buat koneksi ke database
				$this->koneksiDB = new PDO('mysql:host='.$this->host.';dbname='.$this->namaDatabase.';charset=UTF8', $this->username, $this->password);
				// error mode
				$this->koneksiDB->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
				// fetch mode
				$this->koneksiDB->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
			} catch (PDOException $e) {
				// catch error
				$arrayResponse = array('status' => false, 'message' => $e->getMessage());
				echo json_encode($arrayResponse);
				die();
			}
		}
	}
?>