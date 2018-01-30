<?php  
	// use akun
	use \app\entitas\Akun;
	// routes akun

	// load data akun
	$app->get('/api/akun', function($request, $response) {
		// instance akun
		$akun = new Akun();
		// load data akun
		$result = $akun->loadData();
		// response
		return $response->withJson($result);
	});



	// get data berdasarkan id
	$app->get('/api/akun/{idPetugas}', function($request, $response) {
		// filter var
		$idPetugas = filter_var($request->getAttribute('idPetugas'), FILTER_SANITIZE_STRING);
		// instance
		$akun = new Akun();
		// get data berdasarkan id
		$result = $akun->loadDataById($idPetugas);
		// response result as json
		return $response->withJson($result);
	});



	// get new id
	$app->get('/api/akun/new/id', function($request, $response) {
		// instance
		$akun = new Akun();
		// load new id
		$result = $akun->getNewId();
		// response
		return $response->withJson($result);
	});



	// cari data
	$app->get('/api/akun/cari/{data}', function($request, $response) {
		// filter var
		$data = filter_var($request->getAttribute('data'), FILTER_SANITIZE_STRING);
		// instance
		$akun = new Akun();
		// load data
		$result = $akun->cariData($data);
		// response
		return $response->withJson($result);
	});



	// tambah data
	$app->post('/api/akun/tambah', function($request, $response) {
		// filter var
		$idPetugas 		= filter_var($request->getParam('idPetugas'), FILTER_SANITIZE_STRING);
		$username 		= filter_var($request->getParam('username'), FILTER_SANITIZE_STRING);
		$password 		= filter_var($request->getParam('password'), FILTER_SANITIZE_STRING);
		// instance 
		$akun = new Akun();
		// set data
		$akun->setData($idPetugas, $username, $password);
		// tambah data
		$result = $akun->tambahData();
		// return response
		return $response->withJson($result);
	});



	// ubah data
	$app->post('/api/akun/ubah', function($request, $response) {
		// filter var
		$idPetugas 		= filter_var($request->getParam('idPetugas'), FILTER_SANITIZE_STRING);
		$username 		= filter_var($request->getParam('username'), FILTER_SANITIZE_STRING);
		$password 		= filter_var($request->getParam('password'), FILTER_SANITIZE_STRING);
		// instance
		$akun = new Akun();
		// set data
		$akun->setData($idPetugas, $username, $password);
		// tambah data
		$result = $akun->ubahData();
		// return response
		return $response->withJson($result);
	});



	// hapus
	$app->delete('/api/akun/{idPetugas}', function($request, $response) {
		// filter var
		$idPetugas = filter_var($request->getParam('idPetugas'), FILTER_SANITIZE_STRING);
		// instance
		$akun = new Akun();
		// delete data
		$resultHapus = $akun->hapusData($idPetugas);
		// return response
		return $response->withJson($result);
	});	
?>