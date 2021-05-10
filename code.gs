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

function exportLocalization() {
  var app = SpreadsheetApp;
  var spreadsheet = app.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName('Localizable');

  // var languages = sheet.getRange('A1:AF1').getValues()[0];
  // var languagesCodes = languages.map(value => value.substring(value.lastIndexOf("(") + 1, value.lastIndexOf(")")))

  var languageCodes = ["en", "ar", "tr", "hi", "pl", "pt", "es", "de", "ru", "bn", "ca", 
                       "cs", "da", "nl", "el", "gu", "he", "hu", "id", "ga", "it", "ja", 
                       "ko", "ms", "mr", "nb", "fa", "ro", "uk", "vi", "sv", "th"];

  var locations = ["A","B","C","D","E","F","G","H","I","J","K",'L',"M","N","O","P","Q",
                   "R","S", "T","U","V","W","X","Y","Z","AA","AB","AC","AD","AE","AF"]
                   
  Logger.log(languageCodes.length == locations.length);

  var date = new Date();
  var rootFolder = DriveApp.createFolder("Localization Files - " + date.toString());

  for(index = 0; index < locations.length; index++) {
    var range = locations[index] + '2:' + locations[index] + '115';
    var allValues = sheet.getRange(range).getValues();
    var fileContent = [];

    for(i = 0; i < allValues.length; i++) {
      fileContent += allValues[i][0]
    }

    // Exporting.. 
    var subFolder = rootFolder.createFolder(languageCodes[index] + '.lproj');
    subFolder.createFile('Localizable.strings', fileContent);
  }
}

// ----------------------------------------------------------------------------------------------------------------- //

String.prototype.isEmpty = function() {
    return (this.length === 0 || !this.trim());
};
