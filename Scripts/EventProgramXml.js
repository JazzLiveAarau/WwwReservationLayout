// File: EventProgramXml.js
// Date: 2024-12-22
// Author: Gunnar Lidén


// File content
// =============
//
//  Class for the handling of an event program. The event data is defined in the file EventProgram.xml


class EventProgramXml
{
    // Creates the instance of the class
    // i_subdir_xml: The subdirectory for the event XML file, e.g. SaisonXml
    // m_event_program_file_name: Name of the event program XML file
    // i_callback_function_name: Function that shall be called after creation (loading) of the XML object
    constructor(i_subdir_xml, i_event_program_file_name, i_callback_function_name) 
    {
        // Member variables
        // ================

        // The subdirectory for the event XML file, e.g. SaisonXml
        this.m_subdir_xml = i_subdir_xml;

        // Name of the event program XML file
        this.m_event_program_file_name = i_event_program_file_name;

        // Call back function name
        this.m_callback_function_name = i_callback_function_name;

        // The xml object
        this.m_object_xml = null;

        // Object holding the tags
        this.m_tags = new EventProgramTags();

        // Flag that a node value not have been set
        this.m_not_yet_set_node_value = "NotYetSetNodeValue";

        // Loads the XML event file, creates the XML object and calls the function m_callback_function_name
        this.loadOneXmlFile(this, this.getXmlEventProgramFileName(), this.m_callback_function_name);

    } // constructor

    ///////////////////////////////////////////////////////////////////////////
    /////// Start Get Event Functions ////////(//////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

   // Returns the Event day
   getDay(i_event_number)
   {
       return this.getEventNodeValue(this.m_tags.getDay(), i_event_number);
       
   } // getDay

   // Returns the Event month
   getMonth(i_event_number) 
   {
       return this.getEventNodeValue(this.m_tags.getMonth(), i_event_number);
       
   } // getMonth

   // Returns the Event year
   getYear(i_event_number)
   {
       return this.getEventNodeValue(this.m_tags.getYear(), i_event_number);
       
   } // getYear

   // Returns the event start hour
   getStartHour(i_event_number) 
   {
       return this.getEventNodeValue(this.m_tags.getStartHour(), i_event_number);
       
   } // getStartHour

   // Returns the event start minute
   getStartMinute(i_event_number) 
   {
       return this.getEventNodeValue(this.m_tags.getStartMinute(), i_event_number);
       
   } // getStartMinute

   // Returns the event end hour
   getEndHour(i_event_number)
   {
       return this.getEventNodeValue(this.m_tags.getEndHour(), i_event_number);
       
   } // getEndHour
 
   // Returns the event end minute
   getEndMinute(i_event_number)
   {
       return this.getEventNodeValue(this.m_tags.getEndMinute(), i_event_number);
       
   } // getEndMinute 

   // Returns the event place
   getPlace(i_event_number)
   {
       return this.getEventNodeValue(this.m_tags.getPlace(), i_event_number);
       
   } // getPlace 

   // Returns the event cancelled flag
   // DO NOT CALL THIS FUNCTION DIRECTLY. ALWAYS CALL eventIsCancelled
   // For older seasonprograms the tag is not defined in the XML files 
   getCancelled(i_event_number)
   {
       return this.getEventNodeValue(this.m_tags.getCancelled(), i_event_number);
       
   } // getCancelled 

   // Returns true if the event was cancelled
   // Please note that for older seasonprograms the cancelled event tag 
   // is not defined in the XML season program files 
   eventIsCancelled(i_event_number)
   {
        var ret_value = false;

        if (!this.eventCancelledFlagIsDefinedInXmlFile())
        {
            return ret_value;
        }

        var event_cancelled_str = this.getEventCancelled(i_event_number);
        
        if (event_cancelled_str == 'TRUE')
        {
            ret_value = true;
        }
        else
        {
            ret_value = false;
        }

    return ret_value;

   } // eventIsCancelled

   // Returns true if the event cancelled flag is defined in the season XML file
   eventCancelledFlagIsDefinedInXmlFile()
   {
        var year_autumn = this.getYearAutumn();

        if (year_autumn < 2019)
        {
            return false;
        }
        else
        {
            return true;
        }

   } // eventCancelledFlagIsDefinedInXmlFile

   // Returns the band name
    getEventName(i_event_number)
    {
        return this.getEventNodeValue(this.m_tags.getEventName(), i_event_number);
        
    } // getEventName

   // Returns the event short text
   getShortText(i_event_number) 
   {
       return this.getEventNodeValue(this.m_tags.getShortText(), i_event_number);
       
   } // getShortText

    // Returns the URL to the reservation subdirectory
    getUrlReservationDir(i_event_number) // Previously getEventShortText
    {
        return this.getEventNodeValue(this.m_tags.getUrlReservationDir(), i_event_number);
        
    } // getUrlReservationDir

   // Returns the event prices text
   getPrices(i_event_number)
   {
       return this.getEventNodeValue(this.m_tags.getPrices(), i_event_number);
       
   } // getPrices

   // Returns the event instructions text
   getInstructions(i_event_number)
   {
       return this.getEventNodeValue(this.m_tags.getInstructions(), i_event_number);
       
   } // getInstructions
   
    ///////////////////////////////////////////////////////////////////////////
    /////// End Get event Functions ////////(////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////// Start Node Value Functions //////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Returns the event node value for a given event number and a tag name
    getEventNodeValue(i_record_tag, i_event_number)
    {
        var ret_data = '';
        
        if (!this.checkEventProgramXml()){ return ret_data; }

        var n_records = this.getNumberOfEvents();
        
        if (i_event_number < 1 || i_event_number > n_records)
        {
            alert("SeasonXml.getEventNodeValue Record number is not between 1 and " + n_records.toString());
            return ret_data;		
        }
            
        var event_rec_nodes = this.getXmlObject().getElementsByTagName(this.m_tags.getEvent());

        var event_rec_node = event_rec_nodes[i_event_number-1];
        
        var xml_node_value = this.getNodeValueTagName(event_rec_node, i_record_tag);
        
        ret_data = this.removeFlagNodeValueNotSet(xml_node_value);
        
        return ret_data;
        
    } // getEventNodeValue

    // Returns the node value. Input is an XML node and the tag name
    getNodeValueTagName(i_node, i_xml_tag)
    {	
        return i_node.getElementsByTagName(i_xml_tag)[0].childNodes[0].nodeValue;
        
    } // getNodeValueTagName

    // Returns the node value. Input is an XML node 
    getNodeValue(i_node)
    {	
        return i_node.childNodes[0].nodeValue;
        
    } // getNodeValue

    // Sets a node value. Input is an XML node, the tag name and the node value
    setNodeValue(i_node, i_xml_tag, i_node_value)
    {	
        i_node.getElementsByTagName(i_xml_tag)[0].childNodes[0].nodeValue = i_node_value;
        
    } // setNodeValue

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////// End Node Value Functions ////////////////////////
    ///////////////////////////////////////////////////////////////////////////


    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////// Start Number Records ////////////////////////////
    //////////////////////////////////////////////////////////////////////////

    // Returns the number of events
    getNumberOfEvents()
    {
        var ret_n_records = -1;

        if (!this.checkEventProgramXml()){ return ret_n_records; }

        var event_rec_nodes = this.getXmlObject().getElementsByTagName(this.m_tags.getEvent());

        ret_n_records = event_rec_nodes.length;

        return ret_n_records;

    } // getNumberOfEvents

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////// End Number Records //////////////////////////////
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

    ///////////////////////////////////////////////////////////////////////////
    /////// Start Utility Functions ///////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Returns an array of event names
    // i_b_only_coming: Only coming events if true
    getEventNameArray(i_b_only_coming)
    {
        var ret_name_array = [];

        var n_events = this.getNumberOfEvents();

        var index_name = 0;

        for (var event_number = 1; event_number <= n_events; event_number++)
        {
            var event_name = this.getEventName(event_number);

            var event_year = this.getYear(event_number);

            var event_month = this.getMonth(event_number);

            var event_day = this.getDay(event_number);

            var b_date_passed = UtilDate.DateIsPassed(event_year, event_month, event_day);

            if (i_b_only_coming && !b_date_passed)
            {
                ret_name_array[index_name] = event_name;

                index_name = index_name + 1;
            }

        } // event_number

        return ret_name_array;

    } // getEventNameArray

    // Returns the start program event number for functions 
    // getEventNameArray and getEventDateArray
    getDateNameEventArrayStartNumber(i_b_only_coming)
    {
        var ret_start_number = 0;

        if (!i_b_only_coming)
        {
            return ret_start_number;
        }

        var n_events = this.getNumberOfEvents();

        var index_name = 0;

        for (var event_number = 1; event_number <= n_events; event_number++)
        {
            var event_year = this.getYear(event_number);

            var event_month = this.getMonth(event_number);

            var event_day = this.getDay(event_number);

            var b_date_passed = UtilDate.DateIsPassed(event_year, event_month, event_day);

            if (b_date_passed)
            {
                ret_start_number = ret_start_number + 1;
            }
            else
            {
                break;
            }

        } // event_number

        return ret_start_number;

    } // getDateNameEventArrayStartNumber

     // Returns an array of event dates
    // i_b_only_coming: Only coming events if true
    // i_date_format: iso, iso_reverse, swiss
    getEventDateArray(i_b_only_coming, i_date_format)
    {
        var ret_date_array = [];

        var n_events = this.getNumberOfEvents();

        var index_date = 0;

        for (var event_number = 1; event_number <= n_events; event_number++)
        {

            var event_year = this.getYear(event_number);

            var event_month = this.getMonth(event_number);

            var event_day = this.getDay(event_number);

            var event_date = '';

            if ('iso' == i_date_format)
            {
                event_date = UtilDate.getIsoDateString(event_year, event_month, event_day);
            }
            else if ('iso_reverse' == i_date_format)
            {
                event_date = UtilDate.getIsoReverseDateString(event_year, event_month, event_day);
            }
            else if ('swiss' == i_date_format)
            {
                event_date = UtilDate.getSwissDateString(event_year, event_month, event_day);
            }
            else
            {
                alert("UtilDate.getEventDateArray Unvalid date format '" + i_date_format + "'");

                return ret_date_array;
            }

            var b_date_passed = UtilDate.DateIsPassed(event_year, event_month, event_day);

            if (i_b_only_coming && !b_date_passed)
            {
                ret_date_array[index_date] = event_date;

                index_date = index_date + 1;
            }
            
        } // event_number

        return ret_date_array;

    } // getEventDateArray

    // Returns the reservation event XML file name
    getXmlEventProgramFileName()
    {
        return this.m_subdir_xml + '/' +  this.m_event_program_file_name;

    } // getXmlEventProgramFileName

    // Check that the event program XML object is set
    checkEventProgramXml()
    {      
        if (null == this.getXmlObject())
        {
            alert("EventProgramXml.checkEventProgramXml Reservation event XML object is null");

            return false;
        }	
        else
        {
            return true;
        }
        
    } // checkEventProgramXml

    // Returns true if the application runs on the server
    static execApplicationOnServer()
    {
        var current_base = window.location.href;

        var server_url = 'jazzliveaarau.ch';

        var index_url = current_base.indexOf(server_url);

        if (index_url >= 0) 
        {
            return true;
        }
        else
        {
            return false;
        }

    } // execApplicationOnServer    

    ///////////////////////////////////////////////////////////////////////////
    /////// End Utility Functions /////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////// Start Object Functions //////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Sets the XML object
    setXmlObject(i_object_xml)
    {
        this.m_object_xml = i_object_xml;

    } // setXmlObject

    // Returns the XML object
    getXmlObject()
    {
        return this.m_object_xml;

    } // getXmlObject    

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////// Start Object Functions //////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    /////// Start Load Functions //////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Load the XML file.
    // https://codeburst.io/javascript-what-the-heck-is-a-callback-aba4da2deced
    // i_object_xml is the instance of this class. Call of this.setXmlObject
    // does not work, while this= jazz_xmlhttp 
    loadOneXmlFile(i_object_xml, i_path_file_name_xml, i_callback_function_name)
    {
    // Request server object for the XML file
    var jazz_xmlhttp = new XMLHttpRequest();
    
    // Event function: The server will return state and status 
    // from object functions open and send.
    jazz_xmlhttp.onreadystatechange = function() 
    {
        // Please note that this statement is executed several times, e.g.
        // with readyState = 2 meaning that the request is received.
        if (jazz_xmlhttp.readyState == 4 && jazz_xmlhttp.status == 200) 
        {
            var xml_object = jazz_xmlhttp.responseXML;

            i_object_xml.setXmlObject(xml_object);

            i_callback_function_name();    
        }
        else if (jazz_xmlhttp.readyState == 4 && jazz_xmlhttp.status == 404) 
        {
            alert("Error 404: File " + i_path_file_name_xml + " not found" );
        }	
    };
    
    // Open the file
    jazz_xmlhttp.open("GET", i_path_file_name_xml, true);
    
    jazz_xmlhttp.setRequestHeader('Cache-Control', 'no-cache');
        
    jazz_xmlhttp.send();	

    } // loadOneXmlFile

    ///////////////////////////////////////////////////////////////////////////
    /////// End Load Functions ////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

} // EventProgramXml

// Class defining the tags of the XML event program file
class EventProgramTags 
{
    // Creates the instance of the class
    constructor() 
    {
        this.m_tag_event = "Event";
        this.m_tag_day = "Day";
        this.m_tag_month = "Month";
        this.m_tag_year = "Year";
        this.m_tag_start_hour = "TimeStartHour";
        this.m_tag_start_minute = "TimeStartMinute";
        this.m_tag_end_hour = "TimeEndHour";
        this.m_tag_end_minute = "TimeEndMinute";
        this.m_tag_place = "Place";
        this.m_tag_event_cancelled = "EventCancelled";
        this.m_tag_event_name = "EventName";
        this.m_tag_short_text = "ShortText";
        this.m_tag_url_reservation_dir = "UrlReservationDir";
        this.m_tag_prices = "Prices";
        this.m_tag_instructions = "Instructions";
    }

    getEvent(){return this.m_tag_event;} 
    getDay(){return this.m_tag_day;}
    getMonth(){return this.m_tag_month;} 
    getYear(){return this.m_tag_year;} 
    getStartHour(){return this.m_tag_start_hour;} 
    getStartMinute(){return this.m_tag_start_minute;}
    getEndHour(){return this.m_tag_end_hour;} 
    getEndMinute(){return this.m_tag_end_minute;} 
    getPlace(){return this.m_tag_place;} 
    getCancelled(){return this.m_tag_event_cancelled;}
    getEventName(){return this.m_tag_event_name;} 
    getShortText(){return this.m_tag_short_text;}
    getUrlReservationDir(){return this.m_tag_url_reservation_dir;}
    getPrices(){return this.m_tag_prices;}
    getInstructions(){return this.m_tag_instructions;}

} // EventProgramTags
