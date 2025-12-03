// DO NOT MAKE ANY CHANGES IN THIS FILE. THE FILED WAS MOVED (COPIED) TO 
// PROJECT ReservationSystem WHERE THE DEVELOPMENT WILL CONTINUE  


// File: DefaultText.js
// Date: 2025-01-02
// Author: Gunnar Lidén

// Class handling a default text in different languages for GUI and messages
//
// TODO This class (file) shall be in project WwwReservation and not in WwwReservationLayout
class DefaultText
{
    constructor()
    {
        // Description of the text
        this.m_description = 'DefaultText Undefined description';

        // Text in german
        this.m_german = 'DefaultText Undefined german text';

        // Text in english
        this.m_english = 'DefaultText Undefined english text';

        // Text in swedish
        this.m_swedish = 'DefaultText Undefined swedish text';


    } // constructor

    ///////////////////////////////////////////////////////////////////////////
    /////// Start Set Functions ///////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Set the description
    setDescription(i_description)
    {
        this.m_description = i_description;

    } // setDescription

    // Set the german text
    setGerman(i_german)
    {
        this.m_german = i_german;

    } // setGerman

    // Set the english text
    setEnglish(i_english)
    {
        this.m_english = i_english;

    } // setEnglish

    // Set the swedish text
    setSwedish(i_swedish)
    {
        this.m_swedish = i_swedish;

    } // setSwedish

    ///////////////////////////////////////////////////////////////////////////
    /////// End Set Functions /////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    /////// Start Get Functions ///////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Returns the text
    getText()
    {
        if (g_reservation_language == 'german')
        {
            return this.m_german;
        }
        else if (g_reservation_language == 'english')
        {
            return this.m_english;
        }
        else if (g_reservation_language == 'swedish')
        {
            return this.m_swedish;
        }
        else
        {
            alert("DefaultText.getText Not an implemented language= " + i_language + 
                            ' Variable description: ' + this.getDescription());

            return '';
        }

    } // getText

    // Returns the description (for debug)
    getDescription()
    {
        this.m_description

    } // getDescription

    ///////////////////////////////////////////////////////////////////////////
    /////// End Get Functions /////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    /////// Start Is Implemented //////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Reurns true if the language is implemented
    static isImplemented(i_language)
    {
        if (i_language == 'german' || i_language == 'english' || i_language == 'swedish')
        {
            return true;
        }
        else
        {
            alert("DefaultText.isImplemented Not an implemented language= " + i_language);

            return false;
        }

    } // isImplemented

    ///////////////////////////////////////////////////////////////////////////
    /////// End Is Implemented ///////////////((///////////////////////////////
    ///////////////////////////////////////////////////////////////////////////


} // DefaultText
