// File: ReservationLayoutGraphics.js
// Date: 2026-05-22
// Author: Gunnar Lidén

// Inhalt
// =============
// Class handling the graphics (drawing of) the layout (CAD) model


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Class LayoutGraphics //////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Class for handling the graphics (drawing of) the layout (CAD) model
class LayoutGraphics 
{
    constructor(i_layout_model, i_container_html_element) 
    {
        this.m_layout_model = i_layout_model;

        this.m_container_html_element = i_container_html_element;

        // The id for the div element with position relative to the container HTML element
        this.m_id_div_graphics_pos_relative = 'id_div_layout_graphics_pos_relative';

        // The div element with position relative to the container HTML element
        this.m_el_div_graphics_pos_relative = null;

        // The conversion factor mm to pixel
        this.m_scale_dimension = 0.123456789;

        // Array of HTML code for the drawing of the group of tables as rectangles
        this.m_group_rectangles_html_array = [];

        // Array of HTML code for the drawing of the buttons
        this.m_all_buttons_html_array = [];

        // The HTML code for the drawing of the stage
        this.m_stage_html_str = '';

        // The HTML code for the drawing of the walls
        this.m_walls_html_str = '';

        // The HTML code for the drawing of the organizer
        this.m_organizer_html_str = '';

        // The HTML code for the drawing of the cashier
        this.m_cashier_html_str = '';

        // Array of HTML code for the drawing of the doors
        this.m_all_doors_html_array = [];

        this.init();

    } // constructor

    init()
    {
        LayoutGraphics.toConsole('LayoutGraphics.init Enter');

        if (this.m_layout_model == null || this.m_container_html_element == null)
        {
            alert('Error: LayoutGraphics.init: Layout model or container HTML element is null');

            return;
        }

        this.addContainerPositionRelative();

        this.drawAllHtmlGraphics();

    } // init

    // Draw all the graphics (HTML code) for the layout (CAD) model
    drawAllHtmlGraphics()
    {
        LayoutGraphics.toConsole('LayoutGraphics.drawAllHtmlGraphics Enter');

        this.setConversionFactorMmToPixel();

        this.createAllGraphics();

        this.addAllGraphics();

    } //drawAllHtmlGraphics

    // Create the graphics HTML objects for the layout (CAD) model
    createAllGraphics()
    {
        LayoutGraphics.toConsole('LayoutGraphics.createAllGraphics Enter');

        this.setContainerHeight();

        this.createGroupRectanglesHtmlArray();

        this.createAllButtonsHtmlArray();

        this.createStageHtml();

        this.createWallsHtml();

        this.createOrganizerHtml();

        this.createCashierHtml();

        this.createAllDoorsHtmlArray();

    } // createAllGraphics

    // Add the graphics HTML objects for the layout (CAD) model to the 
    // graphics container HTML element
    addAllGraphics()
    {
        LayoutGraphics.toConsole('LayoutGraphics.addAllGraphics Enter');

        this.m_el_div_graphics_pos_relative.innerHTML = '';

        this.addTableGroupsRectangles();

        this.addAllButtons();
        
        this.addStage();

        this.addWalls();   

        this.addOrganizer();

        this.addCashier();

        this.addAllDoors();

    } // addAllGraphics

    // Add a div element with position relative to the container HTML element
    addContainerPositionRelative()
    {
        var div_relative_htm = '<div id= "' + this.m_id_div_graphics_pos_relative + '"   class="cl_div_layout_graphics_pos_relative">';

        this.m_container_html_element.innerHTML = div_relative_htm;

        this.m_el_div_graphics_pos_relative = document.getElementById(this.m_id_div_graphics_pos_relative);

        LayoutGraphics.toConsole('LayoutGraphics.addContainerPositionRelative div_relative_htm: \n' + div_relative_htm);
    }

    // Set the conversion factor mm to pixel
    setConversionFactorMmToPixel()
    {
        var width_mm = this.m_layout_model.m_premises_data.getWidth();
       
        var width_pixel = this.m_el_div_graphics_pos_relative.offsetWidth;

        this.m_scale_dimension = width_pixel / width_mm;

        LayoutGraphics.toConsole('LayoutGraphics.setConversionFactorMmToPixel width_mm: ' + width_mm + 
            ' width_pixel: ' + width_pixel + ' m_scale_dimension: ' + this.m_scale_dimension);

    } // setConversionFactorMmToPixel

    // Set the height of the container HTML element based on the height of premises 
    // bounding box and the conversion factor mm to pixel
    setContainerHeight()
    {
        var premises_bounding_box = this.m_layout_model.getPremisesDataBoundingBox();

        var width_mm = premises_bounding_box.getWidth();

        var height_mm = premises_bounding_box.getHeight();

        var width_pixel = parseInt(width_mm * this.m_scale_dimension);

        var height_pixel = parseInt(height_mm * this.m_scale_dimension);

        LayoutGraphics.toConsole('LayoutGraphics.setContainerHeight Container width_mm: ' + width_mm + ' height_mm: ' + height_mm +
            ' width_pixel: ' + width_pixel + ' height_pixel: ' + height_pixel);

        this.m_container_html_element.style.width = width_pixel + 'px';

        this.m_container_html_element.style.height = height_pixel + 'px';

    } // setContainerHeight

    // Create the array of HTML code for the drawing of the group of tables as rectangles
    createGroupRectanglesHtmlArray()
    {
        LayoutGraphics.toConsole('LayoutGraphics.createGroupRectanglesHtmlArray Enter');

        this.m_group_data_array = this.m_layout_model.m_group_data_array;

        for (var index_group = 0; index_group < this.m_group_data_array.length; index_group++)
        {
            var table_group_data = this.m_group_data_array[index_group];

            var b_boundary = false; // TODO

            var table_group_html_input_data = 
            new TableGroupHtmlData(table_group_data, this.m_scale_dimension, b_boundary, 'table-group_TODO', 'cl_div_table_rectangle_pos_absolute');

            var table_group_html = new TableGroupHtml(table_group_html_input_data);
            
            this.m_group_rectangles_html_array.push(table_group_html.get());
        }

    } // createGroupRectanglesHtmlArray

    // Draw the layout (CAD) model
    addTableGroupsRectangles()
    {
        LayoutGraphics.toConsole('LayoutGraphics.addTableGroupsRectangles Enter');

        var n_groups = this.m_group_rectangles_html_array.length;

        var all_groups_html = '';

        for (var index_group = 0; index_group < n_groups; index_group++)
        {
            var group_rectangle_html = this.m_group_rectangles_html_array[index_group];

            all_groups_html += group_rectangle_html + '\n';
        }

        // Note += to add to the existing HTML code in the graphics div container
        this.m_el_div_graphics_pos_relative.innerHTML += all_groups_html; 

        LayoutGraphics.toConsole('LayoutGraphics.addTableGroupsRectangles all_groups_html: \n' + all_groups_html);

    } // addTableGroupsRectangles

    // this.m_all_buttons_html_array = [];

    // Create the array of HTML code for the drawing of the buttons
    createAllButtonsHtmlArray()
    {
        LayoutGraphics.toConsole('LayoutGraphics.createAllButtonsHtmlArray Enter');

        this.m_button_data_array = this.m_layout_model.m_button_data_array;

        for (var index_button = 0; index_button < this.m_button_data_array.length; index_button++)
        {
            var button_data = this.m_button_data_array[index_button];

            var button_html = new ButtonHtml(button_data, this.m_scale_dimension, 'cl_div_button_pos_absolute');
            
            this.m_all_buttons_html_array.push(button_html.get());
        }

    } // createAllButtonsHtmlArray

    // Add the buttons to the layout (CAD) model drawing
    addAllButtons()
    {
        LayoutGraphics.toConsole('LayoutGraphics.addAllButtons Enter');

        this.m_button_data_array = this.m_layout_model.m_button_data_array;

        var n_buttons = this.m_all_buttons_html_array.length;

        var all_buttons_html = '';

        for (var index_button = 0; index_button < n_buttons; index_button++)
        {
            var button_html = this.m_all_buttons_html_array[index_button];

            all_buttons_html += button_html + '\n';
        }

        // Note += to add to the existing HTML code in the graphics div container
        this.m_el_div_graphics_pos_relative.innerHTML += all_buttons_html;

        LayoutGraphics.toConsole('LayoutGraphics.addAllButtons all_buttons_html: \n' + all_buttons_html);

    } // addAllButtons

    // Create the HTML code for the drawing of the stage
    createStageHtml()
    {
        LayoutGraphics.toConsole('LayoutGraphics.createStageHtml Enter');

        var stage_data = this.m_layout_model.m_stage_data;

        var stage_html = new StageHtml(stage_data, this.m_scale_dimension, 'cl_div_stage_pos_absolute');

        this.m_stage_html_str = stage_html.get();

    } // createStageHtml

    // Add the stage to the layout (CAD) model drawing
    addStage()
    {
        LayoutGraphics.toConsole('LayoutGraphics.addStage Enter');

        if (this.m_stage_html_str)
        {
            // Note += to add to the existing HTML code in the graphics div container
            this.m_el_div_graphics_pos_relative.innerHTML += this.m_stage_html_str;
        }

    } // addStage

    // Create the HTML code for the drawing of the walls
    createWallsHtml()
    {
        LayoutGraphics.toConsole('LayoutGraphics.createWallsHtml Enter');

        var premises_data = this.m_layout_model.m_premises_data;

        var wall_html = new WallHtml(premises_data, this.m_scale_dimension, 'cl_div_wall_pos_absolute');

        this.m_walls_html_str = wall_html.get();

    } // createWallsHtml

    // Add the walls to the layout (CAD) model drawing
    addWalls()
    {
        LayoutGraphics.toConsole('LayoutGraphics.addWalls Enter');

        if (this.m_walls_html_str)
        {
            // Note += to add to the existing HTML code in the graphics div container
            this.m_el_div_graphics_pos_relative.innerHTML += this.m_walls_html_str;
        }

    } // addWalls

    // Create the HTML code for the drawing of the organizer
    createOrganizerHtml()
    {
        LayoutGraphics.toConsole('LayoutGraphics.createOrganizerHtml Enter');

        var premises_data = this.m_layout_model.m_premises_data;

        var organizer_html = new OrganizerHtml(premises_data, this.m_scale_dimension, 'cl_div_organizer_pos_absolute');

        this.m_organizer_html_str = organizer_html.get();

    } // createOrganizerHtml

    // Add the organizer to the layout (CAD) model drawing
    addOrganizer()
    {
        LayoutGraphics.toConsole('LayoutGraphics.addOrganizer Enter');

        if (this.m_organizer_html_str)
        {
            // Note += to add to the existing HTML code in the graphics div container
            this.m_el_div_graphics_pos_relative.innerHTML += this.m_organizer_html_str;
        }

    } // addOrganizer

    // Create the HTML code for the drawing of the cashier
    createCashierHtml()
    {
        LayoutGraphics.toConsole('LayoutGraphics.createCashierHtml Enter'); 

        var cashier_data = this.m_layout_model.m_cashier_data;

        var cashier_html = new CashierHtml(cashier_data, this.m_scale_dimension, 'cl_div_cashier_pos_absolute');

        this.m_cashier_html_str = cashier_html.get();

    } // createCashierHtml

    // Add the cashier to the layout (CAD) model drawing
    addCashier()
    {
        LayoutGraphics.toConsole('LayoutGraphics.addCashier Enter');

        if (this.m_cashier_html_str)
        {
            // Note += to add to the existing HTML code in the graphics div container
            this.m_el_div_graphics_pos_relative.innerHTML += this.m_cashier_html_str;
        }

    } // addCashier

    // Create the array of HTML code for the drawing of the doors
    createAllDoorsHtmlArray()
    {
        LayoutGraphics.toConsole('LayoutGraphics.createAllDoorsHtmlArray Enter');

        this.m_door_data_array = this.m_layout_model.m_door_data_array;

         var premises_data = this.m_layout_model.m_premises_data;

        for (var index_door = 0; index_door < this.m_door_data_array.length; index_door++)
        {
            var door_data = this.m_door_data_array[index_door];

            var door_id = 'id_door_' + (index_door +1).toString();

            var door_html = new DoorHtml(door_data, premises_data, this.m_scale_dimension, 'cl_div_door_pos_absolute', door_id);
            
            this.m_all_doors_html_array.push(door_html.get());
        }

    } // createAllDoorsHtmlArray

    // Add the doors to the layout (CAD) model drawing
    addAllDoors()
    {
        LayoutGraphics.toConsole('LayoutGraphics.addAllDoors Enter');

        this.m_door_data_array = this.m_layout_model.m_door_data_array;

        var n_doors = this.m_all_doors_html_array.length;

        var all_doors_html = '';

        for (var index_door = 0; index_door < n_doors; index_door++)
        {
            var door_html = this.m_all_doors_html_array[index_door];

            all_doors_html += door_html + '\n';
        }

        // Note += to add to the existing HTML code in the graphics div container
        this.m_el_div_graphics_pos_relative.innerHTML += all_doors_html;

        LayoutGraphics.toConsole('LayoutGraphics.addAllDoors all_doors_html: \n' + all_doors_html);

    } // addAllDoors















    // Debug: Write text to the console
    static toConsole(i_text_str)
    {
        console.log(i_text_str);
    } // toConsole

} // LayoutGraphics

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Class LayoutGraphics ////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////