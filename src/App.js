import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home, About } from './pages'
import { Navbar } from './components'

function App() {
	return (
		<div>
			<Navbar />
			<div className='container'>
				<BrowserRouter>
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/about' element={<About />} />
					</Routes>
				</BrowserRouter>
			</div>
		</div>
	)
}

export default App
