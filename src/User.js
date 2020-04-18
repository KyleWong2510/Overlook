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
  createBooking() {
    let newBooking = new Booking()
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