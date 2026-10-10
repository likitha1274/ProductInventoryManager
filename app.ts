interface Product {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

let inventory: Product[] = [];
let nextId: number = 1;

const productForm = document.getElementById("productForm") as HTMLFormElement;
const nameInput = document.getElementById("productName") as HTMLInputElement;
const priceInput = document.getElementById("productPrice") as HTMLInputElement;
const quantityInput = document.getElementById("productQuantity") as HTMLInputElement;
const inventoryList = document.getElementById("inventoryList") as HTMLTableSectionElement;
const summary = document.getElementById("summary") as HTMLParagraphElement;
const message = document.getElementById("message") as HTMLParagraphElement;

function displayProducts(): void {
    inventoryList.innerHTML = "";

    inventory.forEach((product: Product) => {
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

    summary.textContent = `Total products: ${inventory.length} | Total items in stock: ${
        inventory.reduce((total, product) => total + product.quantity, 0)
    }`;
}

function addProduct(name: string, price: number, quantity: number): void {
    const product: Product = {
        id: nextId,
        name: name,
        price: price,
        quantity: quantity
    };

    inventory.push(product);
    nextId++;

    displayProducts();
}

function deleteProduct(id: number): void {
    inventory = inventory.filter((product: Product) => product.id !== id);
    displayProducts();
    message.textContent = "Product deleted successfully.";
}

productForm.addEventListener("submit", (event: SubmitEvent): void => {
    event.preventDefault();

    const name: string = nameInput.value.trim();
    const price: number = Number(priceInput.value);
    const quantity: number = Number(quantityInput.value);

    if (
        name === "" ||
        priceInput.value === "" ||
        quantityInput.value === "" ||
        !Number.isFinite(price) ||
        !Number.isInteger(quantity) ||
        price < 0 ||
        quantity < 0
    ) {
        message.textContent = "Please enter valid product details.";
        return;
    }

    addProduct(name, price, quantity);

    productForm.reset();
    message.textContent = "Product added successfully.";
});

displayProducts();
