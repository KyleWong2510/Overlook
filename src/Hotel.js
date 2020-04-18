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
    this.allBookings.filter(booking => {
      booking.date !== date
    })
    this.allRooms.forEach(room => {
      
    })
  }
}

export default Hotel