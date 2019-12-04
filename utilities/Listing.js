export default class Listing {

    constructor(url){
        this.url = url;
        this.next_page_url = url;
        this.data = [];
        this.pagination = {}
    }


    getData(){
        return this.data;
    }


    fetch(){

        if(this.next_page_url) {

            axios.get(this.next_page_url)
                .then(({data}) => {

                    this.data = data.data;

                    this.pagination = {
                        current_page : data.current_page,
                        per_page : data.per_page,
                        total : data.total,
                    }

                    this.next_page_url = data.next_page_url;
                })
        }
    }
}
