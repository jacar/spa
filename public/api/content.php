<?php
// headers para CORS y JSON
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

// Manejar preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$dataFile = __DIR__ . '/../data/content.json';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (file_exists($dataFile)) {
        // Evitar caché
        header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
        header("Cache-Control: post-check=0, pre-check=0", false);
        header("Pragma: no-cache");

        $data = file_get_contents($dataFile);
        echo $data;
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'File not found']);
    }
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Obtener contenido del body
    $inputJSON = file_get_contents('php://input');
    $input = json_decode($inputJSON, true);

    if ($input !== null) {
        // Asegurar que la carpeta exista
        $dir = dirname($dataFile);
        if (!is_dir($dir)) {
            mkdir($dir, 0755, true);
        }

        // Guardar en el archivo JSON
        $bytes = file_put_contents($dataFile, json_encode($input, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
        
        if ($bytes !== false) {
            echo json_encode(['message' => 'Contenido actualizado en PHP (Modo Producción cPanel)']);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Error al guardar el contenido. Verifica que la carpeta /data/ tenga permisos de escritura (755 o 777).']);
        }
    } else {
        http_response_code(400);
        echo json_encode(['error' => 'JSON Invalido']);
    }
    exit;
}

http_response_code(405);
echo json_encode(['error' => 'Method Not Allowed']);
