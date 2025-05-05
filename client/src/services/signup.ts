import instance from "../axios";

const signupService = {

    signUp: async (name: string, email: string, password: string, cpf: string, rg: string, address: string, interests: string[], eventsAttended: string[], purchases: string[]) => {
      const createEncontro = await instance.post(`auth/signup`, {
        name: name,
        admin: false,
        email: email,
        password: password,
        cpf: cpf,
        rg: rg,
        address: address,
        interests: interests,
        eventsAttended: eventsAttended,
        purchases: purchases
      })
      return createEncontro
    },

    findOne: async () => {
        const user = await instance.get(`users/profile`)
        return user
    },

    validateDocs: async (front: File, back: File) => {
      const formData = new FormData();
      formData.append('images', front);
      formData.append('images', back);
    
      const response = await instance.post('textract/analyze-rg', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    
      return response;
    }
  };
  
  export default signupService;