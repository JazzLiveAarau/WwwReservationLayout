// File: ReservationCreateLayout.js
// Date: 2026-05-01
// Author: Gunnar Lidén

// Inhalt
// =============
// Main functions for the application reservation layout create

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Global Parameters /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Global variables for the controls of the application
var g_help_create_layout_button = null;

// Global variables for the controls of the application
var g_it_info_create_layout_button = null;

// Global variable for the text box with the result server directory
var g_create_layout_main_dir = 'ReservationLayout/';

// Returns the abs URL to the layout result directory
function getAbsUrlToResultDir()
{
    var result_dir = g_create_layout_result_dir_text_box.getValue();

    var ret_abs_dir_url = window.location.origin + '/' + g_create_layout_main_dir +result_dir + '/' + 'XML/';

    debugCreateLayout('getAbsUrlToResultDir ret_abs_dir_url= ' + ret_abs_dir_url);

    return  ret_abs_dir_url;

} // getAbsUrlToResultDir

// Returns the abs URL to the layout result XML file
function getAbsUrlToResultLayoutXmlFile()
{
    var abs_url_to_result_dir = getAbsUrlToResultDir();

     var result_dir = g_create_layout_result_dir_text_box.getValue();

    var ret_abs_file_url = abs_url_to_result_dir + result_dir + '.xml';

    debugCreateLayout('getAbsUrlToResultLayoutXmlFile ret_abs_file_url= ' + ret_abs_file_url);

    return  ret_abs_file_url;

} // getAbsUrlToResultLayoutXmlFile


///////////////////////////////// Start Main Page /////////////////////////////////////////

// Global variable for the text box with the result server directory 
var g_create_layout_result_dir_text_box = null;

///////////////////////////////// End Main Page ///////////////////////////////////////////


///////////////////////////////// Start TableGroup Page ////////////////////////////////////

///////////////////////////////// End TableGroup Page /////////////////////////////////////


///////////////////////////////// Start Table Page /////////////////////////////////////////

///////////////////////////////// End Table Page ///////////////////////////////////////////


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
function initReservationCreateLayout()
{
    debugCreateLayout('initReservationCreateLayout Enter');

    //TODO displayStartPage();

    NewSeasonStorage.initLocal();

    createCreateLayoutControls();

    var create_layout_data = NewSeasonStorage.getLocal();

    setCreateLayoutControls(create_layout_data);

    determinIfLayoutResultDirExistsOnServer();

} // initReservationCreateLayout

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Main Functions //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Event Functions ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

function onClickHelpButton()
{
    debugCreateLayout('onClickHelpButton Enter');

} // onClickHelpButton

function onClickItInfoCreateLayoutButton()
{
    debugCreateLayout('onClickItInfoCreateLayoutButton Enter');

} // onClickItInfoCreateLayoutButton

// Event function for the input of the text box with the result server directory
function onInputResultDirectory()
{
    debugCreateLayout('onInputResultDirectory Value= ' + g_create_layout_result_dir_text_box.getValue());

    determinIfLayoutResultDirExistsOnServer();

} // onInputResultDirectory


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Event Functions /////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Set Controls //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Set the controls with data from local storage
function setCreateLayoutControls(i_create_layout_data)
{
    debugCreateLayout('setCreateLayoutControls Set result directory= ' + i_create_layout_data.getResultDir());

    // Please note that onInputResultDirectory will not be called! Why? Answer from AI:
    // Because the value of the text box will be set with the function setValue and 
    // not by user input. So we have to set the value of the text box with the value 
    // from local storage by hand.
    g_create_layout_result_dir_text_box.setValue(i_create_layout_data.getResultDir()); 

    // TODO g_create_layout_xml_filename_text_box.setValue(g_event_program_xml_filename);

} // setCreateLayoutControls

// Checks if the layout result directory exists on the server 
function determinIfLayoutResultDirExistsOnServer()
{
    debugCreateLayout('determinIfLayoutResultDirExistsOnServer Enter');

    g_layout_result_dir_exists = false;

    if (UtilUrl.execApplicationOnServer() == false)
    {
        debugCreateLayout('determinIfLayoutResultDirExistsOnServer Not executed on server');

        alert('determinIfLayoutResultDirExistsOnServer\nBitte lade die Applikation auf den Server und rufe sie von dort auf.');
    
        return;
    }

    // TODO hideEventProgramSection();

    var util_files_data = new UtilFilesData();

    var absolute_dir_url = getAbsUrlToResultDir();

    var relative_path_php_dir = './Php/';

    util_files_data.setDataExecCaseDirExists(absolute_dir_url, relative_path_php_dir, 
            callbackLayoutDirExists, callbackLayoutDirNotExists);

    UtilFiles.dirFileAnyCase(util_files_data);

} // determinIfLayoutResultDirExistsOnServer

// Callback function if the layout result directory exists on the server
function callbackLayoutDirExists()
{
    debugCreateLayout('callbackLayoutDirExists Enter');

} // callbackLayoutDirExists

// Callback function if the layout result directory not exists on the server
function callbackLayoutDirNotExists()
{
    debugCreateLayout('callbackLayoutDirNotExists Enter');

} // callbackLayoutDirNotExists

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Set Controls ////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Create Controls ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Create the controls for this application
function createCreateLayoutControls()
{
    debugCreateLayout('createCreateLayoutControls Enter');

    createHelpCreateLayoutButton();

    createItInfoCreateLayoutButton();

    createTextBoxResultDirectory();

} // createCreateLayoutControls


// Creates the help button 
function createHelpCreateLayoutButton()
{
    g_help_create_layout_button = new JazzButton('id_create_help_button', 'id_div_create_help_button');

    g_help_create_layout_button.setOnclickFunctionName("onClickHelpButton");

    g_help_create_layout_button.setCaption('Hilfe');

    g_help_create_layout_button.setLabelText("");

    g_help_create_layout_button.setWidth("60px");

    g_help_create_layout_button.setClass("cl_help_button");

    g_help_create_layout_button.setTitle('Hilfe zur Web Applikation Layout erstellen');

} // createHelpCreateLayoutButton

// Creates the IT info button 
function createItInfoCreateLayoutButton()
{
    g_it_info_create_layout_button = new JazzButton('id_create_it_info_button', 'id_div_create_it_info_button');

    g_it_info_create_layout_button.setOnclickFunctionName("onClickItInfoCreateLayoutButton");

    g_it_info_create_layout_button.setCaption('IT Info');

    g_it_info_create_layout_button.setLabelText("");

    g_it_info_create_layout_button.setWidth("60px");

    g_it_info_create_layout_button.setClass("cl_help_button");

    g_it_info_create_layout_button.setTitle('Web Applikation Layout erstellen - Informationen für IT');

} // createItInfoCreateLayoutButton

// Create the text box for the result server directory where the new layout XML will be stored
function createTextBoxResultDirectory()
{
    g_create_layout_result_dir_text_box = new JazzTextBox("id_create_layout_result_dir", 'id_div_create_layout_result_dir');

    g_create_layout_result_dir_text_box.setLabelText(" (Auch Server Ordner Name)");

    g_create_layout_result_dir_text_box.setLabelTextPositionRight();

    g_create_layout_result_dir_text_box.setSize("30");

    g_create_layout_result_dir_text_box.setReadOnlyFlag(false);

    g_create_layout_result_dir_text_box.setOninputFunctionName("onInputResultDirectory");

    g_create_layout_result_dir_text_box.setTitle("Name des Server Ordners für den neuen Konzertsaal.");

} // createTextBoxResultDirectory

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Display Functions /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Display the start page and hide the other pages
function displayStartPage()
{
    getElementDivStartPage().style.display = 'block';

    getElementDivTableGroupPage().style.display = 'none';

    getElementDivTablePage().style.display = 'none';

} // displayStartPage

// Display the table group page and hide the other pages
function displayTableGroupPage()
{
    getElementDivStartPage().style.display = 'none';

    getElementDivTableGroupPage().style.display = 'block';

    getElementDivTablePage().style.display = 'none';

} // displayTableGroupPage

// Display the table page and hide the other pages
function displayTablePage()
{
    getElementDivStartPage().style.display = 'none';

    getElementDivTableGroupPage().style.display = 'none';

    getElementDivTablePage().style.display = 'block';

} // displayTablePage

// Returns the div element start page
function getElementDivStartPage()
{
    return document.getElementById(getIdStartPage());

} // getElementDivStartPage

// Returns the id of the start page div element
function getIdStartPage()
{
    return 'id_start_page';

} // getIdStartPage

// Returns the div element table group page
function getElementDivTableGroupPage()
{
    return document.getElementById(getIdTableGroupPage());

} // getElementDivTableGroupPage

// Returns the id of the table group page div element
function getIdTableGroupPage()
{
    return 'id_table_group_page';

} // getIdTableGroupPage

// Returns the div element table page
function getElementDivTablePage()
{
    return document.getElementById(getIdTablePage());    

} // getElementDivTablePage

// Returns the id of the table page div element
function getIdTablePage()
{
    return 'id_table_page';

} // getIdTablePage

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Debug Function ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Displays the input string in the debugger Console
function debugCreateLayout(i_msg_str)
{
    console.log(i_msg_str);

    UtilServer.appendDebugFile(i_msg_str, 'ReservationCreateLayoutDebug.txt');

} // debugCreateLayout

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Debug Function //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////