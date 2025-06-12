// File: ReservationNewLayout.js
// Date: 2025-06-12
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

// The name of the layout XML file name
// The name is g_layout_server_dir_text_box + '.xml'
var g_layout_xml_filename = '';

// Server directory for the layout XML file
// e.g. /www/ReservationLayout/Spagi_90_Chairs_V_1/XML/
var g_layout_xml_server_dir = '';

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

// Button for copying layout directories and files
var g_copy_dir_files_button = null;

// The object of class ControUploadFile for the upload of the XML file 
var g_xml_upload = null;

// The object of class UtilCopyArrayData
var g_util_copy_array_data = null;

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

    g_xml_filename_text_box.setValue( i_new_season_data.getResultDir()); 

    setGlobalLayoutXmlVariablesFromControls();

} // setNewLayoutControls

// Sets the layout XML global variables g_layout_xml_filename and g_layout_xml_server_dir
function setGlobalLayoutXmlVariablesFromControls()
{
    var server_main_dir =  g_layout_server_dir_text_box.getValue();

    var result_dir = g_xml_filename_text_box.getValue();

    g_layout_xml_filename = result_dir + '.xml';

    g_layout_xml_server_dir = '/www/' + g_layout_main_dir_text_box.getValue() + '/' + 
                                server_main_dir + '/XML/';

} // setGlobalLayoutXmlVariablesFromControls

// Copy directories and files for the new layout
function execCopyDirFiles()
{
    g_util_copy_array_data = new UtilCopyArrayData();

    var domain_url = 'https://jazzliveaarau.ch/';

    var origin_url = 'ReservationLayout/'

    g_util_copy_array_data.setAbsoluteOriginDirUrl(domain_url + origin_url);

    var target_url = g_layout_main_dir_text_box.getValue()   + '/' + 
                     g_layout_server_dir_text_box.getValue() + '/';

     g_util_copy_array_data.setAbsoluteTargetDirUrl(domain_url + target_url);

     var php_dir = origin_url + 'Php/';

     g_util_copy_array_data.setAbsolutePhpDirUrl(domain_url + php_dir);

     var origin_target_files_array = [];

    var images_app_dir = 'ImagesApp/';

    origin_target_files_array[ 0] = images_app_dir + 'text_add_reservation.png';
    origin_target_files_array[ 1] = images_app_dir + 'text_delete_off.png';
    origin_target_files_array[ 2] = images_app_dir + 'text_delete_on.png';
    origin_target_files_array[ 3] = images_app_dir + 'text_reservation_display.png';
    origin_target_files_array[ 4] = images_app_dir + 'text_reservation_list.png';
    origin_target_files_array[ 5] = images_app_dir + 'text_reservation_print.png';
    origin_target_files_array[ 6] = images_app_dir + 'text_reserve_seats.png';
    origin_target_files_array[ 7] = images_app_dir + 'text_reserve_select_undef.png';
    origin_target_files_array[ 8] = images_app_dir + 'text_save_reservation.png';
    origin_target_files_array[ 9] = images_app_dir + 'text_save_reservation_white.png';
    origin_target_files_array[10] = images_app_dir + 'text_select_seats.png';




    g_util_copy_array_data.setOriginFileUrlArray(origin_target_files_array);

    g_util_copy_array_data.setTargetFileUrlArray(origin_target_files_array);

    g_util_copy_array_data.setBoolDeleteOriginFileArrayToFalse();

} // execCopyDirFiles

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Main Functions //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Event Functions ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// User clicked the create layout files button
function onClickCreateLayoutFilesButton()
{
    alert("Enter onClickCopyDirFilesButton");
    

}// onClickCreateLayoutFilesButton

// User clicked the copying layout directories and files
function onClickCopyDirFilesButton()
{
	execCopyDirFiles();

}// onClickCopyDirFilesButton

// User clicked the upload layout XML file button
function onClickUploadXmlFileButton()
{

	// alert("Enter onClickUploadXmlFileButton");

    g_xml_upload.hideUploadDiv(false);

}// onClickUploadXmlFileButton

// User clicked the download layout XML file button
function onClickDownloadXmlFileButton()
{

	alert("Enter onClickDownloadXmlFileButton");

}// onClickDownloadXmlFileButton

// The user has selected a DOC local file that shall be uploaded
// 1. Set the selected file name and activate the upload file function.
//    Call setSelectedFileNameActivateUploadFileFunction
// 2. Check if the selected file is OK. Call of ControUploadFile.checkSelectedFileName
//    Return if the file is unvalid. The check function has displayed an error message
// 3. Set the server full file name in the DOC text box. Please note however that the
//    actual server directory name is set by UploadFileToServer.php
//    Call of ControUploadFile.getSelectedFileServerUrl and JazztextBox.setValue
// 4. Return with the message that upload cannot be done with VSC Live server
//    Call of execApplicationOnServer
// 5. Set the active record full file name. Call of getUserInputFromFormSetActiveRecordLinkDoc
//    Return from php uses this value
// 6. Set the caption for the button that the user shall klick to upload the selected file
//    Call of ControUploadFile.displayButtonCaption
function eventUserSelectedXml()
{
	// alert("Enter eventUserSelectedXml");

     g_xml_upload.setSelectedFileNameActivateUploadFileFunction();

     if (!checkSelectedXmlFileName())
     {
        g_xml_upload.initSelectedFileName();

        return;

     } // b_check

    var file_server_url = g_layout_xml_server_dir + g_xml_upload.getSelectedFileName();

    if (!UtilServer.execApplicationOnServer())
    {
        alert("XML Datei kann nicht lokal (mit Visual Studio Code) aufgeladen werden");

        return;
    }

    g_xml_upload.displayButtonCaption();
 
} // eventUserSelectedXml

// Checks the selected XML file
function checkSelectedXmlFileName()
{
    var selected_file_name = g_xml_upload.getSelectedFileName();

    if (g_layout_xml_filename == selected_file_name)
    {
        return true;
    }
    else
    {
        var err_msg = 'Falsche Name der gewählte Datei ' + selected_file_name + '\n' + 
                'Ändere Name zu '+  g_layout_xml_filename;

        alert(err_msg);

        return false;
    }

} // checkSelectedXmlFileName

// Name of the result directory was changed
function onInputResultDirectoryName()
{
    setGlobalLayoutXmlVariablesFromControls();

    g_xml_filename_text_box.setValue(g_layout_xml_filename);

    setNewSeasonLocalStorageData();

} // onInputResultDirectoryName

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Event Functions /////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Local Storage /////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Returns an instance of NewSeasonData
function getNewSeasonDataInput()
{
    var ret_new_season_data = new NewSeasonData();

    ret_new_season_data.setMainDir(g_layout_main_dir_text_box.getValue());

    ret_new_season_data.setResultDir(g_layout_server_dir_text_box.getValue());

    ret_new_season_data.checkData();

    return ret_new_season_data;

} // getNewSeasonDataInput

function setNewSeasonLocalStorageData()
{
    var new_season_data = new NewSeasonData();

    new_season_data.setMainDir(g_layout_main_dir_text_box.getValue());

    new_season_data.setResultDir(g_layout_server_dir_text_box.getValue());

    NewSeasonStorage.setLocal(new_season_data);

} // setNewSeasonLocalStorageData

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Local Storage ///////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Create Controls ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Creates all the controls for the application
function createReservationNewLayoutControls()
{
    createTextBoxXmlFilename();

    createTextBoxMainDirectory();

    createTextBoxResultDirectory();

    copyDirFilesButton();

    createTextBoxProgressMessages();

    createLayoutFileslButton();

    createUploadXmlButton();

    createDownloadXmlButton();

    createUploadXmlControl();

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

    g_layout_server_dir_text_box.setOninputFunctionName("onInputResultDirectoryName");

    g_layout_server_dir_text_box.setTitle("Name des Server Ordners für den neuen Konzertsaal.");

} // createTextBoxResultDirectory

// Creates the button copying layout directories and files
function copyDirFilesButton()
{
    g_copy_dir_files_button = new JazzButton('id_copy_files', 'id_div_copy_files');

    g_copy_dir_files_button.setOnclickFunctionName("onClickCopyDirFilesButton");

    g_copy_dir_files_button.setCaption('Dateien für das Layout kopieren');

    g_copy_dir_files_button.setLabelText("");

    g_copy_dir_files_button.setWidth("250px");

    g_copy_dir_files_button.setTitle('Dateien für das Layout kopieren');

} // copyDirFilesButton

// Create the text box for the name of the layout XML file
function createTextBoxXmlFilename()
{
    g_xml_filename_text_box = new JazzTextBox("id_upload_download_xml_textbox", 'id_div_upload_download_xml_textbox');

    g_xml_filename_text_box.setLabelText("Layout XML Dateiname");

    g_xml_filename_text_box.setLabelTextPositionAbove();

    g_xml_filename_text_box.setSize("33");

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

// Create control for uploading of an XML file
function createUploadXmlControl()
{
    g_xml_upload = new ControUploadFile('id_upload_xml_row', 'id_div_upload_xml_row');

    g_xml_upload.setLabelText("");

    g_xml_upload.setOnchangeFunctionName("eventUserSelectedXml");

    g_xml_upload.setButtonCaption("Datei hochladen");

    g_xml_upload.setExtensions(".xml");

    g_xml_upload.hideUploadDiv(true);

} // createUploadXmlControl

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

