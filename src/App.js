import React    from 'react';
import AuthForm from "./components/AuthForm";
import Chats    from "./components/Chats";
import { API } from "./components/API/api";


class App extends React.Component { 

  constructor(props) {
    super(props);

    this.receive_notifications();

    var stateApp = 'non_auth';
    var cList = (localStorage.getItem("contact_list") !== undefined && localStorage.getItem("contact_list") !== null) ? JSON.parse(localStorage.getItem("contact_list")) : [];

    this.state = {
      currentStateApp: stateApp,
      formPhone:       false,
      enteredPhone:    '',
      contactList:     cList,
      selectedChat:    null,
      messages_list:   [],
    };

    this.handlePhoneForm    = this.handlePhoneForm.bind(this);
    this.changeSelectedChat = this.changeSelectedChat.bind(this);
    this.changeMessList     = this.changeMessList.bind(this);
    this.addToMessList      = this.addToMessList.bind(this);
    this.receive_notifications      = this.receive_notifications.bind(this);
  }

  receive_notifications(){
    setInterval(()=>{
      API.ReceiveNotification()
      .then((result) => {
        var r = result['res_data'];
        
        if(r === null){
          return;
        }

        console.log({"r": r});
        var receiptId = r['receiptId'];
        // delete notification
        API.DeleteNotification(receiptId)
        .then((result) => {
          var r = result['res_data'];
          console.log({"res delete": r});
        })
        .catch(err => {
          console.log({"err_DeleteNotification": err});
        });
        // - // delete notification

        // add mess into the list
        var mes_data  = r['body'];
        //console.log({"mes_data": mes_data});
        var time_stamp = mes_data['timestamp'];
        var idMessage  = mes_data['idMessage'];
        var contact    = mes_data['senderData']['chatId'].replace('@c.us', '');
        var body_mess  = mes_data['messageData']['textMessageData']['textMessage'];

        var today = new Date(time_stamp*1000);
        var dd    = String(today.getDate()).padStart(2, '0');
        var mm    = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy  = today.getFullYear();
        var hours = String(today.getHours()).padStart(2, '0');
        var min   = String(today.getMinutes()).padStart(2, '0');
        var date_mess = dd + '.' + mm + '.' + yyyy + ' '+ hours + ':' + min;

        // сообщение для добавления в ленту
        var js_mess = {direction: "in", id: idMessage, date_time: date_mess, message: body_mess};

        // добавляем только если контакты сообщения и текущей ленты совпадают
        if(this.state.selectedChat === contact){
          this.addToMessList(js_mess);
        }

        //console.log({time: date_mess, contact: contact, body_mess: body_mess});
        
      })
      .catch(err => {
        console.log({"err_ReceiveNotification": err});
      });
    }, 5000);
  }

  changeContactList(arr){
		this.setState({contactList: arr});
	}

  addToMessList(json_new_message){
    var arr = this.state.messages_list;
    arr.push(json_new_message);
		this.setState({messages_list: arr});

		var mesList = (localStorage.getItem("mess_list") !== undefined && localStorage.getItem("mess_list") !== null) ? JSON.parse(localStorage.getItem("mess_list")): [];
		var current_chat_messages = [];
		var current_indx          = null;

		for(var indx in mesList){
			if(mesList[indx]["contact"] === this.state.selectedChat){
				current_chat_messages = mesList[indx]["messages"];
				current_indx          = parseInt(indx);
				break;
			}
		}

		if(current_indx !== null){
			current_chat_messages.push(json_new_message);
			mesList[current_indx]["messages"] = current_chat_messages;
		}else{
			mesList.push({"contact": this.state.selectedChat, "messages": [json_new_message]})
		}

		localStorage.setItem("mess_list", JSON.stringify(mesList));

    var block = document.getElementById("mess-div");
    block.scrollTop = block.scrollHeight;
	} // addToMessList

  changeMessList(selectedChat){
		var mesList = (localStorage.getItem("mess_list") !== undefined && localStorage.getItem("mess_list") !== null) ? JSON.parse(localStorage.getItem("mess_list")): [];
		var current_mess_list = [];
		for(var item in mesList){
			if(mesList[item]["contact"] === selectedChat){
				current_mess_list = mesList[item]["messages"];
				break;
			}
		}

		this.setState({messages_list: current_mess_list});
  }

  changeSelectedChat(selectedChat){
    this.setState({selectedChat: selectedChat});
    this.changeMessList(selectedChat);
  }

  componentDidUpdate(){
    //console.log({"formPhone":this.state.formPhone});
    //console.log({"contactList App":this.state.contactList});

    if(this.state.formPhone === true){
			document.getElementById('PhoneForm').style.display = "block";
      document.getElementById('fon').style.display       = "block";
      document.getElementById('phone').value = "";
    }else{
			document.getElementById('PhoneForm').style.display = "none";
      document.getElementById('fon').style.display       = "none";
    }

    var block = document.getElementById("mess-div");
    //console.log({scroll_block: block});
    if(block !== null){
      block.scrollTop = block.scrollHeight;
    }
    
  }

  handlePhoneForm(boolFlag){
    this.setState({formPhone: boolFlag});
  }

  changeStateApp = (StateID) => {
		this.setState({currentStateApp: StateID});
	}

  closePhoneForm(){
    this.setState({formPhone: false});
  }

  _onSubmitPhone(e){
    e.preventDefault();
    var phone = document.getElementById("phone").value;
    var contact_list = JSON.parse(localStorage.getItem("contact_list"));
    //console.log({contact_list: contact_list});

    if(localStorage.getItem("contact_list") === null || localStorage.getItem("contact_list") === undefined){
      contact_list = [];
    }

    contact_list.push(phone);
    //console.log({contact_list: contact_list});
    localStorage.setItem("contact_list", JSON.stringify(contact_list));
    this.changeContactList(JSON.parse(localStorage.getItem("contact_list")));
    this.closePhoneForm();
  }

  _onChangePhone(e){
    this.setState({enteredPhone:e.target.value});
  }

  render(){
    //console.log({"app": this.state});

    var currentContent = (<AuthForm
                            currentStateApp = {this.state.currentStateApp}
                            changeStateApp = {this.changeStateApp}
                          />);

    if(this.state.currentStateApp === 'chats'){
      currentContent = (<Chats
                          currentStateApp = {this.state.currentStateApp}
                          changeStateApp  = {this.changeStateApp}

                          contactList       = {this.state.contactList}
                          changeContactList = {this.changeContactList}
                          
                          handlePhoneForm = {this.handlePhoneForm}

                          selectedChat       = {this.state.selectedChat}
                          changeSelectedChat = {this.changeSelectedChat}

                          messages_list = {this.state.messages_list}
                          addToMessList = {this.addToMessList}

                        />);
    }

    return (
      <>
        {currentContent}

        {/* Форма ввода телефона */}
        <div className="popup" id="PhoneForm">
        {/*<div className="modal fade">*/}
          <div className="modal-content">
            {/*<!-- Заголовок модального окна -->*/}
            <div className="modal-header">
              <h4 className="modal-title" id="phone-header">Создание контакта</h4>
              <div className="text-right" style={{"paddingRight": "7px"}}>
                <button onClick={() => this.closePhoneForm()} type="button" className="close btn closeModalButton" data-dismiss="modal" aria-hidden="true">×</button>
              </div>
            </div>
            {/*<!-- Основное содержимое модального окна -->*/}
            <div id="newSec-content" className="modal-body">
              <form id="f" name="f" onSubmit={(e)=>this._onSubmitPhone(e)}>
                
                <div className="form-group">
                  <label></label>
                  <input
                    type        = "text"
                    className   = "form-control"
                    id          = "phone"
                    name        = "phone"
                    placeholder = "Введите телефон"
                    value       = {this.state.enteredPhone}
                    onChange={(e)=>this._onChangePhone(e)}
                  />
                </div>
                <br />
                <div className="form-group">
                  <button type="submit" className="btn btn-primary" id="buttonPhone">Добавить контакт</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* Конец формы ввода телефона */}

      </>
    );
  }


} // class App

export default App;
