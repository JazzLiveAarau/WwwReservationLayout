// File: ScriptsLayout/ReservationConcerts.js
// Date: 2025-11-26
// Author: Gunnar Lidén

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Init Selections ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Initialize the selection of seats for a new reservation that shall be added 
function initSelectSeatsForReservation(i_reservation_name, i_reservation_email, i_reservation_comment)
{
    g_current_reservation_name = i_reservation_name;
	
	g_current_reservation_email = g_reservations_not_yet_set_value;
	
	if (i_reservation_email.length > 0)
	{
		g_current_reservation_email = i_reservation_email;

		console.log("initSelectSeatsForReservation g_current_reservation_email= " + g_current_reservation_email);
	}

	g_current_reservation_remark = g_reservations_not_yet_set_value;
	
	if (i_reservation_comment.length > 0)
	{
		g_current_reservation_remark = i_reservation_comment;
	}
	
	setTextForInitReservationButton();
	
	initSelectArrays();
	   
} // initSelectSeatsForReservation

// Resets selection parameters and some buttons
function resetSelectionVariablesAndButtons()
{
	g_all_selected_tables.length = 0;
	g_all_selected_seats.length = 0;
	
	g_current_reservation_name = "";
	
	setTextForSaveReservationButton(0);
	setTextForInitReservationButton();
	//QQQ setTextAndColorSaveReservationsExitButton(); // Reservation.js
	
} // resetSelectionVariablesAndButtons


// Set the text for the init reservation button
function setTextForInitReservationButton()
{
    // Return if not the add reservation case
	if (g_user_is_concert_visitor == "true")
	{
		return;
	}
	
    // setButtonText("text_init_reservation", g_button_add_reservation_text);
	
} // setTextForInitReservationButton
	
// Set the text and color for the save reservation button
// Input i_number_selected is no longer used
function setTextForSaveReservationButton(i_number_selected)
{
    // Return if not the add reservation case
	if (g_user_is_concert_visitor == "true")
	{
		return;
	}
	
	var element_text_image = document.getElementById("id_image_save_reservation_text");
	if (null == element_text_image)
	{
		alert("setTextForSaveReservationButton Element text image is null");
		return;
	}	

    //QQQvar text_image_save_reservation = g_layout_xml.getElementsByTagName(g_tag_text_image_save_reservation)[0].childNodes[0].nodeValue;	
    //QQ var text_image_save_reservation_white = g_layout_xml.getElementsByTagName(g_tag_text_image_save_reservation_white)[0].childNodes[0].nodeValue;	

	var text_image_save_reservation = 'ImagesApp/text_save_reservation.png';

	var text_image_save_reservation_white = 'ImagesApp/text_save_reservation_white.png';
	
	if (g_current_reservation_name.length > 0)
	{
		// setButtonText("text_save_reservation", g_save_reservation_text);
		
		element_text_image.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', text_image_save_reservation);
		
		setButtonColor("button_save_reservation", g_active_mode_color);		
	}
	else
	{
		// setButtonText("text_save_reservation", "");
		
		element_text_image.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', text_image_save_reservation_white);
		
		setButtonColor("button_save_reservation", g_color_white);		
	}
	
} // setTextForSaveReservationButton

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Init Selections /////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Set & Add Selections //////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Set the global variables for reservation name, email and remark
function setNameEmailRemarkGlobalVariables(i_reservation_name, i_reservation_email, i_reservation_comment)
{
    g_current_reservation_name = i_reservation_name;
	
	g_current_reservation_email = g_reservations_not_yet_set_value;
	
	if (i_reservation_email.length > 0)
	{
		g_current_reservation_email = i_reservation_email;

		console.log("setNameEmailRemarkGlobalVariables g_current_reservation_email= " + g_current_reservation_email);
	}

	g_current_reservation_remark = g_reservations_not_yet_set_value;
	
	if (i_reservation_comment.length > 0)
	{
		g_current_reservation_remark = i_reservation_comment;
	}	
	
} // setNameEmailRemarkGlobalVariables

// Add the selected reservations to the reservations XML object
// and save the XML reservations file on the server.
// Please refer also to function saveXmlFileWithPhp (in ReservationFiles.js)
// 1. Reset selection variables if no selections have been made and return.
//    Call of resetSelectionVariablesAndButtons.
// 2. Check if somebody else has reserved any of the selected seats. For this
//    case just return. The checking function has informed the user that replacement
//    seats must be selected. Call of checkSelectionSetReservations().
// 3. Add the selected seats to the reservation XML object (g_reservations_xml).
//    Call of makeConcertReservationMultipleTablesAndSeats. Input data name, email
//    and remark are hold by g_current_reservation_name, g_current_reservation_email
//    and g_current_reservation_remark.
// 4. Save the reservation XML file on the server. 
//    Call of saveXmlFileWithJQueryPostFunction().
// 5. Send confirmation email if email address is defined
//    Call of sendEmailWithJQueryPostFunction().
function saveSelectedReservations()
{
	var number_selected = g_all_selected_tables.length;
	if (0 == number_selected)
	{
		alert(g_error_msg_no_seats_selected);
		
		resetSelectionVariablesAndButtons()
		
		return;
	}

    var b_user_must_select_other_seats = checkSelectionSetReservations();
	if (b_user_must_select_other_seats)
    {
        // The user has got the message that seats have been taken by somebody else and must be replaced
        return;
    }	
	
	makeConcertReservationMultipleTablesAndSeats(g_current_reservation_name, g_current_reservation_email, g_current_reservation_remark);	
    // Please note that makeConcertReservationMultipleTablesAndSeats will change the color of the circle
	
    var b_save_post = saveXmlFileWithJQueryPostFunction();
    if (!b_save_post)
    {
        return;	
    }	
	
    var b_send_mail = false;
	
	if (g_current_reservation_email.length > 0 && g_current_reservation_email != g_reservations_not_yet_set_value)
	{
        b_send_post = sendEmailWithJQueryPostFunction();
        if (!b_send_mail)
        {
            // Do nothing	
        }	  
    }
	
    if (b_save_post && b_send_mail)
    {
        alert(g_msg_xml_saved_email_sent + g_current_reservation_name);		
    }
    else if (b_save_post)
    {
        alert(g_msg_xml_saved + g_current_reservation_name);			
    }	
	
	resetSelectionVariablesAndButtons();
	
} // saveSelectedReservations

// Make a reservation for one seat
function makeConcertReservation(i_reservation_name, i_table_number, i_seat_char)
{
	if (null == g_reservations_xml)
	{
		alert("Concert reservation XML object is null");
		return;
	}
	  
    // For debug	  
	var all_names = getArrayReservationData("name");
	var all_remarks = getArrayReservationData("remark");
	var all_seat_table_numbers = getArrayReservationData("number");
	var all_seat_characters = getArrayReservationData("character");
	
	// Prepared for input of multiple seat characters
	var seat_characters = new Array(); 
	
	seat_characters[0] = i_seat_char;
	//seat_characters[1] = "E";
	
	appendReservation(i_reservation_name, "Remark_Xyz", i_table_number, seat_characters);
	
	setReservedProperties();
	
	// For debug	
	all_names = getArrayReservationData("name");
	all_remarks = getArrayReservationData("remark");
    all_seat_table_numbers = getArrayReservationData("number");
	all_seat_characters = getArrayReservationData("character");
	
} // makeConcertReservation

// Make a reservation for multiple seats
function makeConcertReservationMultipleSeats(i_reservation_name, i_table_number, i_seat_char_array)
{
	if (null == g_reservations_xml)
	{
		alert("makeConcertReservationMultipleSeats: Concert reservation XML object is null");
		return;
	}
	 
	appendReservation(i_reservation_name, "Remark_Xyz", i_table_number, i_seat_char_array);
	
	setReservedProperties();
	
} // makeConcertReservationMultipleSeats

// Make a reservation for multiple tables and seats in the selection arrays
function makeConcertReservationMultipleTablesAndSeats(i_reservation_name, i_reservation_email, i_reservation_remark)
{
	if (null == g_reservations_xml)
	{
		alert("makeConcertReservationMultipleTablesAndSeats: Concert reservation XML object is null");
		return;
	}
	
	var selected_tables_array = getTableArrayFromSelectArray();
	var number_tables = selected_tables_array.length;
	
	for (table_index=0; table_index<number_tables; table_index++)
	{
		var current_table_name = selected_tables_array[table_index];
		
		var seats_array_for_table = getSeatsForGivenTable(current_table_name);

        appendReservation(i_reservation_name, i_reservation_email, i_reservation_remark, current_table_name, seats_array_for_table);
	
        setReservedProperties();
	
	}
	
} // makeConcertReservationMultipleTablesAndSeats

// Append a reservation
function appendReservation(i_reservation_name, i_reservation_email, i_reservation_remark, i_seat_table_number, i_seat_characters)
{
   // https://www.webdeveloper.com/forum/d/231973-append-xml-node-in-javascript/3
   
   var new_reservation = g_reservations_xml.createElement(g_tag_reservation);
   
   var reservation_name_node = g_reservations_xml.createElement(g_tag_reservation_name);
   var reservation_name_text = g_reservations_xml.createTextNode(i_reservation_name);
   reservation_name_node.appendChild(reservation_name_text);
   new_reservation.appendChild(reservation_name_node);
   
   var email_node = g_reservations_xml.createElement(g_tag_reservation_email);
   var email_text = g_reservations_xml.createTextNode(i_reservation_email);
   email_node.appendChild(email_text);
   new_reservation.appendChild(email_node);
   
   var remark_node = g_reservations_xml.createElement(g_tag_reservation_remark);
   var remark_text = g_reservations_xml.createTextNode(i_reservation_remark);
   remark_node.appendChild(remark_text);
   new_reservation.appendChild(remark_node);
   
   for (index_char=0; index_char<i_seat_characters.length; index_char++)
   {
	   
     var seat_node = g_reservations_xml.createElement(g_tag_seat);
   	  
     var seat_table_number_node = g_reservations_xml.createElement(g_tag_seat_table_number);  
     var seat_table_number_text = g_reservations_xml.createTextNode(i_seat_table_number);
     seat_table_number_node.appendChild(seat_table_number_text);


     var seat_character_node = g_reservations_xml.createElement(g_tag_seat_character);
     var seat_character_text = g_reservations_xml.createTextNode(i_seat_characters[index_char]);
     seat_character_node.appendChild(seat_character_text);
   
     new_reservation.appendChild(seat_node);
     seat_node.appendChild(seat_table_number_node);
     seat_node.appendChild(seat_character_node);

   } // index_char

   g_reservations_xml.documentElement.appendChild(new_reservation);	
   
} // appendReservation

// Add an XML element
function AddXMLElement() 
{
	// https://stackoverflow.com/questions/27588799/how-to-save-xml-file-with-ajax-and-javascript
	var xml_http = LoadXMLHttp();
    xml_http.open("POST", "Default.aspx", true);
    xml_http.setRequestHeader("Accept", "text/xml");
    xml_http.send(g_reservations_xml);	
	
    //xml_http.open("POST", "Default.aspx", true);
    //xml_http.setRequestHeader("Accept", "text/xml");
    //xml_http.onreadystatechange = CreateXmlElement;
    //xml_http.send(g_reservations_xml);
}

// Returns a XMLHttpRequest object
function LoadXMLHttp() 
{
    var xmlHttp;
    if (window.XMLHttpRequest)
        xmlHttp = new XMLHttpRequest();
    else
        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
	
    return xmlHttp;
	
} // LoadXMLHttp


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Set & Add Selections ////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Check Selections //////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////


// Check if selections still are free or if somebody else has taken any of the seats
// An alert (user message) string will be returned if selected seats have been removed. 
// This function assumes that the reservations XML object has been reloaded. 
// The intended use of this function is that it is called after each selection of a new seat,
// and directly prior to adding the selected seats to the reservation XML object and saving
// the corresponding reservation XML file (e.g. .xml) on the server. Doing this will hopefully
// make it impossible that two or more users at the same time saves the  reservation XML file,
// i.e. that a checkout function like for the applications Admin and Adressen.
// 1. Get seat reservation arrays. Calls of getArrayReservationData
// 2. Get selected arrays. Call of getArraySelectedTables and getArraySelectedSeats
// 3. Loop over the arrays. Add to arrays selected_seats_to_remove and selected_tables_to_remove
// 4. Remove selected seats from selecion arrays (and make circles green). 
// 5. Set reservations. Call of setReservedProperties (and make reserved circles red)
function checkIfSelectionsStillAreFree()
{
    var ret_str = "";
	
    var all_names = getArrayReservationData("name");	
    var all_seat_table_numbers = getArrayReservationData("number");
    var all_seat_characters = getArrayReservationData("character");
    var number_reserved_seats = all_seat_characters.length;	
	
    if (0 == number_reserved_seats)
    {
        // There is nothing to check
        return ret_str;			
    }

    var selected_tables = getArraySelectedTables();	
    var selected_seats = getArraySelectedSeats();
    if (selected_tables == null || selected_seats == null)
    {
        alert("checkIfSelectionsStillAreFree selected_tables and/or selected_seats is null");
        return ret_str;	
    }
    if (selected_tables.length == 0 || selected_seats.length == 0)
    {
        // alert("checkIfSelectionsStillAreFree selected_tables and/or selected_seats length is zero (0)");
        return ret_str;	
    }

	var selected_seats_to_remove = new Array();
    var selected_tables_to_remove = new Array();
    var selected_names_to_remove = new Array();
	var index_to_be_removed = 0;
	
    var number_selected_seats = selected_tables.length;
	
    for (index_select=0; index_select < number_selected_seats; index_select++)
    {
        var current_selected_table = selected_tables[index_select];
		var current_selected_seat = selected_seats[index_select];
        for (index_reserved=0; index_reserved < number_reserved_seats; index_reserved++)
        {
            var current_reserved_table = all_seat_table_numbers[index_reserved];
            var current_reserved_seat = all_seat_characters[index_reserved];
            var current_reserved_name = all_names[index_reserved];
			
            if (current_selected_table == current_reserved_table && current_selected_seat == current_reserved_seat)
            {
                 selected_tables_to_remove[index_to_be_removed] = current_selected_table;
                 selected_seats_to_remove[index_to_be_removed] = current_selected_seat;
                 selected_names_to_remove[index_to_be_removed] = current_reserved_name;
                 index_to_be_removed = index_to_be_removed + 1;
            }
            /*			
            else if (index_select > 1 && 2 == index_reserved) // Only for testing QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ
            {
                 selected_tables_to_remove[index_to_be_removed] = current_selected_table;
                 selected_seats_to_remove[index_to_be_removed] = current_selected_seat;
                 selected_names_to_remove[index_to_be_removed] = current_reserved_name;
                 index_to_be_removed = index_to_be_removed + 1;
            }					
			*/
			
        } // index_reserved
		
    } // index_select
	
	var number_seats_to_remove = selected_tables_to_remove.length;
	
	var removed_seats_str = "";
    for (index_remove = 0; 	index_remove < number_seats_to_remove; index_remove++)
    {
        var current_remove_table = selected_tables_to_remove[index_remove];
        var current_remove_seat = selected_seats_to_remove[index_remove];		
        var current_remove_name = selected_names_to_remove[index_remove];		
        removeFromSelectArrays(current_remove_table, current_remove_seat);
		
        removed_seats_str = removed_seats_str + g_title_table + current_remove_table + g_title_seat + current_remove_seat;
		if (index_remove + 1 == number_seats_to_remove)
        {
            //removed_seats_str = removed_seats_str + " (Reserviert von " + current_remove_name + " , nur als Debug)";
            removed_seats_str = removed_seats_str;
        }
    }

	setReservedProperties();

    if (number_seats_to_remove > 0)
    {
        // Alert message string
        ret_str = g_selection_by_somebody_else_reserved + removed_seats_str + "\n" + g_selection_select_new_seats;	
    }
	
    return ret_str;	
	
} // checkIfSelectionsStillAreFree

// Returns the number of seats that are free to be selected
// The maximum number of seats holds the global parameter g_maximum_number_reservations
// Please note that other persons may have made reservations in the meantime. For this
// case might the function return a negative number. The function should for this case
// remove selection or ....
function getNumberOfAdditionalSeatsThatCanBeSelected()
{
	var ret_n_number = -12345;
	
	var total_number_reserved_seats = totalNumberReservedSeats();
	
	var selected_seats = getArraySelectedSeats();
	
	var total_number_reserved_and_selected_seats = total_number_reserved_seats + selected_seats.length;
	
	ret_n_number = g_maximum_number_reservations - total_number_reserved_and_selected_seats;
	
    return ret_n_number;
	
} // getNumberOfAdditionalSeatsThatCanBeSelected


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Check Selections ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Selection functions ///////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////


// Get array of selected tables
function getArraySelectedTables()
{
    return g_all_selected_tables;
	
} // getArraySelectedTables

// Get array of selected seats
function getArraySelectedSeats()
{
    return g_all_selected_seats;
	
} // getArraySelectedSeats

// Add seat and corresponding table to the arrays
function addToSelectArrays(i_table_number, i_seat_char)
{
	var index_add = g_all_selected_seats.length;
	
	g_all_selected_tables[index_add] = i_table_number;
	
	g_all_selected_seats[index_add] = i_seat_char;
	
	setSelectedProperties();
	
} // addToSelectArrays

// Remove seat and corresponding table from the arrays
function removeFromSelectArrays(i_table_number, i_seat_char)
{
	var input_selected_tables = new Array();
	var input_selected_seats = new Array();
	
	var in_number = g_all_selected_tables.length;
	
	for (index_in = 0; index_in < in_number; index_in++)
	{
      input_selected_tables[index_in] = g_all_selected_tables[index_in];
	  input_selected_seats[index_in] = g_all_selected_seats[index_in];
	}
	
	g_all_selected_tables.length = 0;
	g_all_selected_seats.length = 0;
	
	debug_removed = 0;
	
	index_add = 0;
	
	var out_number = input_selected_tables.length;
	
	for (index_out = 0; index_out < out_number; index_out++)
	{
		if (i_table_number == input_selected_tables[index_out] && i_seat_char == input_selected_seats[index_out])
		{
			debug_removed = debug_removed + 1;
		}
		else
		{
			g_all_selected_tables[index_add] = input_selected_tables[index_out];
			g_all_selected_seats[index_add] = input_selected_seats[index_out];
			
			index_add = index_add + 1;
		}
		
	} // index_out
	
	if (debug_removed != 1)
	{
		alert("removeFromSelectArrays Not in select arrays i_table_number= " + i_table_number + " i_seat_char= " + i_seat_char);
	}
	
	var element_circle = document.getElementById(circleId(i_table_number, i_seat_char));
	if (element_circle != null)
	{
		element_circle.style["fill"] = g_color_free_seat;
	}		
	
	var number_selected = 	g_all_selected_tables.length;
	if (g_user_is_concert_visitor == "true")
	{
		setTextForEmailSendButton(number_selected);
	}
	else
	{
		setTextForSaveReservationButton(number_selected);
	}
	
} // removeFromSelectArrays

// Returns true if seat is selected
function seatIsSelected(i_table_number, i_seat_char)
{
	var ret_seat_is_selected = "false";
	
    var number_selected = 	g_all_selected_tables.length;

    for (index_selected = 0; index_selected < number_selected; index_selected++)
	{
		var selected_number = g_all_selected_tables[index_selected];
		var selected_character = g_all_selected_seats[index_selected];
		
		if (selected_number == i_table_number && selected_character == i_seat_char)
		{
			ret_seat_is_selected = "true";
		}
		
	}
	
	return ret_seat_is_selected;
	
} // setIsSelected

// Returns true if one or more seats have been selected
function seatsAreSelected()
{
	var number_selected = 	g_all_selected_tables.length;
	
	if (number_selected > 0)
	{
		return "true";
	}
	else
	{
		return "false";
	}
	
} // seatsAreSelected

// Returns the selected seats as a string
function getSelectedSeats()
{
	var found_tables = getTableArrayFromSelectArray();
	if (0 == found_tables.length)
	{
		return;
	}
	
	var ret_string = "";

	var email_b_seats =  g_season_program_xml.getEmailSeatsBoolean(g_current_event_number);

	if (email_b_seats)
	{
		for (index_out=0; index_out < found_tables.length; index_out++)
		{
		var current_table = found_tables[index_out];
			
		ret_string = ret_string + "Tisch " + current_table + ": Platz ";
		
		for (index_all=0; index_all<g_all_selected_tables.length; index_all++)
		{
			if (g_all_selected_tables[index_all] == current_table)
			{
				ret_string = ret_string + " " + g_all_selected_seats[index_all];
			}
		}
		
		ret_string = ret_string + "<br>";
		}
	}
	else
	{
		ret_string = ret_string + "Sitzplätze können nicht reserviert werden";
		ret_string = ret_string + "<br>";
	}
	

	ret_string = ret_string + "Anzahl Plätze: " + g_all_selected_tables.length + "<br>";
	
	return ret_string;
	
} // getSelectedSeats

// Returns the seats for a given table number (name)
function getSeatsForGivenTable(i_table_number)
{
	var ret_seats_array = new Array();
	
	var index_add = 0;
	
	for (index_all=0; index_all<g_all_selected_tables.length; index_all++)
	{
        if (g_all_selected_tables[index_all] == i_table_number)
		{
			 ret_seats_array[index_add] = g_all_selected_seats[index_all];
			 index_add = index_add + 1;
		}
	}	
	
	return ret_seats_array;
	
} // getSeatsForGivenTable

// Get table array from select array
function getTableArrayFromSelectArray()
{
	var found_tables = new Array();
	
	var number_selected = 	g_all_selected_tables.length;
	if (0 == number_selected)
	{
		alert("getTableArrayFromSelectArray: No seats are selected");
		return found_tables;
	}
	
	
    for (index_selected = 0; index_selected < number_selected; index_selected++)
	{
		var current_number = g_all_selected_tables[index_selected];
		// var selected_character = g_all_selected_seats[index_selected];
		
		var table_found = "false";
		
		for (index_found=0; index_found<found_tables.length; index_found++)
		{
			if (found_tables[index_found] == current_number)
			{
				table_found = "true";
			}
			
		}
		
		if (table_found == "false")
		{
			var index_add = found_tables.length;
			
			found_tables[index_add] = current_number;
		}
			
	}		
	
	return found_tables;
	
} // getTableArrayFromSelectArray

// Get number of tables in the select array
function getNumberOfTablesInSelectArray()
{
	var ret_number = 0;
	
	var table_array = getTableArrayFromSelectArray();
	
	ret_number = table_array.length;
	
	return ret_number;
	
} // getNumberOfTablesInSelectArray

// Set selected properties
function setSelectedProperties()
{
    var number_selected = 	g_all_selected_tables.length;
	
	if (g_user_is_concert_visitor == "true")
	{
		setTextForEmailSendButton(number_selected);
	}
	else
	{
		setTextForSaveReservationButton(number_selected);
	}
	
    for (index_selected = 0; index_selected < number_selected; index_selected++)
	{
		var selected_number = g_all_selected_tables[index_selected];
		var selected_character = g_all_selected_seats[index_selected];
		
		var element_circle = document.getElementById(circleId(selected_number, selected_character));
		if (element_circle != null)
		{
			element_circle.style["fill"] = "yellow";
		}		
	}
	
} // setSelectedProperties

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Selection functions /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Get Available Seats ///////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Returns the total number of available seats of the premises
function totalNumberSeats()
{
	var ret_number_seats = 0;

    var circle_nodes = document.getElementsByTagName("circle");
	
	ret_number_seats = circle_nodes.length;

	return ret_number_seats;
	
} // totalNumberSeats

// Returns all available seats as an array of table numbers or seat characters
// Not yet used ......
function getAvailableSeatsArray(i_array_case)
{
	var ret_array = [];

	var circle_nodes = document.getElementsByTagName("circle");
	
	for (index_cir=0; index_cir<circle_nodes.length; index_cir++)
	{
		var element_cir = circle_nodes[index_cir];
		
		var id_cir_str = element_cir.id;
		
		var index_us = id_cir_str.indexOf("_");
		
		var table_number = id_cir_str.substring(0, index_us);
		
		var seat_char = id_cir_str.substring(index_us + 1, index_us + 2);
		
		var output_value = '';
        if ("number" == i_array_case)
        {
            output_value = table_number;
        }
        else if ("character" == i_array_case)
        {
            output_value = seat_char;
        }
        else if ("identity" == i_array_case)
        {
            output_value = id_cir_str;
        }
        else
        {
            alert("getAvailableSeatsArray Unknown i_array_case= " + i_array_case);
        }
		
		ret_array[index_cir] = output_value;
		
	}

	return ret_array;
	
} // getAvailableSeatsArray

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Get Available Seats /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Get Reservations //////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Returns an array of unique names, i.e. one person may have made many reservations
// and this person will only appear once in the output array
function getReservationUniqueNames()
{
    var all_unique_names = [];

    number_reservations = getNumberOfReservations();
	
	var index_name = 0;

    for (reservation_number=1; reservation_number<=number_reservations; reservation_number++)
    {
        var reservation_node = getReservationNode(reservation_number);
		
		var reservation_name = reservation_node.getElementsByTagName(g_tag_reservation_name)[0].childNodes[0].nodeValue; 
		
        if (!alreadyInArrayUniqueNames(reservation_name, all_unique_names))
        {
            all_unique_names[index_name] = reservation_name;
            index_name = index_name + 1;
        }	
    }
	
    return all_unique_names;
	
} // getReservationUniqueNames

// Returns true if the input name already is in the unique names array
function alreadyInArrayUniqueNames(i_name, i_all_unique_names)
{
    var ret_in_array = false;
	
    for (index_unique=0; index_unique<i_all_unique_names.length; index_unique++)
	{
        var current_name = i_all_unique_names[index_unique];
		
        if (current_name == i_name)
		{
            ret_in_array = true;
			
			break;
		}
	}
	
    return ret_in_array;
	
} // alreadyInArrayUniqueNames

// Returns an array of reservation nodes for a given name
function getReservationNameNodes(i_name)
{
    var all_name_nodes = new Array();

    number_reservations = getNumberOfReservations();
	
	var index_name = 0;

    for (reservation_number=1; reservation_number<=number_reservations; reservation_number++)
    {
        var reservation_node = getReservationNode(reservation_number);
		
		var reservation_name = reservation_node.getElementsByTagName(g_tag_reservation_name)[0].childNodes[0].nodeValue; 
		
		if (reservation_name == i_name)
		{
			all_name_nodes[index_name] = reservation_node;
			
			index_name = index_name + 1;
		}
    }
	
    return all_name_nodes;
	
} // getReservationNameNodes

// Returns an array of seat nodes for a given reservation node
function getReservationNameSeatNodes(i_reservation_node)
{
    var all_seat_nodes = new Array();
	
    if (null == i_reservation_node)
	{
        alert("getReservationNameSeatNodes Input reservation node is null");
	}

    var number_reserved_seats = getNumberOfReservedSeats(i_reservation_node);
	
	var index_name = 0;

    for (seat_number=1; seat_number<=number_reserved_seats; seat_number++)
    {
        var seat_node = getSeatNode(i_reservation_node, seat_number);
	    if (null == seat_node)
	    {
        alert("getReservationNameSeatNodes A seat node is null");
           return all_seat_nodes;
	    }
		
		all_seat_nodes[seat_number - 1] = seat_node;
    }
	
    return all_seat_nodes;
	
} // getReservationNameSeatNodes

// Returns the number of reserved seats for a given name
function getNumberOfSeatsForName(i_name)
{
    var ret_number = 0;
	
    var all_reservations_for_name = getReservationNameNodes(i_name);
	
	var n_reservations = all_reservations_for_name.length;
	if (n_reservations == 0)
	{
        ret_number = n_reservations;
        return ret_number;		
	}
	
	for (index_reservation=0; index_reservation<n_reservations; index_reservation++)
	{
        var current_reservation = all_reservations_for_name[index_reservation];
		
		var all_seats = getReservationNameSeatNodes(current_reservation);
		
		ret_number = ret_number + all_seats.length;
	}	
	
    return ret_number;
	
} // getNumberOfSeatsForName

// Returns the an array of table numbers or seat characters for a given name
function getReservationTablesOrSeats(i_name, i_case)
{
	var ret_output_array = [];
	
	var all_names = getArrayReservationData("name");	
	var all_seat_table_numbers = getArrayReservationData("number");
	var all_seat_characters = getArrayReservationData("character");
	var number_reservations = 	all_seat_characters.length;
	
	var index_out = 0;
	for (reservation_number=1; reservation_number<=number_reservations; reservation_number++)
	{
		var reserved_table_number = all_seat_table_numbers[reservation_number-1];
		var reserved_character = all_seat_characters[reservation_number-1];
		var reservation_name = all_names[reservation_number-1];		
        if (reservation_name == i_name)	
        {
            if (i_case == "number")
            {
                ret_output_array[index_out] = reserved_table_number;
            }
            else if (i_case == "character")
            {
                ret_output_array[index_out] = reserved_character;
            }
            else
            {
                alert("getReservationTablesOrSeats Not an inplemented i_case= " + i_case);
				
                return ret_output_array;
            }
			
			index_out = index_out + 1;
			
        } // Names equal

	} // reservation_number
	
	return ret_output_array;
	
} // getReservationName


// Returns the total number of reserverd seats
function totalNumberReservedSeats()
{
	var ret_number_seats = 0;
	
	number_reservations = getNumberOfReservations();
	
	for (reservation_number=1; reservation_number<=number_reservations; reservation_number++)
	{
		var reservation_node = getReservationNode(reservation_number);
		
		var number_reserved_seats = getNumberOfReservedSeats(reservation_node);
		
		ret_number_seats = ret_number_seats + number_reserved_seats;	
	}		
	
	return ret_number_seats;
	
} // totalNumberReservedSeats


// Returns true if a seat is free
function seatIsFree(i_table_number, i_seat_char)
{
	var ret_seat_is_free = "true";
	
	var all_seat_table_numbers = getArrayReservationData("number");
	var all_seat_characters = getArrayReservationData("character");
	var number_reservations = 	all_seat_characters.length;
	
	for (reservation_number=1; 	reservation_number<=number_reservations; reservation_number++)
	{
		var reserved_table_number = all_seat_table_numbers[reservation_number-1];
		var reserved_character = all_seat_characters[reservation_number-1];
		
		if (i_table_number == reserved_table_number && i_seat_char == reserved_character)
		{
			ret_seat_is_free = "false";
		}
	}
	
	return ret_seat_is_free;
	
} // seatIsFree

// Returns the name of the person that reserved the seat
function getReservationName(i_table_number, i_seat_char)
{
	var ret_reservation_name = "Undefined name";
	
	/*
	var seat_free = seatIsFree(i_table_number, i_seat_char);
	if (seat_free == "free" )
	{
	   ret_reservation_name = "Sitzplatz ist frei!";
       return ret_reservation_name;   
	}
	*/
	
	var all_names = getArrayReservationData("name");	
	var all_seat_table_numbers = getArrayReservationData("number");
	var all_seat_characters = getArrayReservationData("character");
	var number_reservations = 	all_seat_characters.length;
	
	for (reservation_number=1; reservation_number<=number_reservations; reservation_number++)
	{
		var reserved_table_number = all_seat_table_numbers[reservation_number-1];
		var reserved_character = all_seat_characters[reservation_number-1];
		
		if (i_table_number == reserved_table_number && i_seat_char == reserved_character)
		{
			ret_reservation_name = all_names[reservation_number-1];
		}
	}
	
	return ret_reservation_name;
	
} // getReservationName

// Returns the circle id
function circleId(i_table_number, i_seat_char)
{
	return i_table_number + "_" + i_seat_char;
	
} // circleId

// Returns the circle text id
function circleTextId(i_table_number, i_seat_char)
{
	return "cir_text_" + i_table_number + "_" + i_seat_char;
	
} // circleTextId


// Get reservations data as an array of names, remarks, numbers or characters 
function getArrayReservationData(i_case)
{
	var ret_all_seat_data = new Array(); 
	
	var index_add = 0;
	
	number_reservations = getNumberOfReservations();
	
	for (reservation_number=1; reservation_number<=number_reservations; reservation_number++)
	{
		var reservation_node = getReservationNode(reservation_number);
		
		var number_reserved_seats = getNumberOfReservedSeats(reservation_node);
		
		for (reserved_seat_number=1; reserved_seat_number<=number_reserved_seats; reserved_seat_number++)
		{
			var seat_data;
			
			if ("number" == i_case)
			{
				seat_data = getSeatTableNumber(reservation_node, reserved_seat_number);
			}
			else if ("character" == i_case)
			{
				seat_data = getSeatCharacter(reservation_node, reserved_seat_number);
			}
			else if ("name" == i_case)
			{
				seat_data = reservation_node.getElementsByTagName(g_tag_reservation_name)[0].childNodes[0].nodeValue; 
			}	
			else if ("remark" == i_case)
			{
				seat_data = reservation_node.getElementsByTagName(g_tag_reservation_remark)[0].childNodes[0].nodeValue; 
			}						
			else
			{
				alert("Not implemented i_case= " + i_case);
			}
			
			ret_all_seat_data[index_add] = seat_data;
			
			index_add = index_add + 1;
						
		} // reserved_seat_number
		
	} // reservation_number
	
	return ret_all_seat_data;
	
} // getArrayReservationData


// Get number of reservations
function getNumberOfReservations()
{
	var ret_number_reservations = -12345;
	
	var all_reservation_nodes = g_reservations_xml.getElementsByTagName(g_tag_reservation);
	
	ret_number_reservations = all_reservation_nodes.length;
	
	return ret_number_reservations;
	
} // getNumberOfReservations

// Get a reservation node defined by the reservation number
function getReservationNode(i_reservation_number)
{
    var ret_reservation_node = null;
	
	var all_reservation_nodes = g_reservations_xml.getElementsByTagName(g_tag_reservation);

	  for (index_reservation = 0; index_reservation < all_reservation_nodes.length; index_reservation++) 
      { 
         if (index_reservation == i_reservation_number - 1)
	     {
	        ret_reservation_node = all_reservation_nodes[index_reservation];	
	     }
       }
	   
	   return ret_reservation_node;
	   
} // getReservationNode

// Get number of reserved seats
function getNumberOfReservedSeats(i_reservation_node)
{
	var ret_number_seats = -12345;
	
	var all_seats = i_reservation_node.getElementsByTagName(g_tag_seat);
	
	ret_number_seats = all_seats.length;
	
	return ret_number_seats;
	
} // getNumberOfReservedSeats

// Get seat node defined by reservation seat number
function getSeatNode(i_reservation_node, i_seat_number)
{
	var ret_seat_node = null;
	
	var all_seats = i_reservation_node.getElementsByTagName(g_tag_seat);
	
	var number_seats = all_seats.length;
	
	for (index_seat=0; index_seat<number_seats; index_seat++)
	{
		 if (index_seat == i_seat_number - 1)
	     {
	        ret_seat_node = all_seats[index_seat];	
	     }
	}
	
	return ret_seat_node;
	
} // getSeatNode

// Returns the table number for a given reservation node and a given reservation seat number
function getSeatTableNumber(i_reservation_node, i_seat_number)
{
	var ret_table_number = -12345;
	
	var seat_node = getSeatNode(i_reservation_node, i_seat_number);
	if (null == seat_node)
	{
		return ret_table_number;
	}
	
	ret_table_number = seat_node.getElementsByTagName(g_tag_seat_table_number)[0].childNodes[0].nodeValue; 
	
	return ret_table_number;
	
} // getSeatTableNumber

// Returns the seat character for a given reservation node and a given reservation seat number
function getSeatCharacter(i_reservation_node, i_seat_number)
{
	var ret_seat_character = "";
	
	var seat_node = getSeatNode(i_reservation_node, i_seat_number);
	if (null == seat_node)
	{
		return ret_seat_character;
	}
	
	ret_seat_character = seat_node.getElementsByTagName(g_tag_seat_character)[0].childNodes[0].nodeValue; 
	
	return ret_seat_character;
	
} // getSeatCharacter


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Get Reservations ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Remove Selections /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Remove reservation nodes for a given name
function removeReservationNodesForName(i_name)
{
    var all_reservations_to_delete = getReservationNameNodes(i_name);
	
	for (index_reservation=0; index_reservation<all_reservations_to_delete.length; index_reservation++)
	{
		var reservation_to_delete = all_reservations_to_delete[index_reservation];
		
		changeColorsOfCircles(reservation_to_delete);
		
		g_reservations_xml.documentElement.removeChild(reservation_to_delete);
		
        //QQQQ g_reservation_added_deleted_xml_object = "true";
	
        //QQQ setTextAndColorSaveReservationsExitButton();
	}
	
} // removeReservationNodesForName

// Remove a single seat node defined by table number and seat character
// Remove the whole reservation node for the case that the node only
// contains one seat node
function removeSingleSeatNode(i_table, i_seat)
{
    number_reservations = getNumberOfReservations();
	
	var reservation_node_with_input_element = null;
	var n_seats_for_reservation_node_with_input_element = -12345;
	var seat_node_to_delete = null;
	
    for (reservation_number=1; reservation_number<=number_reservations; reservation_number++)
    {
        var reservation_node = getReservationNode(reservation_number);
		
        var number_reserved_seats = getNumberOfReservedSeats(reservation_node);
		
        for (reserved_seat_number=1; reserved_seat_number<=number_reserved_seats; reserved_seat_number++)
		{
            var table_number = getSeatTableNumber(reservation_node, reserved_seat_number);
			
            var table_char = getSeatCharacter(reservation_node, reserved_seat_number);	
			
			if (i_table == table_number && i_seat == table_char)
			{
				reservation_node_with_input_element = reservation_node;
				
				n_seats_for_reservation_node_with_input_element = number_reserved_seats;
				
				seat_node_to_delete = getSeatNode(reservation_node, reserved_seat_number);
				
				break;
			}
		} // reserved_seat_number
		
	} // reservation_number
	
	if (n_seats_for_reservation_node_with_input_element > 1 )
	{
		changeColorOfSingleCircle(seat_node_to_delete);
		
		// Delete only the reserved seat 
		reservation_node_with_input_element.removeChild(seat_node_to_delete);
		
        //QQQ g_reservation_added_deleted_xml_object = "true";
	
        //QQQ setTextAndColorSaveReservationsExitButton();
	
	}
	else if (1 == n_seats_for_reservation_node_with_input_element)
	{
		changeColorOfSingleCircle(seat_node_to_delete);
		
		// Delete the reserved seat by deleting the reservation object 
		g_reservations_xml.documentElement.removeChild(reservation_node_with_input_element);	

        //QQQ g_reservation_added_deleted_xml_object = "true";
	
        //QQQ setTextAndColorSaveReservationsExitButton();		
	}
	
} // removeSingleSeatNode

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Remove Selections ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Set Colors ////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Change colors for the circles that no longer are reserved
function changeColorsOfCircles(i_reservation_node)
{
    var number_reserved_seats = getNumberOfReservedSeats(i_reservation_node);
		
    for (reserved_seat_number=1; reserved_seat_number<=number_reserved_seats; reserved_seat_number++)
    {
        var table_number = getSeatTableNumber(i_reservation_node, reserved_seat_number);
			
        var seat_char = getSeatCharacter(i_reservation_node, reserved_seat_number);	
		
		var cir_id = circleId(table_number, seat_char);
		
		var element_circle = document.getElementById(cir_id);
		if (element_circle != null)
		{
			element_circle.style["fill"] = g_color_free_seat;
		}	
		
	} // reserved_seat_number		
	
} // changeColorsOfCircles

// Change colors for a single circle that no longer is reserved
function changeColorOfSingleCircle(i_seat_node_to_delete)
{
    var table_number = i_seat_node_to_delete.getElementsByTagName(g_tag_seat_table_number)[0].childNodes[0].nodeValue; 
	
    var seat_character = i_seat_node_to_delete.getElementsByTagName(g_tag_seat_character)[0].childNodes[0].nodeValue; 
	
	var cir_id = circleId(table_number, seat_character);
	
    var element_circle = document.getElementById(cir_id);
    if (element_circle != null)
    {
        element_circle.style["fill"] = g_color_free_seat;
    }	
		
} // changeColorsOfCircles

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Set Colors //////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////




