<?php
require_once __DIR__ . '/../vendor/autoload.php';

use app\controller\AdminController;
use app\controller\APIController;
use app\controller\SiteController;
use app\controller\AuthController;
use app\core\Application;

$app = new Application(__DIR__);
$app->router->get('/',[SiteController::class,'home']);
$app->router->get('/contact', [SiteController::class,'contact']);
$app->router->get('/login', [AuthController::class,'login']);
$app->router->post('/login', [AuthController::class,'login']);

$app->router->get('/register', [AuthController::class,'register']);
$app->router->post('/register', [AuthController::class,'register']);
$app->router->post('/contact', [SiteController::class,'handleContact']);
$app->router->get('/product', [SiteController::class,'product']);
$app->router->get('/cart', [SiteController::class,'cart']);
$app->router->get('/blog', [SiteController::class,'blog']);
$app->router->get('/about', [SiteController::class,'about']);
$app->router->get('/product-detail', [SiteController::class,'productDetail']);

//---------------------------------admin----------------------------------------------
$app->router->get('/admin', [AdminController::class,'index']);
$app->router->post('/admin', [AdminController::class,'index']);
$app->router->get('/admin/users', [AdminController::class,'listsUser']);
$app->router->post('/admin/users', [AdminController::class,'listsUser']);

$app->router->get('/admin/products', [AdminController::class,'products']);
$app->router->post('/admin/products', [AdminController::class,'products']);
$app->router->get('/admin/kinds', [AdminController::class,'kinds']);
$app->router->post('/admin/kinds', [AdminController::class,'kinds']);
$app->router->get('/admin/comments', [AdminController::class,'comments']);
$app->router->post('/admin/comments', [AdminController::class,'comments']);
$app->router->get('/admin/detail-product', [AdminController::class,'commentDetail']);
$app->router->post('/admin/comments', [AdminController::class,'comments']);
$app->router->get('/admin/add-product', [AdminController::class,'addProduct']);
$app->router->post('/admin/add-product', [AdminController::class,'addProduct']);
$app->router->get('/admin/change-product', [AdminController::class,'editProduct']);
$app->router->post('/admin/change-product', [AdminController::class,'editProduct']);

$app->router->get('/admin/delete-product', [AdminController::class,'deleteProduct']);
//----------------------------------end admin--------------------------------
//----------------------------------api------------------------------------
$app->router->get('/api/product-detail', [APIController::class,'productDetail']);
$app->router->post('/api/order', [APIController::class,'postOrder']);
$app->router->get('/api/order', [APIController::class,'getOrder']);
$app->run();