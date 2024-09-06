import axios from 'axios'

interface RequestConfig {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  url: string
  headers?: Record<string, string>
}

const createQueryString = (body: Record<string, unknown>): string => {
  return Object.entries(body)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`
    )
    .join('&')
}

export async function axiosRequest<T>(
  body: Record<string, unknown>,
  config?: RequestConfig
): Promise<T> {
  const { method = 'POST', url, headers } = config || {}

  let queryString = ''
  if (method === 'GET' || method === 'DELETE') {
    queryString = createQueryString(body)
  }

  const response = await axios({
    method,
    url,
    headers,
    params: queryString ? { query: queryString } : undefined,
    data: queryString ? undefined : body,
  })

  return response.data as T
}
