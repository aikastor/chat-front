import React, {Component} from 'react';
import Container from "@material-ui/core/Container";
import {loadMessages, sendMessage} from "../../../store/actions";
import {connect} from "react-redux";
import MessageForm from "../../MessageForm/MessageForm";
import Message from "../../Message/Message";

class Chat extends Component {
  state = {
    author: '',
    message: '',
  };
  lastMessageTime = null;

  async getMessages () {
    if (this.lastMessageTime) {
      this.props.loadByDate(this.lastMessageTime)
    } else {
      this.props.loadMessages();
      const messages = this.props.messages;
      this.lastMessageTime = messages[messages.length - 1].datetime;
    }
  }
  componentDidMount() {
    this.getMessages();
    this.timer = setInterval(()=>this.getMessages(), 5000);
  }
  componentWillUnmount() {
    clearInterval(this.timer);
    this.timer = null;
  }

  handleChange = e => {
    this.setState({[e.target.name]: e.target.value})
  };
  sendMsg = async (e) => {
    e.preventDefault();
    await this.props.sendMsg({author: this.state.author, message: this.state.message});
    this.setState({author: '', message: ''});
  };
  render() {
    return (
        <Container maxWidth='md'>
          {this.props.messages.map(message => {
              let time = message.datetime;
              return (
                  <Message
                      key={message.id}
                      msgTxt={message.message}
                      msgAuthor={message.author}
                      time={time.substring(time.indexOf('T') + 1, time.indexOf('.'))}/>
              )
            })}
          <MessageForm
              onChange={this.handleChange}
              author={this.state.author}
              msg={this.state.message}
              onSubmit={e => this.sendMsg(e)}
          />
        </Container>
    );
  }
}
const mapStateToProps = state => ({
  messages: state.messages,
  loadingMessages: state.loadingReceive,
  loadingSend: state.loadingSend,
  error: state.error,
});
const mapDispatchToProps = dispatch => ({
  loadMessages: () => dispatch(loadMessages()),
  loadByDate: (date) => dispatch(loadMessages(date)),
  sendMsg: (msg) => dispatch(sendMessage(msg)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);