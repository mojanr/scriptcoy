<?php  
	// use bahan
	use \app\entitas\Bahan;

	// routes bahan
	// load data bahan
	$app->get('/api/bahan', function($request, $response) {
		// instance bahan
		$bahan = new Bahan();
		// load data bahan
		$result = $bahan->loadData();
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



	// get data bahan berdasarkan id
	$app->get('/api/bahan/{idBahan}', function($request, $response) {
		// filter var
		$idBahan = filter_var($request->getAttribute('idBahan'), FILTER_SANITIZE_STRING);
		// instance new bahan
		$bahan = new Bahan();
		// get data model berdasarkan nama bagian
		$result = $bahan->loadDataById($idBahan);
		// cek response success untuk prefixes url
		if ($result['status']) {
			// set prefixes
			foreach ($result['message'] as &$item) {
				$item['gambarBahan'] = $this->get('domain') . substr($item['gambarBahan'], 2);
			}
		}
		// response result as json
		return $response->withJson($result);
	});



	// get new id
	$app->get('/api/bahan/new/id', function($request, $response) {
		// instance bahan
		$bahan = new Bahan();
		// load new id bahan
		$result = $bahan->getNewId();
		// response
		return $response->withJson($result);
	});



	// cari data
	$app->get('/api/bahan/cari/{data}', function($request, $response) {
		// directory
		$directory = $this->get('bahanDirectory');
		// filter var
		$data = filter_var($request->getAttribute('data'), FILTER_SANITIZE_STRING);
		// instance bahan
		$bahan = new Bahan();
		// load data bahan
		$result = $bahan->cariData($data);
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



	// tambah data
	$app->post('/api/bahan/tambah', function($request, $response) {
		// directory
		$directory = $this->get('bahanDirectory');
		// filter var
		$idBahan 					= filter_var($request->getParam('idBahan'), FILTER_SANITIZE_STRING);
		$namaBahan 				= filter_var($request->getParam('namaBahan'), FILTER_SANITIZE_STRING);
		$keteranganBahan 	= filter_var($request->getParam('keteranganBahan'), FILTER_SANITIZE_STRING);
		$gambarBahan 			= null;

		// koding tambah data
		// file
		$uploadedFiles = $request->getUploadedFiles();

		// get uploaded file gambar
		$uploadedFile = $uploadedFiles['gambarBahan'];
		// upload file
    if ($uploadedFile->getError() === UPLOAD_ERR_OK) {
  		// upload file and move to directory
      $uploadedData = moveUploadedFile($directory, $idBahan, $uploadedFile);
      
      if ($uploadedData['extension'] == 'svg' 
      	|| $uploadedData['extension'] == 'jpg' 
      	|| $uploadedData['extension'] == 'jpeg' 
      	|| $uploadedData['extension'] == 'png') {
      	// set directory
      	$gambarBahan = $directory . $uploadedData['filename'];
      } else {
      	$arrayResponse = array("status" => false, "message" => 'format file yang di upload tidak sesuai, format file yang diperbolehkan yaitu SVG, JPG/JPEG, dan PNG');
      	return $response->withJson($arrayResponse);
      }
    } else {
    	$arrayResponse = array("status" => false, "message" => 'error uploading file');
    	return $response->withJson($arrayResponse);
    }

		// instance bahan
		$bahan = new Bahan();
		// set data
		$bahan->setData($idBahan, $namaBahan, $keteranganBahan, $gambarBahan);
		// tambah data
		$result = $bahan->tambahData();
		// return response
		return $response->withJson($result);
	});



	// ubah data
	$app->post('/api/bahan/ubah', function($request, $response) {
		// directory
		$directory = $this->get('bahanDirectory');
		// filter var
		$idBahan 					= filter_var($request->getParam('idBahan'), FILTER_SANITIZE_STRING);
		$namaBahan 				= filter_var($request->getParam('namaBahan'), FILTER_SANITIZE_STRING);
		$keteranganBahan 	= filter_var($request->getParam('keteranganBahan'), FILTER_SANITIZE_STRING);
		$gambarBahan 			= null;

		// koding ubah data
		// file
		$uploadedFiles = $request->getUploadedFiles();

		// instance bahan
		$bahan = new Bahan();

		// cek upload file 
		if ($uploadedFiles) {
			// delete prev
			// get data model berdasarkan id
			$result = $bahan->loadDataById($idBahan);
			// delete file
			if (unlink($result[0]['gambarBahan'])) {
				// success
			}

			// get uploaded file gambar
			$uploadedFile = $uploadedFiles['gambarBahan'];
			// upload file
	    if ($uploadedFile->getError() === UPLOAD_ERR_OK) {
	  		// upload file and move to directory
	      $uploadedData = moveUploadedFile($directory, $idBahan, $uploadedFile);

	      if ($uploadedData['extension'] == 'svg' 
	      	|| $uploadedData['extension'] == 'jpg' 
	      	|| $uploadedData['extension'] == 'jpeg' 
	      	|| $uploadedData['extension'] == 'png') {
	      	// set directory
	      	$gambarBahan = $directory . $uploadedData['filename'];
	      } else {
	      	$arrayResponse = array("status" => false, "message" => 'format file yang di upload tidak sesuai, format file yang diperbolehkan yaitu SVG, JPG/JPEG, dan PNG');
	      	return $response->withJson($arrayResponse);
	      }

	      // set directory
	      // $gambarBahan = $directory . $uploadedData['filename'];
	    } else {
	    	$arrayResponse = array("status" => false, "message" => 'error uploading file');
	    	return $response->withJson($arrayResponse);
	    }
		} else {
			// get data model berdasarkan id
			$result = $bahan->loadDataById($idBahan);
			// set gambar bahan
			$gambarBahan = $result['message'][0]['gambarBahan'];
		}
		
		// set data
		$bahan->setData($idBahan, $namaBahan, $keteranganBahan, $gambarBahan);
		// tambah data
		$result = $bahan->ubahData();
		// return response
		return $response->withJson($result);
	});



	// hapus bahan
	$app->delete('/api/bahan/{idBahan}', function($request, $response) {
		// filter var
		$idBahan = filter_var($request->getAttribute('idBahan'), FILTER_SANITIZE_STRING);
		// instance new bahan
		$bahan = new Bahan();
		// get data berdasarkan id
		$resultLoad = $bahan->loadDataById($idBahan);
		// delete data
		$resultHapus = $bahan->hapusData($idBahan);

		// delete file
		if (unlink($resultLoad['message'][0]['gambarBahan'])) {
			// success
			// return response
			return $response->withJson($resultHapus);
		} else {
			// response
			$arrayResponse = array("status" => false, "message" => 'error delete file');
			// return response
			return $response->withJson($arrayResponse);
		}
	});
?>