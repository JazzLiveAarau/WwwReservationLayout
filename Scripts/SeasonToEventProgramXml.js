// File: SeasonToEventProgramXml.js
// Date: 2025-04-23
// Author: Gunnar Lidén

// Inhalt
// =============
//
// Class creating an EventProgramXml XML file from a season XML file

// Instance of SeasonToEventProgramXmlData holding data for the execution
var g_season_to_event_data = null;

class SeasonToEventProgramXml
{
    // i_season_case: current, previous or next season
    // i_abs_event_program_url: Absolute URL for the output event XML program file
    constructor(i_season_case, i_abs_event_program_url, i_callback_fctn)
    {
        // Start function
        SeasonToEventProgramXml.start(i_season_case, i_abs_event_program_url, i_callback_fctn);

    } // constructor

    // Initialization
    // 1. Check input. Call SeasonToEventProgramXml.checkInput
    // 2. Get season start year. 
    // 3. Create the season XML object. Call of seasonXmlObject
    static start(i_season_case, i_abs_event_program_url, i_callback_fctn)
    {
        g_season_to_event_data = new SeasonToEventProgramXmlData(i_season_case, i_abs_event_program_url, i_callback_fctn);

        SeasonToEventProgramXml.checkInput();

        if (!g_season_to_event_data.m_input_data_ok)
        {
            return;
        }

        SeasonToEventProgramXml.seasonStartYear();

        SeasonToEventProgramXml.seasonXmlObject();

    } // start

    // Creates a season XML object
    static seasonXmlObject()
    {
        g_season_to_event_data.m_season_xml = null;

        var callback_function = SeasonToEventProgramXml.createEventXmlStartFile;

        var n_level_xml = 2;

        var start_year = g_season_to_event_data.m_season_start_year;

        g_season_to_event_data.m_season_xml = new SeasonXml(callback_function, n_level_xml, start_year);

    } // seasonXmlObject

    // Create start XML file with only the base tags
    // Call of UtilServer.saveDirFile
    static createEventXmlStartFile()
    {
        var path_file_name = g_season_to_event_data.m_abs_event_program_url;

        var content_string = '<EventProgram></EventProgram>';

        var callback_fctn = SeasonToEventProgramXml.eventObjectXml;

        UtilServer.saveDirFile(path_file_name, content_string, callback_fctn);

    } // createEventXmlStartFile

    // Creates the event XML object
    static eventObjectXml()
    {
        g_season_to_event_data.m_event_xml = null;

        var subdir_xml = "EventProgramXml"; // TODO Use m_abs_event_program_url
    
        var event_program_file_name = "EventProgram.xml"; // TODO Use m_abs_event_program_url

        var callback_fctn = SeasonToEventProgramXml.fromSeasonToEvent;
    
        g_season_to_event_data.m_event_xml = new EventProgramXml(subdir_xml, event_program_file_name, callback_fctn);

    } // eventObjectXml

    // Append event XML records with data from season XML records
    static fromSeasonToEvent()
    {
        var n_concerts = g_season_to_event_data.m_season_xml.getNumberOfConcerts();

        for (var concert_number = 1; concert_number <= n_concerts; concert_number++)
        {
            var concert_year = g_season_to_event_data.m_season_xml.getYear(concert_number);

            var concert_month = g_season_to_event_data.m_season_xml.getMonth(concert_number);

            var concert_day= g_season_to_event_data.m_season_xml.getDay(concert_number);

            var concert_start_hour = g_season_to_event_data.m_season_xml.getStartHour(concert_number);

            var concert_start_minute = g_season_to_event_data.m_season_xml.getStartMinute(concert_number);

            var concert_end_hour = g_season_to_event_data.m_season_xml.getEndHour(concert_number);

            var concert_end_minute = g_season_to_event_data.m_season_xml.getEndMinute(concert_number);

            var concert_place = g_season_to_event_data.m_season_xml.getPlace(concert_number);

            var concert_cancelled = g_season_to_event_data.m_season_xml.getCancelled(concert_number);

            var concert_name = g_season_to_event_data.m_season_xml.getBandName(concert_number);

            var concert_text = g_season_to_event_data.m_season_xml.getShortText(concert_number);

            g_season_to_event_data.m_event_xml.appendEventNode();

            var n_events = g_season_to_event_data.m_event_xml.getNumberOfEvents();

            g_season_to_event_data.m_event_xml.setYear(n_events, concert_year);

            g_season_to_event_data.m_event_xml.setMonth(n_events, concert_month);

            g_season_to_event_data.m_event_xml.setDay(n_events, concert_day);

            g_season_to_event_data.m_event_xml.setStartHour(n_events, concert_start_hour);

            g_season_to_event_data.m_event_xml.setStartMinute(n_events, concert_start_minute);

            g_season_to_event_data.m_event_xml.setEndHour(n_events, concert_end_hour);

            g_season_to_event_data.m_event_xml.setEndMinute(n_events, concert_end_minute);

            g_season_to_event_data.m_event_xml.setPlace(n_events, concert_place);

            g_season_to_event_data.m_event_xml.setCancelled(n_events, concert_cancelled);

            g_season_to_event_data.m_event_xml.setEventName(n_events, concert_name);

            g_season_to_event_data.m_event_xml.setShortText(n_events, concert_text);

            g_season_to_event_data.m_event_xml.setUrlReservationDir(n_events, 'TODO URL reservation directory');

            g_season_to_event_data.m_event_xml.setPrices(n_events, 'TODO Prices');

            g_season_to_event_data.m_event_xml.setInstructions(n_events, 'TODO Instructions');

        } // concert_number

        SeasonToEventProgramXml.saveEventXml();
       
    } // fromSeasonToEvent

    // Save the event XML file
    static saveEventXml()
    {
        var file_name_full_path = g_season_to_event_data.m_abs_event_program_url;

        var pretty_print = new PrettyPrintXml(g_season_to_event_data.m_event_xml.getXmlObject());

        var xml_content_str = pretty_print.xmlToWinFormattedString();

        var callback_fctn = g_season_to_event_data.m_callback_fctn;

        UtilServer.saveCallback(file_name_full_path, xml_content_str, callback_fctn);

    } // saveEventXml

    // Sets the season start year
    // Season changes 1/4
    // (Code copied from WwwHomepage getCurrentSeasonStartYear)
    static seasonStartYear()
    {
        var now_date = new Date();
        var now_year = now_date.getFullYear();
        var now_month = now_date.getMonth() + 1;
      
        g_season_to_event_data.m_season_start_year = now_year;
        
        if (now_month < 4)
        {
            g_season_to_event_data.m_season_start_year = now_year - 1;
        }

         if (g_season_to_event_data.m_season_case == 'previous')
         {
            g_season_to_event_data.m_season_start_year = g_season_to_event_data.m_season_start_year - 1;
         }
         else if (g_season_to_event_data.m_season_case == 'next')
         {
            g_season_to_event_data.m_season_start_year = g_season_to_event_data.m_season_start_year + 1;
         }

    } // seasonStartYear

    // Checks the input 
    static checkInput()
    {
        g_season_to_event_data.m_input_data_ok = true;

        if (g_season_to_event_data.m_season_case == 'current' || g_season_to_event_data.m_season_case == 'previous' 
                                                || g_season_to_event_data.m_season_case == 'next')
        {
            ; // Do nothing
        }
        else
        {
            alert("SeasonToEventProgramXml.checkInput Input case not current, previous or next. m_season_case= " 
                            + g_season_to_event_data.m_season_case);

            g_season_to_event_data.m_input_data_ok = false;
        }

        if (!UtilServer.isAbsolutePath(g_season_to_event_data.m_abs_event_program_url))
        {
            alert("SeasonToEventProgramXml.checkInput Not an absolute JAZZ live AARAU URL m_abs_event_program_url= " 
                                + g_season_to_event_data.m_abs_event_program_url);

            g_season_to_event_data.m_input_data_ok = false;            
        }

    } // checkInput



} // SeasonToEventProgramXml

// Holds the data necessary for the execution of SeasonToEventProgramXml
// The class is based on callback functions and they have to be static
class SeasonToEventProgramXmlData
{
    constructor(i_season_case, i_abs_event_program_url, i_callback_fctn)
    {
        // Season case current, previous or next
        this.m_season_case = i_season_case;

        // Absolute URL for the output event XML program file
        this.m_abs_event_program_url = i_abs_event_program_url;

        // Callback function for the creation of the event program file
        this.m_callback_fctn = i_callback_fctn;

        // Bool telling if the input data is OK
        this.m_input_data_ok = null;

        // Season start year
        this.m_season_start_year = -12345;

        // Instance of SeasonXml
        this.m_season_xml = null;

        // Instance of EventProgramXml
        this.m_event_xml = null;

    } // constructor

} // SeasonToEventProgramXmlData