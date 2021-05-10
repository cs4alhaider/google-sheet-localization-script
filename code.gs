/**
 * 
 * Created by Abdullah Alhaider.
 * Mon, 10/05/2021.
 * 
 */



/**
 * Translate the input to given language code.
 *
 * @param {text} input The value to translate.
 * @param {targetLanguage} like ar, en
 * @return The input translated to given langauge.
 * @customfunction
 */
function translate(text, targetLanguage) {
  return Array(text).length > 0 ? LanguageApp.translate(text, 'en', targetLanguage) : '';
}


/**
 * iOSLocalization.
 *
 * @param {localizationKey} input The value for the key.
 * @param {localizedValue} the localized value.
 * @return raw value for the localization.
 * @customfunction
 */
function iOSLocalization(localizationKey, localizedValue) {
  if (localizationKey) {
    var raw = '\n' + '\"' + localizationKey + '\" = \"' + localizedValue + '\";';
    return raw;
  }
  return null;
}


/**
 * Create UUID string.
 *
 * @return raw value for UUID object.
 * @customfunction
 */
function createUUID() {
  var uuid = Utilities.getUuid();
  return uuid
}

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

function columnToLetter(column) {
  var temp, letter = '';
  while (column > 0) {
    temp = (column - 1) % 26;
    letter = String.fromCharCode(temp + 65) + letter;
    column = (column - temp - 1) / 26;
  }
  return letter;
}

function letterToColumn(letter) {
  var column = 0, length = letter.length;
  for (var i = 0; i < length; i++) {
    column += (letter.charCodeAt(i) - 64) * Math.pow(26, length - i - 1);
  }
  return column;
}



// ----------------------------------------------------------------------------------------------------------------- //

String.prototype.isEmpty = function() {
    return (this.length === 0 || !this.trim());
};
