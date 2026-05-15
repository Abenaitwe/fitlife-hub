<?php
declare(strict_types=1);

require __DIR__ . '/config.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $userId = (int) ($_GET['user_id'] ?? 0);
    $statement = $pdo->prepare('SELECT workouts, meals, active_minutes FROM progress WHERE user_id = ?');
    $statement->execute([$userId]);
    $progress = $statement->fetch();
    json_response(['success' => true, 'progress' => $progress ?: ['workouts' => 0, 'meals' => 0, 'active_minutes' => 0]]);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $userId = (int) ($_POST['user_id'] ?? 0);
    $field = $_POST['field'] ?? '';
    $allowed = ['workouts', 'meals', 'active_minutes'];

    if ($userId < 1 || !in_array($field, $allowed, true)) {
        json_response(['success' => false, 'message' => 'Invalid progress update.'], 422);
    }

    $statement = $pdo->prepare("UPDATE progress SET {$field} = {$field} + 1 WHERE user_id = ?");
    $statement->execute([$userId]);
    json_response(['success' => true, 'message' => 'Progress updated.']);
}

json_response(['success' => false, 'message' => 'Unsupported method.'], 405);
