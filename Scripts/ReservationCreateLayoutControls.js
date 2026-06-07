// File: ReservationCreateLayoutControls.js
// Date: 2026-06-07
// Author: Gunnar Lidén

// Inhalt
// =============
//
// Create control functions for the 'Create Layout' application

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Global Parameters /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////


// Global variables for the help button of the application
var g_help_create_layout_button = null;

// Global variables for the IT info button of the application
var g_it_info_create_layout_button = null;

// Global variable for the text box with the result server directory
var g_create_layout_main_dir = 'ReservationLayout/';

// Global variable for the layout element dropdown control
var g_drop_down_layout_element = null;

///////////////////////////////// Start Main Page /////////////////////////////////////////

// Global variable for the text box with the result server directory 
var g_create_layout_result_dir_text_box = null;

// Global variable for the button for creating a new layout XML file
var g_layout_xml_file_create_button = null;

///////////////////////////////// End Main Page ///////////////////////////////////////////


///////////////////////////////// Start Xyz Page ////////////////////////////////////



///////////////////////////////// End Xyz Page /////////////////////////////////////



///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Global Parameters ///////////////////////////////////////////
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

    createLayoutElementDropdown();

    createTextBoxTableGroupOneName();

    createTextBoxTableGroupTwoName();

    createTextBoxTableGroupThreeName();

    createTextBoxTableGroupFourName();

     createTextBoxTableGroupFiveName();

     createTextBoxTableGroupSixName();

     createTextBoxTableGroupOneText();

     createTextBoxTableGroupTwoText();

     createTextBoxTableGroupThreeText();

     createTextBoxTableGroupFourText();

     createTextBoxTableGroupFiveText();

     createTextBoxTableGroupSixText();

     createTableGroupSaveButton();

     createTableGroupCancelButton();

     createTextBoxTablePageNumberId();

     createTextBoxTablePagePositionLeft();

     createTextBoxTablePagePositionTop();

     createTextBoxTablePageDimensionWidth();

     createTextBoxTablePageDimensionHeight();

     createTextBoxTablePageNumberSeats();

     createPageNumberPlusButton();

     createPageNumberMinusButton();

     createTextBoxTablePageText();

     createTableSaveButton();

     createTableCancelButton();

     createTextBoxStagePagePositionLeft();

     createTextBoxStagePagePositionTop();

     createTextBoxStagePageDimensionWidth();

     createTextBoxStagePageDimensionHeight();

    createTextBoxStagePageText();

    createStageSaveButton();

    createStageAddButton();

    createStageDeleteButton();

    createStageCancelButton();

    createTextBoxCashierPagePositionLeft();

    createTextBoxCashierPagePositionTop();

    createTextBoxCashierPageDimensionWidth();

    createTextBoxCashierPageDimensionHeight();

    createTextBoxCashierImageUrl();

    createCashierSaveButton();

    createCashierAddButton();

    createCashierDeleteButton();

    createCashierCancelButton();

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

    g_create_layout_result_dir_text_box.setLabelText(" (auch der Server Ordner Name des Layouts)");

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

// Creates the layout element dropdown control
function createLayoutElementDropdown()
{
    g_drop_down_layout_element = new JazzDropdown('id_select_element_dropdown', 'id_div_select_element_dropdown');

    g_current_layout_element_number = 1;

    debugCreateLayout('createLayoutElementDropdown g_current_layout_element_number= ' + g_current_layout_element_number);

    var dummy_layout_element_array = [];
	dummy_layout_element_array[0] = 'Layout Element wählen';
	dummy_layout_element_array[1] = 'Layout Element 1 Not yet set';

    g_drop_down_layout_element.setNameArray(dummy_layout_element_array);

    g_drop_down_layout_element.setOnchangeFunctionName("eventSelectLayoutElementDropDown");

    g_drop_down_layout_element.setLabelText('Layout Element ');

    g_drop_down_layout_element.setLabelTextPositionLeft();

    g_drop_down_layout_element.setTitle('Layout Element wählen');

} // createLayoutElementDropdown

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Create Controls /////////////////////////////////////////////
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



// Returns the element result dir message
function getElementDivResultDirMessage()
{
    return document.getElementById(getIdDivResultDirMessage());

} // getElementDivResultDirMessage

// Returns the id of the result dir message element
function getIdDivResultDirMessage()
{
    return 'id_div_result_dir_message';

} // getIdDivResultDirMessage

// Returns the div element layout model view
function getElementDivLayoutModelView()
{
    return document.getElementById(getIdDivLayoutModelView());

} // getElementDivLayoutModelView

// Returns the id of the div layout model view element
function getIdDivLayoutModelView()
{
    return 'id_div_layout_model_view';

} // getIdDivLayoutModelView

// Returns the element debug page
function getElementDivDebugPage()
{
    return document.getElementById(getIdDivDebugPage());

} // getElementDivDebugPage

// Returns the id of the debug page element
function getIdDivDebugPage()
{
    return 'id_div_debug_page';

} // getIdDivDebugPage

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Element Functions ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////


