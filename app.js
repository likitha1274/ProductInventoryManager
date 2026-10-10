"use strict";
let inventory = [];
let nextId = 1;
const productForm = document.getElementById("productForm");
const nameInput = document.getElementById("productName");
const priceInput = document.getElementById("productPrice");
const quantityInput = document.getElementById("productQuantity");
const inventoryList = document.getElementById("inventoryList");
const summary = document.getElementById("summary");
const message = document.getElementById("message");
function displayProducts() {
    inventoryList.innerHTML = "";
    inventory.forEach((product) => {
        const row = document.createElement("tr");
        const nameCell = document.createElement("td");
        nameCell.textContent = product.name;
        const priceCell = document.createElement("td");
        priceCell.textContent = `₹${product.price.toFixed(2)}`;
        const quantityCell = document.createElement("td");
        quantityCell.textContent = product.quantity.toString();
        const actionCell = document.createElement("td");
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-button";
        deleteButton.addEventListener("click", () => {
            deleteProduct(product.id);
        });
        actionCell.appendChild(deleteButton);
        row.append(nameCell, priceCell, quantityCell, actionCell);
        inventoryList.appendChild(row);
    });
    summary.textContent = `Total products: ${inventory.length} | Total items in stock: ${inventory.reduce((total, product) => total + product.quantity, 0)}`;
}
function addProduct(name, price, quantity) {
    const product = {
        id: nextId,
        name: name,
        price: price,
        quantity: quantity
    };
    inventory.push(product);
    nextId++;
    displayProducts();
}
function deleteProduct(id) {
    inventory = inventory.filter((product) => product.id !== id);
    displayProducts();
    message.textContent = "Product deleted successfully.";
}
productForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = nameInput.value.trim();
    const price = Number(priceInput.value);
    const quantity = Number(quantityInput.value);
    if (name === "" ||
        priceInput.value === "" ||
        quantityInput.value === "" ||
        !Number.isFinite(price) ||
        !Number.isInteger(quantity) ||
        price < 0 ||
        quantity < 0) {
        message.textContent = "Please enter valid product details.";
        return;
    }
    addProduct(name, price, quantity);
    productForm.reset();
    message.textContent = "Product added successfully.";
});
displayProducts();
