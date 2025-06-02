// File: CreateXmlEventFiles.js
// Date: 2025-06-02
// Authors: Gunnar Lidén

// Content
// =======
//
// Creation of new XML event files
//
class CreateXmlEventFiles
{
    static start()
    {
        CreateXmlEventFiles.debugConsole('CreateXmlEventFiles.start Enter');

        if (g_new_season_files_data == null)
        {
            alert("CreateXmlEventFiles.start Execution data object g_new_season_files_data is null");

            return;
        }

        CreateXmlEventFiles.eventObjectXml();

    } // start

    // Creates the event XML object
    static eventObjectXml()
    {
        CreateXmlEventFiles.debugConsole('CreateXmlEventFiles.eventObjectXml Enter');

        g_new_season_files_data.m_event_xml = null;

        var rel_subdir_xml = g_new_season_files_data.m_rel_event_program_dir_url;
    
        var event_program_file_name = g_new_season_files_data.m_xml_filename;

        var callback_fctn = CreateXmlEventFiles.initEventXmlArray;
    
        g_new_season_files_data.m_event_xml = new EventProgramXml(rel_subdir_xml, event_program_file_name, callback_fctn);

    } // eventObjectXml

    // Initialization of array with event XML objects
    static initEventXmlArray()
    {
        CreateXmlEventFiles.debugConsole('CreateXmlEventFiles.initEventXmlArray Enter');

        g_new_season_files_data.m_event_object_index = -1;

        g_new_season_files_data.m_event_xml_array = [];

        CreateXmlEventFiles.createEventXmlObjectRecursively();

    } // initEventXmlArray

    // Creates the event XML objects array m_event_xml_array recursively
    // 1. Add one to the index m_event_object_index for the m_event_xml_array
    // 2. Set the callback function name to
    //    to createEventXmlObjectRecursively if not the last object
    //    to allEventXmlObjectsCreated if it is the last object
    // 3. Instantiate ReservationEventXml
    static createEventXmlObjectRecursively()
    {
         CreateXmlEventFiles.debugConsole('CreateXmlEventFiles.createEventXmlObjectRecursively Enter');


    } // createEventXmlObjectRecursively

    static debugConsole(i_msg_str)
    {
        console.log(i_msg_str);

        UtilServer.appendDebugFile(i_msg_str, 'ReservationLayout');

    } // debugConsole


} // CreateXmlEventFiles

/*

*/

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Global Parameters /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// XML object defining events like for instance concerts
var g_event_program_xml = null;

// The subdirectory where the created event XML files shall be saved on the server
var g_subdir_event_xml_files = "";

// The subdirectory for the imported event XML files
var g_import_subdir_event_xml_files = "";

// String that will be added to the output XML event file names
// e.g. Salmen (because of the old version of the reservation system)
// Empty string is allowed
var g_file_name_add_str = 'Salmen';

// Array of XML event objects (one for each concert, e.g. a concert). The objects
// hold the reservation data, i.e. name, email, table/row, seat charcter/number and seat name
var g_event_xml_array = [];

// Array of XML event objects. Same as g_event_xml_array, but this array holds data from
// a previous layout of the premises that shall be imported to the new layout reservation, i,e,
// the array g_event_xml_array
var g_import_event_xml_array = [];

// Event index for g_event_xml_array (that is created recursively) 
var g_event_object_index = -12345;

// Array of Reservation data objects ReservationData
var g_import_reservation_data_array = [];

// Array of TableSeatData objects defining the available seats
var g_available_table_seat_array = null;

// The seats that automatically will be reserved by the application
var g_available_objects = [];

// The seats that must be manually reserved by the administrator
var g_not_available_objects = [];

var g_all_event_XML_files_msg = "Alle XML Dateien sind generiert und zum Server hochgeladen. Ordner= ";

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Global Parameters ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Create XML files Functions ////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Create and upload event files to the result server directory
// 1. Set the global variable g_subdir_event_xml_files that holds the name of the subdirectory 
//    where all the created event XML files shall be saved on the server
// 2. Call createObjectEventProgramXml with callback function callbackAfterLoadingEventProgram
function createNewXmlEventFiles()
{
    debugReservationLayout('createNewXmlEventFiles Enter');

    setGlobalVariableDirectoryForEventXmlFiles();

    createObjectEventProgramXml(callbackAfterLoadingEventProgram);

} // createNewXmlEventFiles

// Set the global variable g_subdir_event_xml_files that holds the name of the subdirectory 
// where all the created event XML files shall be saved on the server
function setGlobalVariableDirectoryForEventXmlFiles()
{
    var result_server_directory_name = g_layout_server_dir_text_box.getValue();

    debugReservationLayout('createNewXmlEventFiles result_server_directory_name= ' + result_server_directory_name);

    var sub_sub_dir = 'SaisonXML';

    g_subdir_event_xml_files = result_server_directory_name + '/' + sub_sub_dir + '/';

    debugReservationLayout('setGlobalVariableDirectoryForEventXmlFiles g_subdir_event_xml_files= ' + g_subdir_event_xml_files);

} // setGlobalVariableDirectoryForEventXmlFiles

// Create the event program object (load the XML file that define an event program)
// Create object EventProgramXml and call function callbackAfterLoadingEventProgram
// when the XML object has been created
function createObjectEventProgramXml(i_callbackAfterLoadingEventProgram)
{
    debugReservationLayout('createObjectEventProgramXml Enter ');

    g_event_program_xml = null;

    var subdir_xml = "XmlTestData";

    var event_program_file_name = "EventProgramSample.xml";

    g_event_program_xml = new EventProgramXml(subdir_xml, event_program_file_name, i_callbackAfterLoadingEventProgram);

} // createObjectEventProgramXml

// This function is called when the season program XML object (EventProgramXml) has been created
// 1. Set start index g_event_object_index= -1;
// 2. Call createEventXmlObjectRecursively that will create the event XML objects recursively
function callbackAfterLoadingEventProgram()
{
    debugReservationLayout('callbackAfterLoadingEventProgram Enter');

    g_event_object_index = -1;

    g_event_xml_array = [];

    createEventXmlObjectRecursively();

} // callbackAfterLoadingEventProgram

// Creates the event XML objects array g_event_xml_array recursively
// 1. Add one to the index g_event_object_index for the g_event_xml_array
// 2. Set the callback function name to
//    to createEventXmlObjectRecursively if not the last object
//    to allEventXmlObjectsCreated if it is the last object
// 3. Instantiate ReservationEventXml
function createEventXmlObjectRecursively()
{
    g_event_object_index =  g_event_object_index + 1;

    var n_events = g_event_program_xml.getNumberOfEvents();

    var event_number = g_event_object_index + 1;

    // debugReservationLayout('createEventXmlObjectRecursively g_event_object_index= ' + g_event_object_index.toString() + 
    //        " event_number= " + event_number.toString() + " n_events= " + n_events.toString() );

    var b_new_file = true;

    var callback_function_name = createEventXmlObjectRecursively;

    if (n_events == event_number)
    {
        callback_function_name = allEventXmlObjectsCreated;
    }

    g_event_xml_array[g_event_object_index] = new ReservationEventXml(g_subdir_event_xml_files, g_file_name_add_str, event_number, b_new_file, callback_function_name);

} // createEventXmlObjectArrayRecursively

function debugPrettyPrint(i_object_xml, i_functionname_str)
{
    var pretty_print = new PrettyPrintXml(i_object_xml.getXmlObject());

    var xml_content_str = pretty_print.xmlToWinFormattedString();

    debugReservationLayout('debugPrettyPrint ' + i_functionname_str);

    debugReservationLayout(xml_content_str);

} // debugPrettyPrint

// This function is called when all the event XML objects have been created
// The event XML objects are empty, i.e. only the root <H> is defined
// Corresponding start files with the root tag <H> have been saved on the server
// 1. Append event nodes to the event XML object. 
//    Call of ReservationEventXml.appendEventNodes
// 2. Loop for all event CML objects
// 2.1 Get event data (name, year, month, day, name) from the event program XMl object
//     Call of EventProgramXml.getYear, getMonth,  getEventName
// 2.2 Set the event node values with the data from the season program and the event number
//     Call of ReservationEventXml.setYear, setMonth, setDay, setEventName and SetEventNumber
function allEventXmlObjectsCreated()
{
    var n_event_xml_files = g_event_xml_array.length;

    // debugReservationLayout('allEventXmlObjectsCreated Number of event XML files is ' + n_event_xml_files.toString());

    for (var index_file=0; index_file < n_event_xml_files; index_file++)
    {
        var event_xml = g_event_xml_array[index_file];

        event_xml.appendEventNodes();

        // debugReservationLayout("allEventXmlObjectsCreated Event data nodes created with value NYSV (not yet set value) ");

        var event_number = index_file + 1;

        // debugReservationLayout("allEventXmlObjectsCreated Data event program for event_number= " + event_number.toString() + ':');

        var event_day   = g_event_program_xml.getDay(event_number);

        var event_month = g_event_program_xml.getMonth(event_number);

        var event_year  = g_event_program_xml.getYear(event_number);

        var event_name  = g_event_program_xml.getEventName(event_number);

        // debugReservationLayout('Event name ' + event_name + ' Year ' + event_year + ' Month ' + event_month + ' Day ' + event_day);

        event_xml.setEventNumber(event_number.toString());

        event_xml.setDay(event_day);

        event_xml.setMonth(event_month);

        event_xml.setYear(event_year);

        event_xml.setEventName(event_name);

        debugPrettyPrint(event_xml, "allEventXmlObjectsCreated");

        // Only test event_xml.appendReservationNode(2, 3);
        // Only test event_xml.setRemark("Test remark", 1); 
        // Only test event_xml.setTableNumber("88", 1, 2); 
        // Only test event_xml.setSeatName("Anders Andersson", 1, 1, 2); 

    } // index_file

    g_event_object_index = -1;

    saveEventXmlFilesRecursively();

} // allEventXmlObjectsCreated

// Save all event XML files recursively
function saveEventXmlFilesRecursively()
{
    g_event_object_index = g_event_object_index + 1;

    var event_xml = g_event_xml_array[g_event_object_index];

    var n_event_files = g_event_xml_array.length;

    var callback_function_name = saveEventXmlFilesRecursively;

    if (n_event_files == g_event_object_index + 1)
    {
        callback_function_name = allEventXmlFilesSaved;
    }    

    event_xml.saveFile(callback_function_name);

} // saveEventXmlFilesRecursively

// All event XML files have been uploaded to the server
function allEventXmlFilesSaved()
{
    debugReservationLayout('allEventXmlFilesSaved All XML event files have been uploaded.');

    alert(g_all_event_XML_files_msg + g_subdir_event_xml_files);

} // allEventXmlFilesSaved

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Create XML files Functions //////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Import XML Evants Functions ///////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// 1. Set the global variable g_subdir_event_xml_files that holds the name of the subdirectory 
//    where all the event XML files are saved
// 2. Create the event program XML object g_event_program_xml. Call of 
//    createObjectEventProgramXml with callback function callbackAfterImportLoadingEventProgram
function importXmlEvents()
{
    debugReservationLayout('importXmlEvents Enter');

    setGlobalVariableDirectoryForEventXmlFiles();

    createObjectEventProgramXml(callbackAfterImportLoadingEventProgram);
	
} // importXmlEvents

// This function is called after creating the event program XML object
// The object (g_event_program_xml) is needed to get the number of events
// 1. Set start index g_event_object_index= to -1. Initialize array that hold the XML objects
// 2. Call loadEventXmlObjectRecursively that will create the event XML objects recursively
function callbackAfterImportLoadingEventProgram()
{
    debugReservationLayout('callbackAfterImportLoadingEventProgram Enter');

    g_event_object_index = -1;

    g_event_xml_array = [];

    loadEventXmlObjectRecursively();

} // callbackAfterImportLoadingEventProgram

// Load all event XML files recursively
function loadEventXmlObjectRecursively()
{
    g_event_object_index =  g_event_object_index + 1;

    var n_events = g_event_program_xml.getNumberOfEvents();

    var event_number = g_event_object_index + 1;

    // debugReservationLayout('createEventXmlObjectRecursively g_event_object_index= ' + g_event_object_index.toString() + 
    //        " event_number= " + event_number.toString() + " n_events= " + n_events.toString() );

    var b_new_file = false;

    var callback_function_name = loadEventXmlObjectRecursively;

    if (n_events == event_number)
    {
        callback_function_name = allEventXmlObjectsLoaded;
    }

    g_event_xml_array[g_event_object_index] = new ReservationEventXml(g_subdir_event_xml_files, g_file_name_add_str, event_number, b_new_file, callback_function_name);

} // loadEventXmlObjectRecursively

// This function is called when all the event XML object have been created
function allEventXmlObjectsLoaded()
{
    debugReservationLayout('allEventXmlObjectsLoaded Enter');

    setGlobalVariableDirectoryForImportEventXmlFiles();

    g_event_object_index = -1;

    g_import_event_xml_array = [];

    loadImportEventXmlObjectRecursively();

} // allEventXmlObjectsLoaded

function setGlobalVariableDirectoryForImportEventXmlFiles()
{
    var result_server_directory_name = g_layout_server_dir_text_box.getValue();

    debugReservationLayout('createNewXmlEventFiles result_server_directory_name= ' + result_server_directory_name);

    var sub_sub_dir = 'SaisonXML_Compare';

    g_import_subdir_event_xml_files = result_server_directory_name + '/' + sub_sub_dir + '/';

    debugReservationLayout('setGlobalVariableDirectoryForImportEventXmlFiles g_subdir_event_xml_files= ' + g_import_subdir_event_xml_files);

} // setGlobalVariableDirectoryForImportEventXmlFiles

// Load all import event XML files recursively
function loadImportEventXmlObjectRecursively()
{
    g_event_object_index =  g_event_object_index + 1;

    // TODO var n_events = g_event_program_xml.getNumberOfEvents();

    var n_events = 12;

    var event_number = g_event_object_index + 1;

    // debugReservationLayout('createEventXmlObjectRecursively g_event_object_index= ' + g_event_object_index.toString() + 
    //        " event_number= " + event_number.toString() + " n_events= " + n_events.toString() );

    var b_new_file = false;

    var callback_function_name = loadImportEventXmlObjectRecursively;

    if (n_events == event_number)
    {
        callback_function_name = importAllEventXmlObjectsLoaded;
    }

    g_import_event_xml_array[g_event_object_index] = new ReservationEventXml(g_import_subdir_event_xml_files, g_file_name_add_str, event_number, b_new_file, callback_function_name);

} // loadImportEventXmlObjectRecursively

// Returns an array of seat names
function getImportSeatNames(i_import_event_xml, i_reservation_number, i_seat_number)
{
    var ret_seat_names = [];

    var n_seat_names = i_import_event_xml.getNumberOfSeatNames(i_reservation_number, i_seat_number);

    for (var seat_name_number = 1; seat_name_number <= ret_seat_names ; seat_name_number++)
    {
        var seat_name = i_import_event_xml.getSeatName(i_reservation_number, i_seat_number, seat_name_number);

        var index_seat_name = seat_name_number - 1;

        ret_seat_names[index_seat_name] = seat_name;

    }

    return ret_seat_names;

} // getImportSeatNames

// This function is called when all the imported event XML object have been created
// 1. Loop create an array of ReservationSeatData
// 1.1 ...
// 2. Call the function appendImportedValuesToEventXmlObjects
function importAllEventXmlObjectsLoaded()
{
    debugReservationLayout('importAllEventXmlObjectsLoaded Enter');

    var n_events = g_import_event_xml_array.length;

    g_import_reservation_data_array = [];

    var index_reservation_out = 0;

    for (var index_event = 0; index_event < n_events; index_event++)
    {
        var import_event_xml = g_import_event_xml_array[index_event];

        var n_reservations = import_event_xml.getNumberOfReservations();

        for (var reservation_number = 1; reservation_number <= n_reservations; reservation_number++)
        {
            var reservation_name = import_event_xml.getName(reservation_number);

            var reservation_email = import_event_xml.getEmail(reservation_number);

            var reservation_remark = import_event_xml.getRemark(reservation_number);

            var n_seats = import_event_xml.getNumberOfSeats(reservation_number);

            // SeatData

            var seat_data_array = [];

            for (var seat_number = 1; seat_number <= n_seats; seat_number++)
            {
                var table_number = import_event_xml.getTableNumber(reservation_number, seat_number);

                var seat_char = import_event_xml.getSeatChar(reservation_number, seat_number);

                 var seat_names = []; //  TODO fo new types of files
                 // seat_names = getImportSeatNames(import_event_xml, reservation_number, seat_number);

                 var seat_data = new ReservationSeatData();

                 seat_data.setRowTableNumber(table_number);

                 seat_data.setSeatCharacterNumber(seat_char);
     
                 seat_data.setSeatNameArray(seat_names);

                 var index_seat_data = seat_number - 1;

                 seat_data_array[index_seat_data] = seat_data;

            } // seat_number

            var reservation_data = new ReservationData(seat_data_array);

            // Temporarely for old layouts. The event number (reference)
            // is defined in the  reservaion event XML files
            // ReservationEventXml.getReferenceNumber
            var event_number_str = (index_event + 1).toString();

            reservation_data.setEventNumber(event_number_str);
            
            reservation_data.setPassword("");

            reservation_data.setName(reservation_name);

            reservation_data.setEmail(reservation_email);

            reservation_data.setRemark(reservation_remark);

            g_import_reservation_data_array[index_reservation_out] = reservation_data;

            index_reservation_out = index_reservation_out + 1;

        }// reservation_number

    } // index_event

    appendImportedValuesToEventXmlObjects();

} // importAllEventXmlObjectsLoaded

// Append imported imported values
// 1. Get the array of avalable seats g_available_table_seat_array
function appendImportedValuesToEventXmlObjects()
{
    debugReservationLayout('importAllEventXmlObjectsLoaded Enter');

    g_available_table_seat_array = getAvailableTableSeatArray(g_layout_xml);

    var n_reservation_data = g_import_reservation_data_array.length;

    var index_available = 0;

    var index_not_available = 0;

    for (var index_reservation = 0; index_reservation < n_reservation_data; index_reservation++)
    {
        var reservation_data = g_import_reservation_data_array[index_reservation];

        if (allReservationSeatsExist(reservation_data))
        {
            g_available_objects[index_available] = reservation_data;

            index_available = index_available + 1;

        }
        else
        {
            g_not_available_objects[index_not_available] = reservation_data;

            index_not_available = index_not_available + 1;
        }

    } // index_reservation

    var n_not_available = g_not_available_objects.length;

    var n_available = g_available_objects.length;

    displayNonAvailableSeats();

} // appendImportedValuesToEventXmlObjects

// Returns true if all seats exist for the new layout
function allReservationSeatsExist(i_reservation_data)
{
    var n_seats = i_reservation_data.getNumberOfSeats();

    var seat_data_array = i_reservation_data.getSeatDataArray();

    for (var index_seat = 0; index_seat < n_seats;  index_seat++)
    {
        var seat_data = seat_data_array[index_seat];

        var row_table_number = seat_data.getRowTableNumber();

        var seat_character_number = seat_data.getSeatCharacterNumber();

        if (!isSeatAvailable(row_table_number, seat_character_number))
        {
            return false;
        }

    }

    return true;

} // allReservationSeatsExist

// Display the seats that must be manually reserved by the administrator
function displayNonAvailableSeats()
{
    var display_text_str = '';

    var display_html_str_array = [];

    var n_display = g_not_available_objects.length;

    for (var i_display=0; i_display < n_display; i_display++)
    {
        var reservation_data = g_not_available_objects[i_display];

        var event_number = reservation_data.getEventNumber();

        var reservation_name = reservation_data.getName();

        var reservation_email = reservation_data.getEmail();

        var reservation_remark = reservation_data.getRemark();

        var n_seats = reservation_data. getNumberOfSeats();

        var seat_array = reservation_data.getSeatDataArray();

        var table_number_array = [];

        var seat_char_array = [];

        for (var index_seat = 0; index_seat < n_seats; index_seat++)
        {
            var seat_data = seat_array[index_seat];

            var table_row_number = seat_data.getRowTableNumber();

            var seat_character_number = seat_data.getSeatCharacterNumber();

            table_number_array[index_seat] = table_row_number;

            seat_char_array[index_seat] = seat_character_number;

        } // index_seat

        var b_html = true;

        var display_html_str = appendToDisplayString(b_html, event_number, 
            reservation_name, reservation_email, reservation_remark, 
            table_number_array, seat_char_array);

            display_html_str_array[i_display] = display_html_str;

    } // i_display

    var str_length = display_html_str_array.length;

    var html_all_str = '';

    for (var index_str=0; index_str<display_html_str_array.length; index_str++)
    {
        html_all_str += display_html_str_array[index_str];
    }

    var div_resultat_el = getElementDivResult();

    div_resultat_el.innerHTML = html_all_str;

} // displayNonAvailableSeats

// Append to the display string
function appendToDisplayString(i_b_html, i_event_number, i_name, i_email, i_remark, i_table_array, i_char_array)
{
    var output_str = '';

    output_str += 'Konzert ' + i_event_number.toString();

    output_str += ' Name ' + i_name;

    output_str += ' E-Mail ' + i_email;

    output_str += ' Bemerkung ' + i_remark;

    if (i_b_html)
    {
        output_str += '<br>';
    }
    else
    {
        output_str += '\n';
    }

    output_str += ' Plätze: ';

    for (var index_seat = 0; index_seat < i_table_array.length; index_seat++)
    {
        output_str += ' Tisch ' + i_table_array[index_seat];

        output_str += ' Platz ' + i_char_array[index_seat];

        if (index_seat < i_table_array.length -1)
        {
            output_str += ', ';
        }

    } // index_seat

    if (i_b_html)
    {
        output_str += '<br><br>';
    }
    else
    {
        output_str += '\n\n';
    }

    return output_str;

} // appendToDisplayString

// Reurns true if the seat is available
function isSeatAvailable(i_row_table_number, i_seat_character_number)
{
    var ret_b_available = false;

    var n_available_seats = g_available_table_seat_array.length; // TableSeatData

    for (var index_available = 0; index_available < n_available_seats; index_available++)
    {
        var table_seat_data = g_available_table_seat_array[index_available];

        var available_row_table = table_seat_data.getTableRowNumber();

        var available_seat_character = table_seat_data.getSeatCharacterNumber();

        if (i_row_table_number == available_row_table && i_seat_character_number == available_seat_character)
        {
            ret_b_available = true;

            break;
        }
 
    }

    return ret_b_available;

} // isSeatAvailable


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Import XML Evants Functions /////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

