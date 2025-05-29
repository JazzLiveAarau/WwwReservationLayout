// File: NewSeasonStorage.js
// Date: 2025-05-29
// Author: Gunnar Lidén

// Class handling the storage of new season data in the computer
//
// Please note that session data not yet is used

class NewSeasonStorage
{
    ///////////////////////////////////////////////////////////////////////////
    /////// Start Set Functions ///////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Sets the new season data as windows local storage. 
    // i_new_season_data: An instance of the class NewSeasonData
    static setLocal(i_new_season_data)
    {
        localStorage.setItem(NewSeasonStorage.keyMainDir(), i_new_season_data.getMainDir());

        localStorage.setItem(NewSeasonStorage.keyResultDir(), i_new_season_data.getResultDir());

    } // setLocal

    // Sets the layout data as windows session storage. 
    // i_new_season_data: An instance of the class NewSeasonData
    static setSession(i_new_season_data)
    {
        sessionStorage.setItem(NewSeasonStorage.keyMainDir(), i_new_season_data.getMainDir());

        sessionStorage.setItem(NewSeasonStorage.keyResultDir(), i_new_season_data.getResultDir());

    } // setSession

    ///////////////////////////////////////////////////////////////////////////
    /////// End Set Functions /////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    /////// Start Get Functions ///////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Returns a reservation new season data object NewSeasonData with data from the 
    // windows local storage.
    static getLocal()
    {
        var ret_new_season_data = new NewSeasonData();

        var main_dir = localStorage.getItem(NewSeasonStorage.keyMainDir());

        var result_dir = localStorage.getItem(NewSeasonStorage.keyResultDir());

        if (main_dir != null && main_dir.length > 5 && main_dir != NewSeasonStorage.undefinedStringValue())
        {
            ret_new_season_data.setMainDir(main_dir);
        }

        if (result_dir != null && result_dir.length > 5 && result_dir != NewSeasonStorage.undefinedStringValue())
        {
            ret_new_season_data.setResultDir(result_dir);
        }        

        return ret_new_season_data;

    } // getLocal

    // Returns a reservation new season data object NewSeasonData with data from the 
    // windows session storage. 
    static getSession()
    {
        var ret_new_season_data = new NewSeasonData();

        var main_dir = sessionStorage.getItem(NewSeasonStorage.keyMainDir());

        var result_dir = sessionStorage.getItem(NewSeasonStorage.keyResultDir());

        ret_new_season_data.setMainDir(main_dir);

        ret_new_season_data.setResultDir(result_dir);

        return ret_new_season_data;

    } // getSession

    ///////////////////////////////////////////////////////////////////////////
    /////// End Get Functions /////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    /////// Start Init Functions //////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Initialization of not yet set storage variables
    static initLocal()
    {
        var main_dir = localStorage.getItem(NewSeasonStorage.keyMainDir());

        var result_dir = localStorage.getItem(NewSeasonStorage.keyResultDir());

        if (null == main_dir)
        {
            main_dir = NewSeasonStorage.undefinedStringValue();

            localStorage.setItem(NewSeasonStorage.keyMainDir(), main_dir);
        }

        if (null == result_dir)
        {
            result_dir = NewSeasonStorage.undefinedStringValue();

            localStorage.setItem(NewSeasonStorage.keyResultDir(), result_dir);
        }

    } // initLocal

    // Initialization of not yet set session variables
    static initSession()
    {
        var main_dir = sessionStorage.getItem(NewSeasonStorage.keyMainDir());

        var result_dir = sessionStorage.getItem(NewSeasonStorage.keyResultDir());

        if (null == main_dir)
        {
            main_dir = NewSeasonStorage.undefinedStringValue();

            sessionStorage.setItem(NewSeasonStorage.keyMainDir(), main_dir);
        }

        if (null == result_dir)
        {
            result_dir = NewSeasonStorage.undefinedStringValue();

            sessionStorage.setItem(NewSeasonStorage.keyResultDir(), result_dir);
        }

    } // initSession

    ///////////////////////////////////////////////////////////////////////////
    /////// End Init Functions ////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    /////// Start Get Storage Keys ////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Key organisation directory name
    static keyMainDir()
    {
        return 'new_season_main_dir_name_str';
        
    } // keyMainDir

    // Key result directory name
    static keyResultDir()
    {
        return 'new_season_result_dir_name_str';
        
    } // keyResultDir

    ///////////////////////////////////////////////////////////////////////////
    /////// End Get Storage Keys //////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    /////// Start Get Undefined Value /////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Returns a string (flag) telling that the variable not yet was set
    static undefinedStringValue()
    {
        return '';

    } // undefinedStringValue

    ///////////////////////////////////////////////////////////////////////////
    /////// End Get Undefined Value ///////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

} // NewSeasonStorage

// Class that hold data for the creation of new season files
class NewSeasonData
{
    constructor()
    {
        // Name of the server main directory name
        // Only Reservation (release) and ReservationLayout (test) are allowed
        this.m_main_dir_name = "ReservationLayout";

        // Name of the server result directory name
        this.m_result_directory_name = "Spagi_76_Chairs_V_3"; //QQ Temporary

        // Flag telling if data is OK
        this.m_data_is_valid = true;

    } // constructor

    // Returns the name of the new server season main directory name
    getMainDir()
    {
        return this.m_main_dir_name;

    } // getMainDir

    // Sets the name of the new server season main directory name
    setMainDir(i_main_dir_name)
    {
        return this.m_main_dir_name = i_main_dir_name;

    } // setMainDir

    // Returns the name of the server result directory name
    getResultDir()
    {
        return this.m_result_directory_name;

    } // getResultDir

    // Sets the name of the server result directory name
    setResultDir(i_result_directory_name)
    {
        return this.m_result_directory_name = i_result_directory_name;

    } // setResultDir

    // Checks the data 
    checkData()
    {
        this.m_data_is_valid = true;
        
        if (this.m_main_dir_name != 'Reservation' && this.m_main_dir_name != 'ReservationLayout')
        {
            alert("Gültige Ordner-Namen sind Reservation und ReservationLayout. Nicht " + this.m_main_dir_name);

            this.m_data_is_valid = false;
        }

        if (this.m_result_directory_name.trim().length < 5)
        {
            alert(" Name des Konzerztsaal-Ordners zu kurz.  Nicht " + this.m_result_directory_name);

            this.m_data_is_valid = false;           
        }


    } // checkData

    // Returns true if data is valid. Note checkData must be executed!
    dataIsValid()
    {
        return this.m_data_is_valid;

    } // dataIsValid

} // NewSeasonData
