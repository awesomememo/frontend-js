export default class EasyHttp {
  constructor(url) {
    this.url = url;
  }

  async add(item) {
    const response = await fetch(this.url, {
      method: "POST",
      body: JSON.stringify(item),
      headers: {
        "content-type": "application/json",
      },
    });

    return await response.json();
  }

  async delete(id) {
    await fetch(`${this.url}/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    });
  }

  async update(id, item) {
    const response = await fetch(`${this.url}/${id}`, {
      method: "PUT",
      body: JSON.stringify(item),
      headers: {
        "content-type": "application/json",
      },
    });

    return await response.json();
  }
}
