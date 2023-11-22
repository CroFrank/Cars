export class ApiService {
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

  async fetchData(endpoint: string, method?: string, data?: NewCarData) {
    const url = `${this.baseUrl}/${endpoint}`
    try {
      if (!data && !method) {
        const response = await fetch(url)
        return this.handleResponse(response)
      } else if (method && !data) {
        const response = await fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
          },
        })
        return this.handleResponse(response)
      } else {
        const response = await fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
        return this.handleResponse(response)
      }
    } catch (error) {
      console.error("Error posting data:", error)
    }
  }
}
