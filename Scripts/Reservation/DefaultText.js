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




    ///////////////////////////////////////////////////////////////////////////
    /////// End Set Functions /////////////////////////////////////////////////
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
