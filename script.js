const WHATSAPP_NUMBER = '50600000000';
const CART_KEY = 'papishopcr-cart-v4';

const products = [
  { id:'cama-nube-perro', name:'Cama Nube Comfy', price:24900, species:'Perros', category:'Camas', tags:['Entrega 48h GAM','Lo va a amar','Favorito de Papi'], img:'assets/products/cama-nube-perro.svg', desc:'Cama suave y estética para que descanse como se merece.' },
  { id:'pelota-chineo', name:'Pelota Lo Va A Amar', price:6900, species:'Perros', category:'Juguetes', tags:['Visto en TikTok','Favorito de Papi'], img:'assets/products/pelota-chineo.svg', desc:'Juguete llamativo para juego, reacción y momentos compartibles.' },
  { id:'hoodie-mostaza', name:'Hoodie Mostaza Papi', price:15900, species:'Perros', category:'Ropa', tags:['Nuevo chineo','Premium Pick'], img:'assets/products/hoodie-mostaza.svg', desc:'Ropa para mascotas que también merecen verse increíbles.' },
  { id:'collar-premium', name:'Collar Caramelo', price:11900, species:'Perros', category:'Accesorios', tags:['Premium Pick','Para perros'], img:'assets/products/collar-premium.svg', desc:'Accesorio con estilo, comodidad y personalidad.' },
  { id:'cama-gato', name:'Cama Rincón Gatuno', price:22900, species:'Gatos', category:'Camas', tags:['Para gatos','Comfy','Favorito de Papi'], img:'assets/products/cama-gato.svg', desc:'Un rincón cálido para gatos indoor con gustos muy claros.' },
  { id:'varita-gato', name:'Varita Favorita', price:5900, species:'Gatos', category:'Juguetes', tags:['Para gatos','Lo va a amar'], img:'assets/products/varita-gato.svg', desc:'Juguete para activar curiosidad y juego desde contenido real.' },
  { id:'tunel-gato', name:'Túnel Indoor', price:18900, species:'Gatos', category:'Juguetes', tags:['Visto en TikTok','Para gatos'], img:'assets/products/tunel-gato.svg', desc:'Producto ideal para que tu gato disfrute más cada rincón de casa.' },
  { id:'bandana', name:'Bandana de Estreno', price:7900, species:'Perros', category:'Accesorios', tags:['Nuevo chineo','Hecho con amor'], img:'assets/products/bandana.svg', desc:'Detalle especial para fotos, paseos y momentos de chineo.' },
  { id:'pechera', name:'Pechera Paseo Premium', price:19900, species:'Perros', category:'Accesorios', tags:['Premium Pick','Para perros'], img:'assets/products/pechera.svg', desc:'Accesorio premium para paseo con look Papishop.' },
  { id:'combo-chineo', name:'Combo Chineo', price:29900, species:'Perros', category:'Accesorios', tags:['Combo chineo','Ideal para regalar'], img:'assets/products/combo-chineo.svg', desc:'Selección especial para regalarle algo nuevo a tu mascota.' },
  { id:'sweater', name:'Sweater Comfy', price:16900, species:'Perros', category:'Ropa', tags:['Comfy','Nuevo chineo'], img:'assets/products/sweater.svg', desc:'Prenda cómoda, estética y lista para estrenar.' },
  { id:'cama-kraft', name:'Cama Premium Hogar', price:26900, species:'Perros', category:'Camas', tags:['Premium Pick','Entrega 48h GAM'], img:'assets/products/cama-kraft.svg', desc:'Cama con enfoque premium accesible para hogares pet lovers.' }
];

const money = new Intl.NumberFormat('es-CR', { style:'currency', currency:'CRC', maximumFractionDigits:0 });
let cart = safeCart();

function safeCart(){
  try { return JSON.parse(localStorage.getItem(CART_KEY) || '{}'); }
  catch { return {}; }
}
function saveCart(){
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  renderCartCount();
  renderCartPage();
}
function getProduct(id){ return products.find(product => product.id === id); }
function getCartItems(){
  return Object.entries(cart).map(([id, qty]) => ({ ...getProduct(id), qty })).filter(item => item.id && item.qty > 0);
}
function cartCount(){ return Object.values(cart).reduce((total, qty) => total + qty, 0); }
function cartSubtotal(){ return getCartItems().reduce((sum, item) => sum + item.price * item.qty, 0); }

function addToCart(id){
  const product = getProduct(id);
  if(!product) return;
  cart[id] = (cart[id] || 0) + 1;
  saveCart();
  showToast(`${product.name} agregado al carrito.`);
}
function changeQty(id, delta){
  if(!cart[id]) return;
  cart[id] += delta;
  if(cart[id] <= 0) delete cart[id];
  saveCart();
}
function clearCart(){
  cart = {};
  saveCart();
  showToast('Carrito vacío.');
}
function renderCartCount(){
  document.querySelectorAll('[data-cart-count]').forEach(el => el.textContent = cartCount());
}

function scopeProducts(scope, filter = 'Todos'){
  let scoped = [...products];
  if(scope === 'perros') scoped = scoped.filter(product => product.species === 'Perros');
  if(scope === 'gatos') scoped = scoped.filter(product => product.species === 'Gatos');
  if(scope === 'tiktok') scoped = scoped.filter(product => product.tags.includes('Visto en TikTok'));
  if(scope === 'favoritos') scoped = scoped.filter(product => product.tags.includes('Favorito de Papi') || product.tags.includes('Premium Pick') || product.tags.includes('Nuevo chineo') || product.tags.includes('Visto en TikTok'));

  if(filter !== 'Todos' && filter !== 'Perros' && filter !== 'Gatos') {
    scoped = scoped.filter(product => product.category === filter || product.tags.includes(filter));
  }
  if(filter === 'Perros') scoped = scoped.filter(product => product.species === 'Perros');
  if(filter === 'Gatos') scoped = scoped.filter(product => product.species === 'Gatos');
  return scoped;
}
function productCard(product){
  return `
    <article class="product-card" data-product="${product.id}">
      <div class="product-media"><img src="${product.img}" alt="${product.name}"></div>
      <div class="product-info">
        <div class="product-kicker">${product.tags.slice(0,2).map(tag => `<span>${tag}</span>`).join('')}</div>
        <h3>${product.name}</h3>
        <p>${product.desc}</p>
        <div class="price-row"><strong class="price">${money.format(product.price)}</strong></div>
        <button class="btn-small" type="button" data-add="${product.id}">Agregar al carrito</button>
      </div>
    </article>`;
}
function renderProductGrids(){
  document.querySelectorAll('[data-product-grid]').forEach(grid => {
    const scope = grid.dataset.scope || document.body.dataset.page || 'favoritos';
    const limit = Number(grid.dataset.limit || 0);
    const activeButton = document.querySelector('.filters button.active');
    const filter = activeButton?.dataset.filter || (scope === 'perros' ? 'Perros' : scope === 'gatos' ? 'Gatos' : 'Todos');
    let list = scopeProducts(scope, filter);
    if(limit) list = list.slice(0, limit);
    grid.innerHTML = list.length ? list.map(productCard).join('') : '<div class="cart-empty">No hay productos disponibles con este filtro.</div>';
  });
}
function setupFilters(){
  document.querySelectorAll('.filters button').forEach(button => {
    button.addEventListener('click', () => {
      const group = button.closest('.filters');
      group.querySelectorAll('button').forEach(item => item.classList.remove('active'));
      button.classList.add('active');
      renderProductGrids();
    });
  });
}
function renderCartPage(){
  const wrap = document.querySelector('[data-cart-items]');
  const subtotalEl = document.querySelector('[data-cart-subtotal]');
  const checkout = document.querySelector('[data-whatsapp-checkout]');
  const items = getCartItems();
  const subtotal = cartSubtotal();
  if(subtotalEl) subtotalEl.textContent = money.format(subtotal);
  if(wrap){
    wrap.innerHTML = items.length ? items.map(item => `
      <div class="cart-item">
        <img src="${item.img}" alt="${item.name}">
        <div>
          <strong>${item.name}</strong>
          <small>${money.format(item.price)} · ${item.species} · ${item.category}</small>
          <div class="qty">
            <button type="button" aria-label="Restar ${item.name}" data-qty-minus="${item.id}">−</button>
            <span>${item.qty}</span>
            <button type="button" aria-label="Sumar ${item.name}" data-qty-plus="${item.id}">+</button>
          </div>
        </div>
        <strong>${money.format(item.price * item.qty)}</strong>
      </div>`).join('') : '<div class="cart-empty">Tu carrito está vacío. Agregá un favorito de Papi para iniciar tu pedido.</div>';
  }
  if(checkout){
    const message = items.length
      ? `Hola Papishopcr, quiero finalizar este pedido:\n${items.map(item => `• ${item.qty} x ${item.name} - ${money.format(item.price * item.qty)}`).join('\n')}\nSubtotal: ${money.format(subtotal)}\nEstoy dentro del GAM y quiero confirmar entrega.`
      : 'Hola Papishopcr, quiero ayuda para elegir un producto.';
    checkout.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }
}
function setupActions(){
  document.addEventListener('click', event => {
    const add = event.target.closest('[data-add]');
    if(add) addToCart(add.dataset.add);
    const plus = event.target.closest('[data-qty-plus]');
    if(plus) changeQty(plus.dataset.qtyPlus, 1);
    const minus = event.target.closest('[data-qty-minus]');
    if(minus) changeQty(minus.dataset.qtyMinus, -1);
    const clear = event.target.closest('[data-clear-cart]');
    if(clear) clearCart();
  });
}
function setupMobileNav(){
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const nav = document.querySelector('[data-nav]');
  menuToggle?.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });
}
function markActiveNav(){
  const page = document.body.dataset.page;
  document.querySelectorAll('[data-nav-page]').forEach(link => {
    link.classList.toggle('is-active', link.dataset.navPage === page);
  });
}
let toastTimer;
function showToast(message){
  const toast = document.querySelector('[data-toast]');
  if(!toast) return;
  toast.textContent = message;
  toast.classList.add('is-visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 2200);
}

setupMobileNav();
setupFilters();
setupActions();
markActiveNav();
renderProductGrids();
renderCartCount();
renderCartPage();
