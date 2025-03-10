class Place {
  constructor(title, imageUri, address, location) {
    this.title = title;
    this.imageUri = imageUri;
    this.address = address;
    this.location = location; // { lat: 0.14233, lng: 127.111}
    this.id = new Date().toString() + Math.random().toString(); // demo 용으로 랜덤 고유한 숫자
  }
}
