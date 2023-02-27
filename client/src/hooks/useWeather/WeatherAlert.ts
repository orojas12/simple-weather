export default class WeatherAlert {
  sender_name: string;
  event: string;
  start: Date;
  end: Date;
  description: string;
  tags: string[];

  constructor(data: any) {
    this.sender_name = data.sender_name;
    this.event = data.event;
    this.start = new Date(data.start * 1000);
    this.end = new Date(data.end * 1000);
    this.description = data.description;
    this.tags = data.tags;
  }
}
