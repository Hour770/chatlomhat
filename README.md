# ChatLomhat 🇰🇭
## គណិតវិទ្យាជាភាសាខ្មែរ - Cambodian Math Tutoring System

ChatLomhat is an AI-powered mathematics tutoring system that provides step-by-step solutions and explanations in Khmer (Cambodian language). The system follows traditional Cambodian teaching methodologies to help students learn mathematics effectively.

## ✨ Features

### 🧮 Math Problem Solving
- **Text Input**: Type math problems in English or Khmer
- **Image Recognition**: Upload photos of handwritten or printed math problems
- **Step-by-step Solutions**: Detailed explanations in Khmer language
- **Multiple Topics**: Algebra, Geometry, Calculus, and more

### 📚 Exercise Generation
- **Custom Practice Problems**: Generate exercises by topic and difficulty
- **Adaptive Difficulty**: Easy, Medium, Hard levels
- **Instant Feedback**: Immediate solutions and explanations
- **Cambodian Teaching Style**: Following traditional Khmer educational approach

### 🔍 RAG (Retrieval Augmented Generation)
- **Textbook Integration**: Vector database from Cambodian math textbooks
- **Contextual Answers**: Responses based on official curriculum
- **Cultural Relevance**: Solutions aligned with Cambodian educational standards

## 🛠️ Technology Stack

### Frontend
- **Next.js 15**: React framework with TypeScript
- **Tailwind CSS**: Modern styling
- **Responsive Design**: Works on desktop and mobile
- **Image Upload**: Drag-and-drop file handling

### Backend
- **Flask**: Python web framework
- **Google Gemini AI**: Advanced language model
- **FAISS**: Vector database for RAG
- **LangChain**: Document processing and embeddings
- **PIL**: Image processing

### AI & ML
- **Google Generative AI**: Gemini 2.0 Flash model
- **Sentence Transformers**: Text embeddings
- **HuggingFace**: Free embedding models
- **Vector Search**: Semantic similarity matching

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- Node.js 18+
- npm or yarn

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Hour770/chatlomhat.git
   cd chatlomhat/backend
   ```

2. **Install Python dependencies**
   ```bash
   pip install flask flask-cors google-generativeai pillow
   pip install langchain langchain-community faiss-cpu sentence-transformers
   ```

3. **Set up environment variables**
   ```bash
   # Create .env file
   echo "GOOGLE_API_KEY=your_google_api_key_here" > .env
   ```

4. **Run the Flask API**
   ```bash
   python api.py
   ```
   Server will start at: `http://localhost:5002`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd ../frontend/chatlomhat
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   Application will be available at: `http://localhost:3000`

## 📖 Usage

### Solving Math Problems

1. **Text Input**:
   - Navigate to the Math Solver section
   - Type your problem: "What is the derivative of x² + 3x + 2?"
   - Click "Solve Problem"
   - Get step-by-step solution in Khmer

2. **Image Upload**:
   - Click "Upload an image of your math problem"
   - Select or drag an image file
   - The AI will analyze and solve the problem
   - Receive detailed explanation in Khmer

### Generating Practice Exercises

1. Select topic (Algebra, Geometry, etc.)
2. Choose difficulty level
3. Set number of problems
4. Click "Generate Exercises"
5. Practice with instant feedback

## 🏗️ Project Structure

```
chatlomhat/
├── backend/
│   ├── api.py              # Main Flask API
│   ├── app.py              # AI integration utilities
│   ├── chunk.ipynb         # Vector database creation
│   ├── .env                # Environment variables
│   └── vector_db/          # FAISS vector database
├── frontend/
│   └── chatlomhat/
│       ├── src/
│       │   ├── app/
│       │   │   ├── page.tsx        # Main application page
│       │   │   ├── layout.tsx      # App layout
│       │   │   └── globals.css     # Global styles
│       │   └── components/
│       │       ├── MathSolver.tsx      # Problem solving component
│       │       ├── ExerciseGenerator.tsx # Exercise creation
│       │       ├── Header.tsx          # Navigation header
│       │       └── Footer.tsx          # Page footer
│       ├── package.json
│       ├── next.config.ts
│       └── tailwind.config.ts
└── README.md
```

## 🌐 API Endpoints

### `POST /solve`
Solve math problems from text or image input
- **Input**: Text prompt or image file
- **Output**: Step-by-step solution in Khmer

### `POST /generate-exercises`
Generate practice problems
- **Input**: Topic, difficulty, number of problems
- **Output**: Array of problems with solutions

### `GET /health`
Health check endpoint

### `GET /`
API information and available endpoints

## 🔧 Configuration

### Environment Variables
```bash
# Required
GOOGLE_API_KEY=your_google_gemini_api_key

# Optional
OPENAI_API_KEY=your_openai_api_key_for_embeddings
```

### Customization
- **Language**: Modify prompts in `api.py` for different languages
- **Difficulty Levels**: Adjust exercise generation parameters
- **Subjects**: Add new math topics in the frontend components
- **Styling**: Customize appearance in Tailwind CSS classes

## 📚 RAG Integration

The system includes a vector database created from Cambodian mathematics textbooks:

1. **Document Processing**: Extract content from educational materials
2. **Chunking**: Split content into meaningful segments
3. **Embedding**: Convert text to vector representations
4. **Storage**: Save in FAISS vector database
5. **Retrieval**: Find relevant content for user queries
6. **Generation**: Create contextual responses using retrieved information

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Google Generative AI for powering the math solutions
- Cambodian Ministry of Education for curriculum guidance
- Open source community for excellent tools and libraries
- Traditional Cambodian mathematics teaching methods

## 📞 Support

For support, email support@chatlomhat.com or create an issue on GitHub.

## 🌟 Future Features

- [ ] Voice input/output in Khmer
- [ ] More mathematical subjects (Physics, Chemistry)
- [ ] Student progress tracking
- [ ] Teacher dashboard
- [ ] Mobile app version
- [ ] Offline mode support

---

**Built with ❤️ for Cambodian students**

*"គណិតវិទ្យាគឺជាភាសាសកលលោក ប៉ុន្តែការបង្រៀនត្រូវតែស្របតាមវប្បធម៌"*  
*"Mathematics is a universal language, but teaching must be culturally relevant"*
