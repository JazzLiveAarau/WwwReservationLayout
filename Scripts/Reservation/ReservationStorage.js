// File: ReservationStorage.js
// Date: 2024-12-28
// Author: Gunnar Lidén

// Class handling the storage of reservation data in the computer
//
// TODO This class (file) shall be in project WwwReservation and not in WwwReservationLayout
class ReservationStorage
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

} // ReservationStorage
