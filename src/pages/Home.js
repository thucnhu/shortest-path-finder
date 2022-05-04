import React from 'react'
import {Navbar, GraphBoard, SummaryTable, VisualizeTable} from '../components';

export default function Home() {
  return (
    <div>
        <Navbar />
        <div className='px-xl'>
            <div className="flex flex-row min-h-400 min-w-fit">
               <GraphBoard />
               <div className='flex flex-col basis-1 grow'>
                  <SummaryTable />
                  <VisualizeTable />
               </div>  
            </div>
        </div>
    </div>
  );
}