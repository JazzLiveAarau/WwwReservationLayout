// File: SeasonToEventProgramXml.js
// Date: 2025-04-24
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
    // i_main_dir: Directory Reservation (Release) or ReservationLayout (Development)
    // i_result_dir: Directory for concert room/version, e.g. Spagi_76_Chairs_V_2
    // i_sub_xml_dir: Subdirectory for the XML event file
    // i_xml_filename: Name of the XML event file
    constructor(i_season_case, i_main_dir, i_result_dir, i_sub_xml_dir, i_xml_filename, i_callback_fctn)
    {
        // Start function
        SeasonToEventProgramXml.start(i_season_case, i_main_dir, i_result_dir, i_sub_xml_dir, i_xml_filename, i_callback_fctn);

    } // constructor

    // Initialization
    // 1. Check input. Call SeasonToEventProgramXml.checkInput
    // 2. Construct the URL for the output eventprogram XML file
    //    Call of SeasonToEventProgramXml.absUrlEventProgramFile
    // 3. Construct the relative URL for the directory of the output event XML program file
    //    Call of  SeasonToEventProgramXml.relUrlEventProgramDir
    // 4. Constructs the absolute URL for the result directory
    //    Call of SeasonToEventProgramXml.absUrlResultDir
    // 4. Get season start year. Call of SeasonToEventProgramXml.seasonStartYear
    // 5. Create the season XML object. Call of SeasonToEventProgramXml.seasonXmlObject
    static start(i_season_case, i_main_dir, i_result_dir, i_sub_xml_dir, i_xml_filename, i_callback_fctn)
    {
        g_season_to_event_data = new SeasonToEventProgramXmlData(i_season_case, i_main_dir, i_result_dir, i_sub_xml_dir, i_xml_filename, i_callback_fctn);

        SeasonToEventProgramXml.checkInput();

        if (!g_season_to_event_data.m_input_data_ok)
        {
            return;
        }

        SeasonToEventProgramXml.absUrlEventProgramFile();

        SeasonToEventProgramXml.relUrlEventProgramDir();

        SeasonToEventProgramXml.absUrlResultDir();

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

        var rel_subdir_xml = g_season_to_event_data.m_rel_event_program_dir_url;
    
        var event_program_file_name = g_season_to_event_data.m_xml_filename;

        var callback_fctn = SeasonToEventProgramXml.fromSeasonToEvent;
    
        g_season_to_event_data.m_event_xml = new EventProgramXml(rel_subdir_xml, event_program_file_name, callback_fctn);

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

            g_season_to_event_data.m_event_xml.setUrlReservationDir(n_events, g_season_to_event_data.m_abs_result_dir_url);

            g_season_to_event_data.m_event_xml.setPrices(n_events, SeasonToEventProgramXml.prices());

            g_season_to_event_data.m_event_xml.setInstructions(n_events, SeasonToEventProgramXml.instructions());

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

    //  Constructs the absolute URL for the event program file
    static absUrlEventProgramFile()
    {
        var abs_url = 'https://jazzliveaarau.ch/';

        abs_url =  abs_url + g_season_to_event_data.m_main_dir + '/';

        abs_url =  abs_url + g_season_to_event_data.m_result_dir + '/';

        abs_url =  abs_url + g_season_to_event_data.m_sub_xml_dir + '/';

        abs_url =  abs_url + g_season_to_event_data.m_xml_filename;

        g_season_to_event_data.m_abs_event_program_url = abs_url;

    } // absUrlEventProgramFile

   //  Constructs the absolute URL for the event program file
   static absUrlResultDir()
   {
       var abs_url = 'https://jazzliveaarau.ch/';

       abs_url =  abs_url + g_season_to_event_data.m_main_dir + '/';

       abs_url =  abs_url + g_season_to_event_data.m_result_dir + '/';

       g_season_to_event_data.m_abs_result_dir_url = abs_url;

   } // absUrlResultDir

    // Constructs the relative URL for the directory of the output event XML program file
    static relUrlEventProgramDir()
    {
        var rel_url = '../';

        rel_url =  rel_url + g_season_to_event_data.m_main_dir + '/';

        rel_url =  rel_url + g_season_to_event_data.m_result_dir + '/';

        rel_url =  rel_url + g_season_to_event_data.m_sub_xml_dir;

        g_season_to_event_data.m_rel_event_program_dir_url = rel_url;

    } // relUrlEventProgramDir

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

    // Returns reservation instructions
    // (extracted from Application.xml for the reervation confirmation email)
    static instructions()
    {
        return 'Bitte beachten, dass reservierte Plätze 10 Minuten vor Konzertbeginn eingenommen ' + 
                'werden müssen, sonst werden sie freigegeben.';

    } // instructions

    // Returns prices
    // (Text is not in any XML file. Not on the homepage! Only in the printed season program)
    static prices()
    {
        return 'Eintritt \n' + 'Fr. 25.- Erwachsene \n'   + 'Fr. 15.- Supporter \n'  + 
                    'Fr. 15.- SchülerInnen/StudentInnen (mit Legi, Ausweis)  \n'  ;
        
    } // prices

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

        if (g_season_to_event_data.m_main_dir == 'Reservation' || g_season_to_event_data.m_main_dir == 'ReservationLayout' )
        {
            ;  // Do nothing
        }
        else
        {
            alert("SeasonToEventProgramXml.checkInput Input main dir not Reservation or ReservationLayout m_main_dir= " 
                + g_season_to_event_data.m_main_dir);

            g_season_to_event_data.m_input_data_ok = false;            
        }

        if (g_season_to_event_data.m_result_dir.trim().length == 0)
        {
            alert("SeasonToEventProgramXml.checkInput Input result directory string is empty " );

            g_season_to_event_data.m_input_data_ok = false;     
        }

        if (g_season_to_event_data.m_sub_xml_dir.trim().length == 0)
        {
            alert("SeasonToEventProgramXml.checkInput Input string for the directory of the XML file is empty" );

            g_season_to_event_data.m_input_data_ok = false;     
        }

        if (g_season_to_event_data.m_xml_filename.trim().length == 0)
        {
            alert("SeasonToEventProgramXml.checkInput Input string for the XML file name is empty" );

            g_season_to_event_data.m_input_data_ok = false;     
        }

    } // checkInput

} // SeasonToEventProgramXml

// Holds the data necessary for the execution of SeasonToEventProgramXml
// The class is based on callback functions and they have to be static
class SeasonToEventProgramXmlData
{
    constructor(i_season_case, i_main_dir, i_result_dir, i_sub_xml_dir, i_xml_filename, i_callback_fctn)
    {
        // Season case current, previous or next
        this.m_season_case = i_season_case;

        // Directory Reservation (Release) or ReservationLayout (Development)
        this.m_main_dir = i_main_dir;

        // Directory for the concert room/version, e.g. Spagi_76_Chairs_V_2
        this.m_result_dir = i_result_dir;

        // Subdirectory for the XML event file
        this.m_sub_xml_dir = i_sub_xml_dir;

        // Name of the XML event file
        this.m_xml_filename = i_xml_filename;

        // Callback function for the creation of the event program file
        this.m_callback_fctn = i_callback_fctn;

        // Absolute URL for the output event XML program file
        this.m_abs_event_program_url = '';

        // Absolute URL for the output result directory
        this.m_abs_result_dir_url = '';

        // Relative URL for the directory of the output event XML program file
        this.m_rel_event_program_dir_url = '';

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