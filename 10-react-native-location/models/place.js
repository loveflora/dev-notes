export class Place {
  constructor(title, imageUri, location) {
    this.title = title;
    this.imageUri = imageUri;
    this.address = location.address;
    this.location = { lat: location.lat, lng: location.lng }; // { lat: 0.14233, lng: 127.111}
    this.id = new Date().toString() + Math.random().toString(); // demo 용으로 랜덤 고유한 숫자
  }
}
