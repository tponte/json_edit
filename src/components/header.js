import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import styles from './styles'

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch)

class Header extends Component {
  render() {
    return (
        <Navbar className="navbar navbar-inverse navbar-fixed-top">
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/" className="navbar-brand">Edit Language JSON</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
        </Navbar>
    )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header))
