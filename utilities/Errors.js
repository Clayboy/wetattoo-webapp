export default class Errors {

	constructor(){
      this.errors = {}

      this.message = '';
	}

	has(field){
		return this.errors.hasOwnProperty(field);
	}

	get(field){
		if(this.errors[field]){
			return this.errors[field][0];
		}
	}

	setErrors(errors){
		this.errors = errors;
	}

	setMessage(message){
		this.message = message;
	}

	clear(field){
		if(this.errors[field]){
			delete this.errors[field];
		}
	}

	clearAll(){
        this.errors = {};
        this.message = '';
	}

	hasOne(){
		return Object.keys(this.errors).length > 0;
	}
}
