export class Profile{
  id: number| undefined
  firstName: string ="";
  lastName: string ="";
  email: string ="";
  phoneNumber: string ="";
  address: string = "";
  city: string ="";
  province: string="";
  postalCode: string="";
  username: string="";
  profileImage: string ="";

  constructor(firstName: string, lastName: string, email: string, phoneNumber: string,address: string, city: string,
              province: string, postalCode: string, username: string,  profileImage: string) {

    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.address = address;
    this.city = city;
    this.province = province;
    this.postalCode = postalCode;
    this.username = username;
    this.profileImage = profileImage;

  }
}
