import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceSpringbootService {
  private baseUrl = 'http://localhost:8091/api/rag/v1/'; 

  constructor() {}

  async getDatos<T>(route: string, params?: Record<string, any>): Promise<T> {
    let url = `${this.baseUrl}${route}`;

    if (params) {
      const queryString = new URLSearchParams(params as any).toString();
      url += `?${queryString}`;
    }

    try {
      const response = await fetch(url, { method: 'GET' });
      if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);
      return response.json();
    } catch (error) {
      return Promise.reject(`GET request failed: ${error}`);
    }
  }

  async postDatos<T>(route: string, data: object): Promise<T> {
    const url = `${this.baseUrl}${route}`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);
      return response.json();
    } catch (error) {
      return Promise.reject(`POST request failed: ${error}`);
    }
  }

  async deleteDatos(route: string, params?: Record<string, any>): Promise<void> {
    let url = `${this.baseUrl}${route}`;

    if (params) {
      const queryString = new URLSearchParams(params as any).toString();
      url += `?${queryString}`;
    }

    try {
      const response = await fetch(url, { method: 'DELETE' });
      if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);
    } catch (error) {
      return Promise.reject(`DELETE request failed: ${error}`);
    }
  }

  async putDatos<T>(route: string, data: object): Promise<T> {
    const url = `${this.baseUrl}${route}`;

    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);
      return response.json();
    } catch (error) {
      return Promise.reject(`PUT request failed: ${error}`);
    }
  }
}
