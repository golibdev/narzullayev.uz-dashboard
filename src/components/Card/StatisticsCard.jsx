import React from 'react';
import { statistics } from '../../constants/statistics';
import Skeleton from 'react-loading-skeleton';

export const StatisticsCard = ({ summary, loading }) => {
   statistics[0].count = summary.countBlogs
   statistics[1].count = summary.countCategory
   statistics[2].count = summary.countComments
   return (
      <div className='row'>
         {statistics.map(item => (
            <div key={item.id} className='col-lg-4 col-md-6 col-12 mb-3'>
               {loading ? ( <div className="card shadow">
                     <div className="card-body bg-white d-flex justify-content-between align-items-center">
                        <div>
                           <h4 className='p-0 text-primary font-weight-bold'>{item.title}</h4>
                           <span style={{ fontSize: '20px' }} className="font-weight-bold">{item.count}</span>
                        </div>
                        <i className={`${item.icon} text-primary font-weight-bold`} style={{ fontSize: "40px" }}></i>
                     </div>
                  </div>
               ) : <Skeleton baseColor='#ddd8d8' key={item.id} width="100%" height={'100px'} /> }
            </div>
         ))}
      </div>
   )
}
