// File: InputEventReservation.js
// Date: 2024-12-17
// Author: Gunnar Lidén

// File content
// =============
//
// Class that creates a form for the input of reservation data
// The class has member function that checks the input data

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

        // Start string for all identities
        this.m_id_unique_str = "id_input_event_reserv_";

        // The width of the input form
        this.m_input_form_width = '310px';

        // The style for the input form div
        this.m_input_form_style_str = 'clear: both; min-height: 500px; margin-left: 0px; margin-bottom: 10px;'
            + ' font-family: Arial, Helvetica, sans-serif; font-size: 14px;' 
            + 'background-color: rgb(223, 224, 225); border: 3px solid black;';

        // Style for a row div
        this.m_div_row_style_str = 'clear: both; width: 94%; min-height: 15px; margin-left: 3%; margin-top:5px; overflow: hidden; border: 1px solid blue;';

        // Style for a row left element
        this.m_element_left_style_str = 'float: left; width: 80%; min-height: 15px; margin-left: 3%; margin-top:5px; margin-bottom:5px; border: 1px solid red;';

        // Style for a row right element
        this.m_element_right_style_str = 'float: right; width: 10%; min-height: 15px; margin-right: 3%; margin-top:5px; margin-bottom:5px;  border: 1px solid green;';

        // Boolean flag telling if tabs and comments shall be removed
        this.m_remove_tabs_comments = false;

        // The minimum row length
        this.m_row_length_min = 80;

        this.m_current_accumulated_text_length = 0;

        this.setElementDivContainer();

    } // constructor

    ///////////////////////////////////////////////////////////////////////////
    /////// Start Create Form /////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Create the form
    create()
    {
        var html_str = this.getHtml();

        var container_el = this.getElementDivContainer();

        container_el.innerHTML = html_str;

        this.m_form_created = true;

    } // create

    ///////////////////////////////////////////////////////////////////////////
    /////// End Create Form ///////////////////////////////////////////////////
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

    ///////////////////////////////////////////////////////////////////////////
    /////// End Set And Get Members ///////////////////////////////////////////
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
    /////// Start Construct Html Code /////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Returns the HTML code for the input form
    getHtml()
    {
        var ret_html_code = '';

        ret_html_code = ret_html_code + this.startFormTag();

        ret_html_code = ret_html_code + this.rowDivTag(this.getIdDivHeader(), '', ''); 

        ret_html_code = ret_html_code + this.rowDivTag(this.getIdDivDropdown(), '', ''); 

        ret_html_code = ret_html_code + this.rowDivTag(this.getIdDivEventName(), '', ''); 

        ret_html_code = ret_html_code + this.rowDivTag(this.getIdDivLabelName(), '', ''); 

        ret_html_code = ret_html_code + this.rowDivTag(this.getIdDivNameInfo(), this.getIdDivName(), this.getIdDivInfoName()); 

        ret_html_code = ret_html_code + this.rowDivTag(this.getIdDivLabelEmail(), '', ''); 

        ret_html_code = ret_html_code + this.rowDivTag(this.getIdDivEmailInfo(), this.getIdDivEmail(), this.getIdDivInfoEmail()); 

        ret_html_code = ret_html_code + this.rowDivTag(this.getIdDivLabelRemark(), '', ''); 

        ret_html_code = ret_html_code + this.rowDivTag(this.getIdDivRemarkInfo(), this.getIdDivRemark(), this.getIdDivInfoRemark()); 

        ret_html_code = ret_html_code + this.rowDivTag(this.getIdDivButtonInfo(), this.getIdDivButton(), this. getIdDivInfoButton()); 

        ret_html_code = ret_html_code + this.rowDivTag(this.getIdDivPrices(), '', ''); 

        ret_html_code = ret_html_code + this.rowDivTag(this.getIdDivInstructions(), '', ''); 

        ret_html_code = ret_html_code + this.endFormTag();

        return ret_html_code;

    } // getHtml 

    // Returns start form div tag
    startFormTag()
    {
        var ret_start_tag = '';

        var n_tab = 1;

        var ret_start_tag = ret_start_tag + this.tab(n_tab);

        var ret_start_tag = ret_start_tag + '<div id= "' + this.getIdInputForm() + '" ';

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
    /////// End Construct Html Code ///////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    /////// Start Identities And Objects //////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Returns the identity of the div for the input form
    getIdInputForm()
    {
        return this.m_id_unique_str + 'input_form';
    }

    //Returns the element div for the input form
    getElementInputForm()
    {
        if (!this.isFormCreated())
        {
            alert("InputEventReservation.getElementInputForm Object is not yet created");

            return null;
        }

        return document.getElementById(getIdInputForm());

    } // getElementInputForm

    // Returns the identity of the div for the header
    getIdDivHeader()
    {
        return this.m_id_unique_str + 'div_header';
    }

    //Returns the element div for the input form
    getElementDivHeader()
    {
        if (!this.isFormCreated())
        {
            alert("InputEventReservation.getElementDivHeader Object is not yet created");

            return null;
        }

        return document.getElementById(getIdDivHeader());

    } // getElementDivHeader

    // Returns the identity of the div for the dropdown
    getIdDivDropdown()
    {
        return this.m_id_unique_str + 'div_dropdown';
    }

    //Returns the element div for the dropdown
    getElementDivDropdown()
    {
        if (!this.isFormCreated())
        {
            alert("InputEventReservation.getElementDivDropdown Object is not yet created");

            return null;
        }

        return document.getElementById(getIdDivDropdown());

    } // getElementDivDropdown

    // Returns the identity of the div for the event name
    getIdDivEventName()
    {
        return this.m_id_unique_str + 'div_event_name';
    }

    //Returns the element div for the event name
    getElementDivEventName()
    {
        if (!this.isFormCreated())
        {
            alert("InputEventReservation.getElementDivEventName Object is not yet created");

            return null;
        }

        return document.getElementById(getIdDivEventName());

    } // getElementDivEventName

    // Returns the identity of the div for the label name
    getIdDivLabelName()
    {
        return this.m_id_unique_str + 'div_label_name';
    }

    //Returns the element div for the label name
    getElementDivLabelName()
    {
        if (!this.isFormCreated())
        {
            alert("InputEventReservation.getElementDivLabelName Object is not yet created");

            return null;
        }

        return document.getElementById(getIdDivLabelName());

    } // getElementDivLabelName

    // Returns the identity of the div for name and information
    getIdDivNameInfo()
    {
        return this.m_id_unique_str + 'div_name_info';
    }

    //Returns the element div for name and information
    getElementDivNameInfo()
    {
        if (!this.isFormCreated())
        {
            alert("InputEventReservation.getElementDivNameInfo Object is not yet created");

            return null;
        }

        return document.getElementById(getIdDivNameInfo());

    } // getElementDivNameInfo

    // Returns the identity of the div for the email label
    getIdDivLabelEmail()
    {
        return this.m_id_unique_str + 'div_label_email';
    }

    //Returns the element div for the email label
    getElementDivLabelEmail()
    {
        if (!this.isFormCreated())
        {
            alert("InputEventReservation.getElementDivLabelEmail Object is not yet created");

            return null;
        }

        return document.getElementById(getIdDivLabelEmail());

    } // getElementDivLabelEmail

    // Returns the identity of the div for email and information
    getIdDivEmailInfo()
    {
        return this.m_id_unique_str + 'div_email_info';
    }

    //Returns the element div for email and information
    getElementDivEmailInfo()
    {
        if (!this.isFormCreated())
        {
            alert("InputEventReservation.getElementDivEmailInfo Object is not yet created");

            return null;
        }

        return document.getElementById(getIdDivEmailInfo());

    } // getElementDivEmailInfo

    // Returns the identity of the div for the remark label
    getIdDivLabelRemark()
    {
        return this.m_id_unique_str + 'div_label_remark';
    }

    //Returns the element div for the remark label
    getElementDivLabelRemark()
    {
        if (!this.isFormCreated())
        {
            alert("InputEventReservation.getElementDivLabelRemark Object is not yet created");

            return null;
        }

        return document.getElementById(getIdDivLabelRemark());

    } // getElementDivLabelRemark

    // Returns the identity of the div for remark and information
    getIdDivRemarkInfo()
    {
        return this.m_id_unique_str + 'div_remark_info';
    }

    //Returns the element div for remark and information
    getElementDivRemarkInfo()
    {
        if (!this.isFormCreated())
        {
            alert("InputEventReservation.getElementDivRemarkInfo Object is not yet created");

            return null;
        }

        return document.getElementById(getIdDivRemarkInfo());

    } // getElementDivRemarkInfo

    // Returns the identity of the div for button and information
    getIdDivButtonInfo()
    {
        return this.m_id_unique_str + 'div_button_info';
    }

    //Returns the element div for button and information
    getElementDivButtonInfo()
    {
        if (!this.isFormCreated())
        {
            alert("InputEventReservation.getElementDivButtonInfo Object is not yet created");

            return null;
        }

        return document.getElementById(getIdDivButtonInfo());

    } // getElementDivButtonInfo

    // Returns the identity of the div for the prices
    getIdDivPrices()
    {
        return this.m_id_unique_str + 'div_prices';
    }

    //Returns the element div for the prices
    getElementDivPrices()
    {
        if (!this.isFormCreated())
        {
            alert("InputEventReservation.getElementDivPrices Object is not yet created");

            return null;
        }

        return document.getElementById(getIdDivPrices());

    } // getElementDivPrices

    // Returns the identity of the div for the instructions
    getIdDivInstructions()
    {
        return this.m_id_unique_str + 'div_instructions';
    }

    //Returns the element div for the instructions
    getElementDivInstructions()
    {
        if (!this.isFormCreated())
        {
            alert("InputEventReservation.getElementDivInstructions Object is not yet created");

            return null;
        }

        return document.getElementById(getIdDivInstructions());

    } // getElementDivInstructions

    // Returns the identity of the div for the name
    getIdDivName()
    {
        return this.m_id_unique_str + 'div_name';
    }

    //Returns the element div for the name
    getElementDivName()
    {
        if (!this.isFormCreated())
        {
            alert("InputEventReservation.getElementDivName Object is not yet created");

            return null;
        }

        return document.getElementById(getIdDivName());

    } // getElementDivName

    // Returns the identity of the div for the name information
    getIdDivInfoName()
    {
        return this.m_id_unique_str + 'div_info_name';
    }

    //Returns the element div for the name information
    getElementDivInfoName()
    {
        if (!this.isFormCreated())
        {
            alert("InputEventReservation.getElementDivNameInfo Object is not yet created");

            return null;
        }

        return document.getElementById(getIdDivNameInfo());

    } // getElementDivInfoName

    // Returns the identity of the div for the remark
    getIdDivRemark()
    {
        return this.m_id_unique_str + 'div_remark';
    }

    //Returns the element div for the remark
    getElementDivRemark()
    {
        if (!this.isFormCreated())
        {
            alert("InputEventReservation.getElementDivRemark Object is not yet created");

            return null;
        }

        return document.getElementById(getIdDivRemark());

    } // getElementDivRemark

    // Returns the identity of the div for the remark information
    getIdDivInfoRemark()
    {
        return this.m_id_unique_str + 'div_info_remark';
    }

    //Returns the element div for the remark information
    getElementDivInfoRemark()
    {
        if (!this.isFormCreated())
        {
            alert("InputEventReservation.getElementDivInfoRemark Object is not yet created");

            return null;
        }

        return document.getElementById(getIdDivInfoRemark());

    } // getElementDivInfoRemark

    // Returns the identity of the div for the email
    getIdDivEmail()
    {
        return this.m_id_unique_str + 'div_email';
    }

    //Returns the element div for the email
    getElementDivEmail()
    {
        if (!this.isFormCreated())
        {
            alert("InputEventReservation.getElementDivEmail Object is not yet created");

            return null;
        }

        return document.getElementById(getIdDivEmail());

    } // getElementDivEmail

    // Returns the identity of the div for the email information
    getIdDivInfoEmail()
    {
        return this.m_id_unique_str + 'div_info_email';
    }

    //Returns the element div for the email information
    getElementDivInfoEmail()
    {
        if (!this.isFormCreated())
        {
            alert("InputEventReservation.getElementDivInfoEmail Object is not yet created");

            return null;
        }

        return document.getElementById(getIdDivInfoEmail());

    } // getElementDivInfoEmail

    // Returns the identity of the div for the button
    getIdDivButton()
    {
        return this.m_id_unique_str + 'div_button';
    }

    //Returns the element div for the button
    getElementDivButton()
    {
        if (!this.isFormCreated())
        {
            alert("InputEventReservation.getElementDivButton Object is not yet created");

            return null;
        }

        return document.getElementById(getIdDivButton());

    } // getElementDivButton

    // Returns the identity of the div for the button information
    getIdDivInfoButton()
    {
        return this.m_id_unique_str + 'div_info_button';
    }

    //Returns the element div for the button information
    getElementDivInfoButton()
    {
        if (!this.isFormCreated())
        {
            alert("InputEventReservation.getElementDivInfoButton Object is not yet created");

            return null;
        }

        return document.getElementById(getIdDivInfoButton());

    } // getElementDivInfoButton

    ///////////////////////////////////////////////////////////////////////////
    /////// End Identities And Objects ////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

} // InputEventReservation

// https://sdkcon78221.crestron.com/sdk/Crestron_HTML5UI/Content/Topics/Reference/Development/Change-CSS.htm
// setAttribute(key, value) can also be used to set a style on an element. For example, the color of an element can to red by calling element.setAttribute('style', 'color: red');
