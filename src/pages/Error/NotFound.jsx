import React from 'react'
import { Link } from 'react-router-dom'

export const NotFound = () => {
   return (
      <div className="container-scroller">
         <div className="container-fluid page-body-wrapper full-page-wrapper">
            <div className="content-wrapper d-flex align-items-center text-center error-page bg-primary">
            <div className="row flex-grow">
               <div className="col-lg-7 mx-auto text-white">
                  <div className="row align-items-center justify-content-center d-flex flex-column">
                     <div className="col-lg-6 ">
                        <h1 className="display-1 mb-0">404</h1>
                     </div>
                     <div className="col-lg-6 error-page-divider ">
                        <h2>Kechirasiz!</h2>
                        <h3 className="font-weight-light">Siz qidirayotgan sahifa topilmadi.</h3>
                     </div>
                  </div>
                  <div className="row mt-5">
                     <div className="col-12 text-center mt-xl-2">
                        <Link className="text-white font-weight-medium" to="/">Bosh sahifaga qaytish</Link>
                     </div>
                  </div>
               </div>
            </div>
            </div>
         </div>
      </div>
   )
}
