import Errors from './Errors';

let client

export function setClient(newclient) {
  client = newclient
}


export default class Form {

	constructor(data){

        this.httpclient = client;

        this.multipart = false;
        this.originalData = data;
        this.error_message = "";

		this.setData(data);

		this.errors = new Errors();
    }

    hasField(field){
        return this[field] !== undefined;
    }

    setData(data){
        for(let field in data){
			this[field] = data[field];
		}
    }

	data(){
        let data = {};

        if(this.multipart){
            data = new FormData();

            for (let prop in this.originalData) {
                data.append(prop, this[prop]);
            }
        }else{
            for (let prop in this.originalData) {
                data[prop] = this[prop];
            }
        }

        return data;
	}

	reset(){
		for (let field in this.originalData){
			this[field] = this.originalData[field];
		}

    }

    resetErrors(){
		this.errors.clearAll();
    }

	submit(requestType, url){
		return new Promise((resolve, reject) => {

			this.httpclient[requestType](url, this.data())
				.then(response => {
					this.onSuccess(response.data);
					resolve(response.data);
				})
				.catch((error) => {
					this.onFail(error.response.data);
					reject(error.response.data);
				});

		});
    }

    post(url){
        return this.submit('post', url);
    }


    put(url) {
        return this.submit('put', url);
    }

    patch(url) {
        return this.submit('patch', url);
    }

	onSuccess(data){
		this.resetErrors();
	}

	onFail(data){
        if(data.errors != undefined){
            this.errors.setErrors(data.errors);
        }

        if(data.message){
            this.errors.setMessage(data.message);
        }
    }

    setMultipart(){
        this.multipart = true;
    }

	fillData(data){
		for(let field in this.originalData){
			if(data[field] != undefined){
				this[field] = data[field];
			}
		}
	}
}
