import React, { useState, useEffect } from 'react'
import Item from './utils/Item'
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
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import PageviewIcon from '@material-ui/icons/Pageview';
import Paper from '@material-ui/core/Paper';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import axios from 'axios'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

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
  media: {
    height: 200,width:200
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

const Alert=(props)=> {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const App = () => {

  const [itemState, setItemState] = useState({
    items: [],
    searchText: '',
    searchDisplayItems:[]
  })

  const [open, setOpen] = React.useState(false);

  const handleInputChange = ({ target }) => {
    setItemState({ ...itemState, [target.name]: target.value })
  }

  const classes = useStyles()

  const [expanded, setExpanded] = React.useState(false)

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  }

  const handleView = (url)=>{
    window.open(url, "_blank")
  }

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleSearchBooks = (event) => {    
    event.preventDefault()
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=${itemState.searchText}+inauthor:${itemState.searchText}&key=${process.env.REACT_APP_GoogleBooks}`)
      .then(({ data: book }) => {
        let searchItems =[]
        
        let foundBooks = book.items
        foundBooks.forEach((element)=>{
          let thumbnail=''
          if (element.volumeInfo.imageLinks === undefined)
          {
            thumbnail = 'https://placehold.it/200x200'
          }
          else
          {
            thumbnail = element.volumeInfo.imageLinks.thumbnail
          }
          let bookItem = {
            bookID: element.id,
            title: element.volumeInfo.title,
            subtitle:element.volumeInfo.subtitle,
            authors: element.volumeInfo.authors,
            description: element.volumeInfo.description,
            selfLink: element.selfLink,
            thumbnail: thumbnail,
            previewLink: element.volumeInfo.previewLink
          }
          searchItems.push(bookItem)
        })
        setItemState({ ...itemState, searchDisplayItems: searchItems })
        setExpanded('searchResultsPanel')

        //watchlist.push(this.state.movie)
        //this.setState({ watchlist, movie: {} })
      })
  }

  const handleCreateItem = (item) => {
    Item.create({
      bookID: item.bookID,
      title: item.title,
      subtitle: item.subtitle,
      authors: JSON.stringify(item.authors),
      description: item.description,
      selfLink: item.selfLink,
      thumbnail: item.thumbnail,
      previewLink: item.previewLink
    })
      .then(({ data: item }) => {
        let items = JSON.parse(JSON.stringify(itemState.items))
        items.push(item)
        setItemState({ ...itemState, items })
        setOpen(true);

      })
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
                type="text"
                name="searchText"
                value={itemState.searchText}
                onChange={handleInputChange}
              />
              <IconButton onClick={handleSearchBooks}>
                <SearchIcon />
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
            <Paper variant="outlined" square>
              {itemState.searchDisplayItems.map(searchItem => (
                                
                <Card key={searchItem.bookID} className={classes.root} variant="outlined">
                   <CardMedia className={classes.media}
                    image={searchItem.thumbnail}
                   /> 
                  <CardActions disableSpacing>
                    <IconButton aria-label="View" key={searchItem.bookID} onClick={()=>handleView( searchItem.previewLink )} >
                      <PageviewIcon />
                    </IconButton>
                    <IconButton aria-label="Save" onClick={()=>handleCreateItem(searchItem)}>
                      <SaveIcon />
                    </IconButton>
                    <Snackbar open={open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                      <Alert onClose={handleCloseSnackbar} severity="success">
                        The book is saved!
                      </Alert>
                    </Snackbar>
                  </CardActions>
                  <CardHeader                    
                    title={searchItem.title}
                    subheader= <div>Authors: {searchItem.authors.map(author=>(
                      <Typography key={author}>{author}</Typography>
                    ))}</div>
                  />
                  <CardContent>
                
                  <Typography>
                    Description:&nbsp;
                    {searchItem.description}
                  </Typography>
                  
                  </CardContent>
              </Card>
              
                
              ))
              }
              
            </Paper>
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
