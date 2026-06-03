// File: ReservationLayoutCommon.js
// Date: 2026-06-03
// Authors: Gunnar Lidén

// Content
// =======
//
// Reservation layout common classes and functions
//

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Class Premises Data ///////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Class holding premises
class PremisesData
{
    // Creates the instance of the class
    // i_case: get_data_from_xml, get_default_data, set_xml_object, check_data
    // i_layout_xml: Object for a reservation layout XML file. May be null for case get_default_data
    constructor(i_case, i_layout_xml, i_input_data_object) 
    {
        // Member variables
        // ================

        // Constructor case
        this.m_case = i_case;

       // Layout XML object
       this.m_layout_xml = i_layout_xml;

       // An instance of this class to be used for case set_xml_object
       this.m_input_data_object = i_input_data_object;

       this.m_name = "";
       this.m_width = -12345;
       this.m_height = -12345;
       this.m_wall_thickness = -12345;
       this.m_max_width_pixel = -12345;  
       this.m_max_reservation_procent = -12345;

       this.m_organizer_is_defined = false;

       this.m_organizer_name = "";
       this.m_organizer_text_logo = "";
       this.m_organizer_text_logo_width = "";
       this.m_organizer_text_logo_height = "";
       this.m_organizer_logo = "";
       this.m_organizer_logo_width = "";
       this.m_organizer_logo_height = "";

       this.m_sponsor_is_defined = false;

       this.m_sponsors_image = "";
       this.m_sponsors_image_width = "";
       this.m_sponsors_image_height = "";

       // Instance of the class BoundingBox
       this.m_bounding_box = null;
	   
       this.execute();

    } // constructor

    // Execute
    execute()
    {
        if (this.m_case == "get_data_from_xml")
        {
            this.setDataFromXml();

            this.setBoundingBox();
        }
        else
        {
            alert("PremisesData.execute Not yet an implemented case " + this.m_case);
        }

    } // execute

    // Sets the bounding box for the premises based on the width and height of the premises
    setBoundingBox()
    {
        this.m_bounding_box = new BoundingBox('Premises');

        this.m_bounding_box.updateLeftDim(0, 0, this.m_width, this.m_height);

    } // SetBoundingBox

    // Returns the bounding box for the premises
    getBoundingBox(){ return this.m_bounding_box; }

    // Get and set organizer is defined
    organizerIsDefined(){return this.m_organizer_is_defined;}
    setOrganizerIsDefined(i_organizer_is_defined){this.m_organizer_is_defined = i_organizer_is_defined;}

    // Get and set sponsor is defined
    sponsorIsDefined(){return this.m_sponsor_is_defined;}
    setSponsorIsDefined(i_sponsor_is_defined){this.m_sponsor_is_defined = i_sponsor_is_defined;}

    // Get and set functions for the member variables
    getName(){ return this.m_name; }
    setName(i_name){ this.m_name = i_name; }

    getWidth(){ return this.m_width; }
    setWidth(i_width){ this.m_width = i_width; }

    getHeight(){ return this.m_height; }
    setHeight(i_height){ this.m_height = i_height; }

    getWallThickness(){ return this.m_wall_thickness; }
    setWallThickness(i_wall_thickness){ this.m_wall_thickness = i_wall_thickness; }

    getMaxWidthPixel(){ return this.m_max_width_pixel; }
    setMaxWidthPixel(i_max_width_pixel){ this.m_max_width_pixel = i_max_width_pixel; }

    getMaxReservationPercentage(){ return this.m_max_reservation_procent; }
    setMaxReservationPercentage(i_max_reservation_procent){ this.m_max_reservation_procent = i_max_reservation_procent; }


    getOrganizerName(){ return this.m_organizer_name; }
    setOrganizerName(i_organizer_name){ this.m_organizer_name = i_organizer_name; }

    getOrganizerTextLogo(){ return this.m_organizer_text_logo; }
    setOrganizerTextLogo(i_organizer_text_logo){ this.m_organizer_text_logo = i_organizer_text_logo; }

    getOrganizerTextLogoWidth(){ return this.m_organizer_text_logo_width; }
    setOrganizerTextLogoWidth(i_organizer_text_logo_width){ this.m_organizer_text_logo_width = i_organizer_text_logo_width; }

    getOrganizerTextLogoHeight(){ return this.m_organizer_text_logo_height; }
    setOrganizerTextLogoHeight(i_organizer_text_logo_height){ this.m_organizer_text_logo_height = i_organizer_text_logo_height; }

    getOrganizerLogo(){ return this.m_organizer_logo; }
    setOrganizerLogo(i_organizer_logo){ this.m_organizer_logo = i_organizer_logo; }

    getOrganizerLogoWidth(){ return this.m_organizer_logo_width; }
    setOrganizerLogoWidth(i_organizer_logo_width){ this.m_organizer_logo_width = i_organizer_logo_width; }

    getOrganizerTextLogoHeight(){ return this.m_organizer_logo_height; }
    setOrganizerTextLogoHeight(i_organizer_logo_height){ this.m_organizer_logo_height = i_organizer_logo_height; }

    getSponsorsImage(){ return this.m_sponsors_image; }
    setSponsorsImage(i_sponsors_image){ this.m_sponsors_image = i_sponsors_image; }

    getSponsorsImageWidth(){ return this.m_sponsors_image_width; }
    setSponsorsImageWidth(i_sponsors_image_width){ this.m_sponsors_image_width = i_sponsors_image_width; }

    getSponsorsImageHeight(){ return this.m_sponsors_image_height; }
    setSponsorsImageHeight(i_sponsors_image_height){ this.m_sponsors_image_height = i_sponsors_image_height; }


    // Sets the data from the XML object m_layout_xml
    setDataFromXml()
    {
        this.m_name = this.m_layout_xml.getPremisesName();
        this.m_width = parseInt(this.m_layout_xml.getPremisesWidth());
        this.m_height = parseInt(this.m_layout_xml.getPremisesHeight());

        this.m_wall_thickness = parseInt(this.m_layout_xml.getWallThickness());

        this.m_max_width_pixel = parseInt(this.m_layout_xml.getMaxWidhtPixel());

        this.m_max_reservation_procent = parseInt(this.m_layout_xml.getMaxReservationsProcent());

        if (this.m_layout_xml.organizerIsDefined())
        {
            this.setOrganizerIsDefined(true);

            this.m_organizer_name = this.m_layout_xml.getOrganizerName();
            this.m_organizer_text_logo = this.m_layout_xml.getOrganizerTextLogo();
            this.m_organizer_text_logo_width = this.m_layout_xml.getOrganizerTextLogoWidth();
            this.m_organizer_text_logo_height = this.m_layout_xml.getOrganizerTextLogoHeight();
            this.m_organizer_logo = this.m_layout_xml.getOrganizerLogo();
            this.m_organizer_logo_width = this.m_layout_xml.getOrganizerLogoWidth();
            this.m_organizer_logo_height = this.m_layout_xml.getOrganizerLogoHeight();

         }
         else
         {
            this.setOrganizerIsDefined(false);
         }

        if (this.m_layout_xml.sponsorIsDefined())
        {
            this.setSponsorIsDefined(true);

            this.m_sponsors_image = this.m_layout_xml.getSponsorsImage();
            this.m_sponsors_image_width = this.m_layout_xml.getSponsorsImageWidth();
            this.m_sponsors_image_height = this.m_layout_xml.getSponsorsImageHeight();

         }
         else
         {
            this.setSponsorIsDefined(false);
         }

    } // setDataFromXml

    // Checks the data
    checkData()
    {
        var ret_b_check = true;

        if(!LayoutDataInput.check(this.m_case, this.m_layout_xml, this.m_input_data_object, "PremisesData"))
        {
            ret_b_check = false;

            return ret_b_check;
        }

        // TODO Add checks of member variables



        return ret_b_check;

    } // checkData

} // PremisesData

// Returns premises data object with data retrieved from the 
// i_layout_xml: Object for a reservation layout XML file
function getPremisesDataFromXml(i_layout_xml)
{
    var layout_case = "get_data_from_xml";

    var input_data_object = null;

    var ret_object = new PremisesData(layout_case, i_layout_xml, input_data_object);

    if (!ret_object.checkData())
    {
        return null;
    }

    return ret_object;

} // getPremisesDataFromXml

// Returns the bounding box for the premises layout element. 
// i_layout_xml: Object for a reservation layout XML file
function getPremisesBoundingBoxFromXml(i_layout_xml)
{
    var premises_data_object = getPremisesDataFromXml(i_layout_xml);

    if (!premises_data_object.checkData())
    {
        return null;
    }

    var ret_premises_bounding_box = premises_data_object.getBoundingBox();

    return ret_premises_bounding_box;

} // getPremisesBoundingBoxFromXml

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Class Premises Data /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Class Layout File Data ////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Class holding layout file data
class LayoutFileData
{
    // Creates the instance of the class
    // i_case: get_data_from_xml, get_default_data, set_xml_object, check_data
    // i_layout_xml: Object for a reservation layout XML file. May be null for case get_default_data
    constructor(i_case, i_layout_xml, i_input_data_object, i_layout_file_number) 
    {
        // Member variables
        // ================

        // Layout case
        this.m_case = i_case;

       // Layout XML object
       this.m_layout_xml = i_layout_xml;

       // An instance of this class to be used for case set_xml_object
       this.m_input_data_object = i_input_data_object;

	   // File number
	   this.m_layout_file_number = i_layout_file_number;

       this.m_file_case = "";
       this.m_html_name = "";
       this.m_description = "";
       this.m_button_id_array = [];

       this.execute();

    } // constructor

    // Execute
    execute()
    {
        if (this.m_case == "get_data_from_xml")
        {
            this.setDataFromXml();
        }
        else
        {
            alert("LayoutFileData.execute Not yet an implemented case " + this.m_case);
        }

    } // execute

    // Get and set functions for the member variables
    getFileCase(){ return this.m_file_case; }
    setFileCase(i_file_case){ this.m_file_case = i_file_case; }

    getHtmlName(){ return this.m_html_name; }
    setHtmlName(i_html_name){ this.m_html_name = i_html_name; }    

    getDescription(){ return this.m_description; }
    setDescription(i_description){ this.m_description = i_description; }

    getNumberButtonId()
    {
        return this.m_button_id_array.length;
    }

    getButtonIdArray()
    {
        return this.m_button_id_array;
    }

    getButtonId(i_button_number)
    { 
        if (this.checkButtonIdNumber(i_button_number))
        {
            return "";
        }

        return this.m_button_id_array[i_button_number - 1];

    } // getButtonId

    setButtonId(i_button_number, i_button_id)
    { 

        if (this.checkButtonIdNumber(i_button_number))
            {
                return;
            }

            this.m_button_id_array[i_button_number - 1] = i_button_id;
    }

    checkButtonIdNumber(i_button_number)
    {
        var n_buttons = this.m_button_id_array.length;

        if (i_button_number >= 1 && i_button_number <= n_buttons)
        {
            return true;
        }
        else
        {
            alert("LayoutFileData.checkButtonIdNumber i_button_number= " + 
                i_button_number.toString() + " is not between 1 and " + n_buttons.toString());

            return false;
        }    

    } // checkButtonIdNumber

    // Sets the dat from the XML object m_layout_xml
    setDataFromXml()
    {
       this.m_file_case = this.m_layout_xml.getLayoutFileCase(this.m_layout_file_number);
       this.m_html_name = this.m_layout_xml.getLayoutFileHtmlName(this.m_layout_file_number);
       this.m_description = this.m_layout_xml.getLayoutFileDescription(this.m_layout_file_number);

       this.m_button_id_array = [];

       var n_button_ids = g_layout_xml.getNumberOfLayoutFileIdButtons(this.m_layout_file_number);

       for (var button_id_number=1; button_id_number <= n_button_ids; button_id_number++)
       {
            var button_id = g_layout_xml.getLayoutFileButtonId(this.m_layout_file_number, button_id_number);

            var index_button = button_id_number - 1;

            this.m_button_id_array[index_button] = button_id;
       }   

    } // setDataFromXml

    // Checks the data
    checkData()
    {
        var ret_b_check = true;

        if(!LayoutDataInput.check(this.m_case, this.m_layout_xml, this.m_input_data_object, "LayoutFileData"))
        {
            ret_b_check = false;

            return ret_b_check;
        }

        // TODO Add checks of member variables



        return ret_b_check;

    } // checkData

} // LayoutFileData

// Returns an object with layout file data. Data is retrieved from the 
// i_layout_xml: Object for a reservation layout XML file
function getLayoutFileDataFromXml(i_layout_xml, i_layout_file_number)
{
    var layout_case = "get_data_from_xml";

    var input_data_object = null;

    var ret_object = new LayoutFileData(layout_case, i_layout_xml, input_data_object, i_layout_file_number);

    if (!ret_object.checkData())
    {
        return null;
    }

    return ret_object;

} // getLayoutFileDataFromXml

// Returns an array of LayoutFileData objects
function getLayoutFileDataArrayFromXml(i_layout_xml)
{
    var ret_layout_file_array = [];

    var n_layout_files = i_layout_xml.getNumberOfLayoutFiles();

    for (var layout_file_number=1; layout_file_number <=  n_layout_files; layout_file_number++)
    {
        var layout_file_data = getLayoutFileDataFromXml(i_layout_xml, layout_file_number);

        ret_layout_file_array[layout_file_number - 1] = layout_file_data;
    }

    return ret_layout_file_array;
 
} // getLayoutFileDataArrayFromXml

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Class Layout File Data //////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Class General Table Data //////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Class holding general data for the tables
class GeneralTableData
{
    // Creates the instance of the class
    // i_case: get_data_from_xml, get_default_data, set_xml_object, check_data
    // i_layout_xml: Object for a reservation layout XML file. May be null for case get_default_data
    constructor(i_case, i_layout_xml, i_input_data_object) 
    {
        // Member variables
        // ================

        // Constructor case
        this.m_case = i_case;

       // Layout XML object
       this.m_layout_xml = i_layout_xml;

       // An instance of this class to be used for case set_xml_object
       this.m_input_data_object = i_input_data_object;

       this.m_color = "";
       this.m_stroke_color = "";
       this.m_stroke_width = "";
       this.m_text_rel_x_procent = "";
       this.m_text_rel_y_procent = "";
       this.m_text_color = "";

       // Radius of the circle representing a seat. 
       // This is used for all tables. 
       // The value is set in the XML layout file and is used for all tables in the layout.
       this.m_seat_circle_radius = -12345;

       this.execute();

    } // constructor

    // Execute
    execute()
    {
        if (this.m_case == "get_data_from_xml")
        {
            this.setDataFromXml();
        }
        else
        {
            alert("GeneralTableData.execute Not yet an implemented case " + this.m_case);
        }

    } // execute

    // Get and set functions for the member variables
    getColor(){ return this.m_color; }
    setColor(i_color){ this.m_color = i_color; }

    getStrokeColor(){ return this.m_stroke_color; }
    setStrokeColor(i_stroke_color){ this.m_stroke_color = i_stroke_color; }

    getStrokeWidth(){ return this.m_stroke_width; }
    setStrokeWidth(i_stroke_width){ this.m_stroke_width = i_stroke_width; }

    getTextRelXProcent(){ return this.m_text_rel_x_procent; }
    setTextRelXProcent(i_text_rel_x_procent){ this.m_text_rel_x_procent = i_text_rel_x_procent; }

    getTextRelYProcent(){ return this.m_text_rel_y_procent; }
    setTextRelYProcent(i_text_rel_y_procent){ this.m_text_rel_y_procent = i_text_rel_y_procent; }

    getTextColor(){ return this.m_text_color; }
    setTextColor(i_text_color){ this.m_text_color = i_text_color; }

    getSeatCircleRadius(){ return this.m_seat_circle_radius; }
    setSeatCircleRadius(i_seat_circle_radius){ this.m_seat_circle_radius = i_seat_circle_radius; }

    // Sets the dat from the XML object m_layout_xml
    setDataFromXml()
    {
        this.m_color = this.m_layout_xml.getTableColor();
        this.m_stroke_color = this.m_layout_xml.getTableStrokeColor();
        this.m_stroke_width = this.m_layout_xml.getTableStrokeWidth();
        this.m_text_rel_x_procent = this.m_layout_xml.getTableTextRelXProcent();
        this.m_text_rel_y_procent = this.m_layout_xml.getTableTextRelYProcent();
        this.m_text_color = this.m_layout_xml.getTableTextColor();

        //TODO this.m_seat_circle_radius = this.m_layout_xml.getTableSeatCircleRadius();
        this.m_seat_circle_radius = 150;

    } // setDataFromXml

    // Checks the data
    checkData()
    {
        var ret_b_check = true;

        if(!LayoutDataInput.check(this.m_case, this.m_layout_xml, this.m_input_data_object, "GeneralTableData"))
        {
            ret_b_check = false;

            return ret_b_check;
        }

        // TODO Add checks of member variables



        return ret_b_check;

    } // checkData

} // GeneralTableData

// Returns general table data object with data retrieved from the 
// i_layout_xml: Object for a reservation layout XML file
function getGeneralTableDataFromXml(i_layout_xml)
{
    var layout_case = "get_data_from_xml";

    var input_data_object = null;

    var ret_object = new GeneralTableData(layout_case, i_layout_xml, input_data_object);

    if (!ret_object.checkData())
    {
        return null;
    }

    return ret_object;

} // getGeneralTableDataFromXml


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Class General Table Data ////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Class Stage Data //////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Class holding all data for a stage
class StageData
{
    // Creates the instance of the class
    // i_case: get_data_from_xml, get_default_data, set_xml_object, check_data
    // i_layout_xml: Object for a reservation layout XML file. May be null for case get_default_data
    constructor(i_case, i_layout_xml, i_input_data_object) 
    {
        // Member variables
        // ================

        // Constructor case
        this.m_case = i_case;

       // Layout XML object
       this.m_layout_xml = i_layout_xml;

       // An instance of this class to be used for case set_xml_object
       this.m_input_data_object = i_input_data_object;

       this.m_stage_is_defined = false;

        this.m_upper_left_x = -12345;
        this.m_upper_left_y = -12345;
        this.m_width = -12345;
        this.m_height = -12345;
        this.m_text = "";
        this.m_color = "";
        this.m_stroke_color = "";
        this.m_stroke_width = -12345;
        this.m_text_rel_x_procent = -12345;
        this.m_text_rel_y_procent = -12345;
        this.m_text_color = "";
        this.m_image = "";
        this.m_image_width = "";
        this.m_image_height = "";

       // Instance of the class BoundingBox
       this.m_boundimg_box = null;

        this.execute();
        
    } // constructor

    // Execute
    execute()
    {
        if (this.m_case == "get_data_from_xml")
        {
            this.setDataFromXml();

            this.setBoundingBox();
        }
        else if (this.m_case == "get_default_data")
        {
            this.setDefaultData();

            this.setBoundingBox();
        }
        else
        {
            alert("StageData.execute Not yet an implemented case " + this.m_case);
        }

    } // execute

    // Sets the bounding box for the stage based on the width and height of the stage
    setBoundingBox()
    {
        if (!this.stageIsDefined())
        {
            this.m_boundimg_box = null;
            
            return;
        }

        this.m_boundimg_box = new BoundingBox('Stage');

        this.m_boundimg_box.updateLeftDim(this.m_upper_left_x, this.m_upper_left_y, this.m_width, this.m_height);

    } // SetBoundingBox

    // Returns the bounding box for the stage
    getBoundingBox()
	{ 
		return this.m_boundimg_box; 
	}

    // Get boolean that tells if stage data is defined in the XML layout file
    // This function is used by functions in other classes to determine if a
    // stage is defined for a layout.
    stageIsDefined(){return this.m_stage_is_defined;}

    // Set boolean that tells if stage data is defined in the XML layout file
    // The function is used in the function setDataFromXml to set the value, i,e,
    // when the stageData object is created. The ReservationLayoutXml function 
    // stageIsDefined() checks that all stage XML elements are defined.
    setStageIsDefined(i_stage_is_defined){this.m_stage_is_defined = i_stage_is_defined;}

    // Get and set functions for the member variables
    getUpperLeftX(){ return this.m_upper_left_x; }
    setUpperLeftX(i_upper_left_x){ this.m_upper_left_x = i_upper_left_x; }

    getUpperLeftY(){ return this.m_upper_left_y; }
    setUpperLeftY(i_upper_left_y){ this.m_upper_left_y = i_upper_left_y; }

    getWidth(){ return this.m_width; }
    setWidth(i_width){ this.m_width = i_width; }

    getHeight(){ return this.m_height; }
    setHeight(i_height){ this.m_height = i_height; }

    getText(){ return this.m_text; }
    setText(i_text){ this.m_text = i_text; }

    getColor(){ return this.m_color; }
    setColor(i_color){ this.m_color = i_color; }

    getStrokeColor(){ return this.m_stroke_color; }
    setStrokeColor(i_stroke_color){ this.m_stroke_color = i_stroke_color; }

    getStrokeWidth(){ return this.m_stroke_width; }
    setStrokeWidth(i_stroke_width){ this.m_stroke_width = i_stroke_width; }

    getTextRelXProcent(){ return this.m_text_rel_x_procent; }
    setTextRelXProcent(i_text_rel_x_procent){ this.m_text_rel_x_procent = i_text_rel_x_procent; }

    getTextRelYProcent(){ return this.m_text_rel_y_procent; }
    setTextRelYProcent(i_text_rel_y_procent){ this.m_text_rel_y_procent = i_text_rel_y_procent; }

    getTextColor(){ return this.m_text_color; }
    setTextColor(i_text_color){ this.m_text_color = i_text_color; }

    getImage(){ return this.m_image; }
    setImage(i_image){ this.m_image = i_image; }

    getImageWidth(){ return this.m_image_width; }
    setImageWidth(i_image_width){ this.m_image_width = i_image_width; }

    getImageHeight(){ return this.m_image_height; }
    setImageHeight(i_image_height){ this.m_image_height = i_image_height; }

    // Sets the data from the XML object m_layout_xml
    // Determine if (all) stage data is defined in XML layout file. If this is the case
    // set the flag that data is set in this object and set all the data.
    // If stage data is not defined in the XML layout file, set the flag that stage 
    // data is not defined in this object.
    setDataFromXml()
    {
        if (this.m_layout_xml.stageIsDefined())
        {
            this.setStageIsDefined(true);

            this.m_upper_left_x = parseInt(this.m_layout_xml.getStageUpperLeftX());
            this.m_upper_left_y = parseInt(this.m_layout_xml.getStageUpperLeftY());
            this.m_width = parseInt(this.m_layout_xml.getStageWidth());
            this.m_height = parseInt(this.m_layout_xml.getStageHeight());
            this.m_text = this.m_layout_xml.getStageText();
            this.m_color = this.m_layout_xml.getStageColor();
            this.m_stroke_color = this.m_layout_xml.getStageStrokeColor();
            this.m_stroke_width = parseInt(this.m_layout_xml.getStageStrokeWidth());
            this.m_text_rel_x_procent = parseInt(this.m_layout_xml.getStageTextRelXProcent());
            this.m_text_rel_y_procent = parseInt(this.m_layout_xml.getStageTextRelYProcent());
            this.m_text_color = this.m_layout_xml.getStageTextColor();
            this.m_image = this.m_layout_xml.getStageImage();
            this.m_image_width = this.m_layout_xml.getStageImageWidth();
            this.m_image_height = this.m_layout_xml.getStageImageHeight();
        }
        else
        {
            this.setStageIsDefined(false);
        }


    } // setDataFromXml

    // Sets default data for the stage. 
    // The function is used when no stage data is defined in the XML layout file
    // (assuming that it will be added, i.e. stage is defined) 
    setDefaultData()
    {
        this.m_stage_is_defined = true;

        this.m_upper_left_x = 600;

        this.m_upper_left_y = 970;

        this.m_width = 6800;

        this.m_height = 950;

        this.m_text = "Bühne";

        this.m_color = "rgb(244, 241, 66)";

        this.m_stroke_color = "rgb(135, 132, 5)";

        this.m_stroke_width = 10;

        this.m_text_rel_x_procent = 30;

        this.m_text_rel_y_procent = 46;

        this.m_text_color = "blue";

        this.m_image = "ImagesLayout/icon_stage.png";

        this.m_image_width = "750px";

        this.m_image_height = "150px";

    } // setDefaultData

    // Sets the data in the XML object m_layout_xml from the data in this object
    setXmlFromData()
    {
        if (!this.checkData())
        {
            alert("StageData.setXmlFromData Data in stage data object is not correct. TODO Implement more detailed error messages.");

            return;
        }

        if (this.m_layout_xml.stageIsDefined())
        {
            this.m_add_reservations.m_layout_xml.setStageUpperLeftX(this.getUpperLeftX().toString());

            this.m_layout_xml.setStageUpperLeftY(this.getUpperLeftY().toString());

            this.m_layout_xml.setStageWidth(this.getWidth().toString());

            this.m_layout_xml.setStageHeight(this.getHeight().toString());

            this.m_layout_xml.setStageText(this.getText());

            this.m_layout_xml.setStageColor(this.getColor());

            this.m_layout_xml.setStageStrokeColor(this.getStrokeColor());

            this.m_layout_xml.setStageStrokeWidth(this.getStrokeWidth().toString());

            this.m_layout_xml.setStageTextRelXProcent(this.getTextRelXProcent().toString());

            this.m_layout_xml.setStageTextRelYProcent(this.getTextRelYProcent().toString());

            this.m_layout_xml.setStageTextColor(this.getTextColor());

            this.m_layout_xml.setStageImage(this.getImage());

            this.m_layout_xml.setStageImageWidth(this.getImageWidth());

            this.m_layout_xml.setStageImageHeight(this.getImageHeight());            
        }
        else
        {
            alert("StageData.setXmlFromData Stage data is not defined. TODO Implement appendStageData .");
        }

    } // setXmlFromData

    // Checks the data
    checkData()
    {
        var ret_b_check = true;

        if(!LayoutDataInput.check(this.m_case, this.m_layout_xml, this.m_input_data_object, "StageData"))
        {
            ret_b_check = false;

            return ret_b_check;
        }

        if (this.m_stage_is_defined == false)
        {
            return ret_b_check;
        }

        var class_name = "StageData";

        var value_array = [this.m_upper_left_x, this.m_upper_left_y, 
                           this.m_width, this.m_height, this.m_stroke_width, 
                           this.m_text_rel_x_procent, this.m_text_rel_y_procent];

        var name_array = ["m_upper_left_x", "m_upper_left_y", 
                          "m_width", "m_height", "m_stroke_width", 
                          "m_text_rel_x_procent", "m_text_rel_y_procent"];

        if (!LayoutDataInput.checkPositiveInteger(class_name, value_array, name_array))
        {
            ret_b_check = false;
        }

        return ret_b_check;

    } // checkData

} // StageData

// Returns a layout stage data object with data retrieved from the 
// i_layout_xml: Object for a reservation layout XML file
function getStageDataFromXml(i_layout_xml)
{
    var layout_case = "get_data_from_xml";

    var input_data_object = null;

    var ret_object = new StageData(layout_case, i_layout_xml, input_data_object);

    if (!ret_object.checkData())
    {
        return null;
    }

    return ret_object;

} // getStageDataFromXml

// Returns the bounding box for the stage layout element. 
// i_layout_xml: Object for a reservation layout XML file
function getStageBoundingBoxFromXml(i_layout_xml)
{
    var stage_data_object = getStageDataFromXml(i_layout_xml);

    if (stage_data_object.stageIsDefined() == false)
    {
        return null;
    }

    if (!stage_data_object.checkData())
    {
        return null;
    }

    var ret_stage_bounding_box = stage_data_object.getBoundingBox();

    return ret_stage_bounding_box;

} // getStageBoundingBoxFromXml


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Class Stage Data ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Class Cashier Data ////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Class holding cashier data
class CashierData
{
    // Creates the instance of the class
    // i_case: get_data_from_xml, get_default_data, set_xml_object, check_data
    // i_layout_xml: Object for a reservation layout XML file. May be null for case get_default_data
    constructor(i_case, i_layout_xml, i_input_data_object) 
    {
        // Member variables
        // ================

        // Constructor case
        this.m_case = i_case;

       // Layout XML object
       this.m_layout_xml = i_layout_xml;

       // An instance of this class to be used for case set_xml_object
       this.m_input_data_object = i_input_data_object;

       this.m_cashier_is_defined = false;

       this.m_upper_left_x = "";
       this.m_upper_left_y = "";
	   this.m_image = "";
	   this.m_image_width = "";
	   this.m_image_height = "";
	   
       this.execute();

    } // constructor

    // Execute
    execute()
    {
        if (this.m_case == "get_data_from_xml")
        {
            this.setDataFromXml();
        }
        else
        {
            alert("CashierData.execute Not yet an implemented case " + this.m_case);
        }

    } // execute

    // Get and set cashier is defined
    cashierIsDefined(){return this.m_cashier_is_defined;}
    setCashierIsDefined(i_cashier_is_defined){this.m_cashier_is_defined = i_cashier_is_defined;}

    // Get and set functions for the member variables
    getUpperLeftX(){ return this.m_upper_left_x; }
    setUpperLeftX(i_upper_left_x){ this.m_upper_left_x = i_upper_left_x; }

    getUpperLeftY(){ return this.m_upper_left_y; }
    setUpperLeftY(i_upper_left_y){ this.m_upper_left_y = i_upper_left_y; }

    getImage(){ return this.m_image; }
    setImage(i_image){ this.m_image = i_image; }

    getImageWidth(){ return this.m_image_width; }
    setImageWidth(i_image_width){ this.m_image_width = i_image_width; }

    getImageHeight(){ return this.m_image_height; }
    setImageHeight(i_image_height){ this.m_image_height = i_image_height; }

    // Sets the dat from the XML object m_layout_xml
    setDataFromXml()
    {
        if (this.m_layout_xml.cashierIsDefined())
        {
            this.setCashierIsDefined(true);

            this.m_upper_left_x = this.m_layout_xml.getCashUpperLeftX();
            this.m_upper_left_y = this.m_layout_xml.getCashUpperLeftY();
            this.m_image = this.m_layout_xml.getCashImage();
            this.m_image_width = this.m_layout_xml.getCashImageWidth();
            this.m_image_height = this.m_layout_xml.getCashImageHeight();
        }
        else
        {
            this.setCashierIsDefined(false);
        }

    } // setDataFromXml

    // Checks the data
    checkData()
    {
        var ret_b_check = true;

        if(!LayoutDataInput.check(this.m_case, this.m_layout_xml, this.m_input_data_object, "CashierData"))
        {
            ret_b_check = false;

            return ret_b_check;
        }

        // TODO Add checks of member variables



        return ret_b_check;

    } // checkData

} // CashierData

// Returns a cashier data object with data retrieved from the 
// i_layout_xml: Object for a reservation layout XML file
function getCashierDataFromXml(i_layout_xml)
{
    var layout_case = "get_data_from_xml";

    var input_data_object = null;

    var ret_object = new CashierData(layout_case, i_layout_xml, input_data_object);

    if (!ret_object.checkData())
    {
        return null;
    }

    return ret_object;

} // getCashierDataFromXml


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Class Cashier Data //////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Class Text Image Captions /////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Class holding text image captions for buttons
class TextImageCaptions
{
    // Creates the instance of the class
    // i_case: get_data_from_xml, get_default_data, set_xml_object, check_data
    // i_layout_xml: Object for a reservation layout XML file. May be null for case get_default_data
    constructor(i_case, i_layout_xml, i_input_data_object) 
    {
        // Member variables
        // ================

        // Constructor case
        this.m_case = i_case;

       // Layout XML object
       this.m_layout_xml = i_layout_xml;

       // An instance of this class to be used for case set_xml_object
       this.m_input_data_object = i_input_data_object;

       this.m_select_seats = "";
       this.m_reserve_seats = "";
	   this.m_reserve_select_undef = "";
	   this.m_add_reservation = "";
	   this.m_delete_off = "";
	   this.m_delete_on = "";
	   this.m_reservation_list = "";
	   this.m_reservation_print = "";
	   this.m_save_reservation = "";
	   this.m_save_reservation_white = "";

	   
       this.execute();

    } // constructor

    // Execute
    execute()
    {
        if (this.m_case == "get_data_from_xml")
        {
            this.setDataFromXml();
        }
        else
        {
            alert("TextImageCaptionData.execute Not yet an implemented case " + this.m_case);
        }

    } // execute

    // Sets the dat from the XML object m_layout_xml
    setDataFromXml()
    {
       this.m_select_seats = this.m_layout_xml.getTextImageSelectSeats();
       this.m_reserve_seats = this.m_layout_xml.getTextImageReserveSeats();
	   this.m_reserve_select_undef = this.m_layout_xml.getTextImageReserveSelectUndef();
	   this.m_add_reservation = this.m_layout_xml.getTextImageAddReservation();
	   this.m_delete_off = this.m_layout_xml.getTextImageDeleteOff();
	   this.m_delete_on = this.m_layout_xml.getTextImageDeleteOn();
	   this.m_reservation_list = this.m_layout_xml.getTextImageReservationList();
	   this.m_reservation_print = this.m_layout_xml.getTextImageReservationPrint();
	   this.m_save_reservation = this.m_layout_xml.getTextImageSaveReservation();
	   this.m_save_reservation_white = this.m_layout_xml.getTextImageSaveReservationWhite();

    } // setDataFromXml

    // Checks the data
    checkData()
    {
        var ret_b_check = true;

        if(!LayoutDataInput.check(this.m_case, this.m_layout_xml, this.m_input_data_object, "TextImageCaptions"))
        {
            ret_b_check = false;

            return ret_b_check;
        }

        // TODO Add checks of member variables



        return ret_b_check;

    } // checkData

} // TextImageCaptions

// Returns an object with text image captions for buttons. Data is retrieved from the 
// i_layout_xml: Object for a reservation layout XML file
function getTextImageCaptionsFromXml(i_layout_xml)
{
    var layout_case = "get_data_from_xml";

    var input_data_object = null;

    var ret_object = new TextImageCaptions(layout_case, i_layout_xml, input_data_object);

    if (!ret_object.checkData())
    {
        return null;
    }

    return ret_object;

} // getTextImageCaptionsFromXml

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Class Text Image Captions ///////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Class Layout Button Data //////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Class holding Layout Button Data for buttons
class ButtonData
{
    // Creates the instance of the class
    // i_case: get_data_from_xml, get_default_data, set_xml_object, check_data
    // i_layout_xml: Object for a reservation layout XML file. May be null for case get_default_data
    constructor(i_case, i_layout_xml, i_input_data_object, i_button_number) 
    {
        // Member variables
        // ================

        // Constructor case
        this.m_case = i_case;

       // Layout XML object
       this.m_layout_xml = i_layout_xml;

       // An instance of this class to be used for case set_xml_object
       this.m_input_data_object = i_input_data_object;

       // Button number
       this.m_button_number = i_button_number;

       this.m_id = "";
       this.m_title = "";
       this.m_event_function = "";
       this.m_upper_left_x = -12345;
       this.m_upper_left_y = -12345;
       this.m_width = -12345;
       this.m_height = -12345;
       this.m_image_id = "";
       this.m_image_event_function = "";
       this.m_image_one = "";
       this.m_image_two = "";
       this.m_image_three = "";
       this.m_image_width = "";
       this.m_image_height = "";
       this.m_type = "";

       // Instance of the class BoundingBox
       this.m_boundimg_box = null;

       this.execute();

    } // constructor

    // Execute
    execute()
    {
        if (this.m_case == "get_data_from_xml")
        {
            this.setDataFromXml();

            this.setBoundingBox();
        }
        else
        {
            alert("TextImageCaptionData.execute Not yet an implemented case " + this.m_case);
        }

    } // execute

    // Sets the bounding box for the button based on the width and height of the button
    setBoundingBox()
    {
        this.m_boundimg_box = new BoundingBox('Button data');

        this.m_boundimg_box.updateLeftDim(this.m_upper_left_x, this.m_upper_left_y, this.m_width, this.m_height);

    } // SetBoundingBox

    // Returns the bounding box for the button
    getBoundingBox()
	{ 
		return this.m_boundimg_box; 
	}
	

    // Get and set functions for the member variables
    getId(){ return this.m_id; }
    setId(i_id){ this.m_id = i_id; }

    getTitle(){ return this.m_title; }
    setTitle(i_title){ this.m_title = i_title; }

    getEventFunction(){ return this.m_event_function; }
    setEventFunction(i_event_function){ this.m_event_function = i_event_function; }

    getUpperLeftX(){ return this.m_upper_left_x; }
    setUpperLeftX(i_upper_left_x){ this.m_upper_left_x = i_upper_left_x; }

    getUpperLeftY(){ return this.m_upper_left_y; }
    setUpperLeftY(i_upper_left_y){ this.m_upper_left_y = i_upper_left_y; }

    getWidth(){ return this.m_width; }
    setWidth(i_width){ this.m_width = i_width; }

    getHeight(){ return this.m_height; }
    setHeight(i_height){ this.m_height = i_height; }

    getImageId(){ return this.m_image_id; }
    setImageId(i_image_id){ this.m_image_id = i_image_id; }

    getImageEventFunction(){ return this.m_image_event_function; }
    setImageEventFunction(i_image_event_function){ this.m_image_event_function = i_image_event_function; }

    getImageOne(){ return this.m_image_one; }
    setImageOne(i_image_one){ this.m_image_one = i_image_one; }

    getImageTwo(){ return this.m_image_two; }
    setImageTwo(i_image_two){ this.m_image_two = i_image_two; }

    getImageThree(){ return this.m_image_three; }
    setImageThree(i_image_three){ this.m_image_three = i_image_three; }

    getImageWidth(){ return this.m_image_width; }
    setImageWidth(i_image_width){ this.m_image_width = i_image_width; }

    getImageHeight(){ return this.m_image_height; }
    setImageHeight(i_image_height){ this.m_image_height = i_image_height; }

    getType(){ return this.m_type; }
    setType(i_type){ this.m_type = i_type; }

    // Sets the dat from the XML object m_layout_xml
    setDataFromXml()
    {
       this.m_id = this.m_layout_xml.getButtonId(this.m_button_number);

       this.m_title = this.m_layout_xml.getButtonTitle(this.m_button_number);
       this.m_event_function = this.m_layout_xml.getButtonEventFunction(this.m_button_number);
       this.m_upper_left_x = parseInt(this.m_layout_xml.getButtonUpperLeftX(this.m_button_number));
       this.m_upper_left_y = parseInt(this.m_layout_xml.getButtonUpperLeftY(this.m_button_number));
       this.m_width = parseInt(this.m_layout_xml.getButtonWidth(this.m_button_number));
       this.m_height = parseInt(this.m_layout_xml.getButtonHeight(this.m_button_number));
       this.m_image_id = this.m_layout_xml.getButtonImageId(this.m_button_number);
       this.m_image_event_function = this.m_layout_xml.getButtonImageEventFunction(this.m_button_number);
       this.m_image_one = this.m_layout_xml.getButtonImageOne(this.m_button_number);
       this.m_image_two = this.m_layout_xml.getButtonImageTwo(this.m_button_number);
       this.m_image_three = this.m_layout_xml.getButtonImageThree(this.m_button_number);
       this.m_image_width = this.m_layout_xml.getButtonImageWidth(this.m_button_number);
       this.m_image_height = this.m_layout_xml.getButtonImageHeight(this.m_button_number);
       this.m_type = this.m_layout_xml.getButtonType(this.m_button_number);    

    } // setDataFromXml

    // Checks the data
    checkData()
    {
        var ret_b_check = true;

        if(!LayoutDataInput.check(this.m_case, this.m_layout_xml, this.m_input_data_object, "ButtonData"))
        {
            ret_b_check = false;

            return ret_b_check;
        }

        // TODO Add checks of member variables



        return ret_b_check;

    } // checkData

} // ButtonData

// Returns an object with Layout Button Data for buttons. Data is retrieved from the 
// i_layout_xml: Object for a reservation layout XML file
function getButtonDataFromXml(i_layout_xml, i_button_number)
{
    var layout_case = "get_data_from_xml";

    var input_data_object = null;

    var ret_object = new ButtonData(layout_case, i_layout_xml, input_data_object, i_button_number);

    if (!ret_object.checkData())
    {
        return null;
    }

    return ret_object;

} // getButtonDataFromXml

// Returns an array of ButtonData objects
function getButtonDataArrayFromXml(i_layout_xml)
{
    var ret_button_array = [];

    var n_buttons = i_layout_xml.getNumberOfButtons();

    for (var button_number=1; button_number <=  n_buttons; button_number++)
    {
        var button_data = getButtonDataFromXml(i_layout_xml, button_number);

        ret_button_array[button_number - 1] = button_data;
    }

    return ret_button_array;
 
} // getButtonDataArrayFromXml

// Returns a ButtonData object for a given button identity
function getButtonDataForId(i_layout_xml, i_button_id)
{
    var ret_button_data = null;

    var button_dat_array = getButtonDataArrayFromXml(i_layout_xml);

    var n_buttons = button_dat_array.length;

    for (var index_button=0; index_button < n_buttons; index_button++)
    {
        var button_data = button_dat_array[index_button];

        var button_id = button_data.getId();

        if (button_id == i_button_id)
        {
            ret_button_data = button_data;

            break;
        }
    }

    if (null == ret_button_data)
    {
        alert("getButtonDataForId There is no ButtonData object with the identity= " + i_button_id);
    }

    return ret_button_data;

} // getButtonDataForId

// Returns the bounding box for all button elements
// i_layout_xml: Object for a reservation layout XML file
function getAllButtonsBoundingBoxFromXml(i_layout_xml)
{
    var all_buttons_bounding_box = new BoundingBox('AllButtons');

    var n_buttons = i_layout_xml.getNumberOfButtons();

    for (var button_number=1; button_number <=  n_buttons; button_number++)
    {
        var button_data = getButtonDataFromXml(i_layout_xml, button_number);

        var button_bounding_box = button_data.getBoundingBox();

        all_buttons_bounding_box.updateBox(button_bounding_box);
    }

    return all_buttons_bounding_box;

} // getAllButtonsBoundingBoxFromXml

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Class Layout Button Data ////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Class Door Data ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Class holding door data
class DoorData
{
    // Creates the instance of the class
    // i_case: get_data_from_xml, get_default_data, set_xml_object, check_data
    // i_layout_xml: Object for a reservation layout XML file. May be null for case get_default_data
    constructor(i_case, i_layout_xml, i_input_data_object, i_door_number) 
    {
        // Member variables
        // ================

        // Constructor case
        this.m_case = i_case;

       // Layout XML object
       this.m_layout_xml = i_layout_xml;

       // An instance of this class to be used for case set_xml_object
       this.m_input_data_object = i_input_data_object;

	   // Door number
	   this.m_door_number = i_door_number;

       this.m_type = "";
       this.m_position = "";
	   this.m_height = "";
	   this.m_text = "";
	   this.m_image = "";
	   this.m_image_width = "";
	   this.m_image_height = "";
	   
       this.execute();

    } // constructor

    // Execute
    execute()
    {
        if (this.m_case == "get_data_from_xml")
        {
            this.setDataFromXml();
        }
        else
        {
            alert("DoorData.execute Not yet an implemented case " + this.m_case);
        }

    } // execute

    // Get and set functions for the member variables
    getType(){ return this.m_type; }
    setType(i_type){ this.m_type = i_type; }

    getPosition(){ return this.m_position; }
    setPosition(i_position){ this.m_position = i_position; }

    getHeight(){ return this.m_height; }
    setHeight(i_height){ this.m_height = i_height; }

    getText(){ return this.m_text; }
    setText(i_text){ this.m_text = i_text; }

    getImage(){ return this.m_image; }
    setImage(i_image){ this.m_image = i_image; }

    getImageWidth(){ return this.m_image_width; }
    setImageWidth(i_image_width){ this.m_image_width = i_image_width; }

    getImageHeight(){ return this.m_image_height; }
    setImageHeight(i_image_height){ this.m_image_height = i_image_height; }

    // Sets the dat from the XML object m_layout_xml
    setDataFromXml()
    {
       this.m_type = this.m_layout_xml.getDoorType(this.m_door_number);
       this.m_position = this.m_layout_xml.getDoorPosition(this.m_door_number);
	   this.m_height = this.m_layout_xml.getDoorHeight(this.m_door_number);
	   this.m_text = this.m_layout_xml.getDoorText(this.m_door_number);
	   this.m_image = this.m_layout_xml.getDoorImage(this.m_door_number);
	   this.m_image_width = this.m_layout_xml.getDoorImageWidth(this.m_door_number);
	   this.m_image_height = this.m_layout_xml.getDoorImageHeight(this.m_door_number);

    } // setDataFromXml

    // Checks the data
    checkData()
    {
        var ret_b_check = true;

        if(!LayoutDataInput.check(this.m_case, this.m_layout_xml, this.m_input_data_object, "DoorData"))
        {
            ret_b_check = false;

            return ret_b_check;
        }

        // TODO Add checks of member variables



        return ret_b_check;

    } // checkData

} // DoorData

// Returns an object with door data. Data is retrieved from the 
// i_layout_xml: Object for a reservation layout XML file
function getDoorDataFromXml(i_layout_xml, i_door_number)
{
    var layout_case = "get_data_from_xml";

    var input_data_object = null;

    var ret_object = new DoorData(layout_case, i_layout_xml, input_data_object, i_door_number);

    if (!ret_object.checkData())
    {
        return null;
    }

    return ret_object;

} // getDoorDataFromXml

// Returns an array of DoorData objects
function getDoorDataArrayFromXml(i_layout_xml)
{
    var ret_door_array = [];

    var n_doors = i_layout_xml.getNumberOfDoors();

    for (var door_number=1; door_number <=  n_doors; door_number++)
    {
        var door_data = getDoorDataFromXml(i_layout_xml, door_number);

        ret_door_array[door_number - 1] = door_data;
    }

    return ret_door_array;
 
} // getDoorDataArrayFromXml

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Class Door Data /////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Class Table Data //////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Class holding table data
class TableData
{
    // Creates the instance of the class
    // i_case: get_data_from_xml, get_default_data, set_xml_object, check_data
    // i_layout_xml: Object for a reservation layout XML file. May be null for case get_default_data
    constructor(i_case, i_layout_xml, i_input_data_object, i_table_number) 
    {
        // Member variables
        // ================

        // Constructor case
        this.m_case = i_case;

       // Layout XML object
       this.m_layout_xml = i_layout_xml;

       // An instance of this class to be used for case set_xml_object
       this.m_input_data_object = i_input_data_object;

	   // Table number
	   this.m_table_number = i_table_number;

       this.m_number = "";
       this.m_upper_left_x = "";
	   this.m_upper_left_y = "";
	   this.m_width = "";
	   this.m_height = "";
	   this.m_number_left_right_seats = "0";
	   
	   // The array defines the left seats that shall be defined (that shall be available)
	   this.m_left_seats = [];
	   // The array defines the right seats that shall be defined (that shall be available)
	   this.m_right_seats = [];
	   
	   
	   this.m_seat_upper = "";
	   this.m_seat_lower = "";
	   this.m_text = "";

       // Instance of the class BoundingBox for table only
       this.m_boundimg_box = null;

       // Instance of the class BoundingBox for table with seats
       this.m_boundimg_box_seats = null;

       this.initSeatData();

	   this.execute();

    } // constructor

    // Execute
    execute()
    {
        if (this.m_case == "get_data_from_xml")
        {
            this.setDataFromXml();

            this.setBoundingBoxes();
        }
        else
        {
            alert("TableData.execute Not yet an implemented case " + this.m_case);
        }

    } // execute

    // Sets the bounding box for the table and for table with seats
    setBoundingBoxes()
    {
        this.m_boundimg_box = new BoundingBox('Table');

        this.m_boundimg_box.updateLeftDim(this.m_upper_left_x, this.m_upper_left_y, this.m_width, this.m_height);

        this.m_boundimg_box_seats = new BoundingBox('TableWithSeats');

        this.m_boundimg_box_seats.updateTableSeats(this.m_upper_left_x, this.m_upper_left_y, this.m_width, this.m_height);

    } // SetBoundingBoxes

    // Returns the bounding box for the table without seats
    getBoundingBox()
	{ 
		return this.m_boundimg_box; 

	} // getBoundingBox
	
	// Returns the bounding box for the table with seats
    getBoundingBoxSeats()
	{ 
		return this.m_boundimg_box_seats; 

	} // getBoundingBoxSeats
	

    // Get and set functions for the member variables
    getNumber(){ return this.m_number; }
    setNumber(i_number){ this.m_number = i_number; }

    getUpperLeftX(){ return this.m_upper_left_x; }
    setUpperLeftX(i_upper_left_x){ this.m_upper_left_x = i_upper_left_x; }

    getUpperLeftY(){ return this.m_upper_left_y; }
    setUpperLeftY(i_upper_left_y){ this.m_upper_left_y = i_upper_left_y; }

    getWidth(){ return this.m_width; }
    setWidth(i_width){ this.m_width = i_width; }

    getHeight(){ return this.m_height; }
    setHeight(i_height){ this.m_height = i_height; }

    getNumberLeftRightSeats(){ return this.m_number_left_right_seats; }
    setNumberLeftRightSeats(i_number_left_right_seats){ this.m_number_left_right_seats = i_number_left_right_seats; }

    // The array defines the left seats that shall be defined (that shall be available)
    getSeatLeftArray(){ return this.m_left_seats; }
    setSeatLeftArray(i_left_seats){ this.m_left_seats = i_left_seats; }

    // The array defines the right seats that shall be defined (that shall be available)
    getSeatRightArray(){ return this.m_right_seats; }
    setSeatRightArray(i_right_seats){ this.m_right_seats = i_right_seats; }

    // Defines if the upper seat shall be defined (shall be available)
    getSeatUpper(){ return this.m_seat_upper; }
    setSeatUpper(i_seat_upper){ this.m_seat_upper = i_seat_upper; }

    // Defines if the lower seat shall be defined (shall be available)
    getSeatLower(){ return this.m_seat_lower; }
    setSeatLower(i_seat_lower){ this.m_seat_lower = i_seat_lower; }

    getText(){ return this.m_text; }
    setText(i_text){ this.m_text = i_text; }

    // Sets the dat from the XML object m_layout_xml
    setDataFromXml()
    {
       this.m_number = this.m_layout_xml.getTableNumber(this.m_table_number);
       this.m_upper_left_x = this.m_layout_xml.getTableUpperLeftX(this.m_table_number);
	   this.m_upper_left_y = this.m_layout_xml.getTableUpperLeftY(this.m_table_number);
	   this.m_width = this.m_layout_xml.getTableWidth(this.m_table_number);
	   this.m_height = this.m_layout_xml.getTableHeight(this.m_table_number);
	   this.m_number_left_right_seats = this.m_layout_xml.getTableNumberLeftRightSeats(this.m_table_number);

       this.setSeatDataFromXml(this.m_number_left_right_seats, this.m_table_number);
	      
	   this.m_seat_upper = TableData.booleanStringToBoolean(this.m_layout_xml.getTableSeatUpper(this.m_table_number));
	   this.m_seat_lower = TableData.booleanStringToBoolean(this.m_layout_xml.getTableSeatLower(this.m_table_number));
	   this.m_text = this.m_layout_xml.getTableText(this.m_table_number);
	   
    } // setDataFromXml

    // Sets the seat arrays m_left_seats and m_right_seats from the XML object m_layout_xml
    setSeatDataFromXml(i_left_right_seats, i_table_number)
    {
        this.m_left_seats = [];

        this.m_right_seats = [];

        var left_right_seats_int = parseInt(i_left_right_seats);

        if (left_right_seats_int == 0)
        {
            alert("TableData.setSeatDataFromXml Warning. i_left_right_seats = 0 ");

            return;
        }

        var n_seat_pairs_float = i_left_right_seats/2.0 + 0.00001;

        var n_seat_pairs = Math.trunc(n_seat_pairs_float);

        for (var index_pair=0; index_pair < n_seat_pairs; index_pair++)
        {
            var seat_number = index_pair + 1;

            if (1 == seat_number)
            {
                this.m_left_seats[index_pair] = TableData.booleanStringToBoolean(this.m_layout_xml.getTableSeatOneLeft(i_table_number));

                this.m_right_seats[index_pair] = TableData.booleanStringToBoolean(this.m_layout_xml.getTableSeatOneRight(i_table_number));
            }
            else if (2 == seat_number)
            {
                this.m_left_seats[index_pair] = TableData.booleanStringToBoolean(this.m_layout_xml.getTableSeatTwoLeft(i_table_number));

                this.m_right_seats[index_pair] = TableData.booleanStringToBoolean(this.m_layout_xml.getTableSeatTwoRight(i_table_number));                
            }
            else if (3 == seat_number)
            {
                this.m_left_seats[index_pair] = TableData.booleanStringToBoolean(this.m_layout_xml.getTableSeatThreeLeft(i_table_number));

                this.m_right_seats[index_pair] = TableData.booleanStringToBoolean(this.m_layout_xml.getTableSeatThreeRight(i_table_number));                    
            }
            else if (4 == seat_number)
            {
                this.m_left_seats[index_pair] = TableData.booleanStringToBoolean(this.m_layout_xml.getTableSeatFourLeft(i_table_number));

                this.m_right_seats[index_pair] = TableData.booleanStringToBoolean(this.m_layout_xml.getTableSeatFourRight(i_table_number));                    
            }
            else if (5 == seat_number)
            {
                this.m_left_seats[index_pair] = TableData.booleanStringToBoolean(this.m_layout_xml.getTableSeatFiveLeft(i_table_number));

                this.m_right_seats[index_pair] = TableData.booleanStringToBoolean(this.m_layout_xml.getTableSeatFiveRight(i_table_number));                    
            }			
            else if (6 == seat_number)
            {
                this.m_left_seats[index_pair] = TableData.booleanStringToBoolean(this.m_layout_xml.getTableSeatSixLeft(i_table_number));

                this.m_right_seats[index_pair] = TableData.booleanStringToBoolean(this.m_layout_xml.getTableSeatSixRight(i_table_number));                    
            }	
            else if (7 == seat_number)
            {
                this.m_left_seats[index_pair] = TableData.booleanStringToBoolean(this.m_layout_xml.getTableSeatSevenLeft(i_table_number));

                this.m_right_seats[index_pair] = TableData.booleanStringToBoolean(this.m_layout_xml.getTableSeatSevenRight(i_table_number));                    
            }			
            else if (8 == seat_number)
            {
                this.m_left_seats[index_pair] = TableData.booleanStringToBoolean(this.m_layout_xml.getTableSeatEightLeft(i_table_number));

                this.m_right_seats[index_pair] = TableData.booleanStringToBoolean(this.m_layout_xml.getTableSeatEightRight(i_table_number));                    
            }		
            else if (9 == seat_number)
            {
                this.m_left_seats[index_pair] = TableData.booleanStringToBoolean(this.m_layout_xml.getTableSeatNineLeft(i_table_number));

                this.m_right_seats[index_pair] = TableData.booleanStringToBoolean(this.m_layout_xml.getTableSeatNineRight(i_table_number));                    
            }			
            else if (10 == seat_number)
            {
                this.m_left_seats[index_pair] = TableData.booleanStringToBoolean(this.m_layout_xml.getTableSeatTenLeft(i_table_number));

                this.m_right_seats[index_pair] = TableData.booleanStringToBoolean(this.m_layout_xml.getTableSeatTenRight(i_table_number));                    
            }	
            else if (11 == seat_number)
            {
                this.m_left_seats[index_pair] = TableData.booleanStringToBoolean(this.m_layout_xml.getTableSeatElevenLeft(i_table_number));

                this.m_right_seats[index_pair] = TableData.booleanStringToBoolean(this.m_layout_xml.getTableSeatElevenRight(i_table_number));                    
            }	
            else if (12 == seat_number)
            {
                this.m_left_seats[index_pair] = TableData.booleanStringToBoolean(this.m_layout_xml.getTableSeatTwelveLeft(i_table_number));

                this.m_right_seats[index_pair] = TableData.booleanStringToBoolean(this.m_layout_xml.getTableSeatTwelveRight(i_table_number));                    
            }	
            else if (13 == seat_number)
            {
                this.m_left_seats[index_pair] = TableData.booleanStringToBoolean(this.m_layout_xml.getTableSeatThirteenLeft(i_table_number));

                this.m_right_seats[index_pair] = TableData.booleanStringToBoolean(this.m_layout_xml.getTableSeatThirteenRight(i_table_number));                    
            }	
            else if (14 == seat_number)
            {
                this.m_left_seats[index_pair] = TableData.booleanStringToBoolean(this.m_layout_xml.getTableSeatFourteenLeft(i_table_number));

                this.m_right_seats[index_pair] = TableData.booleanStringToBoolean(this.m_layout_xml.getTableSeatFourteenRight(i_table_number));                    
            }	
            else if (15 == seat_number)
            {
                this.m_left_seats[index_pair] = TableData.booleanStringToBoolean(this.m_layout_xml.getTableSeatSeatFifteenLeft(i_table_number));

                this.m_right_seats[index_pair] = TableData.booleanStringToBoolean(this.m_layout_xml.getTableSeatSeatFifteenRight(i_table_number));                    
            }	
            else if (16 == seat_number)
            {
                this.m_left_seats[index_pair] = TableData.booleanStringToBoolean(this.m_layout_xml.getTableSeatSixteenLeft(i_table_number));

                this.m_right_seats[index_pair] = TableData.booleanStringToBoolean(this.m_layout_xml.getTableSeatSixteenRight(i_table_number));                    
            }	
            else if (17 == seat_number)
            {
                this.m_left_seats[index_pair] = TableData.booleanStringToBoolean(this.m_layout_xml.getTableSeatSeventeenLeft(i_table_number));

                this.m_right_seats[index_pair] = TableData.booleanStringToBoolean(this.m_layout_xml.getTableSeatSeventeenRight(i_table_number));                    
            }	
            else if (18 == seat_number)
            {
                this.m_left_seats[index_pair] = TableData.booleanStringToBoolean(this.m_layout_xml.getTableSeatEighteenLeft(i_table_number));

                this.m_right_seats[index_pair] = TableData.booleanStringToBoolean(this.m_layout_xml.getTableSeatEighteenRight(i_table_number));                    
            }	
            else if (19 == seat_number)
            {
                this.m_left_seats[index_pair] = TableData.booleanStringToBoolean(this.m_layout_xml.getTableSeatNineteenLeft(i_table_number));

                this.m_right_seats[index_pair] = TableData.booleanStringToBoolean(this.m_layout_xml.getTableSeatNineteenRight(i_table_number));                    
            }	
            else if (20 == seat_number)
            {
                this.m_left_seats[index_pair] = TableData.booleanStringToBoolean(this.m_layout_xml.getTableSeatTwentyLeft(i_table_number));

                this.m_right_seats[index_pair] = TableData.booleanStringToBoolean(this.m_layout_xml.getTableSeatTwentyRight(i_table_number));                    
            }
            else
            {
                alert("TableData.setSeatDataFromXml Maximum number of seat pairs is twenty (20) ");

                break;
            }

        } // index_pair

    } // setSeatDataFromXml

    // Converts a boolean stri that is 'false' or 'true' to a boolean
    static booleanStringToBoolean(i_b_str)
    {
        if (i_b_str == 'true')
        {
            return true;
        }
        else if (i_b_str == 'false')
        {
            return false;
        }
        else
        {
            alert("TableData.booleanStringToBoolean Must be false or true. i_b_str= " + i_b_str);

            return false;
        }
    

    } // booleanStringToBoolean

    initSeatData()
    {
        for (var index_seat=0; index_seat < 20; index_seat++)
        {
            this.m_left_seats[index_seat] = false;

            this.m_right_seats[index_seat] = false;
        }

    } // initSeatData

    // Checks the data
    checkData()
    {
        var ret_b_check = true;

        if(!LayoutDataInput.check(this.m_case, this.m_layout_xml, this.m_input_data_object, "TableData"))
        {
            ret_b_check = false;

            return ret_b_check;
        }

        // TODO Add checks of member variables



        return ret_b_check;

    } // checkData

} // TableData

// Returns an object with table data. Data is retrieved from the 
// i_layout_xml: Object for a reservation layout XML file
function getTableDataFromXml(i_layout_xml, i_table_number)
{
    var layout_case = "get_data_from_xml";

    var input_data_object = null;

    var ret_object = new TableData(layout_case, i_layout_xml, input_data_object, i_table_number);

    if (!ret_object.checkData())
    {
        return null;
    }

    return ret_object;

} // getTableDataFromXml

// Returns an array of TableData objects
function getTableDataArrayFromXml(i_layout_xml)
{
    var ret_table_array = [];

    var n_tables = i_layout_xml.getNumberOfTables();

    for (var table_number=1; table_number <=  n_tables; table_number++)
    {
        var table_data = getTableDataFromXml(i_layout_xml, table_number);

        ret_table_array[table_number - 1] = table_data;
    }

    return ret_table_array;
 
} // getTableDataArrayFromXml


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Class Table Data ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Class Seat Data ///////////////////////////////////////(///
///////////////////////////////////////////////////////////////////////////////////////////

// Classwith seat data and seat identity functions
// var seat_data = new SeatData(seat_type, table_or_row_number, seat_number_or_char, b_create_seat)
class SeatData
{
    // Creates the instance of the class
    // i_case: get_data_from_xml, get_default_data, set_xml_object, check_data
    // i_layout_xml: Object for a reservation layout XML file. May be null for case get_default_data
    constructor(i_seat_type, i_table_or_row_number, i_seat_number_or_char, i_b_create_seat) 
    {
        // Member variables
        // ================
	   
	   // Seat type rect_table, round_table or row
	   this.m_seat_type = i_seat_type;

	   // Table or row number
	   this.m_table_or_row_number = i_table_or_row_number;
	   
	   // Seat character or number
	   this.m_seat_number_or_char = i_seat_number_or_char;
	   
	   // Boolean telling if the seat shall be created (available)
	   this.m_b_create_seat = i_b_create_seat;
	   
	   // Identity of the seat graphical element (circle)
	   this.m_circle_identity = "";

	   // Identity of the text element
	   this.m_text_identity = "";

       this.setIdentities();

    } // constructor

    getCreateSeat()
    {
        return this.m_b_create_seat;
    }

    getRowOrTableNumber()
    {
        return this.m_table_or_row_number;
    }

    getSeatNumberOrChar()
    {
        return this.m_seat_number_or_char;
    }

    getCircleId()
    {
        return this.m_circle_identity;
    }

    getTextId()
    {
        return this.m_text_identity;
    }

    // Sets the identities of the circle element and the text element for the seat based on the seat type, 
    // table or row number and seat number or character
    setIdentities()
    {
        if (this.m_seat_type =='rect_table')
        {
            this.m_circle_identity = SeatData.getTableSeatCircleId(this.m_table_or_row_number, this.m_seat_number_or_char);

            this.m_text_identity = SeatData.getTableSeatTextId(this.m_table_or_row_number, this.m_seat_number_or_char);
        }
        else if (this.m_seat_type =='round_table')
        {
            this.m_circle_identity = "";

            this.m_text_identity = "";

            alert("SeatData.setIdentities A not yet implemented type m_seat_type= " + this.m_seat_type);
        }
        else if (this.m_seat_type =='row')
        {
            this.m_circle_identity = "";

            this.m_text_identity = "";    
            
            alert("SeatData.setIdentities A not yet implemented type m_seat_type= " + this.m_seat_type);
        }
        else
        {
            this.m_circle_identity = "";

            this.m_text_identity = "";

            alert("SeatData.setIdentities Unvalid type m_seat_type= " + this.m_seat_type);
        }
        
    } // setIdentities

    // Constructs the identity of the circle element for a seat at a table. 
    // The identity is in the form tableNumber_seatCharacter
    static getTableSeatCircleId(i_table_number, i_seat_character)
    {
        return  i_table_number + "_" + i_seat_character;

    } // getTableSeatCircleId

    // Returns the table or row number from a circle identity. 
    // The circle identity is in the form tableOrRowNumber_seatCharacter
    static getTableOrRowNumberFromCircleId(i_circle_id)
    {
        var index_underscore = i_circle_id.indexOf("_");

        if (index_underscore < 0)
        {
            alert("SeatData.getTableOrRowNumberFromCircleId Error. No underscore in i_circle_id= " + i_circle_id);

            return "";
        }

        var table_or_row_number = i_circle_id.split("_")[0];
        
        return table_or_row_number;

    } // getTableOrRowNumberFromCircleId

    // Returns the seat character from a circle identity. 
    // The circle identity is in the form tableOrRowNumber_seatCharacter
    static getSeatCharacterFromCircleId(i_circle_id)
    {
        var index_underscore = i_circle_id.indexOf("_");
        
        if (index_underscore < 0)
        {
            alert("SeatData.getSeatCharacterFromCircleId Error. No underscore in i_circle_id= " + i_circle_id);

            return "";
        }

        var seat_character = i_circle_id.split("_")[1];

        return seat_character;

    } // getSeatCharacterFromCircleId

    // Constructs the identity of the text element for a seat at a table. 
    // The identity is in the form cir_text_tableNumber_seatCharacter
    static getTableSeatTextId(i_table_number, i_seat_character)
    {
        return  "cir_text_" + i_table_number + "_" + i_seat_character;;
        
    } // getTableSeatTextId
 
	// Get seat character for a left seat or for the upper seat
	static getSeatCharacterLeft(i_row_number, i_number_rows)
	{
		var character_left = "Undefined";

		if (1 == parseInt(i_row_number))
		{
			character_left = "A";
		}
		else if (2 == parseInt(i_row_number))
		{
			character_left = "C";
			if (parseInt(i_row_number) == parseInt(i_number_rows))
			{
				character_left = "C";
			}
		}
		else if (3 == parseInt(i_row_number))
		{
			character_left = "E";
			if (parseInt(i_row_number) == parseInt(i_number_rows))
			{
				character_left = "E";
			}
		}
		else if (4 == parseInt(i_row_number))
		{
			character_left = "G";
			if (parseInt(i_row_number) == parseInt(i_number_rows))
			{
				character_left = "G";
			}
		}
		else if (5 == parseInt(i_row_number))
		{
			character_left = "I";
			if (parseInt(i_row_number) == parseInt(i_number_rows))
			{
				character_left = "I";
			}
		}
		else if (6 == parseInt(i_row_number))
		{
			character_left = "K";
			if (parseInt(i_row_number) == parseInt(i_number_rows))
			{
				character_left = "K";
			}
		}	
		else if (7 == parseInt(i_row_number))
		{
			character_left = "M";
			if (parseInt(i_row_number) == parseInt(i_number_rows))
			{
				character_left = "M";
			}
		}		
		else if (8 == parseInt(i_row_number))
		{
			character_left = "O";
			if (parseInt(i_row_number) == parseInt(i_number_rows))
			{
				character_left = "O";
			}
		}
		else if (9 == parseInt(i_row_number))
		{
			character_left = "Q";
			if (parseInt(i_row_number) == parseInt(i_number_rows))
			{
				character_left = "Q";
			}
		}	
		else if (10 == parseInt(i_row_number))
		{
			character_left = "S";
			if (parseInt(i_row_number) == parseInt(i_number_rows))
			{
				character_left = "S";
			}
		}	
		else if (11 == parseInt(i_row_number))
		{
			character_left = "U";
			if (parseInt(i_row_number) == parseInt(i_number_rows))
			{
				character_left = "U";
			}
		}	
		else if (12 == parseInt(i_row_number))
		{
			character_left = "X";
			if (parseInt(i_row_number) == parseInt(i_number_rows))
			{
				character_left = "X";
			}
		}
		else if (13 == parseInt(i_row_number))
		{
			character_left = "Z";
			if (parseInt(i_row_number) == parseInt(i_number_rows))
			{
				character_left = "Z";
			}
		}	
		else if (14 == parseInt(i_row_number))
		{
			character_left = "a";
			if (parseInt(i_row_number) == parseInt(i_number_rows))
			{
				character_left = "a";
			}
		}	
		else if (15 == parseInt(i_row_number))
		{
			character_left = "c";
			if (parseInt(i_row_number) == parseInt(i_number_rows))
			{
				character_left = "c";
			}
		}
		else if (16 == parseInt(i_row_number))
		{
			character_left = "e";
			if (parseInt(i_row_number) == parseInt(i_number_rows))
			{
				character_left = "e";
			}
		}
		else if (17 == parseInt(i_row_number))
		{
			character_left = "g";
			if (parseInt(i_row_number) == parseInt(i_number_rows))
			{
				character_left = "g";
			}
		}
		else if (18 == parseInt(i_row_number))
		{
			character_left = "i";
			if (parseInt(i_row_number) == parseInt(i_number_rows))
			{
				character_left = "i";
			}
		}	
		else if (19 == parseInt(i_row_number))
		{
			character_left = "k";
			if (parseInt(i_row_number) == parseInt(i_number_rows))
			{
				character_left = "k";
			}
		}	
		else if (parseInt(i_row_number) == parseInt(i_number_rows))
		{
			character_left = "m";

		}

        if (character_left == "Undefined")
        {
            alert("SeatData.getSeatCharacterLeft No character returned for i_row_number= " + i_row_number.toString() + " i_number_rows= " + i_number_rows.toString());
        }
			
		return character_left;
		
	} // getSeatCharacterLeft

	// Get seat character for a right seat or for the lower seat
	static getSeatCharacterRight(i_row_number, i_number_rows)
	{
		var character_right = "Undefined";

		if (1 == parseInt(i_row_number))
		{
			character_right = "B";
		}
		else if (2 == parseInt(i_row_number))
		{
			character_right = "D";
			if (parseInt(i_row_number) == parseInt(i_number_rows))
			{
				character_right = "D";
			}
		}
		else if (3 == parseInt(i_row_number))
		{
			character_right = "F";
			if (parseInt(i_row_number) == parseInt(i_number_rows))
			{
				character_right = "F";
			}
		}
		else if (4 == parseInt(i_row_number))
		{
			character_right = "H";
			if (parseInt(i_row_number) == parseInt(i_number_rows))
			{
				character_right = "H";
			}
		}
		else if (5 == parseInt(i_row_number))
		{
			character_right = "J";
			if (parseInt(i_row_number) == parseInt(i_number_rows))
			{
				character_right = "J";
			}
		}
		else if (6 == parseInt(i_row_number))
		{
			character_right = "L";
			if (parseInt(i_row_number) == parseInt(i_number_rows))
			{
				character_right = "L";
			}
		}	
		else if (7 == parseInt(i_row_number))
		{
			character_right = "N";
			if (parseInt(i_row_number) == parseInt(i_number_rows))
			{
				character_right = "N";
			}
		}		
		else if (8 == parseInt(i_row_number))
		{
			character_right = "P";
			if (parseInt(i_row_number) == parseInt(i_number_rows))
			{
				character_right = "P";
			}
		}
		else if (9 == parseInt(i_row_number))
		{
			character_right = "R";
			if (parseInt(i_row_number) == parseInt(i_number_rows))
			{
				character_right = "R";
			}
		}	
		else if (10 == parseInt(i_row_number))
		{
			character_right = "T";
			if (parseInt(i_row_number) == parseInt(i_number_rows))
			{
				character_right = "T";
			}
		}	
		else if (11 == parseInt(i_row_number))
		{
			character_right = "V";
			if (parseInt(i_row_number) == parseInt(i_number_rows))
			{
				character_right = "V";
			}
		}	
		else if (12 == parseInt(i_row_number))
		{
			character_right = "Y";
			if (parseInt(i_row_number) == parseInt(i_number_rows))
			{
				character_right = "Y";
			}
		}
		else if (13 == parseInt(i_row_number))
		{
			character_right = "Ä";
			if (parseInt(i_row_number) == parseInt(i_number_rows))
			{
				character_right = "Ä";
			}
		}	
		else if (14 == parseInt(i_row_number))
		{
			character_right = "b";
			if (parseInt(i_row_number) == parseInt(i_number_rows))
			{
				character_right = "b";
			}
		}	
		else if (15 == parseInt(i_row_number))
		{
			character_right = "d";
			if (parseInt(i_row_number) == parseInt(i_number_rows))
			{
				character_right = "d";
			}
		}
		else if (16 == parseInt(i_row_number))
		{
			character_right = "f";
			if (parseInt(i_row_number) == parseInt(i_number_rows))
			{
				character_right = "f";
			}
		}
		else if (17 == parseInt(i_row_number))
		{
			character_right = "h";
			if (parseInt(i_row_number) == parseInt(i_number_rows))
			{
				character_right = "h";
			}
		}
		else if (18 == parseInt(i_row_number))
		{
			character_right = "j";
			if (parseInt(i_row_number) == parseInt(i_number_rows))
			{
				character_right = "j";
			}
		}	
		else if (19 == parseInt(i_row_number))
		{
			character_right = "l";
			if (parseInt(i_row_number) == parseInt(i_number_rows))
			{
				character_right = "l";
			}
		}	
		else if (parseInt(i_row_number) == parseInt(i_number_rows))
		{
			character_right = "n";

		}

        if (character_right == "Undefined")
        {
            alert("SeatData.getSeatCharacterRight No character returned for i_row_number= " + i_row_number.toString() + " i_number_rows= " + i_number_rows.toString());
        }
			
		return character_right;
		
	} // getSeatCharacterRight

    // Checks the data
    checkData()
    {
        var ret_b_check = true;


        return ret_b_check;

    } // checkData

} // SeatData

// Get an array of SeatData objects for all tables
function getAllTablesSeatDataArray(i_layout_xml)
{
    var ret_seat_data_array = [];

    var index_seat_data_array = 0;

    var seat_type = 'rect_table';

    var seat_data = null;

    var table_data_array = getTableDataArrayFromXml(i_layout_xml);

    var n_tables = table_data_array.length;

    for (var table_index = 0; table_index < n_tables; table_index++)
    {
        var table_data = table_data_array[table_index];

        var table_number = table_data.getNumber();

        var b_seat_left_array = table_data.getSeatLeftArray();

        var b_seat_right_array = table_data.getSeatRightArray();

        var b_seat_upper = table_data.getSeatUpper();

        var b_seat_lower = table_data.getSeatLower();

        var n_rows = b_seat_left_array.length - 1;

        var row_number= -12345;

        for (var index_row=0; index_row <= n_rows; index_row++)
        {
            row_number= index_row + 1;

            var seat_char_left = SeatData.getSeatCharacterLeft(row_number, b_seat_left_array.length);

            var seat_char_right = SeatData.getSeatCharacterRight(row_number, b_seat_right_array.length);

            var b_seat_left = b_seat_left_array[index_row];

            var b_seat_right = b_seat_right_array[index_row];

            seat_data = new SeatData(seat_type, table_number, seat_char_left, b_seat_left);

            checkIfCharIsSet(seat_data, row_number, b_seat_left_array.length);

            ret_seat_data_array[index_seat_data_array] = seat_data;

            index_seat_data_array = index_seat_data_array + 1;

            seat_data = new SeatData(seat_type, table_number, seat_char_right, b_seat_right);

            checkIfCharIsSet(seat_data, row_number, b_seat_right_array.length);

            ret_seat_data_array[index_seat_data_array] = seat_data;

            index_seat_data_array = index_seat_data_array + 1;

        } // index_row

        var i_dum = 1;
        if (1 == b_seat_left_array.length)
        {
            i_dum =2;
        }

        var character_upper  = SeatData.getSeatCharacterLeft(row_number + 1, b_seat_left_array.length);

        var character_lower  = SeatData.getSeatCharacterRight(row_number + 1, b_seat_right_array.length);

        seat_data = new SeatData(seat_type, table_number, character_upper, b_seat_upper);

        checkIfCharIsSet(seat_data, row_number + 1, b_seat_left_array.length);

        ret_seat_data_array[index_seat_data_array] = seat_data;

        index_seat_data_array = index_seat_data_array + 1;

        seat_data = new SeatData(seat_type, table_number, character_lower, b_seat_lower);

        checkIfCharIsSet(seat_data, row_number + 1, b_seat_right_array.length);

        ret_seat_data_array[index_seat_data_array] = seat_data;

        index_seat_data_array = index_seat_data_array + 1;

    } // table_index

    return ret_seat_data_array

} // getAllTablesSeatDataArray

function checkIfCharIsSet(i_data_seat, i_row_number, i_array_length)
{
    var current_char = i_data_seat.getSeatNumberOrChar();

    if (current_char == 'Undefined')
    {
        alert("SeatData.checkIfCharIsSet No character returned for i_row_number= " + i_row_number.toString() + " i_array_length= " + i_array_length.toString());
    }

} // checkIfCharIsSet
 
// Returns an array of TableSeatData that are available in the event premises
function getAvailableTableSeatArray(i_layout_xml)
{
    var ret_array = [];

    var table_seat_array = getAllTablesSeatDataArray(i_layout_xml);

    var index_out = 0;

    for (var index_data = 0;  index_data < table_seat_array.length; index_data++)
    {
        var table_seat_data = table_seat_array[index_data];

        var table_row_number = table_seat_data.getRowOrTableNumber();

        var seat_char_number = table_seat_data.getSeatNumberOrChar();

        var seat_available = table_seat_data.getCreateSeat();

        if (seat_available)
        {
            table_seat_data = new TableSeatData(table_row_number, seat_char_number);

            ret_array[index_out] = table_seat_data;

            index_out = index_out + 1;
        }
    }

    return ret_array;

} // getAvailableTableSeatArray

class TableSeatData
{
    constructor(i_table_or_row_number, i_seat_character_or_number)
    {
        this.m_table_or_row_number = i_table_or_row_number;

        this.m_seat_character_or_number = i_seat_character_or_number;
    }

    getTableRowNumber()
    {
        return this.m_table_or_row_number;
    }

    getSeatCharacterNumber()
    {
        return this.m_seat_character_or_number;
    }


} // TableSeatData

/*
    getCreateSeat()
    {
        return this.m_b_create_seat;
    }

    getRowOrTableNumber()
    {
        return this.m_table_or_row_number;
    }

    getSeatNumberOrChar()
    {
        return this.m_seat_number_or_char;
    }

*/


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Class Seat Data /////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Class Group Data //////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Class holding group data
class GroupData
{
    // Creates the instance of the class
    // i_case: get_data_from_xml, get_default_data, set_xml_object, check_data
    // i_layout_xml: Object for a reservation layout XML file.
    constructor(i_case, i_layout_xml, i_input_data_object, i_group_number) 
    {
        // Member variables
        // ================

        // Constructor case
        this.m_case = i_case;

       // Layout XML object
       this.m_layout_xml = i_layout_xml;

       // An instance of this class to be used for case set_xml_object
       this.m_input_data_object = i_input_data_object;

       // Input group number
       this.m_group_number = i_group_number;

       this.m_text = "";
       this.m_tables = [];

        // Instance of the class BoundingBox for the table group without seats.
       this.m_boundimg_box = null;

       // Instance of the class BoundingBox for the table group with seats.
       this.m_boundimg_box_seats = null;
	   
       this.execute();

    } // constructor

    // Execute
    execute()
    {
        if (this.m_case == "get_data_from_xml")
        {
            this.setDataFromXml();

            this.setBoundingBoxes();
        }
        else
        {
            alert("GroupData.execute Not yet an implemented case " + this.m_case);
        }

    } // execute

    // Sets the bounding box for the table group based on the tables in the group. 
    // The bounding box is calculated both for the tables and for the tables with seats.
    setBoundingBoxes()
    {
        this.m_boundimg_box = new BoundingBox('TableGroupNoSeats');

        this.m_boundimg_box_seats = new BoundingBox('TableGroupWithSeats');

        var n_tables = this.m_tables.length;

        for (var index_table=0; index_table < n_tables; index_table++)
        {
            var table_data = this.m_tables[index_table];

            var table_bounding_box = table_data.getBoundingBox();

            this.m_boundimg_box.updateBox(table_bounding_box);

            var table_bounding_box_seats = table_data.getBoundingBoxSeats();

            this.m_boundimg_box_seats.updateBox(table_bounding_box_seats);
        }    
    } // SetBoundingBoxes

    // Returns the bounding box for the table group without seats
    getBoundingBox()
	{ 
		return this.m_boundimg_box; 

	} // getBoundingBox

    // Returns the bounding box for the table group with seats
    getBoundingBoxSeats()
    {
        return this.m_boundimg_box_seats;

    } // getBoundingBoxSeats

    // Get and set functions for the member variables
    getText(){ return this.m_text; }
    setText(i_text){ this.m_text = i_text; }

    getTables(){ return this.m_tables; }
    setTables(i_tables){ this.m_tables = i_tables; }


    // Sets the dat from the XML object m_layout_xml
    setDataFromXml()
    {
       this.m_text = this.m_layout_xml.getGroupText(this.m_group_number);
 
       this.m_tables = this.getGroupTableDataArrayFromXml(this.m_layout_xml, this.m_group_number);

    } // setDataFromXml

    // Returns an array of TableData objects for a given group
    getGroupTableDataArrayFromXml(i_layout_xml, i_group_number)
    {
        var ret_table_array = [];

        var table_number_array = i_layout_xml.getGroupTableNumbers(i_group_number);

        var n_numbers = table_number_array.length;

        if (n_numbers <= 0)
        {
            alert("GroupData.getGroupTableDataArrayFromXml");

            return ret_table_array;
        }

        for (var index_number=0; index_number < n_numbers; index_number++)
        {
            var table_number = table_number_array[index_number];

            var layout_case = "get_data_from_xml";

            var input_data_object = null;
        
            var table_data = new TableData(layout_case, i_layout_xml, input_data_object, table_number);

            ret_table_array[index_number] = table_data;
        }

        return ret_table_array;
    
    } // getGroupTableDataArrayFromXml

    // Checks the data
    checkData()
    {
        var ret_b_check = true;

        if(!LayoutDataInput.check(this.m_case, this.m_layout_xml, this.m_input_data_object, "GroupData"))
        {
            ret_b_check = false;

            return ret_b_check;
        }

        // TODO Add checks of member variables



        return ret_b_check;

    } // checkData

} // GroupData

// Returns an object with door data. Data is retrieved from the 
// i_layout_xml: Object for a reservation layout XML file
function getGroupDataFromXml(i_layout_xml, i_group_number)
{
    var layout_case = "get_data_from_xml";

    var input_data_object = null;

    var ret_object = new GroupData(layout_case, i_layout_xml, input_data_object, i_group_number);

    if (!ret_object.checkData())
    {
        return null;
    }

    return ret_object;

} // getGroupDataFromXml

// Returns an array of GroupData objects
function getGroupDataArrayFromXml(i_layout_xml)
{
    var ret_table_group_array = [];

    var n_table_groups = i_layout_xml.getNumberOfGroups();

    for (var group_number=1; group_number <=  n_table_groups; group_number++)
    {
        var table_group_data = getGroupDataFromXml(i_layout_xml, group_number);

        ret_table_group_array[group_number - 1] = table_group_data;
    }

    return ret_table_group_array;
 
} // getGroupDataArrayFromXml

// Returns the bounding box for a given table group witout seats. 
// The bounding box is calculated based on the tables in the group.
// i_layout_xml: Object for a reservation layout XML file
function getGroupDataBoundingBoxFromXml(i_layout_xml, i_group_number)
{
    var layout_case = "get_data_from_xml";

    var input_data_object = null;

    var group_object = new GroupData(layout_case, i_layout_xml, input_data_object, i_group_number);

    if (!group_object.checkData())
    {
        return null;
    }

    var ret_bounding_box = group_object.getBoundingBox();

    return ret_bounding_box;

} // getGroupDataBoundingBoxFromXml

// Returns the bounding box for a given table group with seats. 
// The bounding box is calculated based on the tables in the group and the seats around the tables.
// i_layout_xml: Object for a reservation layout XML file
function getGroupDataBoundingBoxSeatsFromXml(i_layout_xml, i_group_number)
{
    var layout_case = "get_data_from_xml";

    var input_data_object = null;

    var group_object = new GroupData(layout_case, i_layout_xml, input_data_object, i_group_number);

    if (!group_object.checkData())
    {
        return null;
    }

    var ret_bounding_box = group_object.getBoundingBoxSeats();

    return ret_bounding_box;

} // getGroupDataBoundingBoxSeatsFromXml

// Returns the bounding box for all table groups with seats. 
// The bounding box is calculated based on the tables in the 
// groups and the seats around the tables.
// i_layout_xml: Object for a reservation layout XML file
function getAllGroupDataBoundingBoxFromXml(i_layout_xml)
{
    var ret_bounding_box_array = [];

    var all_groups_bounding_box = new BoundingBox('AllTableGroupsWithSeats');

    var n_table_groups = i_layout_xml.getNumberOfGroups();

    for (var group_number=1; group_number <=  n_table_groups; group_number++)
    {
        var bounding_box = getGroupDataBoundingBoxFromXml(i_layout_xml, group_number);

        all_groups_bounding_box.updateBox(bounding_box);
    }

    return all_groups_bounding_box;

} // getAllGroupDataBoundingBoxFromXml

// Returns the bounding box for all table groups with seats. 
// The bounding box is calculated based on the tables in the 
// groups and the seats around the tables.
// i_layout_xml: Object for a reservation layout XML file 
function getAllGroupDataWithSeatsBoundingBoxFromXml(i_layout_xml)
{
    var ret_bounding_box_array = [];

    var all_groups_bounding_box = new BoundingBox('AllTableGroupsWithSeats');

    var n_table_groups = i_layout_xml.getNumberOfGroups();

    for (var group_number=1; group_number <=  n_table_groups; group_number++)
    {
        var bounding_box_seats = getGroupDataBoundingBoxSeatsFromXml(i_layout_xml, group_number);

        all_groups_bounding_box.updateBox(bounding_box_seats);

    }

    return all_groups_bounding_box;

} // getAllGroupDataWithSeatsBoundingBoxFromXml

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Class Group Data ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Class Bounding Box ////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Class for bounding box data and functions
// The elements in the layout XML file are defined in millimeters
class BoundingBox
{
    constructor(i_description)
    {
        // Description of the bounding box. E.g. "Bounding box for tables"
        this.m_description = i_description;

        // Minimum and maximum x and y values for the bounding box
        this.m_x_min = 500000;

        // Maximum x value for the bounding box
        this.m_x_max = -500000;

        // Minimum y value for the bounding box
        this.m_y_min = 500000;

        // Maximum y value for the bounding box
        this.m_y_max = -500000;

        // Seat diameter in millimeters. Used for calculating the bounding box for seats
        this.m_seat_size = 500;

    } // BoundingBox

    // Set function for the seat size in millimeters
    setSeatSize(i_seat_size)
    {
        this.m_seat_size = parseInt(i_seat_size);

    } // setSeatSize

    // Get function for the seat size in millimeters
    getSeatSize()
    {
        return this.m_seat_size;

    } // getSeatSize

    // Update the bounding box with another bounding box
    updateBox(i_bounding_box)
    {
        if (i_bounding_box.getXMin() < this.m_x_min)
        {
            this.m_x_min = i_bounding_box.getXMin();
        }

        if (i_bounding_box.getXMax() > this.m_x_max)
        {
            this.m_x_max = i_bounding_box.getXMax();
        }

        if (i_bounding_box.getYMin() < this.m_y_min)
        {
            this.m_y_min = i_bounding_box.getYMin();
        }

        if (i_bounding_box.getYMax() > this.m_y_max)
        {
            this.m_y_max = i_bounding_box.getYMax();
        }

        this.toConsole("updateBox");

    } // updateBox

    // Update the bounding box with a table defined by upper left 
    // corner and width and height. The bounding box is updated with 
    // the dimensions of the table and the seats around the table
    updateTableSeats(i_upper_x, i_upper_y, i_width, i_height)
    {
        var upper_x_seats = parseInt(i_upper_x) - this.getSeatSize();

        var upper_y_seats = parseInt(i_upper_y) - this.getSeatSize();

        var width_seats = parseInt(i_width) + 2*this.getSeatSize();

        var height_seats = parseInt(i_height) + 2*this.getSeatSize();

        this.updateLeftDim(upper_x_seats, upper_y_seats, width_seats, height_seats);

        this.toConsole("updateTableSeats");

    } // updateTableSeats

    // Update with an element defined by upper left corner and width and height
    updateLeftDim(i_upper_x, i_upper_y, i_width, i_height)
    {
        var x_min = parseInt(i_upper_x);

        var x_max = parseInt(i_upper_x) + parseInt(i_width);

        var y_min = parseInt(i_upper_y);

        var y_max = parseInt(i_upper_y) + parseInt(i_height);

        if (x_min < this.m_x_min)
        {
            this.m_x_min = x_min;
        }
        
        if (x_max > this.m_x_max)
        {
            this.m_x_max = x_max;
        }

        if (y_min < this.m_y_min)
        {
            this.m_y_min = y_min;
        }

        if (y_max > this.m_y_max)
        {
            this.m_y_max = y_max;
        }

        this.toConsole("updateLeftDim");

    } // updateLeftDim

    // Returns the description of the bounding box
    getDescription()
    {
        return this.m_description;
    }

    // Returns the minimum and maximum x and y values (millimeters) for the bounding box
    getXMin(){ return this.m_x_min; }
    getXMax(){ return this.m_x_max; }
    getYMin(){ return this.m_y_min; }
    getYMax(){ return this.m_y_max; }

    // Returns the width of the bounding box in millimeters
    getWidth()
    {
        return this.m_x_max - this.m_x_min;
    }
    // Returns the height of the bounding box in millimeters
    getHeight()
    {
        return this.m_y_max - this.m_y_min;
    }   

    // Display the bounding box data in the console
    toConsole(i_function_name)
    {
        /* Too much output in the console ....
        console.log("BoundingBox." + i_function_name + " " +
            this.m_description +
            " MinX= " + this.getXMin() + " MaxX= " + this.getXMax() + 
            " MinY= " + this.getYMin() + " MaxY= " + this.getYMax() );
        */

    } // toConsole

} // BoundingBox




///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Class Bounding Box //////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Class Check Input Data ////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Class for checking input layout data
class LayoutDataInput
{
    // Checks the input data
    static check(i_case, i_layout_xml, i_input_data_object, i_class_name)
    {
        var ret_b_input = true;

        if (i_case != "get_data_from_xml" && i_case != "get_default_data" && i_case != "set_xml_object" && i_case != "check_data" )
        {
            alert("LayoutDataInput.check Not a valid input case= " + i_case + " Class= " + i_class_name);
    
            ret_b_input = false;   
            
            return ret_b_input;
        }

        if (i_case != "get_default_data" && i_case != "check_data")
        {
            if (i_layout_xml == null)
            {
                alert("LayoutDataInput.check XML object is null" + " Class= " + i_class_name);
    
                ret_b_input = false;
            }
        }

        return ret_b_input;

    } // check

    // Checks if the values in i_value_array are positive integers. 
    // If not, an alert is displayed with the unvalid values and false is returned
    static checkPositiveInteger(i_class_name, i_value_array, i_name_array)
    {
        var ret_b_check = true;

        var error_msg = "LayoutDataInput.checkPositiveInteger Unvalid value for " + i_class_name + " ";

        var n_values = i_value_array.length;

        for (var index_value=0; index_value < n_values; index_value++)
        {
            var value = i_value_array[index_value];

            if (value < 0 || !Number.isInteger(value))
            {
                
                error_msg = error_msg + i_name_array[index_value] + "= " + value.toString() + "\n";

                ret_b_check = false;
            }
        }

        if (!ret_b_check)
        {
            alert(error_msg);
        }

        return ret_b_check;

    } // checkPositiveInteger

} // LayoutDataInput

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Class Check Input Data //////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////