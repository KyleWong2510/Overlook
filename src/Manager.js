class Manager {
  constructor() {
    this.login = 'manager';
    this.password = 'overlook2020'
  }

  // searchUserName(allUsers, userName) {
  //   let newUser;
  //   allUsers.forEach(user => {
  //     if(user.name !== userName) {
  //       return 
  //     } else {
  //       newUser = new User(user);
  //     }
  //   })
  //   return newUser
  // }
  
  //NO BOOKING ID OR OTHER INFO?
  createBookingForGuest(userId, todayDate, roomNum) {
    let booking = {
      'userID': Number(userId),
      'date': todayDate,
      'roomNumber': Number(roomNum),
    }
    let url = 'https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings';
    return fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(booking),
      })
      .then(response => console.log(response.json()))
      .catch(error => console.error(error));
  }
  
  cancelBooking(bookingID) {
    let url = 'https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings';
    return fetch(url, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({id: Number(bookingID)})
    })
      .then(console.log('deleted'))
      .catch(error => console.error(error));

  }
}




export default Manager