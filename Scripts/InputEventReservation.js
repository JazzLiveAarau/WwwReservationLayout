// File: InputEventReservation.js
// Date: 2024-12-21
// Author: Gunnar Lidén

// File content
// =============
//
// Class that creates a form for the input of reservation data
// The class has member function that checks the input data

// User selected a new item of the event program dropdown
// Must be a global function. Member functions are not allowed
function globalOnChangeEventProgramDropdown()
{
    g_input_event_reservation.onChangeEventProgramDropdown();

} // globalOnChangeEventProgramDropdown

class InputEventReservation
{
    // Creates the instance of the class
    // i_id_div_container: Identity for the div where the input form shall be created
    // i_event_program_xml: An EventProgramXml object that holds information about the events
    constructor(i_id_div_container, i_event_program_xml) 
    {
        // Member variables
        // ================

        //  Identity for the div where the input form shall be created
        this.m_id_div_container = i_id_div_container;

        // An EventProgramXml object that holds information about the events
        this.m_event_program_xml = i_event_program_xml;

        // Defines the event_number for the reservation. 
        // If not set (negative) the next event will be set
        this.m_active_event_number = -1;

        // Boolean flag telling if the form has been created
        this.m_form_created = false;

        // Boolean telling if the event dropdown control shall be displayed
        this.m_b_display_dropdown = true;

        // The div element where the input form shall be created
        this.m_element_div_container = null;

        // The event dropdown object EventProgramDropdown
        this.m_event_dropdown_el = null;

        // Identitity and object functions for class InputEventReservation
        this.m_id_el = new InputEventReservationIdElement();

        // Object defining all text strings for the application
        this.m_texts = new InputEventReservationText();

        // Object defining all style strings for the application
        this.m_styles = new InputEventReservationStyle();

        // Start string for all identities
        this.m_id_unique_str = "id_input_event_reserv_";

        // The width of the input form
        this.m_input_form_width = '310px';

        // The style for the input form div
        this.m_input_form_style_str = this.m_styles.getForm();

        // Style for a row div
        this.m_div_row_style_str = this.m_styles.getRow();

        // Style for a row left element
        this.m_element_left_style_str = this.m_styles.getLeftElement();

        // Style for a row right element
        this.m_element_right_style_str = this.m_styles.getRightElement();

        // Boolean flag telling if tabs and comments shall be removed
        this.m_remove_tabs_comments = false;

        // The minimum row length
        this.m_row_length_min = 80;

        this.m_current_accumulated_text_length = 0;

        // Flagg telling if debug shall be written to the console
        this.m_b_write_debug = true;

        this.setElementDivContainer();

    } // constructor

    ///////////////////////////////////////////////////////////////////////////
    /////// Start Create Form /////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Create the form
    create()
    {
        this.debug('InputEventReservation.create Enter');

        var html_str = this.getDivsHtml();

        var container_el = this.getElementDivContainer();

        container_el.innerHTML = html_str;

        this.setFormCreatedToTrue();

        this.contentHeader();

        this.contentLabelName();

        this.contentLabelEmail();

        this.contentLabelRemark();

        this.contentDropdown();

        this.debug('InputEventReservation.create Exit');

    } // create

    ///////////////////////////////////////////////////////////////////////////
    /////// End Create Form ///////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    /////// Start Event Functions /////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // User selected a new item of the event program dropdown
    // Must be a global function. Member functions are not allowed
    onChangeEventProgramDropdown()
    {
        var debug_msg = 'InputEventReservation.onChangeEventProgramDropdown Enter';

        this.debug(debug_msg);
        
        alert(debug_msg);

    } // onChangeEventProgramDropdown

    ///////////////////////////////////////////////////////////////////////////
    /////// End Event Functions ///////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    /////// Start Div Content Html Code ///////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Sets the content of the header div
    contentHeader()
    {
        var header_content_str = this.m_texts.getHeaderText();

        var header_el = this.m_id_el.getElementDivHeader();

        header_el.setAttribute('style', this.m_styles.getRow() +  this.m_styles.getHeader());

        header_el.innerHTML = header_content_str;

    } // contentHeader

    // Sets the content of the label name div
    contentLabelName()
    {
        var label_name_content_str = this.m_texts.getLabelName();

        var label_name_el = this.m_id_el.getElementDivLabelName();

        label_name_el.setAttribute('style', this.m_styles.getRow() +  this.m_styles.getLabelName());

        label_name_el.innerHTML = label_name_content_str;

    } // contentLabelName

    // Sets the content of the label email div
    contentLabelEmail()
    {
        var label_email_content_str = this.m_texts.getLabelEmail();

        var label_email_el = this.m_id_el.getElementDivLabelEmail();

        label_email_el.setAttribute('style', this.m_styles.getRow() +  this.m_styles.getLabelEmail());

        label_email_el.innerHTML = label_email_content_str;

    } // contentLabelEmail

    // Sets the content of the label remark div
    contentLabelRemark()
    {
        var label_remark_content_str = this.m_texts.getLabelRemark();

        var label_remark_el = this.m_id_el.getElementDivLabelRemark();

        label_remark_el.setAttribute('style', this.m_styles.getRow() +  this.m_styles.getLabelRemark());

        label_remark_el.innerHTML = label_remark_content_str;

    } // contentLabelRemark

    // Sets the content of the dropdown div
    contentDropdown()
    {
        this.debug('InputEventReservation.contentDropdown Enter');

        var dropdown_el = this.m_id_el.getElementDivDropdown();

        dropdown_el.setAttribute('style', this.m_styles.getRow() +  this.m_styles.getLabelRemark());

        this.m_event_dropdown_el = new EventProgramDropdown(this.m_id_el.getIdDropdown(), 
                                this.m_id_el.getIdDivDropdown(), this.m_event_program_xml);

        this.dropdownSetDateFormatToIsoReverse();

        this.dropdownSetAppendString('Add event');

        this.dropdownSetOnchangeFunctionName("globalOnChangeEventProgramDropdown");

        this.dropdownCreate();

        this.debug('InputEventReservation.contentDropdown Exit');
        
    } // contentDropdown

    ///////////////////////////////////////////////////////////////////////////
    /////// End Div Content Html Code /////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    /////// Start Set And Get Members /////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Returns the div container object
    getElementDivContainer()
    {
        return this.m_element_div_container;
    }

    // Returns the event number
    getEventNumber(i_event_number)
    {
        return this.m_active_event_number;

    } // setEventNumber

    // Sets the event number
    setEventNumber(i_event_number)
    {
        this.m_active_event_number = i_event_number;

    } // setEventNumber

    // Returns true if the event number has been set
    eventNumberIsSet()
    {
        if ( this.m_active_event_number > 0)
        {
            return true;
        }
        else
        {
            return false;
        }

    } // eventNumberIsSet

    // Returns true if the form has been created
    isFormCreated()
    {
        return this.m_form_created;

    } // isFormCreated

    // Sets the boolean flag form is created to true
    setFormCreatedToTrue()
    {
        this.m_form_created = true;

        this.m_id_el.setFormCreatedToTrue();

    } // setFormCreatedToTrue

    ///////////////////////////////////////////////////////////////////////////
    /////// End Set And Get Members ///////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    /////// Start Dropdown Set And Get Functions //////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Returns the dropdown event number
    dropdownGetEventNumber()
    {
        return this.m_event_dropdown_el.getEventNumber();

    } // dropdownGetEventNumber

    // Sets the dropdown event number
    dropdownSetEventNumber(i_event_number)
    {
        this.m_event_dropdown_el.setEventNumber(i_event_number);

    } // dropdownSetEventNumber

    // Sets the title of this HTML element. The title can be a tool tip
    // In a desktop computer the title is displayed when the mouse is
    // over the HTML element
    dropdownSetTitle(i_title) 
    {
        this.m_event_dropdown_el.setTitle(i_title);

    } // dropdownSetTitle

    // Returns the date format for the dropdown
    dropdownGetDateFormat()
    {
        this.m_event_dropdown_el.getDateFormat();
        
    } // dropdownGetDateFormat

    // Set date format for the dropdown to ISO. Example: 2024-12-20   
    dropdownSetDateFormatToIso()
    {
        this.m_event_dropdown_el.setDateFormatToIso();

    } // dropdownSetDateFormatToIso

    // Set date format for the dropdown to reverse. Example: 10.12.2024   
    dropdownSetDateFormatToIsoReverse()
    {
        this.m_event_dropdown_el.setDateFormatToIsoReverse();

    } // dropdownSetDateFormatToIsoReverse

    // Set date format for the dropdown to swiss. Example: 20. Dezember 2024   
    dropdownSetDateFormatToSwiss()
    {
        this.m_event_dropdown_el.setDateFormatToSwiss();

    } // dropdownSetDateFormatToSwiss

    // Set flag that date and name shall be displayed in the dropdown
    dropdownDisplayDateAndNameInDropdown()
    {
        this.m_event_dropdown_el.displayDateAndNameInDropdown();

    } // dropdownDisplayDateAndNameInDropdown

    // Set flag that only name shall be displayed in the dropdown
    dropdownDisplayOnlyNameInDropdown()
    {
        this.m_event_dropdown_el.displayOnlyNameInDropdown();

    } // dropdownDisplayOnlyNameInDropdown

    // Sets the dropdown append string that is added to the dropdown name array
    dropdownSetAppendString(i_append_str)
    {
        this.m_event_dropdown_el.setAppendString(i_append_str);

    } // dropdownSetAppendString

    // Create the dropdown
    dropdownCreate()
    {
        this.m_event_dropdown_el.create();

    } // dropdownCreate

    // Sets the onchange function name. Only the name is input
    dropdownSetOnchangeFunctionName(i_onchange_function) 
    {
        this.m_event_dropdown_el.setOnchangeFunctionName(i_onchange_function);

    } // dropdownSetOnchangeFunctionName 

    ///////////////////////////////////////////////////////////////////////////
    /////// End Dropdown Set And Get Functions ////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    /////// Start Utility Functions ///////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    setElementDivContainer()
    {
        this.m_element_div_container = document.getElementById(this.m_id_div_container);

        if (null == this.m_element_div_container)
        {
            alert("InputEventReservation.setElementDivContainer There is no div container with id= " + this.m_id_div_container);
        }

    } // setElementDivContainer

    // Writes debug to the console
    debug(i_msg_str)
    {
        if (!this.m_b_write_debug)
        {
            return;
        }

        console.log(i_msg_str);

        UtilServer.appendDebugFile(i_msg_str, 'ReservationLayout');

    } // debugReservationLayout

    ///////////////////////////////////////////////////////////////////////////
    /////// End Utility Functions /////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    /////// Start Display And Hide ////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Display the events dropdown
    displayDropdown()
    {
        this.m_b_display_dropdown = true;

        if (isFormCreated())
        {
            this.create();
        }

    } // displayDropdown

    // Hides the events dropdown
    hideDropdown()
    {
        this.m_b_display_dropdown = false;

        if (isFormCreated())
        {
            this.create();
        }

    } // hideDropdown

    ///////////////////////////////////////////////////////////////////////////
    /////// End Display And Hide //////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////


    ///////////////////////////////////////////////////////////////////////////
    /////// Start Construct Html Divisions Code ///////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Returns the HTML code for the divs of the input form
    getDivsHtml()
    {
        var ret_html_code = '';

        ret_html_code = ret_html_code + this.startFormTag();

        ret_html_code = ret_html_code + this.rowDivTag(this.m_id_el.getIdDivHeader(), '', ''); 

        ret_html_code = ret_html_code + this.rowDivTag(this.m_id_el.getIdDivDropdown(), '', ''); 

        ret_html_code = ret_html_code + this.rowDivTag(this.m_id_el.getIdDivEventName(), '', ''); 

        ret_html_code = ret_html_code + this.rowDivTag(this.m_id_el.getIdDivLabelName(), '', ''); 

        ret_html_code = ret_html_code + this.rowDivTag(this.m_id_el.getIdDivNameInfo(), this.m_id_el.getIdDivName(), this.m_id_el.getIdDivInfoName()); 

        ret_html_code = ret_html_code + this.rowDivTag(this.m_id_el.getIdDivLabelEmail(), '', ''); 

        ret_html_code = ret_html_code + this.rowDivTag(this.m_id_el.getIdDivEmailInfo(), this.m_id_el.getIdDivEmail(), this.m_id_el.getIdDivInfoEmail()); 

        ret_html_code = ret_html_code + this.rowDivTag(this.m_id_el.getIdDivLabelRemark(), '', ''); 

        ret_html_code = ret_html_code + this.rowDivTag(this.m_id_el.getIdDivRemarkInfo(), this.m_id_el.getIdDivRemark(), this.m_id_el.getIdDivInfoRemark()); 

        ret_html_code = ret_html_code + this.rowDivTag(this.m_id_el.getIdDivButtonInfo(), this.m_id_el.getIdDivButton(), this.m_id_el.getIdDivInfoButton()); 

        ret_html_code = ret_html_code + this.rowDivTag(this.m_id_el.getIdDivPrices(), '', ''); 

        ret_html_code = ret_html_code + this.rowDivTag(this.m_id_el.getIdDivInstructions(), '', ''); 

        ret_html_code = ret_html_code + this.endFormTag();

        return ret_html_code;

    } // getDivsHtml 

    // Returns start form div tag
    startFormTag()
    {
        var ret_start_tag = '';

        var n_tab = 1;

        var ret_start_tag = ret_start_tag + this.tab(n_tab);

        var ret_start_tag = ret_start_tag + '<div id= "' + this.m_id_el.getIdInputForm() + '" ';

        var style_with_width = this.m_input_form_style_str + 'width: ' + this.m_input_form_width;

        var ret_start_tag = ret_start_tag + ' style= "' + style_with_width + '" ';

        var ret_start_tag = ret_start_tag + '>' + this.endRow() + this.endRow();

        return ret_start_tag;

    } // startFormTag

    rowDivTag(i_id, i_id_left, i_id_right)
    {
        var ret_row_tag = '';

        var n_tab = 2;

        ret_row_tag = ret_row_tag + this.tab(n_tab);

        ret_row_tag = ret_row_tag + '<div id= "' + i_id + '" ';

        ret_row_tag = ret_row_tag + ' style= "' + this.m_div_row_style_str + '" ';

        ret_row_tag = ret_row_tag + '>' + this.endRow();

        if (i_id_left.length > 0 && i_id_right.length > 0)
        {
            ret_row_tag = ret_row_tag + this.innerDivTags(i_id_left, i_id_right)
        }

        ret_row_tag = ret_row_tag + this.endFormTag() + this.endRow() + this.endRow();

        return ret_row_tag;

    } // rowDivTag

    innerDivTags(i_id_left, i_id_right)
    {
        // this.
        var ret_inner_tags = '';

        var n_tab = 3;

        ret_inner_tags = ret_inner_tags + this.tab(n_tab);

        ret_inner_tags = ret_inner_tags + '<div id= "' + i_id_left + '" ';

        ret_inner_tags = ret_inner_tags + ' style= "' + this.m_element_left_style_str + '" ';

        ret_inner_tags = ret_inner_tags + '>' + this.endRow();

        ret_inner_tags = ret_inner_tags + this.endFormTag() + this.endRow();

        ret_inner_tags = ret_inner_tags + '<div id= "' + i_id_right + '" ';

        ret_inner_tags = ret_inner_tags + ' style= "' + this.m_element_right_style_str + '" ';

        ret_inner_tags = ret_inner_tags + '>' + this.endRow();

        ret_inner_tags = ret_inner_tags + this.endFormTag() + this.endRow();

        return ret_inner_tags;

    } // innerDivTags

    endFormTag()
    {
        return '</div> '
    }

    // returns end of row
    endRow()
    {

        if (!this.m_remove_tabs_comments)
        {
            return '\n';
        }
        else
        {
            alert("InputEventReservation.endRow m_remove_tabs_comments= true not yet implemented");

            return '\n';
        }

        /*
        var ret_end_str = '';

        // this.m_current_accumulated_text_length = this.m_current_accumulated_text_length;

        if (i_text)

        return ret_end_str;
        */

    } // endRow

    // Returns tabs as spaces
    tab(i_n_tab)
    {
        var ret_tab_str = '';

        if (this.m_remove_tabs_comments)
        {
            return ret_tab_str;
        }

        var n_tab = parseInt(i_n_tab);

        var tab_str = '    ';

        for (var tab_number=1; tab_number <= n_tab; tab_number++)
        {
            ret_tab_str = ret_tab_str + tab_str;

        }

        return ret_tab_str;

    } // tab

    ///////////////////////////////////////////////////////////////////////////
    /////// End Construct Html Divisions Code /////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////


} // InputEventReservation
