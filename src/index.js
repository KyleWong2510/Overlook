import $ from 'jquery';
import './css/base.scss';
import domUpdates from './DomUpdates';
import Hotel from './Hotel';
import User from './User';

let usersData;
let roomsData;
let bookingsData;
let currentUser;
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

const createUser = () => {
  currentUser = new User({"id":2,"name":"Rocio Schuster"})
}

const createHotel = (usersData, roomsData, bookingsData) => {
  hotel = new Hotel(usersData, roomsData, bookingsData);
}

const managerHandler = (hotel) => {
  domUpdates.displayManagerInfo(hotel)
  domUpdates.displayCurrentBookings(hotel)
  domUpdates.displayAvailableRooms(hotel, '#manager-main-title')
}

const userHandler = (user, hotel) => {
  user.addToMyBookings(hotel.allBookings)
  user.calculateAmountSpent(hotel.allRooms)
  domUpdates.displayAmountSpent(user, hotel)
  domUpdates.displayMyBookings(user)
  console.log(currentUser)
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
      createUser()
    })
    .then(() => {
      hotelHandler(today)
      managerHandler(hotel)  
      userHandler(currentUser, hotel)
    })
    .catch(error => console.error(error));
}

const loadUser = () => {
  // currentUser = hotel.allUsers.find(user => user.login === $('#username-input'))
  // createUser(currentUser)
  domUpdates.showPage()
}
const guestAvailableRooms = () => {
  domUpdates.displayAvailableRooms(hotel, '#guest-main-display')
}

const displayBookingForm = () => {
  $('#guest-main-display').addClass('hide')
  $('.booking-form').removeClass('hide')
}

$('#login-btn').click(loadUser);

$('#browse-rooms-btn').click(guestAvailableRooms)

$('#book-room-btn').click(displayBookingForm)

fetchData()