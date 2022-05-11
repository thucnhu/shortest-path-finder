import React, { useState } from 'react'
import { GraphBoard, VisualizeTable, SummaryTable } from '../components'
import Button from 'react-bootstrap/Button'

export default function Home() {
	const [removeDisabled, setRemoveDisabled] = useState(true)
	const [clearDisabled, setClearDisabled] = useState(true)

	return (
		<div
			className='w-full flex md:flex-row flex-col justify-between items-center'
			style={{ height: '92vh', minHeight: '600px' }}
		>
			<div className='flex flex-col md:w-4/5 w-11/12 h-5/6 justify-center'>
				<GraphBoard />
				<div className='flex flex-row justify-center my-3'>
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
			<div className='flex md:flex-col sm:flex-row justify-between md:h-5/6 sm:h-auto w-full md:w-fit'>
				<SummaryTable />
				<VisualizeTable />
			</div>
		</div>
	)
}
