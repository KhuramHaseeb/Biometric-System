import axios from 'axios';




class APIservice {
    get_employ_data() {
        let promise = axios({
            method: "get",
            url: "http://localhost:3001/employelist"
        });
        return promise;
    }
    sendEmploye_byid(id) {
        let promise = axios({
            method: "get",
            url: `http://localhost:3001/byid/${id}`
        });
        return promise;
    }
}

export default APIservice;