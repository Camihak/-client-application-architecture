import PointsListView from '../view/points-list-view.js';
import AddPointView from '../view/add-point-view.js';
import EditPointView from '../view/edit-point-view.js';
import PointView from '../view/point-view.js';
import {render} from '../render.js';

export default class PointsListPresenter {
  pointsListComponent = new PointsListView();

  constructor(pointsListContainer) {
    this.pointsListContainer = pointsListContainer;
  }

  init() {
    render(this.pointsListComponent, this.pointsListContainer);
    render(new EditPointView(), this.pointsListComponent.getElement());
    for (let i = 0 ; i < 3; i++) {
      render(new PointView(), this.pointsListComponent.getElement());
    }
    render(new AddPointView(), this.pointsListComponent.getElement());
  }
}
