import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { Grid } from 'react-flexbox-grid/lib';

import Profile from '../components/Profile';
import * as ProfileActions from '../actions/profile';

class ProfilePage extends Component {
  componentWillMount() {
    this.props.fetchProfile();
  }

  submit(model) {
    this.props.saveProfile(model);
  }

  render() {
    const { profile, isFetching } = this.props;

    return (
      <Grid id="content" fluid>
        {!isFetching ?
          <Profile profile={profile} onSubmit={(model) => this.submit(model)} /> : ''
        }
      </Grid>
    );
  }
}

ProfilePage.propTypes = {
  profile: PropTypes.object,
  fetchProfile: PropTypes.func,
  isFetching: PropTypes.bool,
};

function mapStateToProps(state) {
  return {
    profile: state.profile.item,
    isFetching: state.profile.isFetching,
  };
}

const mapDispatchToProps = ProfileActions;

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
