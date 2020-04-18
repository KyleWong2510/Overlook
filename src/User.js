import Booking from '../src/Booking';

class User {
  constructor({id, name}) {
    this.id = id;
    this.name = name;
    this.myBookings = [];
    this.login = `customer${id}`;
    this.password = 'overlook2020'
  }

  addToMyBookings(booking) {
    this.myBookings.push(booking)
  }

//WHAT TO DO HERE?
  createBooking(id, userID, date, roomNumber, roomServiceCharges) {
    let newBooking = new Booking(id, userID, date, roomNumber, roomServiceCharges)
    this.addToMyBookings(newBooking)
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