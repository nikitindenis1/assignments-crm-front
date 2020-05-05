import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import SmallPopup from "../../parts/SmallPopup";
import { connect } from "react-redux";
import * as actions from "../../actions/actions";
import { LOGIN_ROUTE, SETTINGS_ROUTE } from "../../tools/routes";
import { removeCookie } from "../../tools/cookie";
import { AUTH_TOKEN } from "../../tools/keys";
import ExitToAppSharpIcon from "@material-ui/icons/ExitToAppSharp";
import PersonIcon from "@material-ui/icons/Person";
import MenuIcon from "@material-ui/icons/Menu";
const isActive = (url, value) => {
  if (url.indexOf(value) > -1) return true;
  return false;
};

class Navbar extends Component {
  constructor() {
    super();
    this.state = {};
  }
  componentWillReceiveProps(nextPros) {
    this.setState({
      mobile_menu:false
    })
    let url = nextPros.location.pathname;
    this.setState({
      url,
    });
  }
  componentDidMount() {
    let url = window.location.pathname;
    this.setState({
      url,
      page_loaded: true,
    });
  }

  logout = () => {
    removeCookie(AUTH_TOKEN);
    this.props.history.push(LOGIN_ROUTE);
    window.location.reload();
  };
  onLoad = () => {
    this.setState({
      img_loaded: true,
    });
  };
  render() {
    const { url, page_loaded, img_loaded, mobile_menu } = this.state;
    const { user } = this.props.user;
    const { navigations } = this.props;
    const { system_text } = this.props.global;
    const style = {
      left: "110%",
      top: "50%",
      transform: "translate(0, -50%)",
    };
    return page_loaded ? (
      <nav className="navbar">
        <div
          style={{
            display: "none",
          }}
          onClick={() =>
            this.setState({
              mobile_menu: !mobile_menu,
            })
          }
          className="mobile__hamburger"
        >
          <MenuIcon />
        </div>
        <figure className="employee__img navbar__user__avatar">
          {user && user.avatar ? (
            <>
              <img
                src={user.avatar}
                style={{
                  opacity: img_loaded ? 1 : 0,
                  transition: "0.2s all",
                }}
                onLoad={() => this.onLoad()}
                alt=""
              />
              {!img_loaded ? <aside className="avatar__loader"></aside> : ""}
            </>
          ) : (
            <PersonIcon />
          )}
        </figure>
        <section
          id={mobile_menu ? "navbar__list--active" : ""}
          className="navbar__list flex__column"
        >
          <aside className='navbar__list__mobile__placeholder'
          style ={{
            display:'none'
          }}
          onClick = {() => this.setState({
            mobile_menu:false
          })}
          ></aside>
          {navigations && navigations.length > 0
            ? navigations.map((m, i) => {
                return (
                  <Link
                   
                    id={
                      isActive(url, m.value) ? "navbar__list__link--active" : ""
                    }
                    className="navbar__list__link flex__center"
                    key={i}
                    to={m.param ? m.url.replace(m.param, user._id) : m.url}
                  >
                    {m.img}
                    <SmallPopup
                      arrow_class="arrow-left"
                      style={style}
                      text={system_text[m.text]}
                    />
                  </Link>
                );
              })
            : ""}
        </section>
        <button
          style={{
            background: "transparent",
            border: "0px",
          }}
          className="navbar__list__link navbar__logout__link"
          onClick={() => this.logout()}
        >
          <SmallPopup
            arrow_class="arrow-left"
            style={style}
            text={system_text.LOGOUT}
          />
          <ExitToAppSharpIcon />
        </button>
      </nav>
    ) : (
      ""
    );
  }
}

function mapStateToProps({ employees, navbar, user, global }) {
  return { employees, navbar, user, global };
}

export default withRouter(connect(mapStateToProps, actions)(Navbar));
