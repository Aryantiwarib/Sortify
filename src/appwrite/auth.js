import conf from '../conf/conf';
import { Client, Account, ID } from 'appwrite';

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(ID.unique(), email, password, name);
      if (userAccount) {
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  async SendOtp({ email }) {
    try {
      // Generate an email token (OTP) without creating a user
      const token = await this.account.createEmailToken(ID.unique(), email);
      return token; // Return the token for verification
    } catch (error) {
      throw error;
    }
  }

  async verifyOtp(userId, otp) {
    try {
      // Verify the OTP by creating a session
      const session = await this.account.createSession(userId, otp);
      return session; // Return the session if verification is successful
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log('Appwrite service :: getCurrentUser :: error', error);
      throw error;
    }
  }

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log('Appwrite service :: logout :: error', error);
      throw error;
    }
  }
}

const authService = new AuthService();

export default authService;