import Api from "./api";

class Hint extends Api{
    static getHints(data: any, submit:(res:any) => void){
        this.post('/suggestion_uni',data).then(res => {
            submit(res)
        })
    }
}
export default Hint;