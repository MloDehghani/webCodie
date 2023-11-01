import Api from "./api";

class Rate extends Api {
    static record (data: any) {
        this.post('/rate_mobile_app_uni',data).then(res => {
            console.log(res)
        })
    }
}

export default Rate