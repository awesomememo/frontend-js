export default class EasyHttp {
  constructor(url) {
    this.url = url;
  }

  async get() {
    const res = await fetch(this.url);
    return await res.json();
  }

  async add(item) {
    const response = await fetch(this.url, {
      method: "POST",
      body: JSON.stringify(item),
      headers: {
        "content-type": "application/json"
      }
    });
    return await response.json();
  }

  async delete(id) {
    await fetch(`${this.url}/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json"
      }
    });
  }

  async update(id, item) {
    const response = await fetch(`${this.url}/${id}`, {
      method: "PUT",
      body: JSON.stringify(item),
      headers: {
        "content-type": "application/json"
      }
    });

    return await response.json();
  }

  async getById(id) {
    const respones = await fetch(`${this.url}/${id}`);
    return await respones.json();
  }
}
