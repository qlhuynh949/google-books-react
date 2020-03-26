import React from 'react'
import './SearchItemsDisplay.css'
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
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const SearchItemsDisplay = (props) => {
  return (
    <ExpansionPanel expanded={props.expanded === 'searchResultsPanel'} onChange={props.handleChange('searchResultsPanel')}>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="searchResultsPanelbh-content"
        id="searchResultsPanelbh-header"
      >
        <Typography className={props.classes.heading}>Search Results</Typography>
        <Typography className={props.classes.secondaryHeading}> - Shows Book Search Results</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Paper variant="outlined" square>
          {props.itemState.searchDisplayItems.map(searchItem => (

            <Card key={searchItem.bookID} className={props.classes.root} variant="outlined">
              <CardMedia className={props.classes.media}
                image={searchItem.thumbnail}
              />
              <CardActions disableSpacing>
                <IconButton aria-label="View" key={searchItem.bookID} onClick={() => props.handleView(searchItem.previewLink)} >
                  <PageviewIcon />
                </IconButton>
                <IconButton aria-label="Save" onClick={() => props.handleCreateItem(searchItem)}>
                  <SaveIcon />
                </IconButton>
                <Snackbar open={props.itemState.itemSnackBar} autoHideDuration={6000} onClose={props.handleCloseSnackbar}>
                  <Alert onClose={props.handleCloseSnackbar} severity="success">
                    The book is saved!
                      </Alert>
                </Snackbar>
              </CardActions>
              <CardHeader
                title={searchItem.title}
                subheader= <div>Authors: {searchItem.authors.map(author => (
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
        </ExpansionPanel >
  )
}

export default SearchItemsDisplay
