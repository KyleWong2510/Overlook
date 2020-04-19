import chai from 'chai';
const expect = chai.expect;

import Manager from '../src/Manager';
import User from '../src/User';
import Booking from '../src/Booking';


describe('Manager', function() {

  let user1;
  let user2;
  let allUsers;
  let manager;
  let booking;
  let date;
  
  beforeEach(() => {
    user1 = new User({"id":1, "name":"Leatha Ullrich"});
    user2 = new User({"id":2,"name":"Rocio Schuster"});
    allUsers = [user1, user2];
    manager = new Manager();
    booking = new Booking({
      "id":"5fwrgu4i7k55hl6t8",
      "userID":1,
      "date":"2020/02/05",
      "roomNumber":12,
      "roomServiceCharges":[]
    });
    date = "2020/02/05"
  })

  it('should be a function', () => {
    expect(Manager).to.be.a('function');
  });

  it('should be an instance of the Manager class', () => {
    expect(manager).to.be.an.instanceOf(Manager);
  });

  it('should have a login name', () => {
    expect(manager.login).to.equal('manager');
  });

  it('should have its own password', () => {
    expect(manager.password).to.equal('overlook2020');
  });

  // it('should be able to search a user by name', () => {
  //   expect(manager.searchUserName(allUsers,'Leatha Ullrich')).to.equal({
  //     id: 1,
  //     name: 'Leatha Ullrich',
  //     myBookings: [],
  //     login: 'customer1',
  //     password: 'overlook2020'
  //   });
  // });
  
  it('should be able to make a booking for a user', () => {
    expect(manager.createBookingForGuest("5fwrgu4i7k55hl6t8", 1, date, 12)).to.equal(booking);
  });

  it('should be able to cancel a booking', () => {
    manager.cancelBooking()
  });



});