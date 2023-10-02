import * as bcrypt from 'bcryptjs';

export const userData = {
  id: 1,
  username: 'Valid-User',
  role: 'user',
  email: 'user@user.com',
  password: bcrypt.hashSync('secret_user', 10)
}