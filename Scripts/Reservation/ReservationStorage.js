// File: ReservationStorage.js
// Date: 2024-12-29
// Author: Gunnar Lidén

// Class handling the storage of reservation data in the computer
//
// TODO This class (file) shall be in project WwwReservation and not in WwwReservationLayout
class ReservationStorage
{
    ///////////////////////////////////////////////////////////////////////////
    /////// Start Set Functions ///////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Sets the reservation data as windows local storage. 
    // i_reservation_data: An instance of the class ReservationData
    // Please note that all data of ReservationData is saved in the local 
    // storage, but at the moment only name and and email are used in this
    // web application
    static setLocal(i_reservation_data)
    {
        localStorage.setItem(ReservationStorage.keyAddToXmFileName, i_reservation_data.getAddToXmFileName());

        localStorage.setItem(ReservationStorage.keyName, i_reservation_data.getName());

        localStorage.setItem(ReservationStorage.keyEmail, i_reservation_data.getEmail());

        localStorage.setItem(ReservationStorage.keyRemark, i_reservation_data.getRemark());

        localStorage.setItem(ReservationStorage.keyEventNumber, i_reservation_data.getEventNumberString());

    } // setLocal

    // Sets the reservation data as windows session storage. 
    // i_reservation_data: An instance of the class ReservationData
    static setSession(i_reservation_data)
    {

        sessionStorage.setItem(ReservationStorage.keyAddToXmFileName, i_reservation_data.getAddToXmFileName());

        sessionStorage.setItem(ReservationStorage.keyName, i_reservation_data.getName());

        sessionStorage.setItem(ReservationStorage.keyEmail, i_reservation_data.getEmail());

        sessionStorage.setItem(ReservationStorage.keyRemark, i_reservation_data.getRemark());

        sessionStorage.setItem(ReservationStorage.keyEventNumber, i_reservation_data.getEventNumberString());

    } // setSession

    ///////////////////////////////////////////////////////////////////////////
    /////// End Set Functions /////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    /////// Start Get Functions ///////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Returns a reservation data object ReservationData with data from the 
    // windows local storage. 
    // Please note that all data of ReservationData is saved in the local 
    // storage, but at the moment only name and and email are used in this
    // web application
    static getLocal()
    {
        var ret_reservation_data = new ReservationData();

        var add_str = localStorage.getItem(ReservationStorage.keyAddToXmFileName);

        var reservation_name = localStorage.getItem(ReservationStorage.keyName);

        var reservation_email = localStorage.getItem(ReservationStorage.keyEmail);

        var reservation_remark = localStorage.getItem(ReservationStorage.keyRemark);

        var event_number_str = localStorage.getItem(ReservationStorage.keyEventNumber);

        // add_str is not used in setAddToXmFileName
        ret_reservation_data.setAddToXmFileName(add_str);

        ret_reservation_data.setName(reservation_name);

        ret_reservation_data.setEmail(reservation_email);

        ret_reservation_data.setRemark(reservation_remark);

        var event_number_int = parseInt(event_number_str);

        ret_reservation_data.setEventNumber(event_number_int);

        return ret_reservation_data;

    } // getLocal

    // Returns a reservation data object ReservationData with data from the 
    // windows session storage. 
    static getSession()
    {
        var ret_reservation_data = new ReservationData();

        var add_str = sessionStorage.getItem(ReservationStorage.keyAddToXmFileName);

        var reservation_name = sessionStorage.getItem(ReservationStorage.keyName);

        var reservation_email = sessionStorage.getItem(ReservationStorage.keyEmail);

        var reservation_remark = sessionStorage.getItem(ReservationStorage.keyRemark);

        var reservation_name_str = sessionStorage.getItem(ReservationStorage.keyEventNumber);

        // add_str is not used in setAddToXmFileName
        ret_reservation_data.setAddToXmFileName(add_str);

        ret_reservation_data.setName(reservation_name);

        ret_reservation_data.setEmail(reservation_email);

        ret_reservation_data.setRemark(reservation_remark);

        var reservation_name_int = parseInt(reservation_name_str);

        ret_reservation_data.setEventNumber(reservation_name_int);

        return ret_reservation_data;

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
        var add_str = localStorage.getItem(ReservationStorage.keyAddToXmFileName);

        var reservation_name = localStorage.getItem(ReservationStorage.keyName);

        var reservation_email = localStorage.getItem(ReservationStorage.keyEmail);

        var reservation_remark = localStorage.getItem(ReservationStorage.keyRemark);

        var event_number_str = localStorage.getItem(ReservationStorage.keyEventNumber);

        if (null == add_str)
        {
            add_str = ReservationStorage.undefinedStringValue();

            localStorage.setItem(ReservationStorage.keyAddToXmFileName, add_str);
        }

        if (null == reservation_name)
        {
            reservation_name = ReservationStorage.undefinedStringValue();

            localStorage.setItem(ReservationStorage.keyName, reservation_name);
        }

        if (null == reservation_email)
        {
            reservation_email = ReservationStorage.undefinedStringValue();

            localStorage.setItem(ReservationStorage.keyEmail, reservation_email);
        }

        if (null == reservation_remark)
        {
            reservation_remark = ReservationStorage.undefinedStringValue();

            localStorage.setItem(ReservationStorage.keyRemark, reservation_remark);
        }

        if (null == event_number_str)
        {
            event_number_str = ReservationStorage.undefinedIntValue();

            localStorage.setItem(ReservationStorage.keyEventNumber, event_number_str);
        }

    } // initLocal

    // Initialization of not yet set session variables
    static initSession()
    {
        var add_str = sessionStorage.getItem(ReservationStorage.keyAddToXmFileName);

        var reservation_name = sessionStorage.getItem(ReservationStorage.keyName);

        var reservation_email = sessionStorage.getItem(ReservationStorage.keyEmail);

        var reservation_remark = sessionStorage.getItem(ReservationStorage.keyRemark);

        var event_number_str = sessionStorage.getItem(ReservationStorage.keyEventNumber);

        if (null == add_str)
        {
            add_str = ReservationStorage.undefinedStringValue();

            sessionStorage.setItem(ReservationStorage.keyAddToXmFileName, add_str);
        }

        if (null == reservation_name)
        {
            reservation_name = ReservationStorage.undefinedStringValue();

            sessionStorage.setItem(ReservationStorage.keyName, reservation_name);
        }

        if (null == reservation_email)
        {
            reservation_email = ReservationStorage.undefinedStringValue();

            sessionStorage.setItem(ReservationStorage.keyEmail, reservation_email);
        }

        if (null == reservation_remark)
        {
            reservation_remark = ReservationStorage.undefinedStringValue();

            sessionStorage.setItem(ReservationStorage.keyRemark, reservation_remark);
        }

        if (null == event_number_str)
        {
            event_number_str = ReservationStorage.undefinedIntValue();

            sessionStorage.setItem(ReservationStorage.keyEventNumber, event_number_str);
        }

    } // initSession

    ///////////////////////////////////////////////////////////////////////////
    /////// End Init Functions ////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    /////// Start Get Storage Keys ////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Key add to XML file
    static keyAddToXmFileName()
    {
        return 'add_to_xml_file_name_str';

    } // keyAddToXmFileName

    // Key reservation name
    static keyName()
    {
        return 'reservation_name_str';
        
    } // keyName

    // Key reservation email
    static keyEmail()
    {
        return 'reservation_email_str';
        
    } // keyEmail

    // Key reservation remark
    static keyRemark()
    {
        return 'reservation_remark_str';
        
    } // keyRemark

    // Key reservation event number
    static keyEventNumber()
    {
        return 'reservation_event_number_str';
        
    } // keyEventNumber

    ///////////////////////////////////////////////////////////////////////////
    /////// End Get Storage Keys //////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    /////// Start Get Undefined Value /////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Returns a string (flag) telling that the variable not yet was set
    static undefinedStringValue()
    {
        //QQQ return 'UndefinedStorageValue';

        return '';

    } // undefinedStringValue


    // Returns a integer string (flag) telling that the variable not yet was set
    static undefinedIntValue()
    {
        return '0';

    } // undefinedIntValue

    ///////////////////////////////////////////////////////////////////////////
    /////// End Get Undefined Value ///////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

} // ReservationStorage
