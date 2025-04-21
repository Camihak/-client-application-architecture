import dayjs from 'dayjs';
import { createElement } from '../render';

const DATE_FORMAT = 'D MMM';
const TIME_FORMAT = 'HH:mm';

function createOffersTemplate(offers) {
  let offersList = '';
  if (offers.length != 0) {
    offersList += `<ul class="event__selected-offers">`;
    for (let i = 0; i < offers.length; i++) {
      offersList += `<li class="event__offer"><span class="event__offer-title">${offers[i].title}</span>&plus;&euro;&nbsp;<span class="event__offer-price">${offers[i].price}</span></li>`;
    }
    offersList += `</ul>`
  }
  return offersList;
}

function getTransportPhoto(pictures) {
  let transportPhoto;
  pictures.forEach((picture) => transportPhoto = picture.src);
  return transportPhoto;
}

function getDispatchDate(dateFrom) {
  return dateFrom ? dayjs(dateFrom).format(DATE_FORMAT): '';
}

function getDepartureTime(dateFrom){
    return dayjs(dateFrom).format(TIME_FORMAT);
}

function getArrivalTime(dateFrom, dateTo) {
  if (dayjs(dateFrom).format(DATE_FORMAT) === dayjs(dateTo).format(DATE_FORMAT)) {
    return dayjs(dateTo).format(TIME_FORMAT);
  }
  return dayjs(dateTo).format(DATE_FORMAT + ' ' + TIME_FORMAT);
}

function getTravelTime(dateFrom, dateTo) {
  let travelTime = '';
  const daysNumber = dayjs(dateTo).diff(dayjs(dateFrom), 'd');
  const hoursNumber = dayjs(dateTo).diff(dayjs(dateFrom), 'h') % 24;
  const minutesNumber = dayjs(dateTo.slice(0,16)).diff(dayjs(dateFrom.slice(0,16)), 'm') % 60;
  if (daysNumber === 1) {
    travelTime += '1 DAY ';
  } else if (daysNumber > 1) {
    travelTime += `${daysNumber} DAYS `;
  }
  if (hoursNumber === 1) {
    travelTime += '1 HOUR ';
  } else if (hoursNumber > 1) {
    travelTime += `${hoursNumber} HOURS `;
  }
  (minutesNumber > 0) ? travelTime += `${minutesNumber} MIN `:'';
  return travelTime;
}

function createPointTemplate(point, offers, destanation) {
  const {basePrice, isFavorite, type, dateFrom, dateTo} = point;

  const {name, pictures} = destanation;
  return (
    `<li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="${dateFrom}">${getDispatchDate(dateFrom)}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="${getTransportPhoto(pictures)}" alt="Event type icon">
      </div>
      <h3 class="event__title">${type} ${name}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${dayjs(dateFrom).format('YYYY-MM-DD'+'T'+TIME_FORMAT)}">${getDepartureTime(dateFrom)}</time>
          &mdash;
          <time class="event__end-time" datetime="${dayjs(dateTo).format('YYYY-MM-DD'+'T'+TIME_FORMAT)}">${getArrivalTime(dateFrom, dateTo)}</time>
        </p>
        <p class="event__duration">${getTravelTime(dateFrom, dateTo)}</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      ${createOffersTemplate(offers)}
      <button class="event__favorite-btn ${(isFavorite) ? 'event__favorite-btn--active': ''}" type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`
  );
}

export default class PointView {

  constructor(point, offers, destinations) {
    this.point = point;
    this.offersElements = offers;
    this.destinations = destinations;
  }

  getTemplate() {
    const destination = this.destinations.find((destination) => destination.id === this.point.destination);
    let currentOffers = [];
    this.offersElements.forEach((offerElement) => {
      offerElement.offers.forEach((offer) => {
        if (this.point.offers.includes(offer.id)) {
          currentOffers.push(offer);
        }
      })
    })
    return createPointTemplate(this.point, currentOffers, destination);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
