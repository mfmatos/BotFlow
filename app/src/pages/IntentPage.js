import React, { Component } from "react";
import IntentList from "../components/IntentList";
import IntentForm from "../components/IntentForm";
import { connect } from "react-redux";
import * as intentsAction from "../actions/intentsAction";

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import Grid from '@material-ui/core/Grid';

import TextField from '@material-ui/core/TextField';

class IntentPage extends Component {
  constructor(props) {
    super(props);
    this.props.getIntents();
  }

  getAppBar() {
    let intent_name = (this.props.current_intent !== undefined) ? this.props.current_intent.nameIntent : "";

    return (
      <AppBar position="static" color="secondary">
        <Toolbar>
          <TextField
            helperText={this.props.helper_text}
            id="intent-name"
            label="Nome da resposta"
            margin="normal"
            type="text"
            value={intent_name}
            onChange={(e) => this.props.setIntentName(e.target.value, this.props.intents)}
          />
          <Typography variant="h6" color="inherit">
            <Button
              disabled={!this.props.intent_submit_button_enable}
              variant="contained"
              size="small"
              onClick={() => this.props.saveData(this.props.current_intent, this.props.intents)}>
              <SaveIcon />
                Salvar
              </Button>
            <button onClick={() => this.props.removeIntent(this.props.current_intent._id)}>Deletar intent</button>
            {this.props.text}
          </Typography>
        </Toolbar>
      </AppBar>
    )
  }

  render() {
    
    return (
      <div>
        <Grid container spacing={1}>
          <Grid item xs={3}>
            <center>
              <Button variant="contained" color="primary" onClick={() => this.props.createNewIntent()}>
                Criar uma nova intent
              </Button>
            </center>
            <IntentList items={this.props.intents} current_intent={this.props.current_intent} text="Perguntas cadastradas" />
          </Grid>
          <Grid item xs={9}>
            {this.getAppBar()}
            <IntentForm />
          </Grid>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = state => { return { ...state } };

const mapDispatchToProps = dispatch => ({
  getIntents: () => dispatch(intentsAction.getIntents()),
  createNewIntent: () => dispatch(intentsAction.createNewIntent()),
  createIntent: (new_intent) => dispatch(intentsAction.createIntent(new_intent)),
  removeIntent: (intent_id) => dispatch(intentsAction.removeIntent(intent_id)),
  updateIntent: (new_intent, id) => dispatch(intentsAction.updateIntent(new_intent, id)),
  saveData: (current_intent, intents) => dispatch(intentsAction.saveData(current_intent, intents)),
  setIntentName: (intent_name) => dispatch(intentsAction.setIntentName(intent_name)),

});

export default connect(mapStateToProps, mapDispatchToProps)(IntentPage);