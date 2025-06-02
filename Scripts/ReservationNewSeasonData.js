// File: ReservationNewSeasonData.js
// Date: 2025-06-02
// Author: Gunnar Lidén

// Inhalt
// =============
//
// Class holding data for the creation of the new season files


// Holds the data necessary for the creation of the new season files
class ReservationNewSeasonData
{
    constructor(i_season_case, i_main_dir, i_result_dir, i_sub_xml_dir, i_xml_filename, i_event_program_callback_fctn)
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
        this.m_event_program_callback_fctn = i_event_program_callback_fctn;

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

        // Current index for m_event_xml_array in recursive loop
        this.m_event_object_index = null;

        // Array with event XML objects 
        this.m_event_xml_array = null;

        // String that will be added to the output XML event file names
        //  e.g. Salmen (because of the old version of the reservation system)
        // String may be empty 
        this.m_file_name_add_str = 'Salmen';


        // Initialization
        this.init();

    } // constructor

    // Initialization
    // 1. Check input. Call checkInput
    // 2. Construct the URL for the output eventprogram XML file
    //    Call of absUrlEventProgramFile
    // 3. Construct the relative URL for the directory of the output event XML program file
    //    Call of relUrlEventProgramDir
    // 4. Constructs the absolute URL for the result directory
    //    Call of absUrlResultDir
    // 5. Get season start year. 
    //    Call of seasonStartYear
    init()
    {
        this.checkInput();

        if (!this.m_input_data_ok)
        {
            return;
        }

        this.absUrlEventProgramFile();

        this.absUrlResultDir();

        this.relUrlEventProgramDir();

        this.seasonStartYear();

    } // init

    // Checks the input
    checkInput()
    {
        this.m_input_data_ok = true;

        if (this.m_season_case == 'current' || this.m_season_case == 'previous' 
                                                || this.m_season_case == 'next')
        {
            ; // Do nothing
        }
        else
        {
            alert("ReservationNewSeasonData.checkInput Input case not current, previous or next. m_season_case= " 
                            + this.m_season_case);

            this.m_input_data_ok = false;
        }

        if (this.m_main_dir == 'Reservation' || this.m_main_dir == 'ReservationLayout' )
        {
            ;  // Do nothing
        }
        else
        {
            alert("ReservationNewSeasonData.checkInput Input main dir not Reservation or ReservationLayout m_main_dir= " 
                + this.m_main_dir);

            this.m_input_data_ok = false;            
        }

        if (this.m_result_dir.trim().length == 0)
        {
            alert("ReservationNewSeasonData.checkInput Input result directory string is empty " );

            this.m_input_data_ok = false;     
        }

        if (this.m_sub_xml_dir.trim().length == 0)
        {
            alert("ReservationNewSeasonData.checkInput Input string for the directory of the XML file is empty" );

            this.m_input_data_ok = false;     
        }

        if (this.m_xml_filename.trim().length == 0)
        {
            alert("ReservationNewSeasonData.checkInput Input string for the XML file name is empty" );

            this.m_input_data_ok = false;     
        }

    } // checkInput

    //  Constructs the absolute URL for the event program file
    absUrlEventProgramFile()
    {
        var abs_url = 'https://jazzliveaarau.ch/';

        abs_url =  abs_url + this.m_main_dir + '/';

        abs_url =  abs_url + this.m_result_dir + '/';

        abs_url =  abs_url + this.m_sub_xml_dir + '/';

        abs_url =  abs_url + this.m_xml_filename;

        this.m_abs_event_program_url = abs_url;

    } // absUrlEventProgramFile

   //  Constructs the absolute URL for the event program file
   absUrlResultDir()
   {
       var abs_url = 'https://jazzliveaarau.ch/';

       abs_url =  abs_url + this.m_main_dir + '/';

       abs_url =  abs_url + this.m_result_dir + '/';

       this.m_abs_result_dir_url = abs_url;

   } // absUrlResultDir

    // Constructs the relative URL for the directory of the output event XML program file
    relUrlEventProgramDir()
    {
        var rel_url = '../';

        rel_url =  rel_url + this.m_main_dir + '/';

        rel_url =  rel_url + this.m_result_dir + '/';

        rel_url =  rel_url + this.m_sub_xml_dir;

        this.m_rel_event_program_dir_url = rel_url;

    } // relUrlEventProgramDir

    // Sets the season start year
    // Season changes 1/4
    // (Code copied from WwwHomepage getCurrentSeasonStartYear)
    seasonStartYear()
    {
        var now_date = new Date();
        var now_year = now_date.getFullYear();
        var now_month = now_date.getMonth() + 1;
      
        this.m_season_start_year = now_year;
        
        if (now_month < 4)
        {
            this.m_season_start_year = now_year - 1;
        }

         if (this.m_season_case == 'previous')
         {
            this.m_season_start_year = this.m_season_start_year - 1;
         }
         else if (this.m_season_case == 'next')
         {
            this.m_season_start_year = this.m_season_start_year + 1;
         }

    } // seasonStartYear

} // ReservationNewSeasonData