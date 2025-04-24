// File: ReservationNewSeason.js
// Date: 2025-04-24
// Author: Gunnar Lidén

// Inhalt
// =============
//
// Main functions for the application reservation new season

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Global Parameters /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Main directory 
var g_layout_main_dir_text_box = null;

// Result directory where the generated HTML files and other files shall be stored
var g_layout_server_dir_text_box = null;

// Button for the generation of new season XML files
var g_xml_create_new_button = null;

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
//    Call of createReservationNewSeasonControls
// 3. Set the controls with data from local storage
//    Call of NewSeasonStorage.getLocal and setNewSeasonControls
function initReservationNewSeason()
{
    debugReservationNewSeason('initReservationNewSeason Enter');

    NewSeasonStorage.initLocal();

    createReservationNewSeasonControls();

    new_season_data = NewSeasonStorage.getLocal();

    setNewSeasonControls(new_season_data);

} // initReservationNewSeason

// Set the controls
function setNewSeasonControls(i_new_season_data)
{
    g_layout_main_dir_text_box.setValue(i_new_season_data.getMainDir());  

    g_layout_server_dir_text_box.setValue(i_new_season_data.getResultDir()); 

} // setNewSeasonControls

// Create the event program XML file
function execCreateEventProgramXmlFile()
{
    var input_data = getNewSeasonDataInput();

    if (!input_data.dataIsValid())
    {
        return;
    }

    var season_case = 'current';

    var main_dir = input_data.getMainDir(); //Reservation or ReservationLayout
   
    var result_dir = input_data.getResultDir();

    var sub_xml_dir = 'SaisonXML';

    var xml_filename = 'EventProgram.xml';

    var callback_fctn = callbackEventProgramCreated;

    var create_event_xml = new  SeasonToEventProgramXml(season_case, main_dir, result_dir, sub_xml_dir, xml_filename, callback_fctn);

} // execCreateEventProgramXmlFile

// 
function callbackEventProgramCreated()
{
    setNewSeasonLocalStorageData();

    alert("Event Program XML file created");

    //TODO createNewXmlEventFiles();

} // callbackEventProgramCreated

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Main Functions //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Event Functions ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////


// User clicked the create new event XML files button
function onClickOfXmlCreateNewButton()
{
    var input_data = getNewSeasonDataInput();

    if (!input_data.dataIsValid())
    {
        return;
    }

    execCreateEventProgramXmlFile();

}// onClickOfXmlCreateNewButton

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
///////////////////////// End Event Functions /////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Create Controls ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Creates all the controls for the application
function createReservationNewSeasonControls()
{
    createTextBoxMainDirectory();

    createTextBoxResultDirectory();

    createXmlCreateNewButton();

} // createReservationNewSeasonControls

// Create the text box for the organisation directory
function createTextBoxMainDirectory()
{
    g_layout_main_dir_text_box = new JazzTextBox("id_season_main_dir", 'id_div_season_main_dir');

    g_layout_main_dir_text_box.setLabelText("Reservation oder ReservationLayout");

    g_layout_main_dir_text_box.setLabelTextPositionAbove();

    g_layout_main_dir_text_box.setSize("30");

    g_layout_main_dir_text_box.setReadOnlyFlag(false);

    g_layout_main_dir_text_box.setTitle("Für Release Ordner Reservation eingeben");

} // createTextBoxMainDirectory

// Create the text box for the result server directory where generated files shall be stored
function createTextBoxResultDirectory()
{
    g_layout_server_dir_text_box = new JazzTextBox("id_season_result_dir", 'id_div_season_result_dir');

    g_layout_server_dir_text_box.setLabelText("Ordner für Konzertsaal");

    g_layout_server_dir_text_box.setLabelTextPositionAbove();

    g_layout_server_dir_text_box.setSize("30");

    g_layout_server_dir_text_box.setReadOnlyFlag(false);

    g_layout_server_dir_text_box.setTitle("Name des Server Ordners für den neuen Konzertsaal.");

} // createTextBoxResultDirectory

// Creates the XML create new button
function createXmlCreateNewButton()
{
    g_xml_create_new_button = new JazzButton('id_layout_button_xml_new', 'id_div_season_button_xml_new');

    g_xml_create_new_button.setOnclickFunctionName("onClickOfXmlCreateNewButton");

    g_xml_create_new_button.setCaption('Neue XML Dateien');

    g_xml_create_new_button.setLabelText("");

    g_xml_create_new_button.setWidth("140px");

    g_xml_create_new_button.setTitle('XML Event Dateien generieren und speichern');

} // createXmlCreateNewButton

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Create Controls /////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Debug Function ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Displays the input string in the debugger Console
function debugReservationNewSeason(i_msg_str)
{
    console.log(i_msg_str);

    UtilServer.appendDebugFile(i_msg_str, 'ReservationNewSeason');

} // debugReservationNewSeason

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Debug Function //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////