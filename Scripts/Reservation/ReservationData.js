// File: ReservationData.js
// Date: 2024-12-29
// Author: Gunnar Lidén

// Class holding the data for a reservation, that is the data that shall be passed
// from an object of the class InputEventReservation to a reservation web page 
// defined by MakeReservation.htm, AddReservation.htm or SearchReservation.htm.
// (The web page ShowLayout.htm does not use do not use this data)
//
// The class has function to check the data and als the error messages for 
// unvalid input data is defined in this class

//
// TODO This class (file) shall be in project WwwReservation and not in WwwReservationLayout
class ReservationData
{
    constructor()
    {
        // String to add for the reservation XML files
        // Obsolete. Only used for the existing reservation files
        this.m_add_to_xml_file_name = 'Salmen';

        // The name of the person that makes the reservation
        this.m_reservation_name = '';

        // The email address to the person that makes the reservation
        this.m_reservation_email = '';

        // Remark from the person that makes the reservation
        this.m_reservation_remark = '';

        // The event (for instance concerer) number for the reservation
        // Number zero (0) is also allowed meaning ... TODO
        this.m_event_number = -12345;

        // Language for default texts
        this.m_language = 'german';

        // Instance of the class ReservationDataText holding texts for this class
        this.m_text = new ReservationDataText(this.m_language);

    } // constructor

    ///////////////////////////////////////////////////////////////////////////
    /////// Start Set Functions ///////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Set add to XML file name
    // Obsolete. Only used for the old reservation application
    // i_add_to_xml_file_name is not used
    setAddToXmFileName(i_add_to_xml_file_name)
    {
        this.m_add_to_xml_file_name ='Salmen';

    } // setAddToXmFileName

    // Sets the name m_reservation_name
    setName(i_name)
    {
        var b_alert = true;

        if (!ReservationData.checkName(i_name, b_alert))
        {
            return;
        }

        this.m_reservation_name = i_name.trim();

    } // setName

    // Sets the email m_reservation_email
    setEmail(i_email)
    {
        var b_alert = true;

        if (!ReservationData.checkEmail(i_email, b_alert))
        {
            return;
        }

        this.m_reservation_email = i_email.trim();

    } // setEmail

    // Sets the remark m_reservation_remark
    setRemark(i_remark)
    {
        var b_alert = true;

        if (!ReservationData.checkRemark(i_remark, b_alert))
        {
            return;
        }

        this.m_reservation_remark = i_remark.trim();

    } // setRemark

    setEventNumber(i_event_number)
    {
        var b_alert = true;

        if (!ReservationData.checkEventNumber(i_event_number, b_alert))
        {
            return;
        }    

        this.m_event_number = i_event_number;

    } // setEventNumber

    
    ///////////////////////////////////////////////////////////////////////////
    /////// End Set Functions /////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    /////// Start Get Functions ///////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Get add to XML file name
    // Obsolete. Only used for the old reservation application
    getAddToXmFileName()
    {
        return this.m_add_to_xml_file_name;

    } // getAddToXmFileName

    // Returns the name m_reservation_name
    getName()
    {
        return this.m_reservation_name;

    } // getName

    // Returns the email m_reservation_email
    getEmail()
    {
        return this.m_reservation_email;

    } // getEmail

    // Returns the remark m_reservation_remark
    getRemark()
    {
        return this.m_reservation_remark;

    } // getRemark

    // Returns the event number m_event_number as integer
    getEventNumber()
    {
        return this.m_event_number;

    } // getEventNumber

    // Returns the event number m_event_number as string
    getEventNumberString()
    {
        return this.m_event_number.toString();

    } // getEventNumberString

    ///////////////////////////////////////////////////////////////////////////
    /////// End Get Functions /////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    /////// Start Check Data //////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Returns false if the resernation name is unvalid. 
    // i_name: Name corresponding to m_reservation_name
    // i_b_alert: Window alert with error message will be opened for true
    static checkName(i_name, i_b_alert)
    {
        var b_name = true;

        var name_trim = i_name.trim();

        if (name_trim.length == 0)
        {
            return b_name;
        }

        var illegal_msg = ReservationData.stringContainsIllegalCharacter(name_trim, ReservationDataText.nameDescription());

        if (illegal_msg.length > 0)
        {
            b_name = false;

            if (i_b_alert)
            {
                alert(illegal_msg);
            }
        }

        if (!ReservationData.twoOrMoreWordsInString(name_trim))
        {
            b_name = false;

            if (i_b_alert)
            {
                alert(ReservationDataText.firstOrFamilyNameMissing());
            }
        }

        return b_name;

    } // checkName

    // Returns true if there are two or more words in the input string
    static twoOrMoreWordsInString(i_string) 
    {
        var ret_bool_two = false;
        
        var string_trimmed = i_string.trim();
        
        var index_space =  string_trimmed.indexOf(" ");
        
        if (string_trimmed.length <= 2)
        {
            ret_bool_two = false;
        }
        else if (index_space < 0)
        {
            ret_bool_two = false;
        }	
        else
        {
            ret_bool_two = true;
        }
    
        return ret_bool_two;
      
    } // twoOrMoreWordsInString

    // Returns false if the reservation email is unvalid
    // i_mail: Email corresponding to m_reservation_email
    // i_b_alert: Window alert with error message will be opened for true
    static checkEmail(i_mail, i_b_alert)
    {
        var b_email = true;

        var email_trim = i_mail.trim();

        if (email_trim.length == 0)
        {
            return b_email;
        }

        var illegal_msg = ReservationData.stringContainsIllegalCharacter(email_trim, ReservationDataText.emailDescription());

        if (illegal_msg.length > 0)
        {
            b_email = false;

            if (i_b_alert)
            {
                alert(illegal_msg);
            }
        }

        if (!ReservationData.validEmailRegex(email_trim))
        {
            b_email = false;

            if (i_b_alert)
            {
                alert(ReservationDataText.emailNotValid());
            }            
        }

        return b_email;

    } // checkEmail

    // Returns true if the regex check of the input email address is OK
    // https://www.geeksforgeeks.org/javascript-program-to-validate-an-email-address/
    static validEmailRegex(i_email) 
    {
        const patt = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        return patt.test(i_email);

    } // validEmailRegex

    // Returns true if name and email are empty strings
    static nameAndEmailAreEmpty(i_name, i_email, i_b_alert)
    {
        var name_trim = i_name.trim();

        var email_trim = i_email.trim();

        if (name_trim.length == 0 && email_trim.length == 0)
        {
            if (i_b_alert)
            {
                alert(ReservationDataText.nameEmailMissing());
            }

            return true;
        }
        else
        {
            return false;
        }

    } // nameAndEmailAreEmpty

    // Returns true if name and email are empty strings
    static nameIsEmpty(i_name, i_b_alert)
    {
        var name_trim = i_name.trim();

        if (name_trim.length == 0)
        {
            if (i_b_alert)
            {
                alert(ReservationDataText.nameMissing());
            }

            return true;
        }
        else
        {
            return false;
        }

    } // nameIsEmpty

    // Returns true if email is an empty string
    static emailIsEmpty(i_email, i_b_alert)
    {
        var email_trim = i_email.trim();

        if (email_trim.length == 0)
        {
            if (i_b_alert)
            {
                alert(ReservationDataText.emailMissing());
            }

            return true;
        }
        else
        {
            return false;
        }

    } // emailIsEmpty

    // Returns true if the remark string is OK
    // i_remark: Remark corresponding to m_reservation_remark
    // i_b_alert: Window alert with error message will be opened for true
    static checkRemark(i_remark, i_b_alert)
    {
        var remark_trim = i_remark.trim();

        if (remark_trim.length == 0)
        {
            return true;
        }

        var illegal_msg = ReservationData.stringContainsIllegalCharacter(remark_trim, ReservationDataText.remarkDescription());

        if (illegal_msg.length > 0)
        {
            if (i_b_alert)
            {
                alert(illegal_msg);
            }

            return false;
        }

        return true;

    } // checkRemark

    // Returns error message if input strings contains illegal characters
    static stringContainsIllegalCharacter(i_string, i_string_beschreibung)
    {
        var ret_error_msg = '';
        
        var illegal_chars = [];
        illegal_chars[0] = '&';
        illegal_chars[1] = '<';
        illegal_chars[2] = '>';
        illegal_chars[3] = '\n';
        
        for (var index_illegal=0; index_illegal<illegal_chars.length; index_illegal++)
        {
            var current_illegal_char = illegal_chars[index_illegal];
            
            var index_pos_illegal = i_string.indexOf(current_illegal_char);
            if (index_pos_illegal >= 0)
            {
                if (current_illegal_char == '\n')
                {
                    current_illegal_char = ReservationDataText.rowEnd();
                }

                ret_error_msg = current_illegal_char + ReservationDataText.isNotAllowed() + i_string_beschreibung;

                break;
            }
            
        }
        
        return ret_error_msg;
        
    } // stringContainsIllegalCharacter
    
    // Checks the event number
    // i_event_number: Event number. An integer greater or equal to zero
    // i_b_alert: Window alert with error message will be opened for true
    // https://www.w3schools.com/jsref/jsref_sign.asp
    static checkEventNumber(i_event_number, i_b_alert)
    {
        var sign_int = Math.sign(i_event_number);

        if (sign_int == 1 || sign_int == 0)
        {
            return true;
        }
        else
        {
            if (i_b_alert)
            {
                alert(ReservationDataText.eventNumberNotValid());
            }
            return false;
        }

    } // checkEventNumber

    ///////////////////////////////////////////////////////////////////////////
    /////// End Check Data ////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

} // ReservationData
