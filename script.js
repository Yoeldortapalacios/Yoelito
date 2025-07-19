// Variables globales
let currentUser = null;
let products = [];
let providers = [];
let categories = {
    'ropa-nueva': {
        name: 'Ropa nueva',
        subcategories: ['prenda-superior', 'prenda-inferior', 'ropa-interior', 'prenda-exterior', 'calzado', 'accesorios']
    },
    'ropa-reciclada': {
        name: 'Ropa reciclada',
        subcategories: ['prenda-superior', 'prenda-inferior', 'ropa-interior', 'prenda-exterior', 'calzado', 'accesorios', 'pacas']
    },
    'perfumeria': {
        name: 'Perfumería',
        subcategories: ['perfumes-originales', 'colonias', 'desodorantes', 'sprays-corporales', 'kits-combos']
    },
    'aseo-personal': {
        name: 'Aseo personal',
        subcategories: ['jabones', 'champu-acondicionador', 'pasta-dental', 'cremas', 'higiene-intima']
    },
    'lenceria': {
        name: 'Lencería',
        subcategories: ['sabanas', 'fundas', 'almohadas', 'colchas', 'toallas']
    },
    'electrodomesticos': {
        name: 'Electrodomésticos',
        subcategories: ['refrigeradores', 'ollas-electricas', 'licuadoras', 'lavadoras', 'cocinas', 'otros']
    },
    'hogar': {
        name: 'Hogar',
        subcategories: ['decoracion', 'utensilios-cocina', 'organizadores', 'muebles-pequenos']
    },
    'otros': {
        name: 'Otros',
        subcategories: ['tecnologia', 'accesorios-electronicos', 'articulos-escolares', 'servicios-digitales', 'otros']
    }
};

// Elementos del DOM
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');
const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const adminBtn = document.getElementById('adminBtn');
const logoutBtn = document.getElementById('logoutBtn');
const authModal = document.getElementById('authModal');
const productModal = document.getElementById('productModal');
const termsModal = document.getElementById('termsModal');
const adminModal = document.getElementById('adminModal');
const closeModalBtns = document.querySelectorAll('.close-modal');
const authTabs = document.querySelectorAll('.auth-tab');
const authForms = document.querySelectorAll('.auth-form');
const providerForm = document.getElementById('providerForm');
const productCategory = document.getElementById('productCategory');
const productSubcategory = document.getElementById('productSubcategory');
const imageUpload = document.getElementById('imageUpload');
const productImages = document.getElementById('productImages');
const imagePreview = document.getElementById('imagePreview');
const registerProvider = document.getElementById('registerProvider');
const providerTypeContainer = document.getElementById('providerTypeContainer');
const showTermsLinks = document.querySelectorAll('[id^="showTerms"]');
const acceptTerms = document.getElementById('acceptTerms');
const submitProductBtn = document.getElementById('submitProductBtn');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const filterBtns = document.querySelectorAll('.filter-btn');
const provinceFilter = document.getElementById('provinceFilter');
const priceFilter = document.getElementById('priceFilter');
const currencyFilter = document.getElementById('currencyFilter');
const productsGrid = document.getElementById('productsGrid');
const dailyOffersGrid = document.getElementById('dailyOffersGrid');
const adminProductsGrid = document.getElementById('adminProductsGrid');
const providersList = document.getElementById('providersList');
const salesList = document.getElementById('salesList');
const notificationsList = document.getElementById('notificationsList');
const totalSales = document.getElementById('totalSales');
const totalCommissions = document.getElementById('totalCommissions');
const monthlySales = document.getElementById('monthlySales');
const adminTabs = document.querySelectorAll('.tab');
const adminTabContents = document.querySelectorAll('.tab-content');
const statusOptions = document.querySelectorAll('.status-option');
const confirmTermsBtn = document.getElementById('confirmTermsBtn');

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Cargar datos iniciales
    loadInitialData();
    
    // Configurar eventos
    setupEventListeners();
    
    // Verificar si hay un usuario logueado
    checkLoggedInUser();
});

function setupEventListeners() {
    // Menú móvil
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    
    // Modal de autenticación
    loginBtn.addEventListener('click', () => openModal(authModal, 'login'));
    registerBtn.addEventListener('click', () => openModal(authModal, 'register'));
    adminBtn.addEventListener('click', () => openModal(adminModal));
    logoutBtn.addEventListener('click', logoutUser);
    
    // Cerrar modales
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal');
            closeModal(modal);
        });
    });
    
    // Tabs de autenticación
    authTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.getAttribute('data-tab');
            switchAuthTab(tabName);
        });
    });
    
    // Formulario de proveedor
    providerForm.addEventListener('submit', handleProviderFormSubmit);
    
    // Cambio de categoría principal
    productCategory.addEventListener('change', updateSubcategories);
    
    // Subida de imágenes
    imageUpload.addEventListener('click', () => productImages.click());
    productImages.addEventListener('change', handleImageUpload);
    
    // Registro como proveedor
    registerProvider.addEventListener('change', toggleProviderType);
    
    // Términos y condiciones
    showTermsLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(termsModal);
        });
    });
    
    acceptTerms.addEventListener('change', toggleSubmitButton);
    confirmTermsBtn.addEventListener('click', confirmTerms);
    
    // Búsqueda y filtros
    searchBtn.addEventListener('click', applyFilters);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') applyFilters();
    });
    
    filterBtns.forEach(btn => {
        if (!btn.id) { // Excluir selects
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                applyFilters();
            });
        }
    });
    
    provinceFilter.addEventListener('change', applyFilters);
    priceFilter.addEventListener('change', applyFilters);
    currencyFilter.addEventListener('change', applyFilters);
    
    // Admin tabs
    adminTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.getAttribute('data-tab');
            switchAdminTab(tabName);
        });
    });
    
    // Status options
    statusOptions.forEach(option => {
        option.addEventListener('click', () => {
            statusOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
            filterAdminProducts();
        });
    });
    
    // Cerrar modal al hacer clic fuera
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            closeModal(e.target);
        }
    });
}

// Funciones principales
function loadInitialData() {
    // Cargar productos de ejemplo (en un proyecto real, esto vendría de una API)
    products = [
        {
            id: 1,
            name: 'Camiseta básica blanca',
            category: 'ropa-nueva',
            subcategory: 'prenda-superior',
            price: 15,
            currency: 'USD',
            description: 'Camiseta de algodón 100% de alta calidad, talla M',
            images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'],
            provider: 'Moda Cubana',
            province: 'habana',
            rating: 4.5,
            reviews: 12,
            hasDelivery: true,
            hasWarranty: false,
            hasPhysicalStore: true,
            quantity: 10,
            status: 'approved',
            isOffer: true,
            isNew: true,
            isNegotiable: false,
            date: new Date('2023-05-15')
        },
        {
            id: 2,
            name: 'Pantalón jeans azul',
            category: 'ropa-reciclada',
            subcategory: 'prenda-inferior',
            price: 20,
            currency: 'USD',
            description: 'Pantalón jeans azul en buen estado, talla 32',
            images: ['https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'],
            provider: 'Ropa Usada Havana',
            province: 'habana',
            rating: 4.2,
            reviews: 8,
            hasDelivery: false,
            hasWarranty: false,
            hasPhysicalStore: false,
            quantity: 5,
            status: 'approved',
            isOffer: false,
            isNew: false,
            isNegotiable: true,
            date: new Date('2023-05-10')
        },
        {
            id: 3,
            name: 'Perfume Chanel N°5',
            category: 'perfumeria',
            subcategory: 'perfumes-originales',
            price: 80,
            currency: 'USD',
            description: 'Perfume original Chanel N°5, 100ml, nuevo en caja',
            images: ['https://images.unsplash.com/photo-1592945403244-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'],
            provider: 'Perfumería Elegante',
            province: 'habana',
            rating: 4.8,
            reviews: 15,
            hasDelivery: true,
            hasWarranty: true,
            hasPhysicalStore: true,
            quantity: 3,
            status: 'approved',
            isOffer: false,
            isNew: true,
            isNegotiable: false,
            date: new Date('2023-05-20')
        }
    ];
    
    // Cargar proveedores de ejemplo
    providers = [
        {
            id: 1,
            name: 'Moda Cubana',
            phone: '+53555123456',
            email: 'modacubana@example.com',
            type: 'minorista',
            rating: 4.5,
            products: 15,
            sales: 42,
            joined: new Date('2023-01-15')
        },
        {
            id: 2,
            name: 'Ropa Usada Havana',
            phone: '+53555654321',
            email: 'ropausada@example.com',
            type: 'minorista',
            rating: 4.2,
            products: 8,
            sales: 23,
            joined: new Date('2023-02-20')
        },
        {
            id: 3,
            name: 'Perfumería Elegante',
            phone: '+53555789101',
            email: 'perfumeria@example.com',
            type: 'mayorista',
            rating: 4.8,
            products: 25,
            sales: 67,
            joined: new Date('2022-11-10')
        }
    ];
    
    // Mostrar productos
    displayProducts(products);
    displayDailyOffers(products.filter(p => p.isOffer));
    
    // Mostrar proveedores en admin
    if (adminProductsGrid) displayAdminProducts(products);
    if (providersList) displayProviders(providers);
    
    // Mostrar estadísticas de ventas
    if (totalSales) {
        totalSales.textContent = '128';
        totalCommissions.textContent = '640 USD';
        monthlySales.textContent = '24';
    }
}

function checkLoggedInUser() {
    // En un proyecto real, verificaríamos el token de autenticación
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user) {
        currentUser = user;
        updateUserUI();
    }
}

function updateUserUI() {
    if (currentUser) {
        // Mostrar botones de usuario logueado
        loginBtn.style.display = 'none';
        registerBtn.style.display = 'none';
        logoutBtn.style.display = 'block';
        
        // Mostrar botón de admin si es admin
        if (currentUser.isAdmin) {
            adminBtn.style.display = 'block';
        }
    } else {
        // Mostrar botones de usuario no logueado
        loginBtn.style.display = 'block';
        registerBtn.style.display = 'block';
        logoutBtn.style.display = 'none';
        adminBtn.style.display = 'none';
    }
}

// Funciones de UI
function toggleMobileMenu() {
    navMenu.classList.toggle('active');
    mobileMenuBtn.innerHTML = navMenu.classList.contains('active') ? 
        '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
}

function openModal(modal, tab = null) {
    document.body.style.overflow = 'hidden';
    modal.classList.add('active');
    
    if (tab) {
        switchAuthTab(tab);
    }
    
    // Si es el modal de admin y el usuario es admin, cargar datos
    if (modal === adminModal && currentUser && currentUser.isAdmin) {
        displayAdminProducts(products);
        displayProviders(providers);
        displaySales();
        displayNotifications();
    }
}

function closeModal(modal) {
    document.body.style.overflow = 'auto';
    modal.classList.remove('active');
    
    // Limpiar formularios al cerrar
    if (modal === authModal) {
        document.getElementById('loginForm').reset();
        document.getElementById('registerForm').reset();
    } else if (modal === providerForm) {
        providerForm.reset();
        imagePreview.innerHTML = '';
    }
}

function switchAuthTab(tabName) {
    authTabs.forEach(tab => {
        tab.classList.toggle('active', tab.getAttribute('data-tab') === tabName);
    });
    
    authForms.forEach(form => {
        form.classList.toggle('active', form.id === `${tabName}Form`);
    });
}

function switchAdminTab(tabName) {
    adminTabs.forEach(tab => {
        tab.classList.toggle('active', tab.getAttribute('data-tab') === tabName);
    });
    
    adminTabContents.forEach(content => {
        content.classList.toggle('active', content.id === `admin${tabName.charAt(0).toUpperCase() + tabName.slice(1)}`);
    });
}

// Funciones de productos
function displayProducts(productsToDisplay) {
    if (!productsGrid) return;
    
    productsGrid.innerHTML = '';
    
    if (productsToDisplay.length === 0) {
        productsGrid.innerHTML = '<p class="no-results">No se encontraron productos que coincidan con tu búsqueda.</p>';
        return;
    }
    
    productsToDisplay.forEach(product => {
        if (product.status !== 'approved') return;
        
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-img">
                <img src="${product.images[0]}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price">${product.price} ${product.currency}</div>
                <div class="product-meta">
                    <span><i class="fas fa-map-marker-alt"></i> ${getProvinceName(product.province)}</span>
                    <span><i class="fas fa-star"></i> ${product.rating}</span>
                </div>
                <div class="product-actions">
                    <button class="btn btn-small" onclick="showProductDetail(${product.id})">
                        <i class="fas fa-eye"></i> Ver
                    </button>
                    <a href="https://wa.me/5355703261?text=Estoy%20interesado%20en%20el%20producto:%20${encodeURIComponent(product.name)}%20(ID:${product.id})" 
                       class="btn btn-small btn-secondary" target="_blank">
                        <i class="fab fa-whatsapp"></i> Contactar
                    </a>
                </div>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
}

function displayDailyOffers(offers) {
    if (!dailyOffersGrid || offers.length === 0) return;
    
    dailyOffersGrid.innerHTML = '';
    
    // Mostrar solo 4 ofertas
    const displayedOffers = offers.slice(0, 4);
    
    displayedOffers.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-img">
                <img src="${product.images[0]}" alt="${product.name}">
                <div class="product-badge">Oferta</div>
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price">
                    <span class="original-price">${product.price * 1.2} ${product.currency}</span>
                    ${product.price} ${product.currency}
                </div>
                <div class="product-meta">
                    <span><i class="fas fa-map-marker-alt"></i> ${getProvinceName(product.province)}</span>
                    <span><i class="fas fa-star"></i> ${product.rating}</span>
                </div>
                <div class="product-actions">
                    <button class="btn btn-small" onclick="showProductDetail(${product.id})">
                        <i class="fas fa-eye"></i> Ver
                    </button>
                    <a href="https://wa.me/5355703261?text=Estoy%20interesado%20en%20el%20producto:%20${encodeURIComponent(product.name)}%20(ID:${product.id})" 
                       class="btn btn-small btn-secondary" target="_blank">
                        <i class="fab fa-whatsapp"></i> Contactar
                    </a>
                </div>
            </div>
        `;
        dailyOffersGrid.appendChild(productCard);
    });
}

function showProductDetail(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const modalContent = document.getElementById('productModalContent');
    modalContent.innerHTML = `
        <div class="product-modal-images">
            <div class="product-modal-main-image">
                <img src="${product.images[0]}" alt="${product.name}" id="mainProductImage">
            </div>
            <div class="product-modal-thumbnails">
                ${product.images.map((img, index) => `
                    <div class="product-modal-thumbnail ${index === 0 ? 'active' : ''}" onclick="changeProductImage('${img}')">
                        <img src="${img}" alt="${product.name}">
                    </div>
                `).join('')}
            </div>
        </div>
        <div class="product-modal-info">
            <h1 class="product-modal-title">${product.name}</h1>
            <div class="product-modal-price">${product.price} ${product.currency}</div>
            <div class="product-modal-meta">
                <span><i class="fas fa-tag"></i> ${categories[product.category].name} / ${getSubcategoryName(product.subcategory)}</span>
                <span><i class="fas fa-map-marker-alt"></i> ${getProvinceName(product.province)}</span>
            </div>
            <div class="product-modal-description">
                <h3>Descripción:</h3>
                <p>${product.description}</p>
                <p><strong>Cantidad disponible:</strong> ${product.quantity}</p>
                ${product.hasDelivery ? '<p><i class="fas fa-check"></i> Ofrece entrega a domicilio</p>' : ''}
                ${product.hasWarranty ? '<p><i class="fas fa-check"></i> Incluye garantía</p>' : ''}
            </div>
            <div class="product-modal-actions">
                <a href="https://wa.me/5355703261?text=Estoy%20interesado%20en%20el%20producto:%20${encodeURIComponent(product.name)}%20(ID:${product.id})" 
                   class="btn btn-secondary" target="_blank">
                    <i class="fab fa-whatsapp"></i> Contactar por WhatsApp
                </a>
                <button class="btn" onclick="closeModal(productModal)">
                    <i class="fas fa-shopping-cart"></i> Guardar para después
                </button>
            </div>
            <div class="product-modal-provider">
                <h3>Información del proveedor</h3>
                <div class="provider-info">
                    <div class="provider-avatar">
                        <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(product.provider)}&background=random" alt="${product.provider}">
                    </div>
                    <div>
                        <div class="provider-name">${product.provider}</div>
                        <div class="provider-rating">
                            <i class="fas fa-star"></i>
                            <span>${product.rating} (${product.reviews} reseñas)</span>
                        </div>
                    </div>
                </div>
                <div class="provider-stats">
                    <span><i class="fas fa-store"></i> ${product.hasPhysicalStore ? 'Tienda física' : 'Solo en línea'}</span>
                    <span><i class="fas fa-box"></i> ${product.quantity} disponibles</span>
                    <span><i class="fas fa-calendar-alt"></i> Publicado el ${formatDate(product.date)}</span>
                </div>
                <div class="provider-note">
                    <p><strong>Nota:</strong> Este producto se vende con una comisión del 5% para la plataforma. Para mayor visibilidad (ej. en portada), contacta al administrador.</p>
                </div>
            </div>
        </div>
    `;
    
    openModal(productModal);
}

function changeProductImage(imgSrc) {
    document.getElementById('mainProductImage').src = imgSrc;
    
    // Actualizar thumbnails activos
    document.querySelectorAll('.product-modal-thumbnail').forEach(thumb => {
        thumb.classList.toggle('active', thumb.querySelector('img').src === imgSrc);
    });
}

// Funciones de proveedor
function updateSubcategories() {
    const selectedCategory = productCategory.value;
    productSubcategory.innerHTML = '<option value="">Seleccione una subcategoría</option>';
    
    if (selectedCategory && categories[selectedCategory]) {
        productSubcategory.disabled = false;
        categories[selectedCategory].subcategories.forEach(sub => {
            const option = document.createElement('option');
            option.value = sub;
            option.textContent = getSubcategoryName(sub);
            productSubcategory.appendChild(option);
        });
    } else {
        productSubcategory.disabled = true;
    }
}

function getSubcategoryName(subcategory) {
    // Esto podría ser más sofisticado con un diccionario de traducciones
    const names = {
        'prenda-superior': 'Prenda superior',
        'prenda-inferior': 'Prenda inferior',
        'ropa-interior': 'Ropa interior',
        'prenda-exterior': 'Prenda exterior',
        'calzado': 'Calzado',
        'accesorios': 'Accesorios',
        'pacas': 'Pacas de ropa',
        'perfumes-originales': 'Perfumes originales',
        'colonias': 'Colonias',
        'desodorantes': 'Desodorantes',
        'sprays-corporales': 'Sprays corporales',
        'kits-combos': 'Kits y combos',
        'jabones': 'Jabones',
        'champu-acondicionador': 'Champú y acondicionador',
        'pasta-dental': 'Pasta dental',
        'cremas': 'Cremas',
        'higiene-intima': 'Higiene íntima',
        'sabanas': 'Sábanas',
        'fundas': 'Fundas',
        'almohadas': 'Almohadas',
        'colchas': 'Colchas',
        'toallas': 'Toallas',
        'refrigeradores': 'Refrigeradores',
        'ollas-electricas': 'Ollas eléctricas',
        'licuadoras': 'Licuadoras',
        'lavadoras': 'Lavadoras',
        'cocinas': 'Cocinas',
        'otros': 'Otros',
        'decoracion': 'Decoración',
        'utensilios-cocina': 'Utensilios de cocina',
        'organizadores': 'Organizadores',
        'muebles-pequenos': 'Muebles pequeños',
        'tecnologia': 'Tecnología',
        'accesorios-electronicos': 'Accesorios electrónicos',
        'articulos-escolares': 'Artículos escolares',
        'servicios-digitales': 'Servicios digitales'
    };
    
    return names[subcategory] || subcategory;
}

function getProvinceName(provinceCode) {
    const provinces = {
        'habana': 'La Habana',
        'artemisa': 'Artemisa',
        'mayabeque': 'Mayabeque',
        'matanzas': 'Matanzas',
        'cienfuegos': 'Cienfuegos',
        'villa-clara': 'Villa Clara',
        'sancti-spiritus': 'Sancti Spíritus',
        'ciego-de-avila': 'Ciego de Ávila',
        'camaguey': 'Camagüey',
        'las-tunas': 'Las Tunas',
        'holguin': 'Holguín',
        'granma': 'Granma',
        'santiago': 'Santiago de Cuba',
        'guantanamo': 'Guantánamo',
        'isla': 'Isla de la Juventud'
    };
    
    return provinces[provinceCode] || provinceCode;
}

function handleImageUpload(e) {
    const files = e.target.files;
    imagePreview.innerHTML = '';
    
    if (files.length > 5) {
        alert('Solo puedes subir un máximo de 5 imágenes');
        return;
    }
    
    for (let i = 0; i < Math.min(files.length, 5); i++) {
        const file = files[i];
        if (!file.type.match('image.*')) continue;
        
        const reader = new FileReader();
        reader.onload = (function(file) {
            return function(e) {
                const previewItem = document.createElement('div');
                previewItem.className = 'image-preview-item';
                previewItem.innerHTML = `
                    <img src="${e.target.result}" alt="${file.name}">
                    <span class="remove-image" onclick="removeImagePreview(this)">&times;</span>
                `;
                imagePreview.appendChild(previewItem);
            };
        })(file);
        reader.readAsDataURL(file);
    }
}

function removeImagePreview(element) {
    element.parentElement.remove();
    
    // Actualizar el input de archivos (complejo en JS, en una app real usaríamos FormData)
    const newFileList = new DataTransfer();
    const previewItems = imagePreview.querySelectorAll('.image-preview-item');
    
    previewItems.forEach(item => {
        // En una aplicación real, necesitaríamos mantener un mapeo de archivos
        // Esto es solo un ejemplo simplificado
    });
    
    productImages.files = newFileList.files;
}

function toggleProviderType() {
    providerTypeContainer.style.display = registerProvider.checked ? 'block' : 'none';
}

function toggleSubmitButton() {
    submitProductBtn.disabled = !acceptTerms.checked;
}

function confirmTerms() {
    if (document.getElementById('modalAcceptTerms').checked) {
        acceptTerms.checked = true;
        toggleSubmitButton();
        closeModal(termsModal);
    } else {
        alert('Debes aceptar los términos y condiciones para continuar');
    }
}

function handleProviderFormSubmit(e) {
    e.preventDefault();
    
    if (!acceptTerms.checked) {
        alert('Debes aceptar los términos y condiciones para publicar un producto');
        return;
    }
    
    // Validar que haya al menos una imagen
    if (imagePreview.children.length === 0) {
        alert('Debes subir al menos una imagen del producto');
        return;
    }
    
    // En una aplicación real, aquí enviaríamos los datos al servidor
    const newProduct = {
        id: products.length + 1,
        name: document.getElementById('productName').value,
        category: productCategory.value,
        subcategory: productSubcategory.value,
        price: parseFloat(document.getElementById('productPrice').value),
        currency: document.getElementById('productCurrency').value,
        description: document.getElementById('productDescription').value,
        provider: document.getElementById('providerName').value,
        phone: document.getElementById('providerPhone').value,
        email: document.getElementById('providerEmail').value || null,
        province: document.getElementById('productProvince').value,
        quantity: parseInt(document.getElementById('productQuantity').value) || 1,
        hasDelivery: document.getElementById('hasDelivery').checked,
        hasWarranty: document.getElementById('hasWarranty').checked,
        hasPhysicalStore: document.getElementById('hasPhysicalStore').checked,
        images: [], // En una app real, subiríamos las imágenes a un servidor
        rating: 0,
        reviews: 0,
        status: 'pending', // Necesita aprobación del admin
        isOffer: false,
        isNew: true,
        isNegotiable: false,
        date: new Date()
    };
    
    // Simular subida de imágenes (en una app real, esto sería asíncrono)
    const imageItems = imagePreview.querySelectorAll('.image-preview-item img');
    imageItems.forEach(img => {
        newProduct.images.push(img.src); // En realidad sería la URL de la imagen subida
    });
    
    // Verificar si el proveedor ha excedido las publicaciones gratuitas
    const providerProducts = products.filter(p => p.provider === newProduct.provider && p.status === 'approved');
    if (providerProducts.length >= 5) {
        // Enviar notificación al admin
        sendAdminNotification(`El usuario ${newProduct.provider} ha publicado más de 5 productos. Contacta para establecer comisión del 5% por venta.`);
    }
    
    // Añadir el producto (en una app real, esperaríamos la respuesta del servidor)
    products.push(newProduct);
    
    // Mostrar mensaje de éxito
    alert('Tu producto ha sido enviado para revisión. Será publicado una vez aprobado por nuestro equipo.');
    
    // Reiniciar el formulario
    providerForm.reset();
    imagePreview.innerHTML = '';
    productSubcategory.disabled = true;
    
    // Actualizar lista de productos en el admin si está abierto
    if (adminModal.classList.contains('active')) {
        displayAdminProducts(products);
    }
    
    // Cerrar el modal si es necesario
    closeModal(document.querySelector('.modal.active'));
}

// Funciones de búsqueda y filtrado
function applyFilters() {
    const searchTerm = searchInput.value.toLowerCase();
    const filter = document.querySelector('.filter-btn.active').getAttribute('data-filter');
    const province = provinceFilter.value;
    const priceRange = priceFilter.value;
    const currency = currencyFilter.value;
    
    let filteredProducts = products.filter(product => {
        // Filtro por estado (solo aprobados)
        if (product.status !== 'approved') return false;
        
        // Filtro por búsqueda
        if (searchTerm && !product.name.toLowerCase().includes(searchTerm) && 
            !product.description.toLowerCase().includes(searchTerm)) {
            return false;
        }
        
        // Filtro por tipo
        if (filter === 'new' && !product.isNew) return false;
        if (filter === 'offer' && !product.isOffer) return false;
        if (filter === 'negotiation' && !product.isNegotiable) return false;
        
        // Filtro por provincia
        if (province !== 'all' && product.province !== province) return false;
        
        // Filtro por rango de precio
        if (priceRange !== 'all') {
            const [min, max] = priceRange.split('-').map(Number);
            if (max && (product.price < min || product.price > max)) return false;
            if (priceRange === '200+' && product.price < 200) return false;
        }
        
        // Filtro por moneda
        if (currency !== 'all' && product.currency !== currency) return false;
        
        return true;
    });
    
    // Ordenar por fecha (más recientes primero)
    filteredProducts.sort((a, b) => b.date - a.date);
    
    displayProducts(filteredProducts);
}

// Funciones de administración
function displayAdminProducts(productsToDisplay) {
    if (!adminProductsGrid) return;
    
    const status = document.querySelector('.status-option.active').getAttribute('data-status');
    
    // Filtrar por estado
    let filteredProducts = productsToDisplay;
    if (status !== 'all') {
        filteredProducts = productsToDisplay.filter(p => p.status === status);
    }
    
    adminProductsGrid.innerHTML = '';
    
    if (filteredProducts.length === 0) {
        adminProductsGrid.innerHTML = '<p class="no-results">No hay productos en este estado.</p>';
        return;
    }
    
    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-img">
                <img src="${product.images[0]}" alt="${product.name}">
                ${product.status === 'pending' ? '<div class="product-badge">Pendiente</div>' : ''}
                ${product.status === 'rejected' ? '<div class="product-badge rejected">Rechazado</div>' : ''}
                ${product.status === 'sold' ? '<div class="product-badge sold">Vendido</div>' : ''}
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price">${product.price} ${product.currency}</div>
                <div class="product-meta">
                    <span><i class="fas fa-user"></i> ${product.provider}</span>
                    <span><i class="fas fa-calendar-alt"></i> ${formatDate(product.date)}</span>
                </div>
                <div class="product-actions">
                    <button class="btn btn-small" onclick="showAdminProductDetail(${product.id})">
                        <i class="fas fa-eye"></i> Detalles
                    </button>
                    ${product.status === 'pending' ? `
                        <button class="btn btn-small btn-success" onclick="approveProduct(${product.id})">
                            <i class="fas fa-check"></i> Aprobar
                        </button>
                        <button class="btn btn-small btn-danger" onclick="rejectProduct(${product.id})">
                            <i class="fas fa-times"></i> Rechazar
                        </button>
                    ` : ''}
                    ${product.status === 'approved' ? `
                        <button class="btn btn-small btn-success" onclick="markAsSold(${product.id})">
                            <i class="fas fa-check-circle"></i> Marcar como vendido
                        </button>
                    ` : ''}
                </div>
            </div>
        `;
        adminProductsGrid.appendChild(productCard);
    });
}

function showAdminProductDetail(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // Podríamos reutilizar showProductDetail con más información de admin
    showProductDetail(productId);
}

function approveProduct(productId) {
    const productIndex = products.findIndex(p => p.id === productId);
    if (productIndex === -1) return;
    
    products[productIndex].status = 'approved';
    
    // En una app real, haríamos una petición al servidor
    alert('Producto aprobado y publicado');
    displayAdminProducts(products);
    
    // Notificar al proveedor (en una app real)
    sendProviderNotification(productId, 'Tu producto ha sido aprobado y publicado en la tienda.');
}

function rejectProduct(productId) {
    const productIndex = products.findIndex(p => p.id === productId);
    if (productIndex === -1) return;
    
    const reason = prompt('Ingrese el motivo del rechazo:');
    if (!reason) return;
    
    products[productIndex].status = 'rejected';
    products[productIndex].rejectionReason = reason;
    
    // En una app real, haríamos una petición al servidor
    alert('Producto rechazado');
    displayAdminProducts(products);
    
    // Notificar al proveedor (en una app real)
    sendProviderNotification(productId, `Tu producto ha sido rechazado. Motivo: ${reason}`);
}

function markAsSold(productId) {
    const productIndex = products.findIndex(p => p.id === productId);
    if (productIndex === -1) return;
    
    products[productIndex].status = 'sold';
    products[productIndex].soldDate = new Date();
    
    // En una app real, haríamos una petición al servidor y calcularíamos la comisión
    const commission = products[productIndex].price * 0.05;
    alert(`Producto marcado como vendido. Comisión: ${commission} ${products[productIndex].currency}`);
    displayAdminProducts(products);
    displaySales();
    
    // Notificar al proveedor (en una app real)
    sendProviderNotification(productId, `¡Felicidades! Tu producto ha sido vendido. Por favor, contacta al comprador para concretar la entrega.`);
    
    // Notificar al admin sobre la comisión
    sendAdminNotification(`Producto vendido: ${products[productIndex].name}. Comisión: ${commission} ${products[productIndex].currency}`);
}

function displayProviders(providersToDisplay) {
    if (!providersList) return;
    
    providersList.innerHTML = '';
    
    providersToDisplay.forEach(provider => {
        const providerCard = document.createElement('div');
        providerCard.className = 'provider-card';
        providerCard.innerHTML = `
            <div class="provider-info">
                <div class="provider-avatar">
                    <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(provider.name)}&background=random" alt="${provider.name}">
                </div>
                <div class="provider-details">
                    <h3>${provider.name}</h3>
                    <div class="provider-meta">
                        <span><i class="fas fa-phone"></i> ${provider.phone}</span>
                        <span><i class="fas fa-envelope"></i> ${provider.email || 'No especificado'}</span>
                    </div>
                    <div class="provider-stats">
                        <span><i class="fas fa-store"></i> ${provider.type === 'mayorista' ? 'Mayorista' : 'Minorista'}</span>
                        <span><i class="fas fa-star"></i> ${provider.rating}</span>
                        <span><i class="fas fa-box"></i> ${provider.products} productos</span>
                        <span><i class="fas fa-shopping-cart"></i> ${provider.sales} ventas</span>
                    </div>
                </div>
            </div>
            <div class="provider-actions">
                <button class="btn btn-small" onclick="showProviderProducts('${provider.name}')">
                    <i class="fas fa-boxes"></i> Ver productos
                </button>
                <a href="https://wa.me/${provider.phone}" class="btn btn-small btn-secondary" target="_blank">
                    <i class="fab fa-whatsapp"></i> Contactar
                </a>
            </div>
        `;
        providersList.appendChild(providerCard);
    });
}

function showProviderProducts(providerName) {
    const providerProducts = products.filter(p => p.provider === providerName);
    displayAdminProducts(providerProducts);
    switchAdminTab('products');
}

function displaySales() {
    if (!salesList) return;
    
    const soldProducts = products.filter(p => p.status === 'sold');
    salesList.innerHTML = '';
    
    if (soldProducts.length === 0) {
        salesList.innerHTML = '<p class="no-results">No hay ventas registradas.</p>';
        return;
    }
    
    soldProducts.forEach(product => {
        const commission = product.price * 0.05;
        const saleItem = document.createElement('div');
        saleItem.className = 'sale-item';
        saleItem.innerHTML = `
            <div class="sale-product">
                <img src="${product.images[0]}" alt="${product.name}">
                <div>
                    <h4>${product.name}</h4>
                    <p>Vendido por: ${product.provider}</p>
                    <p>Fecha: ${formatDate(product.soldDate)}</p>
                </div>
            </div>
            <div class="sale-details">
                <div class="sale-price">
                    <span>Precio:</span>
                    <strong>${product.price} ${product.currency}</strong>
                </div>
                <div class="sale-commission">
                    <span>Comisión (5%):</span>
                    <strong>${commission} ${product.currency}</strong>
                </div>
            </div>
        `;
        salesList.appendChild(saleItem);
    });
}

function displayNotifications() {
    if (!notificationsList) return;
    
    // En una app real, estas notificaciones vendrían del servidor
    const notifications = [
        {
            id: 1,
            type: 'new_product',
            message: 'Nuevo producto pendiente de aprobación: "Camiseta básica blanca"',
            date: new Date(),
            read: false
        },
        {
            id: 2,
            type: 'limit_reached',
            message: 'El proveedor "Moda Cubana" ha alcanzado el límite de publicaciones gratuitas',
            date: new Date(Date.now() - 3600000),
            read: true
        },
        {
            id: 3,
            type: 'sale',
            message: 'Producto vendido: "Perfume Chanel N°5". Comisión: 4 USD',
            date: new Date(Date.now() - 86400000),
            read: true
        }
    ];
    
    notificationsList.innerHTML = '';
    
    notifications.forEach(notification => {
        const notificationItem = document.createElement('div');
        notificationItem.className = `notification-item ${notification.read ? 'read' : 'unread'}`;
        notificationItem.innerHTML = `
            <div class="notification-icon">
                ${notification.type === 'new_product' ? '<i class="fas fa-box"></i>' : ''}
                ${notification.type === 'limit_reached' ? '<i class="fas fa-exclamation-triangle"></i>' : ''}
                ${notification.type === 'sale' ? '<i class="fas fa-shopping-cart"></i>' : ''}
            </div>
            <div class="notification-content">
                <p>${notification.message}</p>
                <span class="notification-time">${formatTimeAgo(notification.date)}</span>
            </div>
            ${!notification.read ? '<div class="notification-badge"></div>' : ''}
        `;
        notificationsList.appendChild(notificationItem);
    });
}

function filterAdminProducts() {
    displayAdminProducts(products);
}

// Funciones de autenticación
function loginUser(email, password) {
    // En una app real, haríamos una petición al servidor
    // Esto es solo un ejemplo
    
    if (email === 'admin@tiendavirtual.cu' && password === 'admin123') {
        currentUser = {
            id: 1,
            name: 'Administrador',
            email: 'admin@tiendavirtual.cu',
            phone: '+5355703261',
            isAdmin: true
        };
    } else {
        currentUser = {
            id: 2,
            name: 'Usuario de Prueba',
            email: email,
            phone: '+53555123456',
            isAdmin: false
        };
    }
    
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    updateUserUI();
    closeModal(authModal);
    alert(`Bienvenido ${currentUser.name}`);
}

function registerUser(userData) {
    // En una app real, haríamos una petición al servidor
    currentUser = {
        id: Date.now(),
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        isAdmin: false,
        isProvider: userData.isProvider,
        providerType: userData.providerType
    };
    
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    updateUserUI();
    closeModal(authModal);
    alert(`Registro exitoso. Bienvenido ${currentUser.name}`);
    
    // Si es proveedor, mostrar formulario de producto
    if (userData.isProvider) {
        setTimeout(() => {
            openModal(document.getElementById('provider'));
        }, 1000);
    }
}

function logoutUser() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    updateUserUI();
    alert('Has cerrado sesión correctamente');
}

// Funciones de utilidad
function formatDate(date) {
    if (!(date instanceof Date)) date = new Date(date);
    return date.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

function formatTimeAgo(date) {
    const now = new Date();
    const diff = now - date;
    
    const minutes = Math.floor(diff / 60000);
    if (minutes < 60) return `Hace ${minutes} minuto${minutes !== 1 ? 's' : ''}`;
    
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `Hace ${hours} hora${hours !== 1 ? 's' : ''}`;
    
    const days = Math.floor(hours / 24);
    return `Hace ${days} día${days !== 1 ? 's' : ''}`;
}

function sendAdminNotification(message) {
    // En una app real, esto enviaría una notificación al panel de admin
    console.log(`Notificación para admin: ${message}`);
    
    // Enviar WhatsApp al admin
    const whatsappUrl = `https://wa.me/5355703261?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

function sendProviderNotification(productId, message) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // En una app real, esto enviaría una notificación al proveedor
    console.log(`Notificación para ${product.provider}: ${message}`);
    
    // Enviar WhatsApp al proveedor
    if (product.phone) {
        const whatsappUrl = `https://wa.me/${product.phone}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    }
}

// Inicialización de formularios
document.getElementById('loginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    loginUser(email, password);
});

document.getElementById('registerForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const userData = {
        name: document.getElementById('registerName').value,
        phone: document.getElementById('registerPhone').value,
        email: document.getElementById('registerEmail').value,
        password: document.getElementById('registerPassword').value,
        isProvider: document.getElementById('registerProvider').checked,
        providerType: document.getElementById('registerProviderType')?.value || null
    };
    
    if (userData.password !== document.getElementById('registerConfirmPassword').value) {
        alert('Las contraseñas no coinciden');
        return;
    }
    
    if (!document.getElementById('registerTerms').checked) {
        alert('Debes aceptar los términos y condiciones');
        return;
    }
    
    registerUser(userData);
});