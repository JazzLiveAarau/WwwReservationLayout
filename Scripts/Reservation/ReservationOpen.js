// File: ReservationOpen.js
// Date: 2024-12-28
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

    } // constructor

    ///////////////////////////////////////////////////////////////////////////
    /////// Start Set Functions ///////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Sets the reservation data. 
    // i_reservation_data: An instance of the class ReservationData
    setReservationData(i_reservation_data)
    {
        this.m_reservation_data = i_reservation_data;

    } // setReservationData

    ///////////////////////////////////////////////////////////////////////////
    /////// End Set Functions /////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

} // ReservationOpen