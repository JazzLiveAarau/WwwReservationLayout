// File: ReservationCreateLayoutStage.js
// Date: 2026-05-26
// Author: Gunnar Lidén

// Inhalt
// =============
//
// Stage functions for the 'Create Layout' application

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Global Parameters /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// An instance of the class stageData
var g_original_stage_data = null;

// Creates a copy of a StageData object.
// The clone keeps the class prototype and references to layout XML,
// but gets its own primitive values and bounding box instance.
function cloneStageData(i_stage_data)
{
    if (i_stage_data == null)
    {
        return null;
    }

    var ret_stage_data = Object.assign(
        Object.create(Object.getPrototypeOf(i_stage_data)),
        i_stage_data
    );

    ret_stage_data.setBoundingBox();

    return ret_stage_data;

} // cloneStageData

function getOriginalStageDataFromXml()
{
    return getStageDataFromXml(g_layout_model.m_layout_xml);
}

// Set the global variable for the active stage data with the stage data from the 
// layout model
function initActiveStageData()
{
    debugCreateLayout('initActiveStageData Enter');

    // g_original_stage_data = cloneStageData(g_layout_model.m_stage_data);

    g_original_stage_data = getOriginalStageDataFromXml();

} // initActiveStageData



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

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Global Parameters //////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Event Functions ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Event function for the click on the button for saving a stage
// 1. Set the stage nodes in the layout XML with the stage data from the layout model
// 2. Save the layout XML to the server. Call of saveXmlObjectToServer
// 3. Display the start page. Call of displayStartPage
function onClickSaveStageButton()
{
    debugCreateLayout('onClickSaveStageButton Enter');

    g_layout_model.m_layout_xml.setStageNodes(g_layout_model.m_stage_data);

    var callback_function = xmlObjectSavedToServer;

    saveXmlObjectToServer(callback_function);

    displayStartPage();

} // onClickSaveStageButton

// Event function for the click on the button for adding a stage
function onClickAddStageButton()
{
    debugCreateLayout('onClickAddStageButton Enter');

    g_layout_model.addStageData();

    g_layout_graphics.drawAllHtmlGraphics();

    displayStartPage();

} // onClickAddStageButton

// Event function for the click on the button for deleting a stage
function onClickDeleteStageButton()
{
    debugCreateLayout('onClickDeleteStageButton Enter');

    g_layout_model.deleteStageData();

    g_layout_graphics.drawAllHtmlGraphics();

    displayStartPage();

} // onClickDeleteStageButton

// Event function for the click on the button for canceling a stage
function onClickCancelStageButton()
{
    debugCreateLayout('onClickCancelStageButton Enter');

    // g_layout_model.m_stage_data = cloneStageData(g_original_stage_data);
    g_layout_model.m_stage_data = g_original_stage_data;

    g_layout_graphics.drawAllHtmlGraphics();

    displayStartPage();

} // onClickCancelStageButton   

// Event function for the change of the text box for the position left of a stage
function onChangeStagePositionLeft()
{
    debugCreateLayout('onChangeStagePositionLeft Enter');

    var new_value = g_stage_page_position_left_textbox.getValue();

    g_layout_model.m_stage_data.setUpperLeftX(new_value);

    g_layout_graphics.drawAllHtmlGraphics();

} // onChangeStagePositionLeft

//
function onChangeStagePositionTop()
{
    debugCreateLayout('onChangeStagePositionTop Enter');

    var new_value = g_stage_page_position_top_textbox.getValue();

    g_layout_model.m_stage_data.setUpperLeftY(new_value);

    g_layout_graphics.drawAllHtmlGraphics();

} // onChangeStagePositionTop

// Event function for the change of the text box for the dimension width of a stage
function onChangeStageDimensionWidth()
{
    debugCreateLayout('onChangeStageDimensionWidth Enter');

    var new_value = g_stage_page_dimension_width_textbox.getValue();

    g_layout_model.m_stage_data.setWidth(new_value);

    g_layout_graphics.drawAllHtmlGraphics();

} // onChangeStageDimensionWidth

// Event function for the change of the text box for the dimension height of a stage
function onChangeStageDimensionHeight()
{
    debugCreateLayout('onChangeStageDimensionHeight Enter');

    var new_value = g_stage_page_dimension_height_textbox.getValue();

    g_layout_model.m_stage_data.setHeight(new_value);

    g_layout_graphics.drawAllHtmlGraphics();

} // onChangeStageDimensionHeight

// Event function for the change of the text box for the text of a stage
function onChangeStageText()
{
    debugCreateLayout('onChangeStageText Enter');

    var new_value = g_stage_page_text_textbox.getValue();

    g_layout_model.m_stage_data.setText(new_value);

    g_layout_graphics.drawAllHtmlGraphics();

} // onChangeStageText

function onClickHtmlElementStage()
{
    debugCreateLayout('onClickHtmlElementStage Enter');

    execClickStage();

} // onClickHtmlElementStage

// Execute when the user selects a stage in the dropdown or clicks on the stage HTML element
function execClickStage()
{
    debugCreateLayout('execClickStage Enter');

    displayStagePage();

    initActiveStageData();

    setControlsForStagePage();

} // execClickStage

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Event Functions /////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Save Functions ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Save Functions //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Set Controls //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Set the controls on the stage page with the data from the active stage object
// 1. Get the StageData object from the layout model object
function setControlsForStagePage()
{
    debugCreateLayout('setControlsForStagePage Enter');

    var b_defined_stage = g_layout_model.m_stage_data.stageIsDefined();

    if (b_defined_stage)
    {
        displayElementDivStagePagePosition();

        displayElementDivStagePageDimension();

        displayElementDivStagePageSaveButton();

        hideElementDivStagePageAddButton();

        displayElementDivStagePageDeleteButton();

        displayElementDivStagePageText();
    }
    else
    {
        hideElementDivStagePagePosition();

        hideElementDivStagePageDimension();

        hideElementDivStagePageSaveButton();

        displayElementDivStagePageAddButton();

        hideElementDivStagePageDeleteButton();

        hideElementDivStagePageText();
    }

    g_stage_page_position_left_textbox.setValue(g_layout_model.m_stage_data.getUpperLeftX());

    g_stage_page_position_top_textbox.setValue(g_layout_model.m_stage_data.getUpperLeftY());

    g_stage_page_dimension_width_textbox.setValue(g_layout_model.m_stage_data.getWidth());

    g_stage_page_dimension_height_textbox.setValue(g_layout_model.m_stage_data.getHeight());

    g_stage_page_text_textbox.setValue(g_layout_model.m_stage_data.getText());

} // setControlsForStagePage

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Set Controls ////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Display Functions /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Display the stage page and hide the other pages
function displayStagePage()
{
    getElementDivStartPage().style.display = 'none';

    getElementDivTableGroupPage().style.display = 'none';

    getElementDivTablePage().style.display = 'none';

    getElementDivStagePage().style.display = 'block';

} // displayStagePage

// Display the stage page position container
function displayElementDivStagePagePosition()
{
    getElementDivStagePagePosition().style.display = 'block';

} // displayElementDivStagePagePosition

// Hide the stage page position container
function hideElementDivStagePagePosition()
{
    getElementDivStagePagePosition().style.display = 'none';

} // hideElementDivStagePagePosition

// Display the stage page dimension container
function displayElementDivStagePageDimension()
{
    getElementDivStagePageDimension().style.display = 'block';

} // displayElementDivStagePageDimension

// Hide the stage page dimension container
function hideElementDivStagePageDimension()
{
    getElementDivStagePageDimension().style.display = 'none';

} // hideElementDivStagePageDimension

// Display the stage page text container
function displayElementDivStagePageSaveButton()
{
    getElementDivStagePageSaveButton().style.display = 'block';

} // displayElementDivStagePageSaveButton

// Hide the stage page save button
function hideElementDivStagePageSaveButton()
{
    getElementDivStagePageSaveButton().style.display = 'none';

} // hideElementDivStagePageSaveButton

// Display the stage page add button
function displayElementDivStagePageAddButton()
{
    getElementDivStagePageAddButton().style.display = 'block';

} // displayElementDivStagePageAddButton

// Hide the stage page add button
function hideElementDivStagePageAddButton()
{
    getElementDivStagePageAddButton().style.display = 'none';

} // hideElementDivStagePageAddButton

// Display the stage page delete button
function displayElementDivStagePageDeleteButton()
{
    getElementDivStagePageDeleteButton().style.display = 'block';

} // displayElementDivStagePageDeleteButton

// Hide the stage page delete button
function hideElementDivStagePageDeleteButton()
{
    getElementDivStagePageDeleteButton().style.display = 'none';

} // hideElementDivStagePageDeleteButton

// Display the stage page text container
function displayElementDivStagePageText()
{
    getElementDivStagePageText().style.display = 'block';

} // displayElementDivStagePageText

// Hide the stage page text container
function hideElementDivStagePageText()
{
    getElementDivStagePageText().style.display = 'none';

} // hideElementDivStagePageText

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Display Functions ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Create Controls ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Create the text box for the left position of a table on the table page
function createTextBoxStagePagePositionLeft()
{
    g_stage_page_position_left_textbox = new JazzTextBox("id_stage_page_position_left", 'id_div_stage_page_position_left');    

    g_stage_page_position_left_textbox.setLabelText("Links ");

    g_stage_page_position_left_textbox.setLabelTextPositionLeft();

    g_stage_page_position_left_textbox.setSize("10");

    g_stage_page_position_left_textbox.setReadOnlyFlag(false);

    g_stage_page_position_left_textbox.setOninputFunctionName("onChangeStagePositionLeft");

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

    g_stage_page_position_top_textbox.setOninputFunctionName("onChangeStagePositionTop");

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

    g_stage_page_dimension_width_textbox.setOninputFunctionName("onChangeStageDimensionWidth");

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

    g_stage_page_dimension_height_textbox.setOninputFunctionName("onChangeStageDimensionHeight");

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

    g_stage_page_text_textbox.setOninputFunctionName("onChangeStageText");

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

// Returns the div element stage page position
function getElementDivStagePagePosition()
{
    return document.getElementById(getIdDivStagePagePosition());

} // getElementDivStagePagePosition

// Returns the id of the div stage page position element
function getIdDivStagePagePosition()
{
    return 'id_div_stage_page_position';

} // getIdDivStagePagePosition

// Returns the div element stage page dimension
function getElementDivStagePageDimension()
{
    return document.getElementById(getIdDivStagePageDimension());

} // getElementDivStagePageDimension

// Returns the id of the div stage page dimension element
function getIdDivStagePageDimension()
{
    return 'id_div_stage_page_dimension';

} // getIdDivStagePageDimension

// Returns the div element stage page save button
function getElementDivStagePageSaveButton()
{
    return document.getElementById(getIdDivStagePageSaveButton());

} // getElementDivStagePageSaveButton

// Returns the id of the div stage page save button element
function getIdDivStagePageSaveButton()
{
    return 'id_div_stage_page_save_button';

} // getIdDivStagePageSaveButton

// Returns the div element stage page add button
function getElementDivStagePageAddButton()
{
    return document.getElementById(getIdDivStagePageAddButton());

} // getElementDivStagePageAddButton

// Returns the id of the div stage page add button element
function getIdDivStagePageAddButton()
{
    return 'id_div_stage_page_add_button';

} // getIdDivStagePageAddButton

// Returns the div element stage page delete button
function getElementDivStagePageDeleteButton()
{
    return document.getElementById(getIdDivStagePageDeleteButton());

} // getElementDivStagePageDeleteButton

// Returns the id of the div stage page delete button element
function getIdDivStagePageDeleteButton()
{
    return 'id_div_stage_page_delete_button';

} // getIdDivStagePageDeleteButton

// Returns the div element stage page text
function getElementDivStagePageText()
{
    return document.getElementById(getIdDivStagePageText());

} // getElementDivStagePageText

// Returns the id of the div stage page text element
function getIdDivStagePageText()
{
    return 'id_div_stage_page_text';

} // getIdDivStagePageText

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Element Functions ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////


