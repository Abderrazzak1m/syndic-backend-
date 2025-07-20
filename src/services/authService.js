const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const crypto = require('crypto');

const prisma = new PrismaClient();

class AuthService {
  // Role mapping helper
  mapRoleToEnum(frontendRole) {
    const roleMap = {
      'Comptabilité': 'comptable',
      'Administration': 'admin', 
      'Entretien': 'entretien',
      'RH': 'rh'
    };
    return roleMap[frontendRole] || frontendRole;
  }

  // Reverse mapping for responses
  mapRoleToFrontend(enumRole) {
    const roleMap = {
      'comptable': 'Comptabilité',
      'admin': 'Administration',
      'entretien': 'Entretien', 
      'rh': 'RH'
    };
    return roleMap[enumRole] || enumRole;
  }

  async login(email, password, res) {
    const user = await prisma.user.findUnique({
      where: { email }
    });
    
    if (!user || user.password === null || !await bcrypt.compare(password, user.password)) {
      throw new Error('Invalid credentials');
    }
    
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    return {
      token: token,
      user: { 
        id: user.id, 
        email: user.email, 
        role: user.role 
      } 
    };
  }

  async logout(res) {
    res.clearCookie('accessToken');
    return { message: 'Logout successful' };
  }

  async getCurrentUser(userId) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, role: true, fullName: true }
    });
    
    if (!user) {
      throw new Error('User not found');
    }
    
    return { user };
  }

  async createUser(userData) {
    const { email, fullName, role } = userData;
    
    // Generate password setup token
    const setupToken = crypto.randomBytes(32).toString('hex');
    const setupTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
    
    const user = await prisma.user.create({
      data: {
        email,
        fullName,
        role: this.mapRoleToEnum(role),
        setupToken,
        setupTokenExpiry
      }
    });
    
    // Send setup email (implement email service)
    await this.sendPasswordSetupEmail(user.email, setupToken);
    
    return { 
      id: user.id, 
      email: user.email, 
      role: user.role,
      message: 'User created. Password setup email sent.'
    };
  }

  async sendPasswordSetupEmail(email, token) {
    const setupUrl = `${process.env.FRONTEND_URL}/setup-password?token=${token}`;
    
    // TODO: Implement actual email sending
    console.log(`Password setup email for ${email}:`);
    console.log(`Setup URL: ${setupUrl}`);
    
    // Example with nodemailer (install: npm install nodemailer)
    // const transporter = nodemailer.createTransporter({...});
    // await transporter.sendMail({
    //   to: email,
    //   subject: 'Set up your password',
    //   html: `<p>Click <a href="${setupUrl}">here</a> to set up your password</p>`
    // });
  }

  async setupPassword(token, password) {
    const user = await prisma.user.findFirst({
      where: {
        setupToken: token,
        setupTokenExpiry: {
          gt: new Date()
        }
      }
    });

    if (!user) {
      throw new Error('Invalid or expired setup token');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        setupToken: null,
        setupTokenExpiry: null
      }
    });

    return { message: 'Password set successfully' };
  }

  async updateUser(id, userData) {
    const { email, fullName, role } = userData;
    
    const user = await prisma.user.update({
      where: { id: parseInt(id) },
      data: { 
        email, 
        fullName, 
        role: this.mapRoleToEnum(role)
      }
    });
    
    return { 
      id: user.id, 
      email: user.email, 
      role: user.role 
    };
  }

  async deleteUser(id) {
    await prisma.user.delete({
      where: { id: parseInt(id) }
    });
  }

  async getAllUsers() {
    const users = await prisma.user.findMany({
      select: { 
        id: true, 
        email: true, 
        role: true, 
        fullName: true,
        createdAt: true,
        updatedAt: true
      }
    });
    
    return { users };
  }
}

module.exports = new AuthService();
