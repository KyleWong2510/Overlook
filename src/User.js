import Booking from '../src/Booking';

class User {
  constructor(user) {
    this.id = user.id;
    this.name = user.name;
    this.myBookings = [];
    this.login = `customer${user.id}`;
    this.password = 'overlook2020'
  }

  addToMyBookings(bookingsData) {
    this.myBookings = bookingsData.filter(booking => booking.userID === this.id)
  }

//WHAT TO DO HERE? POST NEEDED
  createBooking(todayDate, roomNum) {
    let newBooking = {
      'userID': Number(this.id),
      'date': todayDate,
      'roomNumber': Number(roomNum),
    }
    this.myBookings.push(newBooking)
    
    let url = 'https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings';
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newBooking),
    })
    .then(response => console.log(response.json()))
      .catch(error => console.error(error));
  }

  calculateAmountSpent(roomsData) {
    return this.myBookings.reduce((total, booking) => {
      roomsData.forEach(room => {
        if (booking.roomNumber === room.number) {
          total += room.costPerNight
        }
      })
      return total
    }, 0)
  }
}

export default User