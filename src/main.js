import FilterView from './view/filter-view.js';
import SortView from './view/sort-view.js';
import PointsListPresenter from './presenter/points-list-presenter.js';
import {render} from './render.js';

const filtersListContainer = document.querySelector('.trip-controls__filters');
const mainContainer = document.querySelector('.trip-events');

render(new FilterView(), filtersListContainer);
render(new SortView(), mainContainer);

const pointsListPresenter = new PointsListPresenter(mainContainer);
pointsListPresenter.init();
