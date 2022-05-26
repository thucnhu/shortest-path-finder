import './App.css'
import { Routes, Route } from 'react-router-dom'
import { Home, About } from './pages'
import { Navbar } from './components'

function App() {
	return (
		<div>
			<Navbar />
			<div className='container'>
				<Routes>
					<Route exact path='/' element={<Home />} />
					<Route path='/about' element={<About />} />
				</Routes>
			</div>
		</div>
	)
}

export default App
