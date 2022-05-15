import React from 'react'
import { GraphBoard, VisualizeTable, SummaryTable } from '../components'

export default function Home() {
	return (
		<div
			className='w-full flex md:flex-row flex-col justify-between items-center'
			style={{ height: '90vh', minHeight: '600px' }}
		>
			<div className='md:w-4/5 w-11/12 h-5/6 justify-center'>
				<GraphBoard />
			</div>
			<div className='flex md:flex-col sm:flex-row justify-between md:h-5/6 sm:h-auto w-full md:w-fit'>
				<SummaryTable />
				<VisualizeTable />
			</div>
		</div>
	)
}
