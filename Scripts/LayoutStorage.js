// File: LayoutStorage.js
// Date: 2025-01-05
// Author: Gunnar Lidén

// Class handling the storage of layout data in the computer
//
// Please note that session data not yet is used

class LayoutStorage
{
    ///////////////////////////////////////////////////////////////////////////
    /////// Start Set Functions ///////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Sets the layout data as windows local storage. 
    // i_layout_data: An instance of the class LayoutData
    static setLocal(i_layout_data)
    {
        localStorage.setItem(LayoutStorage.keyOrganisationDir(), i_layout_data.getOrganisationDir());

        localStorage.setItem(LayoutStorage.keyResultDir(), i_layout_data.getResultDir());

    } // setLocal

    // Sets the layout data as windows session storage. 
    // i_layout_data: An instance of the class LayoutData
    static setSession(i_layout_data)
    {
        sessionStorage.setItem(LayoutStorage.keyOrganisationDir(), i_layout_data.getOrganisationDir());

        sessionStorage.setItem(LayoutStorage.keyResultDir(), i_layout_data.getResultDir());

    } // setSession

    ///////////////////////////////////////////////////////////////////////////
    /////// End Set Functions /////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    /////// Start Get Functions ///////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Returns a reservation data object LayoutData with data from the 
    // windows local storage.
    static getLocal()
    {
        var ret_layout_data = new LayoutData();

        var organisation_dir = localStorage.getItem(LayoutStorage.keyOrganisationDir());

        var result_dir = localStorage.getItem(LayoutStorage.keyResultDir());

        ret_layout_data.setOrganisationDir(organisation_dir);

        ret_layout_data.setResultDir(result_dir);

        return ret_layout_data;

    } // getLocal

    // Returns a reservation data object LayoutData with data from the 
    // windows session storage. 
    static getSession()
    {
        var ret_layout_data = new LayoutData();

        var organisation_dir = sessionStorage.getItem(LayoutStorage.keyOrganisationDir());

        var result_dir = sessionStorage.getItem(LayoutStorage.keyResultDir());

        ret_layout_data.setOrganisationDir(organisation_dir);

        ret_layout_data.setResultDir(result_dir);

        return ret_layout_data;

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
        var organisation_dir = localStorage.getItem(LayoutStorage.keyOrganisationDir());

        var result_dir = localStorage.getItem(LayoutStorage.keyResultDir());

        if (null == organisation_dir)
        {
            organisation_dir = LayoutStorage.undefinedStringValue();

            localStorage.setItem(LayoutStorage.keyOrganisationDir(), organisation_dir);
        }

        if (null == result_dir)
        {
            result_dir = LayoutStorage.undefinedStringValue();

            localStorage.setItem(LayoutStorage.keyResultDir(), result_dir);
        }

    } // initLocal

    // Initialization of not yet set session variables
    static initSession()
    {
        var organisation_dir = sessionStorage.getItem(LayoutStorage.keyOrganisationDir());

        var result_dir = sessionStorage.getItem(LayoutStorage.keyResultDir());

        if (null == organisation_dir)
        {
            organisation_dir = LayoutStorage.undefinedStringValue();

            sessionStorage.setItem(LayoutStorage.keyOrganisationDir(), organisation_dir);
        }

        if (null == result_dir)
        {
            result_dir = LayoutStorage.undefinedStringValue();

            sessionStorage.setItem(LayoutStorage.keyResultDir(), result_dir);
        }

    } // initSession

    ///////////////////////////////////////////////////////////////////////////
    /////// End Init Functions ////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    /////// Start Get Storage Keys ////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Key organisation directory name
    static keyOrganisationDir()
    {
        return 'layout_organisaation_dir_name_str';
        
    } // keyOrganisationDir

    // Key result directory name
    static keyResultDir()
    {
        return 'layout_result_dir_name_str';
        
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

} // LayoutStorage

// Class that hold data for the creation of layout files
class LayoutData
{
    constructor()
    {
        // Name of the server organisation directory name
        this.m_organisation_dir_name = "";

        // Name of the server result directory name
        this.m_result_directory_name = "";

    } // constructor

    // Returns the name of the server organisation directory name
    getOrganisationDir()
    {
        return this.m_organisation_dir_name;

    } // getOrganisationDir

    // Sets the name of the server organisation directory name
    setOrganisationDir(i_organisation_dir_name)
    {
        return this.m_organisation_dir_name = i_organisation_dir_name;

    } // setOrganisationDir

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

} // LayoutData
