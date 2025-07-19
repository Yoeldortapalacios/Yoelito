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
    subcategories: ['prenda-superior', 'prenda-inferior', 'ropa-interior', 'prenda-exterior', 'calzado', 'accesorios']
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
    name: 'Cosas del hogar',
    subcategories: ['decoracion', 'utensilios-cocina', 'organizadores', 'muebles-pequenos']
  },
  'otros': {
    name: 'Otros productos',
    subcategories: ['tecnologia', 'accesorios-electronicos', 'articulos-escolares', 'servicios-digitales']
  }
};

// Monedas disponibles
const currencies = ['CUP', 'MLC', 'USD'];

// Provincias de Cuba
const provinces = [
  'Pinar del Río', 'Artemisa', 'La Habana', 'Mayabeque', 'Matanzas',
  'Cienfuegos', 'Villa Clara', 'Sancti Spíritus', 'Ciego de Ávila',
  'Camagüey', 'Las Tunas', 'Granma', 'Holguín', 'Santiago de Cuba',
  'Guantánamo', 'Isla de la Juventud'
];

// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
  initApp();
});

// Inicializar la aplicación
function initApp() {
  // Cargar datos del localStorage
  loadData();
  
  // Configurar eventos
  setupEventListeners();
  
  // Mostrar productos
  displayProducts();
  
  // Mostrar ofertas del día
  displayDailyOffers();
  
  // Verificar sesión
  checkAuthState();
  
  // Inicializar submenús
  initSubmenus();
  
  // Inicializar FAQ
  initFAQ();
  
  // Inicializar upload de imágenes
  initImageUpload();
}

// Cargar datos del localStorage
function loadData() {
  const savedProducts = localStorage.getItem('products');
  const savedUsers = localStorage.getItem('users');
  const savedProviders = localStorage.getItem('providers');
  
  if (savedProducts) products = JSON.parse(savedProducts);
  if (savedUsers) users = JSON.parse(savedUsers);
  if (savedProviders) providers = JSON.parse(savedProviders);
}

// Guardar datos en localStorage
function saveData() {
  localStorage.setItem('products', JSON.stringify(products));
  localStorage.setItem('users', JSON.stringify(users));
  localStorage.setItem('providers', JSON.stringify(providers));
}

// Configurar event listeners
function setupEventListeners() {
  // Menú móvil
  document.getElementById('mobileMenuBtn').addEventListener('click', toggleMobileMenu);
  
  // Filtros de productos
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', filterProducts);
  });
  
  document.getElementById('provinceFilter').addEventListener('change', filterProducts);
  document.getElementById('priceFilter').addEventListener('change', filterProducts);
  document.getElementById('searchBtn').addEventListener('click', searchProducts);
  document.getElementById('searchInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') searchProducts();
  });
  
  // Modales
  document.querySelectorAll('.close-modal').forEach(btn => {
    btn.addEventListener('click', closeModal);
  });
  
  // Autenticación
  document.getElementById('loginBtn').addEventListener('click', openAuthModal);
  document.getElementById('registerBtn').addEventListener('click', openAuthModal);
  document.getElementById('logoutBtn').addEventListener('click', logout);
  document.getElementById('adminBtn').addEventListener('click', openAdminModal);
  
  // Formularios
  document.getElementById('loginForm').addEventListener('submit', loginUser);
  document.getElementById('registerForm').addEventListener('submit', registerUser);
  document.getElementById('providerForm').addEventListener('submit', submitProduct);
  
  // Tabs de autenticación
  document.querySelectorAll('.auth-tab').forEach(tab => {
    tab.addEventListener('click', switchAuthTab);
  });
  
  // Tabs de administración
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', switchAdminTab);
  });
  
  // Status selector en admin
  document.querySelectorAll('.status-option').forEach(option => {
    option.addEventListener('click', filterAdminProducts);
  });
}

// Mostrar productos
function displayProducts(filteredProducts = null) {
  const productsGrid = document.getElementById('productsGrid');
  productsGrid.innerHTML = '';
  
  const productsToDisplay = filteredProducts || products.filter(p => p.status === 'approved');
  
  if (productsToDisplay.length === 0) {
    productsGrid.innerHTML = '<p class="no-products">No se encontraron productos.</p>';
    return;
  }
  
  productsToDisplay.forEach(product => {
    const productCard = createProductCard(product);
    productsGrid.appendChild(productCard);
  });
}

// Crear tarjeta de producto
function createProductCard(product) {
  const card = document.createElement('div');
  card.className = 'product-card';
  card.dataset.id = product.id;
  card.dataset.category = product.category;
  
  // Badges
  let badges = '';
  if (product.isNew) badges += '<span class="badge new">Nuevo</span>';
  if (product.hasOffer) badges += '<span class="badge offer">Oferta</span>';
  if (product.isNegotiable) badges += '<span class="badge negotiation">Negociable</span>';
  
  // Rating stars
  const rating = product.rating || 0;
  let stars = '';
  for (let i = 1; i <= 5; i++) {
    stars += `<i class="fas fa-star${i <= rating ? '' : '-o'}"></i>`;
  }
  
  card.innerHTML = `
    <div class="product-img">
      <img src="${product.images[0]}" alt="${product.name}">
      ${badges}
    </div>
    <div class="product-info">
      <h3>${product.name}</h3>
      <div class="product-meta">
        <span class="price">${product.price} ${product.currency}</span>
        <span class="location">${product.province}</span>
      </div>
      <div class="product-rating">
        ${stars}
        <span>(${product.reviews ? product.reviews.length : 0})</span>
      </div>
    </div>
  `;
  
  card.addEventListener('click', () => openProductModal(product.id));
  return card;
}

// Mostrar ofertas del día
function displayDailyOffers() {
  const offersGrid = document.getElementById('dailyOffersGrid');
  offersGrid.innerHTML = '';
  
  // Obtener 4 productos aleatorios con oferta
  const offerProducts = products
    .filter(p => p.hasOffer && p.status === 'approved')
    .sort(() => 0.5 - Math.random())
    .slice(0, 4);
  
  if (offerProducts.length === 0) {
    offersGrid.innerHTML = '<p class="no-offers">No hay ofertas especiales hoy.</p>';
    return;
  }
  
  offerProducts.forEach(product => {
    const productCard = createProductCard(product);
    offersGrid.appendChild(productCard);
  });
}

// Filtrar productos
function filterProducts(e) {
  const filter = e.currentTarget.dataset.filter || 'all';
  const province = document.getElementById('provinceFilter').value;
  const priceRange = document.getElementById('priceFilter').value;
  
  let filtered = products.filter(p => p.status === 'approved');
  
  // Aplicar filtros
  if (filter !== 'all') {
    filtered = filtered.filter(p => {
      if (filter === 'new') return p.isNew;
      if (filter === 'offer') return p.hasOffer;
      if (filter === 'negotiation') return p.isNegotiable;
      return true;
    });
  }
  
  if (province !== 'all') {
    filtered = filtered.filter(p => p.province.toLowerCase() === province);
  }
  
  if (priceRange !== 'all') {
    const [min, max] = priceRange.split('-').map(Number);
    filtered = filtered.filter(p => {
      const price = parseFloat(p.price);
      if (priceRange.endsWith('+')) return price >= min;
      return price >= min && price <= max;
    });
  }
  
  // Actualizar botones activos
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === filter);
  });
  
  displayProducts(filtered);
}

// Buscar productos
function searchProducts() {
  const query = document.getElementById('searchInput').value.toLowerCase();
  if (!query) return;
  
  const filtered = products.filter(p => 
    p.status === 'approved' && 
    (p.name.toLowerCase().includes(query) || 
     p.description.toLowerCase().includes(query))
  );
  
  displayProducts(filtered);
}

// Modal de producto
function openProductModal(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;
  
  const modalContent = document.getElementById('productModalContent');
  
  // Galería de imágenes
  let imagesHTML = '';
  product.images.forEach((img, index) => {
    imagesHTML += `
      <div class="product-thumb ${index === 0 ? 'active' : ''}">
        <img src="${img}" alt="${product.name} - Imagen ${index + 1}">
      </div>
    `;
  });
  
  // Rating stars
  const rating = product.rating || 0;
  let stars = '';
  for (let i = 1; i <= 5; i++) {
    stars += `<i class="fas fa-star${i <= rating ? '' : '-o'}"></i>`;
  }
  
  // Reviews
  let reviewsHTML = '';
  if (product.reviews && product.reviews.length > 0) {
    product.reviews.forEach(review => {
      let reviewStars = '';
      for (let i = 1; i <= 5; i++) {
        reviewStars += `<i class="fas fa-star${i <= review.rating ? '' : '-o'}"></i>`;
      }
      
      reviewsHTML += `
        <div class="review">
          <div class="review-header">
            <span class="review-author">${review.author}</span>
            <div class="review-rating">${reviewStars}</div>
            <span class="review-date">${review.date}</span>
          </div>
          <p class="review-text">${review.text}</p>
        </div>
      `;
    });
  } else {
    reviewsHTML = '<p>Este producto aún no tiene valoraciones.</p>';
  }
  
  modalContent.innerHTML = `
    <div class="product-gallery">
      <div class="main-image">
        <img src="${product.images[0]}" alt="${product.name}">
      </div>
      <div class="thumbnails">
        ${imagesHTML}
      </div>
    </div>
    <div class="product-details">
      <h2>${product.name}</h2>
      <div class="product-meta">
        <div class="price">${product.price} ${product.currency}</div>
        <div class="rating">
          ${stars}
          <span>(${product.reviews ? product.reviews.length : 0} valoraciones)</span>
        </div>
        <div class="location">
          <i class="fas fa-map-marker-alt"></i> ${product.province}
        </div>
        <div class="published">
          Publicado: ${new Date(product.date).toLocaleDateString()}
        </div>
      </div>
      
      <div class="product-description">
        <h3>Descripción</h3>
        <p>${product.description}</p>
      </div>
      
      <div class="product-specs">
        <h3>Detalles</h3>
        <ul>
          <li><strong>Categoría:</strong> ${categories[product.category].name}</li>
          <li><strong>Subcategoría:</strong> ${product.subcategory}</li>
          <li><strong>Garantía:</strong> ${product.hasWarranty ? 'Sí' : 'No'}</li>
          <li><strong>Entrega a domicilio:</strong> ${product.hasDelivery ? 'Sí' : 'No'}</li>
          <li><strong>Tienda física:</strong> ${product.hasPhysicalStore ? 'Sí' : 'No'}</li>
          <li><strong>Cantidad disponible:</strong> ${product.quantity}</li>
        </ul>
      </div>
      
      <div class="product-actions">
        <a href="https://wa.me/5355703261?text=Estoy%20interesado%20en%20el%20producto:%20${encodeURIComponent(product.name)}%20(ID:%20${product.id})" 
           class="btn whatsapp-btn" target="_blank">
          <i class="fab fa-whatsapp"></i> Estoy interesado
        </a>
        <button class="btn btn-secondary save-btn">
          <i class="far fa-heart"></i> Guardar
        </button>
      </div>
      
      <div class="product-reviews">
        <h3>Valoraciones</h3>
        ${reviewsHTML}
        
        ${currentUser ? `
          <div class="add-review">
            <h4>Deja tu valoración</h4>
            <div class="rating-input">
              <span>Valoración:</span>
              <div class="stars">
                <i class="far fa-star" data-rating="1"></i>
                <i class="far fa-star" data-rating="2"></i>
                <i class="far fa-star" data-rating="3"></i>
                <i class="far fa-star" data-rating="4"></i>
                <i class="far fa-star" data-rating="5"></i>
              </div>
            </div>
            <textarea placeholder="Escribe tu opinión sobre este producto..." id="reviewText"></textarea>
            <button class="btn" id="submitReview">Enviar valoración</button>
          </div>
        ` : '<p>Inicia sesión para dejar una valoración</p>'}
      </div>
    </div>
  `;
  
  // Configurar eventos para las miniaturas
  document.querySelectorAll('.product-thumb').forEach(thumb => {
    thumb.addEventListener('click', function() {
      const imgSrc = this.querySelector('img').src;
      document.querySelector('.main-image img').src = imgSrc;
      document.querySelectorAll('.product-thumb').forEach(t => t.classList.remove('active'));
      this.classList.add('active');
    });
  });
  
  // Configurar eventos para valoraciones
  if (currentUser) {
    document.querySelectorAll('.stars i').forEach(star => {
      star.addEventListener('click', function() {
        const rating = parseInt(this.dataset.rating);
        document.querySelectorAll('.stars i').forEach((s, i) => {
          s.classList.toggle('fas', i < rating);
          s.classList.toggle('far', i >= rating);
        });
      });
    });
    
    document.getElementById('submitReview').addEventListener('click', submitReview);
  }
  
  // Mostrar modal
  document.getElementById('productModal').style.display = 'block';
}

// Enviar valoración
function submitReview() {
  const productId = document.getElementById('productModalContent').parentElement.querySelector('.main-image img').alt.split(' - ')[0];
  const product = products.find(p => p.name === productId);
  if (!product) return;
  
  const rating = document.querySelectorAll('.stars .fas').length;
  const text = document.getElementById('reviewText').value.trim();
  
  if (!rating || !text) {
    alert('Por favor selecciona una valoración y escribe tu opinión.');
    return;
  }
  
  if (!product.reviews) product.reviews = [];
  
  product.reviews.push({
    author: currentUser.name,
    rating: rating,
    text: text,
    date: new Date().toLocaleDateString()
  });
  
  // Calcular nuevo rating promedio
  const totalRatings = product.reviews.reduce((sum, review) => sum + review.rating, 0);
  product.rating = Math.round(totalRatings / product.reviews.length);
  
  saveData();
  openProductModal(product.id); // Recargar modal para mostrar la nueva valoración
}

// Autenticación
function checkAuthState() {
  const loggedUser = localStorage.getItem('currentUser');
  if (loggedUser) {
    currentUser = JSON.parse(loggedUser);
    updateAuthUI();
  }
}

function updateAuthUI() {
  const loginBtn = document.getElementById('loginBtn');
  const registerBtn = document.getElementById('registerBtn');
  const adminBtn = document.getElementById('adminBtn');
  const logoutBtn = document.getElementById('logoutBtn');
  
  if (currentUser) {
    loginBtn.parentElement.style.display = 'none';
    registerBtn.parentElement.style.display = 'none';
    logoutBtn.style.display = 'block';
    
    if (currentUser.role === 'admin') {
      adminBtn.style.display = 'block';
    } else {
      adminBtn.style.display = 'none';
    }
  } else {
    loginBtn.parentElement.style.display = 'block';
    registerBtn.parentElement.style.display = 'block';
    logoutBtn.style.display = 'none';
    adminBtn.style.display = 'none';
  }
}

function loginUser(e) {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  
  const user = users.find(u => u.email === email && u.password === password);
  
  if (user) {
    currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
    updateAuthUI();
    closeModal();
    alert(`Bienvenido, ${user.name}!`);
  } else {
    alert('Credenciales incorrectas. Por favor intenta nuevamente.');
  }
}

function registerUser(e) {
  e.preventDefault();
  const name = document.getElementById('registerName').value;
  const email = document.getElementById('registerEmail').value;
  const phone = document.getElementById('registerPhone').value;
  const password = document.getElementById('registerPassword').value;
  const confirmPassword = document.getElementById('registerConfirmPassword').value;
  
  if (password !== confirmPassword) {
    alert('Las contraseñas no coinciden.');
    return;
  }
  
  if (users.some(u => u.email === email)) {
    alert('Este email ya está registrado.');
    return;
  }
  
  const newUser = {
    id: generateId(),
    name: name,
    email: email,
    phone: phone,
    password: password,
    role: 'user',
    date: new Date().toISOString()
  };
  
  users.push(newUser);
  currentUser = newUser;
  localStorage.setItem('currentUser', JSON.stringify(newUser));
  localStorage.setItem('users', JSON.stringify(users));
  
  updateAuthUI();
  closeModal();
  alert('Registro exitoso. ¡Bienvenido!');
}

function logout() {
  currentUser = null;
  localStorage.removeItem('currentUser');
  updateAuthUI();
  alert('Has cerrado sesión correctamente.');
}

// Productos de proveedores
function submitProduct(e) {
  e.preventDefault();
  
  if (!currentUser) {
    alert('Debes iniciar sesión para publicar productos.');
    openAuthModal();
    return;
  }
  
  // Verificar si el usuario es proveedor
  let provider = providers.find(p => p.userId === currentUser.id);
  
  // Si no es proveedor, registrarlo como tal
  if (!provider) {
    provider = {
      id: generateId(),
      userId: currentUser.id,
      name: currentUser.name,
      phone: currentUser.phone,
      email: currentUser.email,
      products: [],
      rating: 0,
      reviews: [],
      freePostsUsed: 0,
      date: new Date().toISOString()
    };
    providers.push(provider);
  }
  
  // Verificar límite de publicaciones gratuitas
  if (provider.freePostsUsed >= 5) {
    // Notificar al administrador
    sendAdminNotification(provider);
    alert('Has alcanzado tu límite de 5 publicaciones gratuitas. Nos pondremos en contacto contigo para establecer la comisión del 5% por venta.');
    return;
  }
  
  // Obtener datos del formulario
  const productData = {
    id: generateId(),
    name: document.getElementById('productName').value,
    price: document.getElementById('productPrice').value,
    category: document.getElementById('productCategory').value,
    subcategory: document.getElementById('productSubcategory').value,
    province: document.getElementById('productProvince').value,
    description: document.getElementById('productDescription').value,
    currency: document.getElementById('productCurrency').value,
    hasDelivery: document.getElementById('productDelivery').checked,
    hasWarranty: document.getElementById('productWarranty').checked,
    hasPhysicalStore: document.getElementById('productPhysicalStore').checked,
    quantity: document.getElementById('productQuantity').value,
    images: Array.from(document.querySelectorAll('#imagePreview img')).map(img => img.src),
    userId: currentUser.id,
    providerName: currentUser.name,
    providerPhone: currentUser.phone,
    status: 'pending', // Pendiente de aprobación
    date: new Date().toISOString(),
    isNew: true,
    hasOffer: false,
    isNegotiable: false,
    rating: 0,
    reviews: []
  };
  
  // Validar campos obligatorios
  if (!productData.name || !productData.price || !productData.category || 
      !productData.subcategory || !productData.province || !productData.description || 
      productData.images.length === 0) {
    alert('Por favor complete todos los campos obligatorios.');
    return;
  }
  
  // Agregar producto
  products.push(productData);
  provider.products.push(productData.id);
  provider.freePostsUsed += 1;
  
  // Guardar datos
  saveData();
  
  // Notificar al administrador
  sendNewProductNotification(productData);
  
  // Limpiar formulario
  document.getElementById('providerForm').reset();
  document.getElementById('imagePreview').innerHTML = '';
  
  alert('Producto enviado para aprobación. Nos pondremos en contacto contigo una vez sea revisado.');
}

// Notificar al administrador sobre nuevo producto
function sendNewProductNotification(product) {
  const message = `Nuevo producto para revisión:
  
Nombre: ${product.name}
Precio: ${product.price} ${product.currency}
Categoría: ${categories[product.category].name}
Subcategoría: ${product.subcategory}
Provincia: ${product.province}

Publicado por: ${product.providerName} (${product.providerPhone})
ID Producto: ${product.id}`;

  // En un entorno real, esto enviaría una notificación al backend
  console.log('Notificación al administrador:', message);
  // Enviar WhatsApp al administrador
  window.open(`https://wa.me/5355703261?text=${encodeURIComponent(message)}`, '_blank');
}

// Notificar al administrador sobre límite excedido
function sendAdminNotification(provider) {
  const message = `El usuario ${provider.name} (ID: ${provider.id}) ha publicado más de 5 productos. Contacta para establecer comisión del 5% por venta.`;

  // En un entorno real, esto enviaría una notificación al backend
  console.log('Notificación al administrador:', message);
  // Enviar WhatsApp al administrador
  window.open(`https://wa.me/5355703261?text=${encodeURIComponent(message)}`, '_blank');
}

// Panel de administración
function openAdminModal() {
  if (!currentUser || currentUser.role !== 'admin') {
    alert('Acceso denegado. Solo para administradores.');
    return;
  }
  
  loadAdminProducts();
  document.getElementById('adminModal').style.display = 'block';
}

function loadAdminProducts(filter = 'all') {
  const adminProductsGrid = document.getElementById('adminProductsGrid');
  adminProductsGrid.innerHTML = '';
  
  let productsToDisplay = [...products];
  
  if (filter !== 'all') {
    productsToDisplay = productsToDisplay.filter(p => {
      if (filter === 'new') return p.status === 'pending';
      if (filter === 'negotiation') return p.status === 'approved' && p.isNegotiable;
      if (filter === 'sold') return p.status === 'sold';
      return true;
    });
  }
  
  if (productsToDisplay.length === 0) {
    adminProductsGrid.innerHTML = '<p class="no-products">No hay productos para mostrar.</p>';
    return;
  }
  
  productsToDisplay.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className = 'admin-product-card';
    productCard.dataset.id = product.id;
    
    let statusBadge = '';
    if (product.status === 'pending') statusBadge = '<span class="status-badge pending">Pendiente</span>';
    if (product.status === 'approved') statusBadge = '<span class="status-badge approved">Aprobado</span>';
    if (product.status === 'rejected') statusBadge = '<span class="status-badge rejected">Rechazado</span>';
    if (product.status === 'sold') statusBadge = '<span class="status-badge sold">Vendido</span>';
    
    productCard.innerHTML = `
      <div class="admin-product-img">
        <img src="${product.images[0]}" alt="${product.name}">
        ${statusBadge}
      </div>
      <div class="admin-product-info">
        <h3>${product.name}</h3>
        <p><strong>Precio:</strong> ${product.price} ${product.currency}</p>
        <p><strong>Categoría:</strong> ${categories[product.category].name}</p>
        <p><strong>Proveedor:</strong> ${product.providerName} (${product.providerPhone})</p>
        <p><strong>Publicado:</strong> ${new Date(product.date).toLocaleDateString()}</p>
      </div>
      <div class="admin-product-actions">
        ${product.status === 'pending' ? `
          <button class="btn btn-small approve-btn">Aprobar</button>
          <button class="btn btn-small btn-secondary reject-btn">Rechazar</button>
        ` : ''}
        ${product.status === 'approved' ? `
          <button class="btn btn-small mark-sold-btn">Marcar como vendido</button>
        ` : ''}
        <button class="btn btn-small btn-danger delete-btn">Eliminar</button>
      </div>
    `;
    
    // Configurar eventos de los botones
    if (product.status === 'pending') {
      productCard.querySelector('.approve-btn').addEventListener('click', () => approveProduct(product.id));
      productCard.querySelector('.reject-btn').addEventListener('click', () => rejectProduct(product.id));
    }
    
    if (product.status === 'approved') {
      productCard.querySelector('.mark-sold-btn').addEventListener('click', () => markAsSold(product.id));
    }
    
    productCard.querySelector('.delete-btn').addEventListener('click', () => deleteProduct(product.id));
    
    adminProductsGrid.appendChild(productCard);
  });
}

function approveProduct(productId) {
  const product = products.find(p => p.id === productId);
  if (product) {
    product.status = 'approved';
    saveData();
    loadAdminProducts(document.querySelector('.status-option.active').dataset.status);
    
    // Notificar al proveedor
    const provider = providers.find(p => p.userId === product.userId);
    if (provider) {
      const message = `Tu producto "${product.name}" ha sido aprobado y ya está visible en la tienda.`;
      // En un entorno real, se enviaría notificación por email o WhatsApp
      console.log('Notificación al proveedor:', message);
    }
  }
}

function rejectProduct(productId) {
  const product = products.find(p => p.id === productId);
  if (product) {
    product.status = 'rejected';
    saveData();
    loadAdminProducts(document.querySelector('.status-option.active').dataset.status);
    
    // Notificar al proveedor
    const provider = providers.find(p => p.userId === product.userId);
    if (provider) {
      const message = `Lamentamos informarte que tu producto "${product.name}" ha sido rechazado. Por favor contáctanos para más información.`;
      // En un entorno real, se enviaría notificación por email o WhatsApp
      console.log('Notificación al proveedor:', message);
    }
  }
}

function markAsSold(productId) {
  const product = products.find(p => p.id === productId);
  if (product) {
    product.status = 'sold';
    saveData();
    loadAdminProducts(document.querySelector('.status-option.active').dataset.status);
    
    // Calcular comisión y notificar
    const commission = product.price * 0.05; // 5% de comisión
    const message = `El producto "${product.name}" ha sido marcado como vendido. Comisión a cobrar: ${commission} ${product.currency}.`;
    console.log('Notificación de venta:', message);
  }
}

function deleteProduct(productId) {
  if (confirm('¿Estás seguro de eliminar este producto? Esta acción no se puede deshacer.')) {
    products = products.filter(p => p.id !== productId);
    saveData();
    loadAdminProducts(document.querySelector('.status-option.active').dataset.status);
  }
}

// Funciones auxiliares
function toggleMobileMenu() {
  document.getElementById('navMenu').classList.toggle('active');
}

function openAuthModal() {
  document.getElementById('authModal').style.display = 'block';
}

function closeModal() {
  document.querySelectorAll('.modal').forEach(modal => {
    modal.style.display = 'none';
  });
}

function switchAuthTab(e) {
  const tab = e.currentTarget.dataset.tab;
  
  document.querySelectorAll('.auth-tab').forEach(t => {
    t.classList.toggle('active', t.dataset.tab === tab);
  });
  
  document.querySelectorAll('.auth-form').forEach(form => {
    form.classList.toggle('active', form.id === `${tab}Form`);
  });
}

function switchAdminTab(e) {
  const tab = e.currentTarget.dataset.tab;
  
  document.querySelectorAll('.tab').forEach(t => {
    t.classList.toggle('active', t.dataset.tab === tab);
  });
  
  document.querySelectorAll('.tab-content').forEach(content => {
    content.classList.toggle('active', content.id === `admin${tab.charAt(0).toUpperCase() + tab.slice(1)}`);
  });
}

function filterAdminProducts(e) {
  const status = e.currentTarget.dataset.status;
  
  document.querySelectorAll('.status-option').forEach(option => {
    option.classList.toggle('active', option.dataset.status === status);
  });
  
  loadAdminProducts(status);
}

function initSubmenus() {
  document.querySelectorAll('nav ul li').forEach(item => {
    if (item.querySelector('ul')) {
      item.addEventListener('mouseenter', function() {
        this.querySelector('ul').style.display = 'block';
      });
      item.addEventListener('mouseleave', function() {
        this.querySelector('ul').style.display = 'none';
      });
    }
  });
}

function initFAQ() {
  document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', function() {
      this.parentElement.classList.toggle('active');
      const answer = this.nextElementSibling;
      answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
      this.querySelector('i').classList.toggle('fa-chevron-down');
      this.querySelector('i').classList.toggle('fa-chevron-up');
    });
  });
}

function initImageUpload() {
  const uploadArea = document.getElementById('imageUpload');
  const fileInput = document.getElementById('productImages');
  const preview = document.getElementById('imagePreview');
  
  uploadArea.addEventListener('click', () => fileInput.click());
  
  fileInput.addEventListener('change', function() {
    if (this.files.length > 5) {
      alert('Máximo 5 imágenes permitidas.');
      return;
    }
    
    preview.innerHTML = '';
    
    Array.from(this.files).forEach(file => {
      if (!file.type.match('image.*')) return;
      
      const reader = new FileReader();
      reader.onload = function(e) {
        const img = document.createElement('img');
        img.src = e.target.result;
        preview.appendChild(img);
      };
      reader.readAsDataURL(file);
    });
  });
  
  // Drag and drop
  uploadArea.addEventListener('dragover', function(e) {
    e.preventDefault();
    this.classList.add('dragover');
  });
  
  uploadArea.addEventListener('dragleave', function() {
    this.classList.remove('dragover');
  });
  
  uploadArea.addEventListener('drop', function(e) {
    e.preventDefault();
    this.classList.remove('dragover');
    
    if (e.dataTransfer.files.length > 5) {
      alert('Máximo 5 imágenes permitidas.');
      return;
    }
    
    fileInput.files = e.dataTransfer.files;
    const event = new Event('change');
    fileInput.dispatchEvent(event);
  });
}

function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

// Datos iniciales
let users = [
  {
    id: 'admin123',
    name: 'Administrador',
    email: 'admin@tiendavirtualcuba.com',
    phone: '5355703261',
    password: 'admin123',
    role: 'admin',
    date: new Date().toISOString()
  }
];

// Guardar datos iniciales
if (!localStorage.getItem('users')) {
  localStorage.setItem('users', JSON.stringify(users));
}