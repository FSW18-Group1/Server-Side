const request = require('supertest');
const app = require('../app')
let token 

describe('GET Games', () => {
  it('GET all games', async ()=>{
    const res = await request(app)
    .get('/')
    expect(res.status).toEqual(200)
    expect(res.body).toHaveProperty('result',"Success") 
  })
})

describe('Register',()=>{
  it('Successfully Register', async()=>{
    const res = await request(app)
    .post('/register')
    .send({
      username:'llollwawuks',
      email:'llollwawuks@gmail.com',
      password:'llollwawuks'
    })
    // console.log('1',res);
    expect(res.status).toEqual(201) 
    expect(res.body).toHaveProperty('result',"Success")
  })

  it('Failed Register because Empty Username', async()=>{
    const res = await request(app)
    .post('/register')
    .send({
      username:'',
      email:'llollwawuks@gmail.com',
      password:'llollwawuks'
    })
    expect(res.status).toEqual(400) 
    expect(res.body).toHaveProperty('message',"Username or Email cannot be empty")
  })

  it('Failed Register because Empty Email', async()=>{
    const res = await request(app)
    .post('/register')
    .send({
      username:'llollwawuks',
      email:'',
      password:'llollwawuks'
    })
    expect(res.status).toEqual(400) 
    expect(res.body).toHaveProperty('message',"Username or Email cannot be empty")
  })

  it('Failed Register because Empty Password', async()=>{
    const res = await request(app)
    .post('/register')
    .send({
      username:'llollwawuks',
      email:'llollwawuks@gmail.com',
      password:''
    })
    expect(res.status).toEqual(400) 
    expect(res.body).toHaveProperty('message',"Password cannot be empty")
  })

  it('Failed Register because Password Length', async()=>{
    const res = await request(app)
    .post('/register')
    .send({
      username:'llollwawuks',
      email:'llollwawuks@gmail.com',
      password:'asd'
    })
    expect(res.status).toEqual(400) 
    expect(res.body).toHaveProperty('message',"Password must contain at least eight character")
  })
})

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
    // console.log("2",token); 
  })

  it(`Login Failed because password doesn't match`, async()=>{
    const res = await request(app)
    .post('/login')
    .send({
      username:'llollwawa',
      email:'llollwawa@gmail.com',
      password:'asdkoesfgagsadaf'
    })
    // console.log('3',res.status,res.body)
    expect(res.status).toEqual(400)
    expect(res.body).toHaveProperty('message',"password doesn't match")
  })

  it(`Login Failed because you haven't registered yet`, async()=>{
    const res = await request(app)
    .post('/login')
    .send({
      username:'llollwawas',
      email:'llollwawas@gmail.com',
      password:'llollwawas'
    })
    expect(res.status).toEqual(400)
    expect(res.body).toHaveProperty('message',"Please register first")
  })

  it('Login Failed because empty username', async()=>{
    const res = await request(app)
    .post('/login')
    .send({
      username:'',
      email:'llollwawa@gmail.com',
      password:'llollwawa'
    })
    expect(res.status).toEqual(400)
    expect(res.body).toHaveProperty('message',"username or email cannot be empty")
  })

  it('Login Failed because empty email', async()=>{
    const res = await request(app)
    .post('/login')
    .send({
      username:'llollwawa',
      email:'',
      password:'llollwawa'
    })
    expect(res.status).toEqual(400)
    expect(res.body).toHaveProperty('message',"username or email cannot be empty")
  })

  it('Login Failed because empty password', async()=>{
    const res = await request(app)
    .post('/login')
    .send({
      username:'llollwawa',
      email:'llollwawa@gmail.com',
      password:''
    })
    expect(res.status).toEqual(400)
    expect(res.body).toHaveProperty('message',"password cannot be empty")
  })
})

describe('PlayerController',()=>{
  it('Get All Players', async ()=>{
    const res = await request(app)
    .get('/profile')
    .set('Authorization',`Bearer ${token}`)
    expect(res.status).toEqual(200)
    expect(res.body).toHaveProperty('data')
  })

  it('Gel All Players Failed', async ()=>{
    const res = await request(app)
    .get('/profile')
    .set('Authorization',`Bearer a`)
    // console.log('4',res.unauthorized);
    expect(res.status).toEqual(401)
    expect(res.unauthorized).toBe(true)
  })
})