// File: ReservationNewLayout.js
// Date: 2025-06-03
// Author: Gunnar Lidén

// Inhalt
// =============
//
// Main functions for the application reservation new layout

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Global Parameters /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Main directory 
var g_layout_main_dir_text_box = null;

// Result directory where the generated HTML files and other files shall be stored
var g_layout_server_dir_text_box = null;

// Name of the layout XML file
var g_xml_filename_text_box = null;

// Progress messages textbox
var g_progress_messages_text_box = null;

// Button for the creation of the layout files
var g_create_layout_files_button = null;

// Button upload layout XML file
var g_upload_xml_button = null;

// Button download layout XML file
var g_download_xml_button = null;

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Main Functions ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Initialization
// 1. If local storage not is set (after delete browser cache) set empty strings
//    Call of NewSeasonStorage.initLocal
// 2. Create the controls for this application
//    Call of createReservationNewSeasonControls
// 3. Set the controls with data from local storage
//    Call of NewSeasonStorage.getLocal and setNewSeasonControls
function initReservationNewLayout()
{
    debugReservationNewLayout('initReservationNewLayout Enter');

    NewSeasonStorage.initLocal();

    createReservationNewLayoutControls();

    new_season_data = NewSeasonStorage.getLocal();

    setNewLayoutControls(new_season_data);

} // initReservationNewLayout

// Set the controls
function setNewLayoutControls(i_new_season_data)
{
    g_layout_main_dir_text_box.setValue(i_new_season_data.getMainDir());  

    g_layout_server_dir_text_box.setValue(i_new_season_data.getResultDir()); 

    g_xml_filename_text_box.setValue(i_new_season_data.getResultDir() + '.xml'); 

} // setNewLayoutControls

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Main Functions //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Event Functions ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// User clicked the create layout files button
function onClickCreateLayoutFilesButton()
{

	alert("Enter onClickCreateLayoutFilesButton");

}// onClickCreateLayoutFilesButton

// User clicked the upload layout XML file button
function onClickUploadXmlFileButton()
{

	alert("Enter onClickUploadXmlFileButton");

}// onClickUploadXmlFileButton

// User clicked the download layout XML file button
function onClickDownloadXmlFileButton()
{

	alert("Enter onClickDownloadXmlFileButton");

}// onClickDownloadXmlFileButton

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Event Functions /////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Create Controls ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Creates all the controls for the application
function createReservationNewLayoutControls()
{
    createTextBoxMainDirectory();

    createTextBoxResultDirectory();

    createTextBoxXmlFilename();

    createTextBoxProgressMessages();

    createLayoutFileslButton();

    createUploadXmlButton();

    createDownloadXmlButton();

} // createReservationNewSeasonControls

// Create the text box for the test or relase directory
function createTextBoxMainDirectory()
{
    g_layout_main_dir_text_box = new JazzTextBox("id_season_main_dir", 'id_div_season_main_dir');

    g_layout_main_dir_text_box.setLabelText("ReservationLayout / Reservation");

    g_layout_main_dir_text_box.setLabelTextPositionAbove();

    g_layout_main_dir_text_box.setSize("32");

    g_layout_main_dir_text_box.setReadOnlyFlag(false);

    g_layout_main_dir_text_box.setTitle("Für Release Ordner Reservation eingeben");

} // createTextBoxMainDirectory

// Create the text box for the result server directory where generated files shall be stored
function createTextBoxResultDirectory()
{
    g_layout_server_dir_text_box = new JazzTextBox("id_season_result_dir", 'id_div_season_result_dir');

    g_layout_server_dir_text_box.setLabelText("Ordner für Konzertsaal-Sitzplan");

    g_layout_server_dir_text_box.setLabelTextPositionAbove();

    g_layout_server_dir_text_box.setSize("32");

    g_layout_server_dir_text_box.setReadOnlyFlag(false);

    g_layout_server_dir_text_box.setTitle("Name des Server Ordners für den neuen Konzertsaal.");

} // createTextBoxResultDirectory

// Create the text box for the name of the layout XML file
function createTextBoxXmlFilename()
{
    g_xml_filename_text_box = new JazzTextBox("id_upload_download_xml_textbox", 'id_div_upload_download_xml_textbox');

    g_xml_filename_text_box.setLabelText("Layout Datei ");

    g_xml_filename_text_box.setLabelTextPositionLeft();

    g_xml_filename_text_box.setSize("23");

    g_xml_filename_text_box.setReadOnlyFlag(true);

    g_xml_filename_text_box.setTitle("Zeigt der Name der Layout XML Datei");

    g_xml_filename_text_box.setClass('cl_upload_download_xml_textbox');

} // createTextBoxXmlFilename

// Create the text box for the progress messages
function createTextBoxProgressMessages()
{
    g_progress_messages_text_box = new JazzTextBox("id_message_row", 'id_div_message_row');

    g_progress_messages_text_box.setLabelText("");

    g_progress_messages_text_box.setLabelTextPositionAbove();

    g_progress_messages_text_box.setSize("32");

    g_progress_messages_text_box.setReadOnlyFlag(true);

    g_progress_messages_text_box.setTitle("Fortschrittsmeldungen");

    g_progress_messages_text_box.setPlaceholderText("Fortschrittsmeldungen");
	
	g_progress_messages_text_box.setClass('cl_progress_messages_textbox');

} // createTextBoxProgressMessages

// Creates the button that starts theb creation of the layout files
function createLayoutFileslButton()
{
    g_create_layout_files_button = new JazzButton('id_create_layout_files_button', 'id_div_create_layout_files_button');

    g_create_layout_files_button.setOnclickFunctionName("onClickCreateLayoutFilesButton");

    g_create_layout_files_button.setCaption('Dateien für das Layout generieren');

    g_create_layout_files_button.setLabelText("");

    g_create_layout_files_button.setWidth("250px");

    g_create_layout_files_button.setTitle('Alle Dateien für das neue Layout generieren');

} // createLayoutFileslButton

// Creates the upload layout XML file button
function createUploadXmlButton()
{
    g_upload_xml_button = new JazzButton('id_upload_xml_button', 'id_div_upload_xml_button');

    g_upload_xml_button.setOnclickFunctionName("onClickUploadXmlFileButton");

    g_upload_xml_button.setCaption('Upload');

    g_upload_xml_button.setLabelText("");

    g_upload_xml_button.setWidth("76px");

    g_upload_xml_button.setTitle('Layout XML Datei hochladen');

} // createUploadXmlButton

// Creates the download layout XML file button
function createDownloadXmlButton()
{
    g_download_xml_button = new JazzButton('id_download_xml_button', 'id_div_download_xml_button');

    g_download_xml_button.setOnclickFunctionName("onClickDownloadXmlFileButton");

    g_download_xml_button.setCaption('Download');

    g_download_xml_button.setLabelText("");

    g_download_xml_button.setWidth("76px");

    g_download_xml_button.setTitle('Layout XML Datei herunterladen');

} // createDownloadXmlButton


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Create Controls /////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Debug Function ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Displays the input string in the debugger Console
function debugReservationNewLayout(i_msg_str)
{
    console.log(i_msg_str);

    UtilServer.appendDebugFile(i_msg_str, 'ReservationNewSeason');

} // debugReservationNewLayout

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Debug Function //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

