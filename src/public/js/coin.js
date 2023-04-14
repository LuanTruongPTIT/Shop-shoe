const attendanceReceiveCoin = () => {
  console.log('Da qua ngay moi')
  //Lay ra tat ca cac ngay trong mot tuan hient ai
  const values = $('.daily-checkin-coin').find('>div').map(function () {
    return $(this).find('.pcmall-dailycheckin_2Mb-Qs').text();
  }).get();
  const newValues = values.map((item, index) => {
    const num = parseInt(item.match(/\d+/));
    if (isNaN(num)) {
      return item;
    } else {
      return index;
    }
  })
  console.log(newValues)
  newValues.forEach((item, index) => {
    if (isNaN(item)) {
      // Loai bo css
      $('ul.daily-checkin-coin').children().each(function () {
        if ($(this).find(".pcmall-dailycheckin_2Mb-Qs").text() === 'Hôm nay') {
          $(this).find(".pcmall-dailycheckin_2Mb-Qs").text("Ngày 1")
          $(this).find(".pcmall-dailycheckin_2Mb-Qs").addClass("checkOutDay-quantity ")
          $(this).find(".pcmall-dailycheckin_kSb8S6").addClass("checkOutDay-quantity")
          $(this).find(".pcmall-dailycheckin_1MsvK5").addClass("checkOutDay-coin")
        }
      })
    }
    const dayReceive = new Date().getDay();

    if (item === dayReceive) {
      console.log('lalal')
      $('ul.daily-checkin-coin').children().each(function () {
        if ($(this).find(".pcmall-dailycheckin_2Mb-Qs").data('day') == item) {
          $(this).find(".pcmall-dailycheckin_2Mb-Qs").text("Hôm nay")
          $(this).find(".pcmall-dailycheckin_2Mb-Qs").addClass("color-red")
          $(this).find(".pcmall-dailycheckin_1MsvK5").addClass("background-coin")
        }
      })
    }

  })
}
$(document).ready(() => {

  const today = new Date();
  const startOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());
  console.log(startOfWeek)
  const endOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + (6 - today.getDay()))
  console.log(endOfWeek)
  const id_user = user[0].id
  if (startOfWeek < endOfWeek) {
    axios.get(`/coin-attendance/${id_user}`).then((result) => {
      const items = (result.data.daysOfWeek);
      if (items.length > 0) {
        items.forEach((item) => {
          $('.pcmall-dailycheckin_2Mb-Qs').each(function () {
            const day = parseInt($(this).data('day'));
            if (item === day) {
              $(this).siblings('.pcmall-dailycheckin_1MsvK5').find('img').attr('src', 'https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/dailycheckin/1eb753b5d9a7a3d6b19727a828ca1614.png')
            }
          })
        })
      } else {
        $('.pcmall-dailycheckin_2Mb-Qs').each(function () {
          $(this).siblings('.pcmall-dailycheckin_1MsvK5').find('img').attr('src', 'https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/dailycheckin/21d610e35fb9657fb0bfb43dcfa185af.png')
        })
      }
    }).catch((error) => {
      console.log(error)
    })
  } else {
    attendanceReceiveCoin()
  }
  attendanceReceiveCoin()
})
attendanceReceiveCoin()

$('.pcmall-dailycheckin_3-B7Fy').click(function () {
  const value = parseInt($(this).find('.pcmall-dailycheckin_kSb8S6').text());
  const dayCheck = $(this).find('.pcmall-dailycheckin_2Mb-Qs').attr('data-day');
  console.log(dayCheck);
  const dayReceive = new Date().getDay();
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString();
  const coin = {
    value: value,
    day: formattedDate,
    transaction_type: "Điểm danh",
    status: 'active',
    status_coin: 'earn'
  }
  if (dayCheck == dayReceive) {
    axios.post('/store-coin', coin).then((result) => {
      $(this).find('img').attr('src', 'https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/dailycheckin/1eb753b5d9a7a3d6b19727a828ca1614.png')
    }).catch((error) => {
      console.log(error)
    })
    console.log("hahah")
  } else {
    console.log(alert("Hay chon dung"))
  }
});

// Doi voucher
$('.cXA8AO').on('click', function (event) {
  const elementTarget = $(event.target);
  const code = elementTarget.parents(".VCcvjs").data('code');

  let dynamicModalHtml = '';
  axios.get(`/show/voucherdetail/${code}`).then((results) => {
    const result = results.data;
    console.log(result);
    result.forEach((item) => {
      const date = new Date(item.expiration_date).toLocaleDateString()
      dynamicModalHtml = `<section class="_3znkNl" id="myModal">
      <div class="_1U3IMa"><img class="_3kfKrA" src="${item.img}">
        <h2 class="_2kQJG0"><span class="oPwQ02">Đối tác</span>ÁP DỤNG HÓA ĐƠN TỪ ${item.condition_price_product}đ</h2>
        <div class="pamIRW" id="voucher-coin" data-voucher-coin=${item.voucher_coin}>${item.voucher_coin} Xu</div>
        <div class="_2VYnnl">
          <p class="max-involice">Đơn tối thiểu ₫${item.condition_price_product}</p>
          <p class="min-cost">Capped at ₫${item.discount_value}</p>
          <p class="expiry ">HSD ${date}</p>
          <p class="one-turn">Mỗi người chỉ có duy nhất 01 lượt đổi</p><a class="_16rF__" href="#">Điều Kiện</a>
        </div>
        <div class="_2P82ov"><button class="_24PTPw">Trở Lại</button><button data-code-voucher=${code} id='confirm' class="_14mCXn">Xác nhận</button></div>
      </div>
    </section>`
    })
    $('body').append(dynamicModalHtml);
  })
})

//Doi voucher bang xu
$(document).on('DOMNodeInserted', '#myModal', function () {

  $('#myModal').find('#confirm').on('click', function (event) {
    const now = new Date().toLocaleDateString();
    // const formattedDate = now.getHours().toString().padStart(2, '0') + ':' +
    //   now.getMinutes().toString().padStart(2, '0') + ' ' +
    //   now.getDate().toString().padStart(2, '0') + '-' +
    //   (now.getMonth() + 1).toString().padStart(2, '0') + '-' +
    //   now.getFullYear();
    // console.log(formattedDate);
    const voucher_coin = $('#myModal').find('#voucher-coin').data('voucher-coin');
    const code_voucher = $('#myModal').find('#confirm').data('code-voucher')
    console.log(code_voucher);
    const data = {
      user_id: user[0].id,
      code_voucher: code_voucher,
      coins_received: voucher_coin,
      transaction_time: now,
      transaction_type: 'Đổi voucher',
      status: 'Thành công',
      status_coin: 'Pending'
    }
    axios.post('/api/coin/change-voucher', data).then(async (result) => {
      console.log(result)
      if (result.status == 200) {
        console.log('KKKK')
        Swal.fire(
          'Đã đổi!',
          'Hãy kiểm tra kho voucher của bạn.',
          'success'
        ).then(() => {
          let modal = document.getElementById('myModal');
          modal.style.display = 'none';
        });
      }

    })
    const codes = $('.VCcvjs');
    codes.forEach((code) => {
      if (code.data('code') === code_voucher) {
        code.attr("disabled", true);
      }
    })
  });
});
