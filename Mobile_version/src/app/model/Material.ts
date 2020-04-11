export class Material {
    private name: string;
    private quantity : number;
    private stockStatus : string;



    constructor(name: string, quantity: number, stockStatus: string ) {
        this.name = name;
        this.quantity = quantity;
        this.stockStatus = stockStatus;
    }
}