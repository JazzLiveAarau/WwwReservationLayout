// File: ReservationCreateLayout.js
// Date: 2026-05-08
// Author: Gunnar Lidén

// Inhalt
// =============
// Main functions for the application reservation layout create

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Global Parameters /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

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



// Global variables for the controls of the application
var g_help_create_layout_button = null;

// Global variables for the controls of the application
var g_it_info_create_layout_button = null;

// Global variable for the text box with the result server directory
var g_create_layout_main_dir = 'ReservationLayout/';

// Global variable for the layout element dropdown control
var g_drop_down_layout_element = null;

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

    // TODOhideSelectContainer();

    // TODO hideCreateNewXmlButton();

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


    g_layout_xml_table = new LayoutXmlTable(g_create_layout_xml);

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

    g_drop_down_layout_element.setLabelText('Layout Element wählen ');

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

//
function hideTableGroupSixContainer()
{
    getElementDivTableGroupSixContainer().style.display = 'none';

} // hideTableGroupSixContainer


// Hide the table group one container
function displayTableGroupOneContainer()
{
    getElementDivTableGroupOneContainer().style.display = 'block';

} // displayTableGroupOneContainer

// Hide the table group two container
function displayTableGroupTwoContainer()
{
    getElementDivTableGroupTwoContainer().style.display = 'block';

} // displayTableGroupTwoContainer

// Hide the table group three container
function displayTableGroupThreeContainer()
{
    getElementDivTableGroupThreeContainer().style.display = 'block';

} // displayTableGroupThreeContainer

// Hide the table group four container
function displayTableGroupFourContainer()
{
    getElementDivTableGroupFourContainer().style.display = 'block';

} // displayTableGroupFourContainer

// Hide the table group five container
function displayTableGroupFiveContainer()
{
    getElementDivTableGroupFiveContainer().style.display = 'block';  

} // displayTableGroupFiveContainer

//
function displayTableGroupSixContainer()
{
    getElementDivTableGroupSixContainer().style.display = 'block';

} // displayTableGroupSixContainer

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