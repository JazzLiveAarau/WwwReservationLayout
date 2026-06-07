// File: ReservationCreateLayoutCashier.js
// Date: 2026-06-07
// Author: Gunnar Lidén

// Inhalt
// =============
//
// Cashier functions for the 'Create Layout' application

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Global Parameters /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// An instance of the class cashierData
var g_original_cashier_data = null;

// Get the original cashier data from the layout xml and return it as an object
function getOriginalCashierDataFromXml()
{
    return getCashierDataFromXml(g_layout_model.m_layout_xml);

} // getOriginalCashierDataFromXml

// Set the global variable for the active cashier data with the cashier data from the 
// layout model
function initActiveCashierData()
{
    debugCreateLayout('initActiveCashierData Enter');

    g_original_cashier_data = getOriginalCashierDataFromXml();

} // initActiveCashierData


// Global variable for the text box with the position of a cashier left upper corner
var g_cashier_position_left_textbox = null;

// Global variable for the text box with the position of a cashier top upper corner
var g_cashier_position_top_textbox = null;

// Global variable for the text box with the dimension image width of the cashier element
var g_cashier_dimension_width_textbox = null;

// Global variable for the text box with the dimension image height of the cashier element
var g_cashier_dimension_height_textbox = null;

// Global variable for the text box with the image URL for the cashier element
var g_cashier_image_url_textbox = null;

// Global variable for the button for saving the cashier data to the layout xml
var g_cashier_save_button = null;

// Global variable for the button for adding a cashier to the layout xml
var g_cashier_add_button = null;

// Global variable for the button for deleting a cashier from the layout xml
var g_cashier_delete_button = null;

// Global variable for the button for canceling a cashier from the layout xml
var g_cashier_cancel_button = null;

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
function onClickSaveCashierButton()
{
    debugCreateLayout('onClickSaveCashierButton Enter');

    g_layout_model.m_layout_xml.setCashierNodes(g_layout_model.m_cashier_data);

    var callback_function = xmlObjectSavedToServer;

    saveXmlObjectToServer(callback_function);

    displayStartPage();

} // onClickSaveCashierButton

// Event function for the click on the button for adding a cashier
function onClickAddCashierButton()
{
    debugCreateLayout('onClickAddCashierButton Enter');

    g_layout_model.addCashierData();

    g_layout_graphics.drawAllHtmlGraphics();

    displayStartPage();

} // onClickAddCashierButton

// Event function for the click on the button for deleting a cashier
function onClickDeleteCashierButton()
{
    debugCreateLayout('onClickDeleteCashierButton Enter');

    g_layout_model.deleteCashierData();

    g_layout_graphics.drawAllHtmlGraphics();

    displayStartPage();

} // onClickDeleteCashierButton

// Event function for the click on the button for canceling a cashier
function onClickCancelCashierButton()
{
    debugCreateLayout('onClickCancelCashierButton Enter');

    // g_layout_model.m_cashier_data = cloneCashierData(g_original_cashier_data);
    g_layout_model.m_cashier_data = g_original_cashier_data;

    g_layout_graphics.drawAllHtmlGraphics();

    displayStartPage();

} // onClickCancelCashierButton   

// Event function for the change of the text box for the position left of a cashier
function onChangeCashierPagePositionLeft()
{
    debugCreateLayout('onChangeCashierPagePositionLeft Enter');

    var new_value = g_cashier_page_position_left_textbox.getValue();

    g_layout_model.m_cashier_data.setUpperLeftX(new_value);

    g_layout_graphics.drawAllHtmlGraphics();

} // onChangeCashierPagePositionLeft

// Event function for the change of the text box for the position top of a cashier
function onChangeCashierPagePositionTop()
{
    debugCreateLayout('onChangeCashierPagePositionTop Enter');

    var new_value = g_cashier_page_position_top_textbox.getValue();

    g_layout_model.m_cashier_data.setUpperLeftY(new_value);

    g_layout_graphics.drawAllHtmlGraphics();

} // onChangeCashierPagePositionTop

// Event function for the change of the text box for the dimension image width of a cashier element
function onChangeCashierPageDimensionWidth()
{
    debugCreateLayout('onChangeCashierPageDimensionWidth Enter');

    var new_value = g_cashier_page_dimension_width_textbox.getValue();

    g_layout_model.m_cashier_data.setImageWidth(new_value);

    g_layout_graphics.drawAllHtmlGraphics();

} // onChangeCashierPageDimensionWidth

// Event function for the change of the text box for the dimension image height of a cashier element
function onChangeCashierPageDimensionHeight()
{
    debugCreateLayout('onChangeCashierPageDimensionHeight Enter');

    var new_value = g_cashier_page_dimension_height_textbox.getValue();

    g_layout_model.m_cashier_data.setImageHeight(new_value);

    g_layout_graphics.drawAllHtmlGraphics();

} // onChangeCashierPageDimensionHeight

// Event function for the change of the text box for the image URL of a cashier element
function onChangeCashierImageUrl()
{
    debugCreateLayout('onChangeCashierImageUrl Enter'); 

    var new_value = g_cashier_image_url_textbox.getValue();

    g_layout_model.m_cashier_data.setImage(new_value);

    g_layout_graphics.drawAllHtmlGraphics();

} // onChangeCashierImageUrl

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Event Functions /////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Set Controls //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Set the controls on the cashier page with the data from the active cashier object
// 1. Get the CashierData object from the layout model object
function setControlsForCashierPage()
{
    debugCreateLayout('setControlsForCashierPage Enter');

    var b_defined_cashier = g_layout_model.m_cashier_data.cashierIsDefined();

    if (b_defined_cashier)
    {
        displayElementDivCashierPagePosition();

        displayElementDivCashierPageDimension();

        displayElementDivCashierPageSaveButton();

        hideElementDivCashierPageAddButton();

        displayElementDivCashierPageDeleteButton();

        displayElementDivCashierPageText();
    }
    else
    {
        hideElementDivCashierPagePosition();

        hideElementDivCashierPageDimension();

        hideElementDivCashierPageSaveButton();

        displayElementDivCashierPageAddButton();

        hideElementDivCashierPageDeleteButton();

        hideElementDivCashierPageText();
    }

    g_cashier_page_position_left_textbox.setValue(g_layout_model.m_cashier_data.getUpperLeftX());

    g_cashier_page_position_top_textbox.setValue(g_layout_model.m_cashier_data.getUpperLeftY());

    g_cashier_page_dimension_width_textbox.setValue(g_layout_model.m_cashier_data.getImageWidth());

    g_cashier_page_dimension_height_textbox.setValue(g_layout_model.m_cashier_data.getImageHeight());

    g_cashier_image_url_textbox.setValue(g_layout_model.m_cashier_data.getImage());

} // setControlsForCashierPage

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Set Controls ////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Display Functions /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Display the cashier page and hide the other pages
function displayCashierPage()
{
    getElementDivStartPage().style.display = 'none';

    getElementDivTableGroupPage().style.display = 'none';

    getElementDivTablePage().style.display = 'none';

    getElementDivStagePage().style.display = 'none';

    getElementDivCashierPage().style.display = 'block';

} // displayCashierPage

// Display the cashier page position container
function displayElementDivCashierPagePosition()
{
    getElementDivCashierPagePosition().style.display = 'block';

} // displayElementDivCashierPagePosition

// Hide the cashier page position container
function hideElementDivCashierPagePosition()
{
    getElementDivCashierPagePosition().style.display = 'none';

} // hideElementDivCashierPagePosition

// Display the cashier page dimension container
function displayElementDivCashierPageDimension()
{
    getElementDivCashierPageDimension().style.display = 'block';

} // displayElementDivCashierPageDimension

// Hide the cashier page dimension container
function hideElementDivCashierPageDimension()
{
    getElementDivCashierPageDimension().style.display = 'none';

} // hideElementDivCashierPageDimension

// Display the cashier page text container
function displayElementDivCashierPageSaveButton()
{
    getElementDivCashierPageSaveButton().style.display = 'block';

} // displayElementDivCashierPageSaveButton

// Hide the cashier page save button
function hideElementDivCashierPageSaveButton()
{
    getElementDivCashierPageSaveButton().style.display = 'none';

} // hideElementDivCashierPageSaveButton

// Display the cashier page add button
function displayElementDivCashierPageAddButton()
{
    getElementDivCashierPageAddButton().style.display = 'block';

} // displayElementDivCashierPageAddButton

// Hide the cashier page add button
function hideElementDivCashierPageAddButton()
{
    getElementDivCashierPageAddButton().style.display = 'none';

} // hideElementDivCashierPageAddButton

// Display the cashier page delete button
function displayElementDivCashierPageDeleteButton()
{
    getElementDivCashierPageDeleteButton().style.display = 'block';

} // displayElementDivCashierPageDeleteButton

// Hide the cashier page delete button
function hideElementDivCashierPageDeleteButton()
{
    getElementDivCashierPageDeleteButton().style.display = 'none';

} // hideElementDivCashierPageDeleteButton

// Display the cashier page image URL container
function displayElementDivCashierPageImageUrl()
{
    getElementDivCashierPageImageUrl().style.display = 'block';

} // displayElementDivCashierPageText

// Hide the cashier page image URL container
function hideElementDivCashierPageImageUrl()
{
    getElementDivCashierPageImageUrl().style.display = 'none';

} // hideElementDivCashierPageImageUrl

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Display Functions ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Create Controls ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Create the text box for the left position of a cashier element on the cashier page
function createTextBoxCashierPagePositionLeft()
{
    g_cashier_page_position_left_textbox = new JazzTextBox("id_cashier_page_position_left", 'id_div_cashier_page_position_left');    

    g_cashier_page_position_left_textbox.setLabelText("Links ");

    g_cashier_page_position_left_textbox.setLabelTextPositionLeft();

    g_cashier_page_position_left_textbox.setSize("10");

    g_cashier_page_position_left_textbox.setReadOnlyFlag(false);

    g_cashier_page_position_left_textbox.setOninputFunctionName("onChangeCashierPagePositionLeft");

    g_cashier_page_position_left_textbox.setTitle("Kasse Position: Linke Ecke." + "\n ");

} // createTextBoxCashierPagePositionLeft

// Create the text box for the top position of a cashier element on the cashier page
function createTextBoxCashierPagePositionTop()
{
    g_cashier_page_position_top_textbox = new JazzTextBox("id_cashier_page_position_top", 'id_div_cashier_page_position_top');    

    g_cashier_page_position_top_textbox.setLabelText("Oben ");

    g_cashier_page_position_top_textbox.setLabelTextPositionLeft();

    g_cashier_page_position_top_textbox.setSize("10");

    g_cashier_page_position_top_textbox.setReadOnlyFlag(false);

    g_cashier_page_position_top_textbox.setOninputFunctionName("onChangeCashierPagePositionTop");

    g_cashier_page_position_top_textbox.setTitle("Kasse Position: Obere Ecke." + "\n ");

} // createTextBoxCashierPagePositionTop

// Create the text box for the width of a cashier image element on the cashier page
function createTextBoxCashierPageDimensionWidth()
{
    g_cashier_page_dimension_width_textbox = new JazzTextBox("id_cashier_page_dimension_width", 'id_div_cashier_page_dimension_width');

    g_cashier_page_dimension_width_textbox.setLabelText("Breite ");

    g_cashier_page_dimension_width_textbox.setLabelTextPositionLeft();

    g_cashier_page_dimension_width_textbox.setSize("10");

    g_cashier_page_dimension_width_textbox.setReadOnlyFlag(false);

    g_cashier_page_dimension_width_textbox.setOninputFunctionName("onChangeCashierPageDimensionWidth");

    g_cashier_page_dimension_width_textbox.setTitle("Kasse Dimension: Breite." + "\n ");

} // createTextBoxCashierPageDimensionWidth

// Create the text box for the height of a cashier image element on the cashier page
function createTextBoxCashierPageDimensionHeight()
{
    g_cashier_page_dimension_height_textbox = new JazzTextBox("id_cashier_page_dimension_height", 'id_div_cashier_page_dimension_height');

    g_cashier_page_dimension_height_textbox.setLabelText("Höhe ");

    g_cashier_page_dimension_height_textbox.setLabelTextPositionLeft();

    g_cashier_page_dimension_height_textbox.setSize("10");

    g_cashier_page_dimension_height_textbox.setReadOnlyFlag(false);

    g_cashier_page_dimension_height_textbox.setOninputFunctionName("onChangeCashierPageDimensionHeight");

    g_cashier_page_dimension_height_textbox.setTitle("Kasse Dimension: Höhe." + "\n ");

} // createTextBoxCashierPageDimensionHeight

// Create the text box for the image URL of a cashier element on the cashier page
function createTextBoxCashierImageUrl()
{
    g_cashier_image_url_textbox = new JazzTextBox("id_cashier_image_url", 'id_div_cashier_page_image_url');

    g_cashier_image_url_textbox.setLabelText("Bild URL ");

    g_cashier_image_url_textbox.setLabelTextPositionLeft();

    g_cashier_image_url_textbox.setSize("60");

    g_cashier_image_url_textbox.setReadOnlyFlag(false);

    g_cashier_image_url_textbox.setOninputFunctionName("onChangeCashierImageUrl");

    g_cashier_image_url_textbox.setTitle("Name und/oder Beschreibung der Bühne." + "\n ");

} // createTextBoxCashierImageUrl

// Creates the button for saving the changes of a stage
function createCashierSaveButton()
{
    g_cashier_save_button = new JazzButton('id_cashier_save_button', 'id_div_cashier_page_save_button');

    g_cashier_save_button.setOnclickFunctionName("onClickSaveCashierButton");

    g_cashier_save_button.setCaption('Speichern');

     g_cashier_save_button.setLabelTextPositionLeft();

    g_cashier_save_button.setLabelText("");

    g_cashier_save_button.setWidth("100px");

    g_cashier_save_button.setTitle('Klick hier um die Änderungen des Kassierers zu speichern. '+ 
        '\n ');

} // createCashierSaveButton

// Creates the button for adding a new cashier element to the layout
function createCashierAddButton()
{
    g_cashier_add_button = new JazzButton('id_cashier_add_button', 'id_div_cashier_page_add_button');

    g_cashier_add_button.setOnclickFunctionName("onClickAddCashierButton");

    g_cashier_add_button.setCaption('Hinzufügen');

     g_cashier_add_button.setLabelTextPositionLeft();

    g_cashier_add_button.setLabelText("");

    g_cashier_add_button.setWidth("100px");

    g_cashier_add_button.setTitle('Klick hier um einen neuen Kassierer hinzuzufügen. '+ 
        '\n ');

} // createCashierAddButton

// Creates the button for deleting a cashier element
function createCashierDeleteButton()
{
    g_cashier_delete_button = new JazzButton('id_cashier_delete_button', 'id_div_cashier_page_delete_button');

    g_cashier_delete_button.setOnclickFunctionName("onClickDeleteCashierButton");

    g_cashier_delete_button.setCaption('Löschen');

     g_cashier_delete_button.setLabelTextPositionLeft();

    g_cashier_delete_button.setLabelText("");

    g_cashier_delete_button.setWidth("100px");

    g_cashier_delete_button.setTitle('Klick hier um den Kassierer zu löschen. '+ 
        '\n ');

} // createCashierDeleteButton

// Creates the button for canceling the changes of a cashier element
function createCashierCancelButton()
{
    g_cashier_cancel_button = new JazzButton('id_cashier_cancel_button', 'id_div_cashier_page_cancel_button');

    g_cashier_cancel_button.setOnclickFunctionName("onClickCancelCashierButton");

    g_cashier_cancel_button.setCaption('Abbrechen');

     g_cashier_cancel_button.setLabelTextPositionLeft();

    g_cashier_cancel_button.setLabelText("");

    g_cashier_cancel_button.setWidth("100px");

    g_cashier_cancel_button.setTitle('Klick hier um die Änderungen des Kassierers abzubrechen. '+ 
        '\n ');

} // createCashierCancelButton

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Create Controls /////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Element Functions /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Returns the div element cashier page
function getElementDivCashierPage()
{
    return document.getElementById(getIdStagePage());    

} // getElementDivCashierPage

// Returns the id of the cashier page div element
function getIdCashierPage()
{
    return 'id_div_cashier_page';

} // getIdCashierPage

// Returns the div element cashier page position
function getElementDivCashierPagePosition()
{
    return document.getElementById(getIdDivCashierPagePosition());

} // getElementDivCashierPagePosition

// Returns the id of the div cashier page position element
function getIdDivCashierPagePosition()
{
    return 'id_div_cashier_page_position';

} // getIdDivCashierPagePosition

// Returns the div element cashier page dimension
function getElementDivCashierPageDimension()
{
    return document.getElementById(getIdDivCashierPageDimension());

} // getElementDivCashierPageDimension

// Returns the id of the div cashier page dimension element
function getIdDivCashierPageDimension()
{
    return 'id_div_cashier_page_dimension';

} // getIdDivCashierPageDimension

// Returns the div element cashier page save button
function getElementDivCashierPageSaveButton()
{
    return document.getElementById(getIdDivCashierPageSaveButton());

} // getElementDivCashierPageSaveButton

// Returns the id of the div cashier page save button element
function getIdDivCashierPageSaveButton()
{
    return 'id_div_cashier_page_save_button';

} // getIdDivCashierPageSaveButton

// Returns the div element cashier page add button
function getElementDivCashierPageAddButton()
{
    return document.getElementById(getIdDivCashierPageAddButton());

} // getElementDivCashierPageAddButton

// Returns the id of the div cashier page add button element
function getIdDivCashierPageAddButton()
{
    return 'id_div_cashier_page_add_button';

} // getIdDivCashierPageAddButton

// Returns the div element cashier page delete button
function getElementDivCashierPageDeleteButton()
{
    return document.getElementById(getIdDivCashierPageDeleteButton());

} // getElementDivCashierPageDeleteButton

// Returns the id of the div cashier page delete button element
function getIdDivCashierPageDeleteButton()
{
    return 'id_div_cashier_page_delete_button';

} // getIdDivCashierPageDeleteButton

// Returns the div element cashier page image URL
function getElementDivCashierPageImageUrl()
{
    return document.getElementById(getIdDivCashierPageImageUrl());

} // getElementDivCashierPageImageUrl

// Returns the id of the div cashier page image URL element
function getIdDivCashierPageImageUrl()
{
    return 'id_div_cashier_page_image_url';

} // getIdDivCashierPageImageUrl

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Element Functions ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////