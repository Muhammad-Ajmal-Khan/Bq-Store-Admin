import { auth } from './firebase-config.js';
import { signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// بٹنز اور سیکشنز کو سلیکٹ کرنا
const navProducts = document.getElementById('nav-products');
const navCategories = document.getElementById('nav-categories');
const productsView = document.getElementById('products-view');
const categoriesView = document.getElementById('categories-view');
const pageTitle = document.getElementById('page-title');
const logoutBtn = document.getElementById('logout-btn');

// Products والے بٹن پر کلک
navProducts.addEventListener('click', () => {
    productsView.classList.remove('hidden');
    categoriesView.classList.add('hidden');
    pageTitle.textContent = "Products";
    
    navProducts.classList.replace('bg-transparent', 'bg-gray-800');
    navProducts.classList.replace('text-gray-400', 'text-white');
    navCategories.classList.replace('bg-gray-800', 'bg-transparent');
    navCategories.classList.replace('text-white', 'text-gray-400');
});

// Categories والے بٹن پر کلک
navCategories.addEventListener('click', () => {
    categoriesView.classList.remove('hidden');
    productsView.classList.add('hidden');
    pageTitle.textContent = "Categories";
    
    navCategories.classList.add('bg-gray-800', 'text-white');
    navCategories.classList.remove('text-gray-400');
    navProducts.classList.remove('bg-gray-800', 'text-white');
    navProducts.classList.add('text-gray-400');
});

// Logout کرنا
logoutBtn.addEventListener('click', async () => {
    try {
        await signOut(auth);
        window.location.href = 'index.html'; // واپس لاگ ان پیج پر بھیج دیں
    } catch (error) {
        console.error("Error logging out: ", error);
    }
});

// --- Product CRUD Logic ---
const addProductBtn = document.getElementById('add-product-btn');
const productModal = document.getElementById('product-modal');
const closeModalBtn = document.getElementById('close-modal-btn');
const productForm = document.getElementById('product-form');
const productsTbody = document.getElementById('products-tbody');

let products = []; // عارضی ڈیٹا بیس (In-memory)

// پاپ اپ اوپن کرنا
if(addProductBtn) {
    addProductBtn.addEventListener('click', () => {
        productModal.classList.remove('hidden');
    });
}

// پاپ اپ کلوز کرنا
if(closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
        productModal.classList.add('hidden');
        productForm.reset();
    });
}

// نئی پراڈکٹ سیو کرنا
if(productForm) {
    productForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const newProduct = {
            id: Date.now(), // منفرد آئی ڈی
            name: document.getElementById('prod-name').value,
            price: document.getElementById('prod-price').value,
            category: document.getElementById('prod-category').value
        };

        products.push(newProduct);
        renderProducts(); // ٹیبل کو اپڈیٹ کرو
        
        productModal.classList.add('hidden');
        productForm.reset();
    });
}

// پراڈکٹس کو ٹیبل میں دکھانے والا فنکشن
function renderProducts() {
    productsTbody.innerHTML = ''; 
    products.forEach(prod => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="p-4 text-gray-800">${prod.name}</td>
            <td class="p-4 text-green-600 font-medium">$${prod.price}</td>
            <td class="p-4 text-gray-600">
                <span class="bg-gray-100 px-2 py-1 rounded text-sm">${prod.category}</span>
            </td>
            <td class="p-4 text-center">
                <button class="text-red-500 hover:text-red-700 font-medium transition" onclick="deleteProduct(${prod.id})">Delete</button>
            </td>
        `;
        productsTbody.appendChild(tr);
    });
}

// پراڈکٹ ڈیلیٹ کرنے کا فنکشن
window.deleteProduct = function(id) {
    products = products.filter(p => p.id !== id);
    renderProducts();
};

// ==========================================
// --- Category CRUD Logic (Module 11) ---
// ==========================================

const addCategoryBtn = document.getElementById('add-category-btn');
const categoryModal = document.getElementById('category-modal');
const closeCatModalBtn = document.getElementById('close-cat-modal-btn');
const categoryForm = document.getElementById('category-form');
const categoriesTbody = document.getElementById('categories-tbody');

let categories = []; // عارضی ڈیٹا بیس کیٹیگریز کے لیے

// پاپ اپ اوپن کرنا
if(addCategoryBtn) {
    addCategoryBtn.addEventListener('click', () => {
        categoryModal.classList.remove('hidden');
    });
}

// پاپ اپ کلوز کرنا
if(closeCatModalBtn) {
    closeCatModalBtn.addEventListener('click', () => {
        categoryModal.classList.add('hidden');
        categoryForm.reset();
    });
}

// نئی کیٹیگری سیو کرنا
if(categoryForm) {
    categoryForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const newCategory = {
            id: Date.now(), // منفرد آئی ڈی
            name: document.getElementById('cat-name').value
        };

        categories.push(newCategory);
        renderCategories(); // ٹیبل کو اپڈیٹ کرو
        
        categoryModal.classList.add('hidden');
        categoryForm.reset();
    });
}

// کیٹیگریز کو ٹیبل میں دکھانے والا فنکشن
function renderCategories() {
    categoriesTbody.innerHTML = ''; 
    categories.forEach(cat => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="p-4 text-gray-800 font-medium">${cat.name}</td>
            <td class="p-4 text-center">
                <button class="text-red-500 hover:text-red-700 font-medium transition" onclick="deleteCategory(${cat.id})">Delete</button>
            </td>
        `;
        categoriesTbody.appendChild(tr);
    });
}

// کیٹیگری ڈیلیٹ کرنے کا فنکشن
window.deleteCategory = function(id) {
    categories = categories.filter(c => c.id !== id);
    renderCategories();
};