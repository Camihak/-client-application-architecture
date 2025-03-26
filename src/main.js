import FilterView from './view/filter-view.js';
import SortView from './view/sort-view.js';
import PointsListView from './view/points-list-view.js';
import AddPointView from './view/add-point-view.js';
import EditPointView from './view/edit-point-view.js';
import PointView from './view/point-view.js';
import {render} from './render.js';

const filtersListContainer = document.querySelector('.trip-controls__filters');
const mainContainer = document.querySelector('.trip-events');

render(new FilterView(), filtersListContainer);
render(new SortView(), mainContainer);
render(new PointsListView(), mainContainer);

const pointsList = mainContainer.querySelector('.trip-events__list');

render(new EditPointView(), pointsList);
render(new PointView(), pointsList);
render(new AddPointView(), pointsList);

