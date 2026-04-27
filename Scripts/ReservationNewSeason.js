// File: ReservationNewSeason.js
// Date: 2026-04-27
// Author: Gunnar Lidén

// Inhalt
// =============
//
// Main functions for the application reservation new season

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Global Parameters /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Instance of the ApplicationsVersion class
var g_applications_version_object = null;

// Current reservation version (directory)
var g_current_reservation_version_dir = '';

// Main directory 
// Result directory where the generated HTML files and other files shall be stored
var g_main_dir_check_box = null;

// Text box for the main directory
var g_layout_main_dir_text_box = null;

// Result directory where the generated HTML files and other files 
// shall be stored. Directories are for example XML and SaisonXml
var g_layout_server_dir_text_box = null;

// Button for the generation of new season (event) XML files
var g_xml_create_event_files_button = null;

// Button for the creation of a new event program XML file
var g_xml_import_event_program_button = null;

// Instance of ReservationNewSeasonData holding data for the execution
var g_new_season_files_data = null;

// Help button
var g_help_button = null;

// IT info button
var g_it_info_button = null;


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
//    Call of createReservationNewSeasonControls
// 3. Set the controls with data from local storage
//    Call of NewSeasonStorage.getLocal and setNewSeasonControls
function initReservationNewSeason()
{
    debugReservationNewSeason('initReservationNewSeason Enter');

    NewSeasonStorage.initLocal();

    createReservationNewSeasonControls();

    new_season_data = NewSeasonStorage.getLocal();

    setNewSeasonControls(new_season_data);

    eventClickCheckBoxMainDir(); // Set the main directory text box according to the main directory check box

    g_new_season_files_data = null;

    var callback_function_name = setCurrentReservationVersionDir;

    createApplicationsVersionObject(callback_function_name);

} // initReservationNewSeason

// Creates an instance of the ApplicationsVersion class
function createApplicationsVersionObject(i_callback_function_name)
{
    debugReservationNewSeason('createApplicationsVersionObject Enter');

    if (g_applications_version_object != null)
    {
        if (i_callback_function_name.length > 0)
        {
            return i_callback_function_name;
        }
        else
        {
            return;
        }
    }

    var url_relative_dir = '../Homepage/';

    g_applications_version_object = new ApplicationsVersion(i_callback_function_name, url_relative_dir);

} // createApplicationsVersionObject

// Returns the current reservation version (directory) and sets the global variable g_reservation_version
// Callback function after the ApplicationsVersion object has been created and the version 
// information has been retrieved
function setCurrentReservationVersionDir()
{
    // debugReservationNewSeason('setCurrentReservationVersionDir Enter');

    g_current_reservation_version_dir = '';

    var reservation_version_url = '';

    for (var appl_number = 1; appl_number <= g_applications_version_object.getNumberOfApplicationVersionRecords(); appl_number++)
    {
        var appl_name = g_applications_version_object.getApplicationName(appl_number);

        if (appl_name == "MakeReservation")
        {
            reservation_version_url = g_applications_version_object.getApplicationUrl(appl_number);
            
            break;
        }
    } // appl_number

    if (reservation_version_url.length == 0)
    {
        debugReservationNewSeason('setCurrentReservationVersionDir - MakeReservation application version information not found');
        alert('Die Applikationsversionsinformationen für MakeReservation konnten nicht gefunden werden.');
        
        return;
    }

    var index_reservation = reservation_version_url.indexOf("Reservation/");

    if (index_reservation == -1)
    {
        debugReservationNewSeason('setCurrentReservationVersionDir - MakeReservation application version information not found');
        alert('Die Applikationsversionsinformationen für MakeReservation konnten nicht gefunden werden.');
        
        return;
    }

    var search_str = "Reservation/";

    var start_index_version = index_reservation + search_str.length;

    var start_str = reservation_version_url.substring(start_index_version);

    var index_version_end = start_str.indexOf("/MakeReservation", start_index_version);

    g_current_reservation_version_dir = start_str.substring(0, index_version_end);

    debugReservationNewSeason('setCurrentReservationVersionDir Current reservation version (directory): ' + g_current_reservation_version_dir);

} // setCurrentReservationVersionDir

// Set the controls
function setNewSeasonControls(i_new_season_data)
{
    g_layout_main_dir_text_box.setValue(i_new_season_data.getMainDir());  

    g_layout_server_dir_text_box.setValue(i_new_season_data.getResultDir()); 

} // setNewSeasonControls

// Return object ReservationNewSeasonData holding data for the creation of the XML files
function reservationNewSeasonDataObject()
{
    var input_data = getNewSeasonDataInput();

    if (!input_data.dataIsValid())
    {
        return;
    }

    var season_case = 'current';

    var main_dir = input_data.getMainDir(); //Reservation or ReservationLayout
   
    var result_dir = input_data.getResultDir();

    var sub_xml_dir = 'SaisonXML';

    var xml_filename = 'EventProgram.xml';

    var event_program_callback_fctn = callbackEventProgramCreated;

    var ret_exec_data = new ReservationNewSeasonData(season_case, main_dir, result_dir, sub_xml_dir, xml_filename, event_program_callback_fctn);

    return ret_exec_data;

} // reservationNewSeasonDataObject

// Create the event program XML file
function execCreateEventProgramXmlFile()
{
    g_new_season_files_data = reservationNewSeasonDataObject();

    SeasonToEventProgramXml.start();

} // execCreateEventProgramXmlFile

// Callback after creation of the event program XML file
function callbackEventProgramCreated()
{
    setNewSeasonLocalStorageData();

    alert(g_new_season_files_data.msgAllEventProgramFileCreated());

     g_new_season_files_data = null;

} // callbackEventProgramCreated

// Create the event XML files
function execCreateNewXmlEventFiles()
{
     g_new_season_files_data = reservationNewSeasonDataObject();

     CreateXmlEventFiles.start();

} // execCreateNewXmlEventFiles

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Main Functions //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Event Functions ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// User clicked the import season XML file button
function onClickOfImportSeasonXmlButton()
{
    var input_data = getNewSeasonDataInput();

    if (!input_data.dataIsValid())
    {
        return;
    }

    if (!confirmImportSeasonProgramFile(input_data))
    {
        return;
    }

    execCreateEventProgramXmlFile();

} // onClickOfImportSeasonXmlButton

// Confirm with the user that the new XML event program file shall be created and that the existing 
// XML event program file in the target folder will be overwritten
function confirmImportSeasonProgramFile(i_input_data)
{
    var main_dir = i_input_data.getMainDir();

    if (main_dir == "ReservationLayout")
    {
        return true;
    }
 
    var confirm_msg = "Es wird ein neues XML Veranstaltungsprogramm für die neue Saison erstellt. " +
    "Das bereits vorhandenes Veranstaltungsprogramm wird überschrieben. " +
    "Möchten Sie fortfahren?";   
    
    var user_confirmed = confirm(confirm_msg);

    return user_confirmed;

} // confirmImportSeasonProgramFile

// User clicked the create new event XML files button
function onClickOfNewEventXmlFilesButton()
{
    var input_data = getNewSeasonDataInput();

    if (!input_data.dataIsValid())
    {
        return;
    }
    if (!confirmCreateNewXmlEventFiles(input_data))
    {
        return;
    }

    execCreateNewXmlEventFiles();

}// onClickOfNewEventXmlFilesButton

// Confirm with the user that the new XML event files shall be created and that all existing 
// XML event files in the target folder will be overwritten
function confirmCreateNewXmlEventFiles(i_input_data)
{
    var main_dir = i_input_data.getMainDir();

    if (main_dir == "ReservationLayout")
    {
        return true;
    }
 
    var confirm_msg = "Es werden neue XML Reservationsdateien für die neue Saison erstellt. " +
    "Alle bereits vorhandenen XML Reservationsdateien werden überschrieben. " +
    "Möchten Sie fortfahren?";   
    
    var user_confirmed = confirm(confirm_msg);

    return user_confirmed;

} // confirmCreateNewXmlEventFiles

// Returns an instance of NewSeasonData
function getNewSeasonDataInput()
{
    var ret_new_season_data = new NewSeasonData();

    ret_new_season_data.setMainDir(g_layout_main_dir_text_box.getValue());

    ret_new_season_data.setResultDir(g_layout_server_dir_text_box.getValue());

    ret_new_season_data.checkData();

    return ret_new_season_data;

} // getNewSeasonDataInput

// Set the local storage data for the new season
function setNewSeasonLocalStorageData()
{
    var new_season_data = new NewSeasonData();

    new_season_data.setMainDir(g_layout_main_dir_text_box.getValue());

    new_season_data.setResultDir(g_layout_server_dir_text_box.getValue());

    NewSeasonStorage.setLocal(new_season_data);

} // setNewSeasonLocalStorageData

// User clicked the help button
function onClickHelpButton()
{
    var help_url = 'https://jazzliveaarau.ch/Tasks/Documents/A0069.pdf';

    window.open(help_url,'_blank').focus();

} // onClickHelpButton

// User clicked the IT info button
function onClickItInfoButton()
{
    var it_info_url = 'https://jazzliveaarau.ch/Tasks/Documents/A0182.pdf';

    window.open(it_info_url,'_blank').focus();

} // onClickItInfoButton

// User clicked the main directory check box
function eventClickCheckBoxMainDir()
{
    var check_box_value = g_main_dir_check_box.getCheck();

    if (check_box_value == "TRUE")
    {
        g_layout_main_dir_text_box.setValue("ReservationLayout");

        g_layout_server_dir_text_box.setValue(g_current_reservation_version_dir);

        debugReservationNewSeason('eventClickCheckBoxMainDir Directories: ReservationLayout and ' + g_current_reservation_version_dir);
    }
    else    
    {
        g_layout_main_dir_text_box.setValue("Reservation");

        var input_data = getNewSeasonDataInput();

        var result_dir = input_data.getResultDir();
        if (result_dir.length == 0)
        {
            g_layout_server_dir_text_box.setValue(g_current_reservation_version_dir);

            debugReservationNewSeason('eventClickCheckBoxMainDir Storage not defined, using default dir: ' + g_current_reservation_version_dir);
        }
        else
        {   
            g_layout_server_dir_text_box.setValue(result_dir);

            debugReservationNewSeason('eventClickCheckBoxMainDir Directories: Reservation and ' + result_dir);
        }  
    }  // Checkbox FALSE

} // eventClickCheckBoxMainDir

// User clicked the create new event program XML file button
function onClickOfCreateNewEventProgramXmlButton()
{
    var event_program_url = 'https://jazzliveaarau.ch/ReservationLayout/EventProgram.htm';

    window.open(event_program_url,'_blank').focus();

} // onClickOfCreateNewEventProgramXmlButton

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Event Functions /////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Create Controls ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Creates all the controls for the application
function createReservationNewSeasonControls()
{
    createCheckBoxMainDir();

    createTextBoxMainDirectory();

    createTextBoxResultDirectory();

    createImportSeasonXmlButton();

    createNewEventProgramXmlButton();

    createXmlCreateNewButton();

    createHelpButton();

    createItInfoButton();

} // createReservationNewSeasonControls

// Creates the help button 
function createHelpButton()
{
    g_help_button = new JazzButton('id_help_button', 'id_div_help_button');

    g_help_button.setOnclickFunctionName("onClickHelpButton");

    g_help_button.setCaption('Hilfe');

    g_help_button.setLabelText("");

    g_help_button.setWidth("60px");

    g_help_button.setClass("cl_help_button");

    g_help_button.setTitle('Reservationen Initialisierung einer neuen Saison');

} // createHelpButton

// Creates the IT info button 
function createItInfoButton()
{
    g_it_info_button = new JazzButton('id_it_info_button', 'id_div_it_info_button');

    g_it_info_button.setOnclickFunctionName("onClickItInfoButton");

    g_it_info_button.setCaption('IT Info');

    g_it_info_button.setLabelText("");

    g_it_info_button.setWidth("60px");

    g_it_info_button.setClass("cl_help_button");

    g_it_info_button.setTitle('Web Applikation Reservation Neue Saison - Informationen für IT');

} // createItInfoButton

// Creates the main directory check box
function createCheckBoxMainDir()
{
    g_main_dir_check_box = new JazzCheckBox('id_main_dir_check', 'id_div_main_dir_checkbox');

    g_main_dir_check_box.setOninputFunctionName("eventClickCheckBoxMainDir");

    g_main_dir_check_box.setLabelText("Neues Layout ");

     g_main_dir_check_box.setLabelTextPositionLeft();
	
	g_main_dir_check_box.setLabelTextPositionLeft();

     g_main_dir_check_box.setTitle("Markieren, wenn Dateien für ein neues Layout erstellt werden sollen.");

     g_main_dir_check_box.setCheck("FALSE");

} // createCheckBoxMainDir

// Create the text box for the organisation directory
function createTextBoxMainDirectory()
{
    g_layout_main_dir_text_box = new JazzTextBox("id_season_main_dir", 'id_div_season_main_dir');

    g_layout_main_dir_text_box.setLabelText("Gewählter Hauptordner");

    g_layout_main_dir_text_box.setLabelTextPositionAbove();

    g_layout_main_dir_text_box.setSize("20");

    g_layout_main_dir_text_box.setReadOnlyFlag(true);

    g_layout_main_dir_text_box.setTitle("Für Release ist der Ordner Reservation. "+
                    " \nFür ein neues Layout der Ordner ReservationLayout.");

} // createTextBoxMainDirectory

// Create the text box for the result server directory where generated files shall be stored
function createTextBoxResultDirectory()
{
    g_layout_server_dir_text_box = new JazzTextBox("id_season_result_dir", 'id_div_season_result_dir');

    g_layout_server_dir_text_box.setLabelText("2. Ordner für Konzertsaal-Sitzplan");

    g_layout_server_dir_text_box.setLabelTextPositionAbove();

    g_layout_server_dir_text_box.setSize("30");

    g_layout_server_dir_text_box.setReadOnlyFlag(false);

    g_layout_server_dir_text_box.setTitle("Ein Layout (Veranstaltungslokal + Sitzplan) hat ein Name." + 
        "\n Dieser Name ist auch der Name des Ordners auf dem Server."  + 
        "\n Für das aktuelle layout wir der Name von der Homepage übernommen."  + 
        "\n Für ein neues Layout bitte ein neuen Namen eingeben."  + 
        "\n" );

} // createTextBoxResultDirectory

// Creates a new event program XML file for the new season
function createImportSeasonXmlButton()
{
    g_xml_import_event_program_button = new JazzButton('id_event_program_button', 'id_div_event_program_button');

    g_xml_import_event_program_button.setOnclickFunctionName("onClickOfImportSeasonXmlButton");

    g_xml_import_event_program_button.setCaption('3. Von der Homepage importieren');

    g_xml_import_event_program_button.setLabelText("");

    g_xml_import_event_program_button.setWidth("245px");

    g_xml_import_event_program_button.setTitle('Saisonsprogramm von der JAZZ live AARAU Homepage importieren' + 
        '\nDas Reservationssystem hat ein eigenes Veranstaltungsprogramm. Von der Homepage werden'  + 
        '\nDaten, die für das Reservationssystem relevant sind, übernommen.'  + 
        '\n' );

} // createImportSeasonXmlButton

// Creates a new event program XML file for the new season
function createNewEventProgramXmlButton()
{
    g_xml_new_event_program_button = new JazzButton('id_create_new_event_program_button', 'id_div_create_new_event_program_button');

    g_xml_new_event_program_button.setOnclickFunctionName("onClickOfCreateNewEventProgramXmlButton");

    g_xml_new_event_program_button.setCaption('4. Ändern oder neu erstellen');

    g_xml_new_event_program_button.setLabelText("");

    g_xml_new_event_program_button.setWidth("245px");

    g_xml_new_event_program_button.setTitle('Das Veranstaltungsprogramm ändern oder neu erstellen.' + 
        '\nFür das aktuelle Layout sind normalerweise keine Änderungen erforderlich, aber Eintritt '  + 
        '\nfür eine bestimmte Veranstaltung könnte zum Beispiel geändert werden.'  + 
        '\nFür ein neues Layout könnten für Testzwecke Änderungen oder ein neues'+
        '\nVeranstaltungsprogramm nützlich sein.');

} // createNewEventProgramXmlButton

// Creates the event (concert) XML files for the new season
function createXmlCreateNewButton()
{
    g_xml_create_event_files_button = new JazzButton('id_layout_button_xml_new', 'id_div_season_button_xml_new');

    g_xml_create_event_files_button.setOnclickFunctionName("onClickOfNewEventXmlFilesButton");

    g_xml_create_event_files_button.setCaption('5. Neue XML Dateien generieren');

    g_xml_create_event_files_button.setLabelText("");

    g_xml_create_event_files_button.setWidth("245px");

    g_xml_create_event_files_button.setTitle('XML Reservationsdateien generieren und speichern.' + 
        '\nDie Dateien sind für das gewählte Lokal (Layout Ordner) '+ 
        '\nund für das gewählte Veranstaltungsprogramm' + 
        '\n'  + 
        '\nNach dem Generieren bitte Testreservationen als' + 
        '\n Benutzer und Administrator machen!'   );
        
} // createXmlCreateNewButton

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Create Controls /////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Debug Function ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Displays the input string in the debugger Console
function debugReservationNewSeason(i_msg_str)
{
    console.log(i_msg_str);

    UtilServer.appendDebugFile(i_msg_str, 'ReservationNewSeason');

} // debugReservationNewSeason

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Debug Function //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////