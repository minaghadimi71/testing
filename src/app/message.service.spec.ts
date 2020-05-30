import {MessageService} from "./message.service";

describe('MessageService', () => {
  let service: MessageService;
  beforeEach(() => {
    service = new MessageService();
  })
  it('should have no messages to start', () => {
    expect(service.messages).toEqual([]);
  })
  it('should add a message when add is called', () => {
    let message = 'mina is a good girl';
    service.add(message);
    expect(service.messages).toContain(message);
  })
  it('should remove all messages when clear is called', () => {
    service.add('mina is a good girl');
    service.clear();
    expect(service.messages).toEqual([]);
  })
})
