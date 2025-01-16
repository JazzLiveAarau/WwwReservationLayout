// File: UtilUrl.js
// Date: 2025-01-16
// Author: Gunnar Lidén

// Class with utility functions for URL
//
// Definitions:
// ============
//
// Absolute URL: This is the full address to a file or a directory 
// e.g. https://jazzliveaarau.ch/Guestbook/Version_2/GuestbookUpload.htm
//
// Domain: This is the first part of the absolute URL to the first slash
// e.g. https://jazzliveaarau.ch/
//
// Relative Domain URL: This is the part of the absolute URL from the first slash
// e.g. /Guestbook/Version_2/GuestbookUpload.htm
//
// Current directory URL: This is the directory for the executing function
// The executing function can be the HTML page (with its JavaScript functions)
// and it can be the PHP file (with its functions) that in an application  
// often is in another directory than the HTML file
// e.g. https://jazzliveaarau.ch/Guestbook/Version_2/ (HTML)
// e.g. https://jazzliveaarau.ch/Guestbook/Version_2/Php/LoginLogout.php (PHP)
//
// Relative parent directory URL: A path from the current directory to a file
// e.g. File https://jazzliveaarau.ch/XML/JazzGuests.xml
//      URL relative current HTML directory: ../../XML/JazzGuests.xml
//      URL relative current HTML directory: ../../../XML/JazzGuests.xml
//
// For many JavaScript and jQuery functions a relative parent URL is required
// like for instance the jQuery function post ($.post).
//
// The class UtilFiles is based on the jQuery function post ($.post) and it is
// using the functions of this class UtilUrl.
//
// Normally (i.e. for most examples in Internet) the PHP file is in the same
// directory as the HTML file or in a subdirectory to the HTML directory.
// e.g. https://jazzliveaarau.ch/Guestbook/Version_2/GuestbookUpload.htm and
//      https://jazzliveaarau.ch/Guestbook/Version_2/Php/LoginLogout.php
//
// Some JAZZ live AARAU applications share (use the same) PHP files that
// are in the directory https://jazzliveaarau.ch/JazzScripts/Php/. In
// the directory https://jazzliveaarau.ch/JazzScripts/ are the JavaScript
// files (functions) that the JAZZ live AARAU applications share.  
// Constructing a relative URL to the directory (slug) /JazzScripts/Php/ 
// is not difficult, but rather error prone. It is therefore recommended
// that absolute URLs are used as input data when the jQuery post function
// is used and this class should compute the relative directory URL.
//
// https://developer.mozilla.org/en-US/docs/Web/API/URL_API/Resolving_relative_references
// https://developer.mozilla.org/en-US/docs/Learn_web_development/Howto/Web_mechanics/What_is_a_URL
// https://en.wikipedia.org/wiki/Clean_URL
// https://www.geeksforgeeks.org/how-to-redirect-to-a-relative-url-in-javascript/

// TODO This class (file) shall be in project WwwReservation and not in WwwReservationLayout
class UtilUrl
{
    ///////////////////////////////////////////////////////////////////////////
    /////// Start Relative Paths //////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Returns the relative URL to a file or directory to a base directory
    // Input is an absolute URL to the file/dir and an absolute URL to the
    // base directory or the executing HTML or PHP file in the base directory
    //
    // The output relative URL is constructed the following way
    // - The domain part is removed from both input absolute URLs resulting
    //   in the 'Slug input file/dir' and 'Slug base'
    // - The file name of the 'Slug base' is removed if present
    // - The number of slashes of the 'Slug base' is counted
    // - A string with up levels '../' to the top (domain) is constructed
    //   The number of up levels is the number of slashes minus one
    // - The output relative URL is the string with up levels plus the
    //   'Slug input file/dir'
    //
    // Input data
    // i_absolute_url_to_file_or_dir
    // e.g.  https://jazzliveaarau.ch/XmlTestData/EventProgramSample.xml
    // i_absolute_url_base_dir_or_file: An HTML or PHP file or directory
    // e.g. https://jazzliveaarau.ch/ReservationLayout/Spagi_76_Chairs_V_1/EventReservation.htm
    //
    // Detailed implementation
    // 
    // 
    // 1. If the input file/dir URL is a relative URL then the function just returns
    //    this this relative URL. Call of UtilUrl.isAbsolutePath
    // 2. Check that base file/dir URL is an absolute URL. Return empty string if not
    //    Call of UtilUrl.isAbsolutePath and alert for error
    // 3. Get  'Slug input file/dir' i.e. the absolute URL for the input file/dir 
    //    without the domain part.  Call of getPathOnlySubdirectories
    //    e.g. /XmlTestData/EventProgramSample.xml
    // 4. Get the 'Slug base directory' if input is a file
    //    Call of UtilUrl.getFilePath and UtilUrl.getPathOnlySubdirectories
    //    e.g. /ReservationLayout/Spagi_76_Chairs_V_1/
    // 5. Loop to count the number of slashes of the base URL
    //    e.g. n_slashes = 3
    // 6. Create the string with up levels '../' to the domain
    //    Number of levels up to the domain is n_slashes - 1
    //    e.g. ../../
    // 7. Let the output string be equal to the up level string plus 'Slug input file/dir'
    //    e.g. ../../XmlTestData/EventProgramSample.xml

    static getRelativeUrlToInputBaseDir(i_absolute_url_to_file_or_dir, i_absolute_url_base_dir_or_file)
    {
        if (!UtilUrl.isAbsolutePath(i_absolute_url_to_file_or_dir))
        {
            return i_absolute_url_to_file_or_dir;
        }

        if (!UtilUrl.isAbsolutePath(i_absolute_url_base_dir_or_file))
        {
            alert("UtilUrl.getRelativeUrlToInputBaseDir Not an absolute base URL: " 
                            + i_absolute_url_base_dir_or_file);
            return '';
        }

        var slug_input_file_or_dir = UtilUrl.getPathOnlySubdirectories(i_absolute_url_to_file_or_dir);

        var path_absolute_url_dir = UtilUrl.getFilePath(i_absolute_url_base_dir_or_file);

        var slug_base_dir =  UtilUrl.getPathOnlySubdirectories(path_absolute_url_dir);

        var n_slashes = 0;

        for (var index_char = 0; index_char < slug_base_dir.length; index_char++)
        {
            var current_char = slug_base_dir.substring(index_char, index_char + 1);

            if (current_char == '/')
            {
                n_slashes = n_slashes + 1;
            }

        } // index_char

        var n_levels_up = n_slashes - 1;

        var up_levels_str = '';

        for (var add_level = 1; add_level <= n_levels_up; add_level++)
        {
            up_levels_str = up_levels_str + '../';

        }

        var slug_input_file_or_dir_without_first_slash = slug_input_file_or_dir.substr(1);

        var relative_url_dir_or_file = up_levels_str + slug_input_file_or_dir_without_first_slash;

        console.log("UtilUrl.getRelativeUrlToInputBaseDir slug_input_file_or_dir_without_first_slash= " + slug_input_file_or_dir_without_first_slash);

        console.log("UtilUrl.getRelativeUrlToInputBaseDir slug_base_dir= " + slug_base_dir);

        console.log("UtilUrl.getRelativeUrlToInputBaseDir n_slashes= " + n_slashes.toString());

        console.log("UtilUrl.getRelativeUrlToInputBaseDir n_levels_up= " + n_levels_up.toString());

        console.log("UtilUrl.getRelativeUrlToInputBaseDir up_levels_str= " + up_levels_str);

        console.log("UtilUrl.getRelativeUrlToInputBaseDir relative_url_dir_or_file= " + relative_url_dir_or_file);

        return relative_url_dir_or_file;

    } // getRelativeUrlToInputBaseDir

    // Get relative URL to the base directory HTML
    // 1. If the input file/dir URL is a relative URL then the function just returns
    //    this this relative URL. Call of UtilUrl.isAbsolutePath
    // 2. Get current base, i.e. the absolute path to the execution HTML file
    //    Call of  window.location.href  
    // 3. If the web page is running in the Visual Studio Live Server the base file will be
    //    https://jazzliveaarau.ch/ReservationLayout/Spagi_76_Chairs_V_1/EventReservation.htm
    // 4. Get and return the relative URL to the current base directory
    //    Call of UtilUrl.getRelativeUrlToInputBaseDir
    static getRelativeUrlHtml(i_absolute_url_to_file_or_dir)
    {
        console.log("UtilUrl.getRelativeUrlHtml Enter. i_absolute_url_to_file_or_dir= " + i_absolute_url_to_file_or_dir);

        if (!UtilUrl.isAbsolutePath(i_absolute_url_to_file_or_dir))
        {
            return i_absolute_url_to_file_or_dir;
        }

        var absolute_url_base_file = window.location.href;

        if (!UtilUrl.execApplicationOnServer())
        {
            // Not possible to execute this function with the VS Live Server
            console.log("UtilUrl.getRelativeUrlHtml VS Live Server current_base= " + absolute_url_base_file);

            absolute_url_base_file = 'https://jazzliveaarau.ch/ReservationLayout/Spagi_76_Chairs_V_1/EventReservation.htm'

            console.log("UtilUrl.getRelativeUrlHtml For test change to current_base= " + absolute_url_base_file);

            alert("UtilUrl.getRelativeUrlHtml For test change to current_base= " + absolute_url_base_file);
        }  
    
        return UtilUrl.getRelativeUrlToInputBaseDir(i_absolute_url_to_file_or_dir, absolute_url_base_file);

    } // getRelativeUrlHtml

    // Get relative URL to a base PHP directory
    static getRelativeUrlPhp(i_absolute_url_to_file_or_dir, i_absolute_url_php_base_dir_or_file)
    {
        console.log("UtilUrl.getRelativeUrlPhp Enter");

        return UtilUrl.getRelativeUrlToInputBaseDir(i_absolute_url_to_file_or_dir, i_absolute_url_php_base_dir_or_file);

    } // getRelativeUrlPhp


    // Get the relative path to the input path relative the current base dir
    // 1. Check input URL. Call of UtilUrl.isAbsolutePath and UtilUrl.isDirectoryPath
    // 2. Get and return the relative URL to the input directory
    //    Call of UtilUrl.getRelativeUrlHtml
    static getRelativeUrlHtmlDir(i_url_dir_absolute)
    {
        if (!UtilUrl.isAbsolutePath(i_url_dir_absolute)  || 
            !UtilUrl.isDirectoryPath(i_url_dir_absolute))
        {
            alert("UtiUrl.getRelativeUrlHtmlDir Not absolute or directry URL i_url_dir_absolute= " + i_url_dir_absolute);

            return '';
        }

        return UtilUrl.getRelativeUrlHtml(i_url_dir_absolute);

    } // getRelativeUrlHtmlDir

    // Returns the absolute URL i.e. replaces ../ and adds the base URL directory
    // If the input URL is absolute this URL is returned
    // i_url_relative: Input relative URL
    // e.g. Php/
    // 1. Get the current base directory 
    //    Call of window.location.href and UtilUrl.getFilePath
    //    e.g. https://jazzliveaarau.ch/ReservationLayout/Spagi_76_Chairs_V_1/
    // 2. Return the absolute URL as current base directory + input relative URL 
    //    e.g. https://jazzliveaarau.ch/ReservationLayout/Spagi_76_Chairs_V_1/Php/
    static convertToAbsoluteUrl(i_url_relative)
    {
        if (i_url_relative.trim().length == 0)
        {
            alert("UtilUrl.getAbsolutUrl Input i_url_relative string is empty");

            return '';
        }

        if (UtilUrl.isAbsolutePath(i_url_relative))
        {
            return i_url_relative;
        }

        /*QQQQ
        if (i_url_relative.trim().length > 0)
        {
            if (UtilUrl.isAbsolutePath(i_url_relative))
            {
                return i_url_relative;
            }
        }
            QQQQ*/

        if (!UtilUrl.execApplicationOnServer())
        {
            alert("UtilUrl.getAbsolutUrl Application is running on VS Live Server. Please upload files and run on server ");

            return '';
        }

        var ret_absolute_url = UtilUrl.currentSchemeAndDomain();

        var dir_array = UtilUrl.currentPathOnlySubdirectoriesArray();

        var current_base_sub_dir = '';

        if (dir_array.length > 0)
        {
            var index_dir = 0;

            current_base_sub_dir = '/' + dir_array[index_dir];
        }

        var n_up_levels = UtilUrl.getNumberUpLevels(i_url_relative);

        if (n_up_levels >= 2)
        {
            var index_end = n_up_levels - 2;

            for (var index_dir = 0; index_dir <= index_end; index_dir++)
            {
    
                var current_dir = dir_array[index_dir];
    
                ret_absolute_url =  ret_absolute_url + '/' + current_dir;
    
            } // index_dir

            var path_keep = UtilUrl.extractKeepString(i_url_relative, n_up_levels);
 
            ret_absolute_url =  ret_absolute_url + path_keep;

        } // index_end >=0
        else if (n_up_levels >= 1)
        {
            ret_absolute_url =  ret_absolute_url + current_base_sub_dir;
            
            var path_keep = UtilUrl.extractKeepString(i_url_relative, n_up_levels);

            ret_absolute_url =  ret_absolute_url  + '/' + path_keep;

        } // n_up_levels >= 1
        else if (n_up_levels == 0)
        {
            ret_absolute_url =  ret_absolute_url + current_base_sub_dir;

            var point_slash_str = './';

            var slash_str = '/';

            var index_point_slash = i_url_relative.indexOf(point_slash_str);

            var index_slash = i_url_relative.indexOf(slash_str);

            if (index_point_slash == 0)
            {
                var keep_sub_dir = i_url_relative.substring(1);

                ret_absolute_url =  ret_absolute_url + keep_sub_dir;
            }
            else if (index_slash == 0)
            {
                // Would be nicer with i_url_relative but base dir already  aaded above
                ret_absolute_url =  ret_absolute_url +'/';
            }
            else
            {
                // File name is assumed

                ret_absolute_url =  ret_absolute_url + '/' + i_url_relative;
            }

        } // n_up_levels == 1
        else
        {
            alert("UtilUrl.convertToAbsoluteUrl Programming error");

            return '';
        }

        return ret_absolute_url;

    } // convertToAbsoluteUrl

    // Returns the keep string
    static extractKeepString(i_url_relative, i_n_up_levels)
    {
        var ret_keep_str = '';

        var one_up_str = '../';

        var one_up_str_length = one_up_str.length;

        if (i_n_up_levels >= 1)
        {
            var index_keep = i_n_up_levels * one_up_str_length; 

            ret_keep_str = i_url_relative.substring(index_keep);
        }
        else
        {
            ret_keep_str = 'TODO';
        }

        return ret_keep_str;

    } // extractKeepString

    // Returns the number of up levels
    static getNumberUpLevels(i_rel_url_dir_or_file)
    {
        var index_str = '../';

        var index_str_length = index_str.length;

        var search_str = i_rel_url_dir_or_file;

        var ret_n_up = 0;

        for (var i_up = 0; i_up <= 100; i_up++)
        {
            var index_up_str = search_str.indexOf(index_str);

            if (index_up_str < 0)
            {
                break;
            }
            else
            {
                ret_n_up = ret_n_up + 1;

                search_str = search_str.substring(index_up_str + index_str_length);
            }

        } // i_up

        return ret_n_up;

    } // getNumberUpLevels

    ///////////////////////////////////////////////////////////////////////////
    /////// End Relative Paths ////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    /////// Start Part Paths //////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Returns the end string of an URL i.e. without the scheme and domain part
    static getPathOnlySubdirectories(i_path_file_name)
    {
        var url_trim = i_path_file_name.trim();

        var index_slashes = url_trim.indexOf('://');

        if (index_slashes < 0)
        {
            alert("UtilUrl.getPathOnlySubdirectories Not an absolut path");

            return '';
        }

        var removed_slashes_str = url_trim.substring(index_slashes + 4);

        var index_slash = removed_slashes_str.indexOf('/');

        if (index_slash < 0)
        {
            alert("UtilUrl.getPathOnlySubdirectories There is no subdirectory");

            return '';
        }
        
        var path_only_subdirs = removed_slashes_str.substr(index_slash);

        if (path_only_subdirs.length == 0)
        {
            alert("UtilUrl.getPathOnlySubdirectories Empty string returned");

            return '';
        }

        console.log("UtilUrl.getPathOnlySubdirectories path_only_subdirs= " + path_only_subdirs);

        return path_only_subdirs;

    } // getPathOnlySubdirectories

    // Returns an array of directory names up to the domain.
    // 1. Get current path string with only directories
    //    Call of window.location.href, UtilUrl.getFilePath and 
    //    UtilUrl.getPathOnlySubdirectories
    // 2. The end string of the input URL is extracted. The exctracted string is the
    //    path after the scheme and domain part but not including a possible file name
    //    Call of UtilUrl.getPathOnlySubdirectories
    // 3. Loop through this extracted string and put directory names in an array
    // 
    static currentPathOnlySubdirectoriesArray()
    {
        var absolute_url_base_file = window.location.href;

        var absolute_url_base_file_only_path = UtilUrl.getFilePath(absolute_url_base_file);

        var only_directories =  UtilUrl.getPathOnlySubdirectories(absolute_url_base_file_only_path);

        if (0 == only_directories.length)
        {
            return '';
        }

        var b_start = false;

        var ret_array = [];

        var out_index = -1;
        
        for (var index_char=0; index_char < only_directories.length; index_char++)
        {
            var current_char = only_directories.substring(index_char, index_char + 1);

            if (current_char == '/' && !b_start) 
            {
                b_start = true;

                out_index = out_index + 1;

                ret_array[out_index] = '';
            }
            else if (current_char == '/' && b_start) 
            {
                b_start = false;
            }
            else
            {
                ret_array[out_index] = ret_array[out_index] + current_char;
            }

        } // index_char

        return ret_array;

    } // currentPathOnlySubdirectoriesArray

    // Returns the current scheme and domain part of the URL
    static getSchemeAndDomain(i_absolute_url)
    {
        if (!UtilUrl.isAbsolutePath(i_absolute_url))
        {
            return '';
        }

        var path_only_subdirs = UtilUrl.getPathOnlySubdirectories(i_absolute_url);

        if (path_only_subdirs.length == 0)
        {
            return '';
        }

        var index_path_onlysubdirs = i_absolute_url.indexOf(path_only_subdirs);

        if (index_path_onlysubdirs < 0)
        {
            alert("UtilUrl.getSchemeAndDomain index_path_onlysubdirs < 0");

            return '';
        }

        var ret_scheme_domain = i_absolute_url.substring(0, index_path_onlysubdirs);

        return ret_scheme_domain;
        
    } // getSchemeAndDomain

    
    // Returns the current scheme and domain part of the URL
    static currentSchemeAndDomain()
    {
        var current_base = window.location.href;

        return UtilUrl.getSchemeAndDomain(current_base);
        
    } // currentSchemeAndDomain

    // Returns the absolute URL without the file name
    static getFilePath(i_path_file_name)
    {
        var ret_file_path = '';

        var index_last_slash = i_path_file_name.lastIndexOf('/');

        if (index_last_slash > 0)
        {

            ret_file_path = i_path_file_name.substring(0, index_last_slash + 1);

            if (ret_file_path.length == 0)
            {
                alert("UtilUrl.getFilePath Returned path is empty");

                return ret_file_path;
            }

            console.log("UtilUrl.getFilePath ret_file_path= " + ret_file_path);

            return ret_file_path;
        }
        else
        {
            alert("UtilUrl.getFilePath No last slash (/)");

            return ret_file_path;
        }

    } // getFilePath

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
            alert("UtilUrl.getFileName No extension point in input name= " + i_path_file_name);

            return "";
        }

        console.log("UtilUrl.getFileName ret_file_name= " + ret_file_name);

        return ret_file_name;

    } // getFileName

    // Returns the file name withou extension
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
            alert("UtilUrl.getFileNameWithoutExtension No extension point in input name= " + i_path_file_name);

            return "";
        }

        ret_file_name_no_ext = file_name.substring(0, index_last_point);

        console.log("UtilUrl.getFileNameWithoutExtension ret_file_name_no_ext= " + ret_file_name_no_ext);

        return ret_file_name_no_ext;

    } // getFileNameWithoutExtension

    // Returns the file extension
    static getFileExtension(i_file_name)
    {
        var index_last_point = i_file_name.lastIndexOf('.');

        if (index_last_point < 0)
        {
            alert("UtilUrl.getFileExtension No extension i.e. point in file name " + i_file_name);

            return '';
        }

        console.log("UtilUrl.getFileExtension Extension= " + i_file_name.substring(index_last_point));

        return i_file_name.substring(index_last_point);

    } // getFileExtension

    ///////////////////////////////////////////////////////////////////////////
    /////// End  Part Paths ///////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////


    ///////////////////////////////////////////////////////////////////////////
    /////// Start Check Functions /////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Returns true if it is an absolute path, i.e. containing '://'
    // An alternative implementation could be considered, but using try and 
    // catch for error is not so nice
    // https://www.geeksforgeeks.org/javascript-check-whether-a-url-string-is-absolute-or-relative/
    static isAbsolutePath(i_absolute_url)
    {
        if (i_absolute_url == null)
        {
            alert("UtilUrl.isDirectoryPath  isAbsolutePath is null"); 

            return false;
        }

        var url_trim = i_absolute_url.trim();

        if (0 == url_trim.length)
        {
            alert("UtilUrl.isAbsolutePath  i_absolute_url is empty"); 

            return false;
        }

        var slashes_url = '://';
    
        var index_url = i_absolute_url.indexOf(slashes_url);

        if (index_url > 0)
        {
            console.log("UtilUrl.isAbsolutePath It is an absolute path i_absolute_url= " + i_absolute_url);

            return true;
        }
        else
        {
            console.log("UtilUrl.isAbsolutePath It is NOT an absolute path i_absolute_url= " + i_absolute_url);

            return false;
        }

    } // isAbsolutePath

    // Returns true if the input URL is to a directory, i.e. ending with a slash
    static isDirectoryPath(i_url_dir)
    {
        if (i_url_dir == null)
        {
            alert("UtilUrl.isDirectoryPath  i_url_dir is null"); 

            return false;
        }

        var url_trim = i_url_dir.trim(); 

        var url_length = url_trim.length;

        if (0 == url_length)
        {
            alert("UtilUrl.isDirectoryPath  i_url_dir is empty"); 

            return false;
        }

        var last_char = url_trim.substr(url_length - 1);

        if (last_char == '/')
        {
            console.log("UtilUrl.isDirectoryPath It is a directory last_char= '" + last_char + "'");

            return true;
        }
        else
        {
            console.log("UtilUrl.isDirectoryPath It is NOT a directory last_char= '" + last_char + "'");

            return false;
        }

    } // isDirectoryPath

    ///////////////////////////////////////////////////////////////////////////
    /////// End Check Functions ///////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    /////// Start Running On Server ///////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Returns true if the application is running on the server
    // Returns false if it is running on the Visual Studio Code Live Server
    // Please note that window.location.href can return
    // https://jazzliveaarau.ch or
    // https://www.jazzliveaarau.ch
    static execApplicationOnServer()
    {
        var current_base = window.location.href;

        var vs_live_server_url = '127.0.0.1:5500';
    
        var index_url = current_base.indexOf(vs_live_server_url);
    
        if (index_url > 0) 
        {
            console.log("UtilUrl.execApplicationOnServer Running with VS live server. current_base= " + current_base);

            return false;
        }
        else
        {
            return true;
        }
    
    
    } // execApplicationOnServer

    ///////////////////////////////////////////////////////////////////////////
    /////// End Running On Server /////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

} // UtilUrl
