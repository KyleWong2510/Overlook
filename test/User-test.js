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

  beforeEach(() => {
    user = new User({"id":1, "name":"Leatha Ullrich"})
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
    }
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
    expect(user.myBookings.length).to.deep.equal([]);
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
    user.createBooking();
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
    expect(user.createBooking()).to.equal(booking1);
    expect(user.createBooking()).to.equal(booking2);
    expect(user.myBookings.length).to.equal(2)
    expect(calculateAmountSpent()).to.equal(516.04)
  });
});