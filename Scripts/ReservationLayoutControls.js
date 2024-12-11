// File: ReservationLayoutControls.js
// Date: 2024-12-11
// Authors: Gunnar Lidén

// Content
// =======
//
// Functions creating the controls of the application
//
// All labels and tooltips are defined in this file

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Global Parameters /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Result directory where the generated HTML files and other files shall be stored
var g_layout_server_dir_text_box = null;

// The reservation layout save button
var g_layout_save_button = null;

// The reservation layout cancel button
var g_layout_cancel_button = null;

// The XML create new events button
var g_xml_create_new_button = null;

// The XML import events button
var g_xml_event_import_button = null;

// The reservation layout premises size button
var g_layout_premises_size_button = null;

// The reservation layout stage definition button
var g_layout_stage_definition_button = null;

// The reservation layout table color button
var g_layout_table_color_button = null;

// The reservation layout cashier desk button
var g_layout_cashier_desk_button = null;

// The reservation layout rectangular table dropdown
var g_rectangular_table_dropdown = null;

// The reservation layout round table dropdown
var g_round_table_dropdown = null;

// The reservation layout premises door dropdown
var g_premises_door_dropdown = null;

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Global Parameters ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Create Controls ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Creates all the controls for the application
function createReservationLayoutControls()
{
    createTextBoxResultDirectory();

    createLayoutSaveButton();

    createLayoutCancelButton();

    createXmlCreateNewButton();

    createXmlImportButton();

    createLayoutPremisesSizeButton();

    createLayoutStageDefinitionButton();

    createLayoutTableColorButton();

    createCashierDeskButton();

    createRectangularTableDropdown();

    createRoundTableDropdown();

    createPremisesDoorDropdown();

} // createResrvationLayoutControls

// Create the text box for the result server directory where generated files shall be stored
function createTextBoxResultDirectory()
{
    g_layout_server_dir_text_box = new JazzTextBox("id_layout_result_dir", 'id_div_layout_result_dir');

    g_layout_server_dir_text_box.setLabelText("Ordner für Konzertsaal");

    g_layout_server_dir_text_box.setLabelTextPositionAbove();

    g_layout_server_dir_text_box.setSize("30");

    g_layout_server_dir_text_box.setReadOnlyFlag(false);

    g_layout_server_dir_text_box.setTitle("Name des Server Ordners für den neuen Konzertsaal.");

} // createTextBoxResultDirectory

// Creates the reservation layout save button
function createLayoutSaveButton()
{
    g_layout_save_button = new JazzButton('id_layout_button_save', 'id_div_layout_button_save');

    g_layout_save_button.setOnclickFunctionName("onClickOfLayoutSaveButton");

    g_layout_save_button.setCaption('Speichern');

    g_layout_save_button.setLabelText("");

    g_layout_save_button.setTitle('Layout Dateien generieren und speichern');

} // createLayoutSaveButton

// Creates the reservation layout cancel button
function createLayoutCancelButton()
{
    g_layout_cancel_button = new JazzButton('id_layout_button_cancel', 'id_div_layout_button_cancel');

    g_layout_cancel_button.setOnclickFunctionName("onClickOfLayoutCancelButton");

    g_layout_cancel_button.setCaption('Abbrechen');

    g_layout_cancel_button.setLabelText("");

    g_layout_cancel_button.setTitle('Abbrechen');

} // createLayoutCancelButton

// Creates the XML create new button
function createXmlCreateNewButton()
{
    g_xml_create_new_button = new JazzButton('id_layout_button_xml_new', 'id_div_layout_button_xml_new');

    g_xml_create_new_button.setOnclickFunctionName("onClickOfXmlCreateNewButton");

    g_xml_create_new_button.setCaption('Neue XML Dateien');

    g_xml_create_new_button.setLabelText("");

    g_xml_create_new_button.setWidth("140px");

    g_xml_create_new_button.setTitle('XML Event Dateien generieren und speichern');

} // createXmlCreateNewButton

// Creates the XML import_events button
function createXmlImportButton()
{
    g_xml_event_import_button = new JazzButton('id_layout_button_xml_import', 'id_div_layout_button_xml_import');

    g_xml_event_import_button.setOnclickFunctionName("onClickOfXmlImportButton");

    g_xml_event_import_button.setCaption('Import XML Dateien');

    g_xml_event_import_button.setLabelText("");

    g_xml_event_import_button.setWidth("150px");

    g_xml_event_import_button.setTitle('XML Event Dateien importieren');

} // createXmlImportButton

// Creates the reservation layout premises size button
function createLayoutPremisesSizeButton()
{
    g_layout_premises_size_button = new JazzButton('id_layout_button_one', 'id_div_layout_button_one');

    g_layout_premises_size_button.setOnclickFunctionName("onClickOfLayoutPremisesSizeButton");

    g_layout_premises_size_button.setCaption('Lokalgrösse');

    g_layout_premises_size_button.setLabelText("");

    g_layout_premises_size_button.setTitle('Grösse des Lokals');

} // createLayoutPremisesSizeButton

// Creates the reservation layout stage definition button
function createLayoutStageDefinitionButton()
{
    g_layout_stage_definition_button = new JazzButton('id_layout_button_two', 'id_div_layout_button_two');

    g_layout_stage_definition_button.setOnclickFunctionName("onClickOfLayoutStageDefinitionButton");

    g_layout_stage_definition_button.setCaption('Bühne');

    g_layout_stage_definition_button.setLabelText("");

    g_layout_stage_definition_button.setTitle('Defintion der Bühne');

} // createLayoutStageDefinitionButton

// Creates the reservation layout table color button
function createLayoutTableColorButton()
{
    g_layout_table_color_button = new JazzButton('id_layout_button_three', 'id_div_layout_button_three');

    g_layout_table_color_button.setOnclickFunctionName("onClickOfLayoutTableColorButton");

    g_layout_table_color_button.setCaption('Tischfarbe');

    g_layout_table_color_button.setLabelText("");

    g_layout_table_color_button.setTitle('Tischfarbe');

} // createLayoutTableColorButton

// Creates the reservation layout cashier desk button
function createCashierDeskButton()
{
    g_layout_cashier_desk_button = new JazzButton('id_layout_button_four', 'id_div_layout_button_four');

    g_layout_cashier_desk_button.setOnclickFunctionName("onClickOfCashierDeskButton");

    g_layout_cashier_desk_button.setCaption('Kasse');

    g_layout_cashier_desk_button.setLabelText("");

    g_layout_cashier_desk_button.setTitle('Tisch für die Kasse definieren');

} // createCashierDeskButton

// Creates the layout rectangular table dropdown
function createRectangularTableDropdown()
{
    g_rectangular_table_dropdown = new JazzDropdown('id_rectangular_table_dropdown', 'id_div_rectangular_table_dropdown');

    var rectangular_table_array = [];
	
	rectangular_table_array[0] = 'Rechteckiger Tisch 1';
	
	rectangular_table_array[1] = 'Rechteckiger Tisch 2';

    g_rectangular_table_dropdown.setAppendString('Neuer rechteckigen Tisch');

    g_rectangular_table_dropdown.setNameArray(rectangular_table_array);

    g_rectangular_table_dropdown.setOnchangeFunctionName("eventSelectRectangularTableDropdown");

    g_rectangular_table_dropdown.setLabelText('Rechteckige Tische');

    g_rectangular_table_dropdown.setLabelTextPositionAbove();

    g_rectangular_table_dropdown.setTitle('Rechteckige Tische');

    g_rectangular_table_dropdown.setSelectOptionNumber(rectangular_table_array.length + 1);

} // createRectangularTableDropdown

// Creates the layout round table dropdown
function createRoundTableDropdown()
{
    g_round_table_dropdown = new JazzDropdown('id_round_table_dropdown', 'id_div_round_table_dropdown');

    var round_table_array = [];
	
	round_table_array[0] = 'Runder Tisch 1';
	
	round_table_array[1] = 'Runder Tisch 2';

    g_round_table_dropdown.setAppendString('Neuer runden Tisch');

    g_round_table_dropdown.setNameArray(round_table_array);

    g_round_table_dropdown.setOnchangeFunctionName("eventSelectRoundTableDropdown");

    g_round_table_dropdown.setLabelText('Runde Tische');

    g_round_table_dropdown.setLabelTextPositionAbove();

    g_round_table_dropdown.setTitle('Runde Tische');

    g_round_table_dropdown.setSelectOptionNumber(round_table_array.length + 1);

} // createRoundTableDropdown

// Creates the layout premises door dropdown
function createPremisesDoorDropdown()
{
    g_premises_door_dropdown = new JazzDropdown('id_premises_door_dropdown', 'id_div_premises_door_dropdown');

    var premises_door_array = [];
	
	premises_door_array[0] = 'Tür 1';
	
	premises_door_array[1] = 'Tür 2';

    g_premises_door_dropdown.setAppendString('Neuer Tür');

    g_premises_door_dropdown.setNameArray(premises_door_array);

    g_premises_door_dropdown.setOnchangeFunctionName("eventSelectPremisesDoorDropdown");

    g_premises_door_dropdown.setLabelText('Türe');

    g_premises_door_dropdown.setLabelTextPositionAbove();

    g_premises_door_dropdown.setTitle('Türe');

    g_premises_door_dropdown.setSelectOptionNumber(premises_door_array.length + 1);


} // createPremisesDoorDropdown

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Create Controls /////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////