import chai from 'chai';
const expect = chai.expect;

import Hotel from '../src/Hotel.js';

describe('Hotel', () => {
  let hotel;
  let rooms;
  let bookings;
  let date;

  beforeEach(() => {
    hotel = new Hotel();
    rooms = [
      {"number":1,"roomType":"residential suite","bidet":true,"bedSize":"queen","numBeds":1,"costPerNight":358.4},
      {"number":2,"roomType":"suite","bidet":false,"bedSize":"full","numBeds":2,"costPerNight":477.38},
      {"number":3,"roomType":"single room","bidet":false,"bedSize":"king","numBeds":1,"costPerNight":491.14},
      {"number":4,"roomType":"single room","bidet":false,"bedSize":"queen","numBeds":1,"costPerNight":429.44},
      {"number":5,"roomType":"single room","bidet":true,"bedSize":"queen","numBeds":2,"costPerNight":340.17}
    ];
    bookings = [
      {"id":"5fwrgu4i7k55hl6sz","userID":9,"date":"2020/02/04","roomNumber":1,"roomServiceCharges":[]},
      {"id":"5fwrgu4i7k55hl6t5","userID":43,"date":"2020/01/10","roomNumber":2,"roomServiceCharges":[]},
      {"id":"5fwrgu4i7k55hl6t6","userID":13,"date":"2020/01/10","roomNumber":5,"roomServiceCharges":[]},
      {"id":"5fwrgu4i7k55hl4f6","userID":11,"date":"2020/01/04","roomNumber":3,"roomServiceCharges":[]},
      {"id":"5fwrgu4i5k75hl4f6","userID":37,"date":"2020/01/14","roomNumber":4,"roomServiceCharges":[]}
    ];
    date = '2020/01/10';
  });

  it('should be a function', () => {
    expect(Hotel).to.be.a('function');
  });

  it('should be an instance of the Hotel class', () => {
    expect(hotel).to.be.an.instanceOf(Hotel);
  });

  it('should be able to hold all rooms', () => {
    expect(hotel.allRooms).to.deep.equal([]);
    hotel.pushAllRooms(rooms);
    expect(hotel.allRooms.length).to.equal(5)
  });

  it('should be able to hold all bookings', () => {
    expect(hotel.allBookings).to.deep.equal([]);
    hotel.pushAllBookings(bookings);
    expect(hotel.allBookings.length).to.equal(5)
  });

  it('should be able to show how many rooms are booked', () => {
    expect(hotel.roomsBooked).to.deep.equal([]);
    hotel.pushAllRooms(rooms);
    hotel.pushAllBookings(bookings);
    hotel.filterRoomsBooked(date);
    expect(hotel.roomsBooked.length).to.equal(2)
  });  
  
  it('should be able to show how many rooms are available', () => {
    expect(hotel.roomsAvailable).to.deep.equal([]);
    hotel.pushAllRooms(rooms);
    hotel.pushAllBookings(bookings);
    hotel.filterRoomsAvailable(date);
    expect(hotel.roomsAvailable.length).to.equal(3)

  });  
  
  it('should be able to show upcoming bookings', () => {
    expect(hotel.upcomingBookings).to.deep.equal([]);
    hotel.pushAllRooms(rooms);
    hotel.pushAllBookings(bookings);
    hotel.filterUpcomingBookings(date);
    expect(hotel.upcomingBookings).to.deep.equal([{
      "id":"5fwrgu4i7k55hl6sz",
      "userID":9,
      "date":"2020/02/04",
      "roomNumber":1,
      "roomServiceCharges":[]
    }, {
      "id":"5fwrgu4i5k75hl4f6",
      "userID":37,
      "date":"2020/01/14",
      "roomNumber":4,
      "roomServiceCharges":[]
    }
  ])
  });  
  
  it('should be able to show current bookings', () => {
    expect(hotel.todaysBookings).to.deep.equal([]);
    hotel.pushAllRooms(rooms);
    hotel.pushAllBookings(bookings);
    hotel.filterCurrentBookings(date);
    expect(hotel.todaysBookings.length).to.equal(2)
  });  
  
  it('should be able to show past bookings', () => {
    expect(hotel.pastBookings).to.deep.equal([]);
    hotel.pushAllRooms(rooms);
    hotel.pushAllBookings(bookings);
    hotel.filterPastBookings(date);
    expect(hotel.pastBookings.length).to.equal(1)
  });  
  
  it('should be able to calculate revenue for today', () => {
    hotel.pushAllRooms(rooms);
    hotel.pushAllBookings(bookings);
    hotel.filterRoomsBooked(date);
    hotel.filterCurrentBookings(date);
    expect(hotel.calculateTotalRevenue()).to.equal(817.55)
  });

  it('should be able to calculate the percentage of occupied rooms', () => {
    hotel.pushAllRooms(rooms);
    hotel.pushAllBookings(bookings);
    hotel.filterRoomsBooked(date);
    expect(hotel.calculatePercentOccupied()).to.equal('40%')
  });
});