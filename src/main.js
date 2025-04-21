import FilterView from './view/filter-view.js';
import SortView from './view/sort-view.js';
import PointsPresenter from './presenter/points-presenter.js';
import PointsModel from './model/points-model.js';
import {render} from './render.js';

const filtersListContainer = document.querySelector('.trip-controls__filters');
const mainContainer = document.querySelector('.trip-events');

render(new FilterView(), filtersListContainer);
render(new SortView(), mainContainer);

const pointModel = new PointsModel();
pointModel.init();

const pointsPresenter = new PointsPresenter(mainContainer, pointModel);
pointsPresenter.init();
