// File: UtilCopyArray.js
// Date: 2025-11-09
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

        if (!UtilUrl.execApplicationOnServer())
        {
            alert("UtilCopyArray.copyFilesCreateDirs Execution with Live Server is not possible");

            return;
        }

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

        var success_function_name = globalCheckIfTargetDirExists;

        var error_function_name = globalExecFailed;

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

        var true_function_name = globatGetExistingDirsRecursive; // 

        var false_function_name = globalCreateTargetDir;

        g_index_directory_or_file = -1;

        g_util_copy_array_data.initAbsoluteTargetDirExistingArray();

        g_util_copy_array_data.initAbsoluteTargetDirNotExistingArray();

        util_files_data.setDataExecCaseDirExists(target_dir, path_php_dir, true_function_name, false_function_name);

        UtilFiles.dirFileAnyCase(util_files_data);

    } // checkIfTargetDirExists

    // Create the target main directory
    static createTargetDir()
    {
        UtilCopyArray.debug("createTargetDir", "Enter");

        var util_files_data = new UtilFilesData();

        var target_dir = g_util_copy_array_data.getAbsoluteTargetDirUrl();

        var path_php_dir = g_util_copy_array_data.getAbsoluteUtilFilesPhpDir();

        var success_function_name = globatGetExistingDirsRecursive;

        var error_function_name = globalExecFailed;

        UtilCopyArray.debug("", "Target main directory= " + target_dir);

        util_files_data.setDataExecCaseCreateDir(target_dir, path_php_dir, success_function_name, error_function_name);

        UtilFiles.dirFileAnyCase(util_files_data);

    } // createTargetDir

    // Get the directories that exist and that not yet exist
    static getExistingDirsRecursive()
    {
        UtilCopyArray.debug("getExistingDirsRecursive", "Enter");

        g_index_directory_or_file = g_index_directory_or_file + 1;

        var dir_array = g_util_copy_array_data.getAbsoluteTargetDirArray();

        var util_files_data = new UtilFilesData();

        var name_dir = dir_array[g_index_directory_or_file];

        UtilCopyArray.debug(g_index_directory_or_file.toString(), "Directory name= " + name_dir);

        var path_php_dir = g_util_copy_array_data.getAbsoluteUtilFilesPhpDir();

        var true_function_name = globatDirExists; 

        var false_function_name = globatDirExistsNot;

        util_files_data.setDataExecCaseDirExists(name_dir, path_php_dir, true_function_name, false_function_name);

        UtilFiles.dirFileAnyCase(util_files_data);

    } // getExistingDirsRecursive

    // Directory exists
    static dirExists()
    {
        UtilCopyArray.debug("dirExists", "Enter");

        var dir_array = g_util_copy_array_data.getAbsoluteTargetDirArray();

        var next_function_to_call = UtilCopyArray.getExistingDirsRecursive;

        var current_dir = dir_array[g_index_directory_or_file];

        UtilCopyArray.debug("dirExists", "Add " + current_dir);

        g_util_copy_array_data.addAbsoluteTargetDirToExistingArray(current_dir);

        if (g_index_directory_or_file == dir_array.length - 1)
        {
            g_index_directory_or_file = -1;

            next_function_to_call = UtilCopyArray.createDirsRecursive;
        }

        next_function_to_call();
 
    } // dirExists

    // Directory do not exist
    static dirExistsNot()
    {
        UtilCopyArray.debug("dirExistsNot", "Enter");

        var dir_array = g_util_copy_array_data.getAbsoluteTargetDirArray();

        var next_function_to_call = UtilCopyArray.getExistingDirsRecursive;

        var current_dir = dir_array[g_index_directory_or_file];

        UtilCopyArray.debug("dirExistsNot", "Add " + current_dir);

        g_util_copy_array_data.addAbsoluteTargetDirToNotExistingArray(current_dir);

        if (g_index_directory_or_file == dir_array.length - 1)
        {
            g_index_directory_or_file = -1;

            next_function_to_call = UtilCopyArray.createDirsRecursive;
        }

        next_function_to_call();

    } // dirExistsNot
   
    // Create directories recursively
    static createDirsRecursive()
    {
        UtilCopyArray.debug("createDirsRecursive", "g_index_directory_or_file= " + g_index_directory_or_file.toString());

        var not_yet_existing_dir = g_util_copy_array_data.getAbsoluteTargetDirNotExistingArray();

        var existing_dir = g_util_copy_array_data.getAbsoluteTargetDirExistingArray();

        UtilCopyArray.debug("createDirsRecursive", "Number of existing directories     " + existing_dir.length.toString());

        UtilCopyArray.debug("createDirsRecursive", "Number of not existing directories " + not_yet_existing_dir.length.toString());

        if (not_yet_existing_dir.length == 0)
        {
             UtilCopyArray.debug("createDirsRecursive", "All directories are already created. Continue directly to copyFilesRecursive");

             g_index_directory_or_file = -1;

            UtilCopyArray.copyFilesRecursive();
        }
        else
        {
            g_index_directory_or_file = g_index_directory_or_file + 1;

            var util_files_data = new UtilFilesData();

            var name_dir = not_yet_existing_dir[g_index_directory_or_file];

            UtilCopyArray.debug("", "Create directory= " + name_dir);

            var path_php_dir = g_util_copy_array_data.getAbsoluteUtilFilesPhpDir();

            var success_function_name = globatCreateDirsRecursive;

            if (g_index_directory_or_file == not_yet_existing_dir.length - 1)
            {
                success_function_name = globatCopyFilesRecursive;

                g_index_directory_or_file = -1;
            }

            var error_function_name = globalExecFailed;

            util_files_data.setDataExecCaseCreateDir(name_dir, path_php_dir, success_function_name, error_function_name);

            UtilFiles.dirFileAnyCase(util_files_data);

        } // Create directory

    } // createDirsRecursive

    // Copy files recursively
    static copyFilesRecursive()
    {
        UtilCopyArray.debug("copyFilesRecursive", "Enter g_index_directory_or_file= " + g_index_directory_or_file.toString());

        var origin_file_array = g_util_copy_array_data.getAbsoluteOriginFileUrlArray();

        var target_file_array = g_util_copy_array_data.getAbsoluteTargetFileUrlArray();

        g_index_directory_or_file = g_index_directory_or_file + 1;

        var util_files_data = new UtilFilesData();

        var origin_file_url = origin_file_array[g_index_directory_or_file];

        var target_file_url = target_file_array[g_index_directory_or_file];

        UtilCopyArray.debug(g_index_directory_or_file.toString(), "origin_file_url= " + origin_file_url);

        UtilCopyArray.debug(g_index_directory_or_file.toString(), "target_file_url= " + target_file_url);

        var path_php_dir = g_util_copy_array_data.getAbsoluteUtilFilesPhpDir();

        var success_function_name = globatCopyFilesRecursive;

        if (g_index_directory_or_file == origin_file_array.length - 1)
        {
            success_function_name = globalFinish;

            g_index_directory_or_file = -1;
        }

        var error_function_name = globalExecFailed;

        util_files_data.setDataExecCaseCopyFile(origin_file_url, target_file_url, path_php_dir, success_function_name, error_function_name);

        UtilFiles.dirFileAnyCase(util_files_data);
       
    } // copyFilesRecursive

    // TODO Implement delete files defined by UtilCopyArrayData.getBoolDeleteOriginFileArray

    // All files have been copied
    static finish()
    {
        UtilCopyArray.debug("finish", "Enter");

        alert("UtilCopyArray.finish All files have been copied");

    } // finish

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

// Index for directory or file
var g_index_directory_or_file = -1;

function globalCheckIfTargetDirExists()
{
    UtilCopyArray.checkIfTargetDirExists();
}

// 
function globalCreateTargetDir()
{
    UtilCopyArray.createTargetDir();
}

function globatGetExistingDirsRecursive()
{
    UtilCopyArray.getExistingDirsRecursive();

} // globatGetExistingDirsRecursive


function globatDirExists()
{
    UtilCopyArray.dirExists();

} // globatDirExists

function globatDirExistsNot()
{
    UtilCopyArray.dirExistsNot();

} // globatDirExistsNot

// Global function corresponding to UtilCopyArray.createDirsRecursive
function globatCreateDirsRecursive()
{
    UtilCopyArray.createDirsRecursive();
    
} // globatCreateDirsRecursive

// Global function corresponding to UtilCopyArray.copyFilesRecursive
function globatCopyFilesRecursive()
{
    UtilCopyArray.copyFilesRecursive();

} // globatCopyFilesRecursive

// Global function corresponding to UtilCopyArray.globalFinish
function globalFinish()
{
    UtilCopyArray.finish();
    
} // globalFinish

// Global function corresponding to UtilCopyArray.globalExecFailed
function globalExecFailed()
{
    UtilCopyArray.execFailed();
    
} // globalExecFailed

//////////////////////////////////////////////////////////////////////////////////////////
/////////////////////// UtilCopyArray End ////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////