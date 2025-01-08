// File: ReservationLayout.js
// Date: 2025-01-07
// Author: Gunnar Lidén

// Inhalt
// =============
//
// Main functions for the application reservation layout

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Global Parameters /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// XML object layout
var g_layout_xml = null;

// An instance of the class CheckInputCreateDirs (global needed for its event member functions)
var g_check_input_create_dirs = null;

// All the tabulators, end of lines and code comments can be removed with this variable
var g_remove_tabs_comments = false;

// In order to be able to test the created HTML files some functions are added
var g_add_temporary_test_functions = false;

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Global Parameters ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Main Functions ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Initialisation for the creation of all the HTML files making up the reservation system
// 1. Init local storage. Call of LayoutStorage.initLocal
// 2. Create all the controls for this application
//    Call of createReservationLayoutControls
// 3. Get organisation and result directory names from local storage
//    Call of LayoutStorage.getLocal
// 4. Set text box controls for the directory names
//    Calls of JazzTextBox.setValue
// 5. Check that the organisation, result directory and layout definition XML file exist
//    If directories or files exist the function directoriesXmlFileExist is called
//    If not existing (or other failure) errorDirectoriesXmlFile is called
// 5. Create object ReservationLayoutXml that loads the XML layout definition file
//    After a succesful loading the function callbackAfterLoadOfXmlLayout is called
function initReservationLayout()
{
    debugReservationLayout('initReservationLayout Enter');

    LayoutStorage.initLocal();
 
    createReservationLayoutControls();

    var layout_files_data_from_storage = LayoutStorage.getLocal();

   
    var organisation_directory_name =  layout_files_data_from_storage.getOrganisationDir();            // 'JAZZ_live_AARAU';

    var result_server_directory_name = layout_files_data_from_storage.getResultDir();          // 'Spagi_76_Chairs_V_2';

    g_layout_organisation_dir_text_box.setValue(organisation_directory_name);

    g_layout_server_dir_text_box.setValue(result_server_directory_name);

} // initReservationLayout

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Main Functions //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Check Create Directories //////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Class checking that reservation layout directories exist. If not existing they will be
// created after approval of the user
class CheckInputCreateDirs
{
    constructor()
    {
        this.m_global_variable = null;

        this.m_layout_files_data = null;

        this.m_callback_success = null;

        this.m_callback_failure = null;

        this.m_relative_path_php_dir = 'Php/';
    }

    // Set, check and create directories if needed
    // 1. Set member variables
    // 2. Check and create directories if needed
    //    Call of CheckInputCreateDirs.checkCreate
    set(i_global_variable, i_layout_files_data, i_callback_success, i_callback_failure)
    {
        debugReservationLayout('CheckInputCreateDirs.set Enter');

        this.m_global_variable = i_global_variable;

        this.m_layout_files_data = i_layout_files_data;

        this.m_callback_success = i_callback_success;

        this.m_callback_failure = i_callback_failure;

        this.checkCreate();

    } // set

    // Check and create directories if needed
    // 1. Check all member variables
    //    For non valid data call CheckInputCreateDirs.m_callback_failure
    // 2. Check and create organisation directory if necessary
    //    Call of CheckInputCreateDirs.checkCreateOrganisationDir
    checkCreate()
    {
        debugReservationLayout('CheckInputCreateDirs.checkCreate Enter');

        if (null == this.m_callback_failure || this.m_callback_failure.length == 0)
        {
            alert("CheckInputCreateDirs.check Callback error function not defined");

            return;
        }

        if (null == this.m_layout_files_data)
        {
            alert("CheckInputCreateDirs.check Input object LayoutFilesData is null");

            this.m_callback_failure(null); // = this.m_layout_files_data)

            return; // Do not continue checking
        }

        if (this.m_layout_files_data.getOrganisationDir().length == 0)
        {
            alert("CheckInputCreateDirs.check Organisation directory is not defined");

            this.m_callback_failure(this.m_layout_files_data); 

            return; // Do not continue checking
        }

        if (this.m_layout_files_data.getResultDir().length == 0)
        {
            alert("CheckInputCreateDirs.check Result directory is not defined");

            this.m_callback_failure(this.m_layout_files_data); 

            return; // Do not continue checking
        }        
        
        if (null == this.m_callback_success)
        {
            alert("CheckInputCreateDirs.check Callback success function not defined");

            this.m_callback_failure(this.m_layout_files_data); 

            return; // Do not continue checking
        }

        if (null == this.m_global_variable)
        {
            alert("CheckInputCreateDirs.check Global variable name string is not defined");

            this.m_callback_failure(this.m_layout_files_data); 

            return; // Do not continue checking
        }

        this.checkCreateOrganisationDir();

    } // check

    // Check and create organisation directory if necessary
    // 1. Instantiate UtilFilesData and set organisation directory name
    //    Call of UtilFilesData.setDataExecCaseDirExists 
    // 2. Determine if organisation directory exists
    //    Call of UtilFiles.dirFileAnyCase
    checkCreateOrganisationDir()
    {
        debugReservationLayout('CheckInputCreateDirs.checkCreateOrganisationDir Enter');

        var util_files_data = new UtilFilesData();

        var input_dir_name = this.m_layout_files_data.getOrganisationDir();

        // Parantheses necessary for the callback functions
        util_files_data.setDataExecCaseDirExists(input_dir_name, this.m_relative_path_php_dir, 
                this.m_global_variable.checkCreateResultDir, this.m_global_variable.createOrganisationDir);

        UtilFiles.dirFileAnyCase(util_files_data);

    } // checkCreateOrganisationDir

    // Create the organisation directory 
    // 1. Ask the user if he approves
    // 2. Instantiate UtilFilesData and set organisation directory name
    //    Call of UtilFilesData.setDataExecCaseCreateDir 
    // 3. Create the organisation directory
    //    Call of UtilFiles.dirFileAnyCase
    createOrganisationDir()
    {
        debugReservationLayout('CheckInputCreateDirs.createOrganisationDir Enter');

        var input_dir_name = this.m_layout_files_data.getOrganisationDir();

        var confirm_text = "Neuer Ordner " + input_dir_name + ' kreiren?';

        if (confirm(confirm_text) == false) 
        {
            this.m_callback_failure(this.m_layout_files_data);
        }

        var util_files_data = new UtilFilesData();

        var input_dir_name = this.m_layout_files_data.getOrganisationDir();

        // Parantheses necessary for the callback functions
        util_files_data.setDataExecCaseCreateDir(input_dir_name, this.m_relative_path_php_dir, 
                this.m_global_variable.checkCreateResultDir(), this.m_global_variable.m_callback_failure());

        UtilFiles.dirFileAnyCase(util_files_data);
 
    } // createOrganisationDir

    checkCreateResultDir()
    {
        debugReservationLayout('CheckInputCreateDirs.checkCreateResultDir Enter');

        alert("checkCreateResultDir Enter");

    } // checkCreateResultDir

} // CheckInputCreateDirs



///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Check Create Directories ////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Create HTML files Functions ///////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Create and upload layout files to the result server directory
// 1. Get the input data and create directories if missing
//    Call of getInputDataCreateFiles. This function has a callback /success) function
//    with an instance of LayoutFilesInput as parameter
function createUploadLayoutFiles()
{
    debugReservationLayout('createUploadLayoutFiles Enter');

    getInputDataCreateFiles();

} // createUploadLayoutFiles

// Returns an 
function getInputDataCreateFiles()
{
    var organisaion_directory_name = g_layout_organisation_dir_text_box.getValue();

    var result_server_directory_name = g_layout_server_dir_text_box.getValue();

    var layout_files_data = new LayoutFilesData();

    layout_files_data.setOrganisationDir(organisaion_directory_name);

    layout_files_data.setResultDir(result_server_directory_name);

    g_check_input_create_dirs = new CheckInputCreateDirs();

    g_check_input_create_dirs.set(g_check_input_create_dirs, layout_files_data, directoriesExist, errorDirectoriesMissing);

}

// Callback function after checking if directories exist
function directoriesExist(i_layout_files_data)
{
    debugReservationLayout('errorDirectoriesXmlFile Enter');

    var organisation_directory_name = i_layout_files_data.getOrganisationDir();

    var result_server_directory_name = i_layout_files_data.getResultDir();
    
    g_layout_xml = new ReservationLayoutXml(callbackAfterLoadOfXmlLayout, organisation_directory_name, result_server_directory_name);

} // directoriesXmlFileExist

function callbackAfterLoadOfXmlLayout()
{
    debugReservationLayout('callbackAfterLoadOfXmlLayout Enter');

    createUploadLayoutFilesAfterCheck();

} // callbackAfterLoadOfXmlLayout

// Callback if directories are missing or other failure
function errorDirectoriesMissing(i_layout_files_data)
{
    debugReservationLayout('errorDirectoriesMissing Enter');

} // errorDirectoriesMissing

// Create and upload layout files to the result server directory
function createUploadLayoutFilesAfterCheck()
{
    debugReservationLayout('createUploadLayoutFilesAfterCheck Enter');

    var organisaion_directory_name = g_layout_organisation_dir_text_box.getValue();

    var result_server_directory_name = g_layout_server_dir_text_box.getValue();

    //QQ var reservation_layout_full_path = 'https://jazzliveaarau.ch/ReservationLayout/'; 

    var absolute_path_dir_name = constructPathToResultDirectory(result_server_directory_name);

    var layout_file_data_array = getLayoutFileDataArrayFromXml(g_layout_xml);

    var n_layout_file_data = layout_file_data_array.length;

    //n_layout_file_data = 1; // QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ Temporary

    var path_file_name_array = [];

    var layout_html_code_array = [];

    for (var layout_file_number=1; layout_file_number <= n_layout_file_data; layout_file_number++)
    {
        var file_data = getLayoutFileDataFromXml(g_layout_xml, layout_file_number);

        var layout_file_case = file_data.getFileCase();

        var layout_file_description = file_data.getDescription();

        // var n_button_ids = file_data.getNumberButtonId();

        var button_id_array = file_data.getButtonIdArray();

        var layout_html = new LayoutHtml(g_layout_xml, result_server_directory_name, layout_file_case, layout_file_description, button_id_array);

        var layout_html_code = layout_html.get();

        var html_file_name = file_data.getHtmlName();

        var path_file_name = absolute_path_dir_name + html_file_name;

        var index_data = layout_file_number - 1;

        path_file_name_array[index_data] = path_file_name;

        layout_html_code_array[index_data] = layout_html_code;

    } // index_file_data

   var g_create_html_file_index = -1;
   g_path_file_name_array = path_file_name_array;
   g_layout_html_code_array = layout_html_code_array; 

    // Previously test UtilServer.saveFileCallback(path_file_name_array[3], layout_html_code_array[3], afterSaveHtml);

    recursiveFileCreation();

} // createUploadLayoutFilesAfterCheck

// Returns the full path to the result directory
function constructPathToResultDirectory(i_result_server_directory_name)
{
    // TODO Organistaion directory

    var reservation_layout_full_path = 'https://jazzliveaarau.ch/ReservationLayout/'; 

    return reservation_layout_full_path + i_result_server_directory_name  + '/';

} // constructPathToResultDirectory

// Loop index HTML file
var g_create_html_file_index = -1;
var g_path_file_name_array = [];
var g_layout_html_code_array = []; 

// Recursively create all HTML files
function recursiveFileCreation()
{
    var n_files = g_path_file_name_array.length;

    g_create_html_file_index = g_create_html_file_index + 1;

    // The HTML file has to exist. If not the file is not writable. 
    // This is checked by UtilServerSaveFile.php.
    // Solution remove check or copy start HTML file TODO

    if (g_create_html_file_index < n_files - 1)
    {
        UtilFiles.saveFileCallback(g_path_file_name_array[g_create_html_file_index], g_layout_html_code_array[g_create_html_file_index], recursiveFileCreation);
    }
    else
    {
        UtilFiles.saveFileCallback(g_path_file_name_array[g_create_html_file_index], g_layout_html_code_array[g_create_html_file_index], afterSaveAllHtml);
    }

} // recursiveFileCreation

// After saving all the HTML files
function afterSaveAllHtml()
{
    var result_server_directory_name = g_layout_server_dir_text_box.getValue();

    var uploaded_msg = 'HTML Dateien sind kreiert und zum Server Ordner ' + 
                        result_server_directory_name + ' hochgeladen';

    debugReservationLayout('afterSaveAllHtml ' + uploaded_msg);

    alert(uploaded_msg);

} // afterSaveAllHtml

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Create HTML files Functions /////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Event Functions ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////


// User clicked the layout save button
function onClickOfLayoutSaveButton()
{
	createUploadLayoutFiles();

}// onClickOfLayoutSaveButton

// User clicked the layout cancel button
function onClickOfLayoutCancelButton()
{
	alert("onClickOfLayoutCancelButton");

}// onClickOfLayoutCancelButton

// User clicked the layout test button
function onClickOfLayoutTestButton()
{
	testLayout();

}// onClickOfLayoutTestButton

// User clicked the create new event XML files button
function onClickOfXmlCreateNewButton()
{
	createNewXmlEventFiles();

}// onClickOfXmlCreateNewButton

// User clicked the import event XML files button
function onClickOfXmlImportButton()
{
	importXmlEvents();

}// onClickOfXmlImportButton

// User clicked the layout premises size button
function onClickOfLayoutPremisesSizeButton()
{
	alert("onClickOfLayoutPremisesSizeButton");

}// onClickOfLayoutPremisesSizeButton

// User clicked the layout stage definition button
function onClickOfLayoutStageDefinitionButton()
{
	alert("onClickOfLayoutStageDefinitionButton");

}// onClickOfLayoutStageDefinitionButton

// User clicked the layout table color button
function onClickOfLayoutTableColorButton()
{
	alert("onClickOfLayoutTableColorButton");

}// onClickOfLayoutTableColorButton

// User clicked the layout cashier desk button
function onClickOfCashierDeskButton()
{
	alert("onClickOfCashierDeskButton");

}// onClickOfCashierDeskButton

// User selected a rectangular table
function eventSelectRectangularTableDropdown()
{
    var selected_concert_option_number = g_rectangular_table_dropdown.getSelectOptionNumber();

    var b_append = g_rectangular_table_dropdown.selectedOptionNumberIsAppendItem(selected_concert_option_number);

    if (b_append)
    {
        // g_record_active_guest.setBand("");
    }
    else
    {
        // var band_name_array = g_season_xml.getBandNameArray();

        var index_band = parseInt(selected_concert_option_number) - 1;

        // g_record_active_guest.setBand(band_name_array[index_band]);
    }

    // setAdminControls();

} // eventSelectRectangularTableDropdown

// User selected a round table
function eventSelectRoundTableDropdown()
{
    var selected_concert_option_number = g_round_table_dropdown.getSelectOptionNumber();

    var b_append = g_round_table_dropdown.selectedOptionNumberIsAppendItem(selected_concert_option_number);

    if (b_append)
    {
        // g_record_active_guest.setBand("");
    }
    else
    {
        // var band_name_array = g_season_xml.getBandNameArray();

        var index_band = parseInt(selected_concert_option_number) - 1;

        // g_record_active_guest.setBand(band_name_array[index_band]);
    }

    // setAdminControls();

} // eventSelectRoundTableDropdown

// User selected a premises door
function eventSelectPremisesDoorDropdown()
{
    var selected_concert_option_number = g_premises_door_dropdown.getSelectOptionNumber();

    var b_append = g_premises_door_dropdown.selectedOptionNumberIsAppendItem(selected_concert_option_number);

    if (b_append)
    {
        // g_record_active_guest.setBand("");
    }
    else
    {
        // var band_name_array = g_season_xml.getBandNameArray();

        var index_band = parseInt(selected_concert_option_number) - 1;

        // g_record_active_guest.setBand(band_name_array[index_band]);
    }

    // setAdminControls();

} // eventSelectPremisesDoorDropdown

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Event Functions /////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Get Html Elements And Identities //////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Returns the div element gallery
function getElementDivResult()
{
    return document.getElementById(getIdDivResult());

} // getElementDivGallery

// Returns the div identity gallery
function getIdDivResult()
{
    return 'id_div_layout_result';

} // getIdDivGallery


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Get Html Elements And Identities ////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Test Function /////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Test function
function testLayout()
{
    debugReservationLayout('testLayout Enter');

    var dir_name = '../TestDir_1/SubTestDir_1/';

    var dir_name_out = '../TestDir_2/';

    var file_name = '../TestDir_1/SubTestDir_1/TestFile_1.txt';

    var file_name_out = '../TestDir_2/TestFile_2.txt';

    var file_content = '';

    for (var row_number = 1; row_number <= 30; row_number++)
    {
        file_content += 'Der Alpdruck. Roman. Aufbau, Berlin 2014,  Seite 238. Erstveröffentlichung 1947. Row ' 
                        + row_number.toString() + '\n';
    }

    var rel_path_php_dir = 'Php/'

    var util_files_data = new UtilFilesData();

    //util_files_data.setDataExecCaseDirExists(dir_name, rel_path_php_dir, testTrue, testFalse);

    // util_files_data.setDataExecCaseCreateDir(dir_name, rel_path_php_dir, testTrue, testFalse);

    //util_files_data.setDataExecCaseDeleteDir(dir_name, rel_path_php_dir, testTrue, testFalse);

    util_files_data.setDataExecCaseCreateFile(file_name, file_content, rel_path_php_dir, testTrue, testFalse);

    // util_files_data.setDataExecCaseDeleteFile(file_name, rel_path_php_dir, testTrue, testFalse);

    // util_files_data.setDataExecCaseCreateDir(dir_name_out, rel_path_php_dir, testTrue, testFalse);

    // util_files_data.setDataExecCaseCopyFile(file_name, file_name_out, rel_path_php_dir, testTrue, testFalse);

    util_files_data.setDataExecCaseMoveFile(file_name, file_name_out, rel_path_php_dir, testTrue, testFalse);

    UtilFiles.dirFileAnyCase(util_files_data);

} // testLayout

function testTrue()
{
    debugReservationLayout('testTrue Enter');

    alert("testTrue");
}

function testFalse()
{
    debugReservationLayout('testFalse Enter');

    alert("testFalse");
    
} // testFalse

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Test Function ///////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Debug Function ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Displays the input string in the debugger Console
function debugReservationLayout(i_msg_str)
{
    console.log(i_msg_str);

    UtilServer.appendDebugFile(i_msg_str, 'ReservationLayout');

} // debugReservationLayout

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Debug Function //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////