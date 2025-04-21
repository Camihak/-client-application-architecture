import PointsListView from '../view/points-list-view.js';
import AddPointView from '../view/add-point-view.js';
import EditPointView from '../view/edit-point-view.js';
import PointView from '../view/point-view.js';
import {render} from '../render.js';

export default class PointsPresenter {
  pointsListComponent = new PointsListView();

  constructor(pointsListContainer, pointsModel) {
    this.pointsListContainer = pointsListContainer;
    this.pointsModel = pointsModel;
  }

  init() {
    const points = this.pointsModel.getPoints();
    const offers = this.pointsModel.getOffers();
    const destinations = this.pointsModel.getDestinations();

    render(this.pointsListComponent, this.pointsListContainer);
    render(new EditPointView(points[0], offers, destinations), this.pointsListComponent.getElement());

    points.forEach((point) => {
      render(new PointView(point, offers, destinations), this.pointsListComponent.getElement());
    })

    render(new AddPointView(), this.pointsListComponent.getElement());
  }
}
