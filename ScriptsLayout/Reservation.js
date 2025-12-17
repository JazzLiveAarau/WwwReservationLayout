// File: ScriptsLayout/Reservation.js
// Date: 2025-12-17
// Author: Gunnar Lidén


// File: Reservation\scripts\Reservation.js

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Global Parameters /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Defines the name of reservation XML files
var g_url_file_concert_reservation_xml_name_start = "Reservation_";

// Defines the name of the directory for the reservation XML files
// The XML file JazzProgramm_aktuelle_saison.xml is also in this directory
var g_url_file_concert_reservation_xml_directory = "SaisonXML/";

// The subdirectory for the event program XML file
var g_xml_event_program_subdirectory = "SaisonXML";

// The name of the current concert reservations XML file
var g_url_file_concert_reservation_xml_name = "Undefined";

// Name of the XML file that defines events like for instance concerts
// The file is created with the application 'Reservation Layout' which
// takes a JAZZ live AARAU season program XML file as input
var g_url_xml_file_event_program = "EventProgram.xml";

// The maximum number of reservations
var g_maximum_number_reservations = -12345;

// Array of selected tables
var g_all_selected_tables = null;

// Array of selected seats
var g_all_selected_seats = null;

// Modal popup window. Instance of ReservationModalPopup
var g_modal_popup_window = null;

// window.sessionStorage keys
var g_session_storage_list_reservations = "list_reservations_str";
var g_session_storage_print_reservations = "print_reservations_str";
var g_session_storage_email_make_reservation_seats = "email_make_reservation_seats_str";
var g_session_storage_email_make_reservation_concert = "email_make_reservation_concert_str";
var g_session_storage_add_to_xml_file_name = "add_to_xml_file_name_str";
var g_session_storage_reservation_name = "reservation_name_str";
var g_session_storage_reservation_email = "reservation_email_str";
var g_session_storage_reservation_remark = "reservation_remark_str";
var g_session_storage_requested_concert_number = "reservation_requested_concert_number";

// XML object event program
var g_season_program_xml = null;

// Current event number
var g_current_event_number = -12345;

// XML HTTP object layout
var g_layout_xmlhttp = null;

// XML object layout
var g_layout_xml = null;

// XML object concert reservations
var g_reservations_xml = null;

// Size in pixels corresponding to g_premises_width
var g_premises_width_max_pixel = 900;
var g_scale_dimension = 0.123456789;

// Flag telling if the user is concert visitor that will send a reservation email or
// if the user is somebody in the jazz club that will add a reservation to the 
// concert XML object 
var g_user_is_concert_visitor = "true";

// Flag telling if the current web page (document) is for search (true)
// For add of a reservation page (false)
var g_for_web_page_search = "false";

// Part of XML reservation file name (Salmen or Test)
// This is for the concerts dropdown. Not a very nice solution ...
var g_add_to_xml_file_name_for_drop_down = "undefined";

// Global variables for the make reservation initialzation
var g_add_to_xml_file_name_make_reservation = 'Undefined';
var g_requested_concert_number_make_reservaion = 'Undefined';

// TODO Remove g_user_request_with_email Email request no longer used
// Flag telling if the user will send a reservation email or directly make a reservation
// (The flag g_user_is_concert_visitor is true)
var g_user_request_with_email = "true";

// Current name for a reservation. 
// Also used as a flag telling if the user is in the select seats mode
var g_current_reservation_name = "";

// Current email for a reservation. 
var g_current_reservation_email = "";

// Current remark for a reservation. 
var g_current_reservation_remark = "";

// Flag telling if the delete reservation mode is active
var g_delete_reservation_mode = "false";

// Creation case update reservation XML file
var g_xml_creation_case_update = "xml_update";

// Creation case new reservation XML files
var g_xml_creation_case_new = "xml_new";

// Arrays for the concerts dropdown of the web page StartReservation.htm
var g_season_concerts_date_band_array = [];
var g_season_concert_number_array = []; 
var g_season_next_concert_number = -12345;
var g_drop_down_date_band_array = [];
var g_drop_down_concert_number_array = [];

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Global Parameters ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Fonts, Sizes & Colors /////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////


// Fonts, font sizes and colors (styles)
var g_font_big = ' font-family="arial" font-size="50px" fill=';
var g_font_mid = ' font-family="arial" font-size="30px" fill=';
var g_font_button = ' font-family="arial" font-size="22px" ';
var g_style_wall = ' style="fill:rgb(222, 223, 224);stroke-width:1;stroke:black"';
var g_style_wall_black = ' style="fill:rgb(0, 0, 0);stroke-width:1;stroke:black"';
var g_style_button = ' style="cursor: pointer;fill:white;stroke-width:1;stroke:black" ';
var g_style_button_blue = ' style="fill:blue;stroke-width:1;stroke:black" ';
var g_style_button_purple = ' style="fill:purple;stroke-width:1;stroke:black" ';
var g_style_cursor_pointer = ' style="cursor: pointer; "';
var g_color_jazz_live_aarau = ' "rgb(255, 0, 40)" ';
var g_prompt_text_color = "yellow";
var g_active_mode_color = "magenta";
var g_color_white = "white";
var g_color_silver = "silver";
var g_color_light_blue = "LightSkyBlue";
var g_color_indigo = "Indigo";
var g_color_green_yellow = "GreenYellow";
var g_color_yellow = "Yellow";

var g_color_free_seat = "white"; // Blue rgb(142, 181, 242) Light green rgb(175, 234, 152)
var g_color_reserved_seat = "red";
var g_color_seat_circle = "black";

// https://www.december.com/html/spec/colorsvg.html
// https://stackoverflow.com/questions/26672936/cursor-pointer-on-svg-element-is-not-working

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Fonts, Sizes & Colors ///////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Main Functions ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Main function for adding a reservation
function MainAddReservation(i_add_to_xml_file_name)
{  
    g_user_is_concert_visitor = "false";
	
    g_add_to_xml_file_name_for_drop_down = i_add_to_xml_file_name;
   
    setEventFunctions(); // These functions are defined in file AddReservation.htm

   g_season_program_xml = new EventProgramXml(g_xml_event_program_subdirectory, 
        g_url_xml_file_event_program, MainAddReservationAfterLoadEventProgramXml);
	
} // MainAddReservation

// Callback after creation of the season program XML object
function MainAddReservationAfterLoadEventProgramXml()
{
    // alert("MainAddReservationAfterLoadEventProgramXml");

    console.log("MainAddReservationAfterLoadEventProgramXml Enter");

     var url_file_reservation_concert_xml = getNextConcertReservationXmlFileName("Salmen");

	loadReservationXMLDoc(url_file_reservation_concert_xml) ;

    if ("false" == g_for_web_page_search)
    {		  
        addAndSetConcertsDropDown();
        
        addSearchInputFieldAndClearButton();
    }
    else if ("true" == g_for_web_page_search)
    {		  
        g_current_event_number = g_season_program_xml.getEventNumberForNextEvent();

        if (g_current_event_number <= 0)
        {
            alert("MainAddReservationAfterLoadEventProgramXml Case Search. g_current_event_number <=0");

            g_current_event_number = 1;
        }

        setMaxNumberSeatReservations();

        addSearchInputFieldAndClearButton();
    }
	
	removeElement(g_id_button_event_list); // New QQQQQQQ	

    console.log("MainAddReservationAfterLoadEventProgramXml 3. g_current_event_number= " + g_current_event_number);

    setMaxNumberSeatReservations();

} // MainAddReservationAfterLoadEventProgramXml

// Main (onload) function for making a reservation by anybody (i.e. not only by an administrator)
// This web page is opened from MakeReservation.htm, i.e. the page where the user inputs 
// name, email, remark and the requested concert number on the homepage or from EventReservation.htm
// After load of the XML reservation object for the requested concert number
// the event functions EventMouseDownConcertVisitor and mouseDownSaveReservation (saveSelectedReservations)
// handles the input from the user, i.e. the selection of seats and the saving of reservation.
// 1. Get the passed data from StartReservation.htm, i.e. member variables of the web page
//    Passing of data with member variables often fail for Internet Explorer and Microsoft Edge
//    For this case sessionStorage data is used.
// 2. Set name, email and remark as global variables. Call of setNameEmailRemarkGlobalVariables
// 3. Set flags that the user is a concert visitor (and not an administrator)
// 4. Set the event functions for the circles on the SVG image. Call of setEventFunctions.
// 5. Load the event program XML file (g_season_program_xml).
//    Afteloading call function MainMakeReservationAfterLoadEventProgramXml
function MainMakeReservation()
{ 
    console.log("MainMakeReservation Enter");

    g_make_reservation_data = new MakeReservationData(g_url_file_concert_reservation_xml_directory, g_url_xml_file_event_program);

    MakeReservation.init();

    var add_to_xml_file_name = window.passed_data_add_to_xml_file_name;
    var reservation_name = window.passed_data_reservation_name;
    var reservation_email = window.passed_data_reservation_email;
    var reservation_remark = window.passed_data_reservation_remark;
	var requested_concert_number = window.passed_data_requested_concert_number;
	
    // For Internet Explorer and Microsoft Edge. The passing of data sometimes fails in these browsers 	
	if (null == add_to_xml_file_name || null == reservation_name || null == reservation_email || null == reservation_remark || null == requested_concert_number)
	{
        console.log("MainMakeReservation Passed data from sessionStorage"); 

		//QQ add_to_xml_file_name = sessionStorage.getItem(g_session_storage_add_to_xml_file_name);
        add_to_xml_file_name = "Salmen"; // TODO Remove
        reservation_name = sessionStorage.getItem(g_session_storage_reservation_name);
        console.log("MainMakeReservation reservation_name= " + reservation_name); 
        reservation_email = sessionStorage.getItem(g_session_storage_reservation_email);
        console.log("MainMakeReservation reservation_email= " + reservation_email); 
        reservation_remark = sessionStorage.getItem(g_session_storage_reservation_remark);
        console.log("MainMakeReservation reservation_remark= " + reservation_remark); 
		requested_concert_number = sessionStorage.getItem(g_session_storage_requested_concert_number);
        console.log("MainMakeReservation requested_concert_number= " + requested_concert_number); 
	}

    console.log("MainMakeReservation Passed data is retrieved"); 

    g_add_to_xml_file_name_make_reservation = add_to_xml_file_name;
    g_requested_concert_number_make_reservaion = requested_concert_number;
    g_current_event_number = g_requested_concert_number_make_reservaion;

    console.log("MainMakeReservation Current event number is set. g_current_event_number= " 
                    + g_current_event_number.toString());
	
    setNameEmailRemarkGlobalVariables(reservation_name, reservation_email, reservation_remark);	
	
    g_user_is_concert_visitor = "true";
	
	g_user_request_with_email = "false";
   
    setEventFunctions(); // These functions are defined in the file MakeReservation.htm

    g_season_program_xml = new EventProgramXml(g_xml_event_program_subdirectory, 
        g_url_xml_file_event_program, MainMakeReservationAfterLoadEventProgramXml);

} // MainMakeReservation

// Callback function after loading the event progran file
// 1. Set the maximum number of seats that can be reserved
//    Call of setMaxNumberSeatReservations
// 2. Construct the name of the XML reservation file for the requested concert number
//    (e.g. Reservation_Salmen_09.xml in folder SaisonXML) and load this file, i.e.
//    set global parameter g_season_program_xml. Call of constructNameLoadReservationXMLDoc. 
//    The reservation file name is stored in g_url_file_concert_reservation_xml_name 
function MainMakeReservationAfterLoadEventProgramXml()
{
    g_current_event_number = g_requested_concert_number_make_reservaion;

    console.log("MainMakeReservationAfterLoadEventProgramXml Current event number is set. g_current_event_number= " 
                    + g_current_event_number.toString());

    setMaxNumberSeatReservations();

    constructNameLoadReservationXMLDoc(g_add_to_xml_file_name_make_reservation, g_requested_concert_number_make_reservaion);

} // MainMakeReservationAfterLoadEventProgramXml

// Set concerts dropdown 
// Note that the function is used for two web pages: StartReservation.htm and AddReservation.htm
// Input data is an id for a <div> element where the dropdown shall be added and
// the case concert visitor or administrator (global variable g_user_is_concert_visitor) 
// 1. Set the global array variables with data for the dropdown. Call of setSeasonConcertArrays.
// 2. Set (selected) array data defining the dropdown. Call of setConcertDropDownArrays 
// 3. Get the HTML code for the dropdown. Call of getConcertsDropDownHtml
// 4. Get the <div> element with the input identity
// 5. Set the value (innerHTML) of the <div> element.
function setConcertsDropDown(i_id_div_element)
{
    setSeasonConcertArrays();

    console.log("setConcertsDropDown 1. g_current_event_number= " + g_current_event_number);
	
    setConcertDropDownArrays(g_user_is_concert_visitor);

    console.log("setConcertsDropDown 2. g_current_event_number= " + g_current_event_number);
   
    var dropdown_html = getConcertsDropDownHtml();
	
    var element_div_dropdown = document.getElementById(i_id_div_element);	
    if (null == element_div_dropdown)
    {
        alert("setConcertsDropDown element_div_dropdown is null");
        return;
    }
	
    element_div_dropdown.innerHTML = dropdown_html;
	
} // setConcertsDropDown

// Set the season concerts arrays, i.e. global variables g_season_concerts_date_band_array,
// g_season_concert_number_array and g_season_next_concert_number
// These array will be used for the concerts dropdown of the web page StartReservation.htm
// 1. Get the number for the next concert. Call of getConcertNumberForNextConcert
function setSeasonConcertArrays()
{
    if (null == g_season_program_xml)
    {
        alert("setSeasonConcertArrays Season XML has not been loaded. g_season_program_xml is null");
        return;
    }

    var b_only_coming = false;
    var event_name_array = g_season_program_xml.getEventNameArray(b_only_coming);

    var date_format = 'swiss';
    var event_date_array = g_season_program_xml.getEventDateArray(b_only_coming, date_format);

     g_season_concerts_date_band_array = [];

     g_season_concert_number_array= [];

    for (var index_event = 0; index_event < event_name_array.length; index_event++)
    {
        var date_band_name = event_date_array[index_event] + ' ' + event_name_array[index_event];

        g_season_concerts_date_band_array[index_event] = date_band_name;

        g_season_concert_number_array[index_event] = index_event + 1;
    }

    var next_event_number_int = g_season_program_xml.getEventNumberForNextEvent();

    if (next_event_number_int >= 1)
    {
        g_season_next_concert_number = next_event_number_int.toString();

        g_current_event_number = next_event_number_int;
    }
    else
    {
        alert(g_error_next_season_passed);
        g_season_next_concert_number = '1';
        g_current_event_number = 1;
    }	

    console.log("setSeasonConcertArrays Current event number is set. g_current_event_number= " 
                    + g_current_event_number.toString());
	
} // setSeasonConcertArrays

// Sets the concert dropdown array, i.e. the global variables g_drop_down_date_band_array
// and g_drop_down_concert_number_array.
// The XML season program must be loaded and the arrays for the concert drop-downs must
// be set before this function is called. 
// For the case that the user is a concert visitor, only coming concerts will be in the arrays
// For the case that the user is an administrator, all season concerts will be in the arrays
function setConcertDropDownArrays(i_user_is_concert_visitor)
{
    if (0 == g_season_concerts_date_band_array.length || 0 == g_season_concert_number_array.length)
    {
        alert("onloadStartReservation Arrays g_season_concerts_date_band_array and/or g_season_concert_number_array not set");
        return;	
    }

     var next_event_number_int = g_season_program_xml.getEventNumberForNextEvent();
	
    if (next_event_number_int <= 0 || next_event_number_int > g_season_concerts_date_band_array.length)
    {
        alert("onloadStartReservation Next concert number is not 1, 2, ..., 12 g_season_next_concert_number= " + next_event_number_int.toString());
        return;	
    }

    g_current_event_number = next_event_number_int;

    console.log("setConcertDropDownArrays Current event number is set. g_current_event_number= " 
                    + g_current_event_number.toString());

	var index_drop_down = 0;
	
    for (index_concert=0; index_concert<g_season_concerts_date_band_array.length; index_concert++)
    {
        var concert_number_int = parseInt(g_season_concert_number_array[index_concert]);
	    if (next_event_number_int <= concert_number_int || "false" == i_user_is_concert_visitor)
        {
			g_drop_down_date_band_array[index_drop_down] = g_season_concerts_date_band_array[index_concert];
			g_drop_down_concert_number_array[index_drop_down] = g_season_concert_number_array[index_concert];
            index_drop_down = index_drop_down + 1;
        }
    }
	
} // setConcertDropDownArrays

// Ger the concerts dropdown dialog as HTML code
// The dropdown arrays must have been set before this function is called,
// i.e. setConcertDropDownArrays() must have been called
function getConcertsDropDownHtml()
{
    // https://www.w3schools.com/tags/att_select_name.asp
	
    var ret_dropdown_html = '';
	
    if (g_drop_down_date_band_array.length == 0)
	{
        alert("addConcertsDropDown g_drop_down_date_band_array has length zero (0)");
        return ret_dropdown_html;
	}

    ret_dropdown_html = ret_dropdown_html + '<select id= "id_dropdown_concerts" name="dropdown_concerts"  onchange= "eventSelectConcertDropDown()" ><br>';
	
    for (index_dropdown=0; index_dropdown < g_drop_down_date_band_array.length; index_dropdown++)
    {
        var option_str = '<option value="' + g_drop_down_concert_number_array[index_dropdown].toString() + '">' + g_drop_down_date_band_array[index_dropdown] + '</option><br>';

        ret_dropdown_html = ret_dropdown_html + option_str;  
    }

    ret_dropdown_html = ret_dropdown_html + '</select><br>';
	
    return ret_dropdown_html;
	
} // getConcertsDropDownHtml

// Event handling function when the user selected a concert
function eventSelectConcertDropDown()
{
    if ("true" == g_user_is_concert_visitor)
    {
        return;
    }
	
    var dropdown_element = document.getElementById("id_dropdown_concerts");
    if (dropdown_element == null)
	{
        alert("eventSelectConcertDropDown dropdown_element is null");
        return;		
	}
	
    var new_value_concert_number = dropdown_element.value;

    g_current_event_number = new_value_concert_number;

    constructNameLoadReservationXMLDoc(g_add_to_xml_file_name_for_drop_down, new_value_concert_number);
	
	// Does not work here?? resetReservedProperties();
	
	setReservationsAndInitSelectionArrays();
	
} // eventSelectConcertDropDown

// Show the layout of the premises
function mainShowLayout()
{
    removeElement("button_send_email");
	
	removeElement("text_image_send_email");	

    removeElement(g_id_reservation_show_concert_date_band);	
	
} // mainShowLayout

// Search for seats
// 1. Initialize as for AddReservation.html. Call of MainAddReservation
// 2. Remove all buttons. Calls of removeElementsForSearchPage
function mainSearchReservation(i_add_to_xml_file_name)
{
    g_for_web_page_search = "true";
	
    g_add_to_xml_file_name_for_drop_down = i_add_to_xml_file_name;	
    
    MainAddReservation(i_add_to_xml_file_name);
	 
    removeElementsForSearchPage();

    replaceImagePrintReservationsToDisplayNames();

    g_modal_popup_window = new ReservationModalPopup();
	
} // mainSearchReservation

// Remove buttons that not are used for the search web page
function removeElementsForSearchPage()
{
    removeElement("delete_reservation_mode");
	removeElement("id_text_image_delete_reservation");	
    // Already removed removeElement("buttonEventList");	
    // 2022-12-03 Keep for search removeElement("button_list_reservations");
    // 2022-12-03 Keep for search removeElement("id_text_image_reservation_list");
    //Redefined to Display names (Namen zeigen) removeElement("button_print_reservations");
    //Redefined to Display names (Namen zeigen) removeElement("id_text_image_reservation_print");
    removeElement("button_init_reservation");
    removeElement("id_text_add_reservation_text");
    removeElement("button_save_reservation");
    removeElement("id_image_save_reservation_text");
	
    // Not yet created removeElement("id_dropdown_concerts");	
	
} // removeElementsForSearchPage

// Replace the image (caption) for the button print reservation cards
// TODO 20251124 This button image shall also be defined in the Layout XML file
function replaceImagePrintReservationsToDisplayNames()
{
    var id_image = 'id_text_image_reservation_print';

    var el_image = document.getElementById(id_image);

    el_image.setAttribute('href', 'ImagesApp/text_reservation_display.png');

} // replaceImagePrintReservationsToDisplayNames

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Main Functions //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Load Functions ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////


// Load the reservation concert XML. Input data is the reservation XML file name 
// 1. Call of XMLHttpRequest.open and XMLHttpRequest.send.
// 2. Event function XMLHttpRequest.onreadystatechange is called several times
//    The file is loaded when XMLHttpRequest.readyState=4 and XMLHttpRequest.status=200
// 3. When the XML object has been loaded
//   3.1 Set the global variable XML object g_reservations_xml
//   3.2 Set reservations and init selection arrays. Call of setReservationsAndInitSelectionArrays
//   3.3 Set the concert title text. Call of setConcertTitleText
//   3.4 Display error or warning when seats and title has been set.
//       This should be set with an async (await) function, but here only with setTimeout function,
//       i.e. wait 500 milliseconds and then call displayReservationErrorOrWarning. Hopefully this
//       this time is enough long
function loadReservationXMLDoc(i_url_file_reservation_concert_xml) 
{
    var reservations_xmlhttp = new XMLHttpRequest();
  
    // Event handle function
    reservations_xmlhttp.onreadystatechange = function() 
    {
      if (reservations_xmlhttp.readyState == 4 && reservations_xmlhttp.status == 200) 
      {
          g_reservations_xml = reservations_xmlhttp.responseXML;
	  
	      setReservationsAndInitSelectionArrays();
		  
          setConcertTitleText();

          setTimeout("displayReservationErrorOrWarning()", 500);
    
      }
	
    };

    reservations_xmlhttp.open("GET", i_url_file_reservation_concert_xml , true);
	// reservations_xmlhttp.open('GET', season_program_file_name +'?_=' + new Date().getTime());
	reservations_xmlhttp.setRequestHeader('Cache-Control', 'no-cache');
    reservations_xmlhttp.send();
  
} // loadReservationXMLDoc

// Display error or warning
function displayReservationErrorOrWarning()
{
    var number_of_seats_that_can_be_selected = getNumberOfAdditionalSeatsThatCanBeSelected();

    if (allAvailableSeatsAreReserved())
    {
        alert(g_msg_all_available_seats_are_reserved);
    } 
    else if (number_of_seats_that_can_be_selected <= 0 && g_user_is_concert_visitor == "false")
    {
      alert(g_warning_max_number_seat_reservations_admin + (-number_of_seats_that_can_be_selected).toString());
    }
    else if (number_of_seats_that_can_be_selected <= 0 && g_user_is_concert_visitor == "true")
    {
      alert(g_error_max_number_seat_reservations_exceeded_close_window);
    }
    else if (number_of_seats_that_can_be_selected <= 5)
    {
      alert(g_warning_max_number_seat_reservations + number_of_seats_that_can_be_selected.toString());
    }

} // displayReservationErrorOrWarning

// Returns true if all available seats are reserved
function allAvailableSeatsAreReserved()
{
    var total_number_reserved_seats = totalNumberReservedSeats();
	
    var total_number_seats = totalNumberSeats();

    if (total_number_reserved_seats == total_number_seats)
    {
        return true;
    }
    else
    {
        return false;
    }
    
} // allAvailableSeatsAreReserved

// Construct file name and load the reservations XML object, i.e. set g_reservations_xml and
// update the SVG image with the made reservations and set the concert title.
// Input data: Add string for the file name and concert number. 
// 1. Construct the name of the XML reservation file.
//    If the next concert is requested (concert number is 0): Call getNextConcertReservationXmlFileName
//    Else (concert number is 1, 2, ... or 12): Call constructConcertReservationXmlFileName 
// 2. Load the reservations XML object and set g_reservations_xml. Call of loadReservationXMLDoc.
//    Also the reservations are set by this function (reserved circles are made red) and the 
//    concert title is set on the SVG image. 
function constructNameLoadReservationXMLDoc(i_add_to_xml_file_name, i_concert_number)
{							   
    g_add_to_xml_file_name_for_drop_down = i_add_to_xml_file_name; // TODO Where is it used?

    var url_file_reservation_concert_xml = "";
    if ("0" == i_concert_number)
    {
        url_file_reservation_concert_xml = 
        getNextConcertReservationXmlFileName(i_add_to_xml_file_name); // ReservationFiles.js
    }
    else
    {
        url_file_reservation_concert_xml = 
        constructConcertReservationXmlFileName(i_add_to_xml_file_name, i_concert_number); // ReservationFiles.js		
    }

    loadReservationXMLDoc(url_file_reservation_concert_xml);
	
} // constructNameLoadReservationXMLDoc

// Load season program XML and call function that creates reservation XML files
function loadSeasonProgramXMLDoc(i_start_part_dir_name_xml) 
{
    alert("loadSeasonProgramXMLDoc i_start_part_dir_name_xml=" + i_start_part_dir_name_xml);

	var season_program_file_name = g_url_file_concert_reservation_xml_directory + 
                                   g_url_xml_file_event_program;
	
    var season_program_xmlhttp = new XMLHttpRequest();
  
    // Event handle function
    season_program_xmlhttp.onreadystatechange = function() 
    {
      if (season_program_xmlhttp.readyState == 4 && season_program_xmlhttp.status == 200) 
      {
          g_season_program_xml = season_program_xmlhttp.responseXML;
	  
	      createAllReservationXmlFiles(i_start_part_dir_name_xml);
      }
	
    };

    season_program_xmlhttp.open("GET", season_program_file_name , true);
    // season_program_xmlhttp.open('GET', season_program_file_name +'?_=' + new Date().getTime());
    season_program_xmlhttp.setRequestHeader('Cache-Control', 'no-cache');
    season_program_xmlhttp.send();
  
} // loadSeasonProgramXMLDoc

// Load the season program XML file and the reservation XML file for the next concert
// 1. Load the season program (with the fixed name). Set g_season_program_xml.
// 2. When the season program has been loaded (event functions define that)
//   2.1 Construct the name for the next concert. Call of getNextConcertReservationXmlFileName
//   2.2 Load the reservation XML file. Call of loadReservationXMLDoc.
//   2.3 Set the concerts dropdown for case add reservation. Call of setConcertsDropDown
//       Set the xxx for case seatch reservation. Call of setSearchXXX
//   2.4 Set the dropdown element to next concert (g_season_next_concert_number)
function loadSeasonProgramAndReservationXMLDocs(i_add_to_xml_file_name) 
{
    // alert("loadSeasonProgramAndReservationXMLDocs ");

	var season_program_file_name = g_url_file_concert_reservation_xml_directory + 
                                   g_url_xml_file_event_program;
								   
    g_add_to_xml_file_name_for_drop_down = i_add_to_xml_file_name;
	
    var season_program_xmlhttp = new XMLHttpRequest();
  
    // Event handle function
    season_program_xmlhttp.onreadystatechange = function() 
    {
      if (season_program_xmlhttp.readyState == 4 && season_program_xmlhttp.status == 200) 
      {
          g_season_program_xml = season_program_xmlhttp.responseXML;
	  
	      url_file_reservation_concert_xml = getNextConcertReservationXmlFileName(i_add_to_xml_file_name);
		  
		  loadReservationXMLDoc(url_file_reservation_concert_xml) ;
		  
          if ("false" == g_for_web_page_search)
          {		  
		      addAndSetConcertsDropDown();
			  
			  addSearchInputFieldAndClearButton();
          }
          else if ("true" == g_for_web_page_search)
          {		  
		      addSearchInputFieldAndClearButton();
          }
		  

      }
	
    };

    season_program_xmlhttp.open("GET", season_program_file_name , true);
    // season_program_xmlhttp.open('GET', season_program_file_name +'?_=' + new Date().getTime());
    season_program_xmlhttp.setRequestHeader('Cache-Control', 'no-cache');
    season_program_xmlhttp.send();
  
} // loadSeasonProgramAndReservationXMLDocs

// Functionadd and set concerts dropdown
function addAndSetConcertsDropDown()
{
    setConcertsDropDown(g_id_reservation_select_concert);
	
    var dropdown_element = document.getElementById("id_dropdown_concerts");
    if (dropdown_element != null)
    {
        dropdown_element.value = g_season_next_concert_number.toString();
    }
    else
    {
        alert("addAndSetConcertsDropDown dropdown_element is null");
    }
		 
} // addAndSetConcertsDropDown

// Load season program XML and call function that creates reservation XML files
// 1. Load the season program (with the fixed name). 
// 2. When the season program has been loaded 
//   2.1 Set g_season_program_xml.
//   2.2 Set the concerts dropdown. Call of setConcertsDropDown
function loadSeasonProgramXMLDocSetConcertArraysAddConcertsDropdown() 
{
	g_user_is_concert_visitor = "true";
	
	var season_program_file_name = g_url_file_concert_reservation_xml_directory + 
                                   g_url_xml_file_event_program;
	
    var season_program_xmlhttp = new XMLHttpRequest();
  
    // Event handle function
    season_program_xmlhttp.onreadystatechange = function() 
    {
      if (season_program_xmlhttp.readyState == 4 && season_program_xmlhttp.status == 200) 
      {
          g_season_program_xml = season_program_xmlhttp.responseXML;
		  
		  setConcertsDropDown("id_div_concert_drop_down");
	  
      }
	
    };

    season_program_xmlhttp.open("GET", season_program_file_name , true);
    // season_program_xmlhttp.open('GET', season_program_file_name +'?_=' + new Date().getTime());
    season_program_xmlhttp.setRequestHeader('Cache-Control', 'no-cache');
    season_program_xmlhttp.send();
  
} // loadSeasonProgramXMLDocSetConcertArraysAddConcertsDropdown


// Reload the XML reservation object, since other users may have made changes
// 1. Reload XML object. Call of reloadReservationXMLDoc
// 2. Check selection and set reservations. Call of checkSelectionSetReservations
function reloadXmlReservationCheckSelectionSetReservations()
{
	
	if (g_url_file_concert_reservation_xml_name == "Undefined")
	{
		alert("reloadXmlReservationCheckSelectionSetReservations g_url_file_concert_reservation_xml_name is not set");
	}
	
	reloadReservationXMLDoc(g_url_file_concert_reservation_xml_name);
	
	
} // reloadXmlReservationCheckSelectionSetReservations

// Load the reservation concert XML and set the reserved properties. 
// Used data is the reservation XML file name (g_url_file_concert_reservation_xml_name)
// 1. Call of XMLHttpRequest.open and XMLHttpRequest.send.
// 2. Event function XMLHttpRequest.onreadystatechange is called several times
//    The file is loaded when XMLHttpRequest.readyState=4 and XMLHttpRequest.status=200
// 3. When the XML object has been loaded
//   3.1 Set the global variable XML object g_reservations_xml
//   3.2 Set reserved properties, i.e. set color red for circles
//       Call of setReservedProperties
function reloadReservationXMLDocSetReservationProperties() 
{
    var reservations_xmlhttp = new XMLHttpRequest();
  
    // Event handle function
    reservations_xmlhttp.onreadystatechange = function() 
    {
      if (reservations_xmlhttp.readyState == 4 && reservations_xmlhttp.status == 200) 
      {
          g_reservations_xml = reservations_xmlhttp.responseXML;
	  
	      setReservedProperties();   
      }
	
    };

    reservations_xmlhttp.open("GET", g_url_file_concert_reservation_xml_name , true);
    reservations_xmlhttp.setRequestHeader('Cache-Control', 'no-cache');
    reservations_xmlhttp.send();
  
} // reloadReservationXMLDocSetReservationProperties

// Load the reservation concert XML and set the reserved properties. 
// Used data is the reservation XML file name (g_url_file_concert_reservation_xml_name)
// 1. Call of XMLHttpRequest.open and XMLHttpRequest.send.
// 2. Event function XMLHttpRequest.onreadystatechange is called several times
//    The file is loaded when XMLHttpRequest.readyState=4 and XMLHttpRequest.status=200
// 3. When the XML object has been loaded
//   3.1 Set the global variable XML object g_reservations_xml
//   3.2 Set reserved properties, i.e. set color red for circles
//       Call of setReservedProperties
//   3.3 Open list page (i_case= list) or print page (i_case= print)
//       Call of openPageListReservations or openPageReservationPrint
function reloadReservationXMLDocSetReservationPropertiesListOrPrint(i_case) 
{
    var reservations_xmlhttp = new XMLHttpRequest();
  
    // Event handle function
    reservations_xmlhttp.onreadystatechange = function() 
    {
      if (reservations_xmlhttp.readyState == 4 && reservations_xmlhttp.status == 200) 
      {
          g_reservations_xml = reservations_xmlhttp.responseXML;
		  
          if (i_case == "list")
          {
                openPageListReservations(); // ReservationConcerts.js
          }
          else if (i_case == "print")
          {
                openPageReservationPrint(); // ReservationFiles.js
          }
          else
          {
                alert("reloadReservationXMLDocSetReservationPropertiesListOrPrint Not list or print i_case= " + i_case);
          }
		  
		  // Calling this function before openPageListReservations and openPageReservationPrint
		  // does not work??? TODO Find out why
		  setReservedProperties();
      }
	
    };

    reservations_xmlhttp.open("GET", g_url_file_concert_reservation_xml_name , true);
    reservations_xmlhttp.setRequestHeader('Cache-Control', 'no-cache');
    reservations_xmlhttp.send();
  
} // reloadReservationXMLDocSetReservationPropertiesListOrPrint

// Load the reservation concert XML. Input data is the reservation XML file name 
// 1. Call of XMLHttpRequest.open and XMLHttpRequest.send.
// 2. Event function XMLHttpRequest.onreadystatechange is called several times
//    The file is loaded when XMLHttpRequest.readyState=4 and XMLHttpRequest.status=200
// 3. When the XML object has been loaded
//   3.1 Set the global variable XML object g_reservations_xml
//   3.2 Check selections. Another user may have reserved. If this is the case, the user will get a message.
//       Call of checkSelectionSetReservations
function reloadReservationXMLDoc(i_url_file_reservation_concert_xml) 
{
    var reservations_xmlhttp = new XMLHttpRequest();
  
    // Event handle function
    reservations_xmlhttp.onreadystatechange = function() 
    {
      if (reservations_xmlhttp.readyState == 4 && reservations_xmlhttp.status == 200) 
      {
          g_reservations_xml = reservations_xmlhttp.responseXML;
	  
	      checkSelectionSetReservations(); // Returned boolean not used here		  
      }
	
    };

    reservations_xmlhttp.open("GET", i_url_file_reservation_concert_xml , true);
    reservations_xmlhttp.setRequestHeader('Cache-Control', 'no-cache');
    reservations_xmlhttp.send();
  
} // reloadReservationXMLDoc

// Load the reservation concert XML and call saveXmlFileWithPhp when XML object has been loaded 
function reloadReservationXMLDocCallSaveXmlFileWithPhp(i_url_file_reservation_concert_xml) 
{
    var reservations_xmlhttp = new XMLHttpRequest();
  
    // Event handle function
    reservations_xmlhttp.onreadystatechange = function() 
    {
      if (reservations_xmlhttp.readyState == 4 && reservations_xmlhttp.status == 200) 
      {
          g_reservations_xml = reservations_xmlhttp.responseXML;
	  
	      saveXmlFileWithPhp();	// ReservationFiles.cs  
      }
	
    };

    reservations_xmlhttp.open("GET", i_url_file_reservation_concert_xml , true);
    reservations_xmlhttp.setRequestHeader('Cache-Control', 'no-cache');
    reservations_xmlhttp.send();
  
} // reloadReservationXMLDocCallSaveXmlFileWithPhp

// Reload the XML reservation object, since other users may have made changes
// 1. Reload XML object. Call of reloadReservationXMLDoc
// 2. Check selection and set reservations. Call of checkSelectionSetReservations
function reloadXmlReservationAndSearch(i_input_element, i_search_str, i_output_element_names, i_output_element_seats)
{
	
	if (g_url_file_concert_reservation_xml_name == "Undefined")
	{
		alert("reloadXmlReservationAndSearch g_url_file_concert_reservation_xml_name is not set");
	}
	
    var reservations_xmlhttp = new XMLHttpRequest();
  
    // Event handle function
    reservations_xmlhttp.onreadystatechange = function() 
    {
      if (reservations_xmlhttp.readyState == 4 && reservations_xmlhttp.status == 200) 
      {
          g_reservations_xml = reservations_xmlhttp.responseXML;
	  
	      checkIfSearchStringMatchesNameChangeColorOfInputFieldAndSeats(i_input_element, i_search_str, i_output_element_names, i_output_element_seats);	  
      }
	
    };

    reservations_xmlhttp.open("GET", g_url_file_concert_reservation_xml_name , true);
    reservations_xmlhttp.setRequestHeader('Cache-Control', 'no-cache');
    reservations_xmlhttp.send();
	
	
} // reloadXmlReservationAndSearch

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Load Functions //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Init Functions ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Set reservations defined in reservations XML file
// Initialize the two arrays that hold selected entities
function setReservationsAndInitSelectionArrays()
{  
    resetReservedProperties();
		
	setReservedProperties();
	
	initSelectArrays(); // ReservationEmail.js
	
	
} // setReservationsAndInitSelectionArrays

// Set reserved properties
// 1. Reset circles to color green. Call of resetReservedProperties
// 2. Set reserved circles to color red
//    Call of getArrayReservationData, getArrayReservationData
//    getArrayReservationData and getArrayReservationData
function setReservedProperties()
{
	if (null == g_reservations_xml)
	{
		alert("setReservedProperties: Concert reservation XML object is null");
		return;
	}
	
	//Should be done but, ... resetReservedProperties();
	
    var total_number_reservations = getNumberOfReservations();
	if (0 == total_number_reservations)
    {
        return;
    }
	
	var all_names = getArrayReservationData("name");
	var all_remarks = getArrayReservationData("remark");
	var all_seat_table_numbers = getArrayReservationData("number");
	var all_seat_characters = getArrayReservationData("character");

    var number_seats = 	all_seat_characters.length;

    for (seat_number=1; seat_number<=number_seats; seat_number++)
	{
		var reserved_name = all_names[seat_number-1];
		var reserved_number = all_seat_table_numbers[seat_number-1];
		var reserved_character = all_seat_characters[seat_number-1];
		
		var element_circle = document.getElementById(circleId(reserved_number, reserved_character));
		if (element_circle != null)
		{
			element_circle.style["fill"] = g_color_reserved_seat;
		}
	}
	
	// Does not work setSelectedProperties();
	
} // setReservedProperties

// Make all circles green
function resetReservedProperties()
{
 	var circle_nodes = document.getElementsByTagName("circle");
	
    for (index_cir=0; index_cir<circle_nodes.length; index_cir++)
    {
		var element_circle = circle_nodes[index_cir];
		if (element_circle != null)
		{
			element_circle.style["fill"] = g_color_free_seat;
		}		
    }
		
} // resetReservedProperties

// Initialize arrays holding selected seats and corresponding tables
function initSelectArrays()
{
	g_all_selected_tables = new Array();
	g_all_selected_seats = new Array();
	
	setTextForEmailSendButton(0);
	
} // initSelectArrays


// Check selection and set reservations
// 1. Check if selections still are free. If not, remove them from the selection arrays.
//    Call of checkIfSelectionsStillAreFree
// 2. Tell the user that new, replacement seats must be selected (if that is the case)
function checkSelectionSetReservations()
{
    var ret_b_user_must_select_other_seats = false;
	
    var alert_msg = checkIfSelectionsStillAreFree(); // ReservationConcerts.js
   
    if (alert_msg.length > 0)
    {
		ret_b_user_must_select_other_seats = true;
        alert(alert_msg);	
    }
	
    return ret_b_user_must_select_other_seats;
	
} // checkSelectionSetReservations

// Sets the global variable g_maximum_number_reservations based on the XML 
// element MaxReservationsProcent in the XML layout file (LayoutSalmen.xml). 
function initMaxNumberSeatReservations()
{
    console.log("initMaxNumberSeatReservations Enter");

    var max_n_seats_procent = g_layout_xml.getElementsByTagName(g_tag_max_n_seats_procent)[0].childNodes[0].nodeValue;
	
	var max_n_seats_procent_float = parseFloat(max_n_seats_procent)/100.0;
	
	var total_number_seats = totalNumberSeats();
	
	var total_number_seats_float = parseFloat(total_number_seats);
	
    g_maximum_number_reservations = parseInt(max_n_seats_procent_float*total_number_seats_float);
		
} // initMaxNumberSeatReservations

// Sets the global variable g_maximum_number_reservations for the current event
// The value is retrieved from the evant program XML (g_season_program_xml)
function setMaxNumberSeatReservations()
{
    if (null == g_season_program_xml || g_current_event_number <= 0)
    {
        alert("setMaxNumberSeatReservations g_season_program_xml is null or unvalid g_current_event_number= " + g_current_event_number.toString());

        return;
    }

    var max_n_seats_procent = g_season_program_xml.getMaxReservations(g_current_event_number);

	var max_n_seats_procent_float = parseFloat(max_n_seats_procent)/100.0;
	
	var total_number_seats = totalNumberSeats();
	
	var total_number_seats_float = parseFloat(total_number_seats);
	
    g_maximum_number_reservations = parseInt(max_n_seats_procent_float*total_number_seats_float);

    console.log("setMaxNumberSeatReservations g_maximum_number_reservations= " + g_maximum_number_reservations.toString());

} // setMaxNumberSeatReservations

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Init Functions //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Layout Functions //////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Creates the layout as SVG elements for the premises
// The input flag defines if it is for request (true) or reservation (false) HML file
// Circles and rectangles/texts (buttons) with even functions calls are added 
// The resulting body element should be copied in the debugger and passed into
// the HTM file for adding reservations or for making Email reservations requests
// The reason for this copying is that dynamically generated elements with event 
// functions not work in Internet Explorer. The error message is:
// xyzClicked is not defined.
function createLayout(i_layout_xml)
{
	// TODO Remove i_layout_xml

    // Set premises properties an calculate the conversion factor g_scale_dimension	
    setPremisesProperties(); // ReservationPremises.js
   
    setTableProperties(); // ReservationTables.js
   
    var all_elements_svg = '';

	all_elements_svg = all_elements_svg + '<table>\n'; // <tbody> is added when object is created ??
	
    all_elements_svg = all_elements_svg + addDivForSeatsSearch();
	
    all_elements_svg = all_elements_svg + addDivForConcertSelection();
	
    all_elements_svg = all_elements_svg + addHtmlElementShowingConcertDateBand();
	
    all_elements_svg = all_elements_svg + '<tr style="margin:0px;  border: 0px none black; padding:0px;"><td style="margin:0px; border: 0px none black; padding:0px; " >\n';
	
    all_elements_svg = all_elements_svg + addStartLineSvg(); // ReservationSvg.js
   
    all_elements_svg = all_elements_svg + drawPremises(); // ReservationPremises.js
   
    all_elements_svg = all_elements_svg + addButtonCreateEventList(); // ReservationEvents.js
   
    all_elements_svg = all_elements_svg + addButtonDeleteReservationMode(); // ReservationEvents.js
   
    all_elements_svg = all_elements_svg + addButtonSendEmail(); // ReservationEvents.js
   
    all_elements_svg = all_elements_svg + addButtonListReservations(); // ReservationEvents.js
	
    all_elements_svg = all_elements_svg + addButtonPrintReservations();  // ReservationEvents.js
   
    all_elements_svg = all_elements_svg + addButtonInitReservation(); // ReservationEvents.js
   
    all_elements_svg = all_elements_svg + addButtonSaveReservation(); // ReservationEvents.js
	
	//QQ No longer used all_elements_svg = all_elements_svg + addButtonSaveReservationsExit(); // ReservationEvents.js
   
    all_elements_svg = all_elements_svg + drawDoors(i_layout_xml); // ReservationDoors.js
   
    all_elements_svg = all_elements_svg + drawStage(); // ReservationStage.js
	
    all_elements_svg = all_elements_svg + drawTableGroups(); // ReservationTables.js
   
    all_elements_svg = all_elements_svg + addEndLineSvg(); // ReservationSvg.js
	
	var mid_table = '\n</td></tr>\n<tr><td>' + '\n';
	
	all_elements_svg = all_elements_svg + mid_table;
	
    all_elements_svg = all_elements_svg + addSponsorImage();
	
	all_elements_svg = all_elements_svg + addDivCloseWindowText();
		
	var end_table = '\n</td></tr>\n</table>' + '\n';
	
	all_elements_svg = all_elements_svg + end_table;
   
    addSvgElementsToDocument(all_elements_svg); // ReservationSvg.js
	
	
	
} // displayCreateLayout

// Add HTML element <p> showing concert date and band name. 
function addHtmlElementShowingConcertDateBand()
{
	var ret_element_p = ''; 
	
	ret_element_p = ret_element_p + '\n' + '<tr style="margin:0px;  border: 0px none black; padding:0px;"><td style="margin:0px;  border: 0px none black; padding:0px;" >' + '\n';
	
	ret_element_p = ret_element_p + '<p id=' + g_id_reservation_show_concert_date_band;
	ret_element_p = ret_element_p + ' align="center" ';
    ret_element_p = ret_element_p + ' style="font-family: Arial; font:bold; font-size:22pt; height:40px; width:900px; color:red; background-color: black; margin-bottom:0px;  border: 0px none black; padding:0px;" '; 
    ret_element_p = ret_element_p + ' >dd/mm year Band Xyz</p>' + '\n';
	
	ret_element_p = ret_element_p + '</td></tr>' + '\n';
	
	return ret_element_p;
	
} // addHtmlElementShowingConcertDateBand

// Add image with all sponsors
function addSponsorImage()
{
	var ret_image = '\n' +
	
	'<img id= "id_sponsor_image" src="reservation_jazz_live_aarau_sponsor_logos.png" alt="Sponsoren" height="100">' + '\n';
	
	return ret_image;
	
} // addSponsorImage

// Add div element for adding button so that the user can (and shall) close the window
function addDivCloseWindowText()
{
	var ret_div = '\n' +
	
	'<div id="id_reservation_close_window_text"> </div>' + '\n';
	
	return ret_div;
	
} // addDivCloseWindowText

// Add table row and div element for adding button so that the user can select concert 
// or search seats for a given name
function addDivForConcertSelection()
{
	var ret_div = ''; 
	
	ret_div = ret_div + '\n' + '<tr><td>' + '\n';
	
	ret_div = ret_div + '<div id=' + g_id_reservation_select_concert + ' > </div>' + '\n';
	
	ret_div = ret_div + '</td></tr>' + '\n';
	
	return ret_div;
	
} // addDivForConcertSelection

// Add table row and div element for adding elements so that the user can search seats for a given name
function addDivForSeatsSearch()
{
	var ret_div = ''; 
	
	ret_div = ret_div + '\n' + '<tr><td>' + '\n';
	
	ret_div = ret_div + '<div id=' + g_id_reservation_search_seats + ' > </div>' + '\n';
	
	ret_div = ret_div + '</td></tr>' + '\n';
	
	return ret_div;
	
} // addDivForSeatsSearch

// Get the concert title text
function setConcertTitleText()
{
    var concert_text = getConcertTitleText();

	var element_text = document.getElementById(g_id_reservation_show_concert_date_band);
	if (null == element_text)
	{
		alert("setConcertTitleText Element text is null");
		return;
	}
	
	element_text.textContent = concert_text;

    // console.log("setConcertTitleText concert_text= " + concert_text);

} // setConcertTitleText

// Get concert text
function getConcertTitleText()
{
    var concert_day = g_reservations_xml.getElementsByTagName(g_tag_day)[0].childNodes[0].nodeValue; 
	var concert_month = g_reservations_xml.getElementsByTagName(g_tag_month)[0].childNodes[0].nodeValue; 
	var concert_year = g_reservations_xml.getElementsByTagName(g_tag_year)[0].childNodes[0].nodeValue; 
	var concert_band_name = g_reservations_xml.getElementsByTagName(g_tag_band_name)[0].childNodes[0].nodeValue; 

    concert_band_name = replaceInvalidEmailCharacters(concert_band_name);

    var concert_text = concert_day + "/" + concert_month + " " + concert_year + " " + concert_band_name;	

    console.log("getConcertTitleText concert_text= " + concert_text);
	
	return concert_text;
	
} // getConcertTitleText

// Set text for the email send button
function setTextForEmailSendButton(i_number_selected)
{
    setImageAndTitleForReserveButton(i_number_selected);


    /*
	
   var text_image_reserve_select_undef = g_layout_xml.getElementsByTagName(g_tag_text_image_reserve_select_undef)[0].childNodes[0].nodeValue;
   var text_image_select_seats = g_layout_xml.getElementsByTagName(g_tag_text_image_select_seats)[0].childNodes[0].nodeValue;
   var text_image_reserve_seats = g_layout_xml.getElementsByTagName(g_tag_text_image_reserve_seats)[0].childNodes[0].nodeValue;
     */

} // setTextForEmailSendButton

// Set text image and titke (tool tip) for the reservation button
// Input i_number_selected is the number of selected seats
function setImageAndTitleForReserveButton(i_number_selected)
{
    // Return if email button not is defined.
	if (g_user_is_concert_visitor == "false")
		return;

	var element_text_image = document.getElementById("text_image_send_email");

	if (null == element_text_image)
	{
		alert("showAndSetTitleForReserveButton Element text is null");

		return;


	}
    var text_image_select_seats = 'ImagesApp/text_select_seats.png';

    var text_image_reserve_seats = 'ImagesApp/text_reserve_seats.png';

    if (i_number_selected == 0)
    {
        // console.log("showAndSetTitleForReserveButton i_number_selected = 0");

		element_text_image.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', text_image_select_seats);
		element_text_image.innerHTML =  '<title>' + g_title_text_image_select_seats + '</title>';
    }
    else
    {
        // console.log("showAndSetTitleForReserveButton i_number_selected= " + i_number_selected.toString());
		element_text_image.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', text_image_reserve_seats);
        element_text_image.innerHTML =  '<title>' + g_title_text_image_reserve_seats+ '</title>';
    }

} // setImageAndTitleForReserveButton

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Layout Functions ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////




