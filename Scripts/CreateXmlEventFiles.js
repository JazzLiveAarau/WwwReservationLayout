// File: CreateXmlEventFiles.js
// Date: 2024-12-09
// Authors: Gunnar Lidén

// Content
// =======
//
// Creation of new XML event files
//

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Class Premises Data ///////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Class holding premises
class CreateXmlEventFiles
{
    // Creates the instance of the class
    // i_event_program_xml: XML object defining an event program
    constructor(i_event_program_xml) 
    {
        // Member variables
        // ================

       // XML file defining the events
       this.i_event_program_xml = i_event_program_xml;

       this.execute();

    } // constructor

    // Execute
    execute()
    {

    } // execute

} // CreateXmlEventFiles