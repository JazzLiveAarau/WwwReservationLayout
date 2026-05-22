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

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Class Walls Html //////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Create the HTML code for a wall in the layout
class WallHtml
{
    constructor(i_premises_data, i_scale_dimension, i_cl_wall) 
    {
        // Instance of the class PremisesData
        this.m_premises_data = i_premises_data;

        // The conversion factor mm to pixel
        this.m_scale_dimension = i_scale_dimension;

        // The style for the wall
        this.m_cl_wall = i_cl_wall;

        // All HTML code from this class
        this.m_html_code = '';

        // Create (construct) the HTML code
        this.execute();

    } // constructor

    // Create (construct) the HTML code for the wall
    execute()
    {
        WallHtml.toConsole('WallsHtml.execute Enter');

        this.m_html_code = '';

        var wall_thickness_mm = parseInt(this.m_premises_data.getWallThickness());

        if (wall_thickness_mm <= 0)
        {
            WallHtml.toConsole('WallHtml.execute Wall thickness is zero. No wall divs are created.');

            return;
        }

        // Not used var upper_left_corner_x = 0;
        // Not used var upper_left_corner_y = 0;

        var premises_width = this.m_premises_data.getWidth(); 
        var premises_height = this.m_premises_data.getHeight();

        var premises_width_scaled = parseInt(premises_width * this.m_scale_dimension);
        var premises_height_scaled = parseInt(premises_height * this.m_scale_dimension);

        var wall_thickness_scaled = parseInt(wall_thickness_mm * this.m_scale_dimension);

        // Position and dimension of the left wall	
        var wall_left_x_scaled = 0;
        var wall_left_y_scaled = 0;
        var wall_left_width_scaled = wall_thickness_scaled;
        var wall_left_height_scaled = premises_height_scaled - wall_thickness_scaled;

        // Position and dimension of the right wall		
        var wall_right_x_scaled = premises_width_scaled - parseInt(1.5*wall_thickness_scaled); // ?
        var wall_right_y_scaled = 0;
        var wall_right_width_scaled = wall_thickness_scaled;
        var wall_right_height_scaled = premises_height_scaled - wall_thickness_scaled; 

        // Position and dimension of the upper wall	(height = 3 X wall thickness)	  
        var wall_upper_x_scaled = 0;
        var wall_upper_y_scaled = 0;
        var wall_upper_width_scaled = premises_width_scaled;
        var wall_upper_height_scaled = 3*wall_thickness_scaled;

        // Position and dimension of the lower wall	
        var wall_lower_x_scaled = 0;
        var wall_lower_y_scaled = premises_height_scaled - parseInt(2*wall_thickness_scaled); // ?
        var wall_lower_width_scaled = premises_width_scaled;
        var wall_lower_height_scaled = wall_thickness_scaled;


        var wall_left_id = 'id_div_wall_pos_absolute_left';

        var left_wall_html = '<div id="' + wall_left_id + '" class="' + this.m_cl_wall + 
        '" style="left:' + wall_left_x_scaled + 'px; top:' + wall_left_y_scaled + 'px; '+
        'width:' + wall_left_width_scaled + 'px; height:' + wall_left_height_scaled + 'px;">' 
        + '</div>';

        this.m_html_code += left_wall_html;

        WallHtml.toConsole('WallHtml.execute Wall div= \n' + left_wall_html);

        var wall_right_id = 'id_div_wall_pos_absolute_right';

        var right_wall_html = '<div id="' + wall_right_id + '" class="' + this.m_cl_wall + 
        '" style="left:' + wall_right_x_scaled + 'px; top:' + wall_right_y_scaled + 'px; '+
        'width:' + wall_right_width_scaled + 'px; height:' + wall_right_height_scaled + 'px;">' 
        + '</div>';

        this.m_html_code += right_wall_html;

        WallHtml.toConsole('WallHtml.execute Wall div= \n' + right_wall_html);

        var wall_upper_id = 'id_div_wall_pos_absolute_upper';

        var upper_wall_html = '<div id="' + wall_upper_id + '" class="' + this.m_cl_wall + 
        '" style="left:' + wall_upper_x_scaled + 'px; top:' + wall_upper_y_scaled + 'px; '+
        'width:' + wall_upper_width_scaled + 'px; height:' + wall_upper_height_scaled + 'px;">' 
        + '</div>';

        this.m_html_code += upper_wall_html;

        WallHtml.toConsole('WallHtml.execute Wall div= \n' + upper_wall_html);

        var wall_lower_id = 'id_div_wall_pos_absolute_lower';

        var lower_wall_html = '<div id="' + wall_lower_id + '" class="' + this.m_cl_wall + 
        '" style="left:' + wall_lower_x_scaled + 'px; top:' + wall_lower_y_scaled + 'px; '+
        'width:' + wall_lower_width_scaled + 'px; height:' + wall_lower_height_scaled + 'px;">' 
        + '</div>';

        this.m_html_code += lower_wall_html;

        WallHtml.toConsole('WallHtml.execute Wall div= \n' + lower_wall_html);

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

} // WallHtml

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Class Walls Html ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Class Organizer Html //////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Create the HTML code for organizer div in the layout
class OrganizerHtml
{
    constructor(i_premises_data, i_scale_dimension, i_cl_organizer) 
    {
        // Instance of the class PremisesData
        this.m_premises_data = i_premises_data;

        // The conversion factor mm to pixel
        this.m_scale_dimension = i_scale_dimension;

        // The style for the organizer div
        this.m_cl_organizer = i_cl_organizer;

        // All HTML code from this class
        this.m_html_code = '';

        // Create (construct) the HTML code
        this.execute();

    } // constructor

    // Create (construct) the HTML code for the organizer div
    execute()
    {
        OrganizerHtml.toConsole('OrganizerHtml.execute Enter');

        this.m_html_code = '';

        if (!this.m_premises_data.organizerIsDefined())
        {
            OrganizerHtml.toConsole('OrganizerHtml.execute Organizer is not defined. No organizer div is created.');

            return;
        }

        var organizer_name = this.m_premises_data.getOrganizerName();

        var organizer_text_logo = this.m_premises_data.getOrganizerTextLogo();

        //TODO var organizer_text_logo_width = this.m_premises_data.getOrganizerTextLogoWidth();

        // TODO var organizer_text_logo_height = this.m_premises_data.getOrganizerTextLogoHeight();

        // TODO var organizer_logo = this.m_premises_data.getOrganizerLogo();

        // TODO var organizer_logo_width = this.m_premises_data.getOrganizerLogoWidth();
        // TODO var organizer_logo_height = this.m_premises_data.getOrganizerLogoHeight();

        OrganizerHtml.toConsole('OrganizerHtml.execute organizer_name: ' + organizer_name);

/*

  <OrganizerName>JAZZ live AARAU</OrganizerName>
  <OrganizerTextLogo>ImagesLayout/jazz_live_aarau_text_logo.png</OrganizerTextLogo>
  <OrganizerTextLogoWidth>400px</OrganizerTextLogoWidth>
  <OrganizerTextLogoHeight>40px</OrganizerTextLogoHeight>
  <OrganizerLogo>ImagesLayout/jazz_live_aarau_logo.png</OrganizerLogo>
  <OrganizerLogoWidth>384px</OrganizerLogoWidth>
  <OrganizerLogoHeight>392px</OrganizerLogoHeight>

        // 	JAZZ live AARAU text logo position
        var jazz_text_x_pixel = wall_upper_x_pixel + parseInt(wall_upper_width_pixel*0.28);
        var jazz_text_y_pixel = wall_upper_y_pixel + wall_upper_height_pixel - parseInt(wall_upper_height_pixel*0.96);
        
        // JAZZ live AARAU text object
        var text_svg = LayoutSvg.tab(4) + '<text x=' + jazz_text_x_pixel + ' y=' + jazz_text_y_pixel + 
                  LayoutSvg.fontBig() + LayoutSvg.colorJazzLiveAarau() + '>' + 
                  organizer_name + '</text>';
        // premises_svg = premises_svg + text_svg + LayoutSvg.endRow();   
        
        var image_width = '400px';
        var image_height = '40px';
        var image_file = organizer_text_logo;
        
        var image_svg = LayoutSvg.tab(4) + '<image x= ' + jazz_text_x_pixel + ' y= ' + jazz_text_y_pixel + 
                        ' width=' + image_width + ' height=' + image_height + 
                        ' xlink:href=' +image_file + '>' +
                        ' <title>'+ organizer_name +' Text Logo</title> ' + 
                        ' </image>';	

*/
        var premises_width = this.m_premises_data.getWidth(); 
        var premises_height = this.m_premises_data.getHeight();

        var premises_width_scaled = parseInt(premises_width * this.m_scale_dimension);
        var premises_height_scaled = parseInt(premises_height * this.m_scale_dimension);


        var rel_dist_x = 0.28;
        

        var upper_left_corner_x = premises_width*rel_dist_x;
        var upper_left_corner_y = 10;

        var scaled_x = parseInt(upper_left_corner_x * this.m_scale_dimension);
        var scaled_y = parseInt(upper_left_corner_y * this.m_scale_dimension);

        var organizer_width_scaled = 290;
        var organizer_height_scaled = 30;

        var organizer_id = 'id_div_organizer_pos_absolute';

        var organizer_html = '<div id="' + organizer_id + '" class="' + this.m_cl_organizer + 
        '" style="left:' + scaled_x + 'px; top:' + scaled_y + 'px; '+
        'width:' + organizer_width_scaled + 'px; height:' + organizer_height_scaled + 'px;">' 
        + organizer_name    
        + '</div>';

        this.m_html_code += organizer_html;

        OrganizerHtml.toConsole('OrganizerHtml.execute Organizer div= \n' + organizer_html);

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

} // OrganizerHtml

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Class Organizer Html ////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Class Cashier Html ////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Create the HTML code for the cashier div in the layout
class CashierHtml
{
    constructor(i_cashier_data, i_scale_dimension, i_cl_cashier) 
    {
        // Instance of the class CashierData
        this.m_cashier_data = i_cashier_data;

        // The conversion factor mm to pixel
        this.m_scale_dimension = i_scale_dimension;

        // The style for the cashier
        this.m_cl_cashier = i_cl_cashier;

        // All HTML code from this class
        this.m_html_code = '';

        // Create (construct) the HTML code
        this.execute();

    } // constructor

    // Create (construct) the HTML code for the cashier div
    execute()
    {
        CashierHtml.toConsole('CashierHtml.execute Enter');

        this.m_html_code = '';

        if (!this.m_cashier_data.cashierIsDefined())
        {
            CashierHtml.toConsole('CashierHtml.execute Cashier is not defined. No cashier div is created.');

            return;
        }

        var upper_left_corner_x = this.m_cashier_data.getUpperLeftX();
        var upper_left_corner_y = this.m_cashier_data.getUpperLeftY();

        var scaled_x = parseInt(upper_left_corner_x * this.m_scale_dimension);
        var scaled_y = parseInt(upper_left_corner_y * this.m_scale_dimension);

        var image_width_pixel = this.m_cashier_data.getImageWidth();

        var image_height_pixel = this.m_cashier_data.getImageHeight();

        var image_width_pixel_length = image_width_pixel.length;

        var image_height_pixel_length = image_height_pixel.length;

        var index_px = image_width_pixel.indexOf('px');

        var image_width_int = image_width_pixel.substring(0, index_px);

        index_px = image_height_pixel.indexOf('px');

        var image_height_int = image_height_pixel.substring(0, index_px);
/*
    getImage(){ return this.m_image; }
    setImage(i_image){ this.m_image = i_image; }

    getImageWidth(){ return this.m_image_width; }
    setImageWidth(i_image_width){ this.m_image_width = i_image_width; }

    getImageHeight(){ return this.m_image_height; }
    setImageHeight(i_image_height){ this.m_image_height = i_image_height; }

*/

        var cashier_width_scaled = image_width_int;
        var cashier_height_scaled = image_height_int;

        var cashier_text = 'Kasse';

        var cashier_id = 'id_div_cashier_pos_absolute';

        var cashier_html = '<div id="' + cashier_id + '" class="' + this.m_cl_cashier + 
        '" style="left:' + scaled_x + 'px; top:' + scaled_y + 'px; '+
        'width:' + cashier_width_scaled + 'px; height:' + cashier_height_scaled + 'px;">' 
        + '<br>'+ cashier_text    
        + '</div>';

        this.m_html_code += cashier_html;

        CashierHtml.toConsole('CashierHtml.execute Cashier div= \n' + cashier_html);

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

} // CashierHtml

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Class Cashier Html //////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Class Door Html /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Create the HTML code for a door in the layout
class DoorHtml
{
    constructor(i_door_data, i_premises_data, i_scale_dimension, i_cl_door, i_id_door) 
    {
        // Instance of the class DoorData
        this.m_door_data = i_door_data;

        // Instance of the class PremisesData
        this.m_premises_data = i_premises_data;

        // The conversion factor mm to pixel
        this.m_scale_dimension = i_scale_dimension;

        // The style for the door
        this.m_cl_door = i_cl_door;

        // The id for the door div
        this.m_id_door = i_id_door;

        // All HTML code from this class
        this.m_html_code = '';

        // Create (construct) the HTML code
        this.execute();

    } // constructor

    // Create (construct) the HTML code for the door
    execute()
    {
        DoorHtml.toConsole('DoorHtml.execute Enter');

        this.m_html_code = '';

        // var door_id = this.m_door_data.getId();

        /* Not yet used
        var door_image = this.m_door_data.getImage();

        var door_image_width = this.m_door_data.getImageWidth();

        var door_image_height = this.m_door_data.getImageHeight();

        Not yet used */

        var door_type = this.m_door_data.getType();

        var door_position_mm = this.m_door_data.getPosition();

        var door_position_scaled = parseInt(door_position_mm * this.m_scale_dimension);

        //QQ var upper_left_corner_x = this.m_door_data.getUpperLeftX();
        //QQ var upper_left_corner_y = this.m_door_data.getUpperLeftY();

        //QQ var scaled_x = parseInt(upper_left_corner_x * this.m_scale_dimension);
        //QQ var scaled_y = parseInt(upper_left_corner_y * this.m_scale_dimension);

         //QQ var door_width = this.m_door_data.getWidth();
         var door_height = this.m_door_data.getHeight();

        //QQ var door_width_scaled = parseInt(door_width * this.m_scale_dimension);
        var door_height_scaled = parseInt(door_height * this.m_scale_dimension);

        var door_text = this.m_door_data.getText();

        var door_text_vertical = this.doorTextVertical(door_text);

        var wall_thickness_mm = parseInt(this.m_premises_data.getWallThickness());
        var wall_thickness_scaled = parseInt(wall_thickness_mm * this.m_scale_dimension);
        
        var premises_width = this.m_premises_data.getWidth(); 
        var premises_height = this.m_premises_data.getHeight();

        var premises_width_scaled = parseInt(premises_width * this.m_scale_dimension);
        var premises_height_scaled = parseInt(premises_height * this.m_scale_dimension);

        if ("right" == door_type)
        {
            var right_coordinate_x_scaled = premises_width_scaled - parseInt(1.6*wall_thickness_scaled); // ?
            var right_coordinate_y_scaled = door_position_scaled;
            var right_width_scaled = wall_thickness_scaled;
            var right_height_scaled = door_height_scaled;

            var right_door_html = '<div id="' + this.m_id_door + '" class="' + this.m_cl_door + 
            '" style="left:' + right_coordinate_x_scaled + 'px; top:' + right_coordinate_y_scaled + 'px; '+
            'width:' + right_width_scaled + 'px; height:' + right_height_scaled + 'px;">' 
            + door_text_vertical    
            + '</div>';

            this.m_html_code += right_door_html;

            DoorHtml.toConsole('DoorHtml.execute Door div= \n' + right_door_html);
        }
        else if ("left" == door_type)
        {
            var left_coordinate_x_scaled = 0; 
            var left_coordinate_y_scaled = door_position_scaled;
            var left_width_scaled = wall_thickness_scaled;
            var left_height_scaled = door_height_scaled;

            var left_door_html = '<div id="' + this.m_id_door + '" class="' + this.m_cl_door + 
            '" style="left:' + left_coordinate_x_scaled + 'px; top:' + left_coordinate_y_scaled + 'px; '+
            'width:' + left_width_scaled + 'px; height:' + left_height_scaled + 'px;">' 
            + door_text_vertical    
            + '</div>';

            this.m_html_code += left_door_html;

            DoorHtml.toConsole('DoorHtml.execute Door div= \n' + left_door_html);
        }
        else if ("upper" == door_type)
        {
            DoorHtml.toConsole('DoorHtml.execute Upper door is not yet implemented. No door div is created.');

            return;
        }
        else if ("lower" == door_type)
        {
            var lower_coordinate_x_scaled = door_position_scaled; 
            var lower_coordinate_y_scaled = premises_height_scaled - parseInt(2.0*wall_thickness_scaled); // ?
            var lower_width_scaled = door_height_scaled;
            var lower_height_scaled = wall_thickness_scaled;

            var lower_door_html = '<div id="' + this.m_id_door + '" class="' + this.m_cl_door + 
            '" style="left:' + lower_coordinate_x_scaled + 'px; top:' + lower_coordinate_y_scaled + 'px; '+
            'width:' + lower_width_scaled + 'px; height:' + lower_height_scaled + 'px;">' 
            + door_text    
            + '</div>';

            this.m_html_code += lower_door_html;

            DoorHtml.toConsole('DoorHtml.execute Door div= \n' + lower_door_html);
        }
        else
        {
            DoorHtml.toConsole('DoorHtml.execute Unknown door type: ' + door_type + '. No door div is created.');
        }

    } // execute

    // Returns the door text in vertical direction (with line breaks)
    doorTextVertical(i_text)
    {
        var vertical_text = '';

        var n_chars = i_text.length;

        for (var index_char = 0; index_char < n_chars; index_char++)
        {
            var char = i_text.charAt(index_char);

            vertical_text += char + '<br>';

        } // index_char


        return vertical_text;

    } // doorTextVertical

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

} // DoorHtml

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Class Door Html /////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

