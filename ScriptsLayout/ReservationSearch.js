// File: Reservation\scripts\ReservationSearch.js

// Functions for the search of a reservation name and coloring the corresponding seats

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Create Input Elements /////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Returns a HTML string that adds the search input field and the clear button
function addSearchInputFieldAndClearButton()
{
    var input_field_button_html = '';
	
    input_field_button_html = input_field_button_html + addSearchInputField();
	
	input_field_button_html = input_field_button_html + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
	
    input_field_button_html = input_field_button_html + addSearchClearButton() + '&nbsp;&nbsp;&nbsp;&nbsp;';
	
    input_field_button_html = input_field_button_html + addElementForNumberOfNames() + '&nbsp;&nbsp;&nbsp;&nbsp;';
	
    input_field_button_html = input_field_button_html + addElementForNumberOfSeats();
	
    var element_div_dropdown_or_search = document.getElementById(g_id_reservation_search_seats);	
    if (null == element_div_dropdown_or_search)
    {
        alert("addSearchInputFieldAndClearButton element_div_dropdown_or_search is null");
        return;
    }
	
    element_div_dropdown_or_search.innerHTML = input_field_button_html;
	
    return;		
	
	
} // addSearchInputFieldAndClearButton

// Returns a HTML string that adds the search input field
function addSearchInputField()
{
    // https://stackoverflow.com/questions/6290442/html-input-type-text-onchange-event-not-working
	
    var ret_input_field = '';
	
	ret_input_field = ret_input_field + '<b>Such Name:</b> &nbsp;&nbsp;&nbsp;';
	
	ret_input_field = ret_input_field + '<input type="text" ';
	
    ret_input_field = ret_input_field + 'id= ' + g_id_input_reservation_name + ' ';
	
    ret_input_field = ret_input_field + ' size="20" maxlength="40" ';
	
    ret_input_field = ret_input_field + 'style="height:30px;font-size:22pt; "';
	
    ret_input_field = ret_input_field + ' onkeyup="searchStringChanged(this);" ';
	
    ret_input_field = ret_input_field + '>';

	
    return ret_input_field;	
	
} // addSearchInputField


// Returns a HTML string that adds the clear button
function addSearchClearButton()
{
    var ret_button = '';
	
    ret_button = ret_button + '<button ';
    ret_button = ret_button + ' id="id_clear_input_name" ';	
    ret_button = ret_button + 'style="height:40px;font-size:22pt; "';
    ret_button = ret_button + 'onclick="clearInputSearchName()"';
    ret_button = ret_button + ' >';
    ret_button = ret_button + '<b>X</b>';
    ret_button = ret_button + '</button>';
 
    return ret_button;	

} // addSearchInputField

// Returns a HTML string for an output field for number of found names
function addElementForNumberOfNames()
{
    var ret_names_html = '';
	
    ret_names_html = ret_names_html + '<b>Anzahl Namen:</b> ';
    ret_names_html = ret_names_html + '&nbsp;&nbsp;&nbsp';
    ret_names_html = ret_names_html + '<input type="text" ';
    ret_names_html = ret_names_html + ' id="id_number_of_names_found" ';	
    ret_names_html = ret_names_html + ' maxlength="5" ';
    ret_names_html = ret_names_html + ' style="width:40px;height:30px;font-size:22pt; "';
    ret_names_html = ret_names_html + ' >';
	
    return ret_names_html;	

} // addElementForNumberOfNames

// Returns a HTML string for an output field for number of seats
function addElementForNumberOfSeats()
{
    var ret_seats_html = '';
	
    ret_seats_html = ret_seats_html + '<b>Plätze:</b> ';
    ret_seats_html = ret_seats_html + '&nbsp;&nbsp;&nbsp';
    ret_seats_html = ret_seats_html + '<input type="text" ';
    ret_seats_html = ret_seats_html + ' id="id_number_of_seats_for_found_name" ';	
    ret_seats_html = ret_seats_html + ' maxlength="5" ';
    ret_seats_html = ret_seats_html + ' style="width:40px;height:30px;font-size:22pt; "';
    ret_seats_html = ret_seats_html + ' >';
	
    return ret_seats_html;	

} // addElementForNumberOfSeats

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Create Input Elements ///////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Event Functions ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Event function: The user has added or removed a character of the search string
function searchStringChanged(i_input_object)
{
    if (null == i_input_object)
    {
        alert("searchStringChanged i_input_object is null");	
        return;
    }
	
    var input_element = document.getElementById(g_id_input_reservation_name);
    if (null == input_element)
    {
        alert("clearInputSearchName input_element is null");	
        return;
    }	
	
    var output_element_names = document.getElementById("id_number_of_names_found");
    if (null == output_element_names)
    {
        alert("searchStringChanged output_element_names is null for id= " + "id_number_of_names_found");	
        return;
    }
	
    var output_element_seats = document.getElementById("id_number_of_seats_for_found_name");
    if (null == output_element_seats)
    {
        alert("searchStringChanged output_element_seats is null for id= " + "id_number_of_seats_for_found_name");	
        return;
    }
	
    output_element_names.style.backgroundColor = g_color_silver;
    output_element_seats.style.backgroundColor = g_color_silver;
	i_input_object.style.backgroundColor = g_color_white;
	
    output_element_names.value = " -";
    output_element_seats.value = " -";
	
	setReservedProperties();
	
    var search_str = input_element.value;	
	
    if (search_str.length == 0)
	{
        return;
	}	
	
    if (search_str.length == 1)
	{
        reloadXmlReservationAndSearch(input_element, search_str, output_element_names, output_element_seats);
	}
	
    checkIfSearchStringMatchesNameChangeColorOfInputFieldAndSeats(input_element, search_str, output_element_names, output_element_seats);
	
} // searchStringChanged

// Event function: The user has added or removed a character of the search string
function checkIfSearchStringMatchesNameChangeColorOfInputFieldAndSeats(i_input_element, i_search_str, i_output_element_names, i_output_element_seats) 
{
    var mod_search_str = notAllowedToAddCharsWhenNameIsFound(i_search_str);
	
    var n_number_names_matching = getNumberOfNamesMatchingInputString(mod_search_str);
	
    if (n_number_names_matching > 1)
    {
		i_output_element_names.value = " " + n_number_names_matching.toString();
		
        return;
    }
    else if (n_number_names_matching == 0)
    {
		//alert("Kein Name gefunden für " + input_element);
		
		i_output_element_names.value = " " + n_number_names_matching.toString();
		
		i_input_element.style.backgroundColor = g_color_silver;		
		
        return;
    }
    else if (n_number_names_matching == 1)
    {
		i_output_element_names.value = " " + n_number_names_matching.toString();
		
        i_input_element.style.backgroundColor = g_color_yellow;
		
		var found_name = getNameFound(mod_search_str);
		
		i_input_element.value = found_name;
		
		var number_seats = getNumberOfSeatsForName(found_name);
		
		i_output_element_seats.value = " " + number_seats.toString();
		
		colorSeatsFound(found_name);
				
    }
		
} // checkIfSearchStringMatchesNameChangeColorOfInputFieldAndSeats

// Returns the found name if user added one character
function notAllowedToAddCharsWhenNameIsFound(i_search_str)
{
    var ret_str = i_search_str;
	
	if (ret_str.length == 1)
	{
		return ret_str;
	}
   
    var search_str_one_less = i_search_str.substring(0, i_search_str.length - 1);
   
    var n_number_names_matching = getNumberOfNamesMatchingInputString(search_str_one_less);
	
    if (1 == n_number_names_matching)
    {
        ret_str = search_str_one_less;
    }
	
    return ret_str;
	
} // notAllowedToAddCharsWhenNameIsFound

// Button event clear the input name field and re-color the reserved seats to red
function clearInputSearchName()
{
    var input_element = document.getElementById(g_id_input_reservation_name);
    if (null == input_element)
    {
        alert("clearInputSearchName input_element is null");	
        return;
    }
	
    input_element.value = "";
	
	searchStringChanged(input_element);
	
} // clearInputSearchName


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Event Functions /////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Check And Get Functions ///////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////


// Returns the number of names matching the input string
function getNumberOfNamesMatchingInputString(i_search_string)
{
    var ret_number = 0;
	
	if (i_search_string.length == 0)
	{
		alert("getNumberOfNamesMatchingInputString Input string is empty");
		return -1;
	}
	
    var search_string_lc = i_search_string.toLowerCase();
   
    var names_array = getReservationUniqueNames();
	
    for (index_name=0; index_name<names_array.length; index_name++)
    {
        var current_name = 	names_array[index_name];
        var current_name_lc = current_name.toLowerCase();
        var index_start = current_name_lc.indexOf(search_string_lc);
        if (index_start >= 0)
        {
			ret_number = ret_number + 1;
        }
    }
	
    return ret_number;
  
} // getNumberOfNamesMatchingInputString

// Returns the found name
function getNameFound(i_search_string)
{
    var ret_name_found = "";

    var search_string_lc = i_search_string.toLowerCase();
   
    var names_array = getReservationUniqueNames();
	
    var names_matching = [];
	var index_match = 0;
    for (index_name=0; index_name<names_array.length; index_name++)
    {
        var current_name = 	names_array[index_name];
        var current_name_lc = current_name.toLowerCase();
        var index_start = current_name_lc.indexOf(search_string_lc);
        if (index_start >= 0)
        {
			names_matching[index_match] = current_name;
			index_match = index_match + 1;
        }
    }	
	
	if (names_matching.length != 1)
	{
		alert("getNameFound Number of matching names is not one (1) but " + names_matching.length.toString());
		return;
	}
	
	ret_name_found = names_matching[0];
	
    return ret_name_found;
	
} // getNameFound

function getNameFoundTablesOrSeatsArray(i_input_value, i_case)
{

} // getNameFoundTablesOrSeatsArray

// Returns true if there is no name that fits to the input string
function checkIfNoNameFound(i_input_value)
{
   var ret_b_found = false;
   
  return ret_b_found;
  
} // checkIfNoNameFound

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Check And Get Functions /////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Set Functions /////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

function setNumberOfFoundNames(i_number)
{
    var div_element = document.getElementById("id_div_number_of_names");
    if (null == div_element)
	{
        alert("setNumberOfFoundNames div_element is null for id= " + "id_div_number_of_names");
	}
	
	
} // setNumberOfFoundNames



// Color magenta for the found seats
function colorSeatsFound(i_found_name)
{
    var name_reserved_table_numbers = getReservationTablesOrSeats(i_found_name, "number");
		
    var name_reserved_seat_characters = getReservationTablesOrSeats(i_found_name, "character");	
	
    var number_seats = 	name_reserved_seat_characters.length;

    for (seat_number=1; seat_number<=number_seats; seat_number++)
	{
		var reserved_number = name_reserved_table_numbers[seat_number-1];
		var reserved_character = name_reserved_seat_characters[seat_number-1];
		
		var element_circle = document.getElementById(circleId(reserved_number, reserved_character));
		if (element_circle != null)
		{
			element_circle.style["fill"] = g_color_yellow;
		}
	}
	
} // colorSeatsFound

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Set Functions /////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////



