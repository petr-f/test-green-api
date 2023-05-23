import React from  'react';

class ContactItem extends React.Component {
    constructor(props) {
        super(props);
		document.title = "ContactList";
		//this._onClick = this._onClick.bind(this);
    }

	selectContact(num){
		//console.log({"num": num});
		this.props.changeSelectedChat(num);
	}

	render(){
		const num = this.props.contactItem;
		return (
			<div style={{"cursor":"pointer"}} onClick={() => this.selectContact(num)}>
				{num}
			</div>
		);
	}

} // ContactItem

export default ContactItem;