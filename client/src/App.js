import React, { useState } from 'react'
import Item from './utils/Item'
import './App.css'
import axios from 'axios'
import { fade, makeStyles } from '@material-ui/core/styles'
import SearchItemsDisplay from './components/SearchItemsDisplay'
import SavedItemsDisplay from './components/SavedItemsDisplay'
import NavBar from './components/NavBar'


const App = () => {

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
      height: 200, width: 200
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



  const [itemState, setItemState] = useState({
    items: [],
    searchText: '',
    searchDisplayItems: [],
    itemSnackBar: false
  })


  const handleInputChange = ({ target }) => {
    setItemState({ ...itemState, [target.name]: target.value })
  }

  const classes = useStyles()

  const [expanded, setExpanded] = React.useState(false)

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  }

  const handleView = (url) => {
    window.open(url, "_blank")
  }

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setItemState({ ...itemState, itemSnackBar: false })
  };

  const handleSavedItems = (event) => {
    event.preventDefault()
    Item.read()
      .then(({ data: items }) => {
        let displaySavedItems = []

        items.forEach(item => {

          let newDBItem =
          {
            id: item._id,
            bookID: item.bookID,
            title: item.title,
            subtitle: item.subtitle,
            authors: JSON.parse(item.authors),
            description: item.description,
            selfLink: item.selfLink,
            thumbnail: item.thumbnail,
            previewLink: item.previewLink
          }
          displaySavedItems.push(newDBItem)

        })
        setItemState({ ...itemState, items: displaySavedItems })
        setExpanded('savedBooksPanel')

      })
  }

  const handleSearchBooks = (event) => {
    event.preventDefault()
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=${itemState.searchText}&key=${process.env.REACT_APP_GoogleBooks}`)
      .then(({ data: book }) => {
        let searchItems = []
        let foundBooks = book.items

        foundBooks.forEach((element) => {
          let thumbnail = ''
          if (element.volumeInfo.imageLinks === undefined) {
            thumbnail = 'https://placehold.it/200x200'
          }
          else {
            thumbnail = element.volumeInfo.imageLinks.thumbnail
          }
          let bookItem = {
            bookID: element.id,
            title: element.volumeInfo.title,
            subtitle: element.volumeInfo.subtitle,
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

  const handleDeleteItem = (savedItem) => {

    Item.delete(savedItem.id)
      .then(() => {
        let items = JSON.parse(JSON.stringify(itemState.items))
        items = items.filter(item => item.id !== savedItem.id)
        setItemState({ ...itemState, items })
      })
    setItemState({ ...itemState, itemSnackBar: true })
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
        let newDBItem =
        {
          id: item._id,
          bookID: item.bookID,
          title: item.title,
          subtitle: item.subtitle,
          authors: JSON.parse(item.authors),
          description: item.description,
          selfLink: item.selfLink,
          thumbnail: item.thumbnail,
          previewLink: item.previewLink
        }
        items.push(newDBItem)
        setItemState({ ...itemState, items, itemSnackBar: true })

      })
  }


  return (
    <>
      <div className={classes.root}>
        <NavBar classes={classes}
          itemState={itemState}
          handleChange={handleChange}
          handleInputChange={handleInputChange}
          handleSavedItems={handleSavedItems}
          handleSearchBooks={handleSearchBooks}
        />

        <SearchItemsDisplay expanded={expanded} 
          classes={classes}
          itemState={itemState}
          handleChange = {handleChange}
          handleCreateItem={handleCreateItem}
          handleView={handleView}
          handleCloseSnackbar={handleCloseSnackbar}
        />
        
        <SavedItemsDisplay expanded={expanded}
          classes={classes}
          itemState={itemState}
          handleChange={handleChange}
          handleDeleteItem={handleDeleteItem}
          handleView={handleView}
        />


      </div >
    </>
  )
}

export default App;
