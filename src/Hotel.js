class Hotel {
  constructor(usersData, roomsData, bookingsData) {
    this.allUsers = usersData;
    this.allRooms = roomsData;
    this.roomsBooked = [];
    this.roomsAvailable = [];
    this.allBookings = bookingsData;
    this.pastBookings = [];
    this.todaysBookings = [];
    this.upcomingBookings = [];
  }

  // pushAllRooms(rooms) {
  //   rooms.forEach(room => this.allRooms.push(room))
  // };

  // pushAllBookings(bookings) {
  //   bookings.forEach(booking => this.allBookings.push(booking))
  // };
  
  filterRoomsBooked(date) {
    this.allBookings.forEach(booking => {
      return this.allRooms.forEach(room => {
        if(booking.date === date && booking.roomNumber === room.number) {
          this.roomsBooked.push(room)
        } 
      })
    })
  }

  filterRoomsAvailable() {
    // let inactiveBookings = this.allBookings.filter(booking => booking.date !== date)
    this.roomsAvailable = this.allRooms.filter(room => !this.roomsBooked.includes(room))
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
      // let total = revenue.tofixed(2)
      return revenue
    }, 0)
  }

  calculatePercentOccupied() {
    let percent = this.roomsBooked.length / this.allRooms.length
    return `${percent * 100}%`
  }
}

export default Hotel