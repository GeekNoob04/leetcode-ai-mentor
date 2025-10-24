import { FaLinkedin, FaInstagram, FaXTwitter } from "react-icons/fa6";

export default function Footer() {
    return (
        <footer className="w-full mt-auto py-6 bg-black text-gray-300">
            <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between px-6">
                <p className="text-sm mb-3 sm:mb-0">
                    © {new Date().getFullYear()} Harshit Budhraja. All rights
                    reserved.
                </p>

                <div className="flex space-x-5 text-lg">
                    <a
                        href="https://www.linkedin.com/in/harshit-budhraja-621a70251/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-400 transition-colors"
                        aria-label="LinkedIn"
                    >
                        <FaLinkedin />
                    </a>

                    <a
                        href="https://www.instagram.com/issokieeeharshit/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-pink-500 transition-colors"
                        aria-label="Instagram"
                    >
                        <FaInstagram />
                    </a>

                    <a
                        href="https://x.com/BudhrajaHarshit"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-sky-400 transition-colors"
                        aria-label="Twitter/X"
                    >
                        <FaXTwitter />
                    </a>
                </div>
            </div>
        </footer>
    );
}
