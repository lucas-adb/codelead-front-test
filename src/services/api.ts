export const API_BASE_URL = 'http://localhost:3333';

export async function api<T>(endpoint: string, config?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  
  return response.json();
}
