import React from 'react';
import { Route } from 'react-router';

import BrowsePage from './BrowsePage';
import ReadPage from './ReadPage';

export const App = ({ match }) => (
  <div>
    <Route exact path={match.url} component={BrowsePage} />
    <Route path={`${match.url}/:id/edit`} component={ReadPage} />
  </div>
);

export const Header = ({ match }) => (
  <span>
    <Route path={match.url} render={() => <span style={{ display: 'inlineBlock' }}>Commandes</span>} />
    <Route path={`${match.url}/:id/edit`} render={() => <span style={{ display: 'inlineBlock' }}> / Voir</span>} />
  </span>
);