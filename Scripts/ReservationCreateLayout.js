// File: ReservationCreateLayout.js
// Date: 2026-05-02
// Author: Gunnar Lidén

// Inhalt
// =============
// Main functions for the application reservation layout create

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Global Parameters /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Global variable for the layout XML object an instance of the class ReservationLayoutXml
var g_create_layout_xml = null;

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
function getAbsUrlResultLayoutXmlFile()
{
    var abs_url_to_result_dir = getAbsUrlToResultDir();

     var result_dir = g_create_layout_result_dir_text_box.getValue();

    var ret_abs_file_url = abs_url_to_result_dir + result_dir + '.xml';

    debugCreateLayout('getAbsUrlResultLayoutXmlFile ret_abs_file_url= ' + ret_abs_file_url);

    return  ret_abs_file_url;

} // getAbsUrlResultLayoutXmlFile

// Global variable if the layout result directory exists on the server
var g_create_layout_result_dir_exists = false;

// Global variable if the layout XML file exists on the server
var g_create_layout_xml_file_exists = false;


///////////////////////////////// Start Main Page /////////////////////////////////////////

// Global variable for the text box with the result server directory 
var g_create_layout_result_dir_text_box = null;

// Global variable for the button for creating a new layout XML file
var g_layout_xml_file_create_button = null;

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
// 1. Display start page. Call of displayStartPage
// 2. Hide the select layout elements container. Call of hideSelectContainer
// 3. Hide the button for creating a new layout XML file. Call of hideCreateNewXmlButton
// 4. If local storage not is set (after delete browser cache) set empty strings
//    Call of NewSeasonStorage.initLocal
// 5. Create the controls for this application
//    Call of createLayoutCreateControls
// 6. Set the controls with data from local storage
//    Call of setLayoutCreateControls
// 7. Check if the layout result directory exists on the server 
//    and set the color of the text accordingly
//    Call of determinIfLayoutResultDirExistsOnServer
function initReservationCreateLayout()
{
    debugCreateLayout('initReservationCreateLayout Enter');

    //TODO displayStartPage();

    hideSelectContainer();

    hideCreateNewXmlButton();

    NewSeasonStorage.initLocal();

    createLayoutCreateControls();

    var create_layout_data = NewSeasonStorage.getLocal();

    setLayoutCreateControls(create_layout_data);

    determinIfLayoutResultDirExistsOnServer();

} // initReservationCreateLayout

// Create an instance of the class ReservationLayoutXml
function createLayoutXmlObject()
{
    var organisation_directory_name = 'NotUsed';

    var result_dir = g_create_layout_result_dir_text_box.getValue();

    debugCreateLayout('createLayoutXmlObject Result directory= ' + result_dir);

    g_create_layout_xml = new ReservationLayoutXml(callbackAfterLoadOfXmlLayout, organisation_directory_name, result_dir);   

} // createLayoutXmlObject

// Callback function after loading the layout XML file
function callbackAfterLoadOfXmlLayout()
{
    var result_dir = g_create_layout_result_dir_text_box.getValue();

    debugCreateLayout("callbackAfterLoadOfXmlLayout Object created for the layout XML file \n/" + 
            result_dir + '/XML/' + result_dir + '.xml');

    displaySelectContainer();

    setLocalStorageData();

} // callbackAfterLoadOfXmlLayout

// Set the local storage data with the values from the result directory control
// The main directory for this application is always ReservationLayout.
function setLocalStorageData()
{
    var create_layout_data = new NewSeasonData();

    create_layout_data.setMainDir('ReservationLayout');

    var result_dir = g_create_layout_result_dir_text_box.getValue();

    create_layout_data.setResultDir(result_dir);

    NewSeasonStorage.setLocal(create_layout_data);

   debugCreateLayout('setLocalStorageData Result directory= ' + create_layout_data.getResultDir());

} // setLocalStorageData

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Main Functions //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Event Functions ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Event function for the click on the help button
function onClickHelpButton()
{
    debugCreateLayout('onClickHelpButton Enter');

} // onClickHelpButton

// Event function for the click on the IT info button
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

// Event function for the click on the button for creating a new layout XML file
function onClickCreateNewXmlFileButton()
{
    debugCreateLayout('onClickCreateNewXmlFileButton Enter');

    alert('onClickCreateNewXmlFileButton\nTODO Eine neue XML Datei erstellen' );

} // onClickCreateNewXmlFileButton

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Event Functions /////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Set Controls //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Set the controls with data from local storage
function setLayoutCreateControls(i_create_layout_data)
{
    debugCreateLayout('setLayoutCreateControls Set result directory= ' + i_create_layout_data.getResultDir());

    // Please note that onInputResultDirectory will not be called! Why? Answer from AI:
    // Because the value of the text box will be set with the function setValue and 
    // not by user input. So we have to set the value of the text box with the value 
    // from local storage by hand.
    g_create_layout_result_dir_text_box.setValue(i_create_layout_data.getResultDir()); 

    // TODO g_create_layout_xml_filename_text_box.setValue(g_event_program_xml_filename);

} // setLayoutCreateControls

// Checks if the layout result directory exists on the server 
function determinIfLayoutResultDirExistsOnServer()
{
    debugCreateLayout('determinIfLayoutResultDirExistsOnServer Enter');

    g_create_layout_result_dir_exists = false;

    if (UtilUrl.execApplicationOnServer() == false)
    {
        debugCreateLayout('determinIfLayoutResultDirExistsOnServer Not executed on server');

        alert('determinIfLayoutResultDirExistsOnServer\nBitte lade die Applikation auf den Server und rufe sie von dort auf.');
    
        return;
    }

    var util_files_dir_data = new UtilFilesData();

    var absolute_dir_url = getAbsUrlToResultDir();

    var relative_path_php_dir = './Php/';

    util_files_dir_data.setDataExecCaseDirExists(absolute_dir_url, relative_path_php_dir, 
            callbackLayoutDirExists, callbackLayoutDirNotExists);

    UtilFiles.dirFileAnyCase(util_files_dir_data);

} // determinIfLayoutResultDirExistsOnServer

// Callback function if the layout result directory exists on the server
// 1. Set the global variable g_create_layout_result_dir_exists to true
// 2. Set the color of the text of the result directory element to black
// 3. Check if the layout XML file exists on the server. 
//    Call of determinIfLayoutXmlFileExistsOnServer
function callbackLayoutDirExists()
{
    debugCreateLayout('callbackLayoutDirExists Enter');

    g_create_layout_result_dir_exists = true;

    getElementDivResultDirectory().style.color = 'black';

    determinIfLayoutXmlFileExistsOnServer();

} // callbackLayoutDirExists

// Callback function if the layout result directory not exists on the server
// 1. Set the global variable g_create_layout_result_dir_exists to false
// 2. Set the color of the text of the result directory element to red
function callbackLayoutDirNotExists()
{
    debugCreateLayout('callbackLayoutDirNotExists Enter');

    g_create_layout_result_dir_exists = false;

    getElementDivResultDirectory().style.color = 'red';

} // callbackLayoutDirNotExists

// Checks if the layout XML file exists on the server 
function determinIfLayoutXmlFileExistsOnServer()
{
    debugCreateLayout('determinIfLayoutXmlFileExistsOnServer Enter');

    g_create_layout_xml_file_exists = false;

    if (UtilUrl.execApplicationOnServer() == false)
    {
        debugCreateLayout('determinIfLayoutXmlFileExistsOnServer Not executed on server');

        alert('determinIfLayoutXmlFile ExistsOnServer\nBitte lade die Applikation auf den Server und rufe sie von dort auf.');
    
        return;
    }

    var util_files_dir_data = new UtilFilesData();

    var absolute_file_url = getAbsUrlResultLayoutXmlFile();

    var relative_path_php_dir = './Php/';

    util_files_dir_data.setDataExecCaseFileExists(absolute_file_url, relative_path_php_dir, 
            callbackLayoutXmlFileExists, callbackLayoutXmlFileNotExists);

    UtilFiles.dirFileAnyCase(util_files_dir_data);

} // determinIfLayoutXmlFileExistsOnServer

// Callback function if the layout XML file exists on the server
function callbackLayoutXmlFileExists()
{
    debugCreateLayout('callbackLayoutXmlFileExists Enter');

    g_create_layout_xml_file_exists = true;

    createLayoutXmlObject();

} // callbackLayoutXmlFileExists

// Callback function if the layout XML file not exists on the server
// 1. Set the global variable g_create_layout_xml_file_exists to false
// 2. Display the button for creating a new layout XML file. 
//    Call of displayCreateNewXmlButton
function callbackLayoutXmlFileNotExists()
{
    debugCreateLayout('callbackLayoutXmlFileNotExists Enter');

    g_create_layout_xml_file_exists = false;

    displayCreateNewXmlButton();

} // callbackLayoutXmlFileNotExists

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Set Controls ////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Create Controls ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Create the controls for this application
function createLayoutCreateControls()
{
    debugCreateLayout('createLayoutCreateControls Enter');

    createHelpCreateLayoutButton();

    createItInfoCreateLayoutButton();

    createTextBoxResultDirectory();

    createLayoutXmlFileCreateButton();

} // createLayoutCreateControls


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

    g_create_layout_result_dir_text_box.setLabelText(" (auch der Server Ordner Name)");

    g_create_layout_result_dir_text_box.setLabelTextPositionRight();

    g_create_layout_result_dir_text_box.setSize("30");

    g_create_layout_result_dir_text_box.setReadOnlyFlag(false);

    g_create_layout_result_dir_text_box.setOninputFunctionName("onInputResultDirectory");

    g_create_layout_result_dir_text_box.setTitle("Name des Layouts und Name des Server Ordners für alle Layout-Dateien." 
        + "\nDer Server Ordner wird mit der App Reservation Neues Layout erstellt. "
        + "\nDer Schrift wird rot, wenn der Ordner nicht existiert. In diesem Fall bitte"
        + "\nzuerst Reservation Neues Layout starten und alle Layout Ordner erstellen."
    );

} // createTextBoxResultDirectory

// Creates the button that starts the creation of a new layout XML file
function createLayoutXmlFileCreateButton()
{
    g_layout_xml_file_create_button = new JazzButton('id_create_new_xml_button', getIdCreateNewXmlButton());

    g_layout_xml_file_create_button.setOnclickFunctionName("onClickCreateNewXmlFileButton");

    g_layout_xml_file_create_button.setCaption('Eine neue XML Datei erstellen');

     g_layout_xml_file_create_button.setLabelTextPositionLeft();

    g_layout_xml_file_create_button.setLabelText("Es gibt keine Layout XML Datei ");

    g_layout_xml_file_create_button.setWidth("210px");

    g_layout_xml_file_create_button.setTitle('Klick hier um eine neue Layout XML Datei zu erstellen. '+ 
        '\n ');

} // createLayoutXmlFileCreateButton

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

// Display the select layout elements container
function displaySelectContainer()
{
    getElementDivSelectLayoutElementsContainer().style.display = 'block';

} // displaySelectContainer

function hideSelectContainer()
{
    getElementDivSelectLayoutElementsContainer().style.display = 'none';

} // hideSelectContainer

function displayCreateNewXmlButton()
{
    getElementDivCreateNewXmlButton().style.display = 'block';

} // displayCreateNewXmlButton

function hideCreateNewXmlButton()
{
    getElementDivCreateNewXmlButton().style.display = 'none';

} // hideCreateNewXmlButton

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Display Functions ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Element Functions /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

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

// Returns the element result directory
function getElementDivResultDirectory()
{
    return document.getElementById(getIdResultDirectory());    

} // getElementDivResultDirectory

// Returns the id of the result directory element
function getIdResultDirectory()
{
    return 'id_create_layout_result_dir';

} // getIdResultDirectory

// Returns the element select layout elements container
function getElementDivSelectLayoutElementsContainer()
{
    return document.getElementById(getIdSelectLayoutElementsContainer());

} // getElementDivSelectLayoutElementsContainer

// Returns the id of the select layout elements container element
function getIdSelectLayoutElementsContainer()
{
    return 'id_div_select_layout_elements_container';

} // getIdSelectLayoutElementsContainer

// Returns the element create new XML button
function getElementDivCreateNewXmlButton()
{
    return document.getElementById(getIdCreateNewXmlButton());

} // getElementDivCreateNewXmlButton

// Returns the id of the create new XML button element
function getIdCreateNewXmlButton()
{
    return 'id_div_create_new_xml_button';

} // getIdCreateNewXmlButton

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Element Functions ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

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