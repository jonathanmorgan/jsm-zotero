{
	"translatorID":"32d59d2d-b65a-4da4-b0a3-bdd3cfb979e7",
	"translatorType":3,
	"label":"RIS",
	"creator":"Simon Kornblith",
	"target":"ris",
	"minVersion":"1.0.2",
	"maxVersion":"",
	"priority":100,
	"inRepository":true,
	"lastUpdated":"2010-12-16 11:35:00"
}

/**
================================
To use this RIS.js:
================================
- To correctly import File Attachments, you must edit RIS.js and place the
    absolute path to your EndNote PDF folder:
<path_to_folder_where_EndNote_library_lives>/<EndNote_library_name>.Data/PDF/
    in the variable "RIS_internalPDFPath."
- If you want to get attached PDFs for Journal Articles, you need to go into
    the Refman Output Style in style editor (in EndNote X14 for Mac, you get
    there via Edit->Output Styles->Open Style Manager) and change L1 from
    outputting "URL" to outputting "File Attachments".  So the line will go
    from looking like this:

L1  - `URL|`

to looking like this:

L1  - `File Attachments|`

I'd probably make a copy of the style, too, before you change anything.

--------------------------------
Notes on how this RIS.js works:
--------------------------------
- If you have lots of files attached to a given reference, Zotero will
    sometimes freeze up.  3 or 4 usually works just fine.  This code contains
    a variable, "RIS_maxImports", that defines how many import files it will
    process per reference before storing subsequent ones in notes, such that you
    can import them by hand later.  It will also attach a note and log debug
    messages each time it encounters a file that it doesn't import, so if you
    want to know which files you need to update, turn on debugging before you
    run your import, then search for "RIS.js" in the debug output.

- * If you disable all addons other than zotero and python when you run a large
    import, it makes it much less likely you will break Firefox, even if you
    have lots of attachments on some references.

- the variable "risFieldToImportFieldMap", defined around line 1065, is the
    master mapping of RIS tags to their processing instructions.  RIS tags are
    either mapped directly to an EndNote field (CN is dumped into "callNumber" field):

    CN : new ImportField( ImportField.IN_TYPE_DIRECT, "callNumber", null, false ),

    or passed to a function for processing (A3 is passed to "processCreator" function):

	A3 : new ImportField( ImportField.IN_TYPE_FUNCTION, "", processCreator, true ),
	
	Any tag that isn't in the map will be appended to the reference as a note.

- processing functions are defined above "risFieldToImportFieldMap", in
    alphabetical order.  They should accept the following arguments:
    - item_IN - Zotero Item instance that we are populating.
    - tag_IN - String name of tag we are currently processing.
    - value_IN - String value of current tag (if multiple lines, will be a space-delimited concatenation of values from each line).
    - valueArray_IN - optional Array of values if multiple values for a given tag.

- To add a new processing function, define the function, then either update the
    mapping for the field you will process to reflect that it is now being
    passed to a function instead of being placed directly into a field or add
    a new row for the mapping.

- Example of turning a direct mapping into a function (pass CN to "processCN"
    instead of just putting it in the "callNumber" zotero field):

    CN : new ImportField( ImportField.IN_TYPE_DIRECT, "callNumber", null, false ),

    becomes (after defining processCN()):

    CN : new ImportField( ImportField.IN_TYPE_FUNCTION, "", processCN, false ),

- processTY() is where the itemType is set, based on the reference type in the
    TY tag.

- Regular Expression seem to make Firefox go out to lunch, so I removed most of them
    all from this file.
*/

Zotero.configure("dataMode", "line");
Zotero.addOption("exportNotes", true);
Zotero.addOption("exportCharset", "UTF-8");

// full path to EndNote directory that contains included files, including trailing slash.
var RIS_internalPDFPath = "";
var RIS_maxImports = 20;
var RIS_unknownTag = "RIS_unknown";

function detectImport() {
	var line;
	var i = 0;
	while((line = Zotero.read()) !== false) {
		line = line.replace(/^\s+/, "");
		if(line != "") {
			if(line.substr(0, 6).match(/^TY {1,2}- /)) {
				return true;
			} else {
				if(i++ > 3) {
					return false;
				}
			}
		}
	}
}

var fieldMap = {
	ID:"itemID",
	T1:"title",
	T3:"series",
	JF:"publicationTitle",
	CY:"place",
	JA:"journalAbbreviation"
	//M3:"DOI",
};


var inputFieldMap = {
	AB:"abstractNote",
	CN:"callNumber",
	CT:"title",
	CY:"place",
	//ET:"edition",
	TI:"title"
};


// TODO: figure out if these are the best types for letter, interview, webpage
// TODO: EDBOOK = book, too.  Need to rewrite so the EndNote code is the key,
//    references value of Zotero type, since multiple EndNote types can map
//    to one Zotero type.  Probably need to keep original type around, too, so
//    we can reference it (since EDBOOK and BOOK have different output, for
//    instance).
var typeMap = {
	artwork:"ART",
	audioRecording:"SOUND",
	bill:"BILL",
	blogPost:"ELEC",
	book:"BOOK",
	bookSection:"CHAP",
	case:"CASE",
	computerProgram:"COMP",
	conferencePaper:"CONF",
	dictionaryEntry:"DICT",
	document:"GEN",
	email:"ICOMM",
	film:"MPCT",
	forumPost:"ICOMM",
	hearing:"HEAR",
	instantMessage:"ICOMM",
	interview:"PCOMM",
	journalArticle:"JOUR",
	letter:"PCOMM",
	magazineArticle:"MGZN",
	manuscript:"PAMP",
	map:"MAP",
	newspaperArticle:"NEWS",
	patent:"PAT",
	//podcast:"GEN",
	podcast:"SOUND",
	presentation:"GEN",
	radioBroadcast:"GEN",
	report:"RPRT",
	statute:"STAT",
	thesis:"THES",
	tvBroadcast:"GEN",
	videoRecording:"VIDEO",
	webpage:"ELEC"
};

// supplements outputTypeMap for importing
// TODO: DATA, MUSIC
// instead, making this the master for all inputs (duplication, but there can
//    be multiple RIS types that map to a given Zotero item type).
var inputTypeMap = {
	ABST : "journalArticle",
	ADVS : "film",
	AGGR : "webpage", //supposed to be Aggregated Database...  No database item type?
	ART : "artwork",
	BILL : "bill",
	BLOG : "blogPost",
	BOOK : "book",
	CASE : "case",
	CHAP : "bookSection",
	CHART : "artwork",
	CLSWK : "document", // supposed to be "Classical Work"
	COMP : "computerProgram",
	CONF : "conferencePaper",
	CPAPER : "conferencePaper",
	CTLG : "magazineArticle",
	DATA : "webpage", // supposed to be Dataset, but no item type for data yet?
	DBASE : "webpage", // supposed to be Online Database, but no item type for data yet?
	DICT : "dictionaryEntry",
	EBOOK : "book",
	EDBOOK : "book",
	EJOUR : "webpage", // Electronic Journal in EndNote - just a web page?
	//ELEC : "blogPost",
	ELEC : "webpage",
	EQUA : "artwork", // supposed to be "Equation"
	FIGURE : "artwork", // supposed to be "Figure"
	//GEN : "presentation",
	//GEN : "tvBroadcast",
	//GEN : "radioBroadcast",
	//GEN : "podcast",
	GEN : "document",
	GOVDOC : "document", // supposed to match "Government Document"
	GRANT : "document", // supposed to be "Grant" or "Grant application".
	HEAR : "hearing",
	//ICOMM : "instantMessage",
	//ICOMM : "forumPost",
	ICOMM : "email",
	INPR : "manuscript",
	JFULL : "journalArticle",
	JOUR : "journalArticle",
	LEGAL : "statute", // supposed to match "Legal Rule or Regulation"
	MANSCPT : "manuscript",
	MAP : "map",
	MGZN : "magazineArticle",
	MPCT : "film",
	MULTI : "webpage", // supposed to match "Online Multimedia".
	MUSIC : "audioRecording", // supposed to match "Muscial Score".
	NEWS : "newspaperArticle",
	PAMP : "manuscript",
	PAT : "patent",
	//PCOMM : "letter",
	PCOMM : "interview", // supposed to match to "Personal Communication"
	RPRT : "report",
	SER : "book",
	SLIDE : "artwork",
	SOUND : "audioRecording",
	STAND : "document", // supposed to map to "Standard"
	STAT : "statute",
	THES : "thesis",
	UNBILL : "manuscript",
	UNPB : "manuscript",
	VIDEO : "videoRecording",
	WEB : "webpage"
};

/**
 * Class ImportField
 * object for each RIS property that holds:
 * - inType - type of input mapping - either "direct" (get direct mapping to Zotero item property from inMapping) or "function" (get function pointer of function used to process RIS property from inFunction).
 * - inMapping - if mapping between RIS field and Zotero item property is direct (inType = "direct"), name of associated Zotero item property.
 * - inFunction - if mapping between RIS field and Zotero item is complicated (inType = "function"), so if different for different types, or lots of translation required, then this reference stores a function pointer to a function with a standard signature (use signature of function processLinkTag( item_IN, tag_IN, value_IN, valueArray_IN )) that accepts item, tag name, value, and an optional value array, uses those values to appropriately process incoming tag, place the results in the item passed in.
 * - isInSpec - boolean variable, set to true if RIS property is from actual spec, false if not.
 * - all library functions re-used across multiple RIS properties.
 * - method to accept item_IN, tag_IN, value_IN, valueArray_IN and deal with the internal configuration of the ImportField, return item_IN with the RIS tag appropriately processed.
 */
function ImportField( inType_IN, inMapping_IN, inFunction_IN, isInSpec_IN )
{
	// properties
	this.inType = inType_IN;
	this.inMapping = inMapping_IN;
	this.inFunction = inFunction_IN;
	this.isInSpec = isInSpec_IN;
	
	// methods
	this.addCreatorName = addCreatorName;
	
	this.processImportField = function( item_IN, tag_IN, value_IN, valueArray_IN )
	{
		
		// return reference
		var item_OUT = item_IN;
		
		// declare variables
		var myType = "";
		
		// get type
		myType = this.inType;
		
		// direct or function?
		if ( myType == ImportField.IN_TYPE_DIRECT )
		{
			
			// direct mapping - place value in item.
			item_OUT[ this.inMapping ] = value_IN;
			
		}
		else if ( myType == ImportField.IN_TYPE_DIRECT_APPEND )
		{

			// direct mapping - if already a value, append item, separated by
			//    a " ".
			if ( item_OUT[ this.inMapping ] )
			{
				
				// nothing in the field now, so just store value.
				item_OUT[ this.inMapping ] = item_OUT[ this.inMapping ] + " " + value_IN;
				
			}
			else
			{
				
				// nothing in the field now, so just store value.
				item_OUT[ this.inMapping ] = value_IN;
				
			}
			
		}
		else if ( myType == ImportField.IN_TYPE_FUNCTION )
		{
			
			// process using a function, not a direct mapping.
			item_OUT = this.inFunction( item_IN, tag_IN, value_IN, valueArray_IN );
			
		}
		
		return item_IN;
		
	} //-- end function processImportField() --//

} //-- end class ImportField --//

ImportField.IN_TYPE_DIRECT_APPEND = "directAppend";
ImportField.IN_TYPE_DIRECT = "direct";
ImportField.IN_TYPE_FUNCTION = "function";


/**
 * addCreatorName()
 * Accepts the item we want to add a creator to, the name of the creator, and
 *    the type of the creator.  Parses name, then adds to item.
 *
 * @param item_IN - item we are adding creator to.
 * @param name_IN - string name of creator.
 * @param type_IN - type of creator we are adding.
 */
function addCreatorName( item_IN, name_IN, type_IN )
{
	
	// declare variables
	var nameArray = null;

	// parse name.
	nameArray = name_IN.split(/, ?/);
	item_IN.creators.push({lastName:nameArray[0], firstName:nameArray[1], creatorType:type_IN});
	
} //-- end function addCreatorName() --//

/**
 * stringReplace()
 * Accepts a string in which we want to find and replace strings, a string to
 *    find, and a string to replace any matches with.  If string_IN or find_IN
 *    are empty, returns the string passed in.
 *
 * @param string_IN - string we will search and replace within.
 * @param find_IN - string we are searching for.
 * @param replaceWith_IN - string we will replace matches with.
 * @return String - string with all instances of find_IN replaced by replaceWith_IN.
 */
function stringReplace( string_IN, find_IN, replaceWith_IN )
{
	// return reference
	var string_OUT = "";
	
	// declare variables
	var subStringArray = -1;
	var subStringCount = -1;
	
	// put input string in output argument.
	string_OUT = string_IN;
	
	// got something passed in?
	if ( ( string_OUT != null ) && ( string_OUT != "" ) )
	{
		// make sure we have a find string
		if ( ( find_IN != null ) && ( find_IN != "" ) )
		{
			
			// split on the string passed in.
			subStringArray = string_IN.split( find_IN );
			
			// then, use join to put them back together again, with
			//    replaceWith_IN between each.
			string_OUT = subStringArray.join( replaceWith_IN );
			
		} //-- end check to see if find string is present. --//
		
	} //-- end check to see if string we are working with is present. --//
	
	return string_OUT;
} //-- end function stringReplace() --//

/**
 * addDate()
 * Accepts the item we want to add a date to, the name of the field where the
 *    date should be stored, and the date value.  Parses date, adds to item.
 *
 * @param item_IN - item we are adding creator to.
 * @param fieldName_IN - string name of field in item where we'll place date once it is transformed.
 * @param value_IN - date value we are processing.
 * @param append_IN - boolean, true if we want to append to existing value in fieldName_IN (after, separated by a space), false if not.
 */
function addDate( item_IN, fieldName_IN, value_IN, append_IN )
{
	
	// year or date
	var cleanedValue = "";
	var parsedDate = null;
	var epochTime = NaN;
	var isDateParsed = false;
	var parsedDateParts = null;
	var dateParts = null;
	var dashIndex = -1;
	var tempInt = -1;
	var finalValue = "";
	
	// use cleanedValue instead of value_IN
	cleanedValue = value_IN;
	
	// DEBUG
	Zotero.debug( " *** in RIS.js->addDate() - 1: Date = '" + cleanedValue + "', target = '" + fieldName_IN + "'" );

	// see if has dashes, and so is probably a date with dashes instead of
	//    slashes.
	dashIndex = value_IN.indexOf( "-" );
	if ( dashIndex > -1 )
	{
		// has dashes (instead of "/"?).  Try converting to slashes before splitting.
		cleanedValue = stringReplace( cleanedValue, "-", "/" );
	}

	// DEBUG
	Zotero.debug( " *** in RIS.js->addDate() - 2: after Dash replace - Date = '" + cleanedValue + "', target = '" + fieldName_IN + "'" );
	
	// first, parse by splitting, as we did before.
	dateParts = cleanedValue.split("/");

	// Try using JS Date object to parse date - First, remove periods - Firefox
	//    can't parse dates where month abbreviation has a period after it.
	cleanedValue = stringReplace( cleanedValue, ".", "" );
	
	// initialize variables
	parsedDateParts = new Array();

	// parse using Date.
	epochTime = Date.parse( cleanedValue );

	// success?
	if ( isNaN( epochTime ) == false )
	{
		// yes - use Date to populate dateParts
		parsedDate = new Date( cleanedValue );
	
		// place parts
		parsedDateParts[ 0 ] = parsedDate.getFullYear(); // 0 = year.
		parsedDateParts[ 1 ] = parsedDate.getMonth() + 1; // 1 = month, from 1 to 12.
		parsedDateParts[ 2 ] = parsedDate.getDate(); // 2 = date in month, starting at 1 for first day.

		// DEBUG
		Zotero.debug( " *** in RIS.js->addDate() - 3: after Date.parse() - Date '" + cleanedValue + "' converted to year = '" + parsedDateParts[ 0 ] + "'; month = '" + parsedDateParts[ 1 ] + "'; date = '" + parsedDateParts[ 2 ] + "'" );		
	}

	// see if Date.parse() was successful.
	if ( parsedDateParts.length > 0 )
	{
		// it was.  Need to make sure that we don't screw up a single year.
		// is the dateParts array length = 1?
		if ( dateParts.length == 1 )
		{
			// it is.  Could be a year.  Only use parsed results if this sole
			//    value = NaN, or if it is an int, if it is not 4 digits.
			tempInt = parseInt( dateParts[ 0 ] );
			if ( ( isNaN( tempInt ) == true ) || ( tempInt.toString().length != 4 ) )
			{
				// Since the string passed in is either not a number or not
				//    length 4, and we have a successful parse, this indicates
				//    that we should use the parsed date parts, not the ones
				//    from splitting on "/".
				dateParts = parsedDateParts;
			}
		}
		else
		{
			// not just a year, use the Date.parse() results.
			dateParts = parsedDateParts;
		}
	} //-- check if the Date.parse() was successful.
	
	// DEBUG
	Zotero.debug( " *** in RIS.js->addDate() - 4: after all parse logic, date '" + cleanedValue + "' converted to: year = '" + dateParts[ 0 ] + "'; month = '" + dateParts[ 1 ] + "'; date = '" + dateParts[ 2 ] + "'; post-date = '" + dateParts[ 3 ] + "'" );		

	// now, back to previous logic - we've done all we can do at this point.
	if ( dateParts.length == 1 )
	{
		// technically, if there's only one date part, the file isn't valid
		// RIS, but EndNote writes this, so we have to too
		// Nick: RIS spec example records also only contain a single part
		// even though it says the slashes are not optional (?)
		//item_IN[ fieldName_IN ] = value_IN;
		finalValue = value_IN;
	}
	else
	{
		// more than one part.  Try using Date to parse date string, so we can
		//    support more date formats.  Won't work if it actually contains a
		//    trailing space and notes, but in that case, we fall back to 
		//    existing logic.

		
		// if month, convert month to internal format expected by Date (0-11).
		var month = parseInt( dateParts[ 1 ] );
		if ( month )
		{
			month--;
		}
		else
		{
			month = undefined;
		}

		// convert Date to Zotero format, store in field.
		//item_IN[ fieldName_IN ] = Zotero.Utilities.formatDate({year:dateParts[0],
		finalValue = Zotero.Utilities.formatDate({year:dateParts[0],
								  month:month,
							 	  day:dateParts[2],
							      part:dateParts[3]});
	}
	
	// got a final Value?
	if ( ( finalValue != null ) && ( finalValue != "" ) )
	{
		// do we append?
		if ( append_IN == true )
		{
			// append
			finalValue = item_IN[ fieldName_IN ] + " " + finalValue;
			
		}
		else
		{
			// no append, just overwrite
			item_IN[ fieldName_IN ] = finalValue;
		}
	}
	
} //-- end function addDate() --//


function addMisc( item_IN, tag_IN, value_IN, valueArray_IN )
{
	// Can't get accessDate to show up no matter what I do.
	// In EndNote, for web pages, Access Date is stored in M1.
	//if ( ( tag_IN == "M1" ) && ( item_IN.itemType == "webpage" ) )
	//{
		// we are a web page.  Append this to the accessDate field.
		//appendToItemField( item_OUT, "accessDate", value_IN, ", " );
		//addDate( item_OUT, "accessDate", value_IN, true )	
	//}
	//else
	//{
		// Append miscellaneous fields to extra field.
		appendToItemField( item_IN, "extra", value_IN, "; " );
	//}	
} //-- end function addMisc() --//


function addNote( item_IN, tag_IN, value_IN, valueArray_IN )
{
	
	// notes
	if ( value_IN != item_IN.title )  // why does EndNote do this!?
	{
		item_IN.notes.push({note:value_IN});
	}
	
} //-- end function addNote() --//


function addProcessingNote( item_IN, tag_IN, value_IN, valueArray_IN, message_IN )
{
	
	var message = "";
	
	// generate message.
	message = " *** In RIS.js, processing note: value = " + value_IN + "; message = " + message_IN;
	
	// add Note
	addNote( item_IN, tag_IN, message, valueArray_IN );
	 	
} //-- end function addNote() --//


function appendToItemField( item_IN, fieldName_IN, value_IN, appendString_IN )
{
	// return reference
	var item_OUT = "";
	
	// set item_OUT to item_IN
	item_OUT = item_IN;
	
	// got a field name?
	if ( ( fieldName_IN != null ) && ( fieldName_IN != null ) )
	{
		// see if already something in the field.
		if ( item_OUT[ fieldName_IN ] )
		{
			// There is.  Make sure we weren't passed nothing (if nothing,
			//    do nothing).
			if ( ( value_IN != null ) && ( value_IN != null ) )
			{
				// got something.  Append it.
				item_OUT[ fieldName_IN ] += appendString_IN + value_IN;
			}
		}
		else
		{
			item_OUT[ fieldName_IN ] = value_IN;
		}
	}
	
	return item_OUT;
} //-- end function appendToItemField() --//


function processBT( item_IN, tag_IN, value_IN, valueArray_IN )
{
	
	// return reference
	var item_OUT = item_IN;

	// ignore, unless this is a book or unpublished work, as per spec
	if ( item_OUT.itemType == "book" || item_OUT.itemType == "manuscript" )
	{
		item_OUT.title = value_IN;
	}
	else
	{
		item_OUT.backupPublicationTitle = value_IN;
	}
	
	return item_OUT;

} //-- end function processBT() --//


/**
 * function processCreator()
 * Purpose: Breaks out processing of creator.
 *
 *
 * Parameters:
 * @param item_IN - Zotero Item instance that we are populating.
 * @param tag_IN - String name of tag we are currently processing.
 * @param value_IN - String value of current tag (if multiple lines, will be a space-delimited concatenation of values from each line).
 * @param valueArray_IN - Array of String links we need to process.
 */
function processCreator( item_IN, tag_IN, value_IN, valueArray_IN )
{
	
	// return reference
	var item_OUT = item_IN;

	if ( tag_IN == "A1" || tag_IN == "AU" )
	{
		// primary author (patent: inventor)
		// store Zotero "creator type" in temporary variable
		var tempType;
		if ( item_OUT.itemType == "patent" )
		{
			tempType = "inventor";
		}
		// see if EDBOOK - if so, then AU = editor, not author.
		else if ( item_OUT.originalItemType == "EDBOOK" )
		{
			tempType = "editor";
		}
		else
		{
			tempType = "author";
		}
		//var names = value.split(/, ?/);
		//item.creators.push({lastName:names[0], firstName:names[1], creatorType:tempType});
		addCreatorName( item_OUT, value_IN, tempType );
	}
	else if ( tag_IN == "ED" )
	{
		//var names = value.split(/, ?/);
		//item.creators.push({lastName:names[0], firstName:names[1], creatorType:"editor"});
		addCreatorName( item_OUT, value_IN, "editor" );
	}
	else if ( tag_IN == "A2" )
	{
		// contributing author (patent: assignee)
		if ( item_OUT.itemType == "patent" )
		{
			if (item_OUT.assignee)
			{
				// Patents can have multiple assignees (applicants) but Zotero only allows a single
				// assignee field, so we  have to concatenate them together
				item_OUT.assignee += ", " + value_IN;
			}
			else
			{
				item_OUT.assignee = value_IN;
			}
		}
		else if ( item_OUT.itemType == "book" )
		{
			// EndNote puts Series Editor in A2.
			addCreatorName( item_OUT, value_IN, "seriesEditor" );
		}
		else if ( item_OUT.itemType == "bookSection" )
		{
			// EndNote puts Editor in A2.
			addCreatorName( item_OUT, value_IN, "editor" );
		}
		else
		{
			//var names = value.split(/, ?/);
			//item.creators.push({lastName:names[0], firstName:names[1], creatorType:"contributor"});
			addCreatorName( item_OUT, value_IN, "contributor" );
		}
	}
	// in RefMan spec, this is "Series Author"
	else if ( tag_IN == "A3" )
	{
		// EndNote puts Series Editor in A3 in chapters of edited books.
		addCreatorName( item_OUT, value_IN, "seriesEditor" );
	}

	return item_OUT;

} //-- end function processCreator() --//


function processDA( item_IN, tag_IN, value_IN, valueArray_IN )
{
	
	// return reference
	var item_OUT = item_IN;

	// the DA tag is usually used by EndNote to hold access date (stored in
	//	 zotero in "accessDate").
	addDate( item_IN, "accessDate", value_IN, false );

	return item_OUT;

} //-- end function processDA() --//


function processEP( item_IN, tag_IN, value_IN, valueArray_IN )
{
	
	// return reference
	var item_OUT = item_IN;

	// end page
	if ( value_IN )
	{
		if( !item_OUT.pages )
		{
			item_OUT.pages = value_IN;
		}
		else if ( value_IN != item_OUT.pages )
		{
			item_OUT.pages += "-" + value_IN;
		}
	}

	return item_OUT;

} //-- end function processEP() --//


function processET( item_IN, tag_IN, value_IN, valueArray_IN )
{
	
	// return reference
	var item_OUT = item_IN;

	if ( item_OUT.itemType == "journalArticle" )
	{
		// if journal article, in EndNote, ET = date accessed online
		item_OUT.accessDate = value_IN;
	}
	else
	{
		// If not journal article, ET = edition.
		item_OUT.edition = value_IN;
	}

	return item_OUT;

} //-- end function processEP() --//


function processIS( item_IN, tag_IN, value_IN, valueArray_IN )
{
	
	// return reference
	var item_OUT = item_IN;

	// Issue Number (patent: patentNumber)
	if ( item_OUT.itemType == "patent" )
	{
		item_OUT.patentNumber = value_IN;
	}
	else
	{
		item_OUT.issue = value_IN;
	}

	return item_OUT;

} //-- end function processEP() --//


function processJO( item_IN, tag_IN, value_IN, valueArray_IN )
{
	
	// return reference
	var item_OUT = item_IN;

	// conference paper or not?
	if ( item_OUT.itemType == "conferencePaper" )
	{
		item_OUT.conferenceName = value_IN;
	}
	else
	{
		item_OUT.publicationTitle = value_IN;
	}
	
	return item_OUT;

} //-- end function processJO() --//


function processKW( item_IN, tag_IN, value_IN, valueArray_IN )
{
	
	// return reference
	var item_OUT = item_IN;
	
	// declare variables
	var lineArray = null;
	var i = -1;
	var currentLine = "";
	var tagArray = null;

	// keywords/tags
	
	// technically, treating newlines as new tags breaks the RIS spec, but
	// it's required to work with EndNote
	// first, check to see if newlines
	if ( value_IN.indexOf( "\n" ) > -1 )
	{
		lineArray = value_IN.split( "\n" );
	}
	else
	{
		lineArray = new Array();
		lineArray.push( value_IN );
	}
	
	// see if lineArray length is greater than 0
	if ( lineArray.length > 0 )
	{
		// loop over each item in array.  Split each on ";" and add result to
		//    tagArray.
		tagArray = new Array();
		for( i = 0; i < lineArray.length; i++ )
		{
			// get current line
			currentLine = lineArray[ i ];
			tagArray = tagArray.concat( currentLine.split( ";" ) );
		}
	}
	else
	{
		tagArray = new Array();
		tagArray.push( value_IN );
	}
	
	item_OUT.tags = item_OUT.tags.concat( tagArray );
		
	return item_OUT;

} //-- end function processKW() --//


/**
 * function processLinkTag()
 * Purpose: Broke out more sophisticated processing of links, so we get proper
 *    MIME types, actual file names, etc.
 * Preconditions: can deal with the EndNote way of outputting multiple links
 *    (one to a line) and the spec way (one line, semi-colon delimited list)
 *    but not both (multiple lines where 2nd and subsequent lines are not
 *    preceded by "L1  - " but do have semi-colon delimited lists of links).
 *    In this hybrid case of brokenness, this won't work (though it wouldn't be
 *    hard to deal with this, too - see comment inside loop, just after grabbing
 *    current value).
 *
 * Parameters:
 * @param item_IN - Zotero Item instance that we are populating.
 * @param tag_IN - String name of tag we are currently processing.
 * @param value_IN - String value of current tag (if multiple lines, will be a space-delimited concatenation of values from each line).
 * @param valueArray_IN - Array of String links we need to process.
 */
function processLinkTag( item_IN, tag_IN, value_IN, valueArray_IN )
{
	
	// return reference
	item_OUT = null;

	// declare variables
	var linkType_URL = "url";
	var linkType_file = "file";
	var linkType_ENFile = "enfile";
	var myLinkType = "";
	var myMIMEType = "";
	var myFileName = "";
	var valueArray = "";
	var testArray = "";
	var arraySize = -1;
	var currentValue = "";
	var currentValueUpcase = "";
	var fileLinkCount = -1;
	var overflowNote = "";
	
	// string substitution variables
	var subStartIndex = -1;
	var subFilePath = -1;
	var internalPDFString = "INTERNAL-PDF://";
	
	Zotero.debug( "*** In RIS.js->processLinkTag, tag_IN: " + tag_IN + "; value:" + value_IN );
	
	// now, process attachments based on tag and linkType
	if( tag_IN == "UR" )
	{
		item_IN.url = value_IN;
		
		// see if semi-colon delimited...
		testArray = value_IN.split( ";" );
		if ( testArray.length > 1 )
		{
			// loop over semi-colon-delimited list of URLs.
			arraySize = testArray.length;
			for( i = 0; i < arraySize; i++ )
			{
				// get current Value
				currentValue = testArray[ i ];
				
				// add to list of attachments
				item_IN.attachments.push({url:currentValue});
			}
		}
		else
		{
			// juat the one - add to list of attachments
			item_IN.attachments.push({url:value_IN});
		}
		Zotero.debug( "*** In RIS.js->processLinkTag, item_IN.URL: " + item_IN.url + "; attachments:" + item_IN.attachments );
	}
	else if( tag_IN == "L1" )
	{
	
		// see if there is anything in valueArray_IN
		valueArray = valueArray_IN;
		if ( ( valueArray == null ) || ( valueArray.length == 0 ) )
		{
			// try breaking the value passed in up on semi-colons.
			valueArray = new Array();
			
			// split on semi-colon.
			testArray = value_IN.split( ";" );
			
			// got anything?
			if ( testArray.length > 0 )
			{
				valueArray = testArray;
			}
			else
			{
				valueArray.push( value_IN );
			}
		}
		else if ( valueArray.length == 1 )
		{
			// one value - need to make sure we process semi-colon-delimited list if
			//    present.  Grab the single value and see if it is a semi-colon delimited
			//    list.  If so, we should make a new array with each semi-colon-delimited value as an
			//    entry.
			currentValue = valueArray[ 0 ];
			testArray = currentValue.split( ";" );
			
			// got anything more than the one thing we started with?
			if ( testArray.length > 1 )
			{
				// yes - there were semi-colons.  Use this array instead.
				valueArray = testArray;
			}
		}
		
		if ( valueArray.length > 0 )			
		{
			
			// loop over the values passed in, processing each.
			arraySize = valueArray.length;
			fileLinkCount = 0;
			for ( i = 0; i < arraySize; i++ )
			{

				// initialize variables
				myLinkType = "";
				myFileName = "Full Text (PDF)";
				myMIMEType = "";
				currentValue = new String( valueArray[ i ] );
				currentValueUpcase = currentValue.toUpperCase();
				//currentValue = Zotero.Utilities.trim( currentValue );
				
				// if wanted to be all 
			
				// see what link type the current value is.
				// URL?
				//if ( currentValue.search( /^\s*https?:\/\//i ) > -1 )
				if ( ( currentValueUpcase.indexOf( "HTTP://" ) > -1 ) || ( currentValueUpcase.indexOf( "HTTPS://" ) > -1 ) )
				{
				
					// type is URL
					myLinkType = linkType_URL;
				
				}
				// file?
				//else if ( currentValue.search( /^\s*file:\/\//i ) > -1 )
				else if ( currentValueUpcase.indexOf( "FILE://" ) > -1 )
				{
				
					// type is file
					myLinkType = linkType_file;
				
				}
				// EndNote internal file?
				//else if ( currentValue.search( /^\s*internal-pdf:\/\//i ) > -1 )
				else if ( currentValueUpcase.indexOf( internalPDFString ) > -1 )
				{
				
					// no path to use to update, so type is EndNote file
					myLinkType = linkType_ENFile;
				
				}
			
				// see if this is a URL or a file.
				if ( myLinkType == linkType_URL )
				{
				
					// Silly EndNote.  This is a URL.
					item_IN.url = currentValue;
					item_IN.attachments.push({url:currentValue});
	
				}
				else if ( ( myLinkType == linkType_file ) || ( myLinkType == linkType_ENFile ) )
				{
				
					// retrieve mime type
					myMIMEType = getMIMEType( currentValue );
					
					// get file name
					myFileName = parseFileName( currentValue );
					
					// is this an endnote file?
					if ( myLinkType == linkType_ENFile )
					{
					
						// yes.  If corrected path stored in RIS_internalPDFPath, correct
						//    (convert to file://).  If not, leave as is (it will break).
						if ( ( RIS_internalPDFPath != null ) && ( RIS_internalPDFPath != "" ) )
						{
							
							// got a correction path.  swap "internal-pdf://" for "file://<path>".
							// regular expressions cause instability in import,
							//    so doing this by hand.
							//currentValue = currentValue.replace( /^\s*internal-pdf:\/\//i, "file://" + RIS_internalPDFPath );

							// get start index of "internal-pdf://"
							subStartIndex = currentValueUpcase.indexOf( internalPDFString );
							
							// get string
							subFilePath = currentValue.substr( subStartIndex + internalPDFString.length );
							currentValue = "file://" + RIS_internalPDFPath + subFilePath;
							
						}
					
					}
				
					// see if we've gone over the governor.  If so, then store
					//    all information as a note, instead of an attachment.
					if ( fileLinkCount < RIS_maxImports )
					{
						// attach the item.
						item_IN.attachments.push({url:currentValue, mimeType:myMIMEType, title:myFileName, downloadable:true});
						fileLinkCount++;
					}
					else
					{
						// over import limit.  Just make a note.
						overflowNote = "Import limit of " + RIS_maxImports + " imported files reached.  The following file ( " + ( i + 1 ) + " of " + arraySize + " ) must be imported manually: file = " + myFileName + "; URL = " + currentValue + "; MIME type = " + myMIMEType;
						
						// add note
						addNote( item_IN, tag_IN, overflowNote, valueArray_IN );
						
						// output debug message
						Zotero.debug( " *** In RIS.js, processLinkTag(): " + overflowNote );
						
						// add flag to item itself
						item_IN.fileImportLimitReached = true;
					}
				}
				
			} //-- END loop over values --//
		}
	}			
	else if( tag_IN == "L2" )
	{
		item_IN.attachments.push({url:value_IN, mimeType:"text/html", title:"Full Text (HTML)", downloadable:true});
	}
	else if( tag_IN == "L4")
	{
		item_IN.attachments.push({url:value_IN, title:"Image", downloadable:true});
	}
	
	item_OUT = item_IN;
	return item_OUT;

} //-- END function processLinkTag() --//


function processPB( item_IN, tag_IN, value_IN, valueArray_IN )
{
	
	// return reference
	var item_OUT = item_IN;

	// publisher (patent: references)
	if (item_OUT.itemType == "patent")
	{
		item_OUT.references = value_IN;
	}
	// in EndNote, manuscript's location is in PB.
	else if ( item_OUT.itemType == "manuscript" )
	{
		// store in place and in university
		appendToItemField( item_OUT, "place", value_IN, ", " );
		appendToItemField( item_OUT, "university", value_IN, ", " );
	}
	else
	{
		item_OUT.publisher = value_IN;
	}
	
	return item_OUT;

} //-- end function processPB() --//


function processPYorY1( item_IN, tag_IN, value_IN, valueArray_IN )
{
	
	// return reference
	var item_OUT = item_IN;

	// add date to "date"
	addDate( item_OUT, "date", value_IN, false );	
	
	return item_OUT;

} //-- end function processT2() --//


function processSN( item_IN, tag_IN, value_IN, valueArray_IN )
{
	
	// return reference
	var item_OUT = item_IN;

	// ISSN/ISBN - just add both
	// TODO We should be able to tell these apart
	// ISSN = 8 digits
	// ISBN = 10 or 13 digits
	// would need to strip out "-" before checking length.
	// If longer than 13, put in both.
	// probably worth appending if ISBN, ISSN already set, too, since you could have both in one document.
	// As far as EndNote is concerned, could just look at type - in SN, it passes ISBN with books, ISSN with non-books.
	if ( !item_OUT.ISBN )
	{
		item_OUT.ISBN = value_IN;
	}
	else
	{
		item_OUT.ISBN = item_OUT.ISBN + ", " + value_IN;
	}

	if( !item_OUT.ISSN )
	{
		item_OUT.ISSN = value_IN;
	}
	else
	{
		item_OUT.ISSN = item_OUT.ISSN + ", " + value_IN;
	}

	return item_OUT;

} //-- end function processSN() --//


function processSP( item_IN, tag_IN, value_IN, valueArray_IN )
{
	
	// return reference
	var item_OUT = item_IN;

	// start page
	if ( !item_OUT.pages )
	{
		item_OUT.pages = value_IN;
	}
	else if ( item_OUT.pages[0] == "-" )
	{
		// already have ending page
		item_OUT.pages = value_IN + item_OUT.pages;
	}
	else
	{
		// multiple ranges? hey, it's a possibility
		item_OUT.pages += ", "+value_IN;
	}

	if ( ( item_OUT.itemType == "book" ) || ( item_OUT.itemType == "manuscript" ) )
	{
		// In EndNote, book's and manuscript's number of pages are in SP.
		item_OUT.numPages = value_IN;
	}

	if ( item_OUT.itemType == "webpage" )
	{
		// In EndNote, web page's description is in SP (yeah...).
		addNote( item_IN, tag_IN, value_IN, valueArray_IN );
	}

	return item_OUT;

} //-- end function processSP() --//


function processT2( item_IN, tag_IN, value_IN, valueArray_IN )
{
	
	// return reference
	var item_OUT = item_IN;

	if ( item_OUT.itemType == "book" )
	{
		// EndNote places series name in T2 for books.
		item_OUT.series = value_IN;
	}
	else
	{
		item_OUT.backupPublicationTitle = value_IN;
	}
	
	return item_OUT;

} //-- end function processT2() --//


function processT3( item_IN, tag_IN, value_IN, valueArray_IN )
{
	
	// return reference
	var item_OUT = item_IN;

	if ( item_OUT.itemType == "manuscript" )
	{
		// EndNote places department name in T3 for manuscripts.  Append to
		//    university and place.
		appendToItemField( item_OUT, "place", value_IN, ", " );
		appendToItemField( item_OUT, "university", value_IN, ", " );
	}
	else
	{
		item_OUT.series = value_IN;
	}
	
	return item_OUT;

} //-- end function processT2() --//


function processTY( item_IN, tag_IN, value_IN, valueArray_IN )
{
	
	// return reference
	var item_OUT = item_IN;

	// declare variables
	var value = "";

	// look for type
	
	// trim the whitespace that some providers (e.g. ProQuest) include
	value = Zotero.Utilities.trim( value_IN );
	
	// no longer check the typeMap
	//for(var i in typeMap) {
	//	if(value == typeMap[i]) {
	//		item.itemType = i;
	//	}
	//}
	
	// just check inputTypeMap
	if ( !item_OUT.itemType)
	{
		if ( inputTypeMap[ value ] )
		{
			item_OUT.itemType = inputTypeMap[ value ];
			Zotero.debug( " *** in RIS.js, processTY(): value = " + value + "; itemType = " + item_OUT.itemType );
		}
		else
		{
			// default to generic from inputTypeMap
			item_OUT.itemType = inputTypeMap[ "GEN" ];
		}
	}
	
	// store the item's original type value, for use later
	item_OUT.originalItemType = value;
	
	return item_OUT;

} //-- end function processTY() --//


function processVL( item_IN, tag_IN, value_IN, valueArray_IN )
{
	
	// return reference
	var item_OUT = item_IN;

	// Volume Number (patent: applicationNumber)
	if (item_OUT.itemType == "patent")
	{
		item_OUT.applicationNumber = value_IN;
	// Report Number (report: reportNumber)
	}
	else if ( item_OUT.itemType == "report" )
	{
		item_OUT.reportNumber = value_IN;
	}
	else if ( item_OUT.itemType == "webpage" )
	{
		// in EndNote, webpage's access year is stored in VL.
		appendToItemField( item_OUT, "accessDate", value_IN, ", " );
	}
	else
	{
		item_OUT.volume = value_IN;
	}

	return item_OUT;

} //-- end function processVL() --//


function processY2( item_IN, tag_IN, value_IN, valueArray_IN )
{
	
	// return reference
	var item_OUT = item_IN;
	var previousDateValue = "";

	// the secondary date field can mean two things, a secondary date, or an
	// invalid EndNote-style date. let's see which one this is.
	// patent: application (filing) date -- do not append to date field 
	var dateParts = value_IN.split("/");
	
	if ( dateParts.length != 4 && item_OUT.itemType != "patent" )
	{
		// an invalid date and not a patent. 
		// It's from EndNote or Delphion (YYYY-MM-DD)
		
		// grab old date value
		previousDateValue = item_OUT.date;
		
		// overwrite with the date passed in.
		addDate( item_OUT, "date", value_IN, false );
		
		// see if we append the previous date value to the end.
		if( previousDateValue && value_IN.indexOf( previousDateValue ) == -1 )
		{
			// append existing year (previous date value)
			item_OUT.date += " " + previousDateValue;
		}
	}
	else if ( item_OUT.itemType == "patent" )
	{
		
		// add date
		addDate( item_OUT, "filingDate", value_IN, false );

	}
	else
	{
		// ToDo: Handle correctly formatted Y2 fields (secondary date)
		// add date to "date"
		// correctly formatted date - append to "date" field.
		addDate( item_OUT, "date", value_IN, true );
	}

	return item_OUT;

} //-- end function processY2() --//


var risFieldToImportFieldMap = {
	"A1" : new ImportField( ImportField.IN_TYPE_FUNCTION, "", processCreator, true ),
	"A2" : new ImportField( ImportField.IN_TYPE_FUNCTION, "", processCreator, true ),
	"A3" : new ImportField( ImportField.IN_TYPE_FUNCTION, "", processCreator, true ),
	"AB" : new ImportField( ImportField.IN_TYPE_DIRECT_APPEND, "abstractNote", null, true ),
	"AU" : new ImportField( ImportField.IN_TYPE_FUNCTION, "", processCreator, true ),
	"BT" : new ImportField( ImportField.IN_TYPE_FUNCTION, "", processBT, true ),
	"CN" : new ImportField( ImportField.IN_TYPE_DIRECT, "callNumber", null, false ),
	"CT" : new ImportField( ImportField.IN_TYPE_DIRECT, "title", null, true ),
	"CY" : new ImportField( ImportField.IN_TYPE_DIRECT, "place", null, true ),
	//"DA" : new ImportField( ImportField.IN_TYPE_FUNCTION, "", processDA, false ),
	//"DA" : new ImportField( ImportField.IN_TYPE_DIRECT, "accessDate", null, false ),
	"DO" : new ImportField( ImportField.IN_TYPE_DIRECT, "DOI", null, false ),
	"ED" : new ImportField( ImportField.IN_TYPE_FUNCTION, "", processCreator, true ),
	"EP" : new ImportField( ImportField.IN_TYPE_FUNCTION, "", processEP, true ),
	"ET" : new ImportField( ImportField.IN_TYPE_FUNCTION, "", processET, false ),
	"ID" : new ImportField( ImportField.IN_TYPE_DIRECT, "itemID", null, false ),
	"IS" : new ImportField( ImportField.IN_TYPE_FUNCTION, "", processIS, true ),
	"JA" : new ImportField( ImportField.IN_TYPE_DIRECT, "journalAbbreviation", null, true ),
	"J2" : new ImportField( ImportField.IN_TYPE_DIRECT, "journalAbbreviation", null, true ),
	"JF" : new ImportField( ImportField.IN_TYPE_DIRECT, "publicationTitle", null, true ),
	"JO" : new ImportField( ImportField.IN_TYPE_FUNCTION, "", processJO, true ),
	"KW" : new ImportField( ImportField.IN_TYPE_FUNCTION, "", processKW, true ),
	"L1" : new ImportField( ImportField.IN_TYPE_FUNCTION, "", processLinkTag, true ),
	"L2" : new ImportField( ImportField.IN_TYPE_FUNCTION, "", processLinkTag, true ),
	"L4" : new ImportField( ImportField.IN_TYPE_FUNCTION, "", processLinkTag, true ),
	"M1" : new ImportField( ImportField.IN_TYPE_FUNCTION, "", addMisc, true ),
	"M2" : new ImportField( ImportField.IN_TYPE_FUNCTION, "", addMisc, true ),
	"M3" : new ImportField( ImportField.IN_TYPE_FUNCTION, "", addMisc, true ),
	"N1" : new ImportField( ImportField.IN_TYPE_FUNCTION, "", addNote, true ),
	"N2" : new ImportField( ImportField.IN_TYPE_DIRECT, "abstractNote", null, true ),
	"OP" : new ImportField( ImportField.IN_TYPE_FUNCTION, "", addNote, true ),
	"PB" : new ImportField( ImportField.IN_TYPE_FUNCTION, "", processPB, true ),
	"PY" : new ImportField( ImportField.IN_TYPE_FUNCTION, "", processPYorY1, true ),
	"RN" : new ImportField( ImportField.IN_TYPE_FUNCTION, "", addNote, false ),
	"RP" : new ImportField( ImportField.IN_TYPE_FUNCTION, "", addNote, true ),
	"SN" : new ImportField( ImportField.IN_TYPE_FUNCTION, "", processSN, true ),
	"SP" : new ImportField( ImportField.IN_TYPE_FUNCTION, "", processSP, true ),
	"ST" : new ImportField( ImportField.IN_TYPE_DIRECT, "shortTitle", null, true ),
	"T1" : new ImportField( ImportField.IN_TYPE_DIRECT, "title", null, true ),
	"T2" : new ImportField( ImportField.IN_TYPE_FUNCTION, "", processT2, true ),
	"T3" : new ImportField( ImportField.IN_TYPE_FUNCTION, "", processT3, true ),
	"TI" : new ImportField( ImportField.IN_TYPE_DIRECT, "title", null, true ),
	"TY" : new ImportField( ImportField.IN_TYPE_FUNCTION, "", processTY, true ),
	"UR" : new ImportField( ImportField.IN_TYPE_FUNCTION, "", processLinkTag, true ),
	"VL" : new ImportField( ImportField.IN_TYPE_FUNCTION, "", processVL, true ),
	"Y1" : new ImportField( ImportField.IN_TYPE_FUNCTION, "", processPYorY1, true ),
	"Y2" : new ImportField( ImportField.IN_TYPE_FUNCTION, "", processY2, true ),
	"RIS_unknown" : new ImportField( ImportField.IN_TYPE_FUNCTION, "", addNote, true )
	//"RIS_unknown" : new ImportField( ImportField.IN_TYPE_DIRECT_APPEND, "extra", null, true )
}


function processTag(item, tag, value, valueArray_IN )
{
	// declare variables
	var importFieldInstance = null;
	
	if (Zotero.Utilities.unescapeHTML) {
		value = Zotero.Utilities.unescapeHTML(value.replace("\n", "<br>", "g"));
	}
    
	// see if ImportField for current tag.
	importFieldInstance = risFieldToImportFieldMap[ tag ];
	if ( importFieldInstance )
	{
		// got one.  Process field.
		//Zotero.debug( "found match for " + tag );
		item = importFieldInstance.processImportField( item, tag, value, valueArray_IN );
	}
	else
	{
		
		// not yet. Unknown field - store contents in a note, so they at least aren't lost.
		//Zotero.debug( "no match for " + tag + " adding note." );
		//addNote( item, tag, "Unknown tag " + tag + ": " + value, valueArray_IN );
		unknownHandler = risFieldToImportFieldMap[ RIS_unknownTag ];
		item = unknownHandler.processImportField( item, RIS_unknownTag, "Unknown tag " + tag + ": " + value, valueArray_IN );
		
	}
} //-- end function processTag() --//

function completeItem(item)
{
	
	Zotero.debug( " *** in RIS.js, completeItem(): before completing item - original item type = " + item.originalItemType + "; itemType = " + item.itemType );
	
	// if backup publication title exists but not proper, use backup
	// (hack to get newspaper titles from EndNote)
	if(item.backupPublicationTitle) {
		if(!item.publicationTitle) {
			item.publicationTitle = item.backupPublicationTitle;
		}
		item.backupPublicationTitle = undefined;
	}
	// hack for sites like Nature, which only use JA, journal abbreviation
	if(item.journalAbbreviation && !item.publicationTitle){
		item.publicationTitle = item.journalAbbreviation;
	}
	item.complete();
}

function doImport(attachments) {
	var line = true;
	var tag = data = false;
	var dataArray = new Array();
	
	do {    // first valid line is type
		line = Zotero.read();
		line = line.replace(/^\s+/, "");
	} while(line !== false && !line.substr(0, 6).match(/^TY {1,2}- /));

	var item = new Zotero.Item();
	var i = 0;
	if(attachments && attachments[i]) {
		item.attachments = attachments[i];
	}

	var tag = "TY";
	
	// Handle out-of-spec old EndNote exports
	if (line.substr(0, 5) == "TY - ") {
		var data = line.substr(5);
	}
	else {
		var data = line.substr(6);
	}
	
	var rawLine;
	while((rawLine = Zotero.read()) !== false) {    // until EOF
		// trim leading space if this line is not part of a note
		line = rawLine.replace(/^\s+/, "");
		if(line.substr(2, 4) == "  - " || line == "ER  -" || line.substr(0, 5) == "TY - ") {
			// if this line is a tag, take a look at the previous line to map
			// its tag
			if(tag) {
				Zotero.debug("tag: '"+tag+"'; data: '"+data+"'");
				processTag(item, tag, data, dataArray);
			}

			// then fetch the tag and data from this line
			tag = line.substr(0,2);
			
			// Handle out-of-spec old EndNote exports
			if (line.substr(0, 5) == "TY - ") {
				data = line.substr(5);
			}
			else {
				data = line.substr(6);
			}
			
			// clear out the data array
			dataArray = new Array();

			//
			//if ( tag == "L1" )
			//{
				// if this is L1, might be multiple links, one per line.  So, add to
				//    dataArray.
				//Zotero.debug( "*** data = " + data );
			// always do this, only use it if L1 for now - lets you
			//    differentiate between a bunch of stuff in one value and a list
			//    of things, one to a line, that were concatenated with spaces.
				dataArray.push( new String( data ) );
			//}

			if(tag == "ER") {	       // ER signals end of reference
				// unset info
				tag = data = false;
				// new item
				completeItem(item);
				item = new Zotero.Item();
				i++;
				if(attachments && attachments[i]) {
					item.attachments = attachments[i];
				}
			}
		}
		else
		{
			// otherwise, assume this is data from the previous line continued
			if(tag == "N1" || tag == "N2" || tag == "AB" || tag == "KW" || tag == "RN" )
			{
				// preserve line endings for N1/N2/AB fields, for EndNote
				// compatibility
				data += "\n"+rawLine;
			} else if(tag) {
				// otherwise, follow the RIS spec
				if(data[data.length-1] == " ") {
					data += rawLine;
				} else {
					data += " "+rawLine;
				}
				
				//if ( tag == "L1" )
				//{
					// if this is L1, might be multiple links, one per line.  So, add to
					//    dataArray.
					//Zotero.debug( "*** data = " + data );
					dataArray.push( new String( rawLine ) );
				//}
			}
		}
	}

	if(tag && tag != "ER") {	// save any unprocessed tags
		Zotero.debug(tag);
		processTag( item, tag, data, dataArray );
		completeItem(item);
	}
}

function addTag(tag, value) {
	if(value) {
		Zotero.write(tag+"  - "+value+"\r\n");
	}
}

function doExport() {
	var item;

	while(item = Zotero.nextItem()) {
		// can't store independent notes in RIS
		if(item.itemType == "note" || item.itemType == "attachment") {
			continue;
		}

		// type
		addTag("TY", typeMap[item.itemType] ? typeMap[item.itemType] : "GEN");

		// use field map
		for(var j in fieldMap) {
			if(item[fieldMap[j]]) addTag(j, item[fieldMap[j]]);
		}

		// creators
		for(var j in item.creators) {
			// only two types, primary and secondary
			var risTag;
			// authors and inventors are primary creators
			if (item.creators[j].creatorType == "author" || item.creators[j].creatorType == "inventor") {
				risTag = "A1";
			} else if (item.creators[j].creatorType == "editor") {
				risTag = "ED";
			} else {
				risTag = "A2";
			}

			addTag(risTag, item.creators[j].lastName+","+item.creators[j].firstName);
		}
		
		// assignee (patent)
		if(item.assignee) {
			addTag("A2", item.assignee);
		}
		
		// volume (patent: applicationNumber, report: reportNumber)
		if(item.volume || item.applicationNumber || item.reportNumber) {
			if (item.volume) {
				var value = item.volume;
			} else if(item.applicationNumber) {
				var value = item.applicationNumber;
			} else if(item.reportNumber) {
				var value = item.reportNumber;
			}
			addTag("VL", value);
		}
		
		// issue (patent: patentNumber)
		if(item.issue || item.patentNumber) {
			var value = (item.issue) ? item.issue : item.patentNumber;
			addTag("IS", value);
		}

		// publisher (patent: references)
		if(item.publisher || item.references) {
			var value = (item.publisher) ? item.publisher : item.references;
			addTag("PB", value);
		}


		// date
		if(item.date) {
			var date = Zotero.Utilities.strToDate(item.date);
			var string = date.year+"/";
			if(date.month != undefined) {
				// deal with javascript months
				date.month++;
				if(date.month < 10) string += "0";
				string += date.month;
			}
			string += "/";
			if(date.day != undefined) {
				if(date.day < 10) string += "0";
				string += date.day;
			}
			string += "/";
			if(date.part != undefined) {
				string += date.part;
			}
			addTag("PY", string);
		}
		
		// filingDate (patents)
		if(item.filingDate) {
			var date = Zotero.Utilities.strToDate(item.filingDate);
			var string = date.year+"/";
			if(date.month != undefined) {
				// deal with javascript months
				date.month++;
				if(date.month < 10) string += "0";
				string += date.month;
			}
			string += "/";
			if(date.day != undefined) {
				if(date.day < 10) string += "0";
				string += date.day;
			}
			string += "/";
			if(date.part != undefined) {
				string += date.part;
			}
			addTag("Y2", string);
		}

		// notes
		if(Zotero.getOption("exportNotes")) {
			for(var j in item.notes) {
				addTag("N1", item.notes[j].note.replace(/(?:\r\n?|\n)/g, "\r\n"));
			}
		}

		if(item.abstractNote) {
			addTag("N2", item.abstractNote.replace(/(?:\r\n?|\n)/g, "\r\n"));
		}
		else if(item.abstract) {
			// patent type has abstract
			addTag("N2", item.abstract.replace(/(?:\r\n?|\n)/g, "\r\n"));
		}

		// tags
		for each(var tag in item.tags) {
			addTag("KW", tag.tag);
		}

		// pages
		if(item.pages) {
			if(item.itemType == "book") {
				addTag("EP", item.pages);
			} else {
				var range = Zotero.Utilities.getPageRange(item.pages);
				addTag("SP", range[0]);
				addTag("EP", range[1]);
			}
		}

		// ISBN/ISSN
		addTag("SN", item.ISBN);
		addTag("SN", item.ISSN);

		// URL
		if(item.url) {
			addTag("UR", item.url);
		} else if(item.source && item.source.substr(0, 7) == "http://") {
			addTag("UR", item.source);
		}

		Zotero.write("ER  - \r\n\r\n");
	}
}

function parseFileName( string_IN )
{

	// return reference
	var value_OUT = "";
	
	// declare variables
	var filePath = "";
	var parsedFilePath = "";
	var pathArray = "";
	var pathArrayLength = -1;
	
	// make sure we have a string.
    filePath = new String( string_IN );
 
 	// break into array on slashes.  First try "/"
	pathArray = filePath.split( "/" );
	pathArrayLength = pathArray.length;
	
	// got anything?
	if ( pathArrayLength <= 0 )
	{
		// no.  Try back-slash.
		pathArray = fileString.split( "\\" );
		pathArrayLength = pathArray.length;
	}
	
 	// got anything?
 	if ( pathArrayLength > 0 )
 	{
 		// yes.  store last entry as fileName.
 		value_OUT = pathArray[ pathArrayLength -1 ];
 	}
 	else
 	{
 		// no matches. Just use value passed in.
 		value_OUT = filePath;
 	}

	return value_OUT;

} //-- END function parseFileName() --//

var extensionToMIMETypeMap = {
	"ez" : "application/andrew-inset",
	"ai" : "application/illustrator",
	"nb" : "application/mathematica",
	"bin" : "application/octet-stream",
	"oda" : "application/oda",
	"pdf" : "application/pdf",
	"xspf" : "application/xspf+xml",
	"pla" : "audio/x-iriver-pla",
	"pgp" : "application/pgp-encrypted",
	"gpg" : "application/pgp-encrypted",
	"asc" : "application/pgp-encrypted",
	"skr" : "application/pgp-keys",
	"pkr" : "application/pgp-keys",
	"asc" : "application/pgp-keys",
	"p7s" : "application/pkcs7-signature",
	"p10" : "application/pkcs10",
	"ps" : "application/postscript",
	"rtf" : "application/rtf",
	"siv" : "application/sieve",
	"smil" : "application/smil",
	"smi" : "application/smil",
	"sml" : "application/smil",
	"kino" : "application/smil",
	"sit" : "application/stuffit",
	"ged" : "application/x-gedcom",
	"gedcom" : "application/x-gedcom",
	"flv" : "application/x-flash-video",
	"sgf" : "application/x-go-sgf",
	"xlf" : "application/x-xliff",
	"xliff" : "application/x-xliff",
	"cdr" : "application/vnd.corel-draw",
	"hpgl" : "application/vnd.hp-hpgl",
	"pcl" : "application/vnd.hp-pcl",
	"123" : "application/vnd.lotus-1-2-3",
	"wk1" : "application/vnd.lotus-1-2-3",
	"wk3" : "application/vnd.lotus-1-2-3",
	"wk4" : "application/vnd.lotus-1-2-3",
	"wks" : "application/vnd.lotus-1-2-3",
	"xul" : "application/vnd.mozilla.xul+xml",
	"mdb" : "application/vnd.ms-access",
	"xls" : "application/vnd.ms-excel",
	"xlsx" : "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
	"xlc" : "application/vnd.ms-excel",
	"xll" : "application/vnd.ms-excel",
	"xlm" : "application/vnd.ms-excel",
	"xlw" : "application/vnd.ms-excel",
	"xla" : "application/vnd.ms-excel",
	"xlt" : "application/vnd.ms-excel",
	"xld" : "application/vnd.ms-excel",
	"ppz" : "application/vnd.ms-powerpoint",
	"ppt" : "application/vnd.ms-powerpoint",
	"pptx" : "application/vnd.openxmlformats-officedocument.presentationml.presentation",
	"pps" : "application/vnd.ms-powerpoint",
	"pot" : "application/vnd.ms-powerpoint",
	"xps" : "application/vnd.ms-xpsdocument",
	"doc" : "application/msword",
	"docx" : "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
	"tnef" : "application/vnd.ms-tnef",
	"tnf" : "application/vnd.ms-tnef",
	"winmail.dat" : "application/vnd.ms-tnef",
	"sdc" : "application/vnd.stardivision.calc",
	"sds" : "application/vnd.stardivision.chart",
	"sda" : "application/vnd.stardivision.draw",
	"sdd" : "application/vnd.stardivision.impress",
	"sdp" : "application/vnd.stardivision.impress",
	"smd" : "application/vnd.stardivision.mail",
	"smf" : "application/vnd.stardivision.math",
	"sdw" : "application/vnd.stardivision.writer",
	"vor" : "application/vnd.stardivision.writer",
	"sgl" : "application/vnd.stardivision.writer",
	"sxc" : "application/vnd.sun.xml.calc",
	"stc" : "application/vnd.sun.xml.calc.template",
	"sxd" : "application/vnd.sun.xml.draw",
	"std" : "application/vnd.sun.xml.draw.template",
	"sxi" : "application/vnd.sun.xml.impress",
	"sti" : "application/vnd.sun.xml.impress.template",
	"sxm" : "application/vnd.sun.xml.math",
	"sxw" : "application/vnd.sun.xml.writer",
	"sxg" : "application/vnd.sun.xml.writer.global",
	"stw" : "application/vnd.sun.xml.writer.template",
	"odt" : "application/vnd.oasis.opendocument.text",
	"ott" : "application/vnd.oasis.opendocument.text-template",
	"oth" : "application/vnd.oasis.opendocument.text-web",
	"odm" : "application/vnd.oasis.opendocument.text-master",
	"odg" : "application/vnd.oasis.opendocument.graphics",
	"otg" : "application/vnd.oasis.opendocument.graphics-template",
	"odp" : "application/vnd.oasis.opendocument.presentation",
	"otp" : "application/vnd.oasis.opendocument.presentation-template",
	"ods" : "application/vnd.oasis.opendocument.spreadsheet",
	"ots" : "application/vnd.oasis.opendocument.spreadsheet-template",
	"odc" : "application/vnd.oasis.opendocument.chart",
	"odf" : "application/vnd.oasis.opendocument.formula",
	"odb" : "application/vnd.oasis.opendocument.database",
	"odi" : "application/vnd.oasis.opendocument.image",
	"sis" : "application/vnd.symbian.install",
	"sisx" : "x-epoc/x-sisx-app",
	"wp" : "application/vnd.wordperfect",
	"wp4" : "application/vnd.wordperfect",
	"wp5" : "application/vnd.wordperfect",
	"wp6" : "application/vnd.wordperfect",
	"wpd" : "application/vnd.wordperfect",
	"wpp" : "application/vnd.wordperfect",
	"xbel" : "application/x-xbel",
	"7z" : "application/x-7z-compressed",
	"abw" : "application/x-abiword",
	"abw.crashed" : "application/x-abiword",
	"abw.gz" : "application/x-abiword",
	"zabw" : "application/x-abiword",
	"cue" : "application/x-cue",
	"sam" : "application/x-amipro",
	"as" : "application/x-applix-spreadsheet",
	"aw" : "application/x-applix-word",
	"a" : "application/x-archive",
	"arj" : "application/x-arj",
	"asp" : "application/x-asp",
	"bcpio" : "application/x-bcpio",
	"torrent" : "application/x-bittorrent",
	"blender" : "application/x-blender",
	"blend" : "application/x-blender",
	"dvi.bz2" : "application/x-bzdvi",
	"bz" : "application/x-bzip",
	"bz2" : "application/x-bzip",
	"tar.bz" : "application/x-bzip-compressed-tar",
	"tar.bz2" : "application/x-bzip-compressed-tar",
	"tbz" : "application/x-bzip-compressed-tar",
	"tbz2" : "application/x-bzip-compressed-tar",
	"pdf.bz2" : "application/x-bzpdf",
	"ps.bz2" : "application/x-bzpostscript",
	"cbr" : "application/x-cbr",
	"cbz" : "application/x-cbz",
	"iso" : "application/x-cd-image",
	"iso9660" : "application/x-cd-image",
	"cgi" : "application/x-cgi",
	"pgn" : "application/x-chess-pgn",
	"chm" : "application/x-chm",
	"Z" : "application/x-compress",
	"tar.gz" : "application/x-compressed-tar",
	"tgz" : "application/x-compressed-tar",
	"core" : "application/x-core",
	"cpio" : "application/x-cpio",
	"cpio.gz" : "application/x-cpio-compressed",
	"csh" : "application/x-csh",
	"dbf" : "application/x-dbf",
	"es" : "application/ecmascript",
	"dc" : "application/x-dc-rom",
	"nds" : "application/x-nintendo-ds-rom",
	"deb" : "application/x-deb",
	"ui" : "application/x-designer",
	"desktop" : "application/x-desktop",
	"kdelnk" : "application/x-desktop",
	"dia" : "application/x-dia-diagram",
	"dvi" : "application/x-dvi",
	"etheme" : "application/x-e-theme",
	"egon" : "application/x-egon",
	"exe" : "application/x-executable",
	"pfa" : "application/x-font-type1",
	"pfb" : "application/x-font-type1",
	"gsf" : "application/x-font-type1",
	"afm" : "application/x-font-afm",
	"bdf" : "application/x-font-bdf",
	"psf" : "application/x-font-linux-psf",
	"psf.gz" : "application/x-gz-font-linux-psf",
	"pcf" : "application/x-font-pcf",
	"pcf.Z" : "application/x-font-pcf", 
	"pcf.gz" : "application/x-font-pcf",
	"spd" : "application/x-font-speedo",
	"ttf" : "application/x-font-ttf",
	"ttc" : "application/x-font-ttf",
	"gb" : "application/x-gameboy-rom",
	"gba" : "application/x-gba-rom",
	"gen" : "application/x-genesis-rom",
	"md" : "application/x-genesis-rom",
	"gmo" : "application/x-gettext-translation",
	"mo" : "application/x-gettext-translation",
	"glade" : "application/x-glade",
	"gnucash" : "application/x-gnucash",
	"gnc" : "application/x-gnucash",
	"xac" : "application/x-gnucash",
	"gnumeric" : "application/x-gnumeric",
	"gp" : "application/x-gnuplot",
	"gplt" : "application/x-gnuplot",
	"gnuplot" : "application/x-gnuplot",
	"gra" : "application/x-graphite",
	"dvi.gz" : "application/x-gzdvi",
	"gz" : "application/x-gzip",
	"pdf.gz" : "application/x-gzpdf",
	"ps.gz" : "application/x-gzpostscript",
	"hdf" : "application/x-hdf",
	"jar" : "application/x-java-archive",
	"class" : "application/x-java",
	"jnlp" : "application/x-java-jnlp-file",
	"js" : "application/javascript",
	"jpr" : "application/x-jbuilder-project",
	"jpx" : "application/x-jbuilder-project",
	"karbon" : "application/x-karbon",
	"chrt" : "application/x-kchart",
	"kfo" : "application/x-kformula",
	"kil" : "application/x-killustrator",
	"flw" : "application/x-kivio",
	"kon" : "application/x-kontour",
	"kpm" : "application/x-kpovmodeler",
	"kpr" : "application/x-kpresenter",
	"kpt" : "application/x-kpresenter",
	"kra" : "application/x-krita",
	"ksp" : "application/x-kspread",
	"kud" : "application/x-kugar",
	"kwd" : "application/x-kword",
	"kwt" : "application/x-kword",
	"lha" : "application/x-lha",
	"lzh" : "application/x-lha",
	"lhz" : "application/x-lhz",
	"ts" : "application/x-linguist",
	"lyx" : "application/x-lyx",
	"lzo" : "application/x-lzop",
	"mgp" : "application/x-magicpoint",
	"mkv" : "video/x-matroska",
	"mka" : "audio/x-matroska",
	"ocl" : "text/x-ocl",
	"mif" : "application/x-mif",
	"exe" : "application/x-ms-dos-executable",
	"wri" : "application/x-mswrite",
	"msx" : "application/x-msx-rom",
	"m4" : "application/x-m4",
	"n64" : "application/x-n64-rom",
	"nes" : "application/x-nes-rom",
	"cdf" : "application/x-netcdf",
	"nc" : "application/x-netcdf",
	"o" : "application/x-object",
	"ogg" : "application/ogg",
	"ogx" : "application/ogg",
	"oga" : "audio/ogg",
	"ogv" : "video/ogg",
	"ogg" : "audio/x-vorbis+ogg",
	"ogg" : "audio/x-flac+ogg",
	"ogg" : "audio/x-speex+ogg",
	"spx" : "audio/x-speex",
	"ogg" : "video/x-theora+ogg",
	"ogm" : "video/x-ogm+ogg",
	"oleo" : "application/x-oleo",
	"pak" : "application/x-pak",
	"pdb" : "application/x-palm-database",
	"prc" : "application/x-palm-database",
	"par2" : "application/x-par2",
	"pl" : "application/x-perl",
	"pm" : "application/x-perl",
	"al" : "application/x-perl",
	"perl" : "application/x-perl",
	"php" : "application/x-php",
	"php3" : "application/x-php",
	"php4" : "application/x-php",
	"p12" : "application/x-pkcs12",
	"pfx" : "application/x-pkcs12",
	"pln" : "application/x-planperfect",
	"gmon.out" : "application/x-profile",
	"pw" : "application/x-pw",
	"pyc" : "application/x-python-bytecode",
	"pyo" : "application/x-python-bytecode",
	"wb1" : "application/x-quattropro",
	"wb2" : "application/x-quattropro",
	"wb3" : "application/x-quattropro",
	"qtl" : "application/x-quicktime-media-link",
	"qif" : "application/x-qw",
	"rar" : "application/x-rar",
	"dar" : "application/x-dar",
	"rej" : "application/x-reject",
	"rpm" : "application/x-rpm",
	"rb" : "application/x-ruby",
	"mab" : "application/x-markaby",
	"shar" : "application/x-shar",
	"la" : "application/x-shared-library-la",
	"so" : "application/x-sharedlib",
	"sh" : "application/x-shellscript",
	"swf" : "application/x-shockwave-flash",
	"spl" : "application/x-shockwave-flash",
	"shn" : "application/x-shorten",
	"siag" : "application/x-siag",
	"sms" : "application/x-sms-rom",
	"gg" : "application/x-sms-rom",
	"smc" : "application/x-snes-rom",
	"srt" : "application/x-subrip",
	"smi" : "application/x-sami",
	"sami" : "application/x-sami",
	"sub" : "text/x-microdvd",
	"sub" : "text/x-mpsub",
	"ssa" : "text/x-ssa",
	"ass" : "text/x-ssa",
	"sv4cpio" : "application/x-sv4cpio",
	"sv4crc" : "application/x-sv4crc",
	"tar" : "application/x-tar",
	"gtar" : "application/x-tar",
	"tar.z" : "application/x-tarz",
	"gf" : "application/x-tex-gf",
	"pk" : "application/x-tex-pk",
	"obj" : "application/x-tgif",
	"theme" : "application/x-theme",
	"bak" : "application/x-trash",
	"old" : "application/x-trash",
	"sik" : "application/x-trash",
	"tr" : "text/troff",
	"roff" : "text/troff",
	"t" : "text/troff",
	"man" : "application/x-troff-man",
	"tar.lzo" : "application/x-tzo",
	"tzo" : "application/x-tzo",
	"ustar" : "application/x-ustar",
	"src" : "application/x-wais-source",
	"wpg" : "application/x-wpg",
	"der" : "application/x-x509-ca-cert",
	"cer" : "application/x-x509-ca-cert",
	"crt" : "application/x-x509-ca-cert",
	"cert" : "application/x-x509-ca-cert",
	"pem" : "application/x-x509-ca-cert",
	"zoo" : "application/x-zoo",
	"xhtml" : "application/xhtml+xml",
	"zip" : "application/zip",
	"ac3" : "audio/ac3",
	"amr" : "audio/AMR",
	"awb" : "audio/AMR-WB",
	"au" : "audio/basic",
	"snd" : "audio/basic",
	"sid" : "audio/prs.sid",
	"psid" : "audio/prs.sid",
	"aiff" : "audio/x-aiff",
	"aif" : "audio/x-aiff",
	"aifc" : "audio/x-aiff",
	"ape" : "audio/x-ape",
	"it" : "audio/x-it",
	"flac" : "audio/x-flac",
	"wv" : "audio/x-wavpack",
	"wvp" : "audio/x-wavpack",
	"wvc" : "audio/x-wavpack-correction",
	"mid" : "audio/midi",
	"midi" : "audio/midi",
	"kar" : "audio/midi",
	"m4a" : "audio/mp4",
	"aac" : "audio/mp4",
	"mp4" : "video/mp4",
	"m4v" : "video/mp4",
	"m4b" : "audio/x-m4b",
	"3gp" : "video/3gpp",
	"3gpp" : "video/3gpp",
	"amr" : "video/3gpp",
	"mod" : "audio/x-mod",
	"ult" : "audio/x-mod",
	"uni" : "audio/x-mod",
	"m15" : "audio/x-mod",
	"mtm" : "audio/x-mod",
	"669" : "audio/x-mod",
	"mp2" : "audio/mp2",
	"mp3" : "audio/mpeg",
	"mpga" : "audio/mpeg",
	"m3u" : "audio/x-mpegurl",
	"vlc" : "audio/x-mpegurl",
	"asx" : "audio/x-ms-asx",
	"wax" : "audio/x-ms-asx",
	"wvx" : "audio/x-ms-asx",
	"wmx" : "audio/x-ms-asx",
	"psf" : "audio/x-psf",
	"minipsf" : "audio/x-minipsf",
	"psflib" : "audio/x-psflib",
	"wma" : "audio/x-ms-wma",
	"mpc" : "audio/x-musepack",
	"mpp" : "audio/x-musepack",
	"mp+" : "audio/x-musepack",
	"ra" : "audio/vnd.rn-realaudio",
	"rax" : "audio/vnd.rn-realaudio",
	"ram" : "application/ram",
	"rv" : "video/vnd.rn-realvideo",
	"rvx" : "video/vnd.rn-realvideo",
	"rm" : "application/vnd.rn-realmedia",
	"rmj" : "application/vnd.rn-realmedia",
	"rmm" : "application/vnd.rn-realmedia",
	"rms" : "application/vnd.rn-realmedia",
	"rmx" : "application/vnd.rn-realmedia",
	"rmvb" : "application/vnd.rn-realmedia",
	"rp" : "image/vnd.rn-realpix",
	"rt" : "text/vnd.rn-realtext",
	"s3m" : "audio/x-s3m",
	"pls" : "audio/x-scpls",
	"stm" : "audio/x-stm",
	"voc" : "audio/x-voc",
	"wav" : "audio/x-wav",
	"xi" : "audio/x-xi",
	"xm" : "audio/x-xm",
	"tta" : "audio/x-tta",
	"bmp" : "image/bmp",
	"wbmp" : "image/vnd.wap.wbmp",
	"cgm" : "image/cgm",
	"g3" : "image/fax-g3",
	"gif" : "image/gif",
	"ief" : "image/ief",
	"jpeg" : "image/jpeg",
	"jpg" : "image/jpeg",
	"jpe" : "image/jpeg",
	"jp2" : "image/jp2",
	"jpc" : "image/jp2",
	"jpx" : "image/jp2",
	"j2k" : "image/jp2",
	"jpf" : "image/jp2",
	"dds" : "image/x-dds",
	"pict" : "image/x-pict",
	"pict1" : "image/x-pict",
	"pict2" : "image/x-pict",
	"ufraw" : "application/x-ufraw",
	"dng" : "image/x-adobe-dng",
	"crw" : "image/x-canon-crw",
	"cr2" : "image/x-canon-cr2",
	"raf" : "image/x-fuji-raf",
	"dcr" : "image/x-kodak-dcr",
	"k25" : "image/x-kodak-k25",
	"kdc" : "image/x-kodak-kdc",
	"mrw" : "image/x-minolta-mrw",
	"nef" : "image/x-nikon-nef",
	"orf" : "image/x-olympus-orf",
	"raw" : "image/x-panasonic-raw",
	"pef" : "image/x-pentax-pef",
	"x3f" : "image/x-sigma-x3f",
	"srf" : "image/x-sony-srf",
	"sr2" : "image/x-sony-sr2",
	"arw" : "image/x-sony-arw",
	"png" : "image/png",
	"rle" : "image/rle",
	"svg" : "image/svg+xml",
	"svgz" : "image/svg+xml-compressed",
	"tif" : "image/tiff",
	"tiff" : "image/tiff",
	"dwg" : "image/vnd.dwg",
	"dxf" : "image/vnd.dxf",
	"3ds" : "image/x-3ds",
	"ag" : "image/x-applix-graphics",
	"eps.bz2" : "image/x-bzeps",
	"epsi.bz2" : "image/x-bzeps",
	"epsf.bz2" : "image/x-bzeps",
	"ras" : "image/x-cmu-raster",
	"xcf.gz" : "image/x-compressed-xcf",
	"xcf.bz2" : "image/x-compressed-xcf",
	"dcm" : "application/dicom",
	"docbook" : "application/docbook+xml",
	"djvu" : "image/vnd.djvu",
	"djv" : "image/vnd.djvu",
	"eps" : "image/x-eps",
	"epsi" : "image/x-eps",
	"epsf" : "image/x-eps",
	"fits" : "image/x-fits",
	"eps.gz" : "image/x-gzeps",
	"epsi.gz" : "image/x-gzeps",
	"epsf.gz" : "image/x-gzeps",
	"ico" : "image/x-ico",
	"icns" : "image/x-icns",
	"iff" : "image/x-iff",
	"ilbm" : "image/x-ilbm",
	"jng" : "image/x-jng",
	"lwo" : "image/x-lwo",
	"lwob" : "image/x-lwo",
	"lws" : "image/x-lws",
	"pntg" : "image/x-macpaint",
	"msod" : "image/x-msod",
	"pcd" : "image/x-photo-cd",
	"pnm" : "image/x-portable-anymap",
	"pbm" : "image/x-portable-bitmap",
	"pgm" : "image/x-portable-graymap",
	"ppm" : "image/x-portable-pixmap",
	"psd" : "image/x-psd",
	"rgb" : "image/x-rgb",
	"sgi" : "image/x-sgi",
	"sun" : "image/x-sun-raster",
	"icb" : "image/x-tga",
	"tga" : "image/x-tga",
	"tpic" : "image/x-tga",
	"vda" : "image/x-tga",
	"vst" : "image/x-tga",
	"cur" : "image/x-win-bitmap",
	"emf" : "image/x-emf",
	"wmf" : "image/x-wmf",
	"xbm" : "image/x-xbitmap",
	"xcf" : "image/x-xcf",
	"fig" : "image/x-xfig",
	"xpm" : "image/x-xpixmap",
	"xwd" : "image/x-xwindowdump",
	"rmail" : "message/x-gnu-rmail",
	"wrl" : "model/vrml",
	"vcs" : "text/calendar",
	"ics" : "text/calendar",
	"css" : "text/css",
	"cssl" : "text/css",
	"vcf" : "text/directory",
	"vct" : "text/directory",
	"gcrd" : "text/directory",
	"t2t" : "text/x-txt2tags",
	"vhd" : "text/x-vhdl",
	"vhdl" : "text/x-vhdl",
	"mml" : "text/mathml",
	"txt" : "text/plain",
	"asc" : "text/plain",
	"rdf" : "text/rdf",
	"rdfs" : "text/rdf",
	"owl" : "text/rdf",
	"rtx" : "text/richtext",
	"rss" : "application/rss+xml",
	"atom" : "application/atom+xml",
	"opml" : "text/x-opml+xml",
	"sgml" : "text/sgml",
	"sgm" : "text/sgml",
	"sylk" : "text/spreadsheet",
	"slk" : "text/spreadsheet",
	"tsv" : "text/tab-separated-values",
	"jad" : "text/vnd.sun.j2me.app-descriptor",
	"wml" : "text/vnd.wap.wml",
	"wmls" : "text/vnd.wap.wmlscript",
	"ace" : "application/x-ace",
	"adb" : "text/x-adasrc",
	"ads" : "text/x-adasrc",
	"authors" : "text/x-authors",
	"bib" : "text/x-bibtex",
	"hh" : "text/x-c++hdr",
	"hp" : "text/x-c++hdr",
	"hpp" : "text/x-c++hdr",
	"h++" : "text/x-c++hdr",
	"hxx" : "text/x-c++hdr",
	"cpp" : "text/x-c++src",
	"cxx" : "text/x-c++src",
	"cc" : "text/x-c++src",
	"c" : "text/x-c++src",
	"c++" : "text/x-c++src",
	"changeLog" : "text/x-changelog",
	"h" : "text/x-chdr",
	"csv" : "text/csv",
	"copying" : "text/x-copying",
	"credits" : "text/x-credits",
	"c" : "text/x-csrc",
	"cs" : "text/x-csharp",
	"vala" : "text/x-vala",
	"dcl" : "text/x-dcl",
	"dsl" : "text/x-dsl",
	"d" : "text/x-dsrc",
	"dtd" : "text/x-dtd",
	"el" : "text/x-emacs-lisp",
	"erl" : "text/x-erlang",
	"f" : "text/x-fortran",
	"f90" : "text/x-fortran",
	"f95" : "text/x-fortran",
	"for" : "text/x-fortran",
	"po" : "text/x-gettext-translation",
	"pot" : "text/x-gettext-translation-template",
	"html" : "text/html",
	"htm" : "text/html",
	"gtkrc" : "text/x-gtkrc",
	"gvp" : "text/x-google-video-pointer",
	"hs" : "text/x-haskell",
	"idl" : "text/x-idl",
	"install" : "text/x-install",
	"java" : "text/x-java",
	"ldif" : "text/x-ldif",
	"lhs" : "text/x-literate-haskell",
	"log" : "text/x-log",
	"makefile" : "text/x-makefile",
	"makefile" : "text/x-makefile",
	"gnumakefile" : "text/x-makefile",
	"moc" : "text/x-moc",
	"mup" : "text/x-mup",
	"not" : "text/x-mup",
	"m" : "text/x-objcsrc",
	"ml" : "text/x-ocaml",
	"mli" : "text/x-ocaml",
	"m" : "text/x-matlab",
	"p" : "text/x-pascal",
	"pas" : "text/x-pascal",
	"diff" : "text/x-patch",
	"patch" : "text/x-patch",
	"py" : "text/x-python",
	"lua" : "text/x-lua",
	"readme" : "text/x-readme",
	"nfo" : "text/x-readme",
	"spec" : "text/x-rpm-spec",
	"scm" : "text/x-scheme",
	"etx" : "text/x-setext",
	"sql" : "text/x-sql",
	"tcl" : "text/x-tcl",
	"tk" : "text/x-tcl",
	"tex" : "text/x-tex",
	"ltx" : "text/x-tex",
	"sty" : "text/x-tex",
	"cls" : "text/x-tex",
	"dtx" : "text/x-tex",
	"ins" : "text/x-tex",
	"latex" : "text/x-tex",
	"texi" : "text/x-texinfo",
	"texinfo" : "text/x-texinfo",
	"me" : "text/x-troff-me",
	"mm" : "text/x-troff-mm",
	"ms" : "text/x-troff-ms",
	"uil" : "text/x-uil",
	"uri" : "text/x-uri",
	"url" : "text/x-uri",
	"xmi" : "text/x-xmi",
	"fo" : "text/x-xslfo",
	"xslfo" : "text/x-xslfo",
	"xml" : "application/xml",
	"xsl" : "application/xml",
	"xslt" : "application/xml",
	"xbl" : "application/xml",
	"dv" : "video/dv",
	"mpeg" : "video/mpeg",
	"mpg" : "video/mpeg",
	"mp2" : "video/mpeg",
	"mpe" : "video/mpeg",
	"vob" : "video/mpeg",
	"m2t" : "video/mpeg",
	"qt" : "video/quicktime",
	"mov" : "video/quicktime",
	"moov" : "video/quicktime",
	"qtvr" : "video/quicktime",
	"qtif" : "image/x-quicktime",
	"qif" : "image/x-quicktime",
	"viv" : "video/vivo",
	"vivo" : "video/vivo",
	"anim1" : "video/x-anim",
	"anim2" : "video/x-anim",
	"anim3" : "video/x-anim",
	"anim4" : "video/x-anim",
	"anim5" : "video/x-anim",
	"anim6" : "video/x-anim",
	"anim7" : "video/x-anim",
	"anim8" : "video/x-anim",
	"anim9" : "video/x-anim",
	"animj" : "video/x-anim",
	"fli" : "video/x-flic",
	"flc" : "video/x-flic",
	"hwp" : "application/x-hwp",
	"hwt" : "application/x-hwt",
	"mng" : "video/x-mng",
	"asf" : "video/x-ms-asf",
	"nsc" : "application/x-netshow-channel",
	"wmv" : "video/x-ms-wmv",
	"avi" : "video/x-msvideo",
	"divx" : "video/x-msvideo",
	"nsv" : "video/x-nsv",
	"sdp" : "application/sdp",
	"movie" : "video/x-sgi-movie",
	"emp" : "application/vnd.emusic-emusic_package",
	"ica" : "application/x-ica",
	"xul" : "application/vnd.mozilla.xul+xml",
	"602" : "application/x-t602"
};

function getMIMEType( fileName_IN )
{

	// modified based on http://www.freedesktop.org/wiki/EdmondCaputo/getMIMEtype%20functions%20PHP%20and%20Javascript?action=AttachFile&do=view&target=getMIMEtype.js

	// return reference
	var value_OUT = "";

	// declare variables
	var fileName = "";
	var fileArray = null;
	var fileExtension = "";
	var fileMIMEType = "";
	
	// initialize default return MIME type
    value_OUT = "binary/octet-stream";

    // make sure we have a string.
    fileName = parseFileName( fileName_IN );
    fileName = new String( fileName );
 
	// got anything?
	if ( ( fileName != null ) && ( fileName != "" ) )
	{
		// convert filename to lower case. 	
	    fileName = fileName.toLowerCase();
	
		// get extension
		fileArray = fileName.split( "." );
	    fileExtension = fileArray[ fileArray.length - 1 ];
	
		// try looking up extension in extensionToMIMETypeMap
		fileMIMEType = extensionToMIMETypeMap[ fileExtension ];
		
		// got anything?
		if ( ( fileMIMEType == null ) || ( fileMIMEType == "" ) )
		{
			// no.  was array longer than 1?
			if ( fileArray.length > 1 )
			{
				// one more thing we can try.  Some of the "extensions" were
				//    things like tar.gz.  Since there was more than one dot,
				//    can try grabbing last two, putting a dot between them,
				//    and looking up again.
				fileExtension = fileArray[ fileArray.length - 2 ] + "." + fileArray[ fileArray.length - 1 ];
				fileMIMEType = extensionToMIMETypeMap[ fileExtension ];
			}
		}
		
		// see if we got anything to return.
		if ( ( fileMIMEType != null ) && ( fileMIMEType != "" ) )
		{
			// got something.  Set value_OUT.
			value_OUT = fileMIMEType;
		}
		
	} //-- end check to make sure a file name was passed in. --//
		
	return value_OUT;

} //-- END function getMIMEType() --//