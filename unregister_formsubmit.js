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
    var regCode = regSheet.getRange(i, 4).getValue();
  
    if (regCode == registrationCode) {
      regSheet.getRange(i, 5).setValue("unregistered");
      rowRange = regSheet.getRange(i, 1, 1, 4);
      //Send unregister e-mail
      sendEmailWithRowData(regSheet, rowRange, templateSheet.getRange("A4"), templateSheet.getRange("B4"));
      break;
    }
    i++;
  }
  
  //Update the queue
  updateQueue(regSheet, templateSheet, rowRange);
}

function updateQueue(regSheet, templateSheet, rowRange) {
  //The first person in queue should retreive the status "registered"
  var firstInQueueRowId = -1;
  var i = 2;
  
  while(i <= regSheet.getLastRow() && firstInQueueRowId == -1) {
    var status = regSheet.getRange(i, 5).getValue();
    
    if(status == "queued") {
      firstInQueueRowId = i;
    }
    i++;
  }
  
  //Register the first person in queue if one such exists
  if(firstInQueueRowId != -1) {
    rowRange = regSheet.getRange(firstInQueueRowId, 1, 1, 4);
    regSheet.getRange(firstInQueueRowId, 5).setValue("registered");
    //Send registered-after-queueing e-mail
    sendEmailWithRowData(regSheet, rowRange, templateSheet.getRange("A5"), templateSheet.getRange("B5"));
  }
}