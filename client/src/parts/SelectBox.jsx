import React, { Component } from "react";

class SelectBox extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  setWrapperRef = (node) => {
    this.wrapperRef = node;
  };

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside = (event) => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({
        active: false,
      });
    }
  };

  select = (elem) => {
    const { property_name, with_property } = this.props;
    if (with_property) {
      this.props.handleSelect(property_name, elem)
    } else {
      this.props.handleSelect(elem);
    }
    this.setState({
        active:false
    })
  };
  render() {
    const { active } = this.state;
    const { options, value } = this.props;
    return (
      <div
        id={active ? "selectbox--active" : ""}
        ref={this.setWrapperRef}
        className="selectbox"
      >
        <header
          className="flex__start"
          onClick={() =>
            this.setState({
              active: !active,
            })
          }
        >
          {value ? (
            <>
              {value.img ? <img src={value.img} /> : ""}
              {value.name}
            </>
          ) : (
            ""
          )}
        </header>
        <ul className="selectbox__list">
          {options && options.length > 0
            ? options.map((m, i) => {
                return (
                  <li
                    className="flex__start"
                    onClick={() => this.select(m)}
                    key={i}
                  >
                    {m.img ? <img src={m.img} /> : ""}
                    {m.name}
                  </li>
                );
              })
            : ""}
        </ul>
      </div>
    );
  }
}

SelectBox.propTypes = {};

export default SelectBox;
