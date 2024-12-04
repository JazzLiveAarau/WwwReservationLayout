// File: ReservationLayoutHtml.js
// Date: 2024-12-04
// Authors: Gunnar Lidén

// Content
// =======
//
// Reservation layout HTML classes and functions
//


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Class Layout Html /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Class that creates all HTML code for the reservation layout HTML file
class LayoutHtml
{
    // Creates the instance of the class
    // i_layout_xml: Object for a reservation layout XML file. 
    // i_output_dir: Name of the output server directory and the layout XML file
    // i_layout_file_case: Layout file creation case
    //                     MakeReservation, ShowLayout, AddReservation, SearchReservation
    constructor(i_layout_xml, i_output_dir, i_layout_file_case, i_layout_file_description, i_button_id_array) 
    {
        // Member variables
        // ================

       // Layout XML object
       this.m_layout_xml = i_layout_xml;

       // Name of the output server directory and the layout XML file
       this.m_output_dir = i_output_dir;

       // Layout file creation case
       this.m_layout_file_case = i_layout_file_case;

       // Array of identities for the buttons that shall be created for m_layout_file_case
       this.m_button_id_array = i_button_id_array;

       // Description of the layout file cases
       this.m_layout_file_description = i_layout_file_description;

       // All HTML code from this class
       this.m_html_code = ''; 

       // Create (construct) the HTML code
       this.execute();

    } // constructor

    // Create (construct) all HTML code for the reservation layout HTML file
    execute()
    {
        this.m_html_code = ''; 

        if (!this.validLayoutCase())
        {
            return;
        }

        this.m_html_code = this.m_html_code + LayoutHtml.docTypeString() + LayoutHtml.endRow();

        this.m_html_code = this.m_html_code + LayoutHtml.htmlStartString() + LayoutHtml.endRow();

        var header_str = new LayoutHeader(this.m_layout_xml, this.m_layout_file_case);

        this.m_html_code = this.m_html_code + header_str.get() + LayoutHtml.endRow();

        var body_str = new LayoutBody(this.m_layout_xml, this.m_output_dir, this.m_layout_file_case, this.m_button_id_array);

        this.m_html_code = this.m_html_code + body_str.get() + LayoutHtml.endRow();

        this.m_html_code = this.m_html_code + LayoutHtml.htmlEndString() + LayoutHtml.endRow();

    } // execute

    // Get all HTML code for the reservation layout HTML file
    get()
    {
        return this.m_html_code;

    } // get

    static docTypeString()
    {
        return '<!DOCTYPE html>';

    } // docTypeString

    static htmlStartString()
    {
        return '<html lang=de>'

    } // htmlStartString

    static htmlEndString()
    {
        return '</html>'
        
    } // htmlEndString

    static endRow()
    {
        return '\n';

    } // endRow

    // Returns tabs as spaces
    static tab(i_n_tab)
    {
        var ret_tab_str = '';

        var n_tab = parseInt(i_n_tab);

        var tab_str = '    ';

        for (var tab_number=1; tab_number <= n_tab; tab_number++)
        {
            ret_tab_str = ret_tab_str + tab_str;

        }

        return ret_tab_str;

    } // tab

    // Returns true if it is a valid layout file case
    validLayoutCase()
    {
        if (this.m_layout_file_case == 'MakeReservation')
        {
            return true;
        }
        else if (this.m_layout_file_case == 'ShowLayout')
        {
            return true;
        }
        else if (this.m_layout_file_case == 'AddReservation')
        {
            return true;
        }
        else if (this.m_layout_file_case == 'SearchReservation')
        {
            return true;
        }
        else
        {
            alert("LayoutHtml.validLayoutCase Not an implemented layout file case m_layout_file_case= " + this.m_layout_file_case);

            return false;
        }

    } // validLayoutCase

} // LayoutHtml

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Class Layout Html ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Class Layout Header ///////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Class that creates the HTML code for the header section <head>
class LayoutHeader
{
    // Creates the instance of the class
    // i_layout_xml: Object for a reservation layout XML file. 
    constructor(i_layout_xml, i_layout_file_case) 
    {
        // Member variables
        // ================

       // Layout XML object
       this.m_layout_xml = i_layout_xml;

       // Layout file creation case
       this.m_layout_file_case = i_layout_file_case;

       // All HTML code from this class
       this.m_html_header_code = ''; 

       // Create (construct) the HTML code
       this.execute();

    } // constructor

    // Create (construct) the HTML code for the header section <head>
    execute()
    {

        this.m_html_header_code = ''; 

        this.m_html_header_code = this.m_html_header_code + LayoutHtml.tab(1) + LayoutHeader.startString() + LayoutHtml.endRow();

        this.m_html_header_code = this.m_html_header_code + this.meta() + LayoutHtml.endRow();

        this.m_html_header_code = this.m_html_header_code + this.title() + LayoutHtml.endRow();

        var header_script_code = new LayoutScript(this.m_layout_xml, this.m_layout_file_case);

        this.m_html_header_code = this.m_html_header_code + header_script_code.get() + LayoutHtml.endRow();



        this.m_html_header_code = this.m_html_header_code + LayoutHtml.tab(1) + LayoutHeader.endString() + LayoutHtml.endRow();


    } // execute

    // Get all HTML code for the header section <head>
    get()
    {
        return this.m_html_header_code +  LayoutHtml.endRow();

    } // get


    // Returns the meta <meta> data
    meta()
    {
        var meta_str = '';
 
        meta_str = meta_str + LayoutHtml.tab(2) + '<meta ' + 'charset="utf-8"' + '>' + LayoutHtml.endRow();

        meta_str = meta_str + LayoutHtml.tab(2) + '<meta ' + 'name="description" content="Reservation of seats for a concert"' + '>' + LayoutHtml.endRow();

        meta_str = meta_str + LayoutHtml.tab(2) + '<meta ' + 'name="author" content="Gunnar Lidén"' + '>' + LayoutHtml.endRow();

        meta_str = meta_str +  LayoutHtml.endRow();

        meta_str = meta_str + LayoutHtml.tab(2) + '<!-- Force the browser not to use the cached web page  Start -->' + LayoutHtml.endRow();

        meta_str = meta_str + LayoutHtml.tab(2) + '<meta ' + 'http-equiv=“Pragma” content=”no-cache”' + '>' + LayoutHtml.endRow();

        meta_str = meta_str + LayoutHtml.tab(2) + '<meta ' + 'http-equiv=“Expires” content=”-1″' + '>' + LayoutHtml.endRow();

        meta_str = meta_str + LayoutHtml.tab(2) + '<meta ' + 'http-equiv=“CACHE-CONTROL” content=”NO-CACHE”' + '>' + LayoutHtml.endRow();

        meta_str = meta_str + LayoutHtml.tab(2) + '<!-- Force the browser not to use the cached web page  End -->' +  LayoutHtml.endRow();

        meta_str = meta_str +  LayoutHtml.endRow();

        return meta_str;

    } // meta

    // Returns the title <title> with the names of the organizer and concert premises
    title()
    {
        var premises_data = getPremisesDataFromXml(this.m_layout_xml);

        // TODO Different titles for the HTML files

        return LayoutHtml.tab(2) + '<title>'+ premises_data.getOrganizerName() +  ' Reservation ' + premises_data.getName() + ' </title>' +  LayoutHtml.endRow();

    } // title

    static startString()
    {
        return '<header>';

    } // startString

    static endString()
    {
        return '</header>' +  LayoutHtml.endRow();
        
    } // endString
    
} // LayoutHeader

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Class Layout Header /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Class Layout Body /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Class that creates the HTML code for the body section <head>
class LayoutBody
{
    // Creates the instance of the class
    // i_layout_xml: Object for a reservation layout XML file. 
    constructor(i_layout_xml, i_output_dir, i_layout_file_case, i_button_id_array) 
    {
        // Member variables
        // ================

       // Layout XML object
       this.m_layout_xml = i_layout_xml;

       // Name of the output server directory and the layout XML file
       this.m_output_dir = i_output_dir;

       // Layout file creation case
       this.m_layout_file_case = i_layout_file_case;

       // Array of button identities that shall be created 
       this.m_button_id_array = i_button_id_array;

       // All HTML code from this class
       this.m_html_body_code = ''; 

       // Create (construct) the HTML code
       this.execute();

    } // constructor

    // Create (construct) the HTML code for the body section <head>
    execute()
    {
        this.m_html_body_code = ''; 

        this.m_html_body_code = this.m_html_body_code + this.startString();

        this.m_html_body_code = this.m_html_body_code + this.setXml();

        this.m_html_body_code = this.m_html_body_code + this.startTableTbody();

        this.m_html_body_code = this.m_html_body_code + this.divSearchTrTd();

        this.m_html_body_code = this.m_html_body_code + this.divSelectConcertTrTd();

        this.m_html_body_code = this.m_html_body_code + this.layoutSvgTrTd();

        this.m_html_body_code = this.m_html_body_code + this.imageSponsorsTrTd();

        this.m_html_body_code = this.m_html_body_code + this.endTableTbody();

        this.m_html_body_code = this.m_html_body_code + this.endString();        


    } // execute

    // Get all HTML code for the header section <head>
    get()
    {
        return this.m_html_body_code;

    } // get

    setXml()
    {
        var xml_str = '';

        xml_str = xml_str + LayoutHtml.tab(2) + '<script>' + LayoutHtml.endRow();

        xml_str = xml_str + LayoutHtml.tab(3) + '// XML file defining the layout of the concert premises' + LayoutHtml.endRow();

        xml_str = xml_str + LayoutHtml.tab(3) + '// This global variable was previously defined in the file ReservationSalmen.js' + LayoutHtml.endRow();

        xml_str = xml_str + LayoutHtml.tab(3) + '// This file ReservationSalmen.js is no longer included in the <head> section' + LayoutHtml.endRow();

        xml_str = xml_str + LayoutHtml.tab(3) + 'g_url_file_layout_xml = "XML/' + this.m_output_dir + '.xml;"' + LayoutHtml.endRow();

        xml_str = xml_str + LayoutHtml.tab(2) + '</script>' + LayoutHtml.endRow();

        xml_str = xml_str +  LayoutHtml.endRow();

        return xml_str;

    } // setXml

    divSearch()
    {
        return LayoutHtml.tab(4) + '<div id="id_reservation_search_seats">Section (division) search seats </div>'  + LayoutHtml.endRow();
    }

    divSearchTrTd()
    {
        var ret_search = '';

        ret_search = ret_search + this.startTrTd();

        ret_search = ret_search + this.divSearch();

        ret_search = ret_search +  this.endTrTd();

        return ret_search;

    } // divSearchTrTd

    divSelectConcert()
    {
        return LayoutHtml.tab(4) + '<div id="id_reservation_select_concert">Section (division) select concert </div>'  + LayoutHtml.endRow();
    }

    divSelectConcertTrTd()
    {
        var ret_select_concert = '';

        ret_select_concert = ret_select_concert + this.startTrTd();

        ret_select_concert = ret_select_concert + this.divSelectConcert();

        ret_select_concert = ret_select_concert + this.endTrTd();

        return ret_select_concert;

    } // divSelectConcertTrTd

    layoutSvgTrTd()
    {
        var ret_svg = '';

        var layout_svg = new LayoutSvg(this.m_layout_xml, this.m_button_id_array);

        var layout_svg_code = layout_svg.get() + LayoutHtml.endRow();

        ret_svg = ret_svg + this.startTrTd();

        ret_svg = ret_svg + layout_svg_code;

        ret_svg = ret_svg + this.endTrTd();

        return ret_svg;

    } // layoutSvgTrTd

    imageSponsors()
    {
        var ret_sponsors_image = '';

        var premises_data = getPremisesDataFromXml(this.m_layout_xml);

        var sponsors_image = premises_data.getSponsorsImage();

        if (sponsors_image.length < 3)
        {
            return ret_sponsors_image;
        }

        var sponsors_image_width = premises_data.getSponsorsImageWidth();

        var sponsors_image_height = premises_data.getSponsorsImageHeight();

        var size_str = '';

        if (sponsors_image_width.length > 0 && sponsors_image_height.length > 0)
        {
            size_str = ' width= "'  + sponsors_image_width + '" height= "' + sponsors_image_height + '" ';
        }
        else if (sponsors_image_width.length > 0)
        {
            size_str = ' width= "'  + sponsors_image_width + '" ';
        }
        else if (sponsors_image_height.length > 0)
        {
            size_str = ' height= "' + sponsors_image_height + '" ';
        }
        else
        {
            alert("LayoutBody.imageSponsors Size (width and/or height is not defined for " + sponsors_image);

            return ret_sponsors_image;
        }

        ret_sponsors_image = ret_sponsors_image + '<img id="id_sponsor_image" src="' + sponsors_image + '"';

        ret_sponsors_image = ret_sponsors_image + ' alt="Sponsoren" ' + size_str + '>' + LayoutHtml.endRow();

        return ret_sponsors_image;

    } // imageSponsors

    imageSponsorsTrTd()
    {
        var image_str = this.imageSponsors();

        if (image_str.length == 0)
        {
            return '';
        }

        var ret_sponsors_str = '';

        ret_sponsors_str = ret_sponsors_str + this.startTrTd();

        ret_sponsors_str = ret_sponsors_str +  LayoutHtml.tab(4) + image_str;

        // Was 'always' here but should be changed to own element only for MakeReservation
        ret_sponsors_str = ret_sponsors_str +  LayoutHtml.tab(4) + this.divCloseWindowText();

        ret_sponsors_str = ret_sponsors_str + this.endTrTd();

        return ret_sponsors_str;

    } // imageSponsorsTrTd


    divCloseWindowText()
    {
        return '<div id="id_reservation_close_window_text"> </div>' + LayoutHtml.endRow();
    }


    startString()
    {
        // TODO Investigatehow ('Salmen') is used
        var salmen_str = "('Salmen')";

        // Please note Main and main
        var onload_make_reservation_str =   'onload="Main' + this.m_layout_file_case + '()" ';
        var onload_show_layout_str =        'onload="main' + this.m_layout_file_case + '()" ';
        var onload_add_reservation_str =    'onload="Main' + this.m_layout_file_case + salmen_str + '"';
        var onload_search_reservation_str = 'onload="main' + this.m_layout_file_case + salmen_str + '"';


        if (this.m_layout_file_case == "MakeReservation" )
        {
            return LayoutHtml.tab(1) + '<body style= "background-color:#dfe0e1" ' + onload_make_reservation_str + ' scrolling="auto">' + LayoutHtml.endRow();
        }
        if (this.m_layout_file_case == "ShowLayout" )
        {
            return LayoutHtml.tab(1) + '<body style= "background-color:#dfe0e1" ' + onload_show_layout_str + ' scrolling="auto">' + LayoutHtml.endRow();
        }
        else if (this.m_layout_file_case == "AddReservation" )
        {
            return LayoutHtml.tab(1) + '<body style= "background-color:#dfe0e1" ' + onload_add_reservation_str + ' scrolling="auto">' + LayoutHtml.endRow();
        }
        else if (this.m_layout_file_case == "SearchReservation" )
        {
            return LayoutHtml.tab(1) + '<body style= "background-color:#dfe0e1" ' + onload_search_reservation_str + ' scrolling="auto">' + LayoutHtml.endRow();
        }
        else
        {
            alert("LayoutBody.startString Not an implemented case= " + this.m_layout_file_case);
        }

    } // startString

    endString()
    {
        return LayoutHtml.tab(1) + '</body>' + LayoutHtml.endRow();
        
    } // endString

    startTableTbody()
    {
        return  LayoutHtml.tab(2) + '<table><tbody>'  +  LayoutHtml.endRow();
    }

    endTableTbody()
    {
        return  LayoutHtml.tab(2) + '</tbody></table>'  +  LayoutHtml.endRow();
    }    

    startTrTd()
    {
        return  LayoutHtml.tab(3) + '<tr><td>'  +  LayoutHtml.endRow();
    }

    endTrTd()
    {
        return  LayoutHtml.tab(3) + '</td></tr>'  +  LayoutHtml.endRow();
    }    
    
} // LayoutBody

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Class Layout Body ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Class Layout Script ///////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Class that creates the HTML code for the header script section <script>
class LayoutScript
{
    // Creates the instance of the class
    // i_layout_xml: Object for a reservation layout XML file. 
    constructor(i_layout_xml, i_layout_file_case) 
    {
        // Member variables
        // ================

       // Layout XML object
       this.m_layout_xml = i_layout_xml;

       // Layout file creation case
       this.m_layout_file_case = i_layout_file_case;

       // Flag telling if a test <body> onload function shall be added the 
       // output HTML files
       this.m_add_temporary_onload_function = true;

       // All HTML code from this class
       this.m_html_script_code = ''; 

       // Create (construct) the HTML code
       this.execute();

    } // constructor

    // Create (construct) the HTML code for the bpdy section <head>
    execute()
    {
        var path_file_array = [];

        if (this.m_layout_file_case == 'MakeReservation' )
        {
            path_file_array[ 0] = 'https://jazzliveaarau.ch/Reservation/scripts/Reservation.js';
            path_file_array[ 1] = 'https://jazzliveaarau.ch/Reservation/scripts/ReservationXmlTags.js';
            path_file_array[ 2] = 'https://jazzliveaarau.ch/Reservation/scripts/ReservationConcerts.js';
            path_file_array[ 3] = 'https://jazzliveaarau.ch/Reservation/scripts/ReservationEmail.js';
            path_file_array[ 4] = 'https://jazzliveaarau.ch/Reservation/scripts/ReservationFiles.js';
            path_file_array[ 5] = 'https://jazzliveaarau.ch/Reservation/scripts/ReservationStrings.js';
            path_file_array[ 6] = 'https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js';
            path_file_array[ 7] = 'https://jazzliveaarau.ch/Reservation/scripts/CoronaForm.js';
            //path_file_array[ 8] = 'https://jazzliveaarau.ch/Reservation/scripts/ReservationEvents.js';
            //path_file_array[ 9] = 'https://jazzliveaarau.ch/Reservation/scripts/ReservationSalmen.js';
            //path_file_array[10] = 'https://jazzliveaarau.ch/Reservation/scripts/ReservationSvg.js';
            //path_file_array[11] = 'https://jazzliveaarau.ch/Reservation/scripts/ReservationPremises.js';
            //path_file_array[12] = 'https://jazzliveaarau.ch/Reservation/scripts/ReservationStage.js';
            //path_file_array[13] = 'https://jazzliveaarau.ch/Reservation/scripts/ReservationDoors.js';
            //path_file_array[14] = 'https://jazzliveaarau.ch/Reservation/scripts/ReservationTables.js';
            //path_file_array[15] = 'https://jazzliveaarau.ch/Reservation/scripts/ReservationSalmenEvents.js';
        }
        else if (this.m_layout_file_case == 'ShowLayout' )
        {
            path_file_array[ 0] = 'https://jazzliveaarau.ch/Reservation/scripts/Reservation.js';
            path_file_array[ 1] = 'https://jazzliveaarau.ch/Reservation/scripts/ReservationXmlTags.js';
            path_file_array[ 2] = 'https://jazzliveaarau.ch/Reservation/scripts/ReservationConcerts.js';
            path_file_array[ 3] = 'https://jazzliveaarau.ch/Reservation/scripts/ReservationEmail.js';
            path_file_array[ 4] = 'https://jazzliveaarau.ch/Reservation/scripts/ReservationFiles.js';
            path_file_array[ 5] = 'https://jazzliveaarau.ch/Reservation/scripts/ReservationStrings.js';
            path_file_array[ 6] = 'https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js';
            path_file_array[ 7] = 'https://jazzliveaarau.ch/Reservation/scripts/CoronaForm.js';
        }
        else if (this.m_layout_file_case == 'AddReservation' )
        {
            path_file_array[ 0] = 'https://jazzliveaarau.ch/Reservation/scripts/Reservation.js';
            path_file_array[ 1] = 'https://jazzliveaarau.ch/Reservation/scripts/ReservationXmlTags.js';
            path_file_array[ 2] = 'https://jazzliveaarau.ch/Reservation/scripts/ReservationConcerts.js';
            path_file_array[ 3] = 'https://jazzliveaarau.ch/Reservation/scripts/ReservationEmail.js';
            path_file_array[ 4] = 'https://jazzliveaarau.ch/Reservation/scripts/ReservationFiles.js';
            path_file_array[ 5] = 'https://jazzliveaarau.ch/Reservation/scripts/ReservationStrings.js';
            path_file_array[ 6] = 'https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js';
            path_file_array[ 7] = 'https://jazzliveaarau.ch/Reservation/scripts/CoronaForm.js';
        }
        else if (this.m_layout_file_case == 'SearchReservation' )
        {
            path_file_array[ 0] = 'https://jazzliveaarau.ch/Reservation/scripts/Reservation.js';
            path_file_array[ 1] = 'https://jazzliveaarau.ch/Reservation/scripts/ReservationXmlTags.js';
            path_file_array[ 2] = 'https://jazzliveaarau.ch/Reservation/scripts/ReservationConcerts.js';
            path_file_array[ 3] = 'https://jazzliveaarau.ch/Reservation/scripts/ReservationEmail.js';
            path_file_array[ 4] = 'https://jazzliveaarau.ch/Reservation/scripts/ReservationFiles.js';
            path_file_array[ 5] = 'https://jazzliveaarau.ch/Reservation/scripts/ReservationStrings.js';
            path_file_array[ 6] = 'https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js';
            path_file_array[ 7] = 'https://jazzliveaarau.ch/Reservation/scripts/CoronaForm.js';
        }
        else
        {
            alert("LayoutScript.execute Not an implemented case= " + this.m_layout_file_case);

            return;            
        }

        this.m_html_script_code = ''; 

        var n_scripts = path_file_array.length;

        for (var index_file=0; index_file < n_scripts; index_file++)
        {
            var path_file = path_file_array[index_file];

            this.m_html_script_code = this.m_html_script_code + LayoutHtml.tab(2) + LayoutScript.startString(path_file);

            this.m_html_script_code = this.m_html_script_code + LayoutScript.endString() + LayoutHtml.endRow();
        }

        this.m_html_script_code = this.m_html_script_code + LayoutHtml.endRow();

        this.m_html_script_code = this.m_html_script_code + this.noScript();

        this.m_html_script_code = this.m_html_script_code + this.setEventFunctions();

        this.m_html_script_code = this.m_html_script_code + this.eventMouse();

        this.m_html_script_code = this.m_html_script_code + this.tempMainFunction();

    } // execute

    eventMouse()
    {
        var event_str = '';

        if (this.m_layout_file_case == 'MakeReservation' )
        {
            event_str = event_str + LayoutHtml.tab(2) + '<script>' + LayoutHtml.endRow(); 
            
            event_str = event_str + LayoutHtml.tab(3) + '// Event: User clicked the circle' + LayoutHtml.endRow();  

            event_str = event_str + LayoutHtml.tab(3) + 'function EventMouseDown(i_table_number, i_seat_char)' + LayoutHtml.endRow();  

            event_str = event_str + LayoutHtml.tab(3) + '{' + LayoutHtml.endRow();  

            event_str = event_str + LayoutHtml.tab(4) + 'if (g_user_is_concert_visitor == "true")' + LayoutHtml.endRow();  

            event_str = event_str + LayoutHtml.tab(4) + '{' + LayoutHtml.endRow();  

            event_str = event_str + LayoutHtml.tab(5) + 'EventMouseDownConcertVisitor(i_table_number, i_seat_char);' + LayoutHtml.endRow();  

            event_str = event_str + LayoutHtml.tab(4) + '}' + LayoutHtml.endRow();  

            event_str = event_str + LayoutHtml.tab(4) + 'else' + LayoutHtml.endRow();  

            event_str = event_str + LayoutHtml.tab(4) + '{' + LayoutHtml.endRow();  

            event_str = event_str + LayoutHtml.tab(5) + 'EventMouseDownAdministrator(i_table_number, i_seat_char);' + LayoutHtml.endRow();  

            event_str = event_str + LayoutHtml.tab(4) + '}' + LayoutHtml.endRow();  

            event_str = event_str + LayoutHtml.tab(3) + '} // EventMouseDown' + LayoutHtml.endRow();  

            event_str = event_str + LayoutHtml.tab(2) + '</script>' + LayoutHtml.endRow();  

            event_str = event_str + LayoutHtml.endRow();  
        }
        else if (this.m_layout_file_case == 'ShowLayout' )
        {
            /*QQQQQ
            event_str = event_str + LayoutHtml.tab(2) + '<script>' + LayoutHtml.endRow(); 
            
            event_str = event_str + LayoutHtml.tab(3) + '// Event: User clicked the circle' + LayoutHtml.endRow();  

            event_str = event_str + LayoutHtml.tab(3) + 'function EventMouseDown(i_table_number, i_seat_char)' + LayoutHtml.endRow();  

            event_str = event_str + LayoutHtml.tab(3) + '{' + LayoutHtml.endRow();  

            event_str = event_str + LayoutHtml.tab(4) + 'if (g_user_is_concert_visitor == "true")' + LayoutHtml.endRow();  

            event_str = event_str + LayoutHtml.tab(4) + '{' + LayoutHtml.endRow();  

            event_str = event_str + LayoutHtml.tab(5) + 'EventMouseDownConcertVisitor(i_table_number, i_seat_char);' + LayoutHtml.endRow();  

            event_str = event_str + LayoutHtml.tab(4) + '}' + LayoutHtml.endRow();  

            event_str = event_str + LayoutHtml.tab(4) + 'else' + LayoutHtml.endRow();  

            event_str = event_str + LayoutHtml.tab(4) + '{' + LayoutHtml.endRow();  

            event_str = event_str + LayoutHtml.tab(5) + 'EventMouseDownAdministrator(i_table_number, i_seat_char);' + LayoutHtml.endRow();  

            event_str = event_str + LayoutHtml.tab(4) + '}' + LayoutHtml.endRow();  

            event_str = event_str + LayoutHtml.tab(3) + '} // EventMouseDown' + LayoutHtml.endRow();  

            event_str = event_str + LayoutHtml.tab(2) + '</script>' + LayoutHtml.endRow();  

            event_str = event_str + LayoutHtml.endRow();  
            QQQ*/
        }
        else if (this.m_layout_file_case == 'AddReservation' )
        {
            event_str = event_str + LayoutHtml.tab(2) + '<script>' + LayoutHtml.endRow(); 
            
            event_str = event_str + LayoutHtml.tab(3) + '// Event: User clicked the circle' + LayoutHtml.endRow();  

            event_str = event_str + LayoutHtml.tab(3) + 'function EventMouseDown(i_table_number, i_seat_char)' + LayoutHtml.endRow();  

            event_str = event_str + LayoutHtml.tab(3) + '{' + LayoutHtml.endRow();  

            event_str = event_str + LayoutHtml.tab(4) + 'if (g_user_is_concert_visitor == "true")' + LayoutHtml.endRow();  

            event_str = event_str + LayoutHtml.tab(4) + '{' + LayoutHtml.endRow();  

            event_str = event_str + LayoutHtml.tab(5) + 'EventMouseDownConcertVisitor(i_table_number, i_seat_char);' + LayoutHtml.endRow();  

            event_str = event_str + LayoutHtml.tab(4) + '}' + LayoutHtml.endRow();  

            event_str = event_str + LayoutHtml.tab(4) + 'else' + LayoutHtml.endRow();  

            event_str = event_str + LayoutHtml.tab(4) + '{' + LayoutHtml.endRow();  

            event_str = event_str + LayoutHtml.tab(5) + 'EventMouseDownAdministrator(i_table_number, i_seat_char);' + LayoutHtml.endRow();  

            event_str = event_str + LayoutHtml.tab(4) + '}' + LayoutHtml.endRow();  

            event_str = event_str + LayoutHtml.tab(3) + '} // EventMouseDown' + LayoutHtml.endRow();  

            event_str = event_str + LayoutHtml.tab(2) + '</script>' + LayoutHtml.endRow();  

            event_str = event_str + LayoutHtml.endRow();  
        }
        else if (this.m_layout_file_case == 'SearchReservation' )
        {
            event_str = event_str + LayoutHtml.tab(2) + '<script>' + LayoutHtml.endRow(); 
            
            event_str = event_str + LayoutHtml.tab(3) + '// Event: User clicked the circle' + LayoutHtml.endRow();  

            event_str = event_str + LayoutHtml.tab(3) + 'function EventMouseDown(i_table_number, i_seat_char)' + LayoutHtml.endRow();  

            event_str = event_str + LayoutHtml.tab(3) + '{' + LayoutHtml.endRow();  

            event_str = event_str + LayoutHtml.tab(4) + 'if (g_user_is_concert_visitor == "true")' + LayoutHtml.endRow();  

            event_str = event_str + LayoutHtml.tab(4) + '{' + LayoutHtml.endRow();  

            event_str = event_str + LayoutHtml.tab(5) + 'EventMouseDownConcertVisitor(i_table_number, i_seat_char);' + LayoutHtml.endRow();  

            event_str = event_str + LayoutHtml.tab(4) + '}' + LayoutHtml.endRow();  

            event_str = event_str + LayoutHtml.tab(4) + 'else' + LayoutHtml.endRow();  

            event_str = event_str + LayoutHtml.tab(4) + '{' + LayoutHtml.endRow();  

            event_str = event_str + LayoutHtml.tab(5) + 'EventMouseDownAdministrator(i_table_number, i_seat_char);' + LayoutHtml.endRow();  

            event_str = event_str + LayoutHtml.tab(4) + '}' + LayoutHtml.endRow();  

            event_str = event_str + LayoutHtml.tab(3) + '} // EventMouseDown' + LayoutHtml.endRow();  

            event_str = event_str + LayoutHtml.tab(2) + '</script>' + LayoutHtml.endRow();  

            event_str = event_str + LayoutHtml.endRow();  
        }
        else
        {
            alert("LayoutScript A not yet implemented file case.  m_layout_file_case= " + this.m_layout_file_case);
        }
    

        return event_str;

    } // eventMouse

    // Please refer to the below text inside the function
    setEventFunctions()
    {
        var set_event_str = '';
		
        if (this.m_layout_file_case == 'MakeReservation' )
        {
            set_event_str = set_event_str + LayoutHtml.tab(2) + '<script>' + LayoutHtml.endRow(); 
            
            set_event_str = set_event_str + LayoutHtml.tab(3) + '// In previous versions the circle onmmouse events were set by this function' + LayoutHtml.endRow();  

            set_event_str = set_event_str + LayoutHtml.tab(3) + '// The event functions are now set when the HTML file is created' + LayoutHtml.endRow();  

            set_event_str = set_event_str + LayoutHtml.tab(3) + '// The function was defined in file  ReservationSalmenEvents.js (no longer included in <head>)' + LayoutHtml.endRow();  

            set_event_str = set_event_str + LayoutHtml.tab(3) + 'function setEventFunctions()' + LayoutHtml.endRow();  

            set_event_str = set_event_str + LayoutHtml.tab(3) + '{' + LayoutHtml.endRow();  

            set_event_str = set_event_str + LayoutHtml.tab(4) + '// Do nothing' + LayoutHtml.endRow();  

            set_event_str = set_event_str + LayoutHtml.tab(3) + '}' + LayoutHtml.endRow();  

            set_event_str = set_event_str + LayoutHtml.tab(2) + '</script>' + LayoutHtml.endRow();  

            set_event_str = set_event_str + LayoutHtml.endRow();  
        }
        else if (this.m_layout_file_case == 'ShowLayout' )
        {
            set_event_str = set_event_str + LayoutHtml.tab(2) + '<script>' + LayoutHtml.endRow(); 
            
            set_event_str = set_event_str + LayoutHtml.tab(3) + '// In previous versions the circle onmmouse events were set by this function' + LayoutHtml.endRow();  

            set_event_str = set_event_str + LayoutHtml.tab(3) + '// The event functions are now set when the HTML file is created' + LayoutHtml.endRow();  

            set_event_str = set_event_str + LayoutHtml.tab(3) + '// The function was defined in file  ReservationSalmenEvents.js (no longer included in <head>)' + LayoutHtml.endRow();  

            set_event_str = set_event_str + LayoutHtml.tab(3) + 'function setEventFunctions()' + LayoutHtml.endRow();  

            set_event_str = set_event_str + LayoutHtml.tab(3) + '{' + LayoutHtml.endRow();  

            set_event_str = set_event_str + LayoutHtml.tab(4) + '// Do nothing' + LayoutHtml.endRow();  

            set_event_str = set_event_str + LayoutHtml.tab(3) + '}' + LayoutHtml.endRow();  

            set_event_str = set_event_str + LayoutHtml.tab(2) + '</script>' + LayoutHtml.endRow();  

            set_event_str = set_event_str + LayoutHtml.endRow();  
        }
        else if (this.m_layout_file_case == 'AddReservation' )
        {
            set_event_str = set_event_str + LayoutHtml.tab(2) + '<script>' + LayoutHtml.endRow(); 
            
            set_event_str = set_event_str + LayoutHtml.tab(3) + '// In previous versions the circle onmmouse events were set by this function' + LayoutHtml.endRow();  

            set_event_str = set_event_str + LayoutHtml.tab(3) + '// The event functions are now set when the HTML file is created' + LayoutHtml.endRow();  

            set_event_str = set_event_str + LayoutHtml.tab(3) + '// The function was defined in file  ReservationSalmenEvents.js (no longer included in <head>)' + LayoutHtml.endRow();  

            set_event_str = set_event_str + LayoutHtml.tab(3) + 'function setEventFunctions()' + LayoutHtml.endRow();  

            set_event_str = set_event_str + LayoutHtml.tab(3) + '{' + LayoutHtml.endRow();  

            set_event_str = set_event_str + LayoutHtml.tab(4) + '// Do nothing' + LayoutHtml.endRow();  

            set_event_str = set_event_str + LayoutHtml.tab(3) + '}' + LayoutHtml.endRow();  

            set_event_str = set_event_str + LayoutHtml.tab(2) + '</script>' + LayoutHtml.endRow();  

            set_event_str = set_event_str + LayoutHtml.endRow();  
        }
        else if (this.m_layout_file_case == 'SearchReservation' )
        {
            set_event_str = set_event_str + LayoutHtml.tab(2) + '<script>' + LayoutHtml.endRow(); 
            
            set_event_str = set_event_str + LayoutHtml.tab(3) + '// In previous versions the circle onmmouse events were set by this function' + LayoutHtml.endRow();  

            set_event_str = set_event_str + LayoutHtml.tab(3) + '// The event functions are now set when the HTML file is created' + LayoutHtml.endRow();  

            set_event_str = set_event_str + LayoutHtml.tab(3) + '// The function was defined in file  ReservationSalmenEvents.js (no longer included in <head>)' + LayoutHtml.endRow();  

            set_event_str = set_event_str + LayoutHtml.tab(3) + 'function setEventFunctions()' + LayoutHtml.endRow();  

            set_event_str = set_event_str + LayoutHtml.tab(3) + '{' + LayoutHtml.endRow();  

            set_event_str = set_event_str + LayoutHtml.tab(4) + '// Do nothing' + LayoutHtml.endRow();  

            set_event_str = set_event_str + LayoutHtml.tab(3) + '}' + LayoutHtml.endRow();  

            set_event_str = set_event_str + LayoutHtml.tab(2) + '</script>' + LayoutHtml.endRow();  

            set_event_str = set_event_str + LayoutHtml.endRow();  
        }
        else
        {
            alert("LayoutScript.setEventFunctions A not yet implemented file case m_layout_file_case= " + this.m_layout_file_case);
        }

        return set_event_str;

        // setEventFunctions(); // ReservationSalmenEvents.js

    } // setEventFunctions

    tempMainFunction()
    {
        var main_str = '';

        if (!this.m_add_temporary_onload_function)
        {
            return main_str;
        }
		
        if (this.m_layout_file_case == 'MakeReservation' )
        {
            main_str = main_str + LayoutHtml.tab(2) + '<script>' + LayoutHtml.endRow(); 
            
            main_str = main_str + LayoutHtml.tab(3) + '// Main (onload) function for MakeReservation. Temporary for test here. QQQQQQQQQQQQQ' + LayoutHtml.endRow();  

            main_str = main_str + LayoutHtml.tab(3) + '// The function is defined in file Reservation.js included in <head>' + LayoutHtml.endRow(); 

            main_str = main_str + LayoutHtml.tab(3) + '// So the function is defined two times and must be deleted before use' + LayoutHtml.endRow(); 

            main_str = main_str + LayoutHtml.tab(3) + 'function MainMakeReservation()' + LayoutHtml.endRow();  

            main_str = main_str + LayoutHtml.tab(3) + '{' + LayoutHtml.endRow();  

            main_str = main_str + LayoutHtml.tab(4) + 'alert("MainMakeReservation Enter g_url_file_layout_xml= " + g_url_file_layout_xml);' + LayoutHtml.endRow();  

            main_str = main_str + LayoutHtml.tab(3) + '}' + LayoutHtml.endRow();  

            main_str = main_str + LayoutHtml.tab(2) + '</script>' + LayoutHtml.endRow();  

            main_str = main_str + LayoutHtml.endRow();  
        }
        else if (this.m_layout_file_case == 'ShowLayout' )
        {
            main_str = main_str + LayoutHtml.tab(2) + '<script>' + LayoutHtml.endRow(); 
            
            main_str = main_str + LayoutHtml.tab(3) + '// Main (onload) function for ShowLayout. Temporary for test here. QQQQQQQQQQQQQ' + LayoutHtml.endRow();  

            main_str = main_str + LayoutHtml.tab(3) + '// The function is defined in file Reservation.js included in <head>' + LayoutHtml.endRow(); 

            main_str = main_str + LayoutHtml.tab(3) + '// So the function is defined two times and must be deleted before use' + LayoutHtml.endRow(); 

            main_str = main_str + LayoutHtml.tab(3) + 'function mainShowLayout()' + LayoutHtml.endRow();  

            main_str = main_str + LayoutHtml.tab(3) + '{' + LayoutHtml.endRow();  

            main_str = main_str + LayoutHtml.tab(4) + 'alert("mainShowLayout Enter g_url_file_layout_xml= " + g_url_file_layout_xml);' + LayoutHtml.endRow();  

            main_str = main_str + LayoutHtml.tab(3) + '}' + LayoutHtml.endRow();  

            main_str = main_str + LayoutHtml.tab(2) + '</script>' + LayoutHtml.endRow();  

            main_str = main_str + LayoutHtml.endRow();  
        }
        else if (this.m_layout_file_case == 'AddReservation' )
        {
            main_str = main_str + LayoutHtml.tab(2) + '<script>' + LayoutHtml.endRow(); 
            
            main_str = main_str + LayoutHtml.tab(3) + '// Main (onload) function for Addreservation. Temporary for test here. QQQQQQQQQQQQQ' + LayoutHtml.endRow();  

            main_str = main_str + LayoutHtml.tab(3) + '// The function is defined in file Reservation.js included in <head>' + LayoutHtml.endRow(); 

            main_str = main_str + LayoutHtml.tab(3) + '// So the function is defined two times and must be deleted before use' + LayoutHtml.endRow(); 

            main_str = main_str + LayoutHtml.tab(3) + 'function MainAddReservation(i_add_to_xml_file_name)' + LayoutHtml.endRow();  

            main_str = main_str + LayoutHtml.tab(3) + '{' + LayoutHtml.endRow();  

            main_str = main_str + LayoutHtml.tab(4) + 'alert("MainAddReservation Enter i_add_to_xml_file_name= " + i_add_to_xml_file_name);' + LayoutHtml.endRow();  

            main_str = main_str + LayoutHtml.tab(3) + '}' + LayoutHtml.endRow();  

            main_str = main_str + LayoutHtml.tab(2) + '</script>' + LayoutHtml.endRow();  

            main_str = main_str + LayoutHtml.endRow();  
        }
        else if (this.m_layout_file_case == 'SearchReservation' )
        {
            main_str = main_str + LayoutHtml.tab(2) + '<script>' + LayoutHtml.endRow(); 
            
            main_str = main_str + LayoutHtml.tab(3) + '// Main (onload) function for SearchReservation. Temporary for test here. QQQQQQQQQQQQQ' + LayoutHtml.endRow();  

            main_str = main_str + LayoutHtml.tab(3) + '// The function is defined in file Reservation.js included in <head>' + LayoutHtml.endRow(); 

            main_str = main_str + LayoutHtml.tab(3) + '// So the function is defined two times and must be deleted before use' + LayoutHtml.endRow(); 

            main_str = main_str + LayoutHtml.tab(3) + 'function mainSearchReservation(i_add_to_xml_file_name)' + LayoutHtml.endRow();  

            main_str = main_str + LayoutHtml.tab(3) + '{' + LayoutHtml.endRow();  

            main_str = main_str + LayoutHtml.tab(4) + 'alert("mainSearchReservation Enter i_add_to_xml_file_name= " + i_add_to_xml_file_name);' + LayoutHtml.endRow();  

            main_str = main_str + LayoutHtml.tab(3) + '}' + LayoutHtml.endRow();  

            main_str = main_str + LayoutHtml.tab(2) + '</script>' + LayoutHtml.endRow();  

            main_str = main_str + LayoutHtml.endRow();  
        }
        else
        {
            alert("LayoutScript.tempMainFunction A not yet implemented file case m_layout_file_case= " + this.m_layout_file_case);
        }

        return main_str;

    } // tempMainFunction

    // Get all HTML code for the scripts of the header section <script>
    get()
    {
        return this.m_html_script_code;

    } // get

    noScript()
    {
        var no_script_str = '';

        no_script_str = no_script_str +  LayoutHtml.tab(2) + '<noscript>' + LayoutHtml.endRow();

        no_script_str =  no_script_str + LayoutHtml.tab(3) + 'Um den vollen Funktionsumfang dieser Webseite zu erfahren, benötigen Sie JavaScript.' + LayoutHtml.endRow();

        no_script_str = no_script_str +  LayoutHtml.tab(3) + 'Eine Anleitung wie Sie JavaScript in Ihrem Browser einschalten, befindet sich ' + LayoutHtml.endRow();

        no_script_str = no_script_str +  LayoutHtml.tab(3) + '<a href="http://www.enable-javascript.com/de/" target="_blank">hier</a>.' + LayoutHtml.endRow();

        no_script_str = no_script_str +  LayoutHtml.tab(2) + '</noscript>' + LayoutHtml.endRow();

        no_script_str = no_script_str +  LayoutHtml.endRow();

        return no_script_str;

    } // noScript

    static startString(i_path_file)
    {
        return '<script type="text/javascript" src=" ' + i_path_file + '" >';

    } // startString

    static endString()
    {
        return '</script>'
        
    } // endString
    
} // LayoutScript

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Class Layout Script /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
