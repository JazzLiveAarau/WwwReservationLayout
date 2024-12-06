// File: ReservationEventXml.js
// Date: 2024-12-06
// Author: Gunnar Lidén

// File content
// =============
//
// Class that creates an XML object corresponding to an XML file that holds 
// all reservations for one even, e.g. a concert

class ReservationEventXml
{
    // Creates the instance of the class
    // i_callback_function_name: Function that shall be called after loading
    constructor(i_subdir_xml, i_name_add_str, i_event_number, i_callback_function_name) 
    {
        // Member variables
        // ================

        // The subdirectory for the event XML file, e.g. SaisonXml
        this.m_subdir_xml = i_subdir_xml;

        // String to add to name of the XML event file, e.g. Salmen
        // Empty string is allowed
        this.m_name_add_str = i_name_add_str;

        // Event (e.g concert) number
        this.m_event_number = i_event_number;

        // Call back function name
        this.m_callback_function_name = i_callback_function_name;

        // The jazz application xml object
        this.m_object_xml = null;

        // Object holding the tags
        this.m_tags = new ReservationEventTags();

        // Flag that a node value not have been set
        this.m_not_yet_set_node_value = "NYSV";

        // Loads the XML event file, creates the XML object and calls the function m_callback_function_name
        this.loadOneXmlFile(this, this.getXmlEventFileName(), this.m_callback_function_name);

    } // constructor


    ///////////////////////////////////////////////////////////////////////////
    /////// Start Get Event Functions /////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

     // Returns the day of the event
     getDay()
     {
         return this.getEventNodeValue(this.m_tags.getDay());
         
     } // getDay

     // Returns the month of the event
     getMonth()
     {
         return this.getEventNodeValue(this.m_tags.getMonth());
         
     } // getMonth

     // Returns the year of the event
     getYear()
     {
         return this.getEventNodeValue(this.m_tags.getYear());
         
     } // getYear

     // Returns the event name
     getEventName()
     {
         return this.getEventNodeValue(this.m_tags.getEventName());
         
     } // getEventName

    ///////////////////////////////////////////////////////////////////////////
    /////// Start Set Event Functions /////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////
    
   // Sets the day of the event
   setDay(i_day)
   {
       this.setEventNodeValue(this.m_tags.getDay(), i_day);
       
   } // setDay

   // Sets the month of the event
   setMonth(i_month)
   {
       this.setEventNodeValue(this.m_tags.getMonth(), i_month);
       
   } // setMonth

   // Sets the year of the event
   setYear(i_year)
   {
       this.setEventNodeValue(this.m_tags.getYear(), i_year);
       
   } // setYear

   // Sets the event name
   setEventName(i_event_name)
   {
       this.setEventNodeValue(this.m_tags.getEventName(), i_event_name);
       
   } // setEventName

    ///////////////////////////////////////////////////////////////////////////
    /////// End Set Event Functions ///////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

/*
    getReservation(){return this.m_tag_reservation;}
    getPassword(){return this.m_tag_password;}
    getName(){return this.m_tag_reservation_name;}
    getRemark(){return this.m_tag_reservation_remark;}
    getEmail(){return this.m_tag_reservation_email;}
    getSeat(){return this.m_tag_seat;}
    getTableNumber(){return this.m_tag_seat_table_number;}
    getSeatChar(){return this.m_tag_seat_character;}

*/


    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////// Start Node Value Functions //////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Returns the layout node value for a given tag name
    getEventNodeValue(i_tag)
    {
        var ret_data = '';
        
        if (!this.checkEventXml()){ return ret_data; }

        var layout_node = this.getXmlObject().getElementsByTagName(i_tag)[0];
        
        var layout_node_value = layout_node.childNodes[0].nodeValue;
        
        ret_data = this.removeFlagNodeValueNotSet(layout_node_value);
        
        return ret_data;
        
    } // getEventNodeValue

    // Sets the layout node value for a given tag name
    setEventNodeValue(i_tag, i_node_value)
    {
        if (!this.checkEventXml()){ return; }

        var layout_nodes = this.getXmlObject().getElementsByTagName(i_tag);

        if (layout_nodes.length == 0)
        {
            alert("ReservationEventXml.setEventNodeValue There is no element with tag name " + i_tag);

            return;
        }

        if (layout_nodes.length > 1)
        {
            alert("ReservationEventXml.setEventNodeValue There are multiple elements with tag name " + i_tag);

            return;
        }

        var node_value = this.setFlagNodeValueIsNotSetForEmptyString(i_node_value);

        // getElementsByTagName can be used for any XML node at every level, but for the change
        // of the node value it must be the whole 'chain' from the base document
        // It is the text node of the XML node with the tag i_tag that is changed, i.e. childNodes[0]
        this.getXmlObject().getElementsByTagName(i_tag)[0].childNodes[0].nodeValue = node_value;

    } // setEventNodeValue

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////// End Node Value Functions ////////////////////////
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

    // Returns the reservation event XML file name
    getXmlEventFileName()
    {
        var start_name = 'Reservation';

        var add_str = '';

        if (this.m_name_add_str.length > 0)
        {
            add_str = '_' + this.m_name_add_str;
        }

        var number_str =  this.m_event_number.toString();

        if (number_str.length == 1)
        {
            number_str = '0' + number_str;
        }

        number_str = '_' + number_str;


        return this.m_subdir_xml + '/' + start_name + add_str + number_str + '.xml';

    } // getXmlEventFileName

    // Check that the layout program XML object is set
    checkEventXml()
    {      
        if (null == this.getXmlObject())
        {
            alert("ResrvationLayout.checkEventXml Reservation event XML object is null");

            return false;
        }	
        else
        {
            return true;
        }
        
    } // checkEventXml

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

} // ReservationEventXml

// Class defining the tags of the XML event file
class ReservationEventTags 
{
    // Creates the instance of the class
    constructor() 
    {
        this.m_tag_reservations = "H";
        this.m_tag_password = "P";
        this.m_tag_day = "D";
        this.m_tag_month = "M";
        this.m_tag_year = "Y";
        this.m_tag_event_name = "B";
        this.m_tag_reservation = "R";
        this.m_tag_reservation_name = "N";
        this.m_tag_reservation_remark = "A";
        this.m_tag_reservation_email = "E";
        this.m_tag_seat = "S";
        this.m_tag_seat_table_number = "T";
        this.m_tag_seat_character = "C";
    }

    getPassword(){return this.m_tag_password;}
    getDay(){return this.m_tag_day;}
    getMonth(){return this.m_tag_month;}
    getYear(){return this.m_tag_year;}
    getEventName(){return this.m_tag_event_name;}
    getReservation(){return this.m_tag_reservation;}
    getName(){return this.m_tag_reservation_name;}
    getRemark(){return this.m_tag_reservation_remark;}
    getEmail(){return this.m_tag_reservation_email;}
    getSeat(){return this.m_tag_seat;}
    getTableNumber(){return this.m_tag_seat_table_number;}
    getSeatChar(){return this.m_tag_seat_character;}

} // ReservationEventTags