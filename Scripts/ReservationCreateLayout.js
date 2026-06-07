// File: ReservationCreateLayout.js
// Date: 2026-06-07
// Author: Gunnar Lidén

// Inhalt
// =============
//
// Main functions for the 'Create Layout' application

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Global Parameters /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Global variable for the layout model object an instance of the class LayoutModel
var g_layout_model = null;

// Global variable for the layout graphics object an instance of the class LayoutGraphics
var g_layout_graphics = null;




// Global variable for the layout XML object an instance of the class ReservationLayoutXml
var g_create_layout_xml = null;

// Global variable for the layout XML table object an instance of the class LayoutXmlTable
var g_layout_xml_table = null;

// Global variable selected element number in the dropdown control
var g_current_layout_element_number = -12345;

// Global variable active instance of the class Table
var g_active_table_object = null;

// Global variable if a table property was changed in the table page
var g_table_property_was_changed = false;


// Returns the abs URL to the layout result directory
function getAbsUrlToResultDir()
{
    var result_dir = g_create_layout_result_dir_text_box.getValue().trim();

    var ret_abs_dir_url = window.location.origin + '/' + g_create_layout_main_dir +result_dir + '/' + 'XML/';

    debugCreateLayout('getAbsUrlToResultDir ret_abs_dir_url= ' + ret_abs_dir_url);

    return  ret_abs_dir_url;

} // getAbsUrlToResultDir

// Returns the abs URL to the layout result XML file
function getAbsUrlResultLayoutXmlFile()
{
    var abs_url_to_result_dir = getAbsUrlToResultDir();

     var result_dir = g_create_layout_result_dir_text_box.getValue().trim();

    var ret_abs_file_url = abs_url_to_result_dir + result_dir + '.xml';

    debugCreateLayout('getAbsUrlResultLayoutXmlFile ret_abs_file_url= ' + ret_abs_file_url);

    return  ret_abs_file_url;

} // getAbsUrlResultLayoutXmlFile

// Global variable if the layout result directory exists on the server
var g_create_layout_result_dir_exists = false;

// Global variable if the layout XML file exists on the server
var g_create_layout_xml_file_exists = false;

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

    displayStartPage();

    hideSelectContainer();

    hideCreateNewXmlButton();

    hideDivResultDirMessage();

    NewSeasonStorage.initLocal();

    createLayoutCreateControls();

    var create_layout_data = NewSeasonStorage.getLocal();

    setLayoutCreateControls(create_layout_data);

    setLayoutElementDropdownControl();

    determinIfLayoutResultDirExistsOnServer();

} // initReservationCreateLayout

// Create an instance of the class ReservationLayoutXml
function createLayoutXmlObject()
{
    var organisation_directory_name = 'NotUsed';

    var result_dir = g_create_layout_result_dir_text_box.getValue().trim();

    debugCreateLayout('createLayoutXmlObject Result directory= ' + result_dir);

    g_create_layout_xml = new ReservationLayoutXml(callbackAfterLoadOfXmlLayout, organisation_directory_name, result_dir);   

} // createLayoutXmlObject

// Callback function after loading the layout XML file
function callbackAfterLoadOfXmlLayout()
{
    var result_dir = g_create_layout_result_dir_text_box.getValue().trim();

    debugCreateLayout("callbackAfterLoadOfXmlLayout Object created for the layout XML file \n/" + 
            result_dir + '/XML/' + result_dir + '.xml');

    // var pretty_print_win = g_create_layout_xml.prettyPrintWin();

    // var pretty_print_html = g_create_layout_xml.prettyPrintHtml();

    g_layout_xml_table = new LayoutXmlTable(g_create_layout_xml);

    displaySelectContainer();

    setLocalStorageData();

    g_layout_model = new LayoutModel(g_create_layout_xml);

    g_layout_graphics = new LayoutGraphics(g_layout_model, getElementDivLayoutModelView());

} // callbackAfterLoadOfXmlLayout

// Set the local storage data with the values from the result directory control
// The main directory for this application is always ReservationLayout.
function setLocalStorageData()
{
    var create_layout_data = new NewSeasonData();

    create_layout_data.setMainDir('ReservationLayout');

    var result_dir = g_create_layout_result_dir_text_box.getValue().trim();

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

    var help_url = 'https://jazzliveaarau.ch/Tasks/Documents/A0202.pdf';

    window.open(help_url,'_blank').focus();

} // onClickHelpButton

// Event function for the click on the IT info button
function onClickItInfoCreateLayoutButton()
{
    debugCreateLayout('onClickItInfoCreateLayoutButton Enter');

    var it_info_url = 'https://jazzliveaarau.ch/Tasks/Documents/A0203.pdf';

    window.open(it_info_url,'_blank').focus();

} // onClickItInfoCreateLayoutButton

// Event function for the input of the text box with the result server directory
function onInputResultDirectory()
{
    debugCreateLayout('onInputResultDirectory Value= ' + g_create_layout_result_dir_text_box.getValue().trim());

    determinIfLayoutResultDirExistsOnServer();

} // onInputResultDirectory

// Event function for the click on the button for creating a new layout XML file
function onClickCreateNewXmlFileButton()
{
    debugCreateLayout('onClickCreateNewXmlFileButton Enter');

    alert('onClickCreateNewXmlFileButton\nTODO Eine neue XML Datei erstellen' );

} // onClickCreateNewXmlFileButton

// User selected an event in the event dropdown
function eventSelectLayoutElementDropDown()
{
    var selected_event_option_number = g_drop_down_layout_element.getSelectOptionNumber();

    g_gurrent_layout_element_number = selected_event_option_number;

    debugCreateLayout('eventSelectLayoutElementDropDown g_gurrent_layout_element_number= ' + g_gurrent_layout_element_number);

    setAndOpenPageControlsForSelectedElement();

} // eventSelectLayoutElementDropDown

// Event function for the click on a table seat HTML element
function onClickHtmlElementTableSeat(i_seat_el)
{
    debugCreateLayout('onClickHtmlElementTableSeat Enter Seat ID= ' + i_seat_el.id);

    // TODO Implement the logic for handling the click on a table seat

} // onClickHtmlElementTableSeat

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Event Functions /////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Save Functions ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////


// Save the layout XML object to the server
// 1. Get the absolute URL to the layout XML file on the server. 
//    Call of getAbsUrlResultLayoutXmlFile
// 2. Call the saveFile function of the layout XML object 
//    Call of ReservationLayoutXml.saveFile
function saveXmlObjectToServer(i_callback_after_save_function_name)
{
    debugCreateLayout('saveXmlObjectToServer Enter');

    var url_abs = getAbsUrlResultLayoutXmlFile();

    //QQQ var pretty_print = g_layout_model.m_layout_xml.prettyPrintWin();

    g_layout_model.m_layout_xml.saveFile(url_abs, i_callback_after_save_function_name);
   
} // saveXmlObjectToServer

// Callback function after saving the layout XML object to the server
function xmlObjectSavedToServer()
{
    debugCreateLayout('xmlObjectSavedToServer File name= ' + getAbsUrlResultLayoutXmlFile());

    // TODO Implement the logic for handling the XML object after it has been saved to the server

} // xmlObjectSavedToServer

// Event execution function for the click on the button for saving a table
function execClickSaveTableToXmlObject()
{
    debugCreateLayout('execClickSaveTableToXmlObject Enter');

    g_layout_xml_table.setTableElementForTableNumberIdentity(g_active_table_object);

    // TODO Append booleans defined in g_active_table_object

} // execClickSaveTableToXmlObject


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Save Functions //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Set Controls //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Set the controls with data from the selected element in the layout element dropdown control
function setAndOpenPageControlsForSelectedElement()
{
    debugCreateLayout('setAndOpenPageControlsForSelectedElement g_gurrent_layout_element_number= ' + 
                        g_gurrent_layout_element_number);

    if (g_gurrent_layout_element_number == 1)
    {
        debugCreateLayout('setAndOpenPageControlsForSelectedElement Nothing was selected');
    }
    else if (g_gurrent_layout_element_number == 2)
    {
        debugCreateLayout('setAndOpenPageControlsForSelectedElement Group von Tischen selected');

        displayTableGroupPage();

        setControlsForTableGroup();
    }
    else if (g_gurrent_layout_element_number == 3)
    {
        debugCreateLayout('setAndOpenPageControlsForSelectedElement Tischeigenschaften selected');
    }
    else if (g_gurrent_layout_element_number == 4)
    {
        debugCreateLayout('setAndOpenPageControlsForSelectedElement Bühne selected');

        execClickStage();
    }
    else if (g_gurrent_layout_element_number == 5)
    {
        debugCreateLayout('setAndOpenPageControlsForSelectedElement Wände selected');
    }
    else
    {
        debugCreateLayout('setAndOpenPageControlsForSelectedElement Kein gültiges Layout Element ausgewählt');
    }

} // setAndOpenPageControlsForSelectedElement


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

    hideDivResultDirMessage();

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

    messageNotExistingLayout();

    hideSelectContainer();

    hideCreateNewXmlButton();

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

    hideCreateNewXmlButton();

    displaySelectContainer();

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

    hideSelectContainer();

} // callbackLayoutXmlFileNotExists

// Sets the layout element dropdown control with the layout element names from the layout element XML file
function setLayoutElementDropdownControl()
{
    debugCreateLayout('setLayoutElementDropdownControl Enter');

    var layout_element_array = [];

    layout_element_array[0] = 'Layout Element wählen';
    layout_element_array[1] = 'Gruppen von Tischen';
    layout_element_array[2] = 'Tischeigenschaften';
    layout_element_array[3] = 'Bühne';
    layout_element_array[4] = 'Wände';

    g_drop_down_layout_element.setNameArray(layout_element_array);

} // setLayoutElementDropdownControl


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Set Controls ////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Strings Messages //////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Display the message that the resutl directory does not exist. Create with application Reservation New Layout
function messageNotExistingLayout()
{
     displayDivResultDirMessage();
        
     getElementDivResultDirMessage().innerHTML = 
     "Dieses Layout existiert noch nicht. Bitte zuerst mit der App 'Reservation Neues Layout' das Layout " 
     + " (und den Ordner) erstellen.";

} // messageNotExistingLayout

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Strings Messages ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Display Functions /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Hide the result directory message
function hideDivResultDirMessage()
{
    getElementDivResultDirMessage().style.display = 'none';

} // hideDivResultDirMessage

// Display the result directory message
function displayDivResultDirMessage()
{
    getElementDivResultDirMessage().style.display = 'block';

} // displayDivResultDirMessage

// Display the start page and hide the other pages
function displayStartPage()
{
    getElementDivStartPage().style.display = 'block';

    getElementDivTableGroupPage().style.display = 'none';

    getElementDivTablePage().style.display = 'none';

    getElementDivStagePage().style.display = 'none';

    if (g_drop_down_layout_element != null) // If created
    {
        g_drop_down_layout_element.setSelectOptionNumber(1);
    }

} // displayStartPage

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

// Display the debug page
function displayDebugPage()
{
    getElementDivDebugPage().style.display = 'block';

} // displayDebugPage

// Hide the debug page
function hideDebugPage()
{
    getElementDivDebugPage().style.display = 'none';

} // hideDebugPage

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Display Functions ///////////////////////////////////////////
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