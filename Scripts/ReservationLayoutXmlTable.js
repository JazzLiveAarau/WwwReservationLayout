// File: ReservationLayoutXmlTable.js
// Date: 2026-05-14
// Author: Gunnar Lidén

// File content
// =============
//
// Data classes for the Table element and append functions for Table


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Class LayoutXmlTable //////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Class for the layout xml table element. Contains functions to append a table group 
// element and a table element to the layout xml object, delete seat boolean elements for 
// a given table number identity string, delete seat boolean elements for a given table 
// number, delete a pair of seat boolean elements, delete a seat boolean element if it 
// exists, get the table node element for a given table number, get an array of instances 
// of the class TableGroup, set a table element for a given table number identity string, 
// set a table element for a given table number, set the boolean values for the seats for 
// a given table element, get a table element for a given table number, get a table element 
// for a given table number identity string, add the boolean values for the seats to a given 
// table element, get the table number for a given table number identity string, and 
// functions to set and remove flag node values for not set values.
//
// The functions of this class would normally be part of the class ReservationLayoutXml, 
// but are put in a separate class to make the code more organized and easier to read.
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
        return this.m_layout_xml.getXmlObject();

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
    ///////////////////////// Start Delete Functions //////////////////////////
    ///////////////////////////////////////////////////////////////////////////


    // Delete all seat boolean elements for a given table number identity string
    // i_table_number_identity_str Table number identity string (string)
    deleteAllTableSeatBooleanElementsForTableNumberIdentity(i_table_number_identity_str)
    {
        var table_number = this.getXmlTableNumberForTableNumberIdentity(i_table_number_identity_str);

        if (table_number <= 0)
        {
            debugLayoutXmlTable('deleteAllTableSeatBooleanElementsForTableNumberIdentity: ERROR: No table with table number identity string = ' + i_table_number_identity_str);
            alert('ERROR: No table with table number identity string = ' + i_table_number_identity_str);

            return;
        }

        this.deleteAllTableSeatBooleanElements(table_number);

    } // deleteAllTableSeatBooleanElementsForTableNumberIdentity

    // Delete all seat boolean elements for a given table number
    // i_table_number Table record number (number)
    deleteAllTableSeatBooleanElements(i_table_number)
    {
        debugLayoutXmlTable('deleteAllTableSeatBooleanElements: i_table_number = ' + i_table_number);

        for (var table_pair_number = 1; table_pair_number <= 20; table_pair_number++)
        {
            this.deleteTableSeatBooleanPairElements(i_table_number, table_pair_number);
        }

    } // deleteAllTableSeatBooleanElements

    // Delete a pair of seat boolean elements
    // i_table_number Table record number (number)
    // i_table_pair_number Pair number for the seat boolean elements (number): 1-20.                 
    deleteTableSeatBooleanPairElements(i_table_number, i_table_pair_number)
    {
        debugLayoutXmlTable('deleteTableSeatBooleanPairElements: i_table_number = ' + i_table_number + 
            ', i_table_pair_number = ' + i_table_pair_number);

        var table_node = this.getTableNodeElement(i_table_number);

        if (table_node == null)
        {
            alert("deleteTableSeatBooleanPairElements: ERROR: No table node found for table number = " + i_table_number);
            
            return;
        }

        if (i_table_pair_number < 1 || i_table_pair_number > 20)
        {
            alert("deleteTableSeatBooleanPairElements: ERROR: Invalid table pair number = " + i_table_pair_number);
            return;
        }

        var left_tag_table_element = "";

        var right_tag_table_element = "";

        if (i_table_pair_number == 1)
        {
            left_tag_table_element = this.m_tags.getTableSeatOneLeft();
            right_tag_table_element = this.m_tags.getTableSeatOneRight();
        }
        else if (i_table_pair_number == 2)
        {
            left_tag_table_element = this.m_tags.getTableSeatTwoLeft();
            right_tag_table_element = this.m_tags.getTableSeatTwoRight();
        }
        else if (i_table_pair_number == 3)
        {
            left_tag_table_element = this.m_tags.getTableSeatThreeLeft();
            right_tag_table_element = this.m_tags.getTableSeatThreeRight();
        }
        else if (i_table_pair_number == 4)
        {
            left_tag_table_element = this.m_tags.getTableSeatFourLeft();
            right_tag_table_element = this.m_tags.getTableSeatFourRight();
        }
        else if (i_table_pair_number == 5)
        {
            left_tag_table_element = this.m_tags.getTableSeatFiveLeft();
            right_tag_table_element = this.m_tags.getTableSeatFiveRight();
        }
        else if (i_table_pair_number == 6)
        {
            left_tag_table_element = this.m_tags.getTableSeatSixLeft();
            right_tag_table_element = this.m_tags.getTableSeatSixRight();
        }
        else if (i_table_pair_number == 7)
        {
            left_tag_table_element = this.m_tags.getTableSeatSevenLeft();
            right_tag_table_element = this.m_tags.getTableSeatSevenRight();
        }
        else if (i_table_pair_number == 8)
        {
            left_tag_table_element = this.m_tags.getTableSeatEightLeft();
            right_tag_table_element = this.m_tags.getTableSeatEightRight();
        }   
        else if (i_table_pair_number == 9)
        {
            left_tag_table_element = this.m_tags.getTableSeatNineLeft();
            right_tag_table_element = this.m_tags.getTableSeatNineRight();
        }
        else if (i_table_pair_number == 10)
        {
            left_tag_table_element = this.m_tags.getTableSeatTenLeft();
            right_tag_table_element = this.m_tags.getTableSeatTenRight();
        }   
        else if (i_table_pair_number == 11)
        {
            left_tag_table_element = this.m_tags.getTableSeatElevenLeft();
            right_tag_table_element = this.m_tags.getTableSeatElevenRight();
        }
        else if (i_table_pair_number == 12)
        {
            left_tag_table_element = this.m_tags.getTableSeatTwelveLeft();
            right_tag_table_element = this.m_tags.getTableSeatTwelveRight();
        }
        else if (i_table_pair_number == 13)
        {
            left_tag_table_element = this.m_tags.getTableSeatThirteenLeft();
            right_tag_table_element = this.m_tags.getTableSeatThirteenRight();
        }
        else if (i_table_pair_number == 14)
        {
            left_tag_table_element = this.m_tags.getTableSeatFourteenLeft();
            right_tag_table_element = this.m_tags.getTableSeatFourteenRight();
        }
        else if (i_table_pair_number == 15)
        {
            left_tag_table_element = this.m_tags.getTableSeatFifteenLeft();
            right_tag_table_element = this.m_tags.getTableSeatFifteenRight();
        }
        else if (i_table_pair_number == 16)
        {
            left_tag_table_element = this.m_tags.getTableSeatSixteenLeft();
            right_tag_table_element = this.m_tags.getTableSeatSixteenRight();
        }
        else if (i_table_pair_number == 17)
        {
            left_tag_table_element = this.m_tags.getTableSeatSeventeenLeft();
            right_tag_table_element = this.m_tags.getTableSeatSeventeenRight();
        }
        else if (i_table_pair_number == 18)
        {
            left_tag_table_element = this.m_tags.getTableSeatEighteenLeft();
            right_tag_table_element = this.m_tags.getTableSeatEighteenRight();
        }
        else if (i_table_pair_number == 19)
        {
            left_tag_table_element = this.m_tags.getTableSeatNineteenLeft();
            right_tag_table_element = this.m_tags.getTableSeatNineteenRight();
        }
        else if (i_table_pair_number == 20)
        {
            left_tag_table_element = this.m_tags.getTableSeatTwentyLeft();
            right_tag_table_element = this.m_tags.getTableSeatTwentyRight();
        }

        this.deleteTableSeatBooleanIfExisting(table_node, left_tag_table_element);
        this.deleteTableSeatBooleanIfExisting(table_node, right_tag_table_element);

    } // deleteTableSeatBooleanPairElements

    // Delete a seat boolean element if it exists
    deleteTableSeatBooleanIfExisting(i_table_node, i_tag_table_element)
    {
        var table_node_elements = i_table_node.getElementsByTagName(i_tag_table_element);

        if (table_node_elements.length == 0  )
        {
            return;
        }
        else if (table_node_elements.length > 1)
        {
            alert("deleteTableSeatBooleanIfExisting: ERROR: Multiple table node elements found for tag = " + i_tag_table_element);
            return;
        }

        var table_child_node = table_node_elements[0];

        table_child_node.parentNode.removeChild(table_child_node);

        debugLayoutXmlTable('deleteTableSeatBooleanIfExisting: Deleted table seat boolean element with tag = ' + i_tag_table_element);

    } // deleteTableSeatBooleanIfExisting

    // Returns the table node value for a given tag name and a given table number
    getTableNodeElement(i_table_number)
    {
        var ret_node_element = null;

        if(!this.m_layout_xml.checkTableNumber(i_table_number)) { return ret_node_element; }

        var index_table = i_table_number - 1;
        
        var table_node = this.getXmlObject().getElementsByTagName(this.m_tags.getTable())[index_table];

        ret_node_element = table_node;

        return ret_node_element;

    } // getTableNodeElement

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////// End Delete Functions ////////////////////////////
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

    // Set a table element in the layout xml object for a given table number identity string
    // i_table_element is an instance of the class Table
    setTableElementForTableNumberIdentity(i_table_element)
    {
        var table_number_identity_str = i_table_element.getNumber();

        var table_number = this.getXmlTableNumberForTableNumberIdentity(table_number_identity_str);

        if (table_number <= 0)
        {
            debugLayoutXmlTable('setTableElementForTableNumberIdentity: ERROR: No table with table number identity string = ' + table_number_identity_str);

            alert('ERROR: No table with table number identity string = ' + i_table_number_identity_str);

            return;
        }

        this.setTableElement(table_number, i_table_element);

    } // setTableElementForTableNumberIdentity

    // Set a table element in the layout xml object
    // i_table_number is the table number (number) for the table element to set
    // i_table_element is an instance of the class Table
    setTableElement(i_table_number, i_table_element)
    {
        var table_number_str = i_table_element.getNumber();
        this.m_layout_xml.setTableNumber(i_table_number, table_number_str);

        var upper_left_x_int = i_table_element.getUpperLeftX();
        this.m_layout_xml.setTableUpperLeftX(i_table_number, upper_left_x_int.toString());

        var upper_left_y_int = i_table_element.getUpperLeftY();
        this.m_layout_xml.setTableUpperLeftY(i_table_number, upper_left_y_int.toString());

        var width_int = i_table_element.getWidth();
        this.m_layout_xml.setTableWidth(i_table_number, width_int.toString());

        var height_int = i_table_element.getHeight();
        this.m_layout_xml.setTableHeight(i_table_number, height_int.toString());

        var number_left_right_seats_int = i_table_element.getNumberLeftRightSeats();
        this.m_layout_xml.setTableNumberLeftRightSeats(i_table_number, number_left_right_seats_int.toString());

        var table_text_str = i_table_element.getText();
        this.m_layout_xml.setTableText(i_table_number, table_text_str);

        this.setSeatBooleanValuesToTableElement(i_table_number, i_table_element);

    } // setTableElement

    // Set the boolean values for the seats for a given table element in the layout xml object
    setSeatBooleanValuesToTableElement(i_table_number, i_table_element)
    {
        var number_left_right_seats = i_table_element.getNumberLeftRightSeats();

        debugLayoutXmlTable('setSeatBooleanValuesToTableElement: i_table_number = ' + i_table_number + 
            ', number_left_right_seats = ' + number_left_right_seats);

        this.deleteAllTableSeatBooleanElements(i_table_number);

    } // setSeatBooleanValuesToTableElement

    // Returns an instance of the class Table for a given table number
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

        var table_text_str = this.m_layout_xml.getTableText(i_table_number);
        ret_table_element.setText(table_text_str);

        debugLayoutXmlTable('getTableElement: \nNumber (string) = ' + ret_table_element.getNumber() + 
        '\nupper_left_x = ' + ret_table_element.getUpperLeftX() + '\nupper_left_y = ' + 
        ret_table_element.getUpperLeftY() + '\nwidth = ' + ret_table_element.getWidth() + 
        '\nheight = ' + ret_table_element.getHeight() + '\nnumber_left_right_seats = ' + 
        ret_table_element.getNumberLeftRightSeats() + '\ni_table_number = ' + i_table_number +
        '\ntable_text_str = ' + table_text_str);

        ret_table_element = this.addSeatBooleanValuesToTableElement(i_table_number, ret_table_element);

        return ret_table_element;

    } // getTableElement

    // Returns an instance of the class Table for a given table number identity string
    getTableElementForTableNumberIdentity(i_table_number_identity_str)
    {
        var table_number = this.getXmlTableNumberForTableNumberIdentity(i_table_number_identity_str);

        if (table_number <= 0)
        {
            debugLayoutXmlTable('getTableElementForTableNumberIdentity: ERROR: No table with table number identity string = ' + i_table_number_identity_str);
            
            return null;
        }

        return this.getTableElement(table_number);

    } // getTableElementForTableNumberIdentity

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
            ret_table_element.setLeftSeatBoolString(1, seat_one_left);
			var seat_one_right = this.m_layout_xml.getTableSeatOneRight(table_number);
			ret_table_element.setRightSeatBoolString(1, seat_one_right);
        }
    
        if (number_left_right_seats >= 4)
        {
            var seat_two_left = this.m_layout_xml.getTableSeatTwoLeft(table_number);
            ret_table_element.setLeftSeatBoolString(2, seat_two_left);
			var seat_two_right = this.m_layout_xml.getTableSeatTwoRight(table_number);
			ret_table_element.setRightSeatBoolString(2, seat_two_right);
        }

        if (number_left_right_seats >= 6)
        {
            var seat_three_left = this.m_layout_xml.getTableSeatThreeLeft(table_number);
            ret_table_element.setLeftSeatBoolString(3, seat_three_left);
            var seat_three_right = this.m_layout_xml.getTableSeatThreeRight(table_number);
            ret_table_element.setRightSeatBoolString(3, seat_three_right);
        }

        if (number_left_right_seats >= 8)
        {
            var seat_four_left = this.m_layout_xml.getTableSeatFourLeft(table_number);
            ret_table_element.setLeftSeatBoolString(4, seat_four_left);
            var seat_four_right = this.m_layout_xml.getTableSeatFourRight(table_number);
            ret_table_element.setRightSeatBoolString(4, seat_four_right);
        }

        if (number_left_right_seats >= 10)
        {
            var seat_five_left = this.m_layout_xml.getTableSeatFiveLeft(table_number);
            ret_table_element.setLeftSeatBoolString(5, seat_five_left);
            var seat_five_right = this.m_layout_xml.getTableSeatFiveRight(table_number);
            ret_table_element.setRightSeatBoolString(5, seat_five_right);
        }

        if (number_left_right_seats >= 12)
        {
            var seat_six_left = this.m_layout_xml.getTableSeatSixLeft(table_number);
            ret_table_element.setLeftSeatBoolString(6, seat_six_left);
            var seat_six_right = this.m_layout_xml.getTableSeatSixRight(table_number);
            ret_table_element.setRightSeatBoolString(6, seat_six_right);
        }

        if (number_left_right_seats >= 14)
        {
            var seat_seven_left = this.m_layout_xml.getTableSeatSevenLeft(table_number);
            ret_table_element.setLeftSeatBoolString(7, seat_seven_left);
            var seat_seven_right = this.m_layout_xml.getTableSeatSevenRight(table_number);
            ret_table_element.setRightSeatBoolString(7, seat_seven_right);
        }   

        if (number_left_right_seats >= 16)
        {
            var seat_eight_left = this.m_layout_xml.getTableSeatEightLeft(table_number);
            ret_table_element.setLeftSeatBoolString(8, seat_eight_left);
            var seat_eight_right = this.m_layout_xml.getTableSeatEightRight(table_number);
            ret_table_element.setRightSeatBoolString(8, seat_eight_right);
        }

        if (number_left_right_seats >= 18)
        {
            var seat_nine_left = this.m_layout_xml.getTableSeatNineLeft(table_number);
            ret_table_element.setLeftSeatBoolString(9, seat_nine_left);
            var seat_nine_right = this.m_layout_xml.getTableSeatNineRight(table_number);
            ret_table_element.setRightSeatBoolString(9, seat_nine_right);
        }

        if (number_left_right_seats >= 20)
        {
            var seat_ten_left = this.m_layout_xml.getTableSeatTenLeft(table_number);
            ret_table_element.setLeftSeatBoolString(10, seat_ten_left);
            var seat_ten_right = this.m_layout_xml.getTableSeatTenRight(table_number);
            ret_table_element.setRightSeatBoolString(10, seat_ten_right);
        }

        if (number_left_right_seats >= 22)
        {
            var seat_eleven_left = this.m_layout_xml.getTableSeatElevenLeft(table_number);
            ret_table_element.setLeftSeatBoolString(11, seat_eleven_left);
            var seat_eleven_right = this.m_layout_xml.getTableSeatElevenRight(table_number);
            ret_table_element.setRightSeatBoolString(11, seat_eleven_right);
        }

        if (number_left_right_seats >= 24)
        {
            var seat_twelve_left = this.m_layout_xml.getTableSeatTwelveLeft(table_number);
            ret_table_element.setLeftSeatBoolString(12, seat_twelve_left);
            var seat_twelve_right = this.m_layout_xml.getTableSeatTwelveRight(table_number);
            ret_table_element.setRightSeatBoolString(12, seat_twelve_right);
        }

        if (number_left_right_seats >= 26)
        {
            var seat_thirteen_left = this.m_layout_xml.getTableSeatThirteenLeft(table_number);
            ret_table_element.setLeftSeatBoolString(13, seat_thirteen_left);
            var seat_thirteen_right = this.m_layout_xml.getTableSeatThirteenRight(table_number);
            ret_table_element.setRightSeatBoolString(13, seat_thirteen_right);
        }

        if (number_left_right_seats >= 28)
        {
            var seat_fourteen_left = this.m_layout_xml.getTableSeatFourteenLeft(table_number);
            ret_table_element.setLeftSeatBoolString(14, seat_fourteen_left);
            var seat_fourteen_right = this.m_layout_xml.getTableSeatFourteenRight(table_number);
            ret_table_element.setRightSeatBoolString(14, seat_fourteen_right);  
        }

        if (number_left_right_seats >= 30)
        {
            var seat_fifteen_left = this.m_layout_xml.getTableSeatFifteenLeft(table_number);
            ret_table_element.setLeftSeatBoolString(15, seat_fifteen_left);
            var seat_fifteen_right = this.m_layout_xml.getTableSeatFifteenRight(table_number);
            ret_table_element.setRightSeatBoolString(15, seat_fifteen_right);
        }

        if (number_left_right_seats >= 32)
        {
            var seat_sixteen_left = this.m_layout_xml.getTableSeatSixteenLeft(table_number);
            ret_table_element.setLeftSeatBoolString(16, seat_sixteen_left);
            var seat_sixteen_right = this.m_layout_xml.getTableSeatSixteenRight(table_number);
            ret_table_element.setRightSeatBoolString(16, seat_sixteen_right);
        }

        if (number_left_right_seats >= 34)
        {
            var seat_seventeen_left = this.m_layout_xml.getTableSeatSeventeenLeft(table_number);
            ret_table_element.setLeftSeatBoolString(17, seat_seventeen_left);
            var seat_seventeen_right = this.m_layout_xml.getTableSeatSeventeenRight(table_number);
            ret_table_element.setRightSeatBoolString(17, seat_seventeen_right);
        }

        if (number_left_right_seats >= 36)
        {
            var seat_eightteen_left = this.m_layout_xml.getTableSeatEightteenLeft(table_number);
            ret_table_element.setLeftSeatBoolString(18, seat_eightteen_left);
            var seat_eightteen_right = this.m_layout_xml.getTableSeatEightteenRight(table_number);
            ret_table_element.setRightSeatBoolString(18, seat_eightteen_right);
        }

        if (number_left_right_seats >= 38)
        {   
            var seat_nineteen_left = this.m_layout_xml.getTableSeatNineteenLeft(table_number);
            ret_table_element.setLeftSeatBoolString(19, seat_nineteen_left);
            var seat_nineteen_right = this.m_layout_xml.getTableSeatNineteenRight(table_number);
            ret_table_element.setRightSeatBoolString(19, seat_nineteen_right);
        }

        if (number_left_right_seats >= 40)
        {
            var seat_twenty_left = this.m_layout_xml.getTableSeatTwentyLeft(table_number);
            ret_table_element.setLeftSeatBoolString(20, seat_twenty_left);
            var seat_twenty_right = this.m_layout_xml.getTableSeatTwentyRight(table_number);
            ret_table_element.setRightSeatBoolString(20, seat_twenty_right);
        }

        var seat_upper = this.m_layout_xml.getTableSeatUpper(table_number);
        ret_table_element.setUpperSeatBoolString(seat_upper);

        var seat_lower = this.m_layout_xml.getTableSeatLower(table_number);
        ret_table_element.setLowerSeatBoolString(seat_lower);

        return ret_table_element;

    } // addSeatBooleanValuesToTableElement

    // Returns the table number (string) for a given table number identity string
    getXmlTableNumberForTableNumberIdentity(i_table_number_identity_str)
    {
        var ret_table_number = -12345;

        var table_number_is_found = false;

        var n_tables = this.m_layout_xml.getNumberOfTables();

        for (var table_number = 1; table_number <= n_tables; table_number++)
        {
            var table_number_identity = this.m_layout_xml.getTableNumber(table_number);    

            if (table_number_identity == i_table_number_identity_str)
            {
                ret_table_number = table_number;

                if (!table_number_is_found)
                {
                    table_number_is_found = true;
                }
                else
                {
                    debugLayoutXmlTable('getXmlTableNumberForTableNumberIdentity: ERROR: Two tables with the same table number identity string = ' + i_table_number_identity_str);

                    alert('ERROR: Two tables with the same table number identity string = ' + i_table_number_identity_str);

                    return -12345;
                }
            } // Identity found

        } // table_number

        debugLayoutXmlTable('getXmlTableNumberForTableNumberIdentity: i_table_number_identity_str = ' + 
            i_table_number_identity_str + ', ret_table_number = ' + ret_table_number);

        return ret_table_number;

    } // getXmlTableNumberForTableNumberIdentity

    // Returns an instance of the class TableProperties with general data for tables 
    // from the layout xml object
    getTableProperties()
    {
        var ret_table_properties = new TableProperties();

        ret_table_properties.setColor(this.m_layout_xml.getTableColor());

        ret_table_properties.setStrokeColor(this.m_layout_xml.getTableStrokeColor());

        ret_table_properties.setStrokeWidth(this.m_layout_xml.getTableStrokeWidth());

        ret_table_properties.setTextRelXProcent(parseInt(this.m_layout_xml.getTableTextRelXProcent()));

        ret_table_properties.setTextRelYProcent(parseInt(this.m_layout_xml.getTableTextRelYProcent()));

        ret_table_properties.setTextColor(this.m_layout_xml.getTableTextColor());

        return ret_table_properties;
        
    } // getTableProperties

    // Sets XML data from an instance of the class TableProperties with general data for tables
    // TODO  this.setFlagNodeValueIsNotSetForEmptyString()
    setTableProperties(i_table_properties)
    {
        this.m_layout_xml.setTableColor(i_table_properties.getColor());
        this.m_layout_xml.setTableStrokeColor(i_table_properties.getStrokeColor());
        this.m_layout_xml.setTableStrokeWidth(i_table_properties.getStrokeWidth());
        this.m_layout_xml.setTableTextRelXProcent(i_table_properties.getTextRelXProcent().toString());
        this.m_layout_xml.setTableTextRelYProcent(i_table_properties.getTextRelYProcent().toString());
        this.m_layout_xml.setTableTextColor(i_table_properties.getTextColor());

    } // setTableProperties


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

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Class LayoutXmlTable ////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Class TableGroup Table TableProperties ////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Classes with functions that are holding table data for the layout. These classes are 
// used to set and get table data to and from the layout xml object in a more structured way.


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
        // Table number (string) is used to identify the 
        // table and must be unique in the layout
        this.m_number = "";
        this.m_upper_left_x = -12345;
        this.m_upper_left_y = -12345;
        this.m_width = -12345;
        this.m_height = -12345;
        this.m_number_left_right_seats = -12345;

        // Boolean values for the seats. The number of left 
        // and right seats is given by m_number_left_right_seats
        this.m_left_seat_array = new Array(20).fill(true);
        this.m_right_seat_array = new Array(20).fill(true);

        // Boolean values for upper and lower seats
        this.m_seat_upper = false;
        this.m_seat_lower = false;

        // Text description of the table
        this.m_text = "";       
    }

    // Get the table number (string). The table number is used to 
    // identify the table and must be unique in the layout
    getNumber()
    {
        return this.m_number;

    } // getNumber

    // Set the table number (string). The table number is used to 
    // identify the table and must be unique in the layout
    setNumber(i_number_str)
    {
        this.m_number = i_number_str;

    } // setNumber

    // Get the upper left x coordinate of the table (number)
    getUpperLeftX()
    {
        return parseInt(this.m_upper_left_x);

    } // getUpperLeftX

    // Set the upper left x coordinate of the table (number)
    setUpperLeftX(i_upper_left_x)
    {
        this.m_upper_left_x = parseInt(i_upper_left_x);

    } // setUpperLeftX

    // Get the upper left y coordinate of the table (number)
    getUpperLeftY()
    {
        return parseInt(this.m_upper_left_y); 

    } // getUpperLeftY

    // Set the upper left y coordinate of the table (number)
    setUpperLeftY(i_upper_left_y)
    {
        this.m_upper_left_y = parseInt(i_upper_left_y);

    } // setUpperLeftY

    // Get the width of the table (number)
    getWidth()
    {
        return parseInt(this.m_width);

    } // getWidth

    // Set the width of the table (number)
    setWidth(i_width)
    {
        this.m_width = parseInt(i_width);

    } // setWidth

    // Get the height of the table (number)
    getHeight()
    {
        return parseInt(this.m_height);

    } // getHeight

    // Set the height of the table (number)
    setHeight(i_height)
    {
        this.m_height = parseInt(i_height);

    } // setHeight

    // Get the number of left and right seats (number)
    getNumberLeftRightSeats()
    {
        return parseInt(this.m_number_left_right_seats);

    } // getNumberLeftRightSeats

    // Set the number of left and right seats (number)
    setNumberLeftRightSeats(i_left_right_seats)
    {
        this.m_number_left_right_seats = parseInt(i_left_right_seats);

    } // setNumberLeftRightSeats

    // Get the text of the table (string)
    getText()
    {
        return this.m_text;

    } // getText

    // Set the text of the table (string)
    setText(i_text_str)
    {
        this.m_text = i_text_str;

    } // setText

    // Get the boolean value for a left seat with a given seat number (number)
    getLeftSeatBool(i_seat_number)
    {
        if (i_seat_number < 1 || i_seat_number > 20)
        {
            alert('ERROR: getLeftSeatBool: i_seat_number must be between 1 and 20. i_seat_number = ' + i_seat_number);

            return false;
        }

        // console.log('getLeftSeatBool: i_seat_number = ' + i_seat_number + ', this.m_left_seat_array[i_seat_number - 1] = ' + this.m_left_seat_array[i_seat_number - 1]);

        return this.m_left_seat_array[i_seat_number - 1];

    } // getLeftSeatBool

    // Get the boolean value for a right seat with a given seat number (number)
    getRightSeatBool(i_seat_number)
    {
        if (i_seat_number < 1 || i_seat_number > 20)
        {
            alert('ERROR: getRightSeatBool: i_seat_number must be between 1 and 20. i_seat_number = ' + i_seat_number);

            return false;
        }

        // console.log('getRightSeatBool: i_seat_number = ' + i_seat_number + ', this.m_right_seat_array[i_seat_number - 1] = ' + this.m_right_seat_array[i_seat_number - 1]);

        return this.m_right_seat_array[i_seat_number - 1];

    } // getRightSeatBool

    // Set the boolean value for a left seat with a given seat number (number)
    setLeftSeatBool(i_seat_number, i_value_bool)
    {
        if (i_seat_number < 1 || i_seat_number > 20)
        {
            alert('ERROR: setLeftSeatBool: i_seat_number must be between 1 and 20. i_seat_number = ' + i_seat_number);
            return false;
        }

        this.m_left_seat_array[i_seat_number - 1] = i_value_bool;   

    } // setLeftSeatBool

    // Set the boolean value for a right seat with a given seat number (number)
    setRightSeatBool(i_seat_number, i_value_bool)   
    {
        if (i_seat_number < 1 || i_seat_number > 20)
        {
            alert('ERROR: setRightSeatBool: i_seat_number must be between 1 and 20. i_seat_number = ' + i_seat_number);
            return false;
        }

        this.m_right_seat_array[i_seat_number - 1] = i_value_bool;

    } // setRightSeatBool


    // Set the boolean value for a left seat with a given seat number (number)
    setLeftSeatBoolString(i_seat_number, i_value_str)
    {
        if (i_seat_number < 1 || i_seat_number > 20)
        {
            alert('ERROR: setLeftSeatBoolString: i_seat_number must be between 1 and 20. i_seat_number = ' + i_seat_number);

            return false;
        }

        var value_bool = true;

        if (i_value_str.toLowerCase() == "true")
        {
            value_bool = true;
        }
        else if (i_value_str.toLowerCase() == "false")
        {
            value_bool = false;
        }

        this.m_left_seat_array[i_seat_number - 1] = value_bool;

    } // setLeftSeatBoolString

    // Set the boolean value for a right seat with a given seat number (number)
    setRightSeatBoolString(i_seat_number, i_value_str)
    {
        if (i_seat_number < 1 || i_seat_number > 20)
        {
            alert('ERROR: setRightSeatBoolString: i_seat_number must be between 1 and 20. i_seat_number = ' + i_seat_number);

            return false;
        }

        var value_bool = true;

        if (i_value_str.toLowerCase() == "true")
        {
            value_bool = true;
        }
        else if (i_value_str.toLowerCase() == "false")
        {
            value_bool = false;
        }

        this.m_right_seat_array[i_seat_number - 1] = value_bool;

    } // setRightSeatBoolString

    // Get the boolean value for the upper seat (number)
    getSeatUpperBool()
    {
       //  console.log('getSeatUpperBool: this.m_seat_upper = ' + this.m_seat_upper);
        return this.m_seat_upper;

    } // getSeatUpperBool

    // Set the boolean value for the upper seat (number)
    setUpperSeatBoolString(i_value_str)
    {
        var value_bool = true;

        if (i_value_str.toLowerCase() == "true")
        {
            value_bool = true;
        }
        else if (i_value_str.toLowerCase() == "false")
        {
            value_bool = false;
        }

        this.m_seat_upper = value_bool;

    } // setUpperSeatBoolString

    // Get the boolean value for the lower seat (number)
    getLowerSeatBool()
    {
        // console.log('getLowerSeatBool: this.m_seat_lower = ' + this.m_seat_lower);
        return this.m_seat_lower;

    } // getLowerSeatBool

    // Set the boolean value for the lower seat (number)
    setLowerSeatBoolString(i_value_str)
    {
        var value_bool = true;

        if (i_value_str.toLowerCase() == "true")
        {
            value_bool = true;
        }
        else if (i_value_str.toLowerCase() == "false")
        {
            value_bool = false;
        }

        this.m_seat_lower = value_bool;

    } // setLowerSeatBoolString

    // Set the boolean value for the upper seat (number)
    setUpperSeatBool(i_value_bool)
    {
        this.m_seat_upper = i_value_bool;

    } // setUpperSeatBool

    // Set the boolean value for the lower seat (number)
    setLowerSeatBool(i_value_bool)
    {
        this.m_seat_lower = i_value_bool;

    } // setLowerSeatBool

} // Table

// Properties for Table element in the class ReservationLayoutXml
class TableProperties
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

} // TableProperties

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Class TableGroup Table TableProperties //////////////////////
///////////////////////////////////////////////////////////////////////////////////////////


// Debug function for the class LayoutXmlTable
function debugLayoutXmlTable(i_text)
{
    // Temporary QQQQQQQQQQQQQQQQQ console.log(i_text);

} // debugLayoutXmlTable