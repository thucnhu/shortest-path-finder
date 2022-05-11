import React, { useState } from 'react'
import { GraphBoard, VisualizeTable } from '../components'
import Button from 'react-bootstrap/Button'

export default function Home() {
	const [removeDisabled, setRemoveDisabled] = useState(true)
	const [clearDisabled, setClearDisabled] = useState(true)

	return (
		<div
			className='w-full flex md:flex-row flex-col justify-between items-center border-2 border-black'
			style={{ height: '92vh' }}
		>
			<div className='flex flex-col w-3/4 h-5/6 justify-center'>
				<GraphBoard />
				<div className='flex flex-row justify-center mt-3'>
					<Button
						variant='secondary'
						disabled={removeDisabled}
						className='mx-4'
					>
						Remove
					</Button>
					<Button
						variant='secondary'
						disabled={clearDisabled}
						className='mx-4'
					>
						Clear
					</Button>
				</div>
			</div>
			<div className='flex flex-col justify-center'>
				<VisualizeTable />
			</div>
		</div>
	)
}
