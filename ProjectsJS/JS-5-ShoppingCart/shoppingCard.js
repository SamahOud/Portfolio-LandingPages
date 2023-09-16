let productItem = [
    new Product(1, "Asus TUF Gaming F15", "1488.31", 
    `ASUS gaming laptop 15.6'' screen, 
    FHD resolution (1920x1080), Intel® Core™ i7-12700H processor, 
    NVIDIA® GeForce RTX™ 4050 Laptop 6GB graphics accelerator, 
    16GB internal memory, 1TB SSD drive and no operating system .`, "asus-TUF.jpg", "laptop"),

    new Product(2, "Asus TUF VG27AQ1A", "418.24", 
    `A high-quality computer screen from Asus for gamers,  
    144Hz, 27 inches in size,
    DP and HDMI ports, the option of hanging on the wall,  
    built-in speakers and FreeSync support.`, "asus-TUF-VG27AQ1A.jpg", "screen"),

    new Product(3, "Lenovo Legion Armored Bag", "70.36",
    `High-quality laptop backpack designed for gamers from Lenovo, 
    suitable for 17.3 inch laptops` , "bag-LenovoLegion1.jpg", "bags"),

    new Product(4, "Lenovo LOQ 15IRH8", "1074.77", 
    `Lenovo laptop size 15.6'' FHD (1920x1080) resolution, 
    Intel® Core™ i5-13420H processor, 
    NVIDIA® GeForce RTX™ 2050 4GB graphics accelerator, 
    16GB internal memory, 
    512GB SSD drive and no operating system.`, "lenovoLOQ.jpg", "laptop"),

    new Product(5, "Canon EOS R50", "1072.16", 
    `Canon EOS R50 Mirrorless Digital Camera 
    engaging content with this EOS R mirrorless camera,
    from crisp stills to 4K movies and live streams.
    A dedicated and versatile device. The RF-S 18-45mm F4.5-6.3 IS STM lens is included.`, 
    "cameraCanon1.jpg", "camera"),

    new Product(6, "Lenovo Legion Pro 5", "2280.59", 
    `Lenovo 16" laptop with WQXGA (2560x1600) resolution, AMD Ryzen™ 9 7945HX processor,
    NVIDIA® GeForce RTX™ 4060 8GB graphics accelerator,
    32GB internal memory, 1TB SSD drive and includes an operating system.`, 
    "lenovoLegionPro5.jpg", "laptop"),

    new Product(7, "Logitech G305 mouse - G435 headset", "86.06", 
    `A wireless gaming set from Logitech that includes a G435 headset and a G305 mouse.
    MAC and PS4 and PS5 consoles and include a pair of built-in microphones.
    High-quality wireless gamer mouse from Logitech in a design with curves for a natural grip,
    6 programmable buttons and a resolution of 12000DPI with level control`, 
    "mouseLogitech1.jpg", "mouses"),

    new Product(8, " Lenovo Legion Recon Bag", "62.51", 
    `High-quality laptop backpack designed for gamers from Lenovo, 
    suitable for 15.6 inch laptops`, "bag-LenovoLegion2.jpg", "bags"),

    new Product(9, " Logitech G502 Hero High Performance Gaming Mouse", "52.05", 
    `Gaming mouse from Logitech comes 
    with the addition of 5 separate weights for balance, 
    11 programmable buttons and profile saving, LED lighting in 16 million colors, 
    with a resolution of 100 - 25,600 with DPI level control`, "mouseLogitech2.jpg", "mouses"),

    new Product(9, "Canon EOS M50 Mark II mirrorless digital camera", "875.98", 
    `EOS M50 Mark II mirrorless digital camera from Canon, 
    you've never experienced before - from video diaries and live 
    streaming to photos and selfies. A live streaming kit that includes 
    a wide range of accessories for live streaming.`, "cameraCanon2.jpg", "camera"),

    new Product(9, "Asus ROG Strix SCAR 15 G533ZX", "3188.49", 
    `A powerful laptop for gamers from Asus with a 15.6 inch WQHD resolution screen,
    Intel® Core™ i9-12900 processor, 64GB internal memory,
    2TB SSD drive, NVIDIA® GeForce® RTX 3080 Ti 16GB graphics accelerator,
    illuminated keyboard and no operating system.`, "asusROGStrixSCAR15.jpg", "laptop"),

    new Product(10, "Samsung Odyssey G5", "519.89", 
    `A 34-inch high-quality concave computer screen from Samsung 
    with DisplayPort and HDMI ports, energy efficient, 
    has a spectacular modern design and includes support 
    for FreeSync Premium Pro technology`, "samsung.jpg", "screen"),
];

showProductGallery(productItem);
showCartTable();

function Product(id, name, price, desc, photo, dataName) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.desc = desc;
    this.photo = photo;
    this.dataName = dataName;
}

// Add to Cart Button Event Listener
function addToCart(element) {
    let productParent = element.closest("div.product-item");
    let id = productParent.querySelector(".productid").value;
    let price = productParent.querySelector(".price span").innerText;
    let name = productParent.querySelector(".productname").innerText;
    let desc = productParent.querySelector(".desc span").innerText;
    let quantity = productParent.querySelector(".product-quantity").value;

    let cartItem = {
        id: id,
        name: name,
        price: price,
        desc: desc,
        quantity: quantity,
    };

    let cartArray = new Array();
    
    // If javascript shopping cart session is not empty
    if (sessionStorage.getItem("shopping-cart")) {
        cartArray = JSON.parse(sessionStorage.getItem("shopping-cart"));
        const itemIndex = cartArray.findIndex((item) => item.id === id);
        
        if (itemIndex !== -1) {
            cartArray[itemIndex].quantity =
                Number(cartArray[itemIndex].quantity) + Number(quantity);
        } else {
            cartArray.push(cartItem);
        }
    } else {
        cartArray.push(cartItem);
    }
    let cartJSON = JSON.stringify(cartArray);
    sessionStorage.setItem("shopping-cart", cartJSON);
    showCartTable();
}

// Remove An Item To The Shopping Cart Table And Update The Total Price
function removeFromCart(element) {
    let productParent = element.closest("div.product-item");
    let id = productParent.querySelector(".productid").value;
    let quantity = productParent.querySelector(".product-quantity").value;

    let cartArray = new Array();
    // If javascript shopping cart session is not empty
    if (sessionStorage.getItem("shopping-cart")) {
        cartArray = JSON.parse(sessionStorage.getItem("shopping-cart"));
        
        const itemIndex = cartArray.findIndex((item) => item.id === id);
        if (itemIndex !== -1) {
            cartArray[itemIndex].quantity = Math.max(
                Number(cartArray[itemIndex].quantity) - Number(quantity), 0
            );

            // If the index is 0, remove the product from the list
            if (!cartArray[itemIndex].quantity) {
                cartArray = cartArray.filter(
                    (value, index) => index !== itemIndex
                );
            }
        } else {
            alert("This item is not in your cart");
        }
    }
    let cartJSON = JSON.stringify(cartArray);
    sessionStorage.setItem("shopping-cart", cartJSON);
    showCartTable();
}

// Empty The Cart
function emptyCart() {
    if (sessionStorage.getItem("shopping-cart")) {
        sessionStorage.removeItem("shopping-cart");
        showCartTable();
    }
}

// Show Cart Table And Update The Total Price 
function showCartTable() {
    let cartRowHTML = "";
    let itemCount = 0;
    let grandTotal = 0;

    let price = 0;
    let quantity = 0;
    let subTotal = 0;

    if (sessionStorage.getItem("shopping-cart")) {
        let shoppingCart = JSON.parse(sessionStorage.getItem("shopping-cart"));

        // Iterate javascript shopping cart array
        shoppingCart.forEach(function (item) {
            price = parseFloat(item.price);
            quantity = parseInt(item.quantity);
            subTotal = price * quantity;
            itemCount += quantity;

            cartRowHTML +=
                "<tr>" +
                    "<td>" + item.name + "</td>" +
                    "<td class='text-right'>$" + price.toFixed(2) + "</td>" +
                    "<td class='text-right'>" + quantity + "</td>" +
                    "<td class='text-right'>$" + subTotal.toFixed(2) + "</td>" +
                "</tr>";
            grandTotal += subTotal;
        });
    }
    document.querySelector("#cartTableBody").innerHTML = cartRowHTML;
    document.querySelector("#itemCount").innerText = itemCount;
    document.querySelector("#totalAmount").innerText = "$" + grandTotal.toFixed(2);
}
    
// Show Product Gallery Function
function showProductGallery(product) {
    //Iterate javascript shopping cart array
    let productHTML = "";
    
    product.forEach(function (item) {
        productHTML +=
            '<div class="product-item">' +
                '<label><input class="productid" type="hidden" value="' + item.id + '"></label>' +
                
                '<div class="image" data-name="' + item.dataName +  '">' +
                    '<span><img src="./product-images/' + item.photo + '" alt="photo image"></span>' +
                '</div>' +

                '<div class="productname">' + item.name + "</div>" +
                '<div class="price">$<span>' + item.price + "</span></div>" +
                '<div class="desc"><span>' + item.desc + "</span></div>" +

                '<div class="cart-action">' +
                    '<label><input type="number" class="product-quantity" name="quantity" value="1" size="2" min="1" /></label>' +
                    '<label><input type="submit" value="Add" class="add-to-cart" onClick="addToCart(this)" /></label>' +
                    '<label><input type="submit" value="Remove" class="remove-from-cart" onClick="removeFromCart(this)" /></label>' +
                "</div>" +
            "</div>";
        ("<tr>");
    });
    document.querySelector("#product-item-container").innerHTML = productHTML;
}


// Selecting all required elements
const filterItem = document.querySelector(".items");
const filterImg = document.querySelectorAll(".image");

window.onload = () => { // Once window loaded
    filterItem.onclick = (selectedItem) => { // When user clicked on filterItem div
        if (selectedItem.target.classList.contains("item")) { // If user click element has .item class
            // Removethe active class which is in the first element
            filterItem.querySelector(".active").classList.remove("active"); 
            selectedItem.target.classList.add("active"); // Add that active class on the user selected element or item
            
            // Getting data-name value of the user selected item and storing in a filterName variable
            let filterName = selectedItem.target.getAttribute("data-name");
            
            filterImg.forEach((image) => {
                let filterImages = image.getAttribute("data-name"); // Getting image data-name value
                
                // If user selected item data-name value is equal to image data-name value
                // Or user selected item data-name value is equal to "all"
                if ((filterImages == filterName) || (filterName == "all")) {
                    image.parentElement.classList.remove("hide");
                    image.parentElement.classList.add("show"); // Show the parent element
                }
                else {
                    image.parentElement.classList.add("hide"); // Hide the parent element
                    image.parentElement.classList.remove("show");
                }
            });
        }
    }
    for (let index = 0; index < filterImg.length; index++) {
        // Adding onclick attribute in all avaibale image
        filterImg[index].setAttribute("onclick", "preview(this)");
    }
}

// Selecting all required elements
const previewBox = document.querySelector(".preview-box");
const previewImg = previewBox.querySelector("img");
const categoryName = previewBox.querySelector(".title p");
const closeIcon = previewBox.querySelector(".icon");
const shadow = document.querySelector(".shadow");

// Full screen preview image funcion  
function preview(clickedImage) {
    // Once user click on any image then remove the scrollbar of the body, so user can't scroll up or down
    document.querySelector("body").style.overflow = "hidden";

    // Getting user clicked image source link and store in a variable
    let selectedPrevImg = clickedImage.querySelector("img").src;
    // Getting user clicked data-name value
    let selectedImgCategory = clickedImage.getAttribute("data-name");

    previewImg.src = selectedPrevImg; // Passing the user clicked image source in preview image source
    categoryName.textContent = selectedImgCategory; // Passing the data-name value to category name variable

    previewBox.classList.add("show"); // Show the preview box
    shadow.classList.add("show"); // Show the light gey background

    closeIcon.onclick = () => { // If user click on the close icon of the preview box
        previewBox.classList.remove("show"); // Hide the preview box
        shadow.classList.remove("show"); // Hide the light gey background
        document.querySelector("body").style.overflow = "scroll"; // Show the scroll bar of body
    }
}