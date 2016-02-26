// ! ! !
// Three Bugs

var arrayAtticus = ["Atticus", "2405", "47000", 3];
var arrayJem = ["Jem", "62347", "63500", 4];
var arrayBoo = ["Boo", "11435", "54000", 3];
var arrayScout = ["Scout", "6243", "74750", 5];

var array = [arrayAtticus, arrayJem, arrayBoo, arrayScout];

//Create variables used to write to the DOM
var newEl, newText, position;
//Capture the position of insertion into the DOM

function ProductionEmployeeObject(name, salary, bonus, postbonusTotal) {
  this.name = name,
  this.salary = salary,
  this.bonus = bonus,
  this.postbonusTotal = postbonusTotal
}


//Loop the array, extracting each array and writing information to the DOM
//Note that the information is not 'clean'
$('document').ready(function() {
	for(var i = 0; i < array.length; i++){
		var empObj = calculateSTI(array[i]); //ERROR, the array within calculateSTI() must also include [i] at the end
		console.log(empObj);
		appendDom(empObj);
	}
});

// nameText = empObj.name;
// salaryNumber = empObj.salary;
// bonusNumber = empObj.bonus;
// pbonusTotal = empObj.postbonusTotal;
// $('#content').last().append().html('<ul></ul>');
// $('#content').children().last().append().html('<li>' + empObj.name + '</li>');
// $('#content').children().last().append().html('<li>' + empObj.salary + '</li>');
// $('#content').children().last().append().html('<li>' + empObj.bonus + '</li>');
// $('#content').children().last().append().html('<li>' + empObj.postbonusTotal + '</li>');

function appendDom(object){
	$('#content').append('<div class="person"></div>');

	var $el = $('#content').children().last();
	$el.append('<li><h1>' + object.name + '</h1></li>');
	$el.append('<li>' + object.salary + '</li>');
	$el.append('<li>' + object.bonus + '</li>');
	$el.append('<li>' + object.postbonusTotal + '</li>');
}


function calculateSTI(array){
  var newArray = [];

  var employeeNumber = array[1];
  var baseSalary = array[2];
  var reviewScore = array[3];

  var bonus = getBaseSTI(reviewScore) + getYearAdjustment(employeeNumber) - getIncomeAdjustment(baseSalary);
  if(bonus > 0.13){
    bonus = 0.13;
  }
	newArray[0] = array[0];
  newArray[1] = bonus;
  newArray[2] = Math.round(baseSalary * (1.0 + bonus)); //  i rounded this to make it easier to look at
  newArray[3] = baseSalary * bonus;
  //console.log(newArray[0] + " " + newArray[1] + " " + newArray[2] + " " + newArray[3]);
	var newEmployeeObject = new ProductionEmployeeObject(newArray[0], array[2], newArray[1], newArray[3])
	console.log(newEmployeeObject);
	return newEmployeeObject;
}

function getBaseSTI(reviewScore){
  var basePercent;
  switch(reviewScore){
    case 1:
      basePercent = 0;
      break;
    case 2:
      basePercent = 0;
      break;
    case 3:
      basePercent = 0.04;
      break;
    case 4:
      basePercent = 0.06;
      break;
    case 5:
      basePercent = 0.10;
      break;
		default:
		case 0:
			basePercent = 0;
			break;
  }
  return basePercent; //this is making the sti's negative, it said -, it should actually just return the basePercent because that gets added to 1 later
}

function getYearAdjustment(employeeNumber){
  var yearAdjustment = 0;
  if(employeeNumber.length == 4){
    yearAdjustment = 0.05;
  }
  return yearAdjustment;
}

function getIncomeAdjustment(salary){
  var incomeAdjustment = 0;
  salary = parseInt(salary);
  if(salary > 65000){
    incomeAdjustment = 0.01;
  }
  return incomeAdjustment;
}
