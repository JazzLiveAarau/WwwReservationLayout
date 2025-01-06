// File: JazzButton.js
// Date: 2023-05-08
// Author: Gunnar Lidén

// File content
// =============
//
// Class JazzButton

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Control Button ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// // Class that creates a button control
class JazzButton 
{
    // Creates the instance of the class
    constructor(i_id_button, i_id_div_container) 
    {
        // Member variables
        // ================

        // The identity of the button control
        this.m_id_button = i_id_button;

        // The identity of the container for the button control
        this.m_id_div_container = i_id_div_container;

        // The container element for the button control
        this.m_el_div_container = null;

        // The class for the button control
        this.m_class = '';

        // The onclick function name. Only the name is input
        this.m_onclick_function = '';

        // The caption for the button
        this.m_caption = '';

        // The width of the button
        this.m_width = '';

        // Label text
        this.m_label_text = '';

        // Label position relative the text box
        // left: Left of box right: Right of box above: Above box
        // Default is left of the text box
        this.m_label_text_position = 'left'; 

        // The title attribute specifies extra information about an element.
        // The information is most often shown as a tooltip text when the mouse 
        // moves over the element.
        this.m_title = '';

        // Inner elements of start input m_el_div_container
        this.m_div_container_inner_html_start = "";
        
        // Initialization
        // ==============

        this.setDivContainerElement();

        this.setDivInnerHtmlStartElements();

        this.setControl();

    } // constructor

    // Set div inner elements if already existing at start
    // Criterion is that '<input' or '<button' is contained in the string 
    // TODO add more elements
    setDivInnerHtmlStartElements()
    {
        var inner_html_start = this.m_el_div_container.innerHTML;

        if (inner_html_start.length > 0)
        {
            var index_input = inner_html_start.indexOf("<input");

            var index_button = inner_html_start.indexOf("<button");

            if (index_input >= 0 || index_button >= 0)
            {
                this.m_div_container_inner_html_start = inner_html_start;
            } // div is set with <input> and/or <button> elements

        } // div is set with something ...

    } // setDivInnerHtmlStartElements

    // Set functions for the layout member variables
    // =============================================

    // Sets the class for the button control 
    // There will be no class attribute if this function not is called
    setClass(i_class) 
    {
      this.m_class = i_class;

      this.setControl();

    } // setClass

    // Sets the caption for the button control 
    // There will be no caption if this function not is called
    setCaption(i_caption) 
    {
      this.m_caption = i_caption;

      this.setControl();

    } // setCaption    

    // Sets the width of a button
    setWidth(i_width)
    {
        this.m_width = i_width;

        this.setControl();

    } // setWidth

    // Sets the label text for the button
    // There will be no label if the text not is set
    setLabelText(i_label_text) 
    {
      this.m_label_text = i_label_text;

      this.setControl();

    } // setLabelText    

    // Sets the label text to the left of the button
    setLabelTextPositionLeft(i_label_text) 
    {
        this.m_label_text_position = 'left'; 

        this.setControl();

    } // setLabelTextPositionLeft

    // Sets the label text to the right of the button
    setLabelTextPositionRight() 
    {
        this.m_label_text_position = 'right'; 

        this.setControl();

    } // setLabelTextPositionRight
    
    // Sets the label text above the text box
    setLabelTextPositionAbove() 
    {
        this.m_label_text_position = 'above'; 

        this.setControl();

    } // setLabelTextPositionAbove    
     // Sets the title of this HTML element. The title can be a tool tip
    // In a desktop computer the title is displayed when the mouse is
    // over the HTML element
    setTitle(i_title) 
    {
        this.m_title = i_title; 

        this.setControl();

    } // setTitle
    
    // Sets the div element container
    setDivContainerElement()
    {
        this.m_el_div_container = document.getElementById(this.m_id_div_container);

    } // setDivContainerElement

    // Returns the button element
    getButtonElement()
    {
        return document.getElementById(this.m_id_button);

    } // getButtonElement

    // Hide the button
    hideButton()
    {
        this.getButtonElement().style.display = 'none';

    } // hideButton

 
    // Display the button
    showButton()
    {
        this.getButtonElement().style.display = 'block';

    } // showButton   

    // Sets the onchange function name. Only the name is input
    setOnclickFunctionName(i_onclick_function) 
    {
      this.m_onclick_function = i_onclick_function;

      this.setControl();

    } // setOnchangeFunctionName     

    // Checks
    checkContainerElement()
    {
        var ret_b_check = true;

        if (null == this.m_el_div_container)
        {
            alert("JazzButton error: HTML element with id= " + this.m_id_div_container + " does not exist.");

            ret_b_check = false;
        }   
        
        return ret_b_check;

    } // checkContainerElement

    // Sets the control
    // Append if input div already had elements
    setControl()
    {
        if (!this.checkContainerElement())
        {
            return;
        }

        var html_str = this.getHtmlString();

        if (this.m_div_container_inner_html_start.length > 0)
        {

            var appended_html = this.m_div_container_inner_html_start + html_str;

            this.m_el_div_container.innerHTML = appended_html;
        }
        else
        {
            this.m_el_div_container.innerHTML = html_str;
        }       

    } // setControl
        
    // Returns the string that defines the HTML button string
    // <button id="id_button" class="cl_button" onclick= "eventXyz" title="Tip ...">Click me</button>  
    getHtmlString()
    {
        var ret_html_str = '';

        if (this.m_label_text.length > 0 && this.m_label_text_position == 'left')
        {
            ret_html_str = ret_html_str + 
                getHtmlElementLabelString(this.m_label_text, this.m_id_button, this.m_title);
        }

        if (this.m_label_text.length > 0 && this.m_label_text_position == 'above')
        {
            ret_html_str = ret_html_str + 
                getHtmlElementLabelString(this.m_label_text, this.m_id_button, this.m_title) + '<br>';
        }

        ret_html_str = ret_html_str +  '<button  id="' + this.m_id_button + '" ';

        if (this.m_class.length > 0)
        {
            ret_html_str = ret_html_str + ' class="' + this.m_class + '" ';
        }

        if (this.m_onclick_function.length > 0)
        {
            ret_html_str = ret_html_str + ' onclick="' + this.m_onclick_function + '()" ';
        }

        if (this.m_width.length > 0)
        {
            ret_html_str = ret_html_str + '  style="width:' + this.m_width + '" ';
        }

        if (this.m_title.length > 0)
        {
            ret_html_str = ret_html_str + ' title="' + this.m_title + '" ';
        }

        ret_html_str = ret_html_str + '>'; 

        if (this.m_caption.length > 0)
        {
            ret_html_str = ret_html_str + this.m_caption;
        }

        // this.m_width
        
        ret_html_str = ret_html_str + '</button>'; 

        if (this.m_label_text.length > 0 && this.m_label_text_position == 'right')
        {
            ret_html_str = ret_html_str + 
                getHtmlElementLabelString(this.m_label_text, this.m_id_button, this.m_title);
        }

        return ret_html_str;

    } // getHtmlString

} // JazzButton

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Control Button //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// File: JazzTextBox.js
// Date: 2024-02-04
// Author: Gunnar Lidén

// File content
// =============
//
// Class JazzTextBox

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Control Text Box //////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Class that creates a text box
// The code that will be generated is 
// <label for="id_text_box">Label text</label>
// <input type="text" id="id_text_box" value="My remark" size="20" maxlength="30" oninput="myFunction()" title="Tip ...">  
// Compulsary input is the identity of the text box and the container 
// (normally a <div> element), where the text box shall be placed 
// Here is a sample how an object of the class can be created:
// var remark_text_box = new JazzTextBox("id_remark_text_box", "i_id_container")
class JazzTextBox 
{
    // Function that is executed when an object of this class is created
    constructor(i_id_text_box, i_id_div_container) 
    {
        // Member variables
        // ================

        // The identity of the text box
        this.m_id_text_box = i_id_text_box;

        // The identity of the container for the text box
        this.m_id_div_container = i_id_div_container;

        // The container element for the text box
        this.m_el_div_container = null;

        // The class for the text box
        this.m_class = '';
    
        // The value of the text box
        this.m_value = '';

        // Placeholder text (instructions what to write)
        this.m_placeholder_text = '';

        // Input type. For this class may 'number' and 'tel' also be applicable
        // In telephones the number keyboard will be invoked for these types
        this.m_input_type = 'text';

        // For type number the minimum number e.g. 0
        this.m_number_min = '';

        // For type number the maximum number e.g. 9
        this.m_number_max = '';

        // The oninput function name. Only the name is input
        this.m_oninput_function = '';

        // Flag telling if the text box shall be read only
        this.m_read_only_flag = false;        

        // Label text
        this.m_label_text = '';

        // Label position relative the text box
        // left: Left of box right: Right of box above: Above box
        // Default is left of the text box
        this.m_label_text_position = 'left'; 

        // Size of the text box. Size is the number of characters
        // If size not is set there will be no attribute size= "20"
        // Then the default value for the browser application will be the size
        this.m_text_box_size = '';

        // Maximum length (number of characters) of the input string 
        // If the maximum length not is defined there will be no attribute maxlength= "30"
        // Then the default value for the browser application will be the maximum length
        this.m_maxlength = '';

        // The title attribute specifies extra information about an element.
        // The information is most often shown as a tooltip text when the mouse 
        // moves over the element.
        this.m_title = '';

        // Inner elements of start input m_el_div_container
        this.m_div_container_inner_html_start = "";

        // Initialization
        // ==============        

        this.setDivContainerElement();

        this.setDivInnerHtmlStartElements();

        this.setControl();

    } // constructor

    // Set div inner elements if already existing at start
    // Criterion is that '<input' or '<button' is contained in the string 
    // TODO add more elements
    setDivInnerHtmlStartElements()
    {
        var inner_html_start = this.m_el_div_container.innerHTML;

        if (inner_html_start.length > 0)
        {
            var index_input = inner_html_start.indexOf("<input");

            var index_button = inner_html_start.indexOf("<button");

            if (index_input >= 0 || index_button >= 0)
            {
                this.m_div_container_inner_html_start = inner_html_start;
            } // div is set with <input> and/or <button> elements

        } // div is set with something ...

    } // setDivInnerHtmlStartElements

    // Set and get functions
    // =====================

    // Sets the value for the text box 
    setValue(i_value) 
    {
      this.m_value = i_value;

      var element_html = this.getHtmlElement();

      element_html.value = this.m_value;

      // Not necessary this.setControl();

    } // setValue

    // Returns the value of the text box
    getValue()
    {
        var element_html = this.getHtmlElement();

        var value = element_html.value;

        this.setValue(value);

        return this.m_value;

    } // getValue    

    // Set placeholder text (instructions what to write)
    setPlaceholderText(i_placeholder_text)
    {
        this.m_placeholder_text = i_placeholder_text;

        this.setControl();

    } // setPlaceholderText

    // Set focus
    setFocus()
    {
        var element_html = this.getHtmlElement();

        if (null != element_html)
        {
            element_html.focus();
        }

    } // setFocus

    // Lose focus
    loseFocus()
    {
        var element_html = this.getHtmlElement();

        if (null != element_html)
        {
            element_html.blur();
        }

    } // loseFocus
    
    // Set functions for the layout member variables
    // =============================================

    // Set the oninput function name. Only the name is input
    setOninputFunctionName(i_oninput_function)
    {
        this.m_oninput_function = i_oninput_function;

        this.setControl();

    } // setOninputFunctionName

    // Sets the class for the text box 
    // There will be no class attribute if this function not is called
    setClass(i_class) 
    {
      this.m_class = i_class;

      this.setControl();

    } // setClass

    // Sets the label text for the text box 
    // There will be no label if the text not is set
    setLabelText(i_label_text) 
    {
      this.m_label_text = i_label_text;

      this.setControl();

    } // setLabelText    

    // Sets the label text to the left of the text box
    setLabelTextPositionLeft(i_label_text) 
    {
        this.m_label_text_position = 'left'; 

        this.setControl();

    } // setLabelTextPositionLeft

    // Sets the label text to the right of the text box
    setLabelTextPositionRight() 
    {
        this.m_label_text_position = 'right'; 

        this.setControl();

    } // setLabelTextPositionRight
    
    // Sets the label text above the text box
    setLabelTextPositionAbove() 
    {
        this.m_label_text_position = 'above'; 

        this.setControl();

    } // setLabelTextPositionAbove
    
    // Sets the text box size. The size is the number of characters
    setSize(i_text_box_size) 
    {
        this.m_text_box_size = i_text_box_size;
        
        this.setControl();

    } // setSize

    // Sets the maximum length of the input string. 
    // The maximum length value is the number of characters
    setMaxlength(i_maxlength) 
    {
        this.m_maxlength = i_maxlength; 

        this.setControl();

    } // setMaxlength

    // Set read only flag to false or true
    setReadOnlyFlag(i_read_only_flag)
    {
        this.m_read_only_flag = i_read_only_flag; 

        this.setControl();

    } // setReadOnlyFlag

    // Set input type to text (default in this class)
    setInputTypeToText()
    {
        this.m_input_type = 'text';

    } // setInputTypeToText

    // Set input type to number. Can be used to invoke number keyboards in telephones
    setInputTypeToNumber()
    {
        this.m_input_type = 'number';

    } // setInputTypeToNumber

    // For type number set the minimum number e.g. 0
    setNumberMin(i_number_min)
    {
        this.m_number_min = i_number_min;
     
    } // setNumberMin

    // For type number set the maximum number e.g. 9
    setNumberMax(i_number_max)
    {
        this.m_number_max = i_number_max;  

    } // setNumberMax

    // Set input type to telephone. Can be used to invoke number keyboards in telephones
    setInputTypeToTelephone()
    {
        this.m_input_type = 'tel';

    } // setInputTypeToTelephone

    // Sets the title of this HTML element. The title can be a tool tip
    // In a desktop computer the title is displayed when the mouse is
    // over the HTML element
    setTitle(i_title) 
    {
        this.m_title = i_title; 

        this.setControl();

    } // setTitle

    // Utility functions
    // =================

    // Sets the div element container
    setDivContainerElement()
    {
        this.m_el_div_container = document.getElementById(this.m_id_div_container);

    } // setDivContainerElement

    // Checks
    checkContainerElement()
    {
        var ret_b_check = true;

        if (null == this.m_el_div_container)
        {
            alert("JazzTextBox error: HTML element with id= " + this.m_id_div_container + " does not exist.");

            ret_b_check = false;
        }   
        
        return ret_b_check;

    } // checkContainerElement

    // Sets the control
    // Append if the input div element had elements
    setControl()
    {
        if (!this.checkContainerElement())
        {
            return;
        }

        var html_str = this.getHtmlString();


        if (this.m_div_container_inner_html_start.length > 0)
        {

            var appended_html = this.m_div_container_inner_html_start + html_str;

            this.m_el_div_container.innerHTML = appended_html;
        }
        else
        {
            this.m_el_div_container.innerHTML = html_str;
        }       

    } // setControl

    // Returns the HTML text box element 
    getHtmlElement()
    {
        return document.getElementById(this.m_id_text_box);

    } // getHtmlElement

    // Returns the string that defines the HTML text box string
    // <input type="text" id="id_text_box" value="My remark" size="20" maxlength="30" title="Tip ...">  
    getHtmlString()
    {
        var ret_html_str = '';

        if (this.m_label_text.length > 0 && this.m_label_text_position == 'left')
        {
            ret_html_str = ret_html_str + 
                getHtmlElementLabelString(this.m_label_text, this.m_id_text_box, this.m_title);
        }

        if (this.m_label_text.length > 0 && this.m_label_text_position == 'above')
        {
            ret_html_str = ret_html_str + 
                getHtmlElementLabelString(this.m_label_text, this.m_id_text_box, this.m_title) + '<br>';
        }

        ret_html_str = ret_html_str + '<input type="' + this.m_input_type + '" id="' + this.m_id_text_box + '" ';

        if (this.m_class.length > 0)
        {
            ret_html_str = ret_html_str + ' class="' + this.m_class + '" ';
        }        

        ret_html_str = ret_html_str + ' value= "' + this.m_value + '" ';

        if (this.m_text_box_size.length > 0)
        {
            ret_html_str = ret_html_str + ' size="' + this.m_text_box_size + '" ';
        }

        if (this.m_number_min.length > 0)
        {
            ret_html_str = ret_html_str + ' min="' + this.m_number_min + '" ';
        }

        if (this.m_number_max.length > 0)
        {
            ret_html_str = ret_html_str + ' max="' + this.m_number_max + '" ';
        }

        if (this.m_maxlength.length > 0)
        {
            ret_html_str = ret_html_str + ' maxlength="' + this.m_maxlength + '" ';
        }
        if ( this.m_placeholder_text.length > 0)
        {
            ret_html_str = ret_html_str + ' placeholder="' + this.m_placeholder_text + '" ';
        }

        if (this.m_oninput_function.length > 0)
        {
            ret_html_str = ret_html_str + ' oninput="' + this.m_oninput_function + '()" ';
        }

        if (this.m_title.length > 0)
        {
            ret_html_str = ret_html_str + ' title="' + this.m_title + '" ';
        }

        if (this.m_read_only_flag)
        {
            ret_html_str = ret_html_str + ' readonly';
        }

        ret_html_str = ret_html_str + '>';

        if (this.m_label_text.length > 0 && this.m_label_text_position == 'right')
        {
            ret_html_str = ret_html_str + 
                getHtmlElementLabelString(this.m_label_text, this.m_id_text_box, this.m_title);
        }

        return ret_html_str;

    } // getHtmlString

} // JazzTextBox

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Control Text Box ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
// File: JazzControlCheckBox.js
// Date: 2021-05-11
// Author: Gunnar Lidén

// Inhalt
// =============
//
// Class for the standard control: Check box
//
// Reference: https://www.w3schools.com/js/js_classes.asp
//            https://www.w3schools.com/tags/att_input_type_checkbox.asp

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Control check box //////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Class that creates a check box
// The code that will be generated is 
// <label for="id_check_box">Label text</label>
// <input type="checkbox" id="id_check_box" value="NotUsed" name="NotUsed" oninput="myFunction()" title="Tip ...">  
// Compulsary input is the identity of the check box and the container 
// (normally a <div> element), where the check box shall be placed 
// Here is a sample how an object of the class can be created:
// var my_check_box = new JazzCheckBox("id_check_box", "i_id_container")
class JazzCheckBox 
{
    // Function that is executed when an object of this class is created
    constructor(i_id_check_box, i_id_div_container) 
    {
        // Member variables
        // ================

        // The identity of the check box
        this.m_id_check_box = i_id_check_box;

        // The identity of the container for the check box
        this.m_id_div_container = i_id_div_container;

        // The container element for the check box
        this.m_el_div_container = null;

        // The class for the check box
        this.m_class = '';
    
        // The name of the check box
        this.m_name = '';

        // The value of the check box
        this.m_value = '';

        // The oninput function name. Only the name is input
        this.m_oninput_function = '';     

        // Label text
        this.m_label_text = '';

        // Label position relative the check box
        // left: Left of box right: Right of box above: Above box
        // Default is left of the check box
        this.m_label_text_position = 'left'; 

        // The title attribute specifies extra information about an element.
        // The information is most often shown as a tooltip text when the mouse 
        // moves over the element.
        this.m_title = '';

        // Initialization
        // ==============        

        this.setDivContainerElement();

        this.setControl();

    } // constructor

    // Set and get functions
    // =====================


    // Sets the checkbox to checked or unchecked
    // Input is a string with the values TRUE or FALSE
    setCheck(i_check)
    {
        var element_html = this.getHtmlElement();

        if (i_check == "TRUE")
        {
            element_html.checked = true;
        }
        else if (i_check == "FALSE")
        {
            element_html.checked = false;
        }
        else
        {
            alert("JazzCheckBox.setCheck Input string " + i_check + " is not TRUE or FALSE");
        } 

    } // setCheck

    // Gets the checkbox state checked or unchecked
    // Output is a string with the values TRUE or FALSE
    getCheck()
    {
        var element_html = this.getHtmlElement();
        
        if( element_html.checked == true)
        {
            return "TRUE";
        }
        else
        {
            return "FALSE";
        }

    } // getCheck


    // Set functions for the PHP attributes 
    // =====================================

    // Sets the attribute name of the check box 
    setName(i_name) 
    {
      this.m_name = i_name;

      this.setControl();

    } // setName

    // Sets the attribute value of the check box 
    setValue(i_value) 
    {
      this.m_value = i_value;

      var element_html = this.getHtmlElement();

      this.setControl();

    } // setValue  
    
    // Set functions for the layout member variables
    // =============================================

    // Set the oninput function name. Only the name is input
    setOninputFunctionName(i_oninput_function)
    {
        this.m_oninput_function = i_oninput_function;

        this.setControl();

    } // setOninputFunctionName

    // Sets the class for the check box 
    // There will be no class attribute if this function not is called
    setClass(i_class) 
    {
      this.m_class = i_class;

      this.setControl();

    } // setClass

    // Sets the label text for the check box 
    // There will be no label if the text not is set
    setLabelText(i_label_text) 
    {
      this.m_label_text = i_label_text;

      this.setControl();

    } // setLabelText    

    // Sets the label text to the left of the check box
    setLabelTextPositionLeft(i_label_text) 
    {
        this.m_label_text_position = 'left'; 

        this.setControl();

    } // setLabelTextPositionLeft

    // Sets the label text to the right of the check box
    setLabelTextPositionRight() 
    {
        this.m_label_text_position = 'right'; 

        this.setControl();

    } // setLabelTextPositionRight
    
    // Sets the label text above the check box
    setLabelTextPositionAbove() 
    {
        this.m_label_text_position = 'above'; 

        this.setControl();

    } // setLabelTextPositionAbove

    // Sets the title of this HTML element. The title can be a tool tip
    // In a desktop computer the title is displayed when the mouse is
    // over the HTML element
    setTitle(i_title) 
    {
        this.m_title = i_title; 

        this.setControl();

    } // setTitle

    // Utility functions
    // =================

    // Sets the div element container
    setDivContainerElement()
    {
        this.m_el_div_container = document.getElementById(this.m_id_div_container);

    } // setDivContainerElement

    // Checks
    checkContainerElement()
    {
        var ret_b_check = true;

        if (null == this.m_el_div_container)
        {
            alert("JazzCheckBox error: HTML element with id= " + this.m_id_div_container + " does not exist.");

            ret_b_check = false;
        }   
        
        return ret_b_check;

    } // checkContainerElement

    // Sets the control
    setControl()
    {
        if (!this.checkContainerElement())
        {
            return;
        }

        var html_str = this.getHtmlString();

        this.m_el_div_container.innerHTML = html_str;

    } // setControl

    // Returns the HTML check box element 
    getHtmlElement()
    {
        return document.getElementById(this.m_id_check_box);

    } // getHtmlElement

    // Returns the string that defines the HTML check box string
    //<input type="checkbox" id="id_check_box" value="NotUsed" name="NotUsed" oninput="myFunction()" title="Tip ...">  
    getHtmlString()
    {
        var ret_html_str = '';

        if (this.m_label_text.length > 0 && this.m_label_text_position == 'left')
        {
            ret_html_str = ret_html_str + 
                getHtmlElementLabelString(this.m_label_text, this.m_id_check_box, this.m_title);
        }

        if (this.m_label_text.length > 0 && this.m_label_text_position == 'above')
        {
            ret_html_str = ret_html_str + 
                getHtmlElementLabelString(this.m_label_text, this.m_id_check_box, this.m_title) + '<br>';
        }

        ret_html_str = ret_html_str + '<input type="checkbox" id="' + this.m_id_check_box + '" ';

        if (this.m_class.length > 0)
        {
            ret_html_str = ret_html_str + ' class="' + this.m_class + '" ';
        }        

        //QQQ ret_html_str = ret_html_str + ' value= "' + this.m_value + '" ';

        if (this.m_value.length > 0)
        {
            ret_html_str = ret_html_str + ' value="' + this.m_text_box_size + '" ';
        }

        if (this.m_name.length > 0)
        {
            ret_html_str = ret_html_str + ' name="' + this.m_name + '" ';
        }

        if (this.m_oninput_function.length > 0)
        {
            ret_html_str = ret_html_str + ' oninput="' + this.m_oninput_function + '()" ';
        }

        if (this.m_title.length > 0)
        {
            ret_html_str = ret_html_str + ' title="' + this.m_title + '" ';
        }

        ret_html_str = ret_html_str + '>';

        if (this.m_label_text.length > 0 && this.m_label_text_position == 'right')
        {
            ret_html_str = ret_html_str + 
                getHtmlElementLabelString(this.m_label_text, this.m_id_check_box, this.m_title);
        }

        return ret_html_str;

    } // getHtmlString

} // JazzCheckBox

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Control check box ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////


// File: JazzDropdown.js
// Date: 2024-12-22
// Author: Gunnar Lidén

// Inhalt
// =============
//
// Class for standard dropdown 
//
// Reference: https://www.w3schools.com/js/js_classes.asp


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Control Dropdown //////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// // Class that creates a dropdown control
class JazzDropdown 
{
    // Creates the instance of the class
    constructor(i_id_drop_down, i_id_div_container) 
    {
        // Member variables
        // ================

        // The identity of the dropdown control
        this.m_id_drop_down = i_id_drop_down;

        // The identity of the container for the dropdown control
        this.m_id_div_container = i_id_div_container;

        // The container element for the dropdown control
        this.m_el_div_container = null;

        // The class for the dropdown control
        this.m_class = '';        

        // The input dropdown name array
        this.m_drop_down_name_array = [];

        // The corresponding number array
        this.m_drop_down_number_array = [];

        // Append string that is added to the dropdown name array
        this.m_append_str = '';

        // The onchange function name. Only the name is input
        this.m_onchange_function = '';

        // Label text
        this.m_label_text = '';

        // Label position relative the text box
        // left: Left of box right: Right of box above: Above box
        // Default is left of the text box
        this.m_label_text_position = 'left';         

        // The dropdown (select element) option number 
        this.m_select_option_number = -12345;

        // The title attribute specifies extra information about an element.
        // The information is most often shown as a tooltip text when the mouse 
        // moves over the element.
        this.m_title = '';        

        // Initialization
        // ==============

        this.setDivContainerElement();

        this.setControl();        
    
    } // constructor

    // Set and get functions
    // ======================

    // Sets the member variable and also the the dropdown element
    setSelectOptionNumber(i_select_option_number) 
    {

        this.m_select_option_number = i_select_option_number;

        var element_dropdown = this.getSelectionElement();

        element_dropdown.value = this.m_select_option_number;

    } // setSelectOptionNumber

   // Gets the select option number from the dropdown (select) element.
   // (Also the member variable m_select_option_number is set)
   getSelectOptionNumber() 
   {
        var element_dropdown = this.getSelectionElement();
        
        this.m_select_option_number =  element_dropdown.value;

        return this.m_select_option_number;

   } // setSelectOptionNumber
   
   // Returns true if the selected option number is for the append item
   selectedOptionNumberIsAppendItem(i_select_option_number)
   {
       var b_append = false;

       if (this.m_append_str.length == 0)
       {
           return b_append;
       }

       var name_array_input_length = this.m_drop_down_name_array.length;

       if (i_select_option_number == name_array_input_length + 1)
       {
            b_append = true;
       }
    
       return b_append;

   } // selectedOptionNumberIsAppendItem
        
    // Set functions for the layout member variables
    // =============================================

    // Sets the class for the dropdown control 
    // There will be no class attribute if this function not is called
    setClass(i_class) 
    {
      this.m_class = i_class;

      this.setControl();

    } // setClass

    // Sets the name array for the dropdown control 
    setNameArray(i_drop_down_name_array) 
    {
      this.m_drop_down_name_array = i_drop_down_name_array;

      this.setNumberArray();

      this.setControl();

    } // setNameArray

    // Sets the append string that is added to the dropdown name array
    setAppendString(i_append_str)
    {
        this.m_append_str = i_append_str;

        this.setControl();

    } // setAppendString

    // Sets the onchange function name. Only the name is input
    setOnchangeFunctionName(i_onchange_function) 
    {
      this.m_onchange_function = i_onchange_function;

      this.setControl();

    } // setOnchangeFunctionName 

    // Sets the label text for the dropdown control
    // There will be no label if the text not is set
    setLabelText(i_label_text) 
    {
      this.m_label_text = i_label_text;

      this.setControl();

    } // setLabelText    

    // Sets the label text to the left of the dropdown control
    setLabelTextPositionLeft(i_label_text) 
    {
        this.m_label_text_position = 'left'; 

        this.setControl();

    } // setLabelTextPositionLeft

    // Sets the label text to the right of the dropdown control
    setLabelTextPositionRight() 
    {
        this.m_label_text_position = 'right'; 

        this.setControl();

    } // setLabelTextPositionRight
    
    // Sets the label text above the text box
    setLabelTextPositionAbove() 
    {
        this.m_label_text_position = 'above'; 

        this.setControl();

    } // setLabelTextPositionAbove    
    // Sets the title of this HTML element. The title can be a tool tip
    // In a desktop computer the title is displayed when the mouse is
    // over the HTML element
    setTitle(i_title) 
    {
        this.m_title = i_title; 

        this.setControl();

    } // setTitle

    // Utility functions
    // =================

    // Sets the div element container
    setDivContainerElement()
    {
        this.m_el_div_container = document.getElementById(this.m_id_div_container);

    } // setDivContainerElement

    // Returns the selection element
    getSelectionElement()
    {
        return document.getElementById(this.m_id_drop_down);

    } // getSelectionElement

    // Checks
    checkContainerElement()
    {
        var ret_b_check = true;

        if (null == this.m_el_div_container)
        {
            alert("JazzDropdown error: HTML element with id= " + this.m_id_div_container + " does not exist.");

            ret_b_check = false;
        }   
        
        return ret_b_check;

    } // checkContainerElement

    // Sets the control
    setControl()
    {
        if (!this.checkContainerElement())
        {
            return;
        }

        var html_str = this.getHtmlString();

        this.m_el_div_container.innerHTML = html_str;        

    } // setControl
    
    // Sets the number array 
    setNumberArray()
    {
        this.m_drop_down_number_array = [];

        var array_number = 0;
        
        for (var index_name=0; index_name < this.m_drop_down_name_array.length; index_name++)
        {
            array_number = array_number + 1;

            this.m_drop_down_number_array[index_name] = array_number;
        }

    } // setNumberArray

    // Returns the string that defines the HTML dropdown string
    // <select id="id_drop_down" class="cl_drop_down" onchange= "eventNewTask" title="Tip ...">  
    // <option value="1" >A0001</option>
    // <option value="2" >A0002</option>    
    // </select>
    getHtmlString()
    {
        var ret_html_str = '';

        if (this.m_label_text.length > 0 && this.m_label_text_position == 'left')
        {
            ret_html_str = ret_html_str + 
                getHtmlElementLabelString(this.m_label_text, this.m_id_drop_down, this.m_title);
        }

        if (this.m_label_text.length > 0 && this.m_label_text_position == 'above')
        {
            ret_html_str = ret_html_str + 
                getHtmlElementLabelString(this.m_label_text, this.m_id_drop_down, this.m_title) + '<br>';
        }

        ret_html_str = ret_html_str +  '<select  id="' + this.m_id_drop_down + '" ';

        if (this.m_class.length > 0)
        {
            ret_html_str = ret_html_str + ' class="' + this.m_class + '" ';
        }

        if (this.m_onchange_function.length > 0)
        {
            ret_html_str = ret_html_str + ' onchange="' + this.m_onchange_function + '()" ';
        }

        if (this.m_title.length > 0)
        {
            ret_html_str = ret_html_str + ' title="' + this.m_title + '" ';
        }

        ret_html_str = ret_html_str + '>'; 

        var n_options = this.m_drop_down_name_array.length;

        if (this.m_append_str.length > 0)
        {
            n_options = n_options + 1;
        }

        for (var index_name=0; index_name < n_options; index_name++)
        {
            var current_name = '';

            var current_number_str = '';

            if (index_name < this.m_drop_down_name_array.length)
            {
                current_name = this.m_drop_down_name_array[index_name];

                current_number_str = this.m_drop_down_number_array[index_name].toString();
            }
            else
            {
                current_name = this.m_append_str;

                current_number_str = n_options.toString();
            }

            var option_str = '<option value="' + current_number_str + '">' +
                                    current_name + '</option>';

            ret_html_str = ret_html_str + option_str;  
        }        

        ret_html_str = ret_html_str + '</select>';
        
        if (this.m_label_text.length > 0 && this.m_label_text_position == 'right')
        {
            ret_html_str = ret_html_str + 
                getHtmlElementLabelString(this.m_label_text, this.m_id_drop_down, this.m_title);
        } 
        
        return ret_html_str;

    } // getHtmlString

} // JazzDropdown

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Control Dropdown ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// File: UtilControls.js
// Date: 2023-05-09
// Author: Gunnar Lidén

// File content
// =============
//
// Utility functions for controls

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Utility Functions /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

    // Returns the label string. Sample string:
    // <label for="id_text_box" title= "Tooltip for the control ..." >Label text</label>
    function getHtmlElementLabelString(i_label_str, i_id_control, i_title)
    {
        var ret_label_str = '';

        if (i_label_str == 0)
        {
            alert("getHtmlElementLabelString Input label string is not set");

            return ret_label_str;
        }

        if (i_id_control == 0)
        {
            alert("getHtmlElementLabelString Input control identity string must be set");

            return ret_label_str;
        }

        ret_label_str = ret_label_str + '<label for= "' + i_id_control + '" ';

        if (i_title.length > 0)
        {
            ret_label_str = ret_label_str + ' title="' + i_title + '" ';
        }

        ret_label_str = ret_label_str + '>';

        ret_label_str = ret_label_str + i_label_str;

        ret_label_str = ret_label_str + '</label>';

        return ret_label_str;

    } // getHtmlElementLabelString
    
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Utility Functions ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////


