import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {uploadListings, fetchAllListings} from '../store/listings'
import AllListings from './allListings'

/**
 * COMPONENT
 */
export class UserHome extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      mounted: false
    }
  }

  componentDidMount() {
    console.log(this.props, 'this.props')
    this.setState({mounted: true})
  }

  handleChange() {
    console.log('handlechange')
    this.setState({
      [event.target.name]: event.target.value
    })
    console.log(this.state, '<----local form state')
    console.log(this.props, 'this.props')
  }

  handleSubmit() {
    event.preventDefault()
    console.log('click')
    console.log(
      typeof event.target.zipcode.value,
      'thing im passing in as zip code'
    )
    let zipcode = event.target.zipcode.value
    this.props.uploadListings(zipcode)
    this.props.fetchAllListings()
  }

  render() {
    const {email} = this.props
    if (this.state.mounted) {
      return (
        <div>
          <h3>Welcome, {email}!</h3>
          <div className="wrap">
            <form className="search" onSubmit={this.handleSubmit}>
              <textarea
                className="searchTerm"
                name="zipcode"
                onChange={this.handleChange}
                placeholder="Enter a zip code"
              />
              <button type="submit" className="searchButton">
                submit
              </button>
            </form>
          </div>
          <AllListings />
        </div>
      )
    } else {
      return (
        <div>
          <h3>Loading up your data...</h3>
        </div>
      )
    }
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    listings: state.listings
  }
}

const mapDispatch = dispatch => {
  return {
    uploadListings: zipcode => dispatch(uploadListings(zipcode)),
    fetchAllListings: () => dispatch(fetchAllListings())
  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
