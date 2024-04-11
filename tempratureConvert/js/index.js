function converTemp() {
    var Temprature = document.getElementById("temperature").value;
    var tempToconvert = document.getElementById("tempToconvert").value;
    var enterNum = document.getElementById("num").value;
    if (Temprature == tempToconvert) {
        document.getElementById("error").innerHTML = "Both are Same";
        document.getElementById("result").innerHTML = "";
        document.getElementById("num").value = "";
    } else {
        if (enterNum == "") {
            document.getElementById("error").innerHTML = "number is required";
            document.getElementById("result").innerHTML = "";
        } else {
            if (enterNum > 0) {
                allspaceremove = enterNum.replaceAll(" ", "")
                document.getElementById("error").innerHTML = "";
                if ((Temprature == "Celsius" && tempToconvert == "Farhenhit") ||(Temprature == "Celsius" && tempToconvert == "Kelvin")) {
                    (Temprature == "Celsius" && tempToconvert == "Farhenhit") ? document.getElementById("result").innerHTML = converTo(enterNum, "Celsius", "Farhenhit"):document.getElementById("result").innerHTML = converTo(enterNum, "Celsius", "Kelvin");
                }
                else if((Temprature == "Farhenhit" && tempToconvert == "Celsius") ||(Temprature == "Farhenhit" && tempToconvert == "Kelvin")){
                    (Temprature == "Farhenhit" && tempToconvert == "Celsius") ? document.getElementById("result").innerHTML = converTo(enterNum, "Farhenhit", "Celsius"): document.getElementById("result").innerHTML = converTo(enterNum, "Farhenhit", "Kelvin")
                }
                else{
                    (Temprature == "Kelvin" && tempToconvert == "Celsius")? document.getElementById("result").innerHTML = converTo(enterNum, "Kelvin", "Celsius"): document.getElementById("result").innerHTML = converTo(enterNum, "Kelvin", "Farhenhit")
                }
            }
            else {  
                document.getElementById("error").innerHTML = "not valid user input";
                document.getElementById("result").innerHTML = "";
            }
        }
    }
    function converTo(allspaceremove, Temprature, tempToconvert) {
        let result = "";
        if (Temprature == "Celsius" && tempToconvert == "Farhenhit") {
            result = (parseInt(allspaceremove) * 9) / 5 + 32;
        }else if(Temprature == "Celsius" && tempToconvert == "Kelvin"){
            result =parseInt(allspaceremove) + 273.15;
        }else if (Temprature == "Farhenhit" && tempToconvert == "Celsius"){
            result =((parseInt(allspaceremove) - 32) * 5) / 9;
        }else if (Temprature == "Farhenhit" && tempToconvert == "Kelvin"){
            result =((parseInt(allspaceremove) - 32) * 5) / 9 + 273.15;
        }else if (Temprature == "Kelvin" && tempToconvert == "Celsius"){
            result =parseInt(allspaceremove) - 273.15;
        }else if(Temprature == "Kelvin" && tempToconvert == "Farhenhit"){
            result= ((parseInt(allspaceremove) - 273.15) * 9) / 5 + 32;
        }
        return result;
    }
}

