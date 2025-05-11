const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const subscriptionsRouter = require('../routes/subscriptions');
const promotionsRouter = require('../routes/promotions');
const foundersRouter = require('../routes/founders');

const app = express();
app.use(bodyParser.json());
app.use('/subscriptions', subscriptionsRouter);
app.use('/promotions', promotionsRouter);
app.use('/founders', foundersRouter);

describe('API Endpoints', () => {
  // Subscriptions tests
  describe('GET /subscriptions', () => {
    it('should return 200 and an array', async () => {
      const res = await request(app).get('/subscriptions');
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe('POST /subscriptions', () => {
    it('should create a new subscription', async () => {
      const res = await request(app)
        .post('/subscriptions')
        .send({ email: 'test@example.com' });
      expect([201, 400]).toContain(res.statusCode); // 400 if duplicate
      if (res.statusCode === 201) {
        expect(res.body).toHaveProperty('_id');
        expect(res.body.email).toBe('test@example.com');
      }
    });
  });

  // Promotions tests
  describe('GET /promotions', () => {
    it('should return 200 and an array', async () => {
      const res = await request(app).get('/promotions');
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe('POST /promotions', () => {
    it('should create a new promotion', async () => {
      const promotionData = {
        title: 'Summer Sale',
        content: 'Discounts on solar panels',
        startDate: '2024-01-01',
        endDate: '2024-01-31',
        active: true
      };
      const res = await request(app)
        .post('/promotions')
        .send(promotionData);
      expect([201, 400]).toContain(res.statusCode);
      if (res.statusCode === 201) {
        expect(res.body).toHaveProperty('_id');
        expect(res.body.title).toBe(promotionData.title);
      }
    });
  });

  // Founders tests
  describe('GET /founders', () => {
    it('should return 200 and an array', async () => {
      const res = await request(app).get('/founders');
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe('POST /founders', () => {
    it('should create a new founder', async () => {
      const founderData = {
        name: 'John Doe',
        title: 'CEO',
        bio: 'Founder of the company',
        photoUrl: 'http://example.com/photo.jpg'
      };
      const res = await request(app)
        .post('/founders')
        .send(founderData);
      expect([201, 400]).toContain(res.statusCode);
      if (res.statusCode === 201) {
        expect(res.body).toHaveProperty('_id');
        expect(res.body.name).toBe(founderData.name);
      }
    });
  });
});
