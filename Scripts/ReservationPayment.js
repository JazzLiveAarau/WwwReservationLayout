// File: ReservationPayment.js
// Date: 2026-03-12
// Author: Gunnar Lidén

// Inhalt
// =============
//
// Main functions for the application reservation payment

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Global Parameters /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Instance of the class ReservationEventXml for the jubilee concert XML data
var g_jubilee_xml = null;

// Instance of the class ReservationEventXml for the jam session XML data
var g_jam_session_xml = null;

// Instance of the class ReservationEventXml for the jubilee concert XML data. New format
var g_jubilee_new_xml = null;

// Instance of the class ReservationEventXml for the jam session XML data. New format
var g_jam_session_new_xml = null;

// The active concert old XML data. 
var g_active_concert_old_xml = null;

// The active concert new format XML data. 
var g_active_concert_new_xml = null;

var g_active_xml_record_number = -12345;

var g_xml_active_old_dir = null;

var g_xml_active_new_dir = null;



// Controls
// --------

// The concert dropdown control
var g_drop_down_concert = null;

// The text box for the search string
var g_textbox_search_string = null;

// The reservation person dropdown control
var g_drop_down_reservation_person = null;

// The text box for the selected reservation person
var g_textbox_selected_person = null;

// The text box for the paid fee
var g_textbox_paid_fee = null;

// The text box for the remark
var g_textbox_remark = null;

// The button for saving the reservation XML record
var g_create_save_reservation_button = null;

// The button for listing the result
var g_create_list_result_button = null;

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Global Parameters ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Main Functions ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Initialization
// 1. Create the controls for this application
//    Call of createReservationPaymentControls
function initReservationPayment()
{
    debugReservationPayment('initReservationPayment Enter');

    createReservationPaymentControls();

    loadXmlFiles();

} // initReservationPayment

// This function is called after the XML files have been loaded
function afterLoadXmlFiles()
{
    debugReservationPayment('afterLoadXmlFiles Enter'); 

    updateNewXmlFiles();

} // afterLoadXmlFiles

function callbackAfterInit()
{
    debugReservationPayment('callbackAfterInit Enter');

} // callbackAfterInit

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Main Functions //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Event Functions ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// User clicked the save reservation button
function onClickOfSaveReservationButton()
{
    debugReservationPayment('onClickOfSaveReservationButton Enter');

     //TODO execSaveReservation();

     //TODO execCreateNamePayment();

} // onClickOfSaveReservationButton

// User selected a concert in the concert dropdown
function eventSelectConcertDropDown()
{ 
    var selected_concert_option_number = g_drop_down_concert.getSelectOptionNumber();

    debugReservationPayment('eventSelectConcertDropDown Option number: ' + selected_concert_option_number);  

    if (1 == selected_concert_option_number)
    {
        g_active_concert_old_xml = g_jubilee_xml;
        g_active_concert_new_xml = g_jubilee_new_xml;

        concertOneOldDirectory();
    }
    else if (2 == selected_concert_option_number)
    {
        g_active_concert_old_xml = g_jam_session_xml;
        g_active_concert_new_xml = g_jam_session_new_xml;
        
        concertTwoOldDirectory();
    }

    debugReservationPayment('eventSelectConcertDropDown g_xml_active_old_dir: ' + g_xml_active_old_dir);

/*

*/

} // eventSelectConcertDropDown

function concertOneOldDirectory()
{
    if (!ReservationEventXml.execApplicationOnServer())
    {
        g_xml_active_old_dir = '/XmlTestData/SaisonXML_Names/';
    }
    else
    {
        g_xml_active_old_dir = '../Reservation/Spagi_76_Chairs_V_1/SaisonXML/';
    }
}

function concertTwoOldDirectory()
{
    if (!ReservationEventXml.execApplicationOnServer())      

    {
        g_xml_active_old_dir = '/XmlTestData/SaisonXML_Tickets/';
    }
    else
    {
        g_xml_active_old_dir = '../Reservation/Spagi_Jam_Session_V2/SaisonXML/';

        // /www/Reservation/Spagi_Jam_Session_V2/SaisonXML
    }

} // concertTwoOldDirectory

// The new XML files for the reservation data have a different format 
function concertNewDirectory()
{
    if (!ReservationEventXml.execApplicationOnServer())      

    {
        g_xml_active_new_dir = '/XmlTestData/SaisonXML_New/';
    }
    else
    {
        g_xml_active_new_dir = '/ReservationLayout/Jubilee/SaisonXML/';
    }

} // concertNewDirectory

// User selected a reservation person in the reservation person dropdown
function eventSelectReservationPersonDropDown()
{ 
    var selected_reservation_person_option_number = g_drop_down_reservation_person.getSelectOptionNumber(); 

    debugReservationPayment('eventSelectReservationPersonDropDown Option number: ' + selected_reservation_person_option_number);

} // eventSelectReservationPersonDropDown

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Event Functions /////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Addd Rocords To Xml New Files /////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Append new reservations to the new XML files that have been added to the old XML files.
// This is implemented as a loop function for the old XML files that append the new records 
// to the new files.

function addNewRecordsToXmlNewFiles()
{
    debugReservationPayment('addNewRecordsToXmlNewFiles Enter');

    for (var index_file=0; index_file < 2; index_file++)
    {
        if (index_file == 0)
        {
            old_xml = g_jubilee_xml;

            new_xml = g_jubilee_new_xml;
        }
    
        if (index_file == 1)
        {
            old_xml = g_jam_session_xml;

            new_xml = g_jam_session_new_xml;
        }

        var n_old_xml = old_xml.getNumberOfReservations();

        if (n_old_xml > 0)
        {
            var b_old_xml = true;

            for (var record_number=1; record_number <= n_old_xml; record_number++)
            {

                var record_old_xml = old_xml.getReservationData(record_number, b_old_xml);

                appendRecordsToNewXmlFileIfNotExisting(record_old_xml, new_xml, old_xml);
            }
        }
        else
        {
            debugReservationPayment('updateNewXmlFiles No records in old XML file: ' + index_file);
        }

        var n_new_xml = new_xml.getNumberOfReservations();

        debugReservationPayment('addNewRecordsToXmlNewFiles n_new_xml= ' + n_new_xml + ' n_old_xml= ' + n_old_xml);

    } // indes_file

    var n_jubilee_old = g_jubilee_xml.getNumberOfReservations();
    debugReservationPayment('addNewRecordsToXmlNewFiles Number of reservations in jubilee old XML: ' + n_jubilee_old);
    var n_jam_session_old = g_jam_session_xml.getNumberOfReservations();
    debugReservationPayment('addNewRecordsToXmlNewFiles Number of reservations in jam session old XML: ' + n_jam_session_old);
    var n_jubilee_new = g_jubilee_new_xml.getNumberOfReservations();
    debugReservationPayment('addNewRecordsToXmlNewFiles Number of reservations in jubilee new XML: ' + n_jubilee_new);
    var n_jam_session_new = g_jam_session_new_xml.getNumberOfReservations();
    debugReservationPayment('addNewRecordsToXmlNewFiles Number of reservations in jam session new XML: ' + n_jam_session_new);


    if(ReservationEventXml.execApplicationOnServer())
    {

        g_jubilee_new_xml.saveFile(xmlJubileeFileSavedCallback);
    }
    else
    {
        alert('Record appended to new XML file. Save is not possible for Live Server.');
    }


} // addNewRecordsToXmlNewFiles

function xmlJubileeFileSavedCallback()
{
    debugReservationPayment('xmlJubileeFileSavedCallback Enter');

    g_jam_session_new_xml.saveFile(callbackAfterInit);

} // xmlJubileeFileSavedCallback


function appendRecordsToNewXmlFileIfNotExisting(i_xml_old_record, i_xml_new_file, i_xml_old_file)
{
    // debugReservationPayment('appendRecordsToNewXmlFileIfNotExisting Enter');

    var b_old_xml = false;

    var b_record_exists_in_new_xml = i_xml_new_file.reservationRecordExists(i_xml_old_record, b_old_xml);

    if (!b_record_exists_in_new_xml)
    {
        var number_records_new_xml = i_xml_new_file.getNumberOfReservations();

        i_xml_new_file.appendReservationData(number_records_new_xml + 1, i_xml_old_record);

    }
    
    //number_records_new_xml = i_xml_new_file.getNumberOfReservations();

    //var number_records_old_xml = i_xml_old_file.getNumberOfReservations();

    //debugReservationPayment('appendRecordsToNewXmlFileIfNotExisting number_records_new_xml: ' + number_records_new_xml + ' number_records_old_xml: ' + number_records_old_xml);

} // appendRecordsToNewXmlFileIfNotExisting


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Addd Rocords To Xml New Files ///////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Delete Data In Xml New Files //////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// If reservation changes have been made in the old files like for instance that a
// whole reservation is deleted or one seat from a reservation is deleted then the new
// XML files shall be updated with these changes.
// This is imlemented as loop function for the new XML files that update the changes in
// the new files.

function updateNewXmlFiles()
{
    debugReservationPayment('updateNewXmlFiles Enter');

    checkInputXmlFiles();

    for (var index_file=0; index_file < 2; index_file++)
    {
        if (index_file == 0)
        {
            old_xml = g_jubilee_xml;

            new_xml = g_jubilee_new_xml;
        }
    
        if (index_file == 1)
        {
            old_xml = g_jam_session_xml;

            new_xml = g_jam_session_new_xml;
        }

        var n_new_xml = new_xml.getNumberOfReservations();

        if (n_new_xml > 0)
        {
            var b_old_xml = false;

            for (var record_number=1; record_number < n_new_xml; record_number++)
            {

                var record_new_xml = new_xml.getReservationData(record_number, b_old_xml);

                updateOneNewXmlFile(record_new_xml, new_xml, old_xml);
            }
        }
        else
        {
            debugReservationPayment('updateNewXmlFiles No records in new XML file: ' + index_file);
        }

    } // index_file

    addNewRecordsToXmlNewFiles();

} // updateNewXmlFiles

function updateOneNewXmlFile(i_xml_new_record, i_xml_new_file, i_xml_old_file)
{
    // debugReservationPayment('updateOneNewXmlFile Enter');

    var b_old_xml = true;
    
    for (var record_number=1; record_number < i_xml_old_file.getNumberOfReservations(); record_number++)
    {
        var record_old_xml = i_xml_old_file.getReservationData(record_number, b_old_xml);

        updateOneNewXmlRecord(i_xml_new_record, record_old_xml);

    } // record_index


} // updateOneNewXmlFile

function updateOneNewXmlRecord(i_xml_new_record, i_xml_old_record)
{
    // debugReservationPayment('updateOneNewXmlRecord Enter');

} // updateOneNewXmlRecord

function checkInputXmlFiles()
{
    debugReservationPayment('checkInputXmlFiles Enter');

    var n_jubilee_old = g_jubilee_xml.getNumberOfReservations();
    debugReservationPayment('checkInputXmlFiles Number of reservations in jubilee old XML: ' + n_jubilee_old);
    var n_jam_session_old = g_jam_session_xml.getNumberOfReservations();
    debugReservationPayment('checkInputXmlFiles Number of reservations in jam session old XML: ' + n_jam_session_old);
    var n_jubilee_new = g_jubilee_new_xml.getNumberOfReservations();
    debugReservationPayment('checkInputXmlFiles Number of reservations in jubilee new XML: ' + n_jubilee_new);
    var n_jam_session_new = g_jam_session_new_xml.getNumberOfReservations();
    debugReservationPayment('checkInputXmlFiles Number of reservations in jam session new XML: ' + n_jam_session_new);


} // checkInputXmlFiles

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Delete Data In Xml New Files ////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Load Xml Files ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Loads the XML files for the reservation data
function loadXmlFiles()
{
   
    concertOneOldDirectory();

    // subdir_xml, event_reg_number, event_number, b_new_file, callback_function_name
    var subdir_xml = g_xml_active_old_dir;

    debugReservationPayment('loadXmlFiles subdir_xml= ' + subdir_xml);

    var event_reg_number = "old"; // Old names for the XML reservation data files

    var event_number =  13;

    var b_new_file = false;

    var callback_function_name = afterLoadJubileeOld;

    g_jubilee_xml = new ReservationEventXml(subdir_xml, event_reg_number, event_number, b_new_file, callback_function_name);

} // loadXmlFiles

// This function is called after the XML file for the jubilee concert old format has been loaded
function afterLoadJubileeOld()
{
    debugReservationPayment('afterLoadJubileeOld Enter');

    concertTwoOldDirectory();

   var subdir_xml = g_xml_active_old_dir;

   debugReservationPayment('afterLoadJubileeOld subdir_xml= ' + subdir_xml);

    var event_reg_number = "old"; // Old names for the XML reservation data files

    var event_number =  1;

    var b_new_file = false;

    var callback_function_name = afterLoadJamSessionOld;

    g_jam_session_xml = new ReservationEventXml(subdir_xml, event_reg_number, event_number, b_new_file, callback_function_name);

} // afterLoadJubileeOld

// This function is called after the XML file for the jam session old format has been loaded
function afterLoadJamSessionOld()
{
    debugReservationPayment('afterLoadJamSessionOld Enter');

    concertNewDirectory();

    // TODO Create new XML start files if not existing. 
    // Copy from from application New Season XML 

   var subdir_xml = g_xml_active_new_dir;

   debugReservationPayment('afterLoadJamSessionOld subdir_xml= ' + subdir_xml);

    var event_reg_number = "REG_353";

    var event_number =  1;

    var b_new_file = false;

    var callback_function_name = afterLoadNewOne;

    g_jubilee_new_xml = new ReservationEventXml(subdir_xml, event_reg_number, event_number, b_new_file, callback_function_name);

} // afterLoadJamSessionOld

// This function is called after the XML file for the jubilee concert new format has been loaded
function afterLoadNewOne()
{
    debugReservationPayment('afterLoadNewOne Enter');

   var subdir_xml = g_xml_active_new_dir;

   debugReservationPayment('afterLoadNewOne subdir_xml= ' + subdir_xml);

    var event_reg_number = "REG_354";

    var event_number =  2;

    var b_new_file = false;

    var callback_function_name = afterLoadXmlFiles;

    g_jam_session_new_xml = new ReservationEventXml(subdir_xml, event_reg_number, event_number, b_new_file, callback_function_name);

} // afterLoadNewOne

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Load Xml Files //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Create Controls ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Creates all the controls for the application
function createReservationPaymentControls()
{
    debugReservationPayment('createReservationPaymentControls Enter');

    createConcertDropdown();

    createTextboxSearchString();

    createReservationPersonDropdown();

    createTextboxSelectedPerson();

    createTextboxPaidFee();

    createTextboxRemark();

    createSaveXmlRecordButton();

    createListResultButton();


} // createReservationPaymentControls

// Creates the concert dropdown control
function createConcertDropdown()
{
    g_drop_down_concert = new JazzDropdown('id_dropdown_concert', 'id_div_dropdown_concert');

    // TODO Get concerts from the reservation XML data and set the concert names in the dropdown control
    var concert_array = [];

	concert_array[0] = 'Jubiläumskonzert';
	concert_array[1] = 'Jam Session';

    g_drop_down_concert.setNameArray(concert_array);

    g_drop_down_concert.setOnchangeFunctionName("eventSelectConcertDropDown");

    g_drop_down_concert.setLabelText('Konzert wählen');

    g_drop_down_concert.setLabelTextPositionAbove();

    g_drop_down_concert.setTitle('Konzert wählen');

} // createConcertDropdown

// Create the text box for the search string 
function createTextboxSearchString()
{
    g_textbox_search_string = new JazzTextBox("id_search_string", 'id_div_search_string');

    g_textbox_search_string.setLabelText("Such-String Reservationname");

    g_textbox_search_string.setLabelTextPositionAbove();

    g_textbox_search_string.setSize("10");

    g_textbox_search_string.setReadOnlyFlag(false);

    g_textbox_search_string.setTitle("Such-String für eine Reservationname eingeben");

} // createTextboxSearchString

// Creates the reservation person dropdown control
function createReservationPersonDropdown()
{
    g_drop_down_reservation_person = new JazzDropdown('id_dropdown_result', 'id_div_dropdown_result');

    // TODO Get reservation persons from the reservation XML data and set the names in the dropdown control
    var reservation_person_array = [];
	reservation_person_array[0] = 'Person 1';
	reservation_person_array[1] = 'Person 2';
	reservation_person_array[2] = 'Person 3';

    g_drop_down_reservation_person.setNameArray(reservation_person_array);

    g_drop_down_reservation_person.setOnchangeFunctionName("eventSelectReservationPersonDropDown");

    g_drop_down_reservation_person.setLabelText('Reservationsname wählen');

    g_drop_down_reservation_person.setLabelTextPositionAbove();

    g_drop_down_reservation_person.setTitle('Reservationsname wählen');

} // createReservationPersonDropdown

// Create the text box for the search string 
function createTextboxSelectedPerson()
{
    g_textbox_selected_person = new JazzTextBox("id_selected_reservation", 'id_div_selected_reservation');

    g_textbox_selected_person.setLabelText("Reservationsname");

    g_textbox_selected_person.setLabelTextPositionAbove();

    g_textbox_selected_person.setSize("28");

    g_textbox_selected_person.setReadOnlyFlag(true);

    g_textbox_selected_person.setTitle("Reservationsname");

} // createTextboxSelectedPerson

// Create the text box for the paid fee
function createTextboxPaidFee()
{
    g_textbox_paid_fee = new JazzTextBox("id_payment_string", 'id_div_payment_string');

    g_textbox_paid_fee.setLabelText("Paid fee");

    g_textbox_paid_fee.setLabelTextPositionAbove();

    g_textbox_paid_fee.setSize("15");

    g_textbox_paid_fee.setReadOnlyFlag(false);

    g_textbox_paid_fee.setTitle("Paid fee");

} // createTextboxPaidFee

// Create the text box for the remark
function createTextboxRemark()
{
    g_textbox_remark = new JazzTextBox("id_remark_string", 'id_div_remark_string');

    g_textbox_remark.setLabelText("Bemerkung");

    g_textbox_remark.setLabelTextPositionAbove();

    g_textbox_remark.setSize("28");

    g_textbox_remark.setReadOnlyFlag(false);

    g_textbox_remark.setTitle("Bemerkung");

} // createTextboxRemark

// Creates a new event program XML file for the new season
function createSaveXmlRecordButton()
{
    g_create_save_reservation_button = new JazzButton('id_save_reservation_button', 'id_div_save_reservation_button');

    g_create_save_reservation_button.setOnclickFunctionName("onClickOfSaveReservationButton");

    g_create_save_reservation_button.setCaption('XML Record speichern');

    g_create_save_reservation_button.setLabelText("");

    g_create_save_reservation_button.setWidth("245px");

    g_create_save_reservation_button.setTitle('XML Record speichern');

} // createSaveXmlRecordButton

// Creates a new event program XML file for the new season
function createListResultButton()
{
    g_create_list_result_button = new JazzButton('id_list_payments_button', 'id_div_list_payments_button');

    g_create_list_result_button.setOnclickFunctionName("onClickOfListResultButton");

    g_create_list_result_button.setCaption('List Result');  

    g_create_list_result_button.setLabelText("");

    g_create_list_result_button.setWidth("245px");

    g_create_list_result_button.setTitle('List Result');

} // createListResultButton



///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Create Controls /////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Set Controls //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Set Controls ////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Debug Function ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Displays the input string in the debugger Console
function debugReservationPayment(i_msg_str)
{
    console.log(i_msg_str);

} // debugReservationPayment

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Debug Function //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////