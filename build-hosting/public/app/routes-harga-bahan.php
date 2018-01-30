<?php  
	// use harga
	use \app\entitas\HargaBahan;

	// routes harga
	$app->get('/api/harga-bahan', function($request, $response) {
		// instance harga harga bahan
		$hargaBahan = new HargaBahan();
		// load data
		$result = $hargaBahan->loadData();
		// cek response success untuk prefixes url
		if ($result['status']) {
			// set prefixes
			foreach ($result['message'] as &$item) {
				$item['gambarBahan'] = $this->get('domain') . substr($item['gambarBahan'], 2);
			}
		}
		// response
		return $response->withJson($result);
	});



	// get data harga berdasarkan id
	$app->get('/api/harga-bahan/{idHargaBahan}', function($request, $response) {
		// filter var
		$idHargaBahan = filter_var($request->getAttribute('idHargaBahan'), FILTER_SANITIZE_STRING);
		// instance harga harga bahan
		$hargaBahan = new HargaBahan();
		// load data
		$result = $hargaBahan->loadDataById($idHargaBahan);
		// cek response success untuk prefixes url
		if ($result['status']) {
			// set prefixes
			foreach ($result['message'] as &$item) {
				$item['gambarBahan'] = $this->get('domain') . substr($item['gambarBahan'], 2);
			}
		}
		// response
		return $response->withJson($result);
	});



	// get data harga berdasarkan nama bagian
	$app->get('/api/harga-bahan/bagian/{bagianGitar}', function($request, $response) {
		// filter var
		$bagianGitar = filter_var($request->getAttribute('bagianGitar'), FILTER_SANITIZE_STRING);
		// instance harga harga bahan
		$hargaBahan = new HargaBahan();
		// load data
		$result = $hargaBahan->loadDataByBagian($bagianGitar);
		// cek response success untuk prefixes url
		if ($result['status']) {
			// set prefixes
			foreach ($result['message'] as &$item) {
				$item['gambarBahan'] = $this->get('domain') . substr($item['gambarBahan'], 2);
			}
		}
		// response
		return $response->withJson($result);
	});



	// get new id
	$app->get('/api/harga-bahan/new/id', function($request, $response) {
		// instance model 3d calss
		$hargaBahan = new HargaBahan();
		// get data model berdasarkan nama bagian
		$result = $hargaBahan->getNewId();
		// response result as json
		return $response->withJson($result);
	});



	// cari data
	$app->get('/api/harga-bahan/cari/{data}', function($request, $response) {
		// filter var
		$data = filter_var($request->getAttribute('data'), FILTER_SANITIZE_STRING);
		// instance bahan
		$hargaBahan = new HargaBahan();
		// load data bahan
		$result = $hargaBahan->cariData($data);
		// cek response success untuk prefixes url
		if ($result['status']) {
			// set prefixes
			foreach ($result['message'] as &$item) {
				$item['gambarBahan'] = $this->get('domain') . substr($item['gambarBahan'], 2);
			}
		}
		// response
		return $response->withJson($result);
	});



	// tambah
	$app->post('/api/harga-bahan', function($request, $response) {
		// filter var
		$idHargaBahan = filter_var($request->getParam('idHargaBahan'), FILTER_SANITIZE_STRING);
		$bagianGitar 	= filter_var($request->getParam('bagianGitar'), FILTER_SANITIZE_STRING);
		$idBahan 			= filter_var($request->getParam('idBahan'), FILTER_SANITIZE_STRING);
		$hargaBahan 	= filter_var($request->getParam('hargaBahan'), FILTER_SANITIZE_STRING);
		// instance harga bahan
		$hargaBahanClass = new HargaBahan();
		// setdata
		$hargaBahanClass->setData($idHargaBahan, $bagianGitar, $idBahan, $hargaBahan);
		// tambah data
		$result = $hargaBahanClass->tambahData();
		// return response
		return $response->withJson($result);
	});



	// ubah
	$app->put('/api/harga-bahan', function($request, $response) {
		// filter var
		$idHargaBahan = filter_var($request->getParam('idHargaBahan'), FILTER_SANITIZE_STRING);
		$bagianGitar 	= filter_var($request->getParam('bagianGitar'), FILTER_SANITIZE_STRING);
		$idBahan 			= filter_var($request->getParam('idBahan'), FILTER_SANITIZE_STRING);
		$hargaBahan 	= filter_var($request->getParam('hargaBahan'), FILTER_SANITIZE_STRING);
		// instance harga bahan
		$hargaBahanClass = new HargaBahan();
		// setdata
		$hargaBahanClass->setData($idHargaBahan, $bagianGitar, $idBahan, $hargaBahan);
		// ubah data
		$result = $hargaBahanClass->ubahData();
		// return response
		return $response->withJson($result);
	});



	// hapus
	$app->delete('/api/harga-bahan/{idHargaBahan}', function($request, $response) {
		// filter var
		$idHargaBahan = filter_var($request->getAttribute('idHargaBahan'), FILTER_SANITIZE_STRING);
		// instance new harga harga bahan
		$hargaBahan = new HargaBahan();
		// delete data
		$result = $hargaBahan->hapusData($idHargaBahan);
		// return response
		return $response->withJson($result);
	});
?>