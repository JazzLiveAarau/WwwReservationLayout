// File: UtilFiles.js
// Date: 2025-01-10
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
    // 1. Set the PHP file name to 'UtilFiles.php'
    static dirFileAnyCase(i_util_files_data)
    {
        debugReservationLayout('UtilFiles.dirFileAnyCase Enter');

        if (null == i_util_files_data)
        {
            alert("UtilFiles.dirFileAnyCase Input object UtilFilesData is null");

            return;            
        }

        var php_file_name = 'UtilFiles.php';

        var rel_path_file_php = i_util_files_data.m_relative_path_php_dir + php_file_name;

        /*
        if (i_util_files_data.m_relative_path_php_dir == null || i_util_files_data.m_relative_path_php_dir.length == 0)
        {
            // TODO UtilServerSaveFile and not UtilFiles.php
            rel_path_file_php = UtilFiles.getRelativeExecuteLevelPath('https://jazzliveaarau.ch/JazzScripts/Php/UtilServerSaveFile.php');
        }
        else
        {
            var index_absolut = i_util_files_data.m_relative_path_php_dir.indexOf('://');

            if (index_absolut > 0)
            {
                var path_file_name = i_util_files_data.m_relative_path_php_dir + php_file_name;

                rel_path_file_php = UtilFiles.getRelativeExecuteLevelPath(path_file_name);
            }
            else
            {
                rel_path_file_php = i_util_files_data.m_relative_path_php_dir + php_file_name;
            }

        } // Path to directory is defined
         */

        //var rel_path_input_file_name = UtilFiles.replaceAbsoluteWithRelativePath(i_util_files_data.m_input_file_name);

        // var rel_path_input_file_name = i_util_files_data.m_input_file_name;

        if (!UtilFiles.execApplicationOnServer())
        {
            alert("UtilFiles.dirFileAnyCase UtilFiles.php cannot be executed on the local (live) server");

            return;
        }

        $.post
          (rel_path_file_php,
            {
                exec_case:        i_util_files_data.m_exec_case,
                input_dir_name:   i_util_files_data.m_input_dir_name,
                input_file_name:  i_util_files_data.m_input_file_name,
                output_file_name: i_util_files_data.m_output_file_name,
                file_content:     i_util_files_data.m_file_content,
                message_true:     i_util_files_data.m_message_true,
                message_false:    i_util_files_data.m_message_false,
                message_error:    i_util_files_data.m_message_error
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

    ///////////////////////////////////////////////////////////////////////////
    /////////////////////// dirFileAnyCase End ////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////


    ///////////////////////////////////////////////////////////////////////////
    /////////////////////// loadOneXmlFile Start //////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

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
    /////////////////////// loadOneXmlFile Start //////////////////////////////
    ///////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////////////
/////////////////////// UtilFiles End ////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////

//////////////////TODO Move or remove functions below ////////////////////////////////////

    // Returns the relative path (URL) to the executing HTML file 
    // If the input URL not is an absolute path starting with 
    // https://jazzliveaarau.ch the input URL is returned
    //
    // These library function may be called from any level. For instance
    // https://www.jazzliveaarau.ch/WwwUtils/LevelThree/LevelFour/TestUtilsLevelFour.htm
    // The functions are executed by the PHP functions (files), e.g. UtilServerSaveFile.php
    // The PHP files are in the directory https://www.jazzliveaarau.ch/JazzScripts/Php
    // The JQuery function post do not accept an absolute URL. Therefore this function
    // dertermines the execute level and constructs the relative path to the file
    // UtilServerSaveFile.php. For the above example the relative URL. For the above example:
    // ../../../../JazzScripts/Php/UtilServerSaveFile.php
    static getRelativeExecuteLevelPath(i_path_file_name)
    {
        if (!UtilFiles.execApplicationOnServer())
        {
            alert("UtilFiles.getRelativeExecuteLevelPath  Please upload and execute the application on the server");
    
            return;
        }

        if (UtilFiles.isRelativePath(i_path_file_name))
        {
            return i_path_file_name;
        }

        //console.log("UtilFiles.getRelativeExecuteLevelPath i_path_file_name= " + i_path_file_name);

        var path_file_without_homepage = UtilFiles.getPathWithoutHomepage(i_path_file_name);

        //console.log("UtilFiles.getRelativeExecuteLevelPath path_file_without_homepage= " + path_file_without_homepage);

        var current_base = window.location.href;

        //console.log("UtilFiles.getRelativeExecuteLevelPath current_base= " + current_base);

        var n_levels_base = UtilFiles.getNumberOfPathLevels(current_base);

        // console.log("UtilFiles.getRelativeExecuteLevelPath n_levels_base= " + n_levels_base.toString());

        var full_relative_path = UtilFiles.addRelativePathSlashes(n_levels_base, path_file_without_homepage)

        // console.log("UtilFiles.getRelativeExecuteLevelPath full_relative_path= " + full_relative_path);

        return full_relative_path;

    } // getRelativeExecuteLevelPath

    // Replaces the first homepage part of an URL with a relative path, 
    // i.e. replace https://www.jazzliveaarau.ch/ with ../../
    // Browser do not accept https://www.jazzliveaarau.ch/
    // If input is a relative path do nothing. Just return the path
    static replaceAbsoluteWithRelativePath(i_path_file_name)
    {
        if (UtilFiles.isRelativePath(i_path_file_name))
        {
            return i_path_file_name;
        }

        // console.log("UtilFiles.replaceAbsoluteWithRelativePath i_path_file_name= " + i_path_file_name);
        
        var path_file_without_homepage = UtilFiles.getPathWithoutHomepage(i_path_file_name);

        // console.log("UtilFiles.replaceAbsoluteWithRelativePath path_file_without_homepage= " + path_file_without_homepage);

        var full_relative_path = '../..' + path_file_without_homepage;

        // console.log("UtilFiles.replaceAbsoluteWithRelativePath full_relative_path= " + full_relative_path);

        return full_relative_path;

    } // replaceAbsoluteWithRelativePath

    // Adds ../ and returns the full relative path
    static addRelativePathSlashes(i_levels, i_path_file_without_homepage)
    {
        if (i_levels <= 1)
        {
            alert("UtilFiles.addRelativePathSlashes Invalid i_levels= " + i_levels.toString());

            return '';
        }

        var path_php = '';

        for (var level_number=1; level_number <= i_levels; level_number++)
        {
            if (level_number < i_levels)
            {
                path_php = path_php + '../';
            }
            else
            {
                path_php = path_php + '..';
            }
        }
        var full_relative_path = path_php + i_path_file_without_homepage;

        // console.log("UtilFiles.addRelativePathSlashes full_relative_path= " + full_relative_path);

        return full_relative_path;

    } // addRelativePathSlashes

    // Returns the end path without homepage, i.e. https://www.jazzliveaarau.ch/ is removed
    static getPathWithoutHomepage(i_path_file_name)
    {
        var server_url = 'jazzliveaarau.ch';

        var server_url_length = server_url.length;
    
        var index_url = i_path_file_name.indexOf(server_url);

        // console.log("UtilFiles.getPathWithoutHomepage i_path_file_name= " + i_path_file_name);

        var path_file_without_homepage = i_path_file_name.substring(index_url + server_url_length);

        // console.log("UtilFiles.getPathWithoutHomepage path_file_without_homepage= " + path_file_without_homepage);

        return path_file_without_homepage;

    } // getPathWithoutHomepage

    // Returns true if it is a relative path, i.e. not containing jazzliveaarau.ch
    static isRelativePath(i_path_file_name)
    {
        var server_url = 'jazzliveaarau.ch';
    
        var index_url = i_path_file_name.indexOf(server_url);

        if (index_url < 0)
        {
            // console.log("getRelativeExecuteLevelPath.isRelativePath Relative URL i_path_file_name= " + i_path_file_name);

            return true;
        }
        else
        {
            // console.log("getRelativeExecuteLevelPath.isRelativePath Absolute URL i_path_file_name= " + i_path_file_name);

            return false;
        }

    } // isRelativePath

    // Returns true if it is an (JAZZ live AARAU) absolute path, i.e. containing jazzliveaarau.ch
    static isAbsolutePath(i_path_file_name)
    {
        var server_url = 'jazzliveaarau.ch';
    
        var index_url = i_path_file_name.indexOf(server_url);

        if (index_url > 0)
        {
            return true;
        }
        else
        {
            return false;
        }

    } // isAbsolutePath


    // Returns the file extension
    static getFileExtension(i_file_name)
    {
        var index_last_point = i_file_name.lastIndexOf('.');

        if (index_last_point < 0)
        {
            alert("UtilFiles.getFileExtension No extension i.e. point in file name " + i_file_name);

            return '';
        }

        return i_file_name.substring(index_last_point);

    } // getFileExtension

    // Returns the file name with extension
    static getFileName(i_path_file_name)
    {
        var ret_file_name = '';

        var index_last_slash = i_path_file_name.lastIndexOf('/');

        if (index_last_slash > 0)
        {

            ret_file_name = i_path_file_name.substring(index_last_slash + 1);

        }
        else
        {
            // Input file name without a path

            ret_file_name = i_path_file_name;
        }

        var index_last_point = ret_file_name.lastIndexOf('.');

        if (index_last_point < 0)
        {
            alert("UtilFiles.getFileName No extension point in input name= " + i_path_file_name);

            return "";
        }

        return ret_file_name;

    } // getFileName

    // Returns the file name
    static getFileNameWithoutExtension(i_path_file_name)
    {
        var ret_file_name_no_ext = '';

        var file_name = null;

        var index_last_slash = i_path_file_name.lastIndexOf('/');

        if (index_last_slash > 0)
        {

            file_name = i_path_file_name.substring(index_last_slash + 1);

        }
        else
        {
            // Input file name did not have a path.

            file_name = i_path_file_name;

        }

        var index_last_point = file_name.lastIndexOf('.');

        if (index_last_point < 0)
        {
            alert("UtilFiles.getFileNameWithoutExtension No extension point in input name= " + i_path_file_name);

            return "";
        }

        ret_file_name_no_ext = file_name.substring(0, index_last_point);

        return ret_file_name_no_ext;

    } // getFileNameWithoutExtension

    // Returns the file path
    static getFilePath(i_path_file_name)
    {
        var ret_file_path = '';

        var index_last_slash = i_path_file_name.lastIndexOf('/');

        if (index_last_slash > 0)
        {

            ret_file_path = i_path_file_name.substring(0, index_last_slash + 1);

            return ret_file_path;
        }
        else
        {
            return ret_file_path;
        }

    } // getFilePath

    // Returns the number of path levels from https://jazzliveaarau.ch
    static getNumberOfPathLevels(i_url)
    {
        // console.log("UtilFiles.getNumberOfPathLevels i_url= " + i_url);

        var server_url = 'jazzliveaarau.ch';

        var server_url_length = server_url.length;
    
        var index_url = i_url.indexOf(server_url);

        // console.log("UtilFiles.getNumberOfPathLevels index_url= " + index_url.toString());

        if (index_url < 0)
        {
            console.log("UtilFiles.getNumberOfPathLevels Not an absolute URL i_url= " + i_url);

            return -1;
        }

        var homepage_sub_path = i_url.substring(index_url + server_url_length);

        // console.log("UtilFiles.getNumberOfPathLevels homepage_sub_path= " + homepage_sub_path);

        var n_levels = 0;

        for (var index_char=0; index_char < homepage_sub_path.length; index_char++)
        {
            var current_char = homepage_sub_path[index_char];

            if (current_char == '/')
            {
                n_levels = n_levels + 1;
            }

        }

        // console.log("UtilFiles.getNumberOfPathLevels n_levels= " + n_levels.toString());

        return n_levels;

    } // getNumberOfPathLevels

    // Downloads a file from the server
    // https://byby.dev/node-download-image
    // https://www.youtube.com/watch?v=DDYkcydo1WA

    // Open with an application
    // https://www.makeuseof.com/node-js-open-files-urls-npm-package/

    static async download(i_url)
    {
        alert("UtilFiles.download Not yet implemented");

    } // download

    // Initialization (creation) of the debug file in the directory /www/JazzScripts/Php/Debug
    static async initDebugFile(i_unigue_str)
    {
        if (!UtilFiles.execApplicationOnServer())
        {
            console.log("UtilFiles.initDebugFile Do nothing. Not running on the server");

            return;
        }

        var util_server_key = 'jazz_util_server';
        var util_server_value = 'util_server_debug_initialized';

        var session_debug_value = window.sessionStorage.getItem(util_server_key);

        if (session_debug_value != null || session_debug_value == util_server_value)
        {
            console.log("UtilFiles.initDebugFile Do nothing. Debug already initialized for this session");

            return;
        }

        var b_init_debug_success = false;

        var file_name = './Debug/debug_server_utils_' + i_unigue_str + '.txt';

        // console.log("UtilFiles.initDebugFile Input file= " + file_name + "-------- 1");

        var rel_path_file_php = UtilFiles.getRelativeExecuteLevelPath('https://jazzliveaarau.ch/JazzScripts/Php/UtilFilesInitDebug.php');
    
        await $.post
          (rel_path_file_php,
            {
              file_name: file_name
            },
            function(data_save,status_save)
            {   
                if (status_save == "success")
                {
                    // The PHP function returns succed for an opening failure. Therefore the returned
                    // string Unable_to_open_file is used to handle this error.
                    var index_fail_open = data_save.indexOf('Unable_to_open_file');
                    var index_fail_write = data_save.indexOf('Unable_to_write_file');

                    if (index_fail_open >= 0 || index_fail_write >= 0)
                    {
                        console.log(" UtilFiles.UtilFilesInitDebug.php failure. data_save= " + data_save);

                        alert("UtilFiles.saveFileWithJQueryPostFunction Unable to create file " + file_name);

                        b_init_debug_success = false;
                    }
                    else
                    {
                        console.log("UtilFiles.initDebugFile. File " + file_name + " is created " + "--- 2");

                        b_init_debug_success = true;
                    }
                }
                else
                {
                    console.log(" UtilFiles.UtilFilesInitDebug.php failure. data_save= " + data_save);
                    alert("Execution of UtilFiles.UtilFilesInitDebug.php failed");

                    b_init_debug_success = false;
                }          
            } // function
          ); // post

          window.sessionStorage.setItem(util_server_key, util_server_value);
        
          return b_init_debug_success;

    } // initDebugFile

    // Append text to the debug file in the directory /www/JazzScripts/Php/Debug
    static async appendDebugFile(i_content_str, i_unigue_str)
    {
        if (!UtilFiles.execApplicationOnServer())
        {
            console.log("UtilFiles.appendDebugFile Do nothing. Not running on the server");

            return;
        }

        var b_append_debug_success = false;

        var file_name = './Debug/debug_server_utils_' + i_unigue_str + '.txt';

        // console.log("UtilFiles.appendDebugFile Input file= " + file_name + "----------------------------------------------------------------- 1");

        var rel_path_file_php = UtilFiles.getRelativeExecuteLevelPath('https://jazzliveaarau.ch/JazzScripts/Php/UtilFilesAppendDebug.php');

        var content_str = i_content_str +  '\n';
    
         await $.post
          (rel_path_file_php,
            {
              file_content: content_str,
              file_name: file_name
            },
            function(data_save,status_save)
            {   
                if (status_save == "success")
                {
                    // The PHP function returns succed for an opening failure. Therefore the returned
                    // string Unable_to_open_file is used to handle this error.
                    var index_fail_open = data_save.indexOf('Unable_to_open_file');
                    var index_fail_write = data_save.indexOf('Unable_to_write_file');

                    if (index_fail_open >= 0 || index_fail_write >= 0)
                    {
                        console.log(" UtilFiles.UtilFilesAppendDebug.php failure. data_save= " + data_save);
                        alert("UtilFiles.appendDebugFile Unable to create file " + file_name);

                        b_append_debug_success = false;
                    }
                    else
                    {
                        // console.log("UtilFiles.appendDebug. Data added to " + file_name + "----------------------------------------------------------------- 2");

                        b_append_debug_success = true;
                    }
                }
                else
                {
                    console.log(" UtilFiles.UtilFilesInitDebug.php failure. data_save= " + data_save);
                    alert("Execution of UtilFiles.UtilFilesAppendDebug.php failed");

                    b_append_debug_success = false;
                }          
            } // function
          ); // post
          
          return b_append_debug_success;

    } // appendDebugFile
	

    // Returns true if the application is running on the server
    // Returns false if it is running on the Visual Studio Code Live Server
    // Please note that window.location.href can return
    // https://jazzliveaarau.ch or
    // https://www.jazzliveaarau.ch
    static execApplicationOnServer()
    {
        var current_base = window.location.href;
    
        var server_url = 'jazzliveaarau.ch';
    
        var index_url = current_base.indexOf(server_url);
    
        if (index_url >= 0) 
        {
            return true;
        }
        else
        {
            return false;
        }
    
    } // execApplicationOnServer


    // https://bobbyhadz.com/blog/get-browser-type-and-version-using-javascript#get-browser-name-chrome-firefox-safari-in-javascript

    // Returns the browser type
    static getBrowserType() 
    {

        var user_agent_str = navigator.userAgent;
        console.log("UtilFiles.getBrowserType user_agent_str= " + user_agent_str);

        if (UtilFiles.isOpera()) {
        return 'Opera';
        } else if (UtilFiles.isEdge() || UtilFiles.isEdgeChromium()) {
        return 'Microsoft Edge';
        } else if (UtilFiles.isChrome()) {
        return 'Google Chrome';
        } else if (UtilFiles.isFirefox()) {
        return 'Mozilla Firefox';
        } else if (UtilFiles.isSafari()) {
        return 'Apple Safari';
        } else if (UtilFiles.isInternetExplorer()) {
        return 'Microsoft Internet Explorer';
        } else if (UtilFiles.isUCBrowser()) {
        return 'UC Browser';
        } else if (UtilFiles.isSamsungBrowser()) {
        return 'Samsung browser';
        } else {
        return 'Unknown browser';
        }

    } // getBrowserType
  
    // Returns true if the browser is Opera
    static isOpera() 
    {
        return (
          !!window.opr ||
          !!window.opera ||
          navigator.userAgent.toLowerCase().includes('opr/')
        );

    } // isOpera

    // Returns true if the browser is Mozilla Firefox
    static isFirefox() 
    {
        return (
          navigator.userAgent.toLowerCase().includes('firefox') ||
          typeof InstallTrigger !== 'undefined'
        );

    } // isFirefox


    // Returns true if the browser is Apple Safari
    static isSafari() 
    {
        if (UtilFiles.isChrome())
        {
            return false;
        }

        // String from iPhone     navigator.userAgent= 
        // Mozilla/5.0 (iPhone; CPU iPhone OS 12_5_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.1.2 Mobile/15E148 Safari/604.1
        var user_agent_str = navigator.userAgent.toLowerCase();
        var ret_includes = user_agent_str.includes('safari');
        console.log("UtilFiles.isSafari user_agent_str= " + user_agent_str);
        console.log("UtilFiles.isSafari ret_includes= " + ret_includes);

        return ret_includes;

    } // isSafari

    // Returns true if the browser is Microsoft Internet Explorer
    static isInternetExplorer() 
    {
        return false || !!document.documentMode;

    } // isInternetExplorer
      
    // Returns true if the browser is Microsoft Edge
    static isEdge() 
    {
        return !UtilFiles.isInternetExplorer() && !!window.StyleMedia;

    } // isEdge

    // Returns true if the browser is 
    static isChrome() 
    {
        const userAgent = navigator.userAgent.toLowerCase();

        console.log("UtilFiles.isChrome user_agent_str= " + userAgent);
      
        return (
          userAgent.includes('chrome') ||
          userAgent.includes('chromium') ||
          userAgent.includes('crios')
        );

    } // isChrome
      
    // Returns true if the browser is Microsoft Edge
    static isEdgeChromium() 
    {
        console.log("UtilFiles.isEdgeChromium user_agent_str= " + navigator.userAgent);
        
        return UtilFiles.isChrome() && navigator.userAgent.includes('Edg');

    } // isEdgeChromium

    // Returns true if the browser is UC Browser
    static isUCBrowser() 
    {
        return navigator.userAgent.toLowerCase().includes('ucbrowser');

    } // isUCBrowser

    // Returns true if the browser is Samsung browser
    static isSamsungBrowser() 
    {
        return navigator.userAgent
          .toLowerCase()
          .includes('samsungbrowser');
    } // isSamsungBrowser

} // UtilFiles


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

        // Relative path to the PHP directory with file UtilFiles.php
        // Setting the path is optional. If not set JazzScripts is assumed
        this.m_relative_path_php_dir = null;

        // Input directory name
        this.m_input_dir_name = 'Undefined';

        // Input file name
        this.m_input_file_name = 'Undefined';

        // Output file name
        this.m_output_file_name = 'Undefined';

        // File content
        this.m_file_content = 'Undefined';

        // Returned PHP (echo / data) message 'TRUE'
        this.m_message_true = 'TRUE';

        // Returned PHP (echo / data) message 'FALSE'
        this.m_message_false = 'FALSE';

        // Returned PHP (echo / data) error nessage always starting with 'FALSE'
        this.m_message_error = 'FALSE';

        // Output data from JQuery post that got it fron UtilFiles.php
        this.m_result_post_data = 'Undefined';

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

        // Relative path to the PHP directory with file UtilFiles.php
        // Setting the path is optional. If not set JazzScripts is assumed
        this.m_relative_path_php_dir = null;

        // Input directory name
        this.m_input_dir_name = 'Undefined';

        // Input file name
        this.m_input_file_name = 'Undefined';

        // Output file name
        this.m_output_file_name = 'Undefined';

        // File content
        this.m_file_content = 'Undefined';

        // Returned PHP (echo / data) message 'TRUE'
        this.m_message_true = 'TRUE';

        // Returned PHP (echo / data) message 'FALSE'
        this.m_message_false = 'FALSE';

        // Returned PHP (echo / data) error nessage always starting with 'FALSE'
        this.m_message_error = 'FALSE';

        // Output data from JQuery post that got it fron UtilFiles.php
        this.m_result_post_data = 'Undefined';

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

            this.m_callback_function_name;
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
	// i_relative_path_php_dir: Path to the PHP file UtilFile.php
	// i_callback_function_name: Callback function TRUE / Succeeded
	// i_error_callback_function_name: Callback function FALSE / Failed
    setDataExecCaseDirExists(i_input_dir_name, i_relative_path_php_dir, i_callback_function_name, i_error_callback_function_name)
    {
        debugReservationLayout('UtilFilesData.setDataExecCaseDirExists Enter');

        this.init();

        this.setExecCaseDirExists();

        this.setRelativePathPhpDir(i_relative_path_php_dir);

        this.setCallbackFunctionName(i_callback_function_name);

        this.setErrorCallbackFunctionName(i_error_callback_function_name);

        this.setInputDirName(i_input_dir_name);

    } // setDataCaseDirExists

    // Sets data for the execution case 'file exists'
    // i_input_file_name: Name of the input file
	// i_relative_path_php_dir: Path to the PHP file UtilFile.php
	// i_callback_function_name: Callback function TRUE / Succeeded
	// i_error_callback_function_name: Callback function FALSE / Failed
    setDataExecCaseFileExists(i_input_file_name, i_relative_path_php_dir, i_callback_function_name, i_error_callback_function_name)
    {
        debugReservationLayout('UtilFilesData.setDataExecCaseFileExists Enter');

        this.init();

        this.setExecCaseFileExists();

        this.setRelativePathPhpDir(i_relative_path_php_dir);

        this.setCallbackFunctionName(i_callback_function_name);

        this.setErrorCallbackFunctionName(i_error_callback_function_name);

        this.setInputFileName(i_input_file_name)

    } // setDataExecCaseFileExists

    // Sets data for the execution case 'create directory'
    // i_input_dir_name: Name of the input directory
	// i_relative_path_php_dir: Path to the PHP file UtilFile.php
	// i_callback_function_name: Callback function TRUE / Succeeded
	// i_error_callback_function_name: Callback function FALSE / Failed
    setDataExecCaseCreateDir(i_input_dir_name, i_relative_path_php_dir, i_callback_function_name, i_error_callback_function_name)
    {
        debugReservationLayout('UtilFilesData.setDataExecCaseCreateDir Enter');

        this.init();

        this.setExecCaseCreateDir();

        this.setRelativePathPhpDir(i_relative_path_php_dir);

        this.setCallbackFunctionName(i_callback_function_name);

        this.setErrorCallbackFunctionName(i_error_callback_function_name);

        this.setInputDirName(i_input_dir_name);

    } // setDataExecCaseCreateDir

    // Sets data for the execution case 'delete directory'
    // i_input_dir_name: Name of the input directory
	// i_relative_path_php_dir: Path to the PHP file UtilFile.php
	// i_callback_function_name: Callback function TRUE / Succeeded
	// i_error_callback_function_name: Callback function FALSE / Failed
    setDataExecCaseDeleteDir(i_input_dir_name, i_relative_path_php_dir, i_callback_function_name, i_error_callback_function_name)
    {
        debugReservationLayout('UtilFilesData.setDataExecCaseDeleteDir Enter');

        this.init();

        this.setExecCaseDeleteDir();

        this.setRelativePathPhpDir(i_relative_path_php_dir);

        this.setCallbackFunctionName(i_callback_function_name);

        this.setErrorCallbackFunctionName(i_error_callback_function_name);

        this.setInputDirName(i_input_dir_name);

        var error_msg = 'Not an existing directory= ' + i_input_dir_name;

        this.setErrorMessage(error_msg);

    } // setDataExecCaseDeleteDir

    // Sets data for the execution case 'delete file'
    // i_input_file_name: Name of the input file
	// i_relative_path_php_dir: Path to the PHP file UtilFile.php
	// i_callback_function_name: Callback function TRUE / Succeeded
	// i_error_callback_function_name: Callback function FALSE / Failed
    setDataExecCaseDeleteFile(i_input_file_name, i_relative_path_php_dir, i_callback_function_name, i_error_callback_function_name)
    {
        debugReservationLayout('UtilFilesData.setDataExecCaseDeleteFile Enter');

        this.init();

        this.setExecCaseDeleteFile();

        this.setRelativePathPhpDir(i_relative_path_php_dir);

        this.setCallbackFunctionName(i_callback_function_name);

        this.setErrorCallbackFunctionName(i_error_callback_function_name);

        this.setInputFileName(i_input_file_name);

        var error_msg = 'Not an existing file= ' + i_input_file_name;

        this.setErrorMessage(error_msg);

    } // setDataExecCaseDeleteFile

    // Sets data for the execution case 'create file'
    // i_input_file_name: Name of the input file
    // i_file_content: The content of the file
	// i_relative_path_php_dir: Path to the PHP file UtilFile.php
	// i_callback_function_name: Callback function TRUE / Succeeded
	// i_error_callback_function_name: Callback function FALSE / Failed
    setDataExecCaseCreateFile(i_input_file_name, i_file_content, i_relative_path_php_dir, i_callback_function_name, i_error_callback_function_name)
    {
        debugReservationLayout('UtilFilesData.setDataExecCaseCreateFile Enter');

        this.init();

        this.setExecCaseCreateFile();

        this.setRelativePathPhpDir(i_relative_path_php_dir);

        this.setCallbackFunctionName(i_callback_function_name);

        this.setErrorCallbackFunctionName(i_error_callback_function_name);

        this.setInputFileName(i_input_file_name);

        this.setFileContent(i_file_content);

    } // setDataExecCaseCreateFile

    // Sets data for the execution case 'copy file'
    // i_input_file_name: Name of the input file
    // i_output_file_name: The name of the output file
	// i_relative_path_php_dir: Path to the PHP file UtilFile.php
	// i_callback_function_name: Callback function TRUE / Succeeded
	// i_error_callback_function_name: Callback function FALSE / Failed
    setDataExecCaseCopyFile(i_input_file_name, i_output_file_name, i_relative_path_php_dir, i_callback_function_name, i_error_callback_function_name)
    {
        debugReservationLayout('UtilFilesData.setDataExecCaseCopyFile Enter');

        this.init();

        this.setExecCaseCopyFile();

        this.setRelativePathPhpDir(i_relative_path_php_dir);

        this.setCallbackFunctionName(i_callback_function_name);

        this.setErrorCallbackFunctionName(i_error_callback_function_name);

        this.setInputFileName(i_input_file_name);

        this.setOutputFileName(i_output_file_name);

    } // setDataExecCaseCopyFile

    // Sets data for the execution case 'move file'
    // i_input_file_name: Name of the input file
    // i_output_file_name: The name of the output file
	// i_relative_path_php_dir: Path to the PHP file UtilFile.php
	// i_callback_function_name: Callback function TRUE / Succeeded
	// i_error_callback_function_name: Callback function FALSE / Failed
    setDataExecCaseMoveFile(i_input_file_name, i_output_file_name, i_relative_path_php_dir, i_callback_function_name, i_error_callback_function_name)
    {
        debugReservationLayout('UtilFilesData.setDataExecCaseMoveFile Enter');

        this.init();

        this.setExecCaseMoveFile();

        this.setRelativePathPhpDir(i_relative_path_php_dir);

        this.setCallbackFunctionName(i_callback_function_name);

        this.setErrorCallbackFunctionName(i_error_callback_function_name);

        this.setInputFileName(i_input_file_name);

        this.setOutputFileName(i_output_file_name);

    } // setDataExecCaseMoveFile

    // Sets data for the execution case 'scan directory'
    // i_input_dir_name: URL path to the directory
    // i_output_file_name: The name of the output XML file
	// i_relative_path_php_dir: Path to the PHP file UtilFile.php
	// i_callback_function_array: Array of callback functions for 'chain calls'
    // i_callback_function_two: Callback function TRUE for the second callback of the 'chain calls'
	// i_error_callback_function_name: Callback function FALSE / Failed
    setDataExecCaseScanDir(i_input_dir_name, i_output_xml_file_name, i_relative_path_php_dir, i_callback_function_array, i_error_callback_function_name)
    {
        debugReservationLayout('UtilFilesData.setDataExecCaseScanDir Enter');

        this.init();

        this.setExecCaseScanDir();

        this.setRelativePathPhpDir(i_relative_path_php_dir);

        this.setCallbackFunctionArray(i_callback_function_array);

        this.setCallbackFunctionArrayIndex(0);

        this.setOutputArrayCaseFile();

        this.setInputDirName(i_input_dir_name);

        this.setOutputFileName(i_output_xml_file_name);
        
        var error_msg = 'Not an existing directory= ' + i_input_dir_name;

        this.setErrorMessage(error_msg);

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

      // Get relative path to the PHP directory with file UtilFiles.php
      // Setting the path is optional. If not set JazzScripts is assumed
      // TODO Perhaps implement in this class
      getRelativePathPhpDir()
      {
        return this.m_relative_path_php_dir;

      } // getRelativePathPhpDir

      // Set relative path to the PHP directory with file UtilFiles.php
      // Setting the path is optional. If not set JazzScripts is assumed
      setRelativePathPhpDir(i_relative_path_php_dir)
      {
        return this.m_relative_path_php_dir = i_relative_path_php_dir;

      } // setRelativePathPhpDir

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
    setInputDirName(i_input_dir_name)
    {
        this.m_input_dir_name = i_input_dir_name;

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


