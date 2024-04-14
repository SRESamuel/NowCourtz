export class Member {
  id: number | undefined;
  firstName: string = "";
  lastName: string = "";
  email: string = "";
  courtLocationId: number | undefined; // ID of the court location they're joining
  constructor(firstName: string, lastName: string, email: string, courtLocationId: number) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.courtLocationId = courtLocationId;
  }
}
