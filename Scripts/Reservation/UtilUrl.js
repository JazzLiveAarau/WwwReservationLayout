// File: UtilUrl.js
// Date: 2024-12-30
// Author: Gunnar Lidén

// Class with utility functions for paths
//
// TODO This class (file) shall be in project WwwReservation and not in WwwReservationLayout
class UtilUrl
{
    ///////////////////////////////////////////////////////////////////////////
    /////// Start Relative Paths //////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Get the relative path to the input path relative the current base dir
    // 1. Check input URL. Call of UtilUrl.isAbsolutePath and UtilUrl.isDirectoryPath
    // 2. Get only the subdirectories, i.e. remove the 'homepage' part
    //    Example: Input https://jazzliveaarau.ch/ReservationLayout/Scripts/ 
    //    results in /ReservationLayout/Scripts/
    static getRelativePathToDirectory(i_url_dir_absolute)
    {
        if (!UtilUrl.isAbsolutePath(i_url_dir_absolute)  || 
            !UtilUrl.isDirectoryPath(i_url_dir_absolute))
        {
            return '';
        }

        var path_only_subdirs = UtilUrl.getPathOnlySubdirectories(i_url_dir_absolute);

        var current_base = window.location.href;

        if (!UtilUrl.execApplicationOnServer())
        {
            // Not possible to execute this function with the VS Live Server
            console.log("UtilUrl.getRelativePathToDirectory VS Live Server current_base= " + current_base);

            current_base = 'https://jazzliveaarau.ch/ReservationLayout/Spagi_76_Chairs_V_1/EventReservation.htm'

            console.log("UtilUrl.getRelativePathToDirectory For test change to current_base= " + current_base);
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

        console.log("UtilUrl.getRelativePathToDirectory path_only_subdirs_without_first_slash= " + path_only_subdirs_without_first_slash);

        console.log("UtilUrl.getRelativePathToDirectory current_base_path= " + current_base_path);

        console.log("UtilUrl.getRelativePathToDirectory current_base_dir= " + current_base_dir);

        console.log("UtilUrl.getRelativePathToDirectory n_slashes= " + n_slashes.toString());

        console.log("UtilUrl.getRelativePathToDirectory n_levels_up= " + n_levels_up.toString());

        console.log("UtilUrl.getRelativePathToDirectory up_levels_str= " + up_levels_str);

        console.log("UtilUrl.getRelativePathToDirectory relative_path_dir= " + relative_path_dir);

        return relative_path_dir;

    } // getRelativePathToDirectory

    ///////////////////////////////////////////////////////////////////////////
    /////// End Relative Paths ////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    /////// Start Part Paths //////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Returns the end path without homepage, i.e. https://www.jazzliveaarau.ch/ is removed
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

    // Returns the file path
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
