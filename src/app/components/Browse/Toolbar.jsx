import React, { Component, PropTypes } from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import {
  Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle
} from 'material-ui/Toolbar';
import ActionSearchIcon from 'material-ui/svg-icons/action/search';
import ActionSettingsIcon from 'material-ui/svg-icons/action/settings';
import ContentFilterIcon from 'material-ui/svg-icons/content/filter-list';
import NavigationCancelIcon from 'material-ui/svg-icons/navigation/cancel';

import Search from './Search';

class ListToolbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showSearch: false,
    };
  }

  closeSearch = () => {
    this.setState({ showSearch: !this.state.showSearch }, () => {
      console.log(123);
      this.props.onSearch({ search: '' });
    });
  };

  render() {
    return (
      <Toolbar>
        <ToolbarGroup>
          {!this.state.showSearch && <ToolbarTitle text={this.props.title} />}
        </ToolbarGroup>
        <ToolbarGroup
          style={{ textAlign: 'right', justifyContent: 'flex-end', width: '100%' }}
          lastChild
        >
          {this.state.showSearch &&
          <Search onSubmit={(model) => this.props.onSearch(model)} />}
          {this.state.showSearch ?
            <NavigationCancelIcon
              style={{ cursor: 'pointer', paddingLeft: 24 }}
              color={this.context.muiTheme.toolbar.iconColor}
              hoverColor={this.context.muiTheme.toolbar.hoverColor}
              onClick={this.closeSearch}
            /> :
            <ActionSearchIcon
              style={{ cursor: 'pointer', paddingLeft: 24 }}
              color={this.context.muiTheme.toolbar.iconColor}
              hoverColor={this.context.muiTheme.toolbar.hoverColor}
              onClick={() => this.setState({ showSearch: !this.state.showSearch })}
            />
          }

          {this.props.toggleFilters &&
          <ContentFilterIcon
            style={{ cursor: 'pointer', paddingLeft: 24 }}
            onClick={() => this.props.toggleFilters()}
          />}
          <ToolbarSeparator />
          {this.props.toggleOptions &&
          <RaisedButton
            onTouchTap={() => this.props.toggleOptions()}
            icon={<ActionSettingsIcon />}
            secondary
          />}
        </ToolbarGroup>
      </Toolbar>
    );
  }
}

ListToolbar.contextTypes = {
  muiTheme: PropTypes.object.isRequired,
};

ListToolbar.propTypes = {
  title: PropTypes.string,
  toggleFilters: PropTypes.func,
  toggleOptions: PropTypes.func,
  onSearch: PropTypes.func,
};

export default ListToolbar;
