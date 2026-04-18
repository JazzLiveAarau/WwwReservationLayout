// File: EventProgram.js
// Date: 2026-04-18
// Author: Gunnar Lidén

// Inhalt
// =============
// Main functions for the application event program

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Global Parameters /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Help button
var g_help_event_program_button = null;

// IT info button
var g_it_info_event_program_button = null;

// Main developmen/release directory 
var g_event_program_main_dir_text_box = null;

// Result directory where the generated HTML files and other files shall be stored
var g_event_program_result_dir_text_box = null;

// The name of the event program XML file name
var g_event_program_xml_filename = 'EventProgram.xml';

// Textbox for the event program XML file name
var g_xml_event_program_filename_text_box = null;

// Button for uploading the event program XML file
var g_upload_event_program_button = null;

// Button for downloading the event program XML file
var g_download_event_program_button = null;

// Button for deleting the event program XML file
var g_delete_event_program_button = null;

// Button for editing the event program XML file
var g_edit_event_program_button = null;

// Dropdown for selecting an event
var g_drop_down_event_program = null;

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Global Parameters ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Main Functions ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Initialization
// 1. If local storage not is set (after delete browser cache) set empty strings
//    Call of NewSeasonStorage.initLocal
// 2. Create the controls for this application
//    Call of createEventProgramControls
// 3. Set the controls with data from local storage
//    Call of NewSeasonStorage.getLocal and setNewSeasonControls
function initEventProgram()
{
    debugEventProgram('initEventProgram Enter');

    NewSeasonStorage.initLocal();

    createEventProgramControls();

    new_season_data = NewSeasonStorage.getLocal();

    setEventProgramControls(new_season_data);

    // g_new_season_files_data = null;

} // initEventProgram

// Set the controls with data from local storage
function setEventProgramControls(i_new_season_data)
{
    debugEventProgram('setEventProgramControls Enter');

} // setEventProgramControls

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Main Functions //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Event Functions ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// User clicked the help button
function onClickHelpEventProgramButton()
{
    // TODO Change URL

    var help_url = 'https://jazzliveaarau.ch/Tasks/Documents/A0069.pdf';

    window.open(help_url,'_blank').focus();

} // onClickHelpEventProgramButton

// User clicked the IT info button
function onClickItInfoEventProgramButton()
{
    // TODO Change URL

    var it_info_url = 'https://jazzliveaarau.ch/Tasks/Documents/A0182.pdf';

    window.open(it_info_url,'_blank').focus();

} // onClickItInfoEventProgramButton

// User clicked the upload event program XML button
function onClickUploadEventProgramButton()
{
   debugEventProgram('onClickUploadEventProgramButton Enter'); 

} // onClickUploadEventProgramButton

// User clicked the download event program XML button
function onClickDownloadEventProgramButton()
{
    debugEventProgram('onClickDownloadEventProgramButton Enter'); 

} // onClickDownloadEventProgramButton

// User clicked the delete event button
function onClickDeleteEventButton()
{
    debugEventProgram('onClickDeleteEventButton Enter');

} // onClickDeleteEventButton

// User clicked the edit event button
function onClickEditEventButton()
{
    debugEventProgram('onClickEditEventButton Enter');

} // onClickEditEventButton

// User selected an event in the event dropdown
function eventSelectEventDropDown()
{
    debugEventProgram('eventSelectEventDropDown Enter');

} // eventSelectEventDropDown

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Event Functions /////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Create Controls ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Create the controls for this application
function createEventProgramControls()
{
    debugEventProgram('createEventProgramControls Enter');

    createHelpEventProgramButton();

    createItInfoEventProgramButton();

    createTextBoxMainDirectory();

    createTextBoxResultDirectory();

    createTextBoxXmlEventProgramFilename();

    createUploadEventProgramButton();

    createDownloadEventProgramButton();

    createDeleteEventButton();

    createEditEventButton();

    createEventProgramDropdown();

} // createEventProgramControls

// Creates the help button 
function createHelpEventProgramButton()
{
    g_help_event_program_button = new JazzButton('id_help_button', 'id_div_help_button');

    g_help_event_program_button.setOnclickFunctionName("onClickHelpButton");

    g_help_event_program_button.setCaption('Hilfe');

    g_help_event_program_button.setLabelText("");

    g_help_event_program_button.setWidth("60px");

    g_help_event_program_button.setClass("cl_help_button");

    g_help_event_program_button.setTitle('Hilfe zum Eventprogramm');

} // createHelpEventProgramButton

// Creates the IT info button 
function createItInfoEventProgramButton()
{
    g_it_info_event_program_button = new JazzButton('id_it_info_button', 'id_div_it_info_button');

    g_it_info_event_program_button.setOnclickFunctionName("onClickItInfoEventProgramButton");

    g_it_info_event_program_button.setCaption('IT Info');

    g_it_info_event_program_button.setLabelText("");

    g_it_info_event_program_button.setWidth("60px");

    g_it_info_event_program_button.setClass("cl_help_button");

    g_it_info_event_program_button.setTitle('Web Applikation Eventprogramm - Informationen für IT');

} // createItInfoEventProgramButton

// Create the text box for the main developmnet/release directory
function createTextBoxMainDirectory()
{
    g_event_program_main_dir_text_box = new JazzTextBox("id_event_program_main_dir", 'id_div_event_program_main_dir');

    g_event_program_main_dir_text_box.setLabelText("ReservationLayout / Reservation");

    g_event_program_main_dir_text_box.setLabelTextPositionAbove();

    g_event_program_main_dir_text_box.setSize("30");

    g_event_program_main_dir_text_box.setReadOnlyFlag(false);

    g_event_program_main_dir_text_box.setTitle("Für Release Ordner Reservation eingeben");

} // createTextBoxMainDirectory

// Create the text box for the result server directory where generated files shall be stored
function createTextBoxResultDirectory()
{
    g_event_program_result_dir_text_box = new JazzTextBox("id_event_program_result_dir", 'id_div_event_program_result_dir');

    g_event_program_result_dir_text_box.setLabelText("Ordner für Konzertsaal-Sitzplan");

    g_event_program_result_dir_text_box.setLabelTextPositionAbove();

    g_event_program_result_dir_text_box.setSize("30");

    g_event_program_result_dir_text_box.setReadOnlyFlag(false);

    g_event_program_result_dir_text_box.setTitle("Name des Server Ordners für den neuen Konzertsaal.");

} // createTextBoxResultDirectory

// Create the text box for the name of the layout XML file
function createTextBoxXmlEventProgramFilename()
{
    g_xml_event_program_filename_text_box = new JazzTextBox("id_event_program_upload_xml_textbox", 'id_div_event_program_upload_xml_textbox');

    g_xml_event_program_filename_text_box.setLabelText("Event Programm XML Dateiname");

    g_xml_event_program_filename_text_box.setLabelTextPositionAbove();

    g_xml_event_program_filename_text_box.setSize("33");

    g_xml_event_program_filename_text_box.setReadOnlyFlag(true);

    g_xml_event_program_filename_text_box.setTitle("Zeigt der Name der Event Programm XML Datei");

} // createTextBoxXmlEventProgramFilename

// Creates the upload XML button 
function createUploadEventProgramButton()
{
    g_upload_event_program_button = new JazzButton('id_event_program_upload_xml_button', 'id_div_event_program_upload_xml_button');

    g_upload_event_program_button.setOnclickFunctionName("onClickUploadEventProgramButton");

    g_upload_event_program_button.setCaption('2. Upload');

    g_upload_event_program_button.setLabelText("");

    g_upload_event_program_button.setWidth("80px");

    g_upload_event_program_button.setClass("cl_event_program_button");

    g_upload_event_program_button.setTitle('Schritt 2: Event Programm XML Datei hochladen (optional)');

} // createUploadEventProgramButton

// Creates the download XML button 
function createDownloadEventProgramButton()
{
    g_download_event_program_button = new JazzButton('id_event_program_download_xml_button', 'id_div_event_program_download_xml_button');

    g_download_event_program_button.setOnclickFunctionName("onClickDownloadEventProgramButton");

    g_download_event_program_button.setCaption('Download');

    g_download_event_program_button.setLabelText("");

    g_download_event_program_button.setWidth("80px");

    g_download_event_program_button.setTitle('Event Programm XML Datei herunterladen');

    g_download_event_program_button.setClass("cl_event_program_button");

} // createDownloadEventProgramButton

// Creates the event program dropdown control
function createEventProgramDropdown()
{
    g_drop_down_event_program = new JazzDropdown('id_event_program_select_dropdown', 'id_div_event_program_select_dropdown');

    // TODO Get event 
    var event_array = [];

	event_array[0] = 'Event 1';
	event_array[1] = 'Event 2';

    g_drop_down_event_program.setNameArray(event_array);

    g_drop_down_event_program.setOnchangeFunctionName("eventSelectEventDropDown");

    g_drop_down_event_program.setLabelText('3. Event wählen ');

    g_drop_down_event_program.setLabelTextPositionLeft();

    g_drop_down_event_program.setTitle('Event wählen');

} // createEventProgramDropdown

// Creates the delete event XML button 
function createDeleteEventButton()
{
    g_delete_event_program_button = new JazzButton('id_select_delete_button', 'id_div_select_delete_button');

    g_delete_event_program_button.setOnclickFunctionName("onClickDeleteEventButton");

    g_delete_event_program_button.setCaption('Löschen');

    g_delete_event_program_button.setLabelText("");

    g_delete_event_program_button.setWidth("80px");

    g_delete_event_program_button.setTitle('Event löschen');

    g_delete_event_program_button.setClass("cl_event_program_button");

} // createDeleteEventButton

// Creates the edit event XML button 
function createEditEventButton()
{
    g_edit_event_program_button = new JazzButton('id_select_edit_button', 'id_div_select_edit_button');

    g_edit_event_program_button.setOnclickFunctionName("onClickEditEventButton");

    g_edit_event_program_button.setCaption('Bearbeiten');

    g_edit_event_program_button.setLabelText("");

    g_edit_event_program_button.setWidth("80px");

    g_edit_event_program_button.setTitle('Event bearbeiten');

    g_edit_event_program_button.setClass("cl_event_program_button");

} // createEditEventButton

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Create Controls /////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Debug Function ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Displays the input string in the debugger Console
function debugEventProgram(i_msg_str)
{
    console.log(i_msg_str);

    UtilServer.appendDebugFile(i_msg_str, 'EventProgram');

} // debugEventProgram

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Debug Function //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////