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
    
    ///////////////////////////////////////////////////////////////////////////
    /////// Start Get And Set Styles //////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

} // InputEventReservationStyle

// https://sdkcon78221.crestron.com/sdk/Crestron_HTML5UI/Content/Topics/Reference/Development/Change-CSS.htm
// setAttribute(key, value) can also be used to set a style on an element. For example, the color of an element can to red by calling element.setAttribute('style', 'color: red');
