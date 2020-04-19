import Booking from '../src/Booking';

class User {
  constructor(user) {
    this.id = user.id;
    this.name = user.name;
    this.myBookings = [];
    this.login = `customer${user.id}`;
    this.password = 'overlook2020'
  }

  addToMyBookings(booking) {
    this.myBookings.push(booking)
  }

//WHAT TO DO HERE? POST NEEDED
  createBooking(booking) {
    let newBooking = new Booking(booking)
    this.addToMyBookings(newBooking)
    return newBooking
  }

  calculateAmountSpent() {
    this.myBookings.reduce((total, booking) => {
      if (booking.roomNumber === room.number) {
        total += room.costPerNight
      }
      return total
    }, 0)
  }
}

export default User