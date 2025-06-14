// File: UtilCopyArray.js
// Date: 2025-06-11
// Author: Gunnar Lidén

// File content
// =============
//
//  Class for the copying or moving of an array of files based on class UtilFiles
//

//////////////////////////////////////////////////////////////////////////////////////////
/////////////////////// UtilCopyArray Start //////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////

class UtilCopyArray
{
    // Copy files and create directories defined by the input object UtilCopyArrayData
    static copyFilesCreateDirs(i_class_data)
    {
        if (!UtilCopyArray.checkInput(i_class_data))
        {
            return;
        }


    } // copyFilesCreateDirs

    // Check the input data
    static checkInput(i_class_data)
    {
        UtilCopyArray.inputToConsole(i_class_data);

        UtilCopyArray.checkIfOriginDirExists(i_class_data);

    } // checkInput

    // Checks if the origin directory (ReservationLayout) exists
    static checkIfOriginDirExists(i_class_data)
    {
        var util_files_data = new UtilFilesData();

        var origin_dir = i_class_data.getAbsoluteOriginDirUrl();

        var path_php_dir = i_class_data.getAbsoluteUtilFilesPhpDir();

        var success_function_name = UtilCopyArray.createDirsRecursive;

        var error_function_name = UtilCopyArray.execFailed;

        // Callback functions seem not to work

        util_files_data.setDataExecCaseDirExists(origin_dir, path_php_dir, success_function_name, error_function_name);

         // UtilFiles.dirFileAnyCase(util_files_data);

    } // checkIfOriginDirExists

    static createDirsRecursive()
    {
        alert("UtilCopyArray.execFailed Enter");
    }

    static execFailed()
    {
        alert("UtilCopyArray.execFailed Enter");
    }

    // Output input data to console
    static inputToConsole(i_class_data)
    {
        UtilCopyArray.debug("UtilCopyArray", "Input data. Object UtilCopyArrayData");

        UtilCopyArray.debug("", "getDomainUrl= " + i_class_data.getDomainUrl());

        UtilCopyArray.debug("", "getAbsoluteUtilFilesPhpDir= " + i_class_data.getAbsoluteUtilFilesPhpDir());

        UtilCopyArray.debug("", "getAbsoluteOriginDirUrl= " + i_class_data.getAbsoluteOriginDirUrl());

        UtilCopyArray.debug("", "getAbsoluteTargetDirUrl= " + i_class_data.getAbsoluteTargetDirUrl());

        UtilCopyArray.debug("", "getAbsoluteTargetPhpDirUrl= " + i_class_data.getAbsoluteTargetPhpDirUrl());

        UtilCopyArray.debug("", "getAbsoluteTargetScriptsDirUrl= " + i_class_data.getAbsoluteTargetScriptsDirUrl());

        UtilCopyArray.debug("", "getAbsoluteTargetDirArray Directories to create: ");

        var dir_array = i_class_data.getAbsoluteTargetDirArray();

        for (var index_dir = 0; index_dir < dir_array.length; index_dir++)
        {
             UtilCopyArray.debug(index_dir.toString(), "Directory " + dir_array[index_dir]);
        }

        UtilCopyArray.debug("", "getAbsoluteOriginFileUrlArray Original files that will be copied or moved: ");

        var origin_array = i_class_data.getAbsoluteOriginFileUrlArray();

        var target_array = i_class_data.getAbsoluteTargetFileUrlArray();

        var n_files = origin_array.length;

        if (n_files != target_array.length)
        {
            alert("UtilCopyArray.inputToConsole Number of origin and target files not equal");

            return;
        }

        for (var index_file = 0;  index_file < n_files; index_file++)
        {
             UtilCopyArray.debug(index_file.toString(), "From " + origin_array[index_file]);

             UtilCopyArray.debug(index_file.toString(), "To   " + target_array[index_file]);
        }


    } // inputToConsole

    // Debug output to the console
    static debug(i_function_name, i_debug_str)
    {
        var debug_str = '';

        if (i_function_name.length > 0)
        {
            debug_str =  debug_str + i_function_name + ' ';
        }

        debug_str =  debug_str + i_debug_str;

        console.log(debug_str);

    } // debug


} // UtilCopyArray

//////////////////////////////////////////////////////////////////////////////////////////
/////////////////////// UtilCopyArray End ////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////