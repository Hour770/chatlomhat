export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 mt-8">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400">
            ChatLomat &copy; {new Date().getFullYear()} All rights reserved.
          </p>
          <div className="flex justify-center space-x-6 mt-4">
            <a href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-500 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-500 transition-colors">
              Terms of Service
            </a>
            <a href="mailto:cheamenghour20@gmail.com" className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-500 transition-colors">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
