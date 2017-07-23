import React from 'react'
import PropTypes from 'prop-types'
import Sidebar from '../../components/Sidebar'
import './PageLayout.scss'

export const PageLayout = ({ children }) => (
  <div className='container-fluid'>
    <div className='row'>
      <div className='col-sm-2'>
        <Sidebar routes={[{ name:'counter', active: true }, { name: 'map', active: false }]} />
      </div>
      <div className='col-sm-10'>
        <h1>Brum Brum Fuel Info</h1>
        <div className='page-layout__viewport'>
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
