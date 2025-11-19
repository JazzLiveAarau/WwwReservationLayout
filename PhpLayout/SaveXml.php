

<?php

// Saves the XML reservations file
// -------------------------------
// Input data is the XML file name and the full content of the XML file
// Please note that escape characters like \n not is allowed in the string
//
// This function is called from another HTML (or PHP) page this way:
// $.post("SaveXml.php", {xml_content: xml_str, file_name: file_str},function(data,status){alert(data);});
//
// $.post():      Method requesting data from the server using an HTTP POST request. 
//                Hier actually only requesting an execution, i.e. create a file 
// "SaveXml.php": URL parameter specifies the URL you wish to request
//                Please note that the whole file will be executed. Not a normal function call
// xml_content:   Input PHP parameter for the execution (xml_str is the JavaScript parameter) 
// file_name:     Input PHP parameter for the execution (file_str is the JavaScript parameter) 
// function:      The callback function, i.e. defining what to do with the PHP result
//                In this case nothing needs to be done in the calling JavaScript function
// data:          The result of the execution. In this case only a message.
//                The data is a string that is created from calls of PHP function echo
// status:        Status from the execution. The value is success for a succesfull execution
// alert(data):   Function doing something with the result 
//
// The function $.post is defined in a jQuery library that has to be included on calling web page
// The library may be downloaded, but also a CDN (Content Delivery Network) library can be referenced with
// <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
//
// The above things are described on these pages:
// https://www.w3schools.com/jquery/jquery_ajax_get_post.asp
// https://www.w3schools.com/jquery/jquery_get_started.asp
// https://www.youtube.com/watch?v=jVAaxkbmCts


// Passed data from the make reservation page
$xml_content = $_POST['xml_content'];
$xml_file_name = $_POST['file_name'];

// Open XML file. XML file already exists and will be overwritten
$xml_file_object = fopen($xml_file_name, "w") or die("Unable to open file!");

// Write the input string with XML data to the file.
fwrite($xml_file_object, $xml_content); 

// Close the file
fclose($xml_file_object); 

echo "Die Reservation ist auf dem JAZZ live AARAU Server, in der XML Datei ";
echo $xml_file_name;
echo ", gespeichert";
 
?>
 
