export class Employee {
    private first_name: string;
    private last_name : string;
    private wage: number;
    private email: string;
    private dob: string;
    private gender: string;
    private address: string;
    private department : string;


    constructor(first_name: string, last_name: string, email: string, wage: number,department:string, dob: string, gender: string, address : string ) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.wage = wage;
        this.department = department;
        this.dob = dob;
        this.gender = gender;
        this.address = address;
    }
}