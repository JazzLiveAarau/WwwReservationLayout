// File: ReservationLayoutXmlTable.js
// Date: 2026-05-05
// Author: Gunnar Lidén

// File content
// =============
//
// Data classes for the Table element and append functions for Table


class LayoutXmlTable
{
    // i_layout_xml is an instance of the class ReservationLayoutXml
    constructor(i_layout_xml)
    {
        // Instance of the class ReservationLayoutXml
        this.m_layout_xml = i_layout_xml;

        // Instance of the class ReservationLayoutTags
        this.m_tags = new ReservationLayoutTags();

        // Flag that a node value not have been set
        this.m_not_yet_set_node_value = "NotYetSetNodeValue";
    }

    // Returns the instance of the class ReservationLayoutXml
    getXmlObject()
    {
        return this.m_layout_xml;

    } // getXmlObject

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////// Start Append Functions //////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Append a TableGroup element to the ReservationLayoutXml object
    // i_table_group_element is an instance of the class TableGroup
    // i_table_element_array is an array of instances of the class Table
    appendGroup(i_table_group_element, i_table_element_array)
    {
        var new_table_group = this.getXmlObject().createElement(this.m_tags.getTableGroup());

        var group_text_node = this.getXmlObject().createElement(this.m_tags.getGroupText());
		var group_text_value = this.setFlagNodeValueIsNotSetForEmptyString(i_table_group_element.getText());
        var group_text_text = this.getXmlObject().createTextNode(group_text_value);
        group_text_node.appendChild(group_text_text);
        new_table_group.appendChild(group_text_node);     

        for (var index_table = 0; index_table < i_table_element_array.length; index_table++)
        {
            this.appendOneTableToGroup(new_table_group, i_table_element_array[index_table]);
        }

    } // appendGroup

    // Append a Table element to a TableGroup element
    // i_table_group_element is an instance of the class TableGroup
    // i_table_element is an instance of the class Table
    appendOneTableToGroup(i_table_group_element, i_table_element)
    {
        var new_table = this.getXmlObject().createElement(this.m_tags.getTable());

        var table_number_node = this.getXmlObject().createElement(this.m_tags.getTableNumber());
		var table_number_value = this.setFlagNodeValueIsNotSetForEmptyString(i_table_element.getNumber());
        var table_number_text = this.getXmlObject().createTextNode(table_number_value);
        table_number_node.appendChild(table_number_text);
        new_table.appendChild(table_number_node);     





        i_table_group_element.appendChild(new_table);

    } // appendOneTableToGroup

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////// End Append Functions ////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////// Start Utility Functions /////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Returns an array of instances of the class TableGroup
    getTableGroupArray()
    {
        var table_group_array = new Array();

        var n_table_groups = this.m_layout_xml.getNumberOfGroups();

        debugLayoutXmlTable('getTableGroupArray: n_table_groups = ' + n_table_groups);

        for (var table_group_number = 1; table_group_number <= n_table_groups; table_group_number++)
        {
            var table_group_element = new TableGroup();

            var group_text = this.m_layout_xml.getGroupText(table_group_number);

            table_group_element.setText(group_text);

            // debugLayoutXmlTable('getTableGroupArray: table_group_number = ' + table_group_number + ', group_text = ' + group_text);

            var n_tables = this.m_layout_xml.getNumberOTablesInOneGroup(table_group_number);

            // debugLayoutXmlTable('getTableGroupArray: table_group_number = ' + table_group_number + ', n_tables = ' + n_tables);

            var table_number_array = this.m_layout_xml.getGroupTableNumbers(table_group_number);

            var n_table_numbers = table_number_array.length;

            debugLayoutXmlTable('getTableGroupArray: table_group_number = ' + table_group_number + 
                ', n_table_numbers = ' + n_table_numbers + ', group_text = ' + group_text);

            for (var i_index_table_number = 0; i_index_table_number < n_table_numbers; i_index_table_number++)
            {
                var table_number = table_number_array[i_index_table_number];

                // debugLayoutXmlTable('getTableGroupArray: table_group_number = ' + table_group_number + ', i_index_table_number = ' + i_index_table_number + ', table_number = ' + table_number);

                var table_element = this.getTableElement(table_number);

                table_group_element.appendOneTableToGroup(table_element);

            }

            table_group_array.push(table_group_element);

        } // table_group_number

        return table_group_array;

    } // getTableGroupArray

    // Returns an instance of the class Table for a given table group number and table number
    getTableElement(i_table_number)
    {
        var ret_table_element = new Table();

        var table_number = this.m_layout_xml.getTableNumber(i_table_number);
        ret_table_element.setNumber(table_number);

        var upper_left_x = this.m_layout_xml.getTableUpperLeftX(i_table_number);
        ret_table_element.setUpperLeftX(upper_left_x);

        var upper_left_y = this.m_layout_xml.getTableUpperLeftY(i_table_number);
        ret_table_element.setUpperLeftY(upper_left_y);

        var width = this.m_layout_xml.getTableWidth(i_table_number);
        ret_table_element.setWidth(width);

        var height = this.m_layout_xml.getTableHeight(i_table_number);
        ret_table_element.setHeight(height);

        var number_left_right_seats = this.m_layout_xml.getTableNumberLeftRightSeats(i_table_number);
        ret_table_element.setNumberLeftRightSeats(number_left_right_seats);

        debugLayoutXmlTable('getTableElement: \nNumber (string) = ' + ret_table_element.getNumber() + 
        '\nupper_left_x = ' + ret_table_element.getUpperLeftX() + '\nupper_left_y = ' + 
        ret_table_element.getUpperLeftY() + '\nwidth = ' + ret_table_element.getWidth() + 
        '\nheight = ' + ret_table_element.getHeight() + '\nnumber_left_right_seats = ' + 
        ret_table_element.getNumberLeftRightSeats() + '\ni_table_number = ' + i_table_number);

        ret_table_element = this.addSeatBooleanValuesToTableElement(i_table_number, ret_table_element);

        return ret_table_element;

    } // getTableElement

    // Add the boolean values for the seats to a given table element
    addSeatBooleanValuesToTableElement(i_table_number, i_table_element)
    {
        var table_number = i_table_number;

        var number_left_right_seats = i_table_element.getNumberLeftRightSeats();

        debugLayoutXmlTable('addSeatBooleanValuesToTableElement: table_number = ' + table_number + 
            ', number_left_right_seats = ' + number_left_right_seats);

        var ret_table_element = i_table_element;

        if (number_left_right_seats >= 2)
        {
            var seat_one_left = this.m_layout_xml.getTableSeatOneLeft(table_number);
            ret_table_element.m_seat_one_left = seat_one_left;
			var seat_one_right = this.m_layout_xml.getTableSeatOneRight(table_number);
			ret_table_element.m_seat_one_right = seat_one_right;
        }
    
        if (number_left_right_seats >= 4)
        {
            var seat_two_left = this.m_layout_xml.getTableSeatTwoLeft(table_number);
            ret_table_element.m_seat_two_left = seat_two_left;
			var seat_two_right = this.m_layout_xml.getTableSeatTwoRight(table_number);
			ret_table_element.m_seat_two_right = seat_two_right;
        }

        if (number_left_right_seats >= 6)
        {
            var seat_three_left = this.m_layout_xml.getTableSeatThreeLeft(table_number);
            ret_table_element.m_seat_three_left = seat_three_left;
            var seat_three_right = this.m_layout_xml.getTableSeatThreeRight(table_number);
            ret_table_element.m_seat_three_right = seat_three_right;
        }

        if (number_left_right_seats >= 8)
        {
            var seat_four_left = this.m_layout_xml.getTableSeatFourLeft(table_number);
            ret_table_element.m_seat_four_left = seat_four_left;
            var seat_four_right = this.m_layout_xml.getTableSeatFourRight(table_number);
            ret_table_element.m_seat_four_right = seat_four_right;
        }

        if (number_left_right_seats >= 10)
        {
            var seat_five_left = this.m_layout_xml.getTableSeatFiveLeft(table_number);
            ret_table_element.m_seat_five_left = seat_five_left;
            var seat_five_right = this.m_layout_xml.getTableSeatFiveRight(table_number);
            ret_table_element.m_seat_five_right = seat_five_right;
        }

        if (number_left_right_seats >= 12)
        {
            var seat_six_left = this.m_layout_xml.getTableSeatSixLeft(table_number);
            ret_table_element.m_seat_six_left = seat_six_left;
            var seat_six_right = this.m_layout_xml.getTableSeatSixRight(table_number);
            ret_table_element.m_seat_six_right = seat_six_right;
        }

        if (number_left_right_seats >= 14)
        {
            var seat_seven_left = this.m_layout_xml.getTableSeatSevenLeft(table_number);
            ret_table_element.m_seat_seven_left = seat_seven_left; 
            var seat_seven_right = this.m_layout_xml.getTableSeatSevenRight(table_number);
            ret_table_element.m_seat_seven_right = seat_seven_right;
        }   

        if (number_left_right_seats >= 16)
        {
            var seat_eight_left = this.m_layout_xml.getTableSeatEightLeft(table_number);
            ret_table_element.m_seat_eight_left = seat_eight_left;
            var seat_eight_right = this.m_layout_xml.getTableSeatEightRight(table_number);
            ret_table_element.m_seat_eight_right = seat_eight_right;
        }

        if (number_left_right_seats >= 18)
        {
            var seat_nine_left = this.m_layout_xml.getTableSeatNineLeft(table_number);
            ret_table_element.m_seat_nine_left = seat_nine_left;
            var seat_nine_right = this.m_layout_xml.getTableSeatNineRight(table_number);
            ret_table_element.m_seat_nine_right = seat_nine_right;
        }

        if (number_left_right_seats >= 20)
        {
            var seat_ten_left = this.m_layout_xml.getTableSeatTenLeft(table_number);
            ret_table_element.m_seat_ten_left = seat_ten_left;
            var seat_ten_right = this.m_layout_xml.getTableSeatTenRight(table_number);
            ret_table_element.m_seat_ten_right = seat_ten_right;
        }

        if (number_left_right_seats >= 22)
        {
            var seat_eleven_left = this.m_layout_xml.getTableSeatElevenLeft(table_number);
            ret_table_element.m_seat_eleven_left = seat_eleven_left;
            var seat_eleven_right = this.m_layout_xml.getTableSeatElevenRight(table_number);
            ret_table_element.m_seat_eleven_right = seat_eleven_right;
        }

        if (number_left_right_seats >= 24)
        {
            var seat_twelve_left = this.m_layout_xml.getTableSeatTwelveLeft(table_number);
            ret_table_element.m_seat_twelve_left = seat_twelve_left;
            var seat_twelve_right = this.m_layout_xml.getTableSeatTwelveRight(table_number);
            ret_table_element.m_seat_twelve_right = seat_twelve_right;
        }

        if (number_left_right_seats >= 26)
        {
            var seat_thirteen_left = this.m_layout_xml.getTableSeatThirteenLeft(table_number);
            ret_table_element.m_seat_thirteen_left = seat_thirteen_left;
            var seat_thirteen_right = this.m_layout_xml.getTableSeatThirteenRight(table_number);
            ret_table_element.m_seat_thirteen_right = seat_thirteen_right;
        }

        if (number_left_right_seats >= 28)
        {
            var seat_fourteen_left = this.m_layout_xml.getTableSeatFourteenLeft(table_number);
            ret_table_element.m_seat_fourteen_left = seat_fourteen_left;
            var seat_fourteen_right = this.m_layout_xml.getTableSeatFourteenRight(table_number);
            ret_table_element.m_seat_fourteen_right = seat_fourteen_right;  
        }

        if (number_left_right_seats >= 30)
        {
            var seat_fifteen_left = this.m_layout_xml.getTableSeatFifteenLeft(table_number);
            ret_table_element.m_seat_fifteen_left = seat_fifteen_left;
            var seat_fifteen_right = this.m_layout_xml.getTableSeatFifteenRight(table_number);
            ret_table_element.m_seat_fifteen_right = seat_fifteen_right;
        }

        if (number_left_right_seats >= 32)
        {
            var seat_sixteen_left = this.m_layout_xml.getTableSeatSixteenLeft(table_number);
            ret_table_element.m_seat_sixteen_left = seat_sixteen_left;
            var seat_sixteen_right = this.m_layout_xml.getTableSeatSixteenRight(table_number);
            ret_table_element.m_seat_sixteen_right = seat_sixteen_right;
        }

        if (number_left_right_seats >= 34)
        {
            var seat_seventeen_left = this.m_layout_xml.getTableSeatSeventeenLeft(table_number);
            ret_table_element.m_seat_seventeen_left = seat_seventeen_left;
            var seat_seventeen_right = this.m_layout_xml.getTableSeatSeventeenRight(table_number);
            ret_table_element.m_seat_seventeen_right = seat_seventeen_right;
        }

        if (number_left_right_seats >= 36)
        {
            var seat_eightteen_left = this.m_layout_xml.getTableSeatEightteenLeft(table_number);
            ret_table_element.m_seat_eightteen_left = seat_eightteen_left;
            var seat_eightteen_right = this.m_layout_xml.getTableSeatEightteenRight(table_number);
            ret_table_element.m_seat_eightteen_right = seat_eightteen_right;
        }

        if (number_left_right_seats >= 38)
        {   
            var seat_nineteen_left = this.m_layout_xml.getTableSeatNineteenLeft(table_number);
            ret_table_element.m_seat_nineteen_left = seat_nineteen_left;
            var seat_nineteen_right = this.m_layout_xml.getTableSeatNineteenRight(table_number);
            ret_table_element.m_seat_nineteen_right = seat_nineteen_right;
        }

        if (number_left_right_seats >= 40)
        {
            var seat_twenty_left = this.m_layout_xml.getTableSeatTwentyLeft(table_number);
            ret_table_element.m_seat_twenty_left = seat_twenty_left;
            var seat_twenty_right = this.m_layout_xml.getTableSeatTwentyRight(table_number);
            ret_table_element.m_seat_twenty_right = seat_twenty_right;
        }

        var seat_upper = this.m_layout_xml.getTableSeatUpper(table_number);
        ret_table_element.m_seat_upper = seat_upper;

        var seat_lower = this.m_layout_xml.getTableSeatLower(table_number);
        ret_table_element.m_seat_lower = seat_lower;

        return ret_table_element;

    } // addSeatBooleanValuesToTableElement


    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////// End Utility Functions ///////////////////////////
    ///////////////////////////////////////////////////////////////////////////


    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////// Start Not Set Values  ///////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Returns true if the node value is set
    nodeValueIsSet(i_node_value)
    {
        if (i_node_value == this.m_not_yet_set_node_value)
        {
            return false;
        }
        else
        {
            return true;
        }
        
    } // nodeValueIsSet

    // Returns empty string if i_node_value is equal to m_not_yet_set_node_value
    removeFlagNodeValueNotSet(i_node_value)
    {
        if (!this.nodeValueIsSet(i_node_value))
        {
            return "";
        }
        
        return i_node_value; 
        
    } // removeFlagNodeValueNotSet

    // Return flag (string) g_not_yet_set_node_value if input string is empty
    setFlagNodeValueIsNotSetForEmptyString(i_node_value)
    {
        var trimmed_node_value = i_node_value.trim();
        
        if (trimmed_node_value.length == 0)
        {
            return this.m_not_yet_set_node_value;
        }
        
        return i_node_value;

    } // setFlagNodeValueIsNotSetForEmptyString

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////// End Not Set Values  /////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

} // LayoutXmlTable



// Set and get class for the TableGroup element in the class ReservationLayoutXml
class TableGroup 
{
    constructor() 
    {
        this.m_text = "";

        // Array of instances of the class Table
        this.m_table_array = new Array();

    } // Constructor

    // Set function for the text property
    setText(i_text) 
    {
        this.m_text = i_text;

    } // setText

    // Set function for the table array property
    setTableArray(i_array)
    {
        this.m_table_array = i_array;

    } // setTableArray

    // Append one table to the table array property
    appendOneTableToGroup(i_table_element)
    {
        this.m_table_array.push(i_table_element);

    } // appendOneTableToGroup

    // Get function for the text property
    getText() 
    {
        return this.m_text;

    } // getText

    // Returns an array of instances of the class Table
    getTableArray()
    {
        return this.m_table_array;

    } // getTableArray

} // TableGroup

// Set and get class for the Table element in the class ReservationLayoutXml
class Table
{
    constructor()
    {
        this.m_number = "";
        this.m_upper_left_x = -12345;
        this.m_upper_left_y = -12345;
        this.m_width = -12345;
        this.m_height = -12345;
        this.m_number_left_right_seats = -12345;

        this.m_seat_one_left = "true";
        this.m_seat_two_left = "true";
        this.m_seat_three_left = "true";
        this.m_seat_four_left = "true";
        this.m_seat_five_left = "true";
        this.m_seat_six_left = "true";
        this.m_seat_seven_left = "true";
        this.m_seat_eight_left = "true";
        this.m_seat_nine_left = "true";
        this.m_seat_ten_left = "true";
        this.m_seat_eleven_left = "true";
        this.m_seat_twelve_left = "true";
        this.m_seat_thirteen_left = "true";
        this.m_seat_fourteen_left = "true";
        this.m_seat_fifteen_left = "true";
        this.m_seat_sixteen_left = "true";
        this.m_seat_seventeen_left = "true";
        this.m_seat_eightteen_left = "true";
        this.m_seat_nineteen_left = "true";
        this.m_seat_twenty_left = "true";

        this.m_seat_one_right = "true";
        this.m_seat_two_right = "true";
        this.m_seat_three_right = "true";
        this.m_seat_four_right = "true";
        this.m_seat_five_right = "true";
        this.m_seat_six_right = "true";
        this.m_seat_seven_right = "true";
        this.m_seat_eight_right = "true";
        this.m_seat_nine_right = "true";
        this.m_seat_ten_right = "true";
        this.m_seat_eleven_right = "true";
        this.m_seat_twelve_right = "true";
        this.m_seat_thirteen_right = "true";
        this.m_seat_fourteen_right = "true";
        this.m_seat_fifteen_right = "true";
        this.m_seat_sixteen_right = "true";
        this.m_seat_seventeen_right = "true";
        this.m_seat_eightteen_right = "true";
        this.m_seat_nineteen_right = "true";
        this.m_seat_twenty_right = "true";

        this.m_seat_upper = "true";
        this.m_seat_lower = "true";

        this.m_text = "";       
    }

    // Get the table number (string)
    getNumber()
    {
        return this.m_number;

    } // getNumber

    // Set the table number (string)
    setNumber(value)
    {
        this.m_number = value;

    } // setNumber

    // Get the upper left x coordinate of the table (number)
    getUpperLeftX()
    {
        return this.m_upper_left_x;

    } // getUpperLeftX

    // Set the upper left x coordinate of the table (number)
    setUpperLeftX(value)
    {
        this.m_upper_left_x = value;

    } // setUpperLeftX

    // Get the upper left y coordinate of the table (number)
    getUpperLeftY()
    {
        return this.m_upper_left_y; 

    } // getUpperLeftY

    // Set the upper left y coordinate of the table (number)
    setUpperLeftY(value)
    {
        this.m_upper_left_y = value;

    } // setUpperLeftY

    // Get the width of the table (number)
    getWidth()
    {
        return this.m_width;

    } // getWidth

    // Set the width of the table (number)
    setWidth(value)
    {
        this.m_width = value;

    } // setWidth

    // Get the height of the table (number)
    getHeight()
    {
        return this.m_height;

    } // getHeight

    // Set the height of the table (number)
    setHeight(value)
    {
        this.m_height = value;

    } // setHeight

    // Get the number of left and right seats (number)
    getNumberLeftRightSeats()
    {
        return this.m_number_left_right_seats;

    } // getNumberLeftRightSeats

    // Set the number of left and right seats (number)
    setNumberLeftRightSeats(value)
    {
        this.m_number_left_right_seats = value;

    } // setNumberLeftRightSeats

    // Get the text of the table (string)
    getText()
    {
        return this.m_text;

    } // getText

    // Set the text of the table (string)
    setText(value)
    {
        this.m_text = value;

    } // setText

} // Table

// Properties for Table element in the class ReservationLayoutXml
class TableProperty
{
    constructor()
    {
        this.m_color = "";
        this.m_stroke_color = "";
        this.m_stroke_width = -1234;
        this.m_text_rel_x_procent = -12345;
        this.m_text_rel_y_procent = -12345;
        this.m_text_color = "";
    }

    getColor()
    {
        return this.m_color;

    } // getColor

    setColor(value)
    {
        this.m_color = value;

    } // setColor

    getStrokeColor()
    {
        return this.m_stroke_color;

    } // getStrokeColor

    setStrokeColor(value)
    {
        this.m_stroke_color = value;

    } // setStrokeColor

    getStrokeWidth()
    {
        return this.m_stroke_width;

    } // getStrokeWidth

    setStrokeWidth(value)
    {
        this.m_stroke_width = value;

    } // setStrokeWidth
    getTextRelXProcent()
    {
        return this.m_text_rel_x_procent;

    } // getTextRelXProcent

    setTextRelXProcent(value)
    {
        this.m_text_rel_x_procent = value;

    } // setTextRelXProcent

    getTextRelYProcent()
    {
        return this.m_text_rel_y_procent;

    } // getTextRelYProcent

    setTextRelYProcent(value)
    {
        this.m_text_rel_y_procent = value;

    } // setTextRelYProcent

    getTextColor()
    {
        return this.m_text_color;

    } // getTextColor

    setTextColor(value)
    {
        this.m_text_color = value;

    } // setTextColor

} // TableProperty


// Debug function for the class LayoutXmlTable
function debugLayoutXmlTable(i_text)
{
    console.log(i_text);

} // debugLayoutXmlTable