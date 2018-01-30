<?php
	use \Psr\Http\Message\ServerRequestInterface as request;
	use \Psr\Http\Message\ResponseInterface as response;
	use \app\JwtRequestMethodPathRule;

	// upload file instance
	use Slim\Http\UploadedFile;

	// autoload
	require 'vendor/autoload.php';

	// default timezone
	date_default_timezone_set("Asia/Jakarta");

	// configuration
	$configuration = [
		'settings' => [
			'displayErrorDetails' => true,
		],
	];
	// setting container
	$c = new \Slim\Container($configuration);
	// slim app
	$app = new \Slim\App($c);

	// slim container
	$container = $app->getContainer();

	// setting cors
	$app->options('/{routes:.+}', function ($request, $response, $args) {
		return $response;
	});

	// setting cors
	$app->add(function ($req, $res, $next) {
		$response = $next($req, $res);
		return $response
						->withHeader('Access-Control-Allow-Origin', '*')
						->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
						->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
	});

	// custom handler
	// not found handler
	$container['notFoundHandler'] = function ($container) {
		return function ($request, $response) use ($container) {
			$arrayResponse = array('status' => false, 'message' => 'Oopss, Page Not Found!');
			return $container['response']
					->withStatus(404)
					->withHeader('Content-Type', 'application/json')
					->write(json_encode($arrayResponse));
		};
	};

	// not allow handler
	$container['notAllowedHandler'] = function ($container) {
		return function ($request, $response) use ($container) {
			$arrayResponse = array('status' => false, 'message' => 'Oopss, Method Not Allowed!');
			return $container['response']
					->withStatus(401)
					->withHeader('Content-Type', 'application/json')
					->write(json_encode($arrayResponse));
		};
	};

	// error handler
	$container['errorHandler'] = function ($container) {
		return function ($request, $response, $exception) use ($container) {	
			// return $container['response']
			// 		->withStatus(500)
			// 		->withJson($exception->getCode());		
			if ($exception->getCode() == '23000') {
				$arrayResponse = array('status' => false, 'message' => 'Username sudah digunakan!');
				return $container['response']
					->withStatus(200)
					->withHeader('Access-Control-Allow-Origin', '*')
					->withJson($arrayResponse);
			} else {
				$arrayResponse = array('status' => false, 'code' => $exception->getCode(), 'message' => $exception->getMessage());
				return $container['response']
					->withStatus(401)
					->withHeader('Access-Control-Allow-Origin', '*')
					->withJson($arrayResponse);
			}
		};
	};

	// middleware
	// token auth
	$app->add(new \Slim\Middleware\JwtAuthentication([
		'path' => ['/api'],
		// 'path' => ['/xx'],
		'passthrough' => ['/api/pesanan', '/api/model/bagian', '/api/harga-bahan/bagian'],
		'secret' => 'wolfguitarmaster-secretkey-123',
		'error' => function ($request, $response) {
			$arrayResponse = array('status' => false, 'message' => 'Oopss, Bad Authentication!');
			return $response
			->withStatus(401)
			->withHeader('Content-Type', 'application/json')
			->write(json_encode($arrayResponse));
		}
	]));

	// $app->add(new \Slim\Middleware\JwtAuthentication([
	// 	// 'path' => ['/xx'],
	// 	'secret' => 'wolfguitarmaster-secretkey-123',
	// 	'rules' => [
	// 		new \Slim\Middleware\JwtAuthentication\RequestMethodRule([
 //      	"passthrough" => ["OPTIONS"]
 //      ]),
	// 		new JwtRequestMethodPathRule([
	// 			'path' => ['/api'],
 //        'passthrough' => [
 //        	'POST' => '/api/pesanan',
 //        	'GET' => '/api/model/bagian',
 //        	'GET' => '/api/harga-bahah/bagian',
 //        ]
	// 		])
	// 	],
	// 	'error' => function ($request, $response) {
	// 		$arrayResponse = array('status' => false, 'message' => 'Oopss, Bad Authentication!');
	// 		return $response
	// 		->withStatus(401)
	// 		->withHeader('Content-Type', 'application/json')
	// 		->write(json_encode($arrayResponse));
	// 	}
	// ]));


	// local development
	$container['domain'] = 'http://'. $_SERVER['SERVER_NAME'] . '/program-skripsi/build';
	// hosting deployment
	// $container['domain'] = 'http://'. $_SERVER['SERVER_NAME'];


	// file directory
	// model directory
	$container['modelDirectory'] = '../public/assets/model/';
	// bahan directory
	$container['bahanDirectory'] = '../public/assets/bahan/';

	// basic route
	$app->get('/', function($request, $response) {
		// $response->write("hallo");
		$response->write("hallo");
	});

	// api
	$app->get('/api', function($request, $response) {
		// $response->write("hallo");
		$response->write("api");
	});

	// direcotry route
	$app->get('/dir', function($request, $response) {
		$dir = $this->get('domain');
		$response->write($dir);
	});

	// move uploaded files
	function moveUploadedFile($directory, $basename, UploadedFile $uploadedFile) {
		$extension = pathinfo($uploadedFile->getClientFilename(), PATHINFO_EXTENSION);
		$filename = sprintf('%s.%0.8s', $basename, $extension);
		$uploadedFile->moveTo($directory . DIRECTORY_SEPARATOR . $filename);
		return array(
			'directory' => $directory . DIRECTORY_SEPARATOR . $filename,
			'basename' => $basename,
			'filename' => $filename,
			'extension' => $extension
		);
	}


	// routes login
	require __DIR__ . '/app/routes-login.php';
	// routes model3d
	require __DIR__ . '/app/routes-model.php';
	// routes bahan
	require __DIR__ . '/app/routes-bahan.php';
	// routes bahan
	require __DIR__ . '/app/routes-harga-bahan.php';
	// routes pemesanan
	require __DIR__ . '/app/routes-pesanan.php';
	// routes pengelola
	require __DIR__ . '/app/routes-pengelola.php';
	// routes akun
	require __DIR__ . '/app/routes-akun.php';


	// run app
	$app->run();
?>
