
#Function Comment Style:

`/***************************************
Function:
    Strictly compares two integers and returns true or false
Inputs:
    Param1 and param2 are integers
Outputs:
    Boolean 
***************************************/

 function testsEqual = (param1, param2){   
  if (param1 === param2) {
    console.log('param1 may be equal to param2');
    return true;
  } else {
    return false; 
  }
}`


#Linter for code syntax conformity:

JSHint with standard configuration plus recognition of ES6 syntax
Config placed in root of project 