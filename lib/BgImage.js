import React, {Component} from 'react'
import PropTypes from 'prop-types'
import './BgImage.css'

const defaultOpt = {
  className: '',
  height: 'auto',
  width: 'auto',
  overlay: {
    cover: 'full',
    hue: 'dark',
    opacity: 0.4
  }
}

class BgImage extends Component {
  static propTypes = {
    children: PropTypes.element,
    src: PropTypes.string.isRequired,
    className: PropTypes.string,
    style: PropTypes.object,
    align: PropTypes.oneOf(['top', 'bottom']),
    height: PropTypes.string,
    width: PropTypes.string,
    blur: PropTypes.number,
    overlay: PropTypes.shape({
      cover: PropTypes.oneOf(['full', 'top', 'bottom']),
      hue: PropTypes.oneOf(['light', 'dark']),
      opacity: PropTypes.number
    }),
    onMouseOver: PropTypes.func
  }

  constructor(props) {
    super(props)

    this.opt = {
      ...defaultOpt,
      ...props,
      overlay: {...defaultOpt.overlay, ...props.overlay}
    }
  }

  render = () => {
    let {src, className, style, height, width, overlay, align, blur} = this.opt
    let wrapperClassName = 'bg-image-wrapper'
    let wrapperStyle = {height, width}
    let imgStyle = {background: `url("${src}")`}

    switch (align) {
      case 'top':
        imgStyle.backgroundPosition = '50% 100%'
        break
      case 'bottom':
        imgStyle.backgroundPosition = '50% 0%'
        break
      default:
        imgStyle.backgroundPosition = '50% 50%'
    }

    if (blur) {
      imgStyle.WebkitFilter = `blur(${blur}px)`
  		imgStyle.filter = `blur(${blur}px)`
    }

    if (overlay) {
      wrapperClassName += ` image-${overlay.hue}`
    }

    return (
      <div ref={el => this.bgWrapper = el} className={wrapperClassName}
          style={wrapperStyle} onMouseOver={this.props.onMouseOver}>
        {this.renderOverlay()}
        <div ref={el => this.bgImage = el} className={`bg-image ${className}`}
            style={{...imgStyle, ...style}}></div>
        {this.props.children}
      </div>
    )
  }

  renderOverlay = () => {
    const {overlay} = this.opt
    if (!this.props.overlay) return null

    if (overlay.cover === 'full') {
      overlay.backgroundColor = (overlay.hue === 'light') ? '#fff' : '#232323'
    }

    return (
      <div className={`bg-image-overlay overlay-${overlay.cover}`} style={overlay}></div>
    )
  }
}

export default BgImage
