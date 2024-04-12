// hide the update buttton
document.getElementById('btnupdate').style.display = "none";
getdata();

// add data in local storage
function addData() {
    let fname = document.getElementById("fname").value;
    let lname = document.getElementById("lname").value;
    let email = document.getElementById("email").value;
    let psw = document.getElementById("psw").value;
    let uid = Math.floor(Math.random() * 100); //generate random id

    const objdata = {
        fname,
        lname,
        email,
        psw,
        uid
    }
    // console.log("objdata ::::::::::>",objdata);
    if (JSON.parse(localStorage.getItem("data"))) {
        arrdata = JSON.parse(localStorage.getItem("data"));
        arrdata.push(objdata);
        localStorage.setItem("data", JSON.stringify(arrdata))

        document.getElementById("fname").value = "";
        document.getElementById("lname").value = "";
        document.getElementById("email").value = "";
        document.getElementById("psw").value = "";
    }
    else {
        localStorage.setItem("data", JSON.stringify([objdata]));
        document.getElementById("fname").value = "";
        document.getElementById("lname").value = "";
        document.getElementById("email").value = "";
        document.getElementById("psw").value = "";
    }
    getdata();
}

// print the data in table

function getdata() {
    let showdata = JSON.parse(localStorage.getItem("data"));
    // console.log("showdata::::::::::>",showdata.length);
    let allData = '';
    if (showdata.length == 0) {
        allData += `
            <tr>
                <td colspan="6" class="text-center">No user Found !!!!!</td>
            </tr>
        `;
        document.getElementById("data").innerHTML = allData;
    }
    showdata.map((val) => {
        allData += `
                <tr>
                    <td>${val.uid}</td>
                    <td>${val.fname}</td>
                    <td>${val.lname}</td>
                    <td>${val.email}</td>
                    <td>${val.psw}</td>
                    <td>
                        <button class="btn btn-success" onclick = "editData(${val.uid})">Edit</button>
                        <button class="btn btn-danger" onclick = "deleteData(${val.uid})">Delete</button>
                    </td>
                </tr>
            `;
    })
    document.getElementById('data').innerHTML = allData;
}

// delete the data

function deleteData(did) {
    // console.log("did::::;;;;>",did)
    let arr = JSON.parse(localStorage.getItem("data"));
    arr.map((val, i) => {
        if (did == val.uid) {
            return arr.splice(i, 1)
        }

    })

    localStorage.setItem('data', JSON.stringify(arr));
    getdata();
}

// update data

function editData(eid) {
    document.getElementById('btnupdate').style.display = "block";
    document.getElementById('btnsubmit').style.display = "none";

    let arr = JSON.parse(localStorage.getItem("data"));
    arr.map((val) => {
        if (eid == val.uid) {
            document.getElementById("fname").value = val.fname;
            document.getElementById("lname").value = val.lname;
            document.getElementById("email").value = val.email;
            document.getElementById("psw").value = val.psw;
            document.getElementById("id").value = val.uid;
        }
    })
}


function updateData() {
    document.getElementById('btnsubmit').style.display = "block";
    document.getElementById('btnupdate').style.display = "none";

    let ufname = document.getElementById("fname").value;
    let ulname = document.getElementById("lname").value;
    let uemail = document.getElementById("email").value;
    let upsw = document.getElementById("psw").value;
    let id = document.getElementById("id").value;

    let arr = JSON.parse(localStorage.getItem("data"));
    arr.map((val) => {
        if (id == val.uid) {
            val.fname = ufname;
            val.lname = ulname;
            val.email = uemail;
            val.psw = upsw;
        }
    })
    localStorage.setItem('data', JSON.stringify(arr));
    getdata();

    document.getElementById("fname").value = "";
    document.getElementById("lname").value = "";
    document.getElementById("email").value = "";
    document.getElementById("psw").value = "";
}
