// DO NOT MAKE ANY CHANGES IN THIS FILE. THE FILED WAS MOVED (COPIED) TO 
// PROJECT ReservationSystem WHERE THE DEVELOPMENT WILL CONTINUE  

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
        var name_missing = new DefaultText();

        name_missing.setDescription("Error name is missing");

        name_missing.setGerman("Vorname und Nachname fehlen");

        name_missing.setEnglish("First name and family name are missing");

        name_missing.setSwedish("Förnamn och efternamn fattas");

        return name_missing.getText();

    } // nameMissing

    // First or family name is missing
    static firstOrFamilyNameMissing()
    {
        var one_name_missing = new DefaultText();

        one_name_missing.setDescription("Error one name is missing");

        one_name_missing.setGerman("Vorname oder Nachname fehlen");

        one_name_missing.setEnglish("First name or family name are missing");

        one_name_missing.setSwedish("Förnamn eller efternamn fattas");

        return one_name_missing.getText();

    } // firstOrFamilyNameMissing

    // Email is missing
    static emailMissing()
    {
        var email_missing = new DefaultText();

        email_missing.setDescription("Error email is missing");

        email_missing.setGerman("E-Mail Adresse fehlt");

        email_missing.setEnglish("Email address is missing");

        email_missing.setSwedish("Email adress saknas");

        return email_missing.getText();

    } // emailMissing

    // Name and email is missing
    static nameEmailMissing()
    {
        var email_name_missing = new DefaultText();

        email_name_missing.setDescription("Error name amd email are missing");

        email_name_missing.setGerman("Name und E-Mail Adresse fehlen");

        email_name_missing.setEnglish("Name and email address are missing");

        email_name_missing.setSwedish("Namn och email adress saknas");

        return email_name_missing.getText();

    } // nameEmailMissing

     // Email address not valid
     static emailNotValid()
     {
        var email_not_valid = new DefaultText();

        email_not_valid.setDescription("Error email address is not valid");

        email_not_valid.setGerman("E-Mail-Adresse ist ungültig");

        email_not_valid.setEnglish("Not a valid email address");

        email_not_valid.setSwedish("Email adressen är inte giltig");

        return email_not_valid.getText();
    
     } // emailNotValid   

     // Event number is not valid
     static eventNumberNotValid()
     {
        var number_not_valid = new DefaultText();

        number_not_valid.setDescription("Error event number is not valid");

        number_not_valid.setGerman("Anlass Nummer ist ungültig");

        number_not_valid.setEnglish("Event number is not valid");

        number_not_valid.setSwedish("Event mummer är ogiltigt");

        return number_not_valid.getText();

    } // emailNotValid   

     // Returns the string 'End of row'
     static rowEnd()
     {
        var row_end = new DefaultText();

        row_end.setDescription("String end of a row");

        row_end.setGerman("Ende Zeile");

        row_end.setEnglish("End of line");

        row_end.setSwedish("Rad slut");

        return row_end.getText();

     } // rowEnd

     // Returns the string ' is not allowed ';
     static isNotAllowed()
     {
        var not_allowed = new DefaultText();

        not_allowed.setDescription("String not allowed");

        not_allowed.setGerman(" ist nicht erlaubt ");

        not_allowed.setEnglish(" is not allowed ");

        not_allowed.setSwedish(" är inte tillåtet ");

        return not_allowed.getText();

     } // isNotAllowed

     // Returns "description" of the variable name: 'in a name.'
     static nameDescription()
     {
        var name_descr = new DefaultText();

        name_descr.setDescription("String name description");

        name_descr.setGerman("in einem Name.");

        name_descr.setEnglish("in a name.");

        name_descr.setSwedish("i ett namn.");

        return name_descr.getText();

     } // nameDescription

     // Returns "description" of the variable email: 'in an email address.'
     static emailDescription()
     {
        var email_descr = new DefaultText();

        email_descr.setDescription("String email description");

        email_descr.setGerman("in einem  E-Mail-Adresse.");

        email_descr.setEnglish("in an email address.");

        email_descr.setSwedish("i en email adress.");

        return email_descr.getText();

     } // emailDescription

     // Returns "description" of the variable remark: 'in a remark.'
     static remarkDescription()
     {
        var remark_descr = new DefaultText();
        
        remark_descr.setDescription("String remark description");

        remark_descr.setGerman("in einer Bemerkung.");

        remark_descr.setEnglish("in a remark.");

        remark_descr.setSwedish("i en anmärkning.");

        return remark_descr.getText();

     } // remarkDescription

    ///////////////////////////////////////////////////////////////////////////
    /////// End Error Messages ////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

} // ReservationDataText
