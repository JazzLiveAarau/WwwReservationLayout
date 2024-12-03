// File: ReservationLayoutCommon.js
// Date: 2024-12-03
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
       this.m_organizer_name = "";
       this.m_organizer_text_logo = "";
       this.m_organizer_text_logo_width = "";
       this.m_organizer_text_logo_height = "";
       this.m_organizer_logo = "";
       this.m_organizer_logo_width = "";
       this.m_organizer_logo_height = "";
       this.m_sponsors_image = "";
       this.m_sponsors_image_width = "";
       this.m_sponsors_image_height = "";
	   
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
            alert("PremisesData.execute Not yet an implemented case " + this.m_case);
        }

    } // execute

    // Get and set functions for the member variables
    getName(){ return this.m_name; }
    setName(i_name){ this.m_name = i_name; }

    getWidth(){ return this.m_width; }
    setWidth(i_width){ this.m_width = i_width; }

    getHeight(){ return this.m_height; }
    setHeight(i_height){ this.m_height = i_height; }

    getWallThickness(){ return this.m_wall_thickness; }
    setWallThickness(i_height){ this.m_wall_thickness = i_wall_thickness; }

    getMaxWidthPixel(){ return this.m_max_width_pixel; }
    setMaxWidthPixel(i_wall_thickness){ this.m_max_width_pixel = i_max_width_pixel; }

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

        this.m_organizer_name = this.m_layout_xml.getOrganizerName();
        this.m_organizer_text_logo = this.m_layout_xml.getOrganizerTextLogo();
        this.m_organizer_text_logo_width = this.m_layout_xml.getOrganizerTextLogoWidth();
        this.m_organizer_text_logo_height = this.m_layout_xml.getOrganizerTextLogoHeight();
        this.m_organizer_logo = this.m_layout_xml.getOrganizerLogo();
        this.m_organizer_logo_width = this.m_layout_xml.getOrganizerLogoWidth();
        this.m_organizer_logo_height = this.m_layout_xml.getOrganizerLogoHeight();
        this.m_sponsors_image = this.m_layout_xml.getSponsorsImage();
        this.m_sponsors_image_width = this.m_layout_xml.getSponsorsImageWidth();
        this.m_sponsors_image_height = this.m_layout_xml.getSponsorsImageHeight();

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

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Class Premises Data /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Class Layout File Data ////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Class holding layout file Data
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

/*QQQQ
// Returns an array of LayoutFileData objects
function getLayoutButtonIdArrayFromXml(i_layout_xml, i_layout_file_number)
{
    var ret_button_id_array = [];

    var layout_file_data_array =  getLayoutFileDataArrayFromXml(i_layout_xml);

    if (null == layout_file_data_array || layout_file_data_array.length == 0)
    {
        return ret_button_id_array;
    }

    var layout_file_index = i_layout_file_number - 1;

    var layout_file_data =  layout_file_data_array[layout_file_index];





    var n_layout_files = i_layout_xml.getNumberOfLayoutFiles();

    for (var layout_file_number=1; layout_file_number <=  n_layout_files; layout_file_number++)
    {
        var layout_file_data = getLayoutFileDataFromXml(i_layout_xml, layout_file_number);

        ret_layout_file_array[layout_file_number - 1] = layout_file_data;
    }

    return ret_button_id_array;
 
} // getLayoutFileDataArrayFromXml

QQQ*/

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

    // Sets the dat from the XML object m_layout_xml
    setDataFromXml()
    {
        this.m_color = this.m_layout_xml.getTableColor();
        this.m_stroke_color = this.m_layout_xml.getTableStrokeColor();
        this.m_stroke_width = this.m_layout_xml.getTableStrokeWidth();
        this.m_text_rel_x_procent = this.m_layout_xml.getTableTextRelXProcent();
        this.m_text_rel_y_procent = this.m_layout_xml.getTableTextRelYProcent();
        this.m_text_color = this.m_layout_xml.getTableTextColor();

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

        this.m_upper_left_x = "";
        this.m_upper_left_y = "";
        this.m_width = "";
        this.m_height = "";
        this.m_text = "";
        this.m_color = "";
        this.m_stroke_color = "";
        this.m_stroke_width = "";
        this.m_text_rel_x_procent = "";
        this.m_text_rel_y_procent = "";
        this.m_text_color = "";
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
            alert("StageData.execute Not yet an implemented case " + this.m_case);
        }

    } // execute

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

    // Sets the dat from the XML object m_layout_xml
    setDataFromXml()
    {
        this.m_upper_left_x = this.m_layout_xml.getStageUpperLeftX();
        this.m_upper_left_y = this.m_layout_xml.getStageUpperLeftY();
        this.m_width = this.m_layout_xml.getStageWidth();
        this.m_height = this.m_layout_xml.getStageHeight();
        this.m_text = this.m_layout_xml.getStageText();
        this.m_color = this.m_layout_xml.getStageColor();
        this.m_stroke_color = this.m_layout_xml.getStageStrokeColor();
        this.m_stroke_width = this.m_layout_xml.getStageStrokeWidth();
        this.m_text_rel_x_procent = this.m_layout_xml.getStageTextRelXProcent();
        this.m_text_rel_y_procent = this.m_layout_xml.getStageTextRelYProcent();
        this.m_text_color = this.m_layout_xml.getStageTextColor();
        this.m_image = this.m_layout_xml.getStageImage();
        this.m_image_width = this.m_layout_xml.getStageImageWidth();
        this.m_image_height = this.m_layout_xml.getStageImageHeight();

    } // setDataFromXml

    // Checks the data
    checkData()
    {
        var ret_b_check = true;

        if(!LayoutDataInput.check(this.m_case, this.m_layout_xml, this.m_input_data_object, "StageData"))
        {
            ret_b_check = false;

            return ret_b_check;
        }

        // TODO Add checks of member variables



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
        this.m_upper_left_x = this.m_layout_xml.getCashUpperLeftX();
        this.m_upper_left_y = this.m_layout_xml.getCashUpperLeftY();
		this.m_image = this.m_layout_xml.getCashImage();
		this.m_image_width = this.m_layout_xml.getCashImageWidth();
		this.m_image_height = this.m_layout_xml.getCashImageHeight();
 
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

       this.initSeatData();

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
            alert("TableData.execute Not yet an implemented case " + this.m_case);
        }

    } // execute

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
            alert("GroupData.execute Not yet an implemented case " + this.m_case);
        }

    } // execute

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

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Class Group Data ////////////////////////////////////////////
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

} // LayoutDataInput

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Class Check Input Data //////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////