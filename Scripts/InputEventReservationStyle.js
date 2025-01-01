// File: InputEventReservationStyle.js
// Date: 2025-01-01
// Author: Gunnar Lidén

// Class with style strings for the application
class InputEventReservationStyle
{
    constructor()
    {
        // The style for the input form div
        this.m_form_style = '';

        // The style for a row of the form
        this.m_row_style = '';

        // The style for the left element in a row element
        this.m_element_left_style = '';

        // The style for the right element in a row element
        this.m_element_right_style = '';

        // The style for the header div
        this.m_header_style = '';

        // The style for the event name div
        this.m_event_name_style = '';

        // The style for the label name div
        this.m_label_name_style = '';

        // The style for the label email div
        this.m_label_email_style = '';

        // The style for the label remark div
        this.m_label_remark_style = '';

        // The style for the event dropdown div
        this.m_event_dropdown_style = '';

        // The style for the open reservation button
        this.m_button_open_reservation_style = '';

        // The style for the the info buttons
        this.m_button_info_style = '';

        this.default();

    } // constructor

    ///////////////////////////////////////////////////////////////////////////
    /////// Start Default Styles //////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    default()
    {
        this.m_form_style = this.defaultForm();

        this.m_row_style = this.defaultRow();

        this.m_element_left_style = this.defaultLeftElement();

        this.m_element_right_style = this.defaultRightElement();

        this.m_header_style = this.defaultHeaderStyle();

        this.m_event_name_style = this.defaultEventNameStyle();

        this.m_label_name_style = this.defaultLabelNameStyle();

        this.m_label_email_style = this.defaultLabelEmailStyle();

        this.m_label_remark_style = this.defaultLabelRemarkStyle();

        this.m_event_dropdown_style = this.defaultEventDropdownStyle();

        this.m_button_open_reservation_style = this.defaultButtonOpenReservationStyle();

        this.m_button_info_style = this.defaultButtonInfoStyle();

    } // default

    // Sets the default style for the input form div
    defaultForm()
    {
        return 'clear: both; min-height: 420px; margin-left: 0px; margin-bottom: 10px;'
                + ' font-family: Arial, Helvetica, sans-serif; font-size: 14px;' 
                + 'background-color: rgb(223, 224, 225); border: 3px solid black; ';

    } // defaultForm

    // Sets the default style for a row of the form
    defaultRow()
    {
        return 'clear: both; width: 94%; min-height: 15px; padding-left: 3%; overflow: hidden; '; // border: 1px solid blue;

    } // defaultRow

    // Sets the default style for the left element in a row element
    defaultLeftElement()
    {
        return 'float: left; width: 78%; min-height: 15px; margin-left: 3%; margin-top:0px; margin-bottom:10px;'; //  border: 1px solid red;

    } // defaultLeftElement

    // Sets the default style for the right element in a row element
    defaultRightElement()
    {
        return 'float: right; width: 10%; min-height: 15px; margin-right: 3%; margin-top:0px; margin-bottom:10px; '; //  border: 1px solid green;

    } // defaultRightElement

    // The default style for the header div
    defaultHeaderStyle()
    {
        return 'font-size: 16px; background-color: black; color: white; text-align: center;  margin-left: 1.5%; margin-bottom: 5px; padding-top: 5px; padding-bottom: 5px; ';

    } // defaultHeaderText

    // The default style for the event name div
    defaultEventNameStyle()
    {
        return 'font-size: 12px; background-color: #555555; color: white; text-align: center; padding-top: 5px; padding-bottom: 5px; ' + 
            ' width: 94%; width: 94%;  margin-left: 3%; margin-top: 6px; margin-bottom: 12px; ';

    } // defaultEventNameStyle		

    // The default style for the label divs
    defaultLabelDivStyle()
    {
        return 'font-size: 12px; padding-left: 18px; text-align: left;';

    } // defaultLabelDivStyle

    // The default style for the label name div
    defaultLabelNameStyle()
    {
        return this.defaultLabelDivStyle();

    } // defaultHeaderText

    // The default style for the label email div
    defaultLabelEmailStyle()
    {
        return this.defaultLabelDivStyle();

    } // defaultHeaderText

    // The default style for the label remark div
    defaultLabelRemarkStyle()
    {
        return this.defaultLabelDivStyle();

    } // defaultHeaderText

    // The default style for the event dropdown div
    defaultEventDropdownStyle()
    {
        return 'font-size: 14px; text-align: center;';

    } // defaultHeaderText

    // The default style for the open reservation button
    defaultButtonOpenReservationStyle()
    {
		var ret_style = '';
		
		ret_style = ret_style + 'background-color: #555555; ';
		
		ret_style = ret_style + 'border: none; ';
		
		ret_style = ret_style + 'color: white; ';
		
		ret_style = ret_style + 'padding: 10px 10px; ';
		
		ret_style = ret_style + 'text-align: center; ';
		
		ret_style = ret_style + 'text-decoration: none; ';
		
		ret_style = ret_style + 'display: block; ';
		
		ret_style = ret_style + 'font-size: 12px; ';
		
		ret_style = ret_style + 'margin-top: 1px; ';
		
		ret_style = ret_style + 'margin-bottom: 1px; ';
		
		ret_style = ret_style + 'margin-left: auto; ';
		
		ret_style = ret_style + 'margin-right: auto;';
		
		ret_style = ret_style + 'cursor: pointer;';
		
        return ret_style;

    } // defaultButtonOpenReservationStyle

    // The default style for the round info buttons
    // padding and font-size determine the size
    // https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_round_buttons
    defaultButtonInfoStyle()
    {
		var ret_style = '';
		
		ret_style = ret_style + 'background-color: #555555; ';

        ret_style = ret_style + 'border-radius: 50%; ';
		
		ret_style = ret_style + 'border: none; ';
		
		ret_style = ret_style + 'color: white; ';
		
		ret_style = ret_style + 'padding: 4px; ';
		
		ret_style = ret_style + 'text-align: center; ';
		
		ret_style = ret_style + 'text-decoration: none; ';
		
		ret_style = ret_style + 'display: inline-block; ';
		
		ret_style = ret_style + 'font-size: 10px; ';

        //ret_style = ret_style + 'font-weight: 900;' // bold = 700
		
		ret_style = ret_style + 'margin: 0px 0px; ';
		
		ret_style = ret_style + 'cursor: pointer;';
		
        return ret_style;

    } // defaultButtonInfoStyle

    ///////////////////////////////////////////////////////////////////////////
    /////// End Default Styles ////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    /////// Start Get And Set Styles //////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Returns the style for the input form div
    getForm()
    {
        return this.m_form_style;
    }

    // Sets the style for the input form div
    setForm(i_form_style)
    {
        this.m_form_style = i_form_style;
    }

    // Returns the style for a row of the form
    getRow()
    {
        return this.m_row_style;

    } // getRow

    // Sets the style for a row of the form
    setRow(i_row_style)
    {
        this.m_row_style = i_row_style;

    } // setRow

    // Returns the style for the left element in a row element
    getLeftElement()
    {
        return this.m_element_left_style;

    } // getLeftElement

    // Sets the style for the left element in a row element
    setLeftElement(i_element_left_style)
    {
        this.m_element_left_style = i_element_left_style;
        
    } // setLeftElement

    // Returns the style for the right element in a row element
    getRightElement()
    {
        return this.m_element_right_style;

    } // getRightElement

    // Sets the style for the right element in a row element
    setRightElement(i_element_right_style)
    {
        this.m_element_right_style = i_element_right_style;
        
    } // setRightElement

    // Returns the style for the header div
    getHeader()
    {
        return this.m_header_style;

    } // getHeader

    // Sets the style for the header div
    setHeader(i_header_style)
    {
        this.m_header_style = i_header_style;

    } // setHeader

    // Returns the style for the event name div
    getEventName()
    {
        return this.m_event_name_style;

    } // getEventName

    // Sets the style for the event name div
    setEventName(i_event_name_style)
    {
        this.m_event_name_style = i_event_name_style;

    } // setEventName	

    // Returns the style for the label name div
    getLabelName()
    {
        return this.m_label_name_style;

    } // getLabelName

    // Sets the style for the label name div
    setLabelName(i_label_name_style)
    {
        this.m_label_name_style = i_label_name_style;

    } // setLabelName
    
	// Returns the style for the label email div
    getLabelEmail()
    {
        return this.m_label_email_style;

    } // getLabelEmail

	// Sets the style for the label email div
    setLabelEmail(i_label_email_style)
    {
        this.m_label_email_style = i_label_email_style;

    } // setLabelEmail

	// Returns the style for the label remark div
    getLabelRemark()
    {
        return this.m_label_remark_style;

    } // getLabelRemark

	// Sets the style for the label remark div
    setLabelRemark(i_label_remark_style)
    {
        this.m_label_remark_style = i_label_remark_style;

    } // setLabelRemark

	// Returns the style for the event dropdown div
    getEventDropdown()
    {
        return this.m_event_dropdown_style;

    } // getEventDropdown

	// Sets the style for the event dropdown div
    setEventDropdown(i_event_dropdown_style)
    {
        this.m_event_dropdown_style = i_event_dropdown_style;

    } // setEventDropdown

	// Returns the style for the open reservation button
    getButtonOpenReservationStyle()
    {
        return this.m_button_open_reservation_style;

    } // getButtonOpenReservationStyle

	// Sets the style for the open reservation button
    setButtonOpenReservationStyle(i_button_open_reservation_style)
    {
        this.m_button_open_reservation_style = i_button_open_reservation_style;

    } // setButtonOpenReservationStyle

	// Returns the style for the the info buttons
    getButtonInfoStyle()
    {
        return this.m_button_info_style;

    } // getButtonInfoStyle

	// Sets the style for the the info buttons
    setButtonInfoStyle(i_button_info_style)
    {
        this.m_button_info_style = i_button_info_style;

    } // setButtonInfoStyle		
    
    ///////////////////////////////////////////////////////////////////////////
    /////// Start Get And Set Styles //////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

} // InputEventReservationStyle
