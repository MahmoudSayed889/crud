


// inputs
let productNameInput = document.getElementById("productNameInput");
let productPriceInput = document.getElementById("productPriceInput");
let productCategoryInput = document.getElementById("productCategoryInput");
let productDescInput = document.getElementById("productDescInput");
let searchInput = document.getElementById("searchInput");
// btns
let btnAdd = document.getElementById("btnAdd");
let btnUpdata = document.getElementById("btnUpdata");
// 
let productContainer;
let updateIndex;



if( localStorage.getItem("products") == null )
{
    productContainer = [];
}
else
{
    productContainer = JSON.parse( localStorage.getItem("products") );
    displayProduct();
}


function addProduct() {

    if( productNameInput.value == ""  )
    {
        productNameInput.classList.add("is-invalid");
        productNameInput.classList.remove("is-valid");
        productPriceInput.classList.add("is-invalid");
        productPriceInput.classList.remove("is-valid");

        layerDisable.style.zIndex = '1';
        btnAdd.classList.add("disabled");
    }
    else
    {
        productNameInput.classList.remove("is-invalid");
        productNameInput.classList.add("is-valid");
        productPriceInput.classList.remove("is-invalid");
        productPriceInput.classList.add("is-valid");

        layerDisable.style.zIndex = '-1';
        btnAdd.classList.remove("disabled");

        let product = {

            name: productNameInput.value,
            price: productPriceInput.value,
            category: productCategoryInput.value,
            desc: productDescInput.value,
        }
        productContainer.push(product);
        localStorage.setItem("products" , JSON.stringify(productContainer));
        clearForm();
        displayProduct();
    }
    
}
btnAdd.addEventListener("click" , addProduct);


function clearForm(){

    productNameInput.value = "";
    productPriceInput.value = "";
    productCategoryInput.value = "";
    productDescInput.value = "";
    
}



function displayProduct(){


    let cartoona = ``;

    for(let i =0 ; i<productContainer.length ; i++)
    {
        cartoona += 
        `<tr>
            <td>${i+1}</td>
            <td>${productContainer[i].name}</td>
            <td>${productContainer[i].price}</td>
            <td>${productContainer[i].category}</td>
            <td>${productContainer[i].desc}</td>
            <td><button onclick="getDataFromTable(${i})" class="btn btn-outline-success">Update</button></td>
            <td><button onclick="deleteProduct(${i});" class="btn btn-outline-danger">Delete</button></td>
        </tr>`
    }
    document.getElementById("tableBody").innerHTML = cartoona;
}




function deleteProduct(productIndex){

    productContainer.splice(productIndex,1);
    localStorage.setItem("products" , JSON.stringify(productContainer));
    displayProduct();
}




btnUpdata.addEventListener("click" , function updateProduct(){


    let product = {

        name: productNameInput.value,
        price: productPriceInput.value,
        category: productCategoryInput.value,
        desc: productDescInput.value,
    }
    productContainer[updateIndex] = product ;
    localStorage.setItem("products" , JSON.stringify(productContainer));
    clearForm();
    displayProduct();
    
    btnUpdata.classList.replace("d-flex" , "d-none");
    btnAdd.classList.replace("d-none" , "d-flex")
});

function getDataFromTable(productIndex){

    updateIndex = productIndex;

    productNameInput.value = productContainer[productIndex].name;
    productPriceInput.value = productContainer[productIndex].price;
    productCategoryInput.value = productContainer[productIndex].category;
    productDescInput.value = productContainer[productIndex].desc;

    btnUpdata.classList.replace("d-none" , "d-flex");
    btnAdd.classList.replace("d-flex" , "d-none");
}










function searchProduct(searchTerm){

    let cartoona = ``;

    for(let i=0 ; i<productContainer.length ; i++)
    {
        if( productContainer[i].name.toLowerCase().includes( searchTerm.toLowerCase() ) )
        {
            cartoona += 
            `<tr>
                <td>${i+1}</td>
                <td>${productContainer[i].name}</td>
                <td>${productContainer[i].price}</td>
                <td>${productContainer[i].category}</td>
                <td>${productContainer[i].desc}</td>
                <td><button onclick="getDataFromTable(${i})" class="btn btn-outline-success">Update</button></td>
                <td><button onclick="deleteProduct(${i});" class="btn btn-outline-danger">Delete</button></td>
            </tr>`
        }
    }
    document.getElementById("tableBody").innerHTML = cartoona;
}





// validation

let regexName = /[a-z0-9]/;
function validateProductName(){

    if( regexName.test( productNameInput.value ) == true) 
    {
        productNameInput.classList.remove("is-invalid");
        productNameInput.classList.add("is-valid");
        
    }
    else
    {
        productNameInput.classList.add("is-invalid");
        productNameInput.classList.remove("is-valid");

    }
}
productNameInput.addEventListener("keyup" , validateProductName );


let regexPrice = /[0-9]/;
function validateProductPrice(){

    if( regexPrice.test( productPriceInput.value ) == true) 
    {
        productPriceInput.classList.remove("is-invalid");
        productPriceInput.classList.add("is-valid");
        
    }
    else
    {
        productPriceInput.classList.add("is-invalid");
        productPriceInput.classList.remove("is-valid");
        
    }
}
productPriceInput.addEventListener("keyup" , validateProductPrice );


let inputs = document.querySelectorAll("#formData input");
let layerDisable = document.getElementById("layerDisable");

for( let i=0 ; i<inputs.length ; i++)
{
    inputs[i].addEventListener("keyup" , function valid(){

        if( regexName.test( productNameInput.value ) == true && 
            regexPrice.test( productPriceInput.value ) == true )
        {
            layerDisable.style.zIndex = '-1';
            btnAdd.classList.remove("disabled");
        }
        else
        {
            layerDisable.style.zIndex = '1';
            btnAdd.classList.add("disabled");
        }

    })
}