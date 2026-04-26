import { auth, db } from './firebase-config.js';
import { signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { collection, addDoc, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


const navProducts = document.getElementById('nav-products');
const navCategories = document.getElementById('nav-categories');
const productsView = document.getElementById('products-view');
const categoriesView = document.getElementById('categories-view');
const pageTitle = document.getElementById('page-title');
const logoutBtn = document.getElementById('logout-btn');


navProducts.addEventListener('click', () => {
    productsView.classList.remove('hidden');
    categoriesView.classList.add('hidden');
    pageTitle.textContent = "Products";
});

navCategories.addEventListener('click', () => {
    categoriesView.classList.remove('hidden');
    productsView.classList.add('hidden');
    pageTitle.textContent = "Categories";
});

logoutBtn.addEventListener('click', async () => {
    await signOut(auth);
    window.location.href = 'index.html';
});
 

const productModal = document.getElementById('product-modal');
const productForm = document.getElementById('product-form');
const productsTbody = document.getElementById('products-tbody');

document.getElementById('add-product-btn').addEventListener('click', () => productModal.classList.remove('hidden'));
document.getElementById('close-modal-btn').addEventListener('click', () => productModal.classList.add('hidden'));


productForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const productData = {
        name: document.getElementById('prod-name').value,
        price: document.getElementById('prod-price').value,
        category: document.getElementById('prod-category').value
    };
    await addDoc(collection(db, "products"), productData);
    productModal.classList.add('hidden');
    productForm.reset();
    fetchProducts();
});


async function fetchProducts() {
    const querySnapshot = await getDocs(collection(db, "products"));
    productsTbody.innerHTML = '';
    querySnapshot.forEach((docSnap) => {
        const prod = docSnap.data();
        productsTbody.innerHTML += `
            <tr class="border-b border-gray-200">
                <td class="p-4 text-gray-800">${prod.name}</td>
                <td class="p-4 text-green-600 font-medium">$${prod.price}</td>
                <td class="p-4 text-gray-600"><span class="bg-gray-100 px-2 py-1 rounded text-sm">${prod.category}</span></td>
                <td class="p-4 text-center">
                    <button class="text-red-500 hover:text-red-700 font-medium" onclick="deleteProductFromFB('${docSnap.id}')">Delete</button>
                </td>
            </tr>`;
    });
}

window.deleteProductFromFB = async function(id) {
    if(confirm("Are you sure you want to delete this product?")) {
        await deleteDoc(doc(db, "products", id));
        fetchProducts();
    }
};


const categoryModal = document.getElementById('category-modal');
const categoryForm = document.getElementById('category-form');
const categoriesTbody = document.getElementById('categories-tbody');


document.getElementById('add-category-btn').addEventListener('click', () => categoryModal.classList.remove('hidden'));
document.getElementById('close-cat-modal-btn').addEventListener('click', () => categoryModal.classList.add('hidden'));


categoryForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "categories"), {
        name: document.getElementById('cat-name').value
    });
    categoryModal.classList.add('hidden');
    categoryForm.reset();
    fetchCategories();
});


async function fetchCategories() {
    const querySnapshot = await getDocs(collection(db, "categories"));
    categoriesTbody.innerHTML = '';
    querySnapshot.forEach((docSnap) => {
        const cat = docSnap.data();
        categoriesTbody.innerHTML += `
            <tr class="border-b border-gray-200">
                <td class="p-4 text-gray-800 font-medium">${cat.name}</td>
                <td class="p-4 text-center">
                    <button class="text-red-500 hover:text-red-700 font-medium" onclick="deleteCategoryFromFB('${docSnap.id}')">Delete</button>
                </td>
            </tr>`;
    });
}

window.deleteCategoryFromFB = async function(id) {
    if(confirm("Delete this category?")) {
        await deleteDoc(doc(db, "categories", id));
        fetchCategories();
    }
};


fetchProducts();
fetchCategories();