// File: ReservationCreateLayoutTable.js
// Date: 2026-05-26
// Author: Gunnar Lidén

// Inhalt
// =============
//
// Table functions for the 'Create Layout' application

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Global Parameters /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////


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


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Global Parameters ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Event Functions ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

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

// Event function for the click on a table element in the layout page
function onClickHtmlElementTable(i_table_number_id)
{
    debugCreateLayout('onClickHtmlElementTable i_table_number_id= ' + i_table_number_id);

} // onClickHtmlElementTable

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

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Set Controls ////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Display Functions /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Display the table page and hide the other pages
function displayTablePage()
{
    getElementDivStartPage().style.display = 'none';

    getElementDivTableGroupPage().style.display = 'none';

    getElementDivTablePage().style.display = 'block';

    getElementDivStagePage().style.display = 'none';

} // displayTablePage

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Display Functions ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Create Controls ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

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
///////////////////////// End Create Controls /////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Element Functions /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

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

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Element Functions ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////




