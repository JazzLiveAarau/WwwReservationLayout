// File: ReservationCards.js
// Date: 2026-03-02
// Author: Gunnar Lidén

// Inhalt
// =============
//
// Main functions for the application reservation cards

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Global Parameters /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Main directory 
var g_xml_data_dir_text_box = null;

// Result directory where the generated HTML files and other files shall be stored
var g_result_dir_text_box = null;

// Button for the generation of new season (event) XML files
var g_create_ticket_cards_button = null;

// Button for the creation of a new event program XML file
var g_create_name_cards_button = null;

// URL for the server directory for the XML reservation data 
var g_xml_data_dir = "";

// URL for the server directory where the generated files shall be stored
var g_result_dir = "";

// Instance of the class ReservationEventXml for the handling of the reservation XML data
var g_reservation_event_xml = null;

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
//    Call of createReservationCardsControls
// 3. Set the controls with data from local storage
//    Call of NewSeasonStorage.getLocal and setNewSeasonControls
function initReservationCards()
{
    debugReservationCards('initReservationCards Enter');

    createReservationCardsControls();

    setReservationCardsControls();

} // initReservationCards

function execCreateNameCards()
{
    debugReservationCards('execCreateNameCards Enter');

    // Creates the instance of the class
    // i_callback_function_name: Function that shall be called after loading
    // i_subdir_xml: The subdirctory for the event XML file
    // i_event_reg_number: Event registration number REG_xyz (a string)
    // i_event_number: Event number that will used for the name of the event XML file
    // i_b_new_file: Flag telling if the event XML file shall be created

    // subdir_xml, event_reg_number, event_number, b_new_file, callback_function_name
    var subdir_xml = g_xml_data_dir;

    var event_reg_number = "old"; // Old names for the XML reservation data files

    var event_number =  13;

    var b_new_file = false;

    var callback_function_name = afterLoadingOfNameCardsXmlData;

    g_reservation_event_xml = new ReservationEventXml(subdir_xml, event_reg_number, event_number, b_new_file, callback_function_name);

} // execCreateNameCards

function afterLoadingOfNameCardsXmlData()
{
    debugReservationCards('afterLoadingOfNameCardsXmlData Enter');

} // afterLoadingOfNameCardsXmlData

function execCreateTicketCards()
{
    debugReservationCards('execCreateTicketCards Enter');   

} // execCreateTicketCards

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Main Functions //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Event Functions ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

function onClickOfNameCardsButton()
{
    debugReservationCards('onClickOfNameCardsButton Enter');

     execCreateNameCards();

} // onClickOfNameCardsButton

// User clicked the create new event XML files button
function onClickOfTicketCardsButton()
{
    debugReservationCards('onClickOfTicketCardsButton Enter');

    execCreateTicketCards();

}// onClickOfTicketCardsButton

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Create Controls ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Creates all the controls for the application
function createReservationCardsControls()
{
    createTextBoxXmlDataDirectory();

    createTextBoxResultDirectory();

    createNameCardsButton();

    createTicketCardsButton();

} // createReservationCardsControls

// Create the text box for the organisation directory
function createTextBoxXmlDataDirectory()
{
    g_xml_data_dir_text_box = new JazzTextBox("id_xml_data_dir", 'id_div_xml_data_dir');

    g_xml_data_dir_text_box.setLabelText("Ordner Reservationsdaten");

    g_xml_data_dir_text_box.setLabelTextPositionAbove();

    g_xml_data_dir_text_box.setSize("30");

    g_xml_data_dir_text_box.setReadOnlyFlag(false);

    g_xml_data_dir_text_box.setTitle("Name des Server Ordners für die XML Daten der Reservationen.");

} // createTextBoxXmlDataDirectory

// Create the text box for the result server directory where generated files shall be stored
function createTextBoxResultDirectory()
{
    g_result_dir_text_box = new JazzTextBox("id_cards_result_dir", 'id_div_cards_result_dir');

    g_result_dir_text_box.setLabelText("Ordner für Resultate");

    g_result_dir_text_box.setLabelTextPositionAbove();

    g_result_dir_text_box.setSize("30");

    g_result_dir_text_box.setReadOnlyFlag(false);

    g_result_dir_text_box.setTitle("Name des Server Ordners für die Resultate.");

} // createTextBoxResultDirectory

// Creates a new event program XML file for the new season
function createNameCardsButton()
{
    g_create_name_cards_button = new JazzButton('id_name_cards_button', 'id_div_name_cards_button');

    g_create_name_cards_button.setOnclickFunctionName("onClickOfNameCardsButton");

    g_create_name_cards_button.setCaption('Namensschilder generieren');

    g_create_name_cards_button.setLabelText("");

    g_create_name_cards_button.setWidth("245px");

    g_create_name_cards_button.setTitle('Namensschilder generieren und speichern');

} // createNameCardsButton

// Creates the event (concert) XML files for the new season
function createTicketCardsButton()
{
    g_create_ticket_cards_button = new JazzButton('id_ticket_cards_button', 'id_div_ticket_cards_button');

    g_create_ticket_cards_button.setOnclickFunctionName("onClickOfTicketCardsButton");

    g_create_ticket_cards_button.setCaption('Eintrittskarten generieren');

    g_create_ticket_cards_button.setLabelText("");

    g_create_ticket_cards_button.setWidth("245px");

    g_create_ticket_cards_button.setTitle('Eintrittskarten generieren und speichern');

} // createTicketCardsButton

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Create Controls /////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Set Controls //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

function setReservationCardsControls()
{
    if (ReservationEventXml.execApplicationOnServer)
    {
        g_xml_data_dir = '/XmlTestData/SaisonXML/';
    }
    else
    {
        g_xml_data_dir = '../Reservation/Spagi_76_Chairs_V_1/SaisonXML/';
    }

    g_xml_data_dir_text_box.setValue(g_xml_data_dir);

} // setReservationCardsControls

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Set Controls ////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Debug Function ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Displays the input string in the debugger Console
function debugReservationCards(i_msg_str)
{
    console.log(i_msg_str);

} // debugReservationCards

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Debug Function //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////