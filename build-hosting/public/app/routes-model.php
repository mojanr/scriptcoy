<?php  
	// use model 3d
	use \app\entitas\Model;

	// routes model 3d
	// get all model 3d
	$app->get('/api/model', function($request, $response) {
		// instance model
		$model = new Model();
		// load data model
		$result = $model->loadData();
		// cek response success untuk prefixes url
		if ($result['status']) {
			// set prefixes
			foreach ($result['message'] as &$item) {
				$item['gambarModel'] = $this->get('domain') . substr($item['gambarModel'], 2);
				$item['model3d'] = $this->get('domain') . substr($item['model3d'], 2);
			}
		}
		// response
		return $response->withJson($result);
	});



	// get model 3d berdasarkan id
	$app->get('/api/model/{idModel}', function($request, $response) {
		// filter var
		$idModel = filter_var($request->getAttribute('idModel'), FILTER_SANITIZE_STRING);
		// instance model
		$model = new Model();
		// load data model
		$result = $model->loadDataById($idModel);
		// cek response success untuk prefixes url
		if ($result['status']) {
			// set prefixes
			foreach ($result['message'] as &$item) {
				$item['gambarModel'] = $this->get('domain') . substr($item['gambarModel'], 2);
				$item['model3d'] = $this->get('domain') . substr($item['model3d'], 2);
			}
		}
		// response
		return $response->withJson($result);
	});



	// get model 3d berdasarkan nama bagian
	$app->get('/api/model/bagian/{bagianGitar}', function($request, $response) {
		// filter var
		$bagianGitar = filter_var($request->getAttribute('bagianGitar'), FILTER_SANITIZE_STRING);
		// instance model
		$model = new Model();
		// load data model
		$result = $model->loadDataByBagian($bagianGitar);
		// cek response success untuk prefixes url
		if ($result['status']) {
			// set prefixes
			foreach ($result['message'] as &$item) {
				$item['gambarModel'] = $this->get('domain') . substr($item['gambarModel'], 2);
				$item['model3d'] = $this->get('domain') . substr($item['model3d'], 2);
			}
		}
		// response
		return $response->withJson($result);
	});



	// get new id
	$app->get('/api/model/new/id', function($request, $response) {
		// instance model
		$model = new Model();
		// load data model
		$result = $model->getNewId();
		// return response
		return $response->withJson($result);
	});



	// cari
	$app->get('/api/model/cari/{data}', function($request, $response) {
		// filter var
		$data = filter_var($request->getAttribute('data'), FILTER_SANITIZE_STRING);
		// instance model
		$model = new Model();
		// load data model
		$result = $model->cariData($data);
		// cek response success untuk prefixes url
		if ($result['status']) {
			// set prefixes
			foreach ($result['message'] as &$item) {
				$item['gambarModel'] = $this->get('domain') . substr($item['gambarModel'], 2);
				$item['model3d'] = $this->get('domain') . substr($item['model3d'], 2);
			}
		}
		// response
		return $response->withJson($result);
	});



	// tambah
	$app->post('/api/model/tambah', function($request, $response) {
		// directory
		$directory = $this->get('modelDirectory');
		// filter var
		$idModel 					= filter_var($request->getParam('idModel'), FILTER_SANITIZE_STRING);
		$bagianGitar 			= filter_var($request->getParam('bagianGitar'), FILTER_SANITIZE_STRING);
		$namaModel 				= filter_var($request->getParam('namaModel'), FILTER_SANITIZE_STRING);
		$keteranganModel 	= filter_var($request->getParam('keteranganModel'), FILTER_SANITIZE_STRING);
		$hargaModel 			= filter_var($request->getParam('hargaModel'), FILTER_SANITIZE_NUMBER_INT);
		$gambarModel 			= null;
		$model3d 					= null;

		// file
		$uploadedFiles = $request->getUploadedFiles();

		// get uploaded file gambar
		$uploadedFile = $uploadedFiles['gambarModel'];
		// upload file
    if ($uploadedFile->getError() === UPLOAD_ERR_OK) {
  		// upload file and move to directory
      $uploadedData = moveUploadedFile($directory, $idModel, $uploadedFile);


      if ($uploadedData['extension'] == 'svg' 
      	|| $uploadedData['extension'] == 'jpg' 
      	|| $uploadedData['extension'] == 'jpeg' 
      	|| $uploadedData['extension'] == 'png') {
      	// set directory
      	$gambarModel = $directory . $uploadedData['filename'];
      } else {
      	$arrayResponse = array("status" => false, "message" => 'format file gambar yang di upload tidak sesuai, format file gambar yang diperbolehkan yaitu SVG, JPG/JPEG, dan PNG');
      	return $response->withJson($arrayResponse);
      }


    } else {
    	$arrayResponse = array("status" => false, "message" => 'error uploading file');
    	return $response->withJson($arrayResponse);
    }

    // get uploaded file model
		$uploadedFile = $uploadedFiles['model3d'];
		// upload file
    if ($uploadedFile->getError() === UPLOAD_ERR_OK) {
  		// upload file and move to directory
      $uploadedData = moveUploadedFile($directory, $idModel, $uploadedFile);


      if ($uploadedData['extension'] == 'glb') {
      	// set directory
	      $model3d = $directory . $uploadedData['basename'] . '.zip';
	      // zip instance
				$zip = new ZipArchive();
				// zip file directory
				$zipFile = $directory . DIRECTORY_SEPARATOR . $uploadedData['basename'] . '.zip';
				// create zip file
				if ($zip->open($zipFile, ZipArchive::CREATE)!==TRUE) {
				  $arrayResponse = array("status" => false, "message" => 'error create zip');
	    		return $response->withJson($arrayResponse);
				}
				// add file to zip
				$zip->addFile($directory . DIRECTORY_SEPARATOR . $uploadedData['filename'], $uploadedData['filename']);
				// close zip
				$zip->close();
				// delete glb file
				if (unlink($directory . DIRECTORY_SEPARATOR . $uploadedData['filename'])) {
					// success delete
				} else {
					$arrayResponse = array("status" => false, "message" => 'error delete file');
	    		return $response->withJson($arrayResponse);
				}
      } else {
      	$arrayResponse = array("status" => false, "message" => 'format file model 3d yang di upload tidak sesuai, format file model 3d harus menggunakan format binary gltf dengan extensi .glb');
      	return $response->withJson($arrayResponse);
      }

      
    } else {
    	$arrayResponse = array("status" => false, "message" => 'error uploading file');
    	return $response->withJson($arrayResponse);
    }

    // instance model 3d class
		$model = new Model();
		// set data
		$model->setData($idModel, $namaModel
			, $keteranganModel, $hargaModel, $bagianGitar, $gambarModel, $model3d);
		// tambah data
		$result = $model->tambahData();
		// return response
		return $response->withJson($result);
	});



	// ubah
	$app->post('/api/model/ubah', function($request, $response) {
		// directory
		$directory = $this->get('modelDirectory');
		// filter var
		$idModel 					= filter_var($request->getParam('idModel'), FILTER_SANITIZE_STRING);
		$bagianGitar 			= filter_var($request->getParam('bagianGitar'), FILTER_SANITIZE_STRING);
		$namaModel 				= filter_var($request->getParam('namaModel'), FILTER_SANITIZE_STRING);
		$keteranganModel 	= filter_var($request->getParam('keteranganModel'), FILTER_SANITIZE_STRING);
		$hargaModel 			= filter_var($request->getParam('hargaModel'), FILTER_SANITIZE_NUMBER_INT);
		$gambarModel 			= null;
		$model3d 					= null;

		// file
		$uploadedFiles = $request->getUploadedFiles();

		// instance model 3d class
		$model = new Model();

		// var_dump($uploadedFiles['status']);

		// $arrayResponse = array("status" => true, "message" => $uploadedFiles);
		// 	// return response
		// return $response->withJson($arrayResponse);

		// cek upload file
		if ($uploadedFiles) {
			// $arrayResponse = array("status" => true, "message" => 'terupload 22 nya atau salah satu');
			// return response
			// return $response->withJson($arrayResponse);
			// delete prev
			// get data model berdasarkan id
			$result = $model->loadDataById($idModel);
			// // delete file
			// if () {
			// 	// success
			// }

			
			// upload file
	    if (isset($uploadedFiles['gambarModel'])) {
	    	// delete file
	    	// unlink($result['message'][0]['gambarModel'])

	    	// get uploaded file gambar
	    	$uploadedFile = $uploadedFiles['gambarModel'];

	    	if ($uploadedFile->getError() === UPLOAD_ERR_OK) {

		  		// upload file and move to directory
		      $uploadedData = moveUploadedFile($directory, $idModel, $uploadedFile);


		      if ($uploadedData['extension'] == 'svg' 
		      	|| $uploadedData['extension'] == 'jpg' 
		      	|| $uploadedData['extension'] == 'jpeg' 
		      	|| $uploadedData['extension'] == 'png') {
		      	// set directory
		      	$gambarModel = $directory . $uploadedData['filename'];
		      } else {
		      	$arrayResponse = array("status" => false, "message" => 'format file gambar yang di upload tidak sesuai, format file gambar yang diperbolehkan yaitu SVG, JPG/JPEG, dan PNG');
		      	return $response->withJson($arrayResponse);
		      }

		      // set directory
		      $gambarModel = $directory . $uploadedData['filename'];
		    } else {
		    	$arrayResponse = array("status" => false, "message" => 'error uploading file');
		    	return $response->withJson($arrayResponse);
		    }
	    } else {
	    	// tidak ada file model 3d yang di upload
	    	// ambil dari database
	    	$result = $model->loadDataById($idModel);
				// set gambar model
				$gambarModel = $result['message'][0]['gambarModel'];
				// set model 3d
				// $model3d = $result['message'][0]['model3d'];
	    }


	    
			// upload file
	    if (isset($uploadedFiles['model3d'])) {
	    	// get uploaded file model
	   		$uploadedFile = $uploadedFiles['model3d'];

	   		unlink($result['message'][0]['model3d']);

	    	if ($uploadedFile->getError() === UPLOAD_ERR_OK) {
		  		// upload file and move to directory
		      $uploadedData = moveUploadedFile($directory, $idModel, $uploadedFile);

		      if ($uploadedData['extension'] == 'glb') {
		      	// set directory
			      $model3d = $directory . $uploadedData['basename'] . '.zip';
			      // zip instance
						$zip = new ZipArchive();
						// zip file directory
						$zipFile = $directory . DIRECTORY_SEPARATOR . $uploadedData['basename'] . '.zip';
						// create zip file
						if ($zip->open($zipFile, ZipArchive::CREATE)!==TRUE) {
						  $arrayResponse = array("status" => false, "message" => 'error create zip');
			    		return $response->withJson($arrayResponse);
						}
						// add file to zip
						$zip->addFile($directory . DIRECTORY_SEPARATOR . $uploadedData['filename'], $uploadedData['filename']);
						// close zip
						$zip->close();
						// delete glb file
						if (unlink($directory . DIRECTORY_SEPARATOR . $uploadedData['filename'])) {
							// success delete
						} else {
							$arrayResponse = array("status" => false, "message" => 'error delete file');
			    		return $response->withJson($arrayResponse);
						}
		      } else {
		      	$arrayResponse = array("status" => false, "message" => 'format file model 3d yang di upload tidak sesuai, format file model 3d harus menggunakan format binary gltf dengan extensi .glb');
		      	return $response->withJson($arrayResponse);
		      }

		    } else {
		    	$arrayResponse = array("status" => false, "message" => 'error uploading file');
		    	return $response->withJson($arrayResponse);
		    }

	    } else {
	    	// tidak ada file model 3d yang di upload
	    	// ambil dari database
	    	$result = $model->loadDataById($idModel);
				// set gambar model
				// $gambarModel = $result['message'][0]['gambarModel'];
				// set model 3d
				$model3d = $result['message'][0]['model3d'];
	    }

		} else {
			// get data model berdasarkan id
			$result = $model->loadDataById($idModel);
			// set gambar model
			$gambarModel = $result['message'][0]['gambarModel'];
			// set model 3d
			$model3d = $result['message'][0]['model3d'];
		}

		// set data
		$model->setData($idModel, $namaModel
			, $keteranganModel, $hargaModel, $bagianGitar, $gambarModel, $model3d);
		// tambah data
		$model->ubahData();
		// response
		$arrayResponse = array("status" => true, "message" => 'data berhasil diubah');
		// return response
		return $response->withJson($arrayResponse);
	});



	// hapus model 3d
	$app->delete('/api/model/{idModel}', function($request, $response) {
		// filter var
		$idModel = filter_var($request->getAttribute('idModel'), FILTER_SANITIZE_STRING);
		// instance new model
		$model = new Model();
		// get data berdasarkan id
		$resultLoad = $model->loadDataById($idModel);
		// delete data
		$resultHapus = $model->hapusData($idModel);

		// delete file
		if (unlink($resultLoad['message'][0]['gambarModel']) && unlink($resultLoad['message'][0]['model3d'])) {
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