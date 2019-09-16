import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

import { Tab, Tabs } from '@material-ui/core';
import StoryIcon from '../icons/StoryIcon';
import UtterIcon from '../icons/UtterIcon';
import IntentIcon from '../icons/IntentIcon';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginBottom: 2,
  },
  tabWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
}));


const StyledTab = withStyles(theme => ({
  root: {
    fontStyle: "italic",
    fontSize: 14,
    textTransform: "uppercase",
    fontWeight: theme.typography.fontWeightRegular,
    color: theme.palette.primary.light,
    '& svg': {
      display: "none",
    },
    '&$selected': {
      fontWeight: theme.typography.fontWeightMedium,
      '& svg': {
        display: "inline",
        fill: theme.palette.primary.light,
      },
    },

  },
  selected: {},
  wrapper: {},
}))(props => <Tab {...props} />);


export default function MainNav() {
  const classes = useStyles();
  const [value, setValue] = React.useState(handleChange());

  function handleChange(event, newValue) {
    const x = window.location.pathname;
    if (newValue !== undefined) {
      setValue(newValue)
    } else {
      if (x === '/story/edit') {
        return 0;
      } else if (x === '/utters') {
        return 1;
      } else if (x === '/intents') {
        return 2;
      }
    }
  }
<<<<<<< HEAD
 
=======

>>>>>>> New edit story (#104)
  return (
    <Tabs className={classes.root}
      value={value}
      onChange={handleChange}
      centered>
      <StyledTab classes={{ wrapper: classes.tabWrapper }} icon={<StoryIcon />} label="Diálogos" to="/story/edit" component={Link} />
      <StyledTab classes={{ wrapper: classes.tabWrapper }} icon={<UtterIcon />} label="Respostas" to="/utters" component={Link} />
      <StyledTab classes={{ wrapper: classes.tabWrapper }} icon={<IntentIcon />} label="Perguntas" to="/intents" component={Link} />
      <StyledTab classes={{ wrapper: classes.tabWrapper }} icon={<StoryIcon />} label="Diálogos" to="/stories" component={Link} />
    </Tabs>
  );
}