<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $name    = trim($_POST['Name'] ?? '');
    $email   = trim($_POST['Email'] ?? '');
    $phone   = trim($_POST['Contact'] ?? '');
    $message = trim($_POST['Comment'] ?? '');

    $mail = new PHPMailer(true);

    try {

        $mail->SMTPDebug = 2;

        $mail->isSMTP();
        $mail->Host       = 'smtp.heightsandsafety.co.za';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'website@smtp.heightsandsafety.co.za';
        $mail->Password   = 'W#I_IwptHm$e51=5';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;

        $mail->setFrom('noreply@email.za.live', 'Website Enquiry');
        $mail->addAddress('support@za.live');

        $mail->addReplyTo($email, $name);

        $mail->isHTML(false);
        $mail->Subject = "New Website Enquiry";

        $mail->Body =
"New enquiry received:

Name: $name
Email: $email
Phone: $phone

Message:
$message
";

        $mail->send();

        header("Location: thanks.html");
        exit;

    } catch (Exception $e) {
        echo "Mail failed: " . $mail->ErrorInfo;
    }

} else {
    echo "Invalid request.";
}