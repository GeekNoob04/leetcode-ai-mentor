# LeetCode AI Mentor 🤖

An AI-powered mentor to track your LeetCode progress, provide personalized feedback, and help you level up your coding skills. This project aims to provide a comprehensive platform for users to track their LeetCode statistics, contest history, and topic-wise problem-solving data, enhanced with AI-generated feedback.

## 🚀 Key Features

- **LeetCode Stats Tracking:** Monitor your overall progress, including total problems solved, difficulty distribution, and ranking. 📊
- **Username Linking:** Connect your LeetCode account to seamlessly import your data. 🔗
- **Authentication:** Secure user authentication using NextAuth.js. 🔒
- **Contest History:** Analyze your performance in LeetCode contests. 🏆
- **Topic-wise Analysis:** Identify your strengths and weaknesses by tracking your progress on different topics. 🎯
- **AI-Generated Feedback:** Receive personalized insights and recommendations to improve your problem-solving skills. 💡

## 🛠️ Tech Stack

| Category      | Technology                               | Description                                                                                                |
|---------------|------------------------------------------|------------------------------------------------------------------------------------------------------------|
| **Frontend**  | Next.js                                  | React framework for building performant web applications.                                                  |
|               | React                                    | JavaScript library for building user interfaces.                                                           |
|               | Tailwind CSS                             | Utility-first CSS framework for rapid UI development.                                                        |
|               | Lucide React                             | React components for icons.                                                                                |
|               | Recharts                                 | React charting library for data visualization.                                                              |
| **Backend**   | Next.js API Routes                       | Serverless functions for handling API requests.                                                              |
| **Authentication** | NextAuth.js                              | Authentication library for Next.js.                                                                       |
|               | @next-auth/prisma-adapter                | Prisma adapter for NextAuth.js.                                                                            |
| **Database**  | Prisma                                   | ORM for database access.                                                                                   |
|               | @prisma/client                            | Prisma client for interacting with the database.                                                             |
| **AI**        | @google/generative-ai                     | Google's generative AI library for AI-powered features.                                                     |
| **Data Fetching** | Axios                                    | HTTP client for making API requests.                                                                       |
| **Validation** | Zod                                      | Schema validation library.                                                                                 |
| **Security**  | Bcrypt                                   | Library for hashing passwords.                                                                               |
| **Linting**   | ESLint                                   | JavaScript linter for code quality.                                                                        |
| **Typescript**| Typescript                               | Superset of JavaScript which adds static typing.                                                           |
| **Build Tools** | PostCSS                                  | Tool for transforming CSS with JavaScript.                                                                 |

## 📦 Getting Started

### Prerequisites

- Node.js (version >= 18)
- npm or yarn
- Prisma CLI installed globally (`npm install -g prisma`)
- A LeetCode account (for linking your username)
- Google Generative AI API Key (if you want to use AI features)

### Installation

1.  Clone the repository:

    ```bash
    git clone https://github.com/GeekNoob04/leetcode-ai-mentor
    cd leetcode-ai-mentor
    ```

2.  Install dependencies:

    ```bash
    npm install # or yarn install
    ```

3.  Set up your environment variables:

    - Create a `.env` file in the root directory.
    - Add the following environment variables:

    ```
    DATABASE_URL="your_database_connection_string"
    NEXTAUTH_SECRET="your_nextauth_secret"
    NEXTAUTH_URL="http://localhost:3000" # or your deployed URL
    GOOGLE_API_KEY="your_google_api_key"
    ```

    Replace the placeholder values with your actual values.  For `DATABASE_URL`, you'll need to set up a database (e.g., PostgreSQL, MySQL) and obtain the connection string.

4.  Run Prisma migrations:

    ```bash
    npx prisma migrate dev --name init
    npx prisma db seed
    ```

    This will create the database schema and seed it with initial data (if any).

### Running Locally

1.  Start the development server:

    ```bash
    npm run dev # or yarn dev
    ```

2.  Open your browser and navigate to `http://localhost:3000`.

## 💻 Usage

1.  **Sign up or log in:** Create an account or log in with your existing credentials.
2.  **Link your LeetCode username:** After logging in, you'll be prompted to link your LeetCode username. This will allow the application to fetch your LeetCode data.
3.  **Explore the dashboard:** Once your LeetCode username is linked, you can access the dashboard to view your statistics, contest history, and topic-wise progress.
4.  **View AI-generated feedback:** Toggle the AI feedback option to receive personalized insights and recommendations.

## 📂 Project Structure

```
leetcode-ai-mentor/
├── app/
│   ├── api/
│   │   └── auth/
│   │       └── [...nextauth]/
│   │           └── route.ts
│   ├── dashboard/
│   │   ├── DashboardClient/
│   │   │   └── page.tsx
│   │   └── page.tsx
│   ├── login/
│   │   └── page.tsx
│   ├── Providers/
│   │   └── SessionProvider.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   └── Navbar.tsx
│   └── ProblemDistributionChart.tsx
├── lib/
│   └── auth.ts
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── README.md
├── tailwind.config.ts
└── tsconfig.json
```

## 🤝 Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them with clear and concise messages.
4.  Submit a pull request.

## 📬 Contact

If you have any questions or suggestions, feel free to contact me at [harshitbudhraja0@gmail.com](mailto:harshitbudhraja0@gmail.com).

## 💖 Thanks Message

Thank you for checking out this project! I hope it helps you on your LeetCode journey. Happy coding! 🚀

This README.md is written by [readme.ai](https://readme-generator-phi.vercel.app/), your AI-powered README generator.
