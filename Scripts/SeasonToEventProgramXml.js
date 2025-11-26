// File: SeasonToEventProgramXml.js
// Date: 2025-11-26
// Author: Gunnar Lidén

// Inhalt
// =============
//
// Class creating an EventProgramXml XML file from a season XML file

class SeasonToEventProgramXml
{
    // Initialization
    // 1. Check that object ReservationNewSeasonData is defined (g_new_season_files_data)
    // 2. Create the season XML object. 
    //    Call of SeasonToEventProgramXml.seasonXmlObject
    static start()
    {
        if (g_new_season_files_data == null)
        {
            alert("SeasonToEventProgramXml.start Execution data object g_new_season_files_data is null");

            return;
        }

        SeasonToEventProgramXml.seasonXmlObject();

    } // start

    // Creates a season XML object
    static seasonXmlObject()
    {
        g_new_season_files_data.m_season_xml = null;

        var callback_function = SeasonToEventProgramXml.createEventXmlStartFile;

        var n_level_xml = 2;

        var start_year = g_new_season_files_data.m_season_start_year;

        g_new_season_files_data.m_season_xml = new SeasonXml(callback_function, n_level_xml, start_year);

    } // seasonXmlObject

    // Create start XML file with only the base tags
    // Call of UtilServer.saveDirFile
    static createEventXmlStartFile()
    {
        var path_file_name = g_new_season_files_data.m_abs_event_program_url;

        var content_string = '<EventProgram></EventProgram>';

        var callback_fctn = SeasonToEventProgramXml.eventObjectXml;

        UtilServer.saveDirFile(path_file_name, content_string, callback_fctn);

    } // createEventXmlStartFile

    // Creates the event XML object
    static eventObjectXml()
    {
        g_new_season_files_data.m_event_xml = null;

        var rel_subdir_xml = g_new_season_files_data.m_rel_event_program_dir_url;
    
        var event_program_file_name = g_new_season_files_data.m_xml_filename;

        var callback_fctn = SeasonToEventProgramXml.fromSeasonToEvent;
    
        g_new_season_files_data.m_event_xml = new EventProgramXml(rel_subdir_xml, event_program_file_name, callback_fctn);

    } // eventObjectXml

    // Append event XML records with data from season XML records
    // 1. Loop all season concerts
    // 1.1 Set local variables for each concert record
    //     Calls of SeaonXml functions getYear, getDay, getPlace, ....
    // 1.2 Append program event record. Call of ReservationEventXml.appendEventNode
    // 1.3 Set even record values
    //     Calls of ReservationEventXml functions setXear, setDay, setPlace, ....
    // 2. Call function SeasonToEventProgramXml.modifyEventStrings
    static fromSeasonToEvent()
    {
        var n_concerts = g_new_season_files_data.m_season_xml.getNumberOfConcerts();

        for (var concert_number = 1; concert_number <= n_concerts; concert_number++)
        {
            var concert_year = g_new_season_files_data.m_season_xml.getYear(concert_number);

            var concert_month = g_new_season_files_data.m_season_xml.getMonth(concert_number);

            var concert_day= g_new_season_files_data.m_season_xml.getDay(concert_number);

            var concert_start_hour = g_new_season_files_data.m_season_xml.getStartHour(concert_number);

            var concert_start_minute = g_new_season_files_data.m_season_xml.getStartMinute(concert_number);

            var concert_end_hour = g_new_season_files_data.m_season_xml.getEndHour(concert_number);

            var concert_end_minute = g_new_season_files_data.m_season_xml.getEndMinute(concert_number);

            var concert_place = g_new_season_files_data.m_season_xml.getPlace(concert_number);

            var concert_cancelled = g_new_season_files_data.m_season_xml.getCancelled(concert_number);

            var concert_name = g_new_season_files_data.m_season_xml.getBandName(concert_number);

            var concert_text = g_new_season_files_data.m_season_xml.getShortText(concert_number);

            g_new_season_files_data.m_event_xml.appendEventNode();

            var n_events = g_new_season_files_data.m_event_xml.getNumberOfEvents();

            g_new_season_files_data.m_event_xml.setYear(n_events, concert_year);

            g_new_season_files_data.m_event_xml.setMonth(n_events, concert_month);

            g_new_season_files_data.m_event_xml.setDay(n_events, concert_day);

            g_new_season_files_data.m_event_xml.setStartHour(n_events, concert_start_hour);

            g_new_season_files_data.m_event_xml.setStartMinute(n_events, concert_start_minute);

            g_new_season_files_data.m_event_xml.setEndHour(n_events, concert_end_hour);

            g_new_season_files_data.m_event_xml.setEndMinute(n_events, concert_end_minute);

            g_new_season_files_data.m_event_xml.setPlace(n_events, concert_place);

            g_new_season_files_data.m_event_xml.setCancelled(n_events, concert_cancelled);

            g_new_season_files_data.m_event_xml.setEventName(n_events, concert_name);

            g_new_season_files_data.m_event_xml.setShortText(n_events, concert_text);

            g_new_season_files_data.m_event_xml.setUrlReservationDir(n_events, g_new_season_files_data.m_abs_result_dir_url);

            g_new_season_files_data.m_event_xml.setPrices(n_events, SeasonToEventProgramXml.prices());

            g_new_season_files_data.m_event_xml.setInstructions(n_events, SeasonToEventProgramXml.instructions());

            g_new_season_files_data.m_event_xml.setMaxReservations(n_events, "100");

             g_new_season_files_data.m_event_xml.setEmailSubject(n_events, SeasonToEventProgramXml.emailSubject());

             g_new_season_files_data.m_event_xml.setEmailHeader(n_events, SeasonToEventProgramXml.emailHeader());

             var index_jam = concert_name.indexOf("Jam Session");

             if (index_jam >= 0)
             {
                g_new_season_files_data.m_event_xml.setEmailContent(n_events, SeasonToEventProgramXml.emailJamSessionContent());

                g_new_season_files_data.m_event_xml.setEmailSeatsToFalse(n_events);
             }
             else
             {
                g_new_season_files_data.m_event_xml.setEmailContent(n_events, SeasonToEventProgramXml.emailContent());

                g_new_season_files_data.m_event_xml.setEmailSeatsToTrue(n_events);
             }

             g_new_season_files_data.m_event_xml.setPayMethod(n_events, SeasonToEventProgramXml.payMethod());

        } // concert_number

        SeasonToEventProgramXml.modifyEventStrings();
       
    } // fromSeasonToEvent

    // Event names are shortened and also texts (since they not yet are used)
    static modifyEventStrings()
    {

        var n_events = g_new_season_files_data.m_event_xml.getNumberOfEvents();

        for (var event_number = 1; event_number <= n_events; event_number++)
        {
            var event_name = g_new_season_files_data.m_event_xml.getEventName(event_number);

            var event_text = g_new_season_files_data.m_event_xml.getShortText(event_number);

            event_name = SeasonToEventProgramXml.modifyEventName(event_name);

            event_text = SeasonToEventProgramXml.modifyEventText(event_text);

            g_new_season_files_data.m_event_xml.setEventName(event_number, event_name);

            g_new_season_files_data.m_event_xml.setShortText(event_number, event_text);
        }

        SeasonToEventProgramXml.saveEventXml();

    } // modifyEventStrings

    // Interact with the user
    static interactEventName(i_event_name, i_max_event_name_length)
    {
        var ret_name = '';

        var prompt_instruction = 'Name ist zu lang. Bitte Text korrigieren';

        var input_text = UtilXml.unescapeString(i_event_name);

        input_text = input_text.substring(0, i_max_event_name_length);

        var modified_text = prompt(prompt_instruction, input_text);

        if (modified_text == null || modified_text.trim() == '')
        {
            ret_name = input_text;
        }
        else
        {
            ret_name = modified_text.trim().substring(0, i_max_event_name_length);
        }

        return ret_name;

    } // interactEventName

    // Shorten the event name if necessary
    static modifyEventName(i_event_name)
    {
        var ret_event_name = i_event_name;

        var max_event_name_length = 30;

        if (ret_event_name.length > max_event_name_length)
        {
            ret_event_name = SeasonToEventProgramXml.interactEventName(ret_event_name, max_event_name_length);
        }

        return ret_event_name;

    } // modifyEventName

    // Shorten the event name if necessary
    static modifyEventText(i_event_name)
    {
        var ret_event_text = i_event_name;

        var max_event_text_length = 60;

        if (ret_event_text.length > max_event_text_length)
        {
            ret_event_text = ret_event_text.substring(0, max_event_text_length) + '...';
        }

        return ret_event_text;

    } // modifyEventText

    // Save the event XML file
    static saveEventXml()
    {
        var file_name_full_path = g_new_season_files_data.m_abs_event_program_url;

        var pretty_print = new PrettyPrintXml(g_new_season_files_data.m_event_xml.getXmlObject());

        var xml_content_str = pretty_print.xmlToWinFormattedString();

        var callback_fctn = g_new_season_files_data.m_event_program_callback_fctn;

        UtilServer.saveCallback(file_name_full_path, xml_content_str, callback_fctn);

    } // saveEventXml

    // Returns reservation instructions
    // (extracted from Application.xml for the reervation confirmation email)
    static instructions()
    {
        return 'Bitte beachten, dass reservierte Plätze 10 Minuten vor Konzertbeginn eingenommen ' + 
                'werden müssen, sonst werden sie freigegeben.';

    } // instructions

    // Returns prices
    // (Text is not in any XML file. Not on the homepage! Only in the printed season program)
    static prices()
    {
        return 'Eintritt \n' + 'Fr. 25.- Erwachsene \n'   + 'Fr. 15.- Supporter \n'  + 
                    'Fr. 15.- SchülerInnen/StudentInnen (mit Legi, Ausweis)  \n'  ;
        
    } // prices

    // Returns a default text as subject for the reservation confirmation email
    static emailSubject()
    {
        var ret_subject = "";

        ret_subject += "JAZZ live AARAU Reservationbestaetigung";


        return ret_subject;

    } // emailSubject

    // Header for the content
    static emailHeader()
    {
        return "<h1>JAZZ <i>live</i> AARAU Reservationsbestätigung</h1>";
    }

    // Returns a default text as content for the reservation confirmation email
    static emailContent()
    {
        var ret_content = "";
        ret_content += "<font size=3 face='Arial'>";
        ret_content += "<b>Liebe Konzertbesucherin, lieber Konzertbesucher</b><br><br>";
        ret_content += "<p>";
        ret_content += "Ihre Reservation ist bei uns eingetroffen, besten Dank.<br>";
        ret_content += "Die gewünschten Plätze sind für Sie bereitgestellt und sollten<br>";
        ret_content += "spätestens 10 Minuten vor Konzertbeginn eingenommen werden.<br>";
        ret_content += "<br>";
        ret_content += "Wir wünschen Ihnen bereits jetzt ein unvergessliches Konzerterlebnis.<br>";
        ret_content += "<br><br>";
        ret_content += "Herzlich<br>";
        ret_content += "<b>JAZZ <i>live</i> AARAU</b><br></br>";
        ret_content += "</p>";
        ret_content += "</font>";

        return ret_content;

    } // emailContent

    // Returns a default text as content for the reservation confirmation email
    static emailJamSessionContent()
    {
        var ret_content = "";
        ret_content += "<font size=3 face='Arial'>";
        ret_content += "<b>Liebe Konzertbesucherin, lieber Konzertbesucher</b><br><br>";
        ret_content += "<p>";
        ret_content += "Ihre Reservation ist bei uns eingetroffen, besten Dank.<br>";
        ret_content += "Keine Stühle können für diese Jam Session reserviert werden. <br>";
        ret_content += "Es gibt einige Stühle aber .....<br>";
        ret_content += "<br>";
        ret_content += "Wir wünschen Ihnen herzlich willkommen zu diesem Jubiläumsfest.<br>";
        ret_content += "<br><br>";
        ret_content += "<b>JAZZ <i>live</i> AARAU</b><br></br>";
        ret_content += "</p>";
        ret_content += "</font>";

        return ret_content;

    } // emailJamSessionContent

    // Returns the default payment method text 
    static payMethod()
    {
       var ret_pay = "";
        ret_pay += "<font size=3 face='Arial'>";

        ret_pay += "<h3>Eintritt mit TWINT zahlen</h3>";
        ret_pay += "<p>";
        ret_pay += "Eintritte können mit TWINT im Voraus oder im Konzertsaal bezahlt werden. ";
        ret_pay += "Der reguläre Eintritt beträgt Fr. 25.-, Supporter bezahlen Fr. 15. <br>";
        ret_pay += "Bitte geben Sie Ihren Namen und das Konzertdatum bei der Bezahlung an. Empfänger ist Hanni ";
        ret_pay += "Heller, Telefonnummer +41 79 368 56 93. <br>";
        ret_pay += "</p>";
        ret_pay += "</font>";

        return ret_pay;

    } // payMethod

} // SeasonToEventProgramXml

