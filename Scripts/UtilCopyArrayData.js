// File: UtilCopyArrayData.js
// Date: 2025-06-11
// Author: Gunnar Lidén

// File content
// =============
//
//  The file defines the class holding data for the class UtilCopyArray
//

//////////////////////////////////////////////////////////////////////////////////////////
/////////////////////// UtilCopyArrayData Start //////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////

// Class holding data for the class UtilCopyArray
class UtilCopyArrayData
{
    ///////////////////////////////////////////////////////////////////////
    /////////////////// Constructor Start /////////////////////////////////
    ///////////////////////////////////////////////////////////////////////

    // Member variables of the class
    constructor()
    {
        // Absolute URL to the origin directory
        this.m_abs_origin_dir_url = '';

        // Absolute URL to the target directory
        this.m_abs_target_dir_url = '';

         // Absolute URL to the UtilFiles.php directory 
        this.m_abs_php_dir_url = '';

        // Name of the PHP file used by class UtilFiles
        this.m_php_file_name = 'UtilFiles.php';

        // Absolute origin file URL array
        this.m_abs_origin_file_url_array = [];

        // Absolute target file URL array
        this.m_abs_target_file_url_array = [];

        // Array of booleans delete origin file
        this.m_bool_delete_origin_file_array = [];

    } // constructor

    ///////////////////////////////////////////////////////////////////////
    /////////////////// Constructor End ///////////////////////////////////
    ///////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////
    /////////////////// Get And Set Start /////////////////////////////////
    ///////////////////////////////////////////////////////////////////////

    // Set the absolute URL to the origin directory
    setAbsoluteOriginDirUrl(i_abs_origin_dir_url)
    {
         this.m_abs_origin_dir_url = this.addEndSlashIfNeeded(i_abs_origin_dir_url);

    } // setAbsoluteOriginDirUrl

    // Returns the absolute URL to the origin directory
    getAbsoluteOriginDirUrl()
    {
         return this.m_abs_origin_dir_url;
         
    } // getAbsoluteOriginDirUrl

    // Set the absolute URL to the target directory
    setAbsoluteTargetDirUrl(i_abs_target_dir_url)
    {
         this.m_abs_target_dir_url = this.addEndSlashIfNeeded(i_abs_target_dir_url);

    } // setAbsoluteTargetDirUrl

    // Returns the absolute URL to the target directory
    getAbsoluteTargetDirUrl()
    {
         return this.m_abs_target_dir_url;
         
    } // getAbsoluteTargetDirUrl

    // Set the absolute URL to the PHP directory
    setAbsolutePhpDirUrl(i_abs_php_dir_url)
    {
         this.m_abs_php_dir_url = this.addEndSlashIfNeeded(i_abs_php_dir_url);

    } // setAbsolutePhpDirUrl

    // Returns the absolute URL to the PHP directory
    getAbsolutePhpDirUrl()
    {
         return this.m_abs_php_dir_url;
         
    } // getAbsolutePhpDirUrl

    // Set the URLs for the origin files
    // Input URLs may be absolute or relative m_abs_origin_dir_url
    setOriginFileUrlArray(i_abs_or_rel_origin_file_url_array)
    {
         this.m_abs_origin_file_url_array = this.convertRelToAbsUrl(i_abs_or_rel_origin_file_url_array, false);

    } // setOriginFileUrlArray

    // Returns the absolute URLs for the origin files
    getAbsoluteOriginFileUrlArray()
    {
         return this.m_abs_origin_file_url_array;
         
    } // getAbsoluteOriginFileUrlArray

    // Set the URLs for the target files
    // Input URLs may be absolute or relative m_abs_origin_dir_url
    setTargetFileUrlArray(i_abs_or_rel_target_file_url_array)
    {
         this.m_abs_target_file_url_array =  this.convertRelToAbsUrl(i_abs_or_rel_target_file_url_array, true);

    } // setTargetFileUrlArray

    // Returns the absolute URLs for the target files
    getAbsoluteTargetFileUrlArray()
    {
         return this.m_abs_target_file_url_array;
         
    } // getAbsoluteTargetFileUrlArray

    // Set the array of booleans delete origin file
    // Please note that there are utility functtions to set the array:
    // setBoolDeleteOriginFileArrayToTrue, setBoolDeleteOriginFileArrayToFalse
    setBoolDeleteOriginFileArray(i_bool_delete_origin_file_array)
    {
         this.m_bool_delete_origin_file_array = i_bool_delete_origin_file_array;

    } // setBoolDeleteOriginFileArray

    // Returnsthe array of booleans delete origin file
    getBoolDeleteOriginFileArray()
    {
         return this.m_bool_delete_origin_file_array;
         
    } // getBoolDeleteOriginFileArray

    ///////////////////////////////////////////////////////////////////////
    /////////////////// Get And Set End ///////////////////////////////////
    ///////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////
    /////////////////// Utility Functions Start ///////////////////////////
    ///////////////////////////////////////////////////////////////////////

    // Set the array of booleans delete origin file to true
    setBoolDeleteOriginFileArrayToTrue()
    {
        var n_files = this.m_abs_origin_dir_url.length;

        if (n_files == 0)
        {
            alert("UtilCopyArrayData.setBoolDeleteOriginFileArrayToTrue No origin files are defined");

            return false;
        }

        if (n_files != this.m_abs_target_dir_url.length)
        {
            alert("UtilCopyArrayData.setBoolDeleteOriginFileArrayToTrue Number of origin and target files not the same");

             return false;
        }

        this.m_bool_delete_origin_file_array = [];

        for (var index_bool = 0; index_bool < n_files; index_bool++)
        {
            this.m_bool_delete_origin_file_array[index_bool] = true;
        }

         return true;

    } // setBoolDeleteOriginFileArrayToTrue

    // Set the array of booleans delete origin file to true
    setBoolDeleteOriginFileArrayToFalse()
    {
        var n_files = this.m_abs_origin_dir_url.length;

        if (n_files == 0)
        {
            alert("UtilCopyArrayData.setBoolDeleteOriginFileArrayToFalse No origin files are defined");

             return false;
        }

        if (n_files != this.m_abs_target_dir_url.length)
        {
            alert("UtilCopyArrayData.setBoolDeleteOriginFileArrayToFalse Number of origin and target files not the same");

             return false;
        }

        this.m_bool_delete_origin_file_array = [];

        for (var index_bool = 0; index_bool < n_files; index_bool++)
        {
            this.m_bool_delete_origin_file_array[index_bool] = false;
        }

         return true;

    } // setBoolDeleteOriginFileArrayToFalse

    convertRelToAbsUrl(i_abs_or_rel_file_url_array, i_b_target)
    {
        var ret_array = i_abs_or_rel_file_url_array;

        var abs_start = this.getAbsoluteOriginDirUrl();

        if (i_b_target)
        {
            abs_start = this.getAbsoluteTargetDirUrl();
        }

         for (var index_url = 0; index_url < ret_array.length; index_url++)
         {
            var current_url = ret_array[index_url];

            index_abs = current_url.indexOf(abs_start);

            if (index_abs < 0)
            {
                var out_url = '';

                if (current_url.substring(0, 1) == '/')
                {
                    out_url = abs_start + current_url.substring(1);
                }
                else
                {
                    out_url = abs_start + current_url;
                }

                 ret_array[index_url] = out_url;

            } // Relative URL

        
         } // index_url

        return ret_array;

    } // convertRelToAbsOriginUrl

    // Add end slash '/' to absolute dir URL if needed
    addEndSlashIfNeeded(i_abs_dir_url)
    {
        var ret_abs_dir_url = i_abs_dir_url;

        var n_chars = ret_abs_dir_url.length;

        if (n_chars < 4)
        {
             alert("UtilCopyArrayData.addEndSlashIfNeeded Number of characters < 4 for URL " + ret_abs_dir_url);

             return ret_abs_dir_url;

        }

        var end_char = ret_abs_dir_url.substring(n_chars-1);

        if (end_char != "/")
        {
             ret_abs_dir_url =  ret_abs_dir_url + "/";
        }


         return ret_abs_dir_url;

    } // addEndSlashIfNeeded


    ///////////////////////////////////////////////////////////////////////
    /////////////////// Utility Functions End /////////////////////////////
    ///////////////////////////////////////////////////////////////////////

} // UtilCopyArrayData

//////////////////////////////////////////////////////////////////////////////////////////
/////////////////////// UtilCopyArrayData End ////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////