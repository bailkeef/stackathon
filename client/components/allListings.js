import React from 'react'
import {connect} from 'react-redux'
import {fetchAllListings} from '../store/listings'
import {Link} from 'react-router-dom'
import TextOwners from './textOwners'

/**
 * COMPONENT
 */
export class AllListings extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mounted: false
    }
  }

  componentDidMount() {
    console.log('AllListings mounted')
    this.props.fetchAllListings()
    this.setState({mounted: true})
  }

  render() {
    console.log(this.props, 'this.props in AllListings')
    let allListings = this.props.listings

    return (
      <div className="limiter">
        <div className="container-table100">
          <div className="wrap-table100">
            <div className="table100">
              <h3>Enter Text Message:</h3>
              <TextOwners />
              <table id="listings-table">
                <thead>
                  <tr className="table100-head">
                    <th>SMS</th>
                    <th>Phone Number</th>
                    <th>Address</th>
                    <th>Price</th>
                    <th># of Beds</th>
                    <th># of Baths</th>
                    <th>Sqft</th>
                  </tr>
                </thead>
                <tbody>
                  {allListings.length > 0 &&
                    allListings.map(listing => (
                      <tr className="allListings" key={listing.id}>
                        <td>
                          <input
                            type="checkbox"
                            name="myTextEditBox"
                            value="checked"
                            width="80"
                          />
                        </td>
                        <td>
                          {listing.phone.slice(0, listing.phone.length - 1)}
                        </td>
                        <td>{listing.address}</td>
                        <td>{listing.price}</td>
                        <td>{listing.beds}</td>
                        <td>{listing.baths}</td>
                        <td>{listing.sqft}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

/**
 * CONTAINER
 */

const mapState = state => {
  return {
    listings: state.listings.allListings,
    zipcode: state.listings.zipcode
  }
}

const mapDispatch = dispatch => {
  return {
    fetchAllListings: () => dispatch(fetchAllListings())
  }
}

export default connect(mapState, mapDispatch)(AllListings)
