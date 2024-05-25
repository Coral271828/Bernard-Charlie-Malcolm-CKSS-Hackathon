/*

this program should request a user's money spent and earned per unit time, and calculate whether they are gaining or losing money.

*/

// modify table
function generateTable(){
  for(let i = 0; i < 100; i++){
    $("calculator-table").innerHTML += "<tr id='tr"+i+"'/>";
  }
}

var curRow = 0;
function addRow(){
  if (curRow > 100) {
    return;
  }
  $("tr"+curRow).innerHTML = `
    <td>
      <input autocomplete = "off" placeholder = "Type here" type= "text">
    </td>
    <td>
      <input autocomplete = "off" placeholder = "Type here" type="number">
    </td>
    <td>
      <input autocomplete = "off" placeholder = "Type here" type="text">
    </td>`;
  curRow ++;
}
function deleteRow(){
  if (curRow <= 1) {
    return;
  }
  $("tr"+(curRow-1)).innerHTML = "";
  curRow --;
}

// money values

class MoneyValue {
  
  constructor(name, amount, description) {
    this.amount=amount;
    this.name=name||"(Unnamed)";
    this.description=description||"(No description)";
  }
  
}

let earnings = [];

// pie chart

function generatePieChart(moneyValues) {

  // get fractions of money
  
  let sum = 0;
  for (let i=0; i<moneyValues.length; i++) {
    sum += Math.abs(moneyValues[i].amount);
  }
  let portions = [];
  for (let i=0; i<moneyValues.length; i++) {
    portions[i] = Math.abs(moneyValues[i].amount) / sum;
  }
  
  // set arc values

  let svgOutput = "";
  
  let svgPathValue = "";
  let angle = 0;
  let x,y;

  // handle special cases
  
  if (moneyValues.length === 0) {
    return '<circle fill="rgb(128,128,0)" stroke="#000000" cx=50 cy=50 r=40 />';
  }

  let numFullCells = 0;
  for (let i=0; i<moneyValues.length; i++) {
    if (moneyValues[i].amount) {
      numFullCells++;
    }
  }
  
  if (numFullCells <= 1) {
    return '<circle fill="rgb('+(moneyValues[0].amount > 0 ? 0 : 128)+','+(moneyValues[0].amount < 0 ? 0 : 128)+',0)" stroke="#000000" cx=50 cy=50 r=40 /><text x="50" y="50" class="pie-text">'+moneyValues[0].name+'</text>';
  }
  
  for (let i=0; i<portions.length; i++) {
    // start
    svgPathValue += '<path fill="rgb('+(moneyValues[i].amount > 0 ? 0 : 256-128*i/portions.length)+','+(moneyValues[i].amount < 0 ? 0 : 256-128*i/portions.length)+',0)" stroke="#000000" d="M ';
    // get position of previous vertex (with current angle value)
    x = 50+40*Math.sin(angle);
    y = 50-40*Math.cos(angle);
    svgPathValue += x+","+y;
    // basic arc properties
    svgPathValue += ' A 40,40 0 ';
    // large or small arc
    svgPathValue += portions[i] > 0.5 ? 1 : 0;
    // sweep CCW
    svgPathValue += " 1 ";
    // get position of next vertex
    angle += 2*Math.PI * portions[i];
    x = 50+40*Math.sin(angle);
    y = 50-40*Math.cos(angle);
    svgPathValue += x+","+y+" ";
    // end
    svgPathValue += 'L 50,50 z" />';
  }

  svgOutput += svgPathValue;

  let svgTextValues = "";
  angle = 0;
  for (let i=0; i<moneyValues.length; i++) {
    angle += 2*Math.PI * portions[i];
    x = 50+20*Math.sin(angle - Math.PI*portions[i]);
    y = 50-20*Math.cos(angle - Math.PI*portions[i]);
    svgTextValues += '<text x="'+x+'" y="'+y+'" class="pie-text">'+moneyValues[i].name+'</text>';
  }

  svgOutput += svgTextValues;
  
  return svgOutput;
}

function formToVar(){
  earnings = [];
  const form = document.forms["form"];
  for (let i = 0; i < form.length; i+=3){
    earnings.push(new MoneyValue(form[i].value, form[i+1].value||0, form[i+2].value));
  }
  $("pie").innerHTML = generatePieChart(earnings);
}

setInterval(formToVar,500);
