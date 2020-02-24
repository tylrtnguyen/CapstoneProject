export class Employee {
    public first_name: string;
    public last_name : string;
    public wage: number;
    public email: string;
    public dob: string;
    public position: string;
    public address: string;
    public phone_number: string;

    constructor(first_name: string, last_name: string, email: string, wage: number, dob: string, position: string, address : string , phone_number : string) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.wage = wage;
        this.dob = dob;
        this.position = position;
        this.address = address;
        this.phone_number = phone_number;
    }
}