function JsonCallParam(Controller, Action, Parameters) {
    $.ajax({
        type: "POST",
        traditional: true,
        async: false,
        cache: false,
        url: '/' + Controller + '/' + Action,
        context: document.body,
        data: Parameters,
        success: function (json) {
            list = null;
            list = json;
        }
        ,
        error: function (xhr) {
            list = null;
        }
    });
}
function JsonCall(Controller, Action) {
    $.ajax({
        type: "POST",
        traditional: true,
        async: false,
        cache: false,
        url: '/' + Controller + '/' + Action,
        context: document.body,
        success: function (json) {
            list = null; list = json;
        },
        error: function (xhr) {
            list = null;
            //debugger;
        }
    });
}

//Convert From Json to JS
function formatDate(inputStr) {
    var dateandTime = inputStr.split('T');
    var date = dateandTime[0].split('-');
    return date[1] + "/" + date[2] + "/" + date[0];
}

//Convert From Json to JS
function formatDateTime(inputStr) {
    var dateandTime = inputStr.split('T');
    var date = dateandTime[0].split('-');
    var time = dateandTime[1].split(':');
    return date[1] + "/" + date[2] + "/" + date[0] + " " + time[0] + ":" + time[1];
}

//Js Date Formate
function FormattedDate(date) {
    var month = format(date.getMonth() + 1);
    var day = format(date.getDate());
    var year = format(date.getFullYear());
    return month + "/" + day + "/" + year;
}

//Start Preloader
function startLoader(id) {
    $(id).waitMe({ effect: "ios", text: 'Loading...', bg: '#fff', color: '#555' });
}

//End Preloader
function endLoader(id) {
    setTimeout(function () { $(id).waitMe("hide"); }, 500);
    
}

//Check Null
function notNull(prop) {
    return prop === null ? "" : prop;
}

//Toast
function notify(text) {
    $.notify({
        message: text
    },
    {
        type: 'bg-black',
        allow_dismiss: true,
        newest_on_top: true,
        timer: 1000,
        placement: {
            from: "bottom",
            align: "right"
        },
        template: '<div data-notify="container" class="bootstrap-notify-container alert alert-dismissible {0} p-r-35" role="alert">' +
            '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
            '<span data-notify="icon"></span> ' +
            '<span data-notify="title">{1}</span> ' +
            '<span data-notify="message">{2}</span>' +
            '<div class="progress" data-notify="progressbar">' +
            '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
            '</div>' +
            '<a href="{3}" target="{4}" data-notify="url"></a>' +
            '</div>'
    });

}

//Cron Expression Maker from properties
function cronMaker(obj) {
    let hour = obj.hour;
    let min = obj.min;
    let weekDay = obj.weekDay;
    let monthdate = obj.monthdate;
    let delayInDays = obj.delayInDays;

    let expression = "";
    if (obj.type === 'Daily') {
        expression = min + " " + hour + " */" + delayInDays + " * ?";
    }
    else if (obj.type === 'Weekly') {
        expression = min + " " + hour + " ? * " + weekDay;
    }
    else if (obj.type === 'Monthly') {
        expression = min + " " + hour + " " + monthdate + " * ?";
    }
     
    return expression;
}

//From Cron Expression Maker to properties
function cronParser(expression) {
    var splits = expression.split(" ");
    let obj = {};
    if (splits[2].split("/")[0] === '*') { //Daily
        obj = { min: splits[0], hour: splits[1], delayInDays: splits[2].split("/")[1], weekDay: "", monthdate: "" };
    }
    else if(splits[2] === '?') { //Weekly
        obj = { min: splits[0], hour: splits[1], weekDay: splits[4], delayInDays: "", monthdate: "" };
    } 
    else if (splits[4] === '?') { //Monthly
        obj = { min: splits[0], hour: splits[1], monthdate: splits[2], delayInDays: "", weekDay: "" };
    }

    return obj;
}

function minTwoDigits(n) {
    return (n.length === 1 ? '0' : '') + n;
}