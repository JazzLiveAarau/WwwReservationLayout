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
    
    ///////////////////////////////////////////////////////////////////////////
    /////// Start Get And Set Texts ///////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

} // InputEventReservationText

