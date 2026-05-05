// File: ReservationCreateLayout.js
// Date: 2026-05-03
// Author: Gunnar Lidén

// Inhalt
// =============
// Main functions for the application reservation layout create

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Global Parameters /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Global variable for the layout XML object an instance of the class ReservationLayoutXml
var g_create_layout_xml = null;

// Global variable selected element number in the dropdown control
var g_current_layout_element_number = -12345;

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

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Event Functions /////////////////////////////////////////////
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
function setControlsOnTablePage(i_table_number_id)
{
    debugCreateLayout('setControlsOnTablePage Enter i_table_number_id= ' + i_table_number_id);

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

    g_table_save_button.setCaption('Speichern');

     g_table_save_button.setLabelTextPositionLeft();

    g_table_save_button.setLabelText("");

    g_table_save_button.setWidth("100px");

    g_table_save_button.setTitle('Klick hier um die Änderungen der Tabelle zu speichern. '+ 
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