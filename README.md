# LeetCode AI Mentor 🤖

A Next.js application designed to help you track your LeetCode progress and provide AI-powered mentorship. This project aims to provide a personalized learning experience by integrating your LeetCode statistics with AI-driven insights. It solves the problem of scattered learning resources by centralizing your progress and offering tailored guidance.

## 🚀 Key Features

- **LeetCode Stats Tracking**: Automatically fetches and displays your LeetCode statistics, including total solved problems, difficulty-wise distribution, contest rating, and global ranking.
- **Username Linking**: Allows you to link your LeetCode username to your account for seamless data synchronization.
- **Authentication**: Secure user authentication using NextAuth.js.
- **Modern Tech Stack**: Built with Next.js, TypeScript, Tailwind CSS, and Prisma for a robust and scalable application.
- **API Endpoints**: Provides well-defined API endpoints for data fetching and user profile updates.
- **Database Integration**: Uses Prisma to interact with the database for storing user data and LeetCode usernames.

## 🛠️ Tech Stack

| Category    | Technology                      | Description                                                                 |
|-------------|---------------------------------|-----------------------------------------------------------------------------|
| **Frontend**  | Next.js                         | React framework for building user interfaces                               |
|             | React                           | JavaScript library for building user interfaces                               |
|             | Tailwind CSS                    | CSS framework for styling the application                                    |
|             | TypeScript                      | Superset of JavaScript that adds static typing                               |
| **Backend**   | Next.js API Routes              | Serverless functions for handling API requests                             |
|             | Node.js                         | JavaScript runtime environment                                              |
| **Database**  | Prisma                          | ORM (Object-Relational Mapper) for database access                           |
|             | PostgreSQL (assumed)            | Relational database (can be configured to other databases)                  |
| **Authentication** | NextAuth.js                     | Authentication library for Next.js                                         |
| **API Client** | Axios                           | Promise based HTTP client for the browser and node.js                       |
| **Linting**   | ESLint                          | JavaScript linter for code quality                                        |
| **Configuration** | PostCSS                         | A tool for transforming CSS with JavaScript                              |
| **Fonts**     | next/font/google (Geist Fonts) | Optimizing and loading custom fonts                                         |
| **Other**     | bcrypt/bcryptjs                 | Library for hashing passwords                                               |

## 📦 Getting Started

### Prerequisites

- Node.js (version >= 18)
- npm, yarn, or pnpm package manager
- PostgreSQL database (or another database supported by Prisma)
- Vercel CLI (optional, for deployment)

### Installation

1.  Clone the repository:

    ```bash
    git clone <repository-url>
    cd leetcode-ai-mentor
    ```

2.  Install dependencies using your preferred package manager:

    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3.  Set up your environment variables:

    - Create a `.env.local` file in the root directory.
    - Add the necessary environment variables, such as database connection string, NextAuth.js secrets, and API keys (if any).  Refer to `.env.example` (if present) or NextAuth.js documentation for required variables.

4.  Run Prisma migrations to create the database schema:

    ```bash
    npx prisma migrate dev
    ```

### Running Locally

1.  Start the development server:

    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    ```

2.  Open your browser and navigate to `http://localhost:3000` to view the application.

## 💻 Usage

1.  **Sign In/Sign Up**: Use the authentication flow provided by NextAuth.js to create an account or sign in.
2.  **Link LeetCode Username**: Navigate to the `/link` page to link your LeetCode username to your account.
3.  **View Dashboard**: Access the `/dashboard` page to view your LeetCode statistics.

## 📂 Project Structure

```
leetcode-ai-mentor/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   └── [...nextauth]/
│   │   │       └── route.ts
│   │   ├── leetcode/
│   │   │   └── stats/
│   │   │       └── route.ts
│   │   ├── link-username/
│   │   │   └── route.ts
│   ├── dashboard/
│   │   └── page.tsx
│   ├── link/
│   │   └── page.tsx
│   ├── layout.tsx
│   └── page.tsx
├── public/
│   └── ...
├── styles/
│   └── globals.css
├── eslint.config.mjs
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── prisma/
│   └── schema.prisma
├── README.md
├── tailwind.config.js (assumed)
└── tsconfig.json
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them with descriptive messages.
4.  Push your changes to your fork.
5.  Submit a pull request to the main branch of the original repository.

## 📝 License

This project is licensed under the [MIT License](LICENSE) - see the `LICENSE` file for details.

## 📬 Contact

If you have any questions or suggestions, feel free to contact me at [harshitbudhraja0@gmail.com](mailto:harshitbudhraja0@gmail.com).

## 💖 Thanks Message

Thank you for checking out the LeetCode AI Mentor project! I hope it helps you on your coding journey. Your contributions and feedback are highly appreciated.

This is written by [readme.ai](https://readme-generator-phi.vercel.app/), your AI-powered README generator.
