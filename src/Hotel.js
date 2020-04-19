class Hotel {
  constructor() {
    this.allRooms = [];
    this.roomsBooked = [];
    this.roomsAvailable = [];
    this.allBookings = [];
    this.pastBookings = [];
    this.todaysBookings = [];
    this.upcomingBookings = [];
  }

  pushAllRooms(rooms) {
    rooms.forEach(room => this.allRooms.push(room))
  };

  pushAllBookings(bookings) {
    bookings.forEach(booking => this.allBookings.push(booking))
  };
  
  filterRoomsBooked(date) {
    this.allBookings.forEach(booking => {
      return this.allRooms.forEach(room => {
        if(booking.date === date && booking.roomNumber === room.number) {
          this.roomsBooked.push(room)
        } 
      })
    })
  }

  filterRoomsAvailable(date) {
    this.roomsAvailable = this.allBookings.filter(booking => booking.date !== date)
    // this.allBookings.forEach(booking => {
    //   this.allRooms.forEach(room => {
    //     if (booking.date !== date) {
    //       this.roomsAvailable.push(room)
    //     }
    //   })
    // })
  }

  filterUpcomingBookings(date) {
    this.upcomingBookings = this.allBookings.filter(booking => booking.date > date)
  }

  filterCurrentBookings(date) {
    this.todaysBookings = this.allBookings.filter(booking => booking.date === date)
  }

  filterPastBookings(date) {
    this.pastBookings = this.allBookings.filter(booking => booking.date < date)
  }

  calculateTotalRevenue() {
    return this.todaysBookings.reduce((revenue, booking) => {
      this.roomsBooked.forEach(room => {
        if(booking.roomNumber === room.number) {
          revenue += room.costPerNight
        }
      })
      return revenue
    }, 0)
  }

  calculatePercentOccupied() {
    let percent = this.roomsBooked.length / this.allRooms.length
    return `${percent * 100}%`
  }
}

export default Hotel