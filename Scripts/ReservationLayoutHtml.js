// File: ReservationLayoutHtml.js
// Date: 2026-05-22
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

            // TableGroupHtml.toConsole('TableGroupHtml.execute: Processing table ' + table_data.getNumber());

            var table_html_object = 
            new TableRectangleHtml(table_data, this.m_table_group_html_data.m_scale_dimension, this.m_table_group_html_data.m_cl_table);

            this.m_html_code += table_html_object.get() + '\n';

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
        // TableGroupHtml.toConsole('TableRectangleHtml.execute Enter');

         this.m_html_code = '';

         var table_id = this.m_table_data.getNumber();

         // TableGroupHtml.toConsole('TableRectangleHtml.execute table_id: ' + table_id);

        var upper_left_corner_x = this.m_table_data.getUpperLeftX();
        var upper_left_corner_y = this.m_table_data.getUpperLeftY();

        // TableGroupHtml.toConsole('TableRectangleHtml.execute upper_left_corner_x: ' + upper_left_corner_x);
        // TableGroupHtml.toConsole('TableRectangleHtml.execute upper_left_corner_y: ' + upper_left_corner_y);

        var scaled_x = parseInt(upper_left_corner_x * this.m_scale_dimension);
        var scaled_y = parseInt(upper_left_corner_y * this.m_scale_dimension);

        // TableGroupHtml.toConsole('TableRectangleHtml.execute scaled_x: ' + scaled_x);
        // TableGroupHtml.toConsole('TableRectangleHtml.execute scaled_y: ' + scaled_y);

         var rect_width = this.m_table_data.getWidth();
         var rect_height = this.m_table_data.getHeight();

        // TableGroupHtml.toConsole('TableRectangleHtml.execute rect_width: ' + rect_width);
        // TableGroupHtml.toConsole('TableRectangleHtml.execute rect_height: ' + rect_height);

        var rect_width_scaled = parseInt(rect_width * this.m_scale_dimension);
        var rect_height_scaled = parseInt(rect_height * this.m_scale_dimension);

        // TableGroupHtml.toConsole('TableRectangleHtml.execute rect_width_scaled: ' + rect_width_scaled);
        // TableGroupHtml.toConsole('TableRectangleHtml.execute rect_height_scaled: ' + rect_height_scaled);

        var number_left_right_seats = this.m_table_data.getNumberLeftRightSeats();

        var table_text = this.m_table_data.getText();

        var display_text = '<br>Tisch<br>' + table_id + '<br><br>Plätze <br>' + number_left_right_seats; 

        var one_rectangle_html = '<div id="' + table_id + '" class="' + this.m_cl_table + 
        '" style="left:' + scaled_x + 'px; top:' + scaled_y + 'px; '+
        'width:' + rect_width_scaled + 'px; height:' + rect_height_scaled + 'px;">' 
        + display_text    
        + '</div>';

        this.m_html_code += one_rectangle_html;

        TableRectangleHtml.toConsole('TableRectangleHtml.execute Rectangle div= \n' + one_rectangle_html);

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

} // TableRectangleHtml

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Class Table Rectangle Html //////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Class Button Html /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Create the HTML code for a button in the layout
class ButtonHtml
{
    constructor(i_button_data, i_scale_dimension, i_cl_button) 
    {
        // Instance of the class ButtonData
        this.m_button_data = i_button_data;

        // The conversion factor mm to pixel
        this.m_scale_dimension = i_scale_dimension;

        // The style for the button
        this.m_cl_button = i_cl_button;

        // All HTML code from this class
        this.m_html_code = '';

        // Create (construct) the HTML code
        this.execute();

    } // constructor

    // Create (construct) the HTML code for the button
    execute()
    {
        ButtonHtml.toConsole('ButtonHtml.execute Enter');

        this.m_html_code = '';

        var upper_left_corner_x = this.m_button_data.getUpperLeftX();
        var upper_left_corner_y = this.m_button_data.getUpperLeftY();

        var scaled_x = parseInt(upper_left_corner_x * this.m_scale_dimension);
        var scaled_y = parseInt(upper_left_corner_y * this.m_scale_dimension);

         var button_width = this.m_button_data.getWidth();
         var button_height = this.m_button_data.getHeight();

        var button_width_scaled = parseInt(button_width * this.m_scale_dimension);
        var button_height_scaled = parseInt(button_height * this.m_scale_dimension);

        var button_id = this.m_button_data.getId();

        // var button_title = this.m_button_data.getTitle();

        // var button_text = 'Id= ' + button_id + ' ' + button_title;

        var one_button_html = '<div id="' + button_id + '" class="' + this.m_cl_button + 
        '" style="left:' + scaled_x + 'px; top:' + scaled_y + 'px; '+
        'width:' + button_width_scaled + 'px; height:' + button_height_scaled + 'px;">' 
        + button_id    
        + '</div>';

        this.m_html_code += one_button_html;

        ButtonHtml.toConsole('ButtonHtml.execute Button div= \n' + one_button_html);

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

} // ButtonHtml

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Class Button Html ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Class Stage Html //////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Create the HTML code for a stage in the layout
class StageHtml
{
    constructor(i_stage_data, i_scale_dimension, i_cl_stage) 
    {
        // Instance of the class StageData
        this.m_stage_data = i_stage_data;

        // The conversion factor mm to pixel
        this.m_scale_dimension = i_scale_dimension;

        // The style for the stage
        this.m_cl_stage = i_cl_stage;

        // All HTML code from this class
        this.m_html_code = '';

        // Create (construct) the HTML code
        this.execute();

    } // constructor

    // Create (construct) the HTML code for the stage
    execute()
    {
        StageHtml.toConsole('StageHtml.execute Enter');

        this.m_html_code = '';

        if (!this.m_stage_data.stageIsDefined())
        {
            StageHtml.toConsole('StageHtml.execute Stage is not defined. No stage div is created.');

            return;
        }

        var upper_left_corner_x = this.m_stage_data.getUpperLeftX();
        var upper_left_corner_y = this.m_stage_data.getUpperLeftY();

        var scaled_x = parseInt(upper_left_corner_x * this.m_scale_dimension);
        var scaled_y = parseInt(upper_left_corner_y * this.m_scale_dimension);

         var stage_width = this.m_stage_data.getWidth();
         var stage_height = this.m_stage_data.getHeight();

        var stage_width_scaled = parseInt(stage_width * this.m_scale_dimension);
        var stage_height_scaled = parseInt(stage_height * this.m_scale_dimension);

        var stage_text = this.m_stage_data.getText();

        var stage_id = 'id_div_stage_pos_absolute';

        var one_stage_html = '<div id="' + stage_id + '" class="' + this.m_cl_stage + 
        '" style="left:' + scaled_x + 'px; top:' + scaled_y + 'px; '+
        'width:' + stage_width_scaled + 'px; height:' + stage_height_scaled + 'px;">' 
        + '<br>'+ stage_text    
        + '</div>';

        this.m_html_code += one_stage_html;

        StageHtml.toConsole('StageHtml.execute Stage div= \n' + one_stage_html);

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

} // StageHtml

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Class Stage Html ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

