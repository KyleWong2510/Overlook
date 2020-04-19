import $ from 'jquery';

let domUpdates = {
  
  showPage() {
    for (let i = 0; i < 51; i++) {
      if($('#username-input').val() === 'customer1' && $('#password-input').val() === 'overlook2020') {
        $('.login').addClass('hide');
        $('.guest-page').removeClass('hide');
      }
    } 
    if($('#username-input').val() === 'manager' && $('#password-input').val() === 'overlook2020') {
      $('.login').addClass('hide');
      $('.manager-page').removeClass('hide')
    }
  },

  displayManagerInfo(hotel) {
    $('#revenue').text(`$${hotel.calculateTotalRevenue()}`);
    $('#num-rooms').text(hotel.roomsAvailable.length);
    $('#percentage').text(hotel.calculatePercentOccupied())
  },

  displayCurrentBookings(hotel) {
    hotel.todaysBookings.forEach(booking => {
      $(`<div class='curr-booking-card'>
        <p>${booking.id}<p> 
        <p>UserID: ${booking.userID}</p>
        <p>Room: ${booking.roomNumber}</p>
      <div>`)
        .appendTo('#current-bookings-title')
    })
    
  }

}

export default domUpdates