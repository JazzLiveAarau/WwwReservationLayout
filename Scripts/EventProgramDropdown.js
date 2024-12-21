// File: EventProgramDropdown.js
// Date: 2024-12-21
// Author: Gunnar Lidén

// File content
// =============
//
// Class defining the event program dropdown

class EventProgramDropdown
{
    // Creates the instance of the class
    // i_id_drop_down: Identity of the dropdown control
    // i_id_div_container: Identity for the div where the input form shall be created
    // i_event_program_xml: An EventProgramXml object that holds information about the events
    constructor(i_id_drop_down, i_id_div_container, i_event_program_xml) 
    {
        // Member variables
        // ================

        // The identity of the dropdown control
        this.m_id_drop_down = i_id_drop_down;

        //  Identity for the div where the input form shall be created
        this.m_id_div_container = i_id_div_container;

        // An EventProgramXml object that holds information about the events
        this.m_event_program_xml = i_event_program_xml;

        // The container element for the dropdown control
        this.m_el_div_container = null;

        // The class for the dropdown control
        //QQQQQ this.m_class = '';        

        // The dropdown array with event names
        this.m_drop_down_name_array = [];

        // The corresponding number array
        this.m_drop_down_number_array = [];

        // Append string that is added to the dropdown name array
        this.m_append_str = '';

        // The onchange function name. Only the name is input
        this.m_onchange_function = '';

        // The title attribute specifies extra information about an element.
        // The information is most often shown as a tooltip text when the mouse 
        // moves over the element.
        this.m_title = '';

        // Format for date in name array m_drop_down_name_array
        // Case: iso 2024-12-20, iso_reverse 10.12.2024 or swiss 20. Dezember 2024
        this.m_date_format = 'iso';

        // Flag determines if dropdown displays date and name (true) or only name (false)
        this.m_b_date_name_dropdown = true;

        // Defines the event_number for the reservation. 
        // If not set (negative) the next event will be set
        this.m_active_event_number = -1;

        // Boolean flag telling if the form has been created
        this.m_dropdown_created = false;

        // Boolean telling if the event dropdown control shall be displayed
        this.m_b_display_dropdown = true;

    } // constructor

    ///////////////////////////////////////////////////////////////////////////
    /////// Start Create Dropdown ////////(////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Create the form
    create()
    {
        this.setDivContainerElement();

        var b_only_coming = true;

        var name_array = this.m_event_program_xml.getEventNameArray(b_only_coming);

        var date_format = this.getDateFormat(); 

        var date_array = this.m_event_program_xml.getEventDateArray(b_only_coming, date_format);

        this.m_dropdown_created = true;

    } // create


    ///////////////////////////////////////////////////////////////////////////
    /////// End Create Dropdown ////////(//////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    /////// Start Set And Get Members ////////(////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Returns the event number
    getEventNumber()
    {
        return this.m_active_event_number;

    } // setEventNumber

    // Sets the event number
    setEventNumber(i_event_number)
    {
        this.m_active_event_number = i_event_number;

        if (this.isDropdownCreated()){this.create();}

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
    isDropdownCreated()
    {
        return this.m_dropdown_created;

    } // isDropdownCreated

    // Sets the title of this HTML element. The title can be a tool tip
    // In a desktop computer the title is displayed when the mouse is
    // over the HTML element
    setTitle(i_title) 
    {
        this.m_title = i_title; 

        if (this.isDropdownCreated()){this.create();}

    } // setTitle

    // Returns the date format for the dropdown
    getDateFormat()
    {
        return this.m_date_format;
        
    } // getDateFormat

    // Set date format for the dropdown to ISO. Example: 2024-12-20   
    setDateFormatToIso()
    {
        this.m_date_format = 'iso';

        if (this.isDropdownCreated()){this.create();}

    } // setDateFormatToIso

    // Set date format for the dropdown to reverse. Example: 10.12.2024   
    setDateFormatToIsoReverse()
    {
        this.m_date_format = 'iso_reverse';

        if (this.isDropdownCreated()){this.create();}

    } // setDateFormatToIsoReverse

    // Set date format for the dropdown to swiss. Example: 20. Dezember 2024   
    setDateFormatToSwiss()
    {
        this.m_date_format = 'swiss';

        if (this.isDropdownCreated()){this.create();}

    } // setDateFormatToSwiss

    // Set flag that date and name shall be displayed in the dropdown
    displayDateAndNameInDropdown()
    {
        this.m_b_date_name_dropdown = true;

        if (this.isDropdownCreated()){this.create();}

    } // displayDateAndNameInDropdown

    // Set flag that only name shall be displayed in the dropdown
    displayOnlyNameInDropdown()
    {
        this.m_b_date_name_dropdown = false;

        if (this.isDropdownCreated()){this.create();}

    } // displayOnlyNameInDropdown

    ///////////////////////////////////////////////////////////////////////////
    /////// End Set And Get Members ////////(//////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    /////// Start Utility Functions ////////(//////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Sets the div element container 
    setDivContainerElement()
    {
        this.m_el_div_container = document.getElementById(this.m_id_div_container);

        if (null == this.m_el_div_container)
        {
            alert(".setDivContainerElement There is no div with identity ") + this.m_id_div_container;
        }

    } // setDivContainerElement


    ///////////////////////////////////////////////////////////////////////////
    /////// End Utility Functions ////////(////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    /////// Start Display And Hide ////////(///////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Display the events dropdown
    displayDropdown()
    {
        this.m_b_display_dropdown = true;

        if (isDropdownCreated())
        {
            this.create();
        }

    } // displayDropdown

    // Hides the events dropdown
    hideDropdown()
    {
        this.m_b_display_dropdown = false;

        if (isDropdownCreated())
        {
            this.create();
        }

    } // hideDropdown

    ///////////////////////////////////////////////////////////////////////////
    /////// End Display And Hide ////////(/////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

} // EventProgramDropdown