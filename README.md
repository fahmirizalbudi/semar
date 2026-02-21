<div align="center">
<a href="https://github.com/fahmirizalbudi/semar" target="blank">
<img src="./public/logo.svg" width="200" alt="Semar Logo" />
</a>

<br />
<br />

![](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![](https://img.shields.io/badge/Fastify-000000?style=for-the-badge&logo=fastify&logoColor=white)

</div>

<br/>

## Semar

Semar is a high-performance REST API dedicated to Javanese translation and transliteration. Built with Node.js and Fastify using Clean Architecture principles, it provides accurate conversions between Indonesian and various Javanese dialects, as well as direct transliteration to Javanese script (Aksara Jawa).

## Features

- **Standardized API Responses:** Implements a consistent response wrapper for all endpoints, ensuring predictable data structures and informative metadata.
- **Dialect Support:** Accurately handles multiple levels of Javanese politeness, including Ngoko, Krama, and Krama-Inggil.
- **Comprehensive Dictionary:** Utilizes an integrated dataset of over 11,000 entries for high-accuracy word lookups.
- **Direct Transliteration:** Converts Latin text into authentic Javanese script (Aksara Jawa) using the carakanjs engine.
- **Clean Architecture:** Engineered for scalability and maintainability by separating core business logic from infrastructure and interface layers.
- **Full TSDoc Documentation:** Every component is documented following TSDoc standards for superior developer experience.

## Tech Stack

- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Fastify**: A web framework highly focused on providing the best developer experience with the least overhead.
- **TypeScript**: A strongly typed programming language that builds on JavaScript.
- **carakanjs**: A robust library for Javanese script transliteration.

## Getting Started

To set up a local instance of this project, follow these instructions.

### Prerequisites

- **Node.js** (v22.0.0 or higher).
- **npm** (Node Package Manager).

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/fahmirizalbudi/semar.git
   cd semar
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Build the project:**

   ```bash
   npm run build
   ```

4. **Start the development server:**

   ```bash
   npm run dev
   ```

## Usage

### Translation Endpoint

Translates Indonesian text to Javanese and provides the script.

- **URL:** `POST /api/v1/translate`
- **Payload:**
  ```json
  {
    "text": "saya makan",
    "dialect": "krama"
  }
  ```

### Transliteration Endpoint

Converts Latin text directly into Javanese script.

- **URL:** `POST /api/v1/transliterate`
- **Payload:**
  ```json
  {
    "text": "matur nuwun"
  }
  ```

> The API runs on [http://localhost:3000](http://localhost:3000) by default.

## License

All rights reserved. This project is for educational purposes only and cannot be used or distributed without permission.
