// File: Reservation\scripts\ReservationEmail.js
// TODO Remove this file Email request for reservation no longer
// Open the page send reservation
function openPageSendReservation()
{
    var selected_seats_str = getSelectedSeats();
	
	// https://stackoverflow.com/questions/1830347/quickest-way-to-pass-data-to-a-popup-window-i-created-using-window-open
	
	// Save it also as session data that can be used by Internet Explorer and Microsoft Edge
	sessionStorage.setItem(g_session_storage_email_make_reservation_seats, selected_seats_str);	
	sessionStorage.setItem(g_session_storage_email_make_reservation_concert, getConcertTitleText());	
	
	var email_window = window.open("ReservationEmail.htm");
	
	email_window.passed_data_concert_date_str =  getConcertTitleText();
	email_window.passed_data_selected_seats_str = selected_seats_str;
	
} // openPageSendReservation

// Check passed data. Call as onload for ReservationEmail.htm
function checkPassedDataForEmail()
{
	concert_date_band = getConcertDateAndBandForPopupWindow();
	all_reservations = getAllReservationsForPopupWindow();
	
	// if (concert_date_band == undefined || all_reservations == undefined)
	if (concert_date_band == undefined)	
	{
		var error_msg = g_error_opening_window + "\nBitte noch einmal " + g_send_email_text + " wählen";
		
		alert(error_msg);
		
		window.close();
	}	
	
} // checkPassedDataForEmail

// Get all selected seats
function getAllSelectedSeatsForPopupWindow()
{
	ret_passed_data_str = window.passed_data_selected_seats_str;
	
	if (null == ret_passed_data_str)
	{
		ret_passed_data_str = sessionStorage.getItem(g_session_storage_email_make_reservation_seats);
	}
	
    return ret_passed_data_str;	

} // getAllSelectedSeatsForPopupWindow

// Get concert date and band
function getConcertDateAndBandForPopupWindow()
{
	ret_passed_data_str = window.passed_data_concert_date_str;
	
	if (null == ret_passed_data_str)
	{
		ret_passed_data_str = sessionStorage.getItem(g_session_storage_email_make_reservation_concert);
	}
	
    return ret_passed_data_str;	

} // getConcertDateAndBandForPopupWindow


// Send reservation Email
function sendReservationEmail()
{
	var reservation_name = document.getElementById("reservation_name").value;
	var reservation_email = document.getElementById("reservation_email").value;
	
	if (false == checkNameAndEmail(reservation_name, reservation_email))
	{
		return;
	}
	
	var seats_br = getAllSelectedSeatsForPopupWindow();
	var seats_n = replaceBr(seats_br);
	
	// https://stackoverflow.com/questions/21028939/mailto-using-javascript
    var email_message = "";
	email_message = email_message + "Reservation\n";
	email_message = email_message + "-------------\n";
	email_message = email_message + "Name: " + reservation_name + "\n";
	email_message = email_message + "E-Mail: " + reservation_email + "\n";
	email_message = email_message + "\n";
	email_message = email_message + g_requested_seats_text + " \n";
	email_message = email_message + seats_n + "\n";
	email_message = email_message + "\n\n";
	email_message = email_message + g_reservation_note + " \n";
			
    var email_subject = g_title_jazz_live_aarau_reservation + getConcertDateAndBandForPopupWindow();
	
    document.location.href = "mailto:gunnar@jazzliveaarau.ch?subject="
        + encodeURIComponent(email_subject)
        + "&body=" + encodeURIComponent(email_message);	
		
} // sendReservationEmail

// Checks that name and email are OK. 
// Message to user and returns false if not
function checkNameAndEmail(i_reservation_name, i_reservation_email)
{
	if (i_reservation_name.length == 0 && i_reservation_email.length == 0)
	{
		alert(g_error_name_and_email_missing);
		return false;
	}
	else if (i_reservation_name.length == 0)
	{
		alert(g_error_name_missing);
		return false;
	}
	else if (i_reservation_email.length == 0)
	{
		alert(g_error_email_missing);
		return false;
	}	
	
    return true;
	
} // checkNameAndEmail

// Replaces <BR> with \n
function replaceBr(i_input_str)
{
	var ret_str = i_input_str;
	for (index_rep=0; index_rep<20; index_rep++)
	{
	  ret_str = ret_str.replace("<br>", "\n");
	}
	
	return ret_str;
	
} // replaceBr


