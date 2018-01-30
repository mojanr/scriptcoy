<?php  
	// use pengelola
	use \app\entitas\Pengelola;
	// routes pengelola

	// load data pengelola
	$app->get('/api/pengelola', function($request, $response) {
		// instance pengelola
		$pengelola = new Pengelola();
		// load data pengelola
		$result = $pengelola->loadData();
		// response
		return $response->withJson($result);
	});



	// get data berdasarkan id
	$app->get('/api/pengelola/{username}', function($request, $response) {
		// filter var
		$username = filter_var($request->getAttribute('username'), FILTER_SANITIZE_STRING);
		// instance
		$pengelola = new Pengelola();
		// get data berdasarkan id
		$result = $pengelola->loadDataById($username);
		// response result as json
		return $response->withJson($result);
	});



	// // get new id
	// $app->get('/api/pengelola/new/id', function($request, $response) {
	// 	// instance
	// 	$pengelola = new Pengelola();
	// 	// load new id
	// 	$result = $pengelola->getNewId();
	// 	// response
	// 	return $response->withJson($result);
	// });



	// cari data
	$app->get('/api/pengelola/cari/{data}', function($request, $response) {
		// filter var
		$data = filter_var($request->getAttribute('data'), FILTER_SANITIZE_STRING);
		// instance
		$pengelola = new Pengelola();
		// load data
		$result = $pengelola->cariData($data);
		// response
		return $response->withJson($result);
	});



	// tambah data
	$app->post('/api/pengelola/tambah', function($request, $response) {
		// filter var
		$username 		= filter_var($request->getParam('username'), FILTER_SANITIZE_STRING);
		$password 		= filter_var($request->getParam('password'), FILTER_SANITIZE_STRING);
		$tipe 			= filter_var($request->getParam('tipe'), FILTER_SANITIZE_STRING);
		$namaPengelola 	= filter_var($request->getParam('namaPengelola'), FILTER_SANITIZE_STRING);
		// instance 
		$pengelola = new Pengelola();
		// set data
		$pengelola->setData($username, $password, $tipe, $namaPengelola);
		// tambah data
		$result = $pengelola->tambahData();
		// return response
		return $response->withJson($result);
	});



	// ubah data
	$app->post('/api/pengelola/ubah', function($request, $response) {
		/// filter var
		$username 			= filter_var($request->getParam('username'), FILTER_SANITIZE_STRING);
		$usernameLama 	= filter_var($request->getParam('usernameLama'), FILTER_SANITIZE_STRING);
		$password 			= filter_var($request->getParam('password'), FILTER_SANITIZE_STRING);
		$tipe 					= filter_var($request->getParam('tipe'), FILTER_SANITIZE_STRING);
		$namaPengelola 	= filter_var($request->getParam('namaPengelola'), FILTER_SANITIZE_STRING);
		// instance 
		$pengelola = new Pengelola();
		// set data
		$pengelola->setData($username, $password, $tipe, $namaPengelola);
		// tambah data
		$result = $pengelola->ubahData($usernameLama);
		// return response
		return $response->withJson($result);
	});



	// hapus
	$app->delete('/api/pengelola/{username}', function($request, $response) {
		// filter var
		$username = filter_var($request->getAttribute('username'), FILTER_SANITIZE_STRING);
		// instance
		$pengelola = new Pengelola();
		// delete data
		$result = $pengelola->hapusData($username);
		// return response
		return $response->withJson($result);
	});	
?>