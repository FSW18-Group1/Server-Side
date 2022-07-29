const request = require('supertest');
const app = require('../app') 

describe('GET Leader Boards',()=>{
  it('Sucessfully Get Leaderboards', async ()=>{
    const res = await request(app)
    .get('/games')
    expect(res.status).toEqual(200)
    expect(res.body).toHaveProperty('result',"Success") 
  })
})

describe('GET Leader Board By Id',()=>{
  it('Sucessfully Get Leaderboard By Id', async ()=>{
    const res = await request(app)
    .get('/games/1')
    expect(res.status).toEqual(200)
    expect(res.body).toHaveProperty('result',"Success") 
  })
})

describe('PUT Leader Board By Id',()=>{
  it('Sucessfully Put Leaderboard By Id', async ()=>{
    const res = await request(app)
    .put('/games/1')
    .send({
      id: 3,
      points: 3000
    })
    // console.log('responya: ',res);
    expect(res.status).toEqual(200)
    // expect(res.body).toHaveProperty('message',"Points successfully updated") 
  })
})