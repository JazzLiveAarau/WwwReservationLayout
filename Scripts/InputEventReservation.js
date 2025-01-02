// File: InputEventReservation.js
// Date: 2025-01-02
// Author: Gunnar Lidén

// File content
// =============
//
// Class that creates a form for the input of reservation data
// The class has member function that checks the input data

class InputEventReservation
{
    // Creates the instance of the class
    // i_id_div_container: Identity for the div where the input form shall be created
    // i_event_program_xml: An EventProgramXml object that holds information about the events
    // i_global_variable_name_this_object: Name of the global variable that holds the instance of this class
    constructor(i_id_div_container, i_event_program_xml, i_global_variable_name_this_object) 
    {
        // Member variables
        // ================

        //  Identity for the div where the input form shall be created
        this.m_id_div_container = i_id_div_container;

        // An EventProgramXml object that holds information about the events
        this.m_event_program_xml = i_event_program_xml;

        // For the implementation of event functions for this class, the 
        // created object must be saved in a global variable and the name
        // of the variable must be set by the member function 
        // setGlobalVariableNameThisObject
        this.m_global_variable_name_this_object = i_global_variable_name_this_object;

        // Defines the event_number for the reservation. 
        this.m_active_event_number = -1;

        // Boolean flag telling if the form has been created
        this.m_form_created = false;

        // Boolean telling if the event dropdown control shall be displayed
        this.m_b_display_dropdown = true;

        // The div element where the input form shall be created
        this.m_element_div_container = null;

        // The event dropdown object EventProgramDropdown
        this.m_event_dropdown_el = null;

        // Start string for all identities
        this.m_id_unique_str = "id_input_event_reserv_";

        // Identitity and object functions for class InputEventReservation
        this.m_id_el = new InputEventReservationIdElement(this.m_id_unique_str);

        // Object defining all text strings for the application
        this.m_texts = new InputEventReservationText();

        // Object defining all style strings for the application
        this.m_styles = new InputEventReservationStyle();

        // The width of the input form
        this.m_input_form_width = '310px';

        // The style for the input form div
        this.m_input_form_style_str = this.m_styles.getForm();

        // Style for a row div
        this.m_div_row_style_str = this.m_styles.getRow();

        // Style for a row left element
        this.m_element_left_style_str = this.m_styles.getLeftElement();

        // Style for a row right element
        this.m_element_right_style_str = this.m_styles.getRightElement();

        // The name of the function that will open the web page MakeReservation
        // It is not possible to directly call a member function of this class
        // Therefore m_global_variable_name_this_object
        this.m_open_make_reservation_function_name = this.getGlobalVariableNameThisObject() + '.openMainReservationFunctionName()';

        // Boolean flag telling if tabs and comments shall be removed
        this.m_remove_tabs_comments = false;

        // The minimum row length
        this.m_row_length_min = 80;

        this.m_current_accumulated_text_length = 0;

        // Flagg telling if debug shall be written to the console
        this.m_b_write_debug = true;

        this.setElementDivContainer();

        this.initStorageVariables();

    } // constructor

    ///////////////////////////////////////////////////////////////////////////
    /////// Start Global Variable /////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Returns the name of the global variable that holds the instance of this class
    // For the implementation of event functions for this class, the 
    // created object must be saved in a global variable and the name
    // of the variable must be set by this member function.
    //  
    getGlobalVariableNameThisObject()
    {
        return this.m_global_variable_name_this_object;

    } // getGlobalVariableNameThisObject

    ///////////////////////////////////////////////////////////////////////////
    /////// End Global Variable ///////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    /////// Start Create Form /////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Create the form
    create()
    {
        this.debug('InputEventReservation.create Enter');

        var html_str = this.getDivsHtml();

        var container_el = this.getElementDivContainer();

        container_el.innerHTML = html_str;

        this.setFormCreatedToTrue();

        this.contentHeader();

        this.contentLabelName();

        this.contentLabelEmail();

        this.contentLabelRemark();

        this.contentDropdown();

        this.contentEventName();

        this.contentPrices();

        this.contentInstructions();

        this.contentButtonOpenReservation();

        var data_storage = ReservationStorage.getLocal();

        this.contentInputName(data_storage);

        this.contentInputEmail(data_storage);

        this.contentInputRemark(data_storage);

        this.contentButtonInfoName();

        this.contentButtonInfoEmail();

        this.contentButtonInfoRemark();

        this.contentButtonInfoOpenReservation();

        this.debug('InputEventReservation.create Exit');

    } // create

    ///////////////////////////////////////////////////////////////////////////
    /////// End Create Form ///////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    /////// Start Event Functions /////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // User selected a new item of the event program dropdown
    // (Please not that this member function is called from a global function)
    // 1. Set the event number. Call of InputEventReservation.setEventNumber
    //    Please note that the selected item in the dropdown defines the value
    onChangeEventProgramDropdown()
    {
        this.setEventNumber();

        var event_number = this.getEventNumber();

        var debug_msg = 'InputEventReservation.onChangeEventProgramDropdown event_number= ' + event_number.toString();

        this.contentEventName();

        this.debug(debug_msg);

    } // onChangeEventProgramDropdown

    // Open the web page MakeReservation with some input data in a query string.
    // 1. Get data from the input form. Call of InputEventReservation.nameFromForm 
    //    emailFromForm, remarkFromForm and getEventNumber
    // 2. Check data. Call of InputEventReservation.checkInputData
    // 3. Create a ReservationData and set reservation data. Call of the objects
    //    member functions setName, setEmail, setRemark and setEventNumber
    // 4. Set reservation data in windows local storage. 
    //    Call of ReservationStorage.setLocal
    openMainReservationFunctionName()
    {
        var name_form = this.nameFromForm();

        var email_form = this.emailFromForm();

        var remark_form = this.remarkFromForm();

        var event_number = this.getEventNumber();

        if (!this.checkInputData(name_form, email_form, remark_form, event_number))
        {
            return;
        }

        var reservation_data = new ReservationData();

        reservation_data.setName(name_form.trim());

        reservation_data.setEmail(email_form.trim());

        reservation_data.setRemark(remark_form.trim());

        reservation_data.setEventNumber(event_number);

        ReservationStorage.setLocal(reservation_data);

        var reservation_open = new ReservationOpen();

        reservation_open.setReservationData(reservation_data);

        var url_reservation_dir = this.m_event_program_xml.getUrlReservationDir(event_number);

        reservation_open.setUrlReservationDir(url_reservation_dir);

        reservation_open.openReservationPage();


        this.debug("InputEventReservation.openMainReservationFunctionName Input data:");

        this.debug(name_form + ', ' + email_form + ', ' + remark_form);

    } // openMainReservationFunctionName

    // User changed the value of the input element name
    onChangeInputName()
    {
        var name_form = this.nameFromForm();

        if (name_form.trim().length == 0)
        {
            return;
        }

        var b_alert = false;

        if (ReservationData.checkName(name_form, b_alert))
        {
            this.nameSetColorValid();
        }
        else
        {
            this.nameSetColorError();
        }

    } // onChangeInputName

    // User changed the value of the input element email
    onChangeInputEmail()
    {
        var email_form = this.emailFromForm();

        if (email_form.trim().length == 0)
        {
            return;
        }

        var b_alert = false;

        if (ReservationData.checkEmail(email_form, b_alert))
        {
            this.emailSetColorValid();
        }
        else
        {
            this.emailSetColorError();
        }

    } // onChangeInputName

    // User changed the value of the input element remark
    onChangeInputRemark()
    {
        var remark_form = this.remarkFromForm();

        if (remark_form.trim().length == 0)
        {
            return;
        }

        var b_alert = false;

        if (ReservationData.checkRemark(remark_form, b_alert))
        {
            this.remarkSetColorValid();
        }
        else
        {
            this.remarkSetColorError();
        }

    } // onChangeInputRemark

    // User klickt the button info remark
    static infoName()
    {

    } // infoName

    // User klickt the button info remark
    static infoEmail()
    {

    } // infoEmail

    // User klickt the button info remark
    static infoRemark()
    {

    } // infoRemark

    // User klickt the button info remark
    static infoOpenReservation()
    {

    } // infoOpenReservation

    ///////////////////////////////////////////////////////////////////////////
    /////// End Event Functions ///////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    /////// Start Get Check Form Data /////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Sets the text valid color (black) for name
    nameSetColorValid()
    {
        var name_el = this.m_id_el.getElementInputName();

        name_el.style.color = 'black';

    } // nameSetColorValid

    // Sets the text error color (red) for name
    nameSetColorError()
    {
        var name_el = this.m_id_el.getElementInputName();

        name_el.style.color = 'red';

    } // nameSetColorError

    // Sets the text valid color (black) for email
    emailSetColorValid()
    {
        var email_el = this.m_id_el.getElementInputEmail();

        email_el.style.color = 'black';

    } // emailSetColorValid

    // Sets the text error color (red)for email
    emailSetColorError()
    {
        var email_el = this.m_id_el.getElementInputEmail();

        email_el.style.color = 'red';

    } // emailSetColorError

    // Sets the text valid color (black) for remark
    remarkSetColorValid()
    {
        var remark_el = this.m_id_el.getElementInputRemark();

        remark_el.style.color = 'black';

    } // remarkSetColorValid

    // Sets the text error color (red)for remark
    remarkSetColorError()
    {
        var remark_el = this.m_id_el.getElementInputRemark();

        remark_el.style.color = 'red';

    } // remarkSetColorError

    // Returns true if the data is valid
    // Please note that this check will be done also when data is set 
    // in ReservationData.
    checkInputData(i_name, i_email, i_remark, i_event_number)
    {
        var b_valid = true;

        var b_alert = true;

        if (ReservationData.nameAndEmailAreEmpty(i_name, i_email, b_alert))
        {
            b_valid = false;

            return b_valid;
        }

        if (ReservationData.nameIsEmpty(i_name, b_alert))
        {
            b_valid = false;
        }

        if (ReservationData.emailIsEmpty(i_email, b_alert))
        {
            b_valid = false;
        }

        if (!ReservationData.checkName(i_name, b_alert))
        {
            b_valid = false;
        }

        if (!ReservationData.checkEmail(i_email, b_alert))
        {
            b_valid = false;
        }

        if (!ReservationData.checkRemark(i_remark, b_alert))
        {
            b_valid = false;
        }

        if (!ReservationData.checkEventNumber(i_event_number, b_alert))
        {
            b_valid = false;
        }

        return b_valid;

    } // checkInputData

    // Returns the name from the form
    nameFromForm()
    {
        var name_el = this.m_id_el.getElementInputName();

        return name_el.value.trim();

    } // nameFromForm

    // Returns the email from the form
    emailFromForm()
    {
        var email_el = this.m_id_el.getElementInputEmail();

        return email_el.value.trim();
        
    } // emailFromForm

    // Returns the remark from the form
    remarkFromForm()
    {
        var remark_el = this.m_id_el.getElementInputRemark();

        return remark_el.value.trim();
        
    } // remarkFromForm

    // TODO Not used any more
    // Returns an array with three elements:
    // Name, email and remark
    // If values not are valid an empty array will be returned
    getAndCheckInputData()
    {
        var ret_reservation_data = [];

        var name_el = this.m_id_el.getElementInputName();

        var email_el = this.m_id_el.getElementInputEmail();

        var remark_el = this.m_id_el.getElementInputRemark();

        var reservation_name = name_el.value;


        var reservation_email = email_el.value;

        ret_input_array [2] = remark_el.value;

        if (!this.checkInputData(ret_input_array))
        {
            ret_input_array = [];
        }

        return ret_reservation_data;

    } // getAndCheckInputData

    ///////////////////////////////////////////////////////////////////////////
    /////// End Get Check Form Data ///////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    /////// Start Div Content Html Code ///////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Sets the content of the header div
    contentHeader()
    {
        var header_content_str = this.m_texts.getHeaderText();

        var header_el = this.m_id_el.getElementDivHeader();

        header_el.setAttribute('style', this.m_styles.getRow() +  this.m_styles.getHeader());

        header_el.innerHTML = header_content_str;

    } // contentHeader

    // Sets the content of the label name div
    contentLabelName()
    {
        var label_name_content_str = this.m_texts.getLabelName();

        var label_name_el = this.m_id_el.getElementDivLabelName();

        label_name_el.setAttribute('style', this.m_styles.getRow() +  this.m_styles.getLabelName());

        label_name_el.innerHTML = label_name_content_str;

    } // contentLabelName

    // Sets the content of the label email div
    contentLabelEmail()
    {
        var label_email_content_str = this.m_texts.getLabelEmail();

        var label_email_el = this.m_id_el.getElementDivLabelEmail();

        label_email_el.setAttribute('style', this.m_styles.getRow() +  this.m_styles.getLabelEmail());

        label_email_el.innerHTML = label_email_content_str;

    } // contentLabelEmail

    // Sets the content of the label remark div
    contentLabelRemark()
    {
        var label_remark_content_str = this.m_texts.getLabelRemark();

        var label_remark_el = this.m_id_el.getElementDivLabelRemark();

        label_remark_el.setAttribute('style', this.m_styles.getRow() +  this.m_styles.getLabelRemark());

        label_remark_el.innerHTML = label_remark_content_str;

    } // contentLabelRemark

    // Sets the content of the dropdown div
    // 1. Set the style of the div container for the dropdown
    //    Call of the HTML element function setAttibute
    // 2. Create the the object EventProgramDropdown (m_event_dropdown_el)
    // 3. Set the date format for the season program dropdown
    //    Call of InputEventReservation.dropdownSetDateFormatToIsoReverse
    // 4. Set the season program dropdown append to 'empty' 
    //    The append string is used for the adding of an event and can for
    //    instane have the value 'Konzert zufügen'. Not applicale here
    //    Call of InputEventReservation.dropdownSetAppendString
    // 5. Set the function name for the dropdown 'onchange'
    //    This cannot be a member function of this class. It has to
    //    be a 'global' function. Here globalOnChangeEventProgramDropdown
    //    Call of InputEventReservation.dropdownSetOnchangeFunctionName
    // 6. Construct the code for the dropdown and add to the container element
    //    Call of InputEventReservation.dropdownCreate
    // 7. Set the event number (that will be the first item of the dropdown)
    //    Call of InputEventReservation.setEventNumber
    contentDropdown()
    {
        this.debug('InputEventReservation.contentDropdown Enter');

        var dropdown_el = this.m_id_el.getElementDivDropdown();

        dropdown_el.setAttribute('style', this.m_styles.getRow() +  this.m_styles.getLabelRemark());

        this.m_event_dropdown_el = new EventProgramDropdown(this.m_id_el.getIdDropdown(), 
                                this.m_id_el.getIdDivDropdown(), this.m_event_program_xml);


        this.dropdownSetDateFormatToIsoReverse();

        this.dropdownSetAppendString('');

        //QQ this.dropdownSetOnchangeFunctionName("globalOnChangeEventProgramDropdown");

        this.dropdownSetOnchangeFunctionName(this.getGlobalVariableNameThisObject() + '.onChangeEventProgramDropdown');

        this.dropdownCreate();

        this.setEventNumber();

        this.debug('InputEventReservation.contentDropdown Exit');
        
    } // contentDropdown

    contentEventName()
    {
        var event_number = this.getEventNumber();

        var event_name = this.m_event_program_xml.getEventName(event_number);

        var event_name_el = this.m_id_el.getElementDivEventName();

        event_name_el.innerHTML = event_name;

        event_name_el.setAttribute('style', this.m_styles.getEventName());

    } // contentEventName

    contentPrices()
    {
        var event_number = this.getEventNumber();

        var event_prices = this.m_event_program_xml.getPrices(event_number);

        event_prices = UtilString.rowEndsWindowsToHtml(event_prices);

        var event_prices_el = this.m_id_el.getElementDivPrices();

        event_prices_el.innerHTML = event_prices;

    } // contentPrices

    contentInstructions()
    {
        var event_number = this.getEventNumber();

        var event_instructions = this.m_event_program_xml.getInstructions(event_number);

        event_instructions = UtilString.rowEndsWindowsToHtml(event_instructions);

        var event_instructions_el = this.m_id_el.getElementDivInstructions();

        event_instructions_el.innerHTML = event_instructions;

    } // contentInstructions

    contentButtonOpenReservation()
    {
        var button_div_el = this.m_id_el.getElementDivButton();

        var button_html = '';

        button_html = button_html + '<button ';

        button_html = button_html + 'id= ' + this.m_id_el.getIdButton() + ' ';

        button_html = button_html + 'onclick= ' + this.m_open_make_reservation_function_name + ' ';

        button_html = button_html + '>';

        button_html = button_html + this.m_texts.getCaptionButtonOpenReservation();

        button_html = button_html + '</button>';


        button_div_el.innerHTML = button_html;

        var button_el = this.m_id_el.getElementButton();

        button_el.setAttribute('style', this.m_styles.getButtonOpenReservationStyle());

    } // contentButtonOpenReservation

    // Sets the content of the name div container
    // 1. Get the div element. Call of m_id_el.getElementDivName()
    // 2. Construct the HTML code for an <input> element
    //    Call m_id_el.getIdInputName()
    // 3. Create the input element by adding the HTML code for the <input> element
    //    Set the HTML code with the container element function innerHTML
    // 4. Add an onchange event function to the <inpit> element
    //    Call of m_id_el.getElementInputName. 
    //    Set function name to g_input_event_reservation.onChangeInputName()
    //    (this.onChangeInputName() is not allowed)
    // 5. Get the name from the local storage and set the value of the <input> element
    //    Call of Reservation.getName set with member function value for <input> element
    contentInputName(i_data_storage)
    {
        var name_div_el = this.m_id_el.getElementDivName();

        var name_html = '';

        name_html = name_html + '<input ';

        name_html = name_html + 'id= ' + this.m_id_el.getIdInputName() + ' ';

        name_html = name_html + 'type= "text"  size="27" maxlength="40" ';

        name_html = name_html + '>';

        name_div_el.innerHTML = name_html;

        var name_el = this.m_id_el.getElementInputName();

        name_el.oninput = function() { g_input_event_reservation.onChangeInputName(); };

        var name_storage = i_data_storage.getName();

        name_el.value = name_storage;

    } // contentInputName

    // Sets the content of the email div container
    // Please refer to the description of contentInputName
    contentInputEmail(i_data_storage)
    {
        var name_div_el = this.m_id_el.getElementDivEmail();

        var name_html = '';

        name_html = name_html + '<input ';

        name_html = name_html + 'id= ' + this.m_id_el.getIdInputEmail() + ' ';

        name_html = name_html + 'type= "text"  size="27" maxlength="40" ';

        name_html = name_html + '>';

        name_div_el.innerHTML = name_html;

        var email_el = this.m_id_el.getElementInputEmail();

        email_el.oninput = function() { g_input_event_reservation.onChangeInputEmail(); };

        var email_storage = i_data_storage.getEmail();

        email_el.value = email_storage;    

    } // contentInputEmail

    // Sets the content of the remark div container
    // Please refer to the description of contentInputName
    contentInputRemark(i_data_storage)
    {
        var name_div_el = this.m_id_el.getElementDivRemark();

        var name_html = '';

        name_html = name_html + '<input ';

        name_html = name_html + 'id= ' + this.m_id_el.getIdInputRemark() + ' ';

        name_html = name_html + 'type= "text"  size="27" maxlength="150" ';

        name_html = name_html + '>';

        name_div_el.innerHTML = name_html;

        var remark_el = this.m_id_el.getElementInputRemark();

        remark_el.oninput = function() { g_input_event_reservation.onChangeInputRemark(); };

        var remark_storage = i_data_storage.getRemark();

        remark_el.value = remark_storage;    

    } // contentInputRemark

    contentButtonInfoName()
    {
        var button_name_div_el = this.m_id_el.getElementDivInfoName();

        var button_name_html = '';

        button_name_html = button_name_html + '<button ';

        button_name_html = button_name_html + 'id= ' + this.m_id_el.getIdButtonInfoName() + ' ';

        button_name_html = button_name_html + 'onclick= "InputEventReservation.infoName()" ';

        button_name_html = button_name_html + '>';

        button_name_html = button_name_html + 'Info'; 

        button_name_html = button_name_html + '</button>';


        button_name_div_el.innerHTML = button_name_html;

        var button_name_el = this.m_id_el.getElementButtonInfoName();

        button_name_el.setAttribute('style', this.m_styles.getButtonInfoStyle());

    } // contentButtonInfoName

    contentButtonInfoEmail()
    {
        var button_email_div_el = this.m_id_el.getElementDivInfoEmail();

        var button_email_html = '';

        button_email_html = button_email_html + '<button ';

        button_email_html = button_email_html + 'id= ' + this.m_id_el.getIdButtonInfoEmail() + ' ';

        button_email_html = button_email_html + 'onclick= "InputEventReservation.infoEmail()" ';

        button_email_html = button_email_html + '>';

        button_email_html = button_email_html + 'Info'; 

        button_email_html = button_email_html + '</button>';


        button_email_div_el.innerHTML = button_email_html;

        var button_email_el = this.m_id_el.getElementButtonInfoEmail();

        button_email_el.setAttribute('style', this.m_styles.getButtonInfoStyle());

    } // contentButtonInfoEmail

    contentButtonInfoRemark()
    {
        var button_remark_div_el = this.m_id_el.getElementDivInfoRemark();

        var button_remark_html = '';

        button_remark_html = button_remark_html + '<button ';

        button_remark_html = button_remark_html + 'id= ' + this.m_id_el.getIdButtonInfoRemark() + ' ';

        button_remark_html = button_remark_html + 'onclick= "InputEventReservation.infoRemark()" ';

        button_remark_html = button_remark_html + '>';

        button_remark_html = button_remark_html + 'Info'; 

        button_remark_html = button_remark_html + '</button>';


        button_remark_div_el.innerHTML = button_remark_html;

        var button_remark_el = this.m_id_el.getElementButtonInfoRemark();

        button_remark_el.setAttribute('style', this.m_styles.getButtonInfoStyle());

    } // contentButtonInfoRemark

    contentButtonInfoOpenReservation()
    {
        var button_reservation_div_el = this.m_id_el.getElementDivInfoButton(); 

        var button_reservation_html = '';

        button_reservation_html = button_reservation_html + '<button ';

        button_reservation_html = button_reservation_html + 'id= ' + this.m_id_el.getIdButtonInfoOpenReservation() + ' ';

        button_reservation_html = button_reservation_html + 'onclick= "InputEventReservation.infoOpenReservation()" ';

        button_reservation_html = button_reservation_html + '>';

        button_reservation_html = button_reservation_html + 'Info'; 

        button_reservation_html = button_reservation_html + '</button>';


        button_reservation_div_el.innerHTML = button_reservation_html;

        var button_reservation_el = this.m_id_el.getElementButtonInfoOpenReservation();

        button_reservation_el.setAttribute('style', this.m_styles.getButtonInfoStyle());

    } // contentButtonInfoOpenReservation

    ///////////////////////////////////////////////////////////////////////////
    /////// End Div Content Html Code /////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    /////// Start Set And Get Members /////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Returns the div container object
    getElementDivContainer()
    {
        return this.m_element_div_container;
    }

    // Returns true if the form has been created
    isFormCreated()
    {
        return this.m_form_created;

    } // isFormCreated

    // Sets the boolean flag form is created to true
    setFormCreatedToTrue()
    {
        this.m_form_created = true;

        this.m_id_el.setFormCreatedToTrue();

    } // setFormCreatedToTrue

    // Returns the event number
    getEventNumber()
    {
        return this.m_active_event_number;

    } // setEventNumber

    // Sets the event number that is equal to the selected item of the dropdown
    // TODO  Handle the case with 'Konzert zufügen' 
    setEventNumber()
    {
        var dropdown_el = this.dropdownGetSelectionElement();

        var dropdown_number = dropdown_el.value;

        this.m_active_event_number = dropdown_number;

    } // setEventNumber

    ///////////////////////////////////////////////////////////////////////////
    /////// End Set And Get Members ///////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    /////// Start Dropdown Set And Get Functions //////////////////////////////
    ///////////////////////////////////////////////////////////////////////////
    
    // Returns the dropdown selection element
    dropdownGetSelectionElement()
    {
        return this.m_event_dropdown_el.getSelectionElement();

    } // dropdownGetSelectionElement

    // Sets the title of this HTML element. The title can be a tool tip
    // In a desktop computer the title is displayed when the mouse is
    // over the HTML element
    dropdownSetTitle(i_title) 
    {
        this.m_event_dropdown_el.setTitle(i_title);

    } // dropdownSetTitle

    // Returns the date format for the dropdown
    dropdownGetDateFormat()
    {
        this.m_event_dropdown_el.getDateFormat();
        
    } // dropdownGetDateFormat

    // Set date format for the dropdown to ISO. Example: 2024-12-20   
    dropdownSetDateFormatToIso()
    {
        this.m_event_dropdown_el.setDateFormatToIso();

    } // dropdownSetDateFormatToIso

    // Set date format for the dropdown to reverse. Example: 10.12.2024   
    dropdownSetDateFormatToIsoReverse()
    {
        this.m_event_dropdown_el.setDateFormatToIsoReverse();

    } // dropdownSetDateFormatToIsoReverse

    // Set date format for the dropdown to swiss. Example: 20. Dezember 2024   
    dropdownSetDateFormatToSwiss()
    {
        this.m_event_dropdown_el.setDateFormatToSwiss();

    } // dropdownSetDateFormatToSwiss

    // Set flag that date and name shall be displayed in the dropdown
    dropdownDisplayDateAndNameInDropdown()
    {
        this.m_event_dropdown_el.displayDateAndNameInDropdown();

    } // dropdownDisplayDateAndNameInDropdown

    // Set flag that only name shall be displayed in the dropdown
    dropdownDisplayOnlyNameInDropdown()
    {
        this.m_event_dropdown_el.displayOnlyNameInDropdown();

    } // dropdownDisplayOnlyNameInDropdown

    // Sets the dropdown append string that is added to the dropdown name array
    dropdownSetAppendString(i_append_str)
    {
        this.m_event_dropdown_el.setAppendString(i_append_str);

    } // dropdownSetAppendString

    // Create the dropdown
    dropdownCreate()
    {
        this.m_event_dropdown_el.create();

    } // dropdownCreate

    // Sets the onchange function name. Only the name is input
    dropdownSetOnchangeFunctionName(i_onchange_function) 
    {
        this.m_event_dropdown_el.setOnchangeFunctionName(i_onchange_function);

    } // dropdownSetOnchangeFunctionName 

    ///////////////////////////////////////////////////////////////////////////
    /////// End Dropdown Set And Get Functions ////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    /////// Start Utility Functions ///////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    setElementDivContainer()
    {
        this.m_element_div_container = document.getElementById(this.m_id_div_container);

        if (null == this.m_element_div_container)
        {
            alert("InputEventReservation.setElementDivContainer There is no div container with id= " + this.m_id_div_container);
        }

    } // setElementDivContainer

    // Initialisation of local and session windows variables
    initStorageVariables()
    {
        ReservationStorage.initLocal();

        ReservationStorage.initSession();

    } // initStorageVariables

    // Writes debug to the console
    debug(i_msg_str)
    {
        if (!this.m_b_write_debug)
        {
            return;
        }

        console.log(i_msg_str);

        UtilServer.appendDebugFile(i_msg_str, 'ReservationLayout');

    } // debugReservationLayout

    ///////////////////////////////////////////////////////////////////////////
    /////// End Utility Functions /////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    /////// Start Display And Hide ////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Display the events dropdown
    displayDropdown()
    {
        this.m_b_display_dropdown = true;

        if (isFormCreated())
        {
            this.create();
        }

    } // displayDropdown

    // Hides the events dropdown
    hideDropdown()
    {
        this.m_b_display_dropdown = false;

        if (isFormCreated())
        {
            this.create();
        }

    } // hideDropdown

    ///////////////////////////////////////////////////////////////////////////
    /////// End Display And Hide //////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////


    ///////////////////////////////////////////////////////////////////////////
    /////// Start Construct Html Divisions Code ///////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Returns the HTML code for the divs of the input form
    getDivsHtml()
    {
        var ret_html_code = '';

        ret_html_code = ret_html_code + this.startFormTag();

        ret_html_code = ret_html_code + this.rowDivTag(this.m_id_el.getIdDivHeader(), '', ''); 

        ret_html_code = ret_html_code + this.rowDivTag(this.m_id_el.getIdDivDropdown(), '', ''); 

        ret_html_code = ret_html_code + this.rowDivTag(this.m_id_el.getIdDivEventName(), '', ''); 

        ret_html_code = ret_html_code + this.rowDivTag(this.m_id_el.getIdDivLabelName(), '', ''); 

        ret_html_code = ret_html_code + this.rowDivTag(this.m_id_el.getIdDivNameInfo(), this.m_id_el.getIdDivName(), this.m_id_el.getIdDivInfoName()); 

        ret_html_code = ret_html_code + this.rowDivTag(this.m_id_el.getIdDivLabelEmail(), '', ''); 

        ret_html_code = ret_html_code + this.rowDivTag(this.m_id_el.getIdDivEmailInfo(), this.m_id_el.getIdDivEmail(), this.m_id_el.getIdDivInfoEmail()); 

        ret_html_code = ret_html_code + this.rowDivTag(this.m_id_el.getIdDivLabelRemark(), '', ''); 

        ret_html_code = ret_html_code + this.rowDivTag(this.m_id_el.getIdDivRemarkInfo(), this.m_id_el.getIdDivRemark(), this.m_id_el.getIdDivInfoRemark()); 

        ret_html_code = ret_html_code + this.rowDivTag(this.m_id_el.getIdDivButtonInfo(), this.m_id_el.getIdDivButton(), this.m_id_el.getIdDivInfoButton()); 

        ret_html_code = ret_html_code + this.rowDivTag(this.m_id_el.getIdDivPrices(), '', ''); 

        ret_html_code = ret_html_code + this.rowDivTag(this.m_id_el.getIdDivInstructions(), '', ''); 

        ret_html_code = ret_html_code + this.endFormTag();

        return ret_html_code;

    } // getDivsHtml 

    // Returns start form div tag
    startFormTag()
    {
        var ret_start_tag = '';

        var n_tab = 1;

        var ret_start_tag = ret_start_tag + this.tab(n_tab);

        var ret_start_tag = ret_start_tag + '<div id= "' + this.m_id_el.getIdInputForm() + '" ';

        var style_with_width = this.m_input_form_style_str + 'width: ' + this.m_input_form_width;

        var ret_start_tag = ret_start_tag + ' style= "' + style_with_width + '" ';

        var ret_start_tag = ret_start_tag + '>' + this.endRow() + this.endRow();

        return ret_start_tag;

    } // startFormTag

    rowDivTag(i_id, i_id_left, i_id_right)
    {
        var ret_row_tag = '';

        var n_tab = 2;

        ret_row_tag = ret_row_tag + this.tab(n_tab);

        ret_row_tag = ret_row_tag + '<div id= "' + i_id + '" ';

        ret_row_tag = ret_row_tag + ' style= "' + this.m_div_row_style_str + '" ';

        ret_row_tag = ret_row_tag + '>' + this.endRow();

        if (i_id_left.length > 0 && i_id_right.length > 0)
        {
            ret_row_tag = ret_row_tag + this.innerDivTags(i_id_left, i_id_right)
        }

        ret_row_tag = ret_row_tag + this.endFormTag() + this.endRow() + this.endRow();

        return ret_row_tag;

    } // rowDivTag

    innerDivTags(i_id_left, i_id_right)
    {
        // this.
        var ret_inner_tags = '';

        var n_tab = 3;

        ret_inner_tags = ret_inner_tags + this.tab(n_tab);

        ret_inner_tags = ret_inner_tags + '<div id= "' + i_id_left + '" ';

        ret_inner_tags = ret_inner_tags + ' style= "' + this.m_element_left_style_str + '" ';

        ret_inner_tags = ret_inner_tags + '>' + this.endRow();

        ret_inner_tags = ret_inner_tags + this.endFormTag() + this.endRow();

        ret_inner_tags = ret_inner_tags + '<div id= "' + i_id_right + '" ';

        ret_inner_tags = ret_inner_tags + ' style= "' + this.m_element_right_style_str + '" ';

        ret_inner_tags = ret_inner_tags + '>' + this.endRow();

        ret_inner_tags = ret_inner_tags + this.endFormTag() + this.endRow();

        return ret_inner_tags;

    } // innerDivTags

    endFormTag()
    {
        return '</div> '
    }

    // returns end of row
    endRow()
    {

        if (!this.m_remove_tabs_comments)
        {
            return '\n';
        }
        else
        {
            alert("InputEventReservation.endRow m_remove_tabs_comments= true not yet implemented");

            return '\n';
        }

        /*
        var ret_end_str = '';

        // this.m_current_accumulated_text_length = this.m_current_accumulated_text_length;

        if (i_text)

        return ret_end_str;
        */

    } // endRow

    // Returns tabs as spaces
    tab(i_n_tab)
    {
        var ret_tab_str = '';

        if (this.m_remove_tabs_comments)
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

    ///////////////////////////////////////////////////////////////////////////
    /////// End Construct Html Divisions Code /////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////


} // InputEventReservation
