<?php

require 'PHPMailerAutoload.php';
include 'mailData.php';

if($_SERVER['REQUEST_METHOD'] === 'POST'){
    $userName = trim($_POST['submittedName']);
    $userEmail = trim($_POST['submittedEmail']);
    $userPhone = trim($_POST['submittedPhone']);
    $message = trim($_POST['submittedMessage']);
    /**
 * This example shows settings to use when sending via Google's Gmail servers.
 */

    //SMTP needs accurate times, and the PHP time zone MUST be set
    //This should be done in your php.ini, but this is how to do it if you don't have access to that
    date_default_timezone_set('Etc/UTC');

    //Create a new PHPMailer instance
    $mail = new PHPMailer;

    //Tell PHPMailer to use SMTP
    $mail->isSMTP();

    //Enable SMTP debugging
    // 0 = off (for production use)
    // 1 = client messages
    // 2 = client and server messages
    $mail->SMTPDebug = 2;

    //Ask for HTML-friendly debug output
    $mail->Debugoutput = 'html';

    //Set the hostname of the mail server
    $mail->Host = 'smtp.gmail.com';
    // use
    // $mail->Host = gethostbyname('smtp.gmail.com');
    // if your network does not support SMTP over IPv6

    //Set the SMTP port number - 587 for authenticated TLS, a.k.a. RFC4409 SMTP submission
    $mail->Port = 587;

    //Set the encryption system to use - ssl (deprecated) or tls
    $mail->SMTPSecure = 'tls';

    //Whether to use SMTP authentication
    $mail->SMTPAuth = true;

    //Username to use for SMTP authentication - use full email address for gmail
    $mail->Username = ADMIN_MAIL;

    //Password to use for SMTP authentication
    $mail->Password = ADMIN_PASS;

    //Set who the message is to be sent from
    $mail->setFrom($userEmail, $userName);

    //Set an alternative reply-to address
    $mail->addReplyTo($userEmail, $userName);

    //Set who the message is to be sent to
    $mail->addAddress(ADMIN_MAIL, ADMIN_NAME);


    //Set the subject line
    $mail->Subject = "Nowa wiadomość od $userEmail ($userName)";

    //Read an HTML message body from an external file, convert referenced images to embedded,
    //convert HTML into a basic plain-text alternative body
    //$mail->msgHTML(file_get_contents('contents.html'), dirname(__FILE__));
    $mail->msgHTML("<h2>Nowa wiadomość od $userEmail ($userName):</h2><p>$message</p>");

    //Replace the plain text body with one created manually
    $mail->AltBody = "Nowa wiadomość od $userEmail ($userName): $message";

    //Attach an image file
    //$mail->addAttachment('images/phpmailer_mini.png');

    
    //send the message
    if (!$mail->send()) {
        $output = json_encode(array('type'=>'error', 'text' => 'Could not send mail! Please check your PHP mail configuration.'));
        die($output);
    } else {
        $output = json_encode(array('type'=>'message', 'text' => 'Hi '.$userName .' Thank you for your email'));
        die($output);
    }
}
