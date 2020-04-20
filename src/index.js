import $ from 'jquery';
import './css/base.scss';
import domUpdates from './DomUpdates';
import Hotel from './Hotel';

let usersData;
let roomsData;
let bookingsData;

let hotel;

let today = '2020/04/19'

const hotelHandler = (date) => {
  hotel.filterRoomsBooked(date)
  hotel.filterRoomsAvailable()
  hotel.filterUpcomingBookings(date)
  hotel.filterCurrentBookings(date)
  hotel.filterPastBookings(date)
  hotel.calculateTotalRevenue()
  hotel.calculatePercentOccupied()
}

const createHotel = (usersData, roomsData, bookingsData) => {
  hotel = new Hotel(usersData, roomsData, bookingsData);
  console.log(hotel)
}

const managerHandler = (hotel) => {
  domUpdates.displayManagerInfo(hotel)
  domUpdates.displayCurrentBookings(hotel)
  domUpdates.displayAvailableRooms(hotel)
}

const fetchData = () => {
  usersData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users')
    .then(response => response.json())
    .catch(error => console.error(error));

  roomsData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms')
    .then(response => response.json())
    .catch(error => console.error(error))

  bookingsData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings')
    .then(response => response.json())
    .catch(error => console.error(error))
  
  return Promise.all([usersData, roomsData, bookingsData])
    .then(response => {
      usersData = response[0].users;
      roomsData = response[1].rooms;
      bookingsData = response[2].bookings;
      createHotel(usersData, roomsData, bookingsData)
    })
    .then(() => {
      hotelHandler(today)
      managerHandler(hotel)
    })
    .catch(error => console.error(error));
}


$('#login-btn').click(domUpdates.showPage);




fetchData()