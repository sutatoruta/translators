{
	"translatorID": "fad64eb9-1b22-48a1-953f-a4d464194903",
	"label": "Speaker Deck",
	"creator": "",
	"target": "^https?://[^/]*speakerdeck\\.com/",
	"minVersion": "3.0",
	"maxVersion": "",
	"priority": 100,
	"inRepository": true,
	"translatorType": 4,
	"browserSupport": "gcsibv",
	"lastUpdated": "2023-12-25 16:00:33"
}

function scrape(doc, url) {
	const item = new Zotero.Item("presentation");
	item.title = attr(doc, 'meta[property="og:title"]', "content");
	const creator = attr(doc, 'meta[property="og:author"]', "content");
	if (creator) {
		item.creators.push(ZU.cleanAuthor(creator, 'presenter'));
	}
	item.abstractNote = text(doc, '.deck-description');
	item.date = text(doc,".deck-date");
	item.url = url.split('?')[0]; //remove query parameters
	item.libraryCatalog = "Speaker Deck";
	const pdfurl = attr(doc, 'a[title="Download PDF"]', "href");
	if (pdfurl) {
		item.attachments.push({url:pdfurl, title:"Slide PDF", mimeType:"application/pdf"});
	}

	item.complete();
}

function detectWeb(doc, url) {
	if (doc.querySelector(".deck-embed")) {
		return "presentation";
	}
}

function doWeb(doc, url) {
	if (detectWeb(doc, url) == "presentation") {
		scrape(doc, url);
	}
}
/** BEGIN TEST CASES **/
var testCases = [
	{
		"type": "web",
		"url": "https://speakerdeck.com/markding/collecting-organizing-and-citing-scientific-literature-an-intro-to-zotero",
		"items": [
			{
				"itemType": "presentation",
				"title": "Collecting, organizing and citing scientific literature: an intro to Zotero",
				"creators": [
					{
						"firstName": "Mark",
						"lastName": "D",
						"creatorType": "presenter"
					}
				],
				"date": "March 06, 2018",
				"abstractNote": "One of the key tasks scientists need to master is how to manage bibliographic information: collecting relevant literature, building a digital library, and handling citations and bibliographies during writing. \n\nThis tutorial introduces Zotero (www.zotero.org), an easy to use reference management tool made by scholars for scholars. It covers the basics of using Zotero for collecting, organizing, citing and sharing research. Zotero automates the tasks of managing bibliographic data, storing and renaming PDFs, and formatting references. It also integrates with widely used text processors, and can synchronize your library across devices. There is no more need to search through disorganized file folders full of randomly named PDF files, to copy and paste references across documents, or to manually deal with pointless differences in citation styles. \n\nUltimately, the point of using a reference manager is to free more time for real research.",
				"shortTitle": "Collecting, organizing and citing scientific literature",
				"url": "https://speakerdeck.com/markding/collecting-organizing-and-citing-scientific-literature-an-intro-to-zotero",
				"attachments": [
					{
						"title": "Slide PDF",
						"mimeType": "application/pdf"
					}
				],
				"tags": [],
				"notes": [],
				"seeAlso": []
			}
		]
	}
]
/** END TEST CASES **/
