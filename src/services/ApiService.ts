class ApiService {
  baseUrl: string
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  async handleResponse(response: Response) {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
    return response.json()
  }

  async fetchData(endpoint: string, data?: NewCarData, method?: string) {
    const url = `${this.baseUrl}/${endpoint}`
    try {
      if (data && method) {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
        return this.handleResponse(response)
      } else {
        const response = await fetch(url)
        return this.handleResponse(response)
      }
    } catch (error) {
      console.error("Error posting data:", error)
    }
  }
}

export default ApiService
