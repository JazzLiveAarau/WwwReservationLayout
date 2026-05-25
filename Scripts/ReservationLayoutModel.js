// File: ReservationLayoutModel.js
// Date: 2026-05-25
// Author: Gunnar Lidén

// Inhalt
// =============
// Class holding all data for the layout (CAD) model


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Class LayoutModel /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Class for the layout (CAD) model. This class holds all data for the layout (CAD) model
class LayoutModel 
{
    constructor(i_layout_xml) 
    {
        ///////////////////////// Layout XML Objects ////////////////////////////////////////////////

        // Instance of the class ReservationLayoutXml
        this.m_layout_xml = i_layout_xml;

        // Instance of the class LayoutXmlTable
        this.m_layout_xml_table = null;

        ///////////////////////// Layout Data Objects //////////////////////////////////////////////

        // Array of TableGroupData objects from the layout xml object
        this.m_group_data_array = [];

        // Instance of the class PremisesData with general data for the premises from the layout xml object
        this.m_premises_data = null;

        // Instance of the class GeneralTableData with general data for tables from the layout xml object
        this.m_general_table_data = null;

        // Instance of the class StageData with stage data from the layout xml object
        this.m_stage_data = null;

        // Instance of the class CashierData with cashier data from the layout xml object
        this.m_cashier_data = null;

        // Instance of the class TextImageCaptionData with text image caption data from the layout xml object
        // TODO Should be an array of TextImageCaptionData objects 
        this.m_text_image_captions = null;

        // Array of ButtonData objects from the layout xml object
        this.m_button_data_array = [];

        // Array of DoorData objects from the layout xml object
        this.m_door_data_array = [];

        // Array of TableSeatsData objects with data for all table seats from the layout xml object
        this.m_tables_seats_array = null;

        // getTextImageCaptionsFromXml


        ///////////////////////// Bounding Boxes //////////////////////////////////////////////////////

        // Bounding box for the premises element
        this.m_premises_data_bounding_box = null;
        
        // Bounding box for all table groups without seats. 
        this.m_group_data_bounding_box = null;

        // Bounding box for all table groups with seats. 
        this.m_group_data_bounding_box_seats = null;

        // Bounding box for the stage element
        this.m_stage_bounding_box = null;

        // Bounding box for all button elements
        // Please note that the buttons are graphical layout elements
        this.m_buttons_bounding_box = null;

        // Please note that CashierData, DoorData and wall elements are graphical layout elements
        // - CashierData is only an image with image witdt and height defined in pixels
        // - DoorData is an element inside a wall
        // - Walls are defined as graphical representation of the premises element.

        ///////////////////////// Init Function //////////////////////////////////////////////////////

        this.init();

    } // constructor

    ///////////////////////// Init Function //////////////////////////////////////////////////////

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

        this.listAllLayoutDataObjects();

    } // init

    ///////////////////////// Layout Data Object Functions ///////////////////////////////////////

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

        this.getCashierData();

        this.getTextImageCaptions();

        this.getButtonDataArray();

        this.getDoorDataArray();

        this.getTablesSeatsDataArray();

        this.setBoundingBoxes();

    } // getAllLayoutDataObjects

    // Get all table group data as data objects (instances of class GroupData) of the from the layout XML object
    getTableGroupDataArray()
    {
        this.m_group_data_array = getGroupDataArrayFromXml(this.m_layout_xml);

        var n_groups = this.m_group_data_array.length;

        debugLayoutModel("LayoutModel.getTableGroupDataArray Number of table groups: " + n_groups);

        //QQthis.listTableGroups();

    } // getTableGroupDataArray


    // Get premises data as data object (instance of class PremisesData) 
    // from the layout XML object
    getPremisesData()
    {
        this.m_premises_data = getPremisesDataFromXml(this.m_layout_xml);

        // this.listPremisesData();

    } // getPremisesData

    // Get general table data as data object (instance of class GeneralTableData) 
    // from the layout XML object
    getGeneralTableData()
    {
        this.m_general_table_data = getGeneralTableDataFromXml(this.m_layout_xml);

        // this.listGeneralTableData();

    } // getGeneralTableData

    // Get stage data as data object (instance of class StageData) 
    // from the layout XML object
    // Please note that a stage object will be set (returned) even if stage data 
    // not is definded in the layout XML object. Member variable is set to not defined.
    getStageData()
    {
        this.m_stage_data = getStageDataFromXml(this.m_layout_xml);

        // this.listStageData();

    } // getStageData

    // Delete stage data from the layout model and layout XML object
    // 1. Delete stage element from the layout XML object
    // 2. Set stage is defined to false in the stage data object
    // 3. Bounding box for stage element is set to null
    deleteStageData()
    {
        if (!this.m_stage_data.stageIsDefined()) 
        {
            debugLayoutModel("LayoutModel.deleteStageData Stage is not defined in the layout model");

            return;
        }

        this.m_layout_xml.deleteStageNodes();

        this.m_stage_data.setStageIsDefined(false);

        this.m_stage_bounding_box = null;

    } // deleteStageData

    // Add stage data to the layout model and layout XML object
    // 1. Create stage data object with default values and set stage is defined to true
    // 2. Add stage element to the layout XML object with the stage data
    // 3. Get and set bounding box for stage element TODO
    addStageData()
    {
        if (this.m_stage_data.stageIsDefined()) 
        {
            debugLayoutModel("LayoutModel.addStageData Stage is already defined in the layout model");

            return;
        }

        var stage_case = 'get_default_data';

        var input_data_object = null;

        this.m_stage_data = new StageData(stage_case, this.m_layout_xml, input_data_object);

        this.m_layout_xml.appendStageNodes(this.m_stage_data);

        // ??? setBoundingBoxForStageData(this.m_stage_data, this.m_layout_xml);

        //???? this.m_layout_xml.addStageElement(this.m_stage_data);
        
    } // addStageData

    // Get cashier data as data object (instance of class CashierData) 
    // from the layout XML object
    getCashierData()
    {
        this.m_cashier_data = getCashierDataFromXml(this.m_layout_xml);

        // this.listCashierData();

    } // getCashierData

    // Get text image caption data as data object (instance of class TextImageCaptionData) 
    // from the layout XML object
    getTextImageCaptions()
    {
        this.m_text_image_captions = getTextImageCaptionsFromXml(this.m_layout_xml);

        // this.listImageCaptions();

    } // getTextImageCaptions

    // Get button data as data objects (instances of class ButtonData) from the layout XML object
    getButtonDataArray()
    {
        this.m_button_data_array = getButtonDataArrayFromXml(this.m_layout_xml);

        // this.listButtonDataArray();

    } // getButtonDataArray

    // Get door data as data objects (instances of class DoorData) from the layout XML object
    getDoorDataArray()
    {
        this.m_door_data_array = getDoorDataArrayFromXml(this.m_layout_xml);

        // this.listDoorDataArray();

    } // getDoorDataArray

    // Get table seats data as data objects (instances of class TableSeatsData) from the layout XML object
    getTablesSeatsDataArray()
    {
        this.m_tables_seats_array = getAllTablesSeatDataArray(this.m_layout_xml);

        // this.listTablesSeatsDataArray();

    } // getTablesSeatsDataArray


    ///////////////////////// Layout Bounding Box Functions //////////////////////////////////////

    // Get and set the boundary boxes for the layout elements
    setBoundingBoxes()
    {
        this.m_premises_data_bounding_box = getPremisesBoundingBoxFromXml(this.m_layout_xml);

        var debug_txt = "LayoutModel.setBoundingBoxes For premises element \n" +
            " MinX= " + this.m_premises_data_bounding_box.getXMin() + 
            " MaxX= " + this.m_premises_data_bounding_box.getXMax() + 
            " MinY= " + this.m_premises_data_bounding_box.getYMin() + 
            " MaxY= " + this.m_premises_data_bounding_box.getYMax();

        debugLayoutModel(debug_txt);

        this.m_group_data_bounding_box = getAllGroupDataBoundingBoxFromXml(this.m_layout_xml);

        var debug_txt = "LayoutModel.setBoundingBoxes For all tables without seats \n" +
            " MinX= " + this.m_group_data_bounding_box.getXMin() + 
            " MaxX= " + this.m_group_data_bounding_box.getXMax() + 
            " MinY= " + this.m_group_data_bounding_box.getYMin() + 
            " MaxY= " + this.m_group_data_bounding_box.getYMax();

        debugLayoutModel(debug_txt);

        this.m_group_data_bounding_box_seats = getAllGroupDataWithSeatsBoundingBoxFromXml(this.m_layout_xml);

        debug_txt = "LayoutModel.setBoundingBoxes For all tables with seats \n" +
            " MinX= " + this.m_group_data_bounding_box_seats.getXMin() + 
            " MaxX= " + this.m_group_data_bounding_box_seats.getXMax() + 
            " MinY= " + this.m_group_data_bounding_box_seats.getYMin() + 
            " MaxY= " + this.m_group_data_bounding_box_seats.getYMax();

        debugLayoutModel(debug_txt);    

        this.m_stage_bounding_box = getStageBoundingBoxFromXml(this.m_layout_xml);

        if (this.m_stage_bounding_box != null)
        {
            debug_txt = "LayoutModel.setBoundingBoxes For stage element \n" +
                " MinX= " + this.m_stage_bounding_box.getXMin() + 
                " MaxX= " + this.m_stage_bounding_box.getXMax() + 
                " MinY= " + this.m_stage_bounding_box.getYMin() + 
                " MaxY= " + this.m_stage_bounding_box.getYMax();           
        }
        else
        {
            debug_txt = "LayoutModel.setBoundingBoxes Stage element is not defined in the layout xml";
        }

        debugLayoutModel(debug_txt);

        this.m_buttons_bounding_box = getAllButtonsBoundingBoxFromXml(this.m_layout_xml);

        debug_txt = "LayoutModel.setBoundingBoxes For all button elements \n" +
            " MinX= " + this.m_buttons_bounding_box.getXMin() + 
            " MaxX= " + this.m_buttons_bounding_box.getXMax() + 
            " MinY= " + this.m_buttons_bounding_box.getYMin() + 
            " MaxY= " + this.m_buttons_bounding_box.getYMax();

        debugLayoutModel(debug_txt);
  
    } // setBoundingBoxes

    // Get the bounding box for the premises element
    getPremisesDataBoundingBox()
    {
        return this.m_premises_data_bounding_box;

    } // getPremisesDataBoundingBox

    // Get the bounding box for all table groups without seats
    getGroupDataBoundingBox()
    {
        return this.m_group_data_bounding_box;

    } // getGroupDataBoundingBox

    // Get the bounding box for all table groups with seats
    getGroupDataWithSeatsBoundingBox()
    {
        return this.m_group_data_bounding_box_seats;

    } // getGroupDataWithSeatsBoundingBox

    // Get the bounding box for the stage element
    getStageBoundingBox()
    {
        return this.m_stage_bounding_box;

    } // getStageBoundingBox

    // Get the bounding box for all button elements
    getButtonsBoundingBox()
    {
        return this.m_buttons_bounding_box;

    } // getButtonsBoundingBox

    ////////////////////// List functions for layout data objects //////////////////////////////
   
    // Function to list all layout data objects in the console log
    listAllLayoutDataObjects()
    {
        debugLayoutModel("LayoutModel.listAllLayoutDataObjects Enter");

        this.listTableGroups();

        //this.listPremisesData();

        //this.listGeneralTableData();

        //this.listTableGroups();

        //this.listCashierData();

        //this.listImageCaptions();

        //this.listButtonDataArray();

        //this.listDoorDataArray();

        //this.listTablesSeatsDataArray();

    } // listAllLayoutDataObjects

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

        debugLayoutModel("\tStage text= " + this.m_stage_data.getText());

        debugLayoutModel("\tStage color: " + this.m_stage_data.getColor());
        debugLayoutModel("\tStage stroke color: " + this.m_stage_data.getStrokeColor());
        debugLayoutModel("\tStage stroke width: " + this.m_stage_data.getStrokeWidth());
        debugLayoutModel("\tStage text relative X percent: " + this.m_stage_data.getTextRelXProcent());
        debugLayoutModel("\tStage text relative Y percent: " + this.m_stage_data.getTextRelYProcent());
        debugLayoutModel("\tStage text color: " + this.m_stage_data.getTextColor());

        debugLayoutModel("\tStage image: " + this.m_stage_data.getImage());
        debugLayoutModel("\tStage image width: " + this.m_stage_data.getImageWidth());
        debugLayoutModel("\tStage image height: " + this.m_stage_data.getImageHeight());

    } // listStageData

    // List cashier data in the console log
    listCashierData()
    {
        debugLayoutModel("LayoutModel.listCashierData Cashier data");

        if (!this.m_cashier_data.cashierIsDefined())
        {
            debugLayoutModel("\tCashier is NOT defined in the layout xml");

            return;
        }

        debugLayoutModel("\tCashier left corner coordinates " + this.m_cashier_data.getUpperLeftX() +
            ", " + this.m_cashier_data.getUpperLeftY());

        /* Not yet implemented in the layout xml
        debugLayoutModel("\tCashier width= " + this.m_cashier_data.getWidth() + " Cashier height= "
                                    + this.m_cashier_data.getHeight());
        debugLayoutModel("\tCashier text= " + this.m_cashier_data.getText());
        debugLayoutModel("\tCashier color: " + this.m_cashier_data.getColor());
        debugLayoutModel("\tCashier stroke color: " + this.m_cashier_data.getStrokeColor());
        debugLayoutModel("\tCashier stroke width: " + this.m_cashier_data.getStrokeWidth());
        debugLayoutModel("\tCashier text relative X percent: " + this.m_cashier_data.getTextRelXProcent());
        debugLayoutModel("\tCashier text relative Y percent: " + this.m_cashier_data.getTextRelYProcent());
        debugLayoutModel("\tCashier text color: " + this.m_cashier_data.getTextColor());
        Not yet implemented in the layout xml */

        debugLayoutModel("\tCashier image: " + this.m_cashier_data.getImage());
        debugLayoutModel("\tCashier image width: " + this.m_cashier_data.getImageWidth());
        debugLayoutModel("\tCashier image height: " + this.m_cashier_data.getImageHeight());

    } // listCashierData

    // List text image caption data in the console log
    listImageCaptions()
    {
        debugLayoutModel("LayoutModel.listImageCaptions Text image caption data TODO Should be an array of TextImageCaptionData objects");

    } // listImageCaptions


    // List button data in the console log
    listButtonDataArray()
    {
        var n_buttons = this.m_button_data_array.length;

        debugLayoutModel("LayoutModel.listButtonDataArray Number of buttons: " + n_buttons);

        for (var index_button = 0; index_button < n_buttons; index_button++)
        {
            var button_data = this.m_button_data_array[index_button];

            debugLayoutModel("\tIdentity: " + button_data.getId() );

            debugLayoutModel("\tTitle: " + button_data.getTitle() );

            debugLayoutModel("\tEvent Function: " + button_data.getEventFunction() );

            debugLayoutModel("\tUpper Left X: " + button_data.getUpperLeftX() );
            debugLayoutModel("\tUpper Left Y: " + button_data.getUpperLeftY() );

            debugLayoutModel("\tWidth: " + button_data.getWidth() );
            debugLayoutModel("\tHeight: " + button_data.getHeight() );

            debugLayoutModel("\tImage identity: " + button_data.getImageId() );

            debugLayoutModel("\tImage event function: " + button_data.getImageEventFunction() );

            debugLayoutModel("\tImage one:   " + button_data.getImageOne() );
            debugLayoutModel("\tImage two:   " + button_data.getImageTwo() );
            debugLayoutModel("\tImage three: " + button_data.getImageThree() );

            debugLayoutModel("\tIImage width: " + button_data.getImageWidth() );
            debugLayoutModel("\tImage height: " + button_data.getImageHeight() );

            debugLayoutModel("\tType: " + button_data.getType() );

            // getWidth

        }

    } // listButtonDataArray

    // List door data in the console log
    // TODO Implement undefined doors
    listDoorDataArray()
    {
        var n_doors = this.m_door_data_array.length;

        debugLayoutModel("LayoutModel.listDoorDataArray Number of doors: " + n_doors);

        for (var index_door = 0; index_door < n_doors; index_door++)
        {
            var door_data = this.m_door_data_array[index_door];

            debugLayoutModel("\tType: " + door_data.getType() );

            debugLayoutModel("\tPosition: " + door_data.getPosition() );

            debugLayoutModel("\tHeight: " + door_data.getHeight() );

            debugLayoutModel("\tText: " + door_data.getText() );
            debugLayoutModel("\tImage: " + door_data.getImage() );

            debugLayoutModel("\tImage width: " + door_data.getImageWidth() );
            debugLayoutModel("\tImage height: " + door_data.getImageHeight() );

        }

    } // listDoorDataArray

    // List table seats data in the console log
    listTablesSeatsDataArray()
    {
        var n_tables_seats = this.m_tables_seats_array.length;

        debugLayoutModel("LayoutModel.listTablesSeatsDataArray Number of tables seats data: " + n_tables_seats);

        for (var index_table_seats = 0; index_table_seats < n_tables_seats; index_table_seats++)
        {
            var table_seat_data = this.m_tables_seats_array[index_table_seats];

            debugLayoutModel("\tCreate seat (boolean): " + table_seat_data.getCreateSeat().toString() );

            debugLayoutModel("\tRow or table number: " + table_seat_data.getRowOrTableNumber() );

            debugLayoutModel("\tSeat number or char: " + table_seat_data.getSeatNumberOrChar() );

            debugLayoutModel("\tCircle id: " + table_seat_data.getCircleId() );

            debugLayoutModel("\tText id: " + table_seat_data.getTextId() );

        }

    } // listTablesSeatsDataArray


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

