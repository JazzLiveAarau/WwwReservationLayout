// File: ReservationLayoutHtml.js
// Date: 2026-05-18
// Authors: Gunnar Lidén

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Class Layout Table Group Html /////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Imput data for creating the HTML code for a group of tables in the layout
class TableGroupHtmlData
{
    constructor(i_table_group_data, i_scale_dimension, i_b_group_boundary, i_cl_table_group,  i_cl_table) 
    {
        this.m_table_group_data = i_table_group_data;

       // The conversion factor mm to pixel
       this.m_scale_dimension = i_scale_dimension;

       // Flag tellin if he boundary of the group of tables shall be drawn
        this.m_b_group_boundary = i_b_group_boundary;

        // The style for the group of tables
        this.m_cl_table_group = i_cl_table_group;

        // The the for a table
        this.m_cl_table = i_cl_table;


       // Style for the HTML elements
       this.m_style_block_html =  ' ' + 'style="fill:rgb(255,255,255);margin-top:0px; padding:0px" '; // TODO

    } // constructor

} // TableGroupHtmlData

// Class for creating the HTML code for a group of tables in the layout
class TableGroupHtml 
{
    constructor(i_table_group_html_data) 
    {
        this.m_table_group_html_data = i_table_group_html_data;

        // The conversion factor mm to pixel
        this.m_scale_dimension = i_table_group_html_data.m_scale_dimension;

        // Flag tellin if he boundary of the group of tables shall be drawn
        this.m_b_group_boundary = i_table_group_html_data.m_b_group_boundary;

        // All HTML code from this class
        this.m_html_code = '';    

        // Create (construct) the HTML code
        this.execute();

    } // constructor


    // Create (construct) the HTML code for the group of tables
    execute()
    {
        TableGroupHtml.toConsole('TableGroupHtml.execute Enter');

        this.m_html_code = '';

        // Get the data for the group of tables
        var table_group_data = this.m_table_group_html_data.m_table_group_data;

        var n_tables = table_group_data.m_tables.length;

        // Loop all tables in the group
        for (var index_table = 0; index_table < n_tables; index_table++)
        {
            var table_data = table_group_data.m_tables[index_table];
            TableGroupHtml.toConsole('TableGroupHtml.execute: Processing table ' + table_data.getNumber());

            var table_html_object = 
            new TableRectangleHtml(table_data, this.m_table_group_html_data.m_scale_dimension, this.m_table_group_html_data.m_cl_table);

            this.m_html_code += table_html_object.get();

        } // index_table

    } // execute

    // Get all HTML code 
    get()
    {
        return this.m_html_code;

    } // get

    //Debug: Write text to the console
    static toConsole(i_text_str)
    {
        console.log(i_text_str);

    } // toConsole

} // TableGroupHtml


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Class Layout Table Group Html ///////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Class Table Rectangle Html ////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Create the HTML code for a rectangle (table) in the layout
class TableRectangleHtml
{
    constructor(i_table_data, i_scale_dimension, i_cl_table) 
    {
        this.m_table_data = i_table_data;

         // The conversion factor mm to pixel
        this.m_scale_dimension = i_scale_dimension;

        // The style for the table
        this.m_cl_table = i_cl_table;

        // All HTML code from this class
        this.m_html_code = '';    

        // Create (construct) the HTML code
        this.execute();

    } // constructor

    // Create (construct) the HTML code for the rectangle (table)
    execute()
    {
        TableGroupHtml.toConsole('TableRectangleHtml.execute Enter');

        /* TODO
        this.m_html_code = '';

        var table_id = this.m_table_data.getNumber();

        var upper_left_corner_x = this.m_table_data.getUpperLeftX();
        var upper_left_corner_y = this.m_table_data.getUpperLeftY();

        var scaled_x = upper_left_corner_x * this.m_scale_dimension;
        var scaled_y = upper_left_corner_y * this.m_scale_dimension;

        var rect_width_scaled = this.m_table_data.getWidth() * this.m_scale_dimension;
        var rect_height_scaled = this.m_table_data.getHeight() * this.m_scale_dimension;

        var number_left_right_seats = this.m_table_data.getNumberLeftRightSeats();

        var table_text = this.m_table_data.getText();

        var one_rectangle_html = '<div id="' + table_id + '" class="' + this.m_cl_table + 
        '" style="left:' + scaled_x + 'px; top:' + scaled_y + 'px; '+
        'width:' + rect_width_scaled + 'px; height:' + rect_height_scaled + 'px;">' 
        //TODO + table_text    
        + '</div>';

        TableGroupHtml.toConsole('TableRectangleHtml.execute one_rectangle_html: \n' + one_rectangle_html);

        this.m_html_code += one_rectangle_html;

        TODO */


    } // execute

    // Get all HTML code 
    get()
    {
        return this.m_html_code;

    } // get

} // TableRectangleHtml

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Class Table Rectangle Html //////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
