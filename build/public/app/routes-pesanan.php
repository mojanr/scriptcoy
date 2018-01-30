<?php  
	// use pesanan class
	use \app\entitas\Pesanan;
	// use detail model
	use \app\entitas\DetailModel;
	// use detaul bahan
	use \app\entitas\DetailHargaBahan;

	// load data pesanan
	$app->get('/api/pesanan', function($request, $response) {
		// instance pesanan
		$pesanan = new Pesanan();
		// load data pesanan
		$result = $pesanan->loadData();
		// response
		return $response->withJson($result);
	});



	// get data pesanan berdasarkan id pesanan
	$app->get('/api/pesanan/{idPesanan}', function($request, $response) {
		// filter var
		$idPesanan = filter_var($request->getAttribute('idPesanan'), FILTER_SANITIZE_STRING);
		// instance pesanan
		$pesanan = new Pesanan();
		// get data berdasarkan id
		$result = $pesanan->loadDataById($idPesanan);


		// detail model
		$detailModel = new DetailModel();
		// get data berdasarkan id pesanan
		$detailModelResult = $detailModel->loadDataByIdPesanan($idPesanan);
		// prefix
		if ($detailModelResult['status']) {
			// set prefixes
			foreach ($detailModelResult['message'] as &$item) {
				$item['gambarModel'] = $this->get('domain') . substr($item['gambarModel'], 2);
				$item['model3d'] = $this->get('domain') . substr($item['model3d'], 2);
			}
		}


		// detail harga bahan
		$detailHargaBahan = new DetailHargaBahan();
		// get data berdasarkan id pesanan
		$detailHargaBahan = $detailHargaBahan->loadDataByIdPesanan($idPesanan);
		// prefix
		if ($detailHargaBahan['status']) {
			// set prefixes
			foreach ($detailHargaBahan['message'] as &$item) {
				$item['gambarBahan'] = $this->get('domain') . substr($item['gambarBahan'], 2);
			}
		}
		
		// r

		// array_push($result['message'][0], array(
		// 	'gitar' => array(
		// 		'model' => "xxx", 
		// 		'bahan' => "tttt"
		// 	)
		// ));
		$result['message'][0]['gitar'] = array(
			'model' => $detailModelResult['message'], 
			'bahan' => $detailHargaBahan['message']
		);

		// response
		return $response->withJson($result);
		// var_dump($result);
	});



	// get new id
	$app->get('/api/pesanan/new/id', function($request, $response) {
		// instance pesanan
		$pesanan = new Pesanan();
		// get new id
		$result = $pesanan->getNewId();
		// response
		return $response->withJson($result);
	});



	// cari
	$app->get('/api/pesanan/cari/{data}', function($request, $response) {
		// filter var
		$data = filter_var($request->getParam('data'), FILTER_SANITIZE_STRING);
		// instance pesanan
		$pesanan = new Pesanan();
		// cari data
		$result = $pesanan->cariData($data);
		// response
		return $response->withJson($result);
	});



	// tambah data pesanan
	$app->post('/api/pesanan', function($request, $response) {
		$pesanan = new Pesanan();
		// // filter var
		// // $idPesanan 		= filter_var($request->getParam('idPesanan'), FILTER_SANITIZE_STRING);
		// $idPesanan 		= $pesanan->getNewId();
		// $namaPemesan 	= filter_var($request->getParam('namaPemesan'), FILTER_SANITIZE_STRING);
		// $noTelp 			= filter_var($request->getParam('noTelp'), FILTER_SANITIZE_STRING);
		// $email 				= filter_var($request->getParam('email'), FILTER_SANITIZE_STRING);
		// $alamat 			= filter_var($request->getParam('alamat'), FILTER_SANITIZE_STRING);
		// // $tglPesan 		= filter_var($request->getParam('tglPesan'), FILTER_SANITIZE_STRING);
		// $tglPesan			= date('dd-MM-YYYY');
		// // $tglDeadline 	= filter_var($request->getParam('tglDeadline'), FILTER_SANITIZE_STRING);
		// $tglDeadline	= date('dd-MM-YYYY');
		// // $totalHarga 	= filter_var($request->getParam('totalHarga'), FILTER_SANITIZE_STRING);
		// // $status 			= filter_var($request->getParam('status'), FILTER_SANITIZE_STRING);
		// $finishing 		= filter_var($request->getParam('finishing'), FILTER_SANITIZE_STRING);
		// // tambahan hapus / diilangin / ga pake
		// // $tambahan 		= filter_var($request->getParam('tambahan'), FILTER_SANITIZE_STRING);

		// $dataModel;
		// $dataBahan;

		// filter var
		$data = filter_var($request->getParam('data'), FILTER_SANITIZE_STRING);
		// decode
		$data = json_decode(str_replace("&#34;","\"",$data), true);

		// $idPesanan 		= $pesanan->getNewId()['message'];
		$result 				= $pesanan->getNewId();
		$idPesanan 			= $result['message'][0]['idPesanan'];
		$namaPemesan 		= $data['namaPemesan'];
		$noTelp 				= $data['noTelp'];
		$email 					= $data['email'];
		$alamat 				= $data['alamat'];
		$lamaPembuatan	= $data['lamaPembuatan'];
		$tglPesan				= date('Y-m-d');
		$tglDeadline		= date('Y-m-d', strtotime($lamaPembuatan, strtotime($tglPesan)));
		$status 				= 'Menunggu Konfirmasi';
		// tambahan hapus / diilangin / ga pake
		// $idPengelola 	= $data['idPengelola'];

		// data gitar
		$totalHarga 	= $data['gitar']['totalHarga'];
		// $orientasi		= $data['gitar']['orientasi'];
		$orientasi		= $data['gitar']['orientasi'];
		$finishing 		= $data['gitar']['finishing'];
		$dataGitar 		= $data['gitar']['gitar'];

		// return $response->withJson($tglDeadline);

		// set data
		$pesanan->setData(
			$idPesanan, 
			$namaPemesan, 
			$noTelp, 
			$email, 
			$alamat, 
			$tglPesan, 
			$tglDeadline, 
			$totalHarga, 
			$status, 
			$finishing,
			$orientasi 
		);
		$pesanan->tambahData();

		// instance detail model
		$detailModel = new DetailModel();
		// add ke database
		foreach ($dataGitar['model'] as $item) {
			// set data
			$detailModel->setData($idPesanan, $item);
			// // tambah ke database
			$detailModel->tambahData();
		}

		// instance detail bahan
		$detailHargaBahan = new DetailHargaBahan();
		// add ke database
		foreach ($dataGitar['bahan'] as $item) {
			// set data
			$detailHargaBahan->setData($idPesanan, $item);
			// tambah ke database
			$detailHargaBahan->tambahData();
		}
		// 'Data berhasil ditambahkan!'
		$arrayResponse = array('status' => true, 'message' => 'Data berhasil ditambahkan!');
		return $response->withJson($arrayResponse);
	});



	// ubah status pesanan
	$app->put('/api/pesanan/{idPesanan}', function($request, $response) {
		// filter var
		$idPesanan = filter_var($request->getAttribute('idPesanan'), FILTER_SANITIZE_STRING);
		$username = filter_var($request->getParam('username'), FILTER_SANITIZE_STRING);
		$status = filter_var($request->getParam('status'), FILTER_SANITIZE_STRING);
		// instance pesanan
		$pesanan = new Pesanan();
		// ubah status
		$result = $pesanan->ubahStatus($idPesanan, $username, $status);
		// return response
		return $response->withJson($result);
	});



	// hapus
	$app->delete('/api/pesanan/{idPesanan}', function($request, $response) {
		// filter var
		$idPesanan = filter_var($request->getAttribute('idPesanan'), FILTER_SANITIZE_STRING);
		// instance pesanan
		$pesanan = new Pesanan();
		// delete data
		$result = $pesanan->hapusData($idPesanan);
		// return response
		return $response->withJson($result);
	});
?>