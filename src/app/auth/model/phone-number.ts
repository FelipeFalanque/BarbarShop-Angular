export class PhoneNumber {
    country: string = '55';
    area: string;
    phone: string;
  
    // format phone numbers as E.164
    get phoneFormat() {
      const num = this.country + this.area + this.phone;
      return `+${num}`
    }
  
  }