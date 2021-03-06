import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { createBooking, resetBookingFailParams } from '../../actions/actions';
import Loading from '../../Images/loading_white.gif';
import './CarBooking.css';

function CarBooking({
  car,
  postBooking,
  id,
  carsState,
  history,
  resetBookingFail,
}) {
  function handleBooking() {
    let date = document.querySelector('#date').value;
    if (!date) {
      [date] = [new Date().toISOString().split('T')[0]];
    }

    const book = {
      car_id: car.id,
      user_id: id,
      date,
      city: document.querySelector('#city').value,
    };
    postBooking(book);
  }

  function redirectToDashboard() {
    history.push('/user');
    resetBookingFail();
  }

  function redirectToCars() {
    history.push('/cars');
    resetBookingFail();
  }

  if (carsState.booking_created === true) {
    history.push('/user');
  }

  function scrollToTop() {
    window.scrollTo(0, 0);
  }

  function handleDatePicking() {
    const datePicker = document.querySelector('#date');
    [datePicker.min] = [new Date().toISOString().split('T')[0]];
  }

  return (
    <div className="carBooking">
      <h2>{car.model}</h2>
      <div className="carBooking-main">
        <div className={`car-img ${car.alt}`} />
        <div className="car-content">
          <div className="details">
            <ul className="car-details">
              <li>
                Speed:
                {car.speed}
              </li>
              <li>
                Acceleration:
                {car.acceleration}
              </li>
              <li>
                Height:
                {car.height}
              </li>
              <li>
                Width:
                {car.width}
              </li>
              <li>
                Length:
                {car.length}
              </li>
            </ul>
            <label htmlFor="date">
              Pick a date
              <div className="pick-date">
                <input
                  type="date"
                  name="date"
                  id="date"
                  onClick={handleDatePicking}
                />
              </div>
            </label>

            <div className="pick-city">
              <label htmlFor="city">
                {' '}
                Choose a city
                <select name="city" id="city">
                  <option value="Dakar" selected>
                    Dakar
                  </option>
                  <option value="Paris">Paris</option>
                  <option value="New York">New York</option>
                  <option value="Beijing">Beijing</option>
                  <option value="Berlin">Berlin</option>
                  <option value="London">London</option>
                </select>
              </label>
            </div>
            <button
              type="button"
              className="book-drive-button"
              onClick={() => {
                scrollToTop();
                handleBooking();
              }}
            >
              Book a drive
            </button>
          </div>
        </div>
      </div>
      {carsState.creating_booking ? (
        <div className="creating-booking">
          <h2 className="creating-booking-title">Creating Your Booking...</h2>
          <div className="animation-picture">
            <img src={Loading} alt="Creating your booking" />
          </div>
        </div>
      ) : null}
      {carsState.booking_fail_message ? (
        <div className="booking-fail-message">
          <p>{carsState.booking_fail_message}</p>
          <button
            type="button"
            className="btn btn-success"
            onClick={() => redirectToDashboard()}
          >
            Go To Your Dashboard
          </button>
          <button
            className="btn btn-info"
            type="button"
            onClick={() => redirectToCars()}
          >
            Book Other Cars
          </button>
        </div>
      ) : null}
      <div className="back-to-cars-link-div">
        <Link to="/cars" className="back-to-cars-link">
          {'<< '}
          {' '}
          Back to cars
        </Link>
      </div>
    </div>
  );
}
const mapDispatchToProps = dispatch => ({
  postBooking: book => {
    dispatch(createBooking(book));
  },

  resetBookingFail: () => {
    dispatch(resetBookingFailParams());
  },
});
const mapStateToProps = state => ({
  carsState: state.carsReducer,
  id: state.userReducer.id,
});

CarBooking.propTypes = {
  car: PropTypes.instanceOf(Object).isRequired,
  postBooking: PropTypes.func.isRequired,
  carsState: PropTypes.shape({
    cars: PropTypes.instanceOf(Array),
    isFetching: PropTypes.bool,
    carToShow: PropTypes.instanceOf(Object),
    redirect: PropTypes.bool,
    booking_created: PropTypes.bool,
    creating_booking: PropTypes.bool,
    booking_fail_message: PropTypes.string,
  }).isRequired,
  id: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  resetBookingFail: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(CarBooking));
