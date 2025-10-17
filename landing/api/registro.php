<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

require_once 'db_config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Método no permitido']);
    exit;
}

// leer datos del cuerpo (JSON o formulario)
$input = json_decode(file_get_contents("php://input"), true);
if (!$input) {
    $input = $_POST;
}

// sanitizar entradas
function limpiar($valor) {
    return htmlspecialchars(strip_tags(trim($valor)));
}

$nombre = limpiar($input['nombre'] ?? '');
$correo = limpiar($input['correo'] ?? '');
$password = limpiar($input['password'] ?? '');
$fecha = limpiar($input['fecha'] ?? '');

// validaciones básicas
if (!$nombre || !$correo || !$password || !$fecha) {
    echo json_encode(['success' => false, 'message' => 'Todos los campos son obligatorios']);
    exit;
}

if (!filter_var($correo, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'El correo no es válido']);
    exit;
}

$edad = (int) ((time() - strtotime($fecha)) / 31556926);
if ($edad < 18) {
    echo json_encode(['success' => false, 'message' => 'Debes ser mayor de 17 años']);
    exit;
}

// verificar si el correo ya existe
try {
    $stmt = $pdo->prepare("SELECT id FROM usuarios WHERE correo = ?");
    $stmt->execute([$correo]);
    if ($stmt->fetch()) {
        echo json_encode(['success' => false, 'message' => 'El correo ya está registrado']);
        exit;
    }
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Error al verificar usuario', 'error' => $e->getMessage()]);
    exit;
}

// insertar usuario
try {
    $password_hash = password_hash($password, PASSWORD_BCRYPT);
    $sql = "INSERT INTO usuarios (nombre, correo, password_hash, fecha_nacimiento)
            VALUES (:nombre, :correo, :password_hash, :fecha_nacimiento)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        ':nombre' => $nombre,
        ':correo' => $correo,
        ':password_hash' => $password_hash,
        ':fecha_nacimiento' => $fecha
    ]);

    http_response_code(201);
    echo json_encode([
        'success' => true,
        'message' => 'Usuario registrado correctamente',
        'data' => [
            'nombre' => $nombre,
            'correo' => $correo,
            'fecha_registro' => date('Y-m-d H:i:s')
        ]
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Error al registrar el usuario',
        'error' => $e->getMessage()
    ]);
}
?>