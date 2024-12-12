// File: CreateXmlEventFiles.js
// Date: 2024-12-12
// Authors: Gunnar Lidén

// Content
// =======
//
// Creation of new XML event files
//
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
// 3. 
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

// This function is called when all the event XML object have been created
function allEventXmlObjectsCreated()
{
    var n_event_xml_files = g_event_xml_array.length;

    debugReservationLayout('allEventXmlObjectsCreated Number of event XML files is ' + n_event_xml_files.toString());

    for (var index_file=0; index_file < n_event_xml_files; index_file++)
    {
        var event_xml = g_event_xml_array[index_file];

        var event_number = index_file + 1;

        var event_day   = g_event_program_xml.getDay(event_number);

        var event_month = g_event_program_xml.getMonth(event_number);

        var event_year  = g_event_program_xml.getYear(event_number);

        var event_name  = g_event_program_xml.getEventName(event_number);

        debugReservationLayout('allEventXmlObjectsCreated event_name= ' + event_name + ' event_name= ' + event_name);

        event_xml.appendEventNodes();

        event_xml.setDay(event_day);

        event_xml.setMonth(event_month);

        event_xml.setYear(event_year);

        event_xml.setEventName(event_name);

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

// This function is called when all the imported event XML object have been created
function importAllEventXmlObjectsLoaded()
{
    debugReservationLayout('importAllEventXmlObjectsLoaded Enter');

    var n_events = g_import_event_xml_array.length;

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
            
            reservation_data.setPassword("");

            reservation_data.setName(reservation_name);

            reservation_data.setEmail(reservation_email);

            reservation_data.setRemark(reservation_remark);

            g_import_reservation_data_array[reservation_number - 1] = reservation_data;

        }// reservation_number

        var n_reservation_data = g_import_reservation_data_array.length;

    } // index_event

} // importAllEventXmlObjectsLoaded

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

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Import XML Evants Functions /////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

