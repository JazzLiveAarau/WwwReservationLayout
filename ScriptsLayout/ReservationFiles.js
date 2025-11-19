// File: Reservation\scripts\ReservationFiles.js

// Functions for the generation of files and lists

// TODO 20240205 At the end of the season this version of the file should be used

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Create New Season XML files ///////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// The main function for the creation of season XML files. 
// This function is called from web page CreateXml.htm
// The input string i_add_to_xml_file_name will be added to file names. The string is allowed to be empty
// The idea with this string is to make it possible for different persons to make 
// tests without disturbing each other
// 1. Warning to the user that all files will be overwritten. Call of confirm.
// 2. Load of season program xml and set of g_season_program_xml. Call of loadSeasonProgramXMLDoc
//    2.1 After load create all the reservation files. Call of event function createAllReservationXmlFiles.
function MainCreateXml(i_add_to_xml_file_name)
{
	// Construct the start part of the name for the output XML files
    var start_part_dir_name_xml = startPartFileNames(i_add_to_xml_file_name);

	var confirm_create = confirm("Reservationsdateien für Version " + i_add_to_xml_file_name + " werden generiert." + "\n" +
	                             "Existierende XML Dateien werden überschrieben"  + "\n" + 
								 "Fortsetzen?");
    if (confirm_create == false)
	{
		alert("Keine XML Dateien wurden kreiert");
        return;
    }
	
	// Load season program XML file. Create XML object g_season_program_xml.
    loadSeasonProgramXMLDoc(start_part_dir_name_xml);
	
} // MainCreateXml

// Create all concert reservation XML files
// This is an event handler function that is called from loadSeasonProgramXMLDoc
// when the season program XML object has been created and g_season_program_xml has been set.
// 1. Get all concert nodes. Call of getElementsByTagName
// 2. Get the content for all XML reservation files. Call of getXmlContentAllFiles
// 3. Open (change location to) PHP file CreateXml.php. Call of window.location.href
//    Data passed is the string from getXmlContentAllFiles. 
//    Note that this string not is allowed to have any ', @, .. characters
//    3.1 Create.php is function that will split the string and create the 12 files
function createAllReservationXmlFiles(i_start_part_dir_name_xml)
{
	if (null == g_season_program_xml)
	{
		alert("createAllReservationXmlFiles Season program XML object g_season_program_xml is null");
		return;
	}
	
    // Get all concert nodes from the season program
	var concert_nodes = g_season_program_xml.getElementsByTagName(g_tag_season_program_concert);
	
    // Get XML content for every output XML reservations file
    var xml_content_for_all_files = getXmlContentAllFiles(i_start_part_dir_name_xml, concert_nodes);	
	//var xml_content_for_all_files_array = getXmlContentAllFilesArray(i_start_part_dir_name_xml);
	
	// Get the URL for this web page. 
	// Not yet used, but could be used to open a new window ..
	// But the browser temporary file need also to be deleted
    var script_variable_location_ref = window.location.href;	
	
    // Pass the JavaScript data to to PHP data of web page SaveXmlExit.php
	// (Note that window.location.assign does not work with parameters)
 	window.location.href = "CreateXml.php" + 
	                       "?xml_content=" + xml_content_for_all_files + 
	                       "&loc_ref=" + script_variable_location_ref;	
	
} // createAllReservationXmlFiles

// Returns the start part of the file names
function startPartFileNames(i_add_to_xml_file_name)
{
	// Construct the start part of the name for the output XML files
    var ret_start_part_dir_name_xml = g_url_file_concert_reservation_xml_directory + // Reservation.js
                                      g_url_file_concert_reservation_xml_name_start;  // Reservation.js
								  
    if (i_add_to_xml_file_name.length > 0)
    {
         ret_start_part_dir_name_xml = ret_start_part_dir_name_xml + i_add_to_xml_file_name + "_";
    }
	
    return 	ret_start_part_dir_name_xml;
	
} // startPartFileNames

// Returns the XML content for every output XML reservations file in one string
// Input data ist the start part for the XML reservation files and the array of concert nodes
// 1. Loop for all concert nodes
//    1.1 Add the name of XML file. Call of addNameOfXmlFile
//    1.2 Add the header for the XML file. Call of xmlHeaderAsString
//    1.3 Add concert data (date and bandname). Call of xmlConcertDataAsString
//    1.4 Add the end tag for the XML file. 
function getXmlContentAllFiles(i_start_part_dir_name_xml, i_concert_nodes)
{
    var ret_xml_content_for_all_files = "";
	
	//20230926 if (i_concert_nodes.length != 12)
	//20230926{
    //20230926	alert("getXmlContentAllFiles: Number of concert nodes is not 12");
    //20230926	return ret_xml_content_for_all_files;
    //20230926}

    var n_concerts = i_concert_nodes.length;
	
    for (concert_number=1; concert_number<= n_concerts; concert_number++)
    {
       // Add full name of the XML file
        ret_xml_content_for_all_files = ret_xml_content_for_all_files + addNameOfXmlFile(i_start_part_dir_name_xml, concert_number);
		
       // Add XML header lines including  <Reservations>
       ret_xml_content_for_all_files = ret_xml_content_for_all_files + xmlHeaderAsString(); 
	   
       // Add XML concert data (date, band name) lines
       ret_xml_content_for_all_files =  ret_xml_content_for_all_files + xmlConcertDataAsString(i_concert_nodes[concert_number-1], g_xml_creation_case_new);	   
	   
        // Add tag </Reservations>		
		ret_xml_content_for_all_files = ret_xml_content_for_all_files + "  </" + g_tag_reservations + ">" + newLine();

    } // concert_number	
	
    return ret_xml_content_for_all_files;
	
} // getXmlContentAllFiles

/* 
// Not used but kept, because a better solution would be to call a PHP file several times
// based on JQuery post function (as when the reservation files are updated)
// Get XML content for every output XML reservations file
function getXmlContentAllFilesArray(i_start_part_dir_name_xml)
{
	var ret_xml_content_array = new Array();
	
    var ret_xml_content_for_all_files = "";
	
    for (concert_number=1; concert_number<=12; concert_number++)
    {
		ret_xml_content_array[concert_number-1] = "";
		
       // Add full name of the XML file
        ret_xml_content_for_all_files = ret_xml_content_for_all_files + addNameOfXmlFile(i_start_part_dir_name_xml, concert_number);
		ret_xml_content_array[concert_number-1] = ret_xml_content_array[concert_number-1] + addNameOfXmlFile(i_start_part_dir_name_xml, concert_number);
		
       // Add XML header lines including  <Reservations>
       ret_xml_content_for_all_files = ret_xml_content_for_all_files + xmlHeaderAsString(); 
	   ret_xml_content_array[concert_number-1] = ret_xml_content_array[concert_number-1] + xmlHeaderAsString(); 
	   
       // Add XML concert data (date, band name) lines
       ret_xml_content_for_all_files =  ret_xml_content_for_all_files + xmlConcertDataAsString(null, g_xml_creation_case_new);	
       ret_xml_content_array[concert_number-1] = ret_xml_content_array[concert_number-1] + xmlConcertDataAsString(null, g_xml_creation_case_new);		   
	   
        // Add tag </Reservations>		
		ret_xml_content_for_all_files = ret_xml_content_for_all_files + "  </" + g_tag_reservations + ">" + newLine();
		ret_xml_content_array[concert_number-1] = ret_xml_content_array[concert_number-1] + "  </" + g_tag_reservations + ">" + newLine();

    } // concert_number	
	
    return ret_xml_content_array;
	
} // getXmlContentAllFilesArray
Not used */

// Return the full XML file name for a given concert number
function addNameOfXmlFile(i_start_part_dir_name_xml, i_concert_number)
{
   var ret_name = "";
   
   ret_name = ret_name + " ";
   
   ret_name = ret_name + i_start_part_dir_name_xml;
   if (i_concert_number < 10)
   {
	   ret_name = ret_name + "0" + i_concert_number.toString();
   }
   else
   {
	   ret_name = ret_name + i_concert_number.toString();
   }
   
   ret_name = ret_name + ".xml";
   
   ret_name = ret_name + " ";
   
   return ret_name;
	
} // addNameOfXmlFile


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Create New Season XML files /////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Create XML File ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// The function saves (replaces) an XML file on the server with PHP functions.
// The file in this application is the XML reservation file. 
// The name of the file is defined in the global variable g_url_file_concert_reservation_xml_name 
// The content of the XML file is retrieved with function xmlDocumentToString()
// This function shall be called as an event function when reservation XML object has been reloaded
// otherwise checkSelectionSetReservations will not work, i.e. determine if somebody else in the
// meantime has reserved the selected seats
function saveXmlFileWithPhp()
{
    var b_user_must_select_other_seats = checkSelectionSetReservations();
	if (b_user_must_select_other_seats)
    {
        // The user has got the message that seats have been taken by somebody else and must be replaced
        return;
    }
	
	// Add reservation to the XML object, i.e. the selected seats will be added 
	makeConcertReservationMultipleTablesAndSeats(g_current_reservation_name, g_current_reservation_email, g_current_reservation_remark);
    // Please note that makeConcertReservationMultipleTablesAndSeats will change the color of the selected circles
		
    var b_save_post = saveXmlFileWithJQueryPostFunction();
    if (!b_save_post)
    {
        return;	
    }
		
    var b_send_post = sendEmailWithJQueryPostFunction();
    if (!b_send_post)
    {
        // Do nothing	
    }

    // Init the arrays used by makeConcertReservationMultipleTablesAndSeats
    g_all_selected_tables.length = 0;
    g_all_selected_seats.length = 0;		

    // Init the name, email and remark used for the reservation
    g_current_reservation_name = ""
    g_current_reservation_email = "";
    g_current_reservation_remark = "";	
	
    if ("false" == g_user_request_with_email)
    {
        // Case MakeReservation.htm
        removeAllMakeReservationElements();	
    }	
	
	alert(g_confirmation_sent_close_window);
	
} // saveXmlFileWithPhp

// Save the XML reservation file with the JQuery function "post"
// The function returns false for failure
function saveXmlFileWithJQueryPostFunction()
{
	// The name of the XML file
    var xml_file_name = g_url_file_concert_reservation_xml_name;
	
	// Get the content of the XML file from the reservations XML object
    var xml_string = xmlDocumentToString();		

    // Refer to SaveXml.php for a description of this jQuery library function
    $.post
      ("SaveXml.php",
        {
          xml_content: xml_string,
          file_name: xml_file_name
        },
        function(data_save,status_save)
		{
            if (status_save == "success")
            {
                // alert(data_save);
            }
            else
            {
				alert("Execution of SaveXml.php failed");
				return false;
            }          
        } // function
      ); // post
	  
    return true;	  
	
} // saveXmlFileWithJQueryPostFunction

// Send reservation confirmation email with the JQuery function "post"
// The function returns false for failure
// 1. Return if resrevation email is undefined.
// 2. Get data for the email. Call of getConcertTitleText and getSelectedSeats.
//    Name, email and remark from the global variables g_current_reservation_name, ...
// 3. Compose the email message as an HTML string.
// 4. Post the request to the PHP function (file) SendEmail.php
//    
function sendEmailWithJQueryPostFunction()
{
	if (g_current_reservation_email.length == 0)
	{
		return true;
	}
	
    var concert_title =  getConcertTitleText();	  
	var selected_seats_str = getSelectedSeats();	
    var reservation_name = g_current_reservation_name;
    var reservation_email = g_current_reservation_email;
    var reservation_remark = g_current_reservation_remark;
	
    // In SendEmail.php defined: var from_address = "reservation@jazzliveaaru.ch";
    var email_subject = "";
    if (g_add_to_xml_file_name_for_drop_down == "Test")
	{
        email_subject = g_confirmation_email_subject_test + concert_title;
	}
	else
	{
        email_subject = g_confirmation_email_subject + concert_title;
	}
    
    var email_message = "";
    email_message = email_message + g_confirmation_email_html_font_start;
    if (g_add_to_xml_file_name_for_drop_down == "Test")
	{
        email_message = email_message + g_confirmation_email_html_title_test;		
	}
	else
	{
        email_message = email_message + g_confirmation_email_html_title;
	}

    email_message = email_message + g_confirmation_email_html_start_paragraph;
    email_message = email_message + g_list_text_reservation_name + reservation_name + g_list_new_line;
    email_message = email_message + g_list_text_reservation_email + reservation_email + g_list_new_line;
    if (reservation_remark != "" && reservation_remark != g_reservations_not_yet_set_value)
    {
        email_message = email_message + g_list_text_reservation_remark + reservation_remark + g_list_new_line;
    }
    email_message = email_message + g_list_text_band + concert_title + g_list_new_line;
    email_message = email_message + g_list_text_seats + selected_seats_str;
    email_message = email_message + g_list_new_line;
    email_message = email_message + g_confirmation_email_html_dear_sirs;
    email_message = email_message + g_confirmation_email_html_row_1;
    email_message = email_message + g_confirmation_email_html_row_2;
    email_message = email_message + g_confirmation_email_html_row_3 + g_list_new_line;
    email_message = email_message + g_confirmation_email_html_row_4+ g_list_new_line;
    email_message = email_message + g_confirmation_email_html_greetings;
    email_message = email_message + g_confirmation_email_html_signature;
    email_message = email_message + g_list_new_line;
    email_message = email_message + g_confirmation_email_html_end_paragraph;
    email_message = email_message + g_confirmation_email_html_font_end;	

    //20240205 email_message = email_message + getCoronaTwintString();

    email_message = email_message + UtilPayment.twintAdmissionFeeString('730px');

    // var n_rows = getCoronaNumberReservedSeats();
    // var concert_date = getCoronaDate();
    // var concert_time = getCoronaTime();
    // var reserved_tables = getCoronaTables();

    // 2021-09-20 email_message = email_message + getCoronaFormString(n_rows, concert_date, concert_time, reserved_tables);
	
    var bcc_email_address = "";
    if (g_add_to_xml_file_name_for_drop_down == "Test")
	{
        bcc_email_address = g_bcc_email_address_test;
	}
	else
	{
         bcc_email_address = g_bcc_email_address;
	}	

    $.post
      ("SendEmail.php", 
        {
            a_subject: email_subject,
            a_msg: email_message,
            a_to: g_current_reservation_email,
            a_bcc: bcc_email_address
        },
        function(data_send, status_send)
        {	
            if (status_send == "success")
            {
                // alert("data_send= >" + data_send + "<");
            }
            else
            {
				alert("Execution of SendEmail.php failed. status_send= " + status_send);
				return;
            }   
			
			// Additional characters in data_send ????? TODO
			// includes() does not work in Internet Explorer
			var b_ok = false;
			var b_failure = false;
			if (data_send.indexOf("MailIsSent"))
			{
				b_ok = true;
			}
			if (data_send.indexOf("MailIsNotSent"))
			{
				b_failure = true;
			}
			
			//QQ var b_ok = data_send.includes("MailIsSent");
			//QQ var b_failure = data_send.includes("MailIsNotSent");
			
            if (b_ok)			
            {
               // alert("E-Mail ist gesendet");
			}
            else if (b_failure)
            {
               alert(g_error_send_confirmation_mail);
			   return;
			}
            else 
            {
               alert("Fehler: data_send= " + data_send);
			   return false;
			}			
        });	
	
    return true;
	
} // sendEmailWithJQueryPostFunction


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Create XML File /////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Create XML File Exit Application ///No longer used ////////
///////////////////////////////////////////////////////////////////////////////////////////

// The function navigates to a new window , saves (replaces) the whole XML file. 
// Please note that it is not possible to pass a string to PHP if the string
// contains new lines, i.e. escape characters like \n.
/*QQ No longer used. saveXmlFileExit can be removed
function saveXmlFileExit()
{
	// Do nothing if it is the case request reservation with an email
    if (g_user_is_concert_visitor == "true")
        return;
	
	// The name of the XML file
    var xml_file_name = g_url_file_concert_reservation_xml_name;
	
	// Get the content of the XML file from the reservations XML object
    var xml_string = xmlDocumentToString();	
	
	// Get the URL for this web page. 
	// Not yet used, but could be used to open a new window ..
	// But the browser temporary file need also to be deleted
    var script_variable_location_ref = window.location.href;	
	
    // Pass the JavaScript data to to PHP data of web page SaveXmlExit.php
	// (Note that window.location.assign does not work with parameters)
 	window.location.href = "SaveXmlExit.php" + 
	"?xml_content=" + xml_string + 
	"&file_name=" + xml_file_name +
	"&loc_ref=" + script_variable_location_ref;	
	
} // saveXmlFileExit
QQ*/

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Create XML File Exit Application ////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start XML File Content From XML Object //////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Returns the XMLDocument as a string
// Please note that it is not possible to pass a string to PHP if the string
// contains new lines, i.e. escape characters like \n.
// The returned string should be as short as possible since there is amount limits
// for parameters passed to a PHP file: No spaces, short tag names, etc
function xmlDocumentToString()
{
    // Return string with the XML statements
    var ret_xml_string = "";

    // Add XML header lines
    ret_xml_string = ret_xml_string + xmlHeaderAsString();
	
    // Add XML concert data (date, band name) lines
    ret_xml_string =  ret_xml_string + xmlConcertDataAsString(g_reservations_xml, g_xml_creation_case_update);
	
    // Get number of reservations	
    number_reservations = getNumberOfReservations();
	
	for (reservation_number=1; reservation_number<=number_reservations; reservation_number++)
	{
        // Get reservation record node
		var reservation_node = getReservationNode(reservation_number);
		
        // Add tag <Reservation>
		ret_xml_string = ret_xml_string + "<" + g_tag_reservation + ">" + newLine();
		
		// Reservation record data name, email and remark
        ret_xml_string = ret_xml_string + xmlReservationRecordAsString(reservation_node);
		
        // Get number of reserved seats
		var number_reserved_seats = getNumberOfReservedSeats(reservation_node);
		
		for (reserved_seat_number=1; reserved_seat_number<=number_reserved_seats; reserved_seat_number++)
		{
           // Add tag <Seat>
		   ret_xml_string = ret_xml_string + "<" + g_tag_seat + ">" + newLine();
			
           var seat_number = getSeatTableNumber(reservation_node, reserved_seat_number);
		   var xml_element_number = xmlSeatElementAsString(seat_number, g_tag_seat_table_number);
		   ret_xml_string = ret_xml_string + xml_element_number;
		   
		   var seat_character = getSeatCharacter(reservation_node, reserved_seat_number);
		   var xml_element_character = xmlSeatElementAsString(seat_character, g_tag_seat_character);
		   ret_xml_string = ret_xml_string + xml_element_character;
		   
           // Add tag </Seat>
		   ret_xml_string = ret_xml_string + "</" + g_tag_seat + ">" + newLine();
		}

        // Add tag </Reservation>		
		ret_xml_string = ret_xml_string + "</" + g_tag_reservation + ">" + newLine();

	} // reservation_number
		
	
	ret_xml_string = ret_xml_string + "</" + g_tag_reservations + ">" + newLine();
	
	return ret_xml_string;
	
} // xmlDocumentToString

// Returns the XML header lines
function xmlHeaderAsString()
{
    var ret_header_str = "";

	// XML start line
    var ret_header_str = ret_header_str + g_xml_start_line + newLine();
	
    // Start tag Reservations
    var ret_header_str = ret_header_str + "<" + g_tag_reservations + ">" + newLine();
	
    return ret_header_str;
	
} // xmlHeaderAsString

// Returns the lines with concert data (date and band name)
// For the update case input node is g_reservations_xml
// For the update case input node is a concert node from g_season_program_xml
function xmlConcertDataAsString(i_xml_node, i_xml_creation_case)
{
    var ret_concert_data_str = "";

    // XML element day of concert
	var xml_element_day = "Undefined";

    // XML element month of concert
    var xml_element_month = "Undefined";
	
    // XML element year of concert	
    var xml_element_year = "Undefined";	
	
    // XML element concert band	
    var xml_element_band = "Undefined";
	
    if (g_xml_creation_case_update == i_xml_creation_case)
    {
        xml_element_day = xmlElementAsString(i_xml_node, g_tag_day);
        xml_element_month = xmlElementAsString(i_xml_node, g_tag_month);
        xml_element_year = xmlElementAsString(i_xml_node, g_tag_year);
        xml_element_band = xmlElementAsString(i_xml_node, g_tag_band_name);
    }
    else if (g_xml_creation_case_new == i_xml_creation_case)
    {
        xml_element_day = xmlElementConcertDataAsString(i_xml_node, g_tag_season_program_day, g_tag_day);
        xml_element_month = xmlElementConcertDataAsString(i_xml_node, g_tag_season_program_month, g_tag_month);
        xml_element_year = xmlElementConcertDataAsString(i_xml_node, g_tag_season_program_year, g_tag_year);
        xml_element_band = xmlElementConcertDataAsString(i_xml_node, g_tag_season_program_band_name, g_tag_band_name);
    }	

    // Add XML element day of concert	
    ret_concert_data_str = ret_concert_data_str + xml_element_day;
	
    // Add XML element month of concert
    ret_concert_data_str = ret_concert_data_str + xml_element_month;

    // Add XML element year of concert	
    ret_concert_data_str = ret_concert_data_str + xml_element_year;	
	
    // Add XML element concert band
    ret_concert_data_str = ret_concert_data_str + xml_element_band;		
	
    return ret_concert_data_str;
	
} // xmlConcertDataAsString

// Returns the reservation record data name, email and remark
function xmlReservationRecordAsString(i_reservation_node)
{
    var ret_reservation_record_str = "";

    var xml_element_name = xmlElementAsString(i_reservation_node, g_tag_reservation_name);
    ret_reservation_record_str = ret_reservation_record_str + xml_element_name;	
	
    var xml_element_email = xmlElementAsString(i_reservation_node, g_tag_reservation_email);
    ret_reservation_record_str = ret_reservation_record_str + xml_element_email;		
		
    var xml_element_remark = xmlElementAsString(i_reservation_node, g_tag_reservation_remark);
    ret_reservation_record_str = ret_reservation_record_str + xml_element_remark;	 
	
    return ret_reservation_record_str;
	
} // xmlReservationRecordAsString

// Returns the seat record data table number and seat numbers
function xmlSeatRecordAsString(i_reservation_node)
{
    var ret_reservation_record_str = "";

	// TODO Is this used ??????

	
    return ret_reservation_record_str;
	
} // xmlSeatRecordAsString


// Returns one element as a string. Input is an XML node and the tag name
function xmlElementAsString(i_node, i_xml_tag)
{
	var ret_xml_element_str = "<" + i_xml_tag + ">";
	
	var node_value = i_node.getElementsByTagName(i_xml_tag)[0].childNodes[0].nodeValue;
	
	ret_xml_element_str = ret_xml_element_str + node_value;
	
	ret_xml_element_str = ret_xml_element_str + "</" + i_xml_tag + ">" + newLine();
	
	return ret_xml_element_str;
	
} // xmlElementAsString

// Returns one element as a string. Input is an XML node, the get tag name and the output tag name
function xmlElementConcertDataAsString(i_node, i_get_xml_tag, i_out_xml_tag)
{
	var ret_xml_element_str = "<" + i_out_xml_tag + ">";
	
	var node_value = i_node.getElementsByTagName(i_get_xml_tag)[0].childNodes[0].nodeValue;
	
	ret_xml_element_str = ret_xml_element_str + node_value;
	
	ret_xml_element_str = ret_xml_element_str + "</" + i_out_xml_tag + ">" + newLine();
	
	return ret_xml_element_str;
	
} // xmlElementConcertDataAsString

// Returns one element as a string
function xmlSeatElementAsString(i_node_value, i_xml_tag)
{
	var ret_xml_element_str = "<" + i_xml_tag + ">";
	
	ret_xml_element_str = ret_xml_element_str + i_node_value;
	
	ret_xml_element_str = ret_xml_element_str + "</" + i_xml_tag + ">" + newLine();
	
	return ret_xml_element_str;
	
} // xmlSeatElementAsString

// Returns new line for the XML content
// Passing string to PHP with escape new line (\n) is not possible
// If one wants the XML to be more readable a PHP script function 
// could replace for instance "ReplaceNewLine" ...
function newLine()
{
	return "";
	
} // newLine

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End XML File Content From XML Object ////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start List Reservations /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// The function opens a new window (browser tab) and lists the reservations
function openPageListReservations()
{
	// Do nothing for the case request a reservation
    if (g_user_is_concert_visitor == "true")
        return;	
	
    // Get string with all the reservations
    var all_reservations_str = getAllReservations();
	
    // https://stackoverflow.com/questions/1830347/quickest-way-to-pass-data-to-a-popup-window-i-created-using-window-open

    // Save it also as session data that can be used by Internet Explorer and Microsoft Edge
    sessionStorage.setItem(g_session_storage_list_reservations, all_reservations_str);
	
	// Open the list window
    var list_window = window.open("ReservationList.htm");
	
    // Pass the data to the opened window
    list_window.passed_data_all_reservations_str = all_reservations_str;
	
} // openPageListReservations


// Get string with all reservations
function getAllReservations()
{
    // Return string with all reservation data in HTML format 
	var ret_all_reservations_str = "";
	
	var number_reservations = getNumberOfReservations();
	
	var total_number_reserved_seats = totalNumberReservedSeats();
	
	var total_number_seats = totalNumberSeats();
	
    // Logo string
    ret_all_reservations_str = ret_all_reservations_str + getJazzLiveAarauLogoString();
	
    // Header string
    ret_all_reservations_str = ret_all_reservations_str + getAllReservationsHeader(number_reservations, total_number_reserved_seats, total_number_seats);
			
	for (reservation_number=1; reservation_number<=number_reservations; reservation_number++)
	{
        // Reservation record node
		var reservation_node = getReservationNode(reservation_number);
		
        // Number of reserved seats
		var number_reserved_seats = getNumberOfReservedSeats(reservation_node);
		
        // Reservation header string
        var record_header = getAllReservationsRecordHeader(reservation_node, number_reserved_seats);
		
        // Add record header
		ret_all_reservations_str = ret_all_reservations_str + record_header;
		
        // All seats for the reservation record string
		var all_seats = getAllReservationsRecordSeats(reservation_node, number_reserved_seats);
		
        // Add record seats
		ret_all_reservations_str = ret_all_reservations_str + all_seats;
		
        // Add line
        ret_all_reservations_str = ret_all_reservations_str + getAllReservationsLine();
		
	} // reservation_number
	
	return ret_all_reservations_str;
	
} // getAllReservations


// Get JAZZ live AARAU logo string
function getJazzLiveAarauLogoString()
{
    var ret_jazz_live_aarau_str = "";
	
	ret_jazz_live_aarau_str = ret_jazz_live_aarau_str + "<h1 style=\"color:red\">";
	
	ret_jazz_live_aarau_str = "<b>" + ret_jazz_live_aarau_str + g_list_text_jazz_live_aarau +  "</b>";
	
    ret_jazz_live_aarau_str = ret_jazz_live_aarau_str + "</h1>";

    return ret_jazz_live_aarau_str;
	
} // getJazzLiveAarauLogoString

// Get header string
function getAllReservationsHeader(i_number_reservations, i_total_number_reserved_seats, i_total_number_seats)
{
    var ret_header_str = "";
	
    var concert_year = getXmlElementNodeValue(g_reservations_xml, g_tag_year);
    var concert_month = getXmlElementNodeValue(g_reservations_xml, g_tag_month);
    var concert_day = getXmlElementNodeValue(g_reservations_xml, g_tag_day);
	var concert_band = getXmlElementNodeValue(g_reservations_xml, g_tag_band_name);

    var header_paragraph = "<h2>" + g_list_text_concert + " " + concert_day + "/" + concert_month + " " + concert_year + " " + concert_band + "</h2>"

	ret_header_str = ret_header_str + header_paragraph + g_list_new_line;

    ret_header_str = ret_header_str + g_list_text_band + concert_band + g_list_new_line;
	
	var iso_date_concert = dateIsoStandard(concert_year, concert_month, concert_day);
	
    ret_header_str = ret_header_str + g_list_text_date + iso_date_concert + g_list_new_line;
	
    ret_header_str = ret_header_str + g_list_text_number_reservations + i_number_reservations  + g_list_new_line;
					  
    ret_header_str = ret_header_str + g_list_text_total_number_of_reserved_seats + i_total_number_reserved_seats + g_list_new_line;	
	
	ret_header_str = ret_header_str + addReservationLimitWarning(i_total_number_reserved_seats);	
	
	ret_header_str = ret_header_str + g_list_text_total_number_of_seats + i_total_number_seats + g_list_new_line;			
	
    ret_header_str = ret_header_str + g_list_new_line + getAllReservationsLine();
	
    return ret_header_str;
	
} // getAllReservationsHeader

// Returns warning if limit is exceeded
function addReservationLimitWarning(i_total_number_reserved_seats)
{
	var ret_warning_str = "";
	
	if (i_total_number_reserved_seats < g_maximum_number_reservations)
	{
		return ret_warning_str;
	}
	
	ret_warning_str = g_list_text_max_number_of_seats + g_maximum_number_reservations.toString() + g_list_new_line;
	
	return ret_warning_str;
	
} // addReservationLimitWarning

// Get record header string
function getAllReservationsRecordHeader(i_reservation_node, i_number_reserved_seats)
{
    var ret_record_header_str = "";

    var reservation_name = getXmlElementNodeValue(i_reservation_node, g_tag_reservation_name);
	var reservation_email = getXmlElementNodeValue(i_reservation_node, g_tag_reservation_email);
	var reservation_remark = getXmlElementNodeValue(i_reservation_node, g_tag_reservation_remark);
	
    if (g_reservations_not_yet_set_value == reservation_email)
    {
        reservation_email = "";
    }
	
    if (g_reservations_not_yet_set_value == reservation_remark)
    {
        reservation_remark = "";
    }	
		
    ret_record_header_str = ret_record_header_str + g_list_text_reservation_name + reservation_name + g_list_new_line;
	
    ret_record_header_str = ret_record_header_str + g_list_text_reservation_email + reservation_email + g_list_new_line;	
	
    ret_record_header_str = ret_record_header_str + g_list_text_reservation_remark + reservation_remark + g_list_new_line;		
		
    ret_record_header_str = ret_record_header_str + g_liste_text_number_seats + i_number_reserved_seats + g_list_new_line;

    return ret_record_header_str;
	
} // getAllReservationsRecordHeader	

// Get all record seats string
function getAllReservationsRecordSeats(i_reservation_node, i_number_reserved_seats)
{
    var ret_record_seats_str = "";
	
    ret_record_seats_str = ret_record_seats_str + g_list_text_seats;
		
    for (reserved_seat_number=1; reserved_seat_number<=i_number_reserved_seats; reserved_seat_number++)
    {
        var table_number = getSeatTableNumber(i_reservation_node, reserved_seat_number);
			
        var table_char = getSeatCharacter(i_reservation_node, reserved_seat_number);
			
        ret_record_seats_str = ret_record_seats_str + " " + table_number + " " + table_char;
			
        if (reserved_seat_number == i_number_reserved_seats)
        {
            ret_record_seats_str = ret_record_seats_str + g_list_new_line;
        }
        else
        {
            ret_record_seats_str = ret_record_seats_str + ", ";
        }
		
    } //  reserved_seat_number   
	
    return ret_record_seats_str;
	
} // getAllReservationsRecordSeats

// Date in ISO standard format
function dateIsoStandard(i_concert_year, i_concert_month, i_concert_day)
{
	var ret_date = g_list_text_date + i_concert_year + "-";
	
    if (i_concert_month.length == 1)
    {
        i_concert_month = "0" + i_concert_month;
    }
    ret_date = ret_date + i_concert_month + "-";
	
    if (i_concert_day.length == 1)
    {
        i_concert_day = "0" + i_concert_day;
    }
    ret_date = ret_date + i_concert_day;	
	
    return ret_date;
	
} // dateIsoStandard

// Get line string
function getAllReservationsLine()
{
    var ret_line_str = "";
	
    ret_line_str = ret_line_str + "______________________________________________" + g_list_new_line + g_list_new_line;
	
    return ret_line_str;
	
} // getAllReservationsLine

// Get an XML node value
function getXmlElementNodeValue(i_xml_node, i_tag_name)
{
    return i_xml_node.getElementsByTagName(i_tag_name)[0].childNodes[0].nodeValue;
	
} // getXmlElementNodeValue

// Get all reservations as HTML string
// This will be the content of the send newsletter web page, i.e. this function
// is called with document.write(getAllReservationsHtml())
function getAllReservationsHtml()
{
    // The HTML string that will be returned
    var ret_reservations_html = "";
	
    // String holding the reservation data that was passed by the parent web page	
    var all_reservations = getAllReservationsForPopupWindow();

    ret_reservations_html = ret_reservations_html + all_reservations;	
	
	return ret_reservations_html;
	
} // getAllReservationsHtml



// Get all reservations. There is often a problem with Windows Explorer
// and Windows Edge: Passed data is null.
function getAllReservationsForPopupWindow()
{
	ret_passed_data_str = window.passed_data_all_reservations_str;
	
	if (null == ret_passed_data_str)
	{
		ret_passed_data_str = sessionStorage.getItem(g_session_storage_list_reservations);
	}
	
    return ret_passed_data_str;
	
} // getAllReservationsForPopupWindow


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End List Reservations /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Print Reservations ////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// The function opens a new window (browser tab) and lists the reservations in print format
// Please not that there are <style> statements in ReservationPrint.htm defining how the
// web page shall be printed, i.e. page break and page margins
function openPageReservationPrint()
{
	// Do nothing for the case request a reservation
    if (g_user_is_concert_visitor == "true")
        return;	
	
    // Get string with all the reservations
    var all_reservation_cards_str = getAllReservationCardsHtml();
	
    if (all_reservation_cards_str.length == 0)
    {
        alert(g_error_no_reserved_seats_no_reservation_cards);
        return;
    }

    all_reservation_cards_str = all_reservation_cards_str + addNewPage(); 

    var name_seat_table = DisplayNames.getPrintHtmlString();
	
	all_reservation_cards_str = all_reservation_cards_str + name_seat_table;
	
	// Save it also as session data that can be used by Internet Explorer and Microsoft Edge
    sessionStorage.setItem(g_session_storage_print_reservations, all_reservation_cards_str);	
	
	// Open the list window
    var print_window = window.open("ReservationPrint.htm");	
	
    // Pass the data to the opened window
    print_window.passed_data_all_reservation_cards_str = all_reservation_cards_str;		
	
} // openPageReservationPrint

// Main function for the reservation cards. Returns tables.
// There is often a problem with Windows Explorer and
// Windows Edge: Passed data is null.
function mainReservationCards()
{	
	var ret_passed_data_str = window.passed_data_all_reservation_cards_str;
	
	if (null == ret_passed_data_str)
	{
		ret_passed_data_str = sessionStorage.getItem(g_session_storage_print_reservations);
	}
	
    return ret_passed_data_str;
	
} // mainReservationCards

// Add all reservation cards as HTML tables
// 1. Get arrays with reservation cards data. Calls of getArrayReservationCards
// 2. Loop for all reservation cards
// 2.1 Add HTML <table> string at start. Call of addStartTable
// 2.2 Add rear empty row (page) of the folded card. Call of addEmptyRow
// 2.3 Add front row (page) with reservation data. Call of AddRow
// 2.4 Add end of table and new page if the page is full.
//     Call of addEndTable, addNewPage and addStartTable
// 3. Fill the page with empty (JAZZ live Aarau) cards. Call of getEmptyCardRows
// 4. Add end of table. Call of addEndTable
// 5. If less than one empty (JAZZ live AARAU) row add full page with empty rows
//    Call of getEmptyCardRows
function getAllReservationCardsHtml()
{
    // Return string with all reservation cards data in HTML format 
	var ret_all_reservation_cards_str = '';
	
    var names_array = getArrayReservationCards("names");
    var seats_array = getArrayReservationCards("seats");
	
    if (names_array.length == 0)
    {
        return ret_all_reservation_cards_str;		
    }
	
	var n_rows_per_page = 10;
	var row_page = 1;
	var n_columns = 3;

    var n_empty_card_rows = -12345;
		
    ret_all_reservation_cards_str = ret_all_reservation_cards_str + addStartTable();
	
    var number_reservation_cards = names_array.length;
	
    for (index_card=0; index_card<number_reservation_cards; index_card = index_card + n_columns)
    {
        ret_all_reservation_cards_str = ret_all_reservation_cards_str + addEmptyRow(); 
		 
        ret_all_reservation_cards_str = ret_all_reservation_cards_str + addRow(index_card, names_array, seats_array); 

        row_page = row_page + 2;
		
        if (row_page >=  n_rows_per_page )
        {
            ret_all_reservation_cards_str = ret_all_reservation_cards_str + addEndTable();
			
            ret_all_reservation_cards_str = ret_all_reservation_cards_str + addNewPage();

            ret_all_reservation_cards_str = ret_all_reservation_cards_str + addStartTable();
			
            row_page = 1;
        }	

        n_empty_card_rows = parseInt((n_rows_per_page - row_page)/2.0) + 1;
    }

    var b_new_page = false;

    ret_all_reservation_cards_str = ret_all_reservation_cards_str + getEmptyCardRows(n_empty_card_rows, b_new_page);
	
    ret_all_reservation_cards_str = ret_all_reservation_cards_str + addEndTable();

    if (n_empty_card_rows < 1)
    {
        b_new_page = true;

        ret_all_reservation_cards_str = ret_all_reservation_cards_str + getEmptyCardRows(5, b_new_page);
    }
	
    return ret_all_reservation_cards_str;	

} // getAllReservationCardsHtml

// Get empty (JAZZ live AARAU) card rows
function getEmptyCardRows(i_n_empty_card_rows, i_b_new_page)
{
    var ret_card_row = '';

    if (i_b_new_page)
    {
        ret_card_row = ret_card_row + addNewPage();

        ret_card_row = ret_card_row + addStartTable();
    }

    for (var card_row= 1; card_row <= i_n_empty_card_rows; card_row++)
    {
        ret_card_row = ret_card_row + addEmptyRow();

        ret_card_row = ret_card_row + addJazzLiveAarauRow();
    }

    if (i_b_new_page)
    {
        ret_card_row = ret_card_row + addEndTable();
    }

    return ret_card_row;

} // getEmptyCardRows


// Add new page
function addNewPage()
{
    return '<div class="page-break"></div>';
	
} // addNewPage

// Returns one row (front page of folded card) with reservation data
// 
function addRow(i_index_card_start, i_names_array, i_seats_array)
{
    var ret_row = '';
	
    ret_row = ret_row + addStartRow();
	
    ret_row = ret_row + addColumn(i_index_card_start, i_names_array, i_seats_array);
	
	ret_row = ret_row + addColumn(i_index_card_start + 1, i_names_array, i_seats_array);
	
	ret_row = ret_row + addColumn(i_index_card_start + 2, i_names_array, i_seats_array);
	
    ret_row = ret_row + addEndRow();
	
    return ret_row;
	
} // addRow

// Returns one column element
function addColumn(i_index_card, i_names_array, i_seats_array)
{
	var ret_column = '';

    ret_column = ret_column + addStartColumn();	
	
    
    if (i_index_card < i_names_array.length)
    {
	
	    ret_column = ret_column + addJazzLiveAarau();
	
        ret_column = ret_column + addName(i_names_array[i_index_card]);	
	
        ret_column = ret_column + addDateTableSeat(i_seats_array[i_index_card]);
	
    }
    else
    {
        ret_column = ret_column + addContentJazzLiveAarauColumn();
    }

    ret_column = ret_column + addEndColumn();	
	
    return ret_column;
	
} // addColumn

function addJazzLiveAarauRow()
{
    var ret_row = '';
	
    ret_row = ret_row + addStartRow();
	
    ret_row = ret_row + addJazzLiveAarauColumn();
	
	ret_row = ret_row + addJazzLiveAarauColumn();
	
	ret_row = ret_row + addJazzLiveAarauColumn();
	
    ret_row = ret_row + addEndRow();
	
    return ret_row;
	
} // addJazzLiveAarauRow

// Returns one column element with the text JAZZ live AARAU
function addJazzLiveAarauColumn()
{
	var ret_column = '';

    ret_column = ret_column + addStartColumn();	
	
    ret_column = ret_column + addJazzLiveAarau();

    ret_column = ret_column + addName("&nbsp;");	
	
    ret_column = ret_column + addDateTableSeat("&nbsp;");
    
    ret_column = ret_column + addEndColumn();	
	
    return ret_column;
	
} // addJazzLiveAarauColumn

// Returns one column element with the text JAZZ live AARAU
function addContentJazzLiveAarauColumn()
{
	var ret_column = '';
	
    ret_column = ret_column + addJazzLiveAarau();

    ret_column = ret_column + addName("&nbsp;");	
	
    ret_column = ret_column + addDateTableSeat("&nbsp;");
	
    return ret_column;
	
} // addContentJazzLiveAarauColumn

// Returns one empty row, i.e. with empty columns
function addEmptyRow()
{
    var ret_row = '';
	
    ret_row = ret_row + addStartRow();
	
    ret_row = ret_row + addEmptyColumn();
	
	ret_row = ret_row + addEmptyColumn();
	
	ret_row = ret_row + addEmptyColumn();
	
    ret_row = ret_row + addEndRow();
	
    return ret_row;
	
} // addEmptyRow

// Returns one column element with spaces and new lines (&nbsp; and <br>)
function addEmptyColumn()
{
	var ret_column = '';

    ret_column = ret_column + addStartColumn();	
	
	ret_column = ret_column + '&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br><br>&nbsp;<br>';

    ret_column = ret_column + addEndColumn();	
	
    return ret_column;
	
} // addEmptyColumn

// Returns JAZZ live AARAU
function addJazzLiveAarau()
{
    return '<div class="jazz_live_aarau"><br>JAZZ <i>live</i> AARAU</div>';

} // addJazzLiveAarau

// Returns reservation name
function addName(i_reservation_name)
{
    return '<br><div class="r_name">' + i_reservation_name + '</div><br>';

} // addName

// Returns reservation date, table and seat
function addDateTableSeat(i_date_table_seat)
{
    return '<div class="table_seat">' + i_date_table_seat + '<br>&nbsp;</div>';

} // addDateTableSeat

// Returns start table
function addStartTable()
{
    return '<table>';
	
} // addStartTable
// Returns end table
function addEndTable()
{
    return '</table>';
	
} // addEndTable

// Returns start row
function addStartRow()
{
    return '<tr>';
	
} // addStartRow

// Returns end row
function addEndRow()
{
    return '</tr>';
	
} // addEndRow

// Returns start column
function addStartColumn()
{
    return '<td  style= "width: 333px; border: 1px solid black" >';

    // 2022-12-08 
    // Style for td not defined in ReservationPrint.htm because of
    // styles set in DisplayNames.js           
    // return '<td>';
	
} // addStartColumn

// Returns end column
function addEndColumn()
{
    return '</td>';
	
} // addEndColumn

// Get array names or date-table-seat array
function getArrayReservationCards(i_case)
{
    var names_array = new Array();
    var seats_array = new Array();	
	
    var concert_day = getXmlElementNodeValue(g_reservations_xml, g_tag_day);
    var concert_month = getXmlElementNodeValue(g_reservations_xml, g_tag_month);
    var concert_year = getXmlElementNodeValue(g_reservations_xml, g_tag_year);
	
	var date_iso = dateIsoStandard(concert_year, concert_month, concert_day);
	
	var number_reservations = getNumberOfReservations();
	
	var index_card = 0;
	
	for (reservation_number=1; reservation_number<=number_reservations; reservation_number++)
    {
        // Reservation record node
		var reservation_node = getReservationNode(reservation_number);
		
        var reservation_name = getXmlElementNodeValue(reservation_node, g_tag_reservation_name);
		
        // Number of reserved seats
		var number_reserved_seats = getNumberOfReservedSeats(reservation_node);
		
        for (reserved_seat_number=1; reserved_seat_number<=number_reserved_seats; reserved_seat_number++)
        {
            var table_number = getSeatTableNumber(reservation_node, reserved_seat_number);
			
            var table_char = getSeatCharacter(reservation_node, reserved_seat_number);
			
			names_array[index_card] = reservation_name;
			
			var date_table_seat = date_iso + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + "Tisch:&nbsp;&nbsp;" + table_number + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Platz&nbsp;&nbsp;" + table_char;
			
            seats_array[index_card] = date_table_seat;
			
			index_card = index_card + 1;
			
        } // seat_number
		
    } // reservation_number
	
    if (i_case == "names")
    {
        return names_array;
    }
    else
    {
        return seats_array;
    }	
	
} // getArrayReservationCards

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Print Reservations //////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Get Next Concert XML File Name ////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Get the name of reservation XML file for the next concert
// Input data: The string (e.g. Salmen or Test). 
// The XML season program must also be loaded, i.e. g_season_program_xml must be set
// 1. Construct the start part of the name for the output file name
//    Call of startPartFileNames
// 2. Get the concert number for the next concert. Call of getConcertNumberForNextConcert
//    If there is no next concert number will be set to 12 and the user gets a message
// 3. Construct the name for the given concert number. Call of constructXmlFileName
function getNextConcertReservationXmlFileName(i_add_to_xml_file_name)
{
	ret_file_name = "";

    var n_concerts = getNumberOfSeasonConcerts();
	
    // Construct the start part of the name for the output XML files
    var start_part_dir_name_xml = startPartFileNames(i_add_to_xml_file_name);	
	
	var number_next_concert = getConcertNumberForNextConcert();
    if (number_next_concert < 0)
    {
        alert(g_error_next_season_passed);
        number_next_concert = n_concerts;
    }
	
    ret_file_name = constructXmlFileName(start_part_dir_name_xml, number_next_concert);	
	
	return ret_file_name;
	
} // getNextConcertReservationXmlFileName

// Constructs and returns the XML file for a given start part and the concert number
function constructXmlFileName(i_start_part_dir_name_xml, i_concert_number)
{
    var ret_file_name = "";

    var n_concerts = getNumberOfSeasonConcerts();
	
	var concert_number_int = parseInt(i_concert_number);
	if (concert_number_int <= 0 || concert_number_int > n_concerts)
	{
		alert("constructXmlFileName Input concert number is not 1, 2, 3, ... or " + n_concerts.toString());
	}

	var number_str = "";
	if (concert_number_int <= 9)
	{
		number_str = "0" + concert_number_int.toString();
	}
	else
	{
		number_str = concert_number_int.toString();
	}
	

    ret_file_name = i_start_part_dir_name_xml + number_str + ".xml";
	
	// Used for reload 
	g_url_file_concert_reservation_xml_name = ret_file_name;	
	
    return ret_file_name;
	
} // constructXmlFileName

// Construct the name of reservation XML file for a given concert number
function constructConcertReservationXmlFileName(i_add_to_xml_file_name, i_concert_number)
{
	ret_file_name = "";
	
    // Construct the start part of the name for the output XML files
    var start_part_dir_name_xml = startPartFileNames(i_add_to_xml_file_name);
	
    ret_file_name = constructXmlFileName(start_part_dir_name_xml, i_concert_number);	
	
    return ret_file_name;
	
} // constructConcertReservationXmlFileName

// Returns the concert number for the next concert
function getConcertNumberForNextConcert()
{
	var ret_concert_number = -1;
	
	var year_array = getDateArray(1);
	var month_array = getDateArray(2);
	var day_array = getDateArray(3);
	
	for (index_concert=0; index_concert<year_array.length; index_concert++)
	{
		var date_passed = DateIsPassed(year_array[index_concert], month_array[index_concert], day_array[index_concert]);
		
		if (false == date_passed)
		{
			ret_concert_number = index_concert + 1;
			break;
		}
	}
	
	
	return ret_concert_number;
	
} // getConcertNumberForNextConcert


// Returns the year (i_case=1), month (i_case=2) day (i_case=3) or band (i_case=4)
function getDateArray(i_case)
{
	var ret_array = new Array();
	
	if (null == g_season_program_xml)
	{
		alert("getDateArray g_season_program_xml is null");
				
		return ret_array;
	}

    // Get all concert nodes from the season program
	var concert_nodes = g_season_program_xml.getElementsByTagName(g_tag_season_program_concert);
	
	for (index_concert=0; index_concert<concert_nodes.length; index_concert++)
	{
		var concert_node = concert_nodes[index_concert];
		
		var concert_year = concert_node.getElementsByTagName(g_tag_season_program_year)[0].childNodes[0].nodeValue;
		var concert_month = concert_node.getElementsByTagName(g_tag_season_program_month)[0].childNodes[0].nodeValue;
		var concert_day = concert_node.getElementsByTagName(g_tag_season_program_day)[0].childNodes[0].nodeValue;
		var concert_band = concert_node.getElementsByTagName(g_tag_season_program_band_name)[0].childNodes[0].nodeValue;
		
		if (1 == i_case)
		{
			ret_array[index_concert] = concert_year;
		}
		else if (2 == i_case)
		{
			ret_array[index_concert] = concert_month;
		}
		else if (3 == i_case)
		{
			ret_array[index_concert] = concert_day;
		}
		else if (4 == i_case)
		{
			ret_array[index_concert] = concert_band;
		}		
		else
		{
		    alert("getDateArray i_case not 1, 2, 3 or 4");
				
		    return ret_array;			
		}
	}
	
    return ret_array;	
	
} // getDateArray

// Returns true if date is passed
function DateIsPassed(i_concert_year, i_concert_month, i_concert_day)
{
	var ret_boolean = true;
	
	var i_concert_year_int = parseInt(i_concert_year);
	var i_concert_month_int = parseInt(i_concert_month);
	var i_concert_day_int = parseInt(i_concert_day);
	
	var current_date = new Date();
    var current_year = current_date.getFullYear();
	var current_month = current_date.getMonth() + 1;
	var current_day = current_date.getDate();
	
	if (current_year >  i_concert_year_int )
	{
		return ret_boolean;
	}
	else if (current_year ==  i_concert_year_int && current_month > i_concert_month_int)
	{
		return ret_boolean;
	}
	else if (current_year ==  i_concert_year_int && current_month == i_concert_month_int && current_day > i_concert_day_int)
	{
		return ret_boolean;
	}
	
	ret_boolean = false;
	
	return ret_boolean;
	
}  // DateIsPassed

// Returns the number of concerts
// 20230926
function getNumberOfSeasonConcerts()
{
	if (null == g_season_program_xml)
	{
		alert("getNumberOfConcerts Season program XML object g_season_program_xml is null");
		return -1;
	}
	
    // Get all concert nodes from the season program
	var concert_nodes = g_season_program_xml.getElementsByTagName(g_tag_season_program_concert);
	
	var ret_n_concerts = concert_nodes.length;
	
	return ret_n_concerts;
	
} // getNumberOfSeasonConcerts

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Get Next Concert XML File Name //////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

