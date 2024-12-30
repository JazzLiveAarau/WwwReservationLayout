// File: ReservationOpen.js
// Date: 2024-12-30
// Author: Gunnar Lidén

// Class handling the opening of another window and passing data to and retrieving 
// data from this window.
// The functions are based on the windows open function. Please reter to:
// https://developer.mozilla.org/en-US/docs/Web/API/Window/open
//
// TODO This class (file) shall be in project WwwReservation and not in WwwReservationLayout
class ReservationOpen
{
    constructor()
    {
        // Reservation data. An instance of the class ReservationData
        this.m_reservation_data = null;

        // Absolute path to the reservation (version) directory
        this.m_absolute_url_reservation_dir = '';

    } // constructor

    ///////////////////////////////////////////////////////////////////////////
    /////// Start Set Functions ///////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Set reservation data. An instance of the class ReservationData
    setReservationData(i_reservation_data)
    {
        this.m_reservation_data = i_reservation_data;

    } // setReservationData

    // Set the absolute path to the reservation (version) directory
    setUrlReservationDir(i_absolute_url_reservation_dir)
    {
        this.m_absolute_url_reservation_dir = i_absolute_url_reservation_dir;

    } // setReservationData

    ///////////////////////////////////////////////////////////////////////////
    /////// End Set Functions /////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    /////// Start Init Functions //////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Initialization function
    // 1. Check that m_reservation_data and m_absolute_url_reservation_dir have
    //    been set. Call of ReservationOpen.urlReservationDirAbsolute
    // 2. Set session storage data.
    //    Call of ReservationStorage.setSession
    initOpenReservationPage()
    {
        if (null == this.m_reservation_data)
        {
            alert("ReservationOpen.initOpenReservationPage  m_reservation_data is null"); 

            return;
        }

        var relative_url_dir = UtilUrl.getRelativePathToDirectory(this.m_absolute_url_reservation_dir);


        /* QQQ

        if (!UtilUrl.isAbsolutePath(this.m_absolute_url_reservation_dir)  || 
            !UtilUrl.isDirectoryPath(this.m_absolute_url_reservation_dir))
        {
            return;
        }

        var only_subdirs = UtilUrl.getPathOnlySubdirectories(this.m_absolute_url_reservation_dir);

        var current_base = window.location.href;

        var only_subdirs_base = UtilUrl.getPathOnlySubdirectories(current_base);

        ReservationStorage.setSession(this.m_reservation_data)

        var test_file = this.m_absolute_url_reservation_dir + 'XML/' + 'Spagi_76_Chairs_V_1.xml';

        var only_subdirs_test_file =  UtilUrl.getPathOnlySubdirectories(test_file);

        var test_file_name = UtilUrl.getFileName(test_file);

        var test_file_path = UtilUrl.getFilePath(test_file);

        var test_file_extension = UtilUrl.getFileExtension(test_file);

        var test_file_name_without_extension = UtilUrl.getFileNameWithoutExtension(test_file);
       QQ*/
       

        if (!UtilUrl.execApplicationOnServer())
        {
            // TODO
        }

    } // initOpenReservationPage


    ///////////////////////////////////////////////////////////////////////////
    /////// End Init Functions ////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////


} // ReservationOpen
