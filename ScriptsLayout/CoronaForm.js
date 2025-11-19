// File: Reservation\scripts\CoronaForm.js



///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Corona Strings ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

var g_corona_header = "<b>Erfassungsblatt für Gästekontakte</b>";

var g_corona_text_row_1 = "Die Gäste haben die Möglichkeit, ihre Kontaktdaten anzugeben, damit sie im Bedarfsfall vom";
var g_corona_text_row_2 = "Kantonsärztlichen Dienst kontaktiert werden können. Jede Gästegruppe gibt freiwillig";
var g_corona_text_row_3 = "Kontakdaten (Vorname, Nachname, Telefonnummer, Datum, Zeit, Tischnummer) von einer";
var g_corona_text_row_4 = "Person an.";

var g_corona_subtext_row_1 = "Der Betrieb muss über die letzten 14 Tage Auskunft darüber geben können, welche ein";
var g_corona_subtext_row_2 = "Mitarbeitender bedient hat. Das Unternehmen bewahrt die Daten 14 Tage auf und vernichtet die";
var g_corona_subtext_row_3 = "danach vollständig.";

var g_corona_name = "Vorname";
var g_corona_family_name = "Nachname";
var g_corona_telephone = "Telefonnummer";
var g_corona_date = "Datum des <br>Besuchs";
var g_corona_table = "Tischnummer";
var g_corona_time = "Uhrzeit";
var g_corona_member = "Mitarbeiter";

var g_corona_font_header = "<font size=3 face='Arial'>";
var g_corona_font_text = "<font size=3 face='Arial'>";
var g_corona_font_subtext = "<font size=2 face='Arial'>";
var g_corona_font_table = "<font size=3 face='Arial'>";
var g_corona_font_end = "</font>";

var g_corona_paragraph_start = "<p>";
var g_corona_paragraph_end = "</p>";

var g_corona_table_start = '<table style= "padding:5px;">';
var g_corona_table_end = "</table>";
var g_corona_row_start = "<tr>";
var g_corona_row_end = "</tr>";
var g_corona_data_start = '<td style= "border: 1px solid black; padding:5px;">';
var g_corona_data_width_start = '<td style= "width:130px; height:40px; border: 1px solid black; padding:5px;">';
var g_corona_data_height_start = '<td style= "height:20px; border: 1px solid black; padding:5px;">';
var g_corona_data_end = "</td>";

var g_corona_form_div_start = '<div style="margin:5px;  width:730px; border: 1px dashed black; padding:15px;">';
var g_corona_subtext_div_start = '<div style="margin-left:45px;"">';
var g_corona_div_end = "</div>";

var g_corona_new_line = "<br>";


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Corona Strings //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Corona Get Functions //////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Returns the number of reserved seats
function getCoronaNumberReservedSeats()
{
	var found_tables = getTableArrayFromSelectArray();
	if (0 == found_tables.length)
	{
		return 0;
	}
	var ret_n_reservations = 0;
	
	for (index_out=0; index_out < found_tables.length; index_out++)
	{
	   var current_table = found_tables[index_out];
	   
	   for (index_all=0; index_all<g_all_selected_tables.length; index_all++)
	   {
		   if (g_all_selected_tables[index_all] == current_table)
		   {
			   ret_n_reservations = ret_n_reservations + 1;
		   }
	   }	   
	  
	}
	
	return ret_n_reservations;
	
} // getCoronaNumberReservedSeats

// Returns the concert date
function getCoronaDate()
{
    var concert_day = g_reservations_xml.getElementsByTagName(g_tag_day)[0].childNodes[0].nodeValue; 
	var concert_month = g_reservations_xml.getElementsByTagName(g_tag_month)[0].childNodes[0].nodeValue; 
	var concert_year = g_reservations_xml.getElementsByTagName(g_tag_year)[0].childNodes[0].nodeValue; 

    var concert_date = concert_day + "/" + concert_month + " " + concert_year;	
	
	return concert_date;
	
} // getCoronaDate

// Returns the selected tables as a string
function getCoronaTables()
{
	var found_tables = getTableArrayFromSelectArray();
	if (0 == found_tables.length)
	{
		return "";
	}
	
	var ret_string = "";
	
	for (var index_out=0; index_out < found_tables.length; index_out++)
	{
	   var current_table = found_tables[index_out];
		
       ret_string = ret_string + " " + current_table;
	  
	}
	
	return ret_string;
	
} // getCoronaTables

// Returns the time
function getCoronaTime()
{
    return "15:30";
}
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Corona Get Functions ////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Get Strings ///////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Returns the table string
function getCoronaTableString(i_n_rows, i_date, i_time, i_table)
{
    var ret_table_str = '';

    ret_table_str = ret_table_str + g_corona_font_table;

    ret_table_str = ret_table_str + g_corona_table_start;

    ret_table_str = ret_table_str + g_corona_row_start;

    ret_table_str = ret_table_str + g_corona_data_width_start;

    ret_table_str = ret_table_str + g_corona_name;

    ret_table_str = ret_table_str + g_corona_data_end;

    ret_table_str = ret_table_str + g_corona_data_width_start;

    ret_table_str = ret_table_str + g_corona_family_name;

    ret_table_str = ret_table_str + g_corona_data_end;

    ret_table_str = ret_table_str + g_corona_data_width_start;

    ret_table_str = ret_table_str + g_corona_telephone;

    ret_table_str = ret_table_str + g_corona_data_end;

    ret_table_str = ret_table_str + g_corona_data_start;

    ret_table_str = ret_table_str + g_corona_date;

    ret_table_str = ret_table_str + g_corona_data_end;

    ret_table_str = ret_table_str + g_corona_data_start;

    ret_table_str = ret_table_str + g_corona_time;

    ret_table_str = ret_table_str + g_corona_data_end;

    ret_table_str = ret_table_str + g_corona_data_start;

    ret_table_str = ret_table_str + g_corona_table + g_corona_new_line + g_corona_member;

    ret_table_str = ret_table_str + g_corona_data_end;

    ret_table_str = ret_table_str + g_corona_row_end;

    for (var row_number=1; row_number <= i_n_rows; row_number++)
    {

        ret_table_str = ret_table_str + getCoronaRowString(i_date, i_time, i_table);

    }

    ret_table_str = ret_table_str + g_corona_table_end;

    ret_table_str = ret_table_str + g_corona_font_end;

    return ret_table_str;

} // getCoronaTableString



// Returns the string for the Corona form
function getCoronaFormString(i_n_rows, i_date, i_time, i_table)
{
    var ret_form_str = '';

    ret_form_str = ret_form_str + g_corona_form_div_start;

    ret_form_str = ret_form_str + getCoronaHeaderString();

    ret_form_str = ret_form_str + getCoronaTextString();

    ret_form_str = ret_form_str + g_corona_subtext_div_start;

    ret_form_str = ret_form_str + getCoronaSubtextString();

    ret_form_str = ret_form_str + g_corona_div_end;

    ret_form_str = ret_form_str + getCoronaTableString(i_n_rows, i_date, i_time, i_table);

    ret_form_str = ret_form_str + g_corona_div_end;

    return ret_form_str;
}

// Returns one row string
function getCoronaRowString(i_date, i_time, i_table)
{
    var ret_row_str = '';

    ret_row_str = ret_row_str + g_corona_row_start;

    ret_row_str = ret_row_str + g_corona_data_height_start;

    ret_row_str = ret_row_str + '';

    ret_row_str = ret_row_str + g_corona_data_end;

    ret_row_str = ret_row_str + g_corona_data_height_start;

    ret_row_str = ret_row_str + '';

    ret_row_str = ret_row_str + g_corona_data_end;

    ret_row_str = ret_row_str + g_corona_data_height_start;

    ret_row_str = ret_row_str + '';

    ret_row_str = ret_row_str + g_corona_data_end;

    ret_row_str = ret_row_str + g_corona_data_height_start;

    ret_row_str = ret_row_str + i_date;

    ret_row_str = ret_row_str + g_corona_data_end;

    ret_row_str = ret_row_str + g_corona_data_height_start;

    ret_row_str = ret_row_str + i_time;

    ret_row_str = ret_row_str + g_corona_data_end;

    ret_row_str = ret_row_str + g_corona_data_height_start;

    ret_row_str = ret_row_str + i_table;

    ret_row_str = ret_row_str + g_corona_data_end;

    ret_row_str = ret_row_str + g_corona_row_end;

    return ret_row_str;
    
} // getCoronaRowString

// Returns the header string
function getCoronaHeaderString()
{
    var ret_header_str = '';

    ret_header_str = ret_header_str + g_corona_font_header;

    ret_header_str = ret_header_str + g_corona_paragraph_start;

    ret_header_str = ret_header_str + g_corona_header;

    ret_header_str = ret_header_str + g_corona_paragraph_end;

    ret_header_str = ret_header_str + g_corona_font_end;

    return ret_header_str;

} // getCoronaHeaderString

// Returns the text string
function getCoronaTextString()
{
    var ret_text_str = '';

    ret_text_str = ret_text_str + g_corona_font_text;

    ret_text_str = ret_text_str + g_corona_paragraph_start;

    ret_text_str = ret_text_str + g_corona_text_row_1 + g_corona_new_line;

    ret_text_str = ret_text_str + g_corona_text_row_2 + g_corona_new_line;

    ret_text_str = ret_text_str + g_corona_text_row_3 + g_corona_new_line;

    ret_text_str = ret_text_str + g_corona_text_row_4 + g_corona_new_line;

    ret_text_str = ret_text_str + g_corona_paragraph_end;

    ret_text_str = ret_text_str + g_corona_font_end;

    return ret_text_str;

} // getCoronaTextString

// Returns the subtext string
function getCoronaSubtextString()
{
    var ret_subtext_str = '';

    ret_subtext_str = ret_subtext_str + g_corona_font_subtext;

    ret_subtext_str = ret_subtext_str + g_corona_paragraph_start;

    ret_subtext_str = ret_subtext_str + g_corona_subtext_row_1 + g_corona_new_line;

    ret_subtext_str = ret_subtext_str + g_corona_subtext_row_2 + g_corona_new_line;

    ret_subtext_str = ret_subtext_str + g_corona_subtext_row_3 + g_corona_new_line;

    ret_subtext_str = ret_subtext_str + g_corona_paragraph_end;

    ret_subtext_str = ret_subtext_str + g_corona_font_end;

    return ret_subtext_str;

} // getCoronaSubtextString

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Get Strings /////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Corona Twint Strings //////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

var g_corona_twint_header = "<b>Eintritt mit TWINT zahlen</b>";
// TODO The change should not be here. After season end change to UtilPayment.
// var g_corona_twint_text_row_1 = "Wegen Corona wären wir sehr dankbar, wenn Sie die Eintritte mit TWINT im Voraus oder im ";
var g_corona_twint_text_row_1 = "Eintritte können mit TWINT im Voraus oder im Konzertsaal bezahlt werden. ";
// var g_corona_twint_text_row_2 = "Konzertsaal bezahlen. Der reguläre Eintritt beträgt Fr. 25.-, Supporter bezahlen Fr. 15.-";
var g_corona_twint_text_row_2 = "Der reguläre Eintritt beträgt Fr. 25.-, Supporter bezahlen Fr. 15.-";
var g_corona_twint_text_row_3 = "";
var g_corona_twint_text_row_4 = "Bitte geben Sie Ihren Namen und das Konzertdatum bei der Bezahlung an. Empfänger ist Hanni ";
var g_corona_twint_text_row_5 = "Heller, Telefonnummer +41 79 368 56 93.";

var g_corona_twint_font_header = "<font size=3 face='Arial'>";
var g_corona_twint_font_text = "<font size=3 face='Arial'>";
var g_corona_twint_font_end = "</font>";

var g_corona_twint_paragraph_start = "<p>";
var g_corona_twint_paragraph_end = "</p>";

var g_corona_twint_form_div_start = '<div style="margin:5px;  width:730px; border: 1px solid blue; padding-left:15px;  padding-right:15px;  padding-top:5px; padding-bottom:5px;" >';
var g_corona_twint_div_end = "</div>";

var g_corona_twint_new_line = "<br>";


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Corona Twint Strings ////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Get Twint Strings /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Returns the string for the Corona Twint <div>
function getCoronaTwintString()
{
    var ret_form_str = '';

    ret_form_str = ret_form_str + g_corona_twint_form_div_start;

    ret_form_str = ret_form_str + getCoronaTwintHeaderString();

    ret_form_str = ret_form_str + getCoronaTwintTextString();

    ret_form_str = ret_form_str + g_corona_twint_div_end;

    return ret_form_str;

} // getCoronaTwintString

// Returns the header string
function getCoronaTwintHeaderString()
{
    var ret_header_str = '';

    ret_header_str = ret_header_str + g_corona_font_header;

    ret_header_str = ret_header_str + g_corona_paragraph_start;

    ret_header_str = ret_header_str + g_corona_twint_header;

    ret_header_str = ret_header_str + g_corona_paragraph_end;

    ret_header_str = ret_header_str + g_corona_font_end;

    return ret_header_str;

} // getCoronaTwintHeaderString


// Returns the text string
function getCoronaTwintTextString()
{
    var ret_text_str = '';

    ret_text_str = ret_text_str + g_corona_twint_font_text;

    ret_text_str = ret_text_str + g_corona_twint_paragraph_start;

    ret_text_str = ret_text_str + g_corona_twint_text_row_1 + " ";

    ret_text_str = ret_text_str + g_corona_twint_text_row_2 + g_corona_twint_new_line;

    ret_text_str = ret_text_str + g_corona_twint_text_row_3 + g_corona_twint_new_line;

    ret_text_str = ret_text_str + g_corona_twint_text_row_4 + g_corona_twint_new_line;

    ret_text_str = ret_text_str + g_corona_twint_text_row_5 + g_corona_twint_new_line;

    ret_text_str = ret_text_str + g_corona_twint_paragraph_end;

    ret_text_str = ret_text_str + g_corona_twint_font_end;

    return ret_text_str;

} // getCoronaTwintTextString


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Get Twint Strings ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

