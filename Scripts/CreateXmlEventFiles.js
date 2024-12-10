// File: CreateXmlEventFiles.js
// Date: 2024-12-10
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

// String that will be added to the output XML event file names
// e.g. Salmen (because of the old version of the reservation system)
// Empty string is allowed
var g_file_name_add_str = 'Salmen';

// Array of XML event objects (one for each concert, e.g. a concert). The objects
// hold the reservation data, i.e. name, email, table/row, seat charcter/number and seat name
var g_event_xml_array = [];

// Event index for g_event_xml_array (that is created recursively) 
var g_event_object_index = -12345;

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Global Parameters ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Create XML files Functions ///////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Create and upload event files to the result server directory
// 1. Set the directory name g_subdir_event_xml_files where the event XML files shall be 
//    stored on the server
// 2. Create the event program object (load the XML file that define an event program)
//    Create object EventProgramXml and call function callbackAfterLoadingEventProgram
//    when the XML object has been created
function createNewXmlEventFiles()
{
    debugReservationLayout('createNewXmlEventFiles Enter');

    var result_server_directory_name = g_layout_server_dir_text_box.getValue();

    debugReservationLayout('createNewXmlEventFiles result_server_directory_name= ' + result_server_directory_name);

    var sub_sub_dir = 'SaisonXML';

    g_subdir_event_xml_files = result_server_directory_name + '/' + sub_sub_dir + '/';

    debugReservationLayout('createNewXmlEventFiles g_subdir_event_xml_files= ' + g_subdir_event_xml_files);



    g_event_program_xml = null;

    var subdir_xml = "XmlTestData";

    var event_program_file_name = "EventProgramSample.xml";

    g_event_program_xml = new EventProgramXml(subdir_xml, event_program_file_name, callbackAfterLoadingEventProgram);

} // createNewXmlEventFiles

// This function is called when the season program XML object (EventProgramXml) has been created
// 1. Set start index g_event_object_index= -1;
// 2. Call createEventXmlObjectRecursively that will create the event XML objects recursively
function callbackAfterLoadingEventProgram()
{
    debugReservationLayout('callbackAfterLoadingEventProgram Enter');

    g_event_object_index = -1;

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

    debugReservationLayout('createEventXmlObjectRecursively g_event_object_index= ' + g_event_object_index.toString() + 
            " event_number= " + event_number.toString() + " n_events= " + n_events.toString() );

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
    debugReservationLayout('allEventXmlObjectsCreated Enter');

} // allEventXmlObjectsCreated
