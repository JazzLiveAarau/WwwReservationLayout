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

        this.createGroupRectanglesHtmlArray();

    } // init

    // Create the array of HTML code for the drawing of the group of tables as rectangles
    createGroupRectanglesHtmlArray()
    {
        LayoutGraphics.toConsole('LayoutGraphics.createGroupRectanglesHtmlArray Enter');

        this.m_group_data_array = this.m_layout_model.m_group_data_array;

        for (var index_group = 0; index_group < this.m_group_data_array.length; index_group++)
        {
            var table_group_data = this.m_group_data_array[index_group];

            var scale_dimension = 0.5678; // TODO

            var b_boundary = false; // TODO

            var table_group_html_input_data = 
            new TableGroupHtmlData(table_group_data, scale_dimension, b_boundary, 'table-group', 'table');

            var table_group_html = new TableGroupHtml(table_group_html_input_data);
            
            // this.m_group_rectangles_html_array.push(table_group_html.get());
        }

    } // createGroupRectanglesHtmlArray

    // Draw the layout (CAD) model
    drawLayout()
    {
        // TODO
    } // drawLayout

    // Debuc to console
    static toConsole(i_text_str)
    {
        console.log(i_text_str);
    } // toConsole

} // LayoutGraphics

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Class LayoutGraphics ////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////