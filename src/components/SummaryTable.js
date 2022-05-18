import React, { useState } from 'react'
import { getGraphOf } from '../utils/graphUtils'

export default function SummaryTable(nodes, edges) {
	let graph = getGraphOf(nodes, edges)

	return (
		<div className='bg-brand-grey w-56 h-64 rounded-md p-4 flex flex-col items-center justify-evenly overflow-y-auto'>
			<h5>Summary Table</h5>
			{/* TODO */}
		</div>
	)
}
