import React from 'react'
import PropTypes from 'prop-types'
import Sidebar from '../../components/Sidebar'
import './PageLayout.scss'

export const PageLayout = ({ children }) => (
  <div className='container-fluid'>
    <div className='row'>
      <div className='col-sm-12'>
        <Sidebar routes={[{ name: 'Map', active: false }]} />
        <div className=''>
          <h1 className='text-center'>Fuel Station Map Search</h1>
          {children}
        </div>
      </div>
    </div>
  </div>
)
PageLayout.propTypes = {
  children: PropTypes.node,
}

export default PageLayout
