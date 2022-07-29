const request = require('supertest');
const app = require('../app')
let token 

describe('Login', () => { 
  it('Sucessfully Login', async()=>{
    const res = await request(app)
    .post('/login')
    .send({
      username:'llollwawa',
      email:'llollwawa@gmail.com',
      password:'llollwawa'
    })
    expect(res.status).toEqual(200) 
    expect(res.body).toHaveProperty('result',"Success")
    token = res.body.token 
  })
})

describe('PlayerController',()=>{
  it('Sucessfully Get All Players', async ()=>{
    const res = await request(app)
    .get('/profile')
    .set('Authorization',`Bearer ${token}`)
    expect(res.status).toEqual(200)
    expect(res.body).toHaveProperty('data')
  })

  it('Failed Get All Players', async ()=>{
    const res = await request(app)
    .get('/profile')
    .set('Authorization',`Bearer a`)
    // console.log('2',res.unauthorized);
    expect(res.status).toEqual(401)
    expect(res.unauthorized).toBe(true)
  })

  it('Sucessfully Get Player By Id', async ()=>{
    const res = await request(app)    
    .get('/profile/1')
    .set('Authorization',`Bearer ${token}`)
    expect(res.status).toEqual(200)
    expect(res.body).toHaveProperty('data')
  })

  it('Failed Get Player By Id', async ()=>{
    const res = await request(app)    
    .get('/profile/10')
    .set('Authorization',`Bearer ${token}`)
    expect(res.status).toEqual(404)
    expect(res.body).toHaveProperty('message','Player with id: 10 not found')
  })

  it('Sucessfully Put Player By Id', async ()=>{
    const res = await request(app)    
    .put('/profile/2')
    .set('Authorization',`Bearer ${token}`)
    .send({
      username:'llollwawawa',
      email:'llollwawawa@gmail.com',
      password:'llollwawawa'
    })
    expect(res.status).toEqual(200)
    expect(res.body).toHaveProperty('message','Player with id: 2 successfully updated')
  })

  it('Failed Put Player By Id because Id Not Found', async ()=>{
    const res = await request(app)    
    .put('/profile/20')
    .set('Authorization',`Bearer ${token}`)
    .send({
      username:'llollwawawas',
      email:'llollwawawas@gmail.com',
      password:'llollwawawas'
    })
    expect(res.status).toEqual(404)
    expect(res.body).toHaveProperty('message','Player with id: 20 not found')
  })

  it('Sucessfully Delete Player By Id', async ()=>{
    const res = await request(app)    
    .delete('/profile/2')
    .set('Authorization',`Bearer ${token}`)
    // console.log('Data: ', res.status,res.body);
    expect(res.status).toEqual(200)
    expect(res.body).toHaveProperty('message','Player with id: 2 was deleted successfully')
  })

  it('Failed Delete Player By Id because Id Not Found', async ()=>{
    const res = await request(app)    
    .delete('/profile/20')
    .set('Authorization',`Bearer ${token}`)
    expect(res.status).toEqual(400)
    expect(res.body).toHaveProperty('message','Cannot delete Player with id: 20. Maybe Player was not found!')
  })

})