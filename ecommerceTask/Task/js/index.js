var data = [
    {
        "id": 10,
        "name": "Watch",
        "price": 500,
        "img": "./images/watch.jpg",
        "qty":1
    },
    {
        "id": 11,
        "name": "Shoes",
        "price": 300,
        "img": "./images/shoes.jpg",
        "qty":1
    },
    {
        "id": 12,
        "name": "HeadPhone",
        "price": 800,
        "img": "./images/headphone.jpg",
        "qty":1
    }
    
]
localStorage.setItem("data",JSON.stringify(data));

// add to cart
var filterData = "";

const get_add_btn = document.querySelectorAll(".add-to-cart");
// console.log(get_add_btn);
for (let i = 0; i < get_add_btn.length; i++) {
    const element = get_add_btn[i];
    //   console.log("element", element);
    element.addEventListener("click", (e) => {
        e.preventDefault();

        aid = e.target.id;
        var alldata = JSON.parse(localStorage.getItem("data"));

        var addtoCartdata = alldata.filter((val) => {
            return aid == val.id
        });


        if (JSON.parse(localStorage.getItem("favData"))) {
            const addcartDatalist = JSON.parse(localStorage.getItem("favData"));
            var allcartData = "";
            addcartDatalist.filter(item => {
                if (item.id == aid) {
                    alert(" !!you have already add in addcart page !!")
                    localStorage.setItem("favData", JSON.stringify(addcartDatalist))
                } else {
                    allcartData = addcartDatalist.concat(addtoCartdata);
                    localStorage.setItem("favData", JSON.stringify(allcartData))
                }
            });
            
        }
        else {
            localStorage.setItem("favData", JSON.stringify(addtoCartdata));
        }
        window.location.href = "./cart.html";
    });
}



// addtoCartFunctionlity
function allAddTocart() {
    var allcartData = JSON.parse(localStorage.getItem("favData"));
    var filterData = "";
    allcartData.map((val) => {
        filterData += `
            <tr>
                <td class="py-3">${val.name}</td>
                <td class="py-3">${val.price}</td>
                <td class="py-3"><buttton class="btn btn-warning mx-2" onclick="decrementValue(${val.id})">-</buttton>${val.qty}<buttton class="btn btn-info mx-2" onclick="incrementVaue(${val.id})">+</buttton></td>
                <td class="py-3" id="subTotal">${val.price * val.qty}</td>
                <td class="py-3 d-flex align-items-end flex-column  "><button class="btn btn-danger" onclick="deleteAddTocart(${val.id})">Delete</button></td>
            </tr>
        `
    })
    document.getElementById("addTocartProduct").innerHTML = filterData;
}



function deleteAddTocart(did) {
    const allcartData = JSON.parse(localStorage.getItem("favData"));
    allcartData.map((val, i) => {
        if (did == val.id) {
            return allcartData.splice(i, 1);
        }
    })
    alert("Are You sure want to delete");
    localStorage.setItem("favData", JSON.stringify(allcartData))
    allAddTocart();
    totalCost();
}

function incrementVaue(iid) {
    var allcartData = JSON.parse(localStorage.getItem("favData"));
    allcartData.map((val, i) => {
        if (iid == val.id) {
            val.qty = val.qty + 1
        }
    })
    localStorage.setItem("favData", JSON.stringify(allcartData));
    allAddTocart();
    totalCost();
}


function decrementValue(did) {
    var allcartData = JSON.parse(localStorage.getItem("favData"));
    allcartData.map((val, i) => {
        if (did == val.id && val.qty > 1) {
            val.qty = val.qty - 1
        }
    })
    localStorage.setItem("favData", JSON.stringify(allcartData));
    allAddTocart();
    totalCost();
}

function totalCost() {
    var tcost = 0;
    var allcartData = JSON.parse(localStorage.getItem("favData"));
    allcartData.map((val) => {
        tcost += (val.price * val.qty)
    })
    document.getElementById("totalCost").innerHTML = tcost;
    allAddTocart();

    const code = "ABCD!@#"
    var objData = {
        "tcost": tcost,
        "code": code
    }
    localStorage.setItem("checkdata", JSON.stringify([objData]));
}

// var test =document.getElementsByClassName("ttCost");


//Proceed To Checkout
function CheckOut(event) {
    event.preventDefault()
    var tdata = "";
    var checkData = JSON.parse(localStorage.getItem("checkdata"));
    var coupanCode = "";
    checkData.map((val) => {
        tdata = val.tcost;
        coupanCode = val.code;
    })
    document.getElementById("ttCost").innerHTML = tdata;
    document.getElementById("total").innerHTML = tdata;
}


// discount coupan 
var newTotal = 0;
function discountCode() {
    var coupan = document.getElementById("coupanCode").value;
    var checkData = JSON.parse(localStorage.getItem("checkdata"));
    // console.log("checkdata",checkData)
    checkData.map((val) => {
        if (val.code === coupan) {
            var discount = val.tcost * 0.3;
            newTotal = val.tcost - discount;
            document.getElementById("total").innerHTML = newTotal;
        }
    })
}

function allComplete(){
    alert("!! your order is done !!");
    window.location.href = "./ProductDisplay.html"
}




