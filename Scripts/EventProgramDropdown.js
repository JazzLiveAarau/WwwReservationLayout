// File: EventProgramDropdown.js
// Date: 2024-12-17
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

        // The input dropdown name array
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
        this.m_dropdown_created = true;

    } // create

    ///////////////////////////////////////////////////////////////////////////
    /////// End Create Dropdown ////////(//////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    /////// Start Set And Get Members ////////(////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

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

    } // setTitle

    ///////////////////////////////////////////////////////////////////////////
    /////// End Set And Get Members ////////(//////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    /////// Start Utility Functions ////////(//////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////


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