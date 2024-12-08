// File: ReservationLayout.js
// Date: 2024-12-09
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
var g_add_temporary_test_functions = true;

// XML object defining events like for instance concerts
var g_event_program_xml = null;

// Class that creates an XML object corresponding to an XML file that holds 
// all reservations for one even, e.g. a concert
// Array of XML event objects (one for each concert, e.g. a concert). The objects
// hold the reservation data, i.e. name, email, table/row, seat charcter/number and seat name
var g_event_xml_array = [];

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Global Parameters ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Main Functions ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Initialisation for Guestbook Admin
// 1. Load objects JazzGuests.xml and JazzGuestsUploaded.xml. 
//    Call of loadAllXmlObjectsForAdminAndUpload
// 2. Create the UtilLock object. The functions of this call is used to lock and unlock
//    the files JazzGuests.xml and JazzGuestsUploaded.xml.
function initReservationLayout()
{
    debugReservationLayout('initReservationLayout Enter');
 
    createReservationLayoutControls();

    var result_server_directory_name = 'Spagi_76_Chairs_V_1';

    g_layout_server_dir_text_box.setValue(result_server_directory_name);

    g_layout_xml = new ReservationLayoutXml(callbackAfterLoadOfXmlLayout, result_server_directory_name);

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

    var reservation_layout_full_path = 'https://jazzliveaarau.ch/ReservationLayout/'; 

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

        var path_file_name = reservation_layout_full_path + result_server_directory_name + '/' + html_file_name;

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
        UtilServer.saveFileCallback(g_path_file_name_array[g_create_html_file_index], g_layout_html_code_array[g_create_html_file_index], recursiveFileCreation);
    }
    else
    {
        UtilServer.saveFileCallback(g_path_file_name_array[g_create_html_file_index], g_layout_html_code_array[g_create_html_file_index], afterSaveAllHtml);
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
///////////////////////// Start Create XML files Functions ///////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Create and upload event files to the result server directory
// 1. Create the event program object (load the XML file that define an event program)
//    Create object EventProgramXml and call function callbackAfterLoadingEventProgram
//    when the XML object has been created
function createNewXmlEventFiles()
{
    debugReservationLayout('createNewXmlEventFiles Enter');

    g_event_program_xml = null;

    var subdir_xml = "XmlTestData";

    var event_program_file_name = "EventProgramSample.xml";

    g_event_program_xml = new EventProgramXml(subdir_xml, event_program_file_name, callbackAfterLoadingEventProgram);

    // Test var subdir_xml = 'Spagi_76_Chairs_V_1/SaisonXML_Compare';
    // Test var name_add_str = 'Salmen';
    // Test loadOfXmlEvent(subdir_xml, name_add_str, callbackAfterloadOfAllXmlEvent)

} // createNewXmlEventFiles

function callbackAfterLoadingEventProgram()
{
    debugReservationLayout('callbackAfterLoadingEventProgram Enter');

    var event_name = g_event_program_xml.getEventName(3);

    alert("event_name= " + event_name);

} // callbackAfterLoadingEventProgram

var g_previous_xml_array = [];

var g_event_object_index = -12345;

function loadOfXmlEvent(i_subdir_xml, i_name_add_str, i_callback_funtion)
{
    g_event_object_index = g_event_object_index + 1;

    var subdir_xml = 'Spagi_76_Chairs_V_1/SaisonXML_Compare';

    var name_add_str = 'Salmen';

    var event_number = 4;

    var callback_function_name = callbackAfterloadOfAllXmlEvent;

    g_event_xml_array[g_event_object_index] = new ReservationEventXml(subdir_xml, name_add_str, event_number, callback_function_name);

} // loadOfXmlEvent


function callbackAfterloadOfAllXmlEvent()
{
    debugReservationLayout('callbackAfterloadOfAllXmlEvent Enter');




/*
    var event_name = g_event_xml_array[0].getEventName();

    var n_reservations = g_event_xml_array[0].getNumberOfReservations();

    var reservation_number =4;

    var reservation_email = g_event_xml_array[0].getEmail(reservation_number);

    var seat_number = 2;

    var table_number = g_event_xml_array[0].getTableNumber(reservation_number, seat_number);

    alert("Event name is " + event_name + 
        " n_reservations= " + n_reservations.toString() +
        " table_number= " + table_number.toString() +
        " reservation_email= " + reservation_email);

        var new_table_number = 88;

        g_event_xml_array[0].setTableNumber(new_table_number, reservation_number, seat_number);

        table_number = g_event_xml_array[0].getTableNumber(reservation_number, seat_number);

        alert("New table number was set.  new_table_number= " + new_table_number.toString() + 
            " Returned table_number= " + table_number.toString() );

        var new_reservation_email = "gunnar.liden@viewsoncad.ch";

        g_event_xml_array[0].setEmail(new_reservation_email, reservation_number);

        reservation_email = g_event_xml_array[0].getEmail(reservation_number);

        alert("New email  new_reservation_email= " + new_reservation_email + 
            " Returned new_reservation_email= " + new_reservation_email );
*/

} // callbackAfterloadOfAllXmlEvent

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Create XML files Functions /////////////////////////////////
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