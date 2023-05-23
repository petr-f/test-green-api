import React from  'react';

class Messages extends React.Component {
    constructor(props) {
        super(props);
		document.title = "Messages";
		//this._onClick = this._onClick.bind(this);
    }

	render(){
		const mess = this.props.messages_list;
		//console.log({"mess - m": mess});
		return (
			<>
				<div id="mess-div" style={{"height":"80vh", "maxHeight":"80vh", "overflowY":"scroll"}}>
					{
						mess.map(item => (
							<>
							<div className={"mess "+item.direction}>
								{item.message}
								<div className="date-time">{item.date_time}</div>
							</div>
							<div style={{"clear":"both"}}></div>
							</>
						))
					}
				</div>
				<div style={{"clear":"both"}}></div>
			</>
		);
	}

} // Messages

export default Messages;