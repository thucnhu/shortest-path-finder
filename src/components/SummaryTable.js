import React from 'react'
import { getGraphOf } from '../utils/graphUtils'

export default function SummaryTable(nodes) {
	let graph = getGraphOf(nodes.nodes, nodes.edges)

	return (
		<div className='bg-brand-grey w-56 h-64 rounded-md p-3 overflow-y-auto'>
			<h5 className='text-center'>Graph Data</h5>
			<div>
				{Object.entries(graph).map(([key1, value1]) => (
					<p key={key1}>
						{key1}:{' {'}
						{Object.entries(value1).map(([key2, value2]) => (
							<span key={key2}>
								{key2} - {value2},{' '}
							</span>
						))}
						{' }'}
					</p>
				))}
			</div>
		</div>
	)
}
