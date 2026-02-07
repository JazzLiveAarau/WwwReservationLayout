// File: ScriptsLayout/MakeReservation.js
// Date: 2025-12-19
// Author: Gunnar Lidén

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Global Parameters /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Instance of the class MakeReservationData
var g_make_reservation_data = null;

// Array of selected tables
var g_all_selected_tables = null;

// Array of selected seats
var g_all_selected_seats = null;


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

        // Instance if the class SelectSeats
        this.m_select_seats_obj = null;

        // The maximum number of seat reservations that is allowed
        // Max percentage is defined in the season XML file
        // Available number of seats is defined in application HTML 
        // files like for instance MakeReservation.htm
        // The function calculating this value is the function 
        // defined in the CommonReserve class
        this.m_max_allowed_seat_reservations = -12345;

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
    // 2. Set (define/activate)the event functions. Call of setEventFunctions
    //    These event functions are defined in the HTML file MakeReservation.htm
    // 3. Create the event program XML object. Callback function is getPassedData
    static init()
    {
        console.log("MakeReservation.init Enter");

        if (!g_make_reservation_data.checkInput)
        {
            return;
        }

        setEventFunctions();

        g_make_reservation_data.m_season_program_xml = new EventProgramXml(g_make_reservation_data.m_url_xml_directory, 
            g_make_reservation_data.m_event_program_file_name_xml, MakeReservation.getPassedData);

    } // init

    // Get the passed data from the calling web page (application)
    // 1. Get name, email, remark and requested event number from sessionStorage
    // 2. Get the registered event number for the requested event number
    //    Call of EventProgramXml.getEventRegisteredNumber
    // 3. Initialize the selection arrays. Create the instance of the class SelectSeats
    //    Call of SelectSeats.init
    // 4. Load the reservation XML file for the current event. Call of loadReservationXml
    static getPassedData()
    {
        console.log("MakeReservation.getPassedData Enter");

        g_make_reservation_data.m_name = sessionStorage.getItem(g_session_storage_reservation_name);
        g_make_reservation_data.m_email = sessionStorage.getItem(g_session_storage_reservation_email);
        g_make_reservation_data.m_remark = sessionStorage.getItem(g_session_storage_reservation_remark);
		g_make_reservation_data.m_current_event_number = parseInt(sessionStorage.getItem(g_session_storage_requested_concert_number));

        var n_events = g_make_reservation_data.m_season_program_xml.getNumberOfEvents();

        if (g_make_reservation_data.m_current_event_number < 1 || g_make_reservation_data.m_current_event_number > n_events)
        {
            alert("MakeReservation.getPassedData Error. m_current_event_number is not between 1 and " + n_events.toString() +
                            " m_current_event_number= "  + g_make_reservation_data.m_current_event_number.toString() );
            return;
        }

        g_make_reservation_data.m_event_reg_number = g_make_reservation_data.m_season_program_xml.getRegNumber(g_make_reservation_data.m_current_event_number);

         var max_percentage = g_make_reservation_data.m_season_program_xml.getMaxReservations(g_make_reservation_data.m_current_event_number);

        g_make_reservation_data.m_max_allowed_seat_reservations = CommonReserve.getMaxAllowedNumberOfSeatReservations(max_percentage);

        g_make_reservation_data.m_select_seats_obj = new SelectSeats(g_make_reservation_data.m_reservation_xml, g_make_reservation_data.m_season_program_xml, 
                                g_make_reservation_data.m_current_event_number, g_make_reservation_data.m_max_allowed_seat_reservations);

        g_make_reservation_data.m_select_seats_obj.init();

        MakeReservation.loadReservationXml()
      
    } // getPassedData

    // Load the reservation XML file for the current event
    static loadReservationXml()
    {
        console.log("MakeReservation.loadReservationXml Enter");

        var b_new_file =false

        g_make_reservation_data.m_reservation_xml = new ReservationEventXml(g_make_reservation_data.m_url_xml_directory, g_make_reservation_data.m_event_reg_number, 
            g_make_reservation_data.m_current_event_number, b_new_file, MakeReservation.setControls);

    } // loadReservationXml

    // Set the controls after loading the reservation XML file
    static setControls()
    {
        console.log("MakeReservation.setControls After loading reservation XML file");

        CommonReserve.resetReservedProperties();

        CommonReserve.setReservedProperties(g_make_reservation_data.m_reservation_xml);
		  
        CommonReserve.setEventTitleText(g_make_reservation_data.m_season_program_xml, g_make_reservation_data.m_current_event_number);

        CommonReserve.setCapReservationButton(0);

    }   // setControls

} // MakeReservation

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Common Reservation ////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Common class for the reservation applications
class CommonReserve
{

    // Reset all seats to free seats, i.e. set the seat free color
    static resetReservedProperties()
    {
        var circle_nodes = document.getElementsByTagName("circle");
        
        for (var index_cir=0; index_cir<circle_nodes.length; index_cir++)
        {
            var element_circle = circle_nodes[index_cir];
            if (element_circle != null)
            {
                element_circle.style["fill"] = CommonReserve.colorFreeSeat();
            }		
        }
            
    } // resetReservedProperties

    // Set the reserved seats color property to reserved color
    // i_reservations_xml: Instance of the class ReservationEventXml
    static setReservedProperties(i_reservations_xml)
    {
        if (null == i_reservations_xml)
        {
            alert("CommonReserve.setReservedProperties: Concert reservation XML object is null");

            return;
        }
        
        var total_number_reservations = i_reservations_xml.getNumberOfReservations();
        if (0 == total_number_reservations)
        {
            return;
        }

        var id_cir_array = i_reservations_xml.getArraySeatCircleIds();

        var number_seats = 	id_cir_array.length;

        for (var seat_number=1; seat_number<=number_seats; seat_number++)
        {
            var cir_id = id_cir_array[seat_number-1];
            
            var element_circle = document.getElementById(cir_id);
            if (element_circle != null)
            {
                element_circle.style["fill"] = CommonReserve.colorReservedSeat();
            }
        }
        
    } // setReservedProperties

    // Set the event title text for the current event
    // i_season_program_xml: Instance of the class EventProgramXml
    // i_event_number: Event number (integer)
    static setEventTitleText(i_season_program_xml, i_event_number)
    {
        var event_text = CommonReserve.getEventTitleText(i_season_program_xml, i_event_number);

        var element_text = document.getElementById(g_id_reservation_show_concert_date_band);
        if (null == element_text)
        {
            alert("CommonReserve.setEventTitleText Element text is null");

            return;
        }
        
        element_text.textContent = event_text;

        console.log("CommonReserve.setEventTitleText event_title= " + event_text);

    } // setEventTitleText

    // Set the caption of the reservation button depending on the number of selected seats
    // i_number_selected: Number of selected seats (integer)
    static setCapReservationButton(i_number_selected)
    {
        // Return if button not is defined. TODO Check if nessesary/used
        if (g_user_is_concert_visitor == "false")
            return;

        var element_text_image = document.getElementById("text_image_send_email");
        if (null == element_text_image)
        {
            alert("CommonReserve.setCapReservationButton Button element_text_image is null"); 
            
            return;
        }

        var text_image_select_seats = 'ImagesApp/text_select_seats.png';

        var text_image_reserve_seats = 'ImagesApp/text_reserve_seats.png';

        if (i_number_selected == 0)
        {
            console.log("CommonReserve.setCapReservationButton i_number_selected = 0");

            element_text_image.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', text_image_select_seats);
            element_text_image.innerHTML =  '<title>' + g_title_text_image_select_seats + '</title>';
        }
        else
        {
            console.log("CommonReserve.setCapReservationButton i_number_selected= " + i_number_selected.toString());

            element_text_image.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', text_image_reserve_seats);
            element_text_image.innerHTML =  '<title>' + g_title_text_image_reserve_seats+ '</title>';
        }

    } // setCapReservationButton

    // Set the caption of the ....
    static setCapForSaveReservationButton(i_number_selected)
    {
        // Return if not the add reservation case
        if (g_user_is_concert_visitor == "true")
        {
            return;
        }
        
        var element_text_image = document.getElementById("id_image_save_reservation_text");
        if (null == element_text_image)
        {
            alert("CommonReserve.setCapForSaveReservationButton Element text image is null");
            return;
        }	

        var text_image_save_reservation = 'ImagesApp/text_save_reservation.png';

        var text_image_save_reservation_white = 'ImagesApp/text_save_reservation_white.png';
        
        if (g_current_reservation_name.length > 0)
        {
            // setButtonText("text_save_reservation", g_save_reservation_text);
            
            element_text_image.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', text_image_save_reservation);
            
            setButtonColor("button_save_reservation", g_active_mode_color);		// TODO 
        }
        else
        {
            // setButtonText("text_save_reservation", "");
            
            element_text_image.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', text_image_save_reservation_white);
            
            setButtonColor("button_save_reservation", g_color_white);		// TODO
        }
	
    } // setCapForSaveReservationButton

    // Returns the event title text for the current event
    // i_season_program_xml: Instance of the class EventProgramXml
    // i_event_number: Event number (integer)
    static getEventTitleText(i_season_program_xml, i_event_number)
    {
        var event_day = i_season_program_xml.getDay(i_event_number);
        var event_month = i_season_program_xml.getMonth(i_event_number);
        var event_year = i_season_program_xml.getYear(i_event_number);
        var event_name = i_season_program_xml.getEventName(i_event_number);

        var ret_title = event_day.toString() + '/' + event_month.toString() + '-' + event_year.toString() + ' ' + event_name;

        return ret_title;
       
    } // getEventTitleText

    // Returns the color for a free seat
    static colorFreeSeat()
    {
        return 'white';

    } // colorFreeSeat

    // Returns the color for a reserved seat
    static colorReservedSeat()
    {
        return 'red';

    } // colorReservedSeat

    // Returns the maximum allowed number of seat reservations
    // i_percentage: Percentage of the total number of available seats
    // 1. Get the total number of available seats. Call of getTotalNumberOfAvailableSeats
    //    This function is defined in HTML applications file like for instance MakeReservation.htm
    static getMaxAllowedNumberOfSeatReservations(i_percentage)
    {
         var total_number_seats = getTotalNumberOfAvailableSeats();

        if (i_percentage < 0 || i_percentage > 100)
        {
            alert("CommonReserve.getMaxAllowedNumberOfSeatReservations Error. i_percentage is less than zero or greater than 100. i_percentage= " 
                + i_percentage.toString());
            
            return total_number_seats;
        }

        var max_n_seats_procent_float = parseFloat(i_percentage)/100.0;

        var total_number_seats_float = parseFloat(total_number_seats);

        var ret_maximum_number_reservations = parseInt(max_n_seats_procent_float*total_number_seats_float);     

        console.log("CommonReserve.getMaxAllowedNumberOfSeatReservations ret_maximum_number_reservations= " + ret_maximum_number_reservations.toString());
        
        return ret_maximum_number_reservations;

    } // setMaxNumberSeatReservations()


} // CommonReserve

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Common Reservation //////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

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