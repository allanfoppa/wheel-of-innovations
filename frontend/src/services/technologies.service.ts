
export interface IServiceConfig {
  headers?: Record<string, string>;
}

export const technologiesService = (config: IServiceConfig) => {

  const request = async <T>(
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
    body?: any
  ): Promise<T> => {
    const url = `${process.env.REACT_APP_API_URL}${endpoint}`

    const options: RequestInit = {
      method,
      headers: {
        ...config.headers,
        'Content-Type': 'application/json',
      },
    }

    if (body) options.body = JSON.stringify(body)

    try {
      const response = await fetch(url, options)
      const data = await response.json() as T

      return data
    } catch (error) {
      throw error
    }
  }

  return {
    get: <T>(endpoint: string) => request<T>(endpoint),
    post: <T, R>(endpoint: string, data: T) => request<R>(endpoint, 'POST', data),
    put: <T, R>(endpoint: string, data: T) => request<R>(endpoint, 'PUT', data),
    delete: <R>(endpoint: string) => request<R>(endpoint, 'DELETE'),
  }
}
