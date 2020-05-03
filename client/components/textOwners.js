import React from 'react'
import {connect} from 'react-redux'
import {fetchAllListings, textListings} from '../store/listings'

/**
 * COMPONENT
 */
export class TextOwners extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      mounted: false
    }
  }

  componentDidMount() {}

  handleChange() {
    this.setState({
      [event.target.name]: event.target.value
    })
    console.log(this.state)
  }

  handleSubmit() {
    event.preventDefault()
    console.log('clicked!')
    let message = this.state.message
    this.props.textListings(message)
  }

  render() {
    return (
      <div className="limiter" onSubmit={this.handleSubmit}>
        <form>
          <input
            type="text"
            className="messageBody"
            name="message"
            onChange={this.handleChange}
          />
          <button type="submit" className="textButton">
            Text Owners
          </button>
        </form>
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
    fetchAllListings: () => dispatch(fetchAllListings()),
    textListings: message => dispatch(textListings(message))
  }
}

export default connect(mapState, mapDispatch)(TextOwners)
