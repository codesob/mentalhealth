# Mental Health Website

This project is a mental health platform built with Next.js, designed to help users connect with each other, make friends, and access mental health resources. The website includes features for chatting, sending voice messages, video calls, and therapy sessions, along with an AI chatbot for consultations.

## Features

- **User Authentication**: Users can register and log in to their accounts.
- **Friendship System**: Users can connect with friends and chat with them.
- **Chat Interface**: A real-time chat interface for messaging friends.
- **Voice Messaging**: Users can send and receive voice messages.
- **Video Calling**: Facilitate video calls between users.
- **Therapy Sessions**: Information and booking options for therapy sessions.
- **AI Chatbot**: An AI-powered chatbot for user consultations and support.

## Project Structure

```
mental-health-website
├── pages
│   ├── _app.tsx
│   ├── index.tsx
│   ├── login.tsx
│   ├── register.tsx
│   ├── chat
│   │   └── [friendId].tsx
│   ├── therapy.tsx
│   └── api
│       └── chat.ts
├── components
│   ├── ChatInterface.tsx
│   ├── FriendList.tsx
│   ├── VoiceMessage.tsx
│   ├── VideoCall.tsx
│   ├── TherapySession.tsx
│   └── AiChatBot.tsx
├── styles
│   ├── globals.css
│   └── Home.module.css
├── public
│   ├── logo.svg
│   └── avatars
│       └── default.png
├── utils
│   └── aiBot.ts
├── services
│   └── userService.ts
├── next.config.js
├── package.json
├── tsconfig.json
└── README.md
```

## Getting Started

To get started with the project, follow these steps:

1. **Clone the repository**:
   ```
   git clone <repository-url>
   cd mental-health-website
   ```

2. **Install dependencies**:
   ```
   npm install
   ```

3. **Run the development server**:
   ```
   npm run dev
   ```

4. **Open your browser** and navigate to `http://localhost:3000` to view the application.

## Technologies Used

- **Next.js**: A React framework for server-side rendering and static site generation.
- **TypeScript**: A superset of JavaScript that adds static types.
- **React**: A JavaScript library for building user interfaces.
- **Socket.io**: For real-time communication in chat features.
- **CSS Modules**: For styling components.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.