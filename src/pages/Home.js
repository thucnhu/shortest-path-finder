import React, { useState } from 'react'
import { Navbar, GraphBoard, VisualizeTable } from '../components'

export default function Home() {
	const [removeDisabled, setRemoveDisabled] = useState(true)
	const [clearDisabled, setClearDisabled] = useState(true)

	return (
		<div className='flex flex-col h-screen w-screen'>
			<Navbar />
			<div className='h-[30rem] w-container-xl m-auto flex flex-row justify-between'>
				<GraphBoard />
				<div className='flex flex-col ml-10 justify-center'>
					<VisualizeTable />
					<div className='flex flex-row justify-between'>
						<button className='btn-grey' disabled={removeDisabled}>
							Remove
						</button>
						<button className='btn-grey' disabled={clearDisabled}>
							Clear
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
