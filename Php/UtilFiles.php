<?php

// File: UtilFiles.php
// Date: 2025-01-09
// Author: Gunnar Liden

// File utility functions

// References
// PHP Functions:  https://www.w3schools.com/php/php_functions.asp

////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////// Get Data Start ////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////

$exec_case = $_POST['exec_case'];

$input_dir_name = $_POST['input_dir_name'];

$input_file_name = $_POST['input_file_name'];

$output_file_name = $_POST['output_file_name'];

$file_content = $_POST['file_content'];

$message_true = $_POST['message_true'];

$message_false = $_POST['message_false'];

$message_error = $_POST['message_error'];

////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////// Get Data End //////((//////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////// Debug Output Start ////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////

error_reporting(E_ALL);
ini_set('display_errors', true);

$debug_str = date("l jS \of F Y h:i:s A");
debugAppend($debug_str);
$debug_str = "UtilFiles.php  exec_case=        " . $exec_case;
debugAppend($debug_str);
$debug_str = "UtilFiles.php  input_dir_name=   " . $input_dir_name;
debugAppend($debug_str);
$debug_str = "UtilFiles.php  input_file_name=  " . $input_file_name;
debugAppend($debug_str);
$debug_str = "UtilFiles.php  output_file_name= " . $output_file_name;
debugAppend($debug_str);
$file_content_debug = $file_content;
if (strlen($file_content) > 50)
{
  $file_content_debug = substr($file_content, 0, - strlen($file_content) + 50) . "...";
}
$debug_str = "UtilFiles.php  file_content=     " . $file_content_debug;
debugAppend($debug_str);

////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////// Debug Output End //////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////// Switch Start //////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////

switch ($exec_case) 
{
    case "ExecDirExists":
      dirExists($input_dir_name, $message_true, $message_false);
        break;
    case "ExecFileExists":
      fileExists($input_file_name, $message_true, $message_false);
      break;
    case "ExecCreateDir":
      createDir($input_dir_name, $message_true, $message_false);
      break;
      case "ExecDeleteDir":
        deleteDir($input_dir_name, $message_true, $message_false, $message_error);
        break;
      case "ExecDeleteFile":
        deleteFile($input_file_name, $message_true, $message_false, $message_error);
        break;
      case "ExecCreateFile":
        createFile($input_file_name, $file_content, $message_true, $message_false);
        break;
      case "ExecCopyFile":
        copyFile($input_file_name, $output_file_name, $message_true, $message_false, $message_error);
        break;
      case "ExecMoveFile":
        moveFile($input_file_name, $output_file_name, $message_true, $message_false, $message_error);
        break;
      case "ExecScanDir":
        dirListXml($input_dir_name, $output_file_name, $message_true, $message_false, $message_error);
        break;
    default:
      echo $message_error . " UtilFiles.php Not an implemented case " . $exec_case;

} // switch

////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////// Switch End ////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////// Create Start //////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////

// Creates a directory
function createDir($input_dir_name, $message_true, $message_false)
{
  $debug_str = "createDir Enter";
  debugAppend($debug_str);

  $permissions = 0777;

  $recursive = true;

  if (mkdir($input_dir_name, $permissions, $recursive))
  {
    $debug_str = "createDir Directory is created. TRUE is returned";
    debugAppend($debug_str);

    echo $message_true;
  }
  else
  {
    $debug_str = "createDir Directory is NOT created. FALSE is returned";
    debugAppend($debug_str);

    echo $message_false;
  }

} // createDir

// Creates a file
// For open file (fopen) and the file already exists it will be overwritten
// For open failure the script will stop and message_false wit the addition of
// error_get_last() will be returned to the calling function 
function createFile($input_file_name, $file_content, $message_true, $message_false)
{

  $debug_str = "createFile Enter";
  debugAppend($debug_str);

  $file_object = fopen($input_file_name, "w") or exit($message_false."_".error_get_last());

  fwrite($file_object, $file_content); 

  fclose($file_object); 

  $debug_str = "createFile File created. TRUE is returned";
  debugAppend($debug_str);

  echo $message_true;

} // createFile

////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////// Create End ////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////// Copy Move Start ///////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////

// Copies a file
function copyFile($input_file_name, $output_file_name, $message_true, $message_false, $message_error)
{
  $debug_str = "copyFile Enter";
  debugAppend($debug_str);

  if (file_exists($input_file_name))
  {
    if (copy($input_file_name, $output_file_name))
    {
      $debug_str = "copyFile File is copied. TRUE is returned";
      debugAppend($debug_str);

      echo $message_true;
    }
    else
    {
      $debug_str = "copyFile Failure copying file. FALSE is returned";
      debugAppend($debug_str);

      echo $message_false;
    }
  }
  else
  {
    $debug_str = "copyFile File do not exist. FALSE is returned";
    debugAppend($debug_str);

    echo $message_error;
  }

} // copyFile

// Moves a file
function moveFile($input_file_name, $output_file_name, $message_true, $message_false, $message_error)
{
  $debug_str = "moveFile Enter";
  debugAppend($debug_str);

  if (file_exists($input_file_name))
  { // File exists Start
    
    if (copy($input_file_name, $output_file_name))
    { // File was copied Start
      
      $debug_str = "moveFile File is copied.";
      debugAppend($debug_str);

      if (unlink($input_file_name))
      { // File was deleted Start
        $debug_str = "moveFile File is copied and deleted. TRUE is returned";
        debugAppend($debug_str);
  
        echo $message_true;

      } // File was deleted End
      else
      {// File was NOT deleted Start

        $debug_str = "moveFile Failure deleting file. FALSE is returned";
        debugAppend($debug_str);
  
        echo $message_false;

      } // File was NOT deleted End

    } // File was copied End
    else
    { // File was NOT copied Start
      
      $debug_str = "moveFile Failure copying file. FALSE is returned";
      debugAppend($debug_str);

      echo $message_false;

    } // File was NOT copied End

  } // File exists End
  else
  { // File do not exist Start
    
    $debug_str = "moveFile File do not exist. FALSE is returned";
    debugAppend($debug_str);

    echo $message_error;

  } // File do not exist End

} // moveFile

////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////// Copy Move End /////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////// Scan Util Start ///////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////

function dirListXml($input_dir_name, $output_file_name, $message_true, $message_false, $message_error)
{
  $debug_str = "dirListXml Enter";
  debugAppend($debug_str);
 
  if (!is_dir($input_dir_name)) 
  {
    exit($message_error);
  }

  $file_array = scandir($input_dir_name);

  if (false == $file_array)
  {
    exit($message_error);
  }

  $file_content = "";

  $file_content = $file_content . "<ScanDir>" . PHP_EOL;

  $n_files  = count($file_array);

  for ($index_file = 0; $index_file < $n_files; $index_file++)
  {
    $dir_file = $file_array[$index_file];

    debugAppend($dir_file);

    $dir_type = "UndefinedType";

    if (0 == strcmp($dir_file, "."))
    {
      debugAppend("Point");

      $dir_type = "Point";
    }
    elseif (0 == strcmp($dir_file, ".."))
    {
      debugAppend("Points");

      $dir_type = "Points";
    }
    elseif (is_dir($dir_file))
    {
      debugAppend("Dir");

      $dir_type = "Dir";
    }
    else
    {
      debugAppend("File");

      $dir_type = "File";
    }   

    if (0 == strcmp($dir_type, "Dir") || 0 == strcmp($dir_type, "File") )
    {
      $file_content = $file_content . "<DirFile>" . $dir_file  . "</DirFile>" . PHP_EOL;

      $file_content = $file_content . "<Type>" . $dir_type  . "</Type>" . PHP_EOL;
    }

  } // index_file

  $file_content = $file_content . "</ScanDir>" . PHP_EOL;

  $file_object = fopen($output_file_name, "w") or exit($message_false."_".error_get_last());

  fwrite($file_object, $file_content); 

  fclose($file_object); 

  $debug_str = "scanDir XML file created. TRUE is returned";
  debugAppend($debug_str);

  echo $message_true;

} // dirListXml

////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////// Scan Util End /////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////// Delete Start //////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////

// Deletes a directory
function deleteDir($input_dir_name, $message_true, $message_false, $message_error)
{
  $debug_str = "deleteDir Enter";
  debugAppend($debug_str);

  if (is_dir($input_dir_name)) 
  {
    if (rmdir($input_dir_name))
    {
      $debug_str = "deleteDir Directory was deleted. TRUE is returned";
      debugAppend($debug_str);

      echo $message_true;
    }
    else
    {
      $debug_str = "deleteDir Failure deleting directory. FALSE is returned";
      debugAppend($debug_str);

      echo $message_false;
    }
  }
  else
  {
    $debug_str = "deleteDir Directory did not exist. FALSE is returned";
    debugAppend($debug_str);

    echo $message_error;
  }

} // deleteDir

// Deletes a file
function deleteFile($input_file_name, $message_true, $message_false, $message_error)
{
  $debug_str = "deleteFile Enter";
  debugAppend($debug_str);

  if (file_exists($input_file_name))
  {
    if (unlink($input_file_name))
    {
      $debug_str = "deleteFile File is deleted. TRUE is returned";
      debugAppend($debug_str);

      echo $message_true;
    }
    else
    {
      $debug_str = "deleteFile Failure deleting file. FALSE is returned";
      debugAppend($debug_str);

      echo $message_false;
    }
  }
  else
  {
    $debug_str = "deleteFile File did not exist. FALSE is returned";
    debugAppend($debug_str);

    echo $message_error;
  }

} // deleteFile

////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////// Delete End ////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////// Exists Start //////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////

// Returns message_true if the directory exists and message_false if not
function dirExists($input_dir_name, $message_true, $message_false)
{
  $debug_str = "dirExists Enter";
  debugAppend($debug_str);
  
  if (is_dir($input_dir_name))
  {
    $debug_str = "dirExists Directory exists";
    debugAppend($debug_str);

    echo $message_true;
  }
  else
  {
    $debug_str = "dirExists Directory exists NOT";
    debugAppend($debug_str);
    
    echo $message_false;
  }  

} // dirExists

// Returns message_true if the file exists and message_false if not
function fileExists($input_file_name, $message_true, $message_false)
{
  $debug_str = "fileExists Enter";
  debugAppend($debug_str);

  if (file_exists($input_file_name))
  {
    $debug_str = "fileExists File did not exist. TRUE is returned";
    debugAppend($debug_str);

    echo $message_true;
  }
  else
  {
    $debug_str = "fileExists File did NOT exist. FALSE is returned";
    debugAppend($debug_str);

    echo $message_false;
  }  

} // fileExists

////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////// Exists End ////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////// Debug Function Start //////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////

// Appends debug to file 
// Please note that debug data will ONLY be written if the file Debug/DebugFilesUtil.txt exists
function debugAppend($i_debug_str)
{
  $file_debug = "Debug/DebugFilesUtil.txt";

  if (!file_exists($file_debug)) 
  {
    return;
  }

  $debug_str = $i_debug_str . PHP_EOL;

  file_put_contents($file_debug, $debug_str, FILE_APPEND);

} // debugAppend

////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////// Debug Function End ////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////

?>
