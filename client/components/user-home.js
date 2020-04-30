import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {uploadListings} from '../store/listings'
import AllListings from './allResults'

/**
 * COMPONENT
 */
export class UserHome extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.state = {}
  }

  componentDidMount() {
    console.log(this.props, 'this.props')
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
    console.log(typeof event.target.url.value, 'thing im passing in as url')
    let url = event.target.url.value
    this.props.uploadListings(url)
    //   function submitChannel() {
    //     const channelURL = document.querySelector('.channel-input').value;
    //     fetch('http://localhost:3000/creators', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({channelURL})
    //     })
    // }
  }

  render() {
    const {email} = this.props
    return (
      <div>
        <h3>Welcome, {email}</h3>
        <h4>Get started here:</h4>

        <form onSubmit={this.handleSubmit}>
          <input
            className="url-input"
            name="url"
            type="text"
            placeholder="Enter a url"
            onChange={this.handleChange}
          />
          <button type="submit">submit</button>
        </form>
        <AllListings />
      </div>
    )
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
    uploadListings: url => dispatch(uploadListings(url))
  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
