
# URL Shortening Service

This project is a URL Shortening Service designed to convert long URLs into short, unique codes for easier sharing and tracking. It is ideal for developers, businesses, or individuals who need a simple and efficient way to manage and track URLs. The service includes features like URL shortening, retrieval, updating, deletion, and access statistics.


##  Project Idea Link
This project is inspired by: [https://roadmap.sh/projects/url-shortening-service](https://roadmap.sh/projects/url-shortening-service)


## Installation



```bash
  git clone https://github.com/Prashanth-Santhanaraman/URL-Shortening-Service.git
  npm install
  node Server.js
```
    
## API Endpoints

#### Post Request

```http
  POST /shorten
  {
    "url": "https://www.example.com/some/long/url"
  }
```
##### Response
```http
{
    "newShortURL": {
        "_id": 3,
        "url": "https://www.example.com/some/long/url",
        "shortcode": "zPhnHa",
        "createdAt": "2025-04-14T14:45:14.888Z",
        "updatedAt": "2025-04-14T14:45:14.908Z",
        "accessCount": 0,
        "__v": 0
    }
}
```


#### Get Request

```http
  GET /shorten/:id
```
##### Response
```http
{
    "_id": 3,
    "url": "https://www.example.com/some/long/url",
    "shortcode": "zPhnHa",
    "createdAt": "2025-04-14T14:45:14.888Z",
    "updatedAt": "2025-04-14T14:45:14.908Z"
}
```

#### Put Request

```http
  PUT /shorten/:id
  {
    "url": "https://www.example.com/some/updated/url"
  }
```
##### Response
```http
{
    "_id": 3,
    "url": "https://www.example.com/some/updated/url",
    "shortcode": "zPhnHa",
    "createdAt": "2025-04-14T14:45:14.888Z",
    "updatedAt": "2025-04-14T14:50:07.308Z"
}
```

#### Delete Request

```http
  DELETE /shorten/:id
```
##### Response
```http
{
    "message": "short URL was successfully deleted."
}
```

#### Get URL Statistics

```http
  GET /shorten/:id/stats
```
##### Response
```http
{
    "urlStats": {
        "_id": 3,
        "url": "https://www.example.com/some/updated/url",
        "shortcode": "UlDeGs",
        "createdAt": "2025-04-14T14:53:27.936Z",
        "updatedAt": "2025-04-14T14:53:27.936Z",
        "accessCount": 8,
        "__v": 0
    }
}
```



