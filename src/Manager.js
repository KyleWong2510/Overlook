import User from "./User";
import Booking from "./Booking";

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
  
  createBookingForGuest(bookingID, userId, todayDate, roomNum) {
    // let foundUser = allUsers.find(user => user.name === userName)
    // console.log(foundUser)
    let newBooking = new Booking({
      'id': bookingID,
      'userID': userId,
      'date': todayDate,
      'roomNumber': roomNum,
    })
    return newBooking
  }
  
  cancelBooking() {

  }


}

export default Manager