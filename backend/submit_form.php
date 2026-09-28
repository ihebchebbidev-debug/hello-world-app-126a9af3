<?php
require_once __DIR__ . '/config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(['success' => false, 'error' => 'Method not allowed'], 405);
}

$body = getRequestBody();

$full_name = trim($body['full_name'] ?? '');
$phone     = trim($body['phone'] ?? '');

if ($full_name === '' || $phone === '') {
    jsonResponse(['success' => false, 'error' => 'Nom et téléphone obligatoires'], 422);
}

$vorname        = isset($body['vorname']) ? trim($body['vorname']) : null;
$email          = isset($body['email']) ? trim($body['email']) : null;
$age            = isset($body['age']) && $body['age'] !== '' ? (int)$body['age'] : null;
$marital_status = $body['marital_status'] ?? $body['family_status'] ?? null;
$city           = $body['city'] ?? null;
$postal_code    = $body['postal_code'] ?? null;
$insurance_type = $body['insurance_type'] ?? null;
$current_insurer = $body['current_insurer'] ?? null;
$budget_max     = isset($body['budget_max']) && $body['budget_max'] !== '' ? (float)$body['budget_max'] : null;
$preferred_contact = $body['preferred_contact'] ?? null;
$preferred_time = $body['preferred_time'] ?? null;
$coverage = $body['coverage_priorities'] ?? null;
if (is_array($coverage)) $coverage = implode(', ', $coverage);
$message = $body['message'] ?? null;
$source_page = $body['source_page'] ?? null;
if (is_string($source_page) && strlen($source_page) > 1024) {
    $source_page = substr($source_page, 0, 1024);
}
$referrer = $body['referrer'] ?? ($_SERVER['HTTP_REFERER'] ?? null);
$utm_source = $body['utm_source'] ?? null;
$utm_medium = $body['utm_medium'] ?? null;
$utm_campaign = $body['utm_campaign'] ?? null;
$ip = $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'] ?? null;
$ua = $_SERVER['HTTP_USER_AGENT'] ?? null;

try {
    $db = getDB();
    $stmt = $db->prepare("INSERT INTO leads_neoassure
        (full_name, vorname, phone, email, age, marital_status, city, postal_code, insurance_type,
         current_insurer, budget_max, preferred_contact, preferred_time, coverage_priorities, message,
         source_page, referrer, utm_source, utm_medium, utm_campaign, ip_address, user_agent)
        VALUES
        (:full_name, :vorname, :phone, :email, :age, :marital_status, :city, :postal_code, :insurance_type,
         :current_insurer, :budget_max, :preferred_contact, :preferred_time, :coverage_priorities, :message,
         :source_page, :referrer, :utm_source, :utm_medium, :utm_campaign, :ip, :ua)");

    $stmt->execute([
        ':full_name' => $full_name,
        ':vorname' => $vorname,
        ':phone' => $phone,
        ':email' => $email,
        ':age' => $age,
        ':marital_status' => $marital_status,
        ':city' => $city,
        ':postal_code' => $postal_code,
        ':insurance_type' => $insurance_type,
        ':current_insurer' => $current_insurer,
        ':budget_max' => $budget_max,
        ':preferred_contact' => $preferred_contact,
        ':preferred_time' => $preferred_time,
        ':coverage_priorities' => $coverage,
        ':message' => $message,
        ':source_page' => $source_page,
        ':referrer' => $referrer,
        ':utm_source' => $utm_source,
        ':utm_medium' => $utm_medium,
        ':utm_campaign' => $utm_campaign,
        ':ip' => $ip,
        ':ua' => $ua,
    ]);

    jsonResponse(['success' => true, 'id' => $db->lastInsertId()]);
} catch (PDOException $e) {
    jsonResponse(['success' => false, 'error' => $e->getMessage()], 500);
}
?>
