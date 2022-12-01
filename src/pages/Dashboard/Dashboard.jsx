import { useState, useEffect } from 'react';
import { summaryApi } from '../../api/summary';
import { StatisticsCard } from '../../components/Card/StatisticsCard';

export const Dashboard = () => {
   const [summary, setSummary] = useState({
      countBlogs: 0,
      countCategory: 0,
      countComments: 0
   })
   const [loading, setLoading] = useState(false);

   const getSummary = async () => {
      try {
         const res = await summaryApi.getSummary();
         const summaryData = await res.data.summary;
         setSummary(summaryData);
         setLoading(true)
      } catch (err) {}
   }

   useEffect(() => {
      getSummary();
   }, [])
   return (
      <div className='main-panel'>
         <div className='content-wrapper'>
            <StatisticsCard summary={summary} loading={loading} />
         </div>
      </div>
   )
}
