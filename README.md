# Mock Test Generator App

![App Screenshot](https://placehold.co/800x400/3B82F6/FFFFFF?text=Mock+Test+Generator+App&font=inter)

An intelligent web application that empowers students and educators to instantly generate custom mock tests and quizzes on any topic using the power of the Google Gemini AI.

---

## ✨ Features

* **AI-Powered Question Generation:** Leverages the **Gemini AI API** to create high-quality questions from a simple topic prompt.
* **Multiple Question Types:** Generates a variety of question formats, including:
    * Multiple Choice Questions (MCQs)
    * True/False
    * Fill-in-the-Blanks
    * Short Answer
* **Fully Customizable:** Users can specify the exact topic, number of questions, and desired question types.
* **User Authentication:** Secure user sign-up and login functionality powered by **Firebase Authentication**.
* **Personalized Dashboard:** Users can save, review, and retake their generated tests, which are stored securely in **Cloud Firestore**.
* **Instant Feedback:** A clean, interactive UI for taking tests and receiving immediate scores and corrections.
* **Responsive Design:** Built with **Tailwind CSS** for a seamless experience on both desktop and mobile devices.

---

## 🚀 Tech Stack

This project is built with a modern, scalable, and serverless-first tech stack.

* **Frontend:** HTML5, CSS3, JavaScript (ES6+)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **AI:** [Google Gemini API](https://ai.google.dev/)
* **Backend & Database:** [Firebase](https://firebase.google.com/)
    * **Authentication:** Firebase Authentication
    * **Database:** Cloud Firestore

---

## ⚙️ Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

You will need to have API keys and configuration details from the following services:
* [Google AI Studio (for Gemini API)](https://aistudio.google.com/)
* [Firebase (for Auth & Firestore)](https://console.firebase.google.com/)

### Installation

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/self_learner/mock-test-generator-app.git](https://github.com/self_learner/mock-test-generator-app.git)
    cd mock-test-generator-app
    ```

2.  **Create your configuration file:**
    In the main project folder (e.g., in a `js/` directory), create a `config.js` file. This file will store your secret keys. *This file is included in `.gitignore` and should NOT be committed to GitHub.*

3.  **Add your API keys to `config.js`:**
    ```javascript
    // config.js
    
    // 1. Firebase Configuration
    const firebaseConfig = {
      apiKey: "YOUR_API_KEY",
      authDomain: "YOUR_AUTH_DOMAIN",
      projectId: "YOUR_PROJECT_ID",
      storageBucket: "YOUR_STORAGE_BUCKET",
      messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
      appId: "YOUR_APP_ID"
    };
    
    // 2. Gemini API Key
    const GEMINI_API_KEY = "YOUR_GEMINI_API_KEY";
    ```

4.  **Link the config file:**
    Make sure your main `index.html` file imports your `config.js` file *before* your main `app.js` file:
    ```html
    <script src="js/config.js"></script>
    <script src="js/app.js"></script>
    ```

5.  **Run the application:**
    Since this is a static project (HTML, CSS, JS), you can simply open the `index.html` file in your browser. For the best experience (to avoid CORS issues with Firebase), it's recommended to use a simple local server.
    
    If you have VS Code, you can use the **"Live Server"** extension.

---

## Usage

1.  **Sign Up / Log In:** Create a new account or log in with your existing credentials.
2.  **Create Test:** Navigate to the "Create New Test" page.
3.  **Enter Details:** Fill in the topic (e.g., "JavaScript Array Methods"), the number of questions, and select the question types you want.
4.  **Generate:** Click the "Generate Test" button and let the AI build your quiz.
5.  **Take Test:** Once generated, you can start the test immediately.
6.  **Review Results:** After submitting, you'll see your score and the correct answers.
7.  **Dashboard:** Your new test is automatically saved to your dashboard for you to access or retake anytime.

---

## 🤝 Contributing

Contributions are welcome! If you have ideas for improvements or find any bugs, feel free to open an issue or submit a pull request.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE.txt` for more information.
