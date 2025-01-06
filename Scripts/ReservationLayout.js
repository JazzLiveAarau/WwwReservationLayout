// File: ReservationLayout.js
// Date: 2025-01-06
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
// 1. Create all the controls for this application
//    Call of createReservationLayoutControls
// 2. Get the last used name of the subdirectory where the output HTML will be saved
//    Call of TODO
// 3.  objects JazzGuests.xml and JazzGuestsUploaded.xml. 
//    Call of loadAllXmlObjectsForAdminAndUpload
// 2. Create the UtilLock object. The functions of this call is used to lock and unlock
//    the files JazzGuests.xml and JazzGuestsUploaded.xml.
function initReservationLayout()
{
    debugReservationLayout('initReservationLayout Enter');

    LayoutStorage.initLocal();
 
    createReservationLayoutControls();

    // TODO From local storage
    var organisation_directory_name = 'JAZZ_live_AARAU';

    var result_server_directory_name = 'Spagi_76_Chairs_V_1';

    g_layout_server_dir_text_box.setValue(result_server_directory_name);

    g_layout_xml = new ReservationLayoutXml(callbackAfterLoadOfXmlLayout, organisation_directory_name, result_server_directory_name);

    //TODO initAdminControls();

    //TODO setAdminControls();

} // initReservationLayout

function callbackAfterLoadOfXmlLayout()
{
    debugReservationLayout('callbackAfterLoadOfXmlLayout Enter');

    /*
    var layout_file_data_array = getLayoutFileDataArrayFromXml(g_layout_xml);
    var file_case = g_layout_xml.getLayoutFileCase(4);
    // g_layout_xml.setLayoutFileCase("NewFileName.htm", 4);
    var layout_file_number = 3;  var button_id_number = 3;
    var button_id = g_layout_xml.getLayoutFileButtonId(layout_file_number, button_id_number);
    var n_id_buttons = g_layout_xml.getNumberOfLayoutFileIdButtons(layout_file_number);
    //g_layout_xml.setLayoutFileButtonId("id_test_button", layout_file_number, button_id_number);
    //g_layout_xml.setButtonTitle(1, "Default tooltip (HTML title)");

    //g_layout_xml.setDoorText(2, "New door text");
    */

} // callbackAfterLoadOfXmlLayout


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Main Functions //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Create HTML files Functions ///////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Create and upload layout files to the result server directory
function createUploadLayoutFiles()
{
    debugReservationLayout('createUploadLayoutFiles Enter');

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

} // createUploadLayoutFiles

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