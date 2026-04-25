// File: CreateXmlEventFiles.js
// Date: 2026-04-25
// Authors: Gunnar Lidén

// Content
// =======
//
// Creation of new XML event files
//

// Global flag telling if the new event XML files shall be created with the old file name
var g_generate_with_old_file_name = true;


// Class for creation of new XML event files

// The creation of the new XML event files is done in the following steps:
// 1. Create the event XML object EventProgramXml which reads the event program XML file and stores the data in arrays
// 2. Create an array of event XML objects ReservationEventXml, one for each event, and store them in m_event_xml_array
// 3. Set the data for each event XML object in m_event_xml_array from the data stored in the event XML object created in step 1
// 4. Save each event XML file by calling the saveFile method of each event XML object in m_event_xml_array

// Input data is an instance of the class ReservationNewSeasonData (global variable g_new_season_files_data) which 
// is created in ReservationNewSeason.js

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

        CreateXmlEventFiles.debugConsole('CreateXmlEventFiles.initEventXmlArray First call of createObjectRecursively');

        CreateXmlEventFiles.createObjectRecursively();

    } // initEventXmlArray

    // Creates the event XML objects array m_event_xml_array recursively
    // 1. Add one to the index m_event_object_index for the m_event_xml_array
    // 2. Set the callback function name to
    //    to createObjectRecursively if not the last object
    //    to allEventXmlObjectsCreated if it is the last object
    // 3. Instantiate ReservationEventXml
    static createObjectRecursively()
    {
        // CreateXmlEventFiles.debugConsole('CreateXmlEventFiles.createObjectRecursively Enter');

        g_new_season_files_data.m_event_object_index = g_new_season_files_data.m_event_object_index + 1;

        var n_events = g_new_season_files_data.m_event_xml.getNumberOfEvents();

        var event_number = g_new_season_files_data.m_event_object_index + 1;

        var b_new_file = true;

        var callback_function_name = CreateXmlEventFiles.createObjectRecursively;

        if (n_events == event_number)
        {
            callback_function_name = CreateXmlEventFiles.setEventXmlObjects;
        }

        var event_reg_number = g_new_season_files_data.m_event_xml.getRegNumber(event_number);

        if (g_generate_with_old_file_name)
        {
            event_reg_number = 'old';
        }

        var subdir_event_xml_files = g_new_season_files_data.m_event_files_sub_dir;

        var abs_url_event_files_dir = g_new_season_files_data.getAbsUrlEventFilesDir();

        g_new_season_files_data.m_event_xml_array[g_new_season_files_data.m_event_object_index] = 
            new ReservationEventXml(abs_url_event_files_dir, event_reg_number, event_number, b_new_file, callback_function_name);
            // new ReservationEventXml(subdir_event_xml_files, event_reg_number, event_number, b_new_file, callback_function_name);

    } // createObjectRecursively

    // Set all event XML objects
    static setEventXmlObjects()
    {
        CreateXmlEventFiles.debugConsole('CreateXmlEventFiles.setEventXmlObjects Enter');

        var n_event_xml_files = g_new_season_files_data.m_event_xml_array.length;

        for (var index_file=0; index_file < n_event_xml_files; index_file++)
        {
            var event_xml = g_new_season_files_data.m_event_xml_array[index_file];

            event_xml.appendEventNodes();

             var event_number = index_file + 1;

            var event_day   = g_new_season_files_data.m_event_xml.getDay(event_number);

            var event_month = g_new_season_files_data.m_event_xml.getMonth(event_number);

            var event_year  = g_new_season_files_data.m_event_xml.getYear(event_number);

            var event_name  = g_new_season_files_data.m_event_xml.getEventName(event_number);

            event_xml.setEventNumber(event_number.toString());

            event_xml.setDay(event_day);

            event_xml.setMonth(event_month);

            event_xml.setYear(event_year);

            event_xml.setEventName(event_name);

        } // index_file

        g_new_season_files_data.m_event_object_index = -1;

        CreateXmlEventFiles.debugConsole('CreateXmlEventFiles.setEventXmlObjects First call of saveEventXmlFilesRecursively');

        CreateXmlEventFiles.saveEventXmlFilesRecursively();

    } // setEventXmlObjects

    // Save XML file recursively
    static saveEventXmlFilesRecursively()
    {
        CreateXmlEventFiles.debugConsole('CreateXmlEventFiles.saveEventXmlFilesRecursively Enter');

        g_new_season_files_data.m_event_object_index = g_new_season_files_data.m_event_object_index + 1;

        var event_xml = g_new_season_files_data.m_event_xml_array[g_new_season_files_data.m_event_object_index];

        var n_event_files = g_new_season_files_data.m_event_xml_array.length;

         var callback_function_name = CreateXmlEventFiles.saveEventXmlFilesRecursively;

        if (n_event_files == g_new_season_files_data.m_event_object_index + 1)
        {
            callback_function_name = CreateXmlEventFiles.allEventXmlFilesSaved;
        }    

        event_xml.saveFile(callback_function_name);

    } // saveEventXmlFilesRecursively

    // Callback function when all files have been saved
    static allEventXmlFilesSaved()
    {
        CreateXmlEventFiles.debugConsole('CreateXmlEventFiles.allEventXmlFilesSaved Enter');

        alert(g_new_season_files_data.msgAllEventFilesCreated());

    } // allEventXmlFilesSaved

    // Write debug to the console
    static debugConsole(i_msg_str)
    {
        console.log(i_msg_str);

        UtilServer.appendDebugFile(i_msg_str, 'ReservationLayout');

    } // debugConsole


} // CreateXmlEventFiles

