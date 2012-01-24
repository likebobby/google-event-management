var regCodeColumnPos=6;
var statusColumnPos=7;
var queuePosColumnPos=8;

function onFormSubmit(e) {
  var timestamp = e.values[0];
  var registrationCode = e.values[1];  
  
  var regSpreadsheetId = "0ArnGaROyFoZMdERYRWRKQTVpS1pndkJzc041NVhNVXc";
  var regSpreadsheet = SpreadsheetApp.openById(regSpreadsheetId);
  var regSheet = regSpreadsheet.getSheetByName("Registration");
  var templateSheet = regSpreadsheet.getSheetByName("Templates");
  var configSheet = regSpreadsheet.getSheetByName("Configuration");
  
  //Find the person with given reg code, counting her queue position, and e-mail it
  var i=2;
  var queuePos=0;
  var rowRange;
  while (i <= regSheet.getLastRow()) {
    var regCode = regSheet.getRange(i, regCodeColumnPos).getValue();
    var status = regSheet.getRange(i, statusColumnPos).getValue();
    
    if (status == "queued")
      queuePos++;
      
    if (regCode == registrationCode) {
      regSheet.getRange(i, queuePosColumnPos).setValue(queuePos);
      rowRange = regSheet.getRange(i, 1, 1, queuePosColumnPos);
      //Send queue status e-mail
      sendEmailWithRowData(regSheet, rowRange, templateSheet.getRange("A6"), templateSheet.getRange("B6"), true, configSheet);
      break;
    }
    i++;
  }
}