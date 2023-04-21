function products(products) {
  const db = [...products]

  function printProducts() {
    const productsDOM = document.querySelector('.products__container')

    let htmlProduct = ''

    for (const product of db) {
      htmlProduct += `
      <article class="product" data-aos="flip-left"
      data-aos-easing="ease-out-cubic"
      data-aos-duration="2000">
        <div class="product__image">
          <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="product__actions">
          <button type="button" class="product__actions product--add" data-id="${product.id}">
            <i class="uil uil-shopping-basket"></i>
            Agregar
          </button>
        </div>
        <div class="product__content">
         <div class="product__content-info"> 
          <h3 class="product__title">${product.name}</h3>
          <span class="product__price">$${product.price}.00</span>
          <span class="product__category">${product.category}</span>
          <span class="product__stock">Displonibles: ${product.quantity}</span>
         </div>
         <div class="product__content-details"> 
          <h4 class="detail__text">Medidas</h4>
          <span class="sizes">XS, S, M, L, XL, XXL</span>
         </div>
          
        </div>
      </article>
      `
    }
    productsDOM.innerHTML = htmlProduct
  }

  printProducts()

  return {
    db,
    printProducts
  }
}

export default products