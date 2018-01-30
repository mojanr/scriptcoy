<?php  
	// namespace
	namespace app\auth;

	// use token
	use Firebase\JWT\JWT;

	// class token
	class Token {
		// secret key
		private $secret = 'wolfguitarmaster-secretkey-123';
		private $iat;
		private $data;

		// constructor
		public function __construct($data) {
			$this->iat = time();
			$this->data = $data;
		}

		public function generate() {
			// set payload data
			$payload = array(
				"iat"						=> $this->iat,
				"username" 			=> $this->data['username'],
				"namaPengelola" => $this->data['namaPengelola'],
				"tipe" 					=> $this->data['tipe']
			);

			// generate token
			$token = JWT::encode($payload, $this->secret, "HS256");
			// return token
			return $token;
		}
	}
?>