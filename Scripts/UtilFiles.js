// File: UtilFiles.js
// Date: 2025-01-06
// Author: Gunnar Lidén

// File content
// =============
//
// Class with server utility functions based on the asynchronous jQuery function $.post.
// Implemented functions are:
// - Save (create) a file on the server defined by the file content and the file URL
// - Copy a file. Input data are two URLs
// - Move a file. Input data are two URLs
// - Delete a file. Input data is an URL TODO Not yet implemented
//
// For debug there are also two function
// - Initialize a debug file with a given name
// - Append text the to the debug file. A name defines which debug file
//
// For the JAZZ live AARAU the absolute (full) URL may be given as input. The browsers
// (the jQuery function $.post) only accept relative URLs, but these may be difficult
// to set. In the class there are functions that convert the absolute URL to a relative
// URL.
//
// Please also note that the functions only will execute if running on the server
// for a jazz application. This is checked with UtilFiles.execApplicationOnServer.
//
// The server executing PHP files (functions) are in the dirextory /www/JazzScripts/Php
//
// Syntax for the jScript $.post function is: $.post(URL, data, callback); 
// Parameter URL is the requested PHP file that processes the data on the server
// Parameter data are object properties written as name:value pairs separated by commas 
// within curly braces {}. 
// Parameter callback is the name of the function that will be called when the data has 
// been processed. In this class it is implemented as an anonymous function.
// The callback function has two arguments: ret_data and status.
// Argument ret_data is text written by the PHP function with echo.
// Argument status returns the text 'success' if the PHP function has been executed.
// Please note that the returned 'success' not means that from the calling function
// requested result was achieved, like for instance that a file was actually saved. 
// When the opening of a new file failed the reurned status is 'success' and for 
// such a case the returned ret_data is returned woth a failure code that is examined
// here. 

class UtilFiles
{
    // Save a file with the JQuery asynchronous function $.post and UtilServerSaveFile.php 
    // Input parameters
    // i_path_file_name: A relative or absolute URL for the created file
    // i_content_string: The content of the file. Row ends defined as \n are not allowed
    // i_callback_fctn:  The name of the callback function
    //
    // For an error the function UtilFiles.saveFileError will be called
    static saveFileCallback(i_path_file_name, i_content_string, i_callback_fctn)
    {
        if (!UtilFiles.execApplicationOnServer())
        {
            alert("saveFileCallback UtilServerSaveFile.php cannot be executed on the local (live) server");

            return;
        }

        var rel_path_file_name = UtilFiles.replaceAbsoluteWithRelativePath(i_path_file_name);

        var rel_path_file_php = UtilFiles.getRelativeExecuteLevelPath('https://jazzliveaarau.ch/JazzScripts/Php/UtilServerSaveFile.php');
    
        $.post
          (rel_path_file_php,
            {
              file_content: i_content_string,
              file_name: rel_path_file_name
            },
            function(data_save, status_save)
            {   
                if (status_save == "success")
                {
                    // The PHP function returns succed for an opening failure. Therefore the returned
                    // string Unable_to_open_file is used to handle this error.
                    var index_fail_open = data_save.indexOf('Unable_to_open_file');
                    var index_fail_write = data_save.indexOf('Unable_to_write_file');

                    if (index_fail_open >= 0 || index_fail_write >= 0)
                    {
 
                        UtilFiles.saveFileError(rel_path_file_name, data_save, status_save);
                    }

                    console.log(" UtilFiles.saveFileCallback Filed is saved. data_save= " + data_save.trim());

                    i_callback_fctn();
                }
                else
                {
                    UtilFiles.saveFileError(rel_path_file_name, data_save, status_save);
                }  

            } // function
        ); // post 

        // console.log("saveFileCallback The function comes here, but without a return it won't come further");
       
    } // saveFileCallback

    // Failure saving file
    static saveFileError(i_rel_path_file_name, i_data_save, i_status_save)
    {
        console.log(" UtilFiles.saveFileCallback failure. data_save= " + i_data_save + ' status_save= ' + i_status_save);

        alert("UtilFiles.saveFileCallback Unable to create file " + i_rel_path_file_name + ' status_save= ' + i_status_save);

    } // saveFileError

    // Copy a file with the JQuery asynchronous function $.post and UtilFilesCopyFile.php 
    // Input parameters:
    // i_url_file_input: The url (relative or absolute) for the server file to copy
    // i_url_file_copy:  The url (relative or absolute) for the copied file
    // i_callback_fctn:  The name of the callback function
    static copyFileCallback(i_url_file_input, i_url_file_copy, i_callback_fctn)
    {
        if (!UtilFiles.execApplicationOnServer())
        {
            alert("copyFile UtilFilesCopyFile.php cannot be executed on the local (live) server");

            return false;
        }

        var rel_path_file_input = UtilFiles.replaceAbsoluteWithRelativePath(i_url_file_input);

        var rel_path_file_copy = UtilFiles.replaceAbsoluteWithRelativePath(i_url_file_copy);

        var rel_path_file_php = UtilFiles.getRelativeExecuteLevelPath('https://jazzliveaarau.ch/JazzScripts/Php/UtilFilesCopyFile.php');

        $.post
        (rel_path_file_php,
            {
            file_input: rel_path_file_input,
            file_copy: rel_path_file_copy
            },
            function(data_copy,status_copy)
            {
                if (status_copy == "success")
                {
                    var index_fail_copy = data_copy.indexOf('Unable_to_copy_file_');
                    var index_fail_exist = data_copy.indexOf('File_exists_not');

                    if (index_fail_copy >= 0 || index_fail_exist >= 0)
                    {
                        console.log(" UtilFiles.copyFile Failure copying file. data_copy= " + data_copy);

                        if (index_fail_exist >= 0)
                        {
                            alert("UtilFiles.copyFile There is no file " + rel_path_file_input);
                        }
                        else
                        {
                            alert("UtilFiles.copyFile Unable to copy file " + rel_path_file_input);
                        }

                        UtilFiles.copyFileError(rel_path_file_input, data_copy, status_copy);
                    }

                    console.log(" UtilFiles.copyFile File is copied data_copy= " + data_copy.trim());

                    i_callback_fctn();
                }
                else
                {
                    alert("Execution of UtilFilesCopyFile.php failed. data_copy= " + data_copy);

                    UtilFiles.copyFileError(rel_path_file_input, data_copy, status_copy);
                }          
            } // function

        ); // post
        
    } // copyFileCallback

    // Failure copying file
    static copyFileError(i_rel_path_file_name, i_data_copy, i_status_copy)
    {
        console.log(" UtilFiles.copyFileCallback failure. data_copy= " + i_data_copy + ' status_copy= ' + i_status_copy);

        alert("UtilFiles.copyFileCallback Unable to copy file " + i_rel_path_file_name + ' status_copy= ' + i_status_copy);

    } // copyFileError

    // Move a file with the JQuery asynchronous function $.post and UtilFilesMoveFile.php 
    // Input parameters:
    // i_url_file_input: The url (relative or absolute) for the server file to move
    // i_url_file_move:  The url (relative or absolute) for the moved file
    // i_callback_fctn:  The name of the callback function
    static moveFileCallback(i_url_file_input, i_url_file_move, i_callback_fctn)
    {
        if (!UtilFiles.execApplicationOnServer())
        {
            alert("moveFile UtilFilesMoveFile.php cannot be executed on the local (live) server");

            return;
        }

        var rel_path_file_input = UtilFiles.replaceAbsoluteWithRelativePath(i_url_file_input);

        var rel_path_file_move = UtilFiles.replaceAbsoluteWithRelativePath(i_url_file_move);

        var rel_path_file_php = UtilFiles.getRelativeExecuteLevelPath('https://jazzliveaarau.ch/JazzScripts/Php/UtilFilesMoveFile.php');

        $.post
        (rel_path_file_php,
            {
            file_input: rel_path_file_input,
            file_move: rel_path_file_move
            },
            function(data_move,status_move)
            {
                if (status_move == "success")
                {
                    
                    var index_fail_copy = data_move.indexOf('Unable_to_copy_file_');
                    var index_fail_exist = data_move.indexOf('File_exists_not');
                    var index_fail_delete = data_move.indexOf('Unable_to_delete_file_');

                    if (index_fail_copy >= 0 || index_fail_exist >= 0 ||  index_fail_delete >= 0)
                    {
                        console.log(" UtilFiles.UtilFilesmoveFile.php failure. data_move= " + data_move.trim());

                        if (index_fail_exist >= 0)
                        {
                            alert("UtilFiles.moveFile There is no file " + rel_path_file_input);
                        }
                        else if (index_fail_delete >= 0)
                        {
                            alert("UtilFiles.moveFile Failure deleting file " + rel_path_file_input);
                        }
                        else
                        {
                            alert("UtilFiles.moveFile Unable to copy file " + rel_path_file_input);
                        }

                        UtilFiles.moveFileError(rel_path_file_input, data_move, status_move);
                    }

                    i_callback_fctn();
                }
                else
                {
                    alert("Execution of UtilFilesmoveFile.php failed. data_move= " + data_move.trim());

                    UtilFiles.moveFileError(rel_path_file_input, data_move, status_move);
                }          
            } // function

        ); // post
        
    } // moveFileCallback

    // Failure moving file
    static moveFileError(i_rel_path_file_name, i_data_move, i_status_move)
    {
        console.log(" UtilFiles.copyFileCallback failure. data_move= " + i_data_move + ' status_move= ' + i_status_move);

        alert("UtilFiles.copyFileCallback Unable to move file " + i_rel_path_file_name + ' status_move= ' + i_status_move);

    } // moveFileError

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

