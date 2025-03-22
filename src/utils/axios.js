import axios from "axios";

async function request(url, opts) {
   const { headers, ...options } = opts;

   const defaultHeaders = {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": import.meta.env.VITE_APP_GOOGLE_API_KEY,
   };

   const config = Object.assign(
      {
         url,
         headers: Object.assign(defaultHeaders, headers),
         timeout: 60000,
      },
      options,
   );

   try {
      const response = await axios.request(config);

      return response.data;
   } catch (error) {
      console.log("Error:", error);
   }
}

export default request;
