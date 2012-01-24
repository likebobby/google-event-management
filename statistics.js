function showRegistrationDataOnSite() {
  // Get the registration spreadsheet
  var regSpreadsheet = SpreadsheetApp.openById("0ArnGaROyFoZMdERYRWRKQTVpS1pndkJzc041NVhNVXc");
  
  // Get settings
  var configSheet = regSpreadsheet.getSheetByName("Configuration");
  var maxAttendees = configSheet.getRange("B1").getValue();
  
  // Get statistics
  var statsSheet = regSpreadsheet.getSheetByName("Statistics");
  var numberOfRegistered = statsSheet.getRange("B1").getValue();
  var numberInQueue = statsSheet.getRange("B2").getValue();
  
  // Create registration data string  
  var titleText = "";
  if (maxAttendees == numberOfRegistered) {
    titleText = "Registration is full. There are " + numberInQueue + " in queue.";
  }
  else {
    titleText = "There are " + numberOfRegistered + "/" + maxAttendees + " registered.";
  }
  
  var homepage = SitesApp.getPageByUrl("https://sites.google.com/site/eventreg2012/home");  
  // Had to set the title instead of the body because setHtmlContent filters out gadgets
  // incorrectly (http://code.google.com/p/google-apps-script-issues/issues/detail?id=572)
  homepage.setTitle("Home - (" + titleText + ")");
}