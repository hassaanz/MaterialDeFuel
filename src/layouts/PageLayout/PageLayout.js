import React from 'react'
import PropTypes from 'prop-types'
import Sidebar from '../../components/Sidebar'
import './PageLayout.scss'

export const PageLayout = ({ children }) => (
  <div className='container-fluid'>
    <div className='row'>
      <div className='col-sm-12'>
        <Sidebar routes={[{ name:'counter', active: true }, { name: 'map', active: false }]} />
        <div className=''>
          <h1 className='text-center'>Brum Brum Fuel Info</h1>
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
