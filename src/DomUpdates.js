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
  },

  displayAvailableRooms(hotel) {
    hotel.roomsAvailable.forEach(room => {
      $(`<div class='curr-booking-card'>
        <div class='card-half'>
          <span>Room: ${room.number}</span>
          <span>Type: ${room.roomType}</span>
          <span>Bidet: ${room.bidet}</span>
        </div>
        <div class='card-half'>
          <span>Bed Count: ${room.numBeds}</span>
          <span>Bed Size: ${room.bedSize}</span>
          <span>Cost per Night: ${room.costPerNight}</span>
        </div>
      </div>`)
        .appendTo('#manager-main-title')
    })
  },

  // searchUsersByName(hotel) {
  //   let foundUser = hotel.allUsers.filter(user => user.name === $('#search-user-input').val());
  //   $('.found-user').html(`
  //     <h3>${foundUser.name}</h3>
  //     <div class='curr-booking-card'>

  //     </div>
  //   `)
    
  //   $('#manager-main-title').addClass('hide')
  //   $('.found-user').removeClass('hide')
  // }
}

export default domUpdates