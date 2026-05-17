// File: ReservationLayoutHtmlFiles.js
// Date: 2026-05-16
// Authors: Gunnar Lidén

// Content
// =======
//
// Reservation layout classes and functions for the generation of HTML files
// The execution function creates the HTML code for all the reservation web classes, i.e.
// the code for all HTML files making up the application.
// The 

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Class Layout Html Files ///////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Class that creates all HTML code for the reservation layout HTML file
class LayoutHtmlFiles
{
    // Creates the instance of the class
    // i_layout_xml: Object for a reservation layout XML file. 
    // i_output_dir: Name of the output server directory and the layout XML file
    // i_layout_file_case: Layout file creation case
    //    EventProgram       Define year/season event program
    //                       Based on EventProgramXml
    //    EventReservation   Make a reservation
    //                       Based on InputEventReservation and its subclasses 
    //    SelectReservation  Select seats for a reservation 
    //                       Based on class reserved seats
    //    AdminReservation   Administration of reservations
    //                       Based on EventProgramXml, InputEventReservation,
    //                       SearchSeats and ReservationButtons
    //    DisplayReservation Search for seats and placing of cards
    //    DisplayLayout      Show the layout
    //    ReservationList    List reservations
    //    ReservationPrint   Printout of seat cards
    //    MakeReservation    (the JAZZ live AARAU version of UserReservation),
    //    AddReservation     (the JAZZ live AARAU version of AdminReservation),
    //    ShowLayout         (the JAZZ live AARAU version of DisplayLayout),
    //    SearchReservation  (the JAZZ live AARAU version of DisplayReservation),
    // i_button_id_array: Button identities for the input layout file case 
    // m_layout_file_description: Description of the layout file case
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

       // Description of the layout file case
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

        this.m_html_code = this.m_html_code + LayoutHtmlFiles.docTypeString() + LayoutHtmlFiles.endRow();

        this.m_html_code = this.m_html_code + LayoutHtmlFiles.htmlStartString() + LayoutHtmlFiles.endRow();

        var header_str = new LayoutHeader(this.m_layout_xml, this.m_layout_file_case);

        this.m_html_code = this.m_html_code + header_str.get() + LayoutHtmlFiles.endRow();

        var body_str = new LayoutBody(this.m_layout_xml, this.m_output_dir, this.m_layout_file_case, this.m_button_id_array);

        this.m_html_code = this.m_html_code + body_str.get() + LayoutHtmlFiles.endRow();

        this.m_html_code = this.m_html_code + LayoutHtmlFiles.htmlEndString() + LayoutHtmlFiles.endRow();

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

        if (g_remove_tabs_comments)
        {
            return ret_tab_str;
        }

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
        else if (this.m_layout_file_case == 'ReservationPrint')
        {
            return true;
        }
        else if (this.m_layout_file_case == 'ReservationList')
        {
            return true;
        }
        else if (this.m_layout_file_case == 'EventReservation')
        {
            return true;
        }
        else
        {
            alert("LayoutHtmlFiles.validLayoutCase Not an implemented layout file case m_layout_file_case= " + this.m_layout_file_case);

            return false;
        }

    } // validLayoutCase

} // LayoutHtmlFiles

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

        this.m_html_header_code = this.m_html_header_code + LayoutHtmlFiles.tab(1) + LayoutHeader.startString() + LayoutHtmlFiles.endRow();

        this.m_html_header_code = this.m_html_header_code + this.meta() + LayoutHtmlFiles.endRow();

        this.m_html_header_code = this.m_html_header_code + this.title() + LayoutHtmlFiles.endRow();

        var header_style_code = new LayoutStyle(this.m_layout_xml, this.m_layout_file_case);

        this.m_html_header_code = this.m_html_header_code + header_style_code.get() + LayoutHtmlFiles.endRow();

        var header_script_code = new LayoutScript(this.m_layout_xml, this.m_layout_file_case);

        this.m_html_header_code = this.m_html_header_code + header_script_code.get() + LayoutHtmlFiles.endRow();



        this.m_html_header_code = this.m_html_header_code + LayoutHtmlFiles.tab(1) + LayoutHeader.endString() + LayoutHtmlFiles.endRow();


    } // execute

    // Get all HTML code for the header section <head>
    get()
    {
        return this.m_html_header_code +  LayoutHtmlFiles.endRow();

    } // get


    // Returns the meta <meta> data
    meta()
    {
        var meta_str = '';
 
        meta_str = meta_str + LayoutHtmlFiles.tab(2) + '<meta ' + 'charset="utf-8"' + '>' + LayoutHtmlFiles.endRow();

        meta_str = meta_str + LayoutHtmlFiles.tab(2) + '<meta ' + 'name="description" content="Reservation of seats for a concert"' + '>' + LayoutHtmlFiles.endRow();

        meta_str = meta_str + LayoutHtmlFiles.tab(2) + '<meta ' + 'name="author" content="Gunnar Lidén"' + '>' + LayoutHtmlFiles.endRow();

        meta_str = meta_str +  LayoutHtmlFiles.endRow();

        meta_str = meta_str + LayoutHtmlFiles.tab(2) + '<!-- Force the browser not to use the cached web page  Start -->' + LayoutHtmlFiles.endRow();

        meta_str = meta_str + LayoutHtmlFiles.tab(2) + '<meta ' + 'http-equiv=“Pragma” content=”no-cache”' + '>' + LayoutHtmlFiles.endRow();

        meta_str = meta_str + LayoutHtmlFiles.tab(2) + '<meta ' + 'http-equiv=“Expires” content=”-1″' + '>' + LayoutHtmlFiles.endRow();

        meta_str = meta_str + LayoutHtmlFiles.tab(2) + '<meta ' + 'http-equiv=“CACHE-CONTROL” content=”NO-CACHE”' + '>' + LayoutHtmlFiles.endRow();

        meta_str = meta_str + LayoutHtmlFiles.tab(2) + '<!-- Force the browser not to use the cached web page  End -->' +  LayoutHtmlFiles.endRow();

        meta_str = meta_str +  LayoutHtmlFiles.endRow();

        return meta_str;

    } // meta

    // Returns the title <title> with the names of the organizer and concert premises
    title()
    {
        var premises_data = getPremisesDataFromXml(this.m_layout_xml);

        // TODO Different titles for the HTML files

        return LayoutHtmlFiles.tab(2) + '<title>'+ premises_data.getOrganizerName() +  ' Reservation ' + premises_data.getName() + ' </title>' +  LayoutHtmlFiles.endRow();

    } // title

    static startString()
    {
        return '<header>';

    } // startString

    static endString()
    {
        return '</header>' +  LayoutHtmlFiles.endRow();
        
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

        if (this.m_layout_file_case == 'ReservationPrint')
        {
            this.m_html_body_code = this.m_html_body_code + this.startString();

            this.m_html_body_code = this.m_html_body_code + this.bodyReservationPrint();

            this.m_html_body_code = this.m_html_body_code + this.endString();  

            return;
        }
        else if (this.m_layout_file_case == 'ReservationList')
        {
            this.m_html_body_code = this.m_html_body_code + this.startString();

            this.m_html_body_code = this.m_html_body_code + this.bodyReservationList();

            this.m_html_body_code = this.m_html_body_code + this.endString();  

            return;
        }
        else if (this.m_layout_file_case == 'EventReservation')
        {
            this.m_html_body_code = this.m_html_body_code + this.startString();

            this.m_html_body_code = this.m_html_body_code + this.bodyEventReservation();

            this.m_html_body_code = this.m_html_body_code + this.endString();  

            return;
        }

        this.m_html_body_code = this.m_html_body_code + this.startString();

        this.m_html_body_code = this.m_html_body_code + this.setXml();

        this.m_html_body_code = this.m_html_body_code + this.startTableTbody();

        if (this.m_layout_file_case == "AddReservation")
        {
            this.m_html_body_code = this.m_html_body_code + this.divSearchTrTd();

            this.m_html_body_code = this.m_html_body_code + this.divSelectConcertTrTd();

            this.m_html_body_code = this.m_html_body_code + this.paragraphDisplayEventTrTd();
        }
        else if (this.m_layout_file_case == "SearchReservation")
        {
            this.m_html_body_code = this.m_html_body_code + this.divSearchTrTd();
            
            this.m_html_body_code = this.m_html_body_code + this.paragraphDisplayEventTrTd();
        }
        else if (this.m_layout_file_case == "MakeReservation")
        {
            this.m_html_body_code = this.m_html_body_code + this.paragraphDisplayEventTrTd();
        }
        else if (this.m_layout_file_case == "ShowLayout")
        {
            this.m_html_body_code = this.m_html_body_code + this.paragraphDisplayEventTrTd();
        }

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

        xml_str = xml_str + LayoutHtmlFiles.tab(2) + '<script>' + LayoutHtmlFiles.endRow();

        if (!g_remove_tabs_comments)
        {
            xml_str = xml_str + LayoutHtmlFiles.tab(3) + '// XML file defining the layout of the concert premises' + LayoutHtmlFiles.endRow();

            //QQ xml_str = xml_str + LayoutHtmlFiles.tab(3) + '// This global variable was previously defined in the file ReservationSalmen.js' + LayoutHtmlFiles.endRow();
    
            //QQ xml_str = xml_str + LayoutHtmlFiles.tab(3) + '// This file ReservationSalmen.js is no longer included in the <head> section' + LayoutHtmlFiles.endRow();
        }

        xml_str = xml_str + LayoutHtmlFiles.tab(3) + 'g_url_file_layout_xml = "XML/' + this.m_output_dir + '.xml";' + LayoutHtmlFiles.endRow();

        xml_str = xml_str + LayoutHtmlFiles.tab(2) + '</script>' + LayoutHtmlFiles.endRow();

        xml_str = xml_str +  LayoutHtmlFiles.endRow();

        return xml_str;

    } // setXml

    divSearch()
    {
        return LayoutHtmlFiles.tab(4) + '<div id="id_reservation_search_seats">Section (division) search seats </div>'  + LayoutHtmlFiles.endRow();
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
        return LayoutHtmlFiles.tab(4) + '<div id="id_reservation_select_concert">Section (division) select event </div>'  + LayoutHtmlFiles.endRow();
    }

    divSelectConcertTrTd()
    {
        var ret_select_concert = '';

        ret_select_concert = ret_select_concert + this.startTrTd();

        ret_select_concert = ret_select_concert + this.divSelectConcert();

        ret_select_concert = ret_select_concert + this.endTrTd();

        return ret_select_concert;

    } // divSelectConcertTrTd

    paragraphDisplayEvent()
    {
        return LayoutHtmlFiles.tab(4) + '<p id="id_reservation_show_concert_date_band" '+ 
		' align="center" style="font-family: Arial; font:bold; font-size:22pt; height:40px; width:900px; '+
        ' color:red; background-color: black; margin-bottom:0px;  border: 0px none black; padding:0px;"' +
		'>Paragraph display event</p>'  + LayoutHtmlFiles.endRow();
    }

    paragraphDisplayEventTrTd()
    {
        var ret_display_event = '';

        ret_display_event = ret_display_event + this.startTrTd();

        ret_display_event = ret_display_event + this.paragraphDisplayEvent();

        ret_display_event = ret_display_event + this.endTrTd();

        return ret_display_event;

    } // paragraphDisplayEventTrTd

    layoutSvgTrTd()
    {
        var ret_svg = '';

        var layout_svg = new LayoutSvg(this.m_layout_xml, this.m_button_id_array);

        var layout_svg_code = layout_svg.get() + LayoutHtmlFiles.endRow();

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

        ret_sponsors_image = ret_sponsors_image + ' alt="Sponsoren" ' + size_str + '>' + LayoutHtmlFiles.endRow();

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

        ret_sponsors_str = ret_sponsors_str +  LayoutHtmlFiles.tab(4) + image_str;

        // Was 'always' here but should be changed to own element only for MakeReservation
        ret_sponsors_str = ret_sponsors_str +  LayoutHtmlFiles.tab(4) + this.divCloseWindowText();

        ret_sponsors_str = ret_sponsors_str + this.endTrTd();

        return ret_sponsors_str;

    } // imageSponsorsTrTd


    divCloseWindowText()
    {
        return '<div id="id_reservation_close_window_text"> </div>' + LayoutHtmlFiles.endRow();
    }

    bodyReservationPrint()
    {
        return LayoutHtmlFiles.tab(4) + '<script language="JavaScript">document.write(mainReservationCards())</script>' + LayoutHtmlFiles.endRow();

    } // bodyReservationPrint

    bodyEventReservation()
    {
        return LayoutHtmlFiles.tab(3) + '<div id= "id_div_container_input_event_reservation"></div>' + LayoutHtmlFiles.endRow() + LayoutHtmlFiles.endRow();

    } // bodyEventReservation

    bodyReservationList()
    {
        var ret_list = '';

        ret_list = ret_list + LayoutHtmlFiles.tab(4) + '<font face="Arial">' + LayoutHtmlFiles.endRow();

        ret_list = ret_list + LayoutHtmlFiles.tab(4) + '<script language="JavaScript">document.write(getAllReservationsHtml())</script>' + LayoutHtmlFiles.endRow();

        ret_list = ret_list + LayoutHtmlFiles.tab(4) + '</font>'+ LayoutHtmlFiles.endRow();

        return ret_list;

    } // bodyReservationList

    startString()
    {
        // TODO Investigatehow ('Salmen') is used
        var salmen_str = "('Salmen')";

        // Please note Main and main
        var onload_make_reservation_str =   'onload="Main' + this.m_layout_file_case + '()" ';
        var onload_show_layout_str =        'onload="main' + this.m_layout_file_case + '()" ';
        var onload_add_reservation_str =    'onload="Main' + this.m_layout_file_case + salmen_str + '"';
        var onload_search_reservation_str = 'onload="main' + this.m_layout_file_case + salmen_str + '"';
        var onload_event_reservation_str =  'onload="main' + this.m_layout_file_case + '()" ';


        if (this.m_layout_file_case == "MakeReservation" )
        {
            return LayoutHtmlFiles.tab(1) + '<body style= "background-color:#dfe0e1" ' + onload_make_reservation_str + ' scrolling="auto">' + LayoutHtmlFiles.endRow();
        }
        if (this.m_layout_file_case == "ShowLayout" )
        {
            return LayoutHtmlFiles.tab(1) + '<body style= "background-color:#dfe0e1" ' + onload_show_layout_str + ' scrolling="auto">' + LayoutHtmlFiles.endRow();
        }
        else if (this.m_layout_file_case == "AddReservation" )
        {
            return LayoutHtmlFiles.tab(1) + '<body style= "background-color:#dfe0e1" ' + onload_add_reservation_str + ' scrolling="auto">' + LayoutHtmlFiles.endRow();
        }
        else if (this.m_layout_file_case == "SearchReservation" )
        {
            return LayoutHtmlFiles.tab(1) + '<body style= "background-color:#dfe0e1" ' + onload_search_reservation_str + ' scrolling="auto">' + LayoutHtmlFiles.endRow();
        }
        else if (this.m_layout_file_case == "ReservationPrint" )
        {
            return LayoutHtmlFiles.tab(1) + '<body>' + LayoutHtmlFiles.endRow();
        }
        else if (this.m_layout_file_case == "ReservationList" )
        {
            return LayoutHtmlFiles.tab(1) + '<body>' + LayoutHtmlFiles.endRow();
        }
        else if (this.m_layout_file_case == 'EventReservation')
        {
            return LayoutHtmlFiles.tab(1) + '<body style= "background-color:#dfe0e1" ' + onload_event_reservation_str + ' scrolling="auto">' + LayoutHtmlFiles.endRow() + LayoutHtmlFiles.endRow();
        }
        else
        {
            alert("LayoutBody.startString Not an implemented case= " + this.m_layout_file_case);
        }

    } // startString

    endString()
    {
        return LayoutHtmlFiles.tab(1) + '</body>' + LayoutHtmlFiles.endRow();
        
    } // endString

    startTableTbody()
    {
        return  LayoutHtmlFiles.tab(2) + '<table><tbody>'  +  LayoutHtmlFiles.endRow();
    }

    endTableTbody()
    {
        return  LayoutHtmlFiles.tab(2) + '</tbody></table>'  +  LayoutHtmlFiles.endRow();
    }    

    startTrTd()
    {
        return  LayoutHtmlFiles.tab(3) + '<tr><td>'  +  LayoutHtmlFiles.endRow();
    }

    endTrTd()
    {
        return  LayoutHtmlFiles.tab(3) + '</td></tr>'  +  LayoutHtmlFiles.endRow();
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

       // All HTML code from this class
       this.m_html_script_code = ''; 

       // Create (construct) the HTML code
       this.execute();

    } // constructor

    // Create (construct) the HTML code for the body section <head>
    execute()
    {
        this.m_html_script_code = '';

        this.m_html_script_code = this.m_html_script_code + this.addIncludeJavaScripts();

        this.m_html_script_code = this.m_html_script_code + LayoutHtmlFiles.endRow();

        this.m_html_script_code = this.m_html_script_code + this.noScript();

        this.m_html_script_code = this.m_html_script_code + this.setEventFunctions();

        this.m_html_script_code = this.m_html_script_code + this.setTotalAvailableNumberOfSeats();

        this.m_html_script_code = this.m_html_script_code + this.mainFunction();

        this.m_html_script_code = this.m_html_script_code + this.tempEventMouse();

        this.m_html_script_code = this.m_html_script_code + this.tempMainFunction();

    } // execute

    // The links are full URLs to https://jazzliveaarau.ch/Reservation/scripts/
    // TODO 
    // The file ReservationPremises.js is only because there there is one global
    // variable g_wall_thickness defined there that the file ReservationEvents.js 
    // needs to calculate other global variables. All these global variables are
    // not needed. They should be removed in ReservationEvents.js .
    // There is also another global variable g_scale_dimension that is used
    // and should be removed in file reservation.js
    // Please not that the file ReservationPremises must preced ReservationEvents
    // because g_wall_thickness gets ot value in ReservationPremises.xml
    addIncludeJavaScripts()
    {
        var ret_include_str = '';

        if (g_add_temporary_test_functions)
        {
            ret_include_str = ret_include_str + LayoutHtmlFiles.tab(2) + '<!-- Included external Javascripts   -->' + LayoutHtmlFiles.endRow();
            ret_include_str = ret_include_str + LayoutHtmlFiles.tab(2) + '<!-- No files included because temporary test functions are defined  -->' + LayoutHtmlFiles.endRow();

            return ret_include_str;
        }

        var path_file_array = [];

        if (this.m_layout_file_case == 'MakeReservation' )
        {
            path_file_array = this.getPathFileArrayMakeAddSeachReservation();
        }
        else if (this.m_layout_file_case == 'ShowLayout' )
        {
            //path_file_array = this.getPathFileArrayShowLayout();
            path_file_array = this.getPathFileArrayMakeAddSeachReservation();
        }
        else if (this.m_layout_file_case == 'AddReservation' )
        {
            path_file_array = this.getPathFileArrayMakeAddSeachReservation();
        }
        else if (this.m_layout_file_case == 'SearchReservation' )
        {
            path_file_array = this.getPathFileArrayMakeAddSeachReservation();
        }
        else if (this.m_layout_file_case == 'ReservationPrint' )
        {
            path_file_array = this.getPathFileArrayPrintListReservation();
        }
        else if (this.m_layout_file_case == 'ReservationList' )
        {
            path_file_array = this.getPathFileArrayPrintListReservation();
        }
        else if (this.m_layout_file_case == 'EventReservation')
        {
            path_file_array = this.getPathFileArrayEventReservation();

            /*QQQQQQ
            path_file_array[ 0] = 'https://jazzliveaarau.ch/ReservationLayout/Scripts/InputEventReservation.js';
            path_file_array[ 1] = 'https://jazzliveaarau.ch/ReservationLayout/Scripts/InputEventReservationIdElement.js';
            path_file_array[ 2] = 'https://jazzliveaarau.ch/ReservationLayout/Scripts/InputEventReservationStyle.js';
            path_file_array[ 3] = 'https://jazzliveaarau.ch/ReservationLayout/Scripts/InputEventReservationText.js';
            path_file_array[ 4] = 'https://jazzliveaarau.ch/ReservationLayout/Scripts/EventProgramDropdown.js';
            path_file_array[ 5] = 'https://jazzliveaarau.ch/ReservationLayout/Scripts/EventProgramXml.js';
            path_file_array[ 6] = 'https://jazzliveaarau.ch/ReservationLayout/Scripts/Reservation/ReservationData.js';
            path_file_array[ 7] = 'https://jazzliveaarau.ch/ReservationLayout/Scripts/Reservation/ReservationStorage.js';
            path_file_array[ 8] = 'https://jazzliveaarau.ch/ReservationLayout/Scripts/Reservation/ReservationOpen.js';
            path_file_array[ 9] = 'https://jazzliveaarau.ch/ReservationLayout/Scripts/Reservation/UtilUrl.js';
            path_file_array[10] = 'https://jazzliveaarau.ch/ReservationLayout/Scripts/Reservation/DefaultText.js';
            path_file_array[11] = 'https://jazzliveaarau.ch/ReservationLayout/Scripts/Reservation/ReservationDataText.js';
            path_file_array[12] = 'https://jazzliveaarau.ch/JazzScripts/Utils_20241111.js';
            path_file_array[13] = 'https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js';
            QQQQQ */
        }
        else
        {
            alert("LayoutScript.execute Not an implemented case= " + this.m_layout_file_case);

            return;            
        }

        ret_include_str = ret_include_str + LayoutHtmlFiles.tab(2) + '<!-- Included external Javascripts   -->' + LayoutHtmlFiles.endRow();

        var n_scripts = path_file_array.length;

        for (var index_file=0; index_file < n_scripts; index_file++)
        {
            var path_file = path_file_array[index_file];

            ret_include_str = ret_include_str + LayoutHtmlFiles.tab(2) + LayoutScript.startString(path_file);

            ret_include_str = ret_include_str + LayoutScript.endString() + LayoutHtmlFiles.endRow();
        }

        return ret_include_str;
        
    } // addIncludeJavaScripts

    // Returns the path file array for the cases MakeReservation, AddReservation and SearchReservation
    getPathFileArrayMakeAddSeachReservation()
    {
        var ret_path_file_array = [];

        ret_path_file_array.push('Libs/ControlModalPopup.js');

        //QQ ret_path_file_array.push('Libs/CoronaForm.js');

        ret_path_file_array.push('Libs/DisplayNames.js');

        ret_path_file_array.push('Libs/Reservation.js');

        ret_path_file_array.push('Libs/MakeReservation.js');

        ret_path_file_array.push('Libs/ReservationConcerts.js');

        ret_path_file_array.push('Libs/ReservationEvents.js');

        ret_path_file_array.push('Libs/ReservationFiles.js');

        ret_path_file_array.push('Libs/ReservationSearch.js');

        ret_path_file_array.push('Libs/ReservationStrings.js');

        ret_path_file_array.push('Libs/ReservationEventXml.js');

        ret_path_file_array.push('Libs/EventProgramXml.js');

        ret_path_file_array.push('Libs/UtilDate_20250330.js');

        ret_path_file_array.push('Libs/UtilPayment_20240205.js');

        ret_path_file_array.push('https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js');

        return ret_path_file_array;

    } // getPathFileArrayMakeAndAddReservation

    // Returns the path file array for the case EventReservation
    getPathFileArrayEventReservation()
    {
        var ret_path_file_array = [];

        ret_path_file_array.push('Libs/InputEventReservation.js');

        ret_path_file_array.push('Libs/InputEventReservationIdElement.js');

        ret_path_file_array.push('Libs/InputEventReservationStyle.js');

        ret_path_file_array.push('Libs/InputEventReservationText.js');

        ret_path_file_array.push('Libs/EventProgramDropdown.js');

        ret_path_file_array.push('Libs/EventProgramXml.js');

        ret_path_file_array.push('Libs/ReservationData.js');

        ret_path_file_array.push('Libs/ReservationStorage.js');

        ret_path_file_array.push('Libs/ReservationOpen.js');

        ret_path_file_array.push('Libs/MakeReservation.js');

        ret_path_file_array.push('Libs/UtilUrl.js');

        ret_path_file_array.push('Libs/DefaultText.js');

        ret_path_file_array.push('Libs/ReservationDataText.js');

        ret_path_file_array.push('Libs/UtilDate_20250330.js');

        ret_path_file_array.push('Libs/UtilServer_20250102.js');

        ret_path_file_array.push('Libs/UtilString_20240106.js');

        ret_path_file_array.push('https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js');

        return ret_path_file_array;

    } // getPathFileArrayEventReservation

    // Returns the path file array for the cases PrintResrvation and ListReservation
    getPathFileArrayPrintListReservation()
    {
        var ret_path_file_array = [];

        ret_path_file_array.push('Libs/Reservation.js');

        ret_path_file_array.push('Libs/ReservationFiles.js');

        return ret_path_file_array;

    } // getPathFileArrayPrintListReservation

    // Returns the path file array for the cases MakeReservation, AddReservation and SearchReservation
    getPathFileArrayShowLayout()
    {
        var ret_path_file_array = [];

        ret_path_file_array.push('Libs/Reservation.js');

        ret_path_file_array.push('Libs/ReservationEvents.js');

        return ret_path_file_array;

    } // getPathFileArrayShowLayout

    tempEventMouse()
    {
        var event_str = '';

        if (this.m_layout_file_case == 'MakeReservation' || this.m_layout_file_case == 'AddReservation' || this.m_layout_file_case == 'SearchReservation')
        {
            if (!g_add_temporary_test_functions)
            {
                return event_str;
            }

            event_str = event_str + LayoutHtmlFiles.tab(2) + '<script>' + LayoutHtmlFiles.endRow(); 

            event_str = event_str + LayoutHtmlFiles.tab(3) + '// This function is temporarely defined here for testing. QQQQQQQQQQQQQQQQQQQQQQQQQQ' + LayoutHtmlFiles.endRow();  

            event_str = event_str + LayoutHtmlFiles.tab(3) + '// The function EventMouseDown is defined in ReservationEvents.js' + LayoutHtmlFiles.endRow();  
            
            event_str = event_str + LayoutHtmlFiles.tab(3) + '// Event: User clicked the circle' + LayoutHtmlFiles.endRow();  

            event_str = event_str + LayoutHtmlFiles.tab(3) + 'function EventMouseDown(i_table_number, i_seat_char)' + LayoutHtmlFiles.endRow();  

            event_str = event_str + LayoutHtmlFiles.tab(3) + '{' + LayoutHtmlFiles.endRow();  

            event_str = event_str + LayoutHtmlFiles.tab(4) + 'alert("Table= " + i_table_number.toString() + " i_seat_char= " + i_seat_char);' + LayoutHtmlFiles.endRow();  

            // event_str = event_str + LayoutHtmlFiles.tab(4) + 'if (g_user_is_concert_visitor == "true")' + LayoutHtmlFiles.endRow();  

            // event_str = event_str + LayoutHtmlFiles.tab(4) + '{' + LayoutHtmlFiles.endRow();  

            // event_str = event_str + LayoutHtmlFiles.tab(5) + 'EventMouseDownConcertVisitor(i_table_number, i_seat_char);' + LayoutHtmlFiles.endRow();  

            // event_str = event_str + LayoutHtmlFiles.tab(4) + '}' + LayoutHtmlFiles.endRow();  

            // event_str = event_str + LayoutHtmlFiles.tab(4) + 'else' + LayoutHtmlFiles.endRow();  

            // event_str = event_str + LayoutHtmlFiles.tab(4) + '{' + LayoutHtmlFiles.endRow();  

            // event_str = event_str + LayoutHtmlFiles.tab(5) + 'EventMouseDownAdministrator(i_table_number, i_seat_char);' + LayoutHtmlFiles.endRow();  

            // event_str = event_str + LayoutHtmlFiles.tab(4) + '}' + LayoutHtmlFiles.endRow();  

            event_str = event_str + LayoutHtmlFiles.tab(3) + '} // EventMouseDown' + LayoutHtmlFiles.endRow();  

            event_str = event_str + LayoutHtmlFiles.tab(2) + '</script>' + LayoutHtmlFiles.endRow();  

            event_str = event_str + LayoutHtmlFiles.endRow();  
        }
        else if (this.m_layout_file_case == 'ShowLayout' )
        {
            // No event functions
        }
        else if (this.m_layout_file_case == 'ReservationPrint' || this.m_layout_file_case == 'ReservationList')
        {
            // No event functions
        }
        else if (this.m_layout_file_case == 'EventReservation' )
        {
            // No event functions
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

        var only_mouse_down = true;
		
        if (this.m_layout_file_case == 'MakeReservation' || this.m_layout_file_case == 'AddReservation' || this.m_layout_file_case == 'SearchReservation')
        {
            set_event_str = set_event_str + LayoutHtmlFiles.tab(2) + '<script>' + LayoutHtmlFiles.endRow(); 

            if (!g_remove_tabs_comments)
            {
                set_event_str = set_event_str + LayoutHtmlFiles.tab(3) + '// Geometry is with SVG defined. The circles with the element <circle>' + LayoutHtmlFiles.endRow();  

                set_event_str = set_event_str + LayoutHtmlFiles.tab(3) + '// An event function cannot be added like in HTML with onmousedown = "myEvent". ' + LayoutHtmlFiles.endRow();  
    
                set_event_str = set_event_str + LayoutHtmlFiles.tab(3) + '// An event function to the <circle> element can only be added with JavaScript, i.e. ' + LayoutHtmlFiles.endRow();  
    
                set_event_str = set_event_str + LayoutHtmlFiles.tab(3) + '// when the <circle> exists as an object. This function adds the event functions. ' + LayoutHtmlFiles.endRow();  
    
                set_event_str = set_event_str + LayoutHtmlFiles.tab(3) + '// There is one event function for each <circle>. These functions are also defined in this section. ' + LayoutHtmlFiles.endRow(); 
    
                set_event_str = set_event_str + LayoutHtmlFiles.tab(3) + '// These functions were previously defined in the file  ReservationSalmenEvents.js' + LayoutHtmlFiles.endRow();  
            }

            set_event_str = set_event_str + LayoutHtmlFiles.tab(3) + 'function setEventFunctions()' + LayoutHtmlFiles.endRow();  

            set_event_str = set_event_str + LayoutHtmlFiles.tab(3) + '{' + LayoutHtmlFiles.endRow();  

            set_event_str = set_event_str + this.setMouseDownMouseOver(only_mouse_down);

            set_event_str = set_event_str + LayoutHtmlFiles.tab(3) + '}' + LayoutHtmlFiles.endRow();  

            set_event_str = set_event_str + this.getSeatEventFunctions(only_mouse_down);

            set_event_str = set_event_str + LayoutHtmlFiles.tab(2) + '</script>' + LayoutHtmlFiles.endRow();  

            set_event_str = set_event_str + LayoutHtmlFiles.endRow();  
        }
        else if (this.m_layout_file_case == 'ShowLayout' )
        {
            set_event_str = set_event_str + LayoutHtmlFiles.tab(2) + '<script>' + LayoutHtmlFiles.endRow(); 

            if (!g_remove_tabs_comments)
            {
                set_event_str = set_event_str + LayoutHtmlFiles.tab(3) + '// The function setEventFunctions must probably not be defined for vase ShowLayout. TODO' + LayoutHtmlFiles.endRow(); 
            }  

            set_event_str = set_event_str + LayoutHtmlFiles.tab(3) + 'function setEventFunctions()' + LayoutHtmlFiles.endRow();  

            set_event_str = set_event_str + LayoutHtmlFiles.tab(3) + '{' + LayoutHtmlFiles.endRow();  

            // No events set_event_str = set_event_str + this.setMouseDownMouseOver(only_mouse_down);  

            set_event_str = set_event_str + LayoutHtmlFiles.tab(3) + '}' + LayoutHtmlFiles.endRow();  

            set_event_str = set_event_str + LayoutHtmlFiles.tab(2) + '</script>' + LayoutHtmlFiles.endRow();  

            // No events set_event_str = set_event_str + this.getSeatEventFunctions(only_mouse_down);

            set_event_str = set_event_str + LayoutHtmlFiles.endRow();  
        }
        else if (this.m_layout_file_case == 'ReservationPrint' || this.m_layout_file_case == 'ReservationList')
        {
            set_event_str = ''; 
        }
        else if (this.m_layout_file_case == 'EventReservation')
        {
            set_event_str = ''; 
        }
        else
        {
            alert("LayoutScript.setEventFunctions A not yet implemented file case m_layout_file_case= " + this.m_layout_file_case);
        }

        return set_event_str;

    } // setEventFunctions

    // Returns the statements that add event functions to the seats (circles)
    // With SVG it is not possible to add onmousedown in the <circle> statement.
    // It must be added 
    setMouseDownMouseOver(i_only_mouse_down)
    {
        var seat_data_array =  getAllTablesSeatDataArray(this.m_layout_xml);

        var n_seats = seat_data_array.length;

        var add_event_str = '';

        var n_used_seats = 0;

        for (var index_cir = 0;  index_cir < n_seats; index_cir++)
        {
            var seat_data = seat_data_array[index_cir];

            var id_cir_str = seat_data.getCircleId();

            var b_create = seat_data.getCreateSeat();

            if (b_create)
            {
                var mouse_down_fctn_str = "document.getElementById('" + id_cir_str + "').onmousedown = function() {mouseDown" + id_cir_str + "()};";
                
                add_event_str = add_event_str + LayoutHtmlFiles.tab(4) + mouse_down_fctn_str  + LayoutHtmlFiles.endRow();  


                if (!i_only_mouse_down)
                {
                    var mouse_over_fctn_str = "document.getElementById('" + id_cir_str + "').onmouseover = function() {mouseOver" + id_cir_str + "()};";
                    
                    add_event_str = add_event_str + LayoutHtmlFiles.tab(4) + mouse_over_fctn_str  + LayoutHtmlFiles.endRow();  
                }

                n_used_seats = n_used_seats + 1;
            }

        } // index_cir

        debugReservationLayout('LayoutScript.setMouseDownMouseOver  Number of seats is ' + n_used_seats.toString());

        return add_event_str;

    } // setMouseDownMouseOver

    getSeatEventFunctions(i_only_mouse_down)
    {
        var seat_data_array =  getAllTablesSeatDataArray(this.m_layout_xml);

        var n_seats = seat_data_array.length;

        var functions_str = "";

        for (var index_cir = 0;  index_cir < n_seats; index_cir++)
        {
            var seat_data = seat_data_array[index_cir];

            var table_number = seat_data.getRowOrTableNumber();

            var seat_char = seat_data.getSeatNumberOrChar();

            var id_cir_str = seat_data.getCircleId();

            var b_create = seat_data.getCreateSeat();

            if (b_create)
            {
                var fctn_mouse_down_row_1 = "function mouseDown"+ id_cir_str + "()";
                var fctn_mouse_down_row_2 = "{";
                var fctn_mouse_down_row_3 = "var table_number = " + table_number + ";";
                var fctn_mouse_down_row_4 = "var seat_char = \"" + seat_char + "\";";
                var fctn_mouse_down_row_5 = "EventMouseDown(table_number, seat_char);";
                var fctn_mouse_down_row_6 = "}";
    
                functions_str = functions_str + LayoutHtmlFiles.tab(3) + fctn_mouse_down_row_1;  
                functions_str = functions_str + fctn_mouse_down_row_2;  
                functions_str = functions_str + fctn_mouse_down_row_3;  
                functions_str = functions_str + fctn_mouse_down_row_4;  
                functions_str = functions_str + fctn_mouse_down_row_5;  
                functions_str = functions_str + fctn_mouse_down_row_6 + LayoutHtmlFiles.endRow();
    
    
                if (!i_only_mouse_down)
                {
                    var fctn_mouse_over_row_1 = "function mouseOver"+ id_cir_str + "()";
                    var fctn_mouse_over_row_2 = "{";
                    var fctn_mouse_over_row_3 = "var table_number = " + table_number + ";";
                    var fctn_mouse_over_row_4 = "var seat_char = \"" + seat_char + "\";";
                    var fctn_mouse_over_row_5 = "EventMouseOver(table_number, seat_char);";
                    var fctn_mouse_over_row_6 = "}";
                    
                    functions_str = functions_str + LayoutHtmlFiles.tab(3) + fctn_mouse_over_row_1;  
                    functions_str = functions_str + fctn_mouse_over_row_2;  
                    functions_str = functions_str + fctn_mouse_over_row_3;  
                    functions_str = functions_str + fctn_mouse_over_row_4;  
                    functions_str = functions_str + fctn_mouse_over_row_5;  
                    functions_str = functions_str + fctn_mouse_over_row_6 + LayoutHtmlFiles.endRow();  
                }
            }
        
        } // index_cir

        return functions_str;

    } // setMouseDownMouseOver

    // Returns a string defining a JavaScript function that returns the total number of available seats
    setTotalAvailableNumberOfSeats()
    {
        var ret_total_str = '';

        if (this.m_layout_file_case == 'MakeReservation' || this.m_layout_file_case == 'AddReservation' || this.m_layout_file_case == 'SearchReservation')
        {
            var seat_data_array =  getAllTablesSeatDataArray(this.m_layout_xml);

            var n_seats = seat_data_array.length;

            ret_total_str += LayoutHtmlFiles.tab(2) + '<script>' + LayoutHtmlFiles.endRow();  

            ret_total_str += LayoutHtmlFiles.tab(3) + 'function getTotalNumberOfAvailableSeats()' + LayoutHtmlFiles.endRow();  

            ret_total_str += LayoutHtmlFiles.tab(3) + '{' + LayoutHtmlFiles.endRow();  

            ret_total_str += LayoutHtmlFiles.tab(4) + 'return ' + n_seats.toString() + ';' + LayoutHtmlFiles.endRow();  

            ret_total_str += LayoutHtmlFiles.tab(3) + '}' + LayoutHtmlFiles.endRow();  

            ret_total_str += LayoutHtmlFiles.tab(2) + '</script>' + LayoutHtmlFiles.endRow();  
        }

        return ret_total_str;

    } // setTotalAvailableNumberOfSeats

    tempMainComments()
    {
        var ret_comments = '';

        ret_comments = ret_comments + LayoutHtmlFiles.tab(3) + '// Main (onload) function for MakeReservation. Temporary for test here. QQQQQQQQQQQQQ' + LayoutHtmlFiles.endRow();  

        ret_comments = ret_comments + LayoutHtmlFiles.tab(3) + '// The function is defined in file Reservation.js included in <head>' + LayoutHtmlFiles.endRow(); 

        ret_comments = ret_comments + LayoutHtmlFiles.tab(3) + '// So the function is defined two times and must be deleted before use' + LayoutHtmlFiles.endRow(); 

        return ret_comments;
    }

    tempMainFunction()
    {
        var main_temp_str = '';

        if (!g_add_temporary_test_functions)
        {
            return main_temp_str;
        }
		
        if (this.m_layout_file_case == 'MakeReservation' )
        {
            main_temp_str = main_temp_str + LayoutHtmlFiles.tab(2) + '<script>' + LayoutHtmlFiles.endRow(); 
            
            main_temp_str = main_temp_str + this.tempMainComments();

            main_temp_str = main_temp_str + LayoutHtmlFiles.tab(3) + 'function MainMakeReservation()' + LayoutHtmlFiles.endRow();  

            main_temp_str = main_temp_str + LayoutHtmlFiles.tab(3) + '{' + LayoutHtmlFiles.endRow();  

            main_temp_str = main_temp_str + LayoutHtmlFiles.tab(4) + 'alert("MainMakeReservation Enter g_url_file_layout_xml= " + g_url_file_layout_xml);' + LayoutHtmlFiles.endRow();  

            main_temp_str = main_temp_str + LayoutHtmlFiles.tab(4) + 'setEventFunctions();'

            main_temp_str = main_temp_str + LayoutHtmlFiles.tab(3) + '}' + LayoutHtmlFiles.endRow();  

            main_temp_str = main_temp_str + LayoutHtmlFiles.tab(2) + '</script>' + LayoutHtmlFiles.endRow();  

            main_temp_str = main_temp_str + LayoutHtmlFiles.endRow();  
        }
        else if (this.m_layout_file_case == 'ShowLayout' )
        {
            main_temp_str = main_temp_str + LayoutHtmlFiles.tab(2) + '<script>' + LayoutHtmlFiles.endRow(); 
            
            main_temp_str = main_temp_str + this.tempMainComments();

            main_temp_str = main_temp_str + LayoutHtmlFiles.tab(3) + 'function mainShowLayout()' + LayoutHtmlFiles.endRow();  

            main_temp_str = main_temp_str + LayoutHtmlFiles.tab(3) + '{' + LayoutHtmlFiles.endRow();  

            main_temp_str = main_temp_str + LayoutHtmlFiles.tab(4) + '// alert("mainShowLayout Enter g_url_file_layout_xml= " + g_url_file_layout_xml);' + LayoutHtmlFiles.endRow();  

             main_temp_str = main_temp_str + LayoutHtmlFiles.tab(4) + '// No events setEventFunctions();'

            main_temp_str = main_temp_str + LayoutHtmlFiles.tab(3) + '}' + LayoutHtmlFiles.endRow();  

            main_temp_str = main_temp_str + LayoutHtmlFiles.tab(2) + '</script>' + LayoutHtmlFiles.endRow();  

            main_temp_str = main_temp_str + LayoutHtmlFiles.endRow();  
        }
        else if (this.m_layout_file_case == 'AddReservation' )
        {
            main_temp_str = main_temp_str + LayoutHtmlFiles.tab(2) + '<script>' + LayoutHtmlFiles.endRow(); 
            
            main_temp_str = main_temp_str + this.tempMainComments();

            main_temp_str = main_temp_str + LayoutHtmlFiles.tab(3) + 'function MainAddReservation(i_add_to_xml_file_name)' + LayoutHtmlFiles.endRow();  

            main_temp_str = main_temp_str + LayoutHtmlFiles.tab(3) + '{' + LayoutHtmlFiles.endRow();  

            main_temp_str = main_temp_str + LayoutHtmlFiles.tab(4) + '// alert("MainAddReservation Enter i_add_to_xml_file_name= " + i_add_to_xml_file_name);' + LayoutHtmlFiles.endRow();  

             main_temp_str = main_temp_str + LayoutHtmlFiles.tab(4) + 'setEventFunctions();'

            main_temp_str = main_temp_str + LayoutHtmlFiles.tab(3) + '}' + LayoutHtmlFiles.endRow();  

            main_temp_str = main_temp_str + LayoutHtmlFiles.tab(2) + '</script>' + LayoutHtmlFiles.endRow();  

            main_temp_str = main_temp_str + LayoutHtmlFiles.endRow();  
        }
        else if (this.m_layout_file_case == 'SearchReservation' )
        {
            main_temp_str = main_temp_str + LayoutHtmlFiles.tab(2) + '<script>' + LayoutHtmlFiles.endRow(); 
            
            main_temp_str = main_temp_str + this.tempMainComments();

            main_temp_str = main_temp_str + LayoutHtmlFiles.tab(3) + 'function mainSearchReservation(i_add_to_xml_file_name)' + LayoutHtmlFiles.endRow();  

            main_temp_str = main_temp_str + LayoutHtmlFiles.tab(3) + '{' + LayoutHtmlFiles.endRow();  

            main_temp_str = main_temp_str + LayoutHtmlFiles.tab(4) + '// alert("mainSearchReservation Enter i_add_to_xml_file_name= " + i_add_to_xml_file_name);' + LayoutHtmlFiles.endRow();  

             main_temp_str = main_temp_str + LayoutHtmlFiles.tab(4) + 'setEventFunctions();'

            main_temp_str = main_temp_str + LayoutHtmlFiles.tab(3) + '}' + LayoutHtmlFiles.endRow();  

            main_temp_str = main_temp_str + LayoutHtmlFiles.tab(2) + '</script>' + LayoutHtmlFiles.endRow();  

            main_temp_str = main_temp_str + LayoutHtmlFiles.endRow();  
        }
        else if (this.m_layout_file_case == 'ReservationPrint' || this.m_layout_file_case == 'ReservationList')
        {
            // No temporary main functions
            main_temp_str = '';
        }
        else if (this.m_layout_file_case == 'EventReservation')
        {
            // Notemporary main functions
            main_temp_str = '';
        }
        else
        {
            alert("LayoutScript.tempMainFunction A not yet implemented file case m_layout_file_case= " + this.m_layout_file_case);
        }

        return main_temp_str;

    } // tempMainFunction

    mainFunction()
    {
        var main_str = '';
		
        if (this.m_layout_file_case == 'MakeReservation' )
        {
            main_str = main_str + LayoutHtmlFiles.tab(2) + '<script>' + LayoutHtmlFiles.endRow(); 

            main_str = main_str + LayoutHtmlFiles.tab(3) + 'var g_reservation_language = "german"; // or english or swedish' + LayoutHtmlFiles.endRow();

            main_str = main_str + LayoutHtmlFiles.tab(1) + '' + LayoutHtmlFiles.endRow();

            main_str = main_str + LayoutHtmlFiles.tab(2) + '</script>' + LayoutHtmlFiles.endRow();  

            main_str = main_str + LayoutHtmlFiles.endRow(); 
        }
        else if (this.m_layout_file_case == 'ShowLayout' )
        {
           main_str = '';
        }
        else if (this.m_layout_file_case == 'AddReservation' )
        {
            main_str = main_str + LayoutHtmlFiles.tab(2) + '<script>' + LayoutHtmlFiles.endRow(); 

            main_str = main_str + LayoutHtmlFiles.tab(3) + 'var g_reservation_language = "german"; // or english or swedish' + LayoutHtmlFiles.endRow();

            main_str = main_str + LayoutHtmlFiles.tab(1) + '' + LayoutHtmlFiles.endRow();

            main_str = main_str + LayoutHtmlFiles.tab(2) + '</script>' + LayoutHtmlFiles.endRow();  

            main_str = main_str + LayoutHtmlFiles.endRow(); 
        }
        else if (this.m_layout_file_case == 'SearchReservation' )
        {
            main_str = main_str + LayoutHtmlFiles.tab(2) + '<script>' + LayoutHtmlFiles.endRow(); 

            main_str = main_str + LayoutHtmlFiles.tab(3) + 'var g_reservation_language = "german"; // or english or swedish' + LayoutHtmlFiles.endRow();

            main_str = main_str + LayoutHtmlFiles.tab(1) + '' + LayoutHtmlFiles.endRow();

            main_str = main_str + LayoutHtmlFiles.tab(2) + '</script>' + LayoutHtmlFiles.endRow();  

            main_str = main_str + LayoutHtmlFiles.endRow(); 
        }
        else if (this.m_layout_file_case == 'ReservationPrint' || this.m_layout_file_case == 'ReservationList')
        {
            // No main function
            main_str = '';
        }
        else if (this.m_layout_file_case == 'EventReservation')
        {
            main_str = main_str + LayoutHtmlFiles.tab(2) + '<script>' + LayoutHtmlFiles.endRow(); 

            main_str = main_str + LayoutHtmlFiles.tab(1) + '' + LayoutHtmlFiles.endRow();

            main_str = main_str + LayoutHtmlFiles.tab(3) + 'var g_event_program_xml = null;' + LayoutHtmlFiles.endRow();

            main_str = main_str + LayoutHtmlFiles.tab(1) + '' + LayoutHtmlFiles.endRow();

            main_str = main_str + LayoutHtmlFiles.tab(3) + 'var g_input_event_reservation = null;' + LayoutHtmlFiles.endRow();

            main_str = main_str + LayoutHtmlFiles.tab(1) + '' + LayoutHtmlFiles.endRow();

            main_str = main_str + LayoutHtmlFiles.tab(3) + 'var g_reservation_language = "german"; // or english or swedish' + LayoutHtmlFiles.endRow();

            main_str = main_str + LayoutHtmlFiles.tab(1) + '' + LayoutHtmlFiles.endRow();

            main_str = main_str + LayoutHtmlFiles.tab(3) + 'function mainEventReservation()' + LayoutHtmlFiles.endRow();

            main_str = main_str + LayoutHtmlFiles.tab(3) + '{' + LayoutHtmlFiles.endRow();

            main_str = main_str + LayoutHtmlFiles.tab(4) + 'var subdir_xml = "./SaisonXML";' + LayoutHtmlFiles.endRow();

            main_str = main_str + LayoutHtmlFiles.tab(4) + 'var event_program_file_name = "EventProgram.xml";' + LayoutHtmlFiles.endRow();

            main_str = main_str + LayoutHtmlFiles.tab(4) + 'g_event_program_xml = new EventProgramXml(subdir_xml, event_program_file_name, callbackAfterLoadingEventProgram);' + LayoutHtmlFiles.endRow();
            
            main_str = main_str + LayoutHtmlFiles.tab(3) + '}' + LayoutHtmlFiles.endRow();
            
            main_str = main_str + LayoutHtmlFiles.tab(4) + '' + LayoutHtmlFiles.endRow();

            main_str = main_str + LayoutHtmlFiles.tab(3) + 'function callbackAfterLoadingEventProgram()' + LayoutHtmlFiles.endRow();

            main_str = main_str + LayoutHtmlFiles.tab(3) + '{' + LayoutHtmlFiles.endRow();

            main_str = main_str + LayoutHtmlFiles.tab(4) + 
                'g_input_event_reservation = new InputEventReservation("id_div_container_input_event_reservation", g_event_program_xml, "g_input_event_reservation");' 
                + LayoutHtmlFiles.endRow();

            main_str = main_str + LayoutHtmlFiles.tab(4) + 'g_input_event_reservation.create();' + LayoutHtmlFiles.endRow();

            main_str = main_str + LayoutHtmlFiles.tab(1) + '' + LayoutHtmlFiles.endRow();

            main_str = main_str + LayoutHtmlFiles.tab(4) + '// g_input_event_reservation.dropdownSetDateFormatToSwiss();' + LayoutHtmlFiles.endRow();

            main_str = main_str + LayoutHtmlFiles.tab(4) + '// g_input_event_reservation.dropdownSetDateFormatToIso();' + LayoutHtmlFiles.endRow();

            main_str = main_str + LayoutHtmlFiles.tab(4) + '// g_input_event_reservation.dropdownSetDateFormatToIsoReverse();' + LayoutHtmlFiles.endRow();

            main_str = main_str + LayoutHtmlFiles.tab(4) + '// g_input_event_reservation.dropdownDisplayDateAndNameInDropdown();' + LayoutHtmlFiles.endRow();

            main_str = main_str + LayoutHtmlFiles.tab(4) + '// g_input_event_reservation.dropdownDisplayOnlyNameInDropdown();' + LayoutHtmlFiles.endRow();

            main_str = main_str + LayoutHtmlFiles.tab(3) + ' }' + LayoutHtmlFiles.endRow();

            main_str = main_str + LayoutHtmlFiles.tab(4) + '' + LayoutHtmlFiles.endRow();

            main_str = main_str + LayoutHtmlFiles.tab(2) + '</script>' + LayoutHtmlFiles.endRow();  

            main_str = main_str + LayoutHtmlFiles.endRow();  
        }
        else
        {
            alert("LayoutScript.mainFunction A not yet implemented file case m_layout_file_case= " + this.m_layout_file_case);
        }

        return main_str;

    } // mainFunction

  

    // Get all HTML code for the scripts of the header section <script>
    get()
    {
        return this.m_html_script_code;

    } // get

    noScript()
    {
        var no_script_str = '';

        no_script_str = no_script_str +  LayoutHtmlFiles.tab(2) + '<noscript>' + LayoutHtmlFiles.endRow();

        no_script_str =  no_script_str + LayoutHtmlFiles.tab(3) + 'Um den vollen Funktionsumfang dieser Webseite zu erfahren, benötigen Sie JavaScript.' + LayoutHtmlFiles.endRow();

        no_script_str = no_script_str +  LayoutHtmlFiles.tab(3) + 'Eine Anleitung wie Sie JavaScript in Ihrem Browser einschalten, befindet sich ' + LayoutHtmlFiles.endRow();

        no_script_str = no_script_str +  LayoutHtmlFiles.tab(3) + '<a href="http://www.enable-javascript.com/de/" target="_blank">hier</a>.' + LayoutHtmlFiles.endRow();

        no_script_str = no_script_str +  LayoutHtmlFiles.tab(2) + '</noscript>' + LayoutHtmlFiles.endRow();

        no_script_str = no_script_str +  LayoutHtmlFiles.endRow();

        return no_script_str;

    } // noScript

    static startString(i_path_file)
    {
        return '<script type="text/javascript" src= "' + i_path_file + '" >';

    } // startString

    static endString()
    {
        return '</script>'
        
    } // endString
    
} // LayoutScript

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Class Layout Script /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Class Layout Style ////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Class that creates the HTML code for the style section <style>
class LayoutStyle
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
       this.m_html_style_code = ''; 

       // Create (construct) the HTML code
       this.execute();

    } // constructor

    // Create (construct) the HTML code for the style section <style>
    execute()
    {

        this.m_html_style_code = ''; 

        if (this.m_layout_file_case != 'ReservationPrint')
        {
            return this.m_html_style_code;
        }

        this.m_html_style_code = this.m_html_style_code + LayoutHtmlFiles.tab(1) + LayoutStyle.startString() + LayoutHtmlFiles.endRow();

        this.m_html_style_code = this.m_html_style_code + this.print() + LayoutHtmlFiles.endRow();

        this.m_html_style_code = this.m_html_style_code + LayoutHtmlFiles.tab(1) + LayoutStyle.endString() + LayoutHtmlFiles.endRow();


    } // execute

    // Get all HTML code for the style section <style>
    get()
    {
        return this.m_html_style_code +  LayoutHtmlFiles.endRow();

    } // get


    // Returns style (css) statements for the print of cards
    print()
    {
        var print_str = '';
 
        print_str = print_str + LayoutHtmlFiles.tab(2) + '@media print' + LayoutHtmlFiles.endRow();
		
		print_str = print_str + LayoutHtmlFiles.tab(2) + '{' + LayoutHtmlFiles.endRow();
		
		print_str = print_str + LayoutHtmlFiles.tab(3) + '.page-break { display: block; page-break-before: always; }' + LayoutHtmlFiles.endRow();
		
		print_str = print_str + LayoutHtmlFiles.tab(2) + '}' + LayoutHtmlFiles.endRow();
		
		print_str = print_str + LayoutHtmlFiles.tab(2) + '@page' + LayoutHtmlFiles.endRow();
		
		print_str = print_str + LayoutHtmlFiles.tab(2) + '{' + LayoutHtmlFiles.endRow();
		
		print_str = print_str + LayoutHtmlFiles.tab(3) + 'margin-top: 0cm;' + LayoutHtmlFiles.endRow();
		
		print_str = print_str + LayoutHtmlFiles.tab(3) + 'margin-bottom: 0cm;' + LayoutHtmlFiles.endRow();
		
		print_str = print_str + LayoutHtmlFiles.tab(3) + 'margin-left: 0cm;' + LayoutHtmlFiles.endRow();
		
		print_str = print_str + LayoutHtmlFiles.tab(3) + 'margin-right: 0cm;' + LayoutHtmlFiles.endRow();
		
		print_str = print_str + LayoutHtmlFiles.tab(2) + '}' + LayoutHtmlFiles.endRow();
		
		print_str = print_str + LayoutHtmlFiles.tab(2) + '.jazz_live_aarau' + LayoutHtmlFiles.endRow();
		
		print_str = print_str + LayoutHtmlFiles.tab(2) + '{' + LayoutHtmlFiles.endRow();
		
		print_str = print_str + LayoutHtmlFiles.tab(3) + 'font-family: Arial, Helvetica, sans-serif;' + LayoutHtmlFiles.endRow();
		
		print_str = print_str + LayoutHtmlFiles.tab(3) + 'font-size: 18px;' + LayoutHtmlFiles.endRow();
		
		print_str = print_str + LayoutHtmlFiles.tab(3) + 'font-weight: bold;' + LayoutHtmlFiles.endRow();
		
		print_str = print_str + LayoutHtmlFiles.tab(3) + 'text-align: center;' + LayoutHtmlFiles.endRow();
		
		print_str = print_str + LayoutHtmlFiles.tab(3) + 'color: #ff0028;' + LayoutHtmlFiles.endRow();
		
		print_str = print_str + LayoutHtmlFiles.tab(2) + '}' + LayoutHtmlFiles.endRow();
		
		print_str = print_str + LayoutHtmlFiles.tab(2) + '.r_name ' + LayoutHtmlFiles.endRow();
		
		print_str = print_str + LayoutHtmlFiles.tab(2) + '{' + LayoutHtmlFiles.endRow();
		
		print_str = print_str + LayoutHtmlFiles.tab(2) + 'font-family: Arial, Helvetica, sans-serif;' + LayoutHtmlFiles.endRow();
		
		print_str = print_str + LayoutHtmlFiles.tab(3) + 'font-size: 24px;' + LayoutHtmlFiles.endRow();
		
		print_str = print_str + LayoutHtmlFiles.tab(3) + 'font-weight: bold;' + LayoutHtmlFiles.endRow();
		
		print_str = print_str + LayoutHtmlFiles.tab(3) + 'text-align: center;' + LayoutHtmlFiles.endRow();
		
		print_str = print_str + LayoutHtmlFiles.tab(3) + 'color: black;' + LayoutHtmlFiles.endRow();
		
		print_str = print_str + LayoutHtmlFiles.tab(2) + '}' + LayoutHtmlFiles.endRow();
		
		print_str = print_str + LayoutHtmlFiles.tab(2) + '.table_seat ' + LayoutHtmlFiles.endRow();
		
		print_str = print_str + LayoutHtmlFiles.tab(2) + '{' + LayoutHtmlFiles.endRow();
		
		print_str = print_str + LayoutHtmlFiles.tab(2) + 'font-family: Arial, Helvetica, sans-serif;' + LayoutHtmlFiles.endRow();
		
		print_str = print_str + LayoutHtmlFiles.tab(3) + 'font-size: 12px;' + LayoutHtmlFiles.endRow();
		
		print_str = print_str + LayoutHtmlFiles.tab(3) + 'font-weight: bold;' + LayoutHtmlFiles.endRow();
		
		print_str = print_str + LayoutHtmlFiles.tab(3) + 'text-align: center;' + LayoutHtmlFiles.endRow();
		
		print_str = print_str + LayoutHtmlFiles.tab(3) + 'color: black;' + LayoutHtmlFiles.endRow();
		
		print_str = print_str + LayoutHtmlFiles.tab(2) + '}' + LayoutHtmlFiles.endRow();
		
		print_str = print_str + LayoutHtmlFiles.tab(2) + 'table ' + LayoutHtmlFiles.endRow();
		
		print_str = print_str + LayoutHtmlFiles.tab(2) + '{' + LayoutHtmlFiles.endRow();

		print_str = print_str + LayoutHtmlFiles.tab(3) + ' width: 1000px;' + LayoutHtmlFiles.endRow();
		
		print_str = print_str + LayoutHtmlFiles.tab(2) + '}' + LayoutHtmlFiles.endRow();
		
		print_str = print_str + LayoutHtmlFiles.tab(2) + '.r_name_seat' + LayoutHtmlFiles.endRow();
		
		print_str = print_str + LayoutHtmlFiles.tab(2) + '{' + LayoutHtmlFiles.endRow();
		
		print_str = print_str + LayoutHtmlFiles.tab(3) + 'font-family: Arial, Helvetica, sans-serif;' + LayoutHtmlFiles.endRow();
		
		print_str = print_str + LayoutHtmlFiles.tab(3) + 'font-size: 21px;' + LayoutHtmlFiles.endRow();
		
		print_str = print_str + LayoutHtmlFiles.tab(3) + 'font-weight: bold;' + LayoutHtmlFiles.endRow();
		
		print_str = print_str + LayoutHtmlFiles.tab(3) + 'text-align: center;' + LayoutHtmlFiles.endRow();
		
		print_str = print_str + LayoutHtmlFiles.tab(3) + 'color: black;' + LayoutHtmlFiles.endRow();
		
		print_str = print_str + LayoutHtmlFiles.tab(3) + 'border: none;' + LayoutHtmlFiles.endRow();
		
		print_str = print_str + LayoutHtmlFiles.tab(2) + '}' + LayoutHtmlFiles.endRow();
		
		print_str = print_str + LayoutHtmlFiles.tab(2) + '.t_table' + LayoutHtmlFiles.endRow();
		
		print_str = print_str + LayoutHtmlFiles.tab(2) + '{' + LayoutHtmlFiles.endRow();
		
		print_str = print_str + LayoutHtmlFiles.tab(3) + 'border: none;' + LayoutHtmlFiles.endRow();
		
		print_str = print_str + LayoutHtmlFiles.tab(2) + '}' + LayoutHtmlFiles.endRow();
		
        print_str = print_str +  LayoutHtmlFiles.endRow();

        return print_str;

    } // print

    static startString()
    {
        return '<style>';

    } // startString

    static endString()
    {
        return '</style>' +  LayoutHtmlFiles.endRow();
        
    } // endString
    
} // LayoutStyle

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Class Layout Style //////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
