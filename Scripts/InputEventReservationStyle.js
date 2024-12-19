// File: InputEventReservationStyle.js
// Date: 2024-12-19
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

        // The style for the label name div
        this.m_label_name_style = '';

        // The style for the label email div
        this.m_label_email_style = '';

        // The style for the label remark div
        this.m_label_remark_style = '';

        // The style for the event dropdown div
        this.m_event_dropdown_style = '';

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

        this.m_label_name_style = this.defaultLabelNameStyle();

        this.m_label_email_style = this.defaultLabelEmailStyle();

        this.m_label_remark_style = this.defaultLabelRemarkStyle();

        this.m_event_dropdown_style = this.defaultEventDropdownStyle();

    } // default

    // Sets the default style for the input form div
    defaultForm()
    {
        return 'clear: both; min-height: 500px; margin-left: 0px; margin-bottom: 10px;'
                + ' font-family: Arial, Helvetica, sans-serif; font-size: 14px;' 
                + 'background-color: rgb(223, 224, 225); border: 3px solid black; ';

    } // defaultForm

    // Sets the default style for a row of the form
    defaultRow()
    {
        return 'clear: both; width: 94%; min-height: 15px; margin-left: 3%; margin-top:5px; overflow: hidden; border: 1px solid blue; ';

    } // defaultRow

    // Sets the default style for the left element in a row element
    defaultLeftElement()
    {
        return 'float: left; width: 80%; min-height: 15px; margin-left: 3%; margin-top:5px; margin-bottom:5px; border: 1px solid red;';

    } // defaultLeftElement

    // Sets the default style for the right element in a row element
    defaultRightElement()
    {
        return 'float: right; width: 10%; min-height: 15px; margin-right: 3%; margin-top:5px; margin-bottom:5px;  border: 1px solid green;';

    } // defaultRightElement

    // The default style for the header div
    defaultHeaderStyle()
    {
        return 'font-size: 14px; background-color: black; color: white; text-align: center;';

    } // defaultHeaderText

    // The default style for the label divs
    defaultLabelDivStyle()
    {
        return 'font-size: 14px; text-align: left;';

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

    // Sets the style for a row of the form
    setRow(i_row_style)
    {
        this.m_row_style = i_row_style;

    } // setRow

    getHeader()
    {
        return this.m_header_style;

    } // getHeader

    setHeader(i_header_style)
    {
        this.m_header_style = i_header_style;

    } // setHeader

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
    
    ///////////////////////////////////////////////////////////////////////////
    /////// Start Get And Set Styles //////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

} // InputEventReservationStyle
