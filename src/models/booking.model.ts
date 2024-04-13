export class Booking{
  id: number| undefined
  firstName: string ="";
  lastName: string ="";
  email: string ="";
  phoneNumber: string ="";
  datePicker: string;
  timeSlot: string ="";
  courtType: string="";
  courtLoc: string= "";
  courtTypeFk : number | undefined;
  courtLocFk : number | undefined;

  constructor(firstName: string, lastName: string, email: string, phoneNumber: string,datePicker: string, timeSlot: string,courtType: string, courtLoc: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.datePicker = datePicker;
    this.timeSlot = timeSlot;
    this.courtType = courtType;
    this.courtType = courtLoc;
  }


}




