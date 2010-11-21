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
	"lastUpdated":"2010-09-28 21:40:00"
}

Zotero.configure("dataMode", "line");
Zotero.addOption("exportNotes", true);
Zotero.addOption("exportCharset", "UTF-8");

// full path to EndNote directory that contains included files, including trailing slash.
var ENRIS_internalPDFPath = "/";

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
	JA:"journalAbbreviation",
	//M3:"DOI",
};

var inputFieldMap = {
	TI:"title",
	CT:"title",
	CY:"place",
	AB:"abstractNote",
	CN:"callNumber"
};

// TODO: figure out if these are the best types for letter, interview, webpage
var typeMap = {
	book:"BOOK",
	bookSection:"CHAP",
	journalArticle:"JOUR",
	magazineArticle:"MGZN",
	newspaperArticle:"NEWS",
	thesis:"THES",
	letter:"PCOMM",
	manuscript:"PAMP",
	interview:"PCOMM",
	film:"MPCT",
	artwork:"ART",
	report:"RPRT",
	bill:"BILL",
	case:"CASE",
	hearing:"HEAR",
	patent:"PAT",
	statute:"STAT",
	map:"MAP",
	blogPost:"ELEC",
	webpage:"ELEC",
	instantMessage:"ICOMM",
	forumPost:"ICOMM",
	email:"ICOMM",
	audioRecording:"SOUND",
	presentation:"GEN",
	videoRecording:"VIDEO",
	tvBroadcast:"GEN",
	radioBroadcast:"GEN",
	podcast:"GEN",
	computerProgram:"COMP",
	conferencePaper:"CONF",
	document:"GEN"
};

// supplements outputTypeMap for importing
// TODO: DATA, MUSIC
var inputTypeMap = {
	ABST:"journalArticle",
	ADVS:"film",
	CTLG:"magazineArticle",
	INPR:"manuscript",
	JFULL:"journalArticle",
	PAMP:"manuscript",
	SER:"book",
	SLIDE:"artwork",
	UNBILL:"manuscript"
};

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
	
	//Zotero.debug( "*** In processTag, value:" + value );
	
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
			for ( i = 0; i < arraySize; i++ )
			{

				// initialize variables
				myLinkType = "";
				myFileName = "Full Text (PDF)";
				myMIMEType = "";
				currentValue = new String( valueArray[ i ] );
				//currentValue = Zotero.Utilities.trim( currentValue );
				
				// if wanted to be all 
			
				// see what link type the current value is.
				// URL?
				if ( currentValue.search( /^\s*https?:\/\//i ) > -1 )
				{
				
					// type is URL
					myLinkType = linkType_URL;
				
				}
				// file?
				else if ( currentValue.search( /^\s*file:\/\//i ) > -1 )
				{
				
					// type is file
					myLinkType = linkType_file;
				
				}
				// EndNote internal file?
				else if ( currentValue.search( /^\s*internal-pdf:\/\//i ) > -1 )
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
					
						// yes.  If corrected path stored in ENRIS_internalPDFPath, correct
						//    (convert to file://).  If not, leave as is (it will break).
						if ( ( ENRIS_internalPDFPath != null ) && ( ENRIS_internalPDFPath != "" ) )
						{
							
							// got a correction path.  swap "internal-pdf://" for "file://<path>".
							currentValue = currentValue.replace( /^\s*internal-pdf:\/\//i, "file://" + ENRIS_internalPDFPath );
							
						}
					
					}
				
					// attach the item.
					item_IN.attachments.push({url:currentValue, mimeType:myMIMEType, title:myFileName, downloadable:true});
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

} //-- END function processLinkTag() --//

function processTag(item, tag, value, valueArray_IN ) {
	if (Zotero.Utilities.unescapeHTML) {
		value = Zotero.Utilities.unescapeHTML(value.replace("\n", "<br>", "g"));
	}
    
	if(fieldMap[tag]) {
		item[fieldMap[tag]] = value;
	} else if(inputFieldMap[tag]) {
		item[inputFieldMap[tag]] = value;
	} else if(tag == "TY") {
		// look for type
		
		// trim the whitespace that some providers (e.g. ProQuest) include
		value = Zotero.Utilities.trim(value);
		
		// first check typeMap
		for(var i in typeMap) {
			if(value == typeMap[i]) {
				item.itemType = i;
			}
		}
		// then check inputTypeMap
		if(!item.itemType) {
			if(inputTypeMap[value]) {
				item.itemType = inputTypeMap[value];
			} else {
				// default to generic from inputTypeMap
				item.itemType = inputTypeMap["GEN"];
			}
		}
	} else if(tag == "JO") {
		if (item.itemType == "conferencePaper"){
			item.conferenceName = value;
		} else {
			item.publicationTitle = value;
		}
	} else if(tag == "BT") {
		// ignore, unless this is a book or unpublished work, as per spec
		if(item.itemType == "book" || item.itemType == "manuscript") {
			item.title = value;
		} else {
			item.backupPublicationTitle = value;
		}
	} else if(tag == "T2") {
		item.backupPublicationTitle = value;
	} else if(tag == "A1" || tag == "AU") {
		// primary author (patent: inventor)
		// store Zotero "creator type" in temporary variable
		var tempType;
		if (item.itemType == "patent") {
			tempType = "inventor";
		} else {
			tempType = "author";
		}
		var names = value.split(/, ?/);
		item.creators.push({lastName:names[0], firstName:names[1], creatorType:tempType});
	} else if(tag == "ED") {
		var names = value.split(/, ?/);
		item.creators.push({lastName:names[0], firstName:names[1], creatorType:"editor"});
	} else if(tag == "A2") {
		// contributing author (patent: assignee)
		if (item.itemType == "patent") {
			if (item.assignee) {
				// Patents can have multiple assignees (applicants) but Zotero only allows a single
				// assignee field, so we  have to concatenate them together
				item.assignee += ", "+value;
			} else {
				item.assignee =  value;
			}
		} else {
			var names = value.split(/, ?/);
			item.creators.push({lastName:names[0], firstName:names[1], creatorType:"contributor"});
		}
	} else if(tag == "Y1" || tag == "PY") {
		// year or date
		var dateParts = value.split("/");

		if(dateParts.length == 1) {
			// technically, if there's only one date part, the file isn't valid
			// RIS, but EndNote writes this, so we have to too
			// Nick: RIS spec example records also only contain a single part
			// even though it says the slashes are not optional (?)
			item.date = value;
		} else {
			// in the case that we have a year and other data, format that way

			var month = parseInt(dateParts[1]);
			if(month) {
				month--;
			} else {
				month = undefined;
			}

			item.date = Zotero.Utilities.formatDate({year:dateParts[0],
								  month:month,
								  day:dateParts[2],
								  part:dateParts[3]});
		}
	} else if(tag == "Y2") {
		// the secondary date field can mean two things, a secondary date, or an
		// invalid EndNote-style date. let's see which one this is.
		// patent: application (filing) date -- do not append to date field 
		var dateParts = value.split("/");
		if(dateParts.length != 4 && item.itemType != "patent") {
			// an invalid date and not a patent. 
			// It's from EndNote or Delphion (YYYY-MM-DD)
			if(item.date && value.indexOf(item.date) == -1) {
				// append existing year
				value += " " + item.date;
			}
			item.date = value;
		} else if (item.itemType == "patent") {
				// Date-handling code copied from above
			if(dateParts.length == 1) {
				// technically, if there's only one date part, the file isn't valid
				// RIS, but EndNote writes this, so we have to too
				// Nick: RIS spec example records also only contain a single part
				// even though it says the slashes are not optional (?)
				item.filingDate = value;
			} else {
				// in the case that we have a year and other data, format that way

				var month = parseInt(dateParts[1]);
				if(month) {
					month--;
				} else {
					month = undefined;
				}

				item.filingDate = Zotero.Utilities.formatDate({year:dateParts[0],
								  month:month,
								  day:dateParts[2],
								  part:dateParts[3]});
			}
		} 
		// ToDo: Handle correctly formatted Y2 fields (secondary date)
	}
	// RN tag is EndNote research note tag.
	else if( tag == "N1" || tag == "AB" || tag == "RN" )
	{
		// notes
		if(value != item.title) {       // why does EndNote do this!?
			item.notes.push({note:value});
		}
	} else if( tag == "N2") {
		// abstract
		item.abstractNote = value;
	} else if( tag == "DO") {
		// DOI - EndNote default
		item.DOI = value;
	} else if(tag == "KW") {
		// keywords/tags
		
		// technically, treating newlines as new tags breaks the RIS spec, but
		// it's required to work with EndNote
		item.tags = item.tags.concat(value.split("\n"));
	} else if(tag == "SP") {
		// start page
		if(!item.pages) {
			item.pages = value;
		} else if(item.pages[0] == "-") {       // already have ending page
			item.pages = value + item.pages;
		} else {	// multiple ranges? hey, it's a possibility
			item.pages += ", "+value;
		}
	} else if(tag == "EP") {
		// end page
		if(value) {
			if(!item.pages) {
				item.pages = value;
			} else if(value != item.pages) {
				item.pages += "-"+value;
			}
		}
	} else if(tag == "SN") {
		// ISSN/ISBN - just add both
		// TODO We should be able to tell these apart
		// ISSN = 8 digits
		// ISBN = 10 or 13 digits
		// would need to strip out "-" before checking length.
		// If longer than 13, put in both.
		// probably worth appending if ISBN, ISSN already set, too, since you could have both in one document.
		// As far as EndNote is concerned, could just look at type - in SN, it passes ISBN with books, ISSN with non-books.
		if(!item.ISBN)
		{
			item.ISBN = value;
		}
		else
		{
			item.ISBN = item.ISBN + ", " + value;
		}
		if(!item.ISSN)
		{
			item.ISSN = value;
		}
		else
		{
			item.ISSN = item.ISSN + ", " + value;
		}
	}
	else if(tag == "UR" || tag == "L1" || tag == "L2" || tag == "L4")
	{
	
		// use the new processLinkTag() method to deal with links.  Time to start
		//    breaking this up.
		processLinkTag( item, tag, value, valueArray_IN );

	}
	else if (tag == "IS")
	{
		// Issue Number (patent: patentNumber)
		if (item.itemType == "patent") {
			item.patentNumber = value;
		} else {
			item.issue = value;
		}
	} else if (tag == "VL") {
		// Volume Number (patent: applicationNumber)
		if (item.itemType == "patent") {
			item.applicationNumber = value;
		// Report Number (report: reportNumber)
		} else if(item.itemType == "report") {
			item.reportNumber = value;
		} else {
			item.volume = value;
		}
	} else if (tag == "PB") {
		// publisher (patent: references)
		if (item.itemType == "patent") {
			item.references = value;
		} else {
			item.publisher = value;
		}
	} else if (tag == "M1" || tag == "M2") {
		// Miscellaneous fields
		if (!item.extra) {
			item.extra = value;
		} else {
			item.extra += "; "+value;
		}
	}
}

function completeItem(item) {
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
			if ( tag == "L1" )
			{
				// if this is L1, might be multiple links, one per line.  So, add to
				//    dataArray.
				//Zotero.debug( "*** data = " + data );
				dataArray.push( new String( data ) );
			}

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
				
				//
				if ( tag == "L1" )
				{
					// if this is L1, might be multiple links, one per line.  So, add to
					//    dataArray.
					//Zotero.debug( "*** data = " + data );
					dataArray.push( new String( rawLine ) );
				}
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
	
	// make sure we have a string.
    filePath = new String( string_IN );
 
 	// parse out slashes and get just the file name, not path information.
 	// look for all path items (separated by either / or \).
 	parsedFileName = filePath.match( /[^\/\\]*$/ );
 	
 	// got anything?
 	if ( ( parsedFileName != null ) && ( parsedFileName.length > 0 ) )
 	{
 		// yes.  store it as fileName.
 		value_OUT = parsedFileName;
 	}
 	else
 	{
 		// no matches. Just use value passed in.
 		value_OUT = filePath;
 	}

	return value_OUT;

} //-- END function parseFileName() --//

function getMIMEType( fileName_IN )
{

	// from http://www.freedesktop.org/wiki/EdmondCaputo/getMIMEtype%20functions%20PHP%20and%20Javascript?action=AttachFile&do=view&target=getMIMEtype.js

	// return reference
	var value_OUT = "";

	// declare variables
	var fileName = "";
	
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
	    
	  	// walk through file types we want to 
	    // walk through file types we want to 
        if ( fileName.search(/^.*\.ez$/)>=0 )
        {
            value_OUT = "application/andrew-inset";
        }
        else if ( fileName.search(/^.*\.ai$/) >= 0 )
        {
            value_OUT = "application/illustrator";
        }
        else if ( fileName.search(/^.*\.nb$/) >= 0 )
        {
            value_OUT = "application/mathematica";
        }
        else if ( fileName.search(/^.*\.bin$/) >= 0 )
        {
            value_OUT = "application/octet-stream";
        }
        else if ( fileName.search(/^.*\.oda$/) >= 0 )
        {
            value_OUT = "application/oda";
        }
        else if ( fileName.search(/^.*\.pdf$/) >= 0 )
        {
            value_OUT = "application/pdf";
        }
        else if ( fileName.search(/^.*\.xspf$/) >= 0 )
        {
            value_OUT = "application/xspf+xml";
        }
        else if ( fileName.search(/^.*\.pla$/) >= 0 )
        {
            value_OUT = "audio/x-iriver-pla";
        }
        else if ( fileName.search(/^.*\.pgp$/) >= 0 )
        {
            value_OUT = "application/pgp-encrypted";
        }
        else if ( fileName.search(/^.*\.gpg$/) >= 0 )
        {
            value_OUT = "application/pgp-encrypted";
        }
        else if ( fileName.search(/^.*\.asc$/) >= 0 )
        {
            value_OUT = "application/pgp-encrypted";
        }
        else if ( fileName.search(/^.*\.skr$/) >= 0 )
        {
            value_OUT = "application/pgp-keys";
        }
        else if ( fileName.search(/^.*\.pkr$/) >= 0 )
        {
            value_OUT = "application/pgp-keys";
        }
        else if ( fileName.search(/^.*\.asc$/) >= 0 )
        {
            value_OUT = "application/pgp-keys";
        }
        else if ( fileName.search(/^.*\.p7s$/) >= 0 )
        {
            value_OUT = "application/pkcs7-signature";
        }
        else if ( fileName.search(/^.*\.p10$/) >= 0 )
        {
            value_OUT = "application/pkcs10";
        }
        else if ( fileName.search(/^.*\.ps$/) >= 0 )
        {
            value_OUT = "application/postscript";
        }
        else if ( fileName.search(/^.*\.rtf$/) >= 0 )
        {
            value_OUT = "application/rtf";
        }
        else if ( fileName.search(/^.*\.siv$/) >= 0 )
        {
            value_OUT = "application/sieve";
        }
        else if ( fileName.search(/^.*\.smil$/) >= 0 )
        {
            value_OUT = "application/smil";
        }
        else if ( fileName.search(/^.*\.smi$/) >= 0 )
        {
            value_OUT = "application/smil";
        }
        else if ( fileName.search(/^.*\.sml$/) >= 0 )
        {
            value_OUT = "application/smil";
        }
        else if ( fileName.search(/^.*\.kino$/) >= 0 )
        {
            value_OUT = "application/smil";
        }
        else if ( fileName.search(/^.*\.sit$/) >= 0 )
        {
            value_OUT = "application/stuffit";
        }
        else if ( fileName.search(/^.*\.ged$/) >= 0 )
        {
            value_OUT = "application/x-gedcom";
        }
        else if ( fileName.search(/^.*\.gedcom$/) >= 0 )
        {
            value_OUT = "application/x-gedcom";
        }
        else if ( fileName.search(/^.*\.flv$/) >= 0 )
        {
            value_OUT = "application/x-flash-video";
        }
        else if ( fileName.search(/^.*\.sgf$/) >= 0 )
        {
            value_OUT = "application/x-go-sgf";
        }
        else if ( fileName.search(/^.*\.xlf$/) >= 0 )
        {
            value_OUT = "application/x-xliff";
        }
        else if ( fileName.search(/^.*\.xliff$/) >= 0 )
        {
            value_OUT = "application/x-xliff";
        }
        else if ( fileName.search(/^.*\.cdr$/) >= 0 )
        {
            value_OUT = "application/vnd.corel-draw";
        }
        else if ( fileName.search(/^.*\.hpgl$/) >= 0 )
        {
            value_OUT = "application/vnd.hp-hpgl";
        }
        else if ( fileName.search(/^.*\.pcl$/) >= 0 )
        {
            value_OUT = "application/vnd.hp-pcl";
        }
        else if ( fileName.search(/^.*\.123$/) >= 0 )
        {
            value_OUT = "application/vnd.lotus-1-2-3";
        }
        else if ( fileName.search(/^.*\.wk1$/) >= 0 )
        {
            value_OUT = "application/vnd.lotus-1-2-3";
        }
        else if ( fileName.search(/^.*\.wk3$/) >= 0 )
        {
            value_OUT = "application/vnd.lotus-1-2-3";
        }
        else if ( fileName.search(/^.*\.wk4$/) >= 0 )
        {
            value_OUT = "application/vnd.lotus-1-2-3";
        }
        else if ( fileName.search(/^.*\.wks$/) >= 0 )
        {
            value_OUT = "application/vnd.lotus-1-2-3";
        }
        else if ( fileName.search(/^.*\.xul$/) >= 0 )
        {
            value_OUT = "application/vnd.mozilla.xul+xml";
        }
        else if ( fileName.search(/^.*\.mdb$/) >= 0 )
        {
            value_OUT = "application/vnd.ms-access";
        }
        else if ( fileName.search(/^.*\.xls$/) >= 0 )
        {
            value_OUT = "application/vnd.ms-excel";
        }
        else if ( fileName.search(/^.*\.xlsx$/) >= 0 )
        {
            value_OUT = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
        }        
        else if ( fileName.search(/^.*\.xlc$/) >= 0 )
        {
            value_OUT = "application/vnd.ms-excel";
        }
        else if ( fileName.search(/^.*\.xll$/) >= 0 )
        {
            value_OUT = "application/vnd.ms-excel";
        }
        else if ( fileName.search(/^.*\.xlm$/) >= 0 )
        {
            value_OUT = "application/vnd.ms-excel";
        }
        else if ( fileName.search(/^.*\.xlw$/) >= 0 )
        {
            value_OUT = "application/vnd.ms-excel";
        }
        else if ( fileName.search(/^.*\.xla$/) >= 0 )
        {
            value_OUT = "application/vnd.ms-excel";
        }
        else if ( fileName.search(/^.*\.xlt$/) >= 0 )
        {
            value_OUT = "application/vnd.ms-excel";
        }
        else if ( fileName.search(/^.*\.xld$/) >= 0 )
        {
            value_OUT = "application/vnd.ms-excel";
        }
        else if ( fileName.search(/^.*\.ppz$/) >= 0 )
        {
            value_OUT = "application/vnd.ms-powerpoint";
        }
        else if ( fileName.search(/^.*\.ppt$/) >= 0 )
        {
            value_OUT = "application/vnd.ms-powerpoint";
        }
        else if ( fileName.search(/^.*\.pptx$/) >= 0 )
        {
            value_OUT = "application/vnd.openxmlformats-officedocument.presentationml.presentation";
        }
        else if ( fileName.search(/^.*\.pps$/) >= 0 )
        {
            value_OUT = "application/vnd.ms-powerpoint";
        }
        else if ( fileName.search(/^.*\.pot$/) >= 0 )
        {
            value_OUT = "application/vnd.ms-powerpoint";
        }
        else if ( fileName.search(/^.*\.xps$/) >= 0 )
        {
            value_OUT = "application/vnd.ms-xpsdocument";
        }
        else if ( fileName.search(/^.*\.doc$/) >= 0 )
        {
            value_OUT = "application/msword";
        }
        else if ( fileName.search(/^.*\.docx$/) >= 0 )
        {
            value_OUT = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
        }
        else if ( fileName.search(/^.*\.tnef$/) >= 0 )
        {
            value_OUT = "application/vnd.ms-tnef";
        }
        else if ( fileName.search(/^.*\.tnf$/) >= 0 )
        {
            value_OUT = "application/vnd.ms-tnef";
        }
        else if ( fileName.search(/^winmail\.dat$/) >= 0 )
        {
            value_OUT = "application/vnd.ms-tnef";
        }
        else if ( fileName.search(/^.*\.sdc$/) >= 0 )
        {
            value_OUT = "application/vnd.stardivision.calc";
        }
        else if ( fileName.search(/^.*\.sds$/) >= 0 )
        {
            value_OUT = "application/vnd.stardivision.chart";
        }
        else if ( fileName.search(/^.*\.sda$/) >= 0 )
        {
            value_OUT = "application/vnd.stardivision.draw";
        }
        else if ( fileName.search(/^.*\.sdd$/) >= 0 )
        {
            value_OUT = "application/vnd.stardivision.impress";
        }
        else if ( fileName.search(/^.*\.sdp$/) >= 0 )
        {
            value_OUT = "application/vnd.stardivision.impress";
        }
        else if ( fileName.search(/^.*\.smd$/) >= 0 )
        {
            value_OUT = "application/vnd.stardivision.mail";
        }
        else if ( fileName.search(/^.*\.smf$/) >= 0 )
        {
            value_OUT = "application/vnd.stardivision.math";
        }
        else if ( fileName.search(/^.*\.sdw$/) >= 0 )
        {
            value_OUT = "application/vnd.stardivision.writer";
        }
        else if ( fileName.search(/^.*\.vor$/) >= 0 )
        {
            value_OUT = "application/vnd.stardivision.writer";
        }
        else if ( fileName.search(/^.*\.sgl$/) >= 0 )
        {
            value_OUT = "application/vnd.stardivision.writer";
        }
        else if ( fileName.search(/^.*\.sxc$/) >= 0 )
        {
            value_OUT = "application/vnd.sun.xml.calc";
        }
        else if ( fileName.search(/^.*\.stc$/) >= 0 )
        {
            value_OUT = "application/vnd.sun.xml.calc.template";
        }
        else if ( fileName.search(/^.*\.sxd$/) >= 0 )
        {
            value_OUT = "application/vnd.sun.xml.draw";
        }
        else if ( fileName.search(/^.*\.std$/) >= 0 )
        {
            value_OUT = "application/vnd.sun.xml.draw.template";
        }
        else if ( fileName.search(/^.*\.sxi$/) >= 0 )
        {
            value_OUT = "application/vnd.sun.xml.impress";
        }
        else if ( fileName.search(/^.*\.sti$/) >= 0 )
        {
            value_OUT = "application/vnd.sun.xml.impress.template";
        }
        else if ( fileName.search(/^.*\.sxm$/) >= 0 )
        {
            value_OUT = "application/vnd.sun.xml.math";
        }
        else if ( fileName.search(/^.*\.sxw$/) >= 0 )
        {
            value_OUT = "application/vnd.sun.xml.writer";
        }
        else if ( fileName.search(/^.*\.sxg$/) >= 0 )
        {
            value_OUT = "application/vnd.sun.xml.writer.global";
        }
        else if ( fileName.search(/^.*\.stw$/) >= 0 )
        {
            value_OUT = "application/vnd.sun.xml.writer.template";
        }
        else if ( fileName.search(/^.*\.odt$/) >= 0 )
        {
            value_OUT = "application/vnd.oasis.opendocument.text";
        }
        else if ( fileName.search(/^.*\.ott$/) >= 0 )
        {
            value_OUT = "application/vnd.oasis.opendocument.text-template";
        }
        else if ( fileName.search(/^.*\.oth$/) >= 0 )
        {
            value_OUT = "application/vnd.oasis.opendocument.text-web";
        }
        else if ( fileName.search(/^.*\.odm$/) >= 0 )
        {
            value_OUT = "application/vnd.oasis.opendocument.text-master";
        }
        else if ( fileName.search(/^.*\.odg$/) >= 0 )
        {
            value_OUT = "application/vnd.oasis.opendocument.graphics";
        }
        else if ( fileName.search(/^.*\.otg$/) >= 0 )
        {
            value_OUT = "application/vnd.oasis.opendocument.graphics-template";
        }
        else if ( fileName.search(/^.*\.odp$/) >= 0 )
        {
            value_OUT = "application/vnd.oasis.opendocument.presentation";
        }
        else if ( fileName.search(/^.*\.otp$/) >= 0 )
        {
            value_OUT = "application/vnd.oasis.opendocument.presentation-template";
        }
        else if ( fileName.search(/^.*\.ods$/) >= 0 )
        {
            value_OUT = "application/vnd.oasis.opendocument.spreadsheet";
        }
        else if ( fileName.search(/^.*\.ots$/) >= 0 )
        {
            value_OUT = "application/vnd.oasis.opendocument.spreadsheet-template";
        }
        else if ( fileName.search(/^.*\.odc$/) >= 0 )
        {
            value_OUT = "application/vnd.oasis.opendocument.chart";
        }
        else if ( fileName.search(/^.*\.odf$/) >= 0 )
        {
            value_OUT = "application/vnd.oasis.opendocument.formula";
        }
        else if ( fileName.search(/^.*\.odb$/) >= 0 )
        {
            value_OUT = "application/vnd.oasis.opendocument.database";
        }
        else if ( fileName.search(/^.*\.odi$/) >= 0 )
        {
            value_OUT = "application/vnd.oasis.opendocument.image";
        }
        else if ( fileName.search(/^.*\.sis$/) >= 0 )
        {
            value_OUT = "application/vnd.symbian.install";
        }
        else if ( fileName.search(/^.*\.sisx$/) >= 0 )
        {
            value_OUT = "x-epoc/x-sisx-app";
        }
        else if ( fileName.search(/^.*\.wp$/) >= 0 )
        {
            value_OUT = "application/vnd.wordperfect";
        }
        else if ( fileName.search(/^.*\.wp4$/) >= 0 )
        {
            value_OUT = "application/vnd.wordperfect";
        }
        else if ( fileName.search(/^.*\.wp5$/) >= 0 )
        {
            value_OUT = "application/vnd.wordperfect";
        }
        else if ( fileName.search(/^.*\.wp6$/) >= 0 )
        {
            value_OUT = "application/vnd.wordperfect";
        }
        else if ( fileName.search(/^.*\.wpd$/) >= 0 )
        {
            value_OUT = "application/vnd.wordperfect";
        }
        else if ( fileName.search(/^.*\.wpp$/) >= 0 )
        {
            value_OUT = "application/vnd.wordperfect";
        }
        else if ( fileName.search(/^.*\.xbel$/) >= 0 )
        {
            value_OUT = "application/x-xbel"; }
        else if ( fileName.search(/^.*\.7z$/) >= 0 )
        {
            value_OUT = "application/x-7z-compressed";
        }
        else if ( fileName.search(/^.*\.abw$/) >= 0 )
        {
            value_OUT = "application/x-abiword";
        }
        else if ( fileName.search(/^.*\.abw\.CRASHED$/) >= 0 )
        {
            value_OUT = "application/x-abiword";
        }
        else if ( fileName.search(/^.*\.abw\.gz$/) >= 0 )
        {
            value_OUT = "application/x-abiword";
        }
        else if ( fileName.search(/^.*\.zabw$/) >= 0 )
        {
            value_OUT = "application/x-abiword";
        }
        else if ( fileName.search(/^.*\.cue$/) >= 0 )
        {
            value_OUT = "application/x-cue";
        }
        else if ( fileName.search(/^.*\.sam$/) >= 0 )
        {
            value_OUT = "application/x-amipro";
        }
        else if ( fileName.search(/^.*\.as$/) >= 0 )
        {
            value_OUT = "application/x-applix-spreadsheet";
        }
        else if ( fileName.search(/^.*\.aw$/) >= 0 )
        {
            value_OUT = "application/x-applix-word";
        }
        else if ( fileName.search(/^.*\.a$/) >= 0 )
        {
            value_OUT = "application/x-archive";
        }
        else if ( fileName.search(/^.*\.arj$/) >= 0 )
        {
            value_OUT = "application/x-arj";
        }
        else if ( fileName.search(/^.*\.asp$/) >= 0 )
        {
            value_OUT = "application/x-asp";
        }
        else if ( fileName.search(/^.*\.bcpio$/) >= 0 )
        {
            value_OUT = "application/x-bcpio";
        }
        else if ( fileName.search(/^.*\.torrent$/) >= 0 )
        {
            value_OUT = "application/x-bittorrent";
        }
        else if ( fileName.search(/^.*\.blender$/) >= 0 )
        {
            value_OUT = "application/x-blender";
        }
        else if ( fileName.search(/^.*\.blend$/) >= 0 )
        {
            value_OUT = "application/x-blender";
        }
        else if ( fileName.search(/^.*\.BLEND$/) >= 0 )
        {
            value_OUT = "application/x-blender";
        }
        else if ( fileName.search(/^.*\.dvi\.bz2$/) >= 0 )
        {
            value_OUT = "application/x-bzdvi";
        }
        else if ( fileName.search(/^.*\.bz$/) >= 0 )
        {
            value_OUT = "application/x-bzip";
        }
        else if ( fileName.search(/^.*\.bz2$/) >= 0 )
        {
            value_OUT = "application/x-bzip";
        }
        else if ( fileName.search(/^.*\.tar\.bz$/) >= 0 )
        {
            value_OUT = "application/x-bzip-compressed-tar";
        }
        else if ( fileName.search(/^.*\.tar\.bz2$/) >= 0 )
        {
            value_OUT = "application/x-bzip-compressed-tar";
        }
        else if ( fileName.search(/^.*\.tbz$/) >= 0 )
        {
            value_OUT = "application/x-bzip-compressed-tar";
        }
        else if ( fileName.search(/^.*\.tbz2$/) >= 0 )
        {
            value_OUT = "application/x-bzip-compressed-tar";
        }
        else if ( fileName.search(/^.*\.pdf\.bz2$/) >= 0 )
        {
            value_OUT = "application/x-bzpdf";
        }
        else if ( fileName.search(/^.*\.ps\.bz2$/) >= 0 )
        {
            value_OUT = "application/x-bzpostscript";
        }
        else if ( fileName.search(/^.*\.cbr$/) >= 0 )
        {
            value_OUT = "application/x-cbr";
        }
        else if ( fileName.search(/^.*\.cbz$/) >= 0 )
        {
            value_OUT = "application/x-cbz";
        }
        else if ( fileName.search(/^.*\.iso$/) >= 0 )
        {
            value_OUT = "application/x-cd-image";
        }
        else if ( fileName.search(/^.*\.iso9660$/) >= 0 )
        {
            value_OUT = "application/x-cd-image";
        }
        else if ( fileName.search(/^.*\.cgi$/) >= 0 )
        {
            value_OUT = "application/x-cgi";
        }
        else if ( fileName.search(/^.*\.pgn$/) >= 0 )
        {
            value_OUT = "application/x-chess-pgn";
        }
        else if ( fileName.search(/^.*\.chm$/) >= 0 )
        {
            value_OUT = "application/x-chm";
        }
        else if ( fileName.search(/^.*\.Z$/) >= 0 )
        {
            value_OUT = "application/x-compress";
        }
        else if ( fileName.search(/^.*\.tar\.gz$/) >= 0 )
        {
            value_OUT = "application/x-compressed-tar";
        }
        else if ( fileName.search(/^.*\.tgz$/) >= 0 )
        {
            value_OUT = "application/x-compressed-tar";
        }
        else if ( fileName.search(/^core$/) >= 0 )
        {
            value_OUT = "application/x-core";
        }
        else if ( fileName.search(/^.*\.cpio$/) >= 0 )
        {
            value_OUT = "application/x-cpio";
        }
        else if ( fileName.search(/^.*\.cpio\.gz$/) >= 0 )
        {
            value_OUT = "application/x-cpio-compressed";
        }
        else if ( fileName.search(/^.*\.csh$/) >= 0 )
        {
            value_OUT = "application/x-csh";
        }
        else if ( fileName.search(/^.*\.dbf$/) >= 0 )
        {
            value_OUT = "application/x-dbf";
        }
        else if ( fileName.search(/^.*\.es$/) >= 0 )
        {
            value_OUT = "application/ecmascript";
        }
        else if ( fileName.search(/^.*\.dc$/) >= 0 )
        {
            value_OUT = "application/x-dc-rom";
        }
        else if ( fileName.search(/^.*\.nds$/) >= 0 )
        {
            value_OUT = "application/x-nintendo-ds-rom";
        }
        else if ( fileName.search(/^.*\.deb$/) >= 0 )
        {
            value_OUT = "application/x-deb";
        }
        else if ( fileName.search(/^.*\.ui$/) >= 0 )
        {
            value_OUT = "application/x-designer";
        }
        else if ( fileName.search(/^.*\.desktop$/) >= 0 )
        {
            value_OUT = "application/x-desktop";
        }
        else if ( fileName.search(/^.*\.kdelnk$/) >= 0 )
        {
            value_OUT = "application/x-desktop";
        }
        else if ( fileName.search(/^.*\.dia$/) >= 0 )
        {
            value_OUT = "application/x-dia-diagram";
        }
        else if ( fileName.search(/^.*\.dvi$/) >= 0 )
        {
            value_OUT = "application/x-dvi";
        }
        else if ( fileName.search(/^.*\.etheme$/) >= 0 )
        {
            value_OUT = "application/x-e-theme";
        }
        else if ( fileName.search(/^.*\.egon$/) >= 0 )
        {
            value_OUT = "application/x-egon";
        }
        else if ( fileName.search(/^.*\.exe$/) >= 0 )
        {
            value_OUT = "application/x-executable";
        }
        else if ( fileName.search(/^.*\.pfa$/) >= 0 )
        {
            value_OUT = "application/x-font-type1";
        }
        else if ( fileName.search(/^.*\.pfb$/) >= 0 )
        {
            value_OUT = "application/x-font-type1";
        }
        else if ( fileName.search(/^.*\.gsf$/) >= 0 )
        {
            value_OUT = "application/x-font-type1";
        }
        else if ( fileName.search(/^.*\.afm$/) >= 0 )
        {
            value_OUT = "application/x-font-afm";
        }
        else if ( fileName.search(/^.*\.bdf$/) >= 0 )
        {
            value_OUT = "application/x-font-bdf";
        }
        else if ( fileName.search(/^.*\.psf$/) >= 0 )
        {
            value_OUT = "application/x-font-linux-psf";
        }
        else if ( fileName.search(/^.*\.psf\.gz$/) >= 0 )
        {
            value_OUT = "application/x-gz-font-linux-psf";
        }
        else if ( fileName.search(/^.*\.pcf$/) >= 0 )
        {
            value_OUT = "application/x-font-pcf";
        }
        else if ( fileName.search(/^.*\.pcf\.Z$/) >= 0 )
        {
            value_OUT = "application/x-font-pcf"; 
        }
        else if ( fileName.search(/^.*\.pcf\.gz$/) >= 0 ) {
            value_OUT = "application/x-font-pcf"; }
        else if ( fileName.search(/^.*\.spd$/) >= 0 ) {
            value_OUT = "application/x-font-speedo"; }
        else if ( fileName.search(/^.*\.ttf$/) >= 0 ) {
            value_OUT = "application/x-font-ttf"; }
        else if ( fileName.search(/^.*\.ttc$/) >= 0 ) {
            value_OUT = "application/x-font-ttf"; }
        else if ( fileName.search(/^.*\.gb$/) >= 0 ) {
            value_OUT = "application/x-gameboy-rom"; }
        else if ( fileName.search(/^.*\.gba$/) >= 0 ) {
            value_OUT = "application/x-gba-rom"; }
        else if ( fileName.search(/^.*\.gen$/) >= 0 ) {
            value_OUT = "application/x-genesis-rom"; }
        else if ( fileName.search(/^.*\.md$/) >= 0 ) {
            value_OUT = "application/x-genesis-rom"; }
        else if ( fileName.search(/^.*\.gmo$/) >= 0 ) {
            value_OUT = "application/x-gettext-translation"; }
        else if ( fileName.search(/^.*\.mo$/) >= 0 ) {
            value_OUT = "application/x-gettext-translation"; }
        else if ( fileName.search(/^.*\.glade$/) >= 0 ) {
            value_OUT = "application/x-glade"; }
        else if ( fileName.search(/^.*\.gnucash$/) >= 0 ) {
            value_OUT = "application/x-gnucash"; }
        else if ( fileName.search(/^.*\.gnc$/) >= 0 ) {
            value_OUT = "application/x-gnucash"; }
        else if ( fileName.search(/^.*\.xac$/) >= 0 ) {
            value_OUT = "application/x-gnucash"; }
        else if ( fileName.search(/^.*\.gnumeric$/) >= 0 ) {
            value_OUT = "application/x-gnumeric"; }
        else if ( fileName.search(/^.*\.gp$/) >= 0 ) {
            value_OUT = "application/x-gnuplot"; }
        else if ( fileName.search(/^.*\.gplt$/) >= 0 ) {
            value_OUT = "application/x-gnuplot"; }
        else if ( fileName.search(/^.*\.gnuplot$/) >= 0 ) {
            value_OUT = "application/x-gnuplot"; }
        else if ( fileName.search(/^.*\.gra$/) >= 0 ) {
            value_OUT = "application/x-graphite"; }
        else if ( fileName.search(/^.*\.dvi\.gz$/) >= 0 ) {
            value_OUT = "application/x-gzdvi"; }
        else if ( fileName.search(/^.*\.gz$/) >= 0 ) {
            value_OUT = "application/x-gzip"; }
        else if ( fileName.search(/^.*\.pdf\.gz$/) >= 0 ) {
            value_OUT = "application/x-gzpdf"; }
        else if ( fileName.search(/^.*\.ps\.gz$/) >= 0 ) {
            value_OUT = "application/x-gzpostscript"; }
        else if ( fileName.search(/^.*\.hdf$/) >= 0 ) {
            value_OUT = "application/x-hdf"; }
        else if ( fileName.search(/^.*\.jar$/) >= 0 ) {
            value_OUT = "application/x-java-archive"; }
        else if ( fileName.search(/^.*\.class$/) >= 0 ) {
            value_OUT = "application/x-java"; }
        else if ( fileName.search(/^.*\.jnlp$/) >= 0 ) {
            value_OUT = "application/x-java-jnlp-file"; }
        else if ( fileName.search(/^.*\.js$/) >= 0 ) {
            value_OUT = "application/javascript"; }
        else if ( fileName.search(/^.*\.jpr$/) >= 0 ) {
            value_OUT = "application/x-jbuilder-project"; }
        else if ( fileName.search(/^.*\.jpx$/) >= 0 ) {
            value_OUT = "application/x-jbuilder-project"; }
        else if ( fileName.search(/^.*\.karbon$/) >= 0 ) {
            value_OUT = "application/x-karbon"; }
        else if ( fileName.search(/^.*\.chrt$/) >= 0 ) {
            value_OUT = "application/x-kchart"; }
        else if ( fileName.search(/^.*\.kfo$/) >= 0 ) {
            value_OUT = "application/x-kformula"; }
        else if ( fileName.search(/^.*\.kil$/) >= 0 ) {
            value_OUT = "application/x-killustrator"; }
        else if ( fileName.search(/^.*\.flw$/) >= 0 ) {
            value_OUT = "application/x-kivio"; }
        else if ( fileName.search(/^.*\.kon$/) >= 0 ) {
            value_OUT = "application/x-kontour"; }
        else if ( fileName.search(/^.*\.kpm$/) >= 0 ) {
            value_OUT = "application/x-kpovmodeler"; }
        else if ( fileName.search(/^.*\.kpr$/) >= 0 ) {
            value_OUT = "application/x-kpresenter"; }
        else if ( fileName.search(/^.*\.kpt$/) >= 0 ) {
            value_OUT = "application/x-kpresenter"; }
        else if ( fileName.search(/^.*\.kra$/) >= 0 ) {
            value_OUT = "application/x-krita"; }
        else if ( fileName.search(/^.*\.ksp$/) >= 0 ) {
            value_OUT = "application/x-kspread"; }
        else if ( fileName.search(/^.*\.kud$/) >= 0 ) {
            value_OUT = "application/x-kugar"; }
        else if ( fileName.search(/^.*\.kwd$/) >= 0 ) {
            value_OUT = "application/x-kword"; }
        else if ( fileName.search(/^.*\.kwt$/) >= 0 ) {
            value_OUT = "application/x-kword"; }
        else if ( fileName.search(/^.*\.lha$/) >= 0 ) {
            value_OUT = "application/x-lha"; }
        else if ( fileName.search(/^.*\.lzh$/) >= 0 ) {
            value_OUT = "application/x-lha"; }
        else if ( fileName.search(/^.*\.lhz$/) >= 0 ) {
            value_OUT = "application/x-lhz"; }
        else if ( fileName.search(/^.*\.ts$/) >= 0 ) {
            value_OUT = "application/x-linguist"; }
        else if ( fileName.search(/^.*\.lyx$/) >= 0 ) {
            value_OUT = "application/x-lyx"; }
        else if ( fileName.search(/^.*\.lzo$/) >= 0 ) {
            value_OUT = "application/x-lzop"; }
        else if ( fileName.search(/^.*\.mgp$/) >= 0 ) {
            value_OUT = "application/x-magicpoint"; }
        else if ( fileName.search(/^.*\.mkv$/) >= 0 ) {
            value_OUT = "video/x-matroska"; }
        else if ( fileName.search(/^.*\.mka$/) >= 0 ) {
            value_OUT = "audio/x-matroska"; }
        else if ( fileName.search(/^.*\.ocl$/) >= 0 ) {
            value_OUT = "text/x-ocl"; }
        else if ( fileName.search(/^.*\.mif$/) >= 0 ) {
            value_OUT = "application/x-mif"; }
        else if ( fileName.search(/^.*\.exe$/) >= 0 ) {
            value_OUT = "application/x-ms-dos-executable"; }
        else if ( fileName.search(/^.*\.wri$/) >= 0 ) {
            value_OUT = "application/x-mswrite"; }
        else if ( fileName.search(/^.*\.msx$/) >= 0 ) {
            value_OUT = "application/x-msx-rom"; }
        else if ( fileName.search(/^.*\.m4$/) >= 0 ) {
            value_OUT = "application/x-m4"; }
        else if ( fileName.search(/^.*\.n64$/) >= 0 ) {
            value_OUT = "application/x-n64-rom"; }
        else if ( fileName.search(/^.*\.nes$/) >= 0 ) {
            value_OUT = "application/x-nes-rom"; }
        else if ( fileName.search(/^.*\.cdf$/) >= 0 ) {
            value_OUT = "application/x-netcdf"; }
        else if ( fileName.search(/^.*\.nc$/) >= 0 ) {
            value_OUT = "application/x-netcdf"; }
        else if ( fileName.search(/^.*\.o$/) >= 0 ) {
            value_OUT = "application/x-object"; }
        else if ( fileName.search(/^.*\.ogg$/) >= 0 ) {
            value_OUT = "application/ogg"; }
        else if ( fileName.search(/^.*\.ogx$/) >= 0 ) {
            value_OUT = "application/ogg"; }
        else if ( fileName.search(/^.*\.oga$/) >= 0 ) {
            value_OUT = "audio/ogg"; }
        else if ( fileName.search(/^.*\.ogv$/) >= 0 ) {
            value_OUT = "video/ogg"; }
        else if ( fileName.search(/^.*\.ogg$/) >= 0 ) {
            value_OUT = "audio/x-vorbis+ogg"; }
        else if ( fileName.search(/^.*\.ogg$/) >= 0 ) {
            value_OUT = "audio/x-flac+ogg"; }
        else if ( fileName.search(/^.*\.ogg$/) >= 0 ) {
            value_OUT = "audio/x-speex+ogg"; }
        else if ( fileName.search(/^.*\.spx$/) >= 0 ) {
            value_OUT = "audio/x-speex"; }
        else if ( fileName.search(/^.*\.ogg$/) >= 0 ) {
            value_OUT = "video/x-theora+ogg"; }
        else if ( fileName.search(/^.*\.ogm$/) >= 0 ) {
            value_OUT = "video/x-ogm+ogg"; }
        else if ( fileName.search(/^.*\.oleo$/) >= 0 ) {
            value_OUT = "application/x-oleo"; }
        else if ( fileName.search(/^.*\.pak$/) >= 0 ) {
            value_OUT = "application/x-pak"; }
        else if ( fileName.search(/^.*\.pdb$/) >= 0 ) {
            value_OUT = "application/x-palm-database"; }
        else if ( fileName.search(/^.*\.prc$/) >= 0 ) {
            value_OUT = "application/x-palm-database"; }
        else if ( fileName.search(/^.*\.PAR2$/) >= 0 ) {
            value_OUT = "application/x-par2"; }
        else if ( fileName.search(/^.*\.par2$/) >= 0 ) {
            value_OUT = "application/x-par2"; }
        else if ( fileName.search(/^.*\.pl$/) >= 0 ) {
            value_OUT = "application/x-perl"; }
        else if ( fileName.search(/^.*\.pm$/) >= 0 ) {
            value_OUT = "application/x-perl"; }
        else if ( fileName.search(/^.*\.al$/) >= 0 ) {
            value_OUT = "application/x-perl"; }
        else if ( fileName.search(/^.*\.perl$/) >= 0 ) {
            value_OUT = "application/x-perl"; }
        else if ( fileName.search(/^.*\.php$/) >= 0 ) {
            value_OUT = "application/x-php"; }
        else if ( fileName.search(/^.*\.php3$/) >= 0 ) {
            value_OUT = "application/x-php"; }
        else if ( fileName.search(/^.*\.php4$/) >= 0 ) {
            value_OUT = "application/x-php"; }
        else if ( fileName.search(/^.*\.p12$/) >= 0 ) {
            value_OUT = "application/x-pkcs12"; }
        else if ( fileName.search(/^.*\.pfx$/) >= 0 ) {
            value_OUT = "application/x-pkcs12"; }
        else if ( fileName.search(/^.*\.pln$/) >= 0 ) {
            value_OUT = "application/x-planperfect"; }
        else if ( fileName.search(/^gmon\.out$/) >= 0 ) {
            value_OUT = "application/x-profile"; }
        else if ( fileName.search(/^.*\.pw$/) >= 0 ) {
            value_OUT = "application/x-pw"; }
        else if ( fileName.search(/^.*\.pyc$/) >= 0 ) {
            value_OUT = "application/x-python-bytecode"; }
        else if ( fileName.search(/^.*\.pyo$/) >= 0 ) {
            value_OUT = "application/x-python-bytecode"; }
        else if ( fileName.search(/^.*\.wb1$/) >= 0 ) {
            value_OUT = "application/x-quattropro"; }
        else if ( fileName.search(/^.*\.wb2$/) >= 0 ) {
            value_OUT = "application/x-quattropro"; }
        else if ( fileName.search(/^.*\.wb3$/) >= 0 ) {
            value_OUT = "application/x-quattropro"; }
        else if ( fileName.search(/^.*\.qtl$/) >= 0 ) {
            value_OUT = "application/x-quicktime-media-link"; }
        else if ( fileName.search(/^.*\.qif$/) >= 0 ) {
            value_OUT = "application/x-qw"; }
        else if ( fileName.search(/^.*\.rar$/) >= 0 ) {
            value_OUT = "application/x-rar"; }
        else if ( fileName.search(/^.*\.dar$/) >= 0 ) {
            value_OUT = "application/x-dar"; }
        else if ( fileName.search(/^.*\.rej$/) >= 0 ) {
            value_OUT = "application/x-reject"; }
        else if ( fileName.search(/^.*\.rpm$/) >= 0 ) {
            value_OUT = "application/x-rpm"; }
        else if ( fileName.search(/^.*\.rb$/) >= 0 ) {
            value_OUT = "application/x-ruby"; }
        else if ( fileName.search(/^.*\.mab$/) >= 0 ) {
            value_OUT = "application/x-markaby"; }
        else if ( fileName.search(/^.*\.shar$/) >= 0 ) {
            value_OUT = "application/x-shar"; }
        else if ( fileName.search(/^.*\.la$/) >= 0 ) {
            value_OUT = "application/x-shared-library-la"; }
        else if ( fileName.search(/^.*\.so$/) >= 0 ) {
            value_OUT = "application/x-sharedlib"; }
        else if ( fileName.search(/^.*\.sh$/) >= 0 ) {
            value_OUT = "application/x-shellscript"; }
        else if ( fileName.search(/^.*\.swf$/) >= 0 ) {
            value_OUT = "application/x-shockwave-flash"; }
        else if ( fileName.search(/^.*\.spl$/) >= 0 ) {
            value_OUT = "application/x-shockwave-flash"; }
        else if ( fileName.search(/^.*\.shn$/) >= 0 ) {
            value_OUT = "application/x-shorten"; }
        else if ( fileName.search(/^.*\.siag$/) >= 0 ) {
            value_OUT = "application/x-siag"; }
        else if ( fileName.search(/^.*\.sms$/) >= 0 ) {
            value_OUT = "application/x-sms-rom"; }
        else if ( fileName.search(/^.*\.gg$/) >= 0 ) {
            value_OUT = "application/x-sms-rom"; }
        else if ( fileName.search(/^.*\.smc$/) >= 0 ) {
            value_OUT = "application/x-snes-rom"; }
        else if ( fileName.search(/^.*\.srt$/) >= 0 ) {
            value_OUT = "application/x-subrip"; }
        else if ( fileName.search(/^.*\.smi$/) >= 0 ) {
            value_OUT = "application/x-sami"; }
        else if ( fileName.search(/^.*\.sami$/) >= 0 ) {
            value_OUT = "application/x-sami"; }
        else if ( fileName.search(/^.*\.sub$/) >= 0 ) {
            value_OUT = "text/x-microdvd"; }
        else if ( fileName.search(/^.*\.sub$/) >= 0 ) {
            value_OUT = "text/x-mpsub"; }
        else if ( fileName.search(/^.*\.ssa$/) >= 0 ) {
            value_OUT = "text/x-ssa"; }
        else if ( fileName.search(/^.*\.ass$/) >= 0 ) {
            value_OUT = "text/x-ssa"; }
        else if ( fileName.search(/^.*\.sv4cpio$/) >= 0 ) {
            value_OUT = "application/x-sv4cpio"; }
        else if ( fileName.search(/^.*\.sv4crc$/) >= 0 ) {
            value_OUT = "application/x-sv4crc"; }
        else if ( fileName.search(/^.*\.tar$/) >= 0 ) {
            value_OUT = "application/x-tar"; }
        else if ( fileName.search(/^.*\.gtar$/) >= 0 ) {
            value_OUT = "application/x-tar"; }
        else if ( fileName.search(/^.*\.tar\.Z$/) >= 0 ) {
            value_OUT = "application/x-tarz"; }
        else if ( fileName.search(/^.*\.gf$/) >= 0 ) {
            value_OUT = "application/x-tex-gf"; }
        else if ( fileName.search(/^.*\.pk$/) >= 0 ) {
            value_OUT = "application/x-tex-pk"; }
        else if ( fileName.search(/^.*\.obj$/) >= 0 ) {
            value_OUT = "application/x-tgif"; }
        else if ( fileName.search(/^.*\.theme$/) >= 0 ) {
            value_OUT = "application/x-theme"; }
        else if ( fileName.search(/^.*~$/) >= 0 ) {
            value_OUT = "application/x-trash"; }
        else if ( fileName.search(/^.*%$/) >= 0 ) {
            value_OUT = "application/x-trash"; }
        else if ( fileName.search(/^.*\.bak$/) >= 0 ) {
            value_OUT = "application/x-trash"; }
        else if ( fileName.search(/^.*\.old$/) >= 0 ) {
            value_OUT = "application/x-trash"; }
        else if ( fileName.search(/^.*\.sik$/) >= 0 ) {
            value_OUT = "application/x-trash"; }
        else if ( fileName.search(/^.*\.tr$/) >= 0 ) {
            value_OUT = "text/troff"; }
        else if ( fileName.search(/^.*\.roff$/) >= 0 ) {
            value_OUT = "text/troff"; }
        else if ( fileName.search(/^.*\.t$/) >= 0 ) {
            value_OUT = "text/troff"; }
        else if ( fileName.search(/^.*\.man$/) >= 0 ) {
            value_OUT = "application/x-troff-man"; }
        else if ( fileName.search(/^.*\.tar\.lzo$/) >= 0 ) {
            value_OUT = "application/x-tzo"; }
        else if ( fileName.search(/^.*\.tzo$/) >= 0 ) {
            value_OUT = "application/x-tzo"; }
        else if ( fileName.search(/^.*\.ustar$/) >= 0 ) {
            value_OUT = "application/x-ustar"; }
        else if ( fileName.search(/^.*\.src$/) >= 0 ) {
            value_OUT = "application/x-wais-source"; }
        else if ( fileName.search(/^.*\.wpg$/) >= 0 ) {
            value_OUT = "application/x-wpg"; }
        else if ( fileName.search(/^.*\.der$/) >= 0 ) {
            value_OUT = "application/x-x509-ca-cert"; }
        else if ( fileName.search(/^.*\.cer$/) >= 0 ) {
            value_OUT = "application/x-x509-ca-cert"; }
        else if ( fileName.search(/^.*\.crt$/) >= 0 ) {
            value_OUT = "application/x-x509-ca-cert"; }
        else if ( fileName.search(/^.*\.cert$/) >= 0 ) {
            value_OUT = "application/x-x509-ca-cert"; }
        else if ( fileName.search(/^.*\.pem$/) >= 0 ) {
            value_OUT = "application/x-x509-ca-cert"; }
        else if ( fileName.search(/^.*\.zoo$/) >= 0 ) {
            value_OUT = "application/x-zoo"; }
        else if ( fileName.search(/^.*\.xhtml$/) >= 0 ) {
            value_OUT = "application/xhtml+xml"; }
        else if ( fileName.search(/^.*\.zip$/) >= 0 ) {
            value_OUT = "application/zip"; }
        else if ( fileName.search(/^.*\.ac3$/) >= 0 ) {
            value_OUT = "audio/ac3"; }
        else if ( fileName.search(/^.*\.amr$/) >= 0 ) {
            value_OUT = "audio/AMR"; }
        else if ( fileName.search(/^.*\.awb$/) >= 0 ) {
            value_OUT = "audio/AMR-WB"; }
        else if ( fileName.search(/^.*\.au$/) >= 0 ) {
            value_OUT = "audio/basic"; }
        else if ( fileName.search(/^.*\.snd$/) >= 0 ) {
            value_OUT = "audio/basic"; }
        else if ( fileName.search(/^.*\.sid$/) >= 0 ) {
            value_OUT = "audio/prs.sid"; }
        else if ( fileName.search(/^.*\.psid$/) >= 0 ) {
            value_OUT = "audio/prs.sid"; }
        else if ( fileName.search(/^.*\.aiff$/) >= 0 ) {
            value_OUT = "audio/x-aiff"; }
        else if ( fileName.search(/^.*\.aif$/) >= 0 ) {
            value_OUT = "audio/x-aiff"; }
        else if ( fileName.search(/^.*\.aifc$/) >= 0 ) {
            value_OUT = "audio/x-aiff"; }
        else if ( fileName.search(/^.*\.ape$/) >= 0 ) {
            value_OUT = "audio/x-ape"; }
        else if ( fileName.search(/^.*\.it$/) >= 0 ) {
            value_OUT = "audio/x-it"; }
        else if ( fileName.search(/^.*\.flac$/) >= 0 ) {
            value_OUT = "audio/x-flac"; }
        else if ( fileName.search(/^.*\.wv$/) >= 0 ) {
            value_OUT = "audio/x-wavpack"; }
        else if ( fileName.search(/^.*\.wvp$/) >= 0 ) {
            value_OUT = "audio/x-wavpack"; }
        else if ( fileName.search(/^.*\.wvc$/) >= 0 ) {
            value_OUT = "audio/x-wavpack-correction"; }
        else if ( fileName.search(/^.*\.mid$/) >= 0 ) {
            value_OUT = "audio/midi"; }
        else if ( fileName.search(/^.*\.midi$/) >= 0 ) {
            value_OUT = "audio/midi"; }
        else if ( fileName.search(/^.*\.kar$/) >= 0 ) {
            value_OUT = "audio/midi"; }
        else if ( fileName.search(/^.*\.m4a$/) >= 0 ) {
            value_OUT = "audio/mp4"; }
        else if ( fileName.search(/^.*\.aac$/) >= 0 ) {
            value_OUT = "audio/mp4"; }
        else if ( fileName.search(/^.*\.mp4$/) >= 0 ) {
            value_OUT = "video/mp4"; }
        else if ( fileName.search(/^.*\.m4v$/) >= 0 ) {
            value_OUT = "video/mp4"; }
        else if ( fileName.search(/^.*\.m4b$/) >= 0 ) {
            value_OUT = "audio/x-m4b"; }
        else if ( fileName.search(/^.*\.3gp$/) >= 0 ) {
            value_OUT = "video/3gpp"; }
        else if ( fileName.search(/^.*\.3gpp$/) >= 0 ) {
            value_OUT = "video/3gpp"; }
        else if ( fileName.search(/^.*\.amr$/) >= 0 ) {
            value_OUT = "video/3gpp"; }
        else if ( fileName.search(/^.*\.mod$/) >= 0 ) {
            value_OUT = "audio/x-mod"; }
        else if ( fileName.search(/^.*\.ult$/) >= 0 ) {
            value_OUT = "audio/x-mod"; }
        else if ( fileName.search(/^.*\.uni$/) >= 0 ) {
            value_OUT = "audio/x-mod"; }
        else if ( fileName.search(/^.*\.m15$/) >= 0 ) {
            value_OUT = "audio/x-mod"; }
        else if ( fileName.search(/^.*\.mtm$/) >= 0 ) {
            value_OUT = "audio/x-mod"; }
        else if ( fileName.search(/^.*\.669$/) >= 0 ) {
            value_OUT = "audio/x-mod"; }
        else if ( fileName.search(/^.*\.mp2$/) >= 0 ) {
            value_OUT = "audio/mp2"; }
        else if ( fileName.search(/^.*\.mp3$/) >= 0 ) {
            value_OUT = "audio/mpeg"; }
        else if ( fileName.search(/^.*\.mpga$/) >= 0 ) {
            value_OUT = "audio/mpeg"; }
        else if ( fileName.search(/^.*\.m3u$/) >= 0 ) {
            value_OUT = "audio/x-mpegurl"; }
        else if ( fileName.search(/^.*\.vlc$/) >= 0 ) {
            value_OUT = "audio/x-mpegurl"; }
        else if ( fileName.search(/^.*\.asx$/) >= 0 ) {
            value_OUT = "audio/x-ms-asx"; }
        else if ( fileName.search(/^.*\.wax$/) >= 0 ) {
            value_OUT = "audio/x-ms-asx"; }
        else if ( fileName.search(/^.*\.wvx$/) >= 0 ) {
            value_OUT = "audio/x-ms-asx"; }
        else if ( fileName.search(/^.*\.wmx$/) >= 0 ) {
            value_OUT = "audio/x-ms-asx"; }
        else if ( fileName.search(/^.*\.psf$/) >= 0 ) {
            value_OUT = "audio/x-psf"; }
        else if ( fileName.search(/^.*\.minipsf$/) >= 0 ) {
            value_OUT = "audio/x-minipsf"; }
        else if ( fileName.search(/^.*\.psflib$/) >= 0 ) {
            value_OUT = "audio/x-psflib"; }
        else if ( fileName.search(/^.*\.wma$/) >= 0 ) {
            value_OUT = "audio/x-ms-wma"; }
        else if ( fileName.search(/^.*\.mpc$/) >= 0 ) {
            value_OUT = "audio/x-musepack"; }
        else if ( fileName.search(/^.*\.mpp$/) >= 0 ) {
            value_OUT = "audio/x-musepack"; }
        else if ( fileName.search(/^.*\.mp[+]$/) >= 0 ) {
            value_OUT = "audio/x-musepack"; }
        else if ( fileName.search(/^.*\.ra$/) >= 0 ) {
            value_OUT = "audio/vnd.rn-realaudio"; }
        else if ( fileName.search(/^.*\.rax$/) >= 0 ) {
            value_OUT = "audio/vnd.rn-realaudio"; }
        else if ( fileName.search(/^.*\.ram$/) >= 0 ) {
            value_OUT = "application/ram"; }
        else if ( fileName.search(/^.*\.rv$/) >= 0 ) {
            value_OUT = "video/vnd.rn-realvideo"; }
        else if ( fileName.search(/^.*\.rvx$/) >= 0 ) {
            value_OUT = "video/vnd.rn-realvideo"; }
        else if ( fileName.search(/^.*\.rm$/) >= 0 ) {
            value_OUT = "application/vnd.rn-realmedia"; }
        else if ( fileName.search(/^.*\.rmj$/) >= 0 ) {
            value_OUT = "application/vnd.rn-realmedia"; }
        else if ( fileName.search(/^.*\.rmm$/) >= 0 ) {
            value_OUT = "application/vnd.rn-realmedia"; }
        else if ( fileName.search(/^.*\.rms$/) >= 0 ) {
            value_OUT = "application/vnd.rn-realmedia"; }
        else if ( fileName.search(/^.*\.rmx$/) >= 0 ) {
            value_OUT = "application/vnd.rn-realmedia"; }
        else if ( fileName.search(/^.*\.rmvb$/) >= 0 ) {
            value_OUT = "application/vnd.rn-realmedia"; }
        else if ( fileName.search(/^.*\.rp$/) >= 0 ) {
            value_OUT = "image/vnd.rn-realpix"; }
        else if ( fileName.search(/^.*\.rt$/) >= 0 ) {
            value_OUT = "text/vnd.rn-realtext"; }
        else if ( fileName.search(/^.*\.s3m$/) >= 0 ) {
            value_OUT = "audio/x-s3m"; }
        else if ( fileName.search(/^.*\.pls$/) >= 0 ) {
            value_OUT = "audio/x-scpls"; }
        else if ( fileName.search(/^.*\.stm$/) >= 0 ) {
            value_OUT = "audio/x-stm"; }
        else if ( fileName.search(/^.*\.voc$/) >= 0 ) {
            value_OUT = "audio/x-voc"; }
        else if ( fileName.search(/^.*\.wav$/) >= 0 ) {
            value_OUT = "audio/x-wav"; }
        else if ( fileName.search(/^.*\.xi$/) >= 0 ) {
            value_OUT = "audio/x-xi"; }
        else if ( fileName.search(/^.*\.xm$/) >= 0 ) {
            value_OUT = "audio/x-xm"; }
        else if ( fileName.search(/^.*\.tta$/) >= 0 ) {
            value_OUT = "audio/x-tta"; }
        else if ( fileName.search(/^.*\.bmp$/) >= 0 ) {
            value_OUT = "image/bmp"; }
        else if ( fileName.search(/^.*\.wbmp$/) >= 0 ) {
            value_OUT = "image/vnd.wap.wbmp"; }
        else if ( fileName.search(/^.*\.cgm$/) >= 0 ) {
            value_OUT = "image/cgm"; }
        else if ( fileName.search(/^.*\.g3$/) >= 0 ) {
            value_OUT = "image/fax-g3"; }
        else if ( fileName.search(/^.*\.gif$/) >= 0 ) {
            value_OUT = "image/gif"; }
        else if ( fileName.search(/^.*\.ief$/) >= 0 ) {
            value_OUT = "image/ief"; }
        else if ( fileName.search(/^.*\.jpeg$/) >= 0 ) {
            value_OUT = "image/jpeg"; }
        else if ( fileName.search(/^.*\.jpg$/) >= 0 ) {
            value_OUT = "image/jpeg"; }
        else if ( fileName.search(/^.*\.jpe$/) >= 0 ) {
            value_OUT = "image/jpeg"; }
        else if ( fileName.search(/^.*\.jp2$/) >= 0 ) {
            value_OUT = "image/jp2"; }
        else if ( fileName.search(/^.*\.jpc$/) >= 0 ) {
            value_OUT = "image/jp2"; }
        else if ( fileName.search(/^.*\.jpx$/) >= 0 ) {
            value_OUT = "image/jp2"; }
        else if ( fileName.search(/^.*\.j2k$/) >= 0 ) {
            value_OUT = "image/jp2"; }
        else if ( fileName.search(/^.*\.jpf$/) >= 0 ) {
            value_OUT = "image/jp2"; }
        else if ( fileName.search(/^.*\.dds$/) >= 0 ) {
            value_OUT = "image/x-dds"; }
        else if ( fileName.search(/^.*\.pict$/) >= 0 ) {
            value_OUT = "image/x-pict"; }
        else if ( fileName.search(/^.*\.pict1$/) >= 0 ) {
            value_OUT = "image/x-pict"; }
        else if ( fileName.search(/^.*\.pict2$/) >= 0 ) {
            value_OUT = "image/x-pict"; }
        else if ( fileName.search(/^.*\.ufraw$/) >= 0 ) {
            value_OUT = "application/x-ufraw"; }
        else if ( fileName.search(/^.*\.dng$/) >= 0 ) {
            value_OUT = "image/x-adobe-dng"; }
        else if ( fileName.search(/^.*\.crw$/) >= 0 ) {
            value_OUT = "image/x-canon-crw"; }
        else if ( fileName.search(/^.*\.cr2$/) >= 0 ) {
            value_OUT = "image/x-canon-cr2"; }
        else if ( fileName.search(/^.*\.raf$/) >= 0 ) {
            value_OUT = "image/x-fuji-raf"; }
        else if ( fileName.search(/^.*\.dcr$/) >= 0 ) {
            value_OUT = "image/x-kodak-dcr"; }
        else if ( fileName.search(/^.*\.k25$/) >= 0 ) {
            value_OUT = "image/x-kodak-k25"; }
        else if ( fileName.search(/^.*\.kdc$/) >= 0 ) {
            value_OUT = "image/x-kodak-kdc"; }
        else if ( fileName.search(/^.*\.mrw$/) >= 0 ) {
            value_OUT = "image/x-minolta-mrw"; }
        else if ( fileName.search(/^.*\.nef$/) >= 0 ) {
            value_OUT = "image/x-nikon-nef"; }
        else if ( fileName.search(/^.*\.orf$/) >= 0 ) {
            value_OUT = "image/x-olympus-orf"; }
        else if ( fileName.search(/^.*\.raw$/) >= 0 ) {
            value_OUT = "image/x-panasonic-raw"; }
        else if ( fileName.search(/^.*\.pef$/) >= 0 ) {
            value_OUT = "image/x-pentax-pef"; }
        else if ( fileName.search(/^.*\.x3f$/) >= 0 ) {
            value_OUT = "image/x-sigma-x3f"; }
        else if ( fileName.search(/^.*\.srf$/) >= 0 ) {
            value_OUT = "image/x-sony-srf"; }
        else if ( fileName.search(/^.*\.sr2$/) >= 0 ) {
            value_OUT = "image/x-sony-sr2"; }
        else if ( fileName.search(/^.*\.arw$/) >= 0 ) {
            value_OUT = "image/x-sony-arw"; }
        else if ( fileName.search(/^.*\.png$/) >= 0 ) {
            value_OUT = "image/png"; }
        else if ( fileName.search(/^.*\.rle$/) >= 0 ) {
            value_OUT = "image/rle"; }
        else if ( fileName.search(/^.*\.svg$/) >= 0 ) {
            value_OUT = "image/svg+xml"; }
        else if ( fileName.search(/^.*\.svgz$/) >= 0 ) {
            value_OUT = "image/svg+xml-compressed"; }
        else if ( fileName.search(/^.*\.tif$/) >= 0 ) {
            value_OUT = "image/tiff"; }
        else if ( fileName.search(/^.*\.tiff$/) >= 0 ) {
            value_OUT = "image/tiff"; }
        else if ( fileName.search(/^.*\.dwg$/) >= 0 ) {
            value_OUT = "image/vnd.dwg"; }
        else if ( fileName.search(/^.*\.dxf$/) >= 0 ) {
            value_OUT = "image/vnd.dxf"; }
        else if ( fileName.search(/^.*\.3ds$/) >= 0 ) {
            value_OUT = "image/x-3ds"; }
        else if ( fileName.search(/^.*\.ag$/) >= 0 ) {
            value_OUT = "image/x-applix-graphics"; }
        else if ( fileName.search(/^.*\.eps\.bz2$/) >= 0 ) {
            value_OUT = "image/x-bzeps"; }
        else if ( fileName.search(/^.*\.epsi\.bz2$/) >= 0 ) {
            value_OUT = "image/x-bzeps"; }
        else if ( fileName.search(/^.*\.epsf\.bz2$/) >= 0 ) {
            value_OUT = "image/x-bzeps"; }
        else if ( fileName.search(/^.*\.ras$/) >= 0 ) {
            value_OUT = "image/x-cmu-raster"; }
        else if ( fileName.search(/^.*\.xcf\.gz$/) >= 0 ) {
            value_OUT = "image/x-compressed-xcf"; }
        else if ( fileName.search(/^.*\.xcf\.bz2$/) >= 0 ) {
            value_OUT = "image/x-compressed-xcf"; }
        else if ( fileName.search(/^.*\.dcm$/) >= 0 ) {
            value_OUT = "application/dicom"; }
        else if ( fileName.search(/^.*\.docbook$/) >= 0 ) {
            value_OUT = "application/docbook+xml"; }
        else if ( fileName.search(/^.*\.djvu$/) >= 0 ) {
            value_OUT = "image/vnd.djvu"; }
        else if ( fileName.search(/^.*\.djv$/) >= 0 ) {
            value_OUT = "image/vnd.djvu"; }
        else if ( fileName.search(/^.*\.eps$/) >= 0 ) {
            value_OUT = "image/x-eps"; }
        else if ( fileName.search(/^.*\.epsi$/) >= 0 ) {
            value_OUT = "image/x-eps"; }
        else if ( fileName.search(/^.*\.epsf$/) >= 0 ) {
            value_OUT = "image/x-eps"; }
        else if ( fileName.search(/^.*\.fits$/) >= 0 ) {
            value_OUT = "image/x-fits"; }
        else if ( fileName.search(/^.*\.eps\.gz$/) >= 0 ) {
            value_OUT = "image/x-gzeps"; }
        else if ( fileName.search(/^.*\.epsi\.gz$/) >= 0 ) {
            value_OUT = "image/x-gzeps"; }
        else if ( fileName.search(/^.*\.epsf\.gz$/) >= 0 ) {
            value_OUT = "image/x-gzeps"; }
        else if ( fileName.search(/^.*\.ico$/) >= 0 ) {
            value_OUT = "image/x-ico"; }
        else if ( fileName.search(/^.*\.icns$/) >= 0 ) {
            value_OUT = "image/x-icns"; }
        else if ( fileName.search(/^.*\.iff$/) >= 0 ) {
            value_OUT = "image/x-iff"; }
        else if ( fileName.search(/^.*\.ilbm$/) >= 0 ) {
            value_OUT = "image/x-ilbm"; }
        else if ( fileName.search(/^.*\.jng$/) >= 0 ) {
            value_OUT = "image/x-jng"; }
        else if ( fileName.search(/^.*\.lwo$/) >= 0 ) {
            value_OUT = "image/x-lwo"; }
        else if ( fileName.search(/^.*\.lwob$/) >= 0 ) {
            value_OUT = "image/x-lwo"; }
        else if ( fileName.search(/^.*\.lws$/) >= 0 ) {
            value_OUT = "image/x-lws"; }
        else if ( fileName.search(/^.*\.pntg$/) >= 0 ) {
            value_OUT = "image/x-macpaint"; }
        else if ( fileName.search(/^.*\.msod$/) >= 0 ) {
            value_OUT = "image/x-msod"; }
        else if ( fileName.search(/^.*\.pcd$/) >= 0 ) {
            value_OUT = "image/x-photo-cd"; }
        else if ( fileName.search(/^.*\.pnm$/) >= 0 ) {
            value_OUT = "image/x-portable-anymap"; }
        else if ( fileName.search(/^.*\.pbm$/) >= 0 ) {
            value_OUT = "image/x-portable-bitmap"; }
        else if ( fileName.search(/^.*\.pgm$/) >= 0 ) {
            value_OUT = "image/x-portable-graymap"; }
        else if ( fileName.search(/^.*\.ppm$/) >= 0 ) {
            value_OUT = "image/x-portable-pixmap"; }
        else if ( fileName.search(/^.*\.psd$/) >= 0 ) {
            value_OUT = "image/x-psd"; }
        else if ( fileName.search(/^.*\.rgb$/) >= 0 ) {
            value_OUT = "image/x-rgb"; }
        else if ( fileName.search(/^.*\.sgi$/) >= 0 ) {
            value_OUT = "image/x-sgi"; }
        else if ( fileName.search(/^.*\.sun$/) >= 0 ) {
            value_OUT = "image/x-sun-raster"; }
        else if ( fileName.search(/^.*\.icb$/) >= 0 ) {
            value_OUT = "image/x-tga"; }
        else if ( fileName.search(/^.*\.tga$/) >= 0 ) {
            value_OUT = "image/x-tga"; }
        else if ( fileName.search(/^.*\.tpic$/) >= 0 ) {
            value_OUT = "image/x-tga"; }
        else if ( fileName.search(/^.*\.vda$/) >= 0 ) {
            value_OUT = "image/x-tga"; }
        else if ( fileName.search(/^.*\.vst$/) >= 0 ) {
            value_OUT = "image/x-tga"; }
        else if ( fileName.search(/^.*\.cur$/) >= 0 ) {
            value_OUT = "image/x-win-bitmap"; }
        else if ( fileName.search(/^.*\.emf$/) >= 0 ) {
            value_OUT = "image/x-emf"; }
        else if ( fileName.search(/^.*\.wmf$/) >= 0 ) {
            value_OUT = "image/x-wmf"; }
        else if ( fileName.search(/^.*\.xbm$/) >= 0 ) {
            value_OUT = "image/x-xbitmap"; }
        else if ( fileName.search(/^.*\.xcf$/) >= 0 ) {
            value_OUT = "image/x-xcf"; }
        else if ( fileName.search(/^.*\.fig$/) >= 0 ) {
            value_OUT = "image/x-xfig"; }
        else if ( fileName.search(/^.*\.xpm$/) >= 0 ) {
            value_OUT = "image/x-xpixmap"; }
        else if ( fileName.search(/^.*\.xwd$/) >= 0 ) {
            value_OUT = "image/x-xwindowdump"; }
        else if ( fileName.search(/^RMAIL$/) >= 0 ) {
            value_OUT = "message/x-gnu-rmail"; }
        else if ( fileName.search(/^.*\.wrl$/) >= 0 ) {
            value_OUT = "model/vrml"; }
        else if ( fileName.search(/^.*\.vcs$/) >= 0 ) {
            value_OUT = "text/calendar"; }
        else if ( fileName.search(/^.*\.ics$/) >= 0 ) {
            value_OUT = "text/calendar"; }
        else if ( fileName.search(/^.*\.css$/) >= 0 ) {
            value_OUT = "text/css"; }
        else if ( fileName.search(/^.*\.CSSL$/) >= 0 ) {
            value_OUT = "text/css"; }
        else if ( fileName.search(/^.*\.vcf$/) >= 0 ) {
            value_OUT = "text/directory"; }
        else if ( fileName.search(/^.*\.vct$/) >= 0 ) {
            value_OUT = "text/directory"; }
        else if ( fileName.search(/^.*\.gcrd$/) >= 0 ) {
            value_OUT = "text/directory"; }
        else if ( fileName.search(/^.*\.t2t$/) >= 0 ) {
            value_OUT = "text/x-txt2tags"; }
        else if ( fileName.search(/^.*\.vhd$/) >= 0 ) {
            value_OUT = "text/x-vhdl"; }
        else if ( fileName.search(/^.*\.vhdl$/) >= 0 ) {
            value_OUT = "text/x-vhdl"; }
        else if ( fileName.search(/^.*\.mml$/) >= 0 ) {
            value_OUT = "text/mathml"; }
        else if ( fileName.search(/^.*\.txt$/) >= 0 ) {
            value_OUT = "text/plain"; }
        else if ( fileName.search(/^.*\.asc$/) >= 0 ) {
            value_OUT = "text/plain"; }
        else if ( fileName.search(/^.*\.rdf$/) >= 0 ) {
            value_OUT = "text/rdf"; }
        else if ( fileName.search(/^.*\.rdfs$/) >= 0 ) {
            value_OUT = "text/rdf"; }
        else if ( fileName.search(/^.*\.owl$/) >= 0 ) {
            value_OUT = "text/rdf"; }
        else if ( fileName.search(/^.*\.rtx$/) >= 0 ) {
            value_OUT = "text/richtext"; }
        else if ( fileName.search(/^.*\.rss$/) >= 0 ) {
            value_OUT = "application/rss+xml"; }
        else if ( fileName.search(/^.*\.atom$/) >= 0 ) {
            value_OUT = "application/atom+xml"; }
        else if ( fileName.search(/^.*\.opml$/) >= 0 ) {
            value_OUT = "text/x-opml+xml"; }
        else if ( fileName.search(/^.*\.sgml$/) >= 0 ) {
            value_OUT = "text/sgml"; }
        else if ( fileName.search(/^.*\.sgm$/) >= 0 ) {
            value_OUT = "text/sgml"; }
        else if ( fileName.search(/^.*\.sylk$/) >= 0 ) {
            value_OUT = "text/spreadsheet"; }
        else if ( fileName.search(/^.*\.slk$/) >= 0 ) {
            value_OUT = "text/spreadsheet"; }
        else if ( fileName.search(/^.*\.tsv$/) >= 0 ) {
            value_OUT = "text/tab-separated-values"; }
        else if ( fileName.search(/^.*\.jad$/) >= 0 ) {
            value_OUT = "text/vnd.sun.j2me.app-descriptor"; }
        else if ( fileName.search(/^.*\.wml$/) >= 0 ) {
            value_OUT = "text/vnd.wap.wml"; }
        else if ( fileName.search(/^.*\.wmls$/) >= 0 ) {
            value_OUT = "text/vnd.wap.wmlscript"; }
        else if ( fileName.search(/^.*\.ace$/) >= 0 ) {
            value_OUT = "application/x-ace"; }
        else if ( fileName.search(/^.*\.adb$/) >= 0 ) {
            value_OUT = "text/x-adasrc"; }
        else if ( fileName.search(/^.*\.ads$/) >= 0 ) {
            value_OUT = "text/x-adasrc"; }
        else if ( fileName.search(/^AUTHORS$/) >= 0 ) {
            value_OUT = "text/x-authors"; }
        else if ( fileName.search(/^.*\.bib$/) >= 0 ) {
            value_OUT = "text/x-bibtex"; }
        else if ( fileName.search(/^.*\.hh$/) >= 0 ) {
            value_OUT = "text/x-c++hdr"; }
        else if ( fileName.search(/^.*\.hp$/) >= 0 ) {
            value_OUT = "text/x-c++hdr"; }
        else if ( fileName.search(/^.*\.hpp$/) >= 0 ) {
            value_OUT = "text/x-c++hdr"; }
        else if ( fileName.search(/^.*\.h[+][+]$/) >= 0 ) {
            value_OUT = "text/x-c++hdr"; }
        else if ( fileName.search(/^.*\.hxx$/) >= 0 ) {
            value_OUT = "text/x-c++hdr"; }
        else if ( fileName.search(/^.*\.cpp$/) >= 0 ) {
            value_OUT = "text/x-c++src"; }
        else if ( fileName.search(/^.*\.cxx$/) >= 0 ) {
            value_OUT = "text/x-c++src"; }
        else if ( fileName.search(/^.*\.cc$/) >= 0 ) {
            value_OUT = "text/x-c++src"; }
        else if ( fileName.search(/^.*\.C$/) >= 0 ) {
            value_OUT = "text/x-c++src"; }
        else if ( fileName.search(/^.*\.c[+][+]$/) >= 0 ) {
            value_OUT = "text/x-c++src"; }
        else if ( fileName.search(/^ChangeLog$/) >= 0 ) {
            value_OUT = "text/x-changelog"; }
        else if ( fileName.search(/^.*\.h$/) >= 0 ) {
            value_OUT = "text/x-chdr"; }
        else if ( fileName.search(/^.*\.csv$/) >= 0 ) {
            value_OUT = "text/csv"; }
        else if ( fileName.search(/^COPYING$/) >= 0 ) {
            value_OUT = "text/x-copying"; }
        else if ( fileName.search(/^CREDITS$/) >= 0 ) {
            value_OUT = "text/x-credits"; }
        else if ( fileName.search(/^.*\.c$/) >= 0 ) {
            value_OUT = "text/x-csrc"; }
        else if ( fileName.search(/^.*\.cs$/) >= 0 ) {
            value_OUT = "text/x-csharp"; }
        else if ( fileName.search(/^.*\.vala$/) >= 0 ) {
            value_OUT = "text/x-vala"; }
        else if ( fileName.search(/^.*\.dcl$/) >= 0 ) {
            value_OUT = "text/x-dcl"; }
        else if ( fileName.search(/^.*\.dsl$/) >= 0 ) {
            value_OUT = "text/x-dsl"; }
        else if ( fileName.search(/^.*\.d$/) >= 0 ) {
            value_OUT = "text/x-dsrc"; }
        else if ( fileName.search(/^.*\.dtd$/) >= 0 ) {
            value_OUT = "text/x-dtd"; }
        else if ( fileName.search(/^.*\.el$/) >= 0 ) {
            value_OUT = "text/x-emacs-lisp"; }
        else if ( fileName.search(/^.*\.erl$/) >= 0 ) {
            value_OUT = "text/x-erlang"; }
        else if ( fileName.search(/^.*\.[fF]$/) >= 0 ) {
            value_OUT = "text/x-fortran"; }
        else if ( fileName.search(/^.*\.[fF]9[05]$/) >= 0 ) {
            value_OUT = "text/x-fortran"; }
        else if ( fileName.search(/^.*\.for$/) >= 0 ) {
            value_OUT = "text/x-fortran"; }
        else if ( fileName.search(/^.*\.po$/) >= 0 ) {
            value_OUT = "text/x-gettext-translation"; }
        else if ( fileName.search(/^.*\.pot$/) >= 0 ) {
            value_OUT = "text/x-gettext-translation-template"; }
        else if ( fileName.search(/^.*\.html$/) >= 0 ) {
            value_OUT = "text/html"; }
        else if ( fileName.search(/^.*\.htm$/) >= 0 ) {
            value_OUT = "text/html"; }
        else if ( fileName.search(/^gtkrc$/) >= 0 ) {
            value_OUT = "text/x-gtkrc"; }
        else if ( fileName.search(/^\.gtkrc$/) >= 0 ) {
            value_OUT = "text/x-gtkrc"; }
        else if ( fileName.search(/^.*\.gvp$/) >= 0 ) {
            value_OUT = "text/x-google-video-pointer"; }
        else if ( fileName.search(/^.*\.hs$/) >= 0 ) {
            value_OUT = "text/x-haskell"; }
        else if ( fileName.search(/^.*\.idl$/) >= 0 ) {
            value_OUT = "text/x-idl"; }
        else if ( fileName.search(/^INSTALL$/) >= 0 ) {
            value_OUT = "text/x-install"; }
        else if ( fileName.search(/^.*\.java$/) >= 0 ) {
            value_OUT = "text/x-java"; }
        else if ( fileName.search(/^.*\.ldif$/) >= 0 ) {
            value_OUT = "text/x-ldif"; }
        else if ( fileName.search(/^.*\.lhs$/) >= 0 ) {
            value_OUT = "text/x-literate-haskell"; }
        else if ( fileName.search(/^.*\.log$/) >= 0 ) {
            value_OUT = "text/x-log"; }
        else if ( fileName.search(/^[Mm]akefile$/) >= 0 ) {
            value_OUT = "text/x-makefile"; }
        else if ( fileName.search(/^GNUmakefile$/) >= 0 ) {
            value_OUT = "text/x-makefile"; }
        else if ( fileName.search(/^.*\.moc$/) >= 0 ) {
            value_OUT = "text/x-moc"; }
        else if ( fileName.search(/^.*\.mup$/) >= 0 ) {
            value_OUT = "text/x-mup"; }
        else if ( fileName.search(/^.*\.not$/) >= 0 ) {
            value_OUT = "text/x-mup"; }
        else if ( fileName.search(/^.*\.m$/) >= 0 ) {
            value_OUT = "text/x-objcsrc"; }
        else if ( fileName.search(/^.*\.ml$/) >= 0 ) {
            value_OUT = "text/x-ocaml"; }
        else if ( fileName.search(/^.*\.mli$/) >= 0 ) {
            value_OUT = "text/x-ocaml"; }
        else if ( fileName.search(/^.*\.m$/) >= 0 ) {
            value_OUT = "text/x-matlab"; }
        else if ( fileName.search(/^.*\.p$/) >= 0 ) {
            value_OUT = "text/x-pascal"; }
        else if ( fileName.search(/^.*\.pas$/) >= 0 ) {
            value_OUT = "text/x-pascal"; }
        else if ( fileName.search(/^.*\.diff$/) >= 0 ) {
            value_OUT = "text/x-patch"; }
        else if ( fileName.search(/^.*\.patch$/) >= 0 ) {
            value_OUT = "text/x-patch"; }
        else if ( fileName.search(/^.*\.py$/) >= 0 ) {
            value_OUT = "text/x-python"; }
        else if ( fileName.search(/^.*\.lua$/) >= 0 ) {
            value_OUT = "text/x-lua"; }
        else if ( fileName.search(/^README*$/) >= 0 ) {
            value_OUT = "text/x-readme"; }
        else if ( fileName.search(/^.*\.nfo$/) >= 0 ) {
            value_OUT = "text/x-readme"; }
        else if ( fileName.search(/^.*\.spec$/) >= 0 ) {
            value_OUT = "text/x-rpm-spec"; }
        else if ( fileName.search(/^.*\.scm$/) >= 0 ) {
            value_OUT = "text/x-scheme"; }
        else if ( fileName.search(/^.*\.etx$/) >= 0 ) {
            value_OUT = "text/x-setext"; }
        else if ( fileName.search(/^.*\.sql$/) >= 0 ) {
            value_OUT = "text/x-sql"; }
        else if ( fileName.search(/^.*\.tcl$/) >= 0 ) {
            value_OUT = "text/x-tcl"; }
        else if ( fileName.search(/^.*\.tk$/) >= 0 ) {
            value_OUT = "text/x-tcl"; }
        else if ( fileName.search(/^.*\.tex$/) >= 0 ) {
            value_OUT = "text/x-tex"; }
        else if ( fileName.search(/^.*\.ltx$/) >= 0 ) {
            value_OUT = "text/x-tex"; }
        else if ( fileName.search(/^.*\.sty$/) >= 0 ) {
            value_OUT = "text/x-tex"; }
        else if ( fileName.search(/^.*\.cls$/) >= 0 ) {
            value_OUT = "text/x-tex"; }
        else if ( fileName.search(/^.*\.dtx$/) >= 0 ) {
            value_OUT = "text/x-tex"; }
        else if ( fileName.search(/^.*\.ins$/) >= 0 ) {
            value_OUT = "text/x-tex"; }
        else if ( fileName.search(/^.*\.latex$/) >= 0 ) {
            value_OUT = "text/x-tex"; }
        else if ( fileName.search(/^.*\.texi$/) >= 0 ) {
            value_OUT = "text/x-texinfo"; }
        else if ( fileName.search(/^.*\.texinfo$/) >= 0 ) {
            value_OUT = "text/x-texinfo"; }
        else if ( fileName.search(/^.*\.me$/) >= 0 ) {
            value_OUT = "text/x-troff-me"; }
        else if ( fileName.search(/^.*\.mm$/) >= 0 ) {
            value_OUT = "text/x-troff-mm"; }
        else if ( fileName.search(/^.*\.ms$/) >= 0 ) {
            value_OUT = "text/x-troff-ms"; }
        else if ( fileName.search(/^.*\.uil$/) >= 0 ) {
            value_OUT = "text/x-uil"; }
        else if ( fileName.search(/^.*\.uri$/) >= 0 ) {
            value_OUT = "text/x-uri"; }
        else if ( fileName.search(/^.*\.url$/) >= 0 ) {
            value_OUT = "text/x-uri"; }
        else if ( fileName.search(/^.*\.xmi$/) >= 0 ) {
            value_OUT = "text/x-xmi"; }
        else if ( fileName.search(/^.*\.fo$/) >= 0 ) {
            value_OUT = "text/x-xslfo"; }
        else if ( fileName.search(/^.*\.xslfo$/) >= 0 ) {
            value_OUT = "text/x-xslfo"; }
        else if ( fileName.search(/^.*\.xml$/) >= 0 ) {
            value_OUT = "application/xml"; }
        else if ( fileName.search(/^.*\.xsl$/) >= 0 ) {
            value_OUT = "application/xml"; }
        else if ( fileName.search(/^.*\.xslt$/) >= 0 ) {
            value_OUT = "application/xml"; }
        else if ( fileName.search(/^.*\.xbl$/) >= 0 ) {
            value_OUT = "application/xml"; }
        else if ( fileName.search(/^.*\.dv$/) >= 0 ) {
            value_OUT = "video/dv"; }
        else if ( fileName.search(/^.*\.mpeg$/) >= 0 ) {
            value_OUT = "video/mpeg"; }
        else if ( fileName.search(/^.*\.mpg$/) >= 0 ) {
            value_OUT = "video/mpeg"; }
        else if ( fileName.search(/^.*\.mp2$/) >= 0 ) {
            value_OUT = "video/mpeg"; }
        else if ( fileName.search(/^.*\.mpe$/) >= 0 ) {
            value_OUT = "video/mpeg"; }
        else if ( fileName.search(/^.*\.vob$/) >= 0 ) {
            value_OUT = "video/mpeg"; }
        else if ( fileName.search(/^.*\.m2t$/) >= 0 ) {
            value_OUT = "video/mpeg"; }
        else if ( fileName.search(/^.*\.qt$/) >= 0 ) {
            value_OUT = "video/quicktime"; }
        else if ( fileName.search(/^.*\.mov$/) >= 0 ) {
            value_OUT = "video/quicktime"; }
        else if ( fileName.search(/^.*\.moov$/) >= 0 ) {
            value_OUT = "video/quicktime"; }
        else if ( fileName.search(/^.*\.qtvr$/) >= 0 ) {
            value_OUT = "video/quicktime"; }
        else if ( fileName.search(/^.*\.qtif$/) >= 0 ) {
            value_OUT = "image/x-quicktime"; }
        else if ( fileName.search(/^.*\.qif$/) >= 0 ) {
            value_OUT = "image/x-quicktime"; }
        else if ( fileName.search(/^.*\.viv$/) >= 0 ) {
            value_OUT = "video/vivo"; }
        else if ( fileName.search(/^.*\.vivo$/) >= 0 ) {
            value_OUT = "video/vivo"; }
        else if ( fileName.search(/^.*\.anim[1-9j]$/) >= 0 ) {
            value_OUT = "video/x-anim"; }
        else if ( fileName.search(/^.*\.fli$/) >= 0 ) {
            value_OUT = "video/x-flic"; }
        else if ( fileName.search(/^.*\.flc$/) >= 0 ) {
            value_OUT = "video/x-flic"; }
        else if ( fileName.search(/^.*\.hwp$/) >= 0 ) {
            value_OUT = "application/x-hwp"; }
        else if ( fileName.search(/^.*\.hwt$/) >= 0 ) {
            value_OUT = "application/x-hwt"; }
        else if ( fileName.search(/^.*\.mng$/) >= 0 ) {
            value_OUT = "video/x-mng"; }
        else if ( fileName.search(/^.*\.asf$/) >= 0 ) {
            value_OUT = "video/x-ms-asf"; }
        else if ( fileName.search(/^.*\.nsc$/) >= 0 ) {
            value_OUT = "application/x-netshow-channel"; }
        else if ( fileName.search(/^.*\.wmv$/) >= 0 ) {
            value_OUT = "video/x-ms-wmv"; }
        else if ( fileName.search(/^.*\.avi$/) >= 0 ) {
            value_OUT = "video/x-msvideo"; }
        else if ( fileName.search(/^.*\.divx$/) >= 0 ) {
            value_OUT = "video/x-msvideo"; }
        else if ( fileName.search(/^.*\.nsv$/) >= 0 ) {
            value_OUT = "video/x-nsv"; }
        else if ( fileName.search(/^.*\.sdp$/) >= 0 ) {
            value_OUT = "application/sdp"; }
        else if ( fileName.search(/^.*\.movie$/) >= 0 ) {
            value_OUT = "video/x-sgi-movie"; }
        else if ( fileName.search(/^.*\.emp$/) >= 0 ) {
            value_OUT = "application/vnd.emusic-emusic_package"; }
        else if ( fileName.search(/^.*\.ica$/) >= 0 ) {
            value_OUT = "application/x-ica"; }
        else if ( fileName.search(/^.*\.xul$/) >= 0 ) {
            value_OUT = "application/vnd.mozilla.xul+xml"; }
        else if ( fileName.search(/^.*\.602$/) >= 0 ) {
            value_OUT = "application/x-t602";
        }

	}
		
	return value_OUT;

} //-- END function getMIMEType() --//