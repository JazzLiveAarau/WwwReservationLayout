// File: ReservationLayoutHtml.js
// Date: 2024-11-26
// Authors: Gunnar Lidén

// Content
// =======
//
// Reservation layout HTML classes and functions
//


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Class Layout Svg //////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Class that creates all HTML code for the reservation layout HTML file
class LayoutHtml
{
    // Creates the instance of the class
    // i_layout_xml: Object for a reservation layout XML file. 
    // i_layout_case: Layout creation case
    //                MakeReservation
    constructor(i_layout_xml, i_layout_case) 
    {
        // Member variables
        // ================

       // Layout XML object
       this.m_layout_xml = i_layout_xml;

       // Layout creation case
       this.m_layout_case = i_layout_case;

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

        var header_str = new LayoutHeader(this.m_layout_xml, this.m_layout_case);

        this.m_html_code = this.m_html_code + header_str.get() + LayoutHtml.endRow();

        var body_str = new LayoutBody(this.m_layout_xml, this.m_layout_case);

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

    // Returns true if it is a valid layout case
    validLayoutCase()
    {
        if (this.m_layout_case == 'MakeReservation')
        {
            return true;
        }
        else
        {
            alert("LayoutHtml.validLayoutCase Not an implemented case= " + this.m_layout_case);

            return false;
        }

    } // validLayoutCase

} // LayoutHtml

// Class that creates the HTML code for the header section <head>
class LayoutHeader
{
    // Creates the instance of the class
    // i_layout_xml: Object for a reservation layout XML file. 
    constructor(i_layout_xml, i_layout_case) 
    {
        // Member variables
        // ================

       // Layout XML object
       this.m_layout_xml = i_layout_xml;

       // Layout creation case
       this.m_layout_case = i_layout_case;

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

// Class that creates the HTML code for the body section <head>
class LayoutBody
{
    // Creates the instance of the class
    // i_layout_xml: Object for a reservation layout XML file. 
    constructor(i_layout_xml, i_layout_case) 
    {
        // Member variables
        // ================

       // Layout XML object
       this.m_layout_xml = i_layout_xml;

       // Layout creation case
       this.m_layout_case = i_layout_case;

       // All HTML code from this class
       this.m_html_body_code = ''; 

       // Create (construct) the HTML code
       this.execute();

    } // constructor

    // Create (construct) the HTML code for the bpdy section <head>
    execute()
    {
        this.m_html_body_code = ''; 

        this.m_html_body_code = this.m_html_body_code + LayoutHtml.tab(1) + LayoutBody.startString() + LayoutHtml.endRow();


        var layout_svg = new LayoutSvg(this.m_layout_xml);

        var layout_svg_code = layout_svg.get();

        this.m_html_body_code = this.m_html_body_code + layout_svg_code + LayoutHtml.endRow();



        this.m_html_body_code = this.m_html_body_code + LayoutHtml.tab(1) + LayoutBody.endString() + LayoutHtml.endRow();        


    } // execute

    // Get all HTML code for the header section <head>
    get()
    {
        return this.m_html_body_code;

    } // get

    static startString()
    {
        return '<body>'

    } // startString

    static endString()
    {
        return '</body>'
        
    } // endString
    
} // LayoutBody