const amqplib = require('amqplib');

const queueName = "wdj";

const recieveMsg = async () => {
  const connection = await amqplib.connect('amqp://admin:admin@0.0.0.0:5673');
  const channel = await connection.createChannel();
  await channel.assertQueue(queueName, {durable: false});
  console.log(`Waiting for messages in queue: ${queueName}`);
  channel.consume(queueName, msg => {
    console.log("[X] Received:", msg.content.toString());
  }, {noAck: true})
}

recieveMsg();
