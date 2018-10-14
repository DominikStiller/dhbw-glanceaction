import { Recurrence, RecurrenceType } from './recurrence';

describe('Recurrence', () => {
  describe('.fromTransaction()', () => {
    it('should parse no recurrence', () => {
      const recurrence = Recurrence.fromTransaction('0 7');
      expect(recurrence.type).toEqual(RecurrenceType.None);
    });

    it('should parse weekly recurrence', () => {
      const recurrence = Recurrence.fromTransaction('7 7');
      expect(recurrence.type).toEqual(RecurrenceType.Weekly);
    });

    it('should parse monthly recurrence', () => {
      const recurrence = Recurrence.fromTransaction('m 7');
      expect(recurrence.type).toEqual(RecurrenceType.Monthly);
    });

    it('should parse custom recurrence interval', () => {
      const recurrence = Recurrence.fromTransaction('18 7');
      expect(recurrence.type).toEqual(RecurrenceType.Custom);
      expect(recurrence.interval).toEqual(18);
    });

    it('should parse recurrence amount', () => {
      const recurrence = Recurrence.fromTransaction('1 12');
      expect(recurrence.amount).toEqual(12);
    });
  });

  describe('.toString()', () => {
    it('should handle no recurrence', () => {
      const recurrence = new Recurrence();
      recurrence.type = RecurrenceType.None;
      recurrence.interval = 15;
      recurrence.amount = 7;

      expect(recurrence.toString()).toEqual('0 7');
    });

    it('should handle weekly recurrence', () => {
      const recurrence = new Recurrence();
      recurrence.type = RecurrenceType.Weekly;
      recurrence.interval = 15;
      recurrence.amount = 7;

      expect(recurrence.toString()).toEqual('7 7');
    });

    it('should handle monthly recurrence', () => {
      const recurrence = new Recurrence();
      recurrence.type = RecurrenceType.Monthly;
      recurrence.interval = 15;
      recurrence.amount = 7;

      expect(recurrence.toString()).toEqual('m 7');
    });

    it('should handle custom recurrence interval', () => {
      const recurrence = new Recurrence();
      recurrence.type = RecurrenceType.Custom;
      recurrence.interval = 15;
      recurrence.amount = 7;

      expect(recurrence.toString()).toEqual('15 7');
    });

    it('should handle recurrence amount', () => {
      const recurrence = new Recurrence();
      recurrence.type = RecurrenceType.Custom;
      recurrence.interval = 1;
      recurrence.amount = 12;

      expect(recurrence.toString()).toEqual('1 12');
    });
  });
});
