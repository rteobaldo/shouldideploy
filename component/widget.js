import React from 'react'
import { getRandom, dayHelper } from '../helpers/constans'
export default class Widget extends React.Component {
  /**
   * Set default state element based on props
   * @param {any} props
   */
  constructor(props) {
    super(props)

    this.state = {
      timezone: this.props.now.timezone,
      reason: getRandom(this.getReasons())
    }
  }

  /**
   * On props change update state
   * @param {any} nextProps
   * @return void
   */
  componentDidUpdate(nextProps) {
    if (nextProps.now.timezone !== this.state.timezone) {
      this.setState({
        timezone: nextProps.now.timezone,
        reason: getRandom(this.getReasons())
      })
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.onSpacePress)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onSpacePress)
  }

  /**
   * On hitting Space reload reasons
   * @return void
   */
  onSpacePress = (event) => {
    if (event.keyCode == 32) {
      let reasons = this.getReasons()
      this.setState({ reason: getRandom(reasons) })
    }
  }

  /**
   * Get reasons according to current time
   * @return string[]
   */
  getReasons() {
    return dayHelper(this.props.now)
  }

  /**
   * Render widget
   * @return JSX.Element
   */
  render() {
    return (
      <div className="item">
        <h3 className="tagline">Should I Deploy Today?</h3>
        <h2 id="text">{this.state.reason}</h2>
        <span id="reload">
          Hit <span className="space-btn">Space</span> to get another reason
        </span>
      </div>
    )
  }
}
