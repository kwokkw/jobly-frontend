import axios from "axios";

// INITIAL URL
// const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

// USE import.meta.env IN VITE
const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  // obviously, you'll add a lot here ...
  static async getCompanies(name) {
    try {
      if (name) {
        let res = await this.request(`companies?name=${name}`);
        return res.companies;
      }

      let res = await this.request(`companies`);
      return res.companies;
    } catch (error) {
      console.error("Error fetching companies: ", error);
    }
  }

  static async getJobs(title) {
    try {
      if (title) {
        let res = await this.request(`jobs?title=${title}`);
        return res.jobs;
      }

      let res = await this.request(`jobs`);
      return res.jobs;
    } catch (error) {
      console.error("Error fetinch jobs: ", error);
    }
  }

  static async login(formData) {
    try {
      const res = await this.request(`auth/token`, formData, "post");
      this.token = res.token;
      return res.token;
    } catch (error) {
      console.error("Login Error: ", error);
    }
  }

  static async getCurrentUser(username) {
    try {
      const user = await this.request(`users/${username}`);
      return user.user;
    } catch (error) {
      console.error("Error fetching current user: ", error);
    }
  }

  static async signup(formData) {
    try {
      const res = await this.request(`auth/register`, formData, "post");
      this.token = res.token;
      return res.token;
    } catch (error) {
      console.error("Error registering new user: ", error);
      throw new Error("Signup failed");
    }
  }

  static async saveProfile(username, formData) {
    const res = await this.request(`users/${username}`, formData, "patch");
    return res.user;
  }

  static async applyToJob(username, id) {
    const res = await this.request(`users/${username}/jobs/${id}`, {}, "post");
  }
}

// for now, put token ("testuser" / "password" on class)
// JoblyApi.token =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
//   "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
//   "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

export default JoblyApi;
