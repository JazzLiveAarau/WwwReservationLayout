// File: ReservationLayoutSvg.js
// Date: 2024-12-03
// Authors: Gunnar Lidén

// Content
// =======
//
// Reservation layout SVG classes and functions
//


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Class Layout Svg //////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Class that creates all SVG code for the reservation layout HTML file
class LayoutSvg
{
    // Creates the instance of the class
    // i_layout_xml: Object for a reservation layout XML file. 
    constructor(i_layout_xml, i_button_id_array) 
    {
        // Member variables
        // ================

       // Layout XML object
       this.m_layout_xml = i_layout_xml;

       // Array of identities for the buttons that shall be created
       this.m_button_id_array = i_button_id_array;       

       // The conversion factor mm to pixel
       this.m_scale_dimension = -0.123456789;

       // Style for the SVH element
       this.m_style_block_svg =  ' ' + 'style="fill:rgb(255,255,255);stroke-width:3;stroke:rgb(0,0,0);margin-top:0px; padding:0px" ';

       // All SVG code from this class
       this.m_svg_code = '';    
	   
       // Create (construct) the SVG code
       this.execute();

    } // constructor

    // Create (construct) the SVG code
    // 1. Calculate conversion factor mm to pixel. Create premises SVG object.
    // 2. Add SVG start line. Call of PremisesSvg.startLineSvg
    // 3. Add premises SVG to m_svg_code. Call of PremisesSvg.get.


     // n. Add SVG end line. Call of PremisesSvg.endLineSvg
    execute()
    {
        if (this.m_layout_xml == null)
        {
            alert("LayoutSvg.execute Layout XML object is null");

            return;
        }

        this.m_scale_dimension = this.millimeterToPixel(this.m_layout_xml);

        this.m_svg_code = '';

        this.m_svg_code = this.m_svg_code + LayoutSvg.tab(3) + this.startLineSvg();

        var premises_svg = new PremisesSvg(this.m_layout_xml, this.m_scale_dimension);

        this.m_svg_code = this.m_svg_code + premises_svg.get();

        var stage_svg = new StageSvg(this.m_layout_xml, this.m_scale_dimension);

        this.m_svg_code = this.m_svg_code + stage_svg.get();

        var cashier_data = new CashierSvg(this.m_layout_xml, this.m_scale_dimension);

        this.m_svg_code = this.m_svg_code + cashier_data.get();

        var doors_svg = new DoorSvg(this.m_layout_xml, this.m_scale_dimension);

        this.m_svg_code = this.m_svg_code + doors_svg.get();

        var tables_svg = new TableSvg(this.m_layout_xml, this.m_scale_dimension);

        this.m_svg_code = this.m_svg_code + tables_svg.get();

        var buttons_svg = new ButtonSvg(this.m_layout_xml, this.m_scale_dimension, this.m_button_id_array);
        
        this.m_svg_code = this.m_svg_code + buttons_svg.get();
 
        this.m_svg_code = this.m_svg_code + LayoutSvg.tab(3) + this.endLineSvg();

    } // execute

    // Get all SVG code for the body of the output HTML files
    get()
    {
        return this.m_svg_code;

    } // get

    // Returns the start line for the SVG element (block) <svg ......>
    startLineSvg()
    {
        var premises_data = getPremisesDataFromXml(this.m_layout_xml);
        var premises_width = premises_data.getWidth(); 
        var premises_height = premises_data.getHeight();
        var premises_width_pixel = parseInt(premises_width*this.m_scale_dimension);
        var premises_height_pixel = parseInt(premises_height*this.m_scale_dimension);

        var ret_svg = '';
	
        var svg_svg = '<svg id= "id_block_svg" height=' + premises_height_pixel + ' width=' + premises_width_pixel 
                                + this.m_style_block_svg + ' >'
       
        ret_svg = ret_svg + svg_svg + LayoutSvg.endRow();
       
        return ret_svg;

    } // startLineSvg

    // Returns the end line for the SVG element (block) </svg>
    endLineSvg()
    {
        return '</svg>';	

    } // startLineSvg

    // Fonts, font sizes and colors (styles)
    static fontBig()
    {
        var font_big = ' font-family="arial" font-size="50px" fill=';

        return font_big;

    } // fontBig

    static fontMid()
    {
        var font_mid = ' font-family="arial" font-size="30px" fill=';

        return font_mid;

    } // fontMid

    static colorJazzLiveAarau()
    {
        var color_jazz_live_aarau = ' "rgb(255, 0, 40)" ';

        return color_jazz_live_aarau;

    } // colorJazzLiveAarau

    static styleCursorPointer()
    {
        return ' ' + 'style="cursor: pointer; " ';

    } // styleCursorPinter

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

    static endRow()
    {
        return '\n';

    } // endRow

/*
// Fonts, font sizes and colors (styles)


var g_font_button = ' font-family="arial" font-size="22px" ';


var g_style_button_blue = ' style="fill:blue;stroke-width:1;stroke:black" ';
var g_style_button_purple = ' style="fill:purple;stroke-width:1;stroke:black" ';

var g_prompt_text_color = "yellow";
var g_active_mode_color = "magenta";
var g_color_white = "white";
var g_color_silver = "silver";
var g_color_light_blue = "LightSkyBlue";
var g_color_indigo = "Indigo";
var g_color_green_yellow = "GreenYellow";
var g_color_yellow = "Yellow";

var g_color_free_seat = "white"; // Blue rgb(142, 181, 242) Light green rgb(175, 234, 152)
var g_color_reserved_seat = "red";
var g_color_seat_circle = "black";

*/

    // Returns the conversion factor mm to pixel
    millimeterToPixel(i_layout_xml)
    {
        var ret_scale_factor = -0.123456789;

        var premises_data = getPremisesDataFromXml(i_layout_xml);

        var premises_width = premises_data.getWidth();

        var max_width_pixels = premises_data.getMaxWidthPixel(); 

        if (premises_width > 0)
        {
            ret_scale_factor = max_width_pixels/premises_width;
        }
        else
        {
            alert("LayoutSvg.millimeterToPixel  premises_width <= 0");
        }

        return ret_scale_factor;

    } // millimeterToPixel

} // LayoutSvg

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Class Layout Svg ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Class Button Svg //////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Class that creates all buttons SVG code for the reservation layout HTML files
class ButtonSvg
{
    // Creates the instance of the class
    // i_layout_xml: Object for a reservation layout XML file. 
	// i_scale_dimension: The conversion factor mm to pixel
    // i_button_id_array: Array of identities for the buttons that shall be created
    constructor(i_layout_xml, i_scale_dimension, i_button_id_array) 
    {
        // Member variables
        // ================

       // Layout XML object
       this.m_layout_xml = i_layout_xml;

       // The conversion factor mm to pixel
       this.m_scale_dimension = i_scale_dimension;

       // Array of identities for the buttons that shall be created
       this.m_button_id_array = i_button_id_array;   

       this.m_style_rect = ' style="fill:white;stroke-width:1;stroke:black"';
      
/*
var g_style_button = ' style="cursor: pointer;fill:white;stroke-width:1;stroke:black" ';

    static styleCursorPointer()
    {
        return ' ' + 'style="cursor: pointer; " ';

    } // styleCursorPinter

*/

       
       // All SVG code from this class
       this.m_svg_code = '';
	   
       // Create (construct) the SVG code
       this.execute();

    } // constructor

    // Create (construct) the SVG code
    execute()
    {
        if (this.m_layout_xml == null)
        {
            alert("ButtonSvg.execute Layout XML object is null");

            return;
        }

       // Get data for all buttons from the layout XML file  
       var button_data_array = this.getButtonDataArray();  

       var n_buttons = button_data_array.length;
    
        var all_buttons_svg = '';

        for (var button_index=0; button_index < n_buttons; button_index++)
        {
            var button_data = button_data_array[button_index];

            all_buttons_svg = all_buttons_svg + this.oneButton(button_data);
        }

        this.m_svg_code = all_buttons_svg;
 
    } // execute

    // Returns an array of ButtonData objects that shall be created
    getButtonDataArray()
    {
        var ret_button_data_array = [];

        var n_buttons = this.m_button_id_array.length;

        for (var index_button=0; index_button < n_buttons; index_button++)
        {
            var button_id = this.m_button_id_array[index_button];

            var button_data = getButtonDataForId(this.m_layout_xml, button_id);

            ret_button_data_array[index_button] = button_data;
        }

        return ret_button_data_array;

    } // getButtonDataArray

    // Returns SVG code for one button
    oneButton(i_button_data)
    {
        // Get button data from the layout XML file 
        var button_id = i_button_data. getId();
        var button_title = i_button_data. getTitle();
        var button_event_function = i_button_data. getEventFunction();
        var button_upper_left_x = i_button_data. getUpperLeftX();
        var button_upper_left_y = i_button_data. getUpperLeftY();
        var button_width = i_button_data. getWidth();
        var button_height = i_button_data. getHeight();
        var button_image_id = i_button_data. getImageId();
        var button_image_event_function = i_button_data. getImageEventFunction();
        var button_image_one = i_button_data. getImageOne();
        var button_image_two = i_button_data. getImageTwo();
        var button_image_three = i_button_data. getImageThree();
        var button_image_width_pixel = i_button_data. getImageWidth();
        var button_image_height_pixel = i_button_data. getImageHeight();
        var button_type = i_button_data. getType();

        // Convert button dimensions from mm to pixel
        var button_upper_left_x_pixel = parseInt(button_upper_left_x*this.m_scale_dimension);
        var button_upper_left_y_pixel = parseInt(button_upper_left_y*this.m_scale_dimension);
        var button_width_pixel = parseInt(button_width*this.m_scale_dimension);
        var button_height_pixel = parseInt(button_height*this.m_scale_dimension);

        // Added properties
        var delta_x_pixel = 10;
        var delta_y_pixel = 1;
        var image_button_upper_left_x_pixel = button_upper_left_x_pixel + delta_x_pixel;
        var image_button_upper_left_y_pixel = button_upper_left_y_pixel + delta_y_pixel;

        var button_svg = '';

        var rect_svg = LayoutSvg.tab(4) + 
                        '<rect ' + ' x=' + button_upper_left_x_pixel + ' y=' + button_upper_left_y_pixel +
                        ' width= "' + button_width_pixel + '" height= "' + button_height_pixel + '" ' + LayoutSvg.endRow() + LayoutSvg.tab(5) +
                        ' id= "' + button_id + '" ' + 
                        this.m_style_rect + '></rect>';

        button_svg =  button_svg + rect_svg + LayoutSvg.endRow(); 

         // https://developer.mozilla.org/en-US/docs/Web/SVG/Element/title
         // Recommended ' href=' + button_image_three. Do not use link:href TODO

        var image_svg = LayoutSvg.tab(4) + 
                        '<image ' + ' x=' + image_button_upper_left_x_pixel + ' y=' + image_button_upper_left_y_pixel +
                        ' width= "' + button_image_width_pixel + '" height= "' + button_image_height_pixel + '" ' +
                        ' id= "' + button_image_id + '" ' + LayoutSvg.endRow() + LayoutSvg.tab(5) +
                        ' style="cursor: pointer; "' + LayoutSvg.endRow() + LayoutSvg.tab(5) +
                        ' onmousedown="' + button_image_event_function + '()" ' + LayoutSvg.endRow() + LayoutSvg.tab(5) +
                        ' xlink:href= "' + button_image_three + '" >' + LayoutSvg.endRow() + LayoutSvg.tab(6) +
                        ' <title>' + button_title + '</title> ' + LayoutSvg.endRow() + LayoutSvg.tab(4) +
                        ' </image>';

        button_svg =  button_svg + image_svg + LayoutSvg.endRow(); 

        button_svg = button_svg + LayoutSvg.endRow(); 

        return button_svg;

    } // oneButton

    // Get all SVG code for the body of the output HTML files
    get()
    {
        return this.m_svg_code;

    } // get

} // ButtonSvg

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Class Button Svg ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Class Premises Svg ////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Class that creates all premises SVG code for the reservation layout HTML files
class PremisesSvg
{
    // Creates the instance of the class
    // i_layout_xml: Object for a reservation layout XML file. 
	// i_scale_dimension: The conversion factor mm to pixel
    constructor(i_layout_xml, i_scale_dimension) 
    {
        // Member variables
        // ================

       // Layout XML object
       this.m_layout_xml = i_layout_xml;

       // The conversion factor mm to pixel
       this.m_scale_dimension = i_scale_dimension;

       this.m_style_wall = ' style="fill:rgb(222, 223, 224);stroke-width:1;stroke:black"';
       this.m_style_wall_black = ' style="fill:rgb(0, 0, 0);stroke-width:1;stroke:black"';

       // All SVG code from this class
       this.m_svg_code = '';
	   
       // Create (construct) the SVG code
       this.execute();

    } // constructor

    // Create (construct) the SVG code
    execute()
    {
        if (this.m_layout_xml == null)
        {
            alert("PremisesSvg.execute Layout XML object is null");

            return;
        }

        var premises_data = getPremisesDataFromXml(this.m_layout_xml);
        var premises_width = premises_data.getWidth(); 
        var premises_height = premises_data.getHeight();
        var wall_thickness = premises_data.getWallThickness();
        var organizer_name = premises_data.getOrganizerName();
        var organizer_text_logo = premises_data.getOrganizerTextLogo();
       
        // Convert premises dimensions from mm to pixel
        var premises_width_pixel = parseInt(premises_width*this.m_scale_dimension);
        var premises_height_pixel = parseInt(premises_height*this.m_scale_dimension);
        var wall_thickness_pixel = parseInt(wall_thickness*this.m_scale_dimension);
        
        var premises_svg = '';
        
        // Rectangle defining the premises
        var rectangle_svg = LayoutSvg.tab(4) + '<rect width=' + premises_width_pixel + ' height=' + premises_height_pixel +  ' />';
        premises_svg = premises_svg + rectangle_svg + LayoutSvg.endRow();
     
        // Position and dimension of the left wall	
        var wall_left_x_pixel = 0;
        var wall_left_y_pixel = 0;
        var wall_left_width_pixel = wall_thickness_pixel;
        var wall_left_height_pixel = premises_height_pixel;
       
        // Rectangle defining the left wall
        rectangle_svg = LayoutSvg.tab(4) + '<rect ' + ' x=' + wall_left_x_pixel + ' y=' + wall_left_y_pixel
          + ' width=' + wall_left_width_pixel + ' height=' + wall_left_height_pixel     
          + this.m_style_wall +  ' />';
        premises_svg = premises_svg + rectangle_svg + LayoutSvg.endRow();
        
        // Position and dimension of the right wall		
        var wall_right_x_pixel = premises_width_pixel - wall_thickness_pixel;
        var wall_right_y_pixel = 0;
        var wall_right_width_pixel = wall_thickness_pixel;
        var wall_right_height_pixel = premises_height_pixel;
    
        // Rectangle defining the right wall
        rectangle_svg = LayoutSvg.tab(4) + '<rect ' + ' x=' + wall_right_x_pixel + ' y=' + wall_right_y_pixel
          + ' width=' + wall_right_width_pixel + ' height=' + wall_right_height_pixel     
          + this.m_style_wall +  ' />';
        premises_svg = premises_svg + rectangle_svg + LayoutSvg.endRow();   
    
        // Position and dimension of the upper wall	(height = 3 X wall thickness)	  
        var wall_upper_x_pixel = 0;
        var wall_upper_y_pixel = 0;
        var wall_upper_width_pixel = premises_width_pixel;
        var wall_upper_height_pixel = 3*wall_thickness_pixel;
    
        // Rectangle defining the upper wall (color black)	
        rectangle_svg = LayoutSvg.tab(4) + '<rect ' + ' x=' + wall_upper_x_pixel + ' y=' + wall_upper_y_pixel
          + ' width=' + wall_upper_width_pixel + ' height=' + wall_upper_height_pixel     
          + this.m_style_wall_black +  ' />';
        premises_svg = premises_svg + rectangle_svg + LayoutSvg.endRow(); 	  
    
        // Position and dimension of the lower wall	
        var wall_lower_x_pixel = 0;
        var wall_lower_y_pixel = premises_height_pixel - wall_thickness_pixel;
        var wall_lower_width_pixel = premises_width_pixel;
        var wall_lower_height_pixel = wall_thickness_pixel;
    
        // Rectangle defining the lower wall
        rectangle_svg = LayoutSvg.tab(4) + '<rect ' + ' x=' + wall_lower_x_pixel + ' y=' + wall_lower_y_pixel
          + ' width=' + wall_lower_width_pixel + ' height=' + wall_lower_height_pixel     
          + this.m_style_wall +  ' />';
        premises_svg = premises_svg + rectangle_svg + LayoutSvg.endRow();
        
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
        premises_svg = premises_svg + image_svg + LayoutSvg.endRow(); 

        this.m_svg_code = premises_svg;
 
    } // execute

    // Get all SVG code for the body of the output HTML files
    get()
    {
        return this.m_svg_code;

    } // get

} // PremisesSvg

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Class Premises Svg //////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Class Stage Svg ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Class that creates all stage SVG code for the reservation layout HTML files
class StageSvg
{
    // Creates the instance of the class
    // i_layout_xml: Object for a reservation layout XML file. 
	// i_scale_dimension: The conversion factor mm to pixel
    constructor(i_layout_xml, i_scale_dimension) 
    {
        // Member variables
        // ================

       // Layout XML object
       this.m_layout_xml = i_layout_xml;

       // The conversion factor mm to pixel
       this.m_scale_dimension = i_scale_dimension;

       // All SVG code from this class
       this.m_svg_code = '';
	   
       // Create (construct) the SVG code
       this.execute();

    } // constructor

    // Create (construct) the SVG code
    execute()
    {
        if (this.m_layout_xml == null)
        {
            alert("StageSvg.execute Layout XML object is null");

            return;
        }
    
        // Get stage data from the layout XML file    
        var stage_data = getStageDataFromXml(this.m_layout_xml);

        var stage_upper_left_x = stage_data.getUpperLeftX();
        var stage_upper_left_y = stage_data.getUpperLeftY();
        var stage_image = stage_data.getImage();
        var stage_image_width = stage_data.getImageWidth();
        var stage_image_height = stage_data.getImageHeight()
        
        var stage_width = stage_data.getWidth();
        var stage_height = stage_data.getHeight();
        var stage_text = stage_data.getText();
        var stage_color = stage_data.getColor();
        var stage_stroke_color = stage_data.getStrokeColor();
        var stage_stroke_width = stage_data.getStrokeWidth();
        var stage_text_rel_x_procent = stage_data.getTextRelXProcent();
        var stage_text_rel_y_procent = stage_data.getTextRelYProcent();
        var stage_text_color = stage_data.getTextColor(); 
        
        // Convert from mm to pixel
        var stage_width_pixel = parseInt(stage_width*this.m_scale_dimension);  
        var stage_height_pixel = parseInt(stage_height*this.m_scale_dimension); 
        var stage_upper_left_x_pixel = parseInt(stage_upper_left_x*this.m_scale_dimension); 
        var stage_upper_left_y_pixel = parseInt(stage_upper_left_y*this.m_scale_dimension);

        var state_svg = '';

        // Draw the rectangle representing the stage defined by a relative value
        var rect_svg = LayoutSvg.tab(4) + '<rect ' + ' x=' + stage_upper_left_x_pixel + ' y=' + stage_upper_left_y_pixel
        + ' width=' + stage_width_pixel + ' height=' + stage_height_pixel     
        + ' style="fill:' + stage_color + ';stroke-width:' + stage_stroke_width + ';stroke:' + stage_stroke_color + '"' +  ' />';
        // state_svg = state_svg + rect_svg + LayoutSvg.endRow();

        // The X position for the stage text defined by a relative value
        var text_x = stage_width;
        text_x = text_x*stage_text_rel_x_procent;
        text_x = text_x/100.0;
        text_x = text_x + parseInt(stage_upper_left_x);

        // The Y position for the stage text defined by a relative value	
        var text_y = stage_height;
        text_y = text_y*stage_text_rel_y_procent;
        text_y = text_y/100.0;
        text_y = text_y + parseInt(stage_upper_left_y);
        
        // Position converted to pixels
        var text_x_pixel = parseInt(text_x*this.m_scale_dimension);
        var text_y_pixel = parseInt(text_y*this.m_scale_dimension);

        // Stage text object
        var text_svg = LayoutSvg.tab(4) + '<text x=' + text_x_pixel + ' y=' + text_y_pixel 
                    + LayoutSvg.fontBig() + stage_text_color + 
                    '>' + stage_text + '</text>';
        // state_svg = state_svg + text_svg + LayoutSvg.endRow();
        
        // Stage image object	
        var image_x_pixel = stage_upper_left_x_pixel + 8;
        var image_y_pixel = stage_upper_left_y_pixel - 25;
                        
        var stage_image_svg = LayoutSvg.tab(4) + '<image x= ' + image_x_pixel + ' y= ' + image_y_pixel + 
                        ' width=' + stage_image_width + ' height=' + stage_image_height + 
                        ' xlink:href=' + stage_image + '>' +
                        ' <title>Bühne</title> ' + 
                        ' </image>';
                        
        state_svg = state_svg + stage_image_svg + LayoutSvg.endRow(); 

        this.m_svg_code = state_svg;
 
    } // execute

    // Get all SVG code for the body of the output HTML files
    get()
    {
        return this.m_svg_code;

    } // get

} // StageSvg

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Class Stage Svg /////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Class Cashier Svg /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Class that creates all cashier SVG code for the reservation layout HTML files
class CashierSvg
{
    // Creates the instance of the class
    // i_layout_xml: Object for a reservation layout XML file. 
	// i_scale_dimension: The conversion factor mm to pixel
    constructor(i_layout_xml, i_scale_dimension) 
    {
        // Member variables
        // ================

       // Layout XML object
       this.m_layout_xml = i_layout_xml;

       // The conversion factor mm to pixel
       this.m_scale_dimension = i_scale_dimension;
      
       // All SVG code from this class
       this.m_svg_code = '';
	   
       // Create (construct) the SVG code
       this.execute();

    } // constructor

    // Create (construct) the SVG code
    execute()
    {
        if (this.m_layout_xml == null)
        {
            alert("CashierSvg.execute Layout XML object is null");

            return;
        }

       // Get cashier data from the layout XML file    
        var cashier_data = getCashierDataFromXml(this.m_layout_xml);	
        var cashier_upper_left_x = cashier_data.getUpperLeftX();
        var cashier_upper_left_y = cashier_data.getUpperLeftY();
        var cashier_image =        cashier_data.getImage();		
        var cashier_image_width =  cashier_data.getImageWidth();
        var cashier_image_height = cashier_data.getImageHeight();	
        
        var cashier_upper_left_x_pixel = parseInt(cashier_upper_left_x*this.m_scale_dimension); 
        var cashier_upper_left_y_pixel = parseInt(cashier_upper_left_y*this.m_scale_dimension);

        var cashier_svg = '';

        // Cash desk image object	
        var cashier_image_svg = LayoutSvg.tab(4) + '<image x= ' + cashier_upper_left_x_pixel + ' y= ' + cashier_upper_left_y_pixel + 
                        ' width=' + cashier_image_width + ' height=' + cashier_image_height + 
                        ' xlink:href=' + cashier_image + '>' +
                        ' <title>Kasse</title> ' + 
                        ' </image>';
                        
        cashier_svg = cashier_svg + cashier_image_svg + LayoutSvg.endRow(); 

        this.m_svg_code = cashier_svg;
 
    } // execute

    // Get all SVG code for the body of the output HTML files
    get()
    {
        return this.m_svg_code;

    } // get

} // CashierSvg

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Class Cashier Svg ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Class Door Svg ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Class that creates all doors SVG code for the reservation layout HTML files
class DoorSvg
{
    // Creates the instance of the class
    // i_layout_xml: Object for a reservation layout XML file. 
	// i_scale_dimension: The conversion factor mm to pixel
    constructor(i_layout_xml, i_scale_dimension) 
    {
        // Member variables
        // ================

       // Layout XML object
       this.m_layout_xml = i_layout_xml;

       // The conversion factor mm to pixel
       this.m_scale_dimension = i_scale_dimension;

       //QQthis.m_style_wall = ' style="fill:rgb(222, 223, 224);stroke-width:1;stroke:black"';
      

       // All SVG code from this class
       this.m_svg_code = '';
	   
       // Create (construct) the SVG code
       this.execute();

    } // constructor

    // Create (construct) the SVG code
    execute()
    {
        if (this.m_layout_xml == null)
        {
            alert("DoorSvg.execute Layout XML object is null");

            return;
        }

       // Get data for all doors from the layout XML file  
       var door_data_array = getDoorDataArrayFromXml(this.m_layout_xml);  

       var n_doors = door_data_array.length;
    

        var all_doors_svg = '';

        for (var door_index=0; door_index < n_doors; door_index++)
        {
            var door_data = door_data_array[door_index];

            all_doors_svg = all_doors_svg + this.oneDoor(door_data);
        }

        this.m_svg_code = all_doors_svg;
 
    } // execute

    // Returns SVG code for one door
    oneDoor(i_door_data)
    {
        // Get door data from the layout XML file 
        var door_type = i_door_data.getType();
        var door_position = i_door_data.getPosition();
        var door_height = i_door_data.getHeight();
        var door_text = i_door_data.getText();
        
        var door_image = i_door_data.getImage();
        var door_image_width_pixel = i_door_data.getImageWidth();
        var door_image_height_pixel = i_door_data.getImageHeight();	
        
        // Convert door dimensions from mm to pixel
        var door_position_pixel = parseInt(door_position*this.m_scale_dimension);
        var door_height_pixel = parseInt(door_height*this.m_scale_dimension);

        // Get premises data from the layout XML file 
        var premises_data = getPremisesDataFromXml(this.m_layout_xml);
        var premises_width = premises_data.getWidth(); 
        var premises_height = premises_data.getHeight();
        var wall_thickness = premises_data.getWallThickness();
       
        // Convert premises dimensions from mm to pixel
        var premises_width_pixel = parseInt(premises_width*this.m_scale_dimension);
        var premises_height_pixel = parseInt(premises_height*this.m_scale_dimension);
        var wall_thickness_pixel = parseInt(wall_thickness*this.m_scale_dimension);        


        var door_svg = '';	
        
    
        if ("right" == door_type)
        {
            var right_coordinate_x_pixel = premises_width_pixel - wall_thickness_pixel;
            var right_coordinate_y_pixel = door_position_pixel;
            var right_width_pixel = premises_width_pixel;
            var right_height_pixel = door_height_pixel;
            
            //var door_right_svg = '<rect ' + ' x=' + right_coordinate_x_pixel + ' y=' + right_coordinate_y_pixel +
            //                    ' width=' + right_width_pixel + ' height=' + right_height_pixel + 
            //                    ' style="fill:white;stroke-width:1;stroke:white"' +  ' />';
                            
            // door_svg  = door_svg + door_right_svg + LayoutSvg.endRow();
    
            //var right_text_x_pixel	= right_coordinate_x_pixel +  4;
            //var right_text_y_pixel	= right_coordinate_y_pixel +  4;
        
            //var text_right_svg = '<text x=' + right_text_x_pixel + ' y=' + right_text_y_pixel + 
            //                     ' transform="rotate(90, ' + right_text_x_pixel + ',' + + right_text_y_pixel + ')"' +
            //                     ' font-family="arial" font-size="25px" fill=' + TableSvg.tableText + '>' + door_text + '</text>';
                        
            // door_svg  = door_svg + text_right_svg + LayoutSvg.endRow();
            
            // Right door image object	
            var right_image_x_pixel = premises_width_pixel - 2 * wall_thickness_pixel;
            var right_image_y_pixel = door_position_pixel;
                        
            var right_image_svg = LayoutSvg.tab(4) + '<image x= ' + right_image_x_pixel + ' y= ' + right_image_y_pixel + 
                        ' width=' + door_image_width_pixel + ' height=' + door_image_height_pixel + 
                        ' xlink:href=' + door_image + '>' +
                        ' <title>Tür</title> ' + 
                        ' </image>';
                        
            door_svg = door_svg + right_image_svg + LayoutSvg.endRow(); 		
               
        } // upper

        if ("lower" == door_type)
        {
            var lower_coordinate_x_pixel = door_position_pixel;
            var lower_coordinate_y_pixel = premises_height_pixel - wall_thickness_pixel;
            var lower_width_pixel = door_height_pixel;
            var lower_height_pixel = premises_width_pixel;
            
            //var door_lower_svg = '<rect ' + ' x=' + lower_coordinate_x_pixel + ' y=' + lower_coordinate_y_pixel
            //   + ' width=' + lower_width_pixel + ' height=' + lower_height_pixel     
            //   + ' style="fill:white;stroke-width:1;stroke:white"' +  ' />'
            
            // door_svg  = door_svg + door_lower_svg + LayoutSvg.endRow();		
    
            //var lower_text_x_pixel	= lower_coordinate_x_pixel +  4;
            //var lower_text_y_pixel	= lower_coordinate_y_pixel + wall_thickness_pixel - 4;
    
            //var text_lower_svg = '<text x=' + lower_text_x_pixel + ' y=' + lower_text_y_pixel 
            //+ ' transform="rotate(0, ' + lower_text_x_pixel + ',' + lower_text_y_pixel + ')"' + 
            //' font-family="arial" font-size="25px" fill=' + TableSvg.tableText + '>' + door_text + '</text>'
            
            // door_svg  = door_svg + text_lower_svg + LayoutSvg.endRow();	
    
            // Lower door image object	
            var lower_image_x_pixel = lower_coordinate_x_pixel;
            var lower_image_y_pixel = lower_coordinate_y_pixel - wall_thickness_pixel;
                        
            var lower_image_svg = LayoutSvg.tab(4) + '<image x= ' + lower_image_x_pixel + ' y= ' + lower_image_y_pixel + 
                        ' width=' + door_image_width_pixel + ' height=' + door_image_height_pixel + 
                        ' xlink:href=' + door_image + '>' +
                        ' <title>Tür</title> ' + 
                        ' </image>';
                        
            door_svg = door_svg + lower_image_svg + LayoutSvg.endRow(); 		
            
        } // lower


        return door_svg;

    } // oneDoor

    // Get all SVG code for the body of the output HTML files
    get()
    {
        return this.m_svg_code;

    } // get

} // DoorSvg

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Class Door Svg //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Class Table Svg ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Class that creates all table SVG code for the reservation layout HTML files
class TableSvg
{
    // Creates the instance of the class
    // i_layout_xml: Object for a reservation layout XML file. 
	// i_scale_dimension: The conversion factor mm to pixel
    constructor(i_layout_xml, i_scale_dimension) 
    {
        // Member variables
        // ================

       // Layout XML object
       this.m_layout_xml = i_layout_xml;

       // The conversion factor mm to pixel
       this.m_scale_dimension = i_scale_dimension;

       // Circle line color
       this.m_color_seat_circle = "black";

       // Circle fill color for the creation of the layout HTML files
       // Reserved and unreserved colors are defined elsewhere
       this.m_fill_color_circle = "yellow";

       this.m_color = '';
       this.m_stroke_color = '';
       this.m_stroke_width  = '';
       this.m_text_rel_x_procent  = '';
       this.m_text_rel_y_procent = '';
       this.m_text_color  = '';
      

       // All SVG code from this class
       this.m_svg_code = '';
	   
       // Create (construct) the SVG code
       this.execute();

    } // constructor

    // Create (construct) the SVG code
    // 1. Set the general table properties. Call of TableSvg.setGeneralData
    // 2. Get all groups. Call of getGroupDataArrayFromXml.
    // 3. Loop for all groups
    // 3.1 Get tables for the current group. Call of GroupData.get Tables
    // 3.2 Loop for all group tables
    // 3.2.1 Get and add code to m_svg_code. Call of TableSvg.oneTable
    //
    // Please note that the group information not yet is used, i.e. no group
    // SVG elemnts are created. This means that it right now would be possible
    // to use the function getTableDataArrayFromXml and make one loop for all
    // tables.
    // The implemented two loops (groups and tables) is a preparation for the
    // future. Geometry (SVG) elements may be implemnted that shows the groups-
    // For instance group of tables and groups of seat rows.
    execute()
    {
        if (this.m_layout_xml == null)
        {
            alert("TableSvg.execute Layout XML object is null");

            return;
        }

        var all_tables_svg = '';

        this.setGeneralData();

        var group_data_array = getGroupDataArrayFromXml(this.m_layout_xml);

        var n_groups = group_data_array.length;

        // n_groups = 2; // QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ  Temp

        for (var index_group=0; index_group < n_groups; index_group++)
        {
            var group_data = group_data_array[index_group];

            var table_array = group_data.getTables();

            var n_tables = table_array.length;

            for (var index_table=0; index_table < n_tables; index_table++)
            {
                var table_data = table_array[index_table];

                all_tables_svg = all_tables_svg + this.oneTable(table_data);

            } // index_table

        } // index_group


        this.m_svg_code = all_tables_svg;
 
    } // execute

    // Set the general table properties from the layout XML file
    setGeneralData()
    {
        var general_data = getGeneralTableDataFromXml(this.m_layout_xml);
        this.m_color =              general_data.getColor();
        this.m_stroke_color =       general_data.getStrokeColor();
        this.m_stroke_width =       general_data.getStrokeWidth();
        this.m_text_rel_x_procent = general_data.getTextRelXProcent();
        this.m_text_rel_y_procent = general_data.getTextRelYProcent();
        this.m_text_color =         general_data.getTextColor(); 

    } // setGeneralData


    // Returns SVG code for one table
    // 1. Get table data from the input TableData object.
    //    General table data (object GeneralTableData) is also used. These data
    //    are member variables of class TableSvg
    // 2. Add SVG code for the table rectangle. Call of TableSvg.tableRectabgle.
    // 3. Add SVG code for the table text (table number). Call of TableSvg.tableText.
    // 4. Add SVG code for all the table seats (circles). Call of TableSvg.allSeats
    oneTable(i_table_data)
    {
        // Get table data from the layout XML file 
        var table_number =            i_table_data.getNumber();
        var upper_left_x =            i_table_data.getUpperLeftX();
        var upper_left_y =            i_table_data.getUpperLeftY();
        var table_width =             i_table_data.getWidth();
        var table_height =            i_table_data.getHeight();
        var table_text =              i_table_data.getText();

    


		var table_svg = '';

        table_svg = table_svg + this.tableRectangle(table_width, table_height, upper_left_x, upper_left_y);

        table_svg = table_svg + this.tableText(table_width, table_height, upper_left_x, upper_left_y, table_number);

        table_svg = table_svg + this.allSeats(i_table_data);

        return table_svg;

    } // oneTable

    // Returns SVG code for a table rectanle
    tableRectangle(i_table_width, i_table_height, i_upper_left_x, i_upper_left_y)
    {
        var ret_table_rect_svg = '';
        
        var table_width_pixel = parseInt(i_table_width*this.m_scale_dimension);  
        var table_height_pixel = parseInt(i_table_height*this.m_scale_dimension); 
        var table_upper_left_x_pixel = parseInt(i_upper_left_x*this.m_scale_dimension); 
        var table_upper_left_y_pixel = parseInt(i_upper_left_y*this.m_scale_dimension);
    
        var rect_svg = LayoutSvg.tab(4) + '<rect ' + ' x=' + table_upper_left_x_pixel + ' y=' + table_upper_left_y_pixel
                        + ' width=' + table_width_pixel + ' height=' + table_height_pixel     
                        + ' style="fill:' + this.m_color + ';stroke-width:' + this.m_stroke_width + ';stroke:' + this.m_stroke_color + '"' +  ' />';

        ret_table_rect_svg = ret_table_rect_svg + rect_svg;

        ret_table_rect_svg = ret_table_rect_svg + LayoutSvg.endRow();
        
        return ret_table_rect_svg;
        
    } // tableRectangle


    // Returns SVG code for the table text
    tableText(i_table_width, i_table_height, i_upper_left_x, i_upper_left_y, i_table_number)
    {
        var table_text_svg = '';
        
        var text_x = i_table_width;
        text_x = text_x*this.m_text_rel_x_procent;
        text_x = text_x/100.0;
        text_x = text_x + parseInt(i_upper_left_x);
       
        var text_y = i_table_height;
        text_y = text_y*this.m_text_rel_y_procent;
        text_y = text_y/100.0;
        text_y = text_y + parseInt(i_upper_left_y);
        
        var text_x_pixel = parseInt(text_x*this.m_scale_dimension);
        var text_y_pixel = parseInt(text_y*this.m_scale_dimension);
    
        var text_svg = LayoutSvg.tab(4) + '<text x=' + text_x_pixel + ' y=' + text_y_pixel + ' fill=' + 
            this.m_text_color + '>' + i_table_number + '</text>';

        table_text_svg = table_text_svg + text_svg;

        table_text_svg = table_text_svg + LayoutSvg.endRow();
        
        return table_text_svg;
        
    } // tableText

    // Returns SVG code for all the table seats (circles)
    // 1. Get table data from the input TableData object.
    // 2. Calculate the cirle radius. Call of calculateCircle. 
    // 3. Get an array of X pixel coordinates for the left  seats and the upper seat (last element)
    //    Call of TableSvg.getCirclePixelCoordinatesX
    // 4. Get an array of Y pixel coordinates for the right seats and the lower seat (last element)
    //    Call of TableSvg.getCirclePixelCoordinatesY
    // 5. Set a 'exist' boolean array for the left  seats plust the upper seat (last element)
    //    The array defines the seats (circles) that shall be created
    // 6. Set a 'exist' boolean array for the right seats plust the lower seat (last element)
    //    The array defines the seats (circles) that shall be created
    allSeats(i_table_data)
    {
        var table_number =            i_table_data.getNumber();
        var upper_left_x =            i_table_data.getUpperLeftX();
        var upper_left_y =            i_table_data.getUpperLeftY();
        var table_width =             i_table_data.getWidth();
        var table_height =            i_table_data.getHeight();
        var number_left_right_seats = i_table_data.getNumberLeftRightSeats();
        var seat_left_array =         i_table_data.getSeatLeftArray();
        var seat_right_array =        i_table_data.getSeatRightArray();
        var seat_upper =              i_table_data.getSeatUpper();
        var seat_lower =              i_table_data.getSeatLower();

        var circle_radius = this.circleRadius(table_width);

        var circle_radius_pixel = parseInt(circle_radius*this.m_scale_dimension); 

        var circle_coordinates_x_pixel_array = this.getCirclePixelCoordinatesX(table_width, upper_left_x, circle_radius);

        var circle_coordinates_y_pixel_array = this.getCirclePixelCoordinatesY(table_height, upper_left_y, number_left_right_seats, circle_radius);

        var circles_exist_left_array = seat_left_array;

        var circles_exist_right_array = seat_right_array;

        var index_last_element = circles_exist_left_array.length;

        circles_exist_left_array[index_last_element] = seat_upper;

        circles_exist_right_array[index_last_element] = seat_lower;


        var all_cirles_svg = '';

        // Please note that the end 'row' is the upper and lower seat
        var n_rows = circles_exist_left_array.length - 1;

        var row_number= -12345;

        for (var index_row=0; index_row < n_rows; index_row++)
        {
            row_number= index_row + 1;

            all_cirles_svg = all_cirles_svg +
                this.twoSeats(circles_exist_left_array, circles_exist_right_array, 
                            circle_coordinates_x_pixel_array, circle_coordinates_y_pixel_array, 
                            row_number, circle_radius_pixel, table_number);

        } // index_row

        var character_left  = SeatData.getSeatCharacterLeft(row_number + 1, circles_exist_left_array.length);
        var character_right  = SeatData.getSeatCharacterRight(row_number + 1, circles_exist_right_array.length);

        var index_y = parseInt(row_number);

        var one_cir_svg = this.oneSeat(circles_exist_left_array[index_y], circle_coordinates_x_pixel_array[2], circle_coordinates_y_pixel_array[index_y], 
                            circle_radius_pixel, character_left, "upper", table_number);

        all_cirles_svg = all_cirles_svg + one_cir_svg + LayoutSvg.endRow();

        index_y = index_y;

        one_cir_svg = this.oneSeat(circles_exist_right_array[index_y], circle_coordinates_x_pixel_array[3], circle_coordinates_y_pixel_array[index_y + 1], 
                                    circle_radius_pixel, character_right, "lower", table_number);

        all_cirles_svg = all_cirles_svg + one_cir_svg + LayoutSvg.endRow();

        return all_cirles_svg;

    } // allSeats

    // Returns SVG code for two seats (circles). The left and the right seat or the upper and lower seat (last elements in the input arrays)
    twoSeats(i_circles_exist_left_array, i_circles_exist_right_array, i_circle_coordinates_x_pixel, i_circle_coordinates_y_pixel, i_row_number, i_circle_radius_pixel, i_table_number)
    {		
        var ret_two_cir_svg = '';
        
        if (parseInt(i_row_number) < 1 || parseInt(i_row_number) > 20)
        {
            return ret_two_cir_svg;
        }
    
        var character_left  = SeatData.getSeatCharacterLeft(i_row_number, i_circles_exist_left_array.length);
        var character_right  = SeatData.getSeatCharacterRight(i_row_number, i_circles_exist_right_array.length);
        
        var index_y = parseInt(i_row_number) - 1;
        
        var one_cir_svg = this.oneSeat(i_circles_exist_left_array[index_y], i_circle_coordinates_x_pixel[0], i_circle_coordinates_y_pixel[index_y], 
                        i_circle_radius_pixel, character_left, "left", i_table_number);

        ret_two_cir_svg = ret_two_cir_svg + one_cir_svg + LayoutSvg.endRow();
        
        one_cir_svg = this.oneSeat(i_circles_exist_right_array[index_y], i_circle_coordinates_x_pixel[1], i_circle_coordinates_y_pixel[index_y], 
                    i_circle_radius_pixel, character_right, "right", i_table_number);

        ret_two_cir_svg = ret_two_cir_svg + one_cir_svg + LayoutSvg.endRow();
        
        return ret_two_cir_svg;
        
    } // twoSeats

    // Returns SVG code for one seat (circle) if it shall be created
    oneSeat(i_b_create_seat, i_circle_coordinate_x_pixel, i_circle_coordinate_y_pixel, i_circle_radius_pixel, i_seat_character, i_table_side, i_table_number)
    {
        var one_cir_svg = '';
        
        if (!i_b_create_seat)
        {
            return one_cir_svg;
        }
        
        var circle_id_str =  SeatData.getTableSeatCircleId(i_table_number, i_seat_character);
            
        var cir_svg = LayoutSvg.tab(4) + '<circle ' + ' cx=' + i_circle_coordinate_x_pixel + ' cy=' + i_circle_coordinate_y_pixel + ' r=' + i_circle_radius_pixel 
                    + ' id="' + circle_id_str + '" '  
                    + LayoutSvg.styleCursorPointer()
                    + '  stroke= "' + this.m_color_seat_circle +'" stroke-width= "4"  fill="' + this.m_fill_color_circle + '" />';

        one_cir_svg = one_cir_svg + cir_svg + LayoutSvg.endRow();
        
        var text_x_pixel = i_circle_coordinate_x_pixel;
        var text_y_pixel = i_circle_coordinate_y_pixel;
        if ("left" == i_table_side)
        {
            text_x_pixel = text_x_pixel + 2*i_circle_radius_pixel;
            text_y_pixel = text_y_pixel + 4;
        }
        else if ("right" == i_table_side)
        {
            text_x_pixel = text_x_pixel - 2*i_circle_radius_pixel - 8;
            text_y_pixel = text_y_pixel + 4;
        }
        else if ("upper" == i_table_side)
        {
            text_x_pixel = text_x_pixel - 4;
            text_y_pixel = text_y_pixel + 2*i_circle_radius_pixel + 6;
        }	   
        else if ("lower" == i_table_side)
        {
            text_x_pixel = text_x_pixel - 2;
            text_y_pixel = text_y_pixel - 2*i_circle_radius_pixel;
        }	   	   
        
        var circle_text_id_str =  SeatData.getTableSeatTextId(i_table_number, i_seat_character);
        
        var text_svg = LayoutSvg.tab(4) + '<text x=' + text_x_pixel + ' y=' + text_y_pixel + ' id="' + circle_text_id_str + '" ' + 
                        ' fill="' + this.m_text_color + '" >' + i_seat_character + '</text>';

        one_cir_svg = one_cir_svg + text_svg + LayoutSvg.endRow();
            
        return one_cir_svg;
	
    } // oneSeat

    // Return the circle (seat) radius. 
    // The value is dependent on the current table width, i.e. with different table widths the syze will vary
    // TODO Calculate it differently as average of all table widths or add it to GeneralTableData, i.e. define
    // the value in the layout XML file
    circleRadius(i_table_width)
    {
        return i_table_width/6.0;

    } // circleRadius

    // Returns the circle (seat) color for the creation of the layout HTML files
    // Reserved and not reserved circle colors are defined elsewhere
    circleFillColorLayout()
    {
        return 'blue';

    } // circleFillColorLayout

    // Returns an array of X coordinates as pixels for the left, right, top and bottom circles
    getCirclePixelCoordinatesX(i_table_width, i_upper_left_x, i_circle_radius)
    {
        
        var table_width_pixel = parseInt(i_table_width*this.m_scale_dimension);  
        var table_upper_left_x_pixel = parseInt(i_upper_left_x*this.m_scale_dimension); 
            
        var circle_radius_pixel = parseInt(i_circle_radius*this.m_scale_dimension);
        var delta_x_pixel = parseInt(this.m_stroke_width) + 2 + circle_radius_pixel;
        delta_x_pixel = - delta_x_pixel; 
        var circle_left_x_pixel = table_upper_left_x_pixel + delta_x_pixel;
        var circle_right_x_pixel = table_upper_left_x_pixel + table_width_pixel - delta_x_pixel;
        
        var circle_top_x_pixel = table_upper_left_x_pixel +  parseInt(table_width_pixel/2.0);
        var circle_bottom_x_pixel = circle_top_x_pixel;

        var ret_coordinates_x = new Array();  
        
        ret_coordinates_x[0] =  circle_left_x_pixel;
        ret_coordinates_x[1] =  circle_right_x_pixel;
        ret_coordinates_x[2] =  circle_top_x_pixel;
        ret_coordinates_x[3] =  circle_bottom_x_pixel;
            
        return ret_coordinates_x;	
        
    } // getCirclePixelCoordinatesX

    // Returns an array of Y coordinates as pixels for all left and right circles and for the top and bottom circles
    getCirclePixelCoordinatesY(i_table_height, i_upper_left_y, i_number_left_right_seats, i_circle_radius)
    { 
        if (parseInt(i_number_left_right_seats) < 2)
        {
            return null;
        }	
        
        var number_seat_rows = parseInt(i_number_left_right_seats/2.0);
        var delta_n = number_seat_rows + 1.0 + 1.0*(number_seat_rows-1);
        var delta_y = i_table_height/delta_n;
        delta_y_pixel = -delta_y_pixel; 
        var delta_y_pixel = parseInt(delta_y*this.m_scale_dimension);
        
        var table_upper_left_y_pixel = parseInt(i_upper_left_y*this.m_scale_dimension); 
        

        var circle_coordinates_y_pixel = new Array();
        for (var position_index=0; position_index<number_seat_rows; position_index++)
        {
            circle_coordinates_y_pixel[position_index] = table_upper_left_y_pixel + delta_y_pixel + position_index*2.0*delta_y_pixel;	   
        }
        
        var circle_radius_pixel = parseInt(i_circle_radius*this.m_scale_dimension);
        var delta_y_pixel = parseInt(this.m_stroke_width) + 2 + circle_radius_pixel;
        delta_y_pixel = -delta_y_pixel; 
        var table_height_pixel = parseInt(i_table_height*this.m_scale_dimension);
        
        var circle_top_y_pixel = table_upper_left_y_pixel + delta_y_pixel;
        var circle_bottom_y_pixel = table_upper_left_y_pixel + table_height_pixel - delta_y_pixel;
        
        circle_coordinates_y_pixel[number_seat_rows] = circle_top_y_pixel;
        circle_coordinates_y_pixel[number_seat_rows + 1] = circle_bottom_y_pixel;
        
    return circle_coordinates_y_pixel;
    
    } // getCirclePixelCoordinatesY

    // Get all SVG code for the body of the output HTML files
    get()
    {
        return this.m_svg_code;

    } // get

} // TableSvg

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Class Table Svg /////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
