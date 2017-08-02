import React from 'react';
import { Route } from 'react-router';

import BrowsePage from './BrowsePage';
import EditPage from './EditPage';
import AddPage from './CreatePage';

export const App = ({ match }) => (
  <div>
    <Route exact path={match.url} component={BrowsePage} />
    <Route path={`${match.url}/:id/edit`} component={EditPage} />
    <Route path={`${match.url}/new`} component={AddPage} />
  </div>
);

export const Header = ({ match }) => (
  <span>
    <Route path={match.url} render={() => <span style={{ display: 'inlineBlock' }}>Utilisateurs</span>} />
    <Route path={`${match.url}/:id/edit`} render={() => <span style={{ display: 'inlineBlock' }}> / Éditer</span>} />
    <Route path={`${match.url}/new`} render={() => <span style={{ display: 'inlineBlock' }}> / Ajouter</span>} />
  </span>
);