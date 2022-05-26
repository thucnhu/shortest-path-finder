import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import { LinkContainer } from 'react-router-bootstrap'

export default function NavigationBar() {
	return (
		<Navbar bg='dark' variant='dark' expand='lg'>
			<Container>
				<Nav activeKey={window.location.pathname}>
					<LinkContainer to='/'>
						<Navbar.Brand>Shortest Path Finder</Navbar.Brand>
					</LinkContainer>
				</Nav>
				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav className='me-auto' activeKey={window.location.pathname}>
						<LinkContainer to='/'>
							<Nav.Link>Home</Nav.Link>
						</LinkContainer>
						<LinkContainer to='/about'>
							<Nav.Link>About</Nav.Link>
						</LinkContainer>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}
