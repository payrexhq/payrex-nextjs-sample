PayRex NodeJS Demo

This repository is a demo nodejs application integrating PayRex's payments product.

## Getting Started

1. Install dependencies. Run npm install.
2. Create a .env.local file where you can add your local environment variables. Please see `.env.example`` file for the available environment variables.
  Sample values:

```bash
  PAYREX_API_KEY=sk_test_12345
  NEXT_PUBLIC_PAYREX_PUBLIC_API_KEY=pk_test_12345
  NEXT_PUBLIC_PAYREX_JS_BASE_URL=https://js.payrexhq.com
  PAYREX_API_BASE_URL=https://api.payrexhq.com
```

NOTE: The values for PAYREX_API_KEY and NEXT_PUBLIC_PAYREX_PUBLIC_API_KEY is unique to your PayRex account. Please get your API keys from PayRex Dashboard.

3. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.