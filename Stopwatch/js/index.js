$(document).ready(function () {
    $("#milisecond").css("color", "#FA1E53");
    $("#dots").css("color", "#FA1E53");
    $("#btnlap").prop("disabled", true);

    //hide and show button
    $("#btnstart").show();
    $("#btnstop").hide();
    $("#btnlap").show();
    $("#btnreset").hide();

    // first Display Time
    var displayText = $("#displayTime").html();

    // generate timer
    var minute = 0;
    var second = 0;
    var milisecond = 0;

    var timer;
    var formateMinute = "";
    var formatesecond = "";
    var formatemilisecond = "";
    function stopWatchstart() {
        milisecond++;
        if (milisecond == 99) {
            milisecond = 0;
            second++;
            if (second == 60) {
                second = 0;
                minute++;
            }
        }
        formateMinute = (minute < 10 ? "0" : "") + minute;
        formatesecond = (second < 10 ? "0" : "") + second;
        formatemilisecond = (milisecond < 10 ? "0" : "") + milisecond;

        // set in timer
        $('#minutes').text(formateMinute);
        $('#second').text(formatesecond);
        $('#milisecond').text(formatemilisecond);
    }

    $("#btnstart").click(function () {
        // hide and show button
        $("#btnstop").show();
        $("#btnlap").show();
        $("#btnstart").hide();
        $("#btnreset").hide();

        $("#btnlap").prop("disabled", false);
        timer = setInterval(stopWatchstart, 1000 / 20);
    })

    $("#btnstop").click(function () {
        // hide and show button
        $("#btnstart").show();
        $("#btnreset").show();
        $("#btnlap").hide();
        $("#btnstop").hide();
        clearInterval(timer);
    })

    $('#btnreset').click(function () {
        $('#btnstart').show();
        $('#btnlap').show();
        $('#btnreset').hide();
        $('#btnstop').hide();
        $('#btnlap').prop("disabled", true);


        // clear time
        clearInterval(timer);
        localStorage.clear();
        $("#displayTime").html(displayText);
        $('#lap-display').html("");

        // reload page
        location.reload();
    })

    var objTimeData;
    $("#btnlap").click(function () {
        objTimeData = {
            id: Math.floor(Math.random() * 100),
            formateMinute,
            formatesecond,
            formatemilisecond
        }

        // set data in local storage
        if (JSON.parse(localStorage.getItem("currentime"))) {
            var currenttime = JSON.parse(localStorage.getItem("currentime"));
            currenttime.unshift(objTimeData);

            localStorage.setItem("currentime", JSON.stringify(currenttime));
            printData();
        }
        else {
            localStorage.setItem("currentime", JSON.stringify([objTimeData]));
            printData();
        }
    })

    // printData
    var data = ""

    function printData() {
        data = "";
        $("#lap_display").html = "";
        var printData = JSON.parse(localStorage.getItem("currentime"));
        // console.log(printData)

        printData.map((val, i) => {
            var currentIndex = printData.length - i;
            currentIndex = (currentIndex < 10 ? "0" : "") + currentIndex;
            data += `
                <p><span id="currentIndex">${currentIndex}</span><span id="currentTime">${val.formateMinute}:${val.formatesecond}.${val.formatemilisecond}</span></p>
            `
        })
        document.getElementById("lap-display").innerHTML = data;
    }
})