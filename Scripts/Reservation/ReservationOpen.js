// File: ReservationOpen.js
// Date: 2024-12-29
// Author: Gunnar Lidén

// Class handling the opening of another window and passing data to and retrieving 
// data from this window.
// The functions are based on the windows open function. Please reter to:
// https://developer.mozilla.org/en-US/docs/Web/API/Window/open
//
// TODO This class (file) shall be in project WwwReservation and not in WwwReservationLayout
class ReservationOpen
{
    constructor(i_reservation_data)
    {
        // Reservation data. An instance of the class ReservationData
        this.m_reservation_data = i_reservation_data;

         // Initialization function
        this.init();

    } // constructor

    ///////////////////////////////////////////////////////////////////////////
    /////// Start Init Functions //////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Initialization function
    // 1. Set session storage data.
    //    Call of ReservationStorage.setSession
    init()
    {
        ReservationStorage.setSession(this.m_reservation_data)

    } // init



    ///////////////////////////////////////////////////////////////////////////
    /////// End Init Functions ////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

} // ReservationOpen
