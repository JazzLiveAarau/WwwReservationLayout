// File: InputEventReservation.js
// Date: 2025-01-02
// Author: Gunnar Lidén

// Class with strings for the application
class InputEventReservationText
{
    constructor()
    {
        // The header text for the input form
        this.m_header_text = '';

        // The label name for the input form
        this.m_label_name = '';

        // The label email for the input form
        this.m_label_email = '';
       
        // The label remark for the input form
       this.m_label_remark = '';

       // The caption for the button open reservation
       this.m_button_open_reservation_caption = '';

        // The info name for the input form
        this.m_info_name = '';

        // The info email for the input form
        this.m_info_email = '';

        // The info remark for the input form
        this.m_info_remark = '';

        // The info open reservation for the input form
        this.m_info_open_reservation = '';

        this.default();

    } // constructor

    ///////////////////////////////////////////////////////////////////////////
    /////// Start Default Texts ///////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Sets the default texts
    default()
    {
        this.m_header_text = this.defaultHeaderText();

        this.m_label_name = this.defaultLabelName();

        this.m_label_email = this.defaultLabelEmail();

        this.m_label_remark = this.defaultLabelRemark();

        this.m_button_open_reservation_caption = this.defaultCaptionButtonOpenReservation();

        this.m_info_name = this.defaultInfoName();

        this.m_info_email = this.defaultInfoEmail();

        this.m_info_remark = this.defaultInfoRemark();

        this.m_info_open_reservation = this.defaultInfoOpenReservation();

    } // default

    // Default header text for the input form
    defaultHeaderText()
    {
        var form_header = new DefaultText();

        form_header.setDescription("Default text for the header of the input form");

        form_header.setGerman("Reservation");

        form_header.setEnglish("Reservation");

        form_header.setSwedish("Reservation");

        return form_header.getText();

    } // defaultHeaderText

    // Default label name for the input form
    defaultLabelName()
    {
        var label_name = new DefaultText();

        label_name.setDescription("Default label for the name of the input form");

        label_name.setGerman("Vorname und Nachname: *");

        label_name.setEnglish("First name and family name: *");

        label_name.setSwedish("Förnamn och efternamn: *");

        return label_name.getText();

    } // defaultLabelName

    // Default label email for the input form
    defaultLabelEmail()
    {
        var label_email = new DefaultText();

        label_email.setDescription("Default label for the email of the input form");

        label_email.setGerman("E-Mail-Adresse: *");

        label_email.setEnglish("Email address: *");

        label_email.setSwedish("Email adress: *");

        return label_email.getText();

    } // defaultLabelEmail

    // Default label remark for the input form
    defaultLabelRemark()
    {
        var label_remark = new DefaultText();

        label_remark.setDescription("Default label for the email of the input form");

        label_remark.setGerman("Bemerkung:");

        label_remark.setEnglish("Remark:");

        label_remark.setSwedish("Anmärkning:");

        return label_remark.getText();

    } // defaultLabelRemark

    // Default caption for the button open reservation
    defaultCaptionButtonOpenReservation()
    {
        var open_reservation = new DefaultText();

        open_reservation.setDescription("Default label for the email of the input form");

        open_reservation.setGerman("Plätze wählen");

        open_reservation.setEnglish("Select seats");

        open_reservation.setSwedish("Välj platser");

        return open_reservation.getText();

    } // defaultCaptionButtonOpenReservation

    // Default info name for the input form
    defaultInfoName()
    {
        var info_name = new DefaultText();

        info_name.setDescription("Text that will be printed on the reservation cards");

        info_name.setGerman("Vorname und Nachname bitte eingeben. \nGedruckte Karten mit diesen Namen werden ihre reservierte Plätze markieren.");

        info_name.setEnglish("Please enter your first name and your family name. \nPrinted cards with these names will mark your reserved seats.");

        info_name.setSwedish("Var vänlig ange ditt förnamn och ditt efternamn. \nTryckta kort med ditt namn visar var du/ni ska sitta.");

        return info_name.getText();

    } // defaultInfoName
    
    // Default info email for the input form
    defaultInfoEmail()
    {
        var info_email = new DefaultText();

        info_email.setDescription("Email address for the email confirmation of the reservation");

        info_email.setGerman("Bitte Ihre E-Mail-Adresse eingeben. \nEine Bestätigungs-E-Mail wird an diese Adresse gesendet.");

        info_email.setEnglish("Please enter your email address. \nA confirmation email will be sent to this address.");

        info_email.setSwedish("Var vänlig ange din email adress. \nEfter att du reserverat skickas en bekräftelse till denna adress.");

        return info_email.getText();

    } // defaultInfoEmail

    // Default info remark for the input form
    defaultInfoRemark()
    {
        var info_remark = new DefaultText();

        info_remark.setDescription("Remark for the reservation");

        info_remark.setGerman("Eine Bemerkung für die Reservation kann eingegeben werden");

        info_remark.setEnglish("There is an option to give a remark to the reservation");

        info_remark.setSwedish("Det finns möjlighet att ge ytterligare information om reservationen");

        return info_remark.getText();

    } // defaultInfoRemark
	   
    // Default info remark for the input form
    defaultInfoOpenReservation()
    {
        var info_open_reservation = new DefaultText();

        info_open_reservation.setDescription("Information: Click button 'Open table plan and select your seats'");

        info_open_reservation.setGerman("Ein Tischplan wird gezeigt wo man Plätze wählen kann.");

        info_open_reservation.setEnglish("A seating plan will be displayed where seats can be selected");

        info_open_reservation.setSwedish("En bordsplan visas och platser kan väljas");

        return info_open_reservation.getText();

    } // defaultInfoOpenReservation

    ///////////////////////////////////////////////////////////////////////////
    /////// End Default Texts /////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    /////// Start Get And Set Texts ///////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Get header text for input form
    getHeaderText()
    {
        return this.m_header_text;

    } // defaultHeaderText

    // Set header text for input form
    setHeaderText(i_header_text)
    {
        this.m_header_text = i_header_text;

    } // defaultHeaderText

    // Returns the label name for the input form
    getLabelName()
    {
        return this.m_label_name;

    } // getLabelName

    // Sets the label name for the input form
    setLabelName(i_label_name)
    {
        this.m_label_name = i_label_name;

    } // setLabelName

    // Returns the label email for the input form
    getLabelEmail()
    {
        return this.m_label_email;

    } // getLabelEmail

    // Sets the label email for the input form
    setLabelEmail(i_label_name)
    {
        this.m_label_email = i_label_name;

    } // setLabelEmail

    // Returns the label remark for the input form
    getLabelRemark()
    {
        return this.m_label_remark;

    } // getLabelRemark

    // Sets the label remark for the input form
    setLabelRemark(i_label_name)
    {
        this.m_label_remark = i_label_name;

    } // setLabelRemark

    // Returns the button caption open reservation
    getCaptionButtonOpenReservation()
    {
        return this.m_button_open_reservation_caption;

    } // getCaptionButtonOpenReservation

    // Sets the button caption open reservation
    setCaptionButtonOpenReservation(i_button_open_reservation_caption)
    {
        return this.m_button_open_reservation_caption = i_button_open_reservation_caption;
        
    } // setCaptionButtonOpenReservation

    // Returns the info name text for the input form
    getInfoName()
    {
        return this.m_info_name;

    } // getInfoName

    // Sets the info name text for the input form
    setInfoName(i_info_name)
    {
        this.m_info_name = i_info_name;

    } // setInfoName

    // Returns the info email text for the input form
    getInfoEmail()
    {
        return this.m_info_email;

    } // getInfoEmail

    // Sets the info email text for the input form
    setInfoEmail(i_info_email)
    {
        this.m_info_email = i_info_email;

    } // setInfoEmail

    // Returns the info remark text for the input form
    getInfoRemark()
    {
        return this.m_info_remark;

    } // getInfoRemark

    // Sets the info remark text for the input form
    setInfoRemark(i_info_remark)
    {
        this.m_info_remark = i_info_remark;

    } // setInfoRemark

    // Returns the info open reservation text for the input form
    getInfoOpenReservation()
    {
        return this.m_info_open_reservation;

    } // getInfoOpenReservation

    // Sets the info open reservation text for the input form
    setInfoOpenReservation(i_info_open_reservation)
    {
        this.m_info_open_reservation = i_info_open_reservation;

    } // setInfoOpenReservation
    
    ///////////////////////////////////////////////////////////////////////////
    /////// Start Get And Set Texts ///////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

} // InputEventReservationText

