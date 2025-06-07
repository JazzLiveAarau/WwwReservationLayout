// File: ControlUploadFile.js
// Date: 2025-06-07
// Author: Gunnar Lidén

// Inhalt
// =============
//
// Class for the upload of a file

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Control Upload File ///////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// The control is based on HTML element 

// <form action="upload.php" method="post" enctype="multipart/form-data">
//   Select image to upload:
//   <input type="file" name="fileToUpload" id="fileToUpload">
//   <input type="submit" value="Upload Image" name="submit">
// </form>

// References
// Multiple files: https://www.w3schools.com/jsref/prop_fileupload_files.asp
//        Example: https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_fileupload_files
// One File: https://www.w3schools.com/tags/att_input_type_file.asp
//  Example: https://www.w3schools.com/tags/tryit.asp?filename=tryhtml5_input_type_file
//  Filter: https://www.w3schools.com/tags/att_input_accept.asp
// Example: http://www.htmlcodes.ws/html-tags/input_accept.cfm
// PHP Upload: https://www.w3schools.com/php/php_file_upload.asp
// https://stackoverflow.com/questions/16616250/form-submit-with-ajax-passing-form-data-to-php-without-page-refresh
// http://jquery.malsup.com/form/ (plugin upload form with Ajax)
// https://github.com/jquery-form/form (plugin upload form with Ajax)

// Class for a button that uploads a file to the server
class ControUploadFile 
{
    // Function that is executed when an object of this class is created
    // 1. Member variables are set
    // 2. 
    constructor(i_id_upload_button, i_id_div_container) 
    {
        // Member variables
        // ================

        // The identity of the text box
        this.m_id_upload_button = i_id_upload_button;

        // The identity of the container for the text box
        this.m_id_div_container = i_id_div_container;

        // The identity of the form
        this.m_id_upload_form = '';

        // The identity of the submit button
        this.m_id_upload_submit_button = '';        

        // Selected file name (without path)
        this.m_selected_file_name = '';

        // The container element for the text box
        this.m_el_div_container = null;

        // The class for the text box
        this.m_class = '';

        // The onchange function name. Only the name is input
        this.m_onchange_function = '';

        // Filter for file types (extensions), for instance '.docx,.doc"
        this.m_accept_extensions = '';
        
        // Caption for the button
        this.m_button_caption = '';

        // Value that is the selected file name
        this.m_value = '';
        
        // Label text
        this.m_label_text = '';

        // Label position relative the text box
        // left: Left of box right: Right of box above: Above box
        // Default is left of the text box
        this.m_label_text_position = 'left'; 

        // Maximum length (number of characters) of the input string 
        // If the maximum length not is defined there will be no attribute maxlength= "30"
        // Then the default value for the browser application will be the maximum length
        this.m_maxlength = '';

        // The title attribute specifies extra information about an element.
        // The information is most often shown as a tooltip text when the mouse 
        // moves over the element.
        this.m_title = '';

        // Initialization
        // ==============        

        this.setDivContainerElement();

        this.m_id_upload_form = this.m_id_upload_button + '_form';

        this.m_id_upload_submit_button  = this.m_id_upload_button + '_submit_button';

        this.setControl();

    } // constructor

    // Set and get functions
    // =====================
 
    // Set the selected file name and activate the upload file function
    setSelectedFileNameActivateUploadFileFunction()
    {
        var el_upload = this.getHtmlElement();

        var path_file_name = el_upload.value;

        this.m_selected_file_name = this.getOnlyFileName(path_file_name);

        this.activateAjaxUploadFunction();

    } // setSelectedFileNameActivateUploadFileFunction

    // Returns the selected file name (without path)
    getSelectedFileName()
    {
        return  this.m_selected_file_name;

    } // getSelectedFileName

    // Get the server URL (address) for the selected file.
    // Please note that the actual directory path is set by UploadFileToServer.php
    getSelectedFileServerUrl()
    {
        var ret_url = '';

        ret_url = ret_url + '/www/Tasks/Documents/' + this.getSelectedFileName();

        return ret_url;

    } // getSelectedFileServerUrl

    // Initialize selected file name
    initSelectedFileName()
    {
        var el_upload = this.getHtmlElement();

        el_upload.value = '';

    } // initSelectedFileName

    // Checks the selected file name
    checkSelectedFileName(i_reg_number)
    {
        if (this.m_selected_file_name.length == 0)
        {
            alert("ControUploadFile.checkSelectedFileName Selected file name is not set");

            return false;
        }

        if (!this.checkFileNamePoints())
        {
            return false;
        }

        var index_point = this.m_selected_file_name.indexOf('.');

        var name_without_ext =  this.m_selected_file_name.substring(0, index_point);

        var file_ext = this.m_selected_file_name.substring(index_point);

        if (i_reg_number == name_without_ext)
        {
            return true;
        }
        else
        {
            alert("Du hast Aufgabe " + this.m_selected_file_name + " anstatt " + i_reg_number + file_ext + " gewählt. Bitte überprüfen!");

            this.initSelectedFileName();

            return false;
        }


    } // checkSelectedFileName

    // Returns false if the file name contains more than one point (extension)
    checkFileNamePoints()
    {
        var n_points = 0;

        for (var index_char=0; index_char < this.m_selected_file_name.length; index_char++)
        {
            var current_char = this.m_selected_file_name.substring(index_char, index_char + 1);

            if (current_char == '.')
            {
                n_points = n_points + 1;
            }
        }

        if (n_points != 1)
        {
            alert("Dateiname " + this.m_selected_file_name + " darf nur ein Punkt (Extension) haben.");

            return false
        }
        else
        {
            return true;
        }

    } // checkFileNamePoints

    // TODO Make this to a utility function
    getOnlyFileName(i_path_file_name)
    {
        var ret_file_name = '';
/*
https://stackoverflow.com/questions/423376/how-to-get-the-file-name-from-a-full-path-using-javascript
var substringTest = function (str) {
    return str.substring(str.lastIndexOf('/')+1);
}
function replaceAll(txt, replace, with_this) {
            return txt.replace(new RegExp(replace, 'g'),with_this);
        }
 var correctPath = replaceAll(path,"%20"," ");
*/      
        // In the example is '/' used. 
        // In some browsers may only the file name be returned in value
        var index_last_slash = i_path_file_name.lastIndexOf('\\');

        if (index_last_slash < 0)
        {
            return ret_file_name;
        }

        ret_file_name = i_path_file_name.substring(index_last_slash + 1);

        return ret_file_name;

    } // getOnlyFileName
    
    // Set functions for the layout member variables
    // =============================================

    // Set the onchange function name. Only the name is input
    setOnchangeFunctionName(i_onchange_function)
    {
        this.m_onchange_function = i_onchange_function;

        this.setControl();

    } // setOnchangeFunctionName

    // Sets the class for the upload file button
    // There will be no class attribute if this function not is called
    setClass(i_class) 
    {
      this.m_class = i_class;

      this.setControl();

    } // setClass

    // Sets the caption for the button
    setButtonCaption(i_button_caption) 
    {
      this.m_button_caption = i_button_caption;

      this.setControl();

    } // setButtonCaption 

    // Display the submit button caption
    displayButtonCaption()
    {
        var el_submit_button = this.getElementSubmitButton();

        if (el_submit_button != null)
        {
            el_submit_button.value = this.m_button_caption;
        }   

    } // displayButtonCaption

    // Hide the submit button caption
    hideButtonCaption()
    {
        var el_submit_button = this.getElementSubmitButton();

        if (el_submit_button != null)
        {
            el_submit_button.value = '';
        }

    } // hideButtonCaption    

    // Set filter for file types (extensions), for instance '.docx,.doc"
    setExtensions(i_accept_extensions)
    {
        this.m_accept_extensions = i_accept_extensions;

        this.setControl();
    }

    // Sets the label text for the upload file button
    // There will be no label if the text not is set
    setLabelText(i_label_text) 
    {
      this.m_label_text = i_label_text;

      this.setControl();

    } // setLabelText    

    // Sets the label text to the left of the upload file button
    setLabelTextPositionLeft(i_label_text) 
    {
        this.m_label_text_position = 'left'; 

        this.setControl();

    } // setLabelTextPositionLeft

    // Sets the label text to the right of the upload file button
    setLabelTextPositionRight() 
    {
        this.m_label_text_position = 'right'; 

        this.setControl();

    } // setLabelTextPositionRight
    
    // Sets the label text above the upload file button
    setLabelTextPositionAbove() 
    {
        this.m_label_text_position = 'above'; 

        this.setControl();

    } // setLabelTextPositionAbove

    // Hides or displays the upload div
    hideUploadDiv(i_b_hide)
    {
        if (i_b_hide)
        {
            this.m_el_div_container.style.display = 'none';
        }
        else
        {
            this.m_el_div_container.style.display = 'block';
        }

    } // hideUploadDiv

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
            alert("ControUploadFile error: HTML element with id= " + this.m_id_div_container + " does not exist.");

            ret_b_check = false;
        }   
        
        return ret_b_check;

    } // checkContainerElement

    // Activates the function (the form) that will upload a file. When the user clicks the
    // submit button of the form the file will be uploaded.  
    // The input data is the <form> that holds the input data for the upload. 
    // The submit button event function is set to the file UploadFileToServer.php and
    // the one input variable is the file name.
    // Do not fully understand how it works...
    activateAjaxUploadFunction()
    {
        // alert("Enter activateAjaxUploadFunction");

        $('#' + this.m_id_upload_form).ajaxForm(function() { 
           alert('Datei ist hochgeladen');
           //QQQQQQ   location.reload(); // Close <div>
        }); 

        // alert("Exit activateAjaxUploadFunction");

    } // activateAjaxUploadFunction

    // Sets the control
    setControl()
    {
        if (!this.checkContainerElement())
        {
            return;
        }

        var html_str = this.getHtmlString();

        this.m_el_div_container.innerHTML = html_str;

        this.hideButtonCaption();

    } // setControl

    // Returns the HTML text box element 
    getHtmlElement()
    {
        return document.getElementById(this.m_id_upload_button);

    } // getHtmlElement

    // this.m_id_upload_form
    // Returns the string that defines the HTML upload file button string
    // <form action="Php/UploadFileToServer.php" method="post" enctype="multipart/form-data">
    // <input type="file" id="id_upload_button" onchange="eventFileSelected" accept=".doc,.docx" title="Tip ...">  
    // <input type="submit" value="Upload file" name="submit">
    // </form>
    getHtmlString()
    {
        var ret_html_str = '';

        ret_html_str = ret_html_str + 
            '<form id= "' + this.m_id_upload_form + '" ';

            ret_html_str = ret_html_str + 
            ' action="Php/UploadFileToServer.php" method="post" enctype="multipart/form-data">';

        if (this.m_label_text.length > 0 && this.m_label_text_position == 'left')
        {
            ret_html_str = ret_html_str + 
                getHtmlElementLabelString(this.m_label_text, this.m_id_upload_button, this.m_title);
        }

        if (this.m_label_text.length > 0 && this.m_label_text_position == 'above')
        {
            ret_html_str = ret_html_str + 
                getHtmlElementLabelString(this.m_label_text, this.m_id_upload_button, this.m_title) + '<br>';
        }

        ret_html_str = ret_html_str + '<input type="file" id="' + this.m_id_upload_button + '" ';

        ret_html_str = ret_html_str + 'name="name_file_to_upload" ';

        if (this.m_class.length > 0)
        {
            ret_html_str = ret_html_str + ' class="' + this.m_class + '" ';
        }        

        if (this.m_onchange_function.length > 0)
        {
            ret_html_str = ret_html_str + ' onchange="' + this.m_onchange_function + '()" ';
        }

        if (this.m_accept_extensions.length > 0)
        {
            ret_html_str = ret_html_str + ' accept="' + this.m_accept_extensions + '" ';
        }

        if (this.m_title.length > 0)
        {
            ret_html_str = ret_html_str + ' title="' + this.m_title + '" ';
        }

        ret_html_str = ret_html_str + '>';

        ret_html_str = ret_html_str + '<input id="' + this.m_id_upload_submit_button + '" ';

        ret_html_str = ret_html_str + ' type="submit" value="';
        
        ret_html_str = ret_html_str + this.m_button_caption + '" name="name_submit">';

        ret_html_str = ret_html_str + '</form>';

        if (this.m_label_text.length > 0 && this.m_label_text_position == 'right')
        {
            ret_html_str = ret_html_str + 
                getHtmlElementLabelString(this.m_label_text, this.m_id_text_box, this.m_title);
        }

        return ret_html_str;

    } // getHtmlString

    // Returns the submit butto element
    getElementSubmitButton()
    {
        return  document.getElementById(this.m_id_upload_submit_button);

    } // getElementSubmitButton

} // ControUploadFile


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Control Upload File /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////