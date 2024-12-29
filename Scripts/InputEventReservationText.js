// File: InputEventReservation.js
// Date: 2024-12-29
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
        if ("german" == g_reservation_language)
        {
            return 'Reservation'; 
        }
        else if ("english" == g_reservation_language)
        {
            return 'Reservation';
        }
        else if ("swedish" == g_reservation_language)
        {
            return 'Reservation';
        }
        else
        {
            alert("InputEventReservationText.defaultHeaderText Not an implemented language '" + g_reservation_language + "'");
        }

    } // defaultHeaderText

    // Default label name for the input form
    defaultLabelName()
    {
        if ("german" == g_reservation_language)
        {
            return 'Vorname und Nachname: *';
        }
        else if ("english" == g_reservation_language)
        {
            return 'First name and family name: *';
        }
        else if ("swedish" == g_reservation_language)
        {
            return 'Förnamn och efternamn: *';
        }
        else
        {
            alert("InputEventReservationText.defaultLabelName Not an implemented language '" + g_reservation_language + "'");
        }

    } // defaultLabelName

    // Default label email for the input form
    defaultLabelEmail()
    {
        if ("german" == g_reservation_language)
        {
            return 'E-Mail-Adresse: *';
        }
        else if ("english" == g_reservation_language)
        {
            return 'Email address: *';
        }
        else if ("swedish" == g_reservation_language)
        {
            return 'Email adress: *';
        }
        else
        {
            alert("InputEventReservationText.defaultLabelEmail Not an implemented language '" + g_reservation_language + "'");
        }

    } // defaultLabelEmail

    // Default label remark for the input form
    defaultLabelRemark()
    {
        if ("german" == g_reservation_language)
        {
            return 'Bemerkung:';
        }
        else if ("english" == g_reservation_language)
        {
            return 'Remark:';
        }
        else if ("swedish" == g_reservation_language)
        {
            return 'Anmärkning:';
        }
        else
        {
            alert("InputEventReservationText.defaultLabelRemark Not an implemented language '" + g_reservation_language + "'");
        }

    } // defaultLabelRemark

    // Default caption for the button open reservation
    defaultCaptionButtonOpenReservation()
    {
        if ("german" == g_reservation_language)
        {
            return 'Plätze wählen';
        }
        else if ("english" == g_reservation_language)
        {
            return 'Select seats';
        }
        else if ("swedish" == g_reservation_language)
        {
            return 'Välj platser';
        }
        else
        {
            alert("InputEventReservationText.defaultCaptionButtonOpenReservation Not an implemented language '" + g_reservation_language + "'");
        }

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

