// File: InputEventReservationIdElement.js>
// Date: 2024-12-22
// Author: Gunnar Lidén

// File content
// =============
//
// Class with identities and object functions for class InputEventReservation

class InputEventReservationIdElement
{
    constructor(i_id_unique_str)
    {
        // Start string for all identities
        this.m_id_unique_str = i_id_unique_str;

        // Boolean flag telling if the form has been created
        this.m_form_created = false;
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

    } // setFormCreatedToTrue

    ///////////////////////////////////////////////////////////////////////////
    /////// Start Identities And Objects //////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Returns the identity of the div for the input form
    getIdInputForm()
    {
        return this.m_id_unique_str + 'input_form';
    }

    //Returns the element div for the input form
    getElementInputForm()
    {
        if (!this.isFormCreated())
        {
            alert("InputEventReservation.getElementInputForm Object is not yet created");

            return null;
        }

        return document.getElementById(this.getIdInputForm());

    } // getElementInputForm

    // Returns the identity of the div for the header
    getIdDivHeader()
    {
        return this.m_id_unique_str + 'div_header';
    }

    //Returns the element div for the input form
    getElementDivHeader()
    {
        if (!this.isFormCreated())
        {
            alert("InputEventReservation.getElementDivHeader Object is not yet created");

            return null;
        }

        return document.getElementById(this.getIdDivHeader());

    } // getElementDivHeader

    // Returns the identity of the event program dropdown
    getIdDropdown()
    {
        return this.m_id_unique_str + 'event_dropdown';
    }

    // Returns the identity of the div for the dropdown
    getIdDivDropdown()
    {
        return this.m_id_unique_str + 'div_dropdown';
    }

    //Returns the element div for the dropdown
    getElementDivDropdown()
    {
        if (!this.isFormCreated())
        {
            alert("InputEventReservation.getElementDivDropdown Object is not yet created");

            return null;
        }

        return document.getElementById(this.getIdDivDropdown());

    } // getElementDivDropdown

    // Returns the identity of the div for the event name
    getIdDivEventName()
    {
        return this.m_id_unique_str + 'div_event_name';
    }

    //Returns the element div for the event name
    getElementDivEventName()
    {
        if (!this.isFormCreated())
        {
            alert("InputEventReservation.getElementDivEventName Object is not yet created");

            return null;
        }

        return document.getElementById(this.getIdDivEventName());

    } // getElementDivEventName

    // Returns the identity of the div for the label name
    getIdDivLabelName()
    {
        return this.m_id_unique_str + 'div_label_name';
    }

    //Returns the element div for the label name
    getElementDivLabelName()
    {
        if (!this.isFormCreated())
        {
            alert("InputEventReservation.getElementDivLabelName Object is not yet created");

            return null;
        }

        return document.getElementById(this.getIdDivLabelName());

    } // getElementDivLabelName

    // Returns the identity of the div for name and information
    getIdDivNameInfo()
    {
        return this.m_id_unique_str + 'div_name_info';
    }

    //Returns the element div for name and information
    getElementDivNameInfo()
    {
        if (!this.isFormCreated())
        {
            alert("InputEventReservation.getElementDivNameInfo Object is not yet created");

            return null;
        }

        return document.getElementById(this.getIdDivNameInfo());

    } // getElementDivNameInfo

    // Returns the identity of the div for the email label
    getIdDivLabelEmail()
    {
        return this.m_id_unique_str + 'div_label_email';
    }

    //Returns the element div for the email label
    getElementDivLabelEmail()
    {
        if (!this.isFormCreated())
        {
            alert("InputEventReservation.getElementDivLabelEmail Object is not yet created");

            return null;
        }

        return document.getElementById(this.getIdDivLabelEmail());

    } // getElementDivLabelEmail

    // Returns the identity of the div for email and information
    getIdDivEmailInfo()
    {
        return this.m_id_unique_str + 'div_email_info';
    }

    //Returns the element div for email and information
    getElementDivEmailInfo()
    {
        if (!this.isFormCreated())
        {
            alert("InputEventReservation.getElementDivEmailInfo Object is not yet created");

            return null;
        }

        return document.getElementById(this.getIdDivEmailInfo());

    } // getElementDivEmailInfo

    // Returns the identity of the div for the remark label
    getIdDivLabelRemark()
    {
        return this.m_id_unique_str + 'div_label_remark';
    }

    //Returns the element div for the remark label
    getElementDivLabelRemark()
    {
        if (!this.isFormCreated())
        {
            alert("InputEventReservation.getElementDivLabelRemark Object is not yet created");

            return null;
        }

        return document.getElementById(this.getIdDivLabelRemark());

    } // getElementDivLabelRemark

    // Returns the identity of the div for remark and information
    getIdDivRemarkInfo()
    {
        return this.m_id_unique_str + 'div_remark_info';
    }

    //Returns the element div for remark and information
    getElementDivRemarkInfo()
    {
        if (!this.isFormCreated())
        {
            alert("InputEventReservation.getElementDivRemarkInfo Object is not yet created");

            return null;
        }

        return document.getElementById(this.getIdDivRemarkInfo());

    } // getElementDivRemarkInfo

    // Returns the identity of the div for button and information
    getIdDivButtonInfo()
    {
        return this.m_id_unique_str + 'div_button_info';
    }

    //Returns the element div for button and information
    getElementDivButtonInfo()
    {
        if (!this.isFormCreated())
        {
            alert("InputEventReservation.getElementDivButtonInfo Object is not yet created");

            return null;
        }

        return document.getElementById(this.getIdDivButtonInfo());

    } // getElementDivButtonInfo

    // Returns the identity of the div for the prices
    getIdDivPrices()
    {
        return this.m_id_unique_str + 'div_prices';
    }

    //Returns the element div for the prices
    getElementDivPrices()
    {
        if (!this.isFormCreated())
        {
            alert("InputEventReservation.getElementDivPrices Object is not yet created");

            return null;
        }

        return document.getElementById(this.getIdDivPrices());

    } // getElementDivPrices

    // Returns the identity of the div for the instructions
    getIdDivInstructions()
    {
        return this.m_id_unique_str + 'div_instructions';
    }

    //Returns the element div for the instructions
    getElementDivInstructions()
    {
        if (!this.isFormCreated())
        {
            alert("InputEventReservation.getElementDivInstructions Object is not yet created");

            return null;
        }

        return document.getElementById(this.getIdDivInstructions());

    } // getElementDivInstructions

    // Returns the identity of the div for the name
    getIdDivName()
    {
        return this.m_id_unique_str + 'div_name';

    } // getIdDivName

   // Returns the identity of the name input element
   getIdInputName()
   {
       return this.m_id_unique_str + 'input_name';
       
   } // getIdButton

   //Returns the input name element
   getElementInputName()
   {
       if (!this.isFormCreated())
       {
           alert("InputEventReservation.getElementInputName Object is not yet created");

           return null;
       }

       return document.getElementById(this.getIdInputName());

   } // getElementInputName

    //Returns the element div for the name
    getElementDivName()
    {
        if (!this.isFormCreated())
        {
            alert("InputEventReservation.getElementDivName Object is not yet created");

            return null;
        }

        return document.getElementById(this.getIdDivName());

    } // getElementDivName

    // Returns the identity of the div for the name information
    getIdDivInfoName()
    {
        return this.m_id_unique_str + 'div_info_name';
    }

    //Returns the element div for the name information
    getElementDivInfoName()
    {
        if (!this.isFormCreated())
        {
            alert("InputEventReservation.getElementDivNameInfo Object is not yet created");

            return null;
        }

        return document.getElementById(this.getIdDivNameInfo());

    } // getElementDivInfoName

    // Returns the identity of the div for the remark
    getIdDivRemark()
    {
        return this.m_id_unique_str + 'div_remark';
    }

    //Returns the element div for the remark
    getElementDivRemark()
    {
        if (!this.isFormCreated())
        {
            alert("InputEventReservation.getElementDivRemark Object is not yet created");

            return null;
        }

        return document.getElementById(this.getIdDivRemark());

    } // getElementDivRemark

   // Returns the identity of the remark input element
   getIdInputRemark()
   {
       return this.m_id_unique_str + 'input_remark';
       
   } // getIdButton

   //Returns the input remark element
   getElementInputRemark()
   {
       if (!this.isFormCreated())
       {
           alert("InputEventReservation.getElementInputRemark Object is not yet created");

           return null;
       }

       return document.getElementById(this.getIdInputRemark());

   } // getElementInputRemark

    // Returns the identity of the div for the remark information
    getIdDivInfoRemark()
    {
        return this.m_id_unique_str + 'div_info_remark';
    }

    //Returns the element div for the remark information
    getElementDivInfoRemark()
    {
        if (!this.isFormCreated())
        {
            alert("InputEventReservation.getElementDivInfoRemark Object is not yet created");

            return null;
        }

        return document.getElementById(this.getIdDivInfoRemark());

    } // getElementDivInfoRemark

    // Returns the identity of the div for the email
    getIdDivEmail()
    {
        return this.m_id_unique_str + 'div_email';
    }

    //Returns the element div for the email
    getElementDivEmail()
    {
        if (!this.isFormCreated())
        {
            alert("InputEventReservation.getElementDivEmail Object is not yet created");

            return null;
        }

        return document.getElementById(this.getIdDivEmail());

    } // getElementDivEmail

   // Returns the identity of the email input element
   getIdInputEmail()
   {
       return this.m_id_unique_str + 'input_email';
       
   } // getIdButton

   //Returns the input email element
   getElementInputEmail()
   {
       if (!this.isFormCreated())
       {
           alert("InputEventReservation.getElementInputEmail Object is not yet created");

           return null;
       }

       return document.getElementById(this.getIdInputEmail());

   } // getElementInputEmail

    // Returns the identity of the div for the email information
    getIdDivInfoEmail()
    {
        return this.m_id_unique_str + 'div_info_email';
    }

    //Returns the element div for the email information
    getElementDivInfoEmail()
    {
        if (!this.isFormCreated())
        {
            alert("InputEventReservation.getElementDivInfoEmail Object is not yet created");

            return null;
        }

        return document.getElementById(this.getIdDivInfoEmail());

    } // getElementDivInfoEmail

    // Returns the identity of the div for the button
    getIdDivButton()
    {
        return this.m_id_unique_str + 'div_button';
    }

    //Returns the element div for the button
    getElementDivButton()
    {
        if (!this.isFormCreated())
        {
            alert("InputEventReservation.getElementDivButton Object is not yet created");

            return null;
        }

        return document.getElementById(this.getIdDivButton());

    } // getElementDivButton

    // Returns the identity of the button
    getIdButton()
    {
        return this.m_id_unique_str + 'button_open_reservation';

    } // getIdButton

    //Returns the button element
    getElementButton()
    {
        if (!this.isFormCreated())
        {
            alert("InputEventReservation.getElementButton Object is not yet created");

            return null;
        }

        var id_button = this.getIdButton();

        var button_el = document.getElementById(id_button);

        if (null == button_el)
        {
            alert("InputEventReservationIdElement There is no element with id_button= " + id_button);

            return null;
        }

        return button_el;

    } // getElementButton

    // Returns the identity of the div for the button information
    getIdDivInfoButton()
    {
        return this.m_id_unique_str + 'div_info_button';
    }

    //Returns the element div for the button information
    getElementDivInfoButton()
    {
        if (!this.isFormCreated())
        {
            alert("InputEventReservation.getElementDivInfoButton Object is not yet created");

            return null;
        }

        return document.getElementById(this.getIdDivInfoButton());

    } // getElementDivInfoButton

    ///////////////////////////////////////////////////////////////////////////
    /////// End Identities And Objects ////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

} // InputEventReservationIdElement

