// File: ReservationEventXml.js
// Date: 2024-12-10
// Author: Gunnar Lidén

// TODO Implement Seat name <SN> and test of password <P> TODO 

// File content
// =============
//
// Class that creates an XML object corresponding to an XML file that holds 
// all reservations for one even, e.g. a concert

class ReservationEventXml
{
    // Creates the instance of the class
    // i_callback_function_name: Function that shall be called after loading
    // i_subdir_xm: The subdirctory for the event XML file
    // i_name_add_str: String to add to name of the XML event file. Empty string is allowed
    // i_event_number: Event number that will used for the name of the event XML file
    // i_b_new_file: Flag telling if the event XML file shall be created
    constructor(i_subdir_xml, i_name_add_str, i_event_number, i_b_new_file, i_callback_function_name) 
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

        // Flag telling if the event XML file shall be created
        this.m_b_new_file = i_b_new_file;

        // Call back function name
        this.m_callback_function_name = i_callback_function_name;

        // The jazz application xml object
        this.m_object_xml = null;

        // Object holding the tags
        this.m_tags = new ReservationEventTags();

        // Flag that a node value not have been set
        this.m_not_yet_set_node_value = "NYSV";

        this.execute();

    } // constructor

    // 1. Case Load an existing file (this.m_b_new_file)
    execute()
    {
        if (!this.m_b_new_file)
        {
            this.loadOneXmlFile(this, this.getXmlEventFileName(), this.m_callback_function_name);
        }
        else
        {
            this.createNewObjectSaveFile();
        }

    } // execute

    // Create a new empty object and save the file on the server
    // 1. Create the content of the XML file
    // 2. Create the XML object from the content string.
    //    Create DOMParser object and call DOMParser.parseFromString
    // 3. Set the YML object. Call of ReservationEventXml.setXmlObject
    // 4. Save the file. Call of UtilServer.saveFileCallback
    //    Callback function is m_callback_function_name
    createNewObjectSaveFile()
    {
        // debugReservationLayout('ReservationEventXml.createNewObjectSaveFile Event number ' + this.m_event_number.toString());

        var root_tag = this.m_tags.getRoot();

        var content_string = '';

        content_string = content_string + '<' + root_tag + '>';

        content_string = content_string + '</' + root_tag + '>';

        // https://www.w3schools.com/xml/xml_parser.asp

        var dom_parser = new DOMParser();

        var xml_object = dom_parser.parseFromString(content_string,"text/xml");

        this.setXmlObject(xml_object);

        var file_name = this.getXmlEventFileName();

        var reservation_layout_full_path = 'https://jazzliveaarau.ch/ReservationLayout/'; 

        var file_name_full_path = reservation_layout_full_path + file_name;

        // debugReservationLayout('file_name_full_path= ' + file_name_full_path);

        UtilServer.saveFileCallback(file_name_full_path, content_string, this.m_callback_function_name);

    } // createNewObjectSaveFile


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

    ///////////////////////////////////////////////////////////////////////////
    /////// Start Get Reservation Functions ///////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Returns the password for a given reservation number
    getPassword(i_reservation_number)
    {
        return this.getReservationNodeValue(this.m_tags.getPassword(), i_reservation_number);
        
    } // getPassword

    // Returns the name for a given reservation number
    getName(i_reservation_number)
    {
        return this.getReservationNodeValue(this.m_tags.getName(), i_reservation_number);
        
    } // getName

    // Returns the remark for a given reservation number
    getRemark(i_reservation_number)
    {
        return this.getReservationNodeValue(this.m_tags.getRemark(), i_reservation_number);
        
    } // getRemark

    // Returns the email for a given reservation number
    getEmail(i_reservation_number)
    {
        return this.getReservationNodeValue(this.m_tags.getEmail(), i_reservation_number);
        
    } // getEmail

    ///////////////////////////////////////////////////////////////////////////
    /////// End Get Reservation Functions /////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    /////// Start Set Reservation Functions ///////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////
    
    // Sets the password for a given reservation number
    setPassword(i_password, i_reservation_number)
    {
        this.setReservationNodeValue(this.m_tags.getPassword(), i_password, i_reservation_number);
        
    } // setPassword

    // Sets the name for a given reservation number
    setName(i_name, i_reservation_number)
    {
        this.setReservationNodeValue(this.m_tags.getName(), i_name, i_reservation_number);
        
    } // setName

    // Sets the remark for a given reservation number
    setRemark(i_remark, i_reservation_number)
    {
        this.setReservationNodeValue(this.m_tags.getRemark(), i_remark, i_reservation_number);
        
    } // setRemark

    // Sets the email for a given reservation number
    setEmail(i_email, i_reservation_number)
    {
        this.setReservationNodeValue(this.m_tags.getEmail(), i_email, i_reservation_number);
        
    } // setEmail

    ///////////////////////////////////////////////////////////////////////////
    /////// End Set Reservation Functions /////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    /////// Start Get Seat Functions //////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Returns the table number for a given reservation number and seat number
    getTableNumber(i_reservation_number, i_seat_number)
    {
        return this.getSeatNodeValue(this.m_tags.getTableNumber(), i_reservation_number, i_seat_number);
        
    } // getTableNumber
	
    ///////////////////////////////////////////////////////////////////////////
    /////// End Get Seat Functions ////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////
	
    ///////////////////////////////////////////////////////////////////////////
    /////// Start Set Seat Functions //////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////
    
    // Sets the table number for a given reservation number and seat number
    setTableNumber(i_table_number, i_reservation_number, i_seat_number)
    {
        this.setSeatNodeValue(this.m_tags.getTableNumber(), i_table_number, i_reservation_number, i_seat_number);
        
    } // setTableNumber
	
	
    ///////////////////////////////////////////////////////////////////////////
    /////// End Set Seat Functions ////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

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

    // Returns the reservation node value for a given tag name and a given reservation number
    getReservationNodeValue(i_tag_reservation_child_element, i_reservation_number)
    {
        var ret_node_value = '';

        var reservation_node_element_array = this.getReservationChildObjectArray(i_tag_reservation_child_element, i_reservation_number);

        if (reservation_node_element_array.length == 0) 
        {
            return "ReservationEventXml.getReservationNodeValue Error";
        }

        if (!this.checkChildTagForReservationNodeValue(i_tag_reservation_child_element, reservation_node_element_array))
        {
            return ret_node_value;
        }

        var reservation_element_node_value = reservation_node_element_array[0].childNodes[0].nodeValue;
        
        ret_node_value = this.removeFlagNodeValueNotSet(reservation_element_node_value);
        
        return ret_node_value;
        
    } // getReservationNodeValue


    // Sets the reservation node value for a given tag name and a given reservation number
    setReservationNodeValue(i_tag_reservation_child_element,i_reservation_element_value, i_reservation_number)
    {
        var reservation_element_value = this.setFlagNodeValueIsNotSetForEmptyString(i_reservation_element_value.toString());

        var reservation_node_element_array = this.getReservationChildObjectArray(i_tag_reservation_child_element, i_reservation_number);

        if (reservation_node_element_array.length == 0) 
        {
            return "ReservationEventXml.setReservationNodeValue Error";
        }

        if (!this.checkChildTagForReservationNodeValue(i_tag_reservation_child_element, reservation_node_element_array))
        {
            return;
        }

        reservation_node_element_array[0].childNodes[0].nodeValue = reservation_element_value;
        
    } // setReservationNodeValue

    // Check that the tag can be used for getSeatNodeValue and setSeatNodeValue
    // and that the number of elements in the array is one (1)
    checkChildTagForSeatNodeValue(i_tag_seat_child_element, i_seat_node_element_array)
    {
        if (i_tag_seat_child_element == this.m_tags.getTableNumber() || 
            i_tag_seat_child_element == this.m_tags.getSeatChar() )
        {
            if (i_seat_node_element_array.length == 1)
            {
                return true;
            }
            else
            {
                alert("ReservationEventXml.checkChildTagForSeatNodeValue Only one (1) element with tag <" 
                    + i_tag_seat_child_element + "> is allowed in the element wit tag <" + 
                    this.m_tags.getReservation() + ">");

                return false;
            }
            
        }
        else
        {
            alert("ReservationEventXml.checkChildTagForSeatNodeValue " + 
                " Functions getReservationNodeValue and setReservationNodeValue can only be called for tags " +
                "<" + this.m_tags.getTableNumber() + ">, " +  
                "<" + this.m_tags.getSeatChar() + "> ");

            return false;
        }

    } // checkChildTagForReserevationNodeValue
 
    // Check that the tag can be used for getReservationNodeValue and setReservationNodeValue
    // and that the number of elements in the array is one (1)
    checkChildTagForReservationNodeValue(i_tag_reservation_child_element, i_reservation_node_element_array)
    {
        if (i_tag_reservation_child_element == this.m_tags.getPassword() || 
            i_tag_reservation_child_element == this.m_tags.getName() ||
            i_tag_reservation_child_element == this.m_tags.getRemark() ||
            i_tag_reservation_child_element == this.m_tags.getEmail()    )
        {
            if (i_reservation_node_element_array.length == 1)
            {
                return true;
            }
            else
            {
                alert("ReservationEventXml.checkChildTagForReservationNodeValue Only one (1) element with tag <" 
                    + i_tag_reservation_child_element + "> is allowed in the element wit tag <" + 
                    this.m_tags.getReservation() + ">");

                return false;
            }
            
        }
        else
        {
            alert("ReservationEventXml.checkChildTagForReservationNodeValue " + 
                " Functions getReservationNodeValue and setReservationNodeValue can only be called for tags " +
                "<" + this.m_tags.getPassword() + ">, " +  
                "<" + this.m_tags.getName() + ">, " +  
                "<" + this.m_tags.getRemark() + "> and " +  
                "<" + this.m_tags.getEmail() + ">");

            return false;
        }

    } // checkChildTagForReserevationNodeValue

    // Returns the seat node value for a given tag name , a given reservation number and a given seat number
    getSeatNodeValue(i_tag_seat_child_element, i_reservation_number, i_seat_number)
    {
        var ret_node_value = '';

        var seat_node_element_array = this.getSeatChildObjectArray(i_tag_seat_child_element, i_reservation_number, i_seat_number);

        if (seat_node_element_array.length == 0) 
        {
            return "ReservationEventXml.getSeatNodeValue Error";
        }

        if (!this.checkChildTagForSeatNodeValue(i_tag_seat_child_element, seat_node_element_array))
        {
            return ret_node_value;
        }

        var seat_element_node_value = seat_node_element_array[0].childNodes[0].nodeValue;
        
        ret_node_value = this.removeFlagNodeValueNotSet(seat_element_node_value);
        
        return ret_node_value;
        
    } // getSeatNodeValue

    // Sets the seat node value for a given tag name , a given reservation number and a given seat number
    setSeatNodeValue(i_tag_seat_child_element,i_seat_element_value, i_reservation_number, i_seat_number)
    {
        var seat_element_value = this.setFlagNodeValueIsNotSetForEmptyString(i_seat_element_value.toString());

        var seat_node_element_array = this.getSeatChildObjectArray(i_tag_seat_child_element, i_reservation_number, i_seat_number);

        if (seat_node_element_array.length == 0) 
        {
            alert("ReservationEventXml.setSeatNodeValue seat_node_element_array array has zero elments");

            return;
        }

        if (!this.checkChildTagForSeatNodeValue(i_tag_seat_child_element, seat_node_element_array))
        {
            alert("ReservationEventXml.setSeatNodeValue Check of tag failes");

            return;
        }

        seat_node_element_array[0].childNodes[0].nodeValue = seat_element_value;
        
    } // setSeatNodeValue

     // Returns an array of seat <S> child objects for a given reservation number and seat number
     // i_tag_seat_child_element: Tag for element in seat element <S>, i.e. Table number <T>,
     //                           Seat character <C> and Seat name <SN>.
     //                           For <T> and <C> the returned array has one element. 
     //                           For <SN> there might be several elements
     getSeatChildObjectArray(i_tag_seat_child_element, i_reservation_number, i_seat_number)
     {
         var ret_seat_child_array = [];

         if (!this.checkSeatNumber(i_reservation_number, i_seat_number)) { return ret_seat_child_array; }

         var tag_seat_child_element = this.m_tags.getSeat();
 
         var seat_array = this.getReservationChildObjectArray(tag_seat_child_element, i_reservation_number);
 
         if (seat_array.length == 0) 
         {
            alert("ReservationEventXml.getSeatChildObjectArray Seat array from getReservationChildObjectArray has no elements");

             return ret_seat_child_array;
         }

         var index_s = i_seat_number - 1;

         ret_seat_child_array = seat_array[index_s].getElementsByTagName(i_tag_seat_child_element);
 
         return ret_seat_child_array;
 
     } // getSeatChildObjectArray


    // Returns an array of reservation <R> child objects for a given reservation number
    // i_tag_reservation_child_element: Tag for element in reservation element <R>, i.e.
    //                                  Name <N>, Email <E>, Password <P> and Seat <S>
    //                                  The returned array may only have multiple objects
    //                                  for the Seat <S> tag 
    getReservationChildObjectArray(i_tag_reservation_child_element, i_reservation_number)
    {
        var reservation_child_node_elements = [];

        if(!this.checkReservationNumber(i_reservation_number)) { return reservation_child_node_elements; }

        var index_reservation = i_reservation_number - 1;
        
        var reservation_node = this.getXmlObject().getElementsByTagName(this.m_tags.getReservation())[index_reservation];

        reservation_child_node_elements = reservation_node.getElementsByTagName(i_tag_reservation_child_element);

        return reservation_child_node_elements;

    } // getReservationChildObjectArray

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////// End Node Value Functions ////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////// Start Number Records  ///////////////////////////
    //////////////////////////////////////////////////////////////////////////

    // Returns the number of reservation records
    getNumberOfReservations()
    {
        var ret_n_records = -1;

        if (!this.checkEventXml()){ return ret_n_records; }

        var reservation_rec_nodes = this.getXmlObject().getElementsByTagName(this.m_tags.getReservation());

        ret_n_records = reservation_rec_nodes.length;

        return ret_n_records;

    } // getNumberOfReservations

    // Return true if the input reservation record number exists
    checkReservationNumber(i_reservation_number)
    {
        var n_reservations = this.getNumberOfReservations();

        if (n_reservations < 0)
        {
            alert("ReservationEventXml.checkReservationNumber Returned nummber of reservations is negative ");

            return false;
        }

        if (i_reservation_number >= 1 && i_reservation_number <= n_reservations)
        {
            return true;
        }
        else
        {
            alert("ReservationEventXml.checkReservationNumber Input layout file number " +  i_reservation_number.toString() + 
                                " is not between 1 and " + n_reservations.toString());

            return false;
        }

    } // checkReservationNumber	    

    // Returns the number of seat records for a giver reservation number
    getNumberOfSeats(i_reservation_number)
    {
        var ret_n_records = -1;

        if (!this.checkEventXml()){ return ret_n_records; }

        if (!this.checkReservationNumber(i_reservation_number)) {return ret_n_records; }

        var reservation_rec_nodes = this.getXmlObject().getElementsByTagName(this.m_tags.getReservation());

        var index_reservation = i_reservation_number - 1;

        var seat_node_elements = reservation_rec_nodes[index_reservation].getElementsByTagName(this.m_tags.getSeat());

        ret_n_records = seat_node_elements.length;

        return ret_n_records;

    } // getNumberOfSeats

    // Return true if the input seat record number exists
    checkSeatNumber(i_reservation_number, i_seat_number)
    {
        var n_seats = this.getNumberOfSeats(i_reservation_number);

        if (n_seats < 0)
        {
            alert("ReservationEventXml.checkSeatNumber Returned nummber of seats is negative ");

            return false;
        }

        if (i_seat_number >= 1 && i_seat_number <= n_seats)
        {
            return true;
        }
        else
        {
            alert("ReservationEventXml.checkSeatNumber Input seat number " +  i_seat_number.toString() + 
                                " is not between 1 and " + n_seats.toString());

            return false;
        }

    } // checkSeatNumber	    
	
	///////////////////////////////////////////////////////////////////////////
    ///////////////////////// End Number Records  /////////////////////////////
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
        this.m_tag_root = "H";
        this.m_tag_day = "D";
        this.m_tag_month = "M";
        this.m_tag_year = "Y";
        this.m_tag_event_name = "B";
        this.m_tag_reservation = "R";
        this.m_tag_password = "P";
        this.m_tag_reservation_name = "N";
        this.m_tag_reservation_remark = "A";
        this.m_tag_reservation_email = "E";
        this.m_tag_seat = "S";
        this.m_tag_seat_table_number = "T";
        this.m_tag_seat_character = "C";
        this.m_tag_seat_name = "SN";
    }

    getRoot(){return this.m_tag_root;}
    getDay(){return this.m_tag_day;}
    getMonth(){return this.m_tag_month;}
    getYear(){return this.m_tag_year;}
    getEventName(){return this.m_tag_event_name;}
    getReservation(){return this.m_tag_reservation;}
    getPassword(){return this.m_tag_password;}
    getName(){return this.m_tag_reservation_name;}
    getRemark(){return this.m_tag_reservation_remark;}
    getEmail(){return this.m_tag_reservation_email;}
    getSeat(){return this.m_tag_seat;}
    getTableNumber(){return this.m_tag_seat_table_number;}
    getSeatChar(){return this.m_tag_seat_character;}
    getSeatName(){return this.m_tag_seat_name;}

} // ReservationEventTags