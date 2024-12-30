// File: UtilUrl.js
// Date: 2024-12-30
// Author: Gunnar Lidén

// Class with utility functions for paths
//
// TODO This class (file) shall be in project WwwReservation and not in WwwReservationLayout
class UtilUrl
{
    ///////////////////////////////////////////////////////////////////////////
    /////// Start Running On Server ///////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Returns true if the application is running on the server
    // Returns false if it is running on the Visual Studio Code Live Server
    // Please note that window.location.href can return
    // https://jazzliveaarau.ch or
    // https://www.jazzliveaarau.ch
    static execApplicationOnServer()
    {
        var current_base = window.location.href;

        console.log(" UtilUrl.execApplicationOnServer current_base= " + current_base);
    
        /*
        var server_url = 'jazzliveaarau.ch';
    
        var index_url = current_base.indexOf(server_url);
    
        if (index_url >= 0) 
        {
            return true;
        }
        else
        {
            return false;
        }
        */
    
    } // execApplicationOnServer

    ///////////////////////////////////////////////////////////////////////////
    /////// End Running On Server /////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

} // UtilUrl
