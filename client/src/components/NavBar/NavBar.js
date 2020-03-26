import React from 'react'
import './NavBar.css'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import InputBase from '@material-ui/core/InputBase'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
import SdStorageIcon from '@material-ui/icons/SdStorage'

const NavBar = (props) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          className={props.classes.menuButton}
          color="inherit"
          aria-label="open drawer"
        >
          <MenuIcon />
        </IconButton>
        <Typography className={props.classes.title} variant="h6" noWrap>
          React Google Book Search
          </Typography>
        <IconButton onClick={props.handleSavedItems}>
          <SdStorageIcon />
        </IconButton>
        <div className={props.classes.search}>
          <div className={props.classes.searchIcon}>

          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: props.classes.inputRoot,
              input: props.classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'search' }}
            type="text"
            name="searchText"
            value={props.itemState.searchText}
            onChange={props.handleInputChange}
          />
          <IconButton onClick={props.handleSearchBooks}>
            <SearchIcon />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar
