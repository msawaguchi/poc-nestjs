export class KafkaPayload {
  public body: any;
  public messageType: string;
  public topicName: string;

  create?(body, messageType, topicName): KafkaPayload {
    return {
      body,
      messageType,
      topicName,
    };
  }
}
