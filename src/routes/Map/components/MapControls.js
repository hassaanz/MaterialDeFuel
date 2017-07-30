import React from 'react'
import PropTypes from 'prop-types'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import Paper from 'material-ui/Paper'
import { List, ListItem } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import ContentSave from 'material-ui/svg-icons/content/save'
import MapsMyLocation from 'material-ui/svg-icons/maps/my-location'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import FontIcon from 'material-ui/FontIcon'
import { blue200 } from 'material-ui/styles/colors'

const style = {
  height: '100%',
  width: '100%',
  display: 'inline-block',
}

const radioStyles = {
  block: {
    maxWidth: 250,
    fontSize: 12,
    marginLeft: '5px',
  },
  radioButton: {
    marginBottom: 16,
  },
  inputField: {
    marginLeft: '10px',
    fontSize: 12,
  },
  searchBut: {
    display: 'block',
  }
}
class MapControls extends React.Component {
  constructor (props) {
    super(props)
    this.handleSearch = this.handleSearch.bind(this)
    this.isSearchable = this.isSearchable.bind(this)
  }

  handleSearch () {
    const {
      findStationsPostCode,
      findStationsPoint
    } = this.props
    if (this.props.searchOpt === 'zip') {
      findStationsPostCode(this.props.zipSearch)
    } else if (this.props.searchOpt === 'position') {
      const {
        lat,
        lng
      } = this.props.activePos
      console.log('sending request to find stations by point:', { lat, lng })
      findStationsPoint({ lat, lng })
    }
  }
  isSearchable () {
    const { searchOpt, zipSearch, activePos } = this.props
    if (searchOpt === 'zip') {
      return zipSearch !== ''
    } else if (searchOpt === 'position') {
      if (activePos) {
        return (activePos.lat !== '' || activePos.lng !== '')
      }
      return false
    }
  }
  render () {
    return (
      <Paper style={style} zDepth={1}>
        <Paper zDepth={2}>
          <Subheader>Search</Subheader>
          <RadioButtonGroup
            className='row'
            style={radioStyles.block}
            name='searchType'
            onChange={this.props.onSearchOptChange}
            defaultSelected={this.props.searchOpt}>
            <RadioButton className='col-md-6' style={radioStyles.radioButton} value='position' label='Position' />
            <RadioButton className='col-md-6' style={radioStyles.radioButton} value='zip' label='Zipcode' />
          </RadioButtonGroup>

          {
            this.props.searchOpt === 'zip'
            ? <TextField
              hintText='Enter ZipCode'
              type='number'
              value={this.props.zipSearch || ''}
              style={radioStyles.inputField}
              onChange={this.props.setZipSearch} />
            : <div>
              <TextField
                hintText='Enter Longitude'
                type='number'
                style={radioStyles.inputField}
                value={this.props.activePos ? this.props.activePos.lng : ''}
              />
              <TextField
                hintText='Enter Latitude'
                type='number'
                style={radioStyles.inputField}
                value={this.props.activePos ? this.props.activePos.lat : ''}
              />
            </div>
          }
          <RaisedButton
            style={radioStyles.searchBut}
            icon={<FontIcon className='mdi mdi-magnify' />}
            label='search'
            backgroundColor={blue200}
            onTouchTap={this.handleSearch}
            disabled={!this.isSearchable()}
          />
        </Paper>
        <Paper zDepth={2} style={{ marginTop: '10px' }}>
          <List>
            <Subheader>Actions</Subheader>
            <ListItem primaryText='Snapshot' leftIcon={<ContentSave />} />
            <ListItem
              primaryText='Current Position'
              leftIcon={<MapsMyLocation />}
              onTouchTap={this.props.centerToPosition} />
          </List>
        </Paper>
      </Paper>
    )
  }
}

MapControls.propTypes = {
  centerToPosition: PropTypes.func.isRequired,
  onSearchOptChange: PropTypes.func.isRequired,
  findStationsPostCode: PropTypes.func.isRequired,
  findStationsPoint: PropTypes.func.isRequired,
  setMapZoom: PropTypes.func.isRequired,
  setMapDefault: PropTypes.func.isRequired,
  setMapCenter: PropTypes.func.isRequired,
  activePos: PropTypes.object,
  userPos: PropTypes.object,
  zipSearch: PropTypes.string,
  searchOpt: PropTypes.string,
  setZipSearch: PropTypes.func.isRequired,
}
export default MapControls
