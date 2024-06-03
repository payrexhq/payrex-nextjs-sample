PayRex NextJS Demo

This repository is a demo nextjs application integrating PayRex's payments product.

## Getting Started

1. Install dependencies. Run npm install.
2. Replace the existing values with your PayRex API keys:
- src/app/PaymentForm.tsx (Public API key)
- src/app/redirect/ConfirmationSection.tsx (Public API key)
- src/app/page.tsx (Secret API key)

3. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.