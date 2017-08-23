import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  AppBar, Checkbox, Divider, Drawer, Subheader
} from 'material-ui';
import {
  List, ListItem
} from 'material-ui/List';

class Options extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showSearch: false,
    };
  }

  render() {
    const { fields, columns } = this.props;

    return (
      <Drawer
        docked={false}
        openSecondary
        open={this.props.open}
        onRequestChange={() => this.props.toggleOptions()}
      >
        <AppBar title="Options" showMenuIconButton={false} />
        <List>
          <Subheader>Colonnes</Subheader>
          {Object.keys(fields).map((key) => (
            <ListItem
              key={key}
              primaryText={fields[key].alias}
              leftCheckbox={
                <Checkbox
                  onCheck={(e, isChecked) => {
                    const check = {};
                    columns[key] = isChecked;

                    this.props.showColumn(check);
                  }}
                  defaultChecked={columns[key]}
                />
              }
            />
          ))}
        </List>
        <Divider />
      </Drawer>
    );
  }
}

Options.propTypes = {
  open: PropTypes.bool,
  fields: PropTypes.object,
  columns: PropTypes.object,
  toggleOptions: PropTypes.func,
  showColumn: PropTypes.func,
};

export default Options;
