// File: ReservationNewLayout.js
// Date: 2025-11-24
// Author: Gunnar Lidén

// TODO  2025-06-16
//      Determine which files are used by the reservation system
//      Copy zese files to LibsLayout, copy them with this application
//      Make the same for PhpLayout
//      Change references in ReservationLayoutHtml.js to subdirectories Libs
//      Change references for PHP to subdirectory Php
// TODO 2025-11-09
//      - Change reservation scripts so that Events.Xml is used
//      - Season Program not OK ???
//      - Save Xml.php is missing
//      - Allow only one concert/event ??

// Inhalt
// =============
//
// Main functions for the application reservation new layout

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Global Parameters /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Main directory 
var g_layout_main_dir_text_box = null;

// Created new layout main directory name always ReservationLayout
// After creation the new layout must be copied or moved with an FTP application
var g_main_directory_new_layout = 'ReservationLayout';

// Result directory where the generated HTML files and other files shall be stored
var g_layout_server_dir_text_box = null;

// Target main dir: ReservationLayout or Reservation
var g_layout_target_main_dir = '';

// Target result directory, e.g. Spagi_90_Chairs_V_1
var g_layout_target_result_dir = '';

// The name of the layout XML file name
// The name is g_layout_server_dir_text_box + '.xml'
var g_layout_xml_filename = '';

// Server directory for the layout XML file
// e.g. ReservationLayout/Spagi_90_Chairs_V_1/XML/
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

// Button for opening application 'Reservation Show Layout'
var g_show_layout_button = null;

// Button for opening application 'Reservation Admin'
var g_reservation_admin_button = null;

// Button for opening application 'Reservation Search'
var g_reservation_search_button = null;

// Button for opening application 'Reservation Make'
var g_reservation_make_button = null;

// Event number text box
var g_layout_event_number_text_box = null;

// Email address text box
var g_layout_email_text_box = null;

// The object of class ControUploadFile for the upload of the XML file 
var g_xml_upload = null;


// Variables for the creation of the HTML files
// --------------------------------------------

// XML object layout
var g_layout_xml = null;

// An instance of the class CheckInputCreateDirs (global needed for its event member functions)
var g_check_input_create_dirs = null;

// All the tabulators, end of lines and code comments can be removed with this variable
var g_remove_tabs_comments = false;

// In order to be able to test the created HTML files some functions are added
var g_add_temporary_test_functions = false;

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
    // g_layout_main_dir_text_box.setValue(i_new_season_data.getMainDir());  
    
    g_layout_server_dir_text_box.setValue(i_new_season_data.getResultDir()); 

    g_xml_filename_text_box.setValue( i_new_season_data.getResultDir() + '.xml'); 

    setGlobalLayoutXmlVariablesFromControls();

} // setNewLayoutControls

// Sets the layout XML global variables g_layout_xml_filename and g_layout_xml_server_dir
function setGlobalLayoutXmlVariablesFromControls()
{
    // g_layout_target_main_dir = g_layout_main_dir_text_box.getValue();
    g_layout_target_main_dir = g_main_directory_new_layout;
   
    g_layout_target_result_dir =  g_layout_server_dir_text_box.getValue();

    g_layout_xml_filename = g_layout_target_result_dir + '.xml';

    g_layout_xml_server_dir = g_layout_target_main_dir + '/' + 
                              g_layout_target_result_dir + '/XML/';

} // setGlobalLayoutXmlVariablesFromControls

// Returns the URL for the UtilFiles.php directory /ReservationLayout/Php/
function getUtilFilesPhpDir()
{
  var domain_url = 'https://jazzliveaarau.ch/';

    var origin_url = 'ReservationLayout/';

    var util_files_php_dir = domain_url + origin_url + 'Php/';

    return util_files_php_dir;

} // getUtilFilesPhpDir

// Returns the absolute URL to the created HTML file ShowLayout.htm
function getAbsUrlApplicationShowLayout()
{
    var ret_show_layout_url = getAbsUrlApplicationReservationStart();

     ret_show_layout_url = ret_show_layout_url + 'ShowLayout.htm';

     return ret_show_layout_url;

} // getAbsUrlApplicationShowLayout

// Returns the absolute URL to the created HTML file AddReservation.htm
function getAbsUrlApplicationReservationAdmin()
{
    var ret_admin_url = getAbsUrlApplicationReservationStart();

     ret_admin_url = ret_admin_url +  'AddReservation.htm';

     return ret_admin_url;

} // getAbsUrlApplicationReservationAdmin

// Returns the absolute URL to the created HTML file AddReservation.htm
function getAbsUrlApplicationReservationSearch()
{
    var ret_admin_url = getAbsUrlApplicationReservationStart();

     ret_admin_url = ret_admin_url + 'SearchReservation.htm';

     return ret_admin_url;

} // getAbsUrlApplicationReservationSearch

// Returns the absolute URL to the created HTML file MakeReservation.htm
function getAbsUrlApplicationReservationMake()
{
    var ret_admin_url = getAbsUrlApplicationReservationStart();

     ret_admin_url = ret_admin_url + 'MakeReservation.htm';

     // TODO add query string for concert one

     return ret_admin_url;

} // getAbsUrlApplicationReservationMake

// Returns the start string for the absolute URL to the applicaions
function getAbsUrlApplicationReservationStart()
{
    var ret_start_url = 'https://jazzliveaarau.ch/';

    ret_start_url = ret_start_url + g_layout_target_main_dir;

    ret_start_url = ret_start_url + '/' + g_layout_target_result_dir + '/';

     return ret_start_url;

} // getAbsUrlApplicationReservationMake

// Returns the abs URL to the uploaded layout XML file
function getAbsUrlToLayoutXmlFile()
{
    return  'https://jazzliveaarau.ch/' + g_layout_xml_server_dir + g_layout_xml_filename;

} // getAbsUrlToLayoutXmlFile

// Copy directories and files for the new layout
// 1. Create object holding all the data for the copying of files
//    Instance of the class UtilCopyArrayData
// 2. Set origin and target directories
//    Call UtilCopyArrayData.setAbsoluteOriginDirUrl
//    Call UtilCopyArrayData.setAbsoluteTargetDirUrl
//    Call UtilCopyArrayData.setAbsoluteTargetPhpDirUrl
//    Call UtilCopyArrayData.setAbsoluteOriginScriptsDirUrl
//    Call UtilCopyArrayData.setAbsoluteTargetScriptsDirUrl
// 3. Create an array with relative URLs for target directories:
//    XML, SaisonXML, ImagesApp, ImagesLayout, Libs and Php
// 4. Set absolute target directory URLs
//    Call of UtilCopyArrayData.setAbsoluteTargetDirArray
// 5. Create origin an target file names arrays with relative URLs
//    ImagesApp     to ImagesApp:     Button captions as images
//    ImagesLayout  to ImagesLayout:  Images on the layout
//    ScriptsLayout to Libs:          JavaScripts
//    PhpLayout     to Php:           Resevation Php files
// 6. Set origin, target and delete origin arrays
//    Call UtilCopyArrayData.setOriginFileUrlArray
//    Call UtilCopyArrayData.setTargetFileUrlArray
//    Call UtilCopyArrayData.setBoolDeleteOriginFileArrayToFalse
// 7. Copy server files
//    Call of UtilCopyArray.copyFilesCreateDirs(g_util_copy_array_data)
function execCopyDirFiles()
{
    var domain_url = 'https://jazzliveaarau.ch/';

    var origin_url = 'ReservationLayout/';

    //QQ var util_files_php_dir = domain_url + origin_url + 'Php/';

    var util_files_php_dir = getUtilFilesPhpDir();

    g_util_copy_array_data = new UtilCopyArrayData(domain_url, util_files_php_dir);

    var origin_url = 'ReservationLayout/';

    g_util_copy_array_data.setAbsoluteOriginDirUrl(domain_url + origin_url);

    var target_url = g_layout_target_main_dir + '/' + g_layout_target_result_dir + '/';

     g_util_copy_array_data.setAbsoluteTargetDirUrl(domain_url + target_url);

     var target_php_dir = 'Php/';

     g_util_copy_array_data.setAbsoluteTargetPhpDirUrl(domain_url + target_url + target_php_dir);

     var origin_script_url = 'Reservation/Scripts/';  // TODO Change

     g_util_copy_array_data.setAbsoluteOriginScriptsDirUrl(domain_url + origin_script_url);

     var target_script_url = 'Scripts/'; 

     g_util_copy_array_data.setAbsoluteTargetScriptsDirUrl(domain_url + target_url + target_script_url);

     var rel_target_dir_array = [];

     rel_target_dir_array[0] = 'XML/';

     rel_target_dir_array[1] = 'SaisonXML/';

     rel_target_dir_array[2] = 'ImagesApp/';

     rel_target_dir_array[3] = 'ImagesLayout/';

     rel_target_dir_array[4] = 'Libs/';

     rel_target_dir_array[5] = 'Php/';

     g_util_copy_array_data.setAbsoluteTargetDirArray(rel_target_dir_array);

     var origin_files_array = [];

      var target_files_array = [];

    var images_app_dir = 'ImagesApp/';

    origin_files_array.push(images_app_dir + 'text_add_reservation.png');
    target_files_array.push(images_app_dir + 'text_add_reservation.png');
    origin_files_array.push(images_app_dir + 'text_delete_off.png');
    target_files_array.push(images_app_dir + 'text_delete_off.png');
    origin_files_array.push(images_app_dir + 'text_delete_on.png');
    target_files_array.push(images_app_dir + 'text_delete_on.png');
    origin_files_array.push(images_app_dir + 'text_reservation_display.png');
    target_files_array.push(images_app_dir + 'text_reservation_display.png');
    origin_files_array.push(images_app_dir + 'text_reservation_list.png');
    target_files_array.push(images_app_dir + 'text_reservation_list.png');
    origin_files_array.push(images_app_dir + 'text_reservation_print.png');
    target_files_array.push(images_app_dir + 'text_reservation_print.png');
    origin_files_array.push(images_app_dir + 'text_reserve_seats.png');
    target_files_array.push(images_app_dir + 'text_reserve_seats.png');
    origin_files_array.push(images_app_dir + 'text_reserve_select_undef.png');
    target_files_array.push(images_app_dir + 'text_reserve_select_undef.png');
    origin_files_array.push(images_app_dir + 'text_add_reservation.png');
    target_files_array.push(images_app_dir + 'text_add_reservation.png');
    origin_files_array.push(images_app_dir + 'text_save_reservation.png');
    target_files_array.push(images_app_dir + 'text_save_reservation.png');
    origin_files_array.push(images_app_dir + 'text_save_reservation_white.png');
    target_files_array.push(images_app_dir + 'text_save_reservation_white.png');
    origin_files_array.push(images_app_dir + 'text_select_seats.png');
    target_files_array.push(images_app_dir + 'text_select_seats.png');

    var images_layout = 'ImagesLayout/';

    origin_files_array.push(images_layout + 'icon_cash_desk.png');
    target_files_array.push(images_layout + 'icon_cash_desk.png');
    origin_files_array.push(images_layout + 'icon_door_back.png');
    target_files_array.push(images_layout + 'icon_door_back.png');
    origin_files_array.push(images_layout + 'icon_door_main.png');
    target_files_array.push(images_layout + 'icon_door_main.png');
    origin_files_array.push(images_layout + 'icon_door_staff.png');
    target_files_array.push(images_layout + 'icon_door_staff.png');
    origin_files_array.push(images_layout + 'icon_stage.png');
    target_files_array.push(images_layout + 'icon_stage.png');
    origin_files_array.push(images_layout + 'jazz_live_aarau_logo.png');
    target_files_array.push(images_layout + 'jazz_live_aarau_logo.png');
    origin_files_array.push(images_layout + 'jazz_live_aarau_sponsor_logos.png');
    target_files_array.push(images_layout + 'jazz_live_aarau_sponsor_logos.png');
    origin_files_array.push(images_layout + 'jazz_live_aarau_text_logo.png');
    target_files_array.push(images_layout + 'jazz_live_aarau_text_logo.png');
  

    var layout_scripts_origin = 'ScriptsLayout/';
    var scripts_target = 'Libs/';

    origin_files_array.push(layout_scripts_origin + 'CoronaForm.js');
    target_files_array.push(scripts_target + 'CoronaForm.js');
    origin_files_array.push(layout_scripts_origin + 'DisplayNames.js');
    target_files_array.push(scripts_target + 'DisplayNames.js');
    origin_files_array.push(layout_scripts_origin + 'Reservation.js');
    target_files_array.push(scripts_target + 'Reservation.js');
    origin_files_array.push(layout_scripts_origin + 'ReservationConcerts.js');
    target_files_array.push(scripts_target + 'ReservationConcerts.js');
    //QQ No longer used origin_files_array.push(layout_scripts_origin + 'ReservationEmail.js');
    //QQ No longer used target_files_array.push(scripts_target + 'ReservationEmail.js');
    origin_files_array.push(layout_scripts_origin + 'ReservationEvents.js');
    target_files_array.push(scripts_target + 'ReservationEvents.js');
    origin_files_array.push(layout_scripts_origin + 'ReservationFiles.js');
    target_files_array.push(scripts_target + 'ReservationFiles.js');
    origin_files_array.push(layout_scripts_origin + 'ReservationSearch.js');
    target_files_array.push(scripts_target + 'ReservationSearch.js');
    origin_files_array.push(layout_scripts_origin + 'ReservationStrings.js');
    target_files_array.push(scripts_target + 'ReservationStrings.js');
    origin_files_array.push(layout_scripts_origin + 'ControlModalPopup.js');
    target_files_array.push(scripts_target + 'ControlModalPopup.js');
    origin_files_array.push(layout_scripts_origin + 'UtilDate_20250330.js');
    target_files_array.push(scripts_target + 'UtilDate_20250330.js');
    origin_files_array.push(layout_scripts_origin + 'UtilPayment_20240205.js');
    target_files_array.push(scripts_target + 'UtilPayment_20240205.js');

    var scripts_origin = 'Scripts/'; // Please note not in directory ScriptsLayout
    //scripts_target = 'Libs/';

    origin_files_array.push(scripts_origin + 'ReservationXmlTags.js');
    target_files_array.push(scripts_target + 'ReservationXmlTags.js');

    origin_files_array.push(scripts_origin + 'EventProgramXml.js');
    target_files_array.push(scripts_target + 'EventProgramXml.js');

    var php_origin = 'PhpLayout/';
    var php_target = 'Php/';

    origin_files_array.push(php_origin + 'SendEmail.php');
    target_files_array.push(php_target + 'SendEmail.php');
    //QQ Not used origin_files_array.push(php_origin + 'SaveXmlExit.php');
    //QQ Not used target_files_array.push(php_target + 'SaveXmlExit.php');
    origin_files_array.push(php_origin + 'SaveXml.php');
    target_files_array.push(php_target + 'SaveXml.php');

    /* TODO Find another solution

      TODO
        <script type="text/javascript" src= "https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js" ></script>
TODO Find another solution */


    g_util_copy_array_data.setOriginFileUrlArray(origin_files_array);

    g_util_copy_array_data.setTargetFileUrlArray(target_files_array);

    g_util_copy_array_data.setBoolDeleteOriginFileArrayToFalse();

    UtilCopyArray.copyFilesCreateDirs(g_util_copy_array_data);

} // execCopyDirFiles

// Create the HTML files defined by the XML layout file in /ReservationLayout/ResultDir/XML/ResultDir.xml
function execCreateLayoutHtmlFiles()
{
    debugReservationNewLayout("execCreateLayoutHtmlFiles Create HTML files for layout " + g_layout_target_result_dir);

    var organisation_directory_name = 'NotUsed';

    g_layout_xml = new ReservationLayoutXml(callbackAfterLoadOfXmlLayout, organisation_directory_name, g_layout_target_result_dir);

} // execCreateLayoutHtmlFiles

// The Layout XML file is loaded
function callbackAfterLoadOfXmlLayout()
{
    debugReservationNewLayout("callbackAfterLoadOfXmlLayout The layout XML file /" + 
            g_layout_target_result_dir + '/XML/' + g_layout_target_result_dir + '.xml object ist created');

    createUploadLayoutFilesAfterCheck();

} // callbackAfterLoadOfXmlLayout

// Create and upload layout files to the result server directory
function createUploadLayoutFilesAfterCheck()
{
    debugReservationNewLayout('createUploadLayoutFilesAfterCheck Enter');

    var result_server_directory_name = g_layout_target_result_dir;

    var absolute_path_dir_name = constructPathToResultDirectory(result_server_directory_name);

    var layout_file_data_array = getLayoutFileDataArrayFromXml(g_layout_xml);

    var n_layout_file_data = layout_file_data_array.length;

    //n_layout_file_data = 1; // Temporary

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

   g_create_html_file_index = -1;

   g_path_file_name_array = path_file_name_array;
   g_layout_html_code_array = layout_html_code_array; 

    recursiveFileCreation();

} // createUploadLayoutFilesAfterCheck

// Returns the full path to the result directory
function constructPathToResultDirectory(i_result_server_directory_name)
{
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

    var util_files_data = new UtilFilesData();

    var file_name = g_path_file_name_array[g_create_html_file_index];

    var file_content =  g_layout_html_code_array[g_create_html_file_index];

    var path_php_dir = getUtilFilesPhpDir();

    var success_function_name = recursiveFileCreation;

    if (g_create_html_file_index == n_files - 1)
    {
        success_function_name = afterSaveAllHtml;
    }

    var error_function_name = errorCreatingHtmlFile;


    util_files_data.setDataExecCaseCreateFile(file_name, file_content, path_php_dir, success_function_name, error_function_name);

    UtilFiles.dirFileAnyCase(util_files_data);

} // recursiveFileCreation

function errorCreatingHtmlFile()
{
    alert("errorCreatingHtmlFile");

} // errorCreatingHtmlFile

// After saving all the HTML files
function afterSaveAllHtml()
{
    var result_server_directory_name = g_layout_server_dir_text_box.getValue();

    var uploaded_msg = 'HTML Dateien sind kreiert und zum Server Ordner ' + 
                        result_server_directory_name + ' hochgeladen';

    debugReservationNewLayout('afterSaveAllHtml ' + uploaded_msg);

    alert(uploaded_msg);

} // afterSaveAllHtml

// Open 'Reservation Show Layout' application
// (Weakness: Note that in the XML layout file another name my be set)
function execShowLayout()
{
    var show_layout_url = getAbsUrlApplicationShowLayout();

    window.open(show_layout_url,'_blank').focus();

} // execShowLayout

// Open 'Reservation Admin' application
function execReservationAdmin()
{
   var admin_url = getAbsUrlApplicationReservationAdmin();

    window.open(admin_url,'_blank').focus();

} // execReservationAdmin

// Open 'Reservation Search' application
function execReservationSearch()
{
   var admin_url = getAbsUrlApplicationReservationSearch();

    window.open(admin_url,'_blank').focus();

} // execReservationSearch

// Open 'Reservation Make' application
function execReservationMake()
{
   var admin_url = getAbsUrlApplicationReservationMake();

   var add_to_xml_file_name = 'Salmen';

    var form_name = 'Tester neues Layout';

    var form_email = g_layout_event_number_text_box.getValue();

    var form_remark = 'Test von Applikation MakeReservation.htm';

    var requested_concert_number = g_layout_event_number_text_box.getValue();

    var session_storage_add_to_xml_file_name = "add_to_xml_file_name_str";
    var session_storage_reservation_name = "reservation_name_str";
    var session_storage_reservation_email = "reservation_email_str";
    var session_storage_reservation_remark = "reservation_remark_str";
    var session_storage_requested_concert_number = "reservation_requested_concert_number";

	// Save it also as session data that can be used by Internet Explorer and Microsoft Edge
	sessionStorage.setItem(session_storage_add_to_xml_file_name, add_to_xml_file_name);	
	sessionStorage.setItem(session_storage_reservation_name, form_name);
	sessionStorage.setItem(session_storage_reservation_email, form_email);
	sessionStorage.setItem(session_storage_reservation_remark, form_remark);
    sessionStorage.setItem(session_storage_requested_concert_number, requested_concert_number);

    var make_window = window.open(admin_url);

    /* Does not work
    // Pass the data to the opened window
	make_window.passed_data_add_to_xml_file_name = add_to_xml_file_name;
    make_window.passed_data_reservation_name = form_name;
    make_window.passed_data_reservation_email = form_email;
    make_window.passed_data_reservation_remark = form_remark;
    make_window.passed_data_requested_concert_number = requested_concert_number;
    */

} // execReservationMake

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Main Functions //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Event Functions ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// User clicked the create layout files button
function onClickCreateLayoutFilesButton()
{
    debugReservationNewLayout("onClickCreateLayoutFilesButton User klicked the button create the HTML layutut files");

    execCreateLayoutHtmlFiles();
    

}// onClickCreateLayoutFilesButton

// User clicked the copying layout directories and files
function onClickCopyDirFilesButton()
{
	execCopyDirFiles();

}// onClickCopyDirFilesButton

// User clicked the opening application 'Reservation Show Layout'
function onClickshowLayoutButton()
{
	execShowLayout();

}// onClickshowLayoutButton

// User clicked the opening application 'Reservation Admin'
function onClickcreateReservationAdminButton()
{
	execReservationAdmin();

}// onClickcreateReservationAdminButton

// User clicked the opening application 'Reservation Search'
function onClickCreateReservationSearchButton()
{
	execReservationSearch();

}// onClickCreateReservationSearchButton^

// User clicked the opening application 'Reservation Make'
function onClickCreateReservationMakeButton()
{
	execReservationMake();

}// onClickCreateReservationMakeButton

// User clicked the upload layout XML file button
function onClickUploadXmlFileButton()
{
    g_xml_upload.hideUploadDiv(false);

}// onClickUploadXmlFileButton

// User clicked the download layout XML file button
function onClickDownloadXmlFileButton()
{
    var url_xml = getAbsUrlToLayoutXmlFile();

    window.open(url_xml,'_blank').focus();

	//QQalert("onClickDownloadXmlFileButton " + url_xml);

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

// Name of the main directory was changed
function onInputMainDirectoryName()
{
    setGlobalLayoutXmlVariablesFromControls();

    setNewSeasonLocalStorageData();

} // onInputMainDirectoryName

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

    // ret_new_season_data.setMainDir(g_layout_main_dir_text_box.getValue());
    ret_new_season_data.setMainDir(g_main_directory_new_layout);

    ret_new_season_data.setResultDir(g_layout_server_dir_text_box.getValue());

    ret_new_season_data.checkData();

    return ret_new_season_data;

} // getNewSeasonDataInput

function setNewSeasonLocalStorageData()
{
    var new_season_data = new NewSeasonData();

    //new_season_data.setMainDir(g_layout_main_dir_text_box.getValue());
    new_season_data.setMainDir(g_main_directory_new_layout);

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

    //TODO Remove createTextBoxMainDirectory();

    createTextBoxResultDirectory();

    createCopyDirFilesButton();

    //TODO Remove ?createTextBoxProgressMessages();

    createLayoutFileslButton();

    showLayoutButton();

    createReservationAdminButton();

    createReservationSearchButton();

    createReservationMakeButton();

    createUploadXmlButton();

    createDownloadXmlButton();

    createUploadXmlControl();

    createTextBoxEventNumber();

    createTextBoxEmail();

} // createReservationNewSeasonControls

// Create the text box for the test or relase directory TODO Remove
function createTextBoxMainDirectory()
{
    g_layout_main_dir_text_box = new JazzTextBox("id_layout_main_dir", 'id_div_layout_main_dir');

    g_layout_main_dir_text_box.setLabelText("1. ReservationLayout / Reservation");

    g_layout_main_dir_text_box.setLabelTextPositionAbove();

    g_layout_main_dir_text_box.setSize("32");

    g_layout_main_dir_text_box.setReadOnlyFlag(false);

    g_layout_main_dir_text_box.setOninputFunctionName("onInputMainDirectoryName");

    g_layout_main_dir_text_box.setTitle("Schritt 1: Für new (Test) Ordner ReservationLayout eingeben. Für Release Ordner Reservation eingeben");

} // createTextBoxMainDirectory

// Create the text box for the result server directory where generated files shall be stored
function createTextBoxResultDirectory()
{
    g_layout_server_dir_text_box = new JazzTextBox("id_layout_result_dir", 'id_div_layout_result_dir');

    g_layout_server_dir_text_box.setLabelText("1. Ordner für Konzertsaal-Sitzplan");

    g_layout_server_dir_text_box.setLabelTextPositionAbove();

    g_layout_server_dir_text_box.setSize("32");

    g_layout_server_dir_text_box.setReadOnlyFlag(false);

    g_layout_server_dir_text_box.setOninputFunctionName("onInputResultDirectoryName");

    g_layout_server_dir_text_box.setTitle("Schritt 1: Name des Server-Ordners für den neuen Konzertsaal.");

} // createTextBoxResultDirectory

// Creates the button copying layout directories and files
function createCopyDirFilesButton()
{
    g_copy_dir_files_button = new JazzButton('id_copy_files', 'id_div_copy_files');

    g_copy_dir_files_button.setOnclickFunctionName("onClickCopyDirFilesButton");

    g_copy_dir_files_button.setCaption('2. Initialisierung des Layouts');

    g_copy_dir_files_button.setLabelText("");

    g_copy_dir_files_button.setWidth("250px");

    g_copy_dir_files_button.setTitle('Schritt 2: Ordner kreieren und Dateien für das Layout kopieren');

} // createCopyDirFilesButton

// Create the text box for the name of the layout XML file
function createTextBoxXmlFilename()
{
    g_xml_filename_text_box = new JazzTextBox("id_upload_download_xml_textbox", 'id_div_upload_download_xml_textbox');

    g_xml_filename_text_box.setLabelText("Layout XML Dateiname");

    g_xml_filename_text_box.setLabelTextPositionAbove();

    g_xml_filename_text_box.setSize("33");

    g_xml_filename_text_box.setReadOnlyFlag(true);

    g_xml_filename_text_box.setTitle("Zeigt der Name der Layout XML Datei, die das Lokal definiert");

    g_xml_filename_text_box.setClass('cl_upload_download_xml_textbox');

} // createTextBoxXmlFilename

// Create the text box for the progress messages TODO Remove??
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

    g_create_layout_files_button.setCaption('4. Dateien des Layouts generieren');

    g_create_layout_files_button.setLabelText("");

    g_create_layout_files_button.setWidth("250px");

    g_create_layout_files_button.setTitle('Schritt 4: Alle Dateien für das neue Layout generieren');

} // createLayoutFileslButton


// Creates the button opening application 'Reservation Show Layout'
function showLayoutButton()
{
    g_show_layout_button = new JazzButton('id_show_layout_button', 'id_div_show_layout_button');

    g_show_layout_button.setOnclickFunctionName("onClickshowLayoutButton");

    g_show_layout_button.setCaption('Layout');

    g_show_layout_button.setLabelText("5. Test");

    g_show_layout_button.setLabelTextPositionAbove();

    g_show_layout_button.setWidth("60px");

    g_show_layout_button.setTitle('Test von Applikation Reservation Tischplan zeigen');

} // showLayoutButton

// Creates the button opening application 'Reservation Admin'
function createReservationAdminButton()
{
    g_reservation_admin_button = new JazzButton('id_reservation_admin_button', 'id_div_reservation_admin_button');

    g_reservation_admin_button.setOnclickFunctionName("onClickcreateReservationAdminButton");

    g_reservation_admin_button.setCaption('Admin');

    // g_reservation_admin_button.setLabelText("_");

    // g_reservation_admin_button.setLabelTextPositionAbove();

    g_reservation_admin_button.setWidth("60px");

    g_reservation_admin_button.setTitle('Test von Applikation Reservation Admin');

} // createReservationAdminButton

// Creates the button opening application 'Reservation Search'
function createReservationSearchButton()
{
    g_reservation_search_button = new JazzButton('id_reservation_search_button', 'id_div_reservation_search_button');

    g_reservation_search_button.setOnclickFunctionName("onClickCreateReservationSearchButton");

    g_reservation_search_button.setCaption('Suche');

    //g_reservation_search_button.setLabelText("_");

    //g_reservation_search_button.setLabelTextPositionAbove();

    g_reservation_search_button.setWidth("60px");

    g_reservation_search_button.setTitle('Test von Applikation Reservation Suchen');

} // createReservationSearchButton

// Creates the button opening application 'Reservation Make'
function createReservationMakeButton()
{
    g_reservation_make_button = new JazzButton('id_reservation_make_button', 'id_div_reservation_make_button');

    g_reservation_make_button.setOnclickFunctionName("onClickCreateReservationMakeButton");

    g_reservation_make_button.setCaption('Homepage');

    g_reservation_make_button.setLabelTextPositionAbove();

    g_reservation_make_button.setWidth("80px");

    g_reservation_make_button.setTitle('Test von Reservation von der Homepage');

} // createReservationMakeButton

// Creates the upload layout XML file button
function createUploadXmlButton()
{
    g_upload_xml_button = new JazzButton('id_upload_xml_button', 'id_div_upload_xml_button');

    g_upload_xml_button.setOnclickFunctionName("onClickUploadXmlFileButton");

    g_upload_xml_button.setCaption('3. Upload');

    g_upload_xml_button.setLabelText("");

    g_upload_xml_button.setWidth("76px");

    g_upload_xml_button.setTitle('Scritt 3: Layout XML Datei hochladen. Die Datei definiert das Lokal');

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

// Create event number text box
function createTextBoxEventNumber()
{
    g_layout_event_number_text_box = new JazzTextBox("id_layout_event_number", 'id_div_layout_event_number');

    //g_layout_event_number_text_box.setLabelText("Nr");

    //g_layout_event_number_text_box.setLabelTextPositionLeft();

    g_layout_event_number_text_box.setSize("1");
	
	g_layout_event_number_text_box.setValue("1");

    g_layout_event_number_text_box.setReadOnlyFlag(false);

    g_layout_event_number_text_box.setTitle("Konzert Nummer eingeben (1, 2, 3, ...");

} // createTextBoxEventNumber

// Create email address text box
function createTextBoxEmail()
{
    g_layout_email_text_box = new JazzTextBox("id_layout_email", 'id_div_layout_email');

    g_layout_email_text_box.setSize("16");
	
	g_layout_email_text_box.setValue("");

    g_layout_email_text_box.setPlaceholderText("E-Mail Adresse");

    g_layout_email_text_box.setReadOnlyFlag(false);

    g_layout_email_text_box.setTitle("Adresse für die E-Mail-Bestätigung");

} // createTextBoxEmail

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

// Displays the input string in the debugger Console TODO Should not be called in UtilFiles
function debugReservationLayout(i_msg_str)
{
    // Tempoprary QQQ console.log(i_msg_str);

    // UtilServer.appendDebugFile(i_msg_str, 'ReservationLayout');

} // debugReservationLayout

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Debug Function //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
