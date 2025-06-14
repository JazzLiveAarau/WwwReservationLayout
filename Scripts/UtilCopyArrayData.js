// File: UtilCopyArrayData.js
// Date: 2025-06-14
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
    constructor(i_domain_url, i_abs_php_util_file_dir)
    {
        // Domain
        this.m_domain_url = i_domain_url;

        // Absolute URL the directory with the file UtilFiles.php for class UtiFiles
        this.m_abs_php_util_file_dir = i_abs_php_util_file_dir;

        // Absolute URL to the origin directory
        this.m_abs_origin_dir_url = '';

        // Absolute URL to the target directory
        this.m_abs_target_dir_url = '';

         // Absolute URL to the target UtilFiles.php directory 
        this.m_abs_target_php_dir_url = '';

        // Name of the PHP file used by class UtilFiles
        this.m_php_file_name = 'UtilFiles.php';

        // Absolute URL to the origin scripts_directory
        this.m_abs_origin_scripts_dir_url = '';

        // Absolute URL to the target scripts_directory
        this.m_abs_target_scripts_dir_url = ''; // TODO Remove

        // Input origin file URL array
        this.m_input_origin_file_url_array = []; // TODO Remove

        // Input target file URL array
        this.m_input_target_file_url_array = [];

        // Absolute origin file URL array
        this.m_abs_origin_file_url_array = [];

        // Absolute target file URL array
        this.m_abs_target_file_url_array = [];

        // Array of booleans delete origin file
        this.m_bool_delete_origin_file_array = [];

        // Array of absolute target directories that shall be created
        this.m_abs_target_dir_array = null;

    } // constructor

    ///////////////////////////////////////////////////////////////////////
    /////////////////// Constructor End ///////////////////////////////////
    ///////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////
    /////////////////// Get And Set Start /////////////////////////////////
    ///////////////////////////////////////////////////////////////////////

      // Set the domain URL
    setDomainUrl(i_domain_url)
    {
         this.m_domain_url = this.addEndSlashIfNeeded(i_domain_url);

    } // setDomainUrl

    // Returns the domain URL
    getDomainUrl()
    {
         return this.m_domain_url;
         
    } // getDomainUrl   
    
    // Returns the absolute URL the directory with the file UtilFiles.php for class UtiFiles
    getAbsoluteUtilFilesPhpDir()
    {
          return this.m_abs_php_util_file_dir;

    } // getAbsoluteUtilFilesPhpDir

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

    // Set the absolute URL to the target PHP directory
    setAbsoluteTargetPhpDirUrl(i_abs_php_dir_url)
    {
         this.m_abs_target_php_dir_url = this.addEndSlashIfNeeded(i_abs_php_dir_url);

    } // setAbsoluteTargetPhpDirUrl

    // Returns the absolute target URL to the PHP directory
    getAbsoluteTargetPhpDirUrl()
    {
         return this.m_abs_target_php_dir_url;
         
    } // getAbsoluteTargetPhpDirUrl

    // Set the absolute URL to the origin scripts directory
    setAbsoluteOriginScriptsDirUrl(i_abs_origin_scripts_dir_url) // TODO Remove
    {
         this.m_abs_origin_scripts_dir_url = this.addEndSlashIfNeeded(i_abs_origin_scripts_dir_url);

    } // setAbsoluteOriginScriptsDirUrl

    // Returns the absolute URL to the origin scripts directory
    getAbsoluteOriginScriptsDirUrl() // TODO Remove
    {
         return this.m_abs_origin_scripts_dir_url;
         
    } // getAbsoluteOriginScriptsDirUrl

    // Set the absolute URL to the origin scripts directory
    setAbsoluteTargetScriptsDirUrl(i_abs_target_scripts_dir_url)  // TODO Remove
    {
         this.m_abs_target_scripts_dir_url = this.addEndSlashIfNeeded(i_abs_target_scripts_dir_url);

    } // setAbsoluteTargetScriptsDirUrl

    // Returns the absolute URL to the origin scripts directory
    getAbsoluteTargetScriptsDirUrl() // TODO Remove
    {
         return this.m_abs_target_scripts_dir_url;
         
    } // getAbsoluteTargetScriptsDirUrl

    // Set array of target directory URLs that shall be created
    // Input URLs may be absolute oder relative
    setAbsoluteTargetDirArray(i_abs_or_rel_target_dir_array)
    {
        var converted_url = this.convertTargetDirArrayToAbsoluteUrls(i_abs_or_rel_target_dir_array);

        this.m_abs_target_dir_array = converted_url;

    } // setAbsoluteTargetDirArray

    // Returns array of target directory URLs that shall be created
    getAbsoluteTargetDirArray()
    {
          return this.m_abs_target_dir_array;

    } // getAbsoluteTargetDirArray

/*
        // Array of absolute target directories that shall be created
        this.m_abs_target_dir_array = null;

*/



    // Set the URLs for the origin files
    // Input URLs may be absolute or relative m_abs_origin_dir_url
    setOriginFileUrlArray(i_abs_or_rel_origin_file_url_array)
    {
          this.m_input_origin_file_url_array = i_abs_or_rel_origin_file_url_array;

          var b_origin = true;

          this.setAbsoluteFileArray(b_origin);

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
          this.m_input_target_file_url_array = i_abs_or_rel_target_file_url_array;

          var b_origin = false;

          this.setAbsoluteFileArray(b_origin);

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
        var n_files = this.m_abs_origin_file_url_array.length;

        if (n_files == 0)
        {
            alert("UtilCopyArrayData.setBoolDeleteOriginFileArrayToTrue No origin files are defined");

            return false;
        }

        if (n_files != this.m_abs_target_file_url_array.length)
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
        var n_files = this.m_abs_origin_file_url_array.length;

        if (n_files == 0)
        {
            alert("UtilCopyArrayData.setBoolDeleteOriginFileArrayToFalse No origin files are defined");

             return false;
        }

        if (n_files != this.m_abs_target_file_url_array.length)
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

     // Convert directory URLs to absolute URL if thex are relative
     convertTargetDirArrayToAbsoluteUrls(i_url_dir_array)
     {
          var ret_url_dir_array = [];

          if (i_url_dir_array == null || i_url_dir_array.length == 0)
          {
               alert("convertTargetDirArrayToAbsoluteUrls Input array null or empty");

               return ret_url_dir_array;
          }

          var n_url = i_url_dir_array.length;

          var  abs_start = this.getAbsoluteTargetDirUrl();

          for (var index_url = 0; index_url < n_url; index_url++)
          {

               var current_url = i_url_dir_array[index_url];

               var index_abs = current_url.indexOf(abs_start);

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

                    ret_url_dir_array[index_url] = out_url;

               } // Relative URL
               else
               {
                    ret_url_dir_array[index_url] = current_url;
               }

          } // index_url


          return ret_url_dir_array;

     } // convertTargetDirArrayToAbsoluteUrls


     // Input arrays may be relative or absolute
     // This function sets the absolute aeeay
     setAbsoluteFileArray(i_b_origin)
     {
          var input_array = null;

          var output_array = [];

          if (i_b_origin)
          {
               input_array = this.m_input_origin_file_url_array;

               this.m_abs_origin_file_url_array = null;
          }
          else
          {
               input_array = this.m_input_target_file_url_array;   
               
               this.m_abs_target_file_url_array = null;
          }

          var abs_start = this.getAbsoluteOriginDirUrl();

          var abs_script_start = this.getAbsoluteOriginScriptsDirUrl();

          if (!i_b_origin)
          {
               abs_start = this.getAbsoluteTargetDirUrl();

               abs_script_start = this.getAbsoluteTargetScriptsDirUrl();
          }

          for (var index_url = 0; index_url < input_array.length; index_url++)
          {
                    var current_url = input_array[index_url];

                    var index_abs = current_url.indexOf(abs_start);

                    var index_scripts_abs = current_url.indexOf(abs_script_start);

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

                    output_array[index_url] = out_url;

               } // Relative URL

          } // index_abs

          if (i_b_origin)
          {
               this.m_abs_origin_file_url_array = output_array;
          }
          else
          {
               this.m_abs_target_file_url_array = output_array; 
          }

     } // setAbsoluteFileArray

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