import { User } from '../models/User'

test('it should be ok', () => {
  const user = new User()

  user.name = 'user'

  expect(user.name).toEqual('user')
})
