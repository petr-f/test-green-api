import React from  'react';
import Messages from "./Messages";
import { API } from "./API/api";

class ChatField extends React.Component {
    constructor(props) {
        super(props);
		document.title = "ChatField";

	}

	sendMessage(e){
		const mess = document.getElementById("mess").value;
		//console.log({"num": this.props.selectedChat, "mess": mess});

		document.getElementById('fon').style.display = 'block';
		document.getElementById('download-message').style.display = 'block';

		//var r = {"idMessage":"BAE5728EAB82B9B6"};		
		API.sendMessage(this.props.selectedChat, mess)
		.then((result) => {
			//console.log({"result": result});
			var r = result['res_data'];
			var today = new Date();
			var dd = String(today.getDate()).padStart(2, '0');
			var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
			var yyyy  = today.getFullYear();
			var hours = String(today.getHours()).padStart(2, '0');
			var min   = String(today.getMinutes()).padStart(2, '0');
			var today_now = dd + '.' + mm + '.' + yyyy + ' '+ hours + ':' + min;
			
			if(r["idMessage"] !== undefined && r["idMessage"] !== null){
				this.props.addToMessList({direction:"out", id: r["idMessage"], date_time: today_now, message: mess});
				document.getElementById("mess").value = '';
			}

			document.getElementById('fon').style.display = 'none';
			document.getElementById('download-message').style.display = 'none';
			
		})
		.catch(err => {
			console.log({"err_sendMessage": err});
		});
		
	}

	render(){
		const num = this.props.selectedChat;
		//console.log({"ch-field mList": this.props.messages_list});
		return (
			<>
				{num === null &&
					<div style={{"marginTop":"30%", "textAlign":"center"}}>
						<b>Выберите контакт слева</b>
					</div>
				}

				{num !== null &&
					<>
					<div>
						<h3>{num}</h3>
					</div>

					<Messages
						messages_list = {this.props.messages_list}
					/>

					<div className="container">
						<div className="row" style={{"position":"absolute", "bottom":"0", "left":"0", "width": "100%"}}>
							<div className="col-sm-10 col-md-10 col-lg-10">
								<input className="form-control" name="mess" id="mess" placeholder="Введите сообщение" />
							</div>
							<div className="col-sm-2 col-md-2 col-lg-2">
								<button type="button" className="btn btn-primary" onClick={(e) => this.sendMessage(e)}>&gt;&gt;</button>
							</div>
						</div>
					</div>
				</>
				}
			</>
		);
	}

} // ChatField

export default ChatField;