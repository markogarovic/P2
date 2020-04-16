var storage = JSON.parse(localStorage.getItem("data"));

function addItems(storage){
        titlesOnScreen = [];
        for(item of document.getElementsByClassName("product")){
            var title = item.children[1].innerHTML;
            titlesOnScreen.push(title);
        }
        if(storage !== null){
            for(item of storage){
                if(titlesOnScreen.includes(item.title)){
                    continue;
                }
                var listOfProducts = document.getElementsByClassName("list-products")[0];
                var productName = item.title;
                var productDescr = item.description;
                var productImg = item.imgUrl;
                var productPrice = item.price;
                
                
                
                var product = document.createElement("div");
                product.classList.add("product");
                
                var img = document.createElement("img");
                img.setAttribute("src", productImg);
                
                var name = document.createElement("p");
                name.innerHTML = productName;
                
                var price = document.createElement("p");
                price.innerHTML = "$"+productPrice;
                
                var descr = document.createElement("p");
                descr.innerHTML = productDescr;
                descr.className = "none";
    
                var detailsBtn = document.createElement("button");
                detailsBtn.className = "details-button";
                detailsBtn.innerHTML = "Details";
                detailsBtn.addEventListener("click", detailsHandler);
    
                var buyBtn = document.createElement("button");
                buyBtn.className = "buy-button";
                buyBtn.innerHTML = "Buy";
                buyBtn.addEventListener("click", buyHandler);
    
                product.appendChild(img);
                product.appendChild(name);
                product.appendChild(price);
                product.appendChild(descr);
                product.appendChild(detailsBtn);
                product.appendChild(buyBtn);
    
                listOfProducts.appendChild(product);
            }
        }
}
addItems(storage);

var storage2 = JSON.parse(localStorage.getItem("data2"));
console.log(storage2)
function addItems2(storage){
    var shoppingCartProducts = document.getElementsByClassName("shopping-cart-products")[0];
    titlesOnScreen = [];
        for(item of document.getElementsByClassName("shopping-cart-product")){
            var title = item.children[0].children[0].children[0].innerHTML;
            titlesOnScreen.push(title);
        }
        if(storage !== null){
            for(item of storage){
                if(titlesOnScreen.includes(item.title)){
                    continue;
                }
                var productImgSrc = item.imgUrl;
                var productName = item.title;
                var productPrice = item.price;
                var totalPrice = item.totalPrice;
                if(item.times == "0"){
                    continue
                }
                

                var product = document.createElement("div");
                product.classList.add("shopping-cart-product");

                var productInfo = document.createElement("div");
                productInfo.className = "product-info";

                var div = document.createElement("div");

                var name = document.createElement("h3");
                name.innerHTML = productName;

                var price = document.createElement("p");
                price.innerHTML = productPrice+ ` &times; `+ item.times;

                div.appendChild(name);
                div.appendChild(price);

                var img = document.createElement("img");
                img.setAttribute("src",productImgSrc)

                productInfo.appendChild(div);
                productInfo.appendChild(img);

                product.appendChild(productInfo)
                shoppingCartProducts.appendChild(product);

                var productCount = document.createElement("div");
                productCount.className = "product-count";

                var minusBtn = document.createElement("button");
                minusBtn.innerHTML = "-";
                minusBtn.addEventListener("click", buttonHandler);

                var span = document.createElement("span");
                span.innerHTML = `${item.times}`;

                var plusBtn = document.createElement("button");
                plusBtn.innerHTML = "+";
                plusBtn.addEventListener("click", buttonHandler);

                productCount.appendChild(minusBtn);
                productCount.appendChild(span);
                productCount.appendChild(plusBtn);

                product.appendChild(productCount)
                shoppingCartProducts.appendChild(product);

                var total = document.getElementsByClassName("shopping-cart-summary")[0];
                totalPrice = Number(item.totalPrice);
                total.children[0].children[0].innerHTML = "$"+totalPrice;
            }
        }
}
//addItems2(storage2);


var addButton = document.querySelector(".add-product button");
addButton.addEventListener("click", addHandler);

function addHandler(e){
    e.preventDefault();
    
    var listOfProducts = document.getElementsByClassName("list-products")[0];
    var productName = document.getElementById("productName").value;
    var productDescr = document.getElementById("productDescr").value;
    var productImg = document.getElementById("productImg").value;
    var productPrice = document.getElementById("productPrice").value;
    
    
    var product = document.createElement("div");
    product.classList.add("product");
    
    var img = document.createElement("img");
    img.setAttribute("src", productImg);
    
    var name = document.createElement("p");
    name.innerHTML = productName;
    
    var price = document.createElement("p");
    price.innerHTML = "$"+productPrice;
    
    var descr = document.createElement("p");
    descr.innerHTML = productDescr;
    descr.className = "none";

    var detailsBtn = document.createElement("button");
    detailsBtn.className = "details-button";
    detailsBtn.innerHTML = "Details";
    detailsBtn.addEventListener("click", detailsHandler);

    var buyBtn = document.createElement("button");
    buyBtn.className = "buy-button";
    buyBtn.innerHTML = "Buy";
    buyBtn.addEventListener("click", buyHandler);

    product.appendChild(img);
    product.appendChild(name);
    product.appendChild(price);
    product.appendChild(descr);
    product.appendChild(detailsBtn);
    product.appendChild(buyBtn);

    listOfProducts.appendChild(product);


    // const formData = new FormData();
    // formData.append('name' ,productName);
    // formData.append('imgUrl' ,productImg);
    // formData.append('price' ,productPrice);
    // fetch("items.json",{
    //     method: "PUT",
    //     body: formData
    // })

    // .then((response) => {
    //     return response.json()
    // })
    // .then((data) => {
    //     console.log('Success:', data);
    // })
    // .catch((error) => {
    //     console.error('Error:', error);
    // });

    var arr = [];
    for(item of document.getElementsByClassName("product")){
        var object = {};
        var title = item.children[1].innerHTML;
        var imgUrl = item.children[0].getAttribute("src");
        var price = item.children[2].innerHTML.slice(1,);
        var description = item.children[3].innerHTML;
        object.title = title;
        object.imgUrl = imgUrl;
        object.price = price;
        object.description = description;
        
        arr.push(object);
    }
    
    localStorage.setItem("data",JSON.stringify(arr));
}

for(let i = 0; i < document.getElementsByClassName("buy-button").length;i++){
    document.getElementsByClassName("buy-button")[i].addEventListener("click", buyHandler);
}
for(let i = 0; i< document.getElementsByClassName("details-button").length;i++){
    document.getElementsByClassName("details-button")[i].addEventListener("click", detailsHandler);
}

function detailsHandler(e){
    e.preventDefault();

    var fullScreen = document.getElementById("myFullScreen");
    document.getElementById("myFullScreen").classList.remove("none");
    fullScreen.classList.add("block","animated","lightSpeedIn");
    fullScreen.children[1].innerHTML = `
        <img src="${this.parentElement.children[0].getAttribute("src")}" alt="something">
        <h2>${this.parentElement.children[1].innerHTML}</h2> 
        <p>${this.parentElement.children[3].innerHTML}</p>`

}



function buyHandler(e){
    e.preventDefault();
    
    var shoppingCartProducts = document.getElementsByClassName("shopping-cart-products")[0];
    var productImgSrc = this.parentElement.children[0].getAttribute("src");
    var productName = this.parentElement.children[1].innerHTML;
    var productPrice = this.parentElement.children[2].innerHTML;
    
    if(shoppingCartProducts != null){
        for(let i = 0; i < shoppingCartProducts.children.length;i++){
            if(shoppingCartProducts.children[i].children[0].children[0].children[0].innerHTML === productName){
                this.parentElement.classList.add("animated","tada")
                return
            }
        }
    }


    var product = document.createElement("div");
    product.classList.add("shopping-cart-product");

    var productInfo = document.createElement("div");
    productInfo.className = "product-info";

    var div = document.createElement("div");

    var name = document.createElement("h3");
    name.innerHTML = productName;

    var price = document.createElement("p");
    price.innerHTML = productPrice+ ` &times; `+ 1;

    div.appendChild(name);
    div.appendChild(price);

    var img = document.createElement("img");
    img.setAttribute("src",productImgSrc)

    productInfo.appendChild(div);
    productInfo.appendChild(img);

    product.appendChild(productInfo)
    shoppingCartProducts.appendChild(product);

    var productCount = document.createElement("div");
    productCount.className = "product-count";

    var minusBtn = document.createElement("button");
    minusBtn.innerHTML = "-";
    minusBtn.addEventListener("click", buttonHandler);

    var span = document.createElement("span");
    span.innerHTML = "1";

    var plusBtn = document.createElement("button");
    plusBtn.innerHTML = "+";
    plusBtn.addEventListener("click", buttonHandler);

    productCount.appendChild(minusBtn);
    productCount.appendChild(span);
    productCount.appendChild(plusBtn);

    product.appendChild(productCount)
    shoppingCartProducts.appendChild(product);

    var total = document.getElementsByClassName("shopping-cart-summary")[0];
    var totalPrice = total.children[0].children[0].innerHTML;
    totalPrice = Number(totalPrice.slice(1,));
    totalPrice += Number(productPrice.slice(1,));
    total.children[0].children[0].innerHTML = "$"+totalPrice;

    var arr = [];
    for(item of document.getElementsByClassName("shopping-cart-product")){
        var object = {};
        var title = item.children[0].children[0].children[0].innerHTML;
        var imgUrl = item.children[0].children[1].getAttribute("src");
        var price =  productPrice;
        var times = item.children[0].children[0].children[1].innerHTML.split(" ")[2]
        if(times == "undefined"){
            times = 0;
        }
        object.title = title;
        object.imgUrl = imgUrl;
        object.price = price;
        object.times = times;
        object.totalPrice = totalPrice;
        arr.push(object);
    }
    
    localStorage.setItem("data2",JSON.stringify(arr));
    
}

for(let i = 0; i< document.getElementsByClassName("product-count").length;i++){
    document.getElementsByClassName("product-count")[i].children[0].addEventListener("click", buttonHandler);
    document.getElementsByClassName("product-count")[i].children[2].addEventListener("click", buttonHandler);
}

function buttonHandler(e){
    e.preventDefault();
    var totalPrice;
    this.parentElement.parentElement.classList.remove("animated","tada");
    var productPrice = this.parentElement.parentElement.children[0].children[0].children[1].innerHTML.split(" ")[0].split("$")[0]
    if(this.innerHTML === "+"){
        
        var productInfo = this.parentElement.parentElement.children[0];

        var amount = parseInt(this.parentElement.children[1].innerHTML)
        amount++;
        if(amount >= 11){
            this.parentElement.parentElement.classList.add("animated","tada");
            return
        }
        this.parentElement.children[1].innerHTML = amount;

        productInfo.children[0].children[1].innerHTML = productInfo.children[0].children[1].innerHTML.split(" ")[0] +" " +productInfo.children[0].children[1].innerHTML.split(" ")[1]+" "+ amount; 

        var addNumber = Number(productInfo.children[0].children[1].innerHTML.split(" ")[0].slice(1,));

        var total = document.getElementsByClassName("shopping-cart-summary")[0];
        totalPrice = total.children[0].children[0].innerHTML;
        totalPrice = Number(totalPrice.slice(1,));
        totalPrice += addNumber;
        total.children[0].children[0].innerHTML = "$"+totalPrice;

    }else if(this.innerHTML === "-"){
        var productInfo = this.parentElement.parentElement.children[0];
        var amount = parseInt(this.parentElement.children[1].innerHTML)
        amount--;
        
        this.parentElement.children[1].innerHTML = amount;
        productInfo.children[0].children[1].innerHTML = productInfo.children[0].children[1].innerHTML.split(" ")[0] +" " +productInfo.children[0].children[1].innerHTML.split(" ")[1]+" "+ amount;
    
        var minusNumber = Number(productInfo.children[0].children[1].innerHTML.split(" ")[0].slice(1,));

        var total = document.getElementsByClassName("shopping-cart-summary")[0];
        totalPrice = total.children[0].children[0].innerHTML;
        totalPrice = Number(totalPrice.slice(1,));
        totalPrice -= minusNumber;
        total.children[0].children[0].innerHTML = "$"+totalPrice;
        if(amount === 0){
            productInfo.parentElement.parentElement.removeChild(productInfo.parentElement)
        }
    }
    var arr = [];
    for(item of document.getElementsByClassName("shopping-cart-product")){
        var object = {};
        var title = item.children[0].children[0].children[0].innerHTML;
        var imgUrl = item.children[0].children[1].getAttribute("src");
        var price =  item.children[0].children[0].children[1].innerHTML.split(" ")[0].slice(1,);
        var times = item.children[0].children[0].children[1].innerHTML.split(" ")[2]
        if(times == "undefined"){
            times = 0;
        }
        object.title = title;
        object.imgUrl = imgUrl;
        object.price = price;
        object.times = times;
        object.totalPrice = totalPrice;
        arr.push(object);
    }
    
    localStorage.setItem("data2",JSON.stringify(arr));
}


var purchase = document.getElementsByClassName("shopping-cart-summary")[0].children[1].children[0];
purchase.addEventListener("click", purchaseHandler);

function purchaseHandler(e){
    
    var fullScreen = document.getElementById("myFullScreen");
    document.getElementById("myFullScreen").classList.remove("none");
    fullScreen.classList.add("block","animated","bounceInLeft");
    fullScreen.children[1].innerHTML = `<h1>Success</h1>`
}

document.getElementById("close").addEventListener("click", ()=>{
    document.getElementById("myFullScreen").classList.add("none");
    document.getElementById("myFullScreen").classList.remove("block");
})