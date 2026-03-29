"use client";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function About() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
            <Header />

            <main className="container mx-auto px-4 py-10">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-10">
                        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
                            About ChatLomhat
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-300">
                            ChatLomhat is an intelligent lomhat (teacher) assistant powered by AI that helps students with their studies and solves their academic problems. 
                            Designed to provide personalized learning support and educational guidance in a conversational format.
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-3">
                                What it does
                            </h2>
                            <ul className="space-y-2 text-gray-600 dark:text-gray-300 list-disc list-inside">
                                <li>Solves math problems step-by-step with clear explanations.</li>
                                <li>Generates practice exercises tailored to your level.</li>
                                <li>Supports common topics like algebra, calculus, and geometry.</li>
                            </ul>
                        </section>

                        <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-3">
                                Why ChatLomhat
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300">
                                We built ChatLomhat to make math more approachable. Whether you’re
                                preparing for exams or learning a new concept, the goal is to make
                                learning feel guided, interactive, and stress-free.
                            </p>
                        </section>
                    </div>

                    <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mt-6">
                        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-3">
                            Our mission
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            Empower learners everywhere with an always-available math companion
                            that explains concepts clearly, encourages curiosity, and builds
                            lasting confidence.
                        </p>
                    </section>

                    <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mt-6">
                        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-3">
                            Get in touch
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            Have feedback or need help? Reach out at
                            <a
                                href="mailto:cheamenghour20@gmail.com"
                                className="text-blue-600 dark:text-blue-400 hover:underline ml-1"
                            >
                                cheamenghour20@gmail.com
                            </a>
                            .
                        </p>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
}