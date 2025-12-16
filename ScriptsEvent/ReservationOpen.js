// DO NOT MAKE ANY CHANGES IN THIS FILE. THE FILED WAS MOVED (COPIED) TO 
// PROJECT ReservationSystem WHERE THE DEVELOPMENT WILL CONTINUE  

// File: ReservationOpen.js
// Date: 2025-12-15
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
    /////// Start Open Functions //////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Open the reservation page MakeReserservation.htm
    // 1. Check that m_reservation_data has been set
    // 2. Get relative URL to the directory where MakeReservation.htm is
    //    Call of UtilUrl.getRelativeUrlHtmlDir
    // 3. Set session storage data.
    //    Call of ReservationStorage.setSession
    //    This data will/can be used by web page MakeReservation.htm
    // 4. Open the MakeReservation.htm web page.
    //    Call of windows open
    // 5. Pass the data to the opened web page MakeReservation.htm
    //    Call of ReservationOpen.passDataToOpenedWindow
    openReservationPage()
    {
        if (null == this.m_reservation_data)
        {
            alert("ReservationOpen.initOpenReservationPage  m_reservation_data is null"); 

            return;
        }

        var relative_url_dir = UtilUrl.getRelativeUrlHtmlDir(this.m_absolute_url_reservation_dir);

        if (0 == relative_url_dir.length)
        {
            return;
        }

        ReservationStorage.setSession(this.m_reservation_data);

        var url_web_page = relative_url_dir + 'MakeReservation.htm';

        // var url_web_page = this.m_absolute_url_reservation_dir + 'MakeReservation.htm';
 
        if (UtilUrl.execApplicationOnServer())
        {
            ReservationOpen.passAsSessionStorageData(this.m_reservation_data);

            var make_window = open(url_web_page);
	
            ReservationOpen.passDataToOpenedWindow(make_window, this.m_reservation_data);
        }
        else
        {
            alert("ReservationOpen.initOpenReservationPage  Data for page MakeReservation.htm cannot be passed with VS Live Server"); 
        }

    } // openReservationPage

    // Pass the data to the opened window
    static passDataToOpenedWindow(i_make_window, i_reservation_data)
    {
        i_make_window.passed_data_add_to_xml_file_name = i_reservation_data.getAddToXmFileName();
        i_make_window.passed_data_reservation_name = i_reservation_data.getName();
        i_make_window.passed_data_reservation_email = i_reservation_data.getEmail();
        i_make_window.passed_data_reservation_remark = i_reservation_data.getRemark();
        i_make_window.passed_data_requested_concert_number = i_reservation_data.getEventNumber();

    } // passDataToOpenedWindow

    // Pass the reservation data as session storage data
    static passAsSessionStorageData(i_reservation_data)
    {
        var pass_data = new PassReservationData();

        pass_data.setName(i_reservation_data.getName());
        pass_data.setEmail(i_reservation_data.getEmail());
        pass_data.setRemark(i_reservation_data.getRemark());
        pass_data.setEventNumber(i_reservation_data.getEventNumber());

        // TODO Set the registered (unique) event number defined in en the event program XML file
        pass_data.setRegEventNumber("");

        PassReservation.set(pass_data);

    } // passAsSessionStorageData

    ///////////////////////////////////////////////////////////////////////////
    /////// End Open Functions ////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////


} // ReservationOpen
