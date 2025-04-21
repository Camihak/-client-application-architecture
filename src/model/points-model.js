import { mockDestinations } from "../mock/destinations.js";
import { mockOffers } from "../mock/offers.js";
import { mockPoints } from "../mock/points.js";

export default class PointsModel {
  init() {
    this.destinations = mockDestinations;
    this.offers = mockOffers;
    this.points = mockPoints;
  }

  getPoints() {
    return this.points;
  }

  getDestinations() {
    return this.destinations;
  }

  getOffers() {
    return this.offers;
  }
}
