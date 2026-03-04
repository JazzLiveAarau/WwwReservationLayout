// File: ReservationCards.js
// Date: 2026-03-04
// Author: Gunnar Lidén

// Inhalt
// =============
//
// Main functions for the application reservation cards (badges)

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Global Parameters /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Main directory 
var g_xml_data_dir_text_box = null;

// Result directory where the generated HTML files and other files shall be stored
var g_result_dir_text_box = null;

// Button for the generation of new season (event) XML files
var g_create_ticket_cards_button = null;

// Button for the creation of a new event program XML file
var g_create_name_cards_button = null;

// URL for the server directory for the XML reservation data 
var g_xml_data_dir = "";

// URL for the server directory where the generated files shall be stored
var g_result_dir = "";

// Instance of the class ReservationEventXml for the handling of the reservation XML data
var g_reservation_concert_xml = null;

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Global Parameters ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Main Functions ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Initialization
// 1. If local storage not is set (after delete browser cache) set empty strings
//    Call of NewSeasonStorage.initLocal
// 2. Create the controls for this application
//    Call of createReservationCardsControls
// 3. Set the controls with data from local storage
//    Call of NewSeasonStorage.getLocal and setNewSeasonControls
function initReservationCards()
{
    debugReservationCards('initReservationCards Enter');

    createReservationCardsControls();

    setReservationCardsControls();

} // initReservationCards

function execCreateNameCards()
{
    debugReservationCards('execCreateNameCards Enter');

    // Creates the instance of the class
    // i_callback_function_name: Function that shall be called after loading
    // i_subdir_xml: The subdirctory for the event XML file
    // i_event_reg_number: Event registration number REG_xyz (a string)
    // i_event_number: Event number that will used for the name of the event XML file
    // i_b_new_file: Flag telling if the event XML file shall be created

    // subdir_xml, event_reg_number, event_number, b_new_file, callback_function_name
    var subdir_xml = g_xml_data_dir;

    var event_reg_number = "old"; // Old names for the XML reservation data files

    var event_number =  13;

    var b_new_file = false;

    var callback_function_name = afterLoadingOfNameCardsXmlData;

    g_reservation_concert_xml = new ReservationEventXml(subdir_xml, event_reg_number, event_number, b_new_file, callback_function_name);

} // execCreateNameCards

function afterLoadingOfNameCardsXmlData()
{
    debugReservationCards('afterLoadingOfNameCardsXmlData Enter');

   var name_cards = new NameCards(g_reservation_concert_xml);

} // afterLoadingOfNameCardsXmlData

function execCreateTicketCards()
{
    debugReservationCards('execCreateTicketCards Enter');   

} // execCreateTicketCards

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Main Functions //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Name Cards ////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

class NameCards
{
    constructor(i_reservation_concert_xml)
    {
        this.m_reservation_concert_xml = i_reservation_concert_xml;

        this.m_seat_data_array = null;

        this.m_number_name_cards = 0;

        // Array event name (all are the same)
        this.m_event_name_array = null;

        this.m_names_array = null;

        this.m_seat_char_array = null;

        this.m_table_number_array = null;

        this.m_seat_name_array = null;

        // Array date (all are the same)
        this.m_dates_array = null;

        // Instance of the class StyleCards for the styling of the name cards
        this.m_style_cards = null;

        // Instance of the class HtmlTableCards
        this.m_html_table_cards = null;

        this.setReservationAndSeatDataArray();

        this.setArrays();

        this.createObjects();

        this.openTab();

    } // constructor

    // Sets the reservation and seat data array with data from the reservation concert XML file
    setReservationAndSeatDataArray()
    {
        var b_old_xml = true;
    
        this.m_seat_data_array = this.m_reservation_concert_xml.getReservationAndSeatDataArray(b_old_xml);

        this.m_number_name_cards = this.m_seat_data_array.length;

    } // setReservationAndSeatDataArray

    // Sets the arrays for the name cards with data from the reservation and seat data array
    setArrays()
    {
        this.m_event_name_array = [];

        this.m_names_array = [];

        this.m_seat_char_array =[];

        this.m_table_number_array = [];

        this.m_seat_name_array = [];

        this.m_dates_array = [];

        for (var index_name=0; index_name<this.m_number_name_cards; index_name++)
        {
            var seat_data = this.m_seat_data_array[index_name];

            this.m_names_array[index_name] = seat_data.m_name;

            this.m_event_name_array[index_name] = seat_data.m_event_name;

            this.m_seat_char_array[index_name] = seat_data.m_seat_character_or_number;

            this.m_table_number_array[index_name] = seat_data.m_row_or_table_number;

            this.m_seat_name_array[index_name] = seat_data.m_seat_name;

            var event_day = seat_data.m_event_day;

            var event_month = seat_data.m_event_month;

            var event_year = seat_data.m_event_year;

            var swiss_date = UtilDate.getSwissDateString(event_year, event_month, event_day);

            this.m_dates_array[index_name] = swiss_date;
        }

        console.log('this.m_names_array: ' + this.m_names_array);

    } // setArrays

    createObjects()
    {
        var card_width = "75mm";

        var card_height = "40mm";

        var font_size_club = "24px";

        var font_size_name = "24px";

        var font_size_seat = "12px";

        var font_size_date = "15px";

        var font_size_event = "15px";

        this.m_style_cards = new StyleCards(card_width, card_height, font_size_club, font_size_name, font_size_seat, font_size_date, font_size_event);

        var row_one_str = "JAZZ <i>live</i> AARAU";

        this.m_html_table_cards = new HtmlTableCards(card_width, card_height, row_one_str, this.m_names_array, 
                                        this.m_dates_array, this.m_event_name_array);

    } // createObjects

    getHtmlString()
    {
        var html_str = "";

        html_str += "<!DOCTYPE html>" + StyleCards.lineBreak();

        html_str += "<html lang=\"de\">" + StyleCards.lineBreak();

        html_str += this.meta();

        html_str += "<head>" + StyleCards.lineBreak();

        html_str += this.m_style_cards.styleHtmlString();

        html_str += "</head>" + StyleCards.lineBreak();

        html_str += "<body>" + StyleCards.lineBreak();

        html_str += this.m_html_table_cards.getHtmlString() + StyleCards.lineBreak();

        html_str += "</body>" + StyleCards.lineBreak();

        html_str += "</html>" + StyleCards.lineBreak();

        return html_str;

    }

    // Returns the meta string for the name cards HTML file
    meta()
    {
        var meta_str = "<meta charset=\"utf-8\">" + StyleCards.lineBreak();

        meta_str += "<meta name=\"description\" content=\"Reservation cards\">" + StyleCards.lineBreak();

        meta_str += "<meta name=\"author\" content=\"Gunnar Lidén\">" + StyleCards.lineBreak();

        return meta_str;

    } // meta

    openTab()
    {
        var content = this.getHtmlString();

        console.log('NameCards.OpenTab content: ' + StyleCards.lineBreak() + content);

 
        const blob = new Blob([content], { type: 'text/html' });
        const blobUrl = URL.createObjectURL(blob);
        window.open(blobUrl);

    }

} // NameCards

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Name Cards //////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Html Table ////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

class HtmlTableCards
{
    constructor(i_card_width, i_card_height, i_row_one_str, i_row_two_array, i_row_three_left_array, i_row_three_right_array)
    {
        this.m_card_width = i_card_width;

        this.m_card_height = i_card_height;

        this.m_number_columns = 0;

        this.m_number_rows_per_page = 0;

        this.m_total_number_rows = 0;

        this.m_number_pages = 0;

        this.m_row_one_str = i_row_one_str;

        this.m_row_two_array = i_row_two_array;

        this.m_row_three_left_array = i_row_three_left_array;

        this.m_row_three_right_array = i_row_three_right_array;

        this.init();

    } // constructor

    init()
    {
        this.numberColumns();

        this.numberRowsPerPage();

        this.totalNumberRowsAndPages();

    } // init

    // Calculates the number of columns for the name cards
    numberColumns()
    {
        this.m_number_columns = 2; // TODO

    } // numberColumns

    // Calculates the number of rows per page for the name cards
    numberRowsPerPage()
    {
        this.m_number_rows_per_page = 6; // TODO

    } // numberRowsPerPage

    // Calculates the total number of rows and pages for the name cards
    totalNumberRowsAndPages()
    {
        var n_cards = this.m_row_two_array.length;

        var n_cards_per_page = this.m_number_columns*this.m_number_rows_per_page;

        var n_pages = Math.ceil(n_cards / n_cards_per_page);

        var total_number_rows = n_pages*this.m_number_rows_per_page;

        this.m_total_number_rows = parseInt(total_number_rows);

        this.m_number_pages = n_pages;

    } // totalNumberRowsAndPages

    // Returns the HTML string for the name cards tables (one table per page)
    getHtmlString()
    {
        var table_html_str = "";

        table_html_str += this.addStartTable();

        var n_row_page = 0;

        for (var index_row=0; index_row<this.m_total_number_rows; index_row++)
        {
            table_html_str += this.addStartRow();

            for (var index_column=0; index_column<this.m_number_columns; index_column++)
            {
                table_html_str += this.addStartColumn();

                table_html_str += this.addRowOne(this.m_row_one_str);

                var current_index = index_row*this.m_number_columns + index_column;

                if (current_index < this.m_row_two_array.length)
                {
                    table_html_str += this.addRowTwo(this.m_row_two_array[current_index]);

                    table_html_str += this.addRowThree(this.m_row_three_left_array[current_index], this.m_row_three_right_array[current_index]);
                }
                else                
                {
                    table_html_str += this.addRowTwo("&nbsp;");

                    // TODOtable_html_str += this.addRowThree("&nbsp;", "&nbsp;");

                    table_html_str += this.addRowThree(this.m_row_three_left_array[1], this.m_row_three_right_array[1]);
                }

                table_html_str += this.addEndColumn();
            }

            table_html_str += this.addEndRow();

            n_row_page = n_row_page + 1;

            if (index_row == this.m_total_number_rows - 1)
            {
                table_html_str += this.addEndTable();
            }
            else if (n_row_page == this.m_number_rows_per_page)
            {
                table_html_str += this.addEndTable();

                table_html_str += this.addNewPage();

                table_html_str += this.addStartTable();

                n_row_page = 0;
            }

        } // index_row

        return table_html_str;

    } // getHtmlString

    // Returns start table
    addStartTable()
    {
        return '<table class="cl_table">' + StyleCards.lineBreak();

    } // addStartTable

    // Returns end table
    addEndTable()
    {
        return '</table>' + StyleCards.lineBreak();
        
    } // addEndTable

    // Returns start row
    addStartRow()
    {
        return '<tr>' + StyleCards.lineBreak();
        
    } // addStartRow

    // Returns end row
    addEndRow()
    {
        return '</tr>' + StyleCards.lineBreak();
        
    } // addEndRow

    // Returns start column
    addStartColumn()
    {
        return '<td  style= "width: ' + this.m_card_width + '; height: ' + this.m_card_height + '; border: 1px solid black" >' + StyleCards.lineBreak();
        
    } // addStartColumn

    // Returns end column
    addEndColumn()
    {
        return '</td>' + StyleCards.lineBreak();
        
    } // addEndColumn

    // Returns the row one string that normally is JAZZ live AARAU
    addRowOne(i_row_one_str)
    {
        return '<div class="cl_row_one">' + i_row_one_str + '</div>'+ StyleCards.lineBreak();

    } // addRowOne

    // Returns the row two div strin that normally is the name of a person
    addRowTwo(i_row_two_str)
    {
        return '<div class="cl_row_two">' + i_row_two_str + '</div>'+ StyleCards.lineBreak();

    } // addRowTwo

    // Returns the row three div string that normally is the date and event name
    addRowThree(i_row_three_left_str, i_row_three_right_str)
    {
        var row_three_str = '<div class="cl_row_three">'+ StyleCards.lineBreak();

        row_three_str += '<div class="cl_row_three_left">' + i_row_three_left_str + '</div>'+ StyleCards.lineBreak();

        row_three_str += '<div class="cl_row_three_right">' + i_row_three_right_str + '</div>'+ StyleCards.lineBreak();

        row_three_str += '</div>'+ StyleCards.lineBreak();

        return row_three_str;

    } // addRowThree

    // Add new page
    addNewPage()
    {
        return '<div class="cl_page_break"></div>';
        
    } // addNewPage

} // HtmlTableCards


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Html Table //////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Style Cards ///////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

class StyleCards
{
    constructor(i_card_width, i_card_height, i_font_size_club, i_font_size_name, i_font_size_seat, i_font_size_date, i_font_size_event)
    {
        this.m_name_card_width_mm = i_card_width;

        this.m_name_card_height_mm = i_card_height;

        this.m_font_size_club = i_font_size_club;

        this.m_font_size_name = i_font_size_name;

        this.m_font_size_seat = i_font_size_seat;

        this.m_font_size_date = i_font_size_date;

        this.m_font_size_event = i_font_size_event;

        this.m_b_div_border = false;

        this.init();

    } // constructor

    init()
    {
        if (this.m_font_size_club == "")
        {
            this.m_font_size_club = "18px";
        }

        if (this.m_font_size_name == "")
        {
            this.m_font_size_name = "24px";
        }

        if (this.m_font_size_seat == "")
        {
            this.m_font_size_seat = "12px";
        }

        if (this.m_font_size_date == "")
        {
            this.m_font_size_date = "15px";
        }

        if (this.m_font_size_event == "")
        {
            this.m_font_size_event = "15px";
        }

    } // init

    styleHtmlString()
    {
        var html_str = "<style>"+ StyleCards.lineBreak();

        html_str += this.mediaPrint();

        html_str += this.clubName();

        html_str += this.name();

        html_str += this.tableSeat();

        html_str += this.tableStyle();

        html_str += this.nameSeat();

        html_str += this.dateEvent();

        html_str += this.event();

        html_str += this.noBorder();

        html_str += this.rowThree();

        html_str += this.rowThreeLeft();

        html_str += this.rowThreeRight();

        html_str += "</style>" + StyleCards.lineBreak();

        return html_str;

    } // styleHtmlString

    static lineBreak()
    {
        return "\n";
    }

    mediaPrint()
    {
        var media_print_str = "@media print " + StyleCards.lineBreak();

        media_print_str += "{ " + StyleCards.lineBreak();

        media_print_str += ".cl_page_break { display: block; page-break-before: always; } " + StyleCards.lineBreak();

        media_print_str += "} " + StyleCards.lineBreak();

        media_print_str += "@page " + StyleCards.lineBreak();

        media_print_str += "{ " + StyleCards.lineBreak();

        media_print_str += "margin-top: 0cm; " + StyleCards.lineBreak();

        media_print_str += "margin-bottom: 0cm; " + StyleCards.lineBreak();

        media_print_str += "margin-left: 0cm; " + StyleCards.lineBreak();

        media_print_str += "margin-right: 0cm; " + StyleCards.lineBreak();

        media_print_str += "} " + StyleCards.lineBreak();

        return media_print_str; 

    } // mediaPrint

    // Style for the row one <div> that normally is JAZZ live AARAU
    clubName()
    {
        var club_name_str = ".cl_row_one " + StyleCards.lineBreak();

        club_name_str += "{ " + StyleCards.lineBreak();

        club_name_str += "font-family: Arial, Helvetica, sans-serif; " + StyleCards.lineBreak();

        club_name_str += "font-size: " + this.m_font_size_club + "; " + StyleCards.lineBreak();

        club_name_str += "font-weight: bold; " + StyleCards.lineBreak();

        club_name_str += "text-align: center; " + StyleCards.lineBreak();

        club_name_str += "color: #ff0028; " + StyleCards.lineBreak();

        club_name_str += "height: 20%; " + StyleCards.lineBreak();

        club_name_str += "margin-bottom: 3%; " + StyleCards.lineBreak();

        if (this.m_b_div_border)
        {
            club_name_str += "border: 1px solid black; " + StyleCards.lineBreak();
        }

        club_name_str += "} " + StyleCards.lineBreak();

        return club_name_str;

    } // clubName

    // Style for the row two <div> that normally is the name of a person
    name()
    {
        var name_str = ".cl_row_two " + StyleCards.lineBreak();

        name_str += "{ " + StyleCards.lineBreak();

        name_str += "font-family: Arial, Helvetica, sans-serif; " + StyleCards.lineBreak();

        name_str += "font-size: " + this.m_font_size_name + "; " + StyleCards.lineBreak();

        name_str += "font-weight: bold; " + StyleCards.lineBreak();

        name_str += "text-align: center; " + StyleCards.lineBreak();

        name_str += "color: black; " + StyleCards.lineBreak();

        name_str += "height:48%; " + StyleCards.lineBreak();

        if (this.m_b_div_border)
        {
            name_str += "border: 1px solid black; " + StyleCards.lineBreak();
        }    

        name_str += "} " + StyleCards.lineBreak();

        return name_str;

    } // name

    // Style for the row three <div> that normally is the date and event name
    rowThree()
    {
        var row_three_str = ".cl_row_three " + StyleCards.lineBreak();

        row_three_str += "{ " + StyleCards.lineBreak();

        row_three_str += "font-family: Arial, Helvetica, sans-serif; " + StyleCards.lineBreak();

        row_three_str += "font-size: " + this.m_font_size_row_three + "; " + StyleCards.lineBreak();

        row_three_str += "font-weight: bold; " + StyleCards.lineBreak();

        row_three_str += "text-align: center; " + StyleCards.lineBreak();

        row_three_str += "color: black; " + StyleCards.lineBreak();

        if (this.m_b_div_border)
        {
            row_three_str += "border: 1px solid black; " + StyleCards.lineBreak();
        }    

        row_three_str += "overflow: hidden; " + StyleCards.lineBreak();

        row_three_str += "height: 15%; " + StyleCards.lineBreak();

        row_three_str += "} " + StyleCards.lineBreak();

        return row_three_str;

    } // rowThree

    // Style for the row three left <div> that normally is the date
    rowThreeLeft()
    {
        var row_three_left_str = ".cl_row_three_left " + StyleCards.lineBreak();

        row_three_left_str += "{ " + StyleCards.lineBreak();

        row_three_left_str += "width: 40%; " + StyleCards.lineBreak();

        row_three_left_str += "float: left; " + StyleCards.lineBreak();

        row_three_left_str += "padding-left: 1%; " + StyleCards.lineBreak();

        if (this.m_b_div_border)
        {
            row_three_left_str += "border: 1px solid black; " + StyleCards.lineBreak();
        }

        row_three_left_str += "} " + StyleCards.lineBreak();

        return row_three_left_str;

    } // rowThreeLeft

    // Style for the row three right <div> that normally is the event name
    rowThreeRight()
    {
        var row_three_right_str = ".cl_row_three_right " + StyleCards.lineBreak();

        row_three_right_str += "{ " + StyleCards.lineBreak();

        row_three_right_str += "width: 55%; " + StyleCards.lineBreak();

        row_three_right_str += "float: right; " + StyleCards.lineBreak();

        row_three_right_str += "padding-right: 1%; " + StyleCards.lineBreak();

         
        if (this.m_b_div_border)        {
            row_three_right_str += "border: 1px solid black; " + StyleCards.lineBreak();
        }

        row_three_right_str += "} " + StyleCards.lineBreak();

        return row_three_right_str;

    } // rowThreeRight

    tableSeat()
    {
        var table_seat_str = ".cl_table_seat " + StyleCards.lineBreak();

        table_seat_str += "{ " + StyleCards.lineBreak();

        table_seat_str += "font-family: Arial, Helvetica, sans-serif; " + StyleCards.lineBreak();

        table_seat_str += "font-size: " + this.m_font_size_seat + "; " + StyleCards.lineBreak();

        table_seat_str += "font-weight: bold; " + StyleCards.lineBreak();

        table_seat_str += "text-align: center; " + StyleCards.lineBreak();

        table_seat_str += "color: black; " + StyleCards.lineBreak();

        table_seat_str += "} " + StyleCards.lineBreak();

        return table_seat_str;

    } // tableSeat

    tableStyle()
    {
        var table_style_str = ".cl_table " + StyleCards.lineBreak();

        table_style_str += "{ " + StyleCards.lineBreak();

        table_style_str += "border: none; " + StyleCards.lineBreak();

        table_style_str += "margin-top: 20mm; " + StyleCards.lineBreak();

         table_style_str += "margin-left: 20mm; " + StyleCards.lineBreak();

        table_style_str += "} " + StyleCards.lineBreak();

        return table_style_str;

    } // tableStyle

    nameSeat()
    {
        var name_seat_str = ".cl_r_name_seat " + StyleCards.lineBreak();

        name_seat_str += "{ " + StyleCards.lineBreak();

        name_seat_str += "font-family: Arial, Helvetica, sans-serif; " + StyleCards.lineBreak();

        name_seat_str += "font-size: " + this.m_font_size_seat + "; " + StyleCards.lineBreak();

        name_seat_str += "font-weight: bold; " + StyleCards.lineBreak();

        name_seat_str += "text-align: center; " + StyleCards.lineBreak();

        name_seat_str += "color: black; " + StyleCards.lineBreak();

        name_seat_str += "border: none; " + StyleCards.lineBreak();

        name_seat_str += "} " + StyleCards.lineBreak();

        return name_seat_str;

    } // nameSeat

     dateEvent()
     {
        var date_event_str = ".cl_date_event " + StyleCards.lineBreak();

        date_event_str += "{ " + StyleCards.lineBreak();

        date_event_str += "font-family: Arial, Helvetica, sans-serif; " + StyleCards.lineBreak();   


        date_event_str += "font-size: " + this.m_font_size_date + "; " + StyleCards.lineBreak();

        date_event_str += "font-weight: bold; " + StyleCards.lineBreak();

        date_event_str += "text-align: center; " + StyleCards.lineBreak();

        date_event_str += "color: black; " + StyleCards.lineBreak();

        date_event_str += "} " + StyleCards.lineBreak();

        return date_event_str;

        } // dateEvent

        event()
        {
            var event_str = ".cl_event " + StyleCards.lineBreak();

            event_str += "{ " + StyleCards.lineBreak();

            event_str += "font-family: Arial, Helvetica, sans-serif; " + StyleCards.lineBreak();

            event_str += "font-size: " + this.m_font_size_event + "; " + StyleCards.lineBreak();

            event_str += "font-weight: bold; " + StyleCards.lineBreak();
            event_str += "text-align: center; " + StyleCards.lineBreak();

            event_str += "color: black; " + StyleCards.lineBreak();

            event_str += "} " + StyleCards.lineBreak();

            return event_str;

        } // event

        noBorder()
        {
            var no_border_str = ".cl_no_border " + StyleCards.lineBreak();

            no_border_str += "{ " + StyleCards.lineBreak();

            no_border_str += "border: none; " + StyleCards.lineBreak();

            no_border_str += "} " + StyleCards.lineBreak();

            return no_border_str;

        } // noBorder

} // StyleCards


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Style Cards /////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Event Functions ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

function onClickOfNameCardsButton()
{
    debugReservationCards('onClickOfNameCardsButton Enter');

     execCreateNameCards();

} // onClickOfNameCardsButton

// User clicked the create new event XML files button
function onClickOfTicketCardsButton()
{
    debugReservationCards('onClickOfTicketCardsButton Enter');

    execCreateTicketCards();

}// onClickOfTicketCardsButton

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Create Controls ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Creates all the controls for the application
function createReservationCardsControls()
{
    createTextBoxXmlDataDirectory();

    createTextBoxResultDirectory();

    createNameCardsButton();

    createTicketCardsButton();

} // createReservationCardsControls

// Create the text box for the organisation directory
function createTextBoxXmlDataDirectory()
{
    g_xml_data_dir_text_box = new JazzTextBox("id_xml_data_dir", 'id_div_xml_data_dir');

    g_xml_data_dir_text_box.setLabelText("Ordner Reservationsdaten");

    g_xml_data_dir_text_box.setLabelTextPositionAbove();

    g_xml_data_dir_text_box.setSize("30");

    g_xml_data_dir_text_box.setReadOnlyFlag(false);

    g_xml_data_dir_text_box.setTitle("Name des Server Ordners für die XML Daten der Reservationen.");

} // createTextBoxXmlDataDirectory

// Create the text box for the result server directory where generated files shall be stored
function createTextBoxResultDirectory()
{
    g_result_dir_text_box = new JazzTextBox("id_cards_result_dir", 'id_div_cards_result_dir');

    g_result_dir_text_box.setLabelText("Ordner für Resultate");

    g_result_dir_text_box.setLabelTextPositionAbove();

    g_result_dir_text_box.setSize("30");

    g_result_dir_text_box.setReadOnlyFlag(false);

    g_result_dir_text_box.setTitle("Name des Server Ordners für die Resultate.");

} // createTextBoxResultDirectory

// Creates a new event program XML file for the new season
function createNameCardsButton()
{
    g_create_name_cards_button = new JazzButton('id_name_cards_button', 'id_div_name_cards_button');

    g_create_name_cards_button.setOnclickFunctionName("onClickOfNameCardsButton");

    g_create_name_cards_button.setCaption('Namensschilder generieren');

    g_create_name_cards_button.setLabelText("");

    g_create_name_cards_button.setWidth("245px");

    g_create_name_cards_button.setTitle('Namensschilder generieren und speichern');

} // createNameCardsButton

// Creates the event (concert) XML files for the new season
function createTicketCardsButton()
{
    g_create_ticket_cards_button = new JazzButton('id_ticket_cards_button', 'id_div_ticket_cards_button');

    g_create_ticket_cards_button.setOnclickFunctionName("onClickOfTicketCardsButton");

    g_create_ticket_cards_button.setCaption('Eintrittsbadges generieren');

    g_create_ticket_cards_button.setLabelText("");

    g_create_ticket_cards_button.setWidth("245px");

    g_create_ticket_cards_button.setTitle('Eintrittsbadges generieren und speichern');

} // createTicketCardsButton

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Create Controls /////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Set Controls //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

function setReservationCardsControls()
{
    if (ReservationEventXml.execApplicationOnServer())
    {
        g_xml_data_dir = '/XmlTestData/SaisonXML/';
    }
    else
    {
        g_xml_data_dir = '../Reservation/Spagi_76_Chairs_V_1/SaisonXML/';
    }

    g_xml_data_dir_text_box.setValue(g_xml_data_dir);

} // setReservationCardsControls

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Set Controls ////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Debug Function ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Displays the input string in the debugger Console
function debugReservationCards(i_msg_str)
{
    console.log(i_msg_str);

} // debugReservationCards

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Debug Function //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////