// File: ScriptsLayout/MakeReservation.js
// Date: 2025-12-16
// Author: Gunnar Lidén

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Global Parameters /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Instance of the class MakeReservationData
var g_make_reservation_data = null;

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Global Parameters ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Holds all data for making a reservation with the popup web page MakeReservation.htm 
// This popup web page is created from another application like for instance the 
// Jazz live AARAU homepage
class MakeReservationData
{
    constructor(i_url_xml_directory, i_event_program_file_name_xml)
    {
        // Member variables
        // ================

        // URL directory for the reservation and event program XML files
        this.m_url_xml_directory = i_url_xml_directory.trim();

        // Name of the event program XML file
        this.m_event_program_file_name_xml = i_event_program_file_name_xml.trim();

        // Name of the person making the reservation
        this.m_name = "";

        // Email of the person making the reservation
        this.m_email = "";

        // Remark for the reservation
        this.m_remark = "";

        // Registered event number for the requested concert (string)
        // This defines the name of the reservation XML file and the 
        // event in the event program XML file
        this.m_event_reg_number = "";

        // Current event number (integer) for the requested event. This defines
        // the event in the event program XML file. 
        // This is also an alternative input data to the registered event number
        this.m_current_event_number = -12345;

        // XML object event program
        this.m_season_program_xml = null;

        // XML object reservation for the current event
        this.m_reservation_xml = null;

    } // constructor

    // Check the input data
    checkInput()
    {
        var ret_check_input = true;

        if (null == this.m_url_xml_directory || this.m_url_xml_directory.length == 0)
        {
            alert("MakeReservationData.checkInput Error. m_url_xml_directory is null or length zero");

            ret_check_input = false;
        }

        if (null == this.m_event_program_file_name_xml || this.m_event_program_file_name_xml.length == 0)
        {
            alert("MakeReservationData.checkInput Error. m_event_program_file_name_xml is null or length zero");

            ret_check_input = false;
        }

        var reservation_name = sessionStorage.getItem(g_session_storage_reservation_name);
        var reservation_email = sessionStorage.getItem(g_session_storage_reservation_email);
        var reservation_remark = sessionStorage.getItem(g_session_storage_reservation_remark);
		var requested_event_number = sessionStorage.getItem(g_session_storage_requested_concert_number);

        if (null == reservation_name || reservation_name.length == 0)
        {
            alert("MakeReservationData.checkInput Error. g_session_storage_reservation_name content is null or length zero");

            ret_check_input = false;
        }

        if (null == reservation_email || reservation_email.length == 0)
        {
            alert("MakeReservationData.checkInput Error. g_session_storage_reservation_email content is null or length zero");

            ret_check_input = false;
        }

        if (null == reservation_remark )
        {
            alert("MakeReservationData.checkInput Error. g_session_storage_reservation_remark content is null");

            ret_check_input = false;
        }

        if (null == requested_event_number || requested_event_number.length == 0)
        {
            alert("MakeReservationData.checkInput Error. g_session_storage_requested_concert_number content is null or length zero");

            ret_check_input = false;
        }
        else
        {
            var requested_event_number_int = parseInt(requested_event_number);

            if (requested_event_number_int <= 0)
            {
                alert("MakeReservationData.checkInput Error. Requsted event number is less or equal zero. requested_event_number_int= " + requested_event_number);
            }
        }

        return ret_check_input;

    } // checkInput

} // MakeReservationData

// Class for main make reservation, i.e. making a reservation from another application
// like for instance from the homepage of Jazz live AARAU
// Input data is name, email, remark and requested event defined by the registered event number.
// The name of the reservation file is defined by the registered event number.
// i_url_xml_directory: URL directory for the reservation and event program XML files
// i_event_program_file_name_xml: Name of the event program XML file
class MakeReservation
{
    // Initialization function
    // 1. Check the input data. Call of checkInput
    // 2. Create the event program XML object. Callback function is getPassedData
    static init()
    {
        if (!g_main_make_data_object.checkInput)
        {
            return;
        }

        g_main_make_data_object.m_season_program_xml = new EventProgramXml(g_main_make_data_object.m_url_xml_directory, 
            g_main_make_data_object.m_event_program_file_name_xml, MakeReservation.getPassedData);

    } // init

    // Get the passed data from the calling web page (application)
    // 1. Get name, email, remark and requested event number from sessionStorage
    // 2. Get the registered event number for the requested event number
    //    Call of EventProgramXml.getEventRegisteredNumber
    // 3. Load the reservation XML file for the current event. Call of loadReservationXml
    static getPassedData()
    {
        g_main_make_data_object.m_name = sessionStorage.getItem(g_session_storage_reservation_name);
        g_main_make_data_object.m_email = sessionStorage.getItem(g_session_storage_reservation_email);
        g_main_make_data_object.m_remark = sessionStorage.getItem(g_session_storage_reservation_remark);
		g_main_make_data_object.m_current_event_number = parseInt(sessionStorage.getItem(g_session_storage_requested_concert_number));

        var n_events = g_main_make_data_object.m_season_program_xml.getNumberOfEvents();

        if (g_main_make_data_object.m_current_event_number < 1 || g_main_make_data_object.m_current_event_number > n_events)
        {
            alert("MakeReservation.getPassedData Error. m_current_event_number is not between 1 and " + n_events.toString() +
                            " m_current_event_number= "  + g_main_make_data_object.m_current_event_number.toString() );
            return;
        }

        this.m_event_reg_number = g_main_make_data_object.m_season_program_xml.getEventRegisteredNumber(this.m_current_event_number);

        MakeReservation.loadReservationXml()
      
    } // getPassedData

    // Load the reservation XML file for the current event
    static loadReservationXml()
    {

        g_main_make_data_object.m_reservation_xml = new ReservationEventXml(g_main_make_data_object.m_url_xml_directory, g_main_make_data_object.m_event_reg_number, 
            g_main_make_data_object.m_current_event_number, b_new_file=false, MakeReservation.afterLoadReservationXml);

    } // loadReservationXml

    static afterLoadReservationXml()
    {
        console.log("MakeReservation.afterLoadReservationXml Reservation XML file loaded");

    }   // afterLoadReservationXml

} // MakeReservation

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Pass Data /////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Class for setting and getting reservation data to/from session storage
// The static functions are used for passing data to the popup web page MakeReservation.htm
// from the homepage or another event reservation application
class PassReservation
{
    // Set the data to session storage
    // i_pass_data: Instance of the class PassReservationData
    static set(i_pass_data)
     {

        sessionStorage.setItem(PassReservation.getKeyName(), i_pass_data.m_reservation_name);
        sessionStorage.setItem(PassReservation.getKeyEmail(), i_pass_data.m_reservation_email);
        sessionStorage.setItem(PassReservation.getKeyRemark(), i_pass_data.m_reservation_remark);
        sessionStorage.setItem(PassReservation.getKeyRegEventNumber(), i_pass_data.m_reg_event_number);
        sessionStorage.setItem(PassReservation.getKeyEventNumber(), i_pass_data.m_event_number);

     } // set

    // Get the data, Instance of the class PassReservationData, from session storage
     static get()
     {
        var pass_data = new PassReservationData();

        pass_data.m_reservation_name = sessionStorage.getItem(PassReservation.getKeyName());
        pass_data.m_reservation_email = sessionStorage.getItem(PassReservation.getKeyEmail());
        pass_data.m_reservation_remark = sessionStorage.getItem(PassReservation.getKeyRemark());
        pass_data.m_reg_event_number = sessionStorage.getItem(PassReservation.getKeyRegEventNumber());
        pass_data.m_event_number = parseInt(sessionStorage.getItem(PassReservation.getKeyEventNumber()));

        return pass_data;

     } // get

    // Get the key name for session storage
    static getKeyName()
    {
        return "reservation_name_str";

    } // getKeyName

    // Get the key email for session storage
    static getKeyEmail()
    {
        return "reservation_email_str";

    } // getKeyEmail

    // Get the key remark for session storage
    static getKeyRemark()
    {
        return "reservation_remark_str";

    } // getKeyRemark

    // Get the key event number for session storage
    // TODO To be replaced by getKeyRegEventNumber
    static getKeyEventNumber()
    {
        return "reservation_requested_concert_number";

    } // getKeyEventNumber

    // Get the key registereed (unique) event number for session storage
    static getKeyRegEventNumber()
    {
        return "reservation_reg_event_number_str";

    } // getKeyRegEventNumber
    
} // PassReservation

// Class for passing reservation data to popup web page MakeReservation.htm
// from the homepage or other event reservation application
class PassReservationData
{
    constructor()
    {
        // The name of the person that makes the reservation
        this.m_reservation_name = '';

        // The email address to the person that makes the reservation
        this.m_reservation_email = '';

        // Remark from the person that makes the reservation
        this.m_reservation_remark = '';

        // The registerd event number for the reservation (a string)
        this.m_reg_event_number = "";

        // The event (for instance concerer) number for the reservation
        // TODO To be replaced by m_reg_event_number
        this.m_event_number = "";

    } // constructor

    // Set the name of the person making the reservation
    setName(i_name)
    {
        this.m_reservation_name = i_name.trim();

    } // setName

    // Set the email address to the person making the reservation
    setEmail(i_mail)
    {
        this.m_reservation_email = i_mail.trim();

    } // setEmail

    // Set the remark from the person making the reservation
    setRemark(i_remark)
    {
        this.m_reservation_remark = i_remark.trim();

    } // setRemark

   // Set the registered (unique) event number for the reservation
    setRegEventNumber(i_reg_event_number)
    {
        this.m_reg_event_number = i_reg_event_number.trim();

    } // setRegEventNumber

    // Set the registered (unique) event number for the reservation
    // TODO To be replaced by setRegEventNumber
    setEventNumber(i_event_number)
    {
        this.m_event_number = i_event_number.trim();

    } // setEventNumber

    // Return the name of the person making the reservation
    getName()
    {
        return this.m_reservation_name;

    } // getName

    // Return the email address to the person making the reservation
    getEmail()
    {
        return this.m_reservation_email;

    } // getEmail

    // Return the remark from the person making the reservation
    getRemark()
    {
        return this.m_reservation_remark;

    } // getRemark

    // Return the registered (unique) event number for the reservation
    getRegEventNumber()
    {
        return this.m_reg_event_number;

    } // getRegEventNumber

    // Return the event number for the reservation
    // TODO To be replaced by getRegEventNumber
    getEventNumber()
    {
        return this.m_event_number; 

    } // getEventNumber
    
} // PassReservationData


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Pass Data ///////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////