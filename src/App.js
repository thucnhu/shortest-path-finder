import './App.css'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { Home, About } from './pages'
import { Navbar } from './components'

function App() {
	return (
		<div>
			<Navbar />
			<div className='container'>
				<HashRouter>
					<Routes>
						<Route exact path='/' element={<Home />} />
						<Route path='/about' element={<About />} />
					</Routes>
				</HashRouter>
			</div>
		</div>
	)
}

export default App
