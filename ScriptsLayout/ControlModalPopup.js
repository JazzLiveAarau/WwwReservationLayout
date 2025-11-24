// File: ControlModalPopup.js
// Date: 2022-12-01
// Author: Gunnar Lidén

// Inhalt
// =============
//
// Standard control: Modal Popup (Window)
//
// Reference: https://www.w3schools.com/howto/howto_css_modals.asp


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Class Modal Window ////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Class that creates a modal popup window
// Here is a sample how an object of the class can be created:
// var modal_popup_window = new ReservationModalPopup()
class ReservationModalPopup 
{
    // Function that is executed when an object of this class is created
    constructor() 
    {
        // Member variables
        // ================

        // The identity of the modal window
        this.m_id_div_content = 'id_div_content_modal_popup';

        // The identity of the container for the modal window
        this.m_id_div_container = 'id_div_container_modal_popup';

        // The container element for the modal window
        this.m_el_div_container = null;

        // The content element for the modal window
        this.m_el_div_content = null;

        // The close (exit) element
        this.m_el_span_close = null;

        // The text element for the content <div>
        this.m_el_div_text = null;

        // Initialization
        // ==============        

        this.createSetContainerElementCreateSetClass();
    
    } // constructor

    // Set the content of the modal popup window at click of Display Names (Namen zeigen)
    setContentOpenClickDisplayNames()
    {
        var html_str = DisplayNames.getHtmlString();

        this.m_el_div_text.innerHTML = html_str;

        this.m_el_div_container.style.display = 'block';

    } // setContentOpenClickDisplayNames

    // Close the modal popup window
    close()
    {
        this.m_el_div_container.style.display = 'none';

    } // close

    // Set container element, create and set class for the element
    // Create container <div> element if not existing 
    createSetContainerElementCreateSetClass()
    {
        this.m_el_div_container = document.getElementById(this.m_id_div_container);

        if (null == this.m_el_div_container)
        {
            this.createContainerElement();
        }

        this.appendContainerStyles();

        this.createAppendContentElement();

        this.appendContentStyles();

        this.createAppendCloseElement();

        this.appendCloseStyles();

        this.createAppendTextElement();

        this.appendTextStyles();


    } // createSetContainerElementCreateSetClass

    // Create container <div> element, add id and append to body
    createContainerElement()
    {
        this.m_el_div_container = document.createElement('div');

        this.m_el_div_container.id = this.m_id_div_container;

        document.body.appendChild(this.m_el_div_container);

    } // createContainerElement

    // Create content <div> element, add id and append to the container
    createAppendContentElement()
    {
        this.m_el_div_content = document.createElement('div');

        this.m_el_div_content.id = this.m_id_div_content;

        this.m_el_div_container.appendChild(this.m_el_div_content);

    } // createAppendContentElement  

    // Create close <span> element, add click funcion name and append to the container
    createAppendCloseElement()
    {
        this.m_el_span_close = document.createElement('span');

        //https://www.javatpoint.com/javascript-onclick-event
        this.m_el_span_close.onclick = function() { onClickClosePopup()};

        this.m_el_span_close.innerHTML = '&times';

        this.m_el_div_content.appendChild(this.m_el_span_close);

    } // createAppendCloseElement

    // Create and append text <div> element
    createAppendTextElement()
    {
        this.m_el_div_text = document.createElement('div');

        this.m_el_div_content.appendChild(this.m_el_div_text);

    } // createAppendTextElement

    // Append styles for the container
    appendContainerStyles()
    {
        // Hidden by defaults
        this.m_el_div_container.style.display = 'none';

        // Stay in place
        this.m_el_div_container.style.position = 'fixed';

        // Sit on top
        this.m_el_div_container.style.zIndex = '1';

        // Location of the container
        this.m_el_div_container.style.paddingTop = '10px';
        this.m_el_div_container.style.left = '0';
        this.m_el_div_container.style.top = '0';

        // Full width and height
        this.m_el_div_container.style.width = '950px';
        this.m_el_div_container.style.height = '100%';

        // Enable scroll if needed
        this.m_el_div_container.style.overflow = 'auto';

        // Fallback color
        this.m_el_div_container.style.backgroundColor = 'rgba(0,0,0,0.4)';

    } // appendContainerStyles

    // Append styles for the content
    appendContentStyles()
    {
        this.m_el_div_content.style.backgroundColor = '#fefefe';

        this.m_el_div_content.style.margin = 'auto';

        this.m_el_div_content.style.padding = '5px';

        this.m_el_div_content.style.border = '1px solid #888';

        this.m_el_div_content.style.width = '85%';

        this.m_el_div_content.style.height = 'auto';

    } // appendContentStyles

    appendTextStyles()
    {
        this.m_el_div_text.style.clear = 'both';

        this.m_el_div_text.style.fontWeight = 'bold';

        this.m_el_div_text.style.overflow = 'hidden';

    } // appendTextStyles

    // Append styles for the close element
    appendCloseStyles()
    {
        this.m_el_span_close.style.color = 'black';

        // this.m_el_span_close.style.float = 'right';

        // this.m_el_span_close.style.textAlign = 'right';

        this.m_el_span_close.style.fontSize = '58px';

        this.m_el_span_close.style.fontWeight = 'bold';

        this.m_el_span_close.style.cursor = 'pointer';

    } // appendCloseStyles

} // ReservationModalPopup

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Class Modal Window //////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Modal Window Event functions //////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Close the popup window
function onClickClosePopup()
{
    g_modal_popup_window.close();
    
} // onClickClosePopup

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Modal Window Event functions ////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
