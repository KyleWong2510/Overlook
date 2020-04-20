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
  createBooking(booking) {
    let newBooking = new Booking(booking)
    this.myBookings.push(booking)
    return newBooking
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