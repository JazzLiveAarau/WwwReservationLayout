// File: Reservation\scripts\ReservationEvents.js
// All buttons and their events are defined in this file

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Global Parameters /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////


// Wall thickness in pixel
var g_wall_thickness_pixel = parseInt(g_wall_thickness*g_scale_dimension);

var g_button_height_pixel = g_wall_thickness_pixel - 8;

var g_button_x_delta_pixel = 10;

var g_button_y_delta_pixel = 5;

var g_button_button_delta_pixel = 25;

var g_text_x_delta_pixel = 10;
var g_text_y_delta_pixel = g_wall_thickness_pixel - 15;

// Microsoft Explorer and Microsoft Edge require that width and height are defined
// Every width must be calculated and set 
var g_text_image_height = '26'; // g_button_height_pixel - 3;


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Global Parameters /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Save Reservation (Or Send Email) //////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Add button for the sending of a reservation email
function addButtonSendEmail()
{
    // Return text defining the button
    var ret_button_email_svg = '';
	
    // Return empty string if not for the make or request reservation case	
	if (g_user_is_concert_visitor == "false")
	{
		return ret_button_email_svg;
	}
	
   var text_image_reserve_select_undef = g_layout_xml.getElementsByTagName(g_tag_text_image_reserve_select_undef)[0].childNodes[0].nodeValue;	
	// g_tag_text_image_reserve_select_undef g_tag_text_image_select_seats g_tag_text_image_reserve_seats

	// Position and dimension of the button	
	var button_width_pixel = 220;
	var button_x_pixel = g_premises_width_max_pixel - button_width_pixel - g_button_x_delta_pixel;
	var button_y_pixel = g_button_y_delta_pixel;
	
	// The rectangle defining the button
    var rect_svg = '<rect ' + ' x=' + button_x_pixel + ' y=' + button_y_pixel
      + ' width=' + button_width_pixel + ' height=' + g_button_height_pixel 
      + ' id= "button_send_email" onmousedown="mouseDownSendEmailOrMakeReservation(  )" '	  
      + g_style_button +  ' />';
    ret_button_email_svg = ret_button_email_svg + rect_svg + '\n'; 

    // Position for the text	
    var text_x_pixel = button_x_pixel + g_text_x_delta_pixel;
    var text_y_pixel = button_y_pixel + g_text_y_delta_pixel;
	  
	// Text SVG object for the button
    var text_svg = '<text id= "text_send_email" onmousedown="mouseDownSendEmailOrMakeReservationText(  )" ' + g_font_button + 
                   ' x=' + text_x_pixel + ' y=' + text_y_pixel + g_style_cursor_pointer + ' fill=' + g_table_text_color + '>' + "..." + '</text>';
    // ret_button_email_svg = ret_button_email_svg + text_svg + '\n'; 
	
	
    // Position for the image	
    var image_x_pixel = button_x_pixel + g_text_x_delta_pixel;
    var image_y_pixel = button_y_pixel + 1;
	
	// Microsoft Explorer and Microsoft Edge require that width and height are defined
    var text_image_width = '168';
	
    var stage_image_svg = '<image id= "text_image_send_email" onmousedown="mouseDownSendEmailOrMakeReservationText(  )" x= ' + image_x_pixel + ' y= ' + image_y_pixel + 
	                ' width=' + text_image_width + 'px' +
	                ' height=' + g_text_image_height + 'px' +
                    ' xlink:href=' + text_image_reserve_select_undef + g_style_cursor_pointer + '>' +
                    ' <title>' + g_title_text_image_reserve_seats + '</title> ' + 
                    ' </image>';
							
    ret_button_email_svg = ret_button_email_svg + stage_image_svg + '\n'; 	
   
    // Return the SVG string defining the button    
    return ret_button_email_svg;
	
} // addButtonSendEmail

// width="168px"
// User clicked button (rectangle) send a reservation request or make a reservation
function mouseDownSendEmailOrMakeReservation(  )
{
    if (g_user_is_concert_visitor != "true")
    {
        // Programming error
        alert("mouseDownSendEmailOrMakeReservation The user is not an administrator");
        return;
    }
	
    var seats_are_selected = seatsAreSelected();
    if (seats_are_selected == "false")
    {
        alert(g_warning_msg_no_seats_selected);
        return;
    }
	
    if ("true" == g_user_request_with_email)
    {
        openPageSendReservation(); // ReservationEmail.js		
    }
    else
    {
        if (g_current_reservation_name.length == 0)
        {
		    // Name is used as flag. This may happen after guest has made a reservation, that has been added and an email was sent
		    alert(g_error_msg_name_not_set_close_this_window);
			
			removeAllMakeReservationElements();
			
		    return;
        }
		
        // Reload XML reservation object and check selections before saving
        reloadReservationXMLDocCallSaveXmlFileWithPhp(g_url_file_concert_reservation_xml_name); // Reservation.js
    }
	
} // mouseDownSendEmailOrMakeReservation

// User clicked button (rectangle) make a reservation
function mouseDownSendEmailOrMakeReservationText(  )
{
	mouseDownSendEmailOrMakeReservation(  );
	
} // mouseDownSendEmailOrMakeReservationText


// Remove all elements in MakeReservation.htm
function removeAllMakeReservationElements()
{
    removeElement('LayoutSalmen');
	
	removeElement('id_sponsor_image');
	
	removeElement(g_id_reservation_show_concert_date_band);
	
    // setElementValue('id_reservation_close_window_text', g_close_window_delete_temporary_files);
	
    setElementValue('id_reservation_close_window_text', getButtonCloseWindow());
	
} // removeAllMakeReservationElements

// Returns HTML string with a close button.
function getButtonCloseWindow()
{
    var ret_close_button = '';
	
    ret_close_button = ret_close_button + '<button';
    ret_close_button = ret_close_button + ' onclick=';
    ret_close_button = ret_close_button + '"closeThisWindow()" ';
    ret_close_button = ret_close_button + ' style="height:40px;font-size:22pt;" ';
    ret_close_button = ret_close_button + '>';

    ret_close_button = ret_close_button + '<b>Schliessen</b>';
	
    ret_close_button = ret_close_button + '</button><br>';

    return ret_close_button;
	
} // getButtonCloseWindow

// Close this window
function closeThisWindow()
{
    window.close();
	
} // closeThisWindow

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Save Reservation (Or Send Email) ////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start List Reservations /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Add button list reservations
function addButtonListReservations()
{
    // Return text defining the button
    var ret_button_list_svg = '';
	
    // Return empty string if not for the add reservation case	
	if (g_user_is_concert_visitor == "true")
	{
		return ret_button_list_svg;
	}
	
    var text_image_reservation_list = g_layout_xml.getElementsByTagName(g_tag_text_image_reservation_list)[0].childNodes[0].nodeValue;	
	
	// Position and dimension of the button	
	var button_width_pixel = 220;
	var button_x_pixel = g_premises_width_max_pixel - button_width_pixel - g_button_x_delta_pixel;
	var button_y_pixel =  g_button_height_pixel + g_button_button_delta_pixel + g_button_y_delta_pixel;
	
	// The rectangle defining the button
    var rect_svg = '<rect ' + ' x=' + button_x_pixel + ' y=' + button_y_pixel
      + ' width=' + button_width_pixel + ' height=' + g_button_height_pixel 
      + ' id= "button_list_reservations" onmousedown="mouseDownListReservations(  )" '	  
      + g_style_button +  ' />';
    ret_button_list_svg = ret_button_list_svg + rect_svg + '\n'; 
	  
	// Position for the text
    var text_x_pixel = button_x_pixel + g_text_x_delta_pixel;
    var text_y_pixel = button_y_pixel + g_text_y_delta_pixel;

	// Text SVG object for the button
    var text_svg = '<text onmousedown="mouseDownListReservationsText(  )" ' + g_font_button + 
                   ' x=' + text_x_pixel + ' y=' + text_y_pixel 
				   + g_style_cursor_pointer + ' fill=' + g_table_text_color + '>' + g_button_list_reservations_text + '</text>';
    // ret_button_list_svg = ret_button_list_svg + text_svg + '\n'; 
	
    // Position for the image	
    var image_x_pixel = button_x_pixel + g_text_x_delta_pixel;
    var image_y_pixel = button_y_pixel + 1;
	
	// Microsoft Explorer and Microsoft Edge require that width and height are defined
    var text_image_width = '188';
	
    var list_image_svg = '<image id= "id_text_image_reservation_list" onmousedown="mouseDownListReservationsText(  )" x= ' + image_x_pixel + ' y= ' + image_y_pixel + 
	                ' width=' + text_image_width + 'px' +
	                ' height=' + g_text_image_height + 'px' +
                    ' xlink:href=' + text_image_reservation_list + g_style_cursor_pointer + '>' +
                    ' <title>' + g_title_text_image_reservation_list + '</title> ' + 
                    ' </image>';	
    ret_button_list_svg = ret_button_list_svg + list_image_svg + '\n'; 	
   	  
    // Return the SVG string defining the button 
    return ret_button_list_svg;
   
} // addButtonListReservations

// User clicked button (rectangle) list reservations or display names for the web search page
// 1. Case search web page: Call ReservationModalPopup.setContentOpenClickDisplayNames
// 2. Reload the XML reservation file, set reserved properties and call openPageListReservations
//    Other users may have added reservations since this web page was loaded
//    Call of reloadReservationXMLDocSetReservationPropertiesListOrPrint
function mouseDownListReservations(  )
{
	if (g_user_is_concert_visitor == "true")
	{
		alert("mouseDownListReservations User is not an administrator");
		return;
	}

    reloadReservationXMLDocSetReservationPropertiesListOrPrint("list") // Reservation.js
	
} // mouseDownListReservations

// User clicked text list reservations
function mouseDownListReservationsText(  )
{
	mouseDownListReservations(  )
	
} // mouseDownListReservationsText

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End List Reservations ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Print Reservations ////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Add button print reservations
function addButtonPrintReservations()
{
    // Return text defining the button
    var ret_button_print_svg = '';
	
    // Return empty string if not for the add reservation case	
	if (g_user_is_concert_visitor == "true")
	{
		return ret_button_print_svg;
	}

    var text_image_reservation_print = g_layout_xml.getElementsByTagName(g_tag_text_image_reservation_print)[0].childNodes[0].nodeValue;
	
	// Position and dimension of the button
	var button_width_pixel = 220;
	var button_x_pixel = g_premises_width_max_pixel - button_width_pixel - g_button_x_delta_pixel;
	var button_y_pixel =  g_button_y_delta_pixel;	
	
	// The rectangle defining the button
    var rect_svg = '<rect ' + ' x=' + button_x_pixel + ' y=' + button_y_pixel
      + ' width=' + button_width_pixel + ' height=' + g_button_height_pixel 
      + ' id= "button_print_reservations" onmousedown="mouseDownPrintReservations(  )" '	  
      + g_style_button +  ' />';
    ret_button_print_svg = ret_button_print_svg + rect_svg + '\n'; 
	  
	// Position for the text
    var text_x_pixel = button_x_pixel + g_text_x_delta_pixel;
    var text_y_pixel = button_y_pixel + g_text_y_delta_pixel;

	// Text SVG object for the button
    var text_svg = '<text onmousedown="mouseDownPrintReservationsText(  )" ' + g_font_button + 
                   ' x=' + text_x_pixel + ' y=' + text_y_pixel 
				   + g_style_cursor_pointer + ' fill=' + g_table_text_color + '>' + g_button_print_reservations_text + '</text>';
    // ret_button_print_svg = ret_button_print_svg + text_svg + '\n'; 
   	  
    // Position for the image	
    var image_x_pixel = button_x_pixel + g_text_x_delta_pixel;
    var image_y_pixel = button_y_pixel + 1;
		  
	// Microsoft Explorer and Microsoft Edge require that width and height are defined
    var text_image_width = '206';		  
		  
    var print_image_svg = '<image id= "id_text_image_reservation_print" onmousedown="mouseDownPrintReservationsText(  )" x= ' + image_x_pixel + ' y= ' + image_y_pixel + 
	                ' width=' + text_image_width + 'px' +
	                ' height=' + g_text_image_height + 'px' +
                    ' xlink:href=' + text_image_reservation_print + g_style_cursor_pointer + '>' +
                    ' <title>' + g_title_text_image_reservation_print + '</title> ' + 
                    ' </image>';	
    ret_button_print_svg = ret_button_print_svg + print_image_svg + '\n'; 		  
	  
	  
    // Return the SVG string defining the button 
    return ret_button_print_svg;
   
} // addButtonPrintReservations

// User clicked button (rectangle) print reservations
// 1. Reload the XML reservation file, set reserved properties and call openPageReservationPrint
//    Other users may have added reservations since this web page was loaded
//    Call of reloadReservationXMLDocSetReservationProperties
function mouseDownPrintReservations(  )
{
	if (g_user_is_concert_visitor == "true")
	{
		alert("mouseDownPrintReservations User is not an administrator");
		return;
	}

    if (g_for_web_page_search == "true")
    {
        g_modal_popup_window.setContentOpenClickDisplayNames();

        return;
    }
	
    reloadReservationXMLDocSetReservationPropertiesListOrPrint("print") // Reservation.js
	
} // mouseDownPrintReservations

// User clicked text print reservations
function mouseDownPrintReservationsText(  )
{
	mouseDownPrintReservations(  )
	
} // mouseDownPrintReservationsText


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Print Reservations //////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Init Reservation //////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Add button initialise reservation
function addButtonInitReservation()
{
    // Return text defining the button
    var ret_button_init_svg = '';

    // Return empty string if not for the add reservation case	
	if (g_user_is_concert_visitor == "true")
	{
		return ret_button_init_svg;
	}
	
    var text_image_add_reservation = g_layout_xml.getElementsByTagName(g_tag_text_image_add_reservation)[0].childNodes[0].nodeValue;	

	// Position and dimension of the button
	var button_x_pixel = g_button_x_delta_pixel;
	var button_y_pixel =  g_button_y_delta_pixel;
	var button_width_pixel = 240;
	
	// The rectangle defining the button
    var rect_svg = '<rect ' + ' x=' + button_x_pixel + ' y=' + button_y_pixel
                + ' width=' + button_width_pixel + ' height=' + g_button_height_pixel 
                + ' id= "button_init_reservation" onmousedown="mouseDownInitReservation(  )" '	  
                + g_style_button +  ' />';
    ret_button_init_svg = ret_button_init_svg + rect_svg + '\n'; 
	  
    // Position for the text
    var text_x_pixel = button_x_pixel + g_text_x_delta_pixel;
    var text_y_pixel = button_y_pixel + g_text_y_delta_pixel;

	// Text SVG object for the button
    var text_svg = '<text id= "text_init_reservation"  onmousedown="mouseDownInitReservationText(  )" ' + g_font_button + 
                   ' x=' + text_x_pixel + ' y=' + text_y_pixel + g_style_cursor_pointer + ' fill=' + g_table_text_color + '>' 
				   + g_button_add_reservation_text + '</text>';
    // ret_button_init_svg = ret_button_init_svg + text_svg + '\n'; 


    // Position for the image	
    var image_x_pixel = button_x_pixel + g_text_x_delta_pixel;
    var image_y_pixel = button_y_pixel + 1;
	
	// Microsoft Explorer and Microsoft Edge require that width and height are defined
    var text_image_width = '227';
			  
    var add_image_svg = '<image id= "id_text_add_reservation_text" onmousedown="mouseDownInitReservationText(  )" x= ' + image_x_pixel + ' y= ' + image_y_pixel + 
	                ' width=' + text_image_width + 'px' +
	                ' height=' + g_text_image_height + 'px' +
                    ' xlink:href=' + text_image_add_reservation + g_style_cursor_pointer + '>' +
                    ' <title>' + g_title_text_image_add_reservation + '</title> ' + 
                    ' </image>';	
    ret_button_init_svg = ret_button_init_svg + add_image_svg + '\n'; 	

    // Return the SVG string defining the button 
    return ret_button_init_svg;   
   
} // addButtonInitReservation


// Administrator clicked button rectangle initialize reservation
// 1. Input of name, email and remark. Calls of prompt
// 2. Init for selections (arrays, ...). Call of initSelectSeatsForReservation
// 3. Set text for the save reservation button. Call of setTextForSaveReservationButton
// 4. Reload the XML reservation file and set reserved properties
//    Other users may have added reservations since this web page was loaded
//    Call of reloadReservationXMLDocSetReservationProperties
function mouseDownInitReservation(  )
{
	if (g_user_is_concert_visitor == "true")
	{
		alert("mouseDownInitReservation User is not an administrator");
		return;
	}
	
	if (g_delete_reservation_mode == "true")
	{
		alert(g_error_msg_init_resrvation_not_allowed_in_delete_mode);
		return;
	}		

    // Return if not for the add reservation case
	if (g_current_reservation_name.length > 0)
	{
		alert(g_error_msg_select_mode);
		return;		
	}	
	
	// TODO Use getSetNameEmailRemark
	
    var prompt_name = prompt(g_list_text_reservation_name, "");

    var prompt_name_trimmed = trimReservationString(prompt_name);

    if (prompt_name_trimmed.length == 0)
    {
        alert(g_error_name_missing );	
        return;		
    }
	
    if (!twoOrMoreWordsInString(prompt_name_trimmed))
    {
        alert(g_error_surname_or_familyname_missing);	
        return;		
    }	   

    var error_illegal_char = stringContainsIllegalCharacter(prompt_name_trimmed, ' im Name.');
	if (error_illegal_char.length > 0)
	{
        alert(error_illegal_char);	
        return;			
	}		
   
   var prompt_email = prompt(g_list_text_reservation_email, "");   

   var prompt_email_trimmed = trimReservationString(prompt_email);

   if (prompt_email_trimmed.length > 0)
   {
    if (!validEmailAddress(prompt_email_trimmed))
    {
        alert(g_error_email_not_valid);	
        return;				
    }    
    error_illegal_char = stringContainsIllegalCharacter(prompt_email_trimmed, 'in einer E-Mail-Adresse.');
	if (error_illegal_char.length > 0)
	{
        alert(error_illegal_char);	
        return;			
	}	  
   }
   
   var prompt_remark = prompt(g_list_text_reservation_remark, "");
   
   var prompt_remark_trimmed = trimReservationString(prompt_remark);

   if (prompt_remark_trimmed.length > 0)
   {
	error_illegal_char = stringContainsIllegalCharacter(prompt_remark_trimmed, 'in einer Bemerkung.');
	if (error_illegal_char.length > 0)
	{
        alert(error_illegal_char);	
        return;			
	}
   }
   
   initSelectSeatsForReservation(prompt_name_trimmed, prompt_email_trimmed, prompt_remark_trimmed);
   
   setTextForSaveReservationButton(0);   
   
   reloadReservationXMLDocSetReservationProperties(); // Reservation.js   
	
} // mouseDownInitReservation

// User clicked button text initialize reservation
function mouseDownInitReservationText(  )
{
	mouseDownInitReservation(  );
	
} // mouseDownInitReservation

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Init Reservation ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Input Reservation Data ////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// The function gets reservation name, email and remark and stores them in the global variables
// g_current_reservation_name, g_current_reservation_email and g_current_reservation_remark
function getSetNameEmailRemark()
{
    var prompt_name = prompt("Name", "");

    if (prompt_name.length == 0)
    {
	  alert("Name muss angegeben werden");
	  return false;
    }	
   
   var prompt_email = prompt("E-Mail", "");   
   
   var prompt_remark = prompt("Bemerkung", ""); 
   
   setNameEmailRemarkGlobalVariables(prompt_name, prompt_email, prompt_remark);   
	
   return true;
   
} // getSetNameEmailRemark

// Set the global reservation variables from form StartReservation.htm
// Open the web page MakeReservation.htm and pass user input data to this page
// It is the onload function MainMakeReservation that retrieves the passed data 
// 1. Get data from input elements name, email and remark of  MakeReservation.htm. 
//    Calls of document.getElementById
// 2. Check that name and email are set and that email is a valid address
// 3. Get the requsted concert number from the dropdown element
// 4. Set the data that shall be passed to MakeReservation.htm as member variables of this page
//    Save also as sessionStorage data because of Internet Explorer and Microsoft Edge
// 5. Clear name, email and remark. Calls of setInputElementValue.
function setNameEmailRemarkFromFormOpenMakeReservation(i_add_to_xml_file_name)
{
    var form_name = "";

    var element_name = document.getElementById("page_start_reservation_name");
    if (element_name != null)
    {
        form_name = element_name.value;
	}
    else
    {
        alert("setNameEmailRemarkFromForm Not an existing element id= page_start_reservation_name" );
        return;
    }
	
    var form_name_trimmed = trimReservationString(form_name);
	
    var form_email = "";

    var element_email = document.getElementById("page_start_reservation_email");
    if (element_email != null)
    {
        form_email = element_email.value;
	}
    else
    {
        alert("setNameEmailRemarkFromForm Not an existing element id= page_start_reservation_email" );
        return;
    }

     var form_email_trimmed = trimReservationString(form_email);
	
    var form_remark = "";

    var element_remark = document.getElementById("page_start_reservation_remark");
    if (element_remark != null)
    {
        form_remark = element_remark.value;
	}
    else
    {
        alert("setNameEmailRemarkFromForm Not an existing element id= page_start_reservation_remark" );
        return;
    }	
	
    var form_remark_trimmed = trimReservationString(form_remark);
	
    if (form_name_trimmed.length == 0 && form_email_trimmed.length == 0)
    {
        alert(g_error_name_and_email_missing );	
        return;		
    }

    if (form_name_trimmed.length == 0)
    {
        alert(g_error_name_missing );	
        return;		
    }
	
    if (!twoOrMoreWordsInString(form_name_trimmed))
    {
        alert(g_error_surname_or_familyname_missing);	
        return;		
    }	

    if (form_email_trimmed.length == 0)
    {
        alert(g_error_email_missing);	
        return;		
    }	

    if (!validEmailAddress(form_email_trimmed))
    {
        alert(g_error_email_not_valid);	
        return;				
    }
	
	var error_illegal_char = stringContainsIllegalCharacter(form_remark_trimmed, 'in einer Bemerkung.');
	if (error_illegal_char.length > 0)
	{
        alert(error_illegal_char);	
        return;			
	}
	
	error_illegal_char = stringContainsIllegalCharacter(form_email_trimmed, 'in einer E-Mail-Adresse.');
	if (error_illegal_char.length > 0)
	{
        alert(error_illegal_char);	
        return;			
	}	
	
	error_illegal_char = stringContainsIllegalCharacter(form_name_trimmed, ' im Name.');
	if (error_illegal_char.length > 0)
	{
        alert(error_illegal_char);	
        return;			
	}		

    // Get the concert number from the concert dropdown TODO
    var requested_concert_number = '0'; // Next concert
	
    // https://www.dyn-web.com/tutorials/forms/select/selected.php
    
	var drop_down_element = document.getElementById('id_dropdown_concerts'); //QQQ document.getElementsByName("dropdown_concerts")[0].childNodes[0];
	if (drop_down_element != null)
	{
		var selected_index = drop_down_element.selectedIndex;
        requested_concert_number = drop_down_element.value;
	}	

	// Save it also as session data that can be used by Internet Explorer and Microsoft Edge
	sessionStorage.setItem(g_session_storage_add_to_xml_file_name, i_add_to_xml_file_name);	
	sessionStorage.setItem(g_session_storage_reservation_name, form_name_trimmed);
	sessionStorage.setItem(g_session_storage_reservation_email, form_email_trimmed);
	sessionStorage.setItem(g_session_storage_reservation_remark, form_remark_trimmed);
	sessionStorage.setItem(g_session_storage_requested_concert_number, requested_concert_number);


    setInputElementValue('page_start_reservation_name', '');
    setInputElementValue('page_start_reservation_email', '');
    setInputElementValue('page_start_reservation_remark', '');
	
	// Open window MakeReservation.htm
	var make_window = open("MakeReservation.htm");
	
	// Pass the data to the opened window
	make_window.passed_data_add_to_xml_file_name = i_add_to_xml_file_name;
    make_window.passed_data_reservation_name = form_name_trimmed;
    make_window.passed_data_reservation_email = form_email_trimmed;
    make_window.passed_data_reservation_remark = form_remark_trimmed;
    make_window.passed_data_requested_concert_number = requested_concert_number;
	
	// Window cannot be closed. Error message is:
	// ReservationEvents.js Scripts may close only the windows that were opened by it.
	// window.close();
	
} // setNameEmailRemarkFromFormOpenMakeReservation

// Removes an element from the document
function removeElement(element_id) 
{
    var element_remove = document.getElementById(element_id);
	
    if (element_remove != null)
    {
        element_remove.parentNode.removeChild(element_remove);		
    }
    else
    {
        alert("removeElement Element id= " + element_id + " is null");	
    }

	
} // removeElement

// Sets the value of an input type element
function setInputElementValue(element_id, i_value) 
{
    var element_set = document.getElementById(element_id);
	
    if (element_set != null)
    {
        element_set.value = i_value;
    }
    else
    {
        alert("setInputElementValue Element id= " + element_id + " is null");	
    }	
	
} // setInputElementValue

// Sets the value of an element
// TODO Investigate innerHTML - value
function setElementValue(element_id, i_value) 
{
    var element_set = document.getElementById(element_id);
	
    if (element_set != null)
    {
        element_set.innerHTML = i_value;
    }
    else
    {
        alert("setElementValue Element id= " + element_id + " is null");	
    }	
	
} // setElementValue

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Input Reservation Data ////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Save Reservation //////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Add button save reservation
function addButtonSaveReservation()
{
    // Return text defining the button
    var ret_button_save_svg = '';	
	
    // Return empty string if not for the add reservation case
	if (g_user_is_concert_visitor == "true")
	{
		return ret_button_save_svg;
	}
	
    // var text_image_save_reservation = g_layout_xml.getElementsByTagName(g_tag_text_image_save_reservation)[0].childNodes[0].nodeValue;	
    var text_image_save_reservation_white = g_layout_xml.getElementsByTagName(g_tag_text_image_save_reservation_white)[0].childNodes[0].nodeValue;	
	
	
	// Position and dimension of the button
	var button_x_pixel = g_button_x_delta_pixel;
	var button_y_pixel = g_button_height_pixel + g_button_button_delta_pixel + g_button_y_delta_pixel;
	var button_width_pixel = 235;

	// The rectangle defining the button	
    var rect_svg = '<rect ' + ' x=' + button_x_pixel + ' y=' + button_y_pixel
      + ' width=' + button_width_pixel + ' height=' + g_button_height_pixel 
      + ' id= "button_save_reservation" onmousedown="mouseDownSaveReservation(  )" '	  
      + g_style_button +  ' />';
    ret_button_save_svg = ret_button_save_svg + rect_svg + '\n'; 

    // Position for the text	
    var text_x_pixel = button_x_pixel + g_text_x_delta_pixel;
    var text_y_pixel = button_y_pixel + g_text_y_delta_pixel;

	// Text SVG object for the button	
    var text_svg = '<text id= "text_save_reservation"  onmousedown="mouseDownSaveReservationText(  )" ' + g_font_button + 
                   ' x=' + text_x_pixel + ' y=' + text_y_pixel + g_style_cursor_pointer + ' fill=' + g_table_text_color + '>' + "" + '</text>';
    // ret_button_save_svg = ret_button_save_svg + text_svg + '\n'; 
	
	
    // Position for the image	
    var image_x_pixel = button_x_pixel + g_text_x_delta_pixel;
    var image_y_pixel = button_y_pixel + 1;
	
	// Microsoft Explorer and Microsoft Edge require that width and height are defined
    var text_image_width = '222';

    var save_image_svg = '<image id= "id_image_save_reservation_text" onmousedown="mouseDownSaveReservationText(  )" x= ' + image_x_pixel + ' y= ' + image_y_pixel + 
	                ' width=' + text_image_width + 'px' +
	                ' height=' + g_text_image_height + 'px' +
                    ' xlink:href=' + text_image_save_reservation_white + g_style_cursor_pointer + '>' +
                    ' <title>' + g_title_text_image_save_reservation + '</title> ' + 
                    ' </image>';	
    ret_button_save_svg = ret_button_save_svg + save_image_svg + '\n';	
	
    // Return the SVG string defining the button 
    return ret_button_save_svg;
   
} // addButtonSaveReservation


// Administrator clicked button save reservation
// 1. Save selected seats. Call of saveSelectedReservations 
function mouseDownSaveReservation(  )
{
    if (g_user_is_concert_visitor == "true")
    {
        // Programming error
        return;
    }
	
    if (g_delete_reservation_mode == "true")
    {
        alert(g_error_msg_save_one_resrvation_not_allowed_in_delete_mode);
        return;
    }	
	
	saveSelectedReservations(); // ReservationConcerts.js

} // mouseDownSaveReservation

// User clicked text save reservation
function mouseDownSaveReservationText(  )
{
	mouseDownSaveReservation(  );

} // mouseDownSaveReservationText

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Save Reservation ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Delete Reservations ///////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Add button that changes the delete reservation mode
function addButtonDeleteReservationMode()
{
    // Return text defining the button
    var ret_button_delete_mode_svg = '';
	
    // Return empty string if not for the add reservation case
	if (g_user_is_concert_visitor == "true")
	{
		return ret_button_delete_mode_svg;
	}

    var text_image_delete_off = g_layout_xml.getElementsByTagName(g_tag_text_image_delete_off)[0].childNodes[0].nodeValue;
    var text_image_delete_on = g_layout_xml.getElementsByTagName(g_tag_text_image_delete_on)[0].childNodes[0].nodeValue;	
	
	// Position and dimension of the button	
	var button_width_pixel = 120;
	var button_x_pixel = 390;
	var button_y_pixel =  g_button_height_pixel + g_button_button_delta_pixel + g_button_y_delta_pixel;

	// The rectangle defining the button	
    var rect_svg = '<rect id= "delete_reservation_mode" ' + ' x=' + button_x_pixel + ' y=' + button_y_pixel
                 + ' width=' + button_width_pixel + ' height=' + g_button_height_pixel 
                 + ' id= + ' + g_id_button_event_list + ' onmousedown="mouseDownDeleteReservationMode(  )" '	  
                 + g_style_button +  ' />';				 
    ret_button_delete_mode_svg = ret_button_delete_mode_svg + rect_svg + '\n';
	
    // Position for the text	
    var text_x_pixel = button_x_pixel + g_text_x_delta_pixel;
    var text_y_pixel = button_y_pixel + 20;

	// Text SVG object for the button	
    var text_svg = '<text id= "text_delete_reservation_mode"  onmousedown="mouseDownDeleteReservationModeText(  )" ' + g_font_button + 
                   ' x=' + text_x_pixel + ' y=' + text_y_pixel + g_style_cursor_pointer + ' fill=' + g_table_text_color + '>' + "L" + '</text>';
    // ret_button_delete_mode_svg = ret_button_delete_mode_svg + text_svg + '\n'; 	
	
    // Position for the image	
    var image_x_pixel = button_x_pixel + g_text_x_delta_pixel;
    var image_y_pixel = button_y_pixel + 1;

	// Microsoft Explorer and Microsoft Edge require that width and height are defined
    var text_image_width = '104';
	
    var delete_image_svg = '<image id= "id_text_image_delete_reservation" onmousedown="mouseDownDeleteReservationModeText(  )" x= ' + image_x_pixel + ' y= ' + image_y_pixel + 
	                ' width=' + text_image_width + 'px' +
	                ' height=' + g_text_image_height + 'px' +
                    ' xlink:href=' + text_image_delete_off + g_style_cursor_pointer + '>' +
                    ' <title>' + g_title_text_image_delete_reservation + '</title> ' + 
                    ' </image>';	
    ret_button_delete_mode_svg = ret_button_delete_mode_svg + delete_image_svg + '\n'; 

    // Return the SVG string defining the button 	
    return ret_button_delete_mode_svg;
	  
} // addButtonDeleteReservationMode

// User clicked the button change the delete reservation mode
// 1. Check if in select mode, i.e. g_current_reservation_name is defined
//    Pop-up error message in this case and return
// 2. If not in delete mode 
//    2.1 Start the delete mode. Call of startDeleteMode
//    2.2. Pop-up message: In delete mode
// 3. If in the delete mode, i.e. user clicked the button once more without deleting anything
//    3.1 End of deletion mode. Call of endDeleteMode.
//    3.2 Tell the user that the he left the delete mode
function mouseDownDeleteReservationMode(  )
{
    // Return if not for the add reservation (administrator) case
	if (g_user_is_concert_visitor == "true")
	{
		return;
	}	
	
	if (g_current_reservation_name.length > 0)
	{
		alert(g_error_msg_set_of_deletion_mode_not_allowed_in_select_mode);
		return;		
	}
	
    // Set the flag delete reservation mode	
	if (g_delete_reservation_mode == "false")
	{
		startDeleteMode();
		
		// alert(g_msg_start_of_deletion_mode);
	}
	else
	{
        // After each deletion of a reservation the XML reservation file will be 
		// saved and the the delete mode will be ended. This is the case when the
		// user is in deletion mode, made no reservations and ended the reservation
		// mode by clicking on the reservation mode button once more
		
        endDeleteMode();
		
		// alert(g_msg_end_of_deletion_mode);	
	}	
	
} // mouseDownDeleteReservationMode

// Set the color of a button
function setButtonColor(i_id_button, i_color)
{
    var element_button = document.getElementById(i_id_button);
    if (element_button != null)
    {
        element_button.style["fill"] = i_color;
    }	
	else
	{
		alert("setButtonColor Element " + i_id_button + " is null");
		return;
	}		
	
} // setButtonColor

// Set the text of a button
function setButtonText(i_id_button, i_text)
{
    var element_button = document.getElementById(i_id_button);
    if (element_button != null)
    {
        element_button.textContent = i_text;
    }	
	else
	{
		alert("setButtonText Element " + i_id_button + " is null");
		return;
	}		
		
} // setButtonText

// Set the image text for a button
function setImageXlinkHrefAttribute(i_id_image, i_image_file)
{
    var element_text_image = document.getElementById(i_id_image);
    if (element_text_image != null)
    {
		element_text_image.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', i_image_file);		
    }	
	else
	{
		alert("setImageXlinkHrefAttribute Element for i_id_image= " + i_id_image + " is null");
		return;
	}		
		
} // setImageXlinkHrefAttribute

// User clicked the text for the button change the delete reservation mode
function mouseDownDeleteReservationModeText(  )
{
	mouseDownDeleteReservationMode(  );
	
} // mouseDownDeleteReservationModeText

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Delete Reservations /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Create Eventlist //////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Add button that invokes a function that creates a script with all seat events
function addButtonCreateEventList()
{
    var ret_button_event_svg = '';
	
	if (g_user_is_concert_visitor == "true")
	{
		return ret_button_event_svg;
	}
	
	var wall_thickness_pixel = parseInt(g_wall_thickness*g_scale_dimension);
	
	var button_x_pixel = 5;
	var button_y_pixel =  800;
	var button_width_pixel = wall_thickness_pixel - 10;
	var button_height_pixel = 100;

    var rect_svg = '<rect ' + ' x=' + button_x_pixel + ' y=' + button_y_pixel
                  + ' width=' + button_width_pixel + ' height=' + button_height_pixel 
                  + ' id= "buttonEventList" onmousedown="mouseDownCreateEventList(  )" '	  
                  + g_style_button_purple +  ' />';
    ret_button_event_svg = ret_button_event_svg + rect_svg + '\n';

    return ret_button_event_svg;	  
	  
} // addButtonCreateEventList

// Event handler: Create event list as a file
function mouseDownCreateEventList(  )
{
	//document.getElementById("button_create_event_list").textContent = "Mouse down.";
	
	// Create the list only for the web page (case) CreateLayout.htm
	var active_web_page = window.location.href;
	var index_found = active_web_page.indexOf("CreateLayout");
	if (-1 == index_found)
	{
		return;
	}	
	
	var itemCircles = document.getElementsByTagName("circle");
	
	var log_file_str_1 = "function setEventFunctions()\n{";
	var log_file_str = "";
	for (index_cir=0; index_cir<itemCircles.length; index_cir++)
	{
		var element_cir = itemCircles[index_cir];
		
		var id_cir_str = element_cir.id;
		
		var index_us = id_cir_str.indexOf("_");
		
		var table_number = id_cir_str.substring(0, index_us);
		
		var seat_char = id_cir_str.substring(index_us + 1, index_us + 2);
		
		var mouse_down_fctn_str = "document.getElementById('" + id_cir_str + "').onmousedown = function() {mouseDown" + id_cir_str + "()};";
		var mouse_over_fctn_str = "document.getElementById('" + id_cir_str + "').onmouseover = function() {mouseOver" + id_cir_str + "()};";
		
		log_file_str_1 = log_file_str_1 + mouse_down_fctn_str + "\n";
		log_file_str_1 = log_file_str_1 + mouse_over_fctn_str + "\n";
		
		var fctn_mouse_down_row_1 = "function mouseDown"+ id_cir_str + "()";
		var fctn_mouse_down_row_2 = "{";
		var fctn_mouse_down_row_3 = "var table_number = " + table_number + ";";
		var fctn_mouse_down_row_4 = "var seat_char = \"" + seat_char + "\";";
		var fctn_mouse_down_row_5 = "EventMouseDown(table_number, seat_char);";
		var fctn_mouse_down_row_6 = "}";
		
		log_file_str = log_file_str + fctn_mouse_down_row_1 + "\n";
		log_file_str = log_file_str + fctn_mouse_down_row_2 + "\n";
		log_file_str = log_file_str + fctn_mouse_down_row_3 + "\n";
		log_file_str = log_file_str + fctn_mouse_down_row_4 + "\n";
		log_file_str = log_file_str + fctn_mouse_down_row_5 + "\n";
		log_file_str = log_file_str + fctn_mouse_down_row_6 + "\n";
	
		var fctn_mouse_over_row_1 = "function mouseOver"+ id_cir_str + "()";
		var fctn_mouse_over_row_2 = "{";
		var fctn_mouse_over_row_3 = "var table_number = " + table_number + ";";
		var fctn_mouse_over_row_4 = "var seat_char = \"" + seat_char + "\";";
		var fctn_mouse_over_row_5 = "EventMouseOver(table_number, seat_char);";
		var fctn_mouse_over_row_6 = "}";
		
		log_file_str = log_file_str + fctn_mouse_over_row_1 + "\n";
		log_file_str = log_file_str + fctn_mouse_over_row_2 + "\n";
		log_file_str = log_file_str + fctn_mouse_over_row_3 + "\n";
		log_file_str = log_file_str + fctn_mouse_over_row_4 + "\n";
		log_file_str = log_file_str + fctn_mouse_over_row_5 + "\n";
		log_file_str = log_file_str + fctn_mouse_over_row_6 + "\n";
		
	}
	
	log_file_str_1 = log_file_str_1 + "}\n";
	log_file_str = log_file_str_1 + log_file_str;
	
	console.log(log_file_str);
	
	alert("Log file text is created that shall be copied to ReservationSalmenEvents.js\nSelect F12->Console");

	
} // mouseDownCreateEventList

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Create Eventlist ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Event Functions ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Event: User clicked the circle
function EventMouseDown(i_table_number, i_seat_char)
{
	if (g_user_is_concert_visitor == "true")
	{
		EventMouseDownConcertVisitor(i_table_number, i_seat_char);
	}
	else
	{
		EventMouseDownAdministrator(i_table_number, i_seat_char);
	}

} // EventMouseDown

// Event: The user that clicked the circle is concert visitor 
// 1. Seat will be added to the arrays g_all_selected_tables and g_all_selected_seats 
//    if the seat is free. Call of addToSelectArrays. For the case that the user re-selects
//    a selected seat it will be removed from the arrays. Call of removeFromSelectArrays.
//    If the user selects a reserved seat there will be a pop-up error message
// 2. The selected seats will be compared with the current (latest saved) reserved seats.
//    The XML reservations file will be reloaded. If there are seats that somebody else
//    else has reserved, the user will get a pop-up message telling that replacement seats
//    must be selected. For this case the color of the seat circles will change from yellow
//    to red. Call of function reloadXmlReservationCheckSelectionSetReservations().
//    Please note this function not is called for the case "Request seats with an email"
function EventMouseDownConcertVisitor(i_table_number, i_seat_char)
{
	if (g_user_request_with_email == "false")
	{
        if (g_current_reservation_name.length == 0)
        {
		    // Name is used as flag. This may happen after guest has made a reservation, that has been added and an email was sent
		    // TODO A better solution
		   return;
        }
	}
	
	var number_of_seats_that_can_be_selected = getNumberOfAdditionalSeatsThatCanBeSelected();
	if ( number_of_seats_that_can_be_selected < 0)
	{
		alert(g_error_max_number_seat_reservations_exceeded);
		return;		
	}
	else if ( number_of_seats_that_can_be_selected == 0)
	{
		alert(g_msg_last_seat_that_can_be_reserved);
	}
	
	var total_number_reserved_seats = totalNumberReservedSeats();
	
	var total_number_seats = totalNumberSeats();
	
	// Actually already checked ...
	if (total_number_reserved_seats > g_maximum_number_reservations)
	{
		// Was requested not to show this number: var remaining_seats = total_number_seats - total_number_reserved_seats;
		alert(g_error_max_number_seat_reservations_exceeded);
		return;
	}	
	
	var seat_free = seatIsFree(i_table_number, i_seat_char);
	
	if ("false" == seat_free)
	{
		alert(g_msg_select_reservation_table + i_table_number + g_msg_select_reservation_seat + i_seat_char + g_msg_select_already_reservation);
		return;
	}
	
	var seat_selected = seatIsSelected(i_table_number, i_seat_char);
	
	if ("false" == seat_selected)
	{
		addToSelectArrays(i_table_number, i_seat_char); // ReservationEmail.js
	}
	else if ("true" == seat_selected)
	{
		removeFromSelectArrays(i_table_number, i_seat_char); // ReservationEmail.js
	}	
	
	if (g_user_request_with_email == "false") // Not for the case Request seats with an email
	{
        reloadXmlReservationCheckSelectionSetReservations();  // Reservation.js
	}	
	
} // EventMouseDownConcertVisitor

// The user that clicked the circle is somebody from the jazz club or the restaurant
// (an administrator) that will add a reservation to the XML object that hold all
// reservations or delete a reservation. In delete mode a reservation or a single
// seat will be removed from the XML object.
// 1. Remove resarvation or single seat if g_delete_reservation_mode is true.
//    Call of function eventMouseDownDelete().
// 2. Seat will be added to the arrays g_all_selected_tables and g_all_selected_seats 
//    if the seat is free. Call of addToSelectArrays. For the case that the user re-selects
//    a selected seat it will be removed from the arrays. Call of removeFromSelectArrays.
//    If the user selects a reserved seat there will be a pop-up message wit the name of
//    the person that has made the reservation
// 3. The selected seats will be compared with the current (latest saved) reserved seats.
//    The XML reservations file will be reloaded. If there are seats that somebody else
//    else has reserved, the user will get a pop-up message telling that replacement seats
//    must be selected. For this case the color of the seat circles will change from yellow
//    to red. Call of function reloadXmlReservationCheckSelectionSetReservations().
function EventMouseDownAdministrator(i_table_number, i_seat_char)
{
	if (g_user_is_concert_visitor == "true")
	{
		return;
	}
	
	if (g_delete_reservation_mode == "true")
	{
		eventMouseDownDelete(i_table_number, i_seat_char);
		return;
	}

	var seat_free = seatIsFree(i_table_number, i_seat_char);
	
	if ("false" == seat_free)
	{
		var reservation_name = getReservationName(i_table_number, i_seat_char);
		
		alert(g_msg_select_reservation_table + i_table_number + g_msg_select_reservation_seat + 
		               i_seat_char + g_msg_select_reservation_by + reservation_name);
		return;
	}
	
	if (g_current_reservation_name.length == 0)
	{
        if (g_for_web_page_search == "true")
        {
            return;
        }

		alert(g_error_msg_not_in_select_reservation_mode);
		return;		
	}
	
	var seat_selected = seatIsSelected(i_table_number, i_seat_char);
	
	if ("false" == seat_selected)
	{
		addToSelectArrays(i_table_number, i_seat_char); // ReservationEmail.js
	}
	else if ("true" == seat_selected)
	{
		removeFromSelectArrays(i_table_number, i_seat_char); // ReservationEmail.js
	}	
	
    reloadXmlReservationCheckSelectionSetReservations();  // Reservation.js	
	
} // EventMouseDownAdministrator


// The user that clicked the circle is somebody from the jazz club or restaurant 
// (an administrator) that will delete a reservation from the XML object (corresponding 
// to an XML reservations file e.g. Reservation_Salmen_07.xml) that hold all reservations.
// 1. Check input mode. Error message if in add selection mode
// 2. Determine that the seat is reserved. Error message if not. Call of seatIsFree.
// 3. Get reservation name and number of seats for the name. 
//    Call of getReservationName and getNumberOfSeatsForName
// 4. Case: Number of seats greater than one and all seats for the given name shall be freed
//          Call of confirm and removeReservationNodesForName
//    Case: Number of seats greater than one and only the selected seat shall be removed
//          Call of confirm and removeSingleSeatNode. 
//          If the user regrets: End the delete mode and return. Call of endDeleteMode. 
//    Case: Number of seats is equal to one and the selected seat shall be removed
//          Call of confirm and removeSingleSeatNode. 
//          If the user regrets: End the delete mode and return. Call of endDeleteMode. 
// 5. Save the XML Reservation file. Call of saveXmlFileWithJQueryPostFunction()
// 6. End the delete mode. Call of endDeleteMode.
// 7. Tell the user that seats were removed
function eventMouseDownDelete(i_table_number, i_seat_char)
{
	if (g_user_is_concert_visitor == "true")
	{
		// Programming error
		return;
	}
	
	if (g_delete_reservation_mode != "true")
	{
		// Programming error
		alert(g_error_msg_not_reservation_delete_mode);
		return;
	}
	
	if (g_current_reservation_name.length > 0)
	{
		// Delete is not allowed in add reservation mode
		alert(g_error_msg_reservation_delete_and_add_reservation_mode); 
		return;		
	}
	
	var seat_free = seatIsFree(i_table_number, i_seat_char);
	
	if ("true" == seat_free)
	{
		alert(g_error_msg_not_a_reserved_seat + g_title_table + i_table_number + g_title_seat + i_seat_char);
		return;
	}
	
	var reservation_name = getReservationName(i_table_number, i_seat_char);
	
	var n_seats = getNumberOfSeatsForName(reservation_name);
	
	if (n_seats == 0)
	{
		// Programming error
		alert("eventMouseDownDelete Number of seats = 0 for name= " + reservation_name);
		return;
	}
	
	if (n_seats > 1 )
	{
        var confirm_all = confirm(reservation_name + g_make_all_seats_free);
        if (confirm_all == true) 
	    {
            removeReservationNodesForName(reservation_name);
	    } 
        else 
        {
            var confirm_one = confirm(g_title_name + reservation_name + g_title_table + i_table_number + g_title_seat + i_seat_char + g_make_one_seat_free);
			if (confirm_one == true)
			{
				removeSingleSeatNode(i_table_number, i_seat_char);
			}
			else
            {
                endDeleteMode();
                return;
            }
        }		
	} // n_seats > 1
    else
	{
        var confirm_one = confirm(g_title_name + reservation_name + g_title_table + i_table_number + g_title_seat + i_seat_char + g_make_one_seat_free);
        if (confirm_one == true)
        {
            removeSingleSeatNode(i_table_number, i_seat_char);
        }
        else
        {
           endDeleteMode();
           return;
        }
		
	} // n_seats = 1

    var b_save_post = saveXmlFileWithJQueryPostFunction();
	
    endDeleteMode();
	
    if (b_save_post)
    {
        //alert(g_msg_xml_saved_after_delete);
    }	

	
} // eventMouseDownDelete

// Start delete mode
// 1. Set g_delete_reservation_mode to true
// 2. Set the color of the delete_reservation_mode button. 
//    Call of setButtonColor with color g_active_mode_color
function startDeleteMode()
{
    g_delete_reservation_mode = "true";
	
    setButtonColor("delete_reservation_mode", g_active_mode_color);	
	
    var text_image_delete_on = g_layout_xml.getElementsByTagName(g_tag_text_image_delete_on)[0].childNodes[0].nodeValue;		
	
	setImageXlinkHrefAttribute('id_text_image_delete_reservation', text_image_delete_on);
	
} // startDeleteMode


// End delete mode
// 1. Set g_delete_reservation_mode to false
// 2. Set the color of the delete_reservation_mode button to white. Call of setButtonColor
function endDeleteMode()
{
    g_delete_reservation_mode = "false";
	
    setButtonColor("delete_reservation_mode", g_color_white);	
	
    var text_image_delete_off = g_layout_xml.getElementsByTagName(g_tag_text_image_delete_off)[0].childNodes[0].nodeValue;
	
	setImageXlinkHrefAttribute('id_text_image_delete_reservation', text_image_delete_off);
	
} // endDeleteMode

// Event: User moved the cursor over the circle
function EventMouseOver(i_table_number, i_seat_char)
{
	//alert("Table " + i_table_number + " Seat " + i_seat_char);
	
} // EventMouseOver

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Event Functions /////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////