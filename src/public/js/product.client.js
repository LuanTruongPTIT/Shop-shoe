const form = document.getElementById('myForm')
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const IDsanpham = document.querySelector('.IDsanpham').value
  const productName = document.getElementById('product-name-detail').textContent;
  console.log(productName)
  const imageProduct = document.querySelector('.product-image').getAttribute('src')
  console.log(imageProduct)
  const priceProduct = parseInt((document.getElementById('price-product').textContent).substr(3));
  console.log(priceProduct);
  const selectElementSize = document.querySelector('.js-select-size').value;
  const selectElementColor = document.querySelector('.js-select-color').value;
  const quantity = parseInt(document.querySelector('.num-product').value);
  if (!productName || !priceProduct || !selectElementColor || !selectElementSize || !quantity) {
    let errorElement = document.querySelector('.error');
    errorElement.textContent = "Please check information!"
    return;
  }
  try {
    const response = await axios.post('/add-to-cart', {
      Magiay: IDsanpham,
      sanpham: productName,
      hinhanh: imageProduct,
      gia: priceProduct,
      mausac: selectElementColor,
      size: selectElementSize,
      soluong: quantity
    })
    console.log(response)
    response.data.forEach(item => {
      console.log(item)
      const cartItems = document.querySelectorAll(`.header-cart-item[data-product-id="${item.Magiay}"][data-product-color="${item.mausac}"][data-product-size="${item.size}"]`)
      console.log(cartItems)
      if (cartItems.length !== 0) {
        cartItems.forEach(cartItem => {
          const color = cartItem.getAttribute('data-product-color');
          const size = cartItem.getAttribute('data-product-size')
          if (item.mausac === color && item.size === size) {
            const content = cartItem.querySelector('.header-cart-item-name');
            content.innerText = item.sanpham + "-" + " " + "size:" + " " + item.size + "-" + " " + "color:" + item.mausac + "-" + " " + "Quantity:" + " " + item.soluong;
            const cost = cartItem.querySelector('.header-cart-item-info');
            cost.innerText = item.gia
          } else {
            console.log(item)
            itemProduct(item)
          }
        })
      } else {
        console.log(item)
        itemProduct(item)
      }
    });
  } catch (error) {

  }
})



// $('.cart-item-img').on('click', () => {
//   let productId = $(this).data('id');
//   axios.post('/remove-product', { id: productId })
//     .then((response) => {
//       console.log(response);
//       $(this).closest('.header-cart-item').remove();
//     })
//     .catch((error) => {
//       console.log(error)
//     })
//   console.log("Click")
// })

// function add node item cart
const itemProduct = (item) => {
  const cartItemList = document.querySelector('.header-cart-wrapitem');
  console.log(cartItemList)
  const cartItem = document.createElement('li');
  cartItem.classList.add('header-cart-item', 'flex-w', 'flex-t', 'm-b-12');
  cartItem.setAttribute('data-product-id', item.Magiay)
  cartItem.setAttribute('data-product-color', item.mausac)
  cartItem.setAttribute('data-product-size', item.size)
  const cartItemImg = document.createElement('div');
  cartItemImg.classList.add('header-cart-item-img');
  const img = document.createElement('img');
  img.classList.add('cart-item-img');
  img.src = item.hinhanh;
  img.setAttribute('data-product-id', item.Magiay)
  cartItemImg.appendChild(img);
  cartItem.appendChild(cartItemImg);
  const cartItemTxt = document.createElement('div');
  cartItemTxt.classList.add('header-cart-item-txt', 'p-t-8');
  const nameLink = document.createElement('a');
  nameLink.classList.add('header-cart-item-name', 'm-b-18', 'hov-cl1', 'trans-04', 'cart-name-product');
  nameLink.textContent = item.sanpham + "-" + " " + "size:" + " " + item.size + "-" + " " + "color:" + item.mausac + "-" + " " + "Quantity:" + " " + item.soluong;
  cartItemTxt.appendChild(nameLink);
  const infoSpan = document.createElement('span');
  infoSpan.classList.add('header-cart-item-info');
  infoSpan.textContent = item.gia;
  cartItemTxt.appendChild(infoSpan);
  cartItem.appendChild(cartItemTxt);
  cartItemList.appendChild(cartItem);
}

// show cart
// $('.zmdi-shopping-cart').on('click', () => {
//   axios.get('/show-cart')
//     .then((response) => {
//       console.log(response);
//       if (Array.isArray(response.data)) {
//         response.data.forEach((item) => {
//           itemProduct(item)
//         })
//       } else {
//         console.log("Not data")
//       }

//     })
//     .catch((error) => {
//       console.log(error)
//     })

// })