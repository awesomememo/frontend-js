export default class EasyHttp {
  constructor(url) {
    this.url = url;
  }

  add(item) {
    fetch(this.url, {
      method: "POST",
      body: JSON.stringify(item),
      headers: {
        "content-type": "application/json",
      },
    });
  }

  delete(id) {
    fetch(`${this.url}/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    });
  }

  update(id, item) {
    fetch(`${this.url}/${id}`, {
      method: "PUT",
      body: JSON.stringify(item),
      headers: {
        "content-type": "application/json",
      },
    });
  }
}
