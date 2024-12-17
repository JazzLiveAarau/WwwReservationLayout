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

    } // constructor

    ///////////////////////////////////////////////////////////////////////////
    /////// Start Create Form ////////(////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Create the form
    create()
    {
        this.m_form_created = true;

    } // create

    ///////////////////////////////////////////////////////////////////////////
    /////// End Create Form ////////(//////////////////////////////////////////
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
    isFormCreated()
    {
        return this.m_form_created;

    } // isFormCreated

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
    /////// End Display And Hide ////////(/////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

} // InputEventReservation

// https://sdkcon78221.crestron.com/sdk/Crestron_HTML5UI/Content/Topics/Reference/Development/Change-CSS.htm
// setAttribute(key, value) can also be used to set a style on an element. For example, the color of an element can to red by calling element.setAttribute('style', 'color: red');
