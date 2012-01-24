var regCodeColumnPos=6;
var statusColumnPos=7;

function onFormSubmit(e) {
  var timestamp = e.values[0];
  var name = e.values[1];
  var emailAddress = e.values[2];

  var regSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var regSheet = regSpreadsheet.getSheetByName("Registration");
  var templateSheet = regSpreadsheet.getSheetByName("Templates");
  var configSheet = regSpreadsheet.getSheetByName("Configuration");
  var lastRow = regSheet.getLastRow();
  
  //Add the reg code to sheet
  var registrationCode = guidGenerator();
  regSheet.getRange(lastRow, regCodeColumnPos).setValue(registrationCode);
  
  var status = "registered";
  var rowRange = regSheet.getRange(lastRow, 1, 1, regCodeColumnPos);
  
  if (isEventFull(regSpreadsheet)) {
    status = "queued";
    //Send waiting list e-mail
    sendEmailWithRowData(regSheet, rowRange, templateSheet.getRange("A3"), templateSheet.getRange("B3"), true, configSheet);
  }
  else {
    //Send register e-mail
    sendEmailWithRowData(regSheet, rowRange, templateSheet.getRange("A2"), templateSheet.getRange("B2"), true, configSheet);
  }
  
  regSheet.getRange(lastRow, statusColumnPos).setValue(status);
}

function isEventFull(regSpreadsheet) {
  var result = true;
  
  var regSheet = regSpreadsheet.getSheetByName("Registration");
  var configSheet = regSpreadsheet.getSheetByName("Configuration");
  var maxAttendees = configSheet.getRange("B1").getValue();
  
  var numberOfRegistered = countRegistered(regSheet);
  Logger.log("numOfReg: " + numberOfRegistered + " < max: " + maxAttendees);
  if (numberOfRegistered < maxAttendees) {
    result = false;
  }
         
  return result;
}
    
function countRegistered(regSheet) {
  var numberOfRegistered = 0;
  var i=2;
  while (i <= regSheet.getLastRow()) {
    var status = regSheet.getRange(i, statusColumnPos).getValue();
    if (status == "registered") {
      numberOfRegistered++;
    }
    i++;
  }
  return numberOfRegistered;
}

function countQueued(regSheet) {
  var numberOfQueued = 0;
  var i=2;
  while (i <= regSheet.getLastRow()) {
    var status = regSheet.getRange(i, statusColumnPos).getValue();
    if (status == "queued") {
      numberOfQueued++;
    }
    i++;
  }
  return numberOfQueued;
}

function guidGenerator() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}