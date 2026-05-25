// File: ReservationCreateLayout.js
// Date: 2026-05-25
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

// Event function for the click on the button for saving a table group
function onClickSaveTableGroupButton()
{
    debugCreateLayout('onClickSaveTableGroupButton Enter');

    displayStartPage();

} // onClickSaveTableGroupButton

// Event function for the click on the button for canceling a table group
function onClickCancelTableGroupButton()
{
    debugCreateLayout('onClickCancelTableGroupButton Enter');

    displayStartPage();

} // onClickCancelTableGroupButton

// Event function for the click on the button for saving a table
function onClickSaveTableButton()
{
    debugCreateLayout('onClickSaveTableButton Enter');

    execClickSaveTableToXmlObject();

    displayTableGroupPage();

} // onClickSaveTableButton

// Event function for the click on the button for canceling a table
function onClickCancelTableButton()
{
    debugCreateLayout('onClickCancelTableButton Enter');

    displayTableGroupPage();

} // onClickCancelTableButton

// Event function for the click on a table in the group container
function clickTableInGroupContainer(this_table_div)
{
    debugCreateLayout('clickTableInGroupContainer Enter');

    var table_number_id = this_table_div.id;

    debugCreateLayout('clickTableInGroupContainer table_number_id= ' + table_number_id);

    displayTablePage();

    setControlsOnTablePage(table_number_id);

} // clickTableInGroupContainer

// Event function for the change of a table property in the table page
function onChangeTableProperty()
{
    debugCreateLayout('onChangeTableProperty The user changed a table property in the table page');

     g_table_property_was_changed = true;

} // onChangeTableProperty

// Event function for the click on a table seat in the table page
function onClickTableSeat(i_seat_id)
{
    debugCreateLayout('onClickTableSeat Seat id= ' + i_seat_id);

    onChangeTableProperty();

    execClickTableSeat(i_seat_id);

} // onClickTableSeat

// Event function for the click on the plus button for the number of seats in the table page
function onClickPageNumberPlusButton()
{
    debugCreateLayout('onClickPageNumberPlusButton Enter');

    onChangeTableProperty();

    execPageNumberPlusButton();

} // onClickPageNumberPlusButton

// Event function for the click on the minus button for the number of seats in the table page
function onClickPageNumberMinusButton()
{
    debugCreateLayout('onClickPageNumberMinusButton Enter');

    onChangeTableProperty();

    execPageNumberMinusButton();

} // onClickPageNumberMinusButton

// Event function for the click on the button for saving a stage
function onClickSaveStageButton()
{
    debugCreateLayout('onClickSaveStageButton Enter');

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

    displayStartPage();

} // onClickCancelStageButton   

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Event Functions /////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Save Functions ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

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

        displayStagePage();

        setControlsForStagePage();
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

// Set the controls for the table group page with the data from the selected table group
function setControlsForTableGroup()
{
    debugCreateLayout('setControlsForTableGroup Enter');

    var layout_xml_table = new LayoutXmlTable(g_create_layout_xml);

    var table_group_array = layout_xml_table.getTableGroupArray();

    var delta_height_for_table = getDeltaHeightForTable(table_group_array);

    var n_table_groups = table_group_array.length;

    debugCreateLayout('setControlsForTableGroup table_group_array.length= ' + n_table_groups);

    if (n_table_groups >= 1)
    {
        displayTableGroupOneContainer();

        var table_group_one = table_group_array[0];

        // TODO g_table_group_one_name_text_box.setValue(table_group_one.getName());

        g_table_group_one_text_textbox.setValue(table_group_one.getText());

        var i_table_group_number = 1;
        displayTablesInGroupContainer(table_group_one, i_table_group_number, delta_height_for_table);
    }
    else
    {
        // debugCreateLayout('setControlsForTableGroup No table group one in the layout XML file');

        hideTableGroupOneContainer();
    }

    if (n_table_groups >= 2)
    {
        displayTableGroupTwoContainer();

        var table_group_two = table_group_array[1];

        // TODO g_table_group_two_name_text_box.setValue(table_group_two.getName());

        g_table_group_two_text_textbox.setValue(table_group_two.getText());

        var i_table_group_number = 2;
        displayTablesInGroupContainer(table_group_two, i_table_group_number, delta_height_for_table);

    }
    else
    {
        // debugCreateLayout('setControlsForTableGroup No table group two in the layout XML file');

        hideTableGroupTwoContainer();
    }

    if (n_table_groups >= 3)
    {
        displayTableGroupThreeContainer();

        var table_group_three = table_group_array[2];

        // TODO g_table_group_three_name_text_box.setValue(table_group_three.getName());

        g_table_group_three_text_textbox.setValue(table_group_three.getText());

        var i_table_group_number = 3;
        displayTablesInGroupContainer(table_group_three, i_table_group_number, delta_height_for_table);
    }
    else
    {
        // debugCreateLayout('setControlsForTableGroup No table group three in the layout XML file');

        hideTableGroupThreeContainer();
    }

    if (n_table_groups >= 4)
    {
        displayTableGroupFourContainer();

        var table_group_four = table_group_array[3];

        // TODO g_table_group_four_name_text_box.setValue(table_group_four.getName());

        g_table_group_four_text_textbox.setValue(table_group_four.getText());

        var i_table_group_number = 4;
        displayTablesInGroupContainer(table_group_four, i_table_group_number, delta_height_for_table);
    }
    else
    {
        // debugCreateLayout('setControlsForTableGroup No table group four in the layout XML file');

        hideTableGroupFourContainer();
    }

    if (n_table_groups >= 5)
    {
        displayTableGroupFiveContainer();

        var table_group_five = table_group_array[4];

        // TODO g_table_group_five_name_text_box.setValue(table_group_five.getName());

        g_table_group_five_text_textbox.setValue(table_group_five.getText());

        var i_table_group_number = 5;
        displayTablesInGroupContainer(table_group_five, i_table_group_number, delta_height_for_table);
    }
    else
    {
        // debugCreateLayout('setControlsForTableGroup No table group five in the layout XML file');

        hideTableGroupFiveContainer();
    }

    if (n_table_groups >= 6)
    {
        displayTableGroupSixContainer();

        var table_group_six = table_group_array[5];

        // TODO g_table_group_six_name_text_box.setValue(table_group_six.getName());

        g_table_group_six_text_textbox.setValue(table_group_six.getText());

        var i_table_group_number = 6;
        displayTablesInGroupContainer(table_group_six, i_table_group_number, delta_height_for_table);
    }
    else
    {
        // debugCreateLayout('setControlsForTableGroup No table group six in the layout XML file');

        hideTableGroupSixContainer();
    }

} // setControlsForTableGroup

// Display the tables in the container of a table group
function displayTablesInGroupContainer(i_table_group, i_table_group_number, i_delta_height_for_table)
{
    debugCreateLayout('displayTablesInGroupContainer Enter i_table_group_number= ' + i_table_group_number + 
        ' i_delta_height_for_table= ' + i_delta_height_for_table);

    var tables_container = getTablesContainer(i_table_group_number);

    if (tables_container == null)
    {
        return;
    }

    var html_tables = '';

    var table_array = i_table_group.getTableArray();

    var n_tables = table_array.length;

    for (var index_table = 0; index_table < n_tables; index_table++)
    {
        var current_table = table_array[index_table];

        var n_left_right_seats = current_table.getNumberLeftRightSeats();

        var height_div = parseInt(i_delta_height_for_table * n_left_right_seats).toString() + 'px';

        var table_number_id = current_table.getNumber();

        var table_div_html = '<div '+ 'id="' + table_number_id + '" ' + 
        ' class="cl_table_in_group_container_div" ' + 
        ' onclick="clickTableInGroupContainer(this)" ' + 
        ' style="height: ' + height_div + '"; >' + 
        n_left_right_seats.toString() + '</div>';

        debugCreateLayout('displayTablesInGroupContainer table_div_html= \n' + table_div_html );

        html_tables += table_div_html;

            //'title="Tischnummer: ' + current_table.getNumber() + '">Tischnummer: ' + current_table.getNumber() + '</div>';

    } // index_table

    tables_container.innerHTML = html_tables;

} // displayTablesInGroupContainer

// Set the controls on the table page with the data from the selected table
// 1. Create an instance of the class LayoutXmlTable with the layout XML object
// 2. Get the table element for the given table number id. 
//    Call of getTableElementForTableNumberIdentity
function setControlsOnTablePage(i_table_number_id)
{
    debugCreateLayout('setControlsOnTablePage i_table_number_id= ' + i_table_number_id);

    var layout_xml_table = new LayoutXmlTable(g_create_layout_xml);

    g_active_table_object = layout_xml_table.getTableElementForTableNumberIdentity(i_table_number_id);

    var upper_left_position = g_active_table_object.getUpperLeftX();

    var upper_top_position = g_active_table_object.getUpperLeftY();

    var dimension_width = g_active_table_object.getWidth();

    var dimension_height = g_active_table_object.getHeight();

    var number_seats = g_active_table_object.getNumberLeftRightSeats();

    var table_text = g_active_table_object.getText();

    g_table_page_number_id_textbox.setValue(i_table_number_id);

    g_table_page_position_left_textbox.setValue(upper_left_position);

    g_table_page_position_top_textbox.setValue(upper_top_position);

    g_table_page_dimension_width_textbox.setValue(dimension_width);

    g_table_page_dimension_height_textbox.setValue(dimension_height);

    g_table_page_text_textbox.setValue(table_text);

    g_table_page_number_seats_textbox.setValue(number_seats);

     setTablePageSeatControls();

} // setControlsOnTablePage

// Get the delta height for a table defined by max number of seats and container height
function getDeltaHeightForTable(i_table_group_array)
{
    var n_table_groups = i_table_group_array.length;

    var max_left_right_seats = 0;

    for (var index_table_group = 0; index_table_group < n_table_groups; index_table_group++)
    {
        var table_group = i_table_group_array[index_table_group];

        var table_array = table_group.getTableArray();

        for (var index_table = 0; index_table < table_array.length; index_table++)
        {
            var table = table_array[index_table];

            var n_left_right_seats = table.getNumberLeftRightSeats();

            var n_left_right_seats_int = parseInt(n_left_right_seats);

            // debugCreateLayout('getDeltaHeightForTable Table group text = ' + table_group.getText() + 
            //    ' table= ' + table.getNumber() +
            //    ' n_left_right_seats_int= ' + n_left_right_seats_int);

            if (n_left_right_seats_int > max_left_right_seats)
            {
                max_left_right_seats = n_left_right_seats_int;

                //debugCreateLayout('getDeltaHeightForTable New max_left_right_seats= ' + max_left_right_seats);
            }

        } // index_table

    } // index_table_group

    var container_height = getElementDivTableGroupOneRightContainer().offsetHeight;

    var ret_delta_height = container_height * 0.9 / max_left_right_seats;

    debugCreateLayout('getDeltaHeightForTable max_left_right_seats= ' + max_left_right_seats + 
        ' container_height= ' + container_height + ' delta_height= ' + ret_delta_height);

    return ret_delta_height;

} // getDeltaHeightForTable

// Set the controls on the stage page with the data from the active stage object
// 1. Get the StageData object from the layout model object
function setControlsForStagePage()
{
    debugCreateLayout('setControlsForStagePage Enter');

    var stage_data = g_layout_model.m_stage_data;

    var b_defined_stage = stage_data.stageIsDefined();

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

    g_stage_page_position_left_textbox.setValue(stage_data.getUpperLeftX());

    g_stage_page_position_top_textbox.setValue(stage_data.getUpperLeftY());

    g_stage_page_dimension_width_textbox.setValue(stage_data.getWidth());

    g_stage_page_dimension_height_textbox.setValue(stage_data.getHeight());

    g_stage_page_text_textbox.setValue(stage_data.getText());

} // setControlsForStagePage

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

// Set the table page seat controls with the data from the active table 
// global variable g_active_table_object
function setTablePageSeatControls()
{
    debugCreateLayout('setTablePageSeatControls Enter');

    var number_left_right_seats = g_active_table_object.getNumberLeftRightSeats();

    var el_one_left = document.getElementById('id_div_display_table_seat_left_one');
    var el_one_right = document.getElementById('id_div_display_table_seat_right_one');

    var el_two_left = document.getElementById('id_div_display_table_seat_left_two');
    var el_two_right = document.getElementById('id_div_display_table_seat_right_two');

    var el_three_left = document.getElementById('id_div_display_table_seat_left_three');
    var el_three_right = document.getElementById('id_div_display_table_seat_right_three');

    var el_four_left = document.getElementById('id_div_display_table_seat_left_four');
    var el_four_right = document.getElementById('id_div_display_table_seat_right_four');

    var el_five_left = document.getElementById('id_div_display_table_seat_left_five');
    var el_five_right = document.getElementById('id_div_display_table_seat_right_five');

    var el_six_left = document.getElementById('id_div_display_table_seat_left_six');
    var el_six_right = document.getElementById('id_div_display_table_seat_right_six');

    var el_seven_left = document.getElementById('id_div_display_table_seat_left_seven');
    var el_seven_right = document.getElementById('id_div_display_table_seat_right_seven');

    var el_eight_left = document.getElementById('id_div_display_table_seat_left_eight');
    var el_eight_right = document.getElementById('id_div_display_table_seat_right_eight');

    var el_nine_left = document.getElementById('id_div_display_table_seat_left_nine');
    var el_nine_right = document.getElementById('id_div_display_table_seat_right_nine');

    var el_ten_left = document.getElementById('id_div_display_table_seat_left_ten');
    var el_ten_right = document.getElementById('id_div_display_table_seat_right_ten');

    var el_eight_upper_element = document.getElementById('id_div_display_table_seat_upper');
    var el_eight_lower_element = document.getElementById('id_div_display_table_seat_lower');

    var el_mid_table_element = document.getElementById('id_div_display_table_mid');

    var table_height_float = number_left_right_seats/2.0 * 42.0; // From style height of the seat elements
    var table_height_string = table_height_float.toString() + 'px';

    el_mid_table_element.style.height = table_height_string;

    debugCreateLayout('setTablePageSeatControls Table height= ' + table_height_string);

    if (number_left_right_seats >= 2)
    {
        el_one_left.style.display = 'block';
        el_one_right.style.display = 'block';
        if (g_active_table_object.getLeftSeatBool(1) == true)
        {
            el_one_left.style.backgroundColor = 'yellow';
        }
        else
        {
            el_one_left.style.backgroundColor = 'gray';
        }

        if (g_active_table_object.getRightSeatBool(1) == true)
        {
            el_one_right.style.backgroundColor = 'yellow';
        }
        else
        {
            el_one_right.style.backgroundColor = 'gray';
        }
    } // >= 2
    else
    {
        el_one_left.style.display = 'none';
        el_one_right.style.display = 'none';
    }

    if (number_left_right_seats >= 4)
    {
        el_two_left.style.display = 'block';
        el_two_right.style.display = 'block';
        if (g_active_table_object.getLeftSeatBool(2) == true)
        {
            el_two_left.style.backgroundColor = 'yellow';
        }
        else
        {
            el_two_left.style.backgroundColor = 'gray';
        }

        if (g_active_table_object.getRightSeatBool(2) == true)
        {
            el_two_right.style.backgroundColor = 'yellow';
        }
        else
        {
            el_two_right.style.backgroundColor = 'gray';
        }
    } // >= 4
    else
    {
        el_two_left.style.display = 'none';
        el_two_right.style.display = 'none';
    }

    if (number_left_right_seats >= 6)
    {
        el_three_left.style.display = 'block';
        el_three_right.style.display = 'block';
        if (g_active_table_object.getLeftSeatBool(3) == true)
        {
            el_three_left.style.backgroundColor = 'yellow';
        }
        else
        {
            el_three_left.style.backgroundColor = 'gray';
        }

        if (g_active_table_object.getRightSeatBool(3) == true)
        {
            el_three_right.style.backgroundColor = 'yellow';
        }
        else
        {
            el_three_right.style.backgroundColor = 'gray';
        }
    } // >= 6
    else
    {
        el_three_left.style.display = 'none';
        el_three_right.style.display = 'none';
    }

    if (number_left_right_seats >= 8)
    {
        el_four_left.style.display = 'block';
        el_four_right.style.display = 'block';
        if (g_active_table_object.getLeftSeatBool(4) == true)
        {
            el_four_left.style.backgroundColor = 'yellow';
        }
        else
        {
            el_four_left.style.backgroundColor = 'gray';
        }

        if (g_active_table_object.getRightSeatBool(4) == true)
        {
            el_four_right.style.backgroundColor = 'yellow';
        }
        else
        {
            el_four_right.style.backgroundColor = 'gray';
        }
    } // >= 8
    else
    {
        el_four_left.style.display = 'none';
        el_four_right.style.display = 'none';
    }

    if (number_left_right_seats >= 10)
    {
        el_five_left.style.display = 'block';
        el_five_right.style.display = 'block';
        if (g_active_table_object.getLeftSeatBool(5) == true)
        {
            el_five_left.style.backgroundColor = 'yellow';
        }
        else
        {
            el_five_left.style.backgroundColor = 'gray';
        }

        if (g_active_table_object.getRightSeatBool(5) == true)
        {
            el_five_right.style.backgroundColor = 'yellow';
        }
        else
        {
            el_five_right.style.backgroundColor = 'gray';
        }
    } // >= 10
    else
    {
        el_five_left.style.display = 'none';
        el_five_right.style.display = 'none';
    }

    if (number_left_right_seats >= 12)
    {
        el_six_left.style.display = 'block';
        el_six_right.style.display = 'block';
        if (g_active_table_object.getLeftSeatBool(6) == true)
        {
            el_six_left.style.backgroundColor = 'yellow';
        }
        else
        {
            el_six_left.style.backgroundColor = 'gray';
        }

        if (g_active_table_object.getRightSeatBool(6) == true)
        {
            el_six_right.style.backgroundColor = 'yellow';
        }
        else
        {
            el_six_right.style.backgroundColor = 'gray';
        }
    } // >= 12
    else
    {
        el_six_left.style.display = 'none';
        el_six_right.style.display = 'none';
    }

    if (number_left_right_seats >= 14)
    {
        el_seven_left.style.display = 'block';
        el_seven_right.style.display = 'block';
        if (g_active_table_object.getLeftSeatBool(7) == true)
        {
            el_seven_left.style.backgroundColor = 'yellow';
        }
        else
        {
            el_seven_left.style.backgroundColor = 'gray';
        }

        if (g_active_table_object.getRightSeatBool(7) == true)
        {
            el_seven_right.style.backgroundColor = 'yellow';
        }
        else
        {
            el_seven_right.style.backgroundColor = 'gray';
        }
    } // >= 14
    else
    {
        el_seven_left.style.display = 'none';
        el_seven_right.style.display = 'none';
    }

    if (number_left_right_seats >= 16)
    {
        el_eight_left.style.display = 'block';
        el_eight_right.style.display = 'block';
        if (g_active_table_object.getLeftSeatBool(8) == true)
        {
            el_eight_left.style.backgroundColor = 'yellow';
        }
        else
        {
            el_eight_left.style.backgroundColor = 'gray';
        }

        if (g_active_table_object.getRightSeatBool(8) == true)
        {
            el_eight_right.style.backgroundColor = 'yellow';
        }
        else
        {
            el_eight_right.style.backgroundColor = 'gray';
        }
    } // >= 16
    else
    {
        el_eight_left.style.display = 'none';
        el_eight_right.style.display = 'none';
    }

    if (number_left_right_seats >= 18)
    {
        el_nine_left.style.display = 'block';
        el_nine_right.style.display = 'block';
        if (g_active_table_object.getLeftSeatBool(9) == true)
        {
            el_nine_left.style.backgroundColor = 'yellow';
        }
        else
        {
            el_nine_left.style.backgroundColor = 'gray';
        }

        if (g_active_table_object.getRightSeatBool(9) == true)
        {
            el_nine_right.style.backgroundColor = 'yellow';
        }
        else
        {
            el_nine_right.style.backgroundColor = 'gray';
        }
    } // >= 18
    else
    {
        el_nine_left.style.display = 'none';
        el_nine_right.style.display = 'none';
    }

    if (number_left_right_seats >= 20)
    {
        el_ten_left.style.display = 'block';
        el_ten_right.style.display = 'block';
        if (g_active_table_object.getLeftSeatBool(10) == true)
        {
            el_ten_left.style.backgroundColor = 'yellow';
        }
        else
        {
            el_ten_left.style.backgroundColor = 'gray';
        }

        if (g_active_table_object.getRightSeatBool(10) == true)
        {
            el_ten_right.style.backgroundColor = 'yellow';
        }
        else
        {
            el_ten_right.style.backgroundColor = 'gray';
        }
    } // >= 20
    else
    {
        el_ten_left.style.display = 'none';
        el_ten_right.style.display = 'none';
    }





    if (g_active_table_object.getSeatUpperBool() == true)
    {
        el_eight_upper_element.style.backgroundColor = 'yellow';
    }
    else
    {
        el_eight_upper_element.style.backgroundColor = 'gray';
    }

    if (g_active_table_object.getLowerSeatBool() == true)
    {
        el_eight_lower_element.style.backgroundColor = 'yellow';
    }
    else
    {
        el_eight_lower_element.style.backgroundColor = 'gray';
    }

} // setTablePageSeatControls

// Event function for the click on a table seat in the table page
function execClickTableSeat(i_seat_id)
{
    debugCreateLayout('execClickTableSeat i_seat_id= ' + i_seat_id);

    if (i_seat_id == 'Upper')
    {
        var current_seat_bool = g_active_table_object.getSeatUpperBool();

        if (current_seat_bool == true)
        {
            g_active_table_object.setUpperSeatBool(false);
        }
        else
        {
            g_active_table_object.setUpperSeatBool(true);
        }

        setTablePageSeatControls();
        return;
    }

    if (i_seat_id == 'Lower')
    {
        var current_seat_bool = g_active_table_object.getLowerSeatBool();

        if (current_seat_bool == true)
        {
            g_active_table_object.setLowerSeatBool(false);
        }
        else
        {
            g_active_table_object.setLowerSeatBool(true);
        }

        setTablePageSeatControls();

        return;
    }

    var seat_number_str = i_seat_id.substring(i_seat_id.lastIndexOf('_') + 1);

    var seat_number = parseInt(seat_number_str);

    //QQ var current_seat_aeeay = null;

    if (i_seat_id.includes('L_'))
    {
        var current_seat_bool = g_active_table_object.getLeftSeatBool(seat_number);

        if (current_seat_bool == true)
        {
            g_active_table_object.setLeftSeatBool(seat_number, false);
        }
        else
        {
            g_active_table_object.setLeftSeatBool(seat_number, true);
        }

    } // L_
    else if (i_seat_id.includes('R_'))
    {
        var current_seat_bool = g_active_table_object.getRightSeatBool(seat_number);

        if (current_seat_bool == true)
        {
            g_active_table_object.setRightSeatBool(seat_number, false);
        }
        else
        {
            g_active_table_object.setRightSeatBool(seat_number, true);
        }
    } // R_
    else
    {
        debugCreateLayout('execClickTableSeat No left or right seat clicked');
        return;
    }

    setTablePageSeatControls();

} // execClickTableSeat

// Event function for the click on the plus button for the number of seats in the table page
function execPageNumberPlusButton()
{
    var b_plus = true;

    var n_left_right_seats = getNewNumberOfTableSeats(b_plus);

    debugCreateLayout('execPageNumberPlusButton n_left_right_seats= ' + n_left_right_seats);    

    g_active_table_object.setNumberLeftRightSeats(n_left_right_seats);

    g_table_page_number_seats_textbox.setValue(n_left_right_seats);

    setTablePageSeatControls();

} // execPageNumberPlusButton

// Event function for the click on the minus button for the number of seats in the table page
function execPageNumberMinusButton()
{
    var b_plus = false;

    var n_left_right_seats = getNewNumberOfTableSeats(b_plus);

    debugCreateLayout('execPageNumberMinusButton n_left_right_seats= ' + n_left_right_seats);

    g_active_table_object.setNumberLeftRightSeats(n_left_right_seats);

    g_table_page_number_seats_textbox.setValue(n_left_right_seats);

    setTablePageSeatControls();

} // execPageNumberMinusButton

// Get the new number of table seats for the click on the plus or minus button in the table page
function getNewNumberOfTableSeats(i_b_plus)
{
    var ret_number_seats = 0;

    var current_number_seats = g_active_table_object.getNumberLeftRightSeats();

    if (i_b_plus == true)
    {
        if (current_number_seats < 20)
        {
            ret_number_seats = current_number_seats + 2;
        }
        else
        {
            ret_number_seats = current_number_seats;
        }

    } // Plus button
 
    if (i_b_plus == false)
    {
        if (current_number_seats > 2)
        {
            ret_number_seats = current_number_seats - 2;
        }   
        else        
        {
            ret_number_seats = current_number_seats;
        }

    } // Minus button
 

    return ret_number_seats;

} // getNewNumberOfTableSeats

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

// Display the table group page and hide the other pages
function displayTableGroupPage()
{
    getElementDivStartPage().style.display = 'none';

    getElementDivTableGroupPage().style.display = 'block';

    getElementDivTablePage().style.display = 'none';

    getElementDivStagePage().style.display = 'none';

} // displayTableGroupPage

// Display the table page and hide the other pages
function displayTablePage()
{
    getElementDivStartPage().style.display = 'none';

    getElementDivTableGroupPage().style.display = 'none';

    getElementDivTablePage().style.display = 'block';

    getElementDivStagePage().style.display = 'none';

} // displayTablePage

function displayStagePage()
{
    getElementDivStartPage().style.display = 'none';

    getElementDivTableGroupPage().style.display = 'none';

    getElementDivTablePage().style.display = 'none';

    getElementDivStagePage().style.display = 'block';

} // displayStagePage

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

// Display the table group one container
function hideTableGroupOneContainer()
{
    getElementDivTableGroupOneContainer().style.display = 'none';

} // hideTableGroupOneContainer

// Display the table group two container
function hideTableGroupTwoContainer()
{
    getElementDivTableGroupTwoContainer().style.display = 'none';

} // hideTableGroupTwoContainer

// Display the table group three container
function hideTableGroupThreeContainer()
{
    getElementDivTableGroupThreeContainer().style.display = 'none';

} // hideTableGroupThreeContainer

// Display the table group four container
function hideTableGroupFourContainer()
{
    getElementDivTableGroupFourContainer().style.display = 'none';

} // hideTableGroupFourContainer

// Display the table group five container
function hideTableGroupFiveContainer()
{
    getElementDivTableGroupFiveContainer().style.display = 'none';  

} // hideTableGroupFiveContainer

// Display the table group six container
function hideTableGroupSixContainer()
{
    getElementDivTableGroupSixContainer().style.display = 'none';

} // hideTableGroupSixContainer

// Display the table group one container
function displayTableGroupOneContainer()
{
    getElementDivTableGroupOneContainer().style.display = 'block';

} // displayTableGroupOneContainer

// Display the table group two container
function displayTableGroupTwoContainer()
{
    getElementDivTableGroupTwoContainer().style.display = 'block';

} // displayTableGroupTwoContainer

// Display the table group three container
function displayTableGroupThreeContainer()
{
    getElementDivTableGroupThreeContainer().style.display = 'block';

} // displayTableGroupThreeContainer

// Display the table group four container
function displayTableGroupFourContainer()
{
    getElementDivTableGroupFourContainer().style.display = 'block';

} // displayTableGroupFourContainer

// Display the table group five container
function displayTableGroupFiveContainer()
{
    getElementDivTableGroupFiveContainer().style.display = 'block';  

} // displayTableGroupFiveContainer

// Display the table group six container
function displayTableGroupSixContainer()
{
    getElementDivTableGroupSixContainer().style.display = 'block';

} // displayTableGroupSixContainer

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