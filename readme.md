
# Placeholder Image Generator

Placeholder Image Generator is a dynamic image placeholder generator with customization options. It allows you to create placeholder images with custom dimensions, text, colors, and more.

## Table of Contents

- [Usage](#usage)
  - [Installation](#installation)
  - [Start the Server](#start-the-server)
  - [Access the API](#access-the-api)
- [API Documentation](#api-documentation)
  - [Endpoint: /image-placeholder](#endpoint-image-placeholder)
    - [Parameters](#parameters)
    - [Example](#example)
- [License](#license)



## Run Locally

Clone the project

```bash
  git clone https://github.com/navneet-baid/placeholder-image-generator
```

Go to the project directory

```bash
  cd placeholder-image-generator
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```


## API Documentation

```
Access the image placeholder API by making HTTP requests.
```
```Endpoint:``` /image-placeholder

Generates a placeholder image with customizable parameters.

### Parameters

```width``` (optional, default: 300): Width of the image.

```height``` (optional, default: 150): Height of the image.

```message``` (optional, default: "{width}x{height}"): Text message displayed on the image.

```bgColor``` (optional, default: "cccccc"): Background color of the image (hex code).

```textColor``` (optional, default: "000000"): Text color (hex code).

```fontSize``` (optional, default: 16): Font size of the text.

```fontFamily``` (optional, default: "sans-serif"): Font family of the text.

```textAnchor``` (optional, default: "middle"): Text anchor position ("start", "middle", or "end").

```textX``` (optional, default: "50%"): X-axis position of the text.

```textY``` (optional, default: "50%"): Y-axis position of the text.

```textBorderSize``` (optional, default: ""): Size of the text border.

```textBorderColor``` (optional, default: ""): Color of the text border (hex code).

```borderRadius``` (optional, default: ""): Border radius of the image.

## Example

```http
GET /image-placeholder?width=400&height=200&message=Custom%20Text&bgColor=ffcc00&textColor=333333&fontSize=20&textBorderSize=2&textBorderColor=ffffff
```

Response: A dynamically generated image based on the provided parameters.

## License

This project is licensed under the [MIT](https://choosealicense.com/licenses/mit/) License - see the LICENSE file for details.
