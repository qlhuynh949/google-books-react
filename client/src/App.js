import React from 'react'
import './App.css'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import InputBase from '@material-ui/core/InputBase'
import { fade, makeStyles } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
import SdStorageIcon from '@material-ui/icons/SdStorage'
import SaveIcon from '@material-ui/icons/Save'


import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'

import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));


const App = () => {

  
  const classes = useStyles()

  const [expanded, setExpanded] = React.useState(false)

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  }

  return (
 <>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
            >
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6" noWrap>
              React Google Book Search
          </Typography>
          <IconButton>
              <SdStorageIcon />
          </IconButton>
          
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
              <IconButton>
              <SearchIcon/>
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        <ExpansionPanel expanded={expanded === 'searchResultsPanel'} onChange={handleChange('searchResultsPanel')}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="searchResultsPanelbh-content"
            id="searchResultsPanelbh-header"
          >
            <Typography className={classes.heading}>Search Results</Typography>
            <Typography className={classes.secondaryHeading}> - Shows Book Search Results</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              
          </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'savedBooksPanel'} onChange={handleChange('savedBooksPanel')}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="savedBooksPanelbh-content"
            id="savedBooksPanelbh-header"
          >
            <Typography className={classes.heading}>Saved Books</Typography>
            <Typography className={classes.secondaryHeading}>
              - Shows saved books
          </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              

          </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>

      </div>

 </>
  )
}

export default App;
