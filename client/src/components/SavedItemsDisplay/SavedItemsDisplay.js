import React from 'react'
import './SavedItemsDisplay.css'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import PageviewIcon from '@material-ui/icons/Pageview'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline'


const SavedItemsDisplay = (props) => {
  return (

    <ExpansionPanel expanded={props.expanded === 'savedBooksPanel'} onChange={props.handleChange('savedBooksPanel')}>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="savedBooksPanelbh-content"
        id="savedBooksPanelbh-header"
      >
        <Typography className={props.classes.heading}>Saved Books</Typography>
        <Typography className={props.classes.secondaryHeading}>
          - Shows saved books
          </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Paper variant="outlined" square>
          {props.itemState.items.map(savedItem => (

            <Card key={savedItem.id} className={props.classes.root} variant="outlined">
              <CardMedia className={props.classes.media}
                image={savedItem.thumbnail}
              />
              <CardActions disableSpacing>
                <IconButton aria-label="View" key={savedItem.id} onClick={() => props.handleView(savedItem.previewLink)} >
                  <PageviewIcon />
                </IconButton>
                <IconButton aria-label="Delete" onClick={() => props.handleDeleteItem(savedItem)}>
                  <RemoveCircleOutlineIcon />
                </IconButton>
              </CardActions>
              <CardHeader
                title={savedItem.title}
                subheader= <div>Authors: {savedItem.authors.map(author => (
                  <Typography key={author}>{author}</Typography>
                ))}</div>
            />
            <CardContent>

              <Typography>
                Description:&nbsp;
                    {savedItem.description}
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

export default SavedItemsDisplay
