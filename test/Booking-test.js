import chai from 'chai';
const expect = chai.expect;

import Booking from '../src/Booking';

describe('Booking', function() {
  
  let booking;
  
  beforeEach(() => {
    booking = new Booking(
      "5fwrgu4i7k55hl6t8",
      1,
      "2020/02/05",
      12,
      []
    )
  });
  
  it('should be a function', () => {
    expect(Booking).to.be.a('function');
  });

  it('should be an instance of the Booking class', () => {
    expect(booking).to.be.an.instanceOf(Booking);
  });

  it('should have an id', () => {
    expect(booking.id).to.equal('5fwrgu4i7k55hl6t8');
  });

  it('should be tied to a users id', () => {
    expect(booking.userID).to.equal(1);
  });

  it('should be have a date', () => {
    expect(booking.date).to.equal("2020/02/05");
  });

  it('should be booked for a specific room number', () => {
    expect(booking.roomNumber).to.equal(12);
  });

  it('should be have a list of all charges made to that room', () => {
    expect(booking.roomServiceCharges).to.deep.equal([]);
  });
});