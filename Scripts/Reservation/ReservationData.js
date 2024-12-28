// File: ReservationData.js
// Date: 2024-12-28
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

    } // constructor

    ///////////////////////////////////////////////////////////////////////////
    /////// Start Set Functions ///////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

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
            b_name = false;

            if (i_b_alert)
            {
                alert(ReservationData.nameMissing());
            }

            return b_name;
        }

        var illegal_msg = ReservationData.stringContainsIllegalCharacter(name_trim, ReservationData.nameDescription());

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
                alert(ReservationData.firstOrFamilyNameMissing());
            }
        }

        return b_name;

    } // checkName

    // Returns true if there are two or more words in the input string
    static twoOrMoreWordsInString(i_string) 
    {
        var ret_bool_two = false;
        
        var string_trimmed = i_string.trim();
        
        index_space =  string_trimmed.indexOf(" ");
        
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
            b_email = false;

            if (i_b_alert)
            {
                alert(ReservationData.emailMissing());
            }

            return b_email;
        }

        var illegal_msg = ReservationData.stringContainsIllegalCharacter(email_trim, ReservationData.emailDescription());

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
                alert(ReservationData.emailNotValid());
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
    isNameAndEmailEmpty(i_name, i_email, i_b_alert)
    {
        var name_trim = i_name.trim();

        var email_trim = i_email.trim();

        if (name_trim.length == 0 && email_trim.length == 0)
        {
            if (i_b_alert)
            {
                alert(ReservationData.nameEmailMissing());
            }

            return true;
        }
        else
        {
            return false;
        }

    } // isNameAndEmailEmpty

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

        var illegal_msg = ReservationData.stringContainsIllegalCharacter(remark_trim, ReservationData.remarkDescription());

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
                    current_illegal_char = ReservationData.rowEnd();
                }

                ret_error_msg = current_illegal_char + ReservationData.isNotAllowed() + i_string_beschreibung;

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
                alert(ReservationData.eventNumberNotValid());
            }
            return false;
        }

    } // checkEventNumber

    ///////////////////////////////////////////////////////////////////////////
    /////// End Check Data ////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    /////// Start Error Messages //////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Name is missing
    static nameMissing()
    {
        return "Vorname und Nachname fehlen";

    } // nameMissing

    // First or family name is missing
    static firstOrFamilyNameMissing()
    {
        return "Vorname oder Nachname fehlt";

    } // firstOrFamilyNameMissing

    // Email is missing
    static emailMissing()
    {
        return "E-Mail Adresse fehlt";

    } // emailMissing

    // Name and email is missing
    static nameEmailMissing()
    {
        return "Name und E-Mail Adresse fehlen";

    } // nameEmailMissing

     // Email address not valid
     static emailNotValid()
     {
         return "E-Mail-Adresse ist ungültig";
 
     } // emailNotValid   

     // Event number is not valid
     static eventNumberNotValid()
     {
        return "Event Nummer ist ungültig";

    } // emailNotValid   

     // Returns the string 'End of row'
     static rowEnd()
     {
        return "Ende Zeile";

     } // rowEnd

     // Returns the string ' is not allowed ';
     static isNotAllowed()
     {
        return " ist nicht erlaubt ";

     } // isNotAllowed

     // Returns "description" of the variable name: 'in a name.'
     static nameDescription()
     {
        return "in einem Name.";

     } // nameDescription

     // Returns "description" of the variable email: 'in an email address.'
     static emailDescription()
     {
        return "in einer E-Mail-Adresse.";

     } // emailDescription

     // Returns "description" of the variable remark: 'in a remark.'
     static remarkDescription()
     {
        return "in einer Bemerkung.";

     } // remarkDescription

    ///////////////////////////////////////////////////////////////////////////
    /////// End Error Messages ////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

} // ReservationData
