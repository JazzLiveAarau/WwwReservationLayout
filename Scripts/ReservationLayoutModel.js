// File: LayoutModel.js
// Date: 2026-05-17
// Author: Gunnar Lidén

// Inhalt
// =============
// Class holding all data for the layout (CAD) model


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Class LayoutModel /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

class LayoutModel 
{
    constructor(i_layout_xml) 
    {
        // Instance of the class ReservationLayoutXml
        this.m_layout_xml = i_layout_xml;

        // Instance of the class LayoutXmlTable
        this.m_layout_xml_table = null;

        // Array of TableGroupData objects from the layout xml object
        this.m_group_data_array = [];

        // Instance of the class PremisesData with general data for the premises from the layout xml object
        this.m_premises_data = null;

        // Instance of the class GeneralTableData with general data for tables from the layout xml object
        this.m_general_table_data = null;

        // Instance of the class StageData with stage data from the layout xml object
        this.m_stage_data = null;


        this.init();

    } // constructor

    // Init function for the class LayoutModel. 
    // 1. Create an instance of the class LayoutXmlTable 
    // 2. Get all layout data objects from the layout xml and set it to the class variables
    //    Call of LayoutModel.getAllLayoutDataObjects
    init()
    {
        debugLayoutModel("LayoutModel.init start");

        this.m_layout_xml_table = new LayoutXmlTable(this.m_layout_xml);

        debugLayoutModel("LayoutModel.init Instance of LayoutXmlTable created");

        this.getAllLayoutDataObjects();


    } // init

    // Get all geometry elements as data objects of the from the layout XML object 
    // store them in this class. 
    // Please refer to code from ReservationLayoutSvg.js
    getAllLayoutDataObjects()
    {
        debugLayoutModel("LayoutModel.getAllLayoutDataObjects Enter");

        this.getTableGroupDataArray();

        this.getPremisesData();

        this.getGeneralTableData();

        this.getStageData();

    } // getAllLayoutDataObjects

    // Get all table group data as data objects (instances of class GroupData) of the from the layout XML object
    getTableGroupDataArray()
    {
        this.m_group_data_array = getGroupDataArrayFromXml(this.m_layout_xml);

        var n_groups = this.m_group_data_array.length;

        debugLayoutModel("LayoutModel.getTableGroupDataArray Number of table groups: " + n_groups);

        this.listTableGroups();

    } // getTableGroupDataArray


    // Get premises data as data object (instance of class PremisesData) 
    // from the layout XML object
    getPremisesData()
    {
        this.m_premises_data = getPremisesDataFromXml(this.m_layout_xml);

        this.listPremisesData();

    } // getPremisesData

    // Get general table data as data object (instance of class GeneralTableData) 
    // from the layout XML object
    getGeneralTableData()
    {
        this.m_general_table_data = getGeneralTableDataFromXml(this.m_layout_xml);

        this.listGeneralTableData();

    } // getGeneralTableData

    // Get stage data as data object (instance of class StageData) 
    // from the layout XML object
    getStageData()
    {
        this.m_stage_data = getStageDataFromXml(this.m_layout_xml);

        this.listStageData();

    } // getStageData



   // Function to list table groups in the console log
    listTableGroups()
    {
        debugLayoutModel("LayoutModel.listTableGroups Enter");

        var n_table_groups = this.m_group_data_array.length;

        debugLayoutModel("LayoutModel.listTableGroups n_table_groups: " + n_table_groups);

        for (var index_group = 0; index_group < n_table_groups; index_group++)
        {
            var table_group = this.m_group_data_array[index_group];

            var table_array = table_group.getTables();

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
        debugLayoutModel("LayoutModel.listTable Table data");
    
        debugLayoutModel("\tTable number (identity): " + i_table.getNumber());

        debugLayoutModel("\tLeft corner coordinates " + i_table.getUpperLeftX() + 
                        ", " + i_table.getUpperLeftY());

        debugLayoutModel("\tTable width= " + i_table.getWidth() + " Table height= " 
                                    + i_table.getHeight());

        debugLayoutModel("\tNumber of seats= " + i_table.getNumberLeftRightSeats());

        debugLayoutModel("\tTable text= " + i_table.getText());

    } // listTable

    // Function to list premises data in the console log
    listPremisesData()
    {
        debugLayoutModel("LayoutModel.listPremisesData Premises data"); 

        debugLayoutModel("\tPremises width= " + this.m_premises_data.getWidth() + 
            " Premises height= " + this.m_premises_data.getHeight());

        debugLayoutModel("\tPremises wall thickness= " + this.m_premises_data.getWallThickness());

        debugLayoutModel("\tPremises max width pixel= " + this.m_premises_data.getMaxWidthPixel());

        if (this.m_premises_data.organizerIsDefined())
        {
            debugLayoutModel("\tPremises organizer name= " + this.m_premises_data.getOrganizerName());
        }
        else
        {
            debugLayoutModel("\tPremises organizer is NOT defined in the layout xml");
        }

        if (this.m_premises_data.sponsorIsDefined())
        {
            debugLayoutModel("\tPremises sponsor image= " + this.m_premises_data.getSponsorsImage());
        }
        else
        {
            debugLayoutModel("\tPremises sponsor is NOT defined in the layout xml");
        }

    } // listPremisesData


    // List table general data in the console log
    listGeneralTableData()
    {
        debugLayoutModel("LayoutModel.listGeneralTableData Table properties data");

        debugLayoutModel("\tTable color: " + this.m_general_table_data.getColor());
        debugLayoutModel("\tTable stroke color: " + this.m_general_table_data.getStrokeColor());
        debugLayoutModel("\tTable stroke width: " + this.m_general_table_data.getStrokeWidth());
        debugLayoutModel("\tTable text relative X percent: " + this.m_general_table_data.getTextRelXProcent());
        debugLayoutModel("\tTable text relative Y percent: " + this.m_general_table_data.getTextRelYProcent());
        debugLayoutModel("\tTable text color: " + this.m_general_table_data.getTextColor());

    } // listGeneralTableData

    // List stage data in the console log
    listStageData()
    {
        debugLayoutModel("LayoutModel.listStageData Stage data");

        if (!this.m_stage_data.stageIsDefined())
        {
            debugLayoutModel("\tStage is NOT defined in the layout xml");

            return;
        }

        debugLayoutModel("\tStage left corner coordinates " + this.m_stage_data.getUpperLeftX() +
            ", " + this.m_stage_data.getUpperLeftY());

        debugLayoutModel("\tStage width= " + this.m_stage_data.getWidth() + " Stage height= " 
                                    + this.m_stage_data.getHeight());

    } // listStageData


} // LayoutModel


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Class LayoutModel ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Debug Function ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Debug function for the class LayoutModel
function debugLayoutModel(i_text)
{
    console.log(i_text);

} // debugLayoutModel

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Debug Function //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////


/*
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

    // Init function for the class LayoutModel. 
    // 1. Create an instance of the class LayoutXmlTable 
    // 2. Get table data from the layout xml and set it to the class variables
    init()
    {
        debugLayoutModel("LayoutModel.init start");

        this.m_layout_xml_table = new LayoutXmlTable(this.m_layout_xml);

        debugLayoutModel("LayoutModel.init Instance of LayoutXmlTable created");

        this.getTableDataFromXml();

        this.getTablePropertiesFromXml();

    } // init

    // Function to get table data from the layout xml and set it to the class variables
    getTableDataFromXml()
    {
        debugLayoutModel("LayoutModel.getTableDataFromXml Enter");

        this.m_table_group_array = this.m_layout_xml_table.getTableGroupArray();

        this.listTableGroups();

    } // getTableDataFromXml





*/
