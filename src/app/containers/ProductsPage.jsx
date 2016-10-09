import React from 'react';

class ProductsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: {
        status: 1,
        name: 1,
        type: 1,
        price: 1,
        description: 1,
        origin: 1,
      }
    };

    this.onClick = this.onClick.bind(this);
  }

  onClick(column) {
    const columns = this.state.columns;
    columns[column] = 0;

    this.setState({
      columns: columns
    });
  }

  render() {
    const fakeData = [
      {
        enabled: 'Activé',
        name: '4 baies et poivres',
        price: 3.95,
        type: 'piece',
        description: 'Le pot de 45g',
        origin: 'France'
      }, {
        enabled: 0,
        name: 'Abricot',
        price: 2.95,
        type: 'kg',
        description: 'Les 500g',
        origin: 'Espagne'
      }, {
        enabled: 0,
        name: 'Abricot Blanc Vanilla',
        price: 5.95,
        type: 'kg',
        description: 'Les 500g',
        origin: 'France'
      }, {
        enabled: 'Activé',
        name: 'Abricot moelleux',
        price: 3.95,
        type: 'piece',
        description: 'La barquette de 200g',
        origin: 'France'
      },
    ];

    return (
      <div>
        <table>
          <tr>
            {this.state.columns.status === 1 ?
                <td onClick={() => this.onClick('status')}>Dispo chez APDC</td> : ''
            }
            {this.state.columns.name === 1 ?
              <td onClick={() => this.onClick('name')}>Nom du produit</td> : ''
            }
            {this.state.columns.type === 1 ?
              <td onClick={() => this.onClick('type')}>Unité prix</td> : ''
            }
            {this.state.columns.price === 1 ?
              <td onClick={() => this.onClick('price')}>Prix TTC public</td> : ''
            }
            {this.state.columns.description === 1 ?
              <td onClick={() => this.onClick('description')}>Description portion</td> : ''
            }
            {this.state.columns.origin === 1 ?
              <td onClick={() => this.onClick('origin')}>Origine</td> : ''
            }
          </tr>
          {fakeData.map(data => (
            <tr>
              {this.state.columns.status === 1 ?
                <td>{data.enabled}</td> : ''
              }
              {this.state.columns.name === 1 ?
                <td>{data.name}</td> : ''
              }
              {this.state.columns.price === 1 ?
                <td>{data.price}</td> : ''
              }
              {this.state.columns.type === 1 ?
                <td>{data.type}</td> : ''
              }
              {this.state.columns.description === 1 ?
                <td>{data.description}</td> : ''
              }
              {this.state.columns.origin === 1 ?
                <td>{data.origin}</td> : ''
              }
            </tr>
          ))}
        </table>
      </div>
    );
  }
}

export default ProductsPage;