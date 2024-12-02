// File: ReservationLayoutXml.js
// Date: 2024-12-02
// Author: Gunnar Lidén

// File content
// =============
//
// Class for a reservation layout XML file

class ReservationLayoutXml
{
    // Creates the instance of the class
    // i_callback_function_name: Function that shall be called after loading
    // i_result_directory_name: XML file name. The file must be in a subdirectory with the name XML
    constructor(i_callback_function_name, i_result_directory_name) 
    {
        // Member variables
        // ================

        // Call back function name
        this.m_callback_function_name = i_callback_function_name;

        // The result directory name. The XML layout file has the same name and is in subdirectory XML
        this.m_result_directory_name = i_result_directory_name; 

        // Path and name of test XML file in the computer
        this.m_result_directory_name_local = 'XmlTestData/LayoutTestData.xml'; 

        // The jazz application xml object
        this.m_object_xml = null;

        // Object holding the tags
        this.m_tags = new ReservationLayoutTags();

        // Flag that a node value not have been set
        this.m_not_yet_set_node_value = "NotYetSetNodeValue";

        // Loads the XML object for aapplication file and calls the function m_callback_function_name
        this.loadOneXmlFile(this, this.getXmlLayoutFileName(), this.m_callback_function_name);


    } // constructor

    ///////////////////////////////////////////////////////////////////////////
    /////// Start Get Layout File Functions ///////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Returns the layout file case
    getLayoutFileCase(i_layout_file_number)
    {
        return this.getLayoutFileNodeValue(this.m_tags.getLayoutFileCase(), i_layout_file_number);
        
    } // getLayoutFileCase

    // Returns the name of the HTML file
    getLayoutFileHtmlName(i_layout_file_number)
    {
        return this.getLayoutFileNodeValue(this.m_tags.getLayoutFileHtmlName(), i_layout_file_number);
        
    } // getLayoutFileHtmlName

    // Returns the layout file description
    getLayoutFileDescription(i_layout_file_number)
    {
        return this.getLayoutFileNodeValue(this.m_tags.getLayoutFileDescription(), i_layout_file_number);
        
    } // getLayoutFileDescription

    // Returns the layout file button identity for a given layout number and button id number
    getLayoutFileButtonId(i_layout_file_number, i_button_id_number)
    {
        return this.getLayoutFileButtonIdNodeValue(i_layout_file_number, i_button_id_number);
        
    } // getLayoutFileButtonId

    ///////////////////////////////////////////////////////////////////////////
    /////// End Get Layout File Functions /////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    /////// Start Set Layout File Functions ///////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////
    
    // Sets the layout file case
    setLayoutFileCase(i_layout_case_name, i_layout_file_number)
    {
        this.setLayoutFileNodeValue(this.m_tags.getLayoutFileCase(), i_layout_case_name, i_layout_file_number);
        
    } // setLayoutFileCase

    // Sets  the name of the HTML file
    setLayoutFileHtmlName(i_layout_htm_file_name, i_layout_file_number)
    {
        this.setLayoutFileNodeValue(this.m_tags.getLayoutFileHtmlName(), i_layout_htm_file_name, i_layout_file_number);
        
    } // setLayoutFileHtmlName

    // Sets the the layout file description
    setLayoutFileDescription(i_layout_case_description, i_layout_file_number)
    {
        this.setLayoutFileNodeValue(this.m_tags.getLayoutFileDescription(), i_layout_case_description, i_layout_file_number);
        
    } // setLayoutFileDescription

    // Sets  the layout file button identity for a given layout number and button id number
    setLayoutFileButtonId(i_button_id, i_layout_file_number, i_button_id_number)
    {
        this.setLayoutFileButtonIdNodeValue(i_button_id, i_button_id_number, i_layout_file_number);
        
    } // setLayoutFileButtonId

    ///////////////////////////////////////////////////////////////////////////
    /////// End Set Layout File Functions /////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Returns the premises name
    getPremisesName()
    {
        return this.getLayoutNodeValue(this.m_tags.getPremisesName());
        
    } // getPremisesName

    // Returns the premises width
    getPremisesWidth()
    {
        return this.getLayoutNodeValue(this.m_tags.getPremisesWidth());
        
    } // getPremisesWidth

    // Returns the premises height
    getPremisesHeight()
    {
        return this.getLayoutNodeValue(this.m_tags.getPremisesHeight());
        
    } // getPremisesHeight

    // Returns the wall thickness in mm
    getWallThickness()
    {
        return this.getLayoutNodeValue(this.m_tags.getWallThickness());
        
    } // getWallThickness

    // Returns the max  width in pixel. Used to scale from millimeter to pixel
    getMaxWidhtPixel()
    {
        return this.getLayoutNodeValue(this.m_tags.getMaxWidhtPixel());
        
    } // getMaxWidhtPixel	

    // Returns the  allowed (max) reservation percentage
    getMaxReservationsProcent()
    {
        return this.getLayoutNodeValue(this.m_tags.getMaxReservationsProcent());
        
    } // getMaxReservationsProcent

    // Returns the name of the organizer
    getOrganizerName()
    {
        return this.getLayoutNodeValue(this.m_tags.getOrganizerName());
        
    } // getOrganizerName	

    // Returns the organizer text logo
    getOrganizerTextLogo()
    {
        return this.getLayoutNodeValue(this.m_tags.getOrganizerTextLogo());
        
    } // getOrganizerTextLogo	

    // Returns the organizer text logo width
    getOrganizerTextLogoWidth()
    {
        return this.getLayoutNodeValue(this.m_tags.getOrganizerTextLogoWidth());
        
    } // getOrganizerTextLogoWidth	

    // Returns the organizer text logo height
    getOrganizerTextLogoHeight()
    {
        return this.getLayoutNodeValue(this.m_tags.getOrganizerTextLogoHeight());
        
    } // getOrganizerTextLogoHeight	

    // Returns the organizer logo
    getOrganizerLogo()
    {
        return this.getLayoutNodeValue(this.m_tags.getOrganizerLogo());
        
    } // getOrganizerLogo

    // Returns the organizer logo width
    getOrganizerLogoWidth()
    {
        return this.getLayoutNodeValue(this.m_tags.getOrganizerLogoWidth());
        
    } // getOrganizerLogoWidth			

    // Returns the organizer logo height
    getOrganizerLogoHeight()
    {
        return this.getLayoutNodeValue(this.m_tags.getOrganizerLogoHeight());
        
    } // getOrganizerLogoHeight	
    
    // Returns the sponors image
    getSponsorsImage()
    {
        return this.getLayoutNodeValue(this.m_tags.getSponsorsImage());
        
    } // getSponsorsImage

    // Returns the sponors image width
    getSponsorsImageWidth()
    {
        return this.getLayoutNodeValue(this.m_tags.getSponsorsImageWidth());
        
    } // getSponsorsImageWidth

    // Returns the sponors image height
    getSponsorsImageHeight()
    {
        return this.getLayoutNodeValue(this.m_tags.getSponsorsImageHeight());
        
    } // getSponsorsImageHeight

    // Returns the table color
    getTableColor()
    {
        return this.getLayoutNodeValue(this.m_tags.getTableColor());
        
    } // getTableColor    

    // Returns the table stroke color
    getTableStrokeColor()
    {
        return this.getLayoutNodeValue(this.m_tags.getTableStrokeColor());
        
    } // getTableStrokeColor    

    // Returns the table stroke width
    getTableStrokeWidth()
    {
        return this.getLayoutNodeValue(this.m_tags.getTableStrokeWidth());
        
    } // getTableStrokeWidth

    // Returns the table text relative X percentage
    getTableTextRelXProcent()
    {
        return this.getLayoutNodeValue(this.m_tags.getTableTextRelXProcent());
        
    } // getTableTextRelXProcent

    // Returns the table text relative Y percentage
    getTableTextRelYProcent()
    {
        return this.getLayoutNodeValue(this.m_tags.getTableTextRelYProcent());
        
    } // getTableTextRelYProcent

    // Returns the table text color
    getTableTextColor()
    {
        return this.getLayoutNodeValue(this.m_tags.getTableTextColor());
        
    } // getTableTextColor

    // Returns the stage upper left X value
    getStageUpperLeftX()
    {
        return this.getLayoutNodeValue(this.m_tags.getStageUpperLeftX());
        
    } // getStageUpperLeftX

    // Returns the stage upper left Y value
    getStageUpperLeftY()
    {
        return this.getLayoutNodeValue(this.m_tags.getStageUpperLeftY());
        
    } // getStageUpperLeftY

    // Returns the stage width
    getStageWidth()
    {
        return this.getLayoutNodeValue(this.m_tags.getStageWidth());
        
    } // getStageWidth

    // Returns the stage height
    getStageHeight()
    {
        return this.getLayoutNodeValue(this.m_tags.getStageHeight());
        
    } // getStageHeight

    // Returns the stage text
    getStageText()
    {
        return this.getLayoutNodeValue(this.m_tags.getStageText());
        
    } // getStageText

    // Returns the stage color
    getStageColor()
    {
        return this.getLayoutNodeValue(this.m_tags.getStageColor());
        
    } // getStageColor

    // Returns the stage stroke color
    getStageStrokeColor()
    {
        return this.getLayoutNodeValue(this.m_tags.getStageStrokeColor());
        
    } // getStageStrokeColor

    // Returns the stage stroke width
    getStageStrokeWidth()
    {
        return this.getLayoutNodeValue(this.m_tags.getStageStrokeWidth());
        
    } // getStageStrokeWidth

    // Returns the stage text relative X percentage
    getStageTextRelXProcent()
    {
        return this.getLayoutNodeValue(this.m_tags.getStageTextRelXProcent());
        
    } // getStageTextRelXProcent

    // Returns the stage text relative Y percentage
    getStageTextRelYProcent()
    {
        return this.getLayoutNodeValue(this.m_tags.getStageTextRelYProcent());
        
    } // getStageTextRelYProcent

    // Returns the stage text color
    getStageTextColor()
    {
        return this.getLayoutNodeValue(this.m_tags.getStageTextColor());
        
    } // getStageTextColor

    // Returns the stage image
    getStageImage()
    {
        return this.getLayoutNodeValue(this.m_tags.getStageImage());
        
    } // getStageImage

    // Returns the stage image width
    getStageImageWidth()
    {
        return this.getLayoutNodeValue(this.m_tags.getStageImageWidth());
        
    } // getStageImageWidth

    // Returns the stage image height
    getStageImageHeight()
    {
        return this.getLayoutNodeValue(this.m_tags.getStageImageHeight());
        
    } // getStageImageHeight

    // Returns the cashier upper left X value
    getCashUpperLeftX()
    {
        return this.getLayoutNodeValue(this.m_tags.getCashUpperLeftX());
        
    } // getCashUpperLeftX

    // Returns the cashier upper left Y value
    getCashUpperLeftY()
    {
        return this.getLayoutNodeValue(this.m_tags.getCashUpperLeftY());
        
    } // getCashUpperLeftY

    // Returns the cashier image
    getCashImage()
    {
        return this.getLayoutNodeValue(this.m_tags.getCashImage());
        
    } // getCashImage

    // Returns the cashier image width
    getCashImageWidth()
    {
        return this.getLayoutNodeValue(this.m_tags.getCashImageWidth());
        
    } // getCashImageWidth

    // Returns the cashier image height
    getCashImageHeight()
    {
        return this.getLayoutNodeValue(this.m_tags.getCashImageHeight());
        
    } // getCashImageHeight

    // Returns the text image select seats
    getTextImageSelectSeats()
    {
        return this.getLayoutNodeValue(this.m_tags.getTextImageSelectSeats());
        
    } // getTextImageSelectSeats

    // Returns the text image reserve seats
    getTextImageReserveSeats()
    {
        return this.getLayoutNodeValue(this.m_tags.getTextImageReserveSeats());
        
    } // getTextImageReserveSeats

    // Returns the text image reserve select undefined
    getTextImageReserveSelectUndef()
    {
        return this.getLayoutNodeValue(this.m_tags.getTextImageReserveSelectUndef());
        
    } // getTextImageReserveSelectUndef

    // Returns the text image add reservation
    getTextImageAddReservation()
    {
        return this.getLayoutNodeValue(this.m_tags.getTextImageAddReservation());
        
    } // getTextImageAddReservation

    // Returns the text image delete off
    getTextImageDeleteOff()
    {
        return this.getLayoutNodeValue(this.m_tags.getTextImageDeleteOff());
        
    } // getTextImageDeleteOff

    // Returns the text image delete on
    getTextImageDeleteOn()
    {
        return this.getLayoutNodeValue(this.m_tags.getTextImageDeleteOn());
        
    } // getTextImageDeleteOn

    // Returns the text image reservation list
    getTextImageReservationList()
    {
        return this.getLayoutNodeValue(this.m_tags.getTextImageReservationList());
        
    } // getTextImageReservationList

    // Returns the text image reservation print
    getTextImageReservationPrint()
    {
        return this.getLayoutNodeValue(this.m_tags.getTextImageReservationPrint());
        
    } // getTextImageReservationPrint

    // Returns the text image save reservation
    getTextImageSaveReservation()
    {
        return this.getLayoutNodeValue(this.m_tags.getTextImageSaveReservation());
        
    } // getTextImageSaveReservation

    // Returns the text image save reservation white
    getTextImageSaveReservationWhite()
    {
        return this.getLayoutNodeValue(this.m_tags.getTextImageSaveReservationWhite());
        
    } // getTextImageSaveReservationWhite

    ///////////////////////////////////////////////////////////////////////////
    /////// End Get Layout Functions ///////((/(///////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    /////// Start Set Layout Functions ////////(///////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Sets the premises name
    setPremisesName(i_premises_name)
    {
        this.setLayoutNodeValue(this.m_tags.getPremisesName(), i_premises_name);
        
    } // setPremisesName

    // Sets the premises width
    setPremisesWidth(i_premises_width)
    {
        this.setLayoutNodeValue(this.m_tags.getPremisesWidth(), i_premises_width);
        
    } // setPremisesWidth

    // Sets the premises height
    setPremisesHeight(i_premises_height)
    {
        this.setLayoutNodeValue(this.m_tags.getPremisesHeight(), i_premises_height);
        
    } // setPremisesHeight

    // Sets the wall thickness in mm
    setWallThickness(i_wall_thickness)
    {
        this.setLayoutNodeValue(this.m_tags.getWallThickness(), i_wall_thickness);
        
    } // setWallThickness

    // Sets the max  width in pixel. Used to scale from millimeter to pixel
    setMaxWidhtPixel(i_max_width_pixel)
    {
        this.setLayoutNodeValue(this.m_tags.getMaxWidhtPixel(), i_max_width_pixel);
        
    } // setMaxWidhtPixel	

    // Sets the allowed (max) reservation percentage
    setMaxReservationsProcent(i_max_reservation_percentage)
    {
        this.setLayoutNodeValue(this.m_tags.getMaxReservationsProcent(), i_max_reservation_percentage);
        
    } // setMaxReservationsProcent

    // Sets the name of the organizer
    setOrganizerName(i_organizer_name)
    {
        this.setLayoutNodeValue(this.m_tags.getOrganizerName(), i_organizer_name);
        
    } // setOrganizerName	

    // Sets the organizer text logo
    setOrganizerTextLogo(i_organizer_text_logo)
    {
        this.setLayoutNodeValue(this.m_tags.getOrganizerTextLogo(), i_organizer_text_logo);
        
    } // setOrganizerTextLogo	

    // Sets the organizer text logo width
    setOrganizerTextLogoWidth(i_organizer_logo_width)
    {
        this.setLayoutNodeValue(this.m_tags.getOrganizerTextLogoWidth(), i_organizer_logo_width);
        
    } // setOrganizerTextLogoWidth	

    // Sets tthe organizer text logo height
    setOrganizerTextLogoHeight(i_organizer_logo_height)
    {
        this.setLayoutNodeValue(this.m_tags.getOrganizerTextLogoHeight(), i_organizer_logo_height);
        
    } // setOrganizerTextLogoHeight	

    // Sets the organizer logo
    setOrganizerLogo(i_organizer_logo)
    {
        this.setLayoutNodeValue(this.m_tags.getOrganizerLogo(), i_organizer_logo);
        
    } // setOrganizerLogo

    // Sets the organizer logo width
    setOrganizerLogoWidth(i_organizer_logo_width)
    {
        this.setLayoutNodeValue(this.m_tags.getOrganizerLogoWidth(), i_organizer_logo_width);
        
    } // setOrganizerLogoWidth

    // Sets the organizer logo height
    setOrganizerLogoHeight(i_organizer_logo_height)
    {
        this.setLayoutNodeValue(this.m_tags.getOrganizerLogoHeight(), i_organizer_logo_height);
        
    } // setOrganizerLogoHeight

    // Sets the sponors image
    setSponsorsImage(i_sponsors_image)
    {
        this.setLayoutNodeValue(this.m_tags.getSponsorsImage(), i_sponsors_image);
        
    } // setSponsorsImage	

    // Sets the sponors image width
    setSponsorsImageWidth(i_sponsors_image_width)
    {
        this.setLayoutNodeValue(this.m_tags.getSponsorsImageWidth(), i_sponsors_image_width);
        
    } // setSponsorsImageWidth	

    // Sets the sponors image height
    setSponsorsImageHeight(i_sponsors_image_height)
    {
        this.setLayoutNodeValue(this.m_tags.getSponsorsImageHeight(), i_sponsors_image_height);
        
    } // setSponsorsImageHeight	

    // Sets the table color
    setTableColor(i_table_color)
    {
        this.setLayoutNodeValue(this.m_tags.getTableColor(), i_table_color);
        
    } // setTableColor    

    // Sets the table stroke color
    setTableStrokeColor(i_table_stroke_color)
    {
        this.setLayoutNodeValue(this.m_tags.getTableStrokeColor(), i_table_stroke_color);
        
    } // setTableStrokeColor    

    // Sets the table stroke width
    setTableStrokeWidth(i_table_stroke_width)
    {
        this.setLayoutNodeValue(this.m_tags.getTableStrokeWidth(), i_table_stroke_width);
        
    } // setTableStrokeWidth

    // Sets the table text relative X percentage
    setTableTextRelXProcent(i_table_text_rel_x)
    {
        this.setLayoutNodeValue(this.m_tags.getTableTextRelXProcent(), i_table_text_rel_x);
        
    } // setTableTextRelXProcent

    // Sets the table text relative Y percentage
    setTableTextRelYProcent(i_table_text_rel_y)
    {
        this.setLayoutNodeValue(this.m_tags.getTableTextRelYProcent(), i_table_text_rel_y);
        
    } // setTableTextRelYProcent

    // Sets the table text color
    setTableTextColor(i_table_text_color)
    {
        this.setLayoutNodeValue(this.m_tags.getTableTextColor(), i_table_text_color);
        
    } // setTableTextColor

    // Sets the stage upper left X value
    setStageUpperLeftX(i_stage_upper_left_x)
    {
        this.setLayoutNodeValue(this.m_tags.getStageUpperLeftX(), i_stage_upper_left_x);
        
    } // setStageUpperLeftX

    // Sets the stage upper left Y value
    setStageUpperLeftY(i_stage_upper_left_y)
    {
        this.setLayoutNodeValue(this.m_tags.getStageUpperLeftY(), i_stage_upper_left_y);
        
    } // setStageUpperLeftY

    // Sets the stage width
    setStageWidth(i_stage_width)
    {
        this.setLayoutNodeValue(this.m_tags.getStageWidth(), i_stage_width);
        
    } // setStageWidth

    // Sets the stage height
    setStageHeight(i_stage_height)
    {
        this.setLayoutNodeValue(this.m_tags.getStageHeight(), i_stage_height);
        
    } // setStageHeight

    // Sets the stage height
    setStageText(i_stage_text)
    {
        this.setLayoutNodeValue(this.m_tags.getStageText(), i_stage_text);
        
    } // setStageText

    // Sets the stage color
    setStageColor(i_stage_color)
    {
        this.setLayoutNodeValue(this.m_tags.getStageColor(), i_stage_color);
        
    } // setStageColor

    // Sets the stage stroke color
    setStageStrokeColor(i_stage_stroke_color)
    {
        this.setLayoutNodeValue(this.m_tags.getStageStrokeColor(), i_stage_stroke_color);
        
    } // setStageStrokeColor

    // Sets the stage stroke width
    setStageStrokeWidth(i_stage_stroke_width)
    {
        this.setLayoutNodeValue(this.m_tags.getStageStrokeWidth(), i_stage_stroke_width);
        
    } // setStageStrokeWidth

    // Sets the stage text relative X percentage
    setStageTextRelXProcent(i_stage_text_rel_x)
    {
        this.setLayoutNodeValue(this.m_tags.getStageTextRelXProcent(), i_stage_text_rel_x);
        
    } // setStageTextRelXProcent

    // Sets the stage text relative Y percentage
    setStageTextRelYProcent(i_stage_text_rel_y)
    {
        this.setLayoutNodeValue(this.m_tags.getStageTextRelYProcent(), i_stage_text_rel_y);
        
    } // setStageTextRelYProcent

    // Sets the stage text color
    setStageTextColor(i_stage_text_color)
    {
        this.setLayoutNodeValue(this.m_tags.getStageTextColor(), i_stage_text_color);
        
    } // setStageTextColor

    // Sets the stage image
    setStageImage(i_stage_image)
    {
        this.setLayoutNodeValue(this.m_tags.getStageImage(), i_stage_image);
        
    } // setStageImage

    // Sets the stage image width
    setStageImageWidth(i_stage_image_width)
    {
        this.setLayoutNodeValue(this.m_tags.getStageImageWidth(), i_stage_image_width);
        
    } // setStageImageWidth

    // Sets the stage image height
    setStageImageHeight(i_stage_image_height)
    {
        this.setLayoutNodeValue(this.m_tags.getStageImageHeight(), i_stage_image_height);
        
    } // setStageImageHeight

    // Sets the cashier upper left X value
    setCashUpperLeftX(i_cashier_upper_left_x)
    {
        this.setLayoutNodeValue(this.m_tags.getCashUpperLeftX(), i_cashier_upper_left_x);
        
    } // setCashUpperLeftX

    // Sets the cashier upper left Y value
    setCashUpperLeftY(i_cashier_upper_left_y)
    {
        this.setLayoutNodeValue(this.m_tags.getCashUpperLeftY(), i_cashier_upper_left_y);
        
    } // setCashUpperLeftY

    // Sets the cashier image
    setCashImage(i_cashier_image)
    {
        this.setLayoutNodeValue(this.m_tags.getCashImage(), i_cashier_image);
        
    } // setCashImage

    // Sets the cashier image width
    setCashImageWidth(i_cashier_image_width)
    {
        this.setLayoutNodeValue(this.m_tags.getCashImageWidth(), i_cashier_image_width);
        
    } // setCashImageWidth

    // Sets the cashier image height
    setCashImageHeight(i_cashier_image_height)
    {
        this.setLayoutNodeValue(this.m_tags.getCashImageHeight(), i_cashier_image_height);
        
    } // setCashImageHeight

    // Sets the text image select seats
    setTextImageSelectSeats(i_text_image_select_seats)
    {
        this.setLayoutNodeValue(this.m_tags.getTextImageSelectSeats(), i_text_image_select_seats);
        
    } // setTextImageSelectSeats

    // Sets the text image reserve seats
    setTextImageReserveSeats(i_text_image_reserve_seats)
    {
        this.setLayoutNodeValue(this.m_tags.getTextImageReserveSeats(), i_text_image_reserve_seats);
        
    } // setTextImageReserveSeats

    // Sets the text image reserve select undefined
    setTextImageReserveSelectUndef(i_text_image_reserve_select_undefined)
    {
        this.setLayoutNodeValue(this.m_tags.getTextImageReserveSelectUndef(), i_text_image_reserve_select_undefined);
        
    } // setTextImageReserveSelectUndef

    // Sets the text image add reservation
    setTextImageAddReservation(i_text_image_add_reservation)
    {
        this.setLayoutNodeValue(this.m_tags.getTextImageAddReservation(), i_text_image_add_reservation);
        
    } // setTextImageAddReservation

    // Sets the text image delete off
    setTextImageDeleteOff(i_text_image_delete_off)
    {
        this.setLayoutNodeValue(this.m_tags.getTextImageDeleteOff(), i_text_image_delete_off);
        
    } // setTextImageDeleteOff

    // Sets the text image delete on
    setTextImageDeleteOn(i_text_image_delete_on)
    {
        this.setLayoutNodeValue(this.m_tags.getTextImageDeleteOn(), i_text_image_delete_on);
        
    } // setTextImageDeleteOn

    // Sets the text image reservation list
    setTextImageReservationList(i_text_image_reservation_list)
    {
        this.setLayoutNodeValue(this.m_tags.getTextImageReservationList(), i_text_image_reservation_list);
        
    } // setTextImageReservationList

    // Sets the text image reservation print
    setTextImageReservationPrint(i_text_image_reservation_print)
    {
        this.setLayoutNodeValue(this.m_tags.getTextImageReservationPrint(), i_text_image_reservation_print);
        
    } // setTextImageReservationPrint

    // Sets the text image save reservation
    setTextImageSaveReservation(i_text_image_save_reservation)
    {
        this.setLayoutNodeValue(this.m_tags.getTextImageSaveReservation(), i_text_image_save_reservation);
        
    } // setTextImageSaveReservation

    // Sets the text image save reservation white
    setTextImageSaveReservationWhite(i_text_image_save_reservation_white)
    {
        this.setLayoutNodeValue(this.m_tags.getTextImageSaveReservationWhite(), i_text_image_save_reservation_white);
        
    } // setTextImageSaveReservationWhite

    ///////////////////////////////////////////////////////////////////////////
    /////// End Set Layout Functions //////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////



    ///////////////////////////////////////////////////////////////////////////
    /////// Start Get Layout Button Functions /////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Returns the button identity for a given button number
    getButtonId(i_button_number)
    {
        return this.getButtonNodeValue(this.m_tags.getButtonId(), i_button_number);
        
    } // getButtonId

    // Returns the button title for a given button number
    getButtonTitle(i_button_number)
    {
        return this.getButtonNodeValue(this.m_tags.getButtonTitle(), i_button_number);
        
    } // getButtonTitle

    // Returns the button event function for a given button number
    getButtonEventFunction(i_button_number)
    {
        return this.getButtonNodeValue(this.m_tags.getButtonEventFunction(), i_button_number);
        
    } // getButtonEventFunction

    // Returns the button upper left X for a given button number
    getButtonUpperLeftX(i_button_number)
    {
        return this.getButtonNodeValue(this.m_tags.getButtonUpperLeftX(), i_button_number);
        
    } // getButtonUpperLeftX

    // Returns the button upper left Y for a given button number
    getButtonUpperLeftY(i_button_number)
    {
        return this.getButtonNodeValue(this.m_tags.getButtonUpperLeftY(), i_button_number);
        
    } // getButtonUpperLeftY

    // Sets the button upper left Y for a given button number
    setButtonUpperLeftY(i_button_number, i_button_upper_left_y)
    {
        this.setButtonNodeValue(this.m_tags.getButtonUpperLeftY(), i_button_number, i_button_upper_left_y);
        
    } // setButtonUpperLeftY

    // Returns the button width for a given button number
    getButtonWidth(i_button_number)
    {
        return this.getButtonNodeValue(this.m_tags.getButtonWidth(), i_button_number);
        
    } // getButtonWidth

    // Returns the button height for a given button number
    getButtonHeight(i_button_number)
    {
        return this.getButtonNodeValue(this.m_tags.getButtonHeight(), i_button_number);
        
    } // getButtonHeight

    // Returns the button image identity for a given button number
    getButtonImageId(i_button_number)
    {
        return this.getButtonNodeValue(this.m_tags.getButtonImageId(), i_button_number);
        
    } // getButtonImageId

    // Returns the button image event function for a given button number
    getButtonImageEventFunction(i_button_number)
    {
        return this.getButtonNodeValue(this.m_tags.getButtonImageEventFunction(), i_button_number);
        
    } // getButtonImageEventFunction

    // Returns the button image one for a given button number
    getButtonImageOne(i_button_number)
    {
        return this.getButtonNodeValue(this.m_tags.getButtonImageOne(), i_button_number);
        
    } // getButtonImageOne

    // Returns the button image two for a given button number
    getButtonImageTwo(i_button_number)
    {
        return this.getButtonNodeValue(this.m_tags.getButtonImageTwo(), i_button_number);
        
    } // getButtonImageTwo

    // Returns the button image three for a given button number
    getButtonImageThree(i_button_number)
    {
        return this.getButtonNodeValue(this.m_tags.getButtonImageThree(), i_button_number);
        
    } // getButtonImageThree

    // Returns the button image width for a given button number
    getButtonImageWidth(i_button_number)
    {
        return this.getButtonNodeValue(this.m_tags.getButtonImageWidth(), i_button_number);
        
    } // getButtonImageWidth

    // Returns the button image height for a given button number
    getButtonImageHeight(i_button_number)
    {
        return this.getButtonNodeValue(this.m_tags.getButtonImageHeight(), i_button_number);
        
    } // getButtonImageHeight

    // Returns the button type for a given button number
    getButtonType(i_button_number)
    {
        return this.getButtonNodeValue(this.m_tags.getButtonType(), i_button_number);
        
    } // getButtonType


    ///////////////////////////////////////////////////////////////////////////
    /////// End Get Layout Button Functions ///////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////


    ///////////////////////////////////////////////////////////////////////////
    /////// Start Set Layout Button Functions /////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Sets the button identity for a given button number
    setButtonId(i_button_number, i_button_id)
    {
        this.setButtonNodeValue(this.m_tags.getButtonId(), i_button_number, i_button_id);
        
    } // setButtonId

    // Sets the button title for a given button number
    setButtonTitle(i_button_number, i_button_title)
    {
        this.setButtonNodeValue(this.m_tags.getButtonTitle(), i_button_number, i_button_title);
        
    } // setButtonTitle

    // Sets the button event function for a given button number
    setButtonEventFunction(i_button_number, i_button_event_function)
    {
        this.setButtonNodeValue(this.m_tags.getButtonEventFunction(), i_button_number, i_button_event_function);
        
    } // setButtonEventFunction

    // Sets the button upper left X for a given button number
    setButtonUpperLeftX(i_button_number, i_button_upper_left_x)
    {
        this.setButtonNodeValue(this.m_tags.getButtonUpperLeftX(), i_button_number, i_button_upper_left_x);
        
    } // setButtonUpperLeftX
	
    // Sets the button upper left Y for a given button number
    setButtonUpperLeftY(i_button_number, i_button_upper_left_y)
    {
        this.setButtonNodeValue(this.m_tags.getButtonUpperLeftY(), i_button_number, i_button_upper_left_y);
        
    } // setButtonUpperLeftY

    // Sets the button width for a given button number
    setButtonWidth(i_button_number, i_button_width)
    {
        this.setButtonNodeValue(this.m_tags.getButtonWidth(), i_button_number, i_button_width);
        
    } // setButtonWidth

    // Sets the button height for a given button number
    setButtonHeight(i_button_number, i_button_height)
    {
        this.setButtonNodeValue(this.m_tags.getButtonHeight(), i_button_number, i_button_height);
        
    } // setButtonHeight

    // Sets the button image identity for a given button number
    setButtonImageId(i_button_number, i_button_image_id)
    {
        this.setButtonNodeValue(this.m_tags.getButtonImageId(), i_button_number, i_button_image_id);
        
    } // setButtonImageId

    // Sets the button image event function for a given button number
    setButtonImageEventFunction(i_button_number, i_button_image_event_function)
    {
        this.setButtonNodeValue(this.m_tags.getButtonImageEventFunction(), i_button_number, i_button_image_event_function);
        
    } // setButtonImageEventFunction

    // Sets the button image one for a given button number
    setButtonImageOne(i_button_number, i_button_image_one)
    {
        this.setButtonNodeValue(this.m_tags.getButtonImageOne(), i_button_number, i_button_image_one);
        
    } // setButtonImageOne

    // Sets the button image two for a given button number
    setButtonImageTwo(i_button_number, i_button_image_two)
    {
        this.setButtonNodeValue(this.m_tags.getButtonImageTwo(), i_button_number, i_button_image_two);
        
    } // setButtonImageTwo

    // Sets the button image three for a given button number
    setButtonImageThree(i_button_number, i_button_image_three)
    {
        this.setButtonNodeValue(this.m_tags.getButtonImageThree(), i_button_number, i_button_image_three);
        
    } // setButtonImageThree

    // Sets the button image width for a given button number
    setButtonImageWidth(i_button_number, i_button_image_width)
    {
        this.setButtonNodeValue(this.m_tags.getButtonImageWidth(), i_button_number, i_button_image_width);
        
    } // setButtonImageWidth

    // Sets the button image height for a given button number
    setButtonImageHeight(i_button_number, i_button_image_height)
    {
        this.setButtonNodeValue(this.m_tags.getButtonImageHeight(), i_button_number, i_button_image_height);
        
    } // setButtonImageHeight

    // Sets the button type for a given button number
    setButtonType(i_button_number, i_button_type)
    {
        this.setButtonNodeValue(this.m_tags.getButtonType(), i_button_number, i_button_type);
        
    } // setButtonType

    ///////////////////////////////////////////////////////////////////////////
    /////// End Set Layout Button Functions ///////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////


    ///////////////////////////////////////////////////////////////////////////
    /////// Start Get Door Functions //////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Returns the  door type for a given door number
    getDoorType(i_door_number)
    {
        return this.getDoorNodeValue(this.m_tags.getDoorType(), i_door_number);
        
    } // getDoorType

    // Returns the  door position for a given door number
    getDoorPosition(i_door_number)
    {
        return this.getDoorNodeValue(this.m_tags.getDoorPosition(), i_door_number);
        
    } // getDoorPosition

    // Returns the  door height for a given door number
    getDoorHeight(i_door_number)
    {
        return this.getDoorNodeValue(this.m_tags.getDoorHeight(), i_door_number);
        
    } // getDoorHeight

    // Returns the  door text for a given door number
    getDoorText(i_door_number)
    {
        return this.getDoorNodeValue(this.m_tags.getDoorText(), i_door_number);
        
    } // getDoorText

    // Returns the  door image for a given door number
    getDoorImage(i_door_number)
    {
        return this.getDoorNodeValue(this.m_tags.getDoorImage(), i_door_number);
        
    } // getDoorImage

    // Returns the  door image width for a given door number
    getDoorImageWidth(i_door_number)
    {
        return this.getDoorNodeValue(this.m_tags.getDoorImageWidth(), i_door_number);
        
    } // getDoorImageWidth

    // Returns the  door image width for a given door number
    getDoorImageHeight(i_door_number)
    {
        return this.getDoorNodeValue(this.m_tags.getDoorImageHeight(), i_door_number);
        
    } // getDoorImageHeight

    ///////////////////////////////////////////////////////////////////////////
    /////// End Get Door Functions ////////////(///////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    /////// Start Set Door Functions //////////(///////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Sets the  door type for a given door number
    setDoorType(i_door_number, i_door_type)
    {
        this.setDoorNodeValue(this.m_tags.getDoorType(), i_door_number, i_door_type);
        
    } // setDoorType

    // Sets the  door position for a given door number
    setDoorPosition(i_door_number, i_door_position)
    {
        this.setDoorNodeValue(this.m_tags.getDoorPosition(), i_door_number, i_door_position);
        
    } // setDoorPosition

    // Sets the  door height for a given door number
    setDoorHeight(i_door_number, i_door_height)
    {
        this.setDoorNodeValue(this.m_tags.getDoorHeight(), i_door_number, i_door_height);
        
    } // setDoorHeight

    // Sets the  door text for a given door number
    setDoorText(i_door_number, i_door_text)
    {
        this.setDoorNodeValue(this.m_tags.getDoorText(), i_door_number, i_door_text);
        
    } // setDoorText

    // Sets the  door image for a given door number
    setDoorImage(i_door_number, i_door_image)
    {
        this.setDoorNodeValue(this.m_tags.getDoorImage(), i_door_number, i_door_image);
        
    } // setDoorImage

    // Sets the  door image width for a given door number
    setDoorImageWidth(i_door_number, i_door_image_width)
    {
        this.setDoorNodeValue(this.m_tags.getDoorImageWidth(), i_door_number, i_door_image_width);
        
    } // setDoorImageWidth

    // Sets the  door image height for a given door number
    setDoorImageHeight(i_door_number, i_door_image_height)
    {
        this.setDoorNodeValue(this.m_tags.getDoorImageHeight(), i_door_number, i_door_image_height);
        
    } // setDoorImageHeight

    ///////////////////////////////////////////////////////////////////////////
    /////// End Set Door Functions ////////////(///////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    /////// Start Get Table Functions /////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////
    
    // Returns the table number for a given table number
    getTableNumber(i_table_number)
    {
        return this.getTableNodeValue(this.m_tags.getTableNumber(), i_table_number);
        
    } // getTableNumber

    // Returns the table upper left X coordinate for a given table number
    getTableUpperLeftX(i_table_number)
    {
        return this.getTableNodeValue(this.m_tags.getTableUpperLeftX(), i_table_number);
        
    } // getTableUpperLeftX

    // Returns the table upper left Y coordinate for a given table number
    getTableUpperLeftY(i_table_number)
    {
        return this.getTableNodeValue(this.m_tags.getTableUpperLeftY(), i_table_number);
        
    } // getTableUpperLeftY

    // Returns the table width for a given table number
    getTableWidth(i_table_number)
    {
        return this.getTableNodeValue(this.m_tags.getTableWidth(), i_table_number);
        
    } // getTableWidth

    // Returns the table height for a given table number
    getTableHeight(i_table_number)
    {
        return this.getTableNodeValue(this.m_tags.getTableHeight(), i_table_number);
        
    } // getTableHeight

    // Returns the table number of left and right seats for a given table number
    getTableNumberLeftRightSeats(i_table_number)
    {
        return this.getTableNodeValue(this.m_tags.getTableNumberLeftRightSeats(), i_table_number);
        
    } // getTableNumberLeftRightSeats

    // Returns the table seat left one for a given table number
    getTableSeatOneLeft(i_table_number)
    {
        return this.getTableNodeValue(this.m_tags.getTableSeatOneLeft(), i_table_number);
        
    } // getTableSeatOneLeft

    // Returns the table seat left two for a given table number
    getTableSeatTwoLeft(i_table_number)
    {
        return this.getTableNodeValue(this.m_tags.getTableSeatTwoLeft(), i_table_number);
        
    } // getTableSeatTwoLeft

    // Returns the table seat left three for a given table number
    getTableSeatThreeLeft(i_table_number)
    {
        return this.getTableNodeValue(this.m_tags.getTableSeatThreeLeft(), i_table_number);
        
    } // getTableSeatThreeLeft

    // Returns the table seat left four for a given table number
    getTableSeatFourLeft(i_table_number)
    {
        return this.getTableNodeValue(this.m_tags.getTableSeatFourLeft(), i_table_number);
        
    } // getTableSeatFourLeft

    // Returns the table seat left five for a given table number
    getTableSeatFiveLeft(i_table_number)
    {
        return this.getTableNodeValue(this.m_tags.getTableSeatFiveLeft(), i_table_number);
        
    } // getTableSeatFiveLeft

    // Returns the table seat left six for a given table number
    getTableSeatSixLeft(i_table_number)
    {
        return this.getTableNodeValue(this.m_tags.getTableSeatSixLeft(), i_table_number);
        
    } // getTableSeatSixLeft

    // Returns the table seat left seven for a given table number
    getTableSeatSevenLeft(i_table_number)
    {
        return this.getTableNodeValue(this.m_tags.getTableSeatSevenLeft(), i_table_number);
        
    } // getTableSeatSevenLeft

    // Returns the table seat left eight for a given table number
    getTableSeatEightLeft(i_table_number)
    {
        return this.getTableNodeValue(this.m_tags.getTableSeatEightLeft(), i_table_number);
        
    } // getTableSeatEightLeft

    // Returns the table seat left nine for a given table number
    getTableSeatNineLeft(i_table_number)
    {
        return this.getTableNodeValue(this.m_tags.getTableSeatNineLeft(), i_table_number);
        
    } // getTableSeatNineLeft

    // Returns the table seat left ten for a given table number
    getTableSeatTenLeft(i_table_number)
    {
        return this.getTableNodeValue(this.m_tags.getTableSeatTenLeft(), i_table_number);
        
    } // getTableSeatTenLeft

    // Returns the table seat left eleven for a given table number
    getTableSeatElevenLeft(i_table_number)
    {
        return this.getTableNodeValue(this.m_tags.getTableSeatElevenLeft(), i_table_number);
        
    } // getTableSeatElevenLeft

    // Returns the table seat left twelve for a given table number
    getTableSeatTwelveLeft(i_table_number)
    {
        return this.getTableNodeValue(this.m_tags.getTableSeatTwelveLeft(), i_table_number);
        
    } // getTableSeatTwelveLeft

    // Returns the table seat left thirteen for a given table number
    getTableSeatThirteenLeft(i_table_number)
    {
        return this.getTableNodeValue(this.m_tags.getTableSeatThirteenLeft(), i_table_number);
        
    } // getTableSeatThirteenLeft

    // Returns the table seat left fourteen for a given table number
    getTableSeatFourteenLeft(i_table_number)
    {
        return this.getTableNodeValue(this.m_tags.getTableSeatFourteenLeft(), i_table_number);
        
    } // getTableSeatFourteenLeft

    // Returns the table seat left fifteen for a given table number
    getTableSeatSeatFifteenLeft(i_table_number)
    {
        return this.getTableNodeValue(this.m_tags.getTableSeatSeatFifteenLeft(), i_table_number);
        
    } // getTableSeatSeatFifteenLeft

    // Returns the table seat left sixteen for a given table number
    getTableSeatSixteenLeft(i_table_number)
    {
        return this.getTableNodeValue(this.m_tags.getTableSeatSixteenLeft(), i_table_number);
        
    } // getTableSeatSixteenLeft

    // Returns the table seat left nineteen for a given table number
    getTableSeatNineteenLeft(i_table_number)
    {
        return this.getTableNodeValue(this.m_tags.getTableSeatNineteenLeft(), i_table_number);
        
    } // getTableSeatNineteenLeft

    // Returns the table seat left twenty for a given table number
    getTableSeatTwentyLeft(i_table_number)
    {
        return this.getTableNodeValue(this.m_tags.getTableSeatTwentyLeft(), i_table_number);
        
    } // getTableSeatTwentyLeft


    // Returns the table seat right one for a given table number
    getTableSeatOneRight(i_table_number)
    {
        return this.getTableNodeValue(this.m_tags.getTableSeatOneRight(), i_table_number);
        
    } // getTableSeatOneRight

    // Returns the table seat right two for a given table number
    getTableSeatTwoRight(i_table_number)
    {
        return this.getTableNodeValue(this.m_tags.getTableSeatTwoRight(), i_table_number);
        
    } // getTableSeatTwoRight

    // Returns the table seat right three for a given table number
    getTableSeatThreeRight(i_table_number)
    {
        return this.getTableNodeValue(this.m_tags.getTableSeatThreeRight(), i_table_number);
        
    } // getTableSeatThreeRight

    // Returns the table seat right four for a given table number
    getTableSeatFourRight(i_table_number)
    {
        return this.getTableNodeValue(this.m_tags.getTableSeatFourRight(), i_table_number);
        
    } // getTableSeatFourRight

    // Returns the table seat right five for a given table number
    getTableSeatFiveRight(i_table_number)
    {
        return this.getTableNodeValue(this.m_tags.getTableSeatFiveRight(), i_table_number);
        
    } // getTableSeatFiveRight

    // Returns the table seat right six for a given table number
    getTableSeatSixRight(i_table_number)
    {
        return this.getTableNodeValue(this.m_tags.getTableSeatSixRight(), i_table_number);
        
    } // getTableSeatSixRight

    // Returns the table seat right seven for a given table number
    getTableSeatSevenRight(i_table_number)
    {
        return this.getTableNodeValue(this.m_tags.getTableSeatSevenRight(), i_table_number);
        
    } // getTableSeatSevenRight

    // Returns the table seat right eight for a given table number
    getTableSeatEightRight(i_table_number)
    {
        return this.getTableNodeValue(this.m_tags.getTableSeatEightRight(), i_table_number);
        
    } // getTableSeatEightRight

    // Returns the table seat right nine for a given table number
    getTableSeatNineRight(i_table_number)
    {
        return this.getTableNodeValue(this.m_tags.getTableSeatNineRight(), i_table_number);
        
    } // getTableSeatNineRight

    // Returns the table seat right ten for a given table number
    getTableSeatTenRight(i_table_number)
    {
        return this.getTableNodeValue(this.m_tags.getTableSeatTenRight(), i_table_number);
        
    } // getTableSeatTenRight

    // Returns the table seat right eleven for a given table number
    getTableSeatElevenRight(i_table_number)
    {
        return this.getTableNodeValue(this.m_tags.getTableSeatElevenRight(), i_table_number);
        
    } // getTableSeatElevenRight

    // Returns the table seat right twelve for a given table number
    getTableSeatTwelveRight(i_table_number)
    {
        return this.getTableNodeValue(this.m_tags.getTableSeatTwelveRight(), i_table_number);
        
    } // getTableSeatTwelveRight

    // Returns the table seat right thirteen for a given table number
    getTableSeatThirteenRight(i_table_number)
    {
        return this.getTableNodeValue(this.m_tags.getTableSeatThirteenRight(), i_table_number);
        
    } // getTableSeatThirteenRight

    // Returns the table seat right fourteen for a given table number
    getTableSeatFourteenRight(i_table_number)
    {
        return this.getTableNodeValue(this.m_tags.getTableSeatFourteenRight(), i_table_number);
        
    } // getTableSeatFourteenRight

    // Returns the table seat right fifteen for a given table number
    getTableSeatSeatFifteenRight(i_table_number)
    {
        return this.getTableNodeValue(this.m_tags.getTableSeatSeatFifteenRight(), i_table_number);
        
    } // getTableSeatSeatFifteenRight

    // Returns the table seat right sixteen for a given table number
    getTableSeatSixteenRight(i_table_number)
    {
        return this.getTableNodeValue(this.m_tags.getTableSeatSixteenRight(), i_table_number);
        
    } // getTableSeatSixteenRight

    // Returns the table seat right nineteen for a given table number
    getTableSeatNineteenRight(i_table_number)
    {
        return this.getTableNodeValue(this.m_tags.getTableSeatNineteenRight(), i_table_number);
        
    } // getTableSeatNineteenRight

    // Returns the table seat right twenty for a given table number
    getTableSeatTwentyRight(i_table_number)
    {
        return this.getTableNodeValue(this.m_tags.getTableSeatTwentyRight(), i_table_number);
        
    } // getTableSeatTwentyRight

    // Returns the table seat upper for a given table number
    getTableSeatUpper(i_table_number)
    {
        return this.getTableNodeValue(this.m_tags.getTableSeatUpper(), i_table_number);
        
    } // getTableSeatUpper

    // Returns the table seat lower for a given table number
    getTableSeatLower(i_table_number)
    {
        return this.getTableNodeValue(this.m_tags.getTableSeatLower(), i_table_number);
        
    } // getTableSeatLower

    // Returns the table text for a given table number
    getTableText(i_table_number)
    {
        return this.getTableNodeValue(this.m_tags.getTableText(), i_table_number);
        
    } // getTableText

    ///////////////////////////////////////////////////////////////////////////
    /////// End Get Table Functions ///////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    /////// Start Set Table Functions /////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

	// Sets the table number for a given table number
    setTableNumber(i_table_number, i_table_number_int)
    {
        this.setTableNodeValue(this.m_tags.getTableNumber(), i_table_number, i_table_number_int);
        
    } // setTableNumber

	// Sets the table upper left X coordinate for a given table number
    setTableUpperLeftX(i_table_number, i_table_x)
    {
        this.setTableNodeValue(this.m_tags.getTableUpperLeftX(), i_table_number, i_table_x);
        
    } // setTableUpperLeftX

	// Sets the table upper left Y coordinate for a given table number
    setTableUpperLeftY(i_table_number, i_table_y)
    {
        this.setTableNodeValue(this.m_tags.getTableUpperLeftY(), i_table_number, i_table_y);
        
    } // setTableUpperLeftY

	// Sets the table width for a given table number
    setTableWidth(i_table_number, i_table_width)
    {
        this.setTableNodeValue(this.m_tags.getTableWidth(), i_table_number, i_table_width);
        
    } // setTableWidth

	// Sets the table height for a given table number
    setTableHeight(i_table_number, i_table_height)
    {
        this.setTableNodeValue(this.m_tags.getTableHeight(), i_table_number, i_table_height);
        
    } // setTableHeight

	// Sets the table number of left and right seats for a given table number
    setTableNumberLeftRightSeats(i_table_number, i_table_number_seats)
    {
        this.setTableNodeValue(this.m_tags.getTableNumberLeftRightSeats(), i_table_number, i_table_number_seats);
        
    } // setTableNumberLeftRightSeats

	// Sets the table  table seat left one for a given table number
    setTableSeatOneLeft(i_table_number, i_table_left_one)
    {
        this.setTableNodeValue(this.m_tags.getTableSeatOneLeft(), i_table_number, i_table_left_one);
        
    } // setTableSeatOneLeft

	// Sets the table  table seat left two for a given table number
    setTableSeatTwoLeft(i_table_number, i_table_left_two)
    {
        this.setTableNodeValue(this.m_tags.getTableSeatTwoLeft(), i_table_number, i_table_left_two);
        
    } // setTableSeatTwoLeft

	// Sets the table  table seat left three for a given table number
    setTableSeatThreeLeft(i_table_number, i_table_left_three)
    {
        this.setTableNodeValue(this.m_tags.getTableSeatThreeLeft(), i_table_number, i_table_left_three);
        
    } // setTableSeatThreeLeft

	// Sets the table  table seat left four for a given table number
    setTableSeatFourLeft(i_table_number, i_table_left_four)
    {
        this.setTableNodeValue(this.m_tags.getTableSeatFourLeft(), i_table_number, i_table_left_four);
        
    } // setTableSeatFourLeft

	// Sets the table  table seat left five for a given table number
    setTableSeatFiveLeft(i_table_number, i_table_left_five)
    {
        this.setTableNodeValue(this.m_tags.getTableSeatFiveLeft(), i_table_number, i_table_left_five);
        
    } // setTableSeatFiveLeft

	// Sets the table  table seat left six for a given table number
    setTableSeatSixLeft(i_table_number, i_table_left_six)
    {
        this.setTableNodeValue(this.m_tags.getTableSeatSixLeft(), i_table_number, i_table_left_six);
        
    } // setTableSeatSixLeft

	// Sets the table  table seat left seven for a given table number
    setTableSeatSevenLeft(i_table_number, i_table_left_seven)
    {
        this.setTableNodeValue(this.m_tags.getTableSeatSevenLeft(), i_table_number, i_table_left_seven);
        
    } // setTableSeatSevenLeft

	// Sets the table  table seat left eight for a given table number
    setTableSeatEightLeft(i_table_number, i_table_left_eight)
    {
        this.setTableNodeValue(this.m_tags.getTableSeatEightLeft(), i_table_number, i_table_left_eight);
        
    } // setTableSeatEightLeft

	// Sets the table  table seat left nine for a given table number
    setTableSeatNineLeft(i_table_number, i_table_left_nine)
    {
        this.setTableNodeValue(this.m_tags.getTableSeatNineLeft(), i_table_number, i_table_left_nine);
        
    } // setTableSeatNineLeft

	// Sets the table  table seat left ten for a given table number
    setTableSeatTenLeft(i_table_number, i_table_left_ten)
    {
        this.setTableNodeValue(this.m_tags.getTableSeatTenLeft(), i_table_number, i_table_left_ten);
        
    } // setTableSeatTenLeft

	// Sets the table  table seat left eleven for a given table number
    setTableSeatElevenLeft(i_table_number, i_table_left_eleven)
    {
        this.setTableNodeValue(this.m_tags.getTableSeatElevenLeft(), i_table_number, i_table_left_eleven);
        
    } // setTableSeatElevenLeft

	// Sets the table  table seat left twelve for a given table number
    setTableSeatTwelveLeft(i_table_number, i_table_left_twelve)
    {
        this.setTableNodeValue(this.m_tags.getTableSeatTwelveLeft(), i_table_number, i_table_left_twelve);
        
    } // setTableSeatTwelveLeft

	// Sets the table  table seat left thirteen for a given table number
    setTableSeatThirteenLeft(i_table_number, i_table_left_thirteen)
    {
        this.setTableNodeValue(this.m_tags.getTableSeatThirteenLeft(), i_table_number, i_table_left_thirteen);
        
    } // setTableSeatThirteenLeft

	// Sets the table  table seat left fourteen for a given table number
    setTableSeatFourteenLeft(i_table_number, i_table_left_fourteen)
    {
        this.setTableNodeValue(this.m_tags.getTableSeatFourteenLeft(), i_table_number, i_table_left_fourteen);
        
    } // setTableSeatFourteenLeft

	// Sets the table  table seat left fifteen for a given table number
    setTableSeatSeatFifteenLeft(i_table_number, i_table_left_fifteen)
    {
        this.setTableNodeValue(this.m_tags.getTableSeatSeatFifteenLeft(), i_table_number, i_table_left_fifteen);
        
    } // setTableSeatSeatFifteenLeft

	// Sets the table  table seat left sixteen for a given table number
    setTableSeatSixteenLeft(i_table_number, i_table_left_sixteen)
    {
        this.setTableNodeValue(this.m_tags.getTableSeatSixteenLeft(), i_table_number, i_table_left_sixteen);
        
    } // setTableSeatSixteenLeft

	// Sets the table  table seat left nineteen for a given table number
    setTableSeatNineteenLeft(i_table_number, i_table_left_nineteen)
    {
        this.setTableNodeValue(this.m_tags.getTableSeatNineteenLeft(), i_table_number, i_table_left_nineteen);
        
    } // setTableSeatNineteenLeft

	// Sets the table  table seat left twenty for a given table number
    setTableSeatTwentyLeft(i_table_number, i_table_left_twenty)
    {
        this.setTableNodeValue(this.m_tags.getTableSeatTwentyLeft(), i_table_number, i_table_left_twenty);
        
    } // setTableSeatTwentyLeft

	// Sets the table  table seat right one for a given table number
    setTableSeatOneRight(i_table_number, i_table_right_one)
    {
        this.setTableNodeValue(this.m_tags.getTableSeatOneRight(), i_table_number, i_table_right_one);
        
    } // setTableSeatOneRight

	// Sets the table  table seat right two for a given table number
    setTableSeatTwoRight(i_table_number, i_table_right_two)
    {
        this.setTableNodeValue(this.m_tags.getTableSeatTwoRight(), i_table_number, i_table_right_two);
        
    } // setTableSeatTwoRight

	// Sets the table  table seat right three for a given table number
    setTableSeatThreeRight(i_table_number, i_table_right_three)
    {
        this.setTableNodeValue(this.m_tags.getTableSeatThreeRight(), i_table_number, i_table_right_three);
        
    } // setTableSeatThreeRight

	// Sets the table  table seat right four for a given table number
    setTableSeatFourRight(i_table_number, i_table_right_four)
    {
        this.setTableNodeValue(this.m_tags.getTableSeatFourRight(), i_table_number, i_table_right_four);
        
    } // setTableSeatFourRight

	// Sets the table  table seat right five for a given table number
    setTableSeatFiveRight(i_table_number, i_table_right_five)
    {
        this.setTableNodeValue(this.m_tags.getTableSeatFiveRight(), i_table_number, i_table_right_five);
        
    } // setTableSeatFiveRight

	// Sets the table  table seat right six for a given table number
    setTableSeatSixRight(i_table_number, i_table_right_six)
    {
        this.setTableNodeValue(this.m_tags.getTableSeatSixRight(), i_table_number, i_table_right_six);
        
    } // setTableSeatSixRight

	// Sets the table  table seat right seven for a given table number
    setTableSeatSevenRight(i_table_number, i_table_right_seven)
    {
        this.setTableNodeValue(this.m_tags.getTableSeatSevenRight(), i_table_number, i_table_right_seven);
        
    } // setTableSeatSevenRight

	// Sets the table  table seat right eight for a given table number
    setTableSeatEightRight(i_table_number, i_table_right_eight)
    {
        this.setTableNodeValue(this.m_tags.getTableSeatEightRight(), i_table_number, i_table_right_eight);
        
    } // setTableSeatEightRight

	// Sets the table  table seat right nine for a given table number
    setTableSeatNineRight(i_table_number, i_table_right_nine)
    {
        this.setTableNodeValue(this.m_tags.getTableSeatNineRight(), i_table_number, i_table_right_nine);
        
    } // setTableSeatNineRight

	// Sets the table  table seat right ten for a given table number
    setTableSeatTenRight(i_table_number, i_table_right_ten)
    {
        this.setTableNodeValue(this.m_tags.getTableSeatTenRight(), i_table_number, i_table_right_ten);
        
    } // setTableSeatTenRight

	// Sets the table  table seat right eleven for a given table number
    setTableSeatElevenRight(i_table_number, i_table_right_eleven)
    {
        this.setTableNodeValue(this.m_tags.getTableSeatElevenRight(), i_table_number, i_table_right_eleven);
        
    } // setTableSeatElevenRight

	// Sets the table  table seat right twelve for a given table number
    setTableSeatTwelveRight(i_table_number, i_table_right_twelve)
    {
        this.setTableNodeValue(this.m_tags.getTableSeatTwelveRight(), i_table_number, i_table_right_twelve);
        
    } // setTableSeatTwelveRight

	// Sets the table  table seat right thirteen for a given table number
    setTableSeatThirteenRight(i_table_number, i_table_right_thirteen)
    {
        this.setTableNodeValue(this.m_tags.getTableSeatThirteenRight(), i_table_number, i_table_right_thirteen);
        
    } // setTableSeatThirteenRight

	// Sets the table  table seat right fourteen for a given table number
    setTableSeatFourteenRight(i_table_number, i_table_right_fourteen)
    {
        this.setTableNodeValue(this.m_tags.getTableSeatFourteenRight(), i_table_number, i_table_right_fourteen);
        
    } // setTableSeatFourteenRight

	// Sets the table  table seat right fifteen for a given table number
    setTableSeatSeatFifteenRight(i_table_number, i_table_right_fifteen)
    {
        this.setTableNodeValue(this.m_tags.getTableSeatSeatFifteenRight(), i_table_number, i_table_right_fifteen);
        
    } // setTableSeatSeatFifteenRight

	// Sets the table  table seat right sixteen for a given table number
    setTableSeatSixteenRight(i_table_number, i_table_right_sixteen)
    {
        this.setTableNodeValue(this.m_tags.getTableSeatSixteenRight(), i_table_number, i_table_right_sixteen);
        
    } // setTableSeatSixteenRight

	// Sets the table  table seat right nineteen for a given table number
    setTableSeatNineteenRight(i_table_number, i_table_right_nineteen)
    {
        this.setTableNodeValue(this.m_tags.getTableSeatNineteenRight(), i_table_number, i_table_right_nineteen);
        
    } // setTableSeatNineteenRight

	// Sets the table  table seat right twenty for a given table number
    setTableSeatTwentyRight(i_table_number, i_table_right_twenty)
    {
        this.setTableNodeValue(this.m_tags.getTableSeatTwentyRight(), i_table_number, i_table_right_twenty);
        
    } // setTableSeatTwentyRight

	// Sets the table  table seat upper for a given table number
    setTableSeatUpper(i_table_number, i_table_seat_upper)
    {
        this.setTableNodeValue(this.m_tags.getTableSeatUpper(), i_table_number, i_table_seat_upper);
        
    } // setTableSeatUpper

	// Sets the table  table seat lower for a given table number
    setTableSeatLower(i_table_number, i_table_seat_lower)
    {
        this.setTableNodeValue(this.m_tags.getTableSeatLower(), i_table_number, i_table_seat_lower);
        
    } // setTableSeatLower

	// Sets the table text for a given table number
    setTableText(i_table_number, i_table_text)
    {
        this.setTableNodeValue(this.m_tags.getTableText(), i_table_number, i_table_text);
        
    } // setTableText

    ///////////////////////////////////////////////////////////////////////////
    /////// End Set Table Functions ///////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    /////// Start Get Group Functions /////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Returns the group text for a given group number
    getGroupText(i_group_number)
    {
        return this.getGroupNodeValue(this.m_tags.getGroupText(), i_group_number);
        
    } // getGroupText

    ///////////////////////////////////////////////////////////////////////////
    /////// End Get goup Functions ////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    /////// Start Set Group Functions /////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

	// Sets the group text for a given group number
    setGroupText(i_group_number, i_group_text)
    {
        this.setGroupNodeValue(this.m_tags.getGroupText(), i_group_number, i_group_text);
        
    } // setGroupText

    ///////////////////////////////////////////////////////////////////////////
    /////// End Set Group Functions ///////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////// Start Node Value Functions //////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Returns the layout node value for a given tag name
    getLayoutNodeValue(i_tag)
    {
        var ret_data = '';
        
        if (!this.checkLayoutXml()){ return ret_data; }

        var layout_node = this.getXmlObject().getElementsByTagName(i_tag)[0];
        
        var layout_node_value = layout_node.childNodes[0].nodeValue;
        
        ret_data = this.removeFlagNodeValueNotSet(layout_node_value);
        
        return ret_data;
        
    } // getLayoutNodeValue

    // Sets the layout node value for a given tag name
    setLayoutNodeValue(i_tag, i_node_value)
    {
        if (!this.checkLayoutXml()){ return; }

        var layout_nodes = this.getXmlObject().getElementsByTagName(i_tag);

        if (layout_nodes.length == 0)
        {
            alert("ReservationLayputXml.setLayoutNodeValue There is no element with tag name " + i_tag);

            return;
        }

        if (layout_nodes.length > 1)
        {
            alert("ReservationLayputXml.setLayoutNodeValue There are multiple elements with tag name " + i_tag);

            return;
        }

        var node_value = this.setFlagNodeValueIsNotSetForEmptyString(i_node_value);

        // getElementsByTagName can be used for any XML node at every level, but for the change
        // of the node value it must be the whole 'chain' from the base document
        // It is the text node of the XML node with the tag i_tag that is changed, i.e. childNodes[0]
        this.getXmlObject().getElementsByTagName(i_tag)[0].childNodes[0].nodeValue = node_value;

    } // setLayoutNodeValue

    // Get layout file object
    // i_tag_layout_file_element: getLayoutFileCase or getLayoutFileDescription
    //                            (not getLayoutFileButtonId)
    getLayoutFileObject(i_tag_layout_file_element, i_layout_file_number)
    {
        var ret_object = null;

        if(!this.checkLayoutFileNumber(i_layout_file_number)) { return ret_object; }

        var index_layout_file = i_layout_file_number - 1;
        
        var layout_file_node = this.getXmlObject().getElementsByTagName(this.m_tags.getLayoutFile())[index_layout_file];

        var layout_file_node_elements = layout_file_node.getElementsByTagName(i_tag_layout_file_element);

        if (layout_file_node_elements.length != 1)
        {
            alert("ReservationLayoutXml.getLayoutFileObject Number of layout file node elements is " +  layout_file_node_elements.length.toString() + 
            ".  There must only be one layout file element with the tag " + i_tag_layout_file_element);

            return ret_object; 
        }

        var ret_object = layout_file_node_elements[0];

        return ret_object;

    } // getLayoutFileObject

    // Get layout file id button object (getLayoutFileButtonId)
    getLayoutFileButtonIdObject(i_layout_file_number, i_id_button_number)
    {
        var ret_object = null;

        if(!this.checkLayoutFileIdButtonNumber(i_layout_file_number, i_id_button_number)) { return ret_object; }

        var index_layout_file = i_layout_file_number - 1;
        
        var layout_file_node = this.getXmlObject().getElementsByTagName(this.m_tags.getLayoutFile())[index_layout_file];

        var tag_id_button_element = this.m_tags.getLayoutFileButtonId();

        var id_button_elements = layout_file_node.getElementsByTagName(tag_id_button_element);

        var index_id_button = i_id_button_number - 1;

        ret_object = id_button_elements[index_id_button];
       
        return ret_object;

    } // getLayoutFileButtonIdObject
   
    // Returns the layout file node value for a given tag name and a given layout file number
    getLayoutFileNodeValue(i_tag_layout_file_element, i_layout_file_number)
    {
        var ret_node_value = '';

        var layout_file_node_element = this.getLayoutFileObject(i_tag_layout_file_element, i_layout_file_number);

        if (layout_file_node_element == null) 
        {
            return ret_node_value;
        }

        var layout_file_element_node_value = layout_file_node_element.childNodes[0].nodeValue;
        
        ret_node_value = this.removeFlagNodeValueNotSet(layout_file_element_node_value);
        
        return ret_node_value;
        
    } // getLayoutFileNodeValue

    // Sets the layout file node value for a given tag name and a given layout file number
    setLayoutFileNodeValue(i_tag_layout_file_element,i_layout_file_elemen_value, i_layout_file_number)
    {
        var layout_file_elemen_value = this.setFlagNodeValueIsNotSetForEmptyString(i_layout_file_elemen_value);

        var layout_file_node_element = this.getLayoutFileObject(i_tag_layout_file_element, i_layout_file_number);

        if (layout_file_node_element == null) 
        {
            return ret_node_value;
        }


        layout_file_node_element.childNodes[0].nodeValue = layout_file_elemen_value;
        
    } // setLayoutFileNodeValue

    // Returns the layout file button identity node value for a given tag name, a layout file number and a button number
    getLayoutFileButtonIdNodeValue(i_layout_file_number, i_id_button_number)
    {
        var ret_node_value = '';

        if(!this.checkLayoutFileIdButtonNumber(i_layout_file_number, i_id_button_number)) { return ret_node_value; }

        var button_id_element = this.getLayoutFileButtonIdObject(i_layout_file_number, i_id_button_number);

        if (null == button_id_element)
        {
            return ret_node_value;
        }

        var button_id_node_value = button_id_element.childNodes[0].nodeValue;

        ret_node_value = this.removeFlagNodeValueNotSet(button_id_node_value);
        
        return ret_node_value;
        
    } // getLayoutFileButtonIdNodeValue

    // Sets the layout file button identity node value for a given tag name, a layout file number and a button number
    setLayoutFileButtonIdNodeValue(i_button_id_element_value, i_layout_file_number, i_id_button_number)
    {

        if(!this.checkLayoutFileIdButtonNumber(i_layout_file_number, i_id_button_number)) { return; }

        var button_id_element = this.getLayoutFileButtonIdObject(i_layout_file_number, i_id_button_number);

        if (null == button_id_element)
        {
            return;
        }

        var button_id__elemen_value = this.setFlagNodeValueIsNotSetForEmptyString(i_button_id_element_value);

        button_id_element.childNodes[0].nodeValue = button_id__elemen_value;
        
    } // setLayoutFileButtonIdNodeValue

	
    // Returns the door node value for a given tag name and a given door number
    getDoorNodeValue(i_tag_door_element, i_door_number)
    {
        var ret_node_value = '';

        if(!this.checkDoorNumber(i_door_number)) { return ret_node_value; }

        var index_door = i_door_number - 1;
        
        var door_node = this.getXmlObject().getElementsByTagName(this.m_tags.getDoor())[index_door];

        var door_node_elements = door_node.getElementsByTagName(i_tag_door_element);

        if (door_node_elements.length != 1)
        {
            alert("ReservationLayoutXml.getDoorNodeValue Number of door node elements is " +  door_node_elements.length.toString() + 
            ".  There must only be one door element with the tag " + i_tag_door_element);

            return ret_node_value; 
        }

        var door_node_element = door_node_elements[0];

        var door_element_node_value = door_node_element.childNodes[0].nodeValue;
        
        ret_node_value = this.removeFlagNodeValueNotSet(door_element_node_value);
        
        return ret_node_value;
        
    } // getDoorNodeValue

    // Sets the door node value for a given tag name and a given door number
    setDoorNodeValue(i_tag_door_element, i_door_number, i_door_elemen_value)
    {
        if(!this.checkDoorNumber(i_door_number)) { return; }

        var index_door = i_door_number - 1;
        
        var door_node = this.getXmlObject().getElementsByTagName(this.m_tags.getDoor())[index_door];

        var door_node_elements = door_node.getElementsByTagName(i_tag_door_element);

        if (door_node_elements.length != 1)
        {
            alert("ReservationLayoutXml.setDoorNodeValue Number of door node elements is " +  door_node_elements.length.toString() + 
            ".  There must only be one door element with the tag " + i_tag_door_element);

            return; 
        }

        var door_elemen_value = this.setFlagNodeValueIsNotSetForEmptyString(i_door_elemen_value);

        var door_node_element = door_node_elements[0];

        door_node_element.childNodes[0].nodeValue = door_elemen_value;
        
    } // setDoorNodeValue

    // Returns the button node value for a given tag name and a given button number
    getButtonNodeValue(i_tag_button_element, i_button_number)
    {
        var ret_node_value = '';

        if(!this.checkButtonNumber(i_button_number)) { return ret_node_value; }

        var index_button = i_button_number - 1;
        
        var button_node = this.getXmlObject().getElementsByTagName(this.m_tags.getLayoutButton())[index_button];

        var button_node_elements = button_node.getElementsByTagName(i_tag_button_element);

        if (button_node_elements.length != 1)
        {
            alert("ReservationLayoutXml.getButtonNodeValue Number of button node elements is " +  button_node_elements.length.toString() + 
            ".  There must only be one button element with the tag " + i_tag_button_element);

            return ret_node_value; 
        }

        var button_node_element = button_node_elements[0];

        var button_element_node_value = button_node_element.childNodes[0].nodeValue;
        
        ret_node_value = this.removeFlagNodeValueNotSet(button_element_node_value);
        
        return ret_node_value;
        
    } // getButtonNodeValue

    // Sets the button node value for a given tag name and a given button number
    setButtonNodeValue(i_tag_button_element, i_button_number, i_button_elemen_value)
    {
        if(!this.checkButtonNumber(i_button_number)) { return; }

        var index_button = i_button_number - 1;
        
        var button_node = this.getXmlObject().getElementsByTagName(this.m_tags.getLayoutButton())[index_button];

        var button_node_elements = button_node.getElementsByTagName(i_tag_button_element);

        if (button_node_elements.length != 1)
        {
            alert("ReservationLayoutXml.setButtonNodeValue Number of button node elements is " +  button_node_elements.length.toString() + 
            ".  There must only be one button element with the tag " + i_tag_button_element);

            return; 
        }

        var button_elemen_value = this.setFlagNodeValueIsNotSetForEmptyString(i_button_elemen_value);

        var button_node_element = button_node_elements[0];

        button_node_element.childNodes[0].nodeValue = button_elemen_value;
        
    } // setButtonNodeValue

    // Returns the table node value for a given tag name and a given table number
    getTableNodeValue(i_tag_table_element, i_table_number)
    {
        var ret_node_value = '';

        if(!this.checkTableNumber(i_table_number)) { return ret_node_value; }

        var index_table = i_table_number - 1;
        
        var table_node = this.getXmlObject().getElementsByTagName(this.m_tags.getTable())[index_table];

        var table_node_elements = table_node.getElementsByTagName(i_tag_table_element);

        if (table_node_elements.length != 1)
        {
            alert("ReservationLayoutXml.getTableNodeValue Number of table node elements is " +  table_node_elements.length.toString() + 
            ".  There must only be one table element with the tag " + i_tag_table_element);

            return ret_node_value; 
        }

        var table_node_element = table_node_elements[0];

        var table_element_node_value = table_node_element.childNodes[0].nodeValue;
        
        ret_node_value = this.removeFlagNodeValueNotSet(table_element_node_value);
        
        return ret_node_value;
        
    } // getTableNodeValue

    // Sets the table node value for a given tag name and a given table number
    setTableNodeValue(i_tag_table_element, i_table_number, i_table_elemen_value)
    {
        if(!this.checkTableNumber(i_table_number)) { return; }

        var index_table = i_table_number - 1;
        
        var table_node = this.getXmlObject().getElementsByTagName(this.m_tags.getTable())[index_table];

        var table_node_elements = table_node.getElementsByTagName(i_tag_table_element);

        if (table_node_elements.length != 1)
        {
            alert("ReservationLayoutXml.setTableNodeValue Number of table node elements is " +  table_node_elements.length.toString() + 
            ".  There must only be one table element with the tag " + i_tag_table_element);

            return; 
        }

        var table_elemen_value = this.setFlagNodeValueIsNotSetForEmptyString(i_table_elemen_value);

        var table_node_element = table_node_elements[0];

        table_node_element.childNodes[0].nodeValue = table_elemen_value;
        
    } // setTableNodeValue

    // Returns the group node value for a given tag name and a given group number
    getGroupNodeValue(i_tag_group_element, i_group_number)
    {
        var ret_node_value = '';

        if(!this.checkGroupNumber(i_group_number)) { return ret_node_value; }

        var index_group = i_group_number - 1;
        
        var group_node = this.getXmlObject().getElementsByTagName(this.m_tags.getGroup())[index_group];

        var group_node_elements = group_node.getElementsByTagName(i_tag_group_element);

        if (group_node_elements.length != 1)
        {
            alert("ReservationLayoutXml.getGroupNodeValue Number of group node elements is " +  group_node_elements.length.toString() + 
            ".  There must only be one group element with the tag " + i_tag_group_element);

            return ret_node_value; 
        }

        var group_node_element = group_node_elements[0];

        var table_element_node_value = group_node_element.childNodes[0].nodeValue;
        
        ret_node_value = this.removeFlagNodeValueNotSet(table_element_node_value);
        
        return ret_node_value;
        
    } // getGroupNodeValue

    // Sets the group node value for a given tag name and a given group number
    setGroupNodeValue(i_tag_group_element, i_group_number, i_group_elemen_value)
    {
        if(!this.checkGroupNumber(i_group_number)) { return; }

        var index_group = i_group_number - 1;
        
        var group_node = this.getXmlObject().getElementsByTagName(this.m_tags.getGroup())[index_group];

        var group_node_elements = group_node.getElementsByTagName(i_tag_group_element);

        if (group_node_elements.length != 1)
        {
            alert("ReservationLayoutXml.setGroupNodeValue Number of group node elements is " +  group_node_elements.length.toString() + 
            ".  There must only be one group element with the tag " + i_tag_group_element);

            return; 
        }

        var group_elemen_value = this.setFlagNodeValueIsNotSetForEmptyString(i_group_elemen_value);

        var group_node_element = group_node_elements[0];

        group_node_element.childNodes[0].nodeValue = group_elemen_value;
        
    } // setGroupNodeValue

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////// Node Node Value Functions ///////////////////////
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////// Start Number Records  ///////////////////////////
    //////////////////////////////////////////////////////////////////////////

    // Returns the number of layout file records
    getNumberOfLayoutFiles()
    {
        var ret_n_records = -1;

        if (!this.checkLayoutXml()){ return ret_n_records; }

        var layout_file_rec_nodes = this.getXmlObject().getElementsByTagName(this.m_tags.getLayoutFile());

        ret_n_records = layout_file_rec_nodes.length;

        return ret_n_records;

    } // getNumberOfLayoutFiles

    // Return true if the input layout file record number exists
    checkLayoutFileNumber(i_layout_file_number)
    {
        var n_layout_files = this.getNumberOfLayoutFiles();

        if (n_layout_files < 0)
        {
            alert("ReservationLayputXml.checkLayoutFileNumber Returned nummber of ayout cases is negative ");

            return false;
        }

        if (i_layout_file_number >= 1 && i_layout_file_number <= n_layout_files)
        {
            return true;
        }
        else
        {
            alert("ReservationLayoutXml.checkLayoutFileNumber Input layout file number " +  i_layout_file_number.toString() + 
                                " is not between 1 and " + n_layout_files.toString());

            return false;
        }

    } // checkLayoutFileNumber	

    // Returns the number of layout file button records
    getNumberOfLayoutFileIdButtons(i_layout_file_number)
    {
        var ret_n_records = -1;

        if (!this.checkLayoutXml()){ return ret_n_records; }

        if(!this.checkLayoutFileNumber(i_layout_file_number)) { return ret_n_records; }

        var index_layout_file = i_layout_file_number - 1;

        var layout_file_node = this.getXmlObject().getElementsByTagName(this.m_tags.getLayoutFile())[index_layout_file];

        var tag_id_button_element = this.m_tags.getLayoutFileButtonId();

        var id_button_elements = layout_file_node.getElementsByTagName(tag_id_button_element);

        ret_n_records = id_button_elements.length;

        return ret_n_records;

    } // getNumberOfLayoutFileIdButtons

    // Return true if the input layout file id button record number exists
    checkLayoutFileIdButtonNumber(i_layout_file_number, i_id_button_number)
    {
        if(!this.checkLayoutFileNumber(i_layout_file_number)) { return false; }

        var n_id_buttons = this.getNumberOfLayoutFileIdButtons(i_layout_file_number);

        if (n_id_buttons < 0)
        {
            alert("ReservationLayputXml.checkLayoutFileIdButtonNumber Returned nummber of layout file id buttons is negative ");

            return false;
        }

        if (i_id_button_number >= 1 && i_id_button_number <= n_id_buttons)
        {
            return true;
        }
        else
        {
            alert("ReservationLayoutXml.checkLayoutFileIdButtonNumber Input layout file id button number " +  i_id_button_number.toString() + 
                                " is not between 1 and " + i_id_button_number.toString());

            return false;
        }

    } // checkLayoutFileIdButtonNumber

    // Returns the number of door records
    getNumberOfDoors()
    {
        var ret_n_records = -1;

        if (!this.checkLayoutXml()){ return ret_n_records; }

        var door_rec_nodes = this.getXmlObject().getElementsByTagName(this.m_tags.getDoor());

        ret_n_records = door_rec_nodes.length;

        return ret_n_records;

    } // getNumberOfDoors

    // Return true if the input door record number exists
    checkDoorNumber(i_door_number)
    {
        var n_doors = this.getNumberOfDoors();

        if (n_doors < 0)
        {
            alert("ReservationLayputXml.checkDoorNumber Returned nummber of doors is negative ");

            return false;
        }

        if (i_door_number >= 1 && i_door_number <= n_doors)
        {
            return true;
        }
        else
        {
            alert("ReservationLayoutXml.checkDoorNumber Input door number " +  i_door_number.toString() + 
                                " is not between 1 and " + n_doors.toString());

            return false;
        }

    } // checkDoorNumber

    // Returns the number of button records
    getNumberOfButtons()
    {
        var ret_n_records = -1;

        if (!this.checkLayoutXml()){ return ret_n_records; }

        var button_rec_nodes = this.getXmlObject().getElementsByTagName(this.m_tags.getLayoutButton());

        ret_n_records = button_rec_nodes.length;

        return ret_n_records;

    } // getNumberOfButtons

    // Return true if the input button record number exists
    checkButtonNumber(i_button_number)
    {
        var n_buttons = this.getNumberOfButtons();

        if (n_buttons < 0)
        {
            alert("ReservationLayputXml.checkButtonNumber Returned nummber of buttons is negative ");

            return false;
        }

        if (i_button_number >= 1 && i_button_number <= n_buttons)
        {
            return true;
        }
        else
        {
            alert("ReservationLayoutXml.checkButtonNumber Input button number " +  i_button_number.toString() + 
                                " is not between 1 and " + n_buttons.toString());

            return false;
        }

    } // checkButtonNumber	
  
    // Returns the number of table records
    getNumberOfTables()
    {
        var ret_n_records = -1;

        if (!this.checkLayoutXml()){ return ret_n_records; }

        var table_rec_nodes = this.getXmlObject().getElementsByTagName(this.m_tags.getTable());

        ret_n_records = table_rec_nodes.length;

        return ret_n_records;

    } // getNumberOfTables

    // Return true if the input table record number exists
    checkTableNumber(i_table_number)
    {
        var n_tables = this.getNumberOfTables();

        if (n_tables < 0)
        {
            alert("ReservationLayputXml.checkTableNumber Returned nummber of tables is negative ");

            return false;
        }

        if (i_table_number >= 1 && i_table_number <= n_tables)
        {
            return true;
        }
        else
        {
            alert("ReservationLayoutXml.checkTableNumber Input table number " +  i_table_number.toString() + 
                                " is not between 1 and " + n_tables.toString());

            return false;
        }

    } // checkTableNumber

    // Returns the number of group records
    getNumberOfGroups()
    {
        var ret_n_records = -1;

        if (!this.checkLayoutXml()){ return ret_n_records; }

        var group_rec_nodes = this.getXmlObject().getElementsByTagName(this.m_tags.getGroup());

        ret_n_records = group_rec_nodes.length;

        return ret_n_records;

    } // getNumberOfGroups

    // Returns the number of table records for a given group
    getNumberOTablesInOneGroup(i_group_number)
    {
        var ret_n_records = -1;

        if (!this.checkLayoutXml()){ return ret_n_records; }

        var group_rec_nodes = this.getXmlObject().getElementsByTagName(this.m_tags.getGroup());

        if (group_rec_nodes.length == 0)
        {
            alert("ReservationLayoutXml.getNumberOTablesInOneGroups Number of groups is zero (0)");

            return ret_n_records;
        }

        if (i_group_number < 1 || i_group_number > group_rec_nodes.length)
        {
            alert("ReservationLayoutXml.getNumberOTablesInOneGroups Group number " + i_group_number.toString()
                                + " is not between 1 and " + group_rec_nodes.length,toString());

            return ret_n_records;            
        }

        var group_rec_node = group_rec_nodes[i_group_number - 1];

        var table_rec_nodes = group_rec_node.getElementsByTagName(this.m_tags.getTable());

        ret_n_records = table_rec_nodes.length;

        return ret_n_records;

    } // getNumberOTablesInOneGroup

    // Returns an array of table numbers for the tables that are in a given group
    getGroupTableNumbers(i_group_number)
    {
        var ret_table_number_array = [];

        if (!this.checkLayoutXml()) { return ret_table_array; }

        if (!this.checkGroupNumber(i_group_number)) { return ret_table_array; }

        var group_rec_nodes = this.getXmlObject().getElementsByTagName(this.m_tags.getGroup());

        var table_number = 0;

        for (var group_number=1; group_number <= i_group_number; group_number++)
        {
            var group_node = group_rec_nodes[group_number - 1];

            var group_table_nodes = group_node.getElementsByTagName(this.m_tags.getTable());

            var n_group_tables = group_table_nodes.length;

            if (group_number == i_group_number)
            {
                for (var index_out=0; index_out < n_group_tables; index_out++)
                {
                    table_number = table_number + 1;

                    ret_table_number_array[index_out] = table_number;
                }

                break;
            }
            else
            {
                table_number = table_number + n_group_tables;
            }

        }

        return ret_table_number_array;

    } // getGroupTableNodes

    // Return true if the input group record number exists
    checkGroupNumber(i_group_number)
    {
        var n_groups = this.getNumberOfGroups();

        if (n_groups < 0)
        {
            alert("ReservationLayputXml.checkGroupNumber Returned nummber of groups is negative ");

            return false;
        }

        if (i_group_number >= 1 && i_group_number <= n_groups)
        {
            return true;
        }
        else
        {
            alert("ReservationLayoutXml.checkGroupNumber Input group number " +  i_group_number.toString() + 
                                " is not between 1 and " + n_groups.toString());

            return false;
        }

    } // checkGroupNumber

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////// End Number Records  /////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////// Start Not Set Values  ///////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Returns true if the node value is set
    nodeValueIsSet(i_node_value)
    {
        if (i_node_value == this.m_not_yet_set_node_value)
        {
            return false;
        }
        else
        {
            return true;
        }
        
    } // nodeValueIsSet

    // Returns empty string if i_node_value is equal to m_not_yet_set_node_value
    removeFlagNodeValueNotSet(i_node_value)
    {
        if (!this.nodeValueIsSet(i_node_value))
        {
            return "";
        }
        
        return i_node_value; 
        
    } // removeFlagNodeValueNotSet

    // Return flag (string) g_not_yet_set_node_value if input string is empty
    setFlagNodeValueIsNotSetForEmptyString(i_node_value)
    {
        var trimmed_node_value = i_node_value.trim();
        
        if (trimmed_node_value.length == 0)
        {
            return this.m_not_yet_set_node_value;
        }
        
        return i_node_value;

    } // setFlagNodeValueIsNotSetForEmptyString

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////// End Not Set Values  /////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    /////// Start Utility Functions ///////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Returns the reservation layout XML file name
    getXmlLayoutFileName()
    {
        return this.m_result_directory_name + '/XML/' + this.m_result_directory_name + '.xml';

    } // getXmlLayoutFileName

    // Check that the layout program XML object is set
    checkLayoutXml()
    {      
        if (null == this.getXmlObject())
        {
            alert("ResrvationLayout.checkLayoutXml Reservation layout XML object is null");

            return false;
        }	
        else
        {
            return true;
        }
        
    } // checkLayoutXml

    // Returns true if the application runs on the server
    static execApplicationOnServer()
    {
        var current_base = window.location.href;

        var server_url = 'jazzliveaarau.ch';

        var index_url = current_base.indexOf(server_url);

        if (index_url >= 0) 
        {
            return true;
        }
        else
        {
            return false;
        }

    } // execApplicationOnServer    

    ///////////////////////////////////////////////////////////////////////////
    /////// End Utility Functions /////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////// Start Object Functions //////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Sets the XML object
    setXmlObject(i_object_xml)
    {
        this.m_object_xml = i_object_xml;

    } // setXmlObject

    // Returns the XML object
    getXmlObject()
    {
        return this.m_object_xml;

    } // getXmlObject    

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////// Start Object Functions //////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    /////// Start Load Functions //////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Load the XML file.
    // https://codeburst.io/javascript-what-the-heck-is-a-callback-aba4da2deced
    // i_object_xml is the instance of this class. Call of this.setXmlObject
    // does not work, while this= jazz_xmlhttp 
    loadOneXmlFile(i_object_xml, i_path_file_name_xml, i_callback_function_name)
    {
    // Request server object for the XML file
    var jazz_xmlhttp = new XMLHttpRequest();
    
    // Event function: The server will return state and status 
    // from object functions open and send.
    jazz_xmlhttp.onreadystatechange = function() 
    {
        if (jazz_xmlhttp.readyState == 4 && jazz_xmlhttp.status == 200) 
        {
            var xml_object = jazz_xmlhttp.responseXML;

            i_object_xml.setXmlObject(xml_object);

            i_callback_function_name();    
        }
        else if (jazz_xmlhttp.readyState == 4 && jazz_xmlhttp.status == 404) 
        {
            alert("Error 404: File " + i_path_file_name_xml + " not found" );
        }	
    };
    
    // Open the file
    jazz_xmlhttp.open("GET", i_path_file_name_xml, true);
    
    jazz_xmlhttp.setRequestHeader('Cache-Control', 'no-cache');
        
    jazz_xmlhttp.send();	

    } // loadOneXmlFile

    ///////////////////////////////////////////////////////////////////////////
    /////// End Load Functions ////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////


} // ReservationLayoutXml

// Class defining the tags of the XML reservation layout file
class ReservationLayoutTags 
{
    // Creates the instance of the class
    constructor() 
    {
        //////////////////////////////////////////////////////////
        ////////////// General Data //////////////////////////////
        //////////////////////////////////////////////////////////

        this.m_tag_premises_name = "PremisesName";
        this.m_tag_premises_width = "PremisesWidth";
        this.m_tag_premises_height = "PremisesHeight";

        this.m_tag_wall_thickness = "WallThickness";

        // Max  width in pixel. Used to scale from millimeter to pixel
        this.m_tag_max_width_pixel = "MaxWidhtPixel";

        // Allowed (max) reservation percentage
        this.m_tag_max_reservation_procent = "MaxReservationsProcent";


        // Layout case
        this.m_tag_layout_file = "LayoutFile";
        this.m_tag_layout_file_case = "LayoutFileCase";
        this.m_tag_layout_file_html_name = "LayoutFileHtmlName";
        this.m_tag_layout_file_description = "LayoutFileDescription";
        this.m_tag_layout_file_button_id = "LayoutFileButtonId";

        // Organizer data
        this.m_tag_organizer_name = "OrganizerName";
        this.m_tag_organizer_text_logo = "OrganizerTextLogo";
        this.m_tag_organizer_text_logo_width = "OrganizerTextLogoWidth";
        this.m_tag_organizer_text_logo_height = "OrganizerTextLogoHeight";
        this.m_tag_organizer_logo = "OrganizerLogo";
        this.m_tag_organizer_logo_width = "OrganizerLogoWidth";
        this.m_tag_organizer_logo_height = "OrganizerLogoHeight";
        this.m_tag_sponsors_image = "SponsorsImage";
        this.m_tag_sponsors_image_width = "SponsorsImageWidth";
        this.m_tag_sponsors_image_height = "SponsorsImageHeight";

        // General data tables
        this.m_tag_table_color = "TableColor";
        this.m_tag_table_stroke_color = "TableStrokeColor";
        this.m_tag_table_stroke_width = "TableStrokeWidth";
        this.m_tag_table_text_rel_x_procent = "TableTextRelXProcent";
        this.m_tag_table_text_rel_y_procent = "TableTextRelYProcent";
        this.m_tag_table_text_color = "TableTextColor";

        // Data for the stage
        this.m_tag_stage_upper_left_x = "StageUpperLeftX";
        this.m_tag_stage_upper_left_y = "StageUpperLeftY";
        this.m_tag_stage_width = "StageWidth";
        this.m_tag_stage_height = "StageHeight";
        this.m_tag_stage_text = "StageText";
        this.m_tag_stage_color = "StageColor";
        this.m_tag_stage_stroke_color = "StageStrokeColor";
        this.m_tag_stage_stroke_width = "StageStrokeWidth";
        this.m_tag_stage_text_rel_x_procent = "StageTextRelXProcent";
        this.m_tag_stage_text_rel_y_procent = "StageTextRelYProcent"; // !!!!!!!!!!!!! Changed to capital Y
        this.m_tag_stage_text_color = "StageTextColor";
        this.m_tag_stage_image = "StageImage";
        this.m_tag_stage_image_width = "StageImageWidth";
        this.m_tag_stage_image_height = "StageImageHeight";

        // Data for the cashier desk
        this.m_tag_cash_upper_left_x = "CashUpperLeftX";
        this.m_tag_cash_upper_left_y = "CashUpperLeftY";
        this.m_tag_cash_image = "CashImage";
        this.m_tag_cash_image_width = "CashImageWidth";
        this.m_tag_cash_image_height = "CashImageHeight";

        //////////////////////////////////////////////////////////
        ////////////// Button Data ///////////////////////////////
        //////////////////////////////////////////////////////////

        // File names for images with text that are used as button captions
        this.m_tag_text_image_select_seats = "TextImageSelectSeats";
        this.m_tag_text_image_reserve_seats = "TextImageReserveSeats";
        this.m_tag_text_image_reserve_select_undef = "TextImageReserveSelectUndef";
        this.m_tag_text_image_add_reservation = "TextImageAddReservation";
        this.m_tag_text_image_delete_off = "TextImageDeleteOff";
        this.m_tag_text_image_delete_on = "TextImageDeleteOn";
        this.m_tag_text_image_reservation_list = "TextImageReservationList";
        this.m_tag_text_image_reservation_print = "TextImageReservationPrint";
        this.m_tag_text_image_save_reservation = "TextImageSaveReservation";
        this.m_tag_text_image_save_reservation_white = "TextImageSaveReservationWhite";

        this.m_tag_layout_button = "LayoutButton";
        this.m_tag_button_id = "ButtonId";
        this.m_tag_button_title = "ButtonTitle";
        this.m_tag_button_event_function = "ButtonEventFunction";
        this.m_tag_button_upper_left_x = "ButtonUpperLeftX";
        this.m_tag_button_upper_left_y = "ButtonUpperLeftY";
        this.m_tag_button_upper_width = "ButtonWidth";
        this.m_tag_button_upper_height = "ButtonHeight";
        this.m_tag_button_image_id = "ButtonImageId";
        this.m_tag_button_image_event_function = "ButtonImageEventFunction";
        this.m_tag_button_image_one = "ButtonImageOne";
        this.m_tag_button_image_two = "ButtonImageTwo";
        this.m_tag_button_image_three = "ButtonImageThree";
        this.m_tag_button_image_width = "ButtonImageWidth";
        this.m_tag_button_image_height = "ButtonImageHeight";
        this.m_tag_button_type = "ButtonType";


        //////////////////////////////////////////////////////////
        ////////////// Door Data /////////////////////////////////
        //////////////////////////////////////////////////////////

        this.m_tag_door = "Door";
        this.m_tag_door_type = "DoorType";
        this.m_tag_door_position = "DoorPosition";
        this.m_tag_door_height = "DoorHeight";
        this.m_tag_door_text = "DoorText";
        this.m_tag_door_image = "DoorImage";
        this.m_tag_door_image_width = "DoorImageWidth";
        this.m_tag_door_image_height = "DoorImageHeight";

        //////////////////////////////////////////////////////////
        ////////////// Table Data ////////////////////////////////
        //////////////////////////////////////////////////////////

        this.m_tag_group = "TableGroup";
        this.m_tag_group_text = "TableGroupText";

        this.m_tag_table = "Table";
        this.m_tag_table_number = "Number";
        this.m_tag_table_upper_left_x = "UpperLeftX";
        this.m_tag_table_upper_left_y = "UpperLeftY";
        this.m_tag_table_width = "Width";
        this.m_tag_table_height = "Height";
        this.m_tag_table_number_left_right_seats = "NumberLeftRightSeats";

        this.m_tag_table_seat_one_left = "SeatOneLeft";
        this.m_tag_table_seat_two_left = "SeatTwoLeft";
        this.m_tag_table_seat_three_left = "SeatThreeLeft";
        this.m_tag_table_seat_four_left = "SeatFourLeft";
        this.m_tag_table_seat_five_left = "SeatFiveLeft";
        this.m_tag_table_seat_six_left = "SeatSixLeft";
        this.m_tag_table_seat_seven_left = "SeatSevenLeft";
        this.m_tag_table_seat_eight_left = "SeatEightLeft";
        this.m_tag_table_seat_nine_left = "SeatNineLeft";
        this.m_tag_table_seat_ten_left = "SeatTenLeft";
        this.m_tag_table_seat_eleven_left = "SeatElevenLeft";
        this.m_tag_table_seat_twelve_left = "SeatTwelveLeft";
        this.m_tag_table_seat_thirteen_left = "SeatThirteenLeft";
        this.m_tag_table_seat_fourteen_left = "SeatFourteenLeft";
        this.m_tag_table_seat_fifteen_left = "SeatFifteenLeft";
        this.m_tag_table_seat_sixteen_left = "SeatSixteenLeft";
        this.m_tag_table_seat_seventeen_left = "SeatSeventeenLeft";
        this.m_tag_table_seat_eightteen_left = "SeatEighteenLeft";
        this.m_tag_table_seat_nineteen_left = "SeatNineteenLeft";
        this.m_tag_table_seat_twenty_left = "SeatTwentyLeft";

        this.m_tag_table_seat_one_right = "SeatOneRight";
        this.m_tag_table_seat_two_right = "SeatTwoRight";
        this.m_tag_table_seat_three_right = "SeatThreeRight";
        this.m_tag_table_seat_four_right = "SeatFourRight";
        this.m_tag_table_seat_five_right = "SeatFiveRight";
        this.m_tag_table_seat_six_right = "SeatSixRight";
        this.m_tag_table_seat_seven_right = "SeatSevenRight";
        this.m_tag_table_seat_eight_right = "SeatEightRight";
        this.m_tag_table_seat_nine_right = "SeatNineRight";
        this.m_tag_table_seat_ten_right = "SeatTenRight";
        this.m_tag_table_seat_eleven_right = "SeatElevenRight";
        this.m_tag_table_seat_twelve_right = "SeatTwelveRight";
        this.m_tag_table_seat_thirteen_right = "SeatThirteenRight";
        this.m_tag_table_seat_fourteen_right = "SeatFourteenRight";
        this.m_tag_table_seat_fifteen_right = "SeatFifteenRight";
        this.m_tag_table_seat_sixteen_right = "SeatSixteenRight";
        this.m_tag_table_seat_seventeen_right = "SeatSeventeenRight";
        this.m_tag_table_seat_eightteen_right = "SeatEighteenRight";
        this.m_tag_table_seat_nineteen_right = "SeatNineteenRight";
        this.m_tag_table_seat_twenty_right = "SeatTwentyRight";

        this.m_tag_table_seat_upper = "SeatUpper";
        this.m_tag_table_seat_lower = "SeatLower";

        this.m_tag_table_text = "Text";

    } // constructor

    // Get member variable functions
    // =============================

    getPremisesName(){return this.m_tag_premises_name;} 
    getPremisesWidth(){return this.m_tag_premises_width;} 
    getPremisesHeight(){return this.m_tag_premises_height;} 

    getWallThickness(){return this.m_tag_wall_thickness;} 

    // Max  width in pixel. Used to scale from millimeter to pixel
    getMaxWidhtPixel(){return this.m_tag_max_width_pixel;}
 
    // Allowed (max) reservation percentage
    getMaxReservationsProcent(){return this.m_tag_max_reservation_procent;}

    // Layout file
    getLayoutFile(){return this.m_tag_layout_file;}
    getLayoutFileCase(){return this.m_tag_layout_file_case;}
    getLayoutFileHtmlName(){return this.m_tag_layout_file_html_name;}
    getLayoutFileDescription(){return this.m_tag_layout_file_description;}
    getLayoutFileButtonId(){return this.m_tag_layout_file_button_id;}

    // Organizer data
    getOrganizerName(){return this.m_tag_organizer_name;}
    getOrganizerTextLogo(){return this.m_tag_organizer_text_logo;}
    getOrganizerTextLogoWidth(){return this.m_tag_organizer_text_logo_width;}
    getOrganizerTextLogoHeight(){return this.m_tag_organizer_text_logo_height;}
    getOrganizerLogo(){return this.m_tag_organizer_logo;}
    getOrganizerLogoWidth(){return this.m_tag_organizer_logo_width;}
    getOrganizerLogoHeight(){return this.m_tag_organizer_logo_height;}
    getSponsorsImage(){return this.m_tag_sponsors_image;}
    getSponsorsImageWidth(){return this.m_tag_sponsors_image_width;}
    getSponsorsImageHeight(){return this.m_tag_sponsors_image_height;}

    // General data tables
    getTableColor(){return this.m_tag_table_color;} 
    getTableStrokeColor(){return this.m_tag_table_stroke_color;} 
    getTableStrokeWidth(){return this.m_tag_table_stroke_width;} 
    getTableTextRelXProcent(){return this.m_tag_table_text_rel_x_procent;} 
    getTableTextRelYProcent(){return this.m_tag_table_text_rel_y_procent;} 
    getTableTextColor(){return this.m_tag_table_text_color;} 

    // Data for the stage
    getStageUpperLeftX(){return this.m_tag_stage_upper_left_x;} 
    getStageUpperLeftY(){return this.m_tag_stage_upper_left_y;} 
    getStageWidth(){return this.m_tag_stage_width;} 
    getStageHeight(){return this.m_tag_stage_height;}
    getStageText(){return this.m_tag_stage_text;}
    getStageColor(){return this.m_tag_stage_color;}
    getStageStrokeColor(){return this.m_tag_stage_stroke_color;}
    getStageStrokeWidth(){return this.m_tag_stage_stroke_width;}
    getStageTextRelXProcent(){return this.m_tag_stage_text_rel_x_procent;}
    getStageTextRelYProcent(){return this.m_tag_stage_text_rel_y_procent;}
    getStageTextColor(){return this.m_tag_stage_text_color;}
    getStageImage(){return this.m_tag_stage_image;}
    getStageImageWidth(){return this.m_tag_stage_image_width;}
    getStageImageHeight(){return this.m_tag_stage_image_height;}

    // Data for the cashier desk
    getCashUpperLeftX(){return this.m_tag_cash_upper_left_x;}
    getCashUpperLeftY(){return this.m_tag_cash_upper_left_y;}
    getCashImage(){return this.m_tag_cash_image;}
    getCashImageWidth(){return this.m_tag_cash_image_width;}
    getCashImageHeight(){return this.m_tag_cash_image_height;}

    //////////////////////////////////////////////////////////
    ////////////// Button Data ///////////////////////////////
    //////////////////////////////////////////////////////////

    // File names for images with text that are used as button captions
    getTextImageSelectSeats(){return this.m_tag_text_image_select_seats;}
    getTextImageReserveSeats(){return this.m_tag_text_image_reserve_seats;}
    getTextImageReserveSelectUndef(){return this.m_tag_text_image_reserve_select_undef;}
    getTextImageAddReservation(){return this.m_tag_text_image_add_reservation;}
    getTextImageDeleteOff(){return this.m_tag_text_image_delete_off;}
    getTextImageDeleteOn(){return this.m_tag_text_image_delete_on;}
    getTextImageReservationList(){return this.m_tag_text_image_reservation_list;}
    getTextImageReservationPrint(){return this.m_tag_text_image_reservation_print;}
    getTextImageSaveReservation(){return this.m_tag_text_image_save_reservation;}
    getTextImageSaveReservationWhite(){return this.m_tag_text_image_save_reservation_white;}


    getLayoutButton(){return this.m_tag_layout_button;}
    getButtonId(){return this.m_tag_button_id;}
    getButtonTitle(){return this.m_tag_button_title;}
    getButtonEventFunction(){return this.m_tag_button_event_function;}
    getButtonUpperLeftX(){return this.m_tag_button_upper_left_x;}
    getButtonUpperLeftY(){return this.m_tag_button_upper_left_y;}
    getButtonWidth(){return this.m_tag_button_upper_width;}
    getButtonHeight(){return this.m_tag_button_upper_height;}
    getButtonImageId(){return this.m_tag_button_image_id;}
    getButtonImageEventFunction(){return this.m_tag_button_image_event_function;}
    getButtonImageOne(){return this.m_tag_button_image_one;}
    getButtonImageTwo(){return this.m_tag_button_image_two;}
    getButtonImageThree(){return this.m_tag_button_image_three;}
    getButtonImageWidth(){return this.m_tag_button_image_width;}
    getButtonImageHeight(){return this.m_tag_button_image_height;}
    getButtonType(){return this.m_tag_button_type;}

    //////////////////////////////////////////////////////////
    ////////////// Door Data /////////////////////////////////
    //////////////////////////////////////////////////////////

    getDoor(){return this.m_tag_door;}
    getDoorType(){return this.m_tag_door_type;}
    getDoorPosition(){return this.m_tag_door_position;}
    getDoorHeight(){return this.m_tag_door_height;}
    getDoorText(){return this.m_tag_door_text;}
    getDoorImage(){return this.m_tag_door_image;}
    getDoorImageWidth(){return this.m_tag_door_image_width;}
    getDoorImageHeight(){return this.m_tag_door_image_height;}

    //////////////////////////////////////////////////////////
    ////////////// Table Data ////////////////////////////////
    //////////////////////////////////////////////////////////

    getGroup(){return this.m_tag_group;}
    getGroupText(){return this.m_tag_group_text;}

    getTable(){return this.m_tag_table;}

    getTableNumber(){return this.m_tag_table_number;}
    getTableUpperLeftX(){return this.m_tag_table_upper_left_x;}
    getTableUpperLeftY(){return this.m_tag_table_upper_left_y;}
    getTableWidth(){return this.m_tag_table_width;}
    getTableHeight(){return this.m_tag_table_height;}

    getTableNumberLeftRightSeats(){return this.m_tag_table_number_left_right_seats;}

    getTableSeatOneLeft(){return this.m_tag_table_seat_one_left;}
    getTableSeatTwoLeft(){return this.m_tag_table_seat_two_left;}
    getTableSeatThreeLeft(){return this.m_tag_table_seat_three_left;}
    getTableSeatFourLeft(){return this.m_tag_table_seat_four_left;}
    getTableSeatFiveLeft(){return this.m_tag_table_seat_five_left;}
    getTableSeatSixLeft(){return this.m_tag_table_seat_six_left;}
    getTableSeatSevenLeft(){return this.m_tag_table_seat_seven_left;}
    getTableSeatEightLeft(){return this.m_tag_table_seat_eight_left;}
    getTableSeatNineLeft(){return this.m_tag_table_seat_nine_left;}
    getTableSeatTenLeft(){return this.m_tag_table_seat_ten_left;}
    getTableSeatElevenLeft(){return this.m_tag_table_seat_eleven_left;}
    getTableSeatTwelveLeft(){return this.m_tag_table_seat_twelve_left;}
    getTableSeatThirteenLeft(){return this.m_tag_table_seat_thirteen_left;}
    getTableSeatFourteenLeft(){return this.m_tag_table_seat_fourteen_left;}
    getTableSeatSeatFifteenLeft(){return this.m_tag_table_seat_fifteen_left;}
    getTableSeatSixteenLeft(){return this.m_tag_table_seat_sixteen_left;}
    getTableSeatSeventeenLeft(){return this.m_tag_table_seat_seventeen_left;}
    getTableSeatEighteenLeft(){return this.m_tag_table_seat_eightteen_left;}
    getTableSeatNineteenLeft(){return this.m_tag_table_seat_nineteen_left;}
    getTableSeatTwentyLeft(){return this.m_tag_table_seat_twenty_left;}

    getTableSeatOneRight(){return this.m_tag_table_seat_one_right;}
    getTableSeatTwoRight(){return this.m_tag_table_seat_two_right;}
    getTableSeatThreeRight(){return this.m_tag_table_seat_three_right;}
    getTableSeatFourRight(){return this.m_tag_table_seat_four_right;}
    getTableSeatFiveRight(){return this.m_tag_table_seat_five_right;}
    getTableSeatSixRight(){return this.m_tag_table_seat_six_right;}
    getTableSeatSevenRight(){return this.m_tag_table_seat_seven_right;}
    getTableSeatEightRight(){return this.m_tag_table_seat_eight_right;}
    getTableSeatNineRight(){return this.m_tag_table_seat_nine_right;}
    getTableSeatTenRight(){return this.m_tag_table_seat_ten_right;}
    getTableSeatElevenRight(){return this.m_tag_table_seat_eleven_right;}
    getTableSeatTwelveRight(){return this.m_tag_table_seat_twelve_right;}
    getTableSeatThirteenRight(){return this.m_tag_table_seat_thirteen_right;}
    getTableSeatFourteenRight(){return this.m_tag_table_seat_fourteen_right;}
    getTableSeatSeatFifteenRight(){return this.m_tag_table_seat_fifteen_right;}
    getTableSeatSixteenRight(){return this.m_tag_table_seat_sixteen_right;}
    getTableSeatSeventeenRight(){return this.m_tag_table_seat_seventeen_right;}
    getTableSeatEighteenRight(){return this.m_tag_table_seat_eightteen_right;}
    getTableSeatNineteenRight(){return this.m_tag_table_seat_nineteen_right;}
    getTableSeatTwentyRight(){return this.m_tag_table_seat_twenty_right;}

    getTableSeatUpper(){return this.m_tag_table_seat_upper;}
    getTableSeatLower(){return this.m_tag_table_seat_lower;}

    getTableText(){return this.m_tag_table_text;}

} // ReservationLayoutTags

