// File: EventProgramDropdown.js
// Date: 2024-12-22
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

        // The dropdown array with event names
        this.m_drop_down_name_array = [];

        // Maximum name length
        this.m_dropdown_name_length_max = 42;

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
        //QQQ this.m_active_event_number = -1;

        // Boolean flag telling if the form has been created
        this.m_dropdown_created = false;

        // Boolean telling if the event dropdown control shall be displayed
        this.m_b_display_dropdown = true;

        // Flagg telling if debug shall be written to the console
        this.m_b_write_debug = true;

    } // constructor

    ///////////////////////////////////////////////////////////////////////////
    /////// Start Create Dropdown ////////(////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Create the form
    create()
    {
        this.debug('EventProgramDropdown.create Enter');

        this.setDivContainerElement();

        this.setNameArray();

        var dropdown_html = this. getHtmlString();

        this.m_el_div_container.innerHTML = dropdown_html;

        this.m_dropdown_created = true;

        this.debug('EventProgramDropdown.create Exit');

    } // create

    // Sets the name array for the dropdown control 
    setNameArray() 
    {
        this.debug('EventProgramDropdown.setNameArray Enter');

        var b_only_coming = true; // TODO Add as parameter

        var name_array = this.m_event_program_xml.getEventNameArray(b_only_coming);

        var date_format = this.getDateFormat(); 

        var date_array = this.m_event_program_xml.getEventDateArray(b_only_coming, date_format);
  
        if (this.m_b_date_name_dropdown)
        {
            this.dropdownWithDateAndName(date_array, name_array);
        }
        else
        {
            this.m_drop_down_name_array = name_array;

            this.modifyDropdownNameArray();
        }

        var event_start_number = this.m_event_program_xml.getDateNameEventArrayStartNumber(b_only_coming);

        this.setNumberArray(event_start_number);

        this.debug('EventProgramDropdown.setNameArray Exit');

    } // setNameArray

    // Sets the number array 
    setNumberArray(i_event_start_number)
    {
        this.debug('EventProgramDropdown.setNumberArray i_event_start_number= ' 
                + i_event_start_number.toString());

        this.m_drop_down_number_array = [];

        var array_number = i_event_start_number;
        
        for (var index_name=0; index_name < this.m_drop_down_name_array.length; index_name++)
        {
            array_number = array_number + 1;

            this.m_drop_down_number_array[index_name] = array_number;
        }

        this.debug('EventProgramDropdown.setNumberArray Exit');

    } // setNumberArray

    // Make one array of the two input arrays
    dropdownWithDateAndName(i_date_array, i_name_array)
    {
        this.debug('EventProgramDropdown.dropdownWithDateAndName Enter');

        this.m_drop_down_name_array = [];

        var n_events = i_date_array.length;

        for (var index_event = 0; index_event < n_events; index_event++)
        {
            var event_date = i_date_array[index_event];

            var event_name = i_name_array[index_event];

            this.m_drop_down_name_array[index_event] = event_date + ' ' + event_name;
        }

        this.modifyDropdownNameArray();

        this.debug('EventProgramDropdown.dropdownWithDateAndName Exit');

    } // dropdownWithDateAndName

    // Modify
    // Maximum name length m_dropdown_name_length_max
    // remove "difficult" characters TODO
    modifyDropdownNameArray()
    {
        var mod_array = [];
 
        var n_names = this.m_drop_down_name_array.length;

        for (var index_name = 0; index_name < n_names; index_name++)
        {
            var dropdown_name =  this.m_drop_down_name_array[index_name];

            if (dropdown_name.length > this.m_dropdown_name_length_max)
            {
                dropdown_name = dropdown_name.substring(0, this.m_dropdown_name_length_max - 4);

                dropdown_name = dropdown_name + ' ...';
            }

            mod_array[index_name] = dropdown_name;
        }

        this.m_drop_down_name_array = mod_array;

    } // modifyDropdownNameArray

    ///////////////////////////////////////////////////////////////////////////
    /////// End Create Dropdown ////////(//////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    /////// Start Set And Get Members ////////(////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Returns the selection element
    getSelectionElement()
    {
        return document.getElementById(this.m_id_drop_down);

    } // getSelectionElement

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

    // Sets the append string that is added to the dropdown name array
    setAppendString(i_append_str)
    {
        this.m_append_str = i_append_str;

        if (this.isDropdownCreated()){this.create();}

    } // setAppendString

    // Sets the onchange function name. Only the name is input
    setOnchangeFunctionName(i_onchange_function) 
    {
      this.m_onchange_function = i_onchange_function;

      if (this.isDropdownCreated()){this.create();}

    } // setOnchangeFunctionName 

    ///////////////////////////////////////////////////////////////////////////
    /////// End Set And Get Members ////////(//////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    /////// Start Get Html Code ////////(//////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Returns the string that defines the HTML dropdown string
    // <select id="id_drop_down" class="cl_drop_down" onchange= "eventNewTask" title="Tip ...">  
    // <option value="1" >A0001</option>
    // <option value="2" >A0002</option>    
    // </select>
    getHtmlString()
    {
        this.debug('EventProgramDropdown.getHtmlString Enter');

        var ret_html_str = '';

        ret_html_str = ret_html_str +  '<select  id="' + this.m_id_drop_down + '" ';

        if (this.m_onchange_function.length > 0)
        {
            ret_html_str = ret_html_str + ' onchange="' + this.m_onchange_function + '()" ';
        }

        if (this.m_title.length > 0)
        {
            ret_html_str = ret_html_str + ' title="' + this.m_title + '" ';
        }

        ret_html_str = ret_html_str + '>'; 

        var n_options = this.m_drop_down_name_array.length;

        if (this.m_append_str.length > 0)
        {
            n_options = n_options + 1;
        }

        for (var index_name=0; index_name < n_options; index_name++)
        {
            var current_name = '';

            var current_number_str = '';

            if (index_name < this.m_drop_down_name_array.length)
            {
                current_name = this.m_drop_down_name_array[index_name];

                current_number_str = this.m_drop_down_number_array[index_name].toString();
            }
            else
            {
                current_name = this.m_append_str;

                current_number_str = n_options.toString();
            }

            var option_str = '<option value="' + current_number_str + '">' +
                                    current_name + '</option>';

            ret_html_str = ret_html_str + option_str;  
        }        

        ret_html_str = ret_html_str + '</select>';

        this.debug('EventProgramDropdown.getHtmlString Exit');
        
        return ret_html_str;

    } // getHtmlString

    ///////////////////////////////////////////////////////////////////////////
    /////// End Get Html Code ////////(////////////////////////////////////////
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