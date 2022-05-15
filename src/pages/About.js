import React from 'react'

export default function About() {
	return (
		<div className='px-40 py-10 leading-7'>
			<section>
				<h4 className='text-bold'>About this website</h4>
				<p>
					This website is an animated tool that helps find the shortest
					path of a given graph using different algorithms. We will try our
					best to update as many algorithms as we can.
				</p>
				<p>
					The project is completely free and open-source, so any
					contribution to help leverage it would be much appreciated. If
					you encounter any errors, please report them on our{' '}
					<a
						href='https://github.com/thucnhu/shortest-path-finder'
						className='text-black'
					>
						github
					</a>
					.
				</p>
			</section>
			<section>
				<h4 className='text-bold'>Our team</h4>
				<div className='flex flex-row'>
					<div className='flex flex-col mr-8 items-center mt-4'>
						<img
							src='https://res.cloudinary.com/dw5ii3leu/image/upload/v1652590509/Shortest%20Path%20Finder/69509154_iepocb.jpg'
							alt='Long Truong'
							className='w-36 h-36 rounded-full'
						/>
						<p className='mt-2'>
							<a
								href='https://github.com/tnlong311'
								className='text-black'
								target='_blank'
								rel='noopener noreferrer'
							>
								Truong Ngoc Long
							</a>
						</p>
					</div>
					<div className='flex flex-col mr-8 items-center mt-4'>
						<img
							src='https://res.cloudinary.com/dw5ii3leu/image/upload/v1652590480/Shortest%20Path%20Finder/Th%E1%BB%A5c_Nh%C6%B0_yqj9uj.jpg'
							alt='Nhu Bui'
							className='w-36 h-36 rounded-full'
						/>
						<p className='mt-2'>
							<a
								href='https://github.com/thucnhu'
								className='text-black'
								target='_blank'
								rel='noopener noreferrer'
							>
								Bui Tran Thuc Nhu
							</a>
						</p>
					</div>
				</div>
			</section>
			<section>
				<h4 className='text-bold'>Special thanks to</h4>
				<ul>
					<li>
						Professor Tran Vinh Linh for teaching us algorithms and graph
						theory.
					</li>
				</ul>
			</section>
		</div>
	)
}
