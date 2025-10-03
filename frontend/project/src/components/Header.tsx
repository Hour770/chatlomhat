export default function Header() {
  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <img src="logo.png" alt="ChatLomhat Logo" />
            </div>
            <h1 className="text-xl font-bold text-gray-800 dark:text-white">
              ChatLomhat
            </h1>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors">
              About
            </a>
            <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors">
              Help
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
