import React from 'react';

class AuthForm extends React.Component {
	constructor(props) {
		super(props);
		document.title = "Авторизация | Редактор БЗ";
		this.state = {
			idInstance:       localStorage.getItem("idInstance"),
			apiTokenInstance: localStorage.getItem("apiTokenInstance")
		};

		this._onChangeidInstance        = this._onChangeidInstance.bind(this);
		this._onChange_apiTokenInstance = this._onChange_apiTokenInstance.bind(this);
	
	} // constructor
	_onChangeidInstance(e){
		this.setState({idInstance: e.target.value});
	}
	_onChange_apiTokenInstance(e){
		this.setState({apiTokenInstance: e.target.value});
	}
	_onSubmit(e){
		e.preventDefault();
		var idInstance       = document.getElementById('idInstance').value;
		var apiTokenInstance = document.getElementById('apiTokenInstance').value;

		localStorage.setItem("idInstance",       idInstance);
		localStorage.setItem("apiTokenInstance", apiTokenInstance);

		this.props.changeStateApp('chats');
	
	} // _onSubmit

	goBackToLP = (StateID) => {
		this.props.changeStateApp(StateID);
	}

	render(){
		return (
				<section style={ {"paddingTop": "50px"} }>
					
					<div className="container">
						<div className="row justify-content-center">
							<div className="col-lg-7 col-md-10">
								<div className="card shadow-sm">
									<div className="card-header">
										<h4 className=""><i style={  {"cursor":"pointer"}   } className="icon-line-arrow-left" onClick={() => this.goBackToLP('LP')}></i> Вход в систему</h4>
									</div>
									<div className="card-body">
										<form className="" id="login-form" name="login-form" method="post" encType="multipart/form-data" onSubmit={(e)=>this._onSubmit(e)}>
											<div className="row">

												<div className="col-12 form-group">
													<label>ID Instance:<small className="text-danger" style={  {"fontSize":"150%"}  }>*</small></label>
													<input type="text" id="idInstance" name="idInstance" defaultValue={this.state.idInstance} onChange={(e)=>this._onChangeidInstance(e)} className="form-control required" placeholder="Введите ID Instance" />
												</div>

												<div className="col-12 form-group">
													<label>API Token Instance:<small className="text-danger" style={  {"fontSize":"150%"}  }>*</small></label>
													<input type="text" id="apiTokenInstance" name="apiTokenInstance" defaultValue={this.state.apiTokenInstance} onChange={(e)=>this._onChange_apiTokenInstance(e)} className="form-control" placeholder="Введите API Token Instance" />
												</div>

												<div className="col-12 form-group" style={{"marginTop":"10px"}}>
													<button type="submit" name="btn-submit" className="btn btn-secondary btn-block btn-lg">Войти</button>
												</div>

											</div>
										</form>
									</div>
								</div>
							</div>
						</div>
					</div>{/* container */}
					
				</section>
		);
	}
} // function AuthForm

export default AuthForm;