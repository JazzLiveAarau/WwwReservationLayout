// File: ReservationLayoutModel.js
// Date: 2026-05-14
// Author: Gunnar Lidén

// Inhalt
// =============
//Class holding all data for the layout (CAD) model


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Class ReservationLayoutModel //////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

class ReservationLayoutModel 
{
    constructor(i_layout_xml) 
    {
        // Instance of the class ReservationLayoutXml
        this.m_layout_xml = i_layout_xml;

        // Instance of the class LayoutXmlTable
        this.m_layout_xml_table = null;

        // Instances of the class TableGroup
        this.m_table_group_array = [];

        // Instance of the class TableProperties with general data for tables from the layout xml object
        this.m_table_properties = null;

        this.init();

    } // constructor

    // Init function for the class ReservationLayoutModel. 
    // 1. Create an instance of the class LayoutXmlTable 
    // 2. Get table data from the layout xml and set it to the class variables
    init()
    {
        debugLayoutModel("ReservationLayoutModel.init start");

        this.m_layout_xml_table = new LayoutXmlTable(this.m_layout_xml);

        debugLayoutModel("ReservationLayoutModel.init Instance of LayoutXmlTable created");

        this.getTableDataFromXml();

        this.getTablePropertiesFromXml();

    } // init

    // Function to get table data from the layout xml and set it to the class variables
    getTableDataFromXml()
    {
        debugLayoutModel("ReservationLayoutModel.getTableDataFromXml Enter");

        this.m_table_group_array = this.m_layout_xml_table.getTableGroupArray();

        this.listTableGroups();

    } // getTableDataFromXml

    // Function to get table properties from the layout xml and set it to the class variable
    getTablePropertiesFromXml()
    {
        debugLayoutModel("ReservationLayoutModel.getTablePropertiesFromXml Enter");

        this.m_table_properties = this.m_layout_xml_table.getTableProperties();

        this.listTableProperties();

    } // getTablePropertiesFromXml

    // Function to list table groups in the console log
    listTableGroups()
    {
        debugLayoutModel("ReservationLayoutModel.listTableGroups Enter");

        var n_table_groups = this.m_table_group_array.length;

        debugLayoutModel("ReservationLayoutModel.listTableGroups n_table_groups: " + n_table_groups);

        for (var index_group = 0; index_group < n_table_groups; index_group++)
        {
            var table_group = this.m_table_group_array[index_group];

            

            var table_array = table_group.getTableArray();

            var n_tables = table_array.length;

            debugLayoutModel("Table Group Text: " + table_group.getText() + " Number of tables: " + n_tables);

            for (var index_table = 0; index_table < n_tables; index_table++)
            {
                var current_table = table_array[index_table];

                this.listTable(current_table);

            } //index_table

        } //index_group


    } // listTableGroups

    // Function to list table data in the console log
    listTable(i_table)
    {
        debugLayoutModel("ReservationLayoutModel.listTable Table data");
    
        debugLayoutModel("\tTable number (identity): " + i_table.getNumber());

        debugLayoutModel("\tLeft corner coordinates " + i_table.getUpperLeftX() + 
                        ", " + i_table.getUpperLeftY());

        debugLayoutModel("\tTable width= " + i_table.getWidth() + " Table height= " 
                                    + i_table.getHeight());

        debugLayoutModel("\tNumber of seats= " + i_table.getNumberLeftRightSeats());

        debugLayoutModel("\tTable text= " + i_table.getText());

    } // listTable

    // List table general data in the console log
    listTableProperties()
    {
        debugLayoutModel("ReservationLayoutModel.listTableProperties Table properties data");

        debugLayoutModel("\tTable color: " + this.m_table_properties.getColor());
        debugLayoutModel("\tTable stroke color: " + this.m_table_properties.getStrokeColor());
        debugLayoutModel("\tTable stroke width: " + this.m_table_properties.getStrokeWidth());
        debugLayoutModel("\tTable text relative X percent: " + this.m_table_properties.getTextRelXProcent());
        debugLayoutModel("\tTable text relative Y percent: " + this.m_table_properties.getTextRelYProcent());
        debugLayoutModel("\tTable text color: " + this.m_table_properties.getTextColor());

    } // listTableProperties

} // ReservationLayoutModel


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Class ReservationLayoutModel ////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Debug function for the class ReservationLayoutModel
function debugLayoutModel(i_text)
{
    console.log(i_text);

} // debugLayoutModel
