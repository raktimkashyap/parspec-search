

  export const fetchService = async (endpoint:string, method = 'GET', body = null) => {
    try {
        const url = `${endpoint}`;
    
        const options = {
          method,
          headers: {
            'Content-Type': 'application/json'
          },
          body: body ? JSON.stringify(body) : null
        };
    
        const response = await fetch(url, options);
        const data = await response.json();
    
        if (response.ok) {
          return data;
        }
    
        throw new Error(data.message || 'Something went wrong');
      } catch (error:any) {
        throw new Error(error.message || 'Something went wrong');
      }
    };
  