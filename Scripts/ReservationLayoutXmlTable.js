// File: ReservationLayoutXmlTable.js
// Date: 2026-04-29
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

    } // Constructor

    // Set function for the text property
    setText(value) 
    {
        this.m_text = value;

    } // setText

    // Get function for the text property
    getText() 
    {
        return this.m_text;

    } // getText

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