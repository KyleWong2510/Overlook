import $ from 'jquery';
import './css/base.scss';
import domUpdates from './DomUpdates';
import Hotel from './Hotel';
import User from './User';
import Manager from './Manager';

let usersData;
let roomsData;
let bookingsData;
let currentUser;
let searchedUser;
let manager;
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

const createManager = () => {
  manager = new Manager()
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
  domUpdates.displayAvailableRooms(hotel.roomsAvailable, '#manager-main-title')
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
      createManager()
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
  $('.booking-form-section').addClass('hide')
  $('.guest-main-display').removeClass('hide')
  domUpdates.displayAvailableRooms(hotel.roomsAvailable, '.guest-main-display')
  $('#select-date-input').val('')
  $('#card-holder').html('')
  $('.book-this-room').addClass('hide')
}

const displayBookingForm = () => {
    $('.guest-main-display').addClass('hide')
    $('.booking-form-section').removeClass('hide')
}

const filterRoomsOnDate = (hotel) => {
  console.log('filterroomsondate')
  let formattedDate = $('#select-date-input').val().split('-').join('/')
  let roomsBookedOnDate = hotel.allBookings
    .filter(booking => booking.date === formattedDate)
    .map(booking => booking.roomNumber)
  console.log('rooms on date', roomsBookedOnDate)
  return hotel.allRooms.filter(room => !roomsBookedOnDate.includes(room.number))
}

// ADD MORE
const displayDateError = () => {
  alert('You must select a valid date')
}

const displayRoomsOnDate = () => {
  if($('#select-date-input').val()) {
    $('#card-holder').html('');
    let available = filterRoomsOnDate(hotel)
    console.log(available)
    domUpdates.displayAvailableRooms(available, '#card-holder')
  } else {
    displayDateError()
  }
}

const filterByRoomType = (arr, type) => {
  console.log('120', arr)
  return arr.filter(room => room.roomType === type)
}

const getFilteredRooms = (hotel) => {
  let rooms = filterRoomsOnDate(hotel)
  console.log("125", rooms)
  console.log('value', $('#room-option').val())
  console.log('e.t.', event.target)
  //need to access the selected el and put where room-option is...
  if($('#room-option').val() === 'residential-suite') {
    console.log('hi')
    let h = filterByRoomType(rooms, 'residential suite')
    console.log('h', h)
    return filterByRoomType(rooms, 'residential suite')
  } 
  if($('#room-option').val() === 'suite') {
    return filterByRoomType(rooms, 'suite')
  }
  if($('#room-option').val() === 'junior-suite') {
    return filterByRoomType(rooms, 'junior suite')
  }
  if($('#room-option').val() === 'single') {
    return filterByRoomType(rooms, 'single')
  }
}

const displayFilteredRooms = () => {
  $('#card-holder').html('')
  console.log('event', event)
  let rooms = getFilteredRooms(hotel)  
  console.log('rooms', rooms)
  domUpdates.displayAvailableRooms(rooms, '#card-holder')
}

const userCreateBooking = () => {
  let date = $('#select-date-input').val().split('-').join('/');
  let roomNum = event.target.parentNode.id
  currentUser.createBooking(date, roomNum)
  $('#select-date-input').val('')
  domUpdates.displayConfirmation('.booking-form-section')
}

//search bar for user returns user object
const getSearchedUser = () => {
  let found = hotel.allUsers.find(user => user.name === $('#search-user-input').val())
  searchedUser = new User(found)
}

//hide #manager-main-title
//show .found-user 
//fill .found-user with searched user info
const displaySearchedUserInfo = () => {
  getSearchedUser()
  $('#manager-main-title').addClass('hide') 
  $('.found-user').removeClass('hide')
  userHandler(searchedUser, hotel)
  domUpdates.displayDeleteButton()
  console.log(searchedUser)
}

const mgrDisplayRoomsOnDate = () => {
  if($('#select-date-input').val()) {
    $('#mgr-card-holder').html('');
    let available = filterRoomsOnDate(hotel)
    console.log(available)
    domUpdates.mgrDisplayAvailableRooms(available, '#mgr-card-holder')
  } else {
    displayDateError()
  }
}

const managerCreateBooking = () => {
  let date = $('#select-date-input').val().split('-').join('/');
  let roomNum = event.target.parentNode.id
  manager.createBookingForGuest(searchedUser.id, date, roomNum)
  $('#select-date-input').val('')
  domUpdates.displayConfirmation('#mgr-card-holder')
}

const deleteBooking = () => {
  let id = event.target.parentNode.id
  console.log(id)
  manager.cancelBooking(id)
}

$('#mgr-select-date-btn').click(mgrDisplayRoomsOnDate)
$('#search-user-btn').click(displaySearchedUserInfo)
$(document).on('click', '#filter-btn', displayFilteredRooms)
// ('#filter-btn').click(displayFilteredRooms)
$('#login-btn').click(loadUser);
$('#browse-rooms-btn').click(guestAvailableRooms)
$('#book-room-btn').click(displayBookingForm)
$('#select-date-btn').click(displayRoomsOnDate)
$(document).on('click', '.book-this-room', userCreateBooking)
$(document).on('click', '.mgr-book-this-room', managerCreateBooking)
$(document).on('click', '#delete', deleteBooking)

//WORK ON THIS FILTER BY ROOM TYPE!!!

$('#room-option').click(displayFilteredRooms)

fetchData()


