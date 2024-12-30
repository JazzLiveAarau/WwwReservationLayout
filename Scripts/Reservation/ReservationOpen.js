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

        if (!ReservationOpen.urlReservationDirAbsolute(this.m_absolute_url_reservation_dir))
        {
            return;
        }

        ReservationStorage.setSession(this.m_reservation_data)

    } // initOpenReservationPage


    ///////////////////////////////////////////////////////////////////////////
    /////// End Init Functions ////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    /////// Start Url Functions ///////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Returns true if the URL path is absolute
    static urlReservationDirAbsolute(i_absolute_url_reservation_dir)
    {
        var url_trim = i_absolute_url_reservation_dir.trim();

        if (0 == url_trim.length)
        {
            alert("ReservationOpen.initOpenReservationPage  i_absolute_url_reservation_dir is empty"); 

            return false;
        }

        var index_slashes = url_trim.indexOf('://')

        if (index_slashes > 0)
        {
            return true;
        }
        else
        {
            alert("ReservationOpen.initOpenReservationPage  i_absolute_url_reservation_dir is not an absolute path"); 

            return false;
        }

    } // urlReservationDirAbsolute

    ///////////////////////////////////////////////////////////////////////////
    /////// End Url Functions /////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

} // ReservationOpen
