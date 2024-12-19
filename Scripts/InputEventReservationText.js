// File: InputEventReservation.js
// Date: 2024-12-19
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

    } // default

    // Default header text for the input form
    defaultHeaderText()
    {
        return 'Reservation';

    } // defaultHeaderText

    // Default label name for the input form
    defaultLabelName()
    {
        return 'Vorname und Nachname: *';

    } // defaultLabelName

    // Default label email for the input form
    defaultLabelEmail()
    {
        return 'E-Mail: *';

    } // defaultLabelEmail

    // Default label remark for the input form
    defaultLabelRemark()
    {
        return 'Bemerkung:';

    } // defaultLabelRemark

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
    
    ///////////////////////////////////////////////////////////////////////////
    /////// Start Get And Set Texts ///////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

} // InputEventReservationText

