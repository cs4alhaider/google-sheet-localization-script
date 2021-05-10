# [Draft] google-sheet-localization-script
Export all localized strings in the sheet to google drive for more than n* of languages

Get more information about google sheet scripts and how it works at →  https://developers.google.com/apps-script/guides/sheets 

## Main function in Code.gs
```js
/**
 * Fetch the the sheet and start creating root folder and sub folders for each lang with Localization.strings file
 *
 */
function exportLocalizationsFiles() {
  var startDate = new Date();
  Logger.log('🗂 Starting exporting localization files, time: ' + startDate.toString());
  
  var app = SpreadsheetApp;
  var spreadsheet = app.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName('Localizable');

  
  var columnsCount = sheet.getRange('A:AF').getNumColumns() ;
  var locations = [...Array(columnsCount).keys()].map(column => columnToLetter(column + 1));
  
  var languages = sheet.getRange(locations[0] + '1:' + locations[locations.length - 1] + '1').getValues()[0];
  var languageCodes = languages.map(value => value.substring(value.lastIndexOf("(") + 1, value.lastIndexOf(")")))
      
  Logger.log("languageCodes == locations => " + (languageCodes.length == locations.length));

  var rootFolderName = 'Localization Files - ' + startDate.toString();
  var rootFolder = DriveApp.createFolder(rootFolderName);
  var rootFolderURL = rootFolder.getUrl();

  Logger.log('👉 Created root folder with name: ' + rootFolderName + '\n👉 Root folder URL => ' + rootFolderURL);

  for(index = 0; index < locations.length; index++) {
    var range = locations[index] + '2:' + locations[index] + '150';
    var fileContent = sheet.getRange(range).getValues().join('\n\n');
    var subFolder = rootFolder.createFolder(languageCodes[index] + '.lproj');

    Logger.log('Created folder for ' + languageCodes[index].toUpperCase());

    subFolder.createFile('Localizable.strings', fileContent);

    Logger.log('Remaining is ' + ((locations.length - 1) - index) + '...');
  }

  var endDate = new Date();
  var timeDiff = startDate.getSeconds() + endDate.getSeconds();

  Logger.log('✅ DONE in : ' + timeDiff.toString() + ' second' + ', folder URL ==> ' + rootFolderURL);
}
```


## Logs will look like
```zsh
5:59:23 AM	Notice	Execution started
5:59:23 AM	Info	🗂 Starting exporting localization files, time: Mon May 10 2021 05:59:23 GMT+0300 (Arabian Standard Time)
5:59:23 AM	Info	languageCodes == locations => true
5:59:24 AM	Info	👉 Created root folder with name: Localization Files - Mon May 10 2021 05:59:23 GMT+0300 (Arabian Standard Time)
                  👉 Root folder URL => https://drive.google.com/drive/folders/1ySEGrNuaZcJ....
5:59:25 AM	Info	Created folder for EN
5:59:27 AM	Info	Remaining is 31...
5:59:27 AM	Info	Created folder for AR
5:59:29 AM	Info	Remaining is 30...
5:59:29 AM	Info	Created folder for TR
5:59:31 AM	Info	Remaining is 29...
5:59:31 AM	Info	Created folder for HI
5:59:32 AM	Info	Remaining is 28...
5:59:33 AM	Info	Created folder for PL
5:59:34 AM	Info	Remaining is 27...
5:59:35 AM	Info	Created folder for PT
5:59:36 AM	Info	Remaining is 26...
5:59:37 AM	Info	Created folder for ES
5:59:38 AM	Info	Remaining is 25...
5:59:38 AM	Info	Created folder for DE
5:59:39 AM	Info	Remaining is 24...
5:59:40 AM	Info	Created folder for RU
5:59:41 AM	Info	Remaining is 23...
5:59:42 AM	Info	Created folder for BN
5:59:43 AM	Info	Remaining is 22...
5:59:43 AM	Info	Created folder for CA
5:59:44 AM	Info	Remaining is 21...
5:59:45 AM	Info	Created folder for CS
5:59:46 AM	Info	Remaining is 20...
5:59:47 AM	Info	Created folder for DA
5:59:48 AM	Info	Remaining is 19...
5:59:48 AM	Info	Created folder for NL
5:59:49 AM	Info	Remaining is 18...
5:59:50 AM	Info	Created folder for EL
5:59:51 AM	Info	Remaining is 17...
5:59:51 AM	Info	Created folder for GU
5:59:53 AM	Info	Remaining is 16...
5:59:53 AM	Info	Created folder for HE
5:59:54 AM	Info	Remaining is 15...
5:59:55 AM	Info	Created folder for HU
5:59:56 AM	Info	Remaining is 14...
5:59:56 AM	Info	Created folder for ID
5:59:57 AM	Info	Remaining is 13...
5:59:58 AM	Info	Created folder for GA
5:59:59 AM	Info	Remaining is 12...
5:59:59 AM	Info	Created folder for IT
6:00:00 AM	Info	Remaining is 11...
6:00:01 AM	Info	Created folder for JA
6:00:02 AM	Info	Remaining is 10...
6:00:03 AM	Info	Created folder for KO
6:00:04 AM	Info	Remaining is 9...
6:00:04 AM	Info	Created folder for MS
6:00:05 AM	Info	Remaining is 8...
6:00:06 AM	Info	Created folder for MR
6:00:07 AM	Info	Remaining is 7...
6:00:07 AM	Info	Created folder for NB
6:00:08 AM	Info	Remaining is 6...
6:00:09 AM	Info	Created folder for FA
6:00:10 AM	Info	Remaining is 5...
6:00:10 AM	Info	Created folder for RO
6:00:11 AM	Info	Remaining is 4...
6:00:12 AM	Info	Created folder for UK
6:00:13 AM	Info	Remaining is 3...
6:00:14 AM	Info	Created folder for VI
6:00:15 AM	Info	Remaining is 2...
6:00:15 AM	Info	Created folder for SV
6:00:18 AM	Info	Remaining is 1...
6:00:18 AM	Info	Created folder for TH
6:00:19 AM	Info	Remaining is 0...
6:00:19 AM	Info	✅ DONE in : 42 second, folder URL ==> https://drive.google.com/drive/folders/1ySEGrNuaZcJ....
6:00:19 AM	Notice	Execution completed
```
