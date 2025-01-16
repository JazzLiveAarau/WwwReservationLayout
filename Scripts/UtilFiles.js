// File: UtilFiles.js
// Date: 2025-01-16
// Author: Gunnar Lidén

// File content
// =============
//
// Class with server directory and utility functions based on the jQuery function $.post.
//
// Please refer to class UtilServer

//////////////////////////////////////////////////////////////////////////////////////////
/////////////////////// UtilFiles Start //////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////

class UtilFiles
{

    ///////////////////////////////////////////////////////////////////////////
    /////////////////////// dirFileAnyCase Start //////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Input to the function is an instance of the class UtilFilesData
    // Class UtilFilesData has member functions for all available execution cases
    // The valid execution cases are defined by the member functions
    // UtilFilesData.setDataExecCaseDirExists
    // UtilFilesData.setDataExecCaseFileExists
    // UtilFilesData.setDataExecCaseCreateDir
    // UtilFilesData.setDataExecCaseDeleteDir
    // UtilFilesData.setDataExecCaseDeleteFile
    // UtilFilesData.setDataExecCaseCreateFile
    // UtilFilesData.setDataExecCaseCopyFile
    // UtilFilesData.setDataExecCaseMoveFile
    //
    // Example: Copy and rename a file
    // var util_files_data = new UtilFilesData();
    // var input_file = '../TestDir_1/SubTestDir_1/TestFile_1.txt';
    // var output_file = '../TestDir_2/TestFile_2.txt';
    // var path_php_dir = 'Php/';
    // var callback_true = callBackTrue;
    // var callback_false = callBackFalse;
    // util_files_data.setDataExecCaseCopyFile(input_file, output_file, path_php_dir, callback_true, callback_false);
    // UtilFiles.dirFileAnyCase(util_files_data);
    // function callBackTrue() { alert("callBackTrue"); }
    // function callBackFalse() { alert("callBackFalse"); }
    // 
    // Input data:
    // i_util_files_data: An instance of class UtilFilesData
    //
    // Implementation description:
    // 1. If the input URL directory to the PHP is absolute, get the relative URL
    //    Call of UtilUrl.getRelativeUrlHtmlDir
    // 2. Get the name of the PHP file for this class ('UtilFiles.php')
    //    Call of UtilFiles.getUtilFilesPhpFileName
    // 3. Construct the full relative URL to the PHP file
    // 4. Convert absolute URLs to relative URLs to PHP directory for input 
    //    files and directories. Conversion is only done for absolute URLs
    //    Calls of UtilUrl.convertToRelativeUrlPhp
    // 5. Call of the jQuery function post ($.post)
    //    Succesful execution: 
    //    Call of UtilFilesData.handlePostResult. Parameter object UtilFilesData
    //    Failure
    //    Call of UtilFilesData.handlePostErrorResult.
    static dirFileAnyCase(i_util_files_data)
    {
        debugReservationLayout('UtilFiles.dirFileAnyCase Enter');

        var abs_util_files_data = UtilFiles.allFilesDirectoriesToAbsoluteUrl(i_util_files_data);

        if (abs_util_files_data == null)
        {
            return;
        }

        var rel_php_html_util_files_data = UtilFiles.allFilesDirectoriesRelativePhpAndHtml(abs_util_files_data);

        if (rel_php_html_util_files_data == null)
        {
            return;
        }

        if (!UtilUrl.execApplicationOnServer())
        {
            alert("UtilFiles.dirFileAnyCase UtilFiles.php cannot be executed on the local (live) server");

            return;
        }

        $.post
          (rel_php_html_util_files_data.getPathRelativeHtmlPhpFile(),
            {
                exec_case:        rel_php_html_util_files_data.getExecCase(),
                input_dir_name:   rel_php_html_util_files_data.getInputDirName(),
                input_file_name:  rel_php_html_util_files_data.getInputFileName(),
                output_file_name: rel_php_html_util_files_data.getOutputFileName(),
                file_content:     rel_php_html_util_files_data.getFileContent(),
                message_true:     rel_php_html_util_files_data.m_message_true,
                message_false:    rel_php_html_util_files_data.m_message_false,
                message_error:    rel_php_html_util_files_data.m_message_error
            },
            function(data_post, status_post)
            {   
                if (status_post == "success")
                {
                    debugReservationLayout('UtilFiles.dirFileAnyCase TRUE');

                    var ret_util_files_data = i_util_files_data;

                    ret_util_files_data.setResultPostData(data_post);

                    i_util_files_data.handlePostResult(ret_util_files_data);
                }
                else
                {
                    debugReservationLayout('UtilFiles.dirFileAnyCase FALSE');

                    // setResultPostData(i_result_post_data)

                    i_util_files_data.handlePostErrorResult(data_post);
                }  

            } // function
        ); // post 
        
    } // dirFileAnyCase

    // Returns an UtilFileseData object where all input relative URLs have 
    // been converted to absolute URLs
    static allFilesDirectoriesToAbsoluteUrl(i_util_files_data)
    {
        if (null == i_util_files_data)
        {
            alert("UtilFiles.allFilesDirectoriesToAbsoluteUrl Input object UtilFilesData is null");

            return null;            
        }

        var ret_abs_url = i_util_files_data;


        // Start PHP directory

        var abs_rel_php_dir = ret_abs_url.getPathPhpDir();

        if (null == abs_rel_php_dir)
        {
            alert("UtilFiles.allFilesDirectoriesToAbsoluteUrl Input abs_rel_php_dir is null");

            return null; 
        }

        var abs_php_dir = UtilUrl.convertToAbsoluteUrl(abs_rel_php_dir);

        if (abs_php_dir.length == 0) { UtilFiles.errorAllAbsolute("abs_php_dir"); }

        ret_abs_url.setPathPhpDir(abs_php_dir);

        // End PHP directory

        // Start input directory

        var abs_rel_input_dir = ret_abs_url.getInputDirName();

        if (abs_rel_input_dir != null)
        {
            var abs_input_dir = UtilUrl.convertToAbsoluteUrl(abs_rel_input_dir);

            if (abs_php_dir.length == 0) { UtilFiles.errorAllAbsolute("abs_input_dir"); }

            ret_abs_url.setInputDirName(abs_input_dir);
        }

         // End input directory

        // Start input file

        var abs_rel_input_file = ret_abs_url.getInputFileName();

        if (abs_rel_input_file != null)
        {
            var abs_input_file = UtilUrl.convertToAbsoluteUrl(abs_rel_input_file);

            if (abs_php_dir.length == 0) { UtilFiles.errorAllAbsolute("abs_input_file"); }

            ret_abs_url.setInputFileName(abs_input_file);
        }

         // End input file

        // Start output file

        var abs_rel_output_file = ret_abs_url.getOutputFileName();

        if (abs_rel_output_file != null)
        {
            var abs_output_file = UtilUrl.convertToAbsoluteUrl(abs_rel_output_file);

            if (abs_php_dir.length == 0) { UtilFiles.errorAllAbsolute("abs_output_file"); }

            ret_abs_url.setOutputFileName(abs_output_file);
        }

         // End output file

        return ret_abs_url;

    } // allFilesDirectoriesToAbsoluteUrl

    // Returns an UtilFileseData object where all input absolute URLs have been
    // converted to relative PHP URLs and the PHP file to URL relative HTML
    static allFilesDirectoriesRelativePhpAndHtml(i_abs_util_files_data)
    {
        if (null == i_abs_util_files_data)
        {
            alert("UtilFiles.allFilesDirectoriesRelativePhpAndHtml Input object UtilFilesData is null");

            return null;            
        }

        var ret_rel_php_html_url = i_abs_util_files_data;

        // Start PHP directory and PHP file

        var abs_php_dir = ret_rel_php_html_url.getPathPhpDir();

        if (null == abs_php_dir)
        {
            alert("UtilFiles.allFilesDirectoriesRelativePhpAndHtml Input abs_php_dir is null");

            return null; 
        }

        var rel_html_php_dir =UtilUrl.getRelativeUrlHtmlDir(abs_php_dir);

        if (rel_html_php_dir.length == 0) { UtilFiles.errorAllRelative("rel_html_php_dir"); }

        ret_rel_php_html_url.setPathPhpDir(rel_html_php_dir);

        var php_file_name = UtilFiles.getUtilFilesPhpFileName();

        var rel_html_php_file = rel_html_php_dir + php_file_name;

        ret_rel_php_html_url.setPathRelativeHtmlPhpFile(rel_html_php_file);

        // End PHP directory  and PHP file

        // Start input directory

        var abs_input_dir = ret_rel_php_html_url.getInputDirName();

        if (abs_input_dir != null)
        {
            var rel_php_input_dir = UtilUrl.getRelativeUrlPhp(abs_input_dir, abs_php_dir);

            if (rel_php_input_dir.length == 0) { UtilFiles.errorAllRelative("rel_php_input_dir"); }

            ret_rel_php_html_url.setInputDirName(rel_php_input_dir);
        }
        else
        {
            ret_rel_php_html_url.setInputDirName(UtilFiles.notUsedParameterForThisExecutionCase());
        }

         // End input directory

        // Start input file

        var abs_input_file = ret_rel_php_html_url.getInputFileName();

        if (abs_input_file != null)
        {
            var rel_php_input_file = UtilUrl.getRelativeUrlPhp(abs_input_file, abs_php_dir);

            if (rel_php_input_file.length == 0) { UtilFiles.errorAllRelative("rel_php_input_file"); }

            ret_rel_php_html_url.setInputFileName(rel_php_input_file);
        }
        else
        {
            ret_rel_php_html_url.setInputFileName(UtilFiles.notUsedParameterForThisExecutionCase());
        }

         // End input file

        // Start output file

        var abs_output_file = ret_rel_php_html_url.getOutputFileName();

        if (abs_output_file != null)
        {
            var rel_php_output_file = UtilUrl.getRelativeUrlPhp(abs_output_file, abs_php_dir);

            if (rel_php_output_file.length == 0) { UtilFiles.errorAllRelative("rel_php_output_file"); }

            ret_rel_php_html_url.setOutputFileName(rel_php_output_file);
        }
        else
        {
            ret_rel_php_html_url.setOutputFileName(UtilFiles.notUsedParameterForThisExecutionCase());
        }

         // End output file

        return ret_rel_php_html_url;

    } // allFilesDirectoriesRelativePhpAndHtml

    static notUsedParameterForThisExecutionCase()
    {
        return 'notUsedParameterForThisExecutionCase';

    } // notUsedParameterForThisExecutionCase

    // Error message allFilesDirectoriesToAbsoluteUrl. 
    // Returns from the function with value null
    static errorAllAbsolute(i_parameter_str)
    {
        alert("UtilFiles.allFilesDirectoriesToAbsoluteUrl Empty " + i_parameter_str);

        return null;

    } // errorAllAbsolute

    // Error message allFilesDirectoriesRelativePhpAndHtml. 
    // Returns from the function with value null
    static errorAllRelative(i_parameter_str)
    {
        alert("UtilFiles.allFilesDirectoriesRelativePhpAndHtml Empty " + i_parameter_str);

        return null;

    } // errorAllRelative

    /*QQQQQ
    // Returns relative to PHP URL
    // 1. If input URL is null the returned URL is null
    // 2. Convert if necessary and return relative URL
    //    Call of UtilUrl.getRelativeUrlPhp
    static convertToRelativeUrlPhp(i_absolute_url)
    {
        if (null == i_absolute_url)
        {
            return i_absolute_url;
        }

        var abs_url_php_dir = UtilUrl.convertToAbsoluteUrl(i_absolute_url); 

        return UtilUrl.getRelativeUrlPhp(i_absolute_url, abs_url_php_dir);

    } // convertToRelativeUrl
     QQQ*/

    // Get the PHP file name for this classs UtilFiles
    static getUtilFilesPhpFileName()
    {
        return 'UtilFiles.php';

    } // getUtilFilesPhpFileName

    ///////////////////////////////////////////////////////////////////////////
    /////////////////////// dirFileAnyCase End ////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////


    ///////////////////////////////////////////////////////////////////////////
    /////////////////////// File Name Array Start /////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Returns an array of file and directory names
    // i_callback_function: The callback function. Function parameter shall be the array
    // i_path_php_dir: Path to the directory of UtilFiles.php
    // Please note that setOutputArrayCaseName is set in setDataExecCaseScanDir
    // In the file UtilFiles.php is_dir do not work TODO
    // Functions in this class are called in a chain defined as an array in an UtilFilesData object
    // This object also holds results from the called functions like for instance the XML object with file data
    // 1. Create an instance of class UtilFilesData
    // 2. Define the temporarely used directory and file name for the XML file
    //    TODO The directory must exist. It should be created if missing
    // 3. Create the chain call array consisting of the following function names:
    //    UtilFiles.loadOneXmlFile, UtilFiles.getDirScanArray and i_callback_function
    //    Set the data of object UtilFilesData to the case 'scan directory'
    //    Call of UtilFilesData.setDataExecCaseScanDir
    // 4. Execute the case. Call of UtilFiles.dirFileAnyCase
    //    The resulting array will be parameter to the input callback function
    static getDirFileNames(i_dir_name, i_path_php_dir, i_callback_function)
    {
        debugReservationLayout('UtilFiles.getDirFileNames Enter');

        var util_files_data = new UtilFilesData();

        var file_name_out = 'TempScanDir/ListDir.xml';

        var callback_function_array = [];
    
        callback_function_array[0] = UtilFiles.loadOneXmlFile;
    
        callback_function_array[1] = UtilFiles.getDirScanArray;
    
        callback_function_array[2] = i_callback_function;
    
        util_files_data.setDataExecCaseScanDir(i_dir_name, file_name_out, i_path_php_dir, callback_function_array, UtilFiles.errorGetDirFileNames);
    
        UtilFiles.dirFileAnyCase(util_files_data);

    } // getDirFileNames

    // Error callback function for function UtilFiles.getDirFileNames
    static errorGetDirFileNames()
    {
        debugReservationLayout('UtilFiles.errorGetDirFileNames Enter');

        alert("UtilFiles.errorGetDirFileNames Enter")

    } // errorGetDirFileNames

    // Load the XML file.
     // i_util_files_data: An instance of class UtilFilesData
    static loadOneXmlFile(i_util_files_data)
    {
        debugReservationLayout('UtilFiles.loadOneXmlFile Enter');

        var path_file_name_xml = i_util_files_data.getOutputFileName();

        path_file_name_xml = 'Php/' + path_file_name_xml; // TODO

        var callback_function_name = i_util_files_data.getCallbackFunctionName();

        if (null != i_util_files_data.m_callback_function_array)
        {
            callback_function_name = i_util_files_data.increaseIndexGetCurrentCallbackFunction();
        }

        // Request server object for the XML file
        var jazz_xmlhttp = new XMLHttpRequest();
        
        // Event function: The server will return state and status 
        // from object functions open and send.
        jazz_xmlhttp.onreadystatechange = function() 
        {
            // Please note that this statement is executed several times, e.g.
            // with readyState = 2 meaning that the request is received.
            if (jazz_xmlhttp.readyState == 4 && jazz_xmlhttp.status == 200) 
            {
                var xml_object = jazz_xmlhttp.responseXML;

                var ret_util_files_data = i_util_files_data;

                ret_util_files_data.setResultObjectArrayXml(xml_object);

                callback_function_name(ret_util_files_data);    
            }
            else if (jazz_xmlhttp.readyState == 4 && jazz_xmlhttp.status == 404) 
            {
                alert("Error 404: File " + path_file_name_xml + " not found" );
            } 
        };
    
        // Open the file
        jazz_xmlhttp.open("GET", path_file_name_xml, true);
        
        jazz_xmlhttp.setRequestHeader('Cache-Control', 'no-cache');
            
        jazz_xmlhttp.send();	

    } // loadOneXmlFile

    // Returns the directory list array
    static getDirScanArray(i_util_files_data)
    {
        debugReservationLayout('UtilFiles.getDirScanArray Enter');

        var dir_list_xml = i_util_files_data.getResultObjectArrayXml();

        if (null == dir_list_xml)
        {
            alert("UtilFiles.getDirScanArray Input XML object is null");

            return null;
        }

        var tag_name = 'DirFile';

        var tag_type = 'Type';

        var value_type_dir = 'Dir';

        var value_type_file = 'File';

        var rec_names = dir_list_xml.getElementsByTagName(tag_name);

        var rec_types = dir_list_xml.getElementsByTagName(tag_type);

        var n_rec_names = rec_names.length;

        var n_rec_types = rec_types.length;

        if (n_rec_names != n_rec_types)
        {
            alert("UtilFiles.getDirScanArray n_rec_names= " + n_rec_names.toString()) +
                    ' not equal to n_rec_types= ' + n_rec_types.toString();

            return null;
        }

        debugReservationLayout('UtilFiles.getDirScanArray Number of arrays name and type is ' + n_rec_names.toString());

        var array_names = [];

        var array_files = [];

        var array_dirs = [];

        var array_types = [];

        var index_file = 0;

        var index_dir = 0;

        for (var index_rec = 0; index_rec < n_rec_names; index_rec++)
        {
            var rec_name = rec_names[index_rec];

            var rec_type = rec_types[index_rec];

            var file_name = rec_name.childNodes[0].nodeValue;

            var file_type = rec_type.childNodes[0].nodeValue;

            array_names[index_rec] = file_name;

            array_types[index_rec] = file_type;

            if (value_type_dir == file_type)
            {
                array_dirs[index_dir] = file_name;

                index_dir = index_dir + 1;
            }
            else if (value_type_file == file_type)
            {
                array_files[index_file] = file_name;

                index_file = index_file + 1;
            }
            else
            {
                alert("UtilFiles.getDirScanArray Not an implemented type value= " + file_type);

                return null;
            }

        } // index_rec

        var n_file_names_str = array_files.length.toString();

        var n_dir_names_str = array_dirs.length.toString();

        debugReservationLayout('UtilFiles.getDirScanArray Number of file names is ' + n_file_names_str);

        debugReservationLayout('UtilFiles.getDirScanArray Number of directory names is ' + n_dir_names_str);

        var callback_function_name = i_util_files_data.getCallbackFunctionName();

        if (null != i_util_files_data.m_callback_function_array)
        {
            callback_function_name = i_util_files_data.increaseIndexGetCurrentCallbackFunction();
        }

        if (i_util_files_data.outputArrayCaseName())
        {
            debugReservationLayout('UtilFiles.getDirScanArray File and directory names returned');

            callback_function_name(array_names);
        }
        else if (i_util_files_data.outputArrayCaseFile())
        {
            debugReservationLayout('UtilFiles.getDirScanArray File names returned');

            callback_function_name(array_files);
        }
        else if (i_util_files_data.outputArrayCaseDir())
        {
            debugReservationLayout('UtilFiles.getDirScanArray Directory names returned');

            callback_function_name(array_dirs);
        }
        else if (i_util_files_data.outputArrayCaseType())
        {
            debugReservationLayout('UtilFiles.getDirScanArray File types returned');

            callback_function_name(array_types);
        }
        else
        {
            alert("UtilFiles.getDirScanArray Not an implemented output array case= " + i_util_files_data.getOutputArrayCase());

            return null;           
        }


    } // getDirScanArray

    ///////////////////////////////////////////////////////////////////////////
    /////////////////////// File Name Array End ///////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

} // UtilFiles

//////////////////////////////////////////////////////////////////////////////////////////
/////////////////////// UtilFiles End ////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////////////
/////////////////////// UtilFilesData Start //////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////

// The class holds input data for the functions of class UtilFiles
// The valid execution cases are defined by the member functions
// setExecCaseDirExists  - setDataExecCaseDirExists
// setExecCaseFileExists - setDataExecCaseFileExists
// setExecCaseCreateDir  - setDataExecCaseCreateDir
// setExecCaseDeleteDir  - setDataExecCaseDeleteDir
// setExecCaseDeleteFile - setDataExecCaseDeleteFile
// setExecCaseCreateFile - setDataExecCaseCreateFile
// setExecCaseCopyFile   - setDataExecCaseCopyFile
// setExecCaseMoveFile   - setDataExecCaseMoveFile
// setExecCaseScanDir    - setDataExecCaseScanDir
class UtilFilesData
{
    ///////////////////////////////////////////////////////////////////////////
    /////////////////////// Constructor Start /////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    constructor()
    {
        // Case for UtilFiles
        // Valid values are defined by functions setExecCaseXyz
        this.m_exec_case = '';

        // Callback function name
        this.m_callback_function_name = null;

        // Callback function name for an error
        this.m_error_callback_function_name = null;

        // Array of callback functions for 'chain calling', e.g. setDataExecCaseScanDir
        this.m_callback_function_array = null;

        // Current index for m_callback_function_array
        this.m_callback_function_array_index = -12345;

        // Type of output aray case: name or type
        this.m_output_array_case = 'name';

        // URL (relative or absolute) to the PHP directory with file UtilFiles.php
        this.m_path_php_dir = null;

        // Relative URL to HTML for the PHP file
        this.m_path_rel_html_php_file = null;

        // Input directory name
        this.m_input_dir_name = null;

        // Input file name
        this.m_input_file_name = null;

        // Output file name
        this.m_output_file_name = null;

        // File content
        this.m_file_content = null;

        // Returned PHP (echo / data) message 'TRUE'
        this.m_message_true = 'TRUE';

        // Returned PHP (echo / data) message 'FALSE'
        this.m_message_false = 'FALSE';

        // Returned PHP (echo / data) error nessage always starting with 'FALSE'
        this.m_message_error = 'FALSE';

        // Output data from JQuery post that got it fron UtilFiles.php
        this.m_result_post_data = '';

        // Array of files on a directory defined as an XML fule. 
        this.m_result_object_array_xml = null;

    } // constructor

    // Initialise all member variables
    init()
    {
        // Case for UtilFiles
        // Valid values are defined by functions setExecCaseXyz
        this.m_exec_case = 'Undefined';

        // Callback function name
        this.m_callback_function_name = null;

        // Callback function name for an error
        this.m_error_callback_function_name = null;

        // Array of callback functions for 'chain calling', e.g. setDataExecCaseScanDir
        this.m_callback_function_array = null;

        // Current index for m_callback_function_array
        this.m_callback_function_array_index = -12345;

        // Type of output aray case: name, type, file or dir
        this.m_output_array_case = 'name';

        // URL (relative or absolute) to the PHP directory with file UtilFiles.php
        this.m_path_php_dir = null;

        // Relative URL to HTML for the PHP file
        this.m_path_rel_html_php_file = null;

        // Input directory name
        this.m_input_dir_name = null;

        // Input file name
        this.m_input_file_name = null;

        // Output file name
        this.m_output_file_name = null;

        // File content
        this.m_file_content = null;

        // Returned PHP (echo / data) message 'TRUE'
        this.m_message_true = 'TRUE';

        // Returned PHP (echo / data) message 'FALSE'
        this.m_message_false = 'FALSE';

        // Returned PHP (echo / data) error nessage always starting with 'FALSE'
        this.m_message_error = 'FALSE';

        // Output data from JQuery post that got it fron UtilFiles.php
        this.m_result_post_data = '';

        // Array of files on a directory defined as an XML fule. 
        this.m_result_object_array_xml = null;

    } // init

    ///////////////////////////////////////////////////////////////////////////
    /////////////////////// Constructor End ///////////////////////////////////
    /////////////////////////////////////////////////////////////////////////// 

    ///////////////////////////////////////////////////////////////////////////
    /////////////////////// Handle Post Result Start //////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Handles the post execution result
    // This function is called in function dirFileAnyCase. It handles the result
    // from the execution of the PHP functions in UtilFiles.php (the echo string)
    // i_util_files_data: Instance of the class UtilFilesData
    // 1. Determine if  UtilFiles.php execution returned true or false/failure
    //    Strings m_message_true and m_message_false are used for this
    // 2.  I: If returned value is true: 
    //        Call of handlePostResultTrue
    //    II: If returned value is false: 
    //        Call UtilFilesData.m_error_callback_function_name
    //        Please note that this function must always be defined
    handlePostResult(i_util_files_data)
    {
      var data_post = i_util_files_data.getResultPostData();

      debugReservationLayout('UtilFilesData.handlePostResult data_post= ' + data_post);

      var index_true = data_post.indexOf(this.m_message_true);

      var index_false = data_post.indexOf(this.m_message_false);

      if (index_true < 0 && index_false < 0)
      {
          alert("UtilFilesData.handlePostResult Not TRUE or FALSE in data_post= " + data_post);
      }
      else if (index_true >= 0 && index_false >= 0)
      {
          alert("UtilFilesData.handlePostResult Both TRUE and FALSE in data_post= " + data_post);
      }
      else if (index_true >= 0 && index_false < 0)
      {
        this.handlePostResultTrue(i_util_files_data);
      }
      else if (index_true < 0 && index_false >= 0)
      {
          if (this.m_error_callback_function_name != null || this.m_error_callback_function_name.length > 0)
          {
              debugReservationLayout('UtilFilesData.handlePostResult Result Error');

              this.m_error_callback_function_name;
          }
          else
          {
              alert("UtilFilesData.handlePostResult Execution case= " + this.m_exec_case + " failed data_post= " + data_post);
          }
      }
      else
      {
          alert("UtilFilesData.handlePostResult Programming error ");
      }


    } // handlePostResult

    // Handles the post execution result when the execution in UtilFiles.php (the echo string) returned true
    // i_util_files_data: An instance of FileUtilsData. Please not that it is an instance of this class
    // Case 'chain calls' (array of callback functions are defined)
    // 1. Get the current (m_callback_function_array_index) callback function from array m_callback_function_array 
    // 2. Increase and set the index. Call of UtilFilesData.setCallbackFunctionArray
    //    Plese not that the index change is for the input object UtilFilesData that is returned by this function
    // 3. Call the current callback function with the UtilFilesData object as parameter
    // Normal case
    // 1. Call the callback function UtilFilesData.m_callback_function_name if it is defined
    //    The function m_callback_function_name must not be defined
    //    Please also note that the function is called without any parameter
    handlePostResultTrue(i_util_files_data)
    {
        var data_post = i_util_files_data.getResultPostData();

        debugReservationLayout('UtilFilesData.handlePostResultTrue data_post= ' + data_post);

        this.debugCallbackFunctionArray('handlePostResultTrue');

        if (this.m_callback_function_array != null)
        {
            debugReservationLayout('UtilFilesData.handlePostResultTrue Call m_callback_function_array for index ' 
                                + this.m_callback_function_array_index.toString());

            var ret_util_files_data = i_util_files_data;

            var current_callback_function = ret_util_files_data.getCurrentCallbackFunction();


            current_callback_function(ret_util_files_data);
            
        }    
        else if (this.m_callback_function_name != null || this.m_callback_function_name.length > 0)
        {
            debugReservationLayout('UtilFilesData.handlePostResultTrue Result TRUE: m_callback_function_name');

            this.m_callback_function_name();
        }

    } // handlePostResultTrue

    // Handles the case when the UtilFiles.php 'totally' failed, i.e. a programming error
    handlePostErrorResult(i_util_files_data)
    {
        alert("UtilFilesData.handlePostErrorResult Execution case= " + this.m_exec_case + " failed data_post= " + i_util_files_data.getResultPostData());

    } // handlePostErrorResult

    ///////////////////////////////////////////////////////////////////////////
    /////////////////////// Handle Post Result Ende ///////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    /////////////////////// Set Data Exec Cases Start /////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Sets data for the execution case 'directory exists'
    // i_input_dir_name: Name of the input directory
	// i_path_php_dir: Path to the PHP file UtilFile.php
	// i_callback_function_name: Callback function TRUE / Succeeded
	// i_error_callback_function_name: Callback function FALSE / Failed
    setDataExecCaseDirExists(i_input_dir_name, i_path_php_dir, i_callback_function_name, i_error_callback_function_name)
    {
        debugReservationLayout('UtilFilesData.setDataExecCaseDirExists Enter');

        this.init();

        this.setExecCaseDirExists();

        if (!this.setPathPhpDir(i_path_php_dir))
        {
            alert("UtilFilesData.setDataExecCaseDirExists Failure setting PHP directory");

            return false;
        }    

        this.setCallbackFunctionName(i_callback_function_name);

        this.setErrorCallbackFunctionName(i_error_callback_function_name);

        if (!this.setInputDirName(i_input_dir_name))
        {
            alert("UtilFilesData.setDataExecCaseDirExists Failure setting input directory");

            return false;
        }

        return true;

    } // setDataCaseDirExists

    // Sets data for the execution case 'file exists'
    // i_input_file_name: Name of the input file
	// i_path_php_dir: Path to the PHP file UtilFile.php
	// i_callback_function_name: Callback function TRUE / Succeeded
	// i_error_callback_function_name: Callback function FALSE / Failed
    setDataExecCaseFileExists(i_input_file_name, i_path_php_dir, i_callback_function_name, i_error_callback_function_name)
    {
        debugReservationLayout('UtilFilesData.setDataExecCaseFileExists Enter');

        this.init();

        this.setExecCaseFileExists();

        if (!this.setPathPhpDir(i_path_php_dir))
        {
            alert("UtilFilesData.setDataExecCaseFileExists Failure setting PHP directory");

            return false;
        }

        this.setCallbackFunctionName(i_callback_function_name);

        this.setErrorCallbackFunctionName(i_error_callback_function_name);

        this.setInputFileName(i_input_file_name);

        return true;

    } // setDataExecCaseFileExists

    // Sets data for the execution case 'create directory'
    // i_input_dir_name: Name of the input directory
	// i_path_php_dir: Path to the PHP file UtilFile.php
	// i_callback_function_name: Callback function TRUE / Succeeded
	// i_error_callback_function_name: Callback function FALSE / Failed
    setDataExecCaseCreateDir(i_input_dir_name, i_path_php_dir, i_callback_function_name, i_error_callback_function_name)
    {
        debugReservationLayout('UtilFilesData.setDataExecCaseCreateDir Enter');

        this.init();

        this.setExecCaseCreateDir();

        if (!this.setPathPhpDir(i_path_php_dir))
        {
            alert("UtilFilesData.setDataExecCaseCreateDir Failure setting PHP directory");

            return false;
        }

        this.setCallbackFunctionName(i_callback_function_name);

        this.setErrorCallbackFunctionName(i_error_callback_function_name);

        if (!this.setInputDirName(i_input_dir_name))
        {
            alert("UtilFilesData.setDataExecCaseCreateDir Failure setting input directory");

            return false;
        }
    
        return true;

    } // setDataExecCaseCreateDir

    // Sets data for the execution case 'delete directory'
    // i_input_dir_name: Name of the input directory
	// i_path_php_dir: Path to the PHP file UtilFile.php
	// i_callback_function_name: Callback function TRUE / Succeeded
	// i_error_callback_function_name: Callback function FALSE / Failed
    setDataExecCaseDeleteDir(i_input_dir_name, i_path_php_dir, i_callback_function_name, i_error_callback_function_name)
    {
        debugReservationLayout('UtilFilesData.setDataExecCaseDeleteDir Enter');

        this.init();

        this.setExecCaseDeleteDir();

        if (!this.setPathPhpDir(i_path_php_dir))
        {
            alert("UtilFilesData.setDataExecCaseDeleteDir Failure setting PHP directory");

            return false;
        }
    
        this.setCallbackFunctionName(i_callback_function_name);

        this.setErrorCallbackFunctionName(i_error_callback_function_name);

        if (!this.setInputDirName(i_input_dir_name))
        {
            alert("UtilFilesData.setDataExecCaseDeleteDir Failure setting input directory");

            return false;
        }

        var error_msg = 'Not an existing directory= ' + i_input_dir_name;

        this.setErrorMessage(error_msg);

        return true;

    } // setDataExecCaseDeleteDir

    // Sets data for the execution case 'delete file'
    // i_input_file_name: Name of the input file
	// i_path_php_dir: Path to the PHP file UtilFile.php
	// i_callback_function_name: Callback function TRUE / Succeeded
	// i_error_callback_function_name: Callback function FALSE / Failed
    setDataExecCaseDeleteFile(i_input_file_name, i_path_php_dir, i_callback_function_name, i_error_callback_function_name)
    {
        debugReservationLayout('UtilFilesData.setDataExecCaseDeleteFile Enter');

        this.init();

        this.setExecCaseDeleteFile();

        if (!this.setPathPhpDir(i_path_php_dir))
        {
            alert("UtilFilesData.setDataExecCaseDeleteFile Failure setting PHP directory");

            return false;
        }

        this.setCallbackFunctionName(i_callback_function_name);

        this.setErrorCallbackFunctionName(i_error_callback_function_name);

        this.setInputFileName(i_input_file_name);

        var error_msg = 'Not an existing file= ' + i_input_file_name;

        this.setErrorMessage(error_msg);

        return true;

    } // setDataExecCaseDeleteFile

    // Sets data for the execution case 'create file'
    // i_input_file_name: Name of the input file
    // i_file_content: The content of the file
	// i_path_php_dir: Path to the PHP file UtilFile.php
	// i_callback_function_name: Callback function TRUE / Succeeded
	// i_error_callback_function_name: Callback function FALSE / Failed
    setDataExecCaseCreateFile(i_input_file_name, i_file_content, i_path_php_dir, i_callback_function_name, i_error_callback_function_name)
    {
        debugReservationLayout('UtilFilesData.setDataExecCaseCreateFile Enter');

        this.init();

        this.setExecCaseCreateFile();

        if (!this.setPathPhpDir(i_path_php_dir))
        {
            alert("UtilFilesData.setDataExecCaseCreateFile Failure setting PHP directory");

            return false;
        }

        this.setCallbackFunctionName(i_callback_function_name);

        this.setErrorCallbackFunctionName(i_error_callback_function_name);

        this.setInputFileName(i_input_file_name);

        this.setFileContent(i_file_content);

        return true;

    } // setDataExecCaseCreateFile

    // Sets data for the execution case 'copy file'
    // i_input_file_name: Name of the input file
    // i_output_file_name: The name of the output file
	// i_path_php_dir: Path to the PHP file UtilFile.php
	// i_callback_function_name: Callback function TRUE / Succeeded
	// i_error_callback_function_name: Callback function FALSE / Failed
    setDataExecCaseCopyFile(i_input_file_name, i_output_file_name, i_path_php_dir, i_callback_function_name, i_error_callback_function_name)
    {
        debugReservationLayout('UtilFilesData.setDataExecCaseCopyFile Enter');

        this.init();

        this.setExecCaseCopyFile();

        if (!this.setPathPhpDir(i_path_php_dir))
        {
            alert("UtilFilesData.setDataExecCaseCopyFile Failure setting PHP directory");

            return false;
        }

        this.setCallbackFunctionName(i_callback_function_name);

        this.setErrorCallbackFunctionName(i_error_callback_function_name);

        this.setInputFileName(i_input_file_name);

        this.setOutputFileName(i_output_file_name);

        return true;

    } // setDataExecCaseCopyFile

    // Sets data for the execution case 'move file'
    // i_input_file_name: Name of the input file
    // i_output_file_name: The name of the output file
	// i_path_php_dir: Path to the PHP file UtilFile.php
	// i_callback_function_name: Callback function TRUE / Succeeded
	// i_error_callback_function_name: Callback function FALSE / Failed
    setDataExecCaseMoveFile(i_input_file_name, i_output_file_name, i_path_php_dir, i_callback_function_name, i_error_callback_function_name)
    {
        debugReservationLayout('UtilFilesData.setDataExecCaseMoveFile Enter');

        this.init();

        this.setExecCaseMoveFile();

        if (!this.setPathPhpDir(i_path_php_dir))
        {
            alert("UtilFilesData.setDataExecCaseMoveFile Failure setting PHP directory");

            return false;
        }
    
        this.setCallbackFunctionName(i_callback_function_name);

        this.setErrorCallbackFunctionName(i_error_callback_function_name);

        this.setInputFileName(i_input_file_name);

        this.setOutputFileName(i_output_file_name);

        return true;

    } // setDataExecCaseMoveFile

    // Sets data for the execution case 'scan directory'
    // i_input_dir_name: URL path to the directory
    // i_output_file_name: The name of the output XML file
	// i_path_php_dir: Path to the PHP file UtilFile.php
	// i_callback_function_array: Array of callback functions for 'chain calls'
    // i_callback_function_two: Callback function TRUE for the second callback of the 'chain calls'
	// i_error_callback_function_name: Callback function FALSE / Failed
    setDataExecCaseScanDir(i_input_dir_name, i_output_xml_file_name, i_path_php_dir, i_callback_function_array, i_error_callback_function_name)
    {
        debugReservationLayout('UtilFilesData.setDataExecCaseScanDir Enter');

        this.init();

        this.setExecCaseScanDir();

        if (!this.setPathPhpDir(i_path_php_dir))
        {
            alert("UtilFilesData.setDataExecCaseScanDir Failure setting PHP directory");

            return false;
        }

        this.setCallbackFunctionArray(i_callback_function_array);

        this.setCallbackFunctionArrayIndex(0);

        this.setOutputArrayCaseName();

        this.setInputDirName(i_input_dir_name);

        if (!this.setInputDirName(i_input_dir_name))
        {
            alert("UtilFilesData.setDataExecCaseScanDir Failure setting input directory");

            return false;
        }
    
        this.setOutputFileName(i_output_xml_file_name);
        
        var error_msg = 'Not an existing directory= ' + i_input_dir_name;

        this.setErrorMessage(error_msg);

        return true;

    } // setDataExecCaseScanDir

    ///////////////////////////////////////////////////////////////////////////
    /////////////////////// Set Data Exec Cases End ///////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    /////////////////////// Set Get Member Data Start /////////////////////////
    ///////////////////////////////////////////////////////////////////////////

     // Get the callback function name
    getCallbackFunctionName()
    {
        return this.m_callback_function_name;   

    } // getCallbackFunctionName

     // Set the callback function name
     setCallbackFunctionName(i_callback_function_name)
     {
         this.m_callback_function_name = i_callback_function_name;   
 
     } // setCallbackFunctionName

     // Get the allback function name
     getErrorCallbackFunctionName()
     {
         return this.m_error_callback_function_name;   
 
     } // getErrorCallbackFunctionName
 
      // Get the allback function name
      setErrorCallbackFunctionName(i_error_callback_function_name)
      {
          this.m_error_callback_function_name = i_error_callback_function_name;   
  
      } // setErrorCallbackFunctionName

     // Get array of callback functions for 'chain calling', e.g. setDataExecCaseScanDir
     getCallbackFunctionArray()
     {
         return this.m_callback_function_array;   
 
     } // getCallbackFunctionArray
 
      // Set Array of callback functions for 'chain calling', e.g. setDataExecCaseScanDir
      setCallbackFunctionArray(i_callback_function_array)
      {
          debugReservationLayout('UtilFilesData.setCallbackFunctionArray Enter');

          this.m_callback_function_array = i_callback_function_array;

          this.debugCallbackFunctionArray('setCallbackFunctionArray');
  
      } // setCallbackFunctionArray

      // Debug output of m_callback_function_array
      debugCallbackFunctionArray(i_header)
      {
        if (null == this.m_callback_function_array)
        {
            debugReservationLayout(i_header + '  m_callback_function_array is null ');

            return;
        }

        var n_files = this.m_callback_function_array.length;

        debugReservationLayout(i_header + ' m_callback_function_array number of elements is ' + n_files.toString());

      } // debugCallbackFunctionArray

     // Get the output array type
     getOutputArrayCase()
     {
         return this.m_output_array_case;   
 
     } // getOutputArrayCase
 
      // Set the output array type to names of files and directories
      setOutputArrayCaseName()
      {
          this.m_output_array_case = 'name';
  
      } // setOutputArrayCaseName

      // Set the output array type to only files 
      setOutputArrayCaseFile()
      {
          this.m_output_array_case = 'file';
  
      } // setOutputArrayCaseFile

      // Set the output array type to only files 
      setOutputArrayCaseDir()
      {
          this.m_output_array_case = 'dir';
  
      } // setOutputArrayCaseDir

      // Set he output array type to file types
      setOutputArrayCaseType()
      {
          this.m_output_array_case = 'type';
  
      } // setOutputArrayCaseType

      // Returns true if the output array case is names of files and directories
      outputArrayCaseName()
      {
        if (this.getOutputArrayCase() == 'name')
        {
            return true;
        }
        else
        {
            return false;
        }

      } // outputArrayCaseName

      // Returns true if the output array case is only file names
      outputArrayCaseFile()
      {
        if (this.getOutputArrayCase() == 'file')
        {
            return true;
        }
        else
        {
            return false;
        }

      } // outputArrayCaseFile

      // Returns true if the output array case is only directory names
      outputArrayCaseDir()
      {
        if (this.getOutputArrayCase() == 'dir')
        {
            return true;
        }
        else
        {
            return false;
        }

      } // outputArrayCaseDir

      // Returns true if the output array cas is file types
      outputArrayCaseType()
      {
        if (this.getOutputArrayCase() == 'type')
        {
            return true;
        }
        else
        {
            return false;
        }

      } // outputArrayCaseType

     // Get the index for the array of callback functions 
     getCallbackFunctionArrayIndex()
     {
         return this.m_callback_function_array_index;   
 
     } // getCallbackFunctionArrayIndex
 
      // Set the index for the array of callback functions 
      setCallbackFunctionArrayIndex(i_callback_function_array_index)
      {
          this.m_callback_function_array_index = i_callback_function_array_index;
  
      } // setCallbackFunctionArrayIndex

     // Get current callback functions for the 'chain calling' and increase indev
     getCurrentCallbackFunction()
     {
        debugReservationLayout('UtilFilesData.getCurrentCallbackFunction Enter');

        var ret_callback_function = null;

        if (null == this.m_callback_function_array)
        {
            alert("utilFilesData.increaseIndexGetCurrentCallbackFunction m_callback_function_array is null");

            return ret_callback_function;
        }
        
        var current_index = this.m_callback_function_array_index;

        var n_functions = this.m_callback_function_array.length;

        if (current_index < 0 || current_index >= n_functions)
        {
            alert("UtilFilesData.increaseIndexGetCurrentCallbackFunction Index= " + this.m_callback_function_array_index.toString() + 
            'for array m_callback_function_array is not between 0 and ' + (n_functions - 1).toString());

            return ret_callback_function;
        }

        ret_callback_function = this.m_callback_function_array[current_index];

        return ret_callback_function;
 
     } // getCurrentCallbackFunction

     // Increase index and return the (new) current callback functions for the 'chain calling' 
     increaseIndexGetCurrentCallbackFunction()
     {
        var ret_callback_function = null;

        if (null == this.m_callback_function_array)
        {
            alert("utilFilesData.increaseIndexGetCurrentCallbackFunction m_callback_function_array is null");

            return ret_callback_function;
        }
        
        var current_index = this.m_callback_function_array_index;

        var n_functions = this.m_callback_function_array.length;

        if (current_index < 0 || current_index >= n_functions - 1)
        {
            alert("UtilFilesData.increaseIndexGetCurrentCallbackFunction Index= " + this.m_callback_function_array_index.toString() + 
            'for array m_callback_function_array is not between 0 and ' + (n_functions - 2).toString());

            return ret_callback_function;
        }

        var next_index = -1;

        if (current_index < n_functions - 1)
        {
            next_index = current_index + 1;
        }

        this.setCallbackFunctionArrayIndex(next_index);


        ret_callback_function = this.m_callback_function_array[next_index];

        debugReservationLayout('UtilFilesData.increaseIndexGetCurrentCallbackFunction New index = ' 
                         + next_index.toString());

        return ret_callback_function;
 
     } // increaseIndexGetCurrentCallbackFunction

      // Get URL (relative or absolut) to the PHP directory with file UtilFiles.php
      getPathPhpDir()
      {
        return this.m_path_php_dir;

      } // getPathPhpDir

      // Set URL (relative or absolut) to the PHP directory with file UtilFiles.php
      // Returns true if the directory name was set
      setPathPhpDir(i_path_php_dir)
      {
        if (!this.checkDirUrl(i_path_php_dir))
        {
            return false;
        }

        this.m_path_php_dir = i_path_php_dir;

        return true;

      } // setPathPhpDir

      // Get the PHP file URL relative to the HTML directory 
      getPathRelativeHtmlPhpFile()
      {
        return this.m_path_rel_html_php_file;

      } // getPathRelativeHtmlPhpFile

      // Get the PHP file URL relative to the HTML directory 
      setPathRelativeHtmlPhpFile(i_path_rel_html_php_file)
      {
        if (null == i_path_rel_html_php_file)
        {
            alert("UtilFilesData.setPathRelativeHtmlPhpFile i_path_rel_html_php_file is null");

            return;
        }

        this.m_path_rel_html_php_file = i_path_rel_html_php_file;

      } // setPathRelativeHtmlPhpFile

      // Returns true if the input URL is a directory:
      // - Ending with a slash
      // - Is an absolute path or is starting with ../ ./ or /
      //
      // Please note that the directories may have the value null. This is default.
      // But it is not allowed to set it to null with a set directory function
      // The function UtilFilesData.init should be used setting directory to null
      checkDirUrl(i_dir_url)
      {
        if (null == i_dir_url)
        {
            alert("UtilFilesData.CheckDirUrl It is not allowed to set a URL directory to null with this function. Use init instead.");

            return false;
        }

        var dir_url_trim = i_dir_url.trim();

        if (dir_url_trim == 0)
        {
            alert("UtilFilesData.CheckDirUrl URL directory is an empty string");

            return false;
        }

        var dir_url_trim_length = dir_url_trim.length;

        var last_char = dir_url_trim.substring(dir_url_trim_length - 1, dir_url_trim_length);

        if (last_char != '/')
        {
            alert("checkPhpDirUrl.checkDirUrl Last character of URL is not a slash" +
                " Input directory= " + i_dir_url);

            return false;
        }

        if (UtilUrl.isAbsolutePath(i_dir_url))
        {
            return true;
        }

        var index_two_points_slash = dir_url_trim.indexOf('../');

        var index_one_point_slash = dir_url_trim.indexOf('./');

        var index_slash =  dir_url_trim.indexOf('/');

        if (0 == index_two_points_slash || 0 == index_one_point_slash || 0 == index_slash)
        {
            return true;
        }
        else
        {
            alert("checkPhpDirUrl.checkDirUrl First characters of a sub-directory must be a point and a slash" +
                " Input directory= " + i_dir_url);

            return false;
        }

      } // checkDirUrl

      /*QQQQQQ
      // Returns true if the PHP dir name is valid
      // Same check as in checkDirUrl but empty string is allowed
      // The PHP function is allowed to be in the HTML base directory
      checkPhpDirUrl(i_dir_url)
      {
        if (null == i_dir_url)
        {
            alert("checkPhpDirUrl.CheckDirUrl URL directory is null");

            return false;
        }

        var dir_url_trim = i_dir_url.trim();

        if (dir_url_trim == 0)
        {
            return true;
        }

        var dir_url_trim_length = dir_url_trim.length;

        var last_char = dir_url_trim.substring(dir_url_trim_length - 1, dir_url_trim_length);

        if (last_char != '/')
        {
            alert("checkPhpDirUrl.checkPhpDirUrl Last character of URL is not a slash." +
                " Input directory= " + i_dir_url);

            return false;
        }

        if (UtilUrl.isAbsolutePath(i_dir_url))
        {
            return true;
        }

        var index_two_points_slash = dir_url_trim.indexOf('../');

        if (0 == index_two_points_slash)
        {
            return true;
        }

        var index_one_point_slash = dir_url_trim.indexOf('./');

        if (0 == index_one_point_slash)
        {
            return true;
        }
        else
        {
            alert("checkPhpDirUrl.checkPhpDirUrl First characters of a sub-directory must be a point and a slash" +
                    " Input directory= " + i_dir_url);

            return false;
        }

      } // checkPhpDirUrl

    QQQ*/

    // Returns the error message without 'FALSE'
    getErrorMessage()
    {
        var ret_msg = '';

        var index_false = this.m_message_error.indexOf('FALSE');

        if (index_false < 0)
        {
            alert("UtilFileData.getErrorMessage Error does not contain FALSE");

            return 'UtilFileData.getErrorMessage Programming error';
        }

        ret_msg = this.m_message_error.substring(index_false);

        ret_msg = ret_msg.trim();

        return ret_msg;

    } //getErrorMessage

    // Sets the error message
    setErrorMessage(i_error_msg)
    {
        this.m_message_error = 'FALSE' + ' ' + i_error_msg;

    } // setErrorMessage

    // Returns the input directory name
    getInputDirName()
    {
        return this.m_input_dir_name;

    } // getInputDirName

    // Sets the input directory name
    // Returns true if the directory name was set
    setInputDirName(i_input_dir_name)
    {
        if (!this.checkDirUrl(i_input_dir_name))
        {
            return false;
        }
        
        this.m_input_dir_name = i_input_dir_name;

        return true;

    } // setInputDirName

    // Returns the input file name
    getInputFileName()
    {
        return this.m_input_file_name;

    } // getInputFileName

    // Sets the input file name
    setInputFileName(i_input_file_name)
    {
        this.m_input_file_name = i_input_file_name;

    } // setInputFileName
	
   // Returns the output file name
   getOutputFileName()
   {
       return this.m_output_file_name;

   } // getOutputFileName

   // Sets the output file name
   setOutputFileName(i_output_file_name)
   {
       this.m_output_file_name = i_output_file_name;

   } // setOutputFileName
   
    // Returns the file content
    getFileContent()
    {
        return this.m_file_content;

    } // getFileContent

    // Sets the file content
    setFileContent(i_file_content)
    {
        this.m_file_content = i_file_content;

    } // setFileContent

    // Get output data from JQuery post that got it fron UtilFiles.php
    getResultPostData()
    {
        return this.m_result_post_data;

    } // getResultPostData

    // Set output data from JQuery post that got it fron UtilFiles.php
    setResultPostData(i_result_post_data)
    {
        this.m_result_post_data = i_result_post_data;

    } // setResultPostData

     // Get array of files on a directory defined as an XML fule. 
    getResultObjectArrayXml()
    {
        return this.m_result_object_array_xml;

    } // getResultObjectArrayXml

     // Get array of files on a directory defined as an XML fule. 
     setResultObjectArrayXml(i_result_object_array_xml)
     {
         this.m_result_object_array_xml = i_result_object_array_xml;
 
     } // setResultObjectArrayXml
    
    // Returns the UtilFiles execution case
    getExecCase()
    {
        return this.m_exec_case;

    } // getExecCase

    // Sets the UtilFiles execution case to 'directory exists'
    setExecCaseDirExists()
    {
        this.m_exec_case = 'ExecDirExists';

    } // setExecCaseDirExists

    // Sets the UtilFiles execution case to 'file exists'
    setExecCaseFileExists()
    {
        this.m_exec_case = 'ExecFileExists';

    } // setExecCaseFileExists

    // Sets the UtilFiles execution case to 'create directory'
    setExecCaseCreateDir()
    {
        this.m_exec_case = 'ExecCreateDir';

    } // setExecCaseCreateDir

    // Sets the UtilFiles execution case to 'delete directory'
    setExecCaseDeleteDir()
    {
        this.m_exec_case = 'ExecDeleteDir';

    } // setExecCaseDeleteDir

    // Sets the UtilFiles execution case to 'delete file'
    setExecCaseDeleteFile()
    {
        this.m_exec_case = 'ExecDeleteFile';

    } // setExecCaseDeleteFile

    // Sets the UtilFiles execution case to 'create file'
    setExecCaseCreateFile()
    {
        this.m_exec_case = 'ExecCreateFile';

    } // setExecCaseCreateFile

    // Sets the UtilFiles execution case to 'copy file'
    setExecCaseCopyFile()
    {
        this.m_exec_case = 'ExecCopyFile';

    } // setExecCaseCopyFile

    // Sets the UtilFiles execution case to 'move file'
    setExecCaseMoveFile()
    {
        this.m_exec_case = 'ExecMoveFile';

    } // setExecCaseMoveFile

    // Sets the UtilFiles execution case to 'scan directory'
    setExecCaseScanDir()
    {
        this.m_exec_case = 'ExecScanDir';

    } // setExecCaseMoveFile

    ///////////////////////////////////////////////////////////////////////////
    /////////////////////// Set Get Member Data End ///////////////////////////
    ///////////////////////////////////////////////////////////////////////////

} // UtilFilesData

//////////////////////////////////////////////////////////////////////////////////////////
/////////////////////// UtilFilesData End ////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////


