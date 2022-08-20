const getHeaders = (token:any) => {
    
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}` 
        }
    }
    return config
}

export default getHeaders