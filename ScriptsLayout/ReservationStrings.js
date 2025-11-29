// File: ScriptsLayout/ReservationStrings.js
// Date: 2025-11-28
// Author: Gunnar Lidén

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Titles & Messages /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

var param_names = [];  var param_values = [];

// Text for button list reservations
var g_button_list_reservations_text = "Reservationsliste";
param_names[0]= "g_button_list_reservations_text";  param_values[0] = "";

// Text for button print reservations
var g_button_print_reservations_text = "Reservationskarten";
param_names[1]= "g_button_print_reservations_text";  param_values[1] = "";

// Text for button add reservation
var g_button_add_reservation_text = "Reservation zufügen";
param_names[2]= "g_button_add_reservation_text";  param_values[2] = "";

// Text for button save reservations and exit
var g_button_save_reservations_exit_text = "Speichern & Exit";
param_names[3]= "g_button_save_reservations_exit_text";  param_values[3] = "";

// Text for button send reservation email request
var g_send_email_text = "Reservations-E-Mail";
param_names[4]= "g_send_email_text";  param_values[4] = "";

// Text for button send reservation email request
var g_make_reservation_text = " Reservieren";
param_names[5]= "g_make_reservation_text";  param_values[5] = "";

// Text for the save reservation button
var g_save_reservation_text = "Ende Plätze wählen";
param_names[6]= "g_save_reservation_text";  param_values[6] = "";

// Title JAZZ live AARAU Reservation
var g_title_jazz_live_aarau_reservation = "JAZZ live AARAU Reservation ";
param_names[7]= "g_title_jazz_live_aarau_reservation";  param_values[7] = "";

// Warning. Reserved seats are available until 10 minutes before concert begin
var g_reservation_note = "Bitte beachten, dass reservierte Plätze 10 Minuten vor Konzertbeginn eingenommen werden müssen, sonst werden sie freigegeben.";
param_names[8]= "g_reservation_note";  param_values[8] = "";

// Requested seats text
var g_requested_seats_text = "Gewünschte Plätze:";
param_names[9]= "g_reservation_note";  param_values[9] = "";

var g_close_window_delete_temporary_files = "<b>Diese Webseite bitte zumachen!</b>";
param_names[10]= "g_close_window_delete_temporary_files";  param_values[10] = "";

var g_confirmation_sent_close_window = "E-Mail mit einer Reservationsbestätigung ist gesendet." + "\n" + 
   "Wenn Sie keine Bestätigung bekommen haben, bitte eine E-Mail an reservation@jazzliveaarau.ch schicken.";
param_names[11]= "g_confirmation_sent_close_window";  param_values[11] = "";

// Prompt string select seats
var g_send_email_prompt = "Plätze wählen !";
param_names[12]= "g_send_email_prompt";  param_values[12] = "";

// Messages after save of the XML reservation file
var g_msg_xml_saved_email_sent = "XML Reservations-Datei ist gespeichert und Bestätingungs-E-Mail gesendet. Name ";
param_names[13]= "g_msg_xml_saved_email_sent";  param_values[13] = "";
var g_msg_xml_saved = "XML Reservations-Datei ist gespeichert. Name ";
param_names[14]= "g_msg_xml_saved";  param_values[14] = "";
var g_msg_xml_saved_after_delete = "Die Reservation ist gelöscht und die geänderte XML Reservations-Datei ist auf dem Server gespeichert.";
param_names[15]= "g_msg_xml_saved_after_delete";  param_values[15] = "";

// Error messages

var g_error_max_number_seat_reservations_exceeded = "Die Anzahl Reservationen ist limitiert." + "\n" +
													"Billette gibt es jetzt nur an der Abendkasse.";
param_names[16]= "g_error_max_number_seat_reservations_exceeded";  param_values[16] = "";

var g_error_opening_window = "Ein Fehler beim Öffnen einer neuen Webseite ist aufgetreten";
param_names[17]= "g_error_opening_window";  param_values[17] = "";

var g_error_next_season_passed = "Keine nächste Saison XML Datei existiert. " + "\n" + 
                                 "Bitte neue Reservationsdateien generieren!"+ "\n" + 
								 "(Konzert 1 wird angezeigt)";
param_names[18]= "g_error_next_season_passed";  param_values[18] = "";
								 
var g_error_send_confirmation_mail = "Fehler: Keine Reservation wurde gemacht. \nE-Mail mit Bestätigung konnte nicht gesendet werden. \nBitte E-Mail-Adresse überprüfen!";	
param_names[19]= "g_error_send_confirmation_mail";  param_values[19] = "";							 
								 
var g_error_name_and_email_missing = "Name und E-Mail Adresse fehlen";
param_names[20]= "g_error_name_and_email_missing";  param_values[20] = "";
var g_error_name_missing = "Vorname und Nachname fehlen";
param_names[21]= "g_error_name_missing";  param_values[21] = "";
var g_error_email_missing = "E-Mail Adresse fehlt";
param_names[22]= "g_error_email_missing";  param_values[22] = "";
var g_error_email_not_valid = "E-Mail Adresse ungültig"; 
param_names[23]= "g_error_email_not_valid";  param_values[23] = "";

var g_error_no_reserved_seats_no_reservation_cards = "Keine Plätze sind reserviert!" + "\n" + "Es gibt keine Karten zu drucken.";
param_names[24]= "g_error_no_reserved_seats_no_reservation_cards";  param_values[24] = "";

// Texts for the list
var g_list_text_jazz_live_aarau = "JAZZ <i>live</i> AARAU";
param_names[25]= "g_list_text_jazz_live_aarau";  param_values[25] = "";
var g_list_text_concert = "Reservationen für Konzert";
param_names[26]= "g_list_text_concert";  param_values[26] = "";
var g_list_text_band = "Band: ";
param_names[27]= "g_list_text_concert";  param_values[27] = "";
var g_list_text_number_reservations = "Anzahl Reservationen: ";
param_names[28]= "g_list_text_concert";  param_values[28] = "";
var g_list_text_total_number_of_reserved_seats = "Anzahl reservierte Plätze total: ";
param_names[29]= "g_list_text_total_number_of_reserved_seats";  param_values[29] = "";
var g_list_text_total_number_of_seats = "Anzahl Plätze total: ";
param_names[30]= "g_list_text_total_number_of_reserved_seats";  param_values[30] = "";
var g_list_text_max_number_of_seats = "Warnung! Die Anzahl Reservationen ist limitiert zu ";
param_names[31]= "g_list_text_max_number_of_seats";  param_values[31] = "";
var g_list_text_date = "Datum: ";
param_names[32]= "g_list_text_date";  param_values[32] = "";
var g_list_text_reservation_name = "Name: ";
param_names[33]= "g_list_text_reservation_name";  param_values[33] = "";
var g_list_text_reservation_email = "E-Mail: ";
param_names[34]= "g_list_text_reservation_email";  param_values[34] = "";
var g_list_text_reservation_remark = "Bemerkung: ";
param_names[35]= "g_list_text_reservation_remark";  param_values[35] = "";
var g_liste_text_number_seats = "Anzahl Plätze: ";
param_names[36]= "g_liste_text_number_seats";  param_values[36] = "";
var g_list_text_seats = "No longer used !!!!!!!!!  Plätze: ";
param_names[37]= "g_list_text_seats";  param_values[37] = "";

// HTML texts for reservation confirmation mail
var g_confirmation_email_subject = "No longer used !!!!!!!!! JAZZ live AARAU Reservationbestaetigung ";
param_names[38]= "g_confirmation_email_subject";  param_values[38] = "";
// https://www.the-art-of-web.com/javascript/escape/
// ä %C3%A4 Does not work TODO
var g_confirmation_email_html_font_start = "No longer used !!!!!!!!! <font size=3 face='Arial'>";
param_names[39]= "g_confirmation_email_html_font_start";  param_values[39] = "";
var g_confirmation_email_html_title = "<h2>JAZZ <i>live</i> AARAU Reservationsbestätigung</h2>";
param_names[40]= "g_confirmation_email_html_title";  param_values[40] = "";
var g_confirmation_email_html_dear_sirs = "No longer used !!!!!!!!! <b>Liebe Konzertbesucherin, lieber Konzertbesucher</b><br><br>";
param_names[41]= "g_confirmation_email_html_dear_sirs";  param_values[41] = "";
var g_confirmation_email_html_start_paragraph = "No longer used !!!!!!!!! <p>";
param_names[42]= "g_confirmation_email_html_start_paragraph";  param_values[42] = "";
var g_confirmation_email_html_row_1 = "No longer used !!!!!!!!! Ihre Reservation ist bei uns eingetroffen, besten Dank.<br>"
param_names[43]= "g_confirmation_email_html_row_1";  param_values[43] = "";
var g_confirmation_email_html_row_2 = "No longer used !!!!!!!!! Die gewünschten Plätze sind für Sie bereitgestellt und sollten<br>"
param_names[44]= "g_confirmation_email_html_row_2";  param_values[44] = "";
var g_confirmation_email_html_row_3 = "No longer used !!!!!!!!! spätestens 10 Minuten vor Konzertbeginn eingenommen werden.<br>"
param_names[45]= "g_confirmation_email_html_row_3";  param_values[45] = "";
var g_confirmation_email_html_row_4 = "No longer used !!!!!!!!! Wir wünschen Ihnen bereits jetzt ein unvergessliches Konzerterlebnis.<br>"
param_names[46]= "g_confirmation_email_html_row_4";  param_values[46] = "";
var g_confirmation_email_html_greetings = "No longer used !!!!!!!!! Herzlich<br>";
param_names[47]= "g_confirmation_email_html_greetings";  param_values[47] = "";
var g_confirmation_email_html_signature = "No longer used !!!!!!!!! <b>JAZZ <i>live</i> AARAU</b><br>";
param_names[48]= "g_confirmation_email_html_signature";  param_values[48] = "";
var g_confirmation_email_html_end_paragraph = "No longer used !!!!!!!!! </p>";
param_names[49]= "g_confirmation_email_html_end_paragraph";  param_values[49] = "";
var g_confirmation_email_html_font_end = "No longer used !!!!!!!!! </font>";
param_names[50]= "g_confirmation_email_html_font_end";  param_values[50] = "";

// Texts for reservation selection
var g_selection_by_somebody_else_reserved = "Die folgenden Plätze wurden leider gerade von jemandem anders reserviert:" + "\n";
param_names[51]= "g_selection_by_somebody_else_reserved";  param_values[51] = "";
var g_selection_select_new_seats = "Bitte andere Plätze aussuchen !" + "\n";
param_names[52]= "g_selection_select_new_seats";  param_values[52] = "";

// Texts for ReservationEvents.cs
var g_error_msg_select_mode = "Schon im Auswahls-Modus (Name ist definiert)";
param_names[53]= "g_error_msg_select_mode";  param_values[53] = "";

var g_error_msg_not_in_select_reservation_mode = "Bitte zuerst 'Reservation zufügen' klicken!";
param_names[54]= "g_error_msg_not_in_select_reservation_mode";  param_values[54] = "";

var g_error_msg_not_reservation_delete_mode = "Not in reservation delete mode";
param_names[55]= "g_error_msg_not_reservation_delete_mode";  param_values[55] = "";

var g_error_msg_reservation_delete_and_add_reservation_mode = "Löschen ist nicht erlaubt im Modus Reservationen zufügen";
param_names[56]= "g_error_msg_reservation_delete_and_add_reservation_mode";  param_values[56] = "";

var g_error_msg_not_a_reserved_seat = "Ein nicht reservierter Platz: ";
param_names[57]= "g_error_msg_not_a_reserved_seat";  param_values[57] = "";

var g_error_msg_save_exit_not_allowed_in_delete_mode = "Speichern ist nicht erlaubt beim Löschen von Reservationen";
param_names[58]= "g_error_msg_save_exit_not_allowed_in_delete_mode";  param_values[58] = "";

var g_error_msg_init_resrvation_not_allowed_in_delete_mode = "Eine neue Reservation zu erfassen ist nicht erlaubt beim Löschen von Reservationen";
param_names[59]= "g_error_msg_init_resrvation_not_allowed_in_delete_mode";  param_values[59] = "";

var g_error_msg_save_one_resrvation_not_allowed_in_delete_mode = "Eine Reservation zu speichern ist nicht erlaubt beim Löschen von Reservationen";
param_names[60]= "g_error_msg_save_one_resrvation_not_allowed_in_delete_mode";  param_values[60] = "";

var g_error_msg_set_of_deletion_mode_not_allowed_in_select_mode = "Löschen ist nicht erlaubt beim Zufügen von Plätzen";
param_names[61]= "g_error_msg_set_of_deletion_mode_not_allowed_in_select_mode";  param_values[61] = "";

var g_error_msg_save_exit_selection_mode = "Bitte zuerst das Wählen von Plätzen beenden!";
param_names[62]= "g_error_msg_save_exit_selection_mode";  param_values[62] = "";

var g_error_msg_no_seats_selected = "Keine Plätze wurden gewählt. Eine Reservation wurde nicht zugefügt.";
param_names[63]= "g_error_msg_no_seats_selected";  param_values[63] = "";

var g_error_msg_name_is_compulsory = "Name muss angegeben werden!";
param_names[64]= "g_error_msg_name_is_compulsory";  param_values[64] = "";

var g_warning_msg_no_seats_selected = "Keine Plätze sind gewählt!";
param_names[65]= "g_warning_msg_no_seats_selected";  param_values[65] = "";

var g_error_msg_name_not_set_close_this_window = "Reservationsname und E-Mail sind nicht definiert." + "\n" + "Bitte diese Webseite zumachen!";
param_names[66]= "g_error_msg_name_not_set_close_this_window";  param_values[66] = "";

var g_make_all_seats_free = " hat mehrere Plätze reserviert. " + "\n" + 
                            "Alle diese Plätze frei geben?" + "\n" + 
							"(OK= Ja   Abbrechen= Nein)";
param_names[67]= "g_make_all_seats_free";  param_values[67] = "";

var g_make_one_seat_free = " wird freigegeben";
param_names[68]= "g_make_one_seat_free";  param_values[68] = "";

var g_title_name = " Name ";
param_names[69]= "g_title_name";  param_values[69] = "";

var g_title_table = " Tisch ";
param_names[70]= "g_title_table";  param_values[70] = "";

var g_title_seat = " Platz ";
param_names[71]= "g_title_seat";  param_values[71] = "";

var g_msg_start_of_deletion_mode = "Im Lösch-Modus. Bitte Platz zum Löschen klicken!";
param_names[72]= "g_msg_start_of_deletion_mode";  param_values[72] = "";

var g_msg_end_of_deletion_mode = "Lösch-Modus ist beendet. Keine Reservationen wurden gelöscht.";
param_names[73]= "g_msg_end_of_deletion_mode";  param_values[73] = "";

var g_msg_select_reservation_table = "Tisch ";
param_names[74]= "g_msg_select_reservation_table";  param_values[74] = "";
var g_msg_select_reservation_seat = " Platz ";
param_names[75]= "g_msg_select_reservation_seat";  param_values[75] = "";
var g_msg_select_reservation_by = " reserviert von ";
param_names[76]= "g_msg_select_reservation_by";  param_values[76] = "";
var g_msg_select_already_reservation = " ist schon reserviert";
param_names[77]= "g_msg_select_already_reservation";  param_values[77] = "";
var g_title_text_image_reserve_seats = "Sitzplätze reservieren: \nDie Reservation wird registriert und eine Bestätigungs-E-Mail wird gesendet.";
param_names[78]= "g_title_text_image_reserve_seats";  param_values[78] = "";
var g_title_text_image_select_seats = "Sitzplätze für die Reservation wählen";
param_names[79]= "g_title_text_image_select_seats";  param_values[79] = "";
var g_title_text_image_reservation_list = "Liste mit allen Reservationen zeigen";
param_names[80]= "g_title_text_image_reservation_list";  param_values[80] = "";
var g_title_text_image_reservation_print = "Reservationskarten für alle Sitzplätze generieren";
param_names[81]= "g_title_text_image_reservation_print";  param_values[81] = "";
var g_title_text_image_add_reservation = "Eine Reservation zufügen";
param_names[82]= "g_title_text_image_add_reservation";  param_values[82] = "";
var g_title_text_image_save_reservation = "Reservierte Plätze speichern";
param_names[83]= "g_title_text_image_save_reservation";  param_values[83] = "";
var g_title_text_image_delete_reservation = "Reservierte Plätze löschen";
param_names[84]= "g_title_text_image_delete_reservation";  param_values[84] = "";

var g_error_surname_or_familyname_missing = "Vorname oder Nachname fehlt";
param_names[85]= "g_error_name_missing";  param_values[85] = "";

var g_confirmation_email_subject_test = "JAZZ live AARAU Reservationbestaetigung TEST ";
param_names[86]= "g_confirmation_email_subject_test";  param_values[86] = "";
var g_confirmation_email_html_title_test = "<h2>JAZZ <i>live</i> AARAU Reservationsbestätigung <i>TEST</i></h2>";
param_names[87]= "g_confirmation_email_html_title_test";  param_values[87] = "";

var g_bcc_email_address = "reservation@jazzliveaarau.ch";
param_names[88]= "g_bcc_email_address";  param_values[88] = "";	
var g_bcc_email_address_test = "gunnar@jazzliveaarau.ch";
param_names[89]= "g_bcc_email_address_test";  param_values[89] = "";

var g_msg_last_seat_that_can_be_reserved = "Die Anzahl Reservationen ist limitiert." + "\n" +
													"Sie haben den letzten Sitzplatz gewählt." + "\n" 
													+ "Bitte die gewählten Plätze jetzt reservieren.";
param_names[90]= "g_error_max_number_seat_reservations_exceeded";  param_values[90] = "";

var g_msg_all_available_seats_are_reserved = "Alle Plätze für dieses Konzert sind leider reserviert." + "\n" +
												 "Kommen Sie einfach vorbei - ev. sind Plätze frei geworden.";
param_names[91]= "g_msg_all_available_seats_are_reserved";  param_values[91] = "";

var g_error_max_number_seat_reservations_exceeded_close_window = "Die Anzahl Reservationen ist limitiert." + "\n" +
													"Die freie (weisse) Plätze werden an der Abendkasse verkauft." + "\n" +
                                                    "Bitte dieses Fenster schliessen.";
param_names[92]= "g_error_max_number_seat_reservations_exceeded_close_window";  param_values[92] = "";

var g_warning_max_number_seat_reservations = "Die Anzahl Reservationen ist limitiert." + "\n" +
                                                    "Die Anzahl Plätze die man noch reservieren kann ist ";
param_names[93]= "g_warning_max_number_seat_reservations";  param_values[93] = "";

var g_warning_max_number_seat_reservations_admin = "Die Anzahl Reservationen ist limitiert." + "\n" +
                                                    "Bitte keine zusätzliche Reservationen machen." + "\n" +
                                                    "Anzahl reservierte Plätze über die Grenze ist ";
param_names[94]= "g_warning_max_number_seat_reservations_admin";  param_values[94] = "";
	
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Titles & Messages ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start List Strings //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Returns all strings used in this reservation application to the document 
function getReservationApplicationStrings()
{
    var html_str = "";
	
	
    param_values[0] = g_button_list_reservations_text;
    param_values[1] = g_button_print_reservations_text;
    param_values[2] = g_button_add_reservation_text;
    param_values[3] = g_button_save_reservations_exit_text;
    param_values[4] = g_send_email_text;
    param_values[5] = g_make_reservation_text;
    param_values[6] = g_save_reservation_text;
    param_values[7] = g_title_jazz_live_aarau_reservation;
    param_values[8] = g_reservation_note;	
    param_values[9] = g_requested_seats_text;
    param_values[10] = g_close_window_delete_temporary_files;
    param_values[11] = g_confirmation_sent_close_window;
    param_values[12] = g_send_email_prompt;
    param_values[13] = g_msg_xml_saved_email_sent;
    param_values[14] = g_msg_xml_saved;
    param_values[15] = g_msg_xml_saved_after_delete;
    param_values[16] = g_error_max_number_seat_reservations_exceeded;
    param_values[17] = g_error_opening_window;
    param_values[18] = g_error_next_season_passed;
    param_values[19] = g_error_send_confirmation_mail;

    param_values[20] = g_error_name_and_email_missing;
    param_values[21] = g_error_name_missing;
    param_values[22] = g_error_email_missing;
    param_values[23] = g_error_email_not_valid;
    param_values[24] = g_error_no_reserved_seats_no_reservation_cards;
    param_values[25] = g_list_text_jazz_live_aarau;
    param_values[26] = g_list_text_concert;
    param_values[27] = g_list_text_band;
    param_values[28] = g_list_text_number_reservations;
    param_values[29] = g_list_text_total_number_of_reserved_seats;
	
    param_values[30] = g_list_text_total_number_of_seats;
    param_values[31] = g_list_text_max_number_of_seats;
    param_values[32] = g_list_text_date;
    param_values[33] = g_list_text_reservation_name;
    param_values[34] = g_list_text_reservation_email;
    param_values[35] = g_list_text_reservation_remark;
    param_values[36] = g_liste_text_number_seats;
    param_values[37] = g_list_text_seats;
    param_values[38] = g_confirmation_email_subject;
    param_values[39] = g_confirmation_email_html_font_start;

    param_values[40] = g_confirmation_email_html_title;
    param_values[41] = g_confirmation_email_html_dear_sirs;
    param_values[42] = g_confirmation_email_html_start_paragraph;
    param_values[43] = g_confirmation_email_html_row_1;
    param_values[44] = g_confirmation_email_html_row_2;
    param_values[45] = g_confirmation_email_html_row_3;
    param_values[46] = g_confirmation_email_html_row_4;
    param_values[47] = g_confirmation_email_html_greetings;
    param_values[48] = g_confirmation_email_html_signature;
    param_values[49] = g_confirmation_email_html_end_paragraph;	

    param_values[50] = g_confirmation_email_html_font_end;
    param_values[51] = g_selection_by_somebody_else_reserved;
    param_values[52] = g_selection_select_new_seats;
    param_values[53] = g_error_msg_select_mode;
    param_values[54] = g_error_msg_not_in_select_reservation_mode;
    param_values[55] = g_error_msg_not_reservation_delete_mode;
    param_values[56] = g_error_msg_reservation_delete_and_add_reservation_mode;
    param_values[57] = g_error_msg_not_a_reserved_seat;
    param_values[58] = g_error_msg_save_exit_not_allowed_in_delete_mode;
    param_values[59] = g_error_msg_init_resrvation_not_allowed_in_delete_mode;
	
    param_values[60] = g_error_msg_save_one_resrvation_not_allowed_in_delete_mode;
    param_values[61] = g_error_msg_set_of_deletion_mode_not_allowed_in_select_mode;
    param_values[62] = g_error_msg_save_exit_selection_mode;
    param_values[63] = g_error_msg_no_seats_selected;
    param_values[64] = g_error_msg_name_is_compulsory;
    param_values[65] = g_warning_msg_no_seats_selected;
    param_values[66] = g_error_msg_name_not_set_close_this_window;
    param_values[67] = g_make_all_seats_free;
    param_values[68] = g_make_one_seat_free;
    param_values[69] = g_title_name;
	
    param_values[70] = g_title_table;
    param_values[71] = g_title_seat;
    param_values[72] = g_msg_start_of_deletion_mode;
    param_values[73] = g_msg_end_of_deletion_mode;
    param_values[74] = g_msg_select_reservation_table;
    param_values[75] = g_msg_select_reservation_seat;
    param_values[76] = g_msg_select_reservation_by;
    param_values[77] = g_msg_select_already_reservation;
    param_values[78] = g_title_text_image_reserve_seats;
	param_values[79] = g_title_text_image_select_seats;
	
	param_values[80] = g_title_text_image_reservation_list;
	param_values[81] = g_title_text_image_reservation_print;
	param_values[82] = g_title_text_image_add_reservation;	
	param_values[83] = g_title_text_image_save_reservation;	
	param_values[84] = g_title_text_image_delete_reservation;
	param_values[85] = g_error_surname_or_familyname_missing;	
	param_values[86] = g_confirmation_email_subject_test;
	param_values[87] = g_confirmation_email_html_title_test;
	param_values[88] = g_bcc_email_address;
	param_values[89] = g_bcc_email_address_test;
	
    param_values[90] = g_msg_last_seat_that_can_be_reserved;
    
    param_values[91] = g_msg_all_available_seats_are_reserved;
	
    html_str = html_str + "<h3>Strings in the reservation application</h3>";
	
    html_str = html_str + "<p>";
	
    var n_names = param_names.length;
    var n_values = param_values.length;	
	
	if (n_names != n_values)
	{
		alert("getReservationApplicationStrings n_names= " + n_names.toString() + " not equal n_values= " + n_values.toString());
		return;
	}
	
    for (index_param=0; index_param<n_names; index_param++)
    {
        var param_name = param_names[index_param];
        var param_value = param_values[index_param];
		
        if (param_value.length == 0)
        {
			alert("getReservationApplicationStrings Parameter " + param_name + " has no value!");
        }
		
		html_str = html_str + "<br>";
		html_str = html_str + param_name + "=<br>";
		html_str = html_str + param_value;
		html_str = html_str + "<br>";
    }
	
    html_str = html_str + "</p>";	
	
	return html_str;
	
} // getReservationApplicationStrings

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start List Strings //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Element Identities ////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

var g_id_input_reservation_name = "id_input_reservation_name";

var g_id_reservation_show_concert_date_band = "id_reservation_show_concert_date_band";

var g_id_reservation_select_concert = "id_reservation_select_concert";

var g_id_reservation_search_seats = "id_reservation_search_seats";

var g_id_button_event_list = "buttonEventList";

// "id_reservation_select_or_search"

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Element Identities //////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start String Functions //////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Trims a string (own name that it doesn't exist in some JavaScript library
function trimReservationString(i_string) 
{
    // https://www.w3schools.com/jsref/jsref_trim_string.asp
	
    // return i_string.replace(/^\s+|\s+$/gm,'');
	
   return i_string.trim();
  
} // trimReservationString

// Returns true if there are two or more words in the input string
function twoOrMoreWordsInString(i_string) 
{
    var ret_bool_two = false;
	
	var string_trimmed = trimReservationString(i_string);
	
    index_space =  string_trimmed.indexOf(" ");
	
	if (string_trimmed.length <= 2)
    {
        ret_bool_two = false;
    }
	else if (index_space < 0)
    {
        ret_bool_two = false;
    }	
	else
    {
        ret_bool_two = true;
    }

    return ret_bool_two;
  
} // twoOrMoreWordsInString

// Returns true if the input email address is valid
function validEmailAddress(i_email_address)
{
    var ret_bool_valid = true;

    if (twoOrMoreWordsInString(i_email_address)) // 2022-12-31
    {
        ret_bool_valid = false;	
		return ret_bool_valid;
    }	
	
	var index_pos_end = i_email_address.length;	
    if (index_pos_end <= 5)
    {
        ret_bool_valid = false;	
		return ret_bool_valid;
    }	
   
	// includes() does not work in Internet Explorer.
    var index_pos_amp = i_email_address.indexOf('@');

    if (index_pos_amp < 0)
    {
        ret_bool_valid = false;	
		return ret_bool_valid;
    }
    else if (index_pos_amp == 0)
    {
        ret_bool_valid = false;	
		return ret_bool_valid;
    }
	
	var after_at_str = i_email_address.substring(index_pos_amp);
	
	var index_pos_point = after_at_str.indexOf('.');
	
	if (index_pos_point < 0)
    {
        ret_bool_valid = false;	
		return ret_bool_valid;
    }

    return ret_bool_valid;
   
} // validEmailAddress

// Returns error message if the input string contains illegal XML characters
function stringContainsIllegalCharacter(i_string, i_string_beschreibung)
{
	var ret_error_msg = '';
	
	var illegal_chars = [];
	illegal_chars[0] = '&';
	illegal_chars[1] = '<';
	illegal_chars[2] = '>';
	
	for (var index_illegal=0; index_illegal<illegal_chars.length; index_illegal++)
	{
		var current_illegal_char = illegal_chars[index_illegal];
		
		var index_pos_illegal = i_string.indexOf(current_illegal_char);
		if (index_pos_illegal >= 0)
		{
            ret_error_msg = current_illegal_char + ' ist nicht erlaubt ' + i_string_beschreibung;
			break;
		}
		
	}
	
	return ret_error_msg;
	
} // stringContainsIllegalCharacter

// Replaces ä, ö, and ü with ae, oe and ue. 
// These characters are not allowed as email subject
function replaceInvalidEmailCharacters(i_subject_str)
{
    var ret_subject_str = "";
	
	for (var index_char = 0; index_char < i_subject_str.length; index_char++)
	{
		var current_char = i_subject_str.substring(index_char, index_char + 1);

		if (current_char == " ")
		{
			ret_subject_str = ret_subject_str + " ";   // Don't change
		}
		else if (current_char == "'")
		{
			ret_subject_str = ret_subject_str + "";
		}
		else if (current_char == "ʻ")
		{
			ret_subject_str = ret_subject_str + "";
		}
		else if (current_char == "ʼ")
		{
			ret_subject_str = ret_subject_str + "";
		}
		else if (current_char == "ʽ")
		{
			ret_subject_str = ret_subject_str + "";
		}
		else if (current_char == "ʾ")
		{
			ret_subject_str = ret_subject_str + "";
		}
		else if (current_char == "ʿ")
		{
			ret_subject_str = ret_subject_str + "";
		}
		else if (current_char == "ˈ")
		{
			ret_subject_str = ret_subject_str + "";
		}
		else if (current_char == "ˊ")
		{
			ret_subject_str = ret_subject_str + "";
		}
		else if (current_char == "ˋ")
		{
			ret_subject_str = ret_subject_str + "";
		}
		else if (current_char == "’")
		{
			ret_subject_str = ret_subject_str + "";
		}
		else if (current_char == "\"")
		{
			ret_subject_str = ret_subject_str + "";
		}
		else if (current_char == ",")
		{
			ret_subject_str = ret_subject_str + "";
		}
		else if (current_char == "â")
		{
			ret_subject_str = ret_subject_str + "a";
		}
		else if (current_char == "ā")
		{
			ret_subject_str = ret_subject_str + "a";
		}
		else if (current_char == "á")
		{
			ret_subject_str = ret_subject_str + "a";
		}
		else if (current_char == "ê")
		{
			ret_subject_str = ret_subject_str + "e";
		}
		else if (current_char == "é")
		{
			ret_subject_str = ret_subject_str + "e";
		}
		else if (current_char == "è")
		{
			ret_subject_str = ret_subject_str + "e";
		}
		else if (current_char == "ç")
		{
			ret_subject_str = ret_subject_str + "c";
		}
		else if (current_char == "Ã")
		{
			ret_subject_str = ret_subject_str + "A";
		}
		else if (current_char == "&")
		{
			ret_subject_str = ret_subject_str + "";
		}
		else if (current_char == "ä")
		{
			ret_subject_str = ret_subject_str + "ae";
		}
		else if (current_char == "å")
		{
			ret_subject_str = ret_subject_str + "ao";
		}
		else if (current_char == "Å")
		{
			ret_subject_str = ret_subject_str + "AO";
		}
		else if (current_char == "à")
		{
			ret_subject_str = ret_subject_str + "a";
		}
		else if (current_char == "À")
		{
			ret_subject_str = ret_subject_str + "A";
		}
		else if (current_char == "ü")
		{
			ret_subject_str = ret_subject_str + "ue";
		}
		else if (current_char == "ö")
		{
			ret_subject_str = ret_subject_str + "oe";
		}
		else if (current_char == "ø")
		{
			ret_subject_str = ret_subject_str + "oe";
		}
		else if (current_char == "Ä")
		{
			ret_subject_str = ret_subject_str + "AE";
		}
		else if (current_char == "Ü")
		{
			ret_subject_str = ret_subject_str + "UE";
		}
		else if (current_char == "Ö")
		{
			ret_subject_str = ret_subject_str + "OE";
		}
		else if (current_char == "Ø")
		{
			ret_subject_str = ret_subject_str + "OE";
		}
		else if (current_char == "À")
		{
			ret_subject_str = ret_subject_str + "A";
		}
		else
		{
			ret_subject_str = ret_subject_str + current_char;
		}
	}

	return ret_subject_str;

} // replaceInvalidEmailCharacters

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End String Functions ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////