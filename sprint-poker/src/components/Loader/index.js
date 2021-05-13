import React from "react";
import assign from "domkit/appendVendorPrefix";
import insertKeyframesRule from "domkit/insertKeyframesRule";

/**
 * @type {Object}
 */
var keyframes = {
  "0%, 100%": {
    transform: "scale(0)",
  },
  "50%": {
    transform: "scale(1.0)",
  },
};

/**
 * @type {String}
 */
var animationName = insertKeyframesRule(keyframes);

class Loader extends React.Component {
  getDefaultProps = () => {
    return {
      loading: true,
      color: "#ffffff",
      size: "60px",
    };
  };

  getBallStyle = () => {
    return {
      backgroundColor: this.props.color,
      width: this.props.size,
      height: this.props.size,
      borderRadius: "100%",
      opacity: 0.6,
      position: "absolute",
      top: 0,
      left: 0,
      verticalAlign: this.props.verticalAlign,
    };
  };

  getAnimationStyle = (i) => {
    var animation = [
      animationName,
      "2s",
      // eslint-disable-next-line eqeqeq
      i == 1 ? "1s" : "0s",
      "infinite",
      "ease-in-out",
    ].join(" ");
    var animationFillMode = "both";

    return {
      animation: animation,
      animationFillMode: animationFillMode,
    };
  };

  getStyle = (i) => {
    if (i) {
      return assign(this.getBallStyle(i), this.getAnimationStyle(i));
    }

    return assign({
      width: this.props.size,
      height: this.props.size,
      position: "relative",
    });
  };

  /**
   * @param  {Boolean} loading
   * @return {ReactComponent || null}
   */
  renderLoader = (loading) => {
    if (loading) {
      return (
        <div
          id={this.props.id}
          className={this.props.className}
          style={{
            position: "fixed",
            width: "100%",
            height: "100%",
            left: 0,
            top: 0,
            display: "flex",
            justifyContent: "center",
            zIndex: "99999",
            overflow: "hidden",
            alignItems: "center",
          }}
        >
          <div style={this.getStyle()}>
            <div style={this.getStyle(1)}></div>
            <div style={this.getStyle(2)}></div>
          </div>
        </div>
      );
    }

    return null;
  };

  render() {
    return this.renderLoader(this.props.loading);
  }
}

export default Loader;
