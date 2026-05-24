// File: ReservationCreateLayoutControls.js
// Date: 2026-05-24
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


///////////////////////////////// Start TableGroup Page ////////////////////////////////////

// Global variable for the text box with the name of a table group one
var g_table_group_one_name_text_box = null;

// Global variable for the text box with the name of a table group two
var g_table_group_two_name_text_box = null;

// Global variable for the text box with the name of a table group three
var g_table_group_three_name_text_box = null;

// Global variable for the text box with the name of a table group four
var g_table_group_four_name_text_box = null;

// Global variable for the text box with the name of a table group five
var g_table_group_five_name_text_box = null;

// Global variable for the text box with the name of a table group six
var g_table_group_six_name_text_box = null;

// Global variable for the text box with the text of a table group one
var g_table_group_one_text_textbox = null;

// Global variable for the text box with the text of a table group two
var g_table_group_two_text_textbox = null;

// Global variable for the text box with the text of a table group three
var g_table_group_three_text_textbox = null;

// Global variable for the text box with the text of a table group four
var g_table_group_four_text_textbox = null;

// Global variable for the text box with the text of a table group five
var g_table_group_five_text_textbox = null;

// Global variable for the text box with the text of a table group six
var g_table_group_six_text_textbox = null;

// Global variable for the button for saving a table group
var g_table_group_save_button = null;

// Global variable for the button for canceling a table group
var g_table_group_cancel_button = null;

///////////////////////////////// End TableGroup Page /////////////////////////////////////


///////////////////////////////// Start Table Page /////////////////////////////////////////

// Global variable for the text box with the number id of a table
var g_table_page_number_id_textbox = null;

// Global variable for the text box with the position of a table left upper corner
var g_table_page_position_left_textbox = null;

// Global variable for the text box with the position of a table top upper corner
var g_table_page_position_top_textbox = null;

// Global variable for the text box with the dimension width of a table
//QQ var g_table_page_dimension_width_text = null;

// Global variable for the text box with the dimension height of a table
var g_table_page_dimension_height_text = null;

// Global variable for the text box with the number id of a table
var g_table_page_dimension_width_textbox = null;

// Global variable for the text box with the dimension height of a table
var g_table_page_dimension_height_textbox = null;

// Global variable for the text box with the number of seats of a table
var g_table_page_number_seats_textbox = null;

// Global variable for the plus button for the number of seats in the table page
var g_table_page_number_plus_button = null;

// Global variable for the minus button for the number of seats in the table page
var g_table_page_number_minus_button = null;

// Global variable for the text box with the text of a table
var g_table_page_text_textbox = null;

// Global variable for the button for saving a table
var g_table_save_button = null;

// Global variable for the button for canceling a table
var g_table_cancel_button = null;

///////////////////////////////// End Table Page ///////////////////////////////////////////


///////////////////////////////// Start Stage Page /////////////////////////////////////////

// Global variable for the text box with the position of a stage left upper corner
var g_stage_page_position_left_textbox = null;

// Global variable for the text box with the position of a stage top upper corner
var g_stage_page_position_top_textbox = null;

// Global variable for the text box with the dimension width of a stage
var g_stage_page_dimension_width_textbox = null;

// Global variable for the text box with the dimension height of a stage
var g_stage_page_dimension_height_textbox = null;

// Global variable for the text box with the text of a stage
var g_stage_page_text_textbox = null;

// Global variable for the button for saving a stage
var g_stage_save_button = null;

// Global variable for the button for adding a stage
var g_stage_add_button = null;

// Global variable for the button for deleting a stage
var g_stage_delete_button = null;

// Global variable for the button for canceling a stage
var g_stage_cancel_button = null;

///////////////////////////////// End Stage Page //////////////////////////////////////////

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

// Creates the button for saving the changes of a table group
function createTableGroupSaveButton()
{
    g_table_group_save_button = new JazzButton('id_table_group_save_button', 'id_div_table_group_save_button');

    g_table_group_save_button.setOnclickFunctionName("onClickSaveTableGroupButton");

    g_table_group_save_button.setCaption('Speichern');

     g_table_group_save_button.setLabelTextPositionLeft();

    g_table_group_save_button.setLabelText("");

    g_table_group_save_button.setWidth("100px");

    g_table_group_save_button.setTitle('Klick hier um die Änderungen der Tabellen-Gruppe zu speichern. '+ 
        '\n ');

} // createTableGroupSaveButton

// Creates the button for canceling the changes of a table group
function createTableGroupCancelButton()
{
    g_table_group_cancel_button = new JazzButton('id_table_group_cancel_button', 'id_div_table_group_cancel_button');

    g_table_group_cancel_button.setOnclickFunctionName("onClickCancelTableGroupButton");

    g_table_group_cancel_button.setCaption('Abbrechen');

     g_table_group_cancel_button.setLabelTextPositionLeft();

    g_table_group_cancel_button.setLabelText("");

    g_table_group_cancel_button.setWidth("100px");

    g_table_group_cancel_button.setTitle('Klick hier um die Änderungen der Tabellen-Gruppe abzubrechen. '+ 
        '\n ');

} // createTableGroupCancelButton

// Creates the button for saving the changes of a table
function createTableSaveButton()
{
    g_table_save_button = new JazzButton('id_table_save_button', 'id_div_table_save_button');

    g_table_save_button.setOnclickFunctionName("onClickSaveTableButton");

    g_table_save_button.setCaption('Übernehmen');

     g_table_save_button.setLabelTextPositionLeft();

    g_table_save_button.setLabelText("");

    g_table_save_button.setWidth("100px");

    g_table_save_button.setTitle('Klick hier um die Änderungen des Tisches zu übernehmen. '+ 
        '\n ');

} // createTableSaveButton

// Creates the button for canceling the changes of a table
function createTableCancelButton()
{
    g_table_cancel_button = new JazzButton('id_table_cancel_button', 'id_div_table_cancel_button');

    g_table_cancel_button.setOnclickFunctionName("onClickCancelTableButton");

    g_table_cancel_button.setCaption('Abbrechen');

     g_table_cancel_button.setLabelTextPositionLeft();

    g_table_cancel_button.setLabelText("");

    g_table_cancel_button.setWidth("100px");

    g_table_cancel_button.setTitle('Klick hier um die Änderungen der Tabelle abzubrechen. '+ 
        '\n ');

} // createTableCancelButton

// Create the text box for the name of a table group one
function createTextBoxTableGroupOneName()
{
    g_table_group_one_name_text_box = new JazzTextBox("id_table_group_one_left_name", 'id_div_table_group_one_left_name');

    g_table_group_one_name_text_box.setLabelText("Name");

    g_table_group_one_name_text_box.setLabelTextPositionAbove();

    g_table_group_one_name_text_box.setSize("30");

    g_table_group_one_name_text_box.setReadOnlyFlag(false);

    g_table_group_one_name_text_box.setTitle("Name der Tabellen-Gruppe eingeben oder ändern." + "\n ");

} // createTextBoxTableGroupOneName

// Create the text box for the name of a table group two
function createTextBoxTableGroupTwoName()
{
    g_table_group_two_name_text_box = new JazzTextBox("id_table_group_two_left_name", 'id_div_table_group_two_left_name');

    g_table_group_two_name_text_box.setLabelText("Name");

    g_table_group_two_name_text_box.setLabelTextPositionAbove();

    g_table_group_two_name_text_box.setSize("30");

    g_table_group_two_name_text_box.setReadOnlyFlag(false);

    g_table_group_two_name_text_box.setTitle("Name der Tabellen-Gruppe eingeben oder ändern." + "\n ");

} // createTextBoxTableGroupTwoName

// Create the text box for the name of a table group three
function createTextBoxTableGroupThreeName()
{
    g_table_group_three_name_text_box = new JazzTextBox("id_table_group_three_left_name", 'id_div_table_group_three_left_name');

    g_table_group_three_name_text_box.setLabelText("Name");

    g_table_group_three_name_text_box.setLabelTextPositionAbove();

    g_table_group_three_name_text_box.setSize("30");

    g_table_group_three_name_text_box.setReadOnlyFlag(false);

    g_table_group_three_name_text_box.setTitle("Name der Tabellen-Gruppe eingeben oder ändern." + "\n ");

} // createTextBoxTableGroupThreeName

// Create the text box for the name of a table group four
function createTextBoxTableGroupFourName()
{
    g_table_group_four_name_text_box = new JazzTextBox("id_table_group_four_left_name", 'id_div_table_group_four_left_name');

    g_table_group_four_name_text_box.setLabelText("Name");

    g_table_group_four_name_text_box.setLabelTextPositionAbove();

    g_table_group_four_name_text_box.setSize("30");

    g_table_group_four_name_text_box.setReadOnlyFlag(false);

    g_table_group_four_name_text_box.setTitle("Name der Tabellen-Gruppe eingeben oder ändern." + "\n ");

} // createTextBoxTableGroupFourName

// Create the text box for the name of a table group five
function createTextBoxTableGroupFiveName()
{
    g_table_group_five_name_text_box = new JazzTextBox("id_table_group_five_left_name", 'id_div_table_group_five_left_name');

    g_table_group_five_name_text_box.setLabelText("Name");

    g_table_group_five_name_text_box.setLabelTextPositionAbove();

    g_table_group_five_name_text_box.setSize("30");

    g_table_group_five_name_text_box.setReadOnlyFlag(false);

    g_table_group_five_name_text_box.setTitle("Name der Tabellen-Gruppe eingeben oder ändern." + "\n ");

} // createTextBoxTableGroupFiveName

// Create the text box for the name of a table group six
function createTextBoxTableGroupSixName()
{
    g_table_group_six_name_text_box = new JazzTextBox("id_table_group_six_left_name", 'id_div_table_group_six_left_name');

    g_table_group_six_name_text_box.setLabelText("Name");

    g_table_group_six_name_text_box.setLabelTextPositionAbove();

    g_table_group_six_name_text_box.setSize("30");

    g_table_group_six_name_text_box.setReadOnlyFlag(false);

    g_table_group_six_name_text_box.setTitle("Name der Tabellen-Gruppe eingeben oder ändern." + "\n ");

} // createTextBoxTableGroupSixName

// Create the text box for the text of a table group one
function createTextBoxTableGroupOneText()
{
    g_table_group_one_text_textbox = new JazzTextBox("id_table_group_one_left_text", 'id_div_table_group_one_left_text');

    g_table_group_one_text_textbox.setLabelText("Text");

    g_table_group_one_text_textbox.setLabelTextPositionAbove();

    g_table_group_one_text_textbox.setSize("30");

    g_table_group_one_text_textbox.setReadOnlyFlag(false);

    g_table_group_one_text_textbox.setTitle("Text der Tabellen-Gruppe eingeben oder ändern." + "\n ");

} // createTextBoxTableGroupOneText

// Create the text box for the text of a table group two
function createTextBoxTableGroupTwoText()
{
    g_table_group_two_text_textbox = new JazzTextBox("id_table_group_two_left_text", 'id_div_table_group_two_left_text');

    g_table_group_two_text_textbox.setLabelText("Text");

    g_table_group_two_text_textbox.setLabelTextPositionAbove();

    g_table_group_two_text_textbox.setSize("30");

    g_table_group_two_text_textbox.setReadOnlyFlag(false);

    g_table_group_two_text_textbox.setTitle("Text der Tabellen-Gruppe eingeben oder ändern." + "\n ");

} // createTextBoxTableGroupTwoText

// Create the text box for the text of a table group three
function createTextBoxTableGroupThreeText()
{
    g_table_group_three_text_textbox = new JazzTextBox("id_table_group_three_left_text", 'id_div_table_group_three_left_text');

    g_table_group_three_text_textbox.setLabelText("Text");

    g_table_group_three_text_textbox.setLabelTextPositionAbove();

    g_table_group_three_text_textbox.setSize("30");

    g_table_group_three_text_textbox.setReadOnlyFlag(false);

    g_table_group_three_text_textbox.setTitle("Text der Tabellen-Gruppe eingeben oder ändern." + "\n ");

} // createTextBoxTableGroupThreeText

// Create the text box for the text of a table group four
function createTextBoxTableGroupFourText()
{
    g_table_group_four_text_textbox = new JazzTextBox("id_table_group_four_left_text", 'id_div_table_group_four_left_text');

    g_table_group_four_text_textbox.setLabelText("Text");

    g_table_group_four_text_textbox.setLabelTextPositionAbove();

    g_table_group_four_text_textbox.setSize("30");

    g_table_group_four_text_textbox.setReadOnlyFlag(false);

    g_table_group_four_text_textbox.setTitle("Text der Tabellen-Gruppe eingeben oder ändern." + "\n ");

} // createTextBoxTableGroupFourText

// Create the text box for the text of a table group five
function createTextBoxTableGroupFiveText()
{
    g_table_group_five_text_textbox = new JazzTextBox("id_table_group_five_left_text", 'id_div_table_group_five_left_text');

    g_table_group_five_text_textbox.setLabelText("Text");

    g_table_group_five_text_textbox.setLabelTextPositionAbove();

    g_table_group_five_text_textbox.setSize("30");

    g_table_group_five_text_textbox.setReadOnlyFlag(false);

    g_table_group_five_text_textbox.setTitle("Text der Tabellen-Gruppe eingeben oder ändern." + "\n ");

} // createTextBoxTableGroupFiveText

// Create the text box for the text of a table group six
function createTextBoxTableGroupSixText()
{
    g_table_group_six_text_textbox = new JazzTextBox("id_table_group_six_left_text", 'id_div_table_group_six_left_text');

    g_table_group_six_text_textbox.setLabelText("Text");

    g_table_group_six_text_textbox.setLabelTextPositionAbove();

    g_table_group_six_text_textbox.setSize("30");

    g_table_group_six_text_textbox.setReadOnlyFlag(false);

    g_table_group_six_text_textbox.setTitle("Text der Tabellen-Gruppe eingeben oder ändern." + "\n ");

} // createTextBoxTableGroupSixText

// Create the text box for the number ID of a table
function createTextBoxTablePageNumberId()
{
    g_table_page_number_id_textbox = new JazzTextBox("id_table_page_number_id", 'id_div_table_page_number_id');

    g_table_page_number_id_textbox.setLabelText("Tisch Nummer (Identität) ");

    g_table_page_number_id_textbox.setLabelTextPositionLeft();

    g_table_page_number_id_textbox.setSize("30");

    g_table_page_number_id_textbox.setReadOnlyFlag(false);

    g_table_page_number_id_textbox.setOninputFunctionName("onChangeTableProperty");

    g_table_page_number_id_textbox.setTitle("Tisch Nummer (eine Identität, die auch ein String sein kann). "+
        "\nMuss eine eindeutige Identität sein." + "\n ");

} // createTextBoxTablePageNumberId

// Create the text box for the left position of a table on the table page
function createTextBoxTablePagePositionLeft()
{
    g_table_page_position_left_textbox = new JazzTextBox("id_table_page_position_left", 'id_div_table_page_position_left');    

    g_table_page_position_left_textbox.setLabelText("Links ");

    g_table_page_position_left_textbox.setLabelTextPositionLeft();

    g_table_page_position_left_textbox.setSize("10");

    g_table_page_position_left_textbox.setReadOnlyFlag(false);

    g_table_page_position_left_textbox.setOninputFunctionName("onChangeTableProperty");

    g_table_page_position_left_textbox.setTitle("Tisch Position: Linke Ecke." + "\n ");

} // createTextBoxTablePagePositionLeft

// Create the text box for the top position of a table on the table page
function createTextBoxTablePagePositionTop()
{
    g_table_page_position_top_textbox = new JazzTextBox("id_table_page_position_top", 'id_div_table_page_position_top');    

    g_table_page_position_top_textbox.setLabelText("Oben ");

    g_table_page_position_top_textbox.setLabelTextPositionLeft();

    g_table_page_position_top_textbox.setSize("10");

    g_table_page_position_top_textbox.setReadOnlyFlag(false);

    g_table_page_position_top_textbox.setOninputFunctionName("onChangeTableProperty");

    g_table_page_position_top_textbox.setTitle("Tisch Position: Obere Ecke." + "\n ");

} // createTextBoxTablePagePositionTop

// Create the text box for the width of a table on the table page
function createTextBoxTablePageDimensionWidth()
{
    g_table_page_dimension_width_textbox = new JazzTextBox("id_table_page_dimension_width", 'id_div_table_page_dimension_width');

    g_table_page_dimension_width_textbox.setLabelText("Breite ");

    g_table_page_dimension_width_textbox.setLabelTextPositionLeft();

    g_table_page_dimension_width_textbox.setSize("10");

    g_table_page_dimension_width_textbox.setReadOnlyFlag(false);

    g_table_page_dimension_width_textbox.setOninputFunctionName("onChangeTableProperty");

    g_table_page_dimension_width_textbox.setTitle("Tisch Dimension: Breite." + "\n ");

} // createTextBoxTablePageDimensionWidth

// Create the text box for the height of a table on the table page
function createTextBoxTablePageDimensionHeight()
{
    g_table_page_dimension_height_textbox = new JazzTextBox("id_table_page_dimension_height", 'id_div_table_page_dimension_height');

    g_table_page_dimension_height_textbox.setLabelText("Höhe ");

    g_table_page_dimension_height_textbox.setLabelTextPositionLeft();

    g_table_page_dimension_height_textbox.setSize("10");

    g_table_page_dimension_height_textbox.setReadOnlyFlag(false);

    g_table_page_dimension_height_textbox.setOninputFunctionName("onChangeTableProperty");

    g_table_page_dimension_height_textbox.setTitle("Tisch Dimension: Höhe." + "\n ");

} // createTextBoxTablePageDimensionHeight

// Create the text box for the number of seats of a table on the table page
function createTextBoxTablePageNumberSeats()
{
    g_table_page_number_seats_textbox = new JazzTextBox("id_table_page_number_seats", 'id_div_table_page_number_seats');

    g_table_page_number_seats_textbox.setLabelText("Anzahl Plätze ");

    g_table_page_number_seats_textbox.setLabelTextPositionLeft();

    g_table_page_number_seats_textbox.setSize("2");

    g_table_page_number_seats_textbox.setReadOnlyFlag(true);

    g_table_page_number_seats_textbox.setOninputFunctionName("onChangeTableProperty");

    g_table_page_number_seats_textbox.setTitle("Anzahl Plätze an dem Tisch." + "\n ");

} // createTextBoxTablePageNumberSeats

// Creates the button for increasing the number of seats of a table
function createPageNumberPlusButton()
{
    g_table_page_number_plus_button = new JazzButton('id_table_page_number_plus_button', 'id_div_table_page_number_plus_button');

    g_table_page_number_plus_button.setOnclickFunctionName("onClickPageNumberPlusButton");

    g_table_page_number_plus_button.setCaption('+');

    g_table_page_number_plus_button.setLabelTextPositionLeft();

    g_table_page_number_plus_button.setLabelText("");

    g_table_page_number_plus_button.setWidth("30px");

    g_table_page_number_plus_button.setTitle('Klick hier um die Anzahl der Plätze zu erhöhen. '+ 
        '\n ');

    g_table_page_number_plus_button.setClass("cl_table_page_number_button");

} // createPageNumberPlusButton

// Creates the button for decreasing the number of seats of a table
function createPageNumberMinusButton()
{
    g_table_page_number_minus_button = new JazzButton('id_table_page_number_minus_button', 'id_div_table_page_number_minus_button');

    g_table_page_number_minus_button.setOnclickFunctionName("onClickPageNumberMinusButton");

    g_table_page_number_minus_button.setCaption('-');

    g_table_page_number_minus_button.setLabelTextPositionLeft();

    g_table_page_number_minus_button.setLabelText("");

    g_table_page_number_minus_button.setWidth("30px");

    g_table_page_number_minus_button.setTitle('Klick hier um die Anzahl der Plätze zu verringern. '+ 
        '\n ');

    g_table_page_number_minus_button.setClass("cl_table_page_number_button");

} // createPageNumberMinusButton

// Create the text box for the text of a table on the table page
function createTextBoxTablePageText()
{
    g_table_page_text_textbox = new JazzTextBox("id_table_page_text", 'id_div_table_page_text');

    g_table_page_text_textbox.setLabelText("Text ");

    g_table_page_text_textbox.setLabelTextPositionLeft();

    g_table_page_text_textbox.setSize("60");

    g_table_page_text_textbox.setReadOnlyFlag(false);

    g_table_page_text_textbox.setOninputFunctionName("onChangeTableProperty");

    g_table_page_text_textbox.setTitle("Beschreibung des Tisches." + "\n ");

} // createTextBoxTablePageText





// Create the text box for the left position of a table on the table page
function createTextBoxStagePagePositionLeft()
{
    g_stage_page_position_left_textbox = new JazzTextBox("id_stage_page_position_left", 'id_div_stage_page_position_left');    

    g_stage_page_position_left_textbox.setLabelText("Links ");

    g_stage_page_position_left_textbox.setLabelTextPositionLeft();

    g_stage_page_position_left_textbox.setSize("10");

    g_stage_page_position_left_textbox.setReadOnlyFlag(false);

    g_stage_page_position_left_textbox.setOninputFunctionName("onChangeTableProperty");

    g_stage_page_position_left_textbox.setTitle("Tisch Position: Linke Ecke." + "\n ");

} // createTextBoxStagePagePositionLeft

// Create the text box for the top position of a table on the table page
function createTextBoxStagePagePositionTop()
{
    g_stage_page_position_top_textbox = new JazzTextBox("id_stage_page_position_top", 'id_div_stage_page_position_top');    

    g_stage_page_position_top_textbox.setLabelText("Oben ");

    g_stage_page_position_top_textbox.setLabelTextPositionLeft();

    g_stage_page_position_top_textbox.setSize("10");

    g_stage_page_position_top_textbox.setReadOnlyFlag(false);

    g_stage_page_position_top_textbox.setOninputFunctionName("onChangeTableProperty");

    g_stage_page_position_top_textbox.setTitle("Tisch Position: Obere Ecke." + "\n ");

} // createTextBoxStagePagePositionTop

// Create the text box for the width of a table on the table page
function createTextBoxStagePageDimensionWidth()
{
    g_stage_page_dimension_width_textbox = new JazzTextBox("id_stage_page_dimension_width", 'id_div_stage_page_dimension_width');

    g_stage_page_dimension_width_textbox.setLabelText("Breite ");

    g_stage_page_dimension_width_textbox.setLabelTextPositionLeft();

    g_stage_page_dimension_width_textbox.setSize("10");

    g_stage_page_dimension_width_textbox.setReadOnlyFlag(false);

    g_stage_page_dimension_width_textbox.setOninputFunctionName("onChangeTableProperty");

    g_stage_page_dimension_width_textbox.setTitle("Tisch Dimension: Breite." + "\n ");

} // createTextBoxStagePageDimensionWidth

// Create the text box for the height of a table on the stage page
function createTextBoxStagePageDimensionHeight()
{
    g_stage_page_dimension_height_textbox = new JazzTextBox("id_stage_page_dimension_height", 'id_div_stage_page_dimension_height');

    g_stage_page_dimension_height_textbox.setLabelText("Höhe ");

    g_stage_page_dimension_height_textbox.setLabelTextPositionLeft();

    g_stage_page_dimension_height_textbox.setSize("10");

    g_stage_page_dimension_height_textbox.setReadOnlyFlag(false);

    g_stage_page_dimension_height_textbox.setOninputFunctionName("onChangeTableProperty");

    g_stage_page_dimension_height_textbox.setTitle("Tisch Dimension: Höhe." + "\n ");

} // createTextBoxStagePageDimensionHeight

// Create the text box for the text of a stage on the stage page
function createTextBoxStagePageText()
{
    g_stage_page_text_textbox = new JazzTextBox("id_stage_page_text", 'id_div_stage_page_text');

    g_stage_page_text_textbox.setLabelText("Text ");

    g_stage_page_text_textbox.setLabelTextPositionLeft();

    g_stage_page_text_textbox.setSize("60");

    g_stage_page_text_textbox.setReadOnlyFlag(false);

    //QQQ g_stage_page_text_textbox.setOninputFunctionName("onChangeTableProperty");

    g_stage_page_text_textbox.setTitle("Name und/oder Beschreibung der Bühne." + "\n ");

} // createTextBoxStagePageText

// Creates the button for saving the changes of a stage
function createStageSaveButton()
{
    g_stage_save_button = new JazzButton('id_stage_save_button', 'id_div_stage_page_save_button');

    g_stage_save_button.setOnclickFunctionName("onClickSaveStageButton");

    g_stage_save_button.setCaption('Speichern');

     g_stage_save_button.setLabelTextPositionLeft();

    g_stage_save_button.setLabelText("");

    g_stage_save_button.setWidth("100px");

    g_stage_save_button.setTitle('Klick hier um die Änderungen der Bühne zu speichern. '+ 
        '\n ');

} // createStageSaveButton

// Creates the button for adding a new stage
function createStageAddButton()
{
    g_stage_add_button = new JazzButton('id_stage_add_button', 'id_div_stage_page_add_button');

    g_stage_add_button.setOnclickFunctionName("onClickAddStageButton");

    g_stage_add_button.setCaption('Hinzufügen');

     g_stage_add_button.setLabelTextPositionLeft();

    g_stage_add_button.setLabelText("");

    g_stage_add_button.setWidth("100px");

    g_stage_add_button.setTitle('Klick hier um eine neue Bühne hinzuzufügen. '+ 
        '\n ');

} // createStageAddButton

// Creates the button for deleting a stage
function createStageDeleteButton()
{
    g_stage_delete_button = new JazzButton('id_stage_delete_button', 'id_div_stage_page_delete_button');

    g_stage_delete_button.setOnclickFunctionName("onClickDeleteStageButton");

    g_stage_delete_button.setCaption('Löschen');

     g_stage_delete_button.setLabelTextPositionLeft();

    g_stage_delete_button.setLabelText("");

    g_stage_delete_button.setWidth("100px");

    g_stage_delete_button.setTitle('Klick hier um die Bühne zu löschen. '+ 
        '\n ');

} // createStageDeleteButton

// Creates the button for canceling the changes of a stage
function createStageCancelButton()
{
    g_stage_cancel_button = new JazzButton('id_stage_cancel_button', 'id_div_stage_page_cancel_button');

    g_stage_cancel_button.setOnclickFunctionName("onClickCancelStageButton");

    g_stage_cancel_button.setCaption('Abbrechen');

     g_stage_cancel_button.setLabelTextPositionLeft();

    g_stage_cancel_button.setLabelText("");

    g_stage_cancel_button.setWidth("100px");

    g_stage_cancel_button.setTitle('Klick hier um die Änderungen der Bühne abzubrechen. '+ 
        '\n ');

} // createStageCancelButton


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

// Returns the div element stage page
function getElementDivStagePage()
{
    return document.getElementById(getIdStagePage());    

} // getElementDivStagePage

// Returns the id of the stage page div element
function getIdStagePage()
{
    return 'id_div_stage_page';

} // getIdStagePage

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


// Returns the element table group one container
function getElementDivTableGroupOneContainer()
{
    return document.getElementById(getIdDivTableGroupOneContainer());

} // getElementDivTableGroupOneContainer

// Returns the id of the table group one container element
function getIdDivTableGroupOneContainer()
{
    return 'id_div_table_group_one_container';

} // getIdDivTableGroupOneContainer

// Returns the element table group two container
function getElementDivTableGroupTwoContainer()
{
    return document.getElementById(getIdDivTableGroupTwoContainer());

} // getElementDivTableGroupTwoContainer

// Returns the id of the table group two container element
function getIdDivTableGroupTwoContainer()
{
    return 'id_div_table_group_two_container';

} // getIdDivTableGroupTwoContainer

// Returns the element table group three container
function getElementDivTableGroupThreeContainer()
{
    return document.getElementById(getIdDivTableGroupThreeContainer());

} // getElementDivTableGroupThreeContainer

// Returns the id of the table group three container element
function getIdDivTableGroupThreeContainer()
{
    return 'id_div_table_group_three_container';

} // getIdDivTableGroupThreeContainer

// Returns the element table group four container
function getElementDivTableGroupFourContainer()
{
    return document.getElementById(getIdDivTableGroupFourContainer());

} // getElementDivTableGroupFourContainer

// Returns the id of the table group four container element
function getIdDivTableGroupFourContainer()
{
    return 'id_div_table_group_four_container'; 

} // getIdDivTableGroupFourContainer

// Returns the element table group five container
function getElementDivTableGroupFiveContainer()
{
    return document.getElementById(getIdDivTableGroupFiveContainer());

} // getElementDivTableGroupFiveContainer

// Returns the id of the table group five container element
function getIdDivTableGroupFiveContainer()
{
    return 'id_div_table_group_five_container';

} // getIdDivTableGroupFiveContainer

// Returns the element table group six container
function getElementDivTableGroupSixContainer()
{
    return document.getElementById(getIdDivTableGroupSixContainer());

} // getElementDivTableGroupSixContainer

// Returns the id of the table group six container element
function getIdDivTableGroupSixContainer()
{
    return 'id_div_table_group_six_container';

} // getIdDivTableGroupSixContainer

// Returns the element table group one right container
function getElementDivTableGroupOneRightContainer()
{
    return document.getElementById(getIdDivTableGroupOneRightContainer());

} // getElementDivTableGroupOneRightContainer

// Returns the id of the table group one right container element
function getIdDivTableGroupOneRightContainer()
{
    return 'id_div_table_group_one_right_container';

} // getIdDivTableGroupOneRightContainer

// Returns the element table group two right container
function getElementDivResultDirMessage()
{
    return document.getElementById(getIdDivResultDirMessage());

} // getElementDivResultDirMessage

// Returns the id of the result dir message element
function getIdDivResultDirMessage()
{
    return 'id_div_result_dir_message';

} // getIdDivResultDirMessage

// Returns the element table group two right container
function getTablesContainer(i_table_group_number)
{
    //"id_div_table_group_one_right_container"
    var start_container_id_str = 'id_div_table_group_';

    var end_container_id_str = '_right_container';

    if (1 == i_table_group_number)
    {
        return document.getElementById(start_container_id_str + 'one' + end_container_id_str);
    }
    else if (2 == i_table_group_number)
    {
        return document.getElementById(start_container_id_str + 'two' + end_container_id_str);
    }
    else if (3 == i_table_group_number)
    {
        return document.getElementById(start_container_id_str + 'three' + end_container_id_str);
    }
    else if (4 == i_table_group_number)
    {
        return document.getElementById(start_container_id_str + 'four' + end_container_id_str);
    }
    else if (5 == i_table_group_number)
    {
        return document.getElementById(start_container_id_str + 'five' + end_container_id_str);
    }
    else if (6 == i_table_group_number)
    {
        return document.getElementById(start_container_id_str + 'six' + end_container_id_str);
    }
    else
    {
        debugCreateLayout('getTablesContainer No table group container for table group number= ' + i_table_group_number);

        alert('getTablesContainer\nKeine Tabellen-Gruppe für die Nummer= ' + i_table_group_number + 
            '\nEs gibt nur sechs Tabellen-Gruppen. Bitte überprüfe die Nummer der Tabellen-Gruppe.');

        return null;
    }


} // getTablesContainer

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

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Element Functions ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////


