// File: ReservationCreateLayoutTableGroup.js
// Date: 2026-05-26
// Author: Gunnar Lidén

// Inhalt
// =============
//
// Table functions for the 'Create Layout' application

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Global Parameters /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

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

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Global Parameters ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Event Functions ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

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
///////////////////////// Start Save Functions ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Save Functions //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Set Controls //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

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

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Set Controls ////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Display Functions /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Display the table group page and hide the other pages
function displayTableGroupPage()
{
    getElementDivStartPage().style.display = 'none';

    getElementDivTableGroupPage().style.display = 'block';

    getElementDivTablePage().style.display = 'none';

    getElementDivStagePage().style.display = 'none';

} // displayTableGroupPage


// Hide the table group one container
function hideTableGroupOneContainer()
{
    getElementDivTableGroupOneContainer().style.display = 'none';

} // hideTableGroupOneContainer

// Hide the table group two container
function hideTableGroupTwoContainer()
{
    getElementDivTableGroupTwoContainer().style.display = 'none';

} // hideTableGroupTwoContainer

// Hide the table group three container
function hideTableGroupThreeContainer()
{
    getElementDivTableGroupThreeContainer().style.display = 'none';

} // hideTableGroupThreeContainer

// Hide the table group four container
function hideTableGroupFourContainer()
{
    getElementDivTableGroupFourContainer().style.display = 'none';

} // hideTableGroupFourContainer

// Hide the table group five container
function hideTableGroupFiveContainer()
{
    getElementDivTableGroupFiveContainer().style.display = 'none';  

} // hideTableGroupFiveContainer

// Hide the table group six container
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

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Display Functions ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Create Controls ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

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

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Create Controls /////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Element Functions /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

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


