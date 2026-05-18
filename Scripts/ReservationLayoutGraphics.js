// File: ReservationLayoutGraphics.js
// Date: 2026-05-18
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

        this.setConversionFactorMmToPixel();

        this.setContainerHeight();

        this.createGroupRectanglesHtmlArray();

        this.addTableGroupsRectangles();

    } // init

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

    // Set the height of the container HTML element based on the height of the layout model and the conversion factor mm to pixel
    setContainerHeight()
    {
        var height_mm = this.m_layout_model.m_premises_data.getHeight();

        var height_pixel = parseInt(height_mm * this.m_scale_dimension);

        LayoutGraphics.toConsole('LayoutGraphics.setContainerHeight Container height_mm: ' + height_mm +
            ' height_pixel: ' + height_pixel);

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

        this.m_el_div_graphics_pos_relative.innerHTML = all_groups_html;

        LayoutGraphics.toConsole('LayoutGraphics.addTableGroupsRectangles all_groups_html: \n' + all_groups_html);

    } // addTableGroupsRectangles

    // Debuc to console
    static toConsole(i_text_str)
    {
        console.log(i_text_str);
    } // toConsole

} // LayoutGraphics

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Class LayoutGraphics ////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////