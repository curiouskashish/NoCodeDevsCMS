function doGet(e) {
  return HtmlService.createTemplateFromFile("Index").evaluate()
  .setTitle("Creators' Paathshala")
  .addMetaTag('viewport', 'width=device-width, initial-scale=1')
  .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function processForm(formObject){
  var userid = formObject.userid;
  var response = [];
  if(userid){//Execute if form passes userid
    response = searchByUserId(userid);
  } else {
    response[0] = "fail";
    response[1] = "Sorry! something went wrong.";
  }
  return response;
}

function getTagData(category){
  var resultSet = [];
  var spreadsheetId   = '1WSxyWWtg8O62s4WSj44n0qBRmabEXLehFonHO0W0BkU'; //LINK OF YOUR SPREADSHEET
  var tagdata = SpreadsheetApp.openById(spreadsheetId).getSheetByName(category).getDataRange().getValues();
  for(r=1;r<5;r++){
    resultSet.push(tagdata[r][2],tagdata[r][3]);
  }
  return resultSet;
}

//get the data from SpreadSheet
function searchByUserId(userid){
  var spreadsheetId   = '1WSxyWWtg8O62s4WSj44n0qBRmabEXLehFonHO0W0BkU'; //LINK OF YOUR SPREADSHEET
  var sheetName = "Output";
  var data = SpreadsheetApp.openById(spreadsheetId).getSheetByName(sheetName).getDataRange().getValues();
  var resultSet = [];
  for(r=1;r<data.length;r++){
    if(data[r][0] == userid){
      resultSet[0] = "success";               //return code
      resultSet[1] = "Hello! " + data[r][1];  //username
      resultSet[2] = data[r][5];  //postscore
      resultSet[3] = data[r][6];  //relevancy
      resultSet[4] = data[r][7];  //qualityscore
      resultSet[5] = data[r][8];  //events
      resultSet[6] = data[r][9];  //negativescore
      resultSet[7] = data[r][10];  //totalscore
      resultSet[8] = data[r][11];  //suggestion
      resultSet[9] = "Welcome " + data[r][2] + " creator! Check Out your Scores Here: ";  //Category
      resultSet[10] = getTagData(data[r][2]);
      break;
    } else {
      resultSet[0] = "fail";
      resultSet[1] = "Oops! You are yet to be onboarded as a creator!";
    }
  }                                           
  return resultSet;
};
