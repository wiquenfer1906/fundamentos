function cart(db, printProducts) {

  let cart = []

  const codDiscount = [
      {codigo : 'ABCDE' , discount: 10},
      {codigo : '12345' , discount: 20},
      {codigo : '20234' , discount: 30}
      ]
  
  //Elementos 

  let por_tax = 0.05
  let tax = 0.00
  let por_Discount = 0.00
  let total = 0.00
  let discount = 0.00

  // Elemento del DOM
  const productsDOM = document.querySelector('.products__container')
  const notifyDOM = document.querySelector('.notify')
  const cartDOM = document.querySelector('.cart__body')
  const countDOM = document.querySelector('.cart--articulos')
  const subTotalDOM = document.querySelector('.cart--subtotal')
  const discountDOM = document.querySelector('.cart--discount')
  const taxDOM = document.querySelector('.cart--tax')
  const totalDOM = document.querySelector('.cart--total')
  const emptyDOM = document.querySelector('.cart--empty')
  const checkoutDOM = document.querySelector('.cart--checkout')
  const discontDOM = document.querySelector('.discount')
  const textDiscount = document.querySelector('.discount__form-input')
  
  // Funciones
  function printCart() {
    let htmlCart = ''

    if (cart.length === 0) {
      htmlCart += `
        <div class="cart__empty">
          <i class='bx bx-cart'></i>
          <p class="cart__empty--text">No hay productos en el carrito</p>
        </div>
      `
      notifyDOM.classList.remove('show--notify')
    } else {
      for (const item of cart) {
        const product = db.find(p => p.id === item.id)
        htmlCart += `
          <article class="article">
            <div class="article__image">
              <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="article__content">
              <h3 class="article__title">${product.name}</h3>
              <span class="article__price">$${product.price}</span>
              <div class="article__quantity">
                <button type="button" class="article__quantity-btn article--minus" data-id="${item.id}">
                  <i class='bx bx-minus'></i>
                </button>
                <span class="article__quantity-text">${item.qty}</span>
                <button type="button" class="article__quantity-btn article--plus" data-id="${item.id}">
                  <i class='bx bx-plus'></i>
                </button>
              </div>
              <button type="button" class="article__btn remove-from-cart" data-id="${item.id}">
                <i class='bx bx-trash'></i>
              </button>
            </div>
          </article>
        `
      }
      notifyDOM.classList.add('show--notify')
    }

    cartDOM.innerHTML = htmlCart
    notifyDOM.innerHTML = showItemsCount()
    countDOM.innerHTML = showItemsCount()
    discountDOM.innerHTML = `$` +discount.toFixed(2)
    subTotalDOM.innerHTML = showSubTotal()
    taxDOM.innerHTML = `$` +  tax.toFixed(2)
    totalDOM.innerHTML = `$` +  total.toFixed(2) 
  }

  function addToCart(id, qty = 1) {
    const itemFinded = cart.find(i => i.id === id)

    if (itemFinded) {
      itemFinded.qty += qty
    } else {
      cart.push({id, qty})
    }
    printCart()
  }

  function removeFromCart(id, qty = 1) {
    const itemFinded = cart.find(i => i.id === id)
    const result = itemFinded.qty - qty

    if (result > 0) {
      itemFinded.qty -= qty
    } else {
      cart = cart.filter(i => i.id !== id)
    }
    
    printCart()
  }

  function deleteFromCart(id) {
    cart = cart.filter(i => i.id !== id)
    printCart()
  }

  function showItemsCount() {
    let sumaItems = 0.00
    for (const item of cart) {
      sumaItems += item.qty
    }
    return sumaItems
  }

  function showSubTotal() {
    let subtotal = 0.00
    for (const item of cart) {
      const productFinded = db.find(p => p.id === item.id)
      subtotal += item.qty * productFinded.price
    }

    tax = subtotal * por_tax
    total = subtotal + tax
    return `$` +  subtotal.toFixed(2)
  }

  function aplyDiscount(por_Discount) {
    if(por_Discount !== 0)
    {
    let subtotal = 0.00
    for (const item of cart) {
      const productFinded = db.find(p => p.id === item.id)
      subtotal += item.qty * productFinded.price
    }
    discount = subtotal * (por_Discount/100)
    tax = (subtotal-discount) * por_tax
    total = subtotal + tax
    discountDOM.innerHTML=`$` +discount.toFixed(2)
    taxDOM.innerHTML=`$` +tax.toFixed(2)
    totalDOM.innerHTML=`$` +total.toFixed(2)
    }
 
   } 

  function checkout() {
    for (const item of cart) {
      const productFinded = db.find(p => p.id === item.id)
      productFinded.quantity -= item.qty
    }
    discount = 0
    cart = []
    printCart()
    printProducts()
    window.alert('Gracias por su compra')
    // Modal


    
  }

  
  printCart()
  // Eventos

  
  productsDOM.addEventListener('click', function (e) {
    //Agregar  De Product al Cart
    if (e.target.closest('.product--add')) {
      const id = +e.target.closest('.product--add').dataset.id
      addToCart(id)
    }
  })

  discontDOM.addEventListener('click', function (e) {
    //Agregar  De Product al Cart
    if (e.target.closest('.discount__form-btn')) {
      const _discount = codDiscount.find(cod => textDiscount.value === cod.codigo)
      if (_discount)
      {
        por_Discount = _discount.discount
        aplyDiscount(por_Discount)
        window.alert('Codigo Correcto')
        textDiscount.value=" "
      }
      


      else
      window.alert('Codigo Invalido')
        
    }
  })


  
  cartDOM.addEventListener('click', function (e) {
    //Disminuir del Carro
    if (e.target.closest('.article--minus')) {
      const id = +e.target.closest('.article--minus').dataset.id
      removeFromCart(id)
    }
    //Agregar del Carro
    if (e.target.closest('.article--plus')) {
      const id = +e.target.closest('.article--plus').dataset.id
      addToCart(id)
    }
    //Quitar del Carro
    if (e.target.closest('.remove-from-cart')) {
      const id = +e.target.closest('.remove-from-cart').dataset.id
      deleteFromCart(id)
    }

  })

  //Comprar
  checkoutDOM.addEventListener('click', function () {
    checkout()
  })

  //Limpiar Carro
  emptyDOM.addEventListener('click', function () {
    checkout()
  })

}

export default cart