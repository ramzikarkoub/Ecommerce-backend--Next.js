import "./globals.css";
import Provider from "./components/Provider";
import Nav from "./components/Nav";

export const metadata = {
  title: "Drum center",
  description:
    "Welcome to Drum Center, your one-stop destination for all things drum-related. We offer a wide range of drums, percussion instruments, and accessories for drummers of all skill levels. Whether you're a beginner looking for your first drum set or a seasoned pro in search of top-quality gear, we've got you covered. Explore our extensive collection, learn from our expert guides, and elevate your drumming experience with Drum Center. Let the rhythm lead the way!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Provider>
        <body className="flex bg-pink-900 min-h-screen mt-10">
          <Nav />
          <div className="bg-gray-100 flex-grow mt-2 mr-2 mb-2 rounded-lg p-4">
            {children}
          </div>
        </body>
      </Provider>
    </html>
  );
}
