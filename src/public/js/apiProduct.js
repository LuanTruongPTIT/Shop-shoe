$(document).ready(() => {
  axios.get("/api/getproduct").then((results) => {
    console.log(results)
    if (results.data) {
      itemExistingCart(results)
    } else {

      // $('.header-cart-wrapitem').html('<span class="noti-delete">There are no products</span>')
      $('.header-cart-wrapitem').append('<div class="cart-view-info"><table id="cart-view"><tr class="mini-cart__empty"><td><img src="https://img.icons8.com/avantgarde/100/null/shopping-cart--v1.png"/></td></tr></table><div id="notification">Hiện chưa có sản phẩm nào!</div></div>');
    }
  }).catch((error) => {
    console.log(error)
  })
})