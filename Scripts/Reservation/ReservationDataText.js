// File: ReservationDataTextText.js
// Date: 2025-01-02
// Author: Gunnar Lidén

// Class holding texts for the class ReservationData

//
// TODO This class (file) shall be in project WwwReservation and not in WwwReservationLayout
class ReservationDataText
{
    ///////////////////////////////////////////////////////////////////////////
    /////// Start Error Messages //////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Name is missing
    static nameMissing()
    {
        if ("german" == g_reservation_language)
        {
            return "Vorname und Nachname fehlen";
        }
        else if ("english" == g_reservation_language)
        {
            return "First name and family name are missing";
        }
        else if ("swedish" == g_reservation_language)
        {
            return "Förnamn och efternamn fattas";            
        }
        else
        {
            alert("ReservationDataText.nameMissing Not an implemented language '" + g_reservation_language + "'");
        }

    } // nameMissing

    // First or family name is missing
    static firstOrFamilyNameMissing()
    {
        if ("german" == g_reservation_language)
        {
            return "Vorname oder Nachname fehlt";
        }
        else if ("english" == g_reservation_language)
        {
            return "First name or family name is missing";
        }
        else if ("swedish" == g_reservation_language)
        {
            return "Förnamn eller efternamn saknas";           
        }
        else
        {
            alert("ReservationDataText.firstOrFamilyNameMissing Not an implemented language '" + g_reservation_language + "'");
        }

    } // firstOrFamilyNameMissing

    // Email is missing
    static emailMissing()
    {
        if ("german" == g_reservation_language)
        {
            return "E-Mail Adresse fehlt";
        }
        else if ("english" == g_reservation_language)
        {
            return "Email address is missing";
        }
        else if ("swedish" == g_reservation_language)
        {
            return "Email adress fattas";
        }
        else
        {
            alert("ReservationDataText.emailMissing Not an implemented language '" + g_reservation_language + "'");
        }

    } // emailMissing

    // Name and email is missing
    static nameEmailMissing()
    {
        if ("german" == g_reservation_language)
        {
            return "Name und E-Mail Adresse fehlen";
        }
        else if ("english" == g_reservation_language)
        {
            return "Name and email address are missing";
        }
        else if ("swedish" == g_reservation_language)
        {
            return "Namn och email adress fattas";
        }
        else
        {
            alert("ReservationDataText.nameEmailMissing Not an implemented language '" + g_reservation_language + "'");
        }

    } // nameEmailMissing

    // Email is missing
    static emailMissing()
    {
        if ("german" == g_reservation_language)
        {
            return "E-Mail Adresse fehlt";
        }
        else if ("english" == g_reservation_language)
        {
            return "Email address is missing";
        }
        else if ("swedish" == g_reservation_language)
        {
            return "Email adress fattas";
        }
        else
        {
            alert("ReservationDataText.emailMissing Not an implemented language '" + g_reservation_language + "'");
        }

    } // emailMissing

     // Email address not valid
     static emailNotValid()
     {
        if ("german" == g_reservation_language)
        {
            return "E-Mail-Adresse ist ungültig";
        }
        else if ("english" == g_reservation_language)
        {
            return "Not a valid email address";
        }
        else if ("swedish" == g_reservation_language)
        {
            return "Email adressen är inte giltig";
        }
        else
        {
            alert("ReservationDataText.emailNotValid Not an implemented language '" + g_reservation_language + "'");
        }
    
     } // emailNotValid   

     // Event number is not valid
     static eventNumberNotValid()
     {
        if ("german" == g_reservation_language)
        {
            return "Anlass Nummer ist ungültig";
        }
        else if ("english" == g_reservation_language)
        {
            return "Event number is not valid";
        }
        else if ("swedish" == g_reservation_language)
        {
            return "Event mummer är ogiltigt";
        }
        else
        {
            alert("ReservationDataText.eventNumberNotValid Not an implemented language '" + g_reservation_language + "'");
        }

    } // emailNotValid   

     // Returns the string 'End of row'
     static rowEnd()
     {
        if ("german" == g_reservation_language)
        {
            return "Ende Zeile";
        }
        else if ("english" == g_reservation_language)
        {
            return "End of line";
        }
        else if ("swedish" == g_reservation_language)
        {
            return "Rad slut";
        }
        else
        {
            alert("ReservationDataText.rowEnd Not an implemented language '" + g_reservation_language + "'");
        }

     } // rowEnd

     // Returns the string ' is not allowed ';
     static isNotAllowed()
     {
        if ("german" == g_reservation_language)
        {
            return " ist nicht erlaubt ";
        }
        else if ("english" == g_reservation_language)
        {
            return " is not allowed ";
        }
        else if ("swedish" == g_reservation_language)
        {
            return " är inte tillåtet ";
        }
        else
        {
            alert("ReservationDataText.isNotAllowed Not an implemented language '" + g_reservation_language + "'");
        }

     } // isNotAllowed

     // Returns "description" of the variable name: 'in a name.'
     static nameDescription()
     {
        if ("german" == g_reservation_language)
        {
            return "in einem Name.";
        }
        else if ("english" == g_reservation_language)
        {
            return "in a name.";
        }
        else if ("swedish" == g_reservation_language)
        {
            return "i ett namn.";
        }
        else
        {
            alert("ReservationDataText.nameDescription Not an implemented language '" + g_reservation_language + "'");
        }

     } // nameDescription

     // Returns "description" of the variable email: 'in an email address.'
     static emailDescription()
     {
        if ("german" == g_reservation_language)
        {
            return "in einer E-Mail-Adresse.";
        }
        else if ("english" == g_reservation_language)
        {
            return "in an email address.";
        }
        else if ("swedish" == g_reservation_language)
        {
            return "i en email adress.";
        }
        else
        {
            alert("ReservationDataText.emailDescription Not an implemented language '" + g_reservation_language + "'");
        }

     } // emailDescription

     // Returns "description" of the variable remark: 'in a remark.'
     static remarkDescription()
     {
        if ("german" == g_reservation_language)
        {
            return "in einer Bemerkung.";
        }
        else if ("english" == g_reservation_language)
        {
            return "in a remark";
        }
        else if ("swedish" == g_reservation_language)
        {
            return "i en anmärkning.";
        }
        else
        {
            alert("ReservationDataText.remarkDescription Not an implemented language '" + g_reservation_language + "'");
        }

     } // remarkDescription

    ///////////////////////////////////////////////////////////////////////////
    /////// End Error Messages ////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

} // ReservationDataText
