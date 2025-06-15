// File: UtilCopyArray.js
// Date: 2025-06-15
// Author: Gunnar Lidén

// File content
// =============
//
//  Class for the copying or moving of an array of files based on class UtilFiles
//

//////////////////////////////////////////////////////////////////////////////////////////
/////////////////////// UtilCopyArray Start //////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////


// The object of class UtilCopyArrayData
// The static class UtilCopyArray uses this variable for input and execution data
var g_util_copy_array_data = null;


class UtilCopyArray
{
    // Copy files and create directories defined by the input object UtilCopyArrayData
    static copyFilesCreateDirs()
    {
        UtilCopyArray.debug("copyFilesCreateDirs", "Enter");

        UtilCopyArray.checkInput(g_util_copy_array_data);

    } // copyFilesCreateDirs

    // Check the input data
    static checkInput(i_class_data)
    {
        UtilCopyArray.debug("checkInput", "Enter");
        
        UtilCopyArray.inputToConsole(i_class_data);

        UtilCopyArray.checkIfOriginDirExists(i_class_data);

    } // checkInput

    // Checks if the origin directory (ReservationLayout) exists
    static checkIfOriginDirExists(i_class_data)
    {
        UtilCopyArray.debug("checkIfOriginDirExists", "Enter");

        var util_files_data = new UtilFilesData();

        var origin_dir = i_class_data.getAbsoluteOriginDirUrl();

        var path_php_dir = i_class_data.getAbsoluteUtilFilesPhpDir();

        // var success_function_name = UtilCopyArray.createDirsRecursive; TODO Find another solution

        // var error_function_name = UtilCopyArray.execFailed; TODO Find another solution

        var success_function_name = globatCreateDirsRecursive;

        var error_function_name = globalExecFailed;

        g_index_create_directories = -1;

        util_files_data.setDataExecCaseDirExists(origin_dir, path_php_dir, success_function_name, error_function_name);

        UtilFiles.dirFileAnyCase(util_files_data);

    } // checkIfOriginDirExists

     // Checks if the target directory (e.g Spagi_90_Chairs_v_1) exists
    static checkIfTargetDirExists(i_class_data)
    {
        UtilCopyArray.debug("checkIfTargetDirExists", "Enter");

        var util_files_data = new UtilFilesData();

        var target_dir = g_util_copy_array_data.getAbsoluteTargetDirUrl();

        var path_php_dir = g_util_copy_array_data.getAbsoluteUtilFilesPhpDir();

        // var success_function_name = UtilCopyArray.createDirsRecursive; TODO Find another solution

        // var error_function_name = UtilCopyArray.execFailed; TODO Find another solution

        var success_function_name = globalCreateTargetDir; // 

        var error_function_name = globatCreateDirsRecursive;

        util_files_data.setDataExecCaseDirExists(target_dir, path_php_dir, success_function_name, error_function_name);

        UtilFiles.dirFileAnyCase(util_files_data);

    } // checkIfTargetDirExists

    // Create the target main directory
    static createTargetDir()
    {
        UtilCopyArray.debug("createTargetDir", "Enter");

        var util_files_data = new UtilFilesData();

        var target_dir = g_util_copy_array_data.getAbsoluteTargetDirUrl();

        var path_php_dir = g_util_copy_array_data.getAbsoluteUtilFilesPhpDir();

        var success_function_name = globatCreateDirsRecursive;

        var error_function_name = globalExecFailed;

         UtilCopyArray.debug("", "Directory name= " + target_dir);

        util_files_data.setDataExecCaseCreateDir(target_dir, path_php_dir, success_function_name, error_function_name);

        UtilFiles.dirFileAnyCase(util_files_data);

    } // createTargetDir
   
    // Create directories recursively
    static createDirsRecursive()
    {
        UtilCopyArray.debug("createDirsRecursive", "Enter");

        g_index_create_directories = g_index_create_directories + 1;

        var dir_array = g_util_copy_array_data.getAbsoluteTargetDirArray();

        var util_files_data = new UtilFilesData();

        var name_dir = dir_array[g_index_create_directories];

        UtilCopyArray.debug("", "Directory name= " + name_dir);

        var path_php_dir = g_util_copy_array_data.getAbsoluteUtilFilesPhpDir();

        var success_function_name = globatCreateDirsRecursive;

        if (g_index_create_directories == dir_array.length - 2)
        {
            success_function_name = globatCreateFilesRecursive;
        }

        var error_function_name = globalExecFailed;

        util_files_data.setDataExecCaseCreateDir(name_dir, path_php_dir, success_function_name, error_function_name);

        UtilFiles.dirFileAnyCase(util_files_data);

    } // createDirsRecursive

    static createFilesRecursive()
    {
        UtilCopyArray.debug("createFilesRecursive", "Enter");

        alert("UtilCopyArray.createFilesRecursive Enter");
    }

    static execFailed()
    {
        UtilCopyArray.debug("execFailed", "Enter");

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

var g_index_create_directories = -1;

// 
function globalCreateTargetDir()
{
    UtilCopyArray.createTargetDir();
}

// Global function corresponding to UtilCopyArray.createDirsRecursive
function globatCreateDirsRecursive()
{
    UtilCopyArray.createDirsRecursive();
    
} // globatCreateDirsRecursive

// Global function corresponding to UtilCopyArray.createFilesRecursive
function globatCreateFilesRecursive()
{
    UtilCopyArray.createFilesRecursive();

} // globatCreateFilesRecursive

// Global function corresponding to UtilCopyArray.globalExecFailed
function globalExecFailed()
{
    UtilCopyArray.execFailed();
    
} // globalExecFailed

//////////////////////////////////////////////////////////////////////////////////////////
/////////////////////// UtilCopyArray End ////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////