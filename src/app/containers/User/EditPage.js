import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Grid } from 'react-flexbox-grid/lib';

import Form from '../../components/User/Form';
import * as Actions from '../../actions/user';
import * as ShopActions from '../../actions/shop';

class EditPage extends Component {
  componentDidMount() {
    this.props.fetchShopsIfNeeded(null, true);
    this.props.fetchUser(this.props.match.params.id);
  }

  submit(model) {
    this.props.saveUser(this.props.match.params.id, model)
      .then((action) => {
        if (!action.error) {
          this.props.dispatch({
            type: 'NOTIFICATION_OPEN',
            data: {
              type: 'success',
              message: 'Utilisateur sauvegardé avec succès',
            }
          });
        } else {
          // Note: Parse error, maybe it should be better in the reducer directly? Or creating a function or both
          const errorsRaw = action.error.response.data.errors.children;
          let errors = [];

          Object.keys(errorsRaw).reduce((o, item) => {
            if (!errorsRaw[item].errors) {
              return false;
            }

            errors = errors.concat(errorsRaw[item].errors);
          }, 0);

          this.props.dispatch({
            type: 'NOTIFICATION_OPEN',
            data: {
              type: 'error',
              message: errors,
            }
          });
        }
      });
  }

  render() {
    return (
      <Grid id="content" fluid>
        {this.props.hasFetched && <Form
          item={this.props.item} choicesList={this.props.choicesList}
          isLoading={this.props.isFetching}
          onSubmit={(model) => this.submit(model)}
        />}
      </Grid>
    );
  }
}

EditPage.propTypes = {
  item: PropTypes.object,
  fetchUser: PropTypes.func,
  fetchShopsIfNeeded: PropTypes.func,
  saveUser: PropTypes.func,
  hasFetched: PropTypes.bool,
  isFetching: PropTypes.bool,
};

function mapStateToProps(state) {
  return {
    item: state.user.item,
    choicesList: {
      shops: state.shops.short
    },
    hasFetched: state.user.hasFetched,
    isFetching: state.user.isFetching,
  };
}

function mapDispatchToProps(dispatch) {
  return Object.assign({},
    bindActionCreators(Actions, dispatch),
    bindActionCreators(ShopActions, dispatch),
    { dispatch },
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPage);
