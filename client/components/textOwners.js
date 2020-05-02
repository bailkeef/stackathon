import React from 'react'
import {connect} from 'react-redux'
import {fetchAllListings} from '../store/listings'

/**
 * COMPONENT
 */
export class TextOwners extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mounted: false
    }
  }

  componentDidMount() {}

  render() {
    return (
      <div className="limiter">
        <input type="text" className="messageBody" name="message" />
        <button type="submit" className="textButton">
          Text Owners
        </button>
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

export default connect(mapState, mapDispatch)(TextOwners)
