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
    this.props.fetchAllListings()
  }

  render() {
    let allListings = this.props.listings.allListings

    return (
      <div className="container">
        {allListings &&
          allListings.map(listing => (
            <div className="allListings" key={puzzle.id}>
              <img className="images" src={puzzle.imageUrl} />
              <h3>{listing.wiki}</h3>
              {/* puzzle.pieceCount > 0 is to ensured only shows pieceCount when it's not out-of-stocks */}
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
