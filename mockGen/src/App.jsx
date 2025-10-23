import React from "react";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import AppRouter from "./routes/AppRouter";
export default function App() {
  
  return (
    
      <div className="App flex flex-col min-h-screen">
        <Header />

        <main className="flex-grow">
          <AppRouter />
        </main>

        <Footer />
      </div>
    
  );
}
  
  
  
  
  
  

  

