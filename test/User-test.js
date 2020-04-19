import chai from 'chai';
const expect = chai.expect;

import User from '../src/User';
import Booking from '../src/Booking';


describe('User', () => {
  let user;
  let booking1;
  let booking2;
  let room12;
  let room20;
  let room34;
  let rooms;

  beforeEach(() => {
    user = new User({"id":1,"name":"Leatha Ullrich"});
    booking1 = new Booking({
      "id":"5fwrgu4i7k55hl6t8",
      "userID":1,
      "date":"2020/02/05",
      "roomNumber":12,
      "roomServiceCharges":[]
    });
    booking2 = new Booking({
      "id":"5fwrgu4i7k55hl6x8",
      "userID":1,
      "date":"2020/01/11",
      "roomNumber":20,
      "roomServiceCharges":[]
    });
    room12 = {
      "number":12,
      "roomType":"single room",
      "bidet":false,
      "bedSize":"twin",
      "numBeds":2,
      "costPerNight":172.09
    };
    room20 = {
      "number":20,
      "roomType":"residential suite",
      "bidet":false,
      "bedSize":"queen",
      "numBeds":1,
      "costPerNight":343.95
    };
    room34 = {
      "number":34,
      "roomType":"residential suite",
      "bidet":true,
      "bedSize":"twin",
      "numBeds":2,
      "costPerNight":322.34
    }
    rooms = [room12, room20, room34]
  });

  it('should be a function', () => {
    expect(User).to.be.a('function');
  });

  it('should be an instance of the User class', () => {
    expect(user).to.be.an.instanceOf(User);
  });

  it('should have an id number', () => {
    expect(user.id).to.equal(1);
  });

  it('should have a name', () => {
    expect(user.name).to.equal('Leatha Ullrich');
  });

  it('should have a list of their bookings', () => {
    expect(user.myBookings).to.deep.equal([]);
  });

  it('should have a name for login', () => {
    expect(user.login).to.equal('customer1');
  });

  it('should have a password for logging in', () => {
    expect(user.password).to.equal('overlook2020');
  });

  it('should be able to add to their list of bookings', () => {
    expect(user.myBookings.length).to.equal(0);
    user.addToMyBookings(booking1);
    expect(user.myBookings.length).to.equal(1)
  });

  it('should be able to create a booking', () => {
    expect(user.myBookings.length).to.equal(0);
    user.createBooking(booking1);
    expect(user.myBookings.length).to.equal(1)
    expect(user.myBookings).to.deep.equal([{
      "id":"5fwrgu4i7k55hl6t8",
      "userID":1,
      "date":"2020/02/05",
      "roomNumber":12,
      "roomServiceCharges":[]
    }])
  });

  it('should be able to calculate the amount spent on bookings', () => {
    expect(user.myBookings).to.deep.equal([]);
    user.createBooking(booking1);
    user.createBooking(booking2)
    expect(user.myBookings.length).to.equal(2)
    expect(user.calculateAmountSpent(rooms)).to.equal(516.04)
  });
});