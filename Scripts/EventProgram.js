// File: EventProgram.js
// Date: 2026-04-22
// Author: Gunnar Lidén

// Inhalt
// =============
// Main functions for the application event program

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Global Parameters /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////// Start Main Page /////////////////////////////////////////

// The current event number. This is set when the user selects an event in the dropdown. 
var g_current_event_number = -1234;

// The event text field object for the text edit page. 
// This is set when the user clicks on one of the text buttons in the edit page.
var g_event_text_field = null;

// The main server directory for the event program XML file. This is set by the user in the text box for the main directory
var g_event_program_target_main_dir = null;

// The server directory for the event program XML file. This is set by the user in the text box for the result directory
var g_event_program_target_result_dir = null;

// The server directory for the event program XML file. This is set by the user in the text box for the main directory and the text box for the result directory
var g_event_program_xml_server_dir = null;

// The name of the event program XML file name
var g_event_program_xml_filename = 'EventProgram.xml';

// Flag if the event program XML file exists on the server
var g_event_program_xml_file_exists = false;

// The event program XML object
var g_event_program_xml_object = null;

// Help button
var g_help_event_program_button = null;

// IT info button
var g_it_info_event_program_button = null;

// Main developmen/release directory 
var g_event_program_main_dir_text_box = null;

// Result directory where the generated HTML files and other files shall be stored
var g_event_program_result_dir_text_box = null;

// Control for uploading of an XML program file
var g_program_xml_upload = null;

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

    displayMainPage();

    NewSeasonStorage.initLocal();

    createEventProgramControls();

    var new_season_data = NewSeasonStorage.getLocal();

    setEventProgramControls(new_season_data);

    setGlobalProgramXmlVariablesFromControls();

    determinIfEventProgramXmlFileExistsOnServer();
    
} // initEventProgram

// Checks if the event program XML file exists on the server 
function determinIfEventProgramXmlFileExistsOnServer()
{
    debugEventProgram('determinIfEventProgramXmlFileExistsOnServer Enter');

    g_event_program_xml_file_exists = false;

    hideEventProgramSection();

    //TODO UtilServer.checkIfFileExistsOnServer(url_xml, callbackFileExists, callbackFileNotExists);

    var util_files_data = new UtilFilesData();

    var absolute_file_name = getAbsUrlToProgramXmlFile();

    var relative_path_php_dir = './Php/';

    util_files_data.setDataExecCaseFileExists(absolute_file_name, relative_path_php_dir, 
            callbackProgramXmlFileExists, callbackProgramXmlFileNotExists);

    UtilFiles.dirFileAnyCase(util_files_data);

} // determinIfEventProgramXmlFileExistsOnServer

// Callback function if the file exists on the server
function callbackProgramXmlFileExists()
{
    debugEventProgram('callbackProgramXmlFileExists Enter');
    
    g_event_program_xml_file_exists = true;

    displayEventProgramSection();

    createEventProgramXmlObject();

} // callbackProgramXmlFileExists

// Callback function if the file does not exist on the server
function callbackProgramXmlFileNotExists()
{
    debugEventProgram('callbackProgramXmlFileNotExists Enter');

    g_event_program_xml_file_exists = false;

    hideEventProgramSection();

} // callbackProgramXmlFileNotExists

// Creates the event program XML object
function createEventProgramXmlObject()
{
    var rel_url_xml = getRelUrlToProgramXmlDir();

    debugEventProgram('createEventProgramXmlObject rel_url_xml: ' + rel_url_xml);

    g_event_program_xml_object = 
        new EventProgramXml(rel_url_xml, g_event_program_xml_filename, eventProgramXmlObjectCreated);

} // createEventProgramXmlObject

// Callback function when the event program XML object has been created
function eventProgramXmlObjectCreated()
{
    debugEventProgram('eventProgramXmlObjectCreated Enter');

    createEventTextFieldObject();

    setEventProgramDropdownControl();

    setEventRecordControls();

} // eventProgramXmlObjectCreated

// Creates the event text field object for the text edit page
function createEventTextFieldObject()
{
    debugEventProgram('createEventTextFieldObject Enter');

    g_event_text_field = new EventTextField();

} // createEventTextFieldObject

// Sets the event program dropdown control with the event names from the event program XML file
function setEventProgramDropdownControl()
{
    var b_only_coming = true;

    var event_name_array = g_event_program_xml_object.getEventNameArray(b_only_coming);

    debugEventProgram('setEventProgramDropdownControl n_elements event_name_array: ' + event_name_array.length);

    var date_foramt = 'swiss';
    var event_date_array = g_event_program_xml_object.getEventDateArray(b_only_coming, date_foramt);

    var event_name_date_array = [];

    for (var event_index=0; event_index<event_name_array.length; event_index++)
    {
        event_name_date_array[event_index] =event_date_array[event_index] + '  ' + event_name_array[event_index];
    }

    g_drop_down_event_program.setNameArray(event_name_date_array);

} // setEventProgramDropdownControl

// Set the controls with data from local storage
function setEventProgramControls(i_new_season_data)
{
    debugEventProgram('setEventProgramControls Enter');

    g_event_program_main_dir_text_box.setValue(i_new_season_data.getMainDir());  

    g_event_program_result_dir_text_box.setValue(i_new_season_data.getResultDir()); 

    g_xml_event_program_filename_text_box.setValue(g_event_program_xml_filename);

} // setEventProgramControls

// Hide the section with the event program controls
function setEventRecordControls()
{
    debugEventProgram('setEventRecordControls Enter');

    var n_events = g_event_program_xml_object.getNumberOfEvents();

    if (g_current_event_number < 1 || g_current_event_number > n_events)
    {
        debugEventProgram('setEventRecordControls g_current_event_number < 0 or g_current_event_number > n_events g_current_event_number= ' 
            + g_current_event_number + ' n_events= ' + n_events);

        alert('Invalid event number g_current_event_number= ' + g_current_event_number + ' n_events= ' + n_events);

        return;
    }


    // Textbox for the event name
    g_event_name_text_box.setValue(g_event_program_xml_object.getEventName(g_current_event_number));

    // Date picker for the event date
    var event_day = g_event_program_xml_object.getDay(g_current_event_number);
    var event_month = g_event_program_xml_object.getMonth(g_current_event_number);
    var event_year = g_event_program_xml_object.getYear(g_current_event_number);
    var iso_date_str = UtilDate.getIsoDateString(event_year, event_month, event_day);
    g_event_date_picker.setValue(iso_date_str);

    // Textbox for the event start time
    var start_hour = g_event_program_xml_object.getStartHour(g_current_event_number);
    var start_minute = g_event_program_xml_object.getStartMinute(g_current_event_number);
    var start_colon_time_str = getColonTimeString(start_hour, start_minute);
    g_start_time_text_box.setValue(start_colon_time_str);

    // Textbox for the event end time
    var end_hour = g_event_program_xml_object.getEndHour(g_current_event_number);
    var end_minute = g_event_program_xml_object.getEndMinute(g_current_event_number);
    var end_colon_time_str = getColonTimeString(end_hour, end_minute);
    g_end_time_text_box.setValue(end_colon_time_str);
    
    // Textbox for the event place
    var event_place = g_event_program_xml_object.getPlace(g_current_event_number);
    g_event_place_text_box.setValue(event_place);

    // Textbox for the event address
    var event_address = g_event_program_xml_object.getAddress(g_current_event_number);
    g_event_address_text_box.setValue(event_address);

    // Textbox for the event organisation
    // TODO var event_organisation = g_event_program_xml_object.getOrganisation(g_current_event_number);
    var event_organisation = 'JAZZ live AARAU';
    g_event_organisation_text_box.setValue(event_organisation);

    // Textbox for the email title
    var email_title = g_event_program_xml_object.getEmailSubject(g_current_event_number);
    g_email_title_text_box.setValue(email_title);

    // TODO var email_sender = g_event_program_xml_object.getEmailSender(g_current_event_number);
    var email_sender = 'reservation@jazzliveaarau.ch';
    g_email_sender_text_box.setValue(email_sender);

    // Textbox for the email content title
    var email_content_title = g_event_program_xml_object.getEmailHeader(g_current_event_number);
    g_email_content_title_text_box.setValue(email_content_title);

    // Check box for event cancelled
    var b_cancelled_str = g_event_program_xml_object.getCancelled(g_current_event_number);
    g_event_cancelled_check_box.setCheck(b_cancelled_str);

} // setEventRecordControls

// Class for the text fields in the text edit page. 
// This class is used for the description, prices, payment methods and instructions text fields. 
// It contains the field name and the XML get and set function names for the text field. 
// It also contains a function to set the controls of the text field page with the data 
// from the event program XML object.
class EventTextField
{
    // Member variables
    constructor()
    {
        this.m_case = "";

        this.m_field_name = "";
        
        this.m_field_text = "";

    } // constructor

    // Set the case for the text field and update the field name and field 
    // text from the event program XML object.
    setCase(i_case)
    {
        this.m_case = i_case;

        debugEventProgram('EventTextField.setCase Enter this.m_case= ' + this.m_case);

        this.getXmlValues();

        this.setControls(); 

    } // setCase

    // Get the field name and the field text from the event program XML object for the given case
    getXmlValues()
    {
        if (this.m_case == 'description')
        {
            this.m_field_name = 'Beschreibung der Veranstaltung';

            this.m_field_text = g_event_program_xml_object.getShortText(g_current_event_number);
        }
       else if (this.m_case == 'prices')
        {
            this.m_field_name = 'Eintrittspreise';

            this.m_field_text = g_event_program_xml_object.getPrices(g_current_event_number);
        }
        else if (this.m_case == 'payment')
        {
            this.m_field_name = 'Zahlungsmittel';

            this.m_field_text = g_event_program_xml_object.getPayMethod(g_current_event_number);
        }    
        else if (this.m_case == 'instructions')
        {
            this.m_field_name = 'Anweisungen für die Besucher';       
            this.m_field_text = g_event_program_xml_object.getInstructions(g_current_event_number);
        }
        else if (this.m_case == 'email')
        {
            this.m_field_name = 'E-Mail Inhalt';
            this.m_field_text = g_event_program_xml_object.getEmailContent(g_current_event_number);
        }     
        else
        {
            alert('Invalid case for EventTextField: ' + this.m_case);
        }  
    } // getXmlValues

    // Set the controls of the text field page
    setControls()
    {
        g_text_field_title_text_box.setValue(this.m_field_name);
        
        g_text_field_text_area.setValue(this.m_field_text);

    } // setControls

    // Save the text field value to the event program XML object for the given case
    save( )
    {
        debugEventProgram('EventTextField.save this.m_case= ' + this.m_case);

        if (this.m_case == 'description')
        {
            g_event_program_xml_object.setShortText(g_current_event_number, g_text_field_text_area.getValue()); 
        }
         else if (this.m_case == 'prices')
        {
            g_event_program_xml_object.setPrices(g_current_event_number, g_text_field_text_area.getValue());
        }
        else if (this.m_case == 'payment')
        {
            g_event_program_xml_object.setPayMethod(g_current_event_number, g_text_field_text_area.getValue());
        }
        else if (this.m_case == 'instructions')
        {
            g_event_program_xml_object.setInstructions(g_current_event_number, g_text_field_text_area.getValue());
        }
        else if (this.m_case == 'email')
        {
            g_event_program_xml_object.setEmailContent(g_current_event_number, g_text_field_text_area.getValue());
        }
    } // save

} // EventTextField


// Gets the time string with colon for the given hour and minute. 
// If the minute is smaller than 10, a leading zero is added.
function getColonTimeString(i_hour, i_minute)
{
    var hour_str = i_hour.toString();
    var minute_str = i_minute.toString();

    if (i_minute < 10)
    {
        minute_str = '0' + minute_str;
    }

    return hour_str + ':' + minute_str;

} // getColonTimeString

// Sets the program XML global variables g_program_xml_filename and g_event_program_xml_server_dir
function setGlobalProgramXmlVariablesFromControls()
{
    g_event_program_target_main_dir = g_event_program_main_dir_text_box.getValue();
   
    g_event_program_target_result_dir =  g_event_program_result_dir_text_box.getValue();

    g_event_program_xml_server_dir = g_event_program_target_main_dir + '/' + 
                              g_event_program_target_result_dir + '/SaisonXML/';

} // setGlobalProgramXmlVariablesFromControls

// Returns the relative URL to the program XML directory
function getRelUrlToProgramXmlDir()
{
    return  g_event_program_target_result_dir + '/SaisonXML/';

} // getRelUrlToProgramXmlDir

// Returns the abs URL to the program XML file
function getAbsUrlToProgramXmlFile()
{
    return  'https://jazzliveaarau.ch/' + g_event_program_xml_server_dir + g_event_program_xml_filename;

} // getAbsUrlToProgramXmlFile

// Gets the XML string for saving the event program XML file on the server
function getEditPageControlsSaveXmlFile()
{
    debugEventProgram('getEditPageControlsSaveXmlFile Enter');

    // Textbox for the event name
    g_event_program_xml_object.setEventName(g_current_event_number, g_event_name_text_box.getValue());

    // Date picker for the event date
    var iso_date_str = g_event_date_picker.getValue();
    var event_day = iso_date_str.substr(8,2);
    if (event_day.startsWith('0'))
    {
        event_day = event_day.substr(1,1);
    }
    var event_month = iso_date_str.substr(5,2);
    if (event_month.startsWith('0'))
    {
        event_month = event_month.substr(1,1);
    }
    var event_year = iso_date_str.substr(0,4);
    debugEventProgram('getEditPageControlsSaveXmlFile event_year= ' + event_year + ' event_month= ' + event_month + ' event_day= ' + event_day);
    g_event_program_xml_object.setDay(g_current_event_number, event_day);
    g_event_program_xml_object.setMonth(g_current_event_number, event_month);
    g_event_program_xml_object.setYear(g_current_event_number, event_year);

    // Textbox for the event start time
    var start_colon_time_str = g_start_time_text_box.getValue();
    var start_time_array = start_colon_time_str.split(':');
    g_event_program_xml_object.setStartHour(g_current_event_number, start_time_array[0]);
    var start_minute_str = start_time_array[1];
    if (start_minute_str.startsWith('0'))
    {
        start_minute_str = start_minute_str.substr(1,1);
    }
    g_event_program_xml_object.setStartMinute(g_current_event_number, start_minute_str);
    debugEventProgram('getEditPageControlsSaveXmlFile start_time_array[0]= ' + start_time_array[0] + ' start_minute_str= ' + start_minute_str);

   // Textbox for the event end time
    var end_colon_time_str = g_end_time_text_box.getValue();
    var end_time_array = end_colon_time_str.split(':');
    g_event_program_xml_object.setEndHour(g_current_event_number, end_time_array[0]);
    var end_minute_str = end_time_array[1];
    if (end_minute_str.startsWith('0'))
    {
        end_minute_str = end_minute_str.substr(1,1);
    }
    g_event_program_xml_object.setEndMinute(g_current_event_number, end_minute_str);
    debugEventProgram('getEditPageControlsSaveXmlFile end_time_array[0]= ' + end_time_array[0] + ' end_minute_str= ' + end_minute_str);

    // Textbox for the event place
    g_event_program_xml_object.setPlace(g_current_event_number, g_event_place_text_box.getValue());

    // Textbox for the event address
    g_event_program_xml_object.setAddress(g_current_event_number, g_event_address_text_box.getValue());

    // Textbox for the event organisation
    // TODO g_event_program_xml_object.setOrganisation(g_current_event_number, g_event_organisation_text_box.getValue());

    // Textbox for the email title
    g_event_program_xml_object.setEmailSubject(g_current_event_number, g_email_title_text_box.getValue());

    // Textbox for the email sender
    // TODO g_event_program_xml_object.setEmailSender(g_current_event_number, g_email_sender_text_box.getValue());

    // Textbox for the email content title
    g_event_program_xml_object.setEmailHeader(g_current_event_number, g_email_content_title_text_box.getValue());
    
    // Check box for event cancelled
    g_event_program_xml_object.setCancelled(g_current_event_number, g_event_cancelled_check_box.getCheck());


    // Save the event program XML file on the server
    g_event_program_xml_object.saveFile(getAbsUrlToProgramXmlFile(), eventProgramFileSaved);

} // getEditPageControlsSaveXmlFile

// Callback function when the event program XML file has been saved on the server
function eventProgramFileSaved()
{
    debugEventProgram('eventProgramFileSaved Enter');

    displayMainPage();

} // eventProgramFileSaved

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

    g_program_xml_upload.hideUploadDiv(false);

    g_program_xml_upload.setServerPath(g_event_program_xml_server_dir);
    
} // onClickUploadEventProgramButton

// User clicked the download event program XML button
function onClickDownloadEventProgramButton()
{
    debugEventProgram('onClickDownloadEventProgramButton Enter'); 

    var url_xml = getAbsUrlToProgramXmlFile();

    window.open(url_xml,'_blank').focus();

} // onClickDownloadEventProgramButton

// Checks the selected program XML file
function checkSelectedProgramXmlFileName()
{
    var selected_file_name = g_program_xml_upload.getSelectedFileName();

    if (g_event_program_xml_filename == selected_file_name)
    {
        debugEventProgram('checkSelectedProgramXmlFileName selected file name is correct: ' + selected_file_name);
        return true;
    }
    else
    {
        var err_msg = 'Falsche Name der gewählte Datei ' + selected_file_name + '\n' + 
                'Ändere Name zu '+  g_event_program_xml_filename;

        alert(err_msg);

        return false;
    }

} // checkSelectedProgramXmlFileName

// The user has selected an XML local file that shall be uploaded
// 1. Set the selected file name and activate the upload file function.
//    Call setSelectedFileNameActivateUploadFileFunction
// 2. Check if the selected file is OK. Call of ControUploadFile.checkSelectedFileName
//    Return if the file is unvalid. The check function has displayed an error message
// 3. Set the server full file name in the XML text box. Please note however that the
//    actual server directory name is set by UploadFileToServer.php
//    Call of ControUploadFile.getSelectedFileServerUrl and JazztextBox.setValue
// 4. Return with the message that upload cannot be done with VSC Live server
//    Call of execApplicationOnServer
// 5. Set the active record full file name. Call of getUserInputFromFormSetActiveRecordLinkDoc
//    Return from php uses this value
// 6. Set the caption for the button that the user shall klick to upload the selected file
//    Call of ControUploadFile.displayButtonCaption
function eventUserSelectedProgramXml()
{
	 debugEventProgram('eventUserSelectedProgramXml Enter'); 

     g_program_xml_upload.setSelectedFileNameActivateUploadFileFunction();

     if (!checkSelectedProgramXmlFileName())
     {
        g_program_xml_upload.initSelectedFileName();

        return;

     } // b_check

    var file_server_url = g_event_program_xml_server_dir + g_program_xml_upload.getSelectedFileName();

    if (!UtilServer.execApplicationOnServer())
    {
        alert("XML Datei kann nicht lokal (mit Visual Studio Code) aufgeladen werden");

        return;
    }

    g_program_xml_upload.displayButtonCaption();
 
} // eventUserSelectedProgramXml

// User clicked the delete event button
// 1. Ask the user if he really wants to delete the event. Call of confirm
// 2. Save the event program XML file on the server. Call of EventProgramXml.saveFile 
//    with callback function eventProgramFileSavedAfterDelete
function onClickDeleteEventButton()
{
    debugEventProgram('onClickDeleteEventButton Enter');

    var event_name_str = g_event_program_xml_object.getEventName(g_current_event_number);


    var confirm_delete = confirm('Möchten Sie "'+ event_name_str +'" wirklich löschen?');
    if (!confirm_delete)
    {
        return;
    }

    g_event_program_xml_object.deleteEventNode(g_current_event_number);

    
    g_event_program_xml_object.saveFile(getAbsUrlToProgramXmlFile(), eventProgramFileSavedAfterDelete);


} // onClickDeleteEventButton

// Callback function when the event program XML file has been saved on the server after delete
function eventProgramFileSavedAfterDelete()
{
    debugEventProgram('eventProgramFileSavedAfterDelete Enter');

    setEventProgramDropdownControl();

    g_current_event_number = 1;

    debugEventProgram('eventProgramFileSavedAfterDelete g_current_event_number= ' + g_current_event_number);

    setEventRecordControls();

    // TODO After delete

} // eventProgramFileSavedAfterDelete

// User clicked the edit event button
function onClickEditEventButton()
{
    debugEventProgram('onClickEditEventButton Enter');

    displayEditPage();

} // onClickEditEventButton

// User selected an event in the event dropdown
function eventSelectEventDropDown()
{
    var selected_event_option_number = g_drop_down_event_program.getSelectOptionNumber();

    g_current_event_number = selected_event_option_number;

    debugEventProgram('eventSelectEventDropDown g_current_event_number= ' + g_current_event_number);

    setEventRecordControls();

} // eventSelectEventDropDown

///////////////////////////////// End Main Page ///////////////////////////////////////////

///////////////////////////////// Start Edit Page /////////////////////////////////////////

// User clicked the text description button
function onClickTextDescriptionButton()
{
    debugEventProgram('onClickTextDescriptionButton Enter');

    displayTextPage();

    g_event_text_field.setCase('description');

} // onClickTextDescriptionButton

// User clicked the text prices button
function onClickTextPricesButton()
{
    debugEventProgram('onClickTextPricesButton Enter');   
    
    displayTextPage();

    g_event_text_field.setCase('prices');

} // onClickTextPricesButton

// User clicked the text payment methods button
function onClickTextPaymentButton()
{
    debugEventProgram('onClickTextPaymentButton Enter');

    displayTextPage();

    g_event_text_field.setCase('payment');

} // onClickTextPaymentButton

// User clicked the text instructions button
function onClickTextInstructionsButton()
{
    debugEventProgram('onClickTextInstructionsButton Enter');

    displayTextPage();

    g_event_text_field.setCase('instructions');

} // onClickTextInstructionsButton

// User clicked the save record button
function onClickSaveRecordButton()
{
    debugEventProgram('onClickSaveRecordButton Enter');

    getEditPageControlsSaveXmlFile();

    // displayMainPage(); Called after save

} // onClickSaveRecordButton

// User clicked the cancel edit record button
function onClickCancelEditRecordButton()
{
    debugEventProgram('onClickCancelEditRecordButton Enter');

    displayMainPage();

} // onClickCancelEditRecordButton

///////////////////////////////// End Edit Page //////////////////////////////////////////


///////////////////////////////// Start Text Page /////////////////////////////////////////

// User clicked the exit and save text edit button
// 1. Save the text field value to the event program XML object. 
//    Call of EventTextField.save
// 2. Display the edit page. Call of displayEditPage
function onClickExitTextEditButton()
{
    debugEventProgram('onClickExitTextEditButton Enter');

    g_event_text_field.save();

    displayEditPage();

} // onClickExitTextEditButton

// User clicked the cancel text edit button
// 1. Display the edit page. Call of displayEditPage
function onClickCancelTextEditButton()
{
    debugEventProgram('onClickCancelTextEditButton Enter');

    displayEditPage();

} // onClickCancelTextEditButton

// User clicked the email content button
// 1. Display the text page. Call of displayTextPage
// 2. Set the case for the text field to email. 
//    Call of EventTextField.setCase with 'email'
function onClickEmailContentButton()
{
    debugEventProgram('onClickEmailContentButton Enter');

    displayTextPage();

    g_event_text_field.setCase('email');

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

    createUploadXmlControl();

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

// Create control for uploading of an XML program file
function createUploadXmlControl()
{
    g_program_xml_upload = new ControUploadFile('id_upload_xml_row', 'id_div_upload_xml_row');

    g_program_xml_upload.setLabelText("");

    g_program_xml_upload.setOnchangeFunctionName("eventUserSelectedProgramXml");

    g_program_xml_upload.setButtonCaption("Datei hochladen");

    g_program_xml_upload.setExtensions(".xml");

    g_program_xml_upload.hideUploadDiv(true);

} // createUploadXmlControl

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

    g_current_event_number = 1;

    debugEventProgram('createEventProgramDropdown g_current_event_number= ' + g_current_event_number);

    var dummy_event_array = [];
	dummy_event_array[0] = 'Event 1 Not yet set';
	dummy_event_array[1] = 'Event 2 Not yet set';

    g_drop_down_event_program.setNameArray(dummy_event_array);

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

    // g_event_cancelled_check_box.setOninputFunctionName("eventClickCheckBoxEventCancelledled");

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

    g_email_title_text_box.setSize("53");

    g_email_title_text_box.setReadOnlyFlag(false);

    g_email_title_text_box.setTitle("Betreff der E-Mail eingeben oder ändern");

} // createTextBoxEmailTitle

// Create the text box for the email sender
function createTextBoxEmailSender()
{
    g_email_sender_text_box = new JazzTextBox("id_email_sender", 'id_div_email_sender');

    g_email_sender_text_box.setLabelText("Absender");

    g_email_sender_text_box.setLabelTextPositionAbove();

    g_email_sender_text_box.setSize("22");

    g_email_sender_text_box.setReadOnlyFlag(false);

    g_email_sender_text_box.setTitle("Absender der E-Mail eingeben oder ändern");

} // createTextBoxEmailSender

// Create the text box for the email content title
function createTextBoxEmailContentTitle()
{
    g_email_content_title_text_box = new JazzTextBox("id_email_content_title", 'id_div_email_content_title');

    g_email_content_title_text_box.setLabelText("Inhalt Titel");

    g_email_content_title_text_box.setLabelTextPositionAbove();

    g_email_content_title_text_box.setSize("53");

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

    g_text_field_text_area.setReadOnlyFlag(false);

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

// Display the event program section in the edit page
function displayEventProgramSection()
{
    getElementDivEventStepTitleEventProgram().style.display = 'block';

    getElementDivEventProgramSection().style.display = 'block';

} // displayEventProgramSection

// Hide the event program section in the edit page
function hideEventProgramSection()
{
    getElementDivEventStepTitleEventProgram().style.display = 'none';

    getElementDivEventProgramSection().style.display = 'none';

} // hideEventProgramSection

// Returns the div element with the title of the event program section in the edit page
function getElementDivEventStepTitleEventProgram()
{
    return document.getElementById(getIdEventStepTitleEventProgram());

} // getElementDivEventStepTitleEventProgram

// Returns the id of the event program section title div element
function getIdEventStepTitleEventProgram()
{
    return 'id_event_step_title_event_program';

} // getIdEventStepTitleEventProgram

// Returns the div element event program section
function getElementDivEventProgramSection()
{
    return document.getElementById(getIdEventProgramSection());    

} // getElementDivEventProgramSection

// Returns the id of the event program section div element
function getIdEventProgramSection()
{
    return 'id_div_event_program_select_container';

} // getIdEventProgramSection

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