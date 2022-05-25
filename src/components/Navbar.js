import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'

export default function NavigationBar() {
	return (
		<Navbar bg='dark' variant='dark' expand='lg'>
			<Container>
				<Navbar.Brand href='/'>Shortest Path Finder</Navbar.Brand>
				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav className='me-auto'>
						<Nav.Link href='/'>Home</Nav.Link>
						<Nav.Link href='/about'>About</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}