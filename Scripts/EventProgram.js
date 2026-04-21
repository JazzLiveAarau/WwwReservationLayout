// File: EventProgram.js
// Date: 2026-04-20
// Author: Gunnar Lidén

// Inhalt
// =============
// Main functions for the application event program

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Global Parameters /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////// Start Main Page /////////////////////////////////////////

// Help button
var g_help_event_program_button = null;

// IT info button
var g_it_info_event_program_button = null;

// Main developmen/release directory 
var g_event_program_main_dir_text_box = null;

// Result directory where the generated HTML files and other files shall be stored
var g_event_program_result_dir_text_box = null;

// The name of the event program XML file name
var g_event_program_xml_filename = 'EventProgram.xml';

// Textbox for the event program XML file name
var g_xml_event_program_filename_text_box = null;

// Button for uploading the event program XML file
var g_upload_event_program_button = null;

// Button for downloading the event program XML file
var g_download_event_program_button = null;

// Button for deleting the event program XML file
var g_delete_event_program_button = null;

// Button for editing the event program XML file
var g_edit_event_program_button = null;

// Dropdown for selecting an event
var g_drop_down_event_program = null;

///////////////////////////////// End Main Page ///////////////////////////////////////////

///////////////////////////////// Start Edit Page /////////////////////////////////////////

// Textbox for the event name
var g_event_name_text_box = null;

// Date picker for the event date
var g_event_date_picker = null;

// Textbox for the event start time
var g_start_time_text_box = null;

// Textbox for the event end time
var g_end_time_text_box = null;

// Textbox for the event place
var g_event_place_text_box = null;

// Textbox for the event address
var g_event_address_text_box = null;

// Textbox for the event organisation
var g_event_organisation_text_box = null;

// Button for the event description text
var g_text_description_button = null;

// Button for the event prices text
var g_text_prices_button = null;

// Button for the event payment methods text
var g_text_payment_button = null;

// Button for the event instructions text
var g_text_instructions_button = null;

// Textbox for the email title
var g_email_title_text_box = null;

// Textbox for the email sender
var g_email_sender_text_box = null;

// Textbox for the email content title
var g_email_content_title_text_box = null;

// Button for the email content
var g_email_content_button = null;

// Check box for event cancelled
var g_event_cancelled_check_box = null;

// Button for saving the record
var g_save_record_button = null;

// Button for canceling the edit of the record
var g_cancel_edit_record_button = null;

///////////////////////////////// End Edit Page //////////////////////////////////////////

///////////////////////////////// Start Text Page /////////////////////////////////////////

// Textbox for the title of the text field
var g_text_field_title_text_box = null;

// Text area for the text field
var g_text_field_text_area = null;

// Button for exiting the text edit and saving the text
var g_exit_text_edit_button = null;

// Button for canceling the text edit
var g_cancel_text_edit_button = null;

///////////////////////////////// End Text Page //////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Global Parameters ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Main Functions ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Initialization
// 1. If local storage not is set (after delete browser cache) set empty strings
//    Call of NewSeasonStorage.initLocal
// 2. Create the controls for this application
//    Call of createEventProgramControls
// 3. Set the controls with data from local storage
//    Call of NewSeasonStorage.getLocal and setNewSeasonControls
function initEventProgram()
{
    debugEventProgram('initEventProgram Enter');

    //displayMainPage();

    NewSeasonStorage.initLocal();

    createEventProgramControls();

    new_season_data = NewSeasonStorage.getLocal();

    setEventProgramControls(new_season_data);

    // g_new_season_files_data = null;

} // initEventProgram

// Set the controls with data from local storage
function setEventProgramControls(i_new_season_data)
{
    debugEventProgram('setEventProgramControls Enter');

} // setEventProgramControls

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Main Functions //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Event Functions ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// User clicked the help button
function onClickHelpEventProgramButton()
{
    // TODO Change URL

    var help_url = 'https://jazzliveaarau.ch/Tasks/Documents/A0069.pdf';

    window.open(help_url,'_blank').focus();

} // onClickHelpEventProgramButton

// User clicked the IT info button
function onClickItInfoEventProgramButton()
{
    // TODO Change URL

    var it_info_url = 'https://jazzliveaarau.ch/Tasks/Documents/A0182.pdf';

    window.open(it_info_url,'_blank').focus();

} // onClickItInfoEventProgramButton

///////////////////////////////// Start Main Page /////////////////////////////////////////

// User clicked the upload event program XML button
function onClickUploadEventProgramButton()
{
   debugEventProgram('onClickUploadEventProgramButton Enter'); 

} // onClickUploadEventProgramButton

// User clicked the download event program XML button
function onClickDownloadEventProgramButton()
{
    debugEventProgram('onClickDownloadEventProgramButton Enter'); 

} // onClickDownloadEventProgramButton

// User clicked the delete event button
function onClickDeleteEventButton()
{
    debugEventProgram('onClickDeleteEventButton Enter');

} // onClickDeleteEventButton

// User clicked the edit event button
function onClickEditEventButton()
{
    debugEventProgram('onClickEditEventButton Enter');

    displayEditPage();

} // onClickEditEventButton

// User selected an event in the event dropdown
function eventSelectEventDropDown()
{
    debugEventProgram('eventSelectEventDropDown Enter');

} // eventSelectEventDropDown

///////////////////////////////// End Main Page ///////////////////////////////////////////

///////////////////////////////// Start Edit Page /////////////////////////////////////////

// User clicked the text description button
function onClickTextDescriptionButton()
{
    debugEventProgram('onClickTextDescriptionButton Enter');

} // onClickTextDescriptionButton

// User clicked the text prices button
function onClickTextPricesButton()
{
    debugEventProgram('onClickTextPricesButton Enter');     

} // onClickTextPricesButton

// User clicked the text payment methods button
function onClickTextPaymentButton()
{
    debugEventProgram('onClickTextPaymentButton Enter');

} // onClickTextPaymentButton

// User clicked the text instructions button
function onClickTextInstructionsButton()
{
    debugEventProgram('onClickTextInstructionsButton Enter');

} // onClickTextInstructionsButton

// User clicked the save record button
function onClickSaveRecordButton()
{
    debugEventProgram('onClickSaveRecordButton Enter');

} // onClickSaveRecordButton

// User clicked the cancel edit record button
function onClickCancelEditRecordButton()
{
    debugEventProgram('onClickCancelEditRecordButton Enter');

} // onClickCancelEditRecordButton

///////////////////////////////// End Edit Page //////////////////////////////////////////


///////////////////////////////// Start Text Page /////////////////////////////////////////

// User clicked the exit and save text edit button
function onClickExitTextEditButton()
{
    debugEventProgram('onClickExitTextEditButton Enter');

} // onClickExitTextEditButton

// User clicked the cancel text edit button
function onClickCancelTextEditButton()
{
    debugEventProgram('onClickCancelTextEditButton Enter');

} // onClickCancelTextEditButton

// User clicked the email content button
function onClickEmailContentButton()
{
    debugEventProgram('onClickEmailContentButton Enter');

} // onClickEmailContentButton

///////////////////////////////// End Text Page //////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Event Functions /////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Create Controls ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Create the controls for this application
function createEventProgramControls()
{
    debugEventProgram('createEventProgramControls Enter');

    createHelpEventProgramButton();

    createItInfoEventProgramButton();

    createTextBoxMainDirectory();

    createTextBoxResultDirectory();

    createTextBoxXmlEventProgramFilename();

    createUploadEventProgramButton();

    createDownloadEventProgramButton();

    createDeleteEventButton();

    createEditEventButton();

    createEventProgramDropdown();


    createTextBoxEventName();

    createDatePickerControl();

    createTextBoxStartTime();

    createTextBoxEndTime();

    createTextBoxEventPlace();

    createTextBoxEventAddress();

    createTextBoxEventOrganisation();

    createTextDescriptionButton();

    createTextPricesButton();

    createTextPaymentButton();

    createTextInstructionsButton();

    createTextBoxEmailTitle();

    createTextBoxEmailSender();

    createTextBoxEmailContentTitle();

    createEmailContentButton();

    createCheckBoxEventCancelled();

    createSaveRecordButton();

    createCancelEditRecordButton();


    createTextBoxTitleTextField();

    createTextAreaForTextField();

    createExitTextEditButton();

    createCancelTextEditButton();

} // createEventProgramControls

///////////////////////////////// Start Main Page /////////////////////////////////////////

// Creates the help button 
function createHelpEventProgramButton()
{
    g_help_event_program_button = new JazzButton('id_help_button', 'id_div_help_button');

    g_help_event_program_button.setOnclickFunctionName("onClickHelpButton");

    g_help_event_program_button.setCaption('Hilfe');

    g_help_event_program_button.setLabelText("");

    g_help_event_program_button.setWidth("60px");

    g_help_event_program_button.setClass("cl_help_button");

    g_help_event_program_button.setTitle('Hilfe zum Eventprogramm');

} // createHelpEventProgramButton

// Creates the IT info button 
function createItInfoEventProgramButton()
{
    g_it_info_event_program_button = new JazzButton('id_it_info_button', 'id_div_it_info_button');

    g_it_info_event_program_button.setOnclickFunctionName("onClickItInfoEventProgramButton");

    g_it_info_event_program_button.setCaption('IT Info');

    g_it_info_event_program_button.setLabelText("");

    g_it_info_event_program_button.setWidth("60px");

    g_it_info_event_program_button.setClass("cl_help_button");

    g_it_info_event_program_button.setTitle('Web Applikation Eventprogramm - Informationen für IT');

} // createItInfoEventProgramButton

// Create the text box for the main developmnet/release directory
function createTextBoxMainDirectory()
{
    g_event_program_main_dir_text_box = new JazzTextBox("id_event_program_main_dir", 'id_div_event_program_main_dir');

    g_event_program_main_dir_text_box.setLabelText("ReservationLayout / Reservation");

    g_event_program_main_dir_text_box.setLabelTextPositionAbove();

    g_event_program_main_dir_text_box.setSize("30");

    g_event_program_main_dir_text_box.setReadOnlyFlag(false);

    g_event_program_main_dir_text_box.setTitle("Für Release Ordner Reservation eingeben");

} // createTextBoxMainDirectory

// Create the text box for the result server directory where generated files shall be stored
function createTextBoxResultDirectory()
{
    g_event_program_result_dir_text_box = new JazzTextBox("id_event_program_result_dir", 'id_div_event_program_result_dir');

    g_event_program_result_dir_text_box.setLabelText("Ordner für Konzertsaal-Sitzplan");

    g_event_program_result_dir_text_box.setLabelTextPositionAbove();

    g_event_program_result_dir_text_box.setSize("30");

    g_event_program_result_dir_text_box.setReadOnlyFlag(false);

    g_event_program_result_dir_text_box.setTitle("Name des Server Ordners für den neuen Konzertsaal.");

} // createTextBoxResultDirectory

// Create the text box for the name of the layout XML file
function createTextBoxXmlEventProgramFilename()
{
    g_xml_event_program_filename_text_box = new JazzTextBox("id_event_program_upload_xml_textbox", 'id_div_event_program_upload_xml_textbox');

    g_xml_event_program_filename_text_box.setLabelText("XML Dateiname");

    g_xml_event_program_filename_text_box.setLabelTextPositionAbove();

    g_xml_event_program_filename_text_box.setSize("33");

    g_xml_event_program_filename_text_box.setReadOnlyFlag(true);

    g_xml_event_program_filename_text_box.setTitle("Zeigt der Name der Veranstaltungsprogramm Datei (XML Format). Dieser Schritt ist optional.");

} // createTextBoxXmlEventProgramFilename

// Creates the upload XML button 
function createUploadEventProgramButton()
{
    g_upload_event_program_button = new JazzButton('id_event_program_upload_xml_button', 'id_div_event_program_upload_xml_button');

    g_upload_event_program_button.setOnclickFunctionName("onClickUploadEventProgramButton");

    g_upload_event_program_button.setCaption('2. Upload');

    g_upload_event_program_button.setLabelText("");

    g_upload_event_program_button.setWidth("80px");

    g_upload_event_program_button.setClass("cl_event_program_button");

    g_upload_event_program_button.setTitle('Schritt 2: Event Programm XML Datei hochladen (optional)');

} // createUploadEventProgramButton

// Creates the download XML button 
function createDownloadEventProgramButton()
{
    g_download_event_program_button = new JazzButton('id_event_program_download_xml_button', 'id_div_event_program_download_xml_button');

    g_download_event_program_button.setOnclickFunctionName("onClickDownloadEventProgramButton");

    g_download_event_program_button.setCaption('Download');

    g_download_event_program_button.setLabelText("");

    g_download_event_program_button.setWidth("80px");

    g_download_event_program_button.setTitle('Event Programm XML Datei herunterladen');

    g_download_event_program_button.setClass("cl_event_program_button");

} // createDownloadEventProgramButton

// Creates the event program dropdown control
function createEventProgramDropdown()
{
    g_drop_down_event_program = new JazzDropdown('id_event_program_select_dropdown', 'id_div_event_program_select_dropdown');

    // TODO Get event 
    var event_array = [];

	event_array[0] = 'Event 1';
	event_array[1] = 'Event 2';

    g_drop_down_event_program.setNameArray(event_array);

    g_drop_down_event_program.setOnchangeFunctionName("eventSelectEventDropDown");

    g_drop_down_event_program.setLabelText('3. Veranstaltung wählen ');

    g_drop_down_event_program.setLabelTextPositionLeft();

    g_drop_down_event_program.setTitle('Veranstaltung wählen');

} // createEventProgramDropdown

// Creates the delete event XML button 
function createDeleteEventButton()
{
    g_delete_event_program_button = new JazzButton('id_select_delete_button', 'id_div_select_delete_button');

    g_delete_event_program_button.setOnclickFunctionName("onClickDeleteEventButton");

    g_delete_event_program_button.setCaption('Löschen');

    g_delete_event_program_button.setLabelText("");

    g_delete_event_program_button.setWidth("80px");

    g_delete_event_program_button.setTitle('Event löschen');

    g_delete_event_program_button.setClass("cl_event_program_button");

} // createDeleteEventButton

// Creates the edit event XML button 
function createEditEventButton()
{
    g_edit_event_program_button = new JazzButton('id_select_edit_button', 'id_div_select_edit_button');

    g_edit_event_program_button.setOnclickFunctionName("onClickEditEventButton");

    g_edit_event_program_button.setCaption('Bearbeiten');

    g_edit_event_program_button.setLabelText("");

    g_edit_event_program_button.setWidth("80px");

    g_edit_event_program_button.setTitle('Event bearbeiten');

    g_edit_event_program_button.setClass("cl_event_program_button");

} // createEditEventButton

///////////////////////////////// End Main Page ///////////////////////////////////////////

///////////////////////////////// Start Edit Page /////////////////////////////////////////

// Create the text box for the name of the layout XML file
function createTextBoxEventName()
{
    g_event_name_text_box = new JazzTextBox("id_event_name", 'id_div_event_name');

    g_event_name_text_box.setLabelText("Name der Veranstaltung");

    g_event_name_text_box.setLabelTextPositionAbove();

    g_event_name_text_box.setSize("69");

    g_event_name_text_box.setReadOnlyFlag(false);

    g_event_name_text_box.setTitle("Name der Veranstaltung eingeben oder ändern");

} // createTextBoxEventName

// Create the date picker control
function createDatePickerControl()
{
    g_event_date_picker = new JazzDatePicker('id_event_date', 'id_div_event_date');

    g_event_date_picker.setLabelText("Datum ");

    g_event_date_picker.setSize("7");

    g_event_date_picker.setLabelTextPositionLeft();

    g_event_date_picker.setTitle("Datum der Veranstaltung eingeben oder ändern");

    // g_event_date_picker.setOnchangeFunctionName("eventUserSelectedRecordDate");

    g_event_date_picker.startDatePicker();
  
} // createDatePickerControl

// Create the text box for the start time of the event
function createTextBoxStartTime()
{
    g_start_time_text_box = new JazzTextBox("id_event_start_time", 'id_div_event_start_time');

    g_start_time_text_box.setLabelText("Startzeit ");

    g_start_time_text_box.setLabelTextPositionLeft();

    g_start_time_text_box.setSize("6");

    g_start_time_text_box.setReadOnlyFlag(false);

    g_start_time_text_box.setTitle("Startzeit der Veranstaltung eingeben oder ändern");

} // createTextBoxStartTime

// Create the text box for the start time of the event
function createTextBoxEndTime()
{
    g_end_time_text_box = new JazzTextBox("id_event_end_time", 'id_div_event_end_time');

    g_end_time_text_box.setLabelText("Endzeit ");

    g_end_time_text_box.setLabelTextPositionLeft();

    g_end_time_text_box.setSize("6");

    g_end_time_text_box.setReadOnlyFlag(false);

    g_end_time_text_box.setTitle("Endzeit der Veranstaltung eingeben oder ändern");

} // createTextBoxEndTime

// Create the text box for the start time of the event
function createTextBoxEventPlace()
{
    g_event_place_text_box = new JazzTextBox("id_event_place", 'id_div_event_place');

    g_event_place_text_box.setLabelText("Lokal");

    g_event_place_text_box.setLabelTextPositionAbove();

    g_event_place_text_box.setSize("25");

    g_event_place_text_box.setReadOnlyFlag(false);

    g_event_place_text_box.setTitle("Lokal der Veranstaltung eingeben oder ändern");

} // createTextBoxEventPlace

// Create the text box for the start time of the event
function createTextBoxEventAddress()
{
    g_event_address_text_box = new JazzTextBox("id_event_address", 'id_div_event_address');

    g_event_address_text_box.setLabelText("Adresse");

    g_event_address_text_box.setLabelTextPositionAbove();

    g_event_address_text_box.setSize("45");

    g_event_address_text_box.setReadOnlyFlag(false);

    g_event_address_text_box.setTitle("Adresse der Veranstaltung eingeben oder ändern");

} // createTextBoxEventAddress

// Create the text box for the name of the layout XML file
function createTextBoxEventOrganisation()
{
    g_event_organisation_text_box = new JazzTextBox("id_event_organisation", 'id_div_event_organisation');

    g_event_organisation_text_box.setLabelText("Veranstalter");

    g_event_organisation_text_box.setLabelTextPositionAbove();

    g_event_organisation_text_box.setSize("66");

    g_event_organisation_text_box.setReadOnlyFlag(false);

    g_event_organisation_text_box.setTitle("Event Veranstalter eingeben oder ändern");

} // createTextBoxEventOrganisation

// Creates the text description button 
function createTextDescriptionButton()
{
    g_text_description_button = new JazzButton('id_text_description_button', 'id_div_text_description_button');

    g_text_description_button.setOnclickFunctionName("onClickTextDescriptionButton");

    g_text_description_button.setCaption('Beschreibung');

    g_text_description_button.setLabelText("");

    g_text_description_button.setWidth("110px");

    g_text_description_button.setTitle('Beschreibung eingeben oder ändern');

    g_text_description_button.setClass("cl_event_program_button");

} // createTextDescriptionButton

// Creates the text prices button 
function createTextPricesButton()
{
    g_text_prices_button = new JazzButton('id_text_prices_button', 'id_div_text_prices_button');

    g_text_prices_button.setOnclickFunctionName("onClickTextPricesButton");

    g_text_prices_button.setCaption('Preise');

    g_text_prices_button.setLabelText("");

    g_text_prices_button.setWidth("110px");

    g_text_prices_button.setTitle('Preise eingeben oder ändern');

    g_text_prices_button.setClass("cl_event_program_button");

} // createTextPricesButton

// Creates the text payment methods button 
function createTextPaymentButton()
{
    g_text_payment_button = new JazzButton('id_text_pay_button', 'id_div_text_pay_button');

    g_text_payment_button.setOnclickFunctionName("onClickTextPaymentButton");

    g_text_payment_button.setCaption('Zahlung');

    g_text_payment_button.setLabelText("");

    g_text_payment_button.setWidth("110px");

    g_text_payment_button.setTitle('Zahlungsmethoden wie TWINT, Bankkonto und bar eingeben oder ändern');

    g_text_payment_button.setClass("cl_event_program_button");

} // createTextPaymentButton

// Creates the text instructions button 
function createTextInstructionsButton()
{
    g_text_instructions_button = new JazzButton('id_text_instructions_button', 'id_div_text_instructions_button');

    g_text_instructions_button.setOnclickFunctionName("onClickTextInstructionsButton");

    g_text_instructions_button.setCaption('Anweisungen');

    g_text_instructions_button.setLabelText("");

    g_text_instructions_button.setWidth("110px");

    g_text_instructions_button.setTitle('Anweisungen eingeben oder ändern');

    g_text_instructions_button.setClass("cl_event_program_button");

} // createTextInstructionsButton

// Creates the event cancelled check box
function createCheckBoxEventCancelled()
{
    g_event_cancelled_check_box = new JazzCheckBox('id_event_cancel', 'id_div_event_cancel');

    //QQQ g_event_cancelled_check_box.setOninputFunctionName("eventClickCheckBoxEventCancelledled");

    g_event_cancelled_check_box.setLabelText("Veranstaltung abgesagt ");
	
	g_event_cancelled_check_box.setLabelTextPositionLeft();

     g_event_cancelled_check_box.setTitle("Markieren, wenn die Veranstaltung abgesagt ist.");

     g_event_cancelled_check_box.setCheck("FALSE");

} // createCheckBoxEventCancelled

// Create the text box for the email title
function createTextBoxEmailTitle()
{
    g_email_title_text_box = new JazzTextBox("id_email_title", 'id_div_email_title');

    g_email_title_text_box.setLabelText("Betreff");

    g_email_title_text_box.setLabelTextPositionAbove();

    g_email_title_text_box.setSize("30");

    g_email_title_text_box.setReadOnlyFlag(false);

    g_email_title_text_box.setTitle("Betreff der E-Mail eingeben oder ändern");

} // createTextBoxEmailTitle

// Create the text box for the email sender
function createTextBoxEmailSender()
{
    g_email_sender_text_box = new JazzTextBox("id_email_sender", 'id_div_email_sender');

    g_email_sender_text_box.setLabelText("Absender");

    g_email_sender_text_box.setLabelTextPositionAbove();

    g_email_sender_text_box.setSize("30");

    g_email_sender_text_box.setReadOnlyFlag(false);

    g_email_sender_text_box.setTitle("Absender der E-Mail eingeben oder ändern");

} // createTextBoxEmailSender

// Create the text box for the email content title
function createTextBoxEmailContentTitle()
{
    g_email_content_title_text_box = new JazzTextBox("id_email_content_title", 'id_div_email_content_title');

    g_email_content_title_text_box.setLabelText("Inhalt Titel");

    g_email_content_title_text_box.setLabelTextPositionAbove();

    g_email_content_title_text_box.setSize("30");

    g_email_content_title_text_box.setReadOnlyFlag(false);

    g_email_content_title_text_box.setTitle("Inhalt Titel der E-Mail eingeben oder ändern");

} // createTextBoxEmailContentTitle

// Creates the email content button 
function createEmailContentButton()
{
    g_email_content_button = new JazzButton('id_email_content_button', 'id_div_email_content_button');

    g_email_content_button.setOnclickFunctionName("onClickEmailContentButton");

    g_email_content_button.setCaption('Inhalt');

    g_email_content_button.setLabelText("");

    g_email_content_button.setWidth("110px");

    g_email_content_button.setTitle('Inhalt der E-Mail eingeben oder ändern');

    g_email_content_button.setClass("cl_event_program_button");

} // createEmailContentButton

// Creates the save record button 
function createSaveRecordButton()
{
    g_save_record_button = new JazzButton('id_save_record_button', 'id_div_save_record_button');

    g_save_record_button.setOnclickFunctionName("onClickSaveRecordButton");

    g_save_record_button.setCaption('Speichern');

    g_save_record_button.setLabelText("");

    g_save_record_button.setWidth("110px");

    g_save_record_button.setTitle('Speichern der eingegebenen oder geänderten Daten');

    g_save_record_button.setClass("cl_event_program_button");

} // createSaveRecordButton

// Creates the cancel edit record button 
function createCancelEditRecordButton()
{
    g_cancel_edit_record_button = new JazzButton('id_cancel_edit_record_button', 'id_div_cancel_edit_record_button');

    g_cancel_edit_record_button.setOnclickFunctionName("onClickCancelEditRecordButton");

    g_cancel_edit_record_button.setCaption('Abbrechen');

    g_cancel_edit_record_button.setLabelText("");

    g_cancel_edit_record_button.setWidth("110px");

    g_cancel_edit_record_button.setTitle('Bearbeitung der eingegebenen oder geänderten Daten abbrechen');

    g_cancel_edit_record_button.setClass("cl_event_program_button");

} // createCancelEditRecordButton

///////////////////////////////// End Edit Page //////////////////////////////////////////


///////////////////////////////// Start Text Page /////////////////////////////////////////

// Create the text box for the title of the text field
function createTextBoxTitleTextField()
{
    g_text_field_title_text_box = new JazzTextBox("id_event_text_title", 'id_div_event_text_title');

    g_text_field_title_text_box.setLabelText("Titel des Textfeldes");

    g_text_field_title_text_box.setLabelTextPositionAbove();

    g_text_field_title_text_box.setSize("66");

    g_text_field_title_text_box.setReadOnlyFlag(true);

    g_text_field_title_text_box.setTitle("Zeigt den Titel des Textfeldes.");

} // createTextBoxTitleTextField

// Create the text area for the text field
function createTextAreaForTextField()
{
    g_text_field_text_area = new JazzTextArea("id_event_text_field", 'id_div_event_text_field', "15", "70");

    //g_text_field_text_area.setLabelText("");

    //g_text_field_text_area.setLabelTextPositionAbove();

    //QQ g_text_field_text_area.setSize("66");

    g_text_field_text_area.setReadOnlyFlag(true);

    g_text_field_text_area.setTitle("Text eingeben oder ändern");

} // createTextAreaForTextField

// Creates the exit and save text edit button 
function createExitTextEditButton()
{
    g_exit_text_edit_button = new JazzButton('id_exit_text_edit_button', 'id_div_exit_text_edit_button');

    g_exit_text_edit_button.setOnclickFunctionName("onClickExitTextEditButton");

    g_exit_text_edit_button.setCaption('Übernehmen');

    g_exit_text_edit_button.setLabelText("");

    g_exit_text_edit_button.setWidth("110px");

    g_exit_text_edit_button.setTitle('Ende Text Bearbeitung und speichern vom Text');

    g_exit_text_edit_button.setClass("cl_event_program_button");

} // createExitTextEditButton

// Creates the cancel text edit button 
function createCancelTextEditButton()
{
    g_cancel_text_edit_button = new JazzButton('id_cancel_text_edit_button', 'id_div_cancel_text_edit_button');

    g_cancel_text_edit_button.setOnclickFunctionName("onClickCancelTextEditButton");

    g_cancel_text_edit_button.setCaption('Abbrechen');

    g_cancel_text_edit_button.setLabelText("");

    g_cancel_text_edit_button.setWidth("110px");

    g_cancel_text_edit_button.setTitle('Ende Bearbeitung Text ohne zu speichern');

    g_cancel_text_edit_button.setClass("cl_event_program_button");

} // createCancelTextEditButton

///////////////////////////////// End Text Page //////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Create Controls /////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Display Functions /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Display the main page and hide the other pages
function displayMainPage()
{
    getElementDivMainPage().style.display = 'block';

    getElementDivEditPage().style.display = 'none';

    getElementDivTextPage().style.display = 'none';

} // displayMainPage

// Display the edit page and hide the other pages
function displayEditPage()
{
    getElementDivMainPage().style.display = 'none';

    getElementDivEditPage().style.display = 'block';

    getElementDivTextPage().style.display = 'none';

} // displayEditPage

// Display the text page and hide the other pages
function displayTextPage()
{
    getElementDivMainPage().style.display = 'none'; 

    getElementDivEditPage().style.display = 'none';

    getElementDivTextPage().style.display = 'block';

} // displayTextPage

// Returns the div element main page
function getElementDivMainPage()
{
    return document.getElementById(getIdMainPage());

} // getElementDivMainPage

// Returns the id of the main page div element
function getIdMainPage()
{
    return 'id_main_page';

} // getIdMainPage

// Returns the div element edit page
function getElementDivEditPage()
{
    return document.getElementById(getIdEditPage());

} // getElementDivEditPage

// Returns the id of the edit page div element
function getIdEditPage()
{
    return 'id_edit_page';

} // getIdEditPage

// Returns the div element text page
function getElementDivTextPage()
{
    return document.getElementById(getIdTextPage());    

} // getElementDivTextPage

// Returns the id of the text page div element
function getIdTextPage()
{
    return 'id_text_page';

} // getIdTextPage

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Display Functions ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Debug Function ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Displays the input string in the debugger Console
function debugEventProgram(i_msg_str)
{
    console.log(i_msg_str);

    UtilServer.appendDebugFile(i_msg_str, 'EventProgram');

} // debugEventProgram

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Debug Function //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////