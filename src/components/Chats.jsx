import React from 'react';
//import ContactList    from "./ContactList";
import ContactItem from "./ContactItem";
import ChatField from "./ChatField";

class Chats extends React.Component {
    constructor(props) {
        super(props);
		document.title = "Чаты";
    }

	formPhone(){
		//console.log('open tel form');
		this.props.handlePhoneForm(true);
	}

	render(){

		//console.log({"chats": this.props});

		const cList = (this.props.contactList !== undefined && this.props.contactList !== null) ? this.props.contactList : [] ;
		//console.log({"contactList -- ": this.props.contactList, "cList": cList});

		return (
		<section id="content">
			<div className="container">
				<div className="row">
					<div className="col-sm-12 col-md-4 col-lg-4">
						<div className="card" style={{"height":"99vh"}}>
							<div className="card-header">
								<div style={{"float":"left"}}><h4>Контакты</h4></div>
								<div style={{"float":"right", "cursor":"pointer"}} onClick={() => this.formPhone()}>[+]</div>
								<div style={{"clear":"both"}}></div>
							</div>
							<div className="card-body">
							{
								cList.map(item => (
									<ContactItem
										contactItem        = {item}
										key                = {item}
										selectedChat       = {this.props.selectedChat}
										changeSelectedChat = {this.props.changeSelectedChat}
									/>
								))
							}
								{/*<ContactList
									contactList       = {this.props.contactList}
									changeContactList = {this.props.changeContactList}
								/>*/}
							</div>
						</div>

					</div>
					<div className="col-sm-12 col-md-8 col-lg-8" style={{"position":"relative"}}>
						<ChatField
							selectedChat = {this.props.selectedChat}

							messages_list = {this.props.messages_list}
							addToMessList = {this.props.addToMessList}
						/>

					</div>
				</div>
			</div>
		</section>
		);
	}

} // Chats

export default Chats;