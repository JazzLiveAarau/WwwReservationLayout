<?php

    // File: UploadFileToServer.php
    // Date: 2026-04-24
    // Author: Gunnar Lidén

    // Uploads a file to the server
    // ----------------------------
    //
    // This function is called from another HTML (or PHP) page when the user clicks 
    // on the submit for a <form> element. 

    // <form action="UploadFileToServer.php" method="post" enctype="multipart/form-data">
    // <input type="file" id="id_upload_pdf" name="name_file_to_upload" onchange="eventXyz()">
    // <input type="submit" value="Upload" name="name_submit"></form>
    //
    // The above things are described on these pages:
    // https://www.w3schools.com/php/php_file_upload.asp
    // https://www.w3schools.com/tags/att_input_type_file.asp
    // https://www.geeksforgeeks.org/php-_files-array-http-file-upload-variables/ ($_FILES)
    // https://www.w3schools.com/php/func_filesystem_basename.asp (basename)
    // https://www.tutorialrepublic.com/faq/how-to-make-a-redirect-in-php.php (header)

    $debug_file = fopen("Debug/DebugUploadFileToServer.txt", "w") or die("Unable to open file!");

    fwrite($debug_file, "Debug of UploadFileToServer.php \n");

    $file_name = basename($_FILES["name_file_to_upload"]["name"]);

    fwrite($debug_file, "file_name= " . $file_name . "\n");

    $server_path = '';
    if (isset($_POST["name_server_path"]))
    {
        $server_path = trim($_POST["name_server_path"]);

        fwrite($debug_file, "server_path= " . $server_path . "\n");
    }
    else
    {

        fwrite($debug_file, "server_path is not set" . "\n");

        fclose($debug_file);

        exit('Server path is not set');
    }

    // Directory where the file will be saved
    if (strlen($server_path) > 0)
    {
        $server_path = str_replace('\\', '/', $server_path);
        $server_path = trim($server_path, '/');

        if (strpos($server_path, '..') !== false || !preg_match('/^[A-Za-z0-9_\/.\-]+$/', $server_path))
        {
            fwrite($debug_file, "Invalid server_path= " . $server_path . "\n");

            fclose($debug_file);

            exit('Invalid server path');
        }

        $target_dir = "../../" . $server_path . "/";
    }

    if ( !is_dir($target_dir)) 
    {
        if (!mkdir($target_dir, 0777, true)) 
        {
            fwrite($debug_file, "Failure creating target_dir= " . $target_dir . "\n");

            fclose($debug_file);

            exit('Failed to create directory...');
        }
        else
        {
                fwrite($debug_file, "target_dir= " . $target_dir . " was created" . "\n");
        }
    }
    else
    {
        fwrite($debug_file, "target_dir= " . $target_dir . " exists already" . "\n");
    }

    // Path + file name. ["name"] is an attribute for $_FILES 
    $target_file = $target_dir . $file_name;

    fwrite($debug_file, "target_file= " . $target_file . "\n");

    // Execution status flag
    $b_upload_ok = 1;

    $status_msg = "";

    $file_type = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));

    echo "UploadFileToServer file_type= " . $file_type . "<br>";

    // Allow certain file formats
    if($file_type != "xml" && $file_type != "pdf" && $file_type != "doc" && $file_type != "docx" && $file_type != "txt" && $file_type != "jpg" && $file_type != "png") 
    {
        $status_msg = $status_msg . "UploadFileToServer Sorry, only xml, pdf, doc, docx, txt, jpg, png are allowed.";

        fwrite($debug_file, "Sorry, only xml, pdf, doc, docx, txt are allowed" . "\n");
        
        $b_upload_ok = 0;
    }

    if ($b_upload_ok == 0) 
    {
        $status_msg = $status_msg . "Sorry, your file was not uploaded.";

        fwrite($debug_file, "Sorry, your file was not uploaded" . "\n");
    } 
    else 
    {
        fwrite($debug_file, "Datei " . $file_name . " wird (mit Funktion move_uploaded_file) zum Ordner ". $target_dir . "hochgeladen" . "\n");


        if (move_uploaded_file($_FILES["name_file_to_upload"]["tmp_name"], $target_file)) 
        {
            $status_msg = $status_msg . "Datei ". $file_name . " ist zum Server hochgeladen (Ordner ". $target_dir . ")";

                fwrite($debug_file, "Datei " . $file_name . "  ist zum Server hochgeladen (Ordner ". $target_dir . " )" . "\n");
        } 
        else 
        {
            $status_msg = $status_msg . "UploadFileToServer Sorry, there was an error uploading your file.";

            fwrite($debug_file, "UploadFileToServer Sorry, there was an error uploading your file." . "\n");
        }

    }

        fclose($debug_file);


?>
 
