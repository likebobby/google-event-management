function onFormSubmit(e) {
  var timestamp = e.values[0];
  var registrationCode = e.values[1];
  
  var regSpreadsheetId = "0AhdvGE-hsv66dFRKMmJvTThPMmhlZkJEZWRpNGhFRHc";
  var regSpreadsheet = SpreadsheetApp.openById(regSpreadsheetId);
  var regSheet = regSpreadsheet.getSheetByName("Registration");
  var templateSheet = regSpreadsheet.getSheetByName("Templates");
  
  //Find the person with given reg code, counting her queue position, and e-mail it
  var i=2;
  var queuePos=0;
  var rowRange;
  while (i <= regSheet.getLastRow()) {
    var regCode = regSheet.getRange(i, 4).getValue();
    var status = regSheet.getRange(i, 5).getValue();
    
    if (status == "queued")
      queuePos++;
      
    if (regCode == registrationCode) {
      regSheet.getRange(i, 6).setValue(queuePos);
      rowRange = regSheet.getRange(i, 1, 1, 6);
      //Send queue status e-mail
      sendEmailWithRowData(regSheet, rowRange, templateSheet.getRange("A6"), templateSheet.getRange("B6"));
      break;
    }
    i++;
  }
}
