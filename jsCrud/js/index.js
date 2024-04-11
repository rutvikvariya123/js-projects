document.getElementById("btnUpdate").style.display = "none";
document.getElementById("id").style.display = "none";
let errors = document.querySelectorAll("small");

function handlesubmit(event) {
	event.preventDefault();
	let name = document.getElementById("name");
	let email = document.getElementById("email");
	let pass = document.getElementById("pass");
	let date = document.getElementById("date");
	var gender = document.querySelector('input[name="radio"]:checked');
	let checkedValue = document.querySelectorAll('input[name="hobbie"]:checked');
	let hobbie = [];
	for (let index = 0; index < checkedValue.length; index++) {
		hobbie.push(checkedValue[index].value);
	}
	let file = document.getElementById("file");
	let country = document.getElementById("country");
	let state = document.getElementById("state");
	let city = document.getElementById("city");
	let genderr = document.querySelectorAll('input[name="radio"]');

	name.addEventListener("input", function (e) { onchangeerror(e, errors[0]); });
	email.addEventListener("input", function (e) { onchangeerror(e, errors[1]); });
	pass.addEventListener("input", function (e) { onchangeerror(e, errors[2]); });
	date.addEventListener("input", function (e) { onchangeerror(e, errors[3]); });
	genderr[0].addEventListener("input", function (e) { onchangeerror(e, errors[4]); });
	genderr[1].addEventListener("input", function (e) { onchangeerror(e, errors[4]); });
	country.addEventListener("input", function (e) { onchangeerror(e, errors[7]); });
	state.addEventListener("input", function (e) { onchangeerror(e, errors[8]); });
	city.addEventListener("input", function (e) { onchangeerror(e, errors[9]); });

	let error = false;
	if (!error) {
		if (name.value.length == 0) { errors[0].innerHTML = "Please fill Name"}
		if (email.value.length == 0) { errors[1].innerHTML = "Please fill Email" }
		if (pass.value.length == 0) { errors[2].innerHTML = "Please fill Password" }
		if (date.value.length == 0) { errors[3].innerHTML = "Please Select date" }
		if (gender == null) { errors[4].innerHTML = "Please Select Gender" }
		if (checkedValue.length == 0) { errors[5].innerHTML = " Select Any Option" }
		if (file.files.length == 0) { errors[6].innerHTML = " Please select file" }
		if (country.value.length == 0) { errors[7].innerHTML = " Please select Country" }
		if (state.value.length == 0) { errors[8].innerHTML = " Please select State" }
		if (city.value.length == 0) { errors[9].innerHTML = " Please select city" } else { error = true }
	}
	if (error) {
		const objData = {
			name: name.value,
			email: email.value,
			pass: pass.value,
			date: date.value,
			gender: gender.value,
			hobbie: hobbie,
			file: file.value,
			country: country.value,
			state: state.value,
			city: city.value,
			id: Math.floor(Math.random() * 10),
		};

		if (JSON.parse(localStorage.getItem("alldata"))) {
			const getData = JSON.parse(localStorage.getItem("alldata"));
			getData.push(objData);
			localStorage.setItem("alldata", JSON.stringify(getData));
		} else {
			localStorage.setItem("alldata", JSON.stringify([objData]));
		}
		let formToReset = document.getElementById("frm");
		formToReset.reset();
		showData();

		Swal.fire({
			title: "Good job!",
			text: "You clicked the button!",
			icon: "success",
		});
	}
}

function onchangeerror(e, error) {
	if (e.target.value.length == 0) {
		error.innerHTML = "Please fill Name";
	} else {
		error.innerHTML = "";
	}
}

function cekboxdata() {
	let checkedValued = document.querySelectorAll('input[name="hobbie"]:checked');
	if (checkedValued.length == 0) {
		errors[5].innerHTML = "Select Any Option";
		return false
	} else {
		errors[5].innerHTML = " ";
		return true;
	}
}

function fileData() {
	let file = document.getElementById("file");
	if (file.files.length == 0) {
		errors[6].innerHTML = " Please select file";
		return false
	} else {
		errors[6].innerHTML = "";
		return true;
	}
}
function showData() {
	var getall = JSON.parse(localStorage.getItem("alldata"));
	var datta = "";
	getall.map((val) => {
		datta += `
            <tr>
                <td>${val.name}</td>
                <td>${val.email}</td>
                <td>${val.pass}</td>
                <td>${val.date}</td>
                <td>${val.gender}</td>
                <td>${val.hobbie}</td>
                <td><img src="${val.file}"/></td>
                <td>${val.country}</td>
                <td>${val.state}</td>
                <td>${val.city}</td>
                <td>
                    <button class="btn btn-success" onclick="editData(${val.id})">edit</button>
                    <button class="btn btn-danger" onclick="deleteData(${val.id})">delete</button>
                </td>
            </tr>
        `;
	});
	document.getElementById("printData").innerHTML = datta;
}
showData();

function deleteData(did) {
	Swal.fire({
		title: "Are you sure?",
		text: "You won't be able to revert this!",
		icon: "warning",
		showCancelButton: true,
		confirmButtonColor: "#3085d6",
		cancelButtonColor: "#d33",
		confirmButtonText: "Yes, delete it!",
	}).then((result) => {
		if (result.isConfirmed) {
			var getall = JSON.parse(localStorage.getItem("alldata"));
			getall.filter((val, i) => {
				if (did == val.id) {
					return getall.splice(i, 1);
				}
			});
			localStorage.setItem("alldata", JSON.stringify(getall));
			showData();
			Swal.fire({
				title: "Deleted!",
				text: "Your file has been deleted.",
				icon: "success",
			});
		}
	});
}

function editData(eid) {
	var getall = JSON.parse(localStorage.getItem("alldata"));
	getall.map((val) => {
		if (eid == val.id) {
			document.getElementById("id").value = val.id;
			document.getElementById("name").value = val.name;
			document.getElementById("email").value = val.email;
			document.getElementById("pass").value = val.pass;
			document.getElementById("date").value = val.date;
			let male = document.getElementById("male");
			let female = document.getElementById("female");
			if (val.gender === "Male") {
				male.checked = true;
			} else if (val.gender === "Female") {
				female.checked = true;
			}
			let cricket = document.getElementById("cricket");
			let music = document.getElementById("music");
			let traveling = document.getElementById("traveling");
			let hobbiess = val.hobbie;
			hobbiess.map((val) => {
				if (val === "music") {
					music.checked = true;
				} else if (val === "traveling") {
					traveling.checked = true;
				} else if (val === "cricket") {
					cricket.checked = true;
				}
			});
			document.getElementById("country").value = val.country;
			statedata(val.country, val.state);
			cityData(val.state, val.city);
		}
	});
	document.getElementById("btnUpdate").style.display = "block";
	document.getElementById("btnSubmit").style.display = "none";
}

function updateData() {


	var uid = document.getElementById("id").value;
	var uname = document.getElementById("name");
	var uemail = document.getElementById("email");
	var upass = document.getElementById("pass");
	var udate = document.getElementById("date");
	var ugender = document.querySelector('input[name="radio"]:checked');
	var checkedValue = document.querySelectorAll('input[name="hobbie"]:checked');
	var uhobbie = [];
	for (let index = 0; index < checkedValue.length; index++) {
		uhobbie.push(checkedValue[index].value);
	}
	var ufile = document.getElementById("file");
	var ucountry = document.getElementById("country");
	var ustate = document.getElementById("state");
	var ucity = document.getElementById("city");


	let error = false;
	uname.addEventListener("input", function (e) { onchangeerror(e, errors[0]); });
	uemail.addEventListener("input", function (e) { onchangeerror(e, errors[1]); });
	upass.addEventListener("input", function (e) { onchangeerror(e, errors[2]); });
	udate.addEventListener("input", function (e) { onchangeerror(e, errors[3]); });
	ufile.addEventListener("input", function (e) { onchangeerror(e, errors[6]); });
	
	
	
	if (!error) {
		if (uname.value.length == 0) { errors[0].innerHTML = "Please fill Name" }
		if (uemail.value.length == 0) { errors[1].innerHTML = "Please fill Email" }
		if (upass.value.length == 0) { errors[2].innerHTML = "Please fill password" }
		if (udate.value.length == 0) { errors[3].innerHTML = "Please Select date" }
		if (checkedValue.length == 0) { errors[5].innerHTML = " Select Any Option" }
		if (ufile.files.length == 0) { errors[6].innerHTML = " Please select file" }

		
		else { error = true }
	}
	if (error) {
		var getall = JSON.parse(localStorage.getItem("alldata"));
		getall.map((val) => {
			if (uid == val.id) {
				val.name = uname.value;
				val.email = uemail.value;
				val.pass = upass.value;
				val.date = udate.value;
				val.gender = ugender.value;
				val.hobbie = uhobbie.value;
				val.file = ufile;
				val.country = ucountry.value;
				val.state = ustate.value;
				val.city = ucity.value;
			}
		});
		document.getElementById("btnUpdate").style.display = "none";
		document.getElementById("btnSubmit").style.display = "block";
		Swal.fire({
			title: "Do you want to save the changes?",
			showDenyButton: true,
			showCancelButton: true,
			confirmButtonText: "Save",
			denyButtonText: `Don't save`,
		}).then((result) => {
			if (result.isConfirmed) {
				localStorage.setItem("alldata", JSON.stringify(getall));
				document.getElementById("frm").reset();
				showData();
				Swal.fire("Saved!", "", "success");
			} else if (result.isDenied) {
				Swal.fire("Changes are not saved", "", "info");
			}
		});
	}
}
