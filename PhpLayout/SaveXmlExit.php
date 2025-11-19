<!DOCTYPE html>
<html>

<head>
<title>JAZZ live AARAU Reservation XML Datei speichern</title>

<meta charset="utf-8">

</head>

<body bgcolor="#ff0028" link="#ff0028" vlink="#ff0028" alink="#ff0028">
 
<font face="Arial">

<?php
// This file (PHP) function is no longer used
// QQ
// Passed data from the add reservation page
$xml_content = $_GET['xml_content'];
$xml_file_name = $_GET['file_name'];
$calling_page = $_GET['loc_ref'];

//echo "<h3>Input parameters</h3>";
//echo "Content of the XML file: ";
//echo $xml_content;
//echo "<br>";

//echo "The name of the XML file: ";
//echo $xml_file_name;
//echo "<br>";

//echo "<br>";
//echo "<br>";
//echo "The page that redirected to this page: ";
//echo "<br>";
//echo $calling_page;
//echo "<br>";

// Open XML file. XML file already exists and will be overwritten
$xml_file_object = fopen($xml_file_name, "w") or die("Unable to open file!");

// Write the input string with XML data to the file.
// Please note that escape characters like \n not is allowed in the string
fwrite($xml_file_object, $xml_content); 

// Close the file
fclose($xml_file_object); 
 
echo "<br>";  
echo "<h1>Speichern von Reservationen</h1>";
echo "<br>"; 
echo "<br>"; 
 
echo "Die XML Datei ";
echo $xml_file_name;
echo "<br>"; 
echo " ist auf dem Server gespeichert";
echo "<br>"; 
echo "<br>"; 

// Returning to the reservation page (calling_page) does not work. The browser
// uses obviously the old XML file saved on a another (temporary) folder.  
echo "<h2>Browserdaten bitte löschen!</h2>"; 
 
?>
 
</font>  
 
</body>

</html>
