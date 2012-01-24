var regCodeColumnPos=6;
var statusColumnPos=7;

function onFormSubmit(e) {
  var timestamp = e.values[0];
  Logger.log("timestamp: " + timestamp);
  var registrationCode = e.values[1];
  
  var unregSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var unregSheet = unregSpreadsheet.getSheetByName("Configuration");  
  var regSpreadsheetId = unregSheet.getRange("B1").getValue();
  
  var regSpreadsheet = SpreadsheetApp.openById(regSpreadsheetId);
  var regSheet = regSpreadsheet.getSheetByName("Registration");
  var configSheet = regSpreadsheet.getSheetByName("Configuration");
  var templateSheet = regSpreadsheet.getSheetByName("Templates");
  
  //Find the person with given reg code and update status for that person to "unregistered"
  var i=2
  var rowRange;
  while (i <= regSheet.getLastRow()) {
    var regCode = regSheet.getRange(i, regCodeColumnPos).getValue();
    var status = regSheet.getRange(i, statusColumnPos).getValue()   
    if (regCode == registrationCode) {
      rowRange = regSheet.getRange(i, 1, 1, regCodeColumnPos);
      //Only update queue if user is registered.
      if (status == "registered"){
        //Update the queue
        updateQueue(regSheet, templateSheet, rowRange);
      } else if(status == "unregistered"){
        //Send already unregistered e-mail
        sendEmailWithRowData(regSheet, rowRange, templateSheet.getRange("A7"), templateSheet.getRange("B7"), true, configSheet);
      } else {  
        regSheet.getRange(i, statusColumnPos).setValue("unregistered");
        //Send unregister e-mail
        sendEmailWithRowData(regSheet, rowRange, templateSheet.getRange("A4"), templateSheet.getRange("B4"), true, configSheet);
      }
      break;
    }
    i++;
  }
  
}

function updateQueue(regSheet, templateSheet, rowRange) {
  //The first person in queue should retreive the status "registered"
  var firstInQueueRowId = -1;
  var i = 2;
  
  while(i <= regSheet.getLastRow() && firstInQueueRowId == -1) {
    var status = regSheet.getRange(i, statusColumnPos).getValue();
    
    if(status == "queued") {
      firstInQueueRowId = i;
    }
    i++;
  }
  
  //Register the first person in queue if one such exists
  if(firstInQueueRowId != -1) {
    rowRange = regSheet.getRange(firstInQueueRowId, 1, 1, regCodeColumnPos);
    regSheet.getRange(firstInQueueRowId, statusColumnPos).setValue("registered");
    //Send registered-after-queueing e-mail
    sendEmailWithRowData(regSheet, rowRange, templateSheet.getRange("A5"), templateSheet.getRange("B5"));
  }
}