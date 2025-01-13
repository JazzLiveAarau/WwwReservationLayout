// File: UtilUrl.js
// Date: 2025-01-13
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
// Slug: This is the part of the absolute URL from the first slash
// e.g. /Guestbook/Version_2/GuestbookUpload.htm
//
// Relative URL to the domain: This is the slug
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

        /*QQQQQQQ
        var path_only_subdirs = UtilUrl.getPathOnlySubdirectories(i_url_dir_absolute);

        var current_base = window.location.href;

        if (!UtilUrl.execApplicationOnServer())
        {
            // Not possible to execute this function with the VS Live Server
            console.log("UtilUrl.getRelativeUrlHtmlDir VS Live Server current_base= " + current_base);

            current_base = 'https://jazzliveaarau.ch/ReservationLayout/Spagi_76_Chairs_V_1/EventReservation.htm'

            console.log("UtilUrl.getRelativeUrlHtmlDir For test change to current_base= " + current_base);
        }

        var current_base_path= UtilUrl.getFilePath(current_base);

        var current_base_dir =  UtilUrl.getPathOnlySubdirectories(current_base_path);

        var n_slashes = 0;

        for (var index_char = 0; index_char < current_base_dir.length; index_char++)
        {
            var current_char = current_base_dir.substring(index_char, index_char + 1);

            if (current_char == '/')
            {
                n_slashes = n_slashes + 1;
            }
        }

        var n_levels_up = n_slashes - 1;

        var up_levels_str = '';

        for (var add_level = 1; add_level <= n_levels_up; add_level++)
        {
            up_levels_str = up_levels_str + '../';

        }

        var path_only_subdirs_without_first_slash = path_only_subdirs.substr(1);

        var relative_path_dir = up_levels_str + path_only_subdirs_without_first_slash;

        return relative_path_dir;

        QQQQ*/

    } // getRelativeUrlHtmlDir

    ///////////////////////////////////////////////////////////////////////////
    /////// End Relative Paths ////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    /////// Start Part Paths //////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Returns the end string of an URL i.e. without the homepage part
    static getPathOnlySubdirectories(i_path_file_name)
    {
        var url_trim = i_path_file_name.trim();

        var index_slashes = url_trim.indexOf('://');

        if (index_slashes < 0)
        {
            alert("UtilUrl.getPathOnlySubdirectories Not an absolut path");

            return '';
        }

        var removed_slashes_str = url_trim.substr(index_slashes + 4);

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
