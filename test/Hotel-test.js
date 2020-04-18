import chai from 'chai';
const expect = chai.expect;

import Hotel from '../src/Hotel.js';

describe('Hotel', () => {
  it('should be a function', () => {
    expect(Hotel).to.be.a('function');
  });

  it('should be an instance of the Hotel class', () => {
    expect(hotel).to.be.an.instanceOf(Hotel);
  });

  it('should be able to hold all rooms', () => {
    expect(hotel.allRooms).to.deep.equal([]);
  });

  it('should be able to hold all bookings', () => {
    expect(hotel.allBookings).to.deep.equal([]);
  });

  it('should be able to show how many rooms are booked', () => {
    expect(hotel.roomsBooked).to.deep.equal([]);
    hotel.filterRooms()

  });  
  
  it('should be able to show how many rooms are available', () => {
    expect(hotel.roomsAvailable).to.deep.equal([]);
    hotel.filterRooms()

  });  
  
  it('should be able to show upcoming bookings', () => {
    expect(hotel.upcomingBookings).to.deep.equal([]);
    hotel.filterBookings()

  });  
  
  it('should be able to show current bookings', () => {
    expect(hotel.allRooms).to.deep.equal([]);
  });  
  
  it('should be able to show past bookings', () => {
    expect(hotel.allRooms).to.deep.equal([]);
  });  
  
  it('should be able to calculate revenue for today', () => {
    expect(hotel.allRooms).to.deep.equal([]);
  });

  it('should be able to calculate the percentage of occupied rooms', () => {
    expect(hotel.allRooms).to.deep.equal([]);
  });
});