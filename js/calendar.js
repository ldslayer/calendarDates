var hollydays = {
    "0/1": "New Year day",
    "0/15": "Martin Luther King day",
    "1/19": "Washington day",
    "4/28": "Memorial day",
    "6/4": "Independence day",
    "8/3": "Labor day",
    "9/8": "Columbus day",
    "10/11": "Veterans day",
    "10/12": "Veterans day",
    "10/22": "Thanks Giving day",
    "11/25": "Christmas day"
};
// Months array
var month = new Array();
month[0] = "January";
month[1] = "February";
month[2] = "March";
month[3] = "April";
month[4] = "May";
month[5] = "June";
month[6] = "July";
month[7] = "August";
month[8] = "September";
month[9] = "October";
month[10] = "November";
month[11] = "December";

// DayLabel will create a formatted DOM Cell
let daysLabel = [
    DayLabel("S"),
    DayLabel("M"),
    DayLabel("T"),
    DayLabel("W"),
    DayLabel("T"),
    DayLabel("F"),
    DayLabel("S")
]


function newWeek() {
    // DayFormat will create a formatted DOM Cell
    // with a class of needed Type    
    let week = [
        DayFormat("Other"),
        DayFormat("Other"),
        DayFormat("Other"),
        DayFormat("Other"),
        DayFormat("Other"),
        DayFormat("Other"),
        DayFormat("Other")
    ]
    return week;
}

// Function to add a Row Table 
// Using DOM functions 
function addRow(week) {
    let tr = document.createElement("TR");
    let weekRow = week.map(x => tr.appendChild(x));
    return tr;
}

// Function to create a Table Cell
// with the Assigned class
function DayFormat(daytype, nday) {
    var x = document.createElement("td");
    // initial content don't have a date
    if (nday) {
        var t = document.createTextNode(nday.getDate());
        x.appendChild(t);
    }
    x.classList.add(daytype);
    return x;
}

// Function to create a Table Cell
// with the Assigned class
function DayLabel(label) {
    var x = document.createElement("td");
    var t = document.createTextNode(label);
    x.appendChild(t);
    x.classList.add("DayLabel");
    return x;
}

// Main function 
function getWeeks(date, days) {
    // Determine the last day
    let lastDay = new Date(date.getTime() + days * 24 * 60 * 60 * 1000);
    let Month = date.getMonth();
    // Create DOM Object to month header
    let monthHeader = document.createElement("h3");
    let texto = document.createTextNode(month[Month] + " " + date.getFullYear());
    monthHeader.appendChild(texto);
    // Adding the monthheader to main content
    document.getElementById("content").appendChild(monthHeader);
    var table = document.createElement("table");
    table.appendChild(addRow(daysLabel));
    while (lastDay > date) {
        let week = newWeek();
        // The month may change in any day
        if (date.getMonth() != Month) {
            table = document.createElement("table");
            let monthHeader = document.createElement("h3");
            Month = date.getMonth();
            let texto = document.createTextNode(month[Month] + " " + date.getFullYear());
            monthHeader.appendChild(texto);
            document.getElementById("content").appendChild(monthHeader);
        }
        // Determine the day of week to begin 
        // 0-7 Sunday to Saturday
        let firstweekday = date.getDay();
        for (let day = firstweekday; day < 7; day++) {
            let nday = date;
            let hollyday = nday.getMonth() + "/" + nday.getDate();
            if (hollydays[hollyday]) {
                week[day] = DayFormat("HollyDay", nday);
            } else {
                if (day == 0 || day == 6) {
                    week[day] = DayFormat("WeekEnd", nday);
                } else {
                    week[day] = DayFormat("WeekDay", nday);
                }
            }
            date = new Date(date.setDate(date.getDate() + 1));
            if (date >= lastDay || date.getMonth() != Month) {
                break;
            }
        }
        table.appendChild(addRow(week));
        document.getElementById("content").appendChild(table);
    }
}
// Button Event Function
function showWeeks() {
    let date = new Date(document.getElementById("startdate").value);
    let days = parseInt(document.getElementById("numdays").value);
    document.getElementById("content").innerHTML = '';
    // BUG: input type Date always take a day after the picked one
    // adding one day
    date = new Date(date.getTime() + 1 * 24 * 60 * 60 * 1000);
    getWeeks(date, days);
}
function rfmMan(){
    let altura = parseFloat(document.getElementById("altura").value);
    let circunferencia = parseFloat(document.getElementById("circunferencia").value);
    let rfm = 64-(20 * altura / circunferencia);
    let Results = document.createElement("h3");
    let texto = document.createTextNode(rfm.toString());
    Results.appendChild(texto);
    // Adding the Results to main content
    document.getElementById("content").appendChild(Results);
}
function rfmWomen(){
    let altura = parseFloat(document.getElementById("altura").value);
    let circunferencia = parseFloat(document.getElementById("circunferencia").value);
    let rfm = 76-(20 * altura / circunferencia);
    let Results = document.createElement("h3");
    let texto = document.createTextNode(rfm.toString());
    Results.appendChild(texto);
    // Adding the Results to main content
    document.getElementById("content").appendChild(Results);
} 