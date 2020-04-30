import React from 'react'
import {connect} from 'react-redux'
import {fetchAllListings} from '../store/listings'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
export class AllListings extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    console.log('AllListings mounted')
    this.props.fetchAllListings()
  }

  render() {
    console.log(this.props, 'this.props in AllListings')
    let allListings = this.props.listings

    return (
      <div className="container">
        <h3>HELLO</h3>
        {allListings &&
          allListings.map(listing => (
            <div className="allListings" key={listing.id}>
              <h3>{listing.wiki}</h3>
            </div>
          ))}
      </div>
    )
  }
}

/**
 * CONTAINER
 */

const mapState = state => {
  return {
    listings: state.listings.allListings
  }
}

const mapDispatch = dispatch => {
  return {
    fetchAllListings: () => dispatch(fetchAllListings())
  }
}

export default connect(mapState, mapDispatch)(AllListings)
